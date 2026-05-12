-- ============================================================
--  Civil Registry — Municipality of Calumpit, Bulacan
--  Supabase Setup SQL  |  Part 2: Database Schema
--  Run this entire file in: Supabase → SQL Editor → New Query
-- ============================================================

create extension if not exists "pgcrypto";

-- ============================================================
--  1. BIRTH RECORDS TABLE
-- ============================================================
CREATE TABLE IF NOT EXISTS birth_records (
  id                        UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  registry_number           TEXT NOT NULL UNIQUE,
  date_of_registration      DATE NOT NULL,
  name_of_child             TEXT NOT NULL,
  sex                       TEXT NOT NULL CHECK (sex IN ('MALE', 'FEMALE')),
  birth_date                DATE NOT NULL,
  place_of_birth            TEXT NOT NULL,
  mother_name               TEXT NOT NULL,
  mother_citizenship        TEXT NOT NULL,
  father_name               TEXT NOT NULL,
  father_citizenship        TEXT NOT NULL,
  marriage_date_of_parents  DATE,
  marriage_place_of_parents TEXT,
  image_url                 TEXT,
  created_at                TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================
--  2. DEATH RECORDS TABLE
-- ============================================================
CREATE TABLE IF NOT EXISTS death_records (
  id                   UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  registry_number      TEXT NOT NULL UNIQUE,
  date_of_registration DATE NOT NULL,
  name_of_deceased     TEXT NOT NULL,
  sex                  TEXT NOT NULL CHECK (sex IN ('MALE', 'FEMALE')),
  age                  TEXT NOT NULL,
  civil_status         TEXT NOT NULL CHECK (civil_status IN ('SINGLE', 'MARRIED', 'WIDOWED', 'SEPARATED')),
  citizenship          TEXT NOT NULL,
  date_of_death        DATE NOT NULL,
  place_of_death       TEXT NOT NULL,
  cause_of_death       TEXT NOT NULL,
  image_url            TEXT,
  created_at           TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================
--  3. MARRIAGE RECORDS TABLE
-- ============================================================
CREATE TABLE IF NOT EXISTS marriage_records (
  id                   UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  registry_number      TEXT NOT NULL UNIQUE,
  date_of_registration DATE NOT NULL,
  date_of_marriage     DATE NOT NULL,
  place_of_marriage    TEXT NOT NULL,

  -- Husband
  husband_name         TEXT NOT NULL,
  husband_age          TEXT NOT NULL,
  husband_nationality  TEXT NOT NULL,
  husband_civil_status TEXT NOT NULL,
  husband_mother       TEXT NOT NULL,
  husband_father       TEXT NOT NULL,

  -- Wife
  wife_name            TEXT NOT NULL,
  wife_age             TEXT NOT NULL,
  wife_nationality     TEXT NOT NULL,
  wife_civil_status    TEXT NOT NULL,
  wife_mother          TEXT NOT NULL,
  wife_father          TEXT NOT NULL,

  image_url            TEXT,
  created_at           TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================
--  4. USER SESSIONS TABLE (single-session enforcement)
-- ============================================================
CREATE TABLE IF NOT EXISTS user_sessions (
  id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id           TEXT NOT NULL,
  session_token     TEXT NOT NULL UNIQUE,
  device_info       TEXT,
  ip_address        TEXT,
  logged_in_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  last_activity_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  is_active         BOOLEAN DEFAULT TRUE
);

-- ============================================================
--  5. INDEXES (for fast registry_number and name searches)
-- ============================================================

-- Birth
CREATE INDEX IF NOT EXISTS idx_birth_registry  ON birth_records (registry_number);
CREATE INDEX IF NOT EXISTS idx_birth_name       ON birth_records (name_of_child);
CREATE INDEX IF NOT EXISTS idx_birth_created    ON birth_records (created_at DESC);

-- Death
CREATE INDEX IF NOT EXISTS idx_death_registry  ON death_records (registry_number);
CREATE INDEX IF NOT EXISTS idx_death_name       ON death_records (name_of_deceased);
CREATE INDEX IF NOT EXISTS idx_death_created    ON death_records (created_at DESC);

-- Marriage
CREATE INDEX IF NOT EXISTS idx_marriage_registry     ON marriage_records (registry_number);
CREATE INDEX IF NOT EXISTS idx_marriage_husband_name ON marriage_records (husband_name);
CREATE INDEX IF NOT EXISTS idx_marriage_wife_name    ON marriage_records (wife_name);
CREATE INDEX IF NOT EXISTS idx_marriage_created      ON marriage_records (created_at DESC);

-- User Sessions
CREATE INDEX IF NOT EXISTS idx_user_sessions_user_id ON user_sessions (user_id);
CREATE INDEX IF NOT EXISTS idx_user_sessions_token ON user_sessions (session_token);
CREATE INDEX IF NOT EXISTS idx_user_sessions_active ON user_sessions (is_active);

-- ============================================================
--  6. ROW LEVEL SECURITY (RLS)
-- ============================================================

ALTER TABLE birth_records    ENABLE ROW LEVEL SECURITY;
ALTER TABLE death_records    ENABLE ROW LEVEL SECURITY;
ALTER TABLE marriage_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_sessions    ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist (to avoid conflicts on re-runs)
DROP POLICY IF EXISTS "Allow all on birth_records" ON public.birth_records;
DROP POLICY IF EXISTS "Allow all on death_records" ON public.death_records;
DROP POLICY IF EXISTS "Allow all on marriage_records" ON public.marriage_records;
DROP POLICY IF EXISTS "Allow all on user_sessions" ON public.user_sessions;

-- Create policies allowing all operations (service role bypasses RLS)
CREATE POLICY "Allow all on birth_records"
  ON birth_records FOR ALL
  TO public
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow all on death_records"
  ON death_records FOR ALL
  TO public
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow all on marriage_records"
  ON marriage_records FOR ALL
  TO public
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow all on user_sessions"
  ON user_sessions FOR ALL
  TO public
  USING (true)
  WITH CHECK (true);

-- ============================================================
--  END OF FILE — All SQL above is safe to run multiple times
-- ============================================================
