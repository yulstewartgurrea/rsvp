// The reply form, opened over the page from its RSVP part. Replies are saved to Supabase.
import { useState } from 'react'
import { wedding } from '../content/wedding'
import { supabase } from '../lib/supabase'
import { Garland } from './Botanicals'
import { CloseIcon, PlusIcon } from './Icons'

const { deadline, closesAt } = wedding.rsvp
const [first, second] = wedding.partners.map((partner) => partner.name)
const CLOSES_AT = new Date(closesAt).getTime()
const isClosed = () => Date.now() >= CLOSES_AT

const emptyForm = () => ({
  name: '',
  email: '',
  attending: '',
  // The names of the people coming with them, one field each; blank ones are left out.
  guests: [''],
  message: '',
})

// At least 16px, so phones don't zoom in on the fields.
const inputClass =
  'w-full rounded-md border border-gold/45 bg-white/70 px-4 py-2.5 font-serif text-base text-cocoa outline-none focus:border-cocoa focus:ring-1 focus:ring-cocoa'
const labelText = 'block text-xs font-medium tracking-[0.15em] uppercase'
const labelClass = `mb-1.5 ${labelText}`

function Choice({ name, value, checked, onChange, children, type = 'radio', required }) {
  return (
    <label
      className={`flex cursor-pointer items-center gap-3 rounded-md border px-4 py-2.5 text-base transition-colors ${
        checked ? 'border-cocoa bg-white' : 'border-gold/45 bg-white/50 hover:bg-white'
      }`}
    >
      <input type={type} name={name} value={value} checked={checked} onChange={onChange} required={required} className="size-4 accent-cocoa" />
      {children}
    </label>
  )
}

function Closed() {
  return (
    <div role="alert" className="py-4 text-center">
      <Garland className="mx-auto h-auto w-40" />
      <h2 id="rsvp-title" className="mt-4 text-xl font-medium tracking-[0.2em] uppercase">
        RSVP is now closed
      </h2>
      <p className="mx-auto mt-3 max-w-sm text-lg text-balance italic">
        Replies closed on {deadline}. If you still need to reach us, please contact {first} or {second} directly.
      </p>
    </div>
  )
}

function ThankYou({ name, attending, onReset }) {
  return (
    <div className="py-4 text-center" role="status">
      <Garland className="mx-auto h-auto w-40" />
      <h3 className="mt-4 font-signature text-5xl">Thank you, {name.split(' ')[0]}!</h3>
      <p className="mx-auto mt-3 max-w-sm text-lg italic">
        {attending ? "We've got your RSVP and can't wait to celebrate with you." : "We'll miss you. Thank you for letting us know."}
      </p>
      <button type="button" onClick={onReset} className="mt-6 text-xs font-medium tracking-[0.2em] uppercase underline underline-offset-4">
        Send another response
      </button>
    </div>
  )
}

export default function RsvpDialog({ ref }) {
  const [form, setForm] = useState(emptyForm)
  const [status, setStatus] = useState(() => (isClosed() ? 'closed' : 'idle'))
  const [error, setError] = useState('')

  const attending = form.attending === 'yes'
  const update = (field) => (event) => setForm((current) => ({ ...current, [field]: event.target.value }))
  const setGuests = (change) => setForm((current) => ({ ...current, guests: change(current.guests) }))

  async function handleSubmit(event) {
    event.preventDefault()
    // In case the deadline passed while the form was open.
    if (isClosed()) {
      setStatus('closed')
      return
    }
    setStatus('sending')
    setError('')
    const guests = form.guests.map((guest) => guest.trim()).filter(Boolean)
    // No .select() here: guests may insert RSVPs but not read them back.
    const { error } = await supabase.from('rsvps').insert({
      name: form.name.trim(),
      email: form.email.trim(),
      attending,
      // Everyone coming: the person replying and the guests they named.
      guest_count: attending ? 1 + guests.length : 0,
      other_guests: attending ? guests : [],
      message: form.message.trim() || null,
    })

    // The database refuses replies after the deadline by its own clock, which wins if this device's
    // clock is off. 42501 is that refusal; within a day of the deadline it's taken to mean closed.
    if (error?.code === '42501' && Date.now() >= CLOSES_AT - 24 * 60 * 60 * 1000) {
      setStatus('closed')
      return
    }
    if (error) {
      console.error('RSVP insert failed', error)
      setError("We couldn't send your RSVP. Please try again in a moment.")
      setStatus('idle')
      return
    }
    setStatus('sent')
  }

  function reset() {
    setForm(emptyForm())
    setStatus('idle')
  }

  return (
    <dialog
      ref={ref}
      aria-labelledby="rsvp-title"
      // A click on the dimmed page around the form, rather than on the form, closes it.
      onClick={(event) => event.target === event.currentTarget && event.currentTarget.close()}
      className="m-auto max-h-[calc(100svh-2rem)] w-[min(34rem,calc(100%-2rem))] overflow-y-auto rounded-lg bg-paper p-0 font-serif text-cocoa shadow-xl backdrop:bg-cocoa/35"
    >
      <div className="relative p-6 sm:p-9">
        <form method="dialog" className="absolute top-4 right-4">
          <button aria-label="Close" className="rounded-full border border-cocoa/50 p-1.5 text-cocoa/80 hover:bg-cocoa/5 hover:text-cocoa">
            <CloseIcon className="size-5" />
          </button>
        </form>

        {status === 'closed' ? (
          <Closed />
        ) : status === 'sent' ? (
          <ThankYou name={form.name} attending={attending} onReset={reset} />
        ) : (
          <>
            <h2 id="rsvp-title" className="text-center text-xl font-medium tracking-[0.32em] uppercase">
              RSVP
            </h2>
            <p className="mt-1 text-center text-lg italic">Kindly reply by {deadline}.</p>

            <form onSubmit={handleSubmit} className="mt-6 space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="rsvp-name" className={labelClass}>
                    Your name
                  </label>
                  <input id="rsvp-name" value={form.name} onChange={update('name')} autoComplete="name" maxLength={120} required className={inputClass} />
                </div>
                <div>
                  <label htmlFor="rsvp-email" className={labelClass}>
                    Your email
                  </label>
                  <input
                    id="rsvp-email"
                    type="email"
                    value={form.email}
                    onChange={update('email')}
                    autoComplete="email"
                    maxLength={254}
                    required
                    className={inputClass}
                  />
                </div>
              </div>

              <fieldset>
                <legend className={labelClass}>Will you attend?</legend>
                <div className="grid gap-3 sm:grid-cols-2">
                  <Choice name="attending" value="yes" checked={form.attending === 'yes'} onChange={update('attending')} required>
                    Joyfully accept
                  </Choice>
                  <Choice name="attending" value="no" checked={form.attending === 'no'} onChange={update('attending')}>
                    Regretfully decline
                  </Choice>
                </div>
              </fieldset>

              {/* Shown until they decline: anyone coming with them, as many as they like. */}
              {form.attending !== 'no' && (
                // The add button sits beside the heading. It is placed from this wrapper, as a fieldset's
                // heading is drawn in its border, above where anything inside it can be placed from.
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setGuests((guests) => [...guests, ''])}
                    aria-label="Add a guest"
                    className="absolute -top-1.5 right-0 rounded-full bg-cocoa p-1.5 text-paper transition-colors hover:bg-cocoa/90"
                  >
                    <PlusIcon className="size-4" />
                  </button>
                  <fieldset>
                    {/* A little more room below than other labels, for the add button beside it. */}
                    <legend className={`mb-3 ${labelText}`}>Other guests</legend>
                    <div className="space-y-2.5 rounded-lg bg-gold/10 p-3">
                      {form.guests.map((guest, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <input
                            value={guest}
                            onChange={(event) => setGuests((guests) => guests.map((g, j) => (j === i ? event.target.value : g)))}
                            aria-label={`Guest ${i + 1} name`}
                            placeholder="Guest name"
                            autoComplete="off"
                            maxLength={120}
                            className={`${inputClass} placeholder:text-cocoa/45 placeholder:italic`}
                          />
                          {form.guests.length > 1 && (
                            <button
                              type="button"
                              onClick={() => setGuests((guests) => guests.filter((_, j) => j !== i))}
                              aria-label={`Remove guest ${i + 1}`}
                              className="shrink-0 rounded-full p-1.5 text-cocoa/60 hover:bg-cocoa/5 hover:text-cocoa"
                            >
                              <CloseIcon className="size-4" />
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  </fieldset>
                </div>
              )}

              <div>
                <label htmlFor="rsvp-message" className={labelClass}>
                  Message for the couple <span className="tracking-normal normal-case italic">(optional)</span>
                </label>
                <textarea id="rsvp-message" value={form.message} onChange={update('message')} rows={3} maxLength={2000} className={inputClass} />
              </div>

              {error && (
                <p role="alert" className="text-base text-red-800">
                  {error}
                </p>
              )}

              <div className="text-center">
                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="inline-flex items-center gap-2 rounded-md bg-cocoa px-10 py-3 text-xs font-semibold tracking-[0.2em] text-paper uppercase transition-colors hover:bg-cocoa/90 disabled:opacity-60"
                >
                  {status === 'sending' && <span className="size-3.5 animate-spin rounded-full border-2 border-paper/40 border-t-paper" />}
                  {status === 'sending' ? 'Sending…' : 'Send RSVP'}
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </dialog>
  )
}
