-- Part 2: Supabase schema for Civil Registry
-- Creates birth_records, death_records, and marriage_records tables.
-- No image_url column and no storage bucket.

create extension if not exists "pgcrypto";

create table if not exists birth_records (
  id uuid primary key default gen_random_uuid(),
  registry_number text not null unique,
  registration_date date not null,
  child_name text not null,
  child_sex text not null,
  date_of_birth date not null,
  place_of_birth text not null,
  father_name text,
  father_age integer,
  father_birthplace text,
  father_citizenship text,
  mother_name text,
  mother_age integer,
  mother_birthplace text,
  mother_citizenship text,
  informant_name text,
  informant_relationship text,
  informant_address text,
  attendant_name text,
  attendant_designation text,
  created_at timestamptz not null default now()
);

create table if not exists death_records (
  id uuid primary key default gen_random_uuid(),
  registry_number text not null unique,
  registration_date date not null,
  deceased_name text not null,
  deceased_sex text not null,
  date_of_death date not null,
  place_of_death text not null,
  age_at_death integer,
  civil_status text,
  occupation text,
  residence text,
  cause_of_death text,
  father_name text,
  mother_name text,
  informant_name text,
  informant_relationship text,
  informant_address text,
  attending_physician_name text,
  attending_physician_license_no text,
  created_at timestamptz not null default now()
);

create table if not exists marriage_records (
  id uuid primary key default gen_random_uuid(),
  registry_number text not null unique,
  registration_date date not null,
  husband_name text not null,
  husband_age integer,
  husband_civil_status text,
  husband_occupation text,
  husband_residence text,
  husband_citizenship text,
  husband_father_name text,
  husband_mother_name text,
  wife_name text not null,
  wife_age integer,
  wife_civil_status text,
  wife_occupation text,
  wife_residence text,
  wife_citizenship text,
  wife_father_name text,
  wife_mother_name text,
  date_of_marriage date not null,
  place_of_marriage text not null,
  marriage_license_number text,
  minister_name text,
  created_at timestamptz not null default now()
);
