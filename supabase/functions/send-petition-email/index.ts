// Supabase Edge Function for sending petition emails via Mailgun
// Deploy: supabase functions deploy send-petition-email
//
// Required Supabase secrets:
//   MAILGUN_API_KEY   - Your Mailgun API key
//   MAILGUN_DOMAIN    - Your Mailgun domain (e.g. mg.abotax.pl or abotax.pl)
//   MAILGUN_REGION    - "eu" or "us" (default: "eu")
//   SUPABASE_URL      - Your Supabase project URL
//   SUPABASE_SERVICE_ROLE_KEY - Service role key for DB access

import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2"

const MAILGUN_API_KEY = Deno.env.get("MAILGUN_API_KEY") || ""
const MAILGUN_DOMAIN = Deno.env.get("MAILGUN_DOMAIN") || ""
const MAILGUN_REGION = Deno.env.get("MAILGUN_REGION") || "eu"
const MAILGUN_BASE_URL = MAILGUN_REGION === "eu"
  ? "https://api.eu.mailgun.net/v3"
  : "https://api.mailgun.net/v3"
const FROM_EMAIL = "AboTax <petycja@abotax.pl>"

// Social media links
const SOCIAL_LINKS = {
  instagram: "https://instagram.com/abotax.pl",
  facebook: "https://facebook.com/abotaxx",
  website: "https://abotax.pl"
}

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
}

interface EmailPayload {
  to: string
  firstName: string
  type: "confirmation" | "followup" | "share"
  reason?: string
  reasonId?: string
  imageUrl?: string
}

// Map reason IDs to plansza filenames and download URLs
const PLANSZA_FILENAMES: Record<string, string> = {
  compromise: "ABOTAX_KOMPROMISY.png",
  children: "ABOTAX_DZIECI_ZASLUGUJA.png",
  war_end: "ABOTAX_KONIEC_Wojny.png",
  no_sides: "ABOTAX_OBOZ.png",
  stigma: "ABOTAX_STYGMATYZOWANIA.png",
  solution: "ABOTAX_DA_SIE_ROZWIAZAC.png",
  custom: "ABOTAX_PUSTE.png",
}

// Direct download links for plansze
const PLANSZA_DOWNLOAD: Record<string, string> = {
  compromise: "https://drive.google.com/uc?export=download&id=136ArFqJeUhzPSnibS7sLi1Xt_S4UfOEO",
  children: "https://drive.google.com/uc?export=download&id=1Ppn2fzhS6YXfK2aBdYoHNtD9OTBWhUNM",
  war_end: "https://drive.google.com/uc?export=download&id=1rCHqMVSeFAm4kz1JqxUTz9THaeMZOC-P",
  no_sides: "https://drive.google.com/uc?export=download&id=1k9MQt7-W324z2TdjRTt6hTITMrXfwsXM",
  stigma: "https://drive.google.com/uc?export=download&id=1lOtuTvvPLjs82C48pAKcCLk1Ougro5CC",
  solution: "https://drive.google.com/uc?export=download&id=1X3iz6UUTdu6AYL0_02O9BuGMPdbZ_Q_m",
  custom: "https://drive.google.com/uc?export=download&id=1S2ZCdDuUL1tXQWc_HZyCbDcBMoopAXpJ",
}

function getPlanszaUrl(reasonId?: string): string {
  return (reasonId && PLANSZA_DOWNLOAD[reasonId]) || PLANSZA_DOWNLOAD.custom
}

function getPlanszaFilename(reasonId?: string): string {
  return (reasonId && PLANSZA_FILENAMES[reasonId]) || PLANSZA_FILENAMES.custom
}

// Get Supabase client for DB operations
function getSupabaseClient() {
  const supabaseUrl = Deno.env.get("SUPABASE_URL")
  const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")
  if (!supabaseUrl || !supabaseKey) return null
  return createClient(supabaseUrl, supabaseKey)
}

serve(async (req) => {
  // Handle CORS
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders })
  }

  try {
    const { to, firstName, type, reason, reasonId, imageUrl } = await req.json() as EmailPayload

    let subject = ""
    let html = ""

    switch (type) {
      case "confirmation":
        subject = "Dziękujemy za poparcie AboTax!"
        html = generateConfirmationEmail(firstName, reason, reasonId, imageUrl)

        // Mark that confirmation was sent (for follow-up logic)
        const supabase = getSupabaseClient()
        if (supabase) {
          await supabase
            .from('petition_signatures')
            .update({
              confirmation_sent_at: new Date().toISOString(),
              followup_scheduled: true
            })
            .eq('email', to)
            .is('confirmation_sent_at', null)
        }
        break

      case "followup":
        // Check if follow-up was already sent
        const db = getSupabaseClient()
        if (db) {
          const { data: signature } = await db
            .from('petition_signatures')
            .select('followup_sent_at')
            .eq('email', to)
            .single()

          if (signature?.followup_sent_at) {
            return new Response(
              JSON.stringify({ success: false, reason: "followup_already_sent" }),
              { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 200 }
            )
          }

          // Mark follow-up as sent
          await db
            .from('petition_signatures')
            .update({ followup_sent_at: new Date().toISOString() })
            .eq('email', to)
        }

        subject = "Obserwuj AboTax w social mediach!"
        html = generateFollowupEmail(firstName)
        break

      case "share":
        subject = "Podziel się AboTax ze znajomymi"
        html = generateShareEmail(firstName)
        break
    }

    // Send email via Mailgun API
    const formData = new FormData()
    formData.append("from", FROM_EMAIL)
    formData.append("to", to)
    formData.append("subject", subject)
    formData.append("html", html)

    const mailgunResponse = await fetch(
      `${MAILGUN_BASE_URL}/${MAILGUN_DOMAIN}/messages`,
      {
        method: "POST",
        headers: {
          "Authorization": `Basic ${btoa(`api:${MAILGUN_API_KEY}`)}`,
        },
        body: formData,
      }
    )

    const mailgunData = await mailgunResponse.json()

    if (!mailgunResponse.ok) {
      console.error("Mailgun error:", mailgunData)
      throw new Error(mailgunData.message || "Failed to send email")
    }

    console.log(`Email sent to ${to}: ${subject} (id: ${mailgunData.id})`)

    return new Response(
      JSON.stringify({ success: true, emailId: mailgunData.id }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      }
    )
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      }
    )
  }
})

function generateConfirmationEmail(firstName: string, reason?: string, reasonId?: string, imageUrl?: string): string {
  const planszaUrl = getPlanszaUrl(reasonId)
  const planszaFilename = getPlanszaFilename(reasonId)
  const isCustom = reasonId === "custom"

  const reasonBlock = reason ? `
      <div style="background: linear-gradient(135deg, #1a365d 0%, #1A5F5A 100%); padding: 24px; border-radius: 12px; margin: 24px 0; text-align: center;">
        <p style="color: rgba(255,255,255,0.7); font-size: 12px; margin: 0 0 8px 0;">Twój powód poparcia:</p>
        <p style="color: white; font-size: 18px; font-weight: 600; margin: 0;">"${reason}"</p>
        <p style="color: #c9a227; font-size: 12px; margin: 8px 0 0 0;">@abotax.pl • #AboTax</p>
      </div>
  ` : '';

  const customNote = isCustom ? `
        <p style="color: #666; font-size: 13px; margin-top: 12px;">
          Na planszy jest puste miejsce — wpisz swój powód jako tekst na IG Story w pustym polu.
        </p>
  ` : '';

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Dziękujemy za poparcie!</title>
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; margin: 0; padding: 0; background-color: #faf8f5;">
  <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
    <div style="background: linear-gradient(135deg, #1a365d 0%, #1A5F5A 100%); padding: 32px 40px 40px; text-align: center; border-radius: 12px 12px 0 0;">
      <table role="presentation" style="margin: 0 auto 16px;" cellpadding="0" cellspacing="0"><tr><td style="width: 56px; height: 56px; background: #faf8f5; border-radius: 50%; text-align: center; vertical-align: middle;">
        <img src="${SOCIAL_LINKS.website}/LOGO_abotax_noBG.png" alt="AboTax" width="36" height="36" style="display: inline-block; vertical-align: middle;" />
      </td></tr></table>
      <h1 style="color: white; margin: 0; font-size: 28px; font-weight: 700;">Dziękujemy, <span style="color: #c9a227;">${firstName}</span>!</h1>
      <p style="color: rgba(255,255,255,0.7); margin: 8px 0 0 0; font-size: 14px;">Twój głos został zarejestrowany</p>
    </div>
    <div style="background: white; padding: 40px; border-radius: 0 0 12px 12px;">

      <p style="font-size: 18px; color: #333; line-height: 1.6;">
        To może być <strong>prawdziwy przełom</strong> w sporze aborcyjnym w Polsce.
      </p>

      <p style="color: #666; line-height: 1.6;">
        AboTax to trzecia droga — kompromis, który łączy wolność wyboru z&nbsp;odpowiedzialnością za 17&nbsp;100 dzieci w domach dziecka. Żadna ze stron nie musi przegrać.
      </p>

      <p style="color: #666; line-height: 1.6;">
        Twój podpis na stronie to wyrażenie poparcia — formalnie petycję można złożyć tylko papierowo lub przez e-Doręczenia. Ale <strong>prawdziwa siła tej inicjatywy to viral w internecie</strong>. Jeśli politycy zobaczą, że tysiące ludzi mają gotowe rozwiązanie — będą musieli zareagować.
      </p>

      ${reasonBlock}

      <!-- PLANSZA DOWNLOAD -->
      <div style="background: linear-gradient(135deg, rgba(124,58,237,0.08), rgba(236,72,153,0.08)); padding: 24px; border-radius: 12px; margin: 24px 0; border: 1px solid rgba(124,58,237,0.2); text-align: center;">
        <h3 style="margin: 0 0 8px 0; color: #1a365d; font-size: 18px;">Twoja plansza poparcia jest gotowa</h3>
        <p style="color: #666; margin: 0 0 16px 0; font-size: 14px;">
          Pobierz, wrzuć na <strong>Instagram Story</strong> i oznacz nas:
        </p>
        <div style="margin: 16px 0;">
          <a href="${planszaUrl}" download="${planszaFilename}" style="display: inline-block; background: linear-gradient(135deg, #7c3aed, #ec4899); color: white; padding: 14px 32px; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 16px;">
            Pobierz planszę
          </a>
        </div>
        <p style="margin: 16px 0 0 0;">
          <span style="background: #1a365d; color: white; padding: 6px 14px; border-radius: 20px; font-weight: 600; font-size: 14px;">
            Oznacz @abotax.pl
          </span>
        </p>
        ${customNote}
      </div>

      <!-- INSTRUKCJA 3 KROKI -->
      <div style="margin: 24px 0;">
        <h3 style="color: #1a365d; font-size: 16px; margin: 0 0 16px 0;">Jak to działa?</h3>
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 8px 12px 8px 0; vertical-align: top; width: 32px;">
              <div style="width: 28px; height: 28px; background: #1A5F5A; color: white; border-radius: 50%; text-align: center; line-height: 28px; font-weight: 700; font-size: 14px;">1</div>
            </td>
            <td style="padding: 8px 0; color: #666; font-size: 14px;">
              <strong style="color: #333;">Pobierz planszę</strong> — kliknij przycisk powyżej
            </td>
          </tr>
          <tr>
            <td style="padding: 8px 12px 8px 0; vertical-align: top;">
              <div style="width: 28px; height: 28px; background: #1A5F5A; color: white; border-radius: 50%; text-align: center; line-height: 28px; font-weight: 700; font-size: 14px;">2</div>
            </td>
            <td style="padding: 8px 0; color: #666; font-size: 14px;">
              <strong style="color: #333;">Wrzuć na Instagram Story</strong> — dodaj jako zdjęcie
            </td>
          </tr>
          <tr>
            <td style="padding: 8px 12px 8px 0; vertical-align: top;">
              <div style="width: 28px; height: 28px; background: #1A5F5A; color: white; border-radius: 50%; text-align: center; line-height: 28px; font-weight: 700; font-size: 14px;">3</div>
            </td>
            <td style="padding: 8px 0; color: #666; font-size: 14px;">
              <strong style="color: #333;">Oznacz @abotax.pl</strong> — sprawmy, by politycy to zobaczyli
            </td>
          </tr>
        </table>
      </div>

      <!-- SOCIAL MEDIA -->
      <div style="background: #f0f4f8; padding: 20px; border-radius: 12px; margin: 24px 0; text-align: center;">
        <p style="color: #333; font-weight: 600; font-size: 15px; margin: 0 0 12px 0;">Obserwuj nas — bądź na bieżąco</p>
        <div>
          <a href="${SOCIAL_LINKS.instagram}" style="display: inline-block; background: linear-gradient(135deg, #7c3aed, #ec4899); color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: 600; margin: 4px;">
            &#x1F4F7;&nbsp; Instagram
          </a>
          <a href="${SOCIAL_LINKS.facebook}" style="display: inline-block; background: #1877f2; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: 600; margin: 4px;">
            &#x1F44D;&nbsp; Facebook
          </a>
        </div>
      </div>

      <!-- E-DORECZENIA -->
      <div style="background: #fffbeb; padding: 20px; border-radius: 8px; margin: 24px 0; border-left: 4px solid #c9a227;">
        <h3 style="margin-top: 0; color: #1a365d; font-size: 15px;">Chcesz złożyć formalną petycję?</h3>
        <p style="color: #666; font-size: 13px; margin-bottom: 8px;">
          Wyślij ją przez <strong>e-Doręczenia</strong> na adres Fundacji Destruktura, która zbiera podpisy i składa je do Sejmu RP.
        </p>
        <p style="color: #666; font-size: 13px; margin-bottom: 12px;">
          Adres: <strong style="font-family: monospace;">AE:PL-18803-44688-HHJBV-13</strong>
        </p>
        <div style="text-align: center;">
          <a href="https://edoreczenia.gov.pl" style="display: inline-block; background: #1a365d; color: white; padding: 10px 20px; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 13px;">
            Przejdź do e-Doręczeń
          </a>
        </div>
      </div>

    </div>

    <div style="text-align: center; padding: 20px; color: #666; font-size: 12px;">
      <p style="margin: 0 0 4px 0;"><strong>AboTax</strong> — Fundusz Rekompensaty Społecznej</p>
      <p style="margin: 0 0 12px 0; color: #999;">Inicjatywa wspierana przez Fundację Destruktura</p>
      <div>
        <a href="${SOCIAL_LINKS.instagram}" style="color: #1a365d; text-decoration: none; margin: 0 8px;">Instagram</a> •
        <a href="${SOCIAL_LINKS.facebook}" style="color: #1a365d; text-decoration: none; margin: 0 8px;">Facebook</a> •
        <a href="${SOCIAL_LINKS.website}" style="color: #1a365d; text-decoration: none; margin: 0 8px;">abotax.pl</a>
      </div>
      <p style="margin-top: 16px; font-size: 11px; color: #999;">
        Otrzymujesz ten email, ponieważ podpisałeś/aś petycję AboTax.<br>
        <a href="mailto:kontakt@abotax.pl" style="color: #999; text-decoration: none;">Wypisz się</a>
      </p>
    </div>
  </div>
</body>
</html>
`
}

function generateFollowupEmail(firstName: string): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Obserwuj AboTax!</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; margin: 0; padding: 0; background-color: #faf8f5; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: linear-gradient(135deg, #1a365d 0%, #1A5F5A 100%); padding: 40px; text-align: center; border-radius: 12px 12px 0 0; }
    .header h1 { color: white; margin: 0; font-size: 24px; }
    .header .gold { color: #c9a227; }
    .content { background: white; padding: 40px; border-radius: 0 0 12px 12px; }
    .button-ig { display: inline-block; background: linear-gradient(135deg, #7c3aed, #ec4899); color: white; padding: 16px 32px; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 16px; }
    .button-fb { display: inline-block; background: #1877f2; color: white; padding: 16px 32px; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 16px; }
    .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Hej <span class="gold">${firstName}</span>!</h1>
    </div>
    <div class="content">
      <p style="font-size: 18px; color: #333; text-align: center;">
        Dziękujemy za poparcie <strong>Funduszu Rekompensaty Społecznej</strong>!
      </p>

      <p style="color: #666; text-align: center; font-size: 16px;">
        Chcesz być na bieżąco z postępami petycji?<br>
        <strong>Obserwuj nas w social mediach!</strong>
      </p>

      <div style="text-align: center; margin: 32px 0;">
        <a href="${SOCIAL_LINKS.instagram}" class="button-ig" style="color: white; margin: 8px; display: inline-block;">
          Obserwuj na Instagramie
        </a>
      </div>

      <div style="text-align: center; margin: 32px 0;">
        <a href="${SOCIAL_LINKS.facebook}" class="button-fb" style="color: white; margin: 8px; display: inline-block;">
          Polub nas na Facebooku
        </a>
      </div>

      <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 24px 0; text-align: center;">
        <p style="color: #666; margin: 0 0 12px 0;">Podziel się swoją planszą poparcia!</p>
        <p style="color: #333; font-weight: 600; margin: 0;">
          Oznacz <span style="color: #7c3aed;">@abotax.pl</span> i dodaj <span style="color: #c9a227;">#AboTax</span>
        </p>
      </div>

      <p style="color: #999; font-size: 14px; text-align: center;">
        Razem zbieramy głosy, które mogą zmienić polskie prawo.<br>
        Każdy follow i udostępnienie się liczy!
      </p>
    </div>

    <div class="footer">
      <p><strong>AboTax</strong> — Fundusz Rekompensaty Społecznej</p>
      <p>
        <a href="${SOCIAL_LINKS.instagram}" style="color: #666; text-decoration: none;">Instagram</a> •
        <a href="${SOCIAL_LINKS.facebook}" style="color: #666; text-decoration: none;">Facebook</a> •
        <a href="${SOCIAL_LINKS.website}" style="color: #666; text-decoration: none;">abotax.pl</a>
      </p>
      <p style="margin-top: 16px; font-size: 11px; color: #999;">
        To jednorazowy email po podpisaniu petycji. Nie będziemy wysyłać więcej wiadomości.<br>
        <a href="mailto:kontakt@abotax.pl" style="color: #999; text-decoration: none;">Kontakt</a>
      </p>
    </div>
  </div>
</body>
</html>
`
}

function generateShareEmail(firstName: string): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Podziel się AboTax!</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; margin: 0; padding: 0; background-color: #faf8f5; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: linear-gradient(135deg, #1a365d 0%, #1A5F5A 100%); padding: 40px; text-align: center; border-radius: 12px 12px 0 0; }
    .header h1 { color: white; margin: 0; font-size: 24px; }
    .content { background: white; padding: 40px; border-radius: 0 0 12px 12px; }
    .button { display: inline-block; background: linear-gradient(135deg, #7c3aed, #ec4899); color: white; padding: 14px 28px; text-decoration: none; border-radius: 8px; font-weight: 600; }
    .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Podziel się, ${firstName}!</h1>
    </div>
    <div class="content">
      <p style="font-size: 18px; color: #333;">Twój głos ma siłę tylko gdy go słychać.</p>

      <p style="color: #666;">Wygeneruj obrazek na Instagram Story i pokaż znajomym, że popierasz Fundusz Rekompensaty Społecznej.</p>

      <p style="color: #666;">Wybierz swój powód poparcia lub napisz własny — to zajmuje 30 sekund!</p>

      <div style="text-align: center; margin: 30px 0;">
        <a href="https://abotax.pl/podpiszpetycje" class="button" style="color: white;">
          Wygeneruj planszę na IG
        </a>
      </div>

      <p style="color: #999; font-size: 14px; text-align: center;">
        Nie zapomnij oznaczyć @abotax.pl i dodać #AboTax
      </p>
    </div>

    <div class="footer">
      <p><strong>AboTax</strong> — Fundusz Rekompensaty Społecznej</p>
      <p>
        <a href="${SOCIAL_LINKS.instagram}" style="color: #666; text-decoration: none;">Instagram</a> •
        <a href="${SOCIAL_LINKS.facebook}" style="color: #666; text-decoration: none;">Facebook</a> •
        <a href="${SOCIAL_LINKS.website}" style="color: #666; text-decoration: none;">abotax.pl</a>
      </p>
    </div>
  </div>
</body>
</html>
`
}
