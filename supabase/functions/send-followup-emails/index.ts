// Supabase Edge Function for sending follow-up emails
// This function is designed to be called by a cron job or scheduler
// Deploy: supabase functions deploy send-followup-emails
//
// Set up a cron job (e.g., via Supabase pg_cron or external scheduler)
// to call this function once per day
//
// Required Supabase secrets:
//   MAILGUN_API_KEY, MAILGUN_DOMAIN, MAILGUN_REGION
//   SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY

import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2"

const MAILGUN_API_KEY = Deno.env.get("MAILGUN_API_KEY") || ""
const MAILGUN_DOMAIN = Deno.env.get("MAILGUN_DOMAIN") || ""
const MAILGUN_REGION = Deno.env.get("MAILGUN_REGION") || "eu"
const MAILGUN_BASE_URL = MAILGUN_REGION === "eu"
  ? "https://api.eu.mailgun.net/v3"
  : "https://api.mailgun.net/v3"
const FROM_EMAIL = "AboTax <petycja@abotax.pl>"

const SOCIAL_LINKS = {
  instagram: "https://instagram.com/abotax.pl",
  facebook: "https://facebook.com/abotaxx",
  website: "https://abotax.pl"
}

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
}

function getSupabaseClient() {
  const supabaseUrl = Deno.env.get("SUPABASE_URL")
  const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")
  if (!supabaseUrl || !supabaseKey) return null
  return createClient(supabaseUrl, supabaseKey)
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders })
  }

  const supabase = getSupabaseClient()
  if (!supabase) {
    return new Response(
      JSON.stringify({ error: "Supabase not configured" }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 500 }
    )
  }

  try {
    // Find signatures where:
    // - confirmation was sent more than 24 hours ago
    // - followup is scheduled but not yet sent
    const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()

    const { data: pendingFollowups, error: fetchError } = await supabase
      .from('petition_signatures')
      .select('id, email, first_name')
      .eq('followup_scheduled', true)
      .is('followup_sent_at', null)
      .lt('confirmation_sent_at', twentyFourHoursAgo)
      .limit(50) // Process in batches

    if (fetchError) {
      throw fetchError
    }

    if (!pendingFollowups || pendingFollowups.length === 0) {
      return new Response(
        JSON.stringify({ success: true, sent: 0, message: "No pending follow-ups" }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 200 }
      )
    }

    let sentCount = 0
    const errors: string[] = []

    for (const signature of pendingFollowups) {
      try {
        // Send follow-up email
        const html = generateFollowupEmail(signature.first_name)

        const formData = new FormData()
        formData.append("from", FROM_EMAIL)
        formData.append("to", signature.email)
        formData.append("subject", "Obserwuj AboTax w social mediach!")
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

        if (mailgunResponse.ok) {
          // Mark as sent
          await supabase
            .from('petition_signatures')
            .update({ followup_sent_at: new Date().toISOString() })
            .eq('id', signature.id)

          sentCount++
          console.log(`Follow-up sent to ${signature.email}`)
        } else {
          const errorData = await mailgunResponse.json()
          errors.push(`${signature.email}: ${errorData.message || 'Unknown error'}`)
        }
      } catch (err) {
        errors.push(`${signature.email}: ${err.message}`)
      }

      // Small delay between emails to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 100))
    }

    return new Response(
      JSON.stringify({
        success: true,
        sent: sentCount,
        total: pendingFollowups.length,
        errors: errors.length > 0 ? errors : undefined
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 200 }
    )

  } catch (error) {
    console.error("Error processing follow-ups:", error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 500 }
    )
  }
})

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
        <a href="${SOCIAL_LINKS.instagram}" style="color: #666;">Instagram</a> •
        <a href="${SOCIAL_LINKS.facebook}" style="color: #666;">Facebook</a> •
        <a href="${SOCIAL_LINKS.website}" style="color: #666;">abotax.pl</a>
      </p>
      <p style="margin-top: 16px; font-size: 11px; color: #999;">
        To jednorazowy email po podpisaniu petycji. Nie będziemy wysyłać więcej wiadomości.<br>
        <a href="mailto:kontakt@abotax.pl" style="color: #999;">Kontakt</a>
      </p>
    </div>
  </div>
</body>
</html>
`
}
