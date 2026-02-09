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
- **Deploy:** Vercel (auto-deploy z GitHub)
- **Repo:** https://github.com/biaerti/abotax

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
- `src/pages/Home.jsx` — Landing page z HERO
- `src/pages/PodpiszPetycje.jsx` — Formularz petycji + generator planszy poparcia (kwadrat 1080x1080)
- `src/pages/Regulamin.jsx` — Regulamin serwisu, cookies, email marketing
- `src/pages/PolitykaPrywatnosci.jsx` — Pełna polityka prywatności RODO
- `src/pages/Privacy.jsx` — Strona "Twoja anonimowość" (wyjaśnienie mechanizmu)
- `src/pages/Transparency.jsx` — Przejrzystość (dane przykładowe z oznaczeniami)
- `src/pages/FAQ.jsx` — FAQ (4 kategorie: O inicjatywie, Przejrzystość, Prywatność, Domy dziecka)
- `src/components/ui/checkbox.jsx` — Custom checkbox (teal, kompaktowy)
- `src/lib/supabase.js` — Klient DB z metodami: db.petition.getCount/sign/subscribeToCount
- `src/Layout.jsx` — Navbar + Footer (social media linki FB/IG)
- `supabase/functions/send-petition-email/index.ts` — Mailgun email templates
- `supabase/functions/send-followup-emails/index.ts` — Scheduled follow-up batch
- `supabase/migrations/20260205_add_email_tracking.sql` — Migracja email tracking
- `prompty-figma-ai/` — Prompty do Figma AI (samodzielne, 1 prompt = 1 grafika)
- `prompty-figma-ai/01-baza-wiedzy.txt` — Plik referencyjny z pełną wiedzą o projekcie (dla Claude)
- `prompty-figma-ai/post-XX-*/` — Foldery postów (prompt-instagram.txt, prompt-facebook.txt, tekst-opis-*.txt)
- `public/projekt-ustawy.pdf` — PDF projektu ustawy do pobrania
- `public/LOGO_abotax.png` — Logo z tłem
- `public/LOGO_abotax_noBG.png` — Logo bez tła (używane na planszy i w emailach)

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
- Top bar: linki do FB i IG (zamiast gov.pl)
- Footer: logo w kółku, linki do Regulaminu, FB, IG

## Plansze poparcia (Instagram)
- **Gotowe PNG** hostowane na `abotax.pl/plansze/` (7 plików):
  - `ABOTAX_KOMPROMISY.png` → "Bo wierzę w kompromisy"
  - `ABOTAX_DZIECI_ZASLUGUJA.png` → "Bo dzieci w domach dziecka zasługują na więcej"
  - `ABOTAX_KONIEC_Wojny.png` → "Bo chcę końca wojny kulturowej"
  - `ABOTAX_OBOZ.png` → "Bo nie należę do żadnego obozu"
  - `ABOTAX_STYGMATYZOWANIA.png` → "Bo mam dość stygmatyzowania"
  - `ABOTAX_DA_SIE_ROZWIAZAC.png` → "Bo to da się rozwiązać"
  - `ABOTAX_PUSTE.png` → własny powód (pusty template)
- **Mapowanie w kodzie:** `PLANSZA_MAP` w `send-petition-email/index.ts` + `reasonId` z `PodpiszPetycje.jsx`
- **Generowanie lokalne (legacy):** html2canvas → dataURL → pobieranie PNG (nadal działa na stronie)

## Email Flow
1. **Confirmation email** (natychmiast po podpisaniu):
   - Logo AboTax w kremowym kółku w headerze
   - Treść o przełomie w sporze aborcyjnym + viral jako prawdziwa siła
   - Powód poparcia w gradient-boxie
   - **Bezpośredni link do pobrania planszy** (na sztywno z `abotax.pl/plansze/`) z atrybutem `download`
   - Instrukcja 3 kroki: Pobierz → Wrzuć na Story → Oznacz @abotax.pl
   - Jeśli własny powód → plansza pusta + info "wpisz swój powód jako tekst na IG Story"
   - Social media buttony (IG/FB)
   - e-Doręczenia (mniejszy blok na dole)
2. **Follow-up email** (24h później, jednorazowy):
   - Zachęta do obserwowania social media
   - Ochrona przed duplikatami (followup_sent_at check)
   - Trigger: cron wywołuje `send-followup-emails` function

## FAQ - Kluczowe pytania
- Rekompensata jest **obowiązkowa** przy każdym zabiegu (nie dobrowolna)
- Kwota = koszt zabiegu ("życie za życie" - symboliczna równowaga)
- Możliwość rozłożenia na **3, 6 lub 12 rat**
- Opcja **"Podziel z partnerem 50/50"** (wspólna odpowiedzialność)
- Dane przy podpisaniu: zgodne z RODO, administrator = Fundacja Destruktura
- Usunięcie danych: email na kontakt@abotax.pl

## Wiadomość sukcesu (po podpisaniu)
- Kompaktowy layout z checkmarkiem po prawej stronie
- Wybór powodu poparcia (predefiniowane + własny tekst)
- Automatyczne generowanie planszy po wyborze powodu

## Prompty Figma AI — Struktura
Każdy post ma własny folder w `prompty-figma-ai/`:
```
post-XX-nazwa/
  prompt-instagram.txt    ← 1 prompt = karuzela IG (samodzielny, ze stylem)
  prompt-facebook.txt     ← 1 prompt = obraz FB (samodzielny, ze stylem)
  tekst-opis-instagram.txt ← opis pod post IG + hashtagi
  tekst-opis-facebook.txt  ← tekst posta FB (dłuższy)
```
- Prompty są samodzielne — styl wbudowany w 2 linijkach (nie trzeba wklejać osobnego pliku)
- `01-baza-wiedzy.txt` — plik referencyjny dla Claude (filozofia, argumenty, mechanizm)
- **Posty:** 01-czym-jest-abotax, 02-jak-dziala-system, 03-17100-dzieci, 04-125mln-rocznie, 05-anonimowosc, 06-trzecia-droga

## TODO / Kolejne kroki
- [ ] Uruchomić migrację `20260205_add_email_tracking.sql` w Supabase SQL Editor
- [ ] Deploy Edge Functions: `supabase functions deploy send-petition-email send-followup-emails`
- [ ] Ustawić cron/scheduler dla `send-followup-emails` (np. codziennie o 10:00)
- [ ] Zweryfikować czy Supabase zwraca poprawny count petycji
- [ ] Upewnić się że plansze PNG są na serwerze w `abotax.pl/plansze/`

## Uruchomienie lokalne
```bash
npm install
npm run dev
```

## Deploy
```bash
# Frontend (automatyczny po git push)
git add .
git commit -m "opis zmian"
git push origin main

# Edge Functions (ręcznie)
supabase functions deploy send-petition-email
supabase functions deploy send-followup-emails
```
