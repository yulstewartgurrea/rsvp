import Ornament from '../components/Ornament'
import { wedding } from '../content/wedding'
import { useCountdown } from '../hooks/useCountdown'

function Ring({ value, label }) {
  return (
    <div className="relative flex size-24 flex-col items-center justify-center rounded-full border border-dusty-rose sm:size-36">
      <div className="pointer-events-none absolute inset-1.5 rounded-full border border-muted-rose" />
      <Ornament className="absolute -top-3 left-1/2 h-6 w-16 -translate-x-1/2 bg-warm-ivory px-1 sm:w-20" />
      <span className="text-2xl font-light text-taupe tabular-nums sm:text-4xl">{String(value).padStart(2, '0')}</span>
      <span className="mt-1 text-[0.65rem] uppercase tracking-[0.2em] text-taupe sm:text-xs">{label}</span>
    </div>
  )
}

export default function Countdown() {
  const { done, days, hours, minutes } = useCountdown(wedding.date)

  return (
    <section aria-label="Countdown to the wedding" className="bg-warm-ivory px-4 py-16 sm:py-20">
      {done ? (
        <p className="text-center font-script text-5xl text-taupe">Just married!</p>
      ) : (
        <div className="flex justify-center gap-4 sm:gap-10">
          <Ring value={days} label="Days" />
          <Ring value={hours} label="Hours" />
          <Ring value={minutes} label="Minutes" />
        </div>
      )}
    </section>
  )
}
