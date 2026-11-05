import { wedding } from '../content/wedding'

export default function Footer() {
  const year = new Date(wedding.date).getFullYear()

  return (
    <footer
      className="relative bg-taupe bg-cover bg-center px-4 pt-20 pb-8 text-center text-white sm:pt-28"
      style={{ backgroundImage: `url("${wedding.footer.image}")` }}
    >
      <div className="absolute inset-0 bg-black/50" />
      <div className="relative">
        <div className="relative mx-auto flex size-60 flex-col items-center justify-center rounded-full bg-warm-ivory/85 text-taupe-dark sm:size-72">
          <div className="pointer-events-none absolute inset-3 rounded-full border border-dusty-rose" />
          <p className="font-script text-4xl sm:text-5xl">{wedding.coupleNames}</p>
          <p className="mt-2 text-xs uppercase tracking-[0.3em]">{wedding.footer.message}</p>
        </div>
        <p className="mt-16 text-xs text-white/70 sm:mt-20">
          © {year} {wedding.coupleNames}
        </p>
      </div>
    </footer>
  )
}
