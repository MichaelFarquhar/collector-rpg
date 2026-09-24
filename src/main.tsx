import { StrictMode, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { Overlay } from '@primitives/index'
import './styles/variables.css'
import './index.css'
import App from './App.tsx'

function Root() {
  const [overlayOpen, setOverlayOpen] = useState(false)

  return (
    <>
      <button type="button" onClick={() => setOverlayOpen(true)}>
        Open overlay
      </button>
      <Overlay open={overlayOpen} onClose={() => setOverlayOpen(false)}>
        <p>Overlay test content</p>
      </Overlay>
      <App />
    </>
  )
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Root />
  </StrictMode>,
)
