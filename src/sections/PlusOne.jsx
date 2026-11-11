import { Fan } from '../components/Botanicals'
import { NoPlusOneIcon } from '../components/Icons'
import { wedding } from '../content/wedding'

const { title, note } = wedding.plusOne

// Whether guests may bring someone, after the user's design: its icon in a soft round badge (as on
// The Day), the question in large italics, a small fan of baby's breath between two fine lines, and
// the answer.
export default function PlusOne({ id }) {
  return (
    <section id={id} className="flex scroll-mt-16 flex-col items-center px-[8cqw] text-center sm:scroll-mt-20">
      <span className="flex size-[max(4.25rem,18cqw)] items-center justify-center rounded-full border border-[#e6d3c3] bg-[#f3e8de]">
        <NoPlusOneIcon className="size-[56%] text-cocoa" strokeWidth={1.05} />
      </span>
      <h2 className="mt-[max(1rem,4.5cqw)] text-[max(1.6rem,7cqw)] leading-tight font-medium italic">{title}</h2>
      <div aria-hidden="true" className="mt-[max(0.6rem,2.5cqw)] flex items-center gap-[3cqw]">
        <span className="h-px w-[13cqw] bg-gold/60" />
        <Fan className="h-auto w-[15cqw]" />
        <span className="h-px w-[13cqw] bg-gold/60" />
      </div>
      <p className="mt-[max(0.9rem,4cqw)] max-w-[76cqw] text-[max(1rem,3.5cqw)] leading-relaxed tracking-[0.02em] text-balance">{note}</p>
    </section>
  )
}
