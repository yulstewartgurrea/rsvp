import { useLayoutEffect, useRef, useState } from 'react'

// Tracks an element's rendered size in CSS pixels.
export function useSize() {
  const ref = useRef(null)
  const [size, setSize] = useState(null)

  useLayoutEffect(() => {
    const observer = new ResizeObserver(([entry]) => {
      const width = Math.round(entry.contentRect.width)
      const height = Math.round(entry.contentRect.height)
      setSize((current) => (current?.width === width && current?.height === height ? current : { width, height }))
    })
    observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return [ref, size]
}
