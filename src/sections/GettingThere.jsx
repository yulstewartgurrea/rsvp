import SectionHeading from '../components/SectionHeading'
import { wedding } from '../content/wedding'

export default function GettingThere() {
  return (
    <section id="travel" className="scroll-mt-16 bg-warm-ivory px-4 py-20 sm:scroll-mt-20 sm:py-24">
      <SectionHeading title="Getting There" />
      <div className="mx-auto max-w-4xl space-y-16">
        {wedding.travel.map((item) => (
          <article key={item.title} className="text-center">
            <h3 className="text-xl font-medium tracking-wide text-taupe">{item.title}</h3>
            <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-taupe">{item.text}</p>
            <img src={item.image} alt="" className="mt-8 aspect-[16/7] w-full object-cover" />
          </article>
        ))}
      </div>
    </section>
  )
}
