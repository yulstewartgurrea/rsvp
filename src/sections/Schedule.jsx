import { DinnerIcon, MusicIcon, RingsIcon, ToastIcon } from '../components/Icons'
import { Part } from '../components/PosterParts'
import { wedding } from '../content/wedding'

const ICONS = { rings: RingsIcon, toast: ToastIcon, dinner: DinnerIcon, music: MusicIcon }

// The day in order, its parts evenly spaced along a fine line that runs between their icons.
export default function Schedule({ id }) {
  return (
    <Part id={id} title="The Day">
      <ol className="mx-auto grid w-[86cqw] max-w-full grid-cols-4">
        {wedding.schedule.map(({ id: key, time, title, icon }, i) => {
          const Icon = ICONS[icon]
          return (
            <li key={key} className="relative flex flex-col items-center text-center">
              {i > 0 && (
                <span aria-hidden="true" className="absolute top-[max(0.8rem,3.2cqw)] right-[calc(50%+max(1.3rem,5cqw))] left-[calc(-50%+max(1.3rem,5cqw))] h-px bg-gold/50" />
              )}
              <Icon className="size-[max(1.6rem,6.4cqw)] text-cocoa" />
              <span className="mt-[2cqw] text-[max(0.72rem,2.2cqw)] leading-none tracking-[0.06em] lining-nums">{time}</span>
              <span className="mt-[1cqw] text-[max(0.56rem,1.75cqw)] font-medium tracking-[0.1em] uppercase">{title}</span>
            </li>
          )
        })}
      </ol>
    </Part>
  )
}
