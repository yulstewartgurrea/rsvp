// The login envelope artwork and where its folds are, measured from the image. Everything is in
// percentages of the artwork, so it holds at whatever size the envelope is shown.

// The embossed envelope with its blush wax seal. The code field and button that were drawn into it
// are painted out, and the real ones are laid over the same spot. Its width and height in pixels.
export const ARTWORK = { src: '/images/envelope.webp', width: 941, height: 1672 }

// The corners of the region of the artwork each flap covers, as [x, y] in %. The side flaps' tips
// cross under the seal.
export const FLAPS = {
  top: [
    [0.89, 0],
    [100, 0],
    [100, 0.38],
    [50.16, 44.29],
  ],
  bottom: [
    [0, 93.86],
    [50.11, 52.21],
    [100, 95.42],
    [100, 100],
    [0, 100],
  ],
  left: [
    [0, 0],
    [0.89, 0],
    [54.71, 48.39],
    [0, 93.86],
  ],
  right: [
    [100, 0.38],
    [45.59, 48.31],
    [100, 95.42],
  ],
}

export const polygon = (points) => `polygon(${points.map(([x, y]) => `${x}% ${y}%`).join(', ')})`

// The wax seal: its centre, and its width as a share of the artwork's width.
export const SEAL = { x: 49.52, y: 48.21, size: 31.2 }
// Just the seal, cut out of the artwork.
export const SEAL_CLIP = `ellipse(${SEAL.size / 2 - 0.2}% ${((SEAL.size / 2 - 0.2) * ARTWORK.width) / ARTWORK.height}% at ${SEAL.x}% ${SEAL.y}%)`
