-- The RSVP form no longer asks which parts of the day a guest will attend (accepting means all of
-- it), so this column is no longer used. Optional: run once in Supabase → SQL Editor, after the
-- version of the site without that question is published, since earlier versions still send it.
-- Any answers already in it are deleted with it.
alter table public.rsvps drop column if exists events;
