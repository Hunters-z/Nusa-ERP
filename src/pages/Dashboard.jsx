import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { loadDB, rp } from '../lib/store.js'
import { AreaChart, Area, XAxis, Tooltip, ResponsiveContainer } from 'recharts'

export default function Dashboard() {
  const [db, setDb] = useState(null)
  useEffect(() => { setDb(loadDB()) }, [])
  if (!db) return null
  const sales = db.txs.reduce((s,t)=>s+t.total,0)
  const unpaid = db.invoices.filter(i=>i.status!=='Dibayar').reduce((s,i)=>s+i.total,0)
  const low = db.products.filter(p=>p.stock<=p.minStock)
  const week = ['Sen','Sel','Rab','Kam','Jum','Sab','Min'].map((d,i)=>({d, v: [4.2,6.1,3.8,8.0,9.5,7.0,5.2][i]}))
  return (
    <div className="p-4 md:p-7 max-w-6xl mx-auto">
      <header className="flex items-center gap-3 mb-5">
        <h1 className="font-disp text-lg md:text-xl font-extrabold">Dasbor</h1>
        <Link to="/pos" className="btn-primary ml-auto text-[13px] px-4 py-2.5">🛒 Buka Kasir</Link>
      </header>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-5">
        <Kpi icon="💰" tone="from-cyan-500 to-blue-600" label="Penjualan" value={rp(sales)} note={`${db.txs.length} transaksi`} />
        <Kpi icon="🧾" tone="from-amber-400 to-orange-500" label="Belum dibayar" value={rp(unpaid)} note={`${db.invoices.filter(i=>i.status!=='Dibayar').length} invoice`} />
        <Kpi icon="⚠️" tone="from-red-400 to-rose-600" label="Stok menipis" value={`${low.length} produk`} note={low[0]?.name||'Aman semua'} />
        <Kpi icon="👥" tone="from-emerald-400 to-teal-600" label="Pelanggan" value={`${db.customers.length}`} note="terdaftar" />
      </div>
      <div className="grid lg:grid-cols-[1.6fr_1fr] gap-3.5">
        <div className="card p-5">
          <h3 className="font-disp font-bold text-[14.5px] mb-3">Ringkasan mingguan (juta Rp)</h3>
          <ResponsiveContainer width="100%" height={190}>
            <AreaChart data={week}>
              <defs><linearGradient id="g" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#0891B2" stopOpacity={0.35}/><stop offset="100%" stopColor="#0891B2" stopOpacity={0.02}/>
              </linearGradient></defs>
              <XAxis dataKey="d" tickLine={false} axisLine={false} fontSize={11} stroke="#94A3B8"/>
              <Tooltip/>
              <Area type="monotone" dataKey="v" stroke="#0891B2" strokeWidth={2.5} fill="url(#g)"/>
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="card p-5">
          <h3 className="font-disp font-bold text-[14.5px] mb-3">Stok menipis</h3>
          {low.length===0 && <p className="text-inksoft text-[13px]">Semua stok aman 👍</p>}
          {low.map(p => (
            <div key={p.id} className="flex items-center gap-3 py-2.5 border-b border-line last:border-0">
              <span className="w-9 h-9 rounded-xl bg-paper grid place-items-center text-lg">{p.emoji}</span>
              <div><b className="text-[13px]">{p.name}</b><div className="text-[11.5px] text-inksoft">sisa {p.stock} · min {p.minStock}</div></div>
              <span className="ml-auto pill bg-coral-soft text-red-700">Restock</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
function Kpi({icon,tone,label,value,note}) {
  return <div className="card p-4 flex flex-col gap-2">
    <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${tone} text-white grid place-items-center text-base shadow-soft`}>{icon}</div>
    <div className="text-inksoft text-[11.5px] font-semibold uppercase tracking-wide">{label}</div>
    <div className="font-disp text-[19px] md:text-[21px] font-extrabold leading-tight">{value}</div>
    <div className="text-[11.5px] text-inksoft truncate">{note}</div>
  </div>
}
export function Card({title, children}) {
  return <div className="card p-5"><h3 className="font-disp font-bold text-[14.5px] mb-3">{title}</h3>{children}</div>
}