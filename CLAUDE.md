# AboTax — Fundusz Rekompensaty Społecznej

## Czym jest projekt
Inicjatywa obywatelska — obywatelski projekt ustawy o Funduszu Rekompensaty Społecznej. Petycja do Sejmu RP. Trzecia droga w sporze aborcyjnym: za każdy zabieg aborcyjny klinika dodaje opłatę solidarnościową, a 100% trafia do domów dziecka. Pacjentka pozostaje anonimowa.

**Hasło:** "Życie za życie — rekompensata, nie kara"
**Wartości:** Twoja anonimowość, nasza transparentność

## Stack technologiczny
- **Frontend:** React 18 + Vite + TypeScript/JSX
- **Styling:** Tailwind CSS (custom colors: official-navy, official-gold, abotax-primary, etc.)
- **UI:** Radix UI / Shadcn components (`src/components/ui/`)
- **Animacje:** Framer Motion
- **Routing:** React Router v6
- **Backend:** Supabase (Postgres + Edge Functions + Realtime)
- **Email:** Mailgun API (via Supabase Edge Functions)
- **Deploy:** Vercel

## Supabase
- **Projekt:** `uiljtfusyuwyfljkmnkm.supabase.co`
- **Klient:** `src/lib/supabase.js` — eksportuje `supabase` i `db` (helpers)
- **Tabele:** `petition_signatures`, `childrens_homes`, `goals`, `contributions`, `home_updates`
- **Edge Functions:**
  - `send-petition-email/` — wysyłka emaili (confirmation, followup, share)
  - `send-followup-emails/` — scheduled batch wysyłka follow-up 24h po podpisaniu
- **Secrets:** MAILGUN_API_KEY, MAILGUN_DOMAIN, MAILGUN_REGION, SUPABASE_SERVICE_ROLE_KEY
- **Kolumny email tracking w petition_signatures:**
  - `confirmation_sent_at` — timestamp potwierdzenia
  - `followup_scheduled` — czy follow-up zaplanowany
  - `followup_sent_at` — timestamp follow-up (null = nie wysłano)

## Social Media
- **Instagram:** @abotax.pl → https://instagram.com/abotax.pl
- **Facebook:** https://facebook.com/abotaxx
- **Website:** https://abotax.pl

## Kluczowe pliki
- `src/pages/Home.jsx` — Landing page z HERO (bez badge "Inicjatywa obywatelska")
- `src/pages/PodpiszPetycje.jsx` — Formularz petycji + generator planszy poparcia
- `src/pages/Regulamin.jsx` — Regulamin serwisu, cookies, email marketing
- `src/pages/Privacy.jsx` — Anonimowość + RODO (administrator: Fundacja Destruktura)
- `src/pages/FAQ.jsx` — FAQ (5 kategorii, bez wolontariatu)
- `src/components/ui/checkbox.jsx` — Custom checkbox (teal, większy, widoczny)
- `src/lib/supabase.js` — Klient DB z metodami: db.petition.getCount/sign/subscribeToCount
- `supabase/functions/send-petition-email/index.ts` — Mailgun email templates
- `supabase/functions/send-followup-emails/index.ts` — Scheduled follow-up batch
- `supabase/migrations/20260205_add_email_tracking.sql` — Migracja email tracking
- `prompty-figma-ai/` — Prompty do Figma AI (style, IG story, plansze, posty)
- `prompty-figma-ai/06-plansza-poparcia.txt` — PIONOWY format 1080x1920px (Instagram Story)
- `public/projekt-ustawy.pdf` — PDF projektu ustawy do pobrania
- `public/LOGO_abotax.png` — Nowe logo (waga + dziecko + półksiężyc)

## Paleta kolorów (tailwind.config.js)
- `official-navy: #1a365d` — główny granat
- `official-gold: #c9a227` — złote akcenty
- `official-cream: #faf8f5` — tło
- `abotax-primary: #1A5F5A` — teal CTA
- `abotax-secondary: #E8A87C` — ciepły pomarańcz
- `abotax-success: #95B89C` — zieleń

## Konwencje
- Styl: "oficjalny/rządowy" — gradient navy, serif nagłówki, złote badge'e
- Dane petycji: z realnej bazy Supabase (db.petition.getCount + subscribeToCount)
- Wolontariat: usunięty z FAQ i koncepcji
- Domy dziecka: na etapie budowania sieci, możliwość zgłoszenia do pilotażu
- e-Doręczenia: adres Fundacji Destruktura AE:PL-18803-44688-HHJBV-13
- Email from: "AboTax <petycja@abotax.pl>"
- Navbar dropdown "Wartości": "Nasza transparentność" → Transparency, "Twoja anonimowość" → Privacy

## Email Flow
1. **Confirmation email** (natychmiast po podpisaniu):
   - Podziękowanie + powód poparcia
   - Linki do IG/FB
   - CTA: wygeneruj planszę, e-Doręczenia
2. **Follow-up email** (24h później, jednorazowy):
   - Zachęta do obserwowania social media
   - Ochrona przed duplikatami (followup_sent_at check)
   - Trigger: cron wywołuje `send-followup-emails` function

## TODO / Kolejne kroki
- [ ] Uruchomić migrację `20260205_add_email_tracking.sql` w Supabase SQL Editor
- [ ] Deploy Edge Functions: `supabase functions deploy send-petition-email send-followup-emails`
- [ ] Ustawić cron/scheduler dla `send-followup-emails` (np. codziennie o 10:00)
- [ ] Usunąć tło z logo (użyć remove.bg lub podobnego)
- [ ] Zweryfikować czy Supabase zwraca poprawny count petycji (jeśli 0, sprawdzić dane w bazie)

## Uruchomienie
```bash
npm install
npm run dev
```

## Deploy Edge Functions
```bash
supabase functions deploy send-petition-email
supabase functions deploy send-followup-emails
```
