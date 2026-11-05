import { Part } from '../components/PosterParts'
import { wedding } from '../content/wedding'
import { useCountdown } from '../hooks/useCountdown'

function Unit({ value, label }) {
  return (
    <li className="flex h-[max(3.5rem,10.4cqw)] w-[max(3.9rem,12.2cqw)] flex-col items-center justify-center rounded-[0.6rem] border border-gold/45">
      <span className="text-[max(1.3rem,4.6cqw)] leading-none tabular-nums lining-nums">{value}</span>
      <span className="mt-[0.8cqw] text-[max(0.55rem,1.5cqw)] font-medium tracking-[0.12em] uppercase">{label}</span>
    </li>
  )
}

export default function Countdown({ id }) {
  const { done, days, hours, minutes, seconds } = useCountdown(wedding.date)
  return (
    <Part id={id} title="Countdown" className="pt-[max(1.25rem,4cqw)]">
      {done ? (
        <p className="text-center font-signature text-[max(2rem,7cqw)]">Just married!</p>
      ) : (
        <ul className="flex justify-center gap-[max(0.6rem,2.9cqw)]">
          <Unit value={days} label="Days" />
          <Unit value={hours} label="Hours" />
          <Unit value={minutes} label="Minutes" />
          <Unit value={seconds} label="Seconds" />
        </ul>
      )}
    </Part>
  )
}
