import { useEffect, useEffectEvent, useRef, useState } from 'react'
import { useNavigate } from 'react-router'
import { useArtworkFrame } from '../hooks/useArtworkFrame'
import { ARTWORK, FLAPS, polygon, SEAL, SEAL_CLIP } from '../lib/envelope'
import { Artwork, Backdrop, CARD, PAPER_TEXTURE } from './Envelope'
import InvitationCard from './InvitationCard'

// Milliseconds after the code is accepted, as when a real envelope is opened: the flap carrying the
// seal lifts first, the other side just after, and the top and bottom flaps follow while they are
// still rising, uncovering the invitation card inside, whose wording then comes up. The card then
// lifts out to just where it lies at the top of the main page, and the envelope fades away around it.
const AT = {
  navigate: 450, // the form has faded away; the main page loads behind the envelope
  left: 600, // the left flap lifts, taking the seal with it
  right: 700,
  top: 1350,
  bottom: 1500,
  text: 2700,
  lift: 4200, // the card lifts out of the envelope
  fade: 5100, // and once it is in place, the envelope fades away onto the main page
  done: 5800,
}
const SWING = { left: 1500, right: 1500, top: 1800, bottom: 1800 }

// Drawn bottom to top: the left flap, which carries the seal, was folded down last.
const PARTS = ['top', 'bottom', 'right', 'left']

// Each flap turns on the edge it is folded from, up towards the viewer and on over onto its back.
// The viewer is close, about a screen's height away, so a rising flap grows as it comes up and
// swings out past the edge of the screen, and you see its embossed face as it stands up.
const VIEWING_DISTANCE = 1.15
const HINGE = { left: 'left center', right: 'right center', top: 'center top', bottom: 'center bottom' }
const TURN = {
  left: (a) => `rotateY(${-a}deg)`,
  right: (a) => `rotateY(${a}deg)`,
  top: (a) => `rotateX(${a}deg)`,
  bottom: (a) => `rotateX(${-a}deg)`,
}

// The plain inside of the envelope, and its back panel, seen around the card.
const INSIDE_PAPER = '#e7dacb'
const POCKET = '#dccab7'
// The plain paper under the seal on each flap it isn't stuck to.
const UNDER_SEAL = { top: '#eadaca', right: '#e8d8c9', bottom: '#dccab9' }

// A flap's inside faces the other way, so it is drawn flipped, with its outline mirrored to match.
const sideways = (part) => part === 'left' || part === 'right'
const INSIDE = Object.fromEntries(
  PARTS.map((part) => [
    part,
    {
      transform: sideways(part) ? 'rotateY(180deg)' : 'rotateX(180deg)',
      clipPath: polygon(FLAPS[part].map(([x, y]) => (sideways(part) ? [100 - x, y] : [x, 100 - y]))),
    },
  ]),
)

// How much smaller the card is inside the envelope than once it has lifted out.
const IN_ENVELOPE = 'scale(0.9)'

const STEPS = 30
const rad = (degrees) => (degrees * Math.PI) / 180
const easeInOut = (x) => 0.5 - 0.5 * Math.cos(Math.PI * x)
// A flap's angle through its swing: the paper lifts a little as it lets go, settles for a moment,
// then folds steadily right back, lingering a little as it stands up.
const ANGLES = Array.from({ length: STEPS + 1 }, (_, i) => {
  const t = i / STEPS
  return t < 0.15 ? 7 * (1 - (1 - t / 0.15) ** 2) : 7 + 173 * easeInOut((t - 0.15) / 0.85)
})
// It darkens as it turns away from the light, and is lit again once it lies open.
const SHADE = ANGLES.map((a) => ({ opacity: 0.32 * Math.sin(rad(a)) }))
// Its embossed outside shows until it turns edge-on to the viewer, and its plain inside after. That
// happens before it is upright, as the viewer is close: when the flap's plane passes through the eye,
// which is in front of the middle of the envelope. (The faces are switched here rather than left to
// the browser, as Safari doesn't reliably hide the side of a turned element that faces away.)
const EDGE_ON = Object.fromEntries(
  PARTS.map((part) => {
    const half = sideways(part) ? ARTWORK.width / ARTWORK.height / 2 : 0.5
    const angle = (Math.atan(VIEWING_DISTANCE / half) * 180) / Math.PI
    // The moment in its swing it gets there, as a fraction of the swing.
    const i = ANGLES.findIndex((a) => a >= angle)
    return [part, (i - 1 + (angle - ANGLES[i - 1]) / (ANGLES[i] - ANGLES[i - 1])) / STEPS]
  }),
)
const faceKeyframes = (part, outside) => {
  const [before, after] = outside ? [1, 0] : [0, 1]
  return [
    { opacity: before },
    { opacity: before, offset: EDGE_ON[part] },
    { opacity: after, offset: EDGE_ON[part] },
    { opacity: after },
  ]
}
// While it stands up off the envelope it casts a soft shadow on what lies beneath.
const CAST = ANGLES.map((a) => ({ opacity: a < 120 ? 0.4 * Math.sin(rad(a * 1.5)) : 0 }))
const CAST_SHAPE = {
  left: 'inset-y-0 left-0 w-1/2 bg-linear-to-r',
  right: 'inset-y-0 right-0 w-1/2 bg-linear-to-l',
  top: 'inset-x-0 top-0 h-2/5 bg-linear-to-b',
  bottom: 'inset-x-0 bottom-0 h-2/5 bg-linear-to-t',
}

function Shade({ ref }) {
  return <div ref={ref} className="absolute inset-0 bg-[#4a3f37] opacity-0" />
}

// Where the seal sat on a flap it isn't stuck to: plain paper, wide enough to cover the seal's
// shadow too, fading out over the paper around it.
function UnderSeal({ part }) {
  return (
    <div
      className="absolute aspect-square -translate-1/2"
      style={{
        left: `${SEAL.x}%`,
        top: `${SEAL.y}%`,
        width: `${SEAL.size * 1.45}%`,
        background: `radial-gradient(closest-side, ${UNDER_SEAL[part]} 86%, transparent)`,
      }}
    />
  )
}

function Flap({ part, register }) {
  // The seal is stuck to the left flap and comes away with it, overhanging its tip.
  const pieces = part === 'left' ? [polygon(FLAPS.left), SEAL_CLIP] : [polygon(FLAPS[part])]
  return (
    <div ref={register(`flap-${part}`)} className="absolute inset-0 transform-3d" style={{ transformOrigin: HINGE[part] }}>
      <div ref={register(`outside-${part}`)} className="absolute inset-0">
        {pieces.map((clipPath, i) => (
          <div key={clipPath} className="absolute inset-0" style={{ clipPath }}>
            <Artwork />
            {part !== 'left' && <UnderSeal part={part} />}
            <Shade ref={register(`front-${part}-${i}`)} />
          </div>
        ))}
      </div>
      <div ref={register(`back-${part}`)} className="absolute inset-0 opacity-0" style={{ transform: INSIDE[part].transform }}>
        <div
          className="absolute inset-0"
          style={{ clipPath: INSIDE[part].clipPath, backgroundColor: INSIDE_PAPER, backgroundImage: PAPER_TEXTURE }}
        >
          <Shade ref={register(`inside-${part}`)} />
        </div>
      </div>
    </div>
  )
}

// The invitation inside the envelope, a little smaller than it lies on the page. Its wording comes
// up once the flaps are open.
function Card({ register }) {
  return (
    <InvitationCard
      ref={register('card')}
      style={{ transform: IN_ENVELOPE }}
      wordsRef={register('words')}
      wordsStyle={{ opacity: 0 }}
    />
  )
}

// `rect` is where the login's envelope sat; the opening redraws it there and folds it open.
export default function Unseal({ rect, onDone }) {
  const navigate = useNavigate()
  const [phase, setPhase] = useState('closed')
  const [started] = useState(() => performance.now())
  const [envelopeRef, frame] = useArtworkFrame()
  const nodes = useRef({})
  const register = (key) => (element) => {
    nodes.current[key] = element
  }

  const advance = useEffectEvent((next) => {
    if (next === 'navigate') navigate('/', { replace: true })
    else if (next === 'done') onDone()
    else setPhase(next)
  })

  useEffect(() => {
    // The envelope may spread past its card once it starts to open, so it stops being clipped just before.
    const steps = [
      ['navigate', AT.navigate],
      ['open', AT.left - 30],
      ['fade', AT.fade],
      ['done', AT.done],
    ]
    const timers = steps.map(([next, at]) => setTimeout(() => advance(next), at))
    return () => timers.forEach(clearTimeout)
  }, [])

  // The flaps' motion, shading and shadows are played from the same angles, so they stay in step.
  const ready = Boolean(frame)
  useEffect(() => {
    if (!ready) return
    const node = nodes.current
    const elapsed = performance.now() - started
    const play = (key, keyframes, at, duration, easing = 'linear') =>
      node[key]?.animate(keyframes, { duration, delay: Math.max(0, at - elapsed), easing, fill: 'both' })
    const animations = PARTS.flatMap((part) => [
      play(`flap-${part}`, ANGLES.map((a) => ({ transform: TURN[part](a) })), AT[part], SWING[part]),
      ...Object.keys(node)
        .filter((key) => key.startsWith(`front-${part}`) || key === `inside-${part}`)
        .map((key) => play(key, SHADE, AT[part], SWING[part])),
      play(`outside-${part}`, faceKeyframes(part, true), AT[part], SWING[part]),
      play(`back-${part}`, faceKeyframes(part, false), AT[part], SWING[part]),
      play(`cast-${part}`, CAST, AT[part], SWING[part]),
    ])
    animations.push(
      // The whole artwork covers the cut-out flaps until they move, so no seams show between them.
      play('whole', [{ opacity: 1 }, { opacity: 0 }], AT.left, 1),
      play('words', [{ opacity: 0 }, { opacity: 1 }], AT.text, 900, 'ease-out'),
      play('card', [{ transform: IN_ENVELOPE }, { transform: 'none' }], AT.lift, AT.fade - AT.lift, 'cubic-bezier(0.45, 0, 0.2, 1)'),
    )
    return () => animations.forEach((animation) => animation?.cancel())
  }, [ready, started])

  const box = {
    top: Math.round(rect.top),
    left: Math.round(rect.left),
    width: Math.round(rect.width),
    height: Math.round(rect.height),
  }

  return (
    <div
      role="status"
      className={`fixed inset-0 z-50 overflow-hidden ${phase === 'closed' ? '' : 'pointer-events-none'}`}
      style={{
        opacity: phase === 'fade' ? 0 : 1,
        transition: 'opacity 700ms ease',
        animation: 'unseal-in 450ms ease-out backwards',
      }}
    >
      <span className="sr-only">Opening your invitation…</span>
      {/* On larger screens the envelope rests on soft ivory, and the open flaps lie flat beside it. */}
      <Backdrop />
      <div aria-hidden="true" className={`absolute ${CARD}`} style={box} />
      <div
        ref={envelopeRef}
        aria-hidden="true"
        className={`absolute ${phase === 'closed' ? 'overflow-hidden sm:rounded-lg' : ''}`}
        style={box}
      >
        <div
          className="absolute inset-0 sm:rounded-lg"
          style={{ backgroundColor: POCKET, backgroundImage: PAPER_TEXTURE, boxShadow: 'inset 0 0 28px rgb(74 63 55 / 0.35)' }}
        >
          <Card register={register} />
          {PARTS.map((part) => (
            <div
              key={part}
              ref={register(`cast-${part}`)}
              className={`absolute ${CAST_SHAPE[part]} from-[rgb(74_63_55/0.55)] to-transparent opacity-0`}
            />
          ))}
        </div>
        {frame && (
          <div className="absolute" style={{ ...frame, perspective: frame.height * VIEWING_DISTANCE }}>
            {PARTS.map((part) => (
              <Flap key={part} part={part} register={register} />
            ))}
            <div ref={register('whole')} className="absolute inset-0">
              <Artwork />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
