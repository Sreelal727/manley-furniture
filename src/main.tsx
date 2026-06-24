import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.tsx'
import { BillingProvider } from './store/billing.tsx'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <BillingProvider>
        <App />
      </BillingProvider>
    </BrowserRouter>
  </StrictMode>,
)
