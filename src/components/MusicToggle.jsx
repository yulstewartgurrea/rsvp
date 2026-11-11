import { useSyncExternalStore } from 'react'
import { isMusicOn, subscribeMusic, toggleMusic } from '../lib/music'
import { MusicIcon, MusicOffIcon } from './Icons'

// Floats at the bottom right of the invitation page, to turn the song off and on again: the notes
// while it's on (as it is by default), struck through while it's off.
export default function MusicToggle() {
  const playing = useSyncExternalStore(subscribeMusic, isMusicOn)
  return (
    <button
      type="button"
      data-music-toggle
      onClick={toggleMusic}
      aria-label="Music"
      aria-pressed={playing}
      title={playing ? 'Turn music off' : 'Turn music on'}
      className="fixed right-4 bottom-4 z-30 flex size-12 items-center justify-center rounded-full border border-gold/50 bg-paper/90 text-cocoa shadow-[0_2px_10px_rgb(92_43_20/0.15)] backdrop-blur transition-colors hover:bg-paper sm:right-6 sm:bottom-6"
    >
      {playing ? <MusicIcon className="size-5" /> : <MusicOffIcon className="size-5" />}
    </button>
  )
}
