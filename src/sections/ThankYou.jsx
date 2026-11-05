import { HeartFlourish } from '../components/Botanicals'
import { Part } from '../components/PosterParts'
import { wedding } from '../content/wedding'

// The close of the page, over the poster's ribbons and baby's breath at the bottom (its own height,
// in cqw of the page).
export default function ThankYou() {
  return (
    <div className="relative isolate pb-[13cqw]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 -z-10"
        style={{ height: '34.12cqw', backgroundImage: 'url("/images/poster/bottom.webp")', backgroundSize: '100% 100%' }}
      />
      <Part title="Thank You">
        <div className="flex flex-col items-center text-center">
          <p className="max-w-[60cqw] text-[max(1rem,3cqw)] text-balance italic">{wedding.thankYou}</p>
          <HeartFlourish className="mt-[2.5cqw] h-auto w-[17cqw]" />
        </div>
      </Part>
    </div>
  )
}
