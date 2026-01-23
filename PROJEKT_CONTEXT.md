# AboTax - Fundusz Rekompensaty Społecznej

## CEL PROJEKTU
Stworzyć **wiralową stronę**, która wygląda jak **oficjalna strona rządowa** i przedstawia projekt ustawy o Funduszu Rekompensaty Społecznej. Ma to być trzecia droga w sporze aborcyjnym - kompromis łączący wolność z odpowiedzialnością.

**Cel wiralowy:** Strona ma wyglądać tak profesjonalnie i "rządowo", że ludzie będą ją udostępniać myśląc, że to oficjalna inicjatywa. Ma poruszać Polskę i generować dyskusję.

**Nazwa inicjatywy:** AboTax (opłata solidarnościowa)
**Nazwa funduszu:** Fundusz Rekompensaty Społecznej

---

## KONTA I DOSTĘPY

### Strona internetowa
- **Domena:** abotax.pl
- **Hosting:** LH.pl (serwer356632.lh.pl)

### Email
- **Adres:** petycja@abotax.pl
- **Serwer:** serwer356632.lh.pl
- **Login:** petycja@abotax.pl
- **Hasło:** Opodatkujmyaborcje12345!@

### Social Media
- **Instagram:** http://instagram.com/abotax.pl
- **Facebook:** https://www.facebook.com/abotaxx

### Supabase (DO SKONFIGUROWANIA)
- URL: (do uzupełnienia po utworzeniu projektu)
- Anon Key: (do uzupełnienia)
- Schema SQL: `supabase/schema.sql` - gotowy do uruchomienia

---

## MECHANIZM SYSTEMU (KLUCZOWE!)

### Model działania:
1. **Pacjentka idzie do kliniki** - korzysta z usługi medycznej
2. **Klinika wystawia fakturę z 2 pozycjami:**
   - Usługa medyczna (np. 2500 zł)
   - Opłata AboTax **100% wartości zabiegu** (np. 2500 zł)
   - **Razem: 5000 zł** (pacjentka płaci klinice)
3. **Pacjentka dostaje TOKEN SOLIDARNOŚCIOWY** - kod QR
4. **Klinika wpłaca do Funduszu** - pacjentka jest ANONIMOWA
5. **Token** pozwala pacjentce wybrać dom dziecka (**50% kwoty** może przeznaczyć na wybrany dom, reszta według potrzeb)

### Dlaczego to anonimowe?
- **Fundusz NIE WIE kim jest pacjentka** - dostaje tylko wpłatę od kliniki
- Token jest anonimowy - nie łączy się z tożsamością
- Zgodne z Art. 10, 12, 15 projektu ustawy
- **ZERO ulg podatkowych** - czysta rekompensata

---

## DANE STATYSTYCZNE (GUS 2024)

| Metryka | Wartość | Źródło |
|---------|---------|--------|
| Dzieci w domach dziecka | **17 100** | GUS |
| Opiekunów w domach dziecka | **~2 140** | Szacunek (17100/8) |
| Aktualny wskaźnik | **1:8** (1 opiekun na 8 dzieci) | GUS |
| Zalecany wskaźnik | **1:5** (max) | Standardy |
| Potrzebna liczba opiekunów | **~3 420** | Szacunek (17100/5) |
| Brakuje opiekunów | **~1 280** | Różnica |

### Szacunkowy wpływ finansowy:
| Scenariusz | Aborcje rocznie | Wpływ roczny |
|------------|-----------------|--------------|
| Niski | 40 000 | 100 mln zł |
| Średni | 50 000 | **125 mln zł** |
| Wysoki | 70 000 | 175 mln zł |

---

## CO ZOSTAŁO ZROBIONE (stan aktualny)

### Strony:
- [x] **/** - Landing page (Home.jsx) - hero, jak działa system, statystyki
- [x] **/podpiszpetycje** - Strona petycji z formularzem + sekcja ePUAP
- [x] **/projektustawy** - Treść ustawy z małym widgetem petycji
- [x] **/generatorig** - Generator obrazków na Instagram Story
- [x] **/homesdirectory** - Domy dziecka z wyjaśnieniem mechanizmu tokenu
- [x] **/about** - Jak działa system
- [x] **/privacy** - Anonimowość
- [x] **/impact** - Szacunkowy wpływ
- [x] **/dashboard** - Panel darczyńcy (historia wpłat, cele, ustawienia)
- [x] **/registerhome** - Rejestracja domu dziecka
- [x] **/homeprofile/:id** - Profil domu dziecka
- [x] **/contribute** - Formularz wpłaty rekompensaty (4-krokowy wizard)
- [x] **/transparency** - Transparentność finansowa z wykresami
- [x] **/faq** - Najczęściej zadawane pytania

### Funkcjonalności:
- [x] Scroll to top przy nawigacji
- [x] AboTax w górnym pasku (złotym kolorem)
- [x] Poprawione statystyki (17 100 dzieci / ~2 140 opiekunów)
- [x] Poprawiony opis opłaty (100% wartości zabiegu)
- [x] Generator IG Story z preset reasons + custom text
- [x] Link do generatora po podpisaniu petycji
- [x] Wyjaśnienie mechanizmu tokenu na stronie domów dziecka
- [x] Demo banner "To są przykładowe placówki"

---

## REDESIGN - NOWY STYL "OFICJALNY/RZĄDOWY"

### Założenia nowego designu:
- **Hero sekcje:** gradient `from-official-navy via-official-navy to-official-navy/90`
- **Tło stron:** `bg-official-cream` (#faf8f5)
- **Nagłówki:** `font-serif` (Source Serif Pro) + `text-official-navy`
- **Karty:** białe z `border-official-navy/10` i shadow
- **Badge:** złoty `bg-official-gold/20 text-official-gold border-official-gold/30`
- **CTA przyciski:** `bg-abotax-primary hover:bg-abotax-primary-light text-white`
- **Tabs active:** `bg-official-navy text-white`
- **Accent ikony:** `text-official-gold` lub `text-abotax-primary`
- **Sekcje info:** `bg-official-cream` z borderami
- **Gradienty CTA:** `gradient-primary` (abotax-primary → abotax-primary-light)

### CSS klasy dodane do index.css:
```css
.gradient-primary { @apply bg-gradient-to-r from-abotax-primary to-abotax-primary-light; }
.gradient-hero { @apply bg-gradient-to-br from-official-navy via-official-navy to-official-navy/90; }
```

### Strony ZAKTUALIZOWANE do nowego designu:
- [x] **Dashboard.jsx** - pełny redesign + zamiana base44 → supabase
- [x] **RegisterHome.jsx** - pełny redesign (official-navy hero, Card, Badge)
- [x] **HomeProfile.jsx** - pełny redesign + zamiana base44 → supabase + useParams()
- [x] **Contribute.jsx** - zamiana kolorów hex → Tailwind classes + base44 → supabase
- [x] **Transparency.jsx** - zamiana base44 → supabase (kolory nadal stare!)
- [x] **Home.jsx** - już był w nowym stylu
- [x] **PodpiszPetycje.jsx** - już był w nowym stylu
- [x] **ProjektUstawy.jsx** - już był w nowym stylu
- [x] **GeneratorIG.jsx** - już był w nowym stylu
- [x] **HomesDirectory.jsx** - już był w nowym stylu

### Strony DO ZAKTUALIZOWANIA (nadal stary styl z hex kolorami!):
- [ ] **About.jsx** - używa starych kolorów hex (#1A5F5A, #2D3436, #FDF6E3 itd.)
- [ ] **FAQ.jsx** - stary styl, hex kolory
- [ ] **Impact.jsx** - stary styl, hex kolory
- [ ] **Transparency.jsx** - API zamienione ale KOLORY nadal stare!
- [ ] **Privacy.jsx** - stary styl, hex kolory

### Zmiany do zrobienia w tych stronach:
1. Zamienić wszystkie hex kolory na klasy Tailwind:
   - `#1A5F5A` → `abotax-primary`
   - `#2A7A74` → `abotax-primary-light`
   - `#2D3436` → `official-navy`
   - `#FDF6E3` → `official-cream`
   - `#E8A87C` → `abotax-secondary`
   - `#95B89C` → `abotax-success`
2. Hero sekcje zmienić z teal gradientu na official-navy gradient
3. Dodać Badge z official-gold w hero
4. Nagłówki zmienić na `font-serif`
5. Karty owinąć w `<Card>` z `border-official-navy/10`

### POPRAWKI W HERO (Home.jsx):
- [ ] **Wywalić z hero:** "Projekt ustawy / Inicjatywa obywatelska" - bo to jest już w górnym pasku nad headerem
- [ ] **Hero powinien zaczynać od:** "FUNDUSZ REKOMPENSATY SPOŁECZNEJ" (główny nagłówek)
- [ ] Górny pasek już mówi "Inicjatywa obywatelska | AboTax | Projekt ustawy..." więc nie powtarzać w hero

### Supabase (gotowe do wdrożenia):
- [x] Schema SQL w `supabase/schema.sql`
- [x] Tabele: petition_signatures, childrens_homes, goals
- [x] Demo dane: 3 domy dziecka z celami
- [x] RLS policies
- [x] Klient w `src/lib/supabase.js`

### Email (gotowe do wdrożenia):
- [x] Edge Function w `supabase/functions/send-petition-email/`
- [x] Szablony HTML: confirmation, reminder, share
- [x] Konfiguracja SMTP w .env.example

---

## LEJEK VIRALOWY

### 1. Podpisanie petycji (strona /podpiszpetycje)
- Formularz: imię, nazwisko, email, miasto
- Dwie opcje: zwykła petycja + ePUAP

### 2. Po podpisaniu
- CTA: "Wygeneruj obrazek na IG Story" (gradient fioletowo-różowy)
- Kopiuj link / Udostępnij

### 3. Generator IG Story (/generatorig)
Użytkownik wybiera powód poparcia:
- "Bo wierzę w kompromisy"
- "Bo dzieci w domach dziecka zasługują na więcej"
- "Bo chcę końca wojny kulturowej"
- "Bo nie należę do żadnego obozu"
- "Bo mam dość stygmatyzowania"
- "Bo to da się rozwiązać"
- **Własny tekst** (max 60 znaków)

Wygenerowany obrazek:
- Format: 360x640 (skalowane x2 na 720x1280)
- Gradient navy->teal
- "Popieram Fundusz Rekompensaty"
- Powód w ramce
- @abotax.pl i #AboTax

### 4. Maile (do wdrożenia z Supabase)
**Mail 1 (natychmiast):**
- Podziękowanie za podpis
- Link do generatora IG
- Info o ePUAP

**Mail 2 (po kilku dniach):**
- Przypomnienie o ePUAP
- Status zbierania podpisów

---

## NASTĘPNE KROKI (po /clear)

### PRIORYTET 0 - Ujednolicenie designu:
**Komenda:** "Zaktualizuj About.jsx, FAQ.jsx, Impact.jsx, Privacy.jsx i Transparency.jsx do nowego oficjalnego designu (zamień hex kolory na klasy Tailwind, dodaj official-navy hero z Badge, font-serif nagłówki). Popraw też hero w Home.jsx - wywal 'Projekt ustawy / Inicjatywa obywatelska' bo to jest już w górnym pasku."


### PRIORYTET 1 - Supabase:
```bash
# 1. Utwórz projekt na supabase.com
# 2. Skopiuj URL i Anon Key do .env
# 3. Uruchom schema.sql w SQL Editor
# 4. Włącz Realtime dla petition_signatures
```

**Komenda:** "Skonfiguruj Supabase - mam URL i klucz: [wklej]"

### PRIORYTET 2 - Maile:
```bash
# 1. Deploy Edge Function
supabase functions deploy send-petition-email

# 2. Ustaw secrets
supabase secrets set SMTP_HOST=serwer356632.lh.pl
supabase secrets set SMTP_USER=petycja@abotax.pl
supabase secrets set SMTP_PASS=Opodatkujmyaborcje12345!@
```

**Komenda:** "Połącz wysyłkę maili z formularzem petycji"

### PRIORYTET 3 - Integracja:
- [ ] Podłącz formularz petycji do Supabase (insert)
- [ ] Real-time licznik podpisów
- [ ] Wysyłka maila po podpisaniu
- [ ] Walidacja email (confirmation token)

**Komenda:** "Połącz formularz petycji z Supabase i włącz real-time licznik"

### PRIORYTET 4 - Deploy:
- [ ] Build produkcyjny
- [ ] Upload na LH.pl
- [ ] Skonfiguruj domenę abotax.pl

**Komenda:** "Przygotuj build produkcyjny do deployu na LH.pl"

---

## PROMPT DO FIGMA AI

```
Stwórz design na Instagram Story (1080x1920px) dla inicjatywy obywatelskiej "AboTax - Fundusz Rekompensaty Społecznej".

Styl:
- Oficjalny, rządowy look
- Kolory: granat (#1a365d), złoty (#c9a227), teal (#1A5F5A)
- Font: serif dla nagłówków, sans-serif dla body
- Profesjonalny ale przystępny

Elementy:
1. Nagłówek: "Popieram AboTax"
2. Podtytuł: "Fundusz Rekompensaty Społecznej"
3. Miejsce na tekst (duże, wyraźne): "[Tu wpisz dlaczego popierasz]"
4. Ikonka wagi jako symbol równowagi
5. Na dole: "abotax.pl" i "#AboTax"
6. Delikatne tło z gradientem navy->teal

Warianty do wygenerowania:
- Wersja z pustym polem na własny tekst
- Wersja z tekstem: "Bo wierzę w kompromisy"
- Wersja z tekstem: "Bo dzieci w domach dziecka zasługują na więcej"
- Wersja z tekstem: "Bo chcę końca wojny kulturowej"
```

---

## STRUKTURA PLIKÓW

```
c:/AboTax/
├── public/
│   └── projekt-ustawy.pdf
├── src/
│   ├── components/
│   │   ├── home/
│   │   │   ├── WhyAboTax.jsx      # Sekcja "Dlaczego Fundusz"
│   │   │   ├── HowItWorks.jsx     # Jak działa system
│   │   │   ├── ImpactDashboard.jsx # Statystyki
│   │   │   └── HomeCard.jsx       # Karta domu dziecka
│   │   ├── ui/                     # Shadcn components (30+)
│   │   │   └── ImpactCounter.jsx  # Animowany licznik
│   │   └── DemoBanner.jsx         # Banner "przykładowe dane"
│   ├── lib/
│   │   └── supabase.js            # Klient Supabase (db.homes, db.goals, db.contributions, db.petition)
│   ├── utils/
│   │   ├── createPageUrl.js       # Generowanie URL stron
│   │   └── index.js
│   ├── pages/
│   │   ├── Home.jsx               # Landing page (NOWY DESIGN)
│   │   ├── PodpiszPetycje.jsx     # Strona petycji (NOWY DESIGN)
│   │   ├── ProjektUstawy.jsx      # Treść ustawy (NOWY DESIGN)
│   │   ├── GeneratorIG.jsx        # Generator IG Story (NOWY DESIGN)
│   │   ├── HomesDirectory.jsx     # Domy dziecka (NOWY DESIGN)
│   │   ├── Dashboard.jsx          # Panel darczyńcy (NOWY DESIGN)
│   │   ├── RegisterHome.jsx       # Rejestracja domu (NOWY DESIGN)
│   │   ├── HomeProfile.jsx        # Profil domu (NOWY DESIGN)
│   │   ├── Contribute.jsx         # Wpłata rekompensaty (NOWY DESIGN)
│   │   ├── About.jsx              # ⚠️ STARY STYL - do aktualizacji
│   │   ├── FAQ.jsx                # ⚠️ STARY STYL - do aktualizacji
│   │   ├── Impact.jsx             # ⚠️ STARY STYL - do aktualizacji
│   │   ├── Transparency.jsx       # ⚠️ STARY STYL (kolory) - do aktualizacji
│   │   └── Privacy.jsx            # ⚠️ STARY STYL - do aktualizacji
│   ├── Layout.jsx                 # Nawigacja + footer
│   ├── App.jsx                    # Routing (13 routes)
│   └── index.css                  # Tailwind + .gradient-primary + .gradient-hero
├── supabase/
│   ├── schema.sql                 # Tabele + demo dane
│   └── functions/
│       └── send-petition-email/   # Edge function do maili
├── tailwind.config.js             # Custom colors: official-*, abotax-*
├── PROJEKT_CONTEXT.md             # Ten plik
└── package.json
```

---

## DESIGN - PALETA KOLORÓW

```css
/* Tailwind config */
official-navy: #1a365d    /* Główny granat rządowy */
official-gold: #c9a227    /* Złote akcenty (godło, AboTax) */
official-red: #dc2626     /* Czerwień polska */
official-cream: #faf8f5   /* Tło urzędowe */

abotax-primary: #1A5F5A   /* Teal - główny kolor CTA */
abotax-secondary: #E8A87C /* Ciepły pomarańcz */
abotax-success: #95B89C   /* Zieleń sukcesu */
```

---

## URUCHOMIENIE

```bash
cd c:/AboTax
npm install
npm run dev
```

Aplikacja: http://localhost:5173

---

## NOTATKI

- **AboTax** = nazwa opłaty solidarnościowej (chwytliwa, do viralowania)
- **Fundusz Rekompensaty Społecznej** = oficjalna nazwa funduszu w ustawie
- Strona: abotax.pl
- 50% kwoty pacjentka może przeznaczyć na wybrany dom dziecka (przez token)
- Pozostałe 50% rozdzielane według potrzeb
- Token służy redukcji poczucia winy - widzisz gdzie idą pieniądze
- Górny pasek: "Inicjatywa obywatelska | **AboTax** | Projekt ustawy o Funduszu Rekompensaty Społecznej"
