import { Drawing, ITALIC, LARGE_CAPS, Part, Split } from '../components/PosterParts'
import { wedding } from '../content/wedding'

const { title, note, colors } = wedding.dressCode

export default function DressCode({ id }) {
  return (
    <Part id={id} title="Dress Code">
      <Split centred drawing={<Drawing name="attire" width={18} />}>
        <p className={LARGE_CAPS}>{title}</p>
        <ul aria-label="Our wedding colors" className="flex gap-[1.3cqw]">
          {colors.map(({ name, hex }) => (
            <li key={name} title={name} className="size-[max(1.1rem,3.6cqw)] rounded-full border border-cocoa/20" style={{ backgroundColor: hex }}>
              <span className="sr-only">{name}</span>
            </li>
          ))}
        </ul>
        <p className={`max-w-[32cqw] text-balance ${ITALIC}`}>{note}</p>
      </Split>
    </Part>
  )
}
