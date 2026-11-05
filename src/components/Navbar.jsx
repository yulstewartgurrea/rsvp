import { useEffect, useState } from 'react'
import { wedding } from '../content/wedding'
import { supabase } from '../lib/supabase'
import { CloseIcon, MenuIcon } from './Icons'

const LINKS = [
  { href: '#venue', label: 'Venue' },
  { href: '#schedule', label: 'The Day' },
  { href: '#dress-code', label: 'Dress Code' },
  { href: '#stay', label: 'Where to Stay' },
  { href: '#rsvp', label: 'RSVP' },
]

// Every guest shares one account, so only end this browser's session.
// The default (global) sign out would log out every guest on every device.
const signOut = () => supabase.auth.signOut({ scope: 'local' })

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const close = () => setOpen(false)

  return (
    // Out of sight while the top of the invitation fills the screen, it slides down once the guest
    // scrolls (or tabs into it).
    <header
      className={`fixed inset-x-0 top-0 z-40 bg-paper/95 font-serif text-cocoa backdrop-blur transition-transform duration-300 focus-within:translate-y-0 ${
        scrolled || open ? 'shadow-sm' : '-translate-y-full'
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:h-20 sm:px-6">
        <a href="#home" onClick={close} className="font-script text-3xl">
          {wedding.coupleNames}
        </a>

        <div className="hidden items-center gap-8 text-xs font-medium tracking-[0.16em] uppercase md:flex">
          {LINKS.map((link) => (
            <a key={link.href} href={link.href} className="transition-colors hover:text-gold">
              {link.label}
            </a>
          ))}
          <button
            type="button"
            onClick={signOut}
            className="rounded-md border border-cocoa/60 px-4 py-1.5 tracking-[0.14em] transition-colors hover:bg-cocoa/5"
          >
            Log out
          </button>
        </div>

        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? 'Close menu' : 'Open menu'}
          className="-mr-2 p-2 md:hidden"
        >
          {open ? <CloseIcon className="size-6" /> : <MenuIcon className="size-6" />}
        </button>
      </nav>

      {open && (
        <div id="mobile-menu" className="border-t border-gold/30 bg-paper px-4 pb-6 md:hidden">
          <ul>
            {LINKS.map((link) => (
              <li key={link.href} className="border-b border-gold/30">
                <a href={link.href} onClick={close} className="block py-3 text-xs font-medium tracking-[0.16em] uppercase">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <button
            type="button"
            onClick={signOut}
            className="mt-5 w-full rounded-md border border-cocoa/60 py-2.5 text-xs tracking-[0.14em] uppercase"
          >
            Log out
          </button>
        </div>
      )}
    </header>
  )
}
