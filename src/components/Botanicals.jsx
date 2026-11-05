// The fine gold drawings on the invitation: sprigs and garlands of baby's breath, the pen strokes
// round the "and" between the names, the small ornament between the parts of the page, and the
// heart that closes it.

const degrees = (radians) => (radians * 180) / Math.PI

// A gently bowed stem from `from` to `to`: `bend` sets the control point off the middle, square to
// the stem. Returns its path, a point `at(t)` along it and its heading there in degrees.
function curve(from, to, bend) {
  const [ax, ay] = from
  const [bx, by] = to
  const length = Math.hypot(bx - ax, by - ay)
  const cx = (ax + bx) / 2 + (bend * (ay - by)) / length
  const cy = (ay + by) / 2 + (bend * (bx - ax)) / length
  const at = (t) => [(1 - t) ** 2 * ax + 2 * (1 - t) * t * cx + t ** 2 * bx, (1 - t) ** 2 * ay + 2 * (1 - t) * t * cy + t ** 2 * by]
  const heading = (t) => degrees(Math.atan2(2 * (1 - t) * (cy - ay) + 2 * t * (by - cy), 2 * (1 - t) * (cx - ax) + 2 * t * (bx - cx)))
  return { path: `M${ax} ${ay}Q${cx.toFixed(2)} ${cy.toFixed(2)} ${bx} ${by}`, at, heading, length }
}

// A stem of baby's breath: a twig ending in a bud, with two short twigs and smaller buds near its tip.
function spray(from, to, bend, bud = 1.8) {
  const main = curve(from, to, bend)
  const fork = main.at(0.72)
  const side = Math.min(6, main.length * 0.3)
  const twigs = [-42, 40].map((turn) => {
    const angle = ((main.heading(0.72) + turn) * Math.PI) / 180
    return [fork[0] + side * Math.cos(angle), fork[1] + side * Math.sin(angle)]
  })
  return {
    paths: [main.path, ...twigs.map((tip) => curve(fork, tip, 0).path)],
    buds: [{ at: to, r: bud }, ...twigs.map((tip) => ({ at: tip, r: bud * 0.75 }))],
  }
}

// A long stem with fine twigs branching off it in turn, up and outwards then down, each ending in a
// small bud, and one more bud at its tip.
function feathery(from, to, bend, count) {
  const main = curve(from, to, bend)
  const paths = [main.path]
  const buds = [{ at: to, r: 1.2 }]
  for (let i = 0; i < count; i++) {
    const t = 0.15 + (0.72 * i) / (count - 1)
    const base = main.at(t)
    const up = i % 2 === 0
    const angle = ((main.heading(t) + (up ? -38 : 34)) * Math.PI) / 180
    const length = (up ? 8 : 6) * (1 - 0.3 * t)
    const tip = [base[0] + length * Math.cos(angle), base[1] + length * Math.sin(angle)]
    paths.push(curve(base, tip, up ? -0.6 : 0.6).path)
    buds.push({ at: tip, r: 1.1 })
  }
  return { paths, buds }
}

// The sprig at the top of the card: a fine stem of baby's breath branching up from its base.
const SPRIG = [
  curve([25, 79], [26, 22], 1.5),
  ...[
    [[25.4, 66], [9, 46], -2],
    [[25.6, 59], [42, 42], 2],
    [[25.8, 50], [12, 29], -2],
    [[26, 45], [39, 25], 2],
    [[26, 35], [17, 12], -1.5],
    [[26, 31], [34, 9], 1.5],
  ].map(([from, to, bend]) => spray(from, to, bend)),
  spray([26, 30], [26.5, 14], 0.5, 2),
]

// The garland between the invitation and the date: a small puff of baby's breath in the middle, and a
// feathery stem trailing out either side (the right one, mirrored for the left).
const BUNCH = [
  [[79.5, 25], [72, 13], -0.8, 1.6],
  [[79.7, 25], [74, 8], -0.6, 1.8],
  [[79.8, 25], [77, 11.5], -0.3, 1.5],
  [[80, 25], [78.5, 5], -0.2, 1.9],
  [[80, 25], [81.5, 9], 0.2, 1.6],
  [[80, 25], [83, 4.5], 0.3, 1.8],
  [[80.2, 25], [84.5, 11.5], 0.4, 1.5],
  [[80.3, 25], [87, 7.5], 0.6, 1.8],
  [[80.5, 25], [89, 13], 0.8, 1.6],
].map(([from, to, bend, bud]) => spray(from, to, bend, bud))
const TRAIL = [feathery([88, 22], [157, 17.5], -1, 9)]

// Drawn in gold: fine stems and cream buds.
function Botanical({ parts, width = 0.5 }) {
  return parts.map(({ path, paths = [path], buds = [] }, i) => (
    <g key={i}>
      {paths.map((d) => (
        <path key={d} d={d} className="stroke-gold" strokeWidth={width} strokeLinecap="round" />
      ))}
      {buds.map(({ at, r }, j) => (
        <circle key={j} cx={at[0].toFixed(2)} cy={at[1].toFixed(2)} r={r} className="fill-[#fdf8f2] stroke-gold" strokeWidth={0.45} />
      ))}
    </g>
  ))
}

export function Sprig({ className }) {
  return (
    <svg viewBox="0 0 50 80" fill="none" className={className} aria-hidden="true">
      <Botanical parts={SPRIG} width={0.6} />
    </svg>
  )
}

export function Garland({ className }) {
  return (
    <svg viewBox="0 0 160 30" fill="none" className={className} aria-hidden="true">
      <Botanical parts={TRAIL} />
      <g transform="translate(160 0) scale(-1 1)">
        <Botanical parts={TRAIL} />
      </g>
      <Botanical parts={BUNCH} />
    </svg>
  )
}

// The fine pen strokes trailing into and out of the "and" between the names.
export function Flourish({ flipped }) {
  return (
    <svg viewBox="0 0 60 12" fill="none" className={`h-[0.3em] w-[1.55em] ${flipped ? '-scale-x-100' : ''}`} aria-hidden="true">
      <path d="M1 9.5C18 10.5 38 10.5 52 7.5 55 6.8 57.5 5.5 59 4" className="stroke-cocoa/80" strokeWidth="0.6" strokeLinecap="round" />
    </svg>
  )
}

// The small four-petalled ornament between the parts of the page.
export function Ornament({ className }) {
  return (
    <svg viewBox="0 0 12 12" className={className} aria-hidden="true">
      {[0, 90, 180, 270].map((angle) => (
        <ellipse key={angle} cx="6" cy="3.2" rx="1.5" ry="2.3" transform={`rotate(${angle} 6 6)`} className="fill-gold/80" />
      ))}
      <circle cx="6" cy="6" r="1" className="fill-paper" />
    </svg>
  )
}

// A fine line either side of a small open heart, under the closing words.
export function HeartFlourish({ className }) {
  return (
    <svg viewBox="0 0 120 20" fill="none" className={className} aria-hidden="true">
      <g className="stroke-gold" strokeWidth="0.8" strokeLinecap="round">
        <path d="M3 14C24 15.8 44 15.4 56.5 12.6" />
        <path d="M117 14C96 15.8 76 15.4 63.5 12.6" />
        <path d="M60 16.5C52.5 11.2 53.6 4.4 57.4 4.4 58.8 4.4 59.6 5.4 60 6.6 60.4 5.4 61.2 4.4 62.6 4.4 66.4 4.4 67.5 11.2 60 16.5Z" />
      </g>
    </svg>
  )
}
