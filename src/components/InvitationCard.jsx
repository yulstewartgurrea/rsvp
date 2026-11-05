// The invitation card: satin-draped ivory paper printed with the couple's names, the date and the place.
// It is the card found inside the envelope as it opens, and the first thing on the main page, drawn
// the same in both so one hands straight over to the other.
import { wedding } from '../content/wedding'

const [first, second] = wedding.partners.map((partner) => partner.name)
const ceremony = wedding.events[0]
// Read straight from the date as written, so it is the venue's day wherever the guest is.
const [year, month, day] = wedding.date.slice(0, 10).split('-')
const date = new Date(Date.UTC(year, month - 1, day))
const weekday = date.toLocaleDateString('en', { weekday: 'long', timeZone: 'UTC' })
const fullDate = date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric', timeZone: 'UTC' })

// Ivory paper with a thin frame and a soft shadow of leaves, and satin draped across two corners,
// drawn the same shape as the envelope.
const PAPER_IMAGE = 'url("/images/invitation-paper.webp")'

// A small pointed oval leaf, 9 long, growing from its base at 0 0 towards +x.
const LEAF = 'M0 0C2.2-3 6.8-3 9 0 6.8 3 2.2 3 0 0Z'
const LEAF_SHADE = ['fill-sage', 'fill-sage/85', 'fill-sage/70']
const degrees = (radians) => (radians * 180) / Math.PI

// A gently bowed stem from `from` to `to`, with `count` leaves set alternately up it, angled
// towards its tip and smaller towards it, and one more leaf at the tip.
function stem(from, to, bend, count, size) {
  const [ax, ay] = from
  const [bx, by] = to
  const length = Math.hypot(bx - ax, by - ay)
  // The control point sits `bend` off the middle, square to the stem.
  const cx = (ax + bx) / 2 + (bend * (ay - by)) / length
  const cy = (ay + by) / 2 + (bend * (bx - ax)) / length
  const at = (t) => [(1 - t) ** 2 * ax + 2 * (1 - t) * t * cx + t ** 2 * bx, (1 - t) ** 2 * ay + 2 * (1 - t) * t * cy + t ** 2 * by]
  const heading = (t) => degrees(Math.atan2(2 * (1 - t) * (cy - ay) + 2 * t * (by - cy), 2 * (1 - t) * (cx - ax) + 2 * t * (bx - cx)))
  const leaves = Array.from({ length: count }, (_, i) => {
    const t = 0.2 + (0.72 * i) / Math.max(1, count - 1)
    return { at: at(t), angle: heading(t) + (i % 2 ? 36 : -36), size: size * (1 - 0.35 * (i / count)), shade: i % 3 }
  })
  leaves.push({ at: [bx, by], angle: heading(1), size: size * 0.7, shade: 0 })
  return { path: `M${ax} ${ay}Q${cx.toFixed(2)} ${cy.toFixed(2)} ${bx} ${by}`, leaves }
}

// A sprig for the top of the card: a main stem with three side stems branching up from it.
const SPRIG = [
  stem([30, 118], [40, 8], 4, 9, 1.4),
  stem([30.5, 98], [10, 54], -3, 6, 1.3),
  stem([31.5, 76], [20, 28], -2, 6, 1.25),
  stem([33.5, 62], [54, 32], 2, 5, 1.2),
]

// A garland trailing out either side of a small flower, between the invitation and the date: the
// right half, which is mirrored for the left. Leaves grow outwards from the middle.
const GARLAND = [stem([84, 15], [154, 13.5], -1.5, 11, 1.05), stem([104, 14.6], [122, 6.5], -1, 3, 0.7), stem([128, 14], [144, 21], 1, 3, 0.65)]

function Stems({ stems, width = 0.7 }) {
  return stems.map(({ path, leaves }) => (
    <g key={path}>
      <path d={path} className="stroke-sage" strokeWidth={width} strokeLinecap="round" />
      {leaves.map(({ at, angle, size, shade }, i) => (
        <path
          key={i}
          d={LEAF}
          transform={`translate(${at[0].toFixed(2)} ${at[1].toFixed(2)}) rotate(${angle.toFixed(1)}) scale(${size.toFixed(2)})`}
          className={LEAF_SHADE[shade]}
        />
      ))}
    </g>
  ))
}

function Sprig({ className }) {
  return (
    <svg viewBox="0 0 64 120" fill="none" className={className} aria-hidden="true">
      <Stems stems={SPRIG} width={0.9} />
    </svg>
  )
}

function Garland({ className }) {
  return (
    <svg viewBox="0 0 160 30" fill="none" className={className} aria-hidden="true">
      <Stems stems={GARLAND} />
      <g transform="translate(160 0) scale(-1 1)">
        <Stems stems={GARLAND} />
      </g>
      <g transform="translate(80 15)">
        {[0, 72, 144, 216, 288].map((angle) => (
          <ellipse
            key={angle}
            cy="-3.4"
            rx="3"
            ry="3.8"
            transform={`rotate(${angle})`}
            className="fill-muted-rose stroke-dusty-rose stroke-[0.5]"
          />
        ))}
        <circle r="1.7" className="fill-champagne stroke-sage stroke-[0.4]" />
      </g>
    </svg>
  )
}

// The fine pen strokes trailing into and out of the "and" between the names.
function Flourish({ flipped }) {
  return (
    <svg viewBox="0 0 60 12" fill="none" className={`h-[0.3em] w-[1.2em] ${flipped ? '-scale-x-100' : ''}`} aria-hidden="true">
      <path d="M1 9.5C18 10.5 38 10.5 52 7.5 55 6.8 57.5 5.5 59 4" className="stroke-taupe/70" strokeWidth="0.8" strokeLinecap="round" />
    </svg>
  )
}

// Sits in its parent, a box the size of the login envelope, and always has the envelope's shape: on
// anything wider than a phone it is exactly the envelope's size, and on a phone, where the envelope
// fills the screen, it is as wide as the screen less a narrow margin, so the arch is never cropped.
// `ref` and `style` are for the whole card, `wordsRef` and `wordsStyle` for what is printed on it.
export default function InvitationCard({ ref, style, wordsRef, wordsStyle }) {
  const small = 'text-[max(0.7rem,2.5cqw)] font-medium tracking-[0.14em] uppercase'
  return (
    <div
      ref={ref}
      className="absolute inset-3 flex items-center justify-center [container-type:size] sm:inset-0"
      style={{ filter: 'drop-shadow(0 1px 2px rgb(74 63 55 / 0.25)) drop-shadow(0 10px 24px rgb(74 63 55 / 0.2))', ...style }}
    >
      <div className="relative aspect-[941/1672] w-[min(100cqw,56.28cqh)]">
        <div
          className="absolute inset-0 overflow-hidden rounded-lg bg-warm-ivory bg-cover bg-center [container-type:size]"
          style={{ backgroundImage: PAPER_IMAGE }}
        >
          <div
            ref={wordsRef}
            style={wordsStyle}
            className="flex size-full flex-col items-center justify-center px-[8cqw] text-center font-serif leading-[1.6] text-taupe"
          >
            <Sprig className="h-[11cqh] w-auto" />
            <p className={`mt-[3.5cqh] max-w-[58cqw] text-balance ${small}`}>{wedding.invitation.intro}</p>
            <h1 className="mt-[3cqh] flex flex-col items-center text-[6.8cqw] leading-none font-medium tracking-[0.14em] uppercase">
              <span>{first}</span>
              <span className="flex items-center gap-[0.15em] py-[0.12em] font-signature text-[1.5em] tracking-normal normal-case">
                <Flourish />
                and
                <Flourish flipped />
              </span>
              <span>{second}</span>
            </h1>
            <p className={`mt-[4cqh] max-w-[17em] ${small}`}>{wedding.invitation.invite}</p>
            <Garland className="mt-[3.5cqh] h-[6.5cqw] w-[34cqw]" />
            <p className={`mt-[3.5cqh] ${small}`}>{weekday}</p>
            <p className="mt-[1cqh] text-[5cqw] leading-none tracking-[0.04em] lining-nums">{fullDate}</p>
            <p className={`mt-[1.5cqh] max-w-[15em] text-balance ${small}`}>{wedding.invitation.time}</p>
            <span className="mt-[3.5cqh] h-px w-[12cqw] bg-taupe/50" />
            <p className="mt-[2.5cqh] font-signature text-[10cqw] leading-tight">{ceremony.venue}</p>
            <p className={small}>{wedding.location}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
