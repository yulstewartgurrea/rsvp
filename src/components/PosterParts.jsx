// What every part of the invitation page is made of: its headings, the small ornament between the
// parts, a drawing and words either side of a fine rule, and outlined buttons. Sizes are in cqw, so
// they keep the poster's proportions at any width, but never get too small to read.
import { Ornament } from './Botanicals'
import { ExternalIcon } from './Icons'

// Capitals take level (lining) figures, so dates sit on the line with them.
export const CAPS = 'text-[max(0.7rem,2.2cqw)] font-medium tracking-[0.16em] uppercase lining-nums'
export const LARGE_CAPS = 'text-[max(0.8rem,2.5cqw)] font-medium tracking-[0.16em] uppercase lining-nums'
export const ITALIC = 'text-[max(0.85rem,2.35cqw)] italic leading-snug'

// A part of the page under its heading, which has a fine line either side.
export function Part({ id, title, className = '', children }) {
  return (
    <section id={id} className={`scroll-mt-16 px-[8cqw] sm:scroll-mt-20 ${className}`}>
      <h2 className="flex items-center justify-center gap-[3cqw] text-[max(0.8rem,2.6cqw)] font-medium tracking-[0.32em] uppercase">
        <span aria-hidden="true" className="h-px w-[7cqw] bg-gold/60" />
        {/* The letter spacing also follows the last letter; pulled back so the word sits centred. */}
        <span className="-mr-[0.32em]">{title}</span>
        <span aria-hidden="true" className="h-px w-[7cqw] bg-gold/60" />
      </h2>
      <div className="mt-[4.5cqw]">{children}</div>
    </section>
  )
}

export function Divider() {
  return (
    <div aria-hidden="true" className="flex items-center justify-center gap-[1.5cqw] pt-[4.5cqw] pb-[6.5cqw]">
      <span className="h-px w-[11cqw] bg-gold/50" />
      <Ornament className="size-[max(0.7rem,2.2cqw)]" />
      <span className="h-px w-[11cqw] bg-gold/50" />
    </div>
  )
}

// One of the poster's gold drawings, `width` in cqw of the page.
export function Drawing({ name, width }) {
  return <img src={`/images/poster/${name}.webp`} alt="" className="h-auto" style={{ width: `${width}cqw` }} />
}

// A drawing on the left and words on the right, either side of a fine upright rule. `centred` lines
// the words up down the middle of their side; otherwise they start at its left.
export function Split({ drawing, centred, children }) {
  return (
    <div className={`grid items-center gap-x-[5cqw] ${centred ? 'grid-cols-[0.8fr_1px_1.25fr]' : 'grid-cols-[0.9fr_1px_1.1fr]'}`}>
      <div className="flex justify-center">{drawing}</div>
      <span aria-hidden="true" className="h-full min-h-[14cqw] w-px bg-gold/50" />
      <div className={`flex flex-col gap-[1.6cqw] ${centred ? 'items-center text-center' : 'items-start text-left'}`}>{children}</div>
    </div>
  )
}

// An outlined button: a link that opens in a new tab with `href`, or a button with `onClick`.
export function OutlineButton({ href, onClick, children }) {
  const className = `mt-[1cqw] inline-flex items-center gap-[0.6em] whitespace-nowrap rounded-[0.35em] border border-cocoa/60 px-[1.2em] py-[0.65em] text-[max(0.62rem,1.85cqw)] font-semibold tracking-[0.14em] uppercase transition-colors hover:bg-cocoa/5`
  const content = (
    <>
      {children}
      <ExternalIcon className="size-[1.25em]" />
    </>
  )
  return href ? (
    <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
      {content}
    </a>
  ) : (
    <button type="button" onClick={onClick} className={className}>
      {content}
    </button>
  )
}
