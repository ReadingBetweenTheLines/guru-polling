import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import AdminDashboards from './components/AdminDashboards.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
   {/* <App /> */}
    <AdminDashboards/>
  </StrictMode>,
)
