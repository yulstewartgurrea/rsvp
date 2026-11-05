import { HeartIcon } from '../components/Icons'
import SectionHeading from '../components/SectionHeading'
import { wedding } from '../content/wedding'

function Partner({ partner }) {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="w-60 border border-dusty-rose p-3 sm:w-64">
        <img src={partner.photo} alt={partner.fullName} className="aspect-[4/5] w-full object-cover" />
      </div>
      <h3 className="mt-6 font-script text-4xl text-taupe">{partner.fullName}</h3>
      <p className="mt-3 max-w-xs text-sm leading-relaxed text-taupe">{partner.bio}</p>
    </div>
  )
}

export default function Couple() {
  const [first, second] = wedding.partners

  return (
    <section id="couple" className="scroll-mt-16 bg-soft-champagne-pink px-4 py-20 sm:scroll-mt-20 sm:py-24">
      <SectionHeading title="Happy Couple" />
      <div className="mx-auto grid max-w-4xl items-start gap-10 md:grid-cols-[1fr_auto_1fr] md:gap-12">
        <Partner partner={first} />
        <div className="flex items-center justify-center gap-3 md:h-full md:flex-col">
          <span className="h-px w-16 bg-dusty-rose md:h-auto md:w-px md:flex-1" />
          <HeartIcon className="size-5 text-muted-rose stroke-dusty-rose stroke-[1.5]" />
          <span className="h-px w-16 bg-dusty-rose md:h-auto md:w-px md:flex-1" />
        </div>
        <Partner partner={second} />
      </div>
    </section>
  )
}
