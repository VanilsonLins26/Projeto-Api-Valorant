
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import AppRoutes from './routes'
import Navbar from './pages/navbar'
import { StrictMode } from 'react'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <StrictMode >
  </StrictMode>
    <AppRoutes />
  </BrowserRouter>
  
)
