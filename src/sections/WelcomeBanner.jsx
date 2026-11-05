import { wedding } from '../content/wedding'

export default function WelcomeBanner() {
  const { image, title, text } = wedding.welcome

  return (
    <section
      className="relative bg-taupe bg-cover bg-center px-4 py-24 text-center text-white sm:py-32 md:bg-fixed"
      style={{ backgroundImage: `url("${image}")` }}
    >
      <div className="absolute inset-0 bg-black/55" />
      <div className="relative mx-auto max-w-2xl">
        <h2 className="font-script text-5xl sm:text-6xl">{title}</h2>
        <p className="mt-6 leading-relaxed text-white/90">{text}</p>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <a
            href="#rsvp"
            className="rounded-full bg-warm-ivory px-8 py-3 text-xs font-medium uppercase tracking-[0.2em] text-taupe transition-colors hover:bg-antique-ivory"
          >
            RSVP
          </a>
          <a
            href="#events"
            className="rounded-full border border-white px-8 py-3 text-xs font-medium uppercase tracking-[0.2em] transition-colors hover:bg-white/15"
          >
            Location
          </a>
        </div>
      </div>
    </section>
  )
}
