import { NavLink, Outlet, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { loadDB } from '../lib/store.js'

const groups = [
  { label: 'Utama', items: [
    { to: '/', icon: '▦', name: 'Dasbor' },
    { to: '/pos', icon: '🛒', name: 'Kasir' },
    { to: '/inventori', icon: '📦', name: 'Inventori' },
    { to: '/invoice', icon: '🧾', name: 'Invoice' },
  ]},
  { label: 'Relasi', items: [
    { to: '/pelanggan', icon: '👥', name: 'Pelanggan' },
  ]},
]

export default function Layout() {
  const [lowStock, setLowStock] = useState(0)
  const { pathname } = useLocation()
  useEffect(() => {
    const db = loadDB()
    setLowStock(db.products.filter(p => p.stock <= p.minStock).length)
  }, [pathname])
  return (
    <div className="grid min-h-screen" style={{gridTemplateColumns:'230px 1fr'}}>
      <aside className="bg-sidebar text-[#D7E2DC] flex-col p-4 hidden md:flex sticky top-0 h-screen">
        <div className="font-disp font-extrabold text-white text-lg flex items-center gap-2.5 px-2 mb-5">
          <span className="w-7 h-7 rounded-lg bg-gradient-to-br from-teal to-amber grid place-items-center text-sm font-extrabold">N</span>
          Nusa ERP
        </div>
        {groups.map(g => (
          <div key={g.label}>
            <div className="text-[10.5px] uppercase tracking-widest text-[#6E857C] mx-2.5 mt-3 mb-1.5">{g.label}</div>
            {g.items.map(it => (
              <NavLink key={it.to} to={it.to} end={it.to==='/'}
                className={({isActive}) => 'flex items-center gap-2.5 rounded-[9px] px-2.5 py-2 text-[13.5px] font-medium mb-0.5 ' +
                  (isActive ? 'bg-teal text-white font-semibold' : 'text-[#B9C9C1] hover:bg-white/5 hover:text-white')}>
                <span className="w-4 text-center opacity-85">{it.icon}</span>{it.name}
                {it.to==='/inventori' && lowStock>0 && <span className="ml-auto bg-coral text-white text-[10px] px-2 py-0.5 rounded-full font-bold">{lowStock}</span>}
              </NavLink>
            ))}
          </div>
        ))}
        <div className="mt-auto text-[11px] text-[#6E857C] px-2.5">v0.1 — data lokal per browser</div>
      </aside>
      <main className="min-w-0">
        <Outlet/>
      </main>
    </div>
  )
}