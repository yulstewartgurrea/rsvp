import { useRef, useState } from 'react'
import { Navigate } from 'react-router'
import { useAuth } from '../auth/AuthContext'
import { Backdrop, CARD, Envelope, ENVELOPE_BOX } from '../components/Envelope'
import { ArrowRightIcon, EyeIcon, EyeOffIcon, LockIcon } from '../components/Icons'
import PageLoader from '../components/PageLoader'
import { wedding } from '../content/wedding'
import { primeMusic, stopMusic } from '../lib/music'
import { supabase } from '../lib/supabase'

const copy = wedding.login

// The code field and button sit where the artwork shows them, in % of the artwork: each is centred
// on its spot and keeps the drawing's proportions, but never gets too small to read or tap.
const CONTROL = 'absolute left-[19.24%] h-[max(2.5rem,5.14cqh)] w-[61.64%] -translate-y-1/2'

function loginErrorMessage(error) {
  if (error.code === 'invalid_credentials') return "That code doesn't match. Please check your invitation."
  if (error.status === 429) return 'Too many attempts. Please wait a few minutes and try again.'
  return 'Something went wrong. Please try again.'
}

export default function Login({ onUnlock }) {
  const { session, loading } = useAuth()
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const envelopeRef = useRef(null)

  if (loading) return <PageLoader />
  // Already logged in. During a fresh login the unseal animation does the redirect instead.
  if (session && !submitting) return <Navigate to="/" replace />

  async function handleSubmit(event) {
    event.preventDefault()
    // Before waiting on the login, while the browser still counts this as the guest's own tap.
    primeMusic()
    setSubmitting(true)
    setError('')
    const { error } = await supabase.auth.signInWithPassword({
      email: import.meta.env.VITE_GUEST_EMAIL,
      password,
    })
    if (error) {
      stopMusic()
      setError(loginErrorMessage(error))
      setSubmitting(false)
      return
    }
    // Guests whose device asks for less motion skip the opening and go straight in.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) setSubmitting(false)
    // The opening animation redraws the envelope exactly where this one sits.
    else onUnlock(envelopeRef.current.getBoundingClientRect())
  }

  return (
    // On a phone the envelope fills the screen; on anything wider it is a portrait invitation card
    // centred on soft ivory, so it keeps the artwork's proportions instead of stretching to the monitor.
    <main className="relative flex min-h-svh items-center justify-center text-taupe sm:p-6">
      <Backdrop />
      <h1 className="sr-only">
        {copy.eyebrow}. {copy.heading}
      </h1>
      <div
        ref={envelopeRef}
        className={`relative overflow-hidden bg-[#eadacb] ${ENVELOPE_BOX} ${CARD}`}
      >
        <Envelope>
          <form onSubmit={handleSubmit} className="absolute inset-0">
            <label htmlFor="password" className="sr-only">
              Invitation code
            </label>
            <div className={`${CONTROL} top-[82.95%]`}>
              <LockIcon className="pointer-events-none absolute top-1/2 left-[8%] size-[max(1.1rem,1.8cqh)] -translate-y-1/2 text-taupe" />
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder={copy.placeholder}
                autoComplete="current-password"
                required
                aria-invalid={Boolean(error)}
                aria-describedby={error ? 'password-error' : undefined}
                className={`size-full rounded-full border border-[#dccabb] bg-[#f7f0e8] pl-[19%] font-serif text-[max(1rem,1.8cqh)] text-taupe-dark shadow-[inset_0_1px_3px_rgb(107_92_80/0.12),0_1px_0_rgb(255_255_255/0.6)] outline-none placeholder:text-taupe placeholder:italic focus:border-taupe focus:ring-1 focus:ring-taupe ${password ? 'pr-12' : 'pr-4'}`}
              />
              {/* Only once there is something to show, so the placeholder has the whole width. */}
              {password && (
                <button
                  type="button"
                  onClick={() => setShowPassword((value) => !value)}
                  aria-label={showPassword ? 'Hide invitation code' : 'Show invitation code'}
                  className="absolute inset-y-0 right-0 flex items-center px-4 text-taupe/70 hover:text-taupe"
                >
                  {showPassword ? <EyeOffIcon className="size-5" /> : <EyeIcon className="size-5" />}
                </button>
              )}
            </div>

            <button
              type="submit"
              disabled={submitting}
              className={`${CONTROL} top-[89.77%] flex items-center justify-center gap-[0.8em] rounded-full bg-linear-to-b from-[#946f66] to-[#88655c] font-serif text-[max(0.8rem,1.55cqh)] font-semibold tracking-[0.26em] text-white uppercase shadow-[inset_0_1px_0_rgb(255_255_255/0.22)] transition hover:brightness-95 disabled:opacity-70`}
            >
              {submitting ? 'Opening…' : copy.button}
              <ArrowRightIcon className="size-[1.3em]" />
            </button>

            <p
              id="password-error"
              role="alert"
              className="absolute inset-x-[8%] top-[93.6%] text-center font-serif text-[max(0.85rem,1.65cqh)] leading-tight text-red-800"
            >
              {error}
            </p>
          </form>
        </Envelope>
      </div>
    </main>
  )
}
