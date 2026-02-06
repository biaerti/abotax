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
  imageUrl?: string
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
    const { to, firstName, type, reason, imageUrl } = await req.json() as EmailPayload

    let subject = ""
    let html = ""

    switch (type) {
      case "confirmation":
        subject = "Dziękujemy za poparcie AboTax!"
        html = generateConfirmationEmail(firstName, reason, imageUrl)

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

function generateConfirmationEmail(firstName: string, reason?: string, imageUrl?: string): string {
  const reasonBlock = reason ? `
      <div style="background: linear-gradient(135deg, #1a365d 0%, #1A5F5A 100%); padding: 24px; border-radius: 12px; margin: 24px 0; text-align: center;">
        <p style="color: rgba(255,255,255,0.7); font-size: 12px; margin: 0 0 8px 0;">Twój powód poparcia:</p>
        <p style="color: white; font-size: 18px; font-weight: 600; margin: 0;">"${reason}"</p>
        <p style="color: #c9a227; font-size: 12px; margin: 8px 0 0 0;">@abotax.pl • #AboTax</p>
      </div>
  ` : '';

  const imageBlock = imageUrl ? `
      <div style="text-align: center; margin: 24px 0;">
        <p style="color: #666; margin-bottom: 12px;">Twoja plansza poparcia:</p>
        <img src="${imageUrl}" alt="Popieram AboTax" style="max-width: 100%; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);" />
      </div>
  ` : '';

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Dziękujemy za poparcie!</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; margin: 0; padding: 0; background-color: #faf8f5; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: linear-gradient(135deg, #1a365d 0%, #1A5F5A 100%); padding: 40px; text-align: center; border-radius: 12px 12px 0 0; }
    .header h1 { color: white; margin: 0; font-size: 24px; }
    .header .gold { color: #c9a227; }
    .content { background: white; padding: 40px; border-radius: 0 0 12px 12px; }
    .button { display: inline-block; background: #1A5F5A; color: white; padding: 14px 28px; text-decoration: none; border-radius: 8px; font-weight: 600; }
    .button-navy { display: inline-block; background: #1a365d; color: white; padding: 14px 28px; text-decoration: none; border-radius: 8px; font-weight: 600; }
    .button-ig { display: inline-block; background: linear-gradient(135deg, #7c3aed, #ec4899); color: white; padding: 14px 28px; text-decoration: none; border-radius: 8px; font-weight: 600; }
    .button-fb { display: inline-block; background: #1877f2; color: white; padding: 14px 28px; text-decoration: none; border-radius: 8px; font-weight: 600; }
    .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
    .social { margin-top: 20px; }
    .social a { display: inline-block; margin: 0 10px; color: #1a365d; text-decoration: none; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Dziękujemy, <span class="gold">${firstName}</span>!</h1>
    </div>
    <div class="content">
      <p style="font-size: 18px; color: #333;">Twój głos poparcia dla <strong>Funduszu Rekompensaty Społecznej</strong> został zarejestrowany.</p>

      <p style="color: #666;">Razem z tysiącami Polaków budujesz trzecią drogę w sporze aborcyjnym — kompromis, który może zmienić życie 17 100 dzieci w domach dziecka.</p>

      ${reasonBlock}
      ${imageBlock}

      <div style="background: linear-gradient(135deg, #7c3aed15, #ec489915); padding: 20px; border-radius: 12px; margin: 24px 0; border: 1px solid #7c3aed30;">
        <h3 style="margin-top: 0; color: #1a365d;">Masz swoją planszę poparcia!</h3>
        <p style="color: #666; margin-bottom: 12px;">
          Pobierz ją ze strony i wrzuć na <strong>Instagram Story</strong>.<br>
          W miejscu oznaczonym "@ ___" wstaw oznaczenie:
        </p>
        <p style="text-align: center; margin: 16px 0;">
          <span style="background: linear-gradient(135deg, #7c3aed, #ec4899); color: white; padding: 8px 16px; border-radius: 20px; font-weight: 600;">
            @abotax.pl
          </span>
        </p>
        <p style="color: #999; font-size: 13px; text-align: center;">
          Każde oznaczenie pomaga dotrzeć do nowych osób!
        </p>
      </div>

      <div style="background: #f0f4f8; padding: 24px; border-radius: 12px; margin: 24px 0; border-left: 4px solid #1a365d;">
        <h3 style="margin-top: 0; color: #1a365d; font-size: 16px;">Obserwuj nas w social mediach!</h3>
        <p style="color: #666; font-size: 14px; margin-bottom: 16px;">
          Bądź na bieżąco z postępami petycji i dołącz do dyskusji.
        </p>
        <div style="text-align: center;">
          <a href="${SOCIAL_LINKS.instagram}" class="button-ig" style="color: white; margin: 5px; display: inline-block;">
            Instagram
          </a>
          <a href="${SOCIAL_LINKS.facebook}" class="button-fb" style="color: white; margin: 5px; display: inline-block;">
            Facebook
          </a>
        </div>
      </div>

      <div style="background: #fffbeb; padding: 20px; border-radius: 8px; margin: 24px 0; border-left: 4px solid #c9a227;">
        <h3 style="margin-top: 0; color: #1a365d; font-size: 16px;">Złóż oficjalną petycję przez e-Doręczenia</h3>
        <p style="color: #666; font-size: 14px; margin-bottom: 8px;">
          Twoje poparcie na stronie to dopiero początek. Złóż oficjalną petycję przez e-Doręczenia —
          trafia ona na skrzynkę <strong>Fundacji Destruktura</strong>, która zbiera podpisy
          i składa je do Sejmu RP.
        </p>
        <p style="color: #666; font-size: 14px; margin-bottom: 8px;">
          Adres e-Doręczeń: <strong>AE:PL-18803-44688-HHJBV-13</strong>
        </p>
        <div style="text-align: center; margin-top: 16px;">
          <a href="https://edoreczenia.gov.pl" class="button-navy" style="color: white;">
            Przejdź do e-Doręczeń
          </a>
        </div>
      </div>
    </div>

    <div class="footer">
      <p><strong>AboTax</strong> — Fundusz Rekompensaty Społecznej</p>
      <p>Inicjatywa wspierana przez Fundację Destruktura</p>
      <div class="social">
        <a href="${SOCIAL_LINKS.instagram}" style="color: #1a365d; text-decoration: none;">Instagram</a> •
        <a href="${SOCIAL_LINKS.facebook}" style="color: #1a365d; text-decoration: none;">Facebook</a> •
        <a href="${SOCIAL_LINKS.website}" style="color: #1a365d; text-decoration: none;">abotax.pl</a>
      </div>
      <p style="margin-top: 16px; font-size: 11px; color: #999;">
        Otrzymujesz ten email, ponieważ podpisałeś/aś petycję AboTax.<br>
        <a href="mailto:kontakt@abotax.pl" style="color: #999; text-decoration: none;">Wypisz się z listy mailingowej</a>
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
