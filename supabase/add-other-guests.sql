-- For a database set up before RSVPs had "Other guests": run this once in Supabase → SQL Editor,
-- before publishing the version of the site that sends them. Safe to run again.

-- The names of the people coming with the person replying, as many as they like.
alter table public.rsvps add column if not exists other_guests text[] not null default '{}';
-- If an earlier version of this file was run, it limited them to 9; this lifts that.
alter table public.rsvps drop constraint if exists rsvps_other_guests_check;

-- The total coming was limited to 10; now it only has to be 0 or more.
alter table public.rsvps drop constraint if exists rsvps_guest_count_check;
alter table public.rsvps add constraint rsvps_guest_count_check check (guest_count >= 0);
