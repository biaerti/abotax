-- AboTax Supabase Schema
-- Run this in your Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- PETITION SIGNATURES
-- ============================================
CREATE TABLE IF NOT EXISTS petition_signatures (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  city TEXT,
  is_public BOOLEAN DEFAULT FALSE,
  source TEXT DEFAULT 'web' CHECK (source IN ('web', 'epuap')),
  confirmed BOOLEAN DEFAULT FALSE,
  confirmation_token UUID DEFAULT uuid_generate_v4(),
  confirmed_at TIMESTAMP WITH TIME ZONE,
  share_reason TEXT, -- dlaczego popieram (do generatora obrazków)
  custom_reason TEXT -- własny tekst
);

-- Index for faster lookups
CREATE INDEX idx_petition_email ON petition_signatures(email);
CREATE INDEX idx_petition_created ON petition_signatures(created_at DESC);
CREATE INDEX idx_petition_public ON petition_signatures(is_public) WHERE is_public = TRUE;

-- Enable Row Level Security
ALTER TABLE petition_signatures ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can insert
CREATE POLICY "Anyone can sign petition" ON petition_signatures
  FOR INSERT TO anon
  WITH CHECK (true);

-- Policy: Only public signatures can be read
CREATE POLICY "Public signatures are viewable" ON petition_signatures
  FOR SELECT TO anon
  USING (is_public = TRUE);

-- ============================================
-- CHILDRENS HOMES
-- ============================================
CREATE TABLE IF NOT EXISTS childrens_homes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  name TEXT NOT NULL,
  city TEXT NOT NULL,
  region TEXT,
  address TEXT,
  children_count INT DEFAULT 0,
  staff_count INT DEFAULT 0,
  description TEXT,
  needs TEXT[], -- array of current needs
  image_url TEXT,
  is_demo BOOLEAN DEFAULT TRUE, -- demo homes for showcase
  is_active BOOLEAN DEFAULT TRUE,
  total_raised DECIMAL(12,2) DEFAULT 0,
  contact_email TEXT,
  contact_phone TEXT
);

CREATE INDEX idx_homes_active ON childrens_homes(is_active) WHERE is_active = TRUE;
CREATE INDEX idx_homes_demo ON childrens_homes(is_demo);

-- Enable RLS
ALTER TABLE childrens_homes ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can read active homes
CREATE POLICY "Active homes are viewable" ON childrens_homes
  FOR SELECT TO anon
  USING (is_active = TRUE);

-- ============================================
-- GOALS (funding goals for homes)
-- ============================================
CREATE TABLE IF NOT EXISTS goals (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  home_id UUID REFERENCES childrens_homes(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  target_amount DECIMAL(10,2) NOT NULL,
  current_amount DECIMAL(10,2) DEFAULT 0,
  category TEXT CHECK (category IN ('therapy', 'education', 'equipment', 'trips', 'renovation', 'other')),
  is_active BOOLEAN DEFAULT TRUE,
  completed_at TIMESTAMP WITH TIME ZONE,
  image_url TEXT
);

CREATE INDEX idx_goals_home ON goals(home_id);
CREATE INDEX idx_goals_active ON goals(is_active) WHERE is_active = TRUE;

-- Enable RLS
ALTER TABLE goals ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can read active goals
CREATE POLICY "Active goals are viewable" ON goals
  FOR SELECT TO anon
  USING (is_active = TRUE);

-- ============================================
-- INSERT DEMO DATA
-- ============================================

-- Demo children's homes
INSERT INTO childrens_homes (name, city, region, children_count, staff_count, description, needs, is_demo, total_raised) VALUES
(
  'Dom Dziecka "Słoneczny"',
  'Warszawa',
  'Mazowieckie',
  24,
  4,
  'Dom dziecka prowadzony przez Fundację Pomocna Dłoń. Opiekujemy się dziećmi w wieku 3-18 lat, oferując im stabilne środowisko i wsparcie w rozwoju.',
  ARRAY['Terapia psychologiczna', 'Korepetycje', 'Sprzęt sportowy', 'Wycieczki edukacyjne'],
  TRUE,
  45000.00
),
(
  'Placówka Opiekuńcza "Tęcza"',
  'Kraków',
  'Małopolskie',
  18,
  3,
  'Placówka dla dzieci pozbawionych opieki rodzicielskiej. Stawiamy na indywidualne podejście i rozwój talentów każdego dziecka.',
  ARRAY['Instrumenty muzyczne', 'Komputery do nauki', 'Zajęcia artystyczne'],
  TRUE,
  28500.00
),
(
  'Dom Dziecka nr 3',
  'Gdańsk',
  'Pomorskie',
  32,
  5,
  'Jeden z największych domów dziecka w regionie. Potrzebujemy wsparcia, aby zapewnić dzieciom lepsze warunki życia i rozwoju.',
  ARRAY['Remont łazienek', 'Nowe łóżka', 'Książki i pomoce naukowe'],
  TRUE,
  62000.00
);

-- Demo goals for homes
INSERT INTO goals (home_id, title, description, target_amount, current_amount, category, is_active)
SELECT
  id,
  'Terapia psychologiczna dla dzieci',
  'Finansowanie indywidualnych sesji terapeutycznych dla 12 dzieci, które tego potrzebują.',
  15000.00,
  11700.00,
  'therapy',
  TRUE
FROM childrens_homes WHERE name = 'Dom Dziecka "Słoneczny"';

INSERT INTO goals (home_id, title, description, target_amount, current_amount, category, is_active)
SELECT
  id,
  'Kolonie letnie 2025',
  'Wyjazd wakacyjny nad morze dla wszystkich dzieci z domu dziecka.',
  8000.00,
  3600.00,
  'trips',
  TRUE
FROM childrens_homes WHERE name = 'Dom Dziecka "Słoneczny"';

INSERT INTO goals (home_id, title, description, target_amount, current_amount, category, is_active)
SELECT
  id,
  'Sprzęt sportowy',
  'Zakup piłek, rakiet, rowerów i innego sprzętu do aktywności fizycznej.',
  3500.00,
  3220.00,
  'equipment',
  TRUE
FROM childrens_homes WHERE name = 'Dom Dziecka "Słoneczny"';

INSERT INTO goals (home_id, title, description, target_amount, current_amount, category, is_active)
SELECT
  id,
  'Pracownia muzyczna',
  'Zakup instrumentów i wyposażenie sali do zajęć muzycznych.',
  12000.00,
  7800.00,
  'equipment',
  TRUE
FROM childrens_homes WHERE name = 'Placówka Opiekuńcza "Tęcza"';

INSERT INTO goals (home_id, title, description, target_amount, current_amount, category, is_active)
SELECT
  id,
  'Komputery do nauki zdalnej',
  '6 laptopów z oprogramowaniem edukacyjnym dla starszych dzieci.',
  18000.00,
  9000.00,
  'education',
  TRUE
FROM childrens_homes WHERE name = 'Placówka Opiekuńcza "Tęcza"';

INSERT INTO goals (home_id, title, description, target_amount, current_amount, category, is_active)
SELECT
  id,
  'Remont łazienek',
  'Pilny remont 3 łazienek, które są w złym stanie technicznym.',
  35000.00,
  28000.00,
  'renovation',
  TRUE
FROM childrens_homes WHERE name = 'Dom Dziecka nr 3';

-- ============================================
-- FUNCTIONS
-- ============================================

-- Function to get petition count
CREATE OR REPLACE FUNCTION get_petition_count()
RETURNS INTEGER AS $$
  SELECT COUNT(*)::INTEGER FROM petition_signatures;
$$ LANGUAGE SQL STABLE;

-- Function to confirm email
CREATE OR REPLACE FUNCTION confirm_petition_signature(token UUID)
RETURNS BOOLEAN AS $$
DECLARE
  updated_rows INTEGER;
BEGIN
  UPDATE petition_signatures
  SET confirmed = TRUE, confirmed_at = NOW()
  WHERE confirmation_token = token AND confirmed = FALSE;

  GET DIAGNOSTICS updated_rows = ROW_COUNT;
  RETURN updated_rows > 0;
END;
$$ LANGUAGE plpgsql;
