import { CAPS, Drawing, LARGE_CAPS, OutlineButton, Part, Split } from '../components/PosterParts'
import { wedding } from '../content/wedding'

// The RSVP part of the page. The reply form itself opens over the page, from `onRsvp`.
export default function Rsvp({ id, onRsvp }) {
  return (
    <Part id={id} title="RSVP">
      <Split centred drawing={<Drawing name="rsvp" width={19} />}>
        <div>
          <p className={CAPS}>Kindly reply</p>
          <p className={`mt-[0.6cqw] ${LARGE_CAPS}`}>
            <span className="text-gold">By </span>
            {wedding.rsvp.deadline}
          </p>
        </div>
        <OutlineButton onClick={onRsvp}>RSVP now</OutlineButton>
      </Split>
    </Part>
  )
}
