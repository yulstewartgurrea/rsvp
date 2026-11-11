import { Ornament } from '../components/Botanicals'
import { BedIcon } from '../components/Icons'
import { ITALIC, OutlineButton, Part } from '../components/PosterParts'
import { wedding } from '../content/wedding'

const { note, places, guestNote } = wedding.stay

// A fine gold line, as long as `className` makes it.
const Line = ({ className }) => <span aria-hidden="true" className={`h-px bg-gold/55 ${className}`} />

// One place: its drawing (cut from the user's design) on the left, and on the right of a fine upright
// rule its name, what it's like and a button out to it. The words never get narrower than their
// longest button; on a phone, where the words are at their smallest, the drawing gives way instead.
function Place({ place }) {
  return (
    <div className="grid grid-cols-[minmax(0,32cqw)_1px_minmax(10.5rem,1fr)] items-center gap-x-[4.5cqw]">
      <img src={`/images/stay/${place.id}.webp`} alt="" loading="lazy" className="h-auto w-full" />
      <span aria-hidden="true" className="w-px self-stretch bg-gold/50" />
      <div className="flex flex-col items-start gap-[max(0.5rem,1.8cqw)] text-left">
        <h3 className="text-[max(0.8rem,3cqw)] leading-tight font-semibold tracking-[0.14em] text-balance uppercase">{place.name}</h3>
        <p className={`text-balance ${ITALIC}`}>{place.note}</p>
        <OutlineButton href={place.url}>{place.button}</OutlineButton>
      </div>
    </div>
  )
}

// The note for guests, in a soft box: its heading between two fine lines, why the places are here,
// what guests are asked on a ribbon (pointed at either end) with a bed beside it, how to book and a
// thank-you.
function GuestNote() {
  const { title, intro, ask, booking, thanks } = guestNote
  return (
    <div className="mt-[max(1.75rem,7cqw)] rounded-[max(0.75rem,2.5cqw)] border border-[#e9d9cb] bg-[#f6efe8] px-[5cqw] pt-[max(1.25rem,4.5cqw)] pb-[max(1.5rem,5cqw)] text-center">
      <h3 className="flex items-center justify-center gap-[2.5cqw] text-[max(0.8rem,2.7cqw)] leading-snug font-semibold tracking-[0.14em] uppercase">
        <Line className="w-[6cqw] shrink-0" />
        {/* The letter spacing also follows the last letter; pulled back so the words sit centred. */}
        <span className="-mr-[0.14em] text-balance">{title}</span>
        <Line className="w-[6cqw] shrink-0" />
      </h3>
      <p className={`mt-[max(0.6rem,2.6cqw)] text-balance ${ITALIC}`}>{intro}</p>
      <p className="relative mx-[1cqw] mt-[max(0.9rem,3.4cqw)] flex items-center justify-center gap-[3cqw] rounded-[max(0.5rem,1.8cqw)] bg-[#efe1d3] px-[6cqw] py-[max(0.75rem,2.6cqw)] text-left before:absolute before:top-1/2 before:left-0 before:size-[max(0.6rem,2cqw)] before:-translate-1/2 before:rotate-45 before:rounded-[1px] before:bg-inherit after:absolute after:top-1/2 after:right-0 after:size-[max(0.6rem,2cqw)] after:translate-x-1/2 after:-translate-y-1/2 after:rotate-45 after:rounded-[1px] after:bg-inherit">
        <BedIcon className="size-[max(2rem,8cqw)] shrink-0" strokeWidth={1.1} />
        <span aria-hidden="true" className="w-px self-stretch bg-cocoa/55" />
        <span className="text-[max(0.9rem,2.6cqw)] leading-snug font-semibold text-balance italic">{ask}</span>
      </p>
      <p className={`mt-[max(0.9rem,3.2cqw)] text-balance lining-nums ${ITALIC}`}>{booking}</p>
      <Line className="mx-auto mt-[max(0.75rem,3cqw)] block w-[9cqw]" />
      <p className={`mt-[max(0.75rem,3cqw)] text-balance ${ITALIC}`}>{thanks}</p>
    </div>
  )
}

// Where to stay, after the user's design: a line on why, the places near the venue with the page's
// small ornament between them, and a note for guests.
export default function Stay({ id }) {
  return (
    <Part id={id} title="Where to Stay" large>
      <p className="mx-auto -mt-[max(0.5rem,2cqw)] max-w-[58cqw] text-center text-[max(0.95rem,2.6cqw)] leading-snug text-balance italic">{note}</p>
      <ul className="mt-[max(1.25rem,5cqw)]">
        {places.map((place, i) => (
          <li key={place.id}>
            {i > 0 && (
              <div aria-hidden="true" className="flex items-center justify-center gap-[1.5cqw] py-[max(1rem,3.5cqw)]">
                <Line className="w-[10cqw]" />
                <Ornament className="size-[max(0.6rem,2cqw)]" />
                <Line className="w-[10cqw]" />
              </div>
            )}
            <Place place={place} />
          </li>
        ))}
      </ul>
      <GuestNote />
    </Part>
  )
}
