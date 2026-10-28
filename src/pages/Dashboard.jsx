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
  const growth = '+12,4%'
  return (
    <div className="p-3 md:p-6 max-w-6xl mx-auto space-y-4">
      {/* HERO: kartu portfolio ala FinPoint */}
      <div className="bg-card rounded-3xl p-5 md:p-7 shadow-soft">
        <div className="flex flex-wrap items-center gap-3 mb-5">
          <div>
            <div className="text-[12px] text-inksoft font-semibold uppercase tracking-wider">Total Laba Bersih</div>
            <div className="flex items-center gap-3 mt-1">
              <span className="font-disp text-3xl md:text-4xl font-extrabold text-ink">{rp(sales)}</span>
              <span className="pill bg-lime-soft text-lime">↗ {growth}</span>
            </div>
          </div>
          <Link to="/pos" className="btn-primary ml-auto text-[13px] px-5 py-3">🛒 Buka Kasir</Link>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          <Mini color="#FF5A1F" label="Penjualan" value={rp(sales)} note={`${db.txs.length} transaksi`} />
          <Mini color="#EAB308" label="Belum dibayar" value={rp(unpaid)} note={`${db.invoices.filter(i=>i.status!=='Dibayar').length} invoice`} />
          <Mini color="#EF4444" label="Stok menipis" value={`${low.length} produk`} note={low[0]?.name||'Aman semua'} />
          <Mini color="#22C55E" label="Pelanggan" value={`${db.customers.length}`} note="terdaftar" />
        </div>
      </div>

      <div className="grid lg:grid-cols-[1.6fr_1fr] gap-4">
        {/* Grafik area oranye */}
        <div className="card p-5 md:p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-disp font-bold text-[15px]">Kinerja penjualan mingguan</h3>
            <div className="hidden md:flex gap-1 bg-card2 rounded-full p-1">
              {['1H','1Hr','1M','1B'].map((t,i)=>(<button key={t} className={'px-3 py-1 rounded-full text-[11px] font-semibold '+(i===3?'bg-ink text-black':'text-inksoft')}>{t}</button>))}
            </div>
          </div>
          <ResponsiveContainer width="100%" height={210}>
            <AreaChart data={week}>
              <defs><linearGradient id="g" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#FF5A1F" stopOpacity={0.4}/><stop offset="100%" stopColor="#FF5A1F" stopOpacity={0.02}/>
              </linearGradient></defs>
              <XAxis dataKey="d" tickLine={false} axisLine={false} fontSize={11} stroke="#6E6E76"/>
              <Tooltip contentStyle={{background:'#212126',border:'1px solid #2A2A31',borderRadius:12,color:'#F4F4F5',fontSize:12}}/>
              <Area type="monotone" dataKey="v" stroke="#FF5A1F" strokeWidth={2.5} fill="url(#g)"/>
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Watchlist stok ala FinPoint */}
        <div className="card p-5 md:p-6">
          <h3 className="font-disp font-bold text-[15px] mb-3">Stok pantauan</h3>
          {low.length===0 && <p className="text-inksoft text-[13px]">Semua stok aman 👍</p>}
          {low.slice(0,5).map(p => (
            <div key={p.id} className="flex items-center gap-3 py-3 border-b border-line last:border-0">
              <span className="w-10 h-10 rounded-full bg-card2 grid place-items-center text-lg">{p.emoji}</span>
              <div className="min-w-0"><b className="text-[13.5px] block truncate">{p.name}</b><div className="text-[11.5px] text-inksoft">sisa {p.stock} · min {p.minStock}</div></div>
              <span className="ml-auto pill bg-coral-soft text-coral">Restock</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
function Mini({color,label,value,note}) {
  return <div className="bg-card2 rounded-2xl p-4 border-l-[3px]" style={{borderColor:color}}>
    <div className="text-[11px] text-inksoft font-semibold">{label}</div>
    <div className="font-disp text-[17px] md:text-[19px] font-extrabold mt-1 leading-tight">{value}</div>
    <div className="text-[11px] text-dim truncate mt-0.5">{note}</div>
  </div>
}
export function Card({title, children}) {
  return <div className="card p-5"><h3 className="font-disp font-bold text-[15px] mb-3">{title}</h3>{children}</div>
}
