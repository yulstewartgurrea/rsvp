import { MapPinIcon } from '../components/Icons'
import { Drawing, ITALIC, LARGE_CAPS, OutlineButton, Part, Split } from '../components/PosterParts'
import { wedding } from '../content/wedding'

const { name, location, mapUrl } = wedding.venue

export default function Venue({ id }) {
  return (
    <Part id={id} title="Venue / Location">
      <Split drawing={<Drawing name="venue" width={33} />}>
        <div className="grid grid-cols-[auto_1fr] gap-x-[2cqw] gap-y-[1.2cqw]">
          <MapPinIcon className="mt-[0.1em] size-[max(1rem,3cqw)] text-gold" />
          <p className={LARGE_CAPS}>{name}</p>
          <p className={`col-start-2 ${ITALIC}`}>{location}</p>
          <div className="col-start-2">
            <OutlineButton href={mapUrl}>View on map</OutlineButton>
          </div>
        </div>
      </Split>
    </Part>
  )
}
