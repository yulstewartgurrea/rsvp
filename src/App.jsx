import { useState } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router'
import AuthProvider from './auth/AuthProvider'
import ProtectedRoute from './auth/ProtectedRoute'
import Unseal from './components/Unseal'
import Home from './pages/Home'
import Login from './pages/Login'

export default function App() {
  // Lives above the routes so the envelope stays on screen while the page changes behind it.
  // Holds where the login's envelope sat, so the opening starts from exactly the same picture.
  const [unsealing, setUnsealing] = useState(null)

  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login onUnlock={setUnsealing} />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        {unsealing && <Unseal rect={unsealing} onDone={() => setUnsealing(null)} />}
      </BrowserRouter>
    </AuthProvider>
  )
}
