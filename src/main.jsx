import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import SetupMessage from './components/SetupMessage'
import { wedding } from './content/wedding'
import { missingEnv } from './lib/supabase'

document.title = `${wedding.coupleNames} · Wedding`

createRoot(document.getElementById('root')).render(
  <StrictMode>{missingEnv.length ? <SetupMessage missing={missingEnv} /> : <App />}</StrictMode>,
)
