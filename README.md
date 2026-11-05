# Wedding website + RSVP

A password-protected wedding site built with React (Vite), Tailwind CSS v4 and Supabase, deployed on Vercel.

Guests open the site, enter the shared password from their invitation, and land on a one-page site with the countdown, couple, event details, RSVP form and travel info. RSVPs are saved to Supabase.

## 1. Set up Supabase

1. Create a project at [supabase.com](https://supabase.com).
2. **SQL Editor** → paste and run [`supabase/schema.sql`](supabase/schema.sql). This creates the `rsvps` table. Logged-in guests can add rows but can't read anyone's responses.
3. **Authentication → Users → Add user → Create new user**
   - Email: anything you control, e.g. `guests@yourdomain.com` (guests never see it)
   - Password: the shared password you'll print on the invitations
   - Tick **Auto Confirm User**
4. **Authentication → Sign In / Providers**:
   - Turn **off** "Allow new users to sign up". This is required. Otherwise anyone could create their own account and skip the password.
   - Make sure **anonymous sign-ins** are off (the default).
5. **Project Settings → API Keys**: copy the Project URL and the anon (publishable) key.

## 2. Run it locally

```bash
cp .env.example .env   # then fill in the three values
npm install
npm run dev
```

## 3. Make it yours

- Edit [`src/content/wedding.js`](src/content/wedding.js). Every name, date, event, bio and image path is in that file.
- Put your photos in `public/images/` and reference them as `/images/your-photo.jpg`.
- Colors and fonts live in the `@theme` block in [`src/index.css`](src/index.css).

## 4. Deploy to Vercel

1. Push this folder to a GitHub repository.
2. On [vercel.com](https://vercel.com) → **Add New → Project** → import the repo. The Vite preset is detected automatically (build `npm run build`, output `dist`).
3. Add the environment variables `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY` and `VITE_GUEST_EMAIL`, then deploy.

[`vercel.json`](vercel.json) rewrites every path to `index.html`, so refreshing `/login` works.

## Viewing responses

Supabase → **Table Editor → rsvps**. Use **Export → CSV** for a spreadsheet.

## Things to know

- **Changing the password:** Authentication → Users → the guest user → reset the password. Guests who are already logged in stay logged in. Anyone new needs the new password.
- **What the password protects:** the RSVP form only accepts submissions from logged-in guests. The site's text and photos ship with the page itself, so the gate keeps out casual visitors but not someone determined to dig through the code. Don't put anything truly private on the site.
- **Shared account:** every guest uses the same account, so Log out only ends the session in that browser (`scope: 'local'`). A guest who knows the browser developer tools could change the shared password. If that happens, reset it in the Supabase dashboard.
- Search engines are asked not to index the site (`noindex` in `index.html`).
