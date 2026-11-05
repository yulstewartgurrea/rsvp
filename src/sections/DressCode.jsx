import { BranchDivider } from '../components/Botanicals'
import { Part } from '../components/PosterParts'
import { wedding } from '../content/wedding'

const { title, note, men, women, colors } = wedding.dressCode

const CAPTION = 'mt-[max(0.6rem,2.5cqw)] text-[max(0.8rem,3.3cqw)] leading-none font-medium tracking-[0.24em] uppercase'
const CAPTION_NOTE = 'mt-[max(0.3rem,1.2cqw)] max-w-[42cqw] text-[max(0.85rem,3cqw)] leading-snug text-balance italic'

// What to wear, for men and for women: its illustration (drawn from the user's dress code design,
// on a soft circle) above its name and a line on what it means.
function Look({ image, width, look, alt }) {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="flex h-[32cqw] items-end justify-center">
        <img src={`/images/dress/${image}.webp`} alt={alt} loading="lazy" className="h-auto max-h-full" style={{ width: `${width}cqw` }} />
      </div>
      <p className={CAPTION}>{look.title}</p>
      <p className={CAPTION_NOTE}>{look.note}</p>
    </div>
  )
}

// The dress code, after the user's design: the attire in script, a line inviting guests to dress up,
// what that means for men and for women either side of a fine rule, and the wedding's colours.
export default function DressCode({ id }) {
  return (
    <Part id={id} title="Dress Code" large>
      <div className="-mt-[max(0.5rem,2cqw)] flex flex-col items-center text-center">
        <p className="font-signature text-[max(3rem,14cqw)] leading-none">{title}</p>
        <p className="mt-[max(0.5rem,2cqw)] max-w-[68cqw] text-[max(0.95rem,3.4cqw)] leading-snug text-balance italic">{note}</p>
        <BranchDivider className="mt-[max(0.75rem,3cqw)] h-auto w-[44cqw]" />
      </div>

      {/* A little wider than the words above, as the men's outfits are, in the design. */}
      <div className="-mx-[5cqw] mt-[max(1rem,4cqw)] grid grid-cols-[1fr_1px_1fr] items-start gap-x-[3cqw]">
        <Look image="men" width={43} look={men} alt="A suit, a long-sleeve shirt and a polo" />
        <span aria-hidden="true" className="h-full w-px bg-gold/45" />
        <Look image="women" width={30} look={women} alt="A long formal dress" />
      </div>

      <div className="mt-[max(1.25rem,5cqw)] flex flex-col items-center">
        <BranchDivider className="h-auto w-[30cqw]" />
        {/* The letter spacing also follows the last letter; matched on the left so the words sit centred. */}
        <h3 className="mt-[max(0.9rem,3.6cqw)] pl-[0.26em] text-[max(0.85rem,3.6cqw)] leading-none font-medium tracking-[0.26em] whitespace-nowrap uppercase">
          Our color palette
        </h3>
        <ul className="mt-[max(1rem,4cqw)] grid w-full grid-cols-4 gap-x-[4cqw]">
          {colors.map(({ name, hex }) => (
            <li key={name} className="flex flex-col items-center text-center">
              <span
                aria-hidden="true"
                className="aspect-[1.15] w-full rounded-[max(0.6rem,2.6cqw)] shadow-[inset_0_0_0_1px_rgb(92_43_20/0.06),0_1px_3px_rgb(92_43_20/0.08)]"
                style={{ backgroundColor: hex }}
              />
              <span className="mt-[max(0.4rem,1.8cqw)] text-[max(0.8rem,3.1cqw)] leading-tight">{name}</span>
              <span className="mt-[0.15em] text-[max(0.58rem,2.1cqw)] tracking-[0.14em] uppercase lining-nums">{hex}</span>
            </li>
          ))}
        </ul>
      </div>
    </Part>
  )
}
