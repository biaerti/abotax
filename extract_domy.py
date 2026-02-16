#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Extract children's homes data from all source files in Domy dziecka/ folder.
Creates a consolidated CSV with data from all 16 voivodeships.
"""
import sys, io
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

import pandas as pd
import pdfplumber
from docx import Document
import olefile
import re
import os

base = "Domy dziecka"
all_records = []

def clean(s):
    if s is None or (isinstance(s, float) and pd.isna(s)):
        return ""
    s = str(s).strip()
    s = re.sub(r'\n+', ' ', s)
    s = re.sub(r'\s{2,}', ' ', s)
    return s

def extract_email(text):
    if not text:
        return ""
    m = re.search(r'[\w.+-]+@[\w.-]+\.\w+', str(text))
    return m.group(0) if m else ""

def extract_kod(text):
    if not text:
        return ""
    m = re.search(r'(\d{2}-?\s?\d{3})', str(text))
    if m:
        return m.group(1).replace(' ', '').replace('-', '-')
    return ""

def add_record(woj, powiat, nazwa, typ, pub_niepub, adres, kod, miasto, tel, email, miejsca, dyrektor, organ, zrodlo, data_stanu):
    all_records.append({
        'wojewodztwo': clean(woj),
        'powiat': clean(powiat),
        'nazwa_placowki': clean(nazwa),
        'typ_placowki': clean(typ),
        'publiczna_niepubliczna': clean(pub_niepub),
        'adres': clean(adres),
        'kod_pocztowy': clean(kod),
        'miejscowosc': clean(miasto),
        'telefon': clean(tel),
        'email': clean(email),
        'liczba_miejsc': clean(miejsca),
        'dyrektor': clean(dyrektor),
        'organ_prowadzacy': clean(organ),
        'zrodlo_danych': clean(zrodlo),
        'data_stanu': clean(data_stanu),
    })

# ============================================================
# 1. DOLNOSLASKIE - REJESTR_POW_31_12_2024 (1).xls
# ============================================================
print("1. Processing: dolnoslaskie...")
f = os.path.join(base, "REJESTR_POW_31_12_2024 (1).xls")
df = pd.read_excel(f)
df_clean = df.dropna(subset=[df.columns[0]])
typ_map = {'S': 'socjalizacyjna', 'I': 'interwencyjna', 'R': 'rodzinna', 'St': 'specjalistyczno-terapeutyczna'}
for _, row in df_clean.iterrows():
    typ_raw = clean(row.iloc[3])
    typ = typ_map.get(typ_raw, typ_raw)
    pub = 'publiczna' if clean(row.iloc[4]) == 'P' else ('niepubliczna' if clean(row.iloc[4]) == 'NP' else clean(row.iloc[4]))
    add_record(
        woj='dolnoslaskie', powiat=row.iloc[2], nazwa=row.iloc[1],
        typ=typ, pub_niepub=pub, adres=row.iloc[7], kod=row.iloc[5],
        miasto=row.iloc[6], tel=row.iloc[8], email=row.iloc[13],
        miejsca=row.iloc[9], dyrektor=row.iloc[10], organ=row.iloc[11],
        zrodlo='REJESTR_POW_31_12_2024.xls', data_stanu='2024-12-31'
    )
print(f"   -> {len([r for r in all_records if r['wojewodztwo']=='dolnoslaskie'])} records")

# ============================================================
# 2. MAZOWIECKIE - Wykaz adresowy_placowek...xls
# ============================================================
print("2. Processing: mazowieckie...")
f = os.path.join(base, "Wykaz adresowy_plac\u00f3wek_opieku\u0144czo-wychowawczych,_regionalnych_plac\u00f3wek_opieku\u0144czo-terapeutycznych,_interwencyjnych_o\u015brodk\u00f3w preadopcyjnych.xls")
df = pd.read_excel(f, header=None)
header_idx = None
for i in range(len(df)):
    if str(df.iloc[i, 0]).strip() == 'Lp.':
        header_idx = i
        break

current_typ_section = ""
count_before = len(all_records)
if header_idx is not None:
    for i in range(header_idx + 1, len(df)):
        row = df.iloc[i]
        lp = clean(row.iloc[0])
        col1 = clean(row.iloc[1])

        # Section headers
        if not lp and col1:
            upper = col1.upper()
            if 'SOCJALIZACYJ' in upper:
                current_typ_section = 'socjalizacyjna'
            elif 'INTERWENCYJN' in upper:
                current_typ_section = 'interwencyjna'
            elif 'RODZINN' in upper:
                current_typ_section = 'rodzinna'
            elif 'SPECJALIST' in upper:
                current_typ_section = 'specjalistyczno-terapeutyczna'
            elif 'REGIONALN' in upper or 'TERAPEUTY' in upper:
                current_typ_section = 'opiekunczo-terapeutyczna'
            elif 'PREADOPCYJ' in upper:
                current_typ_section = 'preadopcyjny'
            continue

        if not lp or not re.match(r'\d', lp):
            continue

        nazwa = clean(row.iloc[1])
        adres = clean(row.iloc[2])
        email_raw = clean(row.iloc[3])
        tel = clean(row.iloc[4])
        miejsca = clean(row.iloc[5])
        powiat = clean(row.iloc[6])
        dyrektor = clean(row.iloc[8]) if len(row) > 8 else ""
        pub = 'niepubliczna' if 'N' in lp else 'publiczna'
        kod = extract_kod(adres)

        add_record(
            woj='mazowieckie', powiat=powiat, nazwa=nazwa, typ=current_typ_section,
            pub_niepub=pub, adres=adres, kod=kod, miasto='', tel=tel,
            email=email_raw, miejsca=miejsca, dyrektor=dyrektor, organ='',
            zrodlo='Wykaz_adresowy_placowek_mazowieckie.xls', data_stanu='2025-11-07'
        )
print(f"   -> {len(all_records) - count_before} records")

# ============================================================
# 3. SLASKIE - Rejestr instytucjonalnej pieczy zastepczej 04.2021.xls
# ============================================================
print("3. Processing: slaskie...")
f = os.path.join(base, "Rejestr instytucjonalnej pieczy zast\u0119pczej 04.2021.xls")
df = pd.read_excel(f)
df_clean = df.dropna(subset=[df.columns[0]])
count_before = len(all_records)
typ_map2 = {'s': 'socjalizacyjna', 'i': 'interwencyjna', 'r': 'rodzinna', 's+i': 'socjalizacyjna+interwencyjna', 'st': 'specjalistyczno-terapeutyczna'}
for _, row in df_clean.iterrows():
    typ_raw = clean(row.iloc[6]).lower()
    typ = typ_map2.get(typ_raw, typ_raw)
    adres = clean(row.iloc[3])
    kod = extract_kod(adres)
    add_record(
        woj='slaskie', powiat=row.iloc[1], nazwa=row.iloc[2], typ=typ,
        pub_niepub='', adres=adres, kod=kod, miasto='', tel=row.iloc[4],
        email=row.iloc[5], miejsca=row.iloc[9], dyrektor='', organ='',
        zrodlo='Rejestr_pieczy_slaskie_04.2021.xls', data_stanu='2021-04'
    )
print(f"   -> {len(all_records) - count_before} records")

# ============================================================
# 4. OPOLSKIE - meldunki_za_listopad.xlsx
# ============================================================
print("4. Processing: opolskie...")
f = os.path.join(base, "meldunki_za_listopad.xlsx")
df = pd.read_excel(f)
df_clean = df.dropna(subset=[df.columns[0]])
count_before = len(all_records)
for _, row in df_clean.iterrows():
    adres = clean(row.iloc[2])
    kod = extract_kod(adres)
    email = extract_email(adres)
    add_record(
        woj='opolskie', powiat='', nazwa=row.iloc[1],
        typ=clean(row.iloc[5]) if len(row) > 5 else '', pub_niepub='',
        adres=adres, kod=kod, miasto='', tel=clean(row.iloc[3]) if len(row) > 3 else '',
        email=email, miejsca=clean(row.iloc[6]) if len(row) > 6 else '',
        dyrektor=clean(row.iloc[4]) if len(row) > 4 else '', organ='',
        zrodlo='meldunki_za_listopad_opolskie.xlsx', data_stanu='2024-11'
    )
print(f"   -> {len(all_records) - count_before} records")

# ============================================================
# 5. KUJAWSKO-POMORSKIE - Rejestr placowek.docx
# ============================================================
print("5. Processing: kujawsko-pomorskie...")
f = os.path.join(base, "Rejestr plac\u00f3wek.docx")
doc = Document(f)
count_before = len(all_records)

for table in doc.tables:
    current_section_typ = ""
    for i, row in enumerate(table.rows):
        cells = [c.text.strip() for c in row.cells]

        # Check section headers
        if cells[0] and ('PLACÓWKI' in cells[0].upper() or 'PLACOWKI' in cells[0].upper()):
            upper = cells[0].upper()
            if 'INTERWENCYJN' in upper:
                current_section_typ = 'interwencyjna'
            elif 'SOCJALIZACYJ' in upper:
                current_section_typ = 'socjalizacyjna'
            elif 'RODZINN' in upper:
                current_section_typ = 'rodzinna'
            elif 'SPECJALIST' in upper:
                current_section_typ = 'specjalistyczno-terapeutyczna'
            continue

        # Header rows
        if 'Lp.' in cells[0] or 'Nazwa' in cells[0]:
            continue

        # Skip empty rows
        if not cells[0] and not cells[1]:
            continue

        # Data rows - try to find Lp number
        lp_match = re.match(r'\d+', cells[0])
        if not lp_match and not cells[1]:
            continue

        nazwa = cells[1] if len(cells) > 1 else ""
        # Cells might be merged differently
        if len(cells) >= 7:
            tel = cells[3] if len(cells) > 3 else ""
            miejsca = cells[4] if len(cells) > 4 else ""
            organ = cells[5] if len(cells) > 5 else ""
        else:
            tel = ""
            miejsca = ""
            organ = ""

        if nazwa:
            adres_text = cells[2] if len(cells) > 2 else ""
            kod = extract_kod(nazwa + " " + adres_text)
            email = extract_email(nazwa + " " + adres_text + " " + tel)

            add_record(
                woj='kujawsko-pomorskie', powiat='', nazwa=nazwa,
                typ=current_section_typ, pub_niepub='', adres=adres_text,
                kod=kod, miasto='', tel=tel, email=email,
                miejsca=miejsca, dyrektor='', organ=organ,
                zrodlo='Rejestr_placowek_kujawsko-pomorskie.docx', data_stanu='2021-05-28'
            )
print(f"   -> {len(all_records) - count_before} records")

# ============================================================
# 6. PODKARPACKIE - Wykaz-POW.doc
# ============================================================
print("6. Processing: podkarpackie...")
f = os.path.join(base, "Wykaz-POW.doc")
count_before = len(all_records)

ole = olefile.OleFileIO(f)
data = ole.openstream('WordDocument').read()
decoded = data.decode('utf-16le', errors='ignore')
readable = re.sub(r'[^\x20-\x7e\u0080-\u024f\n\r\t]', ' ', decoded)
readable = re.sub(r'\s{3,}', '\n', readable)

# Find start of data
start_idx = readable.find('1. Dom Dziecka')
if start_idx < 0:
    start_idx = readable.find('1. ')
text = readable[start_idx:]

# Remove the column header "1. 2. 3. 4. 5. 6. 7."
text = re.sub(r'1\.\s+2\.\s+3\.\s+4\.\s+5\.\s+6\.\s+7\.', '', text, count=1)

# Split by lookahead for entry number + capital letter
raw_entries = re.split(r'(?=(?:^|\s)\d+\.\s+[A-ZĄĆĘŁŃÓŚŹŻ])', text)

for entry_raw in raw_entries:
    entry_raw = entry_raw.strip()
    if not entry_raw:
        continue

    # Check entry starts with a number
    num_match = re.match(r'(\d+)\.\s+(.*)', entry_raw, re.DOTALL)
    if not num_match:
        continue

    full_text = num_match.group(2).strip()
    full_text = re.sub(r'\s+', ' ', full_text)

    # Skip if too short
    if len(full_text) < 10:
        continue

    # Extract nazwa - everything before first address pattern
    nazwa_match = re.match(r'^(.+?)(?:\s*ul\.\s|,?\s*\d{2}-\d{3}|\s*Aleja\s)', full_text)
    if nazwa_match:
        nazwa = nazwa_match.group(1).strip()
    else:
        # Take text before Powiat or Zgromadzenie
        nazwa_match2 = re.match(r'^(.+?)(?:\s+Powiat\s|\s+Zgromadzenie\s|\s+Gmina\s|\s+Stowarzyszenie\s|\s+Towarzystwo\s)', full_text)
        if nazwa_match2:
            nazwa = nazwa_match2.group(1).strip()
        else:
            nazwa = full_text[:100]

    if not nazwa or len(nazwa) < 3:
        continue

    kod = extract_kod(full_text)
    email = extract_email(full_text)
    tel_match = re.search(r'tel\.?:?\s*([\d\s-]+)', full_text)
    tel = tel_match.group(1).strip() if tel_match else ""

    # Extract miejsca - look for standalone number 8-14 near type
    miejsca = ""
    miejsca_match = re.search(r'(?:Socjalizacyjna|Interwencyjna|Rodzinna|terapeutyczna)\s+(\d+)', full_text)
    if miejsca_match:
        miejsca = miejsca_match.group(1)
    else:
        # Try to find the total: a number like 14, 12, 8 near tel.:
        miejsca_match2 = re.search(r'\s(\d{1,2})\s+tel\.', full_text)
        if miejsca_match2:
            miejsca = miejsca_match2.group(1)

    typ = ""
    entry_lower = full_text.lower()
    if 'socjalizacyjn' in entry_lower:
        typ = 'socjalizacyjna'
    if 'interwencyjn' in entry_lower:
        typ = ('socjalizacyjna+interwencyjna' if typ else 'interwencyjna')
    if 'rodzinn' in entry_lower:
        typ = 'rodzinna'
    if 'specjalist' in entry_lower or 'terapeuty' in entry_lower:
        typ = typ + '+specjalistyczno-terapeutyczna' if typ else 'specjalistyczno-terapeutyczna'

    # Try extracting powiat
    powiat_match = re.search(r'Powiat\s+(\w+)', full_text)
    powiat = powiat_match.group(1) if powiat_match else ""

    add_record(
        woj='podkarpackie', powiat=powiat, nazwa=nazwa, typ=typ, pub_niepub='',
        adres='', kod=kod, miasto='', tel=tel, email=email,
        miejsca=miejsca, dyrektor='', organ='',
        zrodlo='Wykaz-POW_podkarpackie.doc', data_stanu=''
    )
print(f"   -> {len(all_records) - count_before} records")

# ============================================================
# 7. WARMINSKO-MAZURSKIE - Rejestr_Wolnych_miejsc_XII2024.xlsx
# ============================================================
print("7. Processing: warminsko-mazurskie...")
f = os.path.join(base, "Rejestr_Wolnych_miejsc_XII2024.xlsx")
df = pd.read_excel(f, header=None)
count_before = len(all_records)
current_powiat = ""

for i in range(len(df)):
    row = df.iloc[i]
    col0 = clean(row.iloc[0])
    col1 = clean(row.iloc[1])

    # Check for powiat header (standalone text in col0, no data in other cols)
    if col0 and 'Powiat' in col0 and not col1:
        current_powiat = col0
        continue

    # Check if this is a data row (col0 is a number)
    if col0 and re.match(r'^\d+$', col0):
        nazwa = col1
        organ = clean(row.iloc[2])
        typ = clean(row.iloc[3])
        miejsca = clean(row.iloc[4])
        wolne = clean(row.iloc[5])

        # Extract details from nazwa
        kod = extract_kod(nazwa)
        email = extract_email(nazwa)
        tel_match = re.search(r'tel\.?\s*([\d\s-]+)', str(nazwa))
        tel = tel_match.group(1).strip() if tel_match else ""

        add_record(
            woj='warminsko-mazurskie', powiat=current_powiat, nazwa=nazwa,
            typ=typ, pub_niepub='', adres='', kod=kod, miasto='',
            tel=tel, email=email, miejsca=miejsca, dyrektor='', organ=organ,
            zrodlo='Rejestr_Wolnych_miejsc_XII2024_warminsko-mazurskie.xlsx', data_stanu='2024-12'
        )
print(f"   -> {len(all_records) - count_before} records")

# ============================================================
# 8. LUBUSKIE - Rejestr wolnych miejsc...30 czerwca 2025.pdf
# ============================================================
print("8. Processing: lubuskie...")
f = os.path.join(base, "Rejestr wolnych miejsc w plac\u00f3wkach opieku\u0144czo-wychowawczych - stan na 30 czerwca 2025 r.pdf")
count_before = len(all_records)
with pdfplumber.open(f) as pdf:
    for page in pdf.pages:
        tables = page.extract_tables()
        for table in tables:
            for row in table:
                if not row or not row[0]:
                    continue
                if row[0].strip() == 'L.p.' or row[0].strip() == 'Lp.':
                    continue
                if re.match(r'^\d+$', row[0].strip()):
                    # This is a data row
                    nazwa = clean(row[3]) if len(row) > 3 else ""
                    typ = clean(row[4]) if len(row) > 4 else ""
                    miejsca = clean(row[5]) if len(row) > 5 else ""
                    powiat = clean(row[1]) if len(row) > 1 else ""
                    dyrektor = clean(row[7]) if len(row) > 7 else ""
                    organ = clean(row[9]) if len(row) > 9 else ""

                    if nazwa:
                        add_record(
                            woj='lubuskie', powiat=powiat, nazwa=nazwa,
                            typ=typ, pub_niepub='', adres='', kod=extract_kod(nazwa),
                            miasto='', tel='', email=extract_email(nazwa),
                            miejsca=miejsca, dyrektor=dyrektor, organ=organ,
                            zrodlo='Rejestr_wolnych_miejsc_lubuskie_2025-06.pdf', data_stanu='2025-06-30'
                        )
print(f"   -> {len(all_records) - count_before} records")

# ============================================================
# 9. WIELKOPOLSKIE - rejestr_placowek_opiekunczo-wychowawczych_...pdf
# ============================================================
print("9. Processing: wielkopolskie...")
f = os.path.join(base, "rejestr_placowek_opiekunczo-wychowawczych_regionalnych_placowek_opiekunczo-terapeutycznych_i_interwencyjnych_osrodkow_preadopcyjnych_-_03.06.2024_aktualizacja.pdf")
count_before = len(all_records)
with pdfplumber.open(f) as pdf:
    for page in pdf.pages:
        tables = page.extract_tables()
        for table in tables:
            for row in table:
                if not row or not row[0]:
                    continue
                r0 = row[0].strip()
                if r0 in ('Nr w', 'rejestrze', 'CZĘŚĆ', ''):
                    continue
                if re.match(r'^\d+\.?$', r0):
                    nazwa = clean(row[1]) if len(row) > 1 else ""
                    adres = clean(row[2]) if len(row) > 2 else ""
                    typ = clean(row[3]) if len(row) > 3 else ""
                    powiat = clean(row[4]) if len(row) > 4 else ""
                    organ = clean(row[5]) if len(row) > 5 else ""

                    if nazwa and 'wykreśl' not in nazwa.lower() and 'likwidacj' not in clean(row[6] if len(row) > 6 else "").lower():
                        add_record(
                            woj='wielkopolskie', powiat=powiat, nazwa=nazwa,
                            typ=typ, pub_niepub='', adres=adres, kod=extract_kod(adres),
                            miasto='', tel='', email=extract_email(adres),
                            miejsca='', dyrektor='', organ=organ,
                            zrodlo='rejestr_placowek_wielkopolskie_2024-06-03.pdf', data_stanu='2024-06-03'
                        )
print(f"   -> {len(all_records) - count_before} records")

# ============================================================
# 10. ZACHODNIOPOMORSKIE - Rejestr_placowek_na_terenie_woj_zachodniopomorskiego...pdf
# ============================================================
print("10. Processing: zachodniopomorskie...")
f = os.path.join(base, "Rejestr_plac\u00f3wek_na_terenie_wojew\u00f3dztwa_zachodniopomorskiego_stan_na_3_czerwca_2024.pdf")
count_before = len(all_records)
with pdfplumber.open(f) as pdf:
    current_powiat = ""
    for page in pdf.pages:
        text = page.extract_text() or ""
        lines = text.split('\n')
        for line in lines:
            line = line.strip()
            # Powiat headers
            powiat_match = re.match(r'^Powiat\s+(.+?):', line)
            if powiat_match:
                current_powiat = powiat_match.group(1)
                continue
            powiat_match2 = re.match(r'^Miasto\s+(.+?):', line)
            if powiat_match2:
                current_powiat = "m. " + powiat_match2.group(1)
                continue

            # Entry starts with number
            entry_match = re.match(r'^(\d+)\.\s+(.+)', line)
            if entry_match:
                nazwa = entry_match.group(2).rstrip(',')
                # Next lines contain address, phone, etc. - just capture the name
                add_record(
                    woj='zachodniopomorskie', powiat=current_powiat, nazwa=nazwa,
                    typ='', pub_niepub='', adres='', kod='', miasto='',
                    tel='', email='', miejsca='', dyrektor='', organ='',
                    zrodlo='Rejestr_placowek_zachodniopomorskie_2024-06-03.pdf', data_stanu='2024-06-03'
                )
print(f"   -> {len(all_records) - count_before} records")

# ============================================================
# 11. POMORSKIE - Rejestr_POW_-_stan_na_dzien_14012025_r.pdf
# ============================================================
print("11. Processing: pomorskie...")
f = os.path.join(base, "Rejestr_POW_-_stan_na_dzie\u0144_14012025_r.pdf")
count_before = len(all_records)
with pdfplumber.open(f) as pdf:
    for page in pdf.pages:
        tables = page.extract_tables()
        for table in tables:
            for row in table:
                if not row or not row[0]:
                    continue
                r0 = str(row[0]).strip()
                if r0 in ('Lp.', '1', '2', '3') and (not row[3] or 'Nazwa' in str(row[3])):
                    continue
                if re.match(r'^\d+\.$', r0):
                    powiat = clean(row[2]) if len(row) > 2 else ""
                    nazwa = clean(row[3]) if len(row) > 3 else ""
                    typ = clean(row[4]) if len(row) > 4 else ""
                    miejsca = clean(row[5]) if len(row) > 5 else ""
                    adres = clean(row[6]) if len(row) > 6 else ""
                    organ = clean(row[7]) if len(row) > 7 else ""

                    if nazwa:
                        add_record(
                            woj='pomorskie', powiat=powiat, nazwa=nazwa,
                            typ=typ, pub_niepub='', adres=adres, kod=extract_kod(adres),
                            miasto='', tel='', email=extract_email(adres),
                            miejsca=miejsca, dyrektor='', organ=organ,
                            zrodlo='Rejestr_POW_pomorskie_2025-01-14.pdf', data_stanu='2025-01-14'
                        )
print(f"   -> {len(all_records) - count_before} records")

# ============================================================
# 12. MALOPOLSKIE - typu_socjalizacyjnego.pdf
# ============================================================
print("12. Processing: malopolskie...")
f = os.path.join(base, "typu_socjalizacyjnego.pdf")
count_before = len(all_records)
with pdfplumber.open(f) as pdf:
    for page in pdf.pages:
        tables = page.extract_tables()
        for table in tables:
            for row in table:
                if not row or not row[0]:
                    continue
                r0 = str(row[0]).strip()
                if r0 == 'L.p.' or r0 == 'Lp.':
                    continue
                if re.match(r'^\d+\.?$', r0):
                    nazwa = clean(row[1]) if len(row) > 1 else ""
                    adres = clean(row[2]) if len(row) > 2 else ""
                    tel = clean(row[3]) if len(row) > 3 else ""
                    email = clean(row[4]) if len(row) > 4 else extract_email(adres)

                    if nazwa:
                        add_record(
                            woj='malopolskie', powiat='', nazwa=nazwa,
                            typ='socjalizacyjna', pub_niepub='', adres=adres,
                            kod=extract_kod(adres), miasto='', tel=tel, email=email,
                            miejsca='', dyrektor='', organ='',
                            zrodlo='typu_socjalizacyjnego_malopolskie.pdf', data_stanu=''
                        )
print(f"   -> {len(all_records) - count_before} records")

# ============================================================
# 13. LUBELSKIE - Wykaz placowek opiekunco-wychowawczych.pdf
# ============================================================
print("13. Processing: lubelskie...")
f = os.path.join(base, "Wykaz plac\u00f3wek opieku\u0144czo-wychowawczych.pdf")
count_before = len(all_records)
with pdfplumber.open(f) as pdf:
    for page in pdf.pages:
        tables = page.extract_tables()
        for table in tables:
            for row in table:
                if not row or not row[0]:
                    continue
                r0 = str(row[0]).strip().rstrip('.')
                if r0 == 'Lp' or r0 == 'L.p' or not r0:
                    continue
                if re.match(r'^\d+$', r0):
                    nazwa = clean(row[1]) if len(row) > 1 else ""
                    typ = clean(row[2]) if len(row) > 2 else ""
                    adres = clean(row[3]) if len(row) > 3 else ""

                    if nazwa:
                        kod = extract_kod(adres)
                        email = extract_email(adres)
                        tel_match = re.search(r'tel[./]?\s*([\d\s-]+)', adres)
                        tel = tel_match.group(1).strip() if tel_match else ""
                        add_record(
                            woj='lubelskie', powiat='', nazwa=nazwa,
                            typ=typ, pub_niepub='', adres=adres, kod=kod,
                            miasto='', tel=tel, email=email, miejsca='',
                            dyrektor='', organ='',
                            zrodlo='Wykaz_placowek_lubelskie_2025-10-15.pdf', data_stanu='2025-10-15'
                        )
print(f"   -> {len(all_records) - count_before} records")

# ============================================================
# 14. PODLASKIE - Wykaz_placowek_na_15_lipca_2025.pdf
# ============================================================
print("14. Processing: podlaskie...")
f = os.path.join(base, "Wykaz_placowek_na_15_lipca_2025.pdf")
count_before = len(all_records)
with pdfplumber.open(f) as pdf:
    for page in pdf.pages:
        tables = page.extract_tables()
        for table in tables:
            for row in table:
                if not row or not row[0]:
                    continue
                r0 = str(row[0]).strip().rstrip('.')
                if not re.match(r'^\d+$', r0):
                    continue
                nazwa = clean(row[1]) if len(row) > 1 else ""
                adres = clean(row[2]) if len(row) > 2 else ""
                organ = clean(row[3]) if len(row) > 3 else ""
                typ = clean(row[4]) if len(row) > 4 else ""
                miejsca = clean(row[5]) if len(row) > 5 else ""

                if nazwa:
                    add_record(
                        woj='podlaskie', powiat='', nazwa=nazwa,
                        typ=typ, pub_niepub='', adres=adres, kod=extract_kod(adres),
                        miasto='', tel='', email=extract_email(adres), miejsca=miejsca,
                        dyrektor='', organ=organ,
                        zrodlo='Wykaz_placowek_podlaskie_2025-07-15.pdf', data_stanu='2025-07-15'
                    )
print(f"   -> {len(all_records) - count_before} records")

# ============================================================
# 15. LODZKIE - Wykaz_Placowek_wedlug_stanu_na_31122025.pdf
# ============================================================
print("15. Processing: lodzkie...")
f = os.path.join(base, "Wykaz_Plac\u00f3wek_wed\u0142ug_stanu_na_31122025.pdf")
count_before = len(all_records)
with pdfplumber.open(f) as pdf:
    current_powiat = ""
    for page in pdf.pages:
        tables = page.extract_tables()
        for table in tables:
            for row in table:
                if not row:
                    continue
                # Check for powiat in first column
                r0 = clean(row[0]) if row[0] else ""

                if r0 and not re.match(r'^\d', r0) and r0 not in ('Powiat prowadzący', 'lub zlecający', 'prowadzenie', 'placówki/ośrodka'):
                    current_powiat = r0

                # Data row
                r1 = clean(row[1]) if len(row) > 1 and row[1] else ""
                if r1 and re.match(r'^\d+$', r1):
                    nazwa = clean(row[2]) if len(row) > 2 else ""
                    adres = clean(row[3]) if len(row) > 3 else ""
                    typ = clean(row[4]) if len(row) > 4 else ""
                    tel = clean(row[5]) if len(row) > 5 else ""

                    if nazwa:
                        add_record(
                            woj='lodzkie', powiat=current_powiat, nazwa=nazwa,
                            typ=typ, pub_niepub='', adres=adres, kod=extract_kod(adres),
                            miasto='', tel=tel, email=extract_email(adres + ' ' + tel),
                            miejsca='', dyrektor='', organ='',
                            zrodlo='Wykaz_Placowek_lodzkie_31122025.pdf', data_stanu='2025-12-31'
                        )
print(f"   -> {len(all_records) - count_before} records")

# ============================================================
# 16. SWIETOKRZYSKIE - WYKAZ_POW_na_strone_SUW-_stan_na_21_05_2025_r.pdf
# ============================================================
print("16. Processing: swietokrzyskie...")
f = os.path.join(base, "WYKAZ_POW_na_strone_SUW-_stan_na_21_05_2025_r.pdf")
count_before = len(all_records)
with pdfplumber.open(f) as pdf:
    current_powiat = ""
    for page in pdf.pages:
        tables = page.extract_tables()
        for table in tables:
            for row in table:
                if not row or len(row) < 4:
                    continue

                # Table structure: [POWIAT, CENTRUM, LP, NAZWA, ...places..., SUMA]
                # LP is in col 2, NAZWA in col 3
                powiat_val = clean(row[0]) if row[0] else ""
                lp = clean(row[2]) if len(row) > 2 and row[2] else ""
                nazwa = clean(row[3]) if len(row) > 3 and row[3] else ""

                # Update powiat if present (vertically split text like I\nK\nS\nU\nB -> IKUSB -> buski)
                if powiat_val and not re.match(r'^\d', powiat_val) and powiat_val not in ('POWIAT', 'None'):
                    # Reconstruct powiat from vertical text
                    letters = powiat_val.replace('\n', '')
                    current_powiat = letters

                # Skip header rows
                if not re.match(r'^\d+$', lp):
                    continue

                if not nazwa:
                    continue

                # Get miejsca from SUMA column (last column)
                miejsca = clean(row[-1]) if row[-1] else ""

                # Extract details from nazwa text
                kod = extract_kod(nazwa)
                email = extract_email(nazwa)
                tel_match = re.search(r'tel\.?\s*([\d\s-]+)', nazwa)
                tel = tel_match.group(1).strip() if tel_match else ""
                dyr_match = re.search(r'dyr\.?\s*(.+?)(?:\n|$)', nazwa)
                dyrektor = dyr_match.group(1).strip() if dyr_match else ""

                add_record(
                    woj='swietokrzyskie', powiat=current_powiat, nazwa=nazwa,
                    typ='', pub_niepub='', adres='', kod=kod, miasto='',
                    tel=tel, email=email, miejsca=miejsca, dyrektor=dyrektor, organ='',
                    zrodlo='WYKAZ_POW_swietokrzyskie_2025-05-21.pdf', data_stanu='2025-05-21'
                )
print(f"   -> {len(all_records) - count_before} records")

# ============================================================
# NORMALIZE & SAVE TO CSV
# ============================================================
print(f"\n{'='*60}")
print(f"RAW RECORDS: {len(all_records)}")

df_out = pd.DataFrame(all_records)

# Normalize typ_placowki
def normalize_typ(t):
    t = str(t).lower().strip()
    if not t or t == 'nan':
        return ''
    # Remove "placówka opiekuńczo-wychowawcza typu" prefix
    t = re.sub(r'^p\s*l?\s*ac[oó]wka\s+opieku[nń]czo[\s-]*wychowawcza\s+typu\s*', '', t)
    t = re.sub(r'^typu\s+', '', t)
    t = re.sub(r'^[łl][aą]cz[aą]ca\s+(zadania\s+plac[oó]wki\s+typu\s*|dzia[łl]ania\s*)', '', t)
    t = t.strip()

    if not t or t in ('-', '3', '4'):
        return ''

    # Map to standard types
    if re.search(r'preadopc', t):
        return 'preadopcyjna'
    if re.search(r'opieku[nń]czo.*terapeut', t):
        return 'opiekunczo-terapeutyczna'
    if re.search(r'rodzinn', t):
        return 'rodzinna'
    if re.search(r'[łl][aą]cz[aą]ca', t):
        return 'socjalizacyjna+interwencyjna'

    has_socj = bool(re.search(r'socjalizac', t))
    has_int = bool(re.search(r'interwenc', t))
    has_spec = bool(re.search(r'specjalist|terapeut', t))

    parts = []
    if has_socj:
        parts.append('socjalizacyjna')
    if has_int:
        parts.append('interwencyjna')
    if has_spec:
        parts.append('specjalistyczno-terapeutyczna')

    if parts:
        return '+'.join(parts)

    # Single letter codes
    if t in ('s', 's/i', 's,i', 's, i', 'i, s', 'i+s', 'i + s'):
        mapping = {'s': 'socjalizacyjna', 's/i': 'socjalizacyjna+interwencyjna',
                   's,i': 'socjalizacyjna+interwencyjna', 's, i': 'socjalizacyjna+interwencyjna',
                   'i, s': 'socjalizacyjna+interwencyjna', 'i+s': 'socjalizacyjna+interwencyjna',
                   'i + s': 'socjalizacyjna+interwencyjna'}
        return mapping.get(t, t)
    if t == 'r':
        return 'rodzinna'
    if t == 'i':
        return 'interwencyjna'
    if t in ('st/i',):
        return 'specjalistyczno-terapeutyczna+interwencyjna'
    if 'socjalizayjn' in t or 'socjalizaana' in t:
        return 'socjalizacyjna'

    # If it looks like an address (contains ul. or postal code), it's garbage
    if re.search(r'ul\.|^\d{2}-\d{3}', t):
        return ''

    return t

df_out['typ_placowki'] = df_out['typ_placowki'].apply(normalize_typ)

# Normalize liczba_miejsc - extract just the numeric value
def normalize_miejsca(v):
    v = str(v).strip()
    if not v or v == 'nan' or v == '':
        return ''
    # Extract first number
    m = re.match(r'^(\d+)', v.replace('.0', ''))
    if m:
        val = int(m.group(1))
        # Sanity check - places should be 1-100
        if 1 <= val <= 100:
            return str(val)
    return ''

df_out['liczba_miejsc'] = df_out['liczba_miejsc'].apply(normalize_miejsca)

# Clean up kod_pocztowy
def normalize_kod(k):
    k = str(k).strip()
    if not k or k == 'nan':
        return ''
    m = re.match(r'(\d{2})-?(\d{3})', k)
    if m:
        return f"{m.group(1)}-{m.group(2)}"
    return ''

df_out['kod_pocztowy'] = df_out['kod_pocztowy'].apply(normalize_kod)

# Stats
print(f"TOTAL RECORDS: {len(df_out)}")
print(f"\nPer voivodeship:")
from collections import Counter
woj_counts = Counter(df_out['wojewodztwo'])
for woj in sorted(woj_counts.keys()):
    print(f"  {woj}: {woj_counts[woj]}")

print(f"\nTyp placowki (normalized):")
typ_counts = df_out['typ_placowki'].value_counts()
for t, c in typ_counts.items():
    if t:
        print(f"  {t}: {c}")
print(f"  (empty): {(df_out['typ_placowki'] == '').sum()}")

# Places stats
numeric_places = pd.to_numeric(df_out['liczba_miejsc'], errors='coerce')
print(f"\nLiczba miejsc:")
print(f"  Records with value: {numeric_places.notna().sum()}")
print(f"  Total places: {numeric_places.sum():.0f}")
print(f"  Average: {numeric_places.mean():.1f}")

# Save
output_file = "domy_dziecka_zbiorczy.csv"
df_out.to_csv(output_file, index=False, encoding='utf-8-sig')
print(f"\nSaved to: {output_file}")
print(f"Columns: {list(df_out.columns)}")
print(f"Columns: {list(df_out.columns)}")
