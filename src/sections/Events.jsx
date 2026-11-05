import { CalendarIcon, ClockIcon, MapPinIcon } from '../components/Icons'
import SectionHeading from '../components/SectionHeading'
import { wedding } from '../content/wedding'

function Detail({ icon: Icon, children }) {
  return (
    <li className="flex gap-3">
      <Icon className="mt-0.5 size-4 shrink-0 text-dusty-rose" />
      <span>{children}</span>
    </li>
  )
}

function Event({ event, flipped }) {
  return (
    <article className="grid items-center gap-6 md:grid-cols-2 md:gap-0">
      <img
        src={event.image}
        alt={event.venue}
        className={`aspect-[4/3] w-full object-cover ${flipped ? 'md:order-last' : ''}`}
      />
      <div
        className={`relative border border-champagne bg-antique-ivory p-8 sm:p-10 md:z-10 ${flipped ? 'md:-mr-12' : 'md:-ml-12'}`}
      >
        <h3 className="font-script text-4xl text-taupe">{event.title}</h3>
        <ul className="mt-5 space-y-2 text-sm text-taupe-dark">
          <Detail icon={CalendarIcon}>{event.date}</Detail>
          <Detail icon={ClockIcon}>{event.time}</Detail>
          <Detail icon={MapPinIcon}>
            {event.venue}
            <br />
            <span className="text-taupe">{event.address}</span>
          </Detail>
        </ul>
        <p className="mt-5 text-sm leading-relaxed text-taupe">{event.description}</p>
        <a
          href={event.mapUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-block border-b border-dusty-rose pb-0.5 text-xs font-medium uppercase tracking-[0.2em] text-taupe hover:border-taupe"
        >
          See location
        </a>
      </div>
    </article>
  )
}

export default function Events() {
  return (
    <section id="events" className="scroll-mt-16 bg-warm-ivory px-4 py-20 sm:scroll-mt-20 sm:py-24">
      <SectionHeading title="When & Where" />
      <div className="mx-auto max-w-5xl space-y-16 md:space-y-20">
        {wedding.events.map((event, i) => (
          <Event key={event.id} event={event} flipped={i % 2 === 1} />
        ))}
      </div>
    </section>
  )
}
