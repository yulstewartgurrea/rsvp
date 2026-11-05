import { DinnerIcon, MusicIcon, RingsIcon, ToastIcon } from '../components/Icons'
import { Part } from '../components/PosterParts'
import { wedding } from '../content/wedding'

const ICONS = { rings: RingsIcon, toast: ToastIcon, dinner: DinnerIcon, music: MusicIcon }

// The day in order, down a fine gold line: each part's icon in a soft round badge, with a small
// gold bead on the line between one badge and the next, and its time and name beside it.
export default function Schedule({ id }) {
  return (
    <Part id={id} title="The Day" large className="pt-[max(2rem,8cqw)]">
      <ol className="mx-auto flex w-fit flex-col pr-[4cqw]">
        {wedding.schedule.map(({ id: key, time, title, icon }, i) => {
          const Icon = ICONS[icon]
          return (
            <li key={key} className={`relative flex items-center gap-[5cqw] ${i > 0 ? 'pt-[max(1.6rem,6.5cqw)]' : ''}`}>
              {i > 0 && (
                <span aria-hidden="true" className="absolute top-0 left-[max(1.875rem,7.75cqw)] h-[max(1.6rem,6.5cqw)] w-px -translate-x-1/2 bg-gold/55">
                  <span className="absolute top-1/2 left-1/2 size-[max(0.35rem,1.4cqw)] -translate-1/2 rounded-full bg-gold/80" />
                </span>
              )}
              <span className="flex size-[max(3.75rem,15.5cqw)] shrink-0 items-center justify-center rounded-full border border-[#e6d3c3] bg-[#f3e8de]">
                <Icon className="size-[62%] text-cocoa" strokeWidth={1.05} />
              </span>
              <div className="text-left">
                <p className="text-[max(1.1rem,4.9cqw)] leading-none font-semibold tracking-[0.04em] lining-nums">{time}</p>
                <p className="mt-[max(0.35rem,1.5cqw)] text-[max(0.72rem,3.1cqw)] leading-none font-medium tracking-[0.26em] uppercase">{title}</p>
              </div>
            </li>
          )
        })}
      </ol>
    </Part>
  )
}
