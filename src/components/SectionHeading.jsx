import Ornament from './Ornament'

export default function SectionHeading({ title, subtitle }) {
  return (
    <div className="mb-12 text-center sm:mb-16">
      <Ornament className="mx-auto h-10 w-32" />
      <h2 className="mt-2 font-script text-5xl text-taupe-dark sm:text-6xl">{title}</h2>
      {subtitle && <p className="mx-auto mt-4 max-w-xl text-taupe">{subtitle}</p>}
    </div>
  )
}
