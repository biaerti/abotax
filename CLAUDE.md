# AboTax — Fundusz Rekompensaty Społecznej

## Czym jest projekt
Inicjatywa obywatelska — obywatelski projekt ustawy o Funduszu Rekompensaty Społecznej. Petycja do Sejmu RP. Trzecia droga w sporze aborcyjnym: za każdy zabieg aborcyjny klinika dodaje obowiązkową opłatę solidarnościową, a 100% środków trafia na **etaty opiekunów w domach dziecka** — zmniejszamy liczbę dzieci przypadających na jednego wychowawcę. Pacjentka pozostaje anonimowa.

**Hasło:** "Życie za życie — rekompensata, nie kara"
**Model:** 98% środków → etaty opiekunów | 2% → administracja i weryfikacja
**Alokacja:** Automatyczna — Fundusz kieruje środki tam, gdzie wskaźnik dzieci/opiekun jest najgorszy

## Kluczowe liczby
- **75 903** dzieci w pieczy zastępczej (2023)
- **17 100** dzieci w domach dziecka w Polsce
- **715** porzuconych noworodków rocznie (trend wzrostowy)
- **~100 000 zł/rok** — koszt utrzymania dziecka w placówce
- **~2 140** wychowawców (wskaźnik 1:8, cel: 1:5 lub lepiej)
- **7 000 zł/miesiąc** — pełny koszt pracodawcy na etat opiekuna (~4 200-4 500 zł netto)
- **84 000 zł/rok** — roczny koszt jednego etatu
- **125 mln zł/rok** — szacowane wpływy do Funduszu (bazowy: 50K zabiegów × 2 500 zł, analogia do Czech)
- **~1 488 nowych etatów** — przy scenariuszu bazowym (125 mln zł)
- **420 000 zł/rok** — koszt jednej małej grupy rodzinnej (5 etatów × 84K)
- **~297 nowych małych grup/rok** — przy scenariuszu bazowym
- **~1 200** grup wychowawczych w Polsce (17 100 ÷ 14)
- **~1 000** domów dziecka w Polsce (szacunek wstępny)
- **Max 14 dzieci** w grupie wychowawczej (polskie prawo)
- **~11 dzieci** — średnia po AboTax (17 100 dzieci ÷ 1 497 grup po dodaniu 297 nowych)
- **1:5** — wskaźnik opieki po AboTax (2 140 + 1 488 = 3 628 opiekunów ÷ 17 100 dzieci)

## Metodologia szacunków
- Porównanie z Czechami: populacja 10,7 mln, ~15 000 legalnych aborcji/rok
- Przeliczenie proporcjonalne na Polskę (38 mln) = ~50 000 zabiegów (scenariusz bazowy)
- Mieści się między szacunkami pro-life (7-14K) a proaborcyjnymi (120-150K)
- 3 scenariusze: Minimalny (40K/100M), Umiarkowany (50K/125M), Rozszerzony (70K/175M)
- **Matematyka efektu:** 297 nowych grup → łącznie 1 497 grup → średnia 11,4 dzieci/grupę → wskaźnik 1:5

## Strategia: Model Małych Grup (nie "więcej kadry w tym samym pokoju")
- Cel: dzielenie 14-osobowych grup na 7-osobowe "rodzinki"
- 5 etatów na grupę (obsada 24/7: 2 rano, 2 popołudnie, 1 noc + urlopy/zastępstwa)
- Samorząd daje lokal (mieszkania komunalne), Fundusz opłaca kadré
- Alokacja per powiat — tam gdzie wskaźnik najgorszy

## Badania naukowe (strona Wpływ na dzieci)
- **BEIP (Bucharest Early Intervention Project)** — Nelson, Fox & Zeanah (2014), Harvard University Press — dzieci przeniesione do rodzin zastępczych vs instytucja: lepszy rozwój poznawczy, emocjonalny, przywiązanie; IQ +9 pkt
- **St. Petersburg-USA Orphanage Study** — McCall et al. (2013), Monographs of the Society for Research in Child Development — mniejsze grupy + stali opiekunowie = drastyczna poprawa we WSZYSTKICH obszarach
- **Lancet Psychiatry (2020)** — Johnson et al. (2020) — przegląd 308 badań, 68 krajów, 100 000+ dzieci; nawet "dobre" placówki ze złym wskaźnikiem kadry powodują szkody
- **Przemoc rówieśnicza** — większe grupy = więcej przemocy (40% wychowanków doświadcza bullying), mniej kontroli opiekunów

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
- **Tabele:** `petition_signatures` (główna tabela petycji)
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
- `src/pages/Home.jsx` — Landing page z HERO, How It Works (4 kroki), Stats, Transparentność
- `src/pages/About.jsx` — "Jak to działa" — 4 kroki mechanizmu (bez tokenów), przykład kalkulacji
- `src/pages/Impact.jsx` — "Analiza wpływu" — metodologia (kremowe tło osobna sekcja), Obecny stan (białe), Scenariusze+Wnioski (kremowe łącznie), CTA (navy)
- `src/pages/WplywNaRozwoj.jsx` — "Wpływ na dzieci" — stan obecny (14 dzieci/grupa), badania+przemoc (źródła z latami), 2-kolumnowy BEZ vs Z AboTax (14→11 dzieci, 1:8→1:5), "Koniec z molochami"
- `src/pages/FAQ.jsx` — FAQ (4 kategorie: O inicjatywie, Przejrzystość, Prywatność i dane, Opiekunowie i placówki)
- `src/pages/PodpiszPetycje.jsx` — Formularz petycji + wybór powodu poparcia → wyświetlenie gotowej planszy PNG
- `src/pages/ProjektUstawy.jsx` — Strona z linkiem do PDF projektu ustawy
- `src/pages/Regulamin.jsx` — Regulamin serwisu, cookies, email marketing
- `src/pages/PolitykaPrywatnosci.jsx` — Pełna polityka prywatności RODO
- `src/components/home/WhyAboTax.jsx` — 4 sekcje landing page (Problem, Słyszymy wszystkich, Odbieram szansę z wizualizacją wskaźnika 14→8, Trzecia droga)
- `src/components/ui/checkbox.jsx` — Custom checkbox (teal, kompaktowy)
- `src/lib/supabase.js` — Klient DB z metodami: db.petition.getCount/sign/subscribeToCount
- `src/Layout.jsx` — Navbar + Footer (social media linki FB/IG)
- `src/App.jsx` — Routing (Home, About, FAQ, ProjektUstawy, Impact, WplywNaRozwoj, PodpiszPetycje, GeneratorIG, Regulamin, PolitykaPrywatnosci)
- `supabase/functions/send-petition-email/index.ts` — Mailgun email templates
- `supabase/functions/send-followup-emails/index.ts` — Scheduled follow-up batch
- `supabase/migrations/20260205_add_email_tracking.sql` — Migracja email tracking
- `prompty-figma-ai/` — Prompty do Figma AI (samodzielne, 1 prompt = 1 grafika)
- `public/projekt-ustawy.pdf` — PDF projektu ustawy do pobrania
- `public/LOGO_abotax.png` — Logo z tłem
- `public/LOGO_abotax_noBG.png` — Logo bez tła (używane na planszy i w emailach)
- `public/BADANIA_NAD_ZDROWIEM_DZIECI.pdf` — PDF z badaniami nad zdrowiem dzieci
- `public/BADANIA_NAD_ZDROWIEM_DZIECI_PRZEMOC` — Dane o przemocy rówieśniczej w domach dziecka
- `public/zrodla-domow-dziecka` — Źródła i dane o domach dziecka w Polsce

## Usunięte strony (nie istnieją w routingu)
- ~~Privacy.jsx~~ — "Twoja anonimowość" (usunięta — anonimowość wyjaśniona w About i FAQ)
- ~~Transparency.jsx~~ — "Nasza transparentność" (usunięta — zastąpiona Rejestrem Etatów w Home)
- ~~HomesDirectory.jsx~~ — Katalog domów dziecka (usunięty — brak platformy dla domów)
- ~~Contribute.jsx~~ — Wpłaty (usunięty — brak tokenów/wyboru)
- ~~RegisterHome.jsx~~ — Rejestracja domu (usunięta)
- ~~Dashboard.jsx~~ — Panel (usunięty)
- ~~HomeProfile.jsx~~ — Profil domu (usunięty)

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
- **Brak tokenów** — pacjentka nie wybiera placówki, klinika odprowadza zbiorczo
- **Brak platformy dla domów** — Fundusz automatycznie alokuje tam gdzie ratio najgorsze
- **100% na etaty opiekunów** — nie kupujemy sprzętu, nie finansujemy remontów
- **Publiczny Rejestr Etatów** — ile etatów sfinansowano w każdym powiecie (docelowo)
- e-Doręczenia: adres Fundacji Destruktura AE:PL-18803-44688-HHJBV-13
- Email from: "AboTax <petycja@abotax.pl>"
- Nawigacja: Strona główna, O systemie (dropdown: Jak to działa, Analiza wpływu, Wpływ na dzieci, FAQ), Projekt ustawy
- Top bar: linki do FB i IG
- Footer: logo w kółku, linki do Regulaminu, Polityki prywatności, FAQ, Analiza wpływu, Wpływ na dzieci, FB, IG

## Plansze poparcia (Instagram)
- **Gotowe PNG** w `public/Abotax_plansze/` (7 plików):
  - `ABOTAX_KOMPROMISY.png` → "Bo wierzę w kompromisy"
  - `ABOTAX_DZIECI_ZASLUGUJA.png` → "Bo dzieci w domach dziecka zasługują na więcej"
  - `ABOTAX_KONIEC_Wojny.png` → "Bo chcę końca wojny kulturowej"
  - `ABOTAX_OBOZ.png` → "Bo nie należę do żadnego obozu"
  - `ABOTAX_STYGMATYZOWANIA.png` → "Bo mam dość stygmatyzowania"
  - `ABOTAX_DA_SIE_ROZWIAZAC.png` → "Bo to da się rozwiązać"
  - `ABOTAX_PUSTE.png` → własny powód (pusty template)
- **Na stronie:** użytkownik wybiera powód → wyświetla gotowy PNG z `/Abotax_plansze/` → pobieranie + link IG
- **W emailach:** linki do pobrania plansz prowadzą do Google Drive (direct download)
- **Mapowanie w kodzie:** `PLANSZA_MAP` w `PodpiszPetycje.jsx`, `PLANSZA_DOWNLOAD` + `PLANSZA_FILENAMES` w `send-petition-email/index.ts`
- **"Wpiszę własny powód"** → pokazuje `ABOTAX_PUSTE.png` (użytkownik wpisuje tekst na IG Story)

## Email Flow
1. **Confirmation email** (natychmiast po podpisaniu):
   - Logo AboTax w kremowym kółku w headerze (table-based centering)
   - Treść o przełomie w sporze aborcyjnym + viral jako prawdziwa siła
   - Powód poparcia w gradient-boxie
   - **Bezpośredni link do pobrania planszy** z Google Drive (direct download)
   - Instrukcja 3 kroki: Pobierz → Wrzuć na Story → Oznacz @abotax.pl
   - Jeśli własny powód → plansza pusta + info "wpisz swój powód jako tekst na IG Story"
   - Social media buttony (IG/FB) z emoji ikonkami
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
- 98% na etaty opiekunów, 2% administracja — automatyczna alokacja
- Publiczny Rejestr Etatów — transparentność wydatków
- Pacjentka w pełni anonimowa — klinika odprowadza zbiorczo
- Dane przy podpisaniu: zgodne z RODO, administrator = Fundacja Destruktura
- Usunięcie danych: email na kontakt@abotax.pl

## How It Works (4 kroki)
1. **Legalizacja aborcji** — bezpieczne zabiegi w licencjonowanych klinikach
2. **Rekompensata na fakturze** — kwota = koszt zabiegu, opcja rat/podział z partnerem
3. **Klinika odprowadza do Funduszu** — zbiorczo, bez danych osobowych pacjentek
4. **Automatyczna alokacja na etaty** — 100% na nowe etaty opiekunów, gdzie wskaźnik najgorszy

## Wiadomość sukcesu (po podpisaniu)
- Kompaktowy layout z checkmarkiem po prawej stronie
- Wybór powodu poparcia (6 predefiniowanych + "Wpiszę własny powód")
- Po wyborze → wyświetla gotową planszę PNG z `/Abotax_plansze/`
- Przyciski: Pobierz, @abotax.pl (IG), Kopiuj link, Inny powód

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

## TODO / Kolejne kroki
- [ ] Uruchomić migrację `20260205_add_email_tracking.sql` w Supabase SQL Editor
- [ ] Deploy Edge Functions: `supabase functions deploy send-petition-email send-followup-emails`
- [ ] Ustawić cron/scheduler dla `send-followup-emails` (np. codziennie o 10:00)
- [ ] Zweryfikować czy Supabase zwraca poprawny count petycji
- [ ] Docelowo: Mapa Etatów — interaktywna mapa Polski z danymi per powiat
- [x] Plansze PNG w `public/Abotax_plansze/` + Google Drive direct links w emailach
- [x] Zmiana modelu: tokeny/cele → 100% etaty opiekunów, automatyczna alokacja

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
