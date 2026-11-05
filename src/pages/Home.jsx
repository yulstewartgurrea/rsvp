import Navbar from '../components/Navbar'
import Countdown from '../sections/Countdown'
import Couple from '../sections/Couple'
import Events from '../sections/Events'
import Footer from '../sections/Footer'
import GettingThere from '../sections/GettingThere'
import Invitation from '../sections/Invitation'
import Rsvp from '../sections/Rsvp'
import WelcomeBanner from '../sections/WelcomeBanner'

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Invitation />
        <Countdown />
        <Couple />
        <WelcomeBanner />
        <Events />
        <Rsvp />
        <GettingThere />
      </main>
      <Footer />
    </>
  )
}
