import { useState } from 'react'
import Ornament from '../components/Ornament'
import SectionHeading from '../components/SectionHeading'
import { wedding } from '../content/wedding'
import { supabase } from '../lib/supabase'

const { deadline, maxGuests } = wedding.rsvp

const emptyForm = () => ({
  name: '',
  email: '',
  attending: '',
  guestCount: '1',
  events: wedding.events.map((event) => event.id),
  message: '',
})

const inputClass =
  'w-full rounded-md border border-mauve-blush bg-white px-4 py-3 text-sm outline-none placeholder:text-taupe/60 focus:border-taupe focus:ring-2 focus:ring-dusty-rose'
const labelClass = 'mb-1.5 block text-xs font-medium uppercase tracking-[0.15em] text-taupe'

function Choice({ name, value, checked, onChange, children, type = 'radio', required }) {
  return (
    <label
      className={`flex cursor-pointer items-center gap-3 rounded-md border px-4 py-3 text-sm transition-colors ${
        checked ? 'border-taupe bg-white' : 'border-mauve-blush bg-white/60 hover:bg-white'
      }`}
    >
      <input
        type={type}
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        required={required}
        className="size-4 accent-taupe"
      />
      {children}
    </label>
  )
}

function ThankYou({ name, attending, onReset }) {
  return (
    <div className="py-6 text-center" role="status">
      <Ornament className="mx-auto h-10 w-32" />
      <h3 className="mt-4 font-script text-5xl text-taupe">Thank you, {name.split(' ')[0]}!</h3>
      <p className="mx-auto mt-4 max-w-sm text-taupe">
        {attending
          ? "We've got your RSVP and can't wait to celebrate with you."
          : "We'll miss you. Thank you for letting us know."}
      </p>
      <button
        type="button"
        onClick={onReset}
        className="mt-8 text-xs font-medium uppercase tracking-[0.2em] text-taupe underline underline-offset-4"
      >
        Send another response
      </button>
    </div>
  )
}

export default function Rsvp() {
  const [form, setForm] = useState(emptyForm)
  const [status, setStatus] = useState('idle')
  const [error, setError] = useState('')

  const attending = form.attending === 'yes'
  const update = (field) => (event) => setForm((current) => ({ ...current, [field]: event.target.value }))

  function toggleEvent(id) {
    setError('')
    setForm((current) => ({
      ...current,
      events: current.events.includes(id) ? current.events.filter((e) => e !== id) : [...current.events, id],
    }))
  }

  async function handleSubmit(event) {
    event.preventDefault()
    if (attending && form.events.length === 0) {
      setError("Please choose at least one event you'll attend.")
      return
    }

    setStatus('sending')
    setError('')
    // No .select() here: guests may insert RSVPs but not read them back.
    const { error } = await supabase.from('rsvps').insert({
      name: form.name.trim(),
      email: form.email.trim(),
      attending,
      guest_count: attending ? Number(form.guestCount) : 0,
      events: attending ? form.events : [],
      message: form.message.trim() || null,
    })

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
    <section id="rsvp" className="scroll-mt-16 bg-soft-champagne-pink px-4 py-20 sm:scroll-mt-20 sm:py-24">
      <SectionHeading title="Be Our Guest" subtitle={`Kindly reply by ${deadline}.`} />

      <div className="mx-auto max-w-2xl rounded-lg border border-mauve-blush bg-warm-ivory p-6 sm:p-10">
        {status === 'sent' ? (
          <ThankYou name={form.name} attending={attending} onReset={reset} />
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <label htmlFor="rsvp-name" className={labelClass}>
                  Your name
                </label>
                <input
                  id="rsvp-name"
                  value={form.name}
                  onChange={update('name')}
                  autoComplete="name"
                  maxLength={120}
                  required
                  className={inputClass}
                />
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

            {attending && (
              <>
                <div>
                  <label htmlFor="rsvp-guests" className={labelClass}>
                    Number of guests (including you)
                  </label>
                  <select id="rsvp-guests" value={form.guestCount} onChange={update('guestCount')} className={inputClass}>
                    {Array.from({ length: maxGuests }, (_, i) => i + 1).map((count) => (
                      <option key={count} value={count}>
                        {count}
                      </option>
                    ))}
                  </select>
                </div>

                <fieldset>
                  <legend className={labelClass}>What will you be attending?</legend>
                  <div className="grid gap-3 sm:grid-cols-3">
                    {wedding.events.map((event) => (
                      <Choice
                        key={event.id}
                        type="checkbox"
                        name="events"
                        value={event.id}
                        checked={form.events.includes(event.id)}
                        onChange={() => toggleEvent(event.id)}
                      >
                        {event.title}
                      </Choice>
                    ))}
                  </div>
                </fieldset>
              </>
            )}

            <div>
              <label htmlFor="rsvp-message" className={labelClass}>
                Message for the couple <span className="normal-case tracking-normal text-taupe">(optional)</span>
              </label>
              <textarea
                id="rsvp-message"
                value={form.message}
                onChange={update('message')}
                rows={4}
                maxLength={2000}
                className={inputClass}
              />
            </div>

            {error && (
              <p role="alert" className="text-sm text-red-700">
                {error}
              </p>
            )}

            <div className="text-center">
              <button
                type="submit"
                disabled={status === 'sending'}
                className="inline-flex items-center gap-2 rounded-full bg-taupe px-10 py-3 text-xs font-medium uppercase tracking-[0.2em] text-white transition-colors hover:bg-taupe-dark disabled:opacity-60"
              >
                {status === 'sending' && (
                  <span className="size-3.5 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                )}
                {status === 'sending' ? 'Sending…' : 'Send RSVP'}
              </button>
            </div>
          </form>
        )}
      </div>
    </section>
  )
}
