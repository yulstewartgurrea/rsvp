-- Makes the database refuse RSVPs from the deadline on, so they stop even if someone gets round
-- the form. Run once in Supabase → SQL Editor. Safe to run again, and to change the date later:
-- keep it the same as rsvp.closesAt in src/content/wedding.js.
drop policy if exists "Logged-in guests can submit RSVPs" on public.rsvps;
drop policy if exists "Logged-in guests can submit RSVPs until the deadline" on public.rsvps;
create policy "Logged-in guests can submit RSVPs until the deadline"
  on public.rsvps for insert to authenticated
  with check (now() < timestamptz '2027-02-01 00:00:00+08');
