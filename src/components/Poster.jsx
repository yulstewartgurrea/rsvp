// The invitation the guest opens: one long page of ivory paper inside a thin gold frame, read from
// top to bottom like the poster it is drawn from. It is also drawn inside the envelope as it opens
// (as a `preview`, which leaves out the page's ids and can't be used), so the two match exactly.
import Countdown from '../sections/Countdown'
import DressCode from '../sections/DressCode'
import Hero from '../sections/Hero'
import Rsvp from '../sections/Rsvp'
import Schedule from '../sections/Schedule'
import Stay from '../sections/Stay'
import ThankYou from '../sections/ThankYou'
import Venue from '../sections/Venue'
import { CARD } from './Envelope'
import { Divider } from './PosterParts'

// Its width is its parent's. `wordsRef` is for the words of the invitation at the top and `restRef`
// for everything below it, which the opening brings up once the envelope is open, starting hidden
// with `wordsHidden`. `onRsvp` opens the reply form.
export default function Poster({ preview = false, wordsRef, restRef, wordsHidden = false, onRsvp }) {
  const id = (name) => (preview ? undefined : name)
  const hidden = wordsHidden ? { opacity: 0 } : undefined
  return (
    <div inert={preview} className={`relative isolate overflow-hidden bg-paper font-serif text-cocoa [container-type:inline-size] ${CARD}`}>
      <div aria-hidden="true" className="pointer-events-none absolute inset-[2cqw] border border-gold/50" />
      <Hero id={id('home')} wordsRef={wordsRef} wordsStyle={hidden} />
      <div ref={restRef} style={hidden}>
        <Countdown id={id('countdown')} />
        <Divider />
        <Venue id={id('venue')} />
        <Divider />
        <Schedule id={id('schedule')} />
        <Divider />
        <DressCode id={id('dress-code')} />
        <Divider />
        <Stay id={id('stay')} />
        <Divider />
        <Rsvp id={id('rsvp')} onRsvp={onRsvp} />
        <Divider />
        <ThankYou />
      </div>
    </div>
  )
}
