// The song that plays while a guest is logged in: it starts as they open their invitation, plays
// over and over, and stops when they log out. AuthProvider starts and stops it with the session, and
// the guest can turn it off and on again with MusicToggle. It is on by default, every visit.

// Browsers only let a page make sound once the guest has tapped it or pressed a key. These are the
// events that count.
const GESTURES = ['pointerup', 'touchend', 'keydown']

let song = null
let loggedIn = false
// Whether the guest turned it off with the music button.
let off = false
const listeners = new Set()

function setOff(value) {
  off = value
  listeners.forEach((listener) => listener())
}

// Made on first use, so it only downloads for guests who enter their code.
function getSong() {
  if (!song) {
    song = new Audio('/sounds/rsvp.mp3')
    song.loop = true
  }
  return song
}

// Plays it if it should be playing and isn't: after a reload, where the browser won't play it until
// the guest touches the page, or after something else paused it, like a phone call. A tap on the
// music button is left to the button.
function resume(event) {
  if (event?.target.closest?.('[data-music-toggle]')) return
  if (loggedIn && !off && song.paused) song.play().catch(() => {})
}

// Called as the guest sends their code, while their tap or key press still lets the page start
// sound. Their login finishes a moment later, so the song starts now, muted, for startMusic to
// unmute. stopMusic undoes it if the code is wrong.
export function primeMusic() {
  if (loggedIn) return
  const music = getSong()
  music.muted = true
  music.play().catch(() => {})
}

// From the beginning, unless it's already playing.
export function startMusic() {
  if (loggedIn) return
  loggedIn = true
  const music = getSong()
  if (music.muted) {
    music.muted = false
    music.currentTime = 0
  }
  resume()
  for (const type of GESTURES) window.addEventListener(type, resume, true)
}

// Also turns it back on for the next login.
export function stopMusic() {
  loggedIn = false
  setOff(false)
  for (const type of GESTURES) window.removeEventListener(type, resume, true)
  if (!song) return
  song.pause()
  song.currentTime = 0
  song.muted = false
}

// Whether it's on: always, unless the guest turned it off. While the browser waits for their first
// tap it is still on, and that tap starts it.
export const isMusicOn = () => !off

// The music button: turns it off if it's playing; otherwise turns it on and plays it (the tap lets
// the browser start it).
export function toggleMusic() {
  const music = getSong()
  if (!off && !music.paused) {
    setOff(true)
    music.pause()
  } else {
    setOff(false)
    music.muted = false
    music.play().catch(() => {})
  }
}

// For React's useSyncExternalStore: calls `listener` whenever it's turned off or on.
export function subscribeMusic(listener) {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

// Otherwise a hot reload in development leaves the old song playing under the new one.
import.meta.hot?.dispose(stopMusic)
