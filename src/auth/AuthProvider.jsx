import { useEffect, useState } from 'react'
import { startMusic, stopMusic } from '../lib/music'
import { supabase } from '../lib/supabase'
import { AuthContext } from './AuthContext'

export default function AuthProvider({ children }) {
  const [session, setSession] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Fires INITIAL_SESSION right away, then again on every sign in / sign out.
    const { data } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession)
      setLoading(false)
      // The song plays for as long as the guest is logged in, and stops when they log out.
      if (nextSession) startMusic()
      else stopMusic()
    })
    return () => data.subscription.unsubscribe()
  }, [])

  return <AuthContext.Provider value={{ session, loading }}>{children}</AuthContext.Provider>
}
