import { useRef } from 'react'
import { BACKDROP, POSTER_COLUMN } from '../components/Envelope'
import Navbar from '../components/Navbar'
import Poster from '../components/Poster'
import RsvpDialog from '../components/RsvpDialog'

// The invitation, one long page, on the login's soft ivory: on a phone it is the page, and on
// anything wider it sits in a column where the envelope was. The ivory stays put as it scrolls.
export default function Home() {
  const rsvp = useRef(null)
  return (
    <>
      <Navbar />
      <main className={`min-h-svh bg-fixed sm:px-6 sm:pb-6 ${BACKDROP}`}>
        <div className={`mx-auto ${POSTER_COLUMN}`}>
          <Poster onRsvp={() => rsvp.current.showModal()} />
        </div>
      </main>
      <RsvpDialog ref={rsvp} />
    </>
  )
}
