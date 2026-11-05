import { Drawing, ITALIC, LARGE_CAPS, OutlineButton, Part, Split } from '../components/PosterParts'
import { wedding } from '../content/wedding'

const { title, note, url } = wedding.stay

export default function Stay({ id }) {
  return (
    <Part id={id} title="Where to Stay">
      <Split centred drawing={<Drawing name="stay" width={16.5} />}>
        <p className={`max-w-[14em] text-balance ${LARGE_CAPS}`}>{title}</p>
        <p className={`max-w-[30cqw] text-balance ${ITALIC}`}>{note}</p>
        <OutlineButton href={url}>View options</OutlineButton>
      </Split>
    </Part>
  )
}
