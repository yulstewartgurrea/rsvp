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
// the flowers in the top corner with the ribbon running down the left, a stretch where it barely
// shows at the edge (which lengthens to fill the screen), and the flowers on the right with the
// swoosh beneath. Heights are the slices' own, in cqw of the page.
const TOP = 47.65
const BOTTOM = 42.82
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

// The room between the invitation's groups of words: at least its least, growing with the screen's
// spare height up to its most (the larger gaps twice as fast as the smaller), so on a tall phone the
// words spread out evenly rather than huddling in the middle. Whatever is left over goes above and
// below them, a little more below, clear of the flowers and the swoosh.
const GAP = 'block min-h-[3.5cqw] max-h-[15cqw] flex-[2]'
const SMALL_GAP = 'block min-h-[2.2cqw] max-h-[9cqw] flex-1'

// The invitation at the top of the page. It is exactly the envelope's size, so it is what lifts out
// as the envelope opens: on a phone, the whole screen, and on anything wider the envelope's shape. It
// only grows if its words need more room. Its scroll margin on wider screens is the room above the
// page (POSTER_COLUMN's top padding), so the menu's Home link goes right back to the top. `wordsRef`
// and `wordsStyle` are for the words, which the opening brings up once the envelope is open.
export default function Hero({ id, wordsRef, wordsStyle }) {
  return (
    <section
      id={id}
      className="relative isolate flex min-h-[max(100svh,32rem)] flex-col px-[12cqw] pt-[8cqw] pb-[15cqw] sm:min-h-[177.68cqw] sm:scroll-mt-[max(1.5rem,calc((100svh-clamp(18.75rem,49svh,30rem)*1.7768)/2))]"
    >
      <Ribbons />
      <div ref={wordsRef} style={wordsStyle} className="flex flex-1 flex-col items-center text-center">
        <span aria-hidden="true" className="flex-1" />
        <Sprig className="h-[9.5cqw] w-auto" />
        <p className={`mt-[1.5cqw] max-w-[40cqw] text-balance ${SMALL}`}>{wedding.invitation.intro}</p>
        <span aria-hidden="true" className={GAP} />
        <h1 className="flex flex-col items-center text-[6.2cqw] leading-none font-medium tracking-[0.14em] uppercase">
          <span>{first}</span>
          <span className="flex items-center gap-[0.15em] py-[0.1em] font-signature text-[1.45em] tracking-normal normal-case">
            <Flourish />
            and
            <Flourish flipped />
          </span>
          <span>{second}</span>
        </h1>
        <span aria-hidden="true" className={GAP} />
        <p className={`max-w-[17em] ${SMALL}`}>{wedding.invitation.invite}</p>
        <span aria-hidden="true" className={SMALL_GAP} />
        <Garland className="h-auto w-[34cqw]" />
        <span aria-hidden="true" className={SMALL_GAP} />
        <p className={SMALL}>{weekday}</p>
        <p className="mt-[1.2cqw] text-[max(1.1rem,4.5cqw)] leading-none tracking-[0.06em] uppercase lining-nums">{fullDate}</p>
        <p className={`mt-[1.8cqw] max-w-[15em] text-balance ${SMALL}`}>{wedding.invitation.time}</p>
        <span aria-hidden="true" className={SMALL_GAP} />
        <span className="h-px w-[9cqw] bg-gold/70" />
        <p className="mt-[2cqw] font-signature text-[max(1.6rem,6.6cqw)] leading-tight">{wedding.venue.name}</p>
        <p className={`max-w-[56cqw] text-balance ${SMALL}`}>{wedding.venue.location}</p>
        <span aria-hidden="true" className="flex-[1.25]" />
      </div>
    </section>
  )
}
