import { BranchDivider, Sprig } from '../components/Botanicals'
import { MapPinIcon } from '../components/Icons'
import { wedding } from '../content/wedding'

const { name, tagline, location, mapUrl } = wedding.venue
const image = (piece) => `/images/venue/${piece}.webp`

// The room above and below the photo: at least its least, growing with the screen's spare height up
// to its most. The address sits close under the photo, as on the card. The section's own top and
// bottom room is fixed and close, as there is no ornament between it and the countdown or The Day:
// its top room matches the room above the countdown's heading, so the countdown sits evenly between.
// The photo takes up the rest of the screen, and only once it is as large as it gets does anything
// left over go above and below everything, evenly.
const GAP_ABOVE = 'block min-h-[2cqw] max-h-[19cqw] flex-[2_1_2cqw]'
const GAP_BELOW = 'block min-h-[1.5cqw] max-h-[13cqw] flex-[1.5_1_1.5cqw]'

// Venue / Location, a screen of its own like the invitation: drawn from the user's venue card, with
// its photo of the greenhouse fading into the paper. On a phone it fills the screen below the
// navigation bar, where the bar's link brings it; on anything wider it is the envelope's shape.
export default function Venue({ id }) {
  return (
    <section
      id={id}
      className="relative isolate flex min-h-[max(calc(100svh-4rem),34rem)] scroll-mt-16 flex-col items-center justify-center pt-[max(1.5rem,6cqw)] pb-[max(1.5rem,6cqw)] text-center sm:min-h-[177.68cqw] sm:scroll-mt-20"
    >
      <Sprig className="h-[9cqw] w-auto" />
      <h2 className="mt-[2.5cqw] flex items-center justify-center gap-[3.5cqw] text-[max(1rem,4.3cqw)] leading-none font-medium tracking-[0.24em] uppercase">
        <span aria-hidden="true" className="h-px w-[6.5cqw] bg-gold/70" />
        {/* The letter spacing also follows the last letter; pulled back so the words sit centred. */}
        <span className="-mr-[0.24em]">Venue / Location</span>
        <span aria-hidden="true" className="h-px w-[6.5cqw] bg-gold/70" />
      </h2>
      <p className="mt-[2.5cqw] font-signature text-[max(1.9rem,7.6cqw)] leading-tight text-cocoa/85">{tagline}</p>
      <BranchDivider className="mt-[1.5cqw] h-auto w-[40cqw]" />

      <span aria-hidden="true" className={GAP_ABOVE} />
      {/* The photo at its own shape, or on a tall screen a little taller, trimming its far sides
          evenly round the greenhouse, which sits a little right of the middle. */}
      <div className="relative min-h-[80.57cqw] w-full max-h-[108cqw] flex-[6_1_80.57cqw]">
        <img
          src={image('photo')}
          alt={`${name}, ${location}`}
          loading="lazy"
          className="absolute inset-0 size-full object-cover object-[54%_50%]"
          width="1024"
          height="825"
        />
      </div>
      <span aria-hidden="true" className={GAP_BELOW} />

      <div aria-hidden="true" className="flex items-center gap-[2.5cqw]">
        <span className="h-px w-[15cqw] bg-gold/70" />
        <MapPinIcon className="size-[max(1.1rem,3.6cqw)] text-gold" />
        <span className="h-px w-[15cqw] bg-gold/70" />
      </div>
      <p className="mt-[1.8cqw] max-w-[82cqw] text-[max(1.05rem,4.1cqw)] text-balance italic">{location}</p>
      <a
        href={mapUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-[3.5cqw] rounded-full border border-gold/80 bg-white/45 px-[2.4em] py-[0.75em] text-[max(0.72rem,2.5cqw)] font-medium tracking-[0.24em] uppercase transition-colors hover:bg-white/80"
      >
        View on map
      </a>
    </section>
  )
}
