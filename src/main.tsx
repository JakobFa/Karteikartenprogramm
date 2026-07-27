import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { LanguageProvider } from './LanguageContext.tsx'

// Ask the browser to treat our storage as persistent so IndexedDB survives
// long gaps between visits (relevant for spaced repetition) instead of being
// auto-evicted, e.g. by Safari's 7-day script-writable-storage cap.
if (navigator.storage?.persist) {
  navigator.storage.persist();
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LanguageProvider>
      <App />
    </LanguageProvider>
  </StrictMode>,
)
