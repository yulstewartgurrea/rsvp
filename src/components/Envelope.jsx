// The login envelope: the embossed ivory envelope artwork, drawn to fill its box. Anything placed
// on it is positioned in percentages of the artwork, so it lands on the same spot at any size.
import { useArtworkFrame } from '../hooks/useArtworkFrame'
import { ARTWORK } from '../lib/envelope'

// The envelope's size, shared with the invitation card it opens into: on a phone it fills the
// screen, and on anything wider it is a portrait card the artwork's shape, sized to the screen's
// height. Centre it in a screen-high box with sm:p-6 round it.
export const ENVELOPE_BOX =
  'h-svh min-h-[32rem] w-full sm:aspect-[941/1672] sm:h-auto sm:min-h-0 sm:w-[clamp(18.75rem,49svh,30rem)]'

// On screens wider than a phone the envelope is a portrait card resting on the backdrop below.
export const CARD = 'sm:rounded-lg sm:shadow-[0_1px_2px_rgb(74_63_55/0.12),0_14px_28px_-8px_rgb(74_63_55/0.22),0_44px_90px_-24px_rgb(74_63_55/0.3)]'

// Gentle, uneven lighter and darker patches, as in handmade paper, for plain paper drawn in code.
export const PAPER_TEXTURE = `url("data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="900" height="900">
<filter id="m" x="0" y="0" width="100%" height="100%" color-interpolation-filters="sRGB">
<feTurbulence type="fractalNoise" baseFrequency="0.0035" numOctaves="3" seed="5" stitchTiles="stitch" result="noise"/>
<feColorMatrix in="noise" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0.3 0 0 0 -0.15" result="light"/>
<feColorMatrix in="noise" values="0 0 0 0 0.42 0 0 0 0 0.36 0 0 0 0 0.31 -0.3 0 0 0 0.15" result="dark"/>
<feMerge><feMergeNode in="dark"/><feMergeNode in="light"/></feMerge>
</filter><rect width="100%" height="100%" filter="url(#m)"/></svg>`)}")`

// The artwork filling its parent; `style` can cut out part of it.
export function Artwork({ style }) {
  return (
    <img
      src={ARTWORK.src}
      alt=""
      draggable={false}
      fetchPriority="high"
      className="pointer-events-none absolute inset-0 size-full select-none"
      style={style}
    />
  )
}

// The soft ivory the envelope card rests on, lightest in the middle; the invitation card at the top
// of the main page rests on it too.
export const BACKDROP = 'bg-[radial-gradient(ellipse_at_center,#faf6ef_0%,#f3eee7_60%,#e9e0d5_100%)]'

export function Backdrop({ style }) {
  return <div aria-hidden="true" className={`pointer-events-none fixed inset-0 ${BACKDROP}`} style={style} />
}

// The closed envelope, filling its parent. `children` go on top of the artwork, in a box the size
// of the artwork that is also a size container, so they can be sized in cqw and cqh units.
export function Envelope({ children }) {
  const [ref, frame] = useArtworkFrame()
  return (
    <div ref={ref} className="absolute inset-0">
      {frame && (
        <div className="absolute [container-type:size]" style={frame}>
          <Artwork />
          {children}
        </div>
      )}
    </div>
  )
}
