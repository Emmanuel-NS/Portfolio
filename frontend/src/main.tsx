import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App'
import { AdminLayout } from './admin/AdminLayout'
import { Dashboard } from './admin/pages/Dashboard'
import { HeroPage } from './admin/pages/HeroPage'
import { ContactPage } from './admin/pages/ContactPage'
import { CollectionsPage } from './admin/pages/CollectionsPage'
import { CollectionDetailPage } from './admin/pages/CollectionDetailPage'
import { SecurityPage } from './admin/pages/SecurityPage'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="hero" element={<HeroPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="collections" element={<CollectionsPage />} />
          <Route path="collections/:slug" element={<CollectionDetailPage />} />
          <Route path="security" element={<SecurityPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
