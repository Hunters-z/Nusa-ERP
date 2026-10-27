import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout.jsx'
import Dashboard from './pages/Dashboard.jsx'
import POS from './pages/POS.jsx'
import Inventory from './pages/Inventory.jsx'
import Invoices from './pages/Invoices.jsx'
import Customers from './pages/Customers.jsx'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout/>}>
        <Route path="/" element={<Dashboard/>}/>
        <Route path="/pos" element={<POS/>}/>
        <Route path="/inventori" element={<Inventory/>}/>
        <Route path="/invoice" element={<Invoices/>}/>
        <Route path="/pelanggan" element={<Customers/>}/>
      </Route>
    </Routes>
  )
}