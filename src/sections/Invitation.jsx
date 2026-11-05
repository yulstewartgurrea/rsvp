import { BACKDROP, ENVELOPE_BOX } from '../components/Envelope'
import InvitationCard from '../components/InvitationCard'

// The page opens on the invitation card, laid on the login's soft ivory just where the envelope sat.
export default function Invitation() {
  return (
    <section id="home" className={`relative flex min-h-svh items-center justify-center sm:p-6 ${BACKDROP}`}>
      <div className={`relative ${ENVELOPE_BOX}`}>
        <InvitationCard />
      </div>
    </section>
  )
}
