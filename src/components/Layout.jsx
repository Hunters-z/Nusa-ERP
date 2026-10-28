import { NavLink, Outlet, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { loadDB } from '../lib/store.js'

const nav = [
  { to: '/', icon: '▦', name: 'Dasbor' },
  { to: '/pos', icon: '🛒', name: 'Kasir' },
  { to: '/inventori', icon: '📦', name: 'Inventori' },
  { to: '/invoice', icon: '🧾', name: 'Invoice' },
  { to: '/pelanggan', icon: '👥', name: 'Pelanggan' },
]

export default function Layout() {
  const [lowStock, setLowStock] = useState(0)
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()
  useEffect(() => {
    setLowStock(loadDB().products.filter(p => p.stock <= p.minStock).length)
    setOpen(false)
  }, [pathname])
  const NavLinks = ({onClick}) => nav.map(it => (
    <NavLink key={it.to} to={it.to} end={it.to==='/'} onClick={onClick}
      className={({isActive}) => 'flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-[14px] font-medium transition-colors ' +
        (isActive ? 'bg-gradient-to-r from-ocean to-blue-600 text-white font-semibold shadow-pop' : 'text-slate-300 hover:bg-white/10 hover:text-white')}>
      <span className="w-5 text-center">{it.icon}</span>{it.name}
      {it.to==='/inventori' && lowStock>0 && <span className="ml-auto bg-coral text-white text-[10px] px-2 py-0.5 rounded-full font-bold">{lowStock}</span>}
    </NavLink>
  ))
  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-40 bg-navy text-white">
        <div className="flex items-center gap-3 px-4 md:px-7 h-14">
          <button className="md:hidden text-xl" onClick={()=>setOpen(true)} aria-label="Buka menu">☰</button>
          <div className="font-disp font-extrabold flex items-center gap-2">
            <span className="w-7 h-7 rounded-lg bg-gradient-to-br from-ocean to-blue-600 grid place-items-center text-sm">N</span>
            <span className="hidden sm:inline">Nusa ERP</span>
          </div>
          <div className="ml-auto hidden md:flex items-center bg-white/10 rounded-xl px-3.5 py-1.5 text-[13px] text-slate-300 w-80">🔍 Cari produk, pelanggan, invoice…</div>
        </div>
      </header>

      <div className="flex">
        <aside className="hidden md:flex flex-col bg-navy w-[230px] shrink-0 p-3.5 sticky top-14 h-[calc(100vh-3.5rem)]">
          <div className="text-[10.5px] uppercase tracking-widest text-slate-500 px-3 mt-1 mb-2">Menu</div>
          <NavLinks/>
          <div className="mt-auto text-[11px] text-slate-500 px-3">© Nusa ERP — data lokal</div>
        </aside>

        {open && <>
          <div className="fixed inset-0 bg-black/40 z-40 md:hidden" onClick={()=>setOpen(false)}/>
          <aside className="fixed left-0 top-0 bottom-0 z-50 bg-navy w-64 p-3.5 md:hidden flex flex-col">
            <div className="font-disp font-extrabold text-white flex items-center gap-2 px-2 mb-4">
              <span className="w-7 h-7 rounded-lg bg-gradient-to-br from-ocean to-blue-600 grid place-items-center text-sm">N</span> Nusa ERP
              <button className="ml-auto text-slate-400 text-lg" onClick={()=>setOpen(false)} aria-label="Tutup">✕</button>
            </div>
            <NavLinks onClick={()=>setOpen(false)}/>
          </aside>
        </>}

        <main className="flex-1 min-w-0 pb-20 md:pb-0"><Outlet/></main>
      </div>

      <nav className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-white border-t border-line flex">
        {nav.map(it => (
          <NavLink key={it.to} to={it.to} end={it.to==='/'}
            className={({isActive}) => 'flex-1 flex flex-col items-center gap-0.5 py-2 text-[10.5px] font-semibold ' + (isActive?'text-ocean':'text-inksoft')}>
            <span className="text-lg">{it.icon}</span>{it.name}
          </NavLink>
        ))}
      </nav>
    </div>
  )
}