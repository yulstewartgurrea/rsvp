import { BranchDivider, Sparkle } from '../components/Botanicals'
import { Part } from '../components/PosterParts'
import { wedding } from '../content/wedding'

const { title, note, sponsors, guests, colors, colorsNote } = wedding.dressCode

const LOOK_TITLE = 'text-[max(0.8rem,3.3cqw)] leading-none font-medium tracking-[0.24em] uppercase'
const LOOK_NOTE = 'max-w-[42cqw] text-[max(0.85rem,3.1cqw)] leading-snug text-balance italic'
const SWATCH_EDGE = 'shadow-[inset_0_0_0_1px_rgb(92_43_20/0.06),0_1px_3px_rgb(92_43_20/0.08)]'

// A fine gold line, stretching to fill the room beside what it sits next to.
const Line = () => <span aria-hidden="true" className="h-px flex-1 bg-gold/45" />

// Who a group of looks is for, in a soft pill (as the badges on The Day) with a line out to either
// side, and `who` in small capitals under the title.
function GroupTitle({ title, who }) {
  return (
    <div className="-mx-[5cqw] flex items-center">
      <Line />
      <h3 className="flex flex-col items-center rounded-full border border-[#e6d3c3] bg-[#f3e8de] px-[6cqw] py-[max(0.5rem,2cqw)]">
        {/* The letter spacing also follows the last letter; matched on the left so the words sit centred. */}
        <span className="pl-[0.2em] text-[max(0.95rem,3.8cqw)] leading-none font-medium tracking-[0.2em] whitespace-nowrap uppercase">{title}</span>
        {who && (
          <span className="mt-[max(0.3rem,1.2cqw)] pl-[0.18em] text-[max(0.55rem,1.75cqw)] leading-none tracking-[0.18em] whitespace-nowrap uppercase">
            ({who})
          </span>
        )}
      </h3>
      <Line />
    </div>
  )
}

// One look: who it's for, its drawing (cut from the user's design, on a soft circle) and what it
// means. `width` is the drawing's and `height` the row's, in cqw, so the drawings in a row stand on
// one line.
function Look({ look, image, width, height, alt, children }) {
  return (
    <div className="flex flex-col items-center text-center">
      <h4 className={LOOK_TITLE}>{look.title}</h4>
      <div className="mt-[max(0.5rem,2cqw)] flex items-end justify-center" style={{ height: `${height}cqw` }}>
        <img src={`/images/dress/${image}.webp`} alt={alt} loading="lazy" className="h-auto max-h-full" style={{ width: `${width}cqw` }} />
      </div>
      <p className={`mt-[max(0.4rem,1.6cqw)] ${LOOK_NOTE}`}>{look.note}</p>
      {children}
    </div>
  )
}

// Men's and women's looks either side of a fine upright rule: a little wider than the words above,
// as in the design.
function Looks({ men, women }) {
  return (
    <div className="-mx-[5cqw] mt-[max(1rem,4cqw)] grid grid-cols-[1fr_1px_1fr] gap-x-[3cqw]">
      {men}
      <span aria-hidden="true" className="h-full w-px bg-gold/45" />
      {women}
    </div>
  )
}

// A note in a fine outlined pill, between two small stars.
function Note({ className, children }) {
  return (
    <p className={`-mx-[4cqw] flex items-center justify-center gap-[2cqw] rounded-full border border-gold/45 px-[3.5cqw] py-[max(0.4rem,1.5cqw)] text-center ${className}`}>
      <Sparkle className="size-[max(0.55rem,1.9cqw)] shrink-0" />
      <span className="text-balance">{children}</span>
      <Sparkle className="size-[max(0.55rem,1.9cqw)] shrink-0" />
    </p>
  )
}

// The dress code, after the user's design: the attire in script and a line inviting guests to dress
// up, then what the principal sponsors wear and what other guests may, each for men and for women,
// and the wedding's colours.
export default function DressCode({ id }) {
  return (
    <Part id={id} title="Dress Code" large>
      <div className="-mt-[max(0.5rem,2cqw)] flex flex-col items-center text-center">
        <p className="font-signature text-[max(3rem,14cqw)] leading-none">{title}</p>
        <p className="mt-[max(0.5rem,2cqw)] max-w-[68cqw] text-[max(0.95rem,3.4cqw)] leading-snug text-balance italic">{note}</p>
        <BranchDivider className="mt-[max(0.75rem,3cqw)] h-auto w-[44cqw]" />
      </div>

      <div className="mt-[max(1rem,4cqw)]">
        <GroupTitle title={sponsors.title} />
        <Looks
          men={<Look look={sponsors.men} image="sponsor-men" width={32.5} height={30} alt="A black suit with a white shirt and a black tie" />}
          women={
            <Look look={sponsors.women} image="sponsor-women" width={39} height={30} alt="Two long formal dresses, one dusty rose and one burgundy">
              {/* Only the colours show, as in the palette; their names are for screen readers. */}
              <ul className="mt-[max(0.6rem,2.4cqw)] grid grid-cols-2 gap-x-[2.5cqw]">
                {sponsors.women.colors.map(({ name, hex }) => (
                  <li key={name} className={`h-[max(1.4rem,4.4cqw)] w-[max(3.5rem,12cqw)] rounded-full ${SWATCH_EDGE}`} style={{ backgroundColor: hex }}>
                    <span className="sr-only">{name}</span>
                  </li>
                ))}
              </ul>
            </Look>
          }
        />
      </div>

      <BranchDivider className="mx-auto mt-[max(1.25rem,5cqw)] h-auto w-[34cqw]" />

      <div className="mt-[max(1rem,4cqw)]">
        <GroupTitle title={guests.title} who={guests.who} />
        <Looks
          men={<Look look={guests.men} image="guest-men" width={44} height={18.3} alt="A black suit, a grey suit, a long-sleeve shirt and a polo" />}
          women={<Look look={guests.women} image="guest-women" width={25} height={18.3} alt="A long formal dress" />}
        />
        <Note className="mt-[max(1rem,4cqw)] text-[max(0.8rem,2.9cqw)] leading-snug italic">{guests.note}</Note>
      </div>

      <div className="-mx-[5cqw] mt-[max(1.25rem,5cqw)] flex items-center gap-[2cqw]">
        <Line />
        <BranchDivider className="h-auto w-[34cqw]" />
        <Line />
      </div>
      <h3 className="mt-[max(0.9rem,3.6cqw)] pl-[0.2em] text-center text-[max(1rem,4.4cqw)] leading-none font-medium tracking-[0.2em] whitespace-nowrap uppercase">
        Our color palette
      </h3>
      <ul className="mt-[max(1rem,4cqw)] grid grid-cols-4 gap-x-[4cqw]">
        {colors.map(({ name, hex }) => (
          <li key={name} className={`aspect-[1.5] w-full rounded-[max(0.6rem,2.6cqw)] ${SWATCH_EDGE}`} style={{ backgroundColor: hex }}>
            <span className="sr-only">{name}</span>
          </li>
        ))}
      </ul>
      <Note className="mt-[max(1rem,4cqw)] text-[max(0.6rem,2cqw)] leading-snug font-medium tracking-[0.14em] uppercase">{colorsNote}</Note>
    </Part>
  )
}
