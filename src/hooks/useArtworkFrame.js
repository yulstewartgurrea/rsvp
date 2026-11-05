import { ARTWORK } from '../lib/envelope'
import { useSize } from './useSize'

// Measures the element the ref is put on and works out where the envelope artwork sits in it:
// scaled to cover it and centred, so on a narrow phone a little of each side is trimmed and the
// artwork is never stretched.
export function useArtworkFrame() {
  const [ref, size] = useSize()
  if (!size) return [ref, null]
  const scale = Math.max(size.width / ARTWORK.width, size.height / ARTWORK.height)
  const width = ARTWORK.width * scale
  const height = ARTWORK.height * scale
  return [ref, { left: (size.width - width) / 2, top: (size.height - height) / 2, width, height }]
}
