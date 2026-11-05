import { createClient } from '@supabase/supabase-js'

export const missingEnv = ['VITE_SUPABASE_URL', 'VITE_SUPABASE_ANON_KEY', 'VITE_GUEST_EMAIL'].filter(
  (name) => !import.meta.env[name],
)

// While anything is missing, main.jsx shows SetupMessage instead of the app, so this is never used as null.
export const supabase = missingEnv.length
  ? null
  : createClient(import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_SUPABASE_ANON_KEY)
