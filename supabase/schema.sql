-- Run this once in Supabase → SQL Editor.

create table public.rsvps (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null check (char_length(name) between 1 and 120),
  email text not null check (char_length(email) <= 254),
  attending boolean not null,
  -- Everyone coming: the person replying and the other guests they name.
  guest_count smallint not null default 1 check (guest_count >= 0),
  -- The names of the people coming with the person replying, as many as they like.
  other_guests text[] not null default '{}',
  message text check (char_length(message) <= 2000)
);

alter table public.rsvps enable row level security;

grant insert on table public.rsvps to authenticated;

-- Only the logged-in shared guest account can submit RSVPs.
create policy "Logged-in guests can submit RSVPs"
  on public.rsvps for insert to authenticated with check (true);

-- No select policy: guests can't read each other's RSVPs.
-- View responses in Supabase → Table Editor → rsvps (export to CSV from there).
