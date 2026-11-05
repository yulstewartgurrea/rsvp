import { Flourish, Garland, Sprig } from '../components/Botanicals'
import { wedding } from '../content/wedding'

const [first, second] = wedding.partners.map((partner) => partner.name)
// Read straight from the date as written, so it is the venue's day wherever the guest is.
const [year, month, day] = wedding.date.slice(0, 10).split('-')
const date = new Date(Date.UTC(year, month - 1, day))
const weekday = date.toLocaleDateString('en', { weekday: 'long', timeZone: 'UTC' })
const fullDate = date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric', timeZone: 'UTC' })

const SMALL = 'text-[max(0.7rem,2.25cqw)] font-medium leading-[1.4] tracking-[0.16em] uppercase'

// The poster's ribbons and baby's breath round the invitation, in three slices of its full width:
// the flowers in the top corner, a plain run of ribbon down the left that stretches when the words
// need more room than in the poster (as they do on a phone, where they're set larger to stay
// readable), and the ribbon's twist, the flowers on the right and the swoosh beneath. Heights are
// the slices' own, in cqw of the page.
const TOP = 41.44
const BOTTOM = 54.83
const slice = (name) => ({ backgroundImage: `url("/images/poster/${name}.webp")`, backgroundSize: '100% 100%' })

function Ribbons() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
      <div className="absolute inset-x-0 top-0" style={{ height: `${TOP}cqw`, ...slice('top-1') }} />
      <div className="absolute inset-x-0" style={{ top: `${TOP}cqw`, bottom: `${BOTTOM}cqw`, ...slice('top-2') }} />
      <div className="absolute inset-x-0 bottom-0" style={{ height: `${BOTTOM}cqw`, ...slice('top-3') }} />
    </div>
  )
}

// The invitation at the top of the page. `wordsRef` and `wordsStyle` are for the words, which the
// opening brings up once the envelope is open.
export default function Hero({ id, wordsRef, wordsStyle }) {
  return (
    <section id={id} className="relative isolate px-[12cqw] pt-[5cqw] pb-[13cqw]" style={{ minHeight: `${TOP + 9.4 + BOTTOM}cqw` }}>
      <Ribbons />
      <div ref={wordsRef} style={wordsStyle} className="flex flex-col items-center text-center">
        <Sprig className="h-[9.5cqw] w-auto" />
        <p className={`mt-[1.5cqw] max-w-[40cqw] text-balance ${SMALL}`}>{wedding.invitation.intro}</p>
        <h1 className="mt-[3.5cqw] flex flex-col items-center text-[6.2cqw] leading-none font-medium tracking-[0.14em] uppercase">
          <span>{first}</span>
          <span className="flex items-center gap-[0.15em] py-[0.1em] font-signature text-[1.45em] tracking-normal normal-case">
            <Flourish />
            and
            <Flourish flipped />
          </span>
          <span>{second}</span>
        </h1>
        <p className={`mt-[3.5cqw] max-w-[17em] ${SMALL}`}>{wedding.invitation.invite}</p>
        <Garland className="mt-[2cqw] h-auto w-[34cqw]" />
        <p className={`mt-[2.5cqw] ${SMALL}`}>{weekday}</p>
        <p className="mt-[1.2cqw] text-[max(1.1rem,4.5cqw)] leading-none tracking-[0.06em] uppercase lining-nums">{fullDate}</p>
        <p className={`mt-[1.8cqw] max-w-[15em] text-balance ${SMALL}`}>{wedding.invitation.time}</p>
        <span className="mt-[2.8cqw] h-px w-[9cqw] bg-gold/70" />
        <p className="mt-[1.8cqw] font-signature text-[max(1.6rem,6.6cqw)] leading-tight">{wedding.venue.name}</p>
        <p className={`max-w-[56cqw] text-balance ${SMALL}`}>{wedding.venue.location}</p>
      </div>
    </section>
  )
}
