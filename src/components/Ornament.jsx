const LEAF = 'M0 0C3-4.5 9-4.5 12 0 9 4.5 3 4.5 0 0Z'

const COLORS = {
  // Sage leaves and stems with blush-pink flowers edged in dusty rose.
  stem: 'stroke-sage',
  leaf: 'fill-sage',
  leafAlt: 'fill-sage/70',
  flower: 'fill-blush-pink stroke-dusty-rose stroke-[0.8]',
}

// One half of the sprig; the other half is this mirrored around the flower.
function Branch() {
  return (
    <>
      <path d="M64 21C78 21 92 15 114 18" className={COLORS.stem} strokeWidth="1.2" strokeLinecap="round" />
      <path d={LEAF} transform="translate(72 20) rotate(-30)" className={COLORS.leaf} />
      <path d={LEAF} transform="translate(80 20) rotate(25)" className={COLORS.leafAlt} />
      <path d={LEAF} transform="translate(90 17) rotate(-35)" className={COLORS.leaf} />
      <path d={LEAF} transform="translate(98 17) rotate(20)" className={COLORS.leafAlt} />
      <path d={LEAF} transform="translate(106 17) rotate(-20) scale(0.8)" className={COLORS.leaf} />
      <circle cx="94" cy="22" r="1.6" className={COLORS.flower} />
      <circle cx="111" cy="15" r="1.3" className={COLORS.flower} />
    </>
  )
}

export default function Ornament({ className = 'h-10 w-32' }) {
  return (
    <svg viewBox="0 0 120 40" fill="none" className={className} aria-hidden="true">
      <Branch />
      <g transform="translate(120 0) scale(-1 1)">
        <Branch />
      </g>
      {/* A small rose: rounded outer petals around a swirled centre. */}
      <g transform="translate(60 20)">
        {[0, 72, 144, 216, 288].map((angle) => (
          <ellipse key={angle} cx="0" cy="-4.4" rx="4" ry="4.8" transform={`rotate(${angle})`} className={COLORS.flower} />
        ))}
        <circle r="3.6" className={COLORS.flower} />
        <path d="M-2.3.9A2.5 2.5 0 1 1 1.7 1.9M-.9-.3A1.1 1.1 0 1 1 .9.6" className="stroke-dusty-rose stroke-[0.7]" />
      </g>
    </svg>
  )
}
