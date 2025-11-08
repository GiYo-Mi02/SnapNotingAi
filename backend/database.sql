-- SnapNotesAI Supabase Database Schema
-- Execute these SQL commands in your Supabase SQL editor

-- Create sessions table
create table if not exists sessions (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid,
  status text not null default 'active' check (status in ('active', 'processing', 'completed', 'failed')),
  created_at timestamptz not null default now(),
  stopped_at timestamptz
);

create index if not exists sessions_user_id_idx on sessions(user_id);
create index if not exists sessions_created_at_idx on sessions(created_at desc);

-- Create screenshots table
create table if not exists screenshots (
  id uuid primary key default uuid_generate_v4(),
  session_id uuid not null references sessions(id) on delete cascade,
  image_url text not null,
  created_at timestamptz not null default now(),
  ocr_text text
);

create index if not exists screenshots_session_id_idx on screenshots(session_id);
create index if not exists screenshots_created_at_idx on screenshots(created_at);

-- Create results table
create table if not exists results (
  id uuid primary key default uuid_generate_v4(),
  session_id uuid not null unique references sessions(id) on delete cascade,
  summary text,
  quiz jsonb default '[]'::jsonb,
  created_at timestamptz not null default now()
);

create index if not exists results_session_id_idx on results(session_id);

-- Create a storage bucket for screenshots (if using Supabase storage)
-- Run this in the Supabase dashboard Storage UI or via the API:
-- insert into storage.buckets (id, name, public) values ('snapshots', 'snapshots', true);
-- 
-- Then set the bucket policy to allow public reads:
-- create policy "Public Read Access"
-- on storage.objects for select
-- using ( bucket_id = 'snapshots' );
