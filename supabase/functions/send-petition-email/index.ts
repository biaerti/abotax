// Supabase Edge Function for sending petition confirmation emails
// Deploy with: supabase functions deploy send-petition-email

import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const SMTP_HOST = Deno.env.get("SMTP_HOST") || "serwer356632.lh.pl"
const SMTP_PORT = parseInt(Deno.env.get("SMTP_PORT") || "587")
const SMTP_USER = Deno.env.get("SMTP_USER") || "petycja@abotax.pl"
const SMTP_PASS = Deno.env.get("SMTP_PASS") || ""

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
}

interface EmailPayload {
  to: string
  firstName: string
  type: "confirmation" | "reminder" | "share"
  reason?: string
}

serve(async (req) => {
  // Handle CORS
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders })
  }

  try {
    const { to, firstName, type, reason } = await req.json() as EmailPayload

    let subject = ""
    let html = ""

    switch (type) {
      case "confirmation":
        subject = "Dziękujemy za poparcie AboTax!"
        html = generateConfirmationEmail(firstName, reason)
        break
      case "reminder":
        subject = "Złóż oficjalną petycję przez e-Doręczenia"
        html = generateReminderEmail(firstName)
        break
      case "share":
        subject = "Podziel się AboTax ze znajomymi"
        html = generateShareEmail(firstName)
        break
    }

    // For now, log the email (in production, connect to SMTP)
    console.log(`Sending email to ${to}: ${subject}`)

    // TODO: Integrate with actual SMTP server
    // For LH.pl hosting, you might need to use their API or a third-party service
    // like Resend, SendGrid, or Mailgun

    return new Response(
      JSON.stringify({ success: true, message: "Email queued" }),
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

function generateConfirmationEmail(firstName: string, reason?: string): string {
  const reasonBlock = reason ? `
      <div style="background: linear-gradient(135deg, #1a365d 0%, #1A5F5A 100%); padding: 24px; border-radius: 12px; margin: 24px 0; text-align: center;">
        <p style="color: rgba(255,255,255,0.7); font-size: 12px; margin: 0 0 8px 0;">Twój powód poparcia:</p>
        <p style="color: white; font-size: 18px; font-weight: 600; margin: 0;">"${reason}"</p>
        <p style="color: #c9a227; font-size: 12px; margin: 8px 0 0 0;">@abotax.pl • #AboTax</p>
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

      <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 24px 0;">
        <h3 style="margin-top: 0; color: #1a365d;">Podziel się na social media!</h3>
        <p style="color: #666; margin-bottom: 16px;">Pobierz obrazek i wrzuć na Instagram Story. Oznacz @abotax.pl!</p>
        <div style="text-align: center;">
          <a href="https://abotax.pl/generatorig" class="button-ig" style="color: white;">
            Wygeneruj obrazek na IG Story
          </a>
        </div>
      </div>

      <div style="background: #f0f4f8; padding: 24px; border-radius: 12px; margin: 24px 0; border-left: 4px solid #1a365d;">
        <h3 style="margin-top: 0; color: #1a365d; font-size: 16px;">Złóż oficjalną petycję przez e-Doręczenia</h3>
        <p style="color: #666; font-size: 14px; margin-bottom: 8px;">
          Twoje poparcie na stronie to dopiero początek. Złóż oficjalną petycję przez e-Doręczenia —
          trafia ona na skrzynkę <strong>Fundacji Destruktura</strong>, która zbiera podpisy
          i składa je do Sejmu RP.
        </p>
        <p style="color: #666; font-size: 14px; margin-bottom: 8px;">
          Adres e-Doręczeń: <strong>AE:PL-18803-44688-HHJBV-13</strong>
        </p>
        <p style="color: #666; font-size: 14px; margin-bottom: 16px;">
          Potrzebujesz Profilu Zaufanego i aktywnej skrzynki e-Doręczeń.
        </p>
        <div style="text-align: center;">
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
        <a href="https://instagram.com/abotax.pl">Instagram</a>
        <a href="https://facebook.com/abotaxx">Facebook</a>
        <a href="https://abotax.pl">abotax.pl</a>
      </div>
    </div>
  </div>
</body>
</html>
`
}

function generateReminderEmail(firstName: string): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; margin: 0; padding: 0; background-color: #faf8f5; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: linear-gradient(135deg, #1a365d 0%, #1A5F5A 100%); padding: 40px; text-align: center; border-radius: 12px 12px 0 0; }
    .header h1 { color: white; margin: 0; font-size: 24px; }
    .content { background: white; padding: 40px; border-radius: 0 0 12px 12px; }
    .button { display: inline-block; background: #1a365d; color: white; padding: 14px 28px; text-decoration: none; border-radius: 8px; font-weight: 600; }
    .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Hej ${firstName}!</h1>
    </div>
    <div class="content">
      <p style="font-size: 18px; color: #333;">Dziękujemy za poparcie AboTax.</p>

      <p style="color: #666;">Wiesz, że możesz złożyć <strong>oficjalną petycję przez e-Doręczenia</strong>? Petycja trafia na skrzynkę <strong>Fundacji Destruktura</strong> (adres: AE:PL-18803-44688-HHJBV-13), która zbiera podpisy i składa je oficjalnie do Sejmu RP.</p>

      <p style="color: #666;">Potrzebujesz Profilu Zaufanego i aktywnej skrzynki e-Doręczeń (możesz założyć przez bank lub mObywatela).</p>

      <div style="text-align: center; margin: 30px 0;">
        <a href="https://edoreczenia.gov.pl" class="button" style="color: white;">
          Przejdź do e-Doręczeń
        </a>
      </div>

      <p style="color: #999; font-size: 14px;">
        Każdy głos się liczy. Razem zbieramy poparcie dla Funduszu Rekompensaty Społecznej.
      </p>
    </div>

    <div class="footer">
      <p><strong>AboTax</strong> — Fundusz Rekompensaty Społecznej</p>
      <p>Inicjatywa wspierana przez Fundację Destruktura</p>
      <p>abotax.pl</p>
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
        <a href="https://abotax.pl/generatorig" class="button" style="color: white;">
          Wygeneruj obrazek na IG
        </a>
      </div>

      <p style="color: #999; font-size: 14px; text-align: center;">
        Nie zapomnij oznaczyć @abotax.pl i dodać #AboTax
      </p>
    </div>

    <div class="footer">
      <p><strong>AboTax</strong> — Fundusz Rekompensaty Społecznej</p>
      <p>abotax.pl</p>
    </div>
  </div>
</body>
</html>
`
}
