// The song that plays while a guest is logged in: it starts as they open their invitation, plays
// over and over, and stops only when they log out. AuthProvider starts and stops it with the session.

// Browsers only let a page make sound once the guest has tapped it or pressed a key. These are the
// events that count.
const GESTURES = ['pointerup', 'touchend', 'keydown']

let song = null
let playing = false

// Made on first use, so it only downloads for guests who enter their code.
function getSong() {
  if (!song) {
    song = new Audio('/sounds/rsvp.mp3')
    song.loop = true
  }
  return song
}

// Plays it if it should be playing and isn't: after a reload, where the browser won't play it until
// the guest touches the page, or after something else paused it, like a phone call.
function resume() {
  if (playing && song.paused) song.play().catch(() => {})
}

// Called as the guest sends their code, while their tap or key press still lets the page start
// sound. Their login finishes a moment later, so the song starts now, muted, for startMusic to
// unmute. stopMusic undoes it if the code is wrong.
export function primeMusic() {
  if (playing) return
  const music = getSong()
  music.muted = true
  music.play().catch(() => {})
}

// From the beginning, unless it's already playing.
export function startMusic() {
  if (playing) return
  playing = true
  const music = getSong()
  if (music.muted) {
    music.muted = false
    music.currentTime = 0
  }
  resume()
  for (const type of GESTURES) window.addEventListener(type, resume, true)
}

export function stopMusic() {
  playing = false
  for (const type of GESTURES) window.removeEventListener(type, resume, true)
  if (!song) return
  song.pause()
  song.currentTime = 0
  song.muted = false
}

// Otherwise a hot reload in development leaves the old song playing under the new one.
import.meta.hot?.dispose(stopMusic)
