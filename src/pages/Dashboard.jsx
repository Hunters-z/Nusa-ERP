import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { loadDB, rp } from '../lib/store.js'
import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer } from 'recharts'

export default function Dashboard() {
  const [db, setDb] = useState(null)
  useEffect(() => { setDb(loadDB()) }, [])
  if (!db) return null
  const sales = db.txs.reduce((s,t)=>s+t.total,0)
  const unpaid = db.invoices.filter(i=>i.status!=='Dibayar').reduce((s,i)=>s+i.total,0)
  const low = db.products.filter(p=>p.stock<=p.minStock)
  const week = ['Sen','Sel','Rab','Kam','Jum','Sab','Min'].map((d,i)=>({d, v: [4.2,6.1,3.8,8.0,9.5,7.0,5.2][i]}))
  return (
    <div className="p-6 max-w-6xl mx-auto">
      <header className="flex items-center gap-3 mb-6">
        <h1 className="font-disp text-lg font-bold">Dasbor</h1>
        <Link to="/pos" className="ml-auto bg-teal hover:bg-teal-ink text-white font-bold text-[13px] rounded-[10px] px-4 py-2 transition-colors">Buka Kasir</Link>
      </header>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 mb-5">
        <Kpi cls="border-t-teal" label="Penjualan (transaksi)" value={rp(sales)} note={`${db.txs.length} transaksi tercatat`} />
        <Kpi cls="border-t-amber" label="Invoice belum dibayar" value={rp(unpaid)} note={`${db.invoices.filter(i=>i.status!=='Dibayar').length} invoice`} />
        <Kpi cls="border-t-coral" label="Stok menipis" value={`${low.length} produk`} note={low.map(p=>p.name).join(', ')||'Aman semua'} />
        <Kpi cls="border-t-[#7BAE4F]" label="Pelanggan" value={`${db.customers.length} terdaftar`} note="Kelola di menu Pelanggan" />
      </div>
      <div className="grid lg:grid-cols-[1.6fr_1fr] gap-3.5">
        <Card title="Ringkasan mingguan (juta Rp)">
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={week}><XAxis dataKey="d" tickLine={false} axisLine={false} fontSize={11}/><Tooltip/><Bar dataKey="v" fill="#0E7C66" radius={[6,6,2,2]}/></BarChart>
          </ResponsiveContainer>
        </Card>
        <Card title="Stok menipis">
          {low.length===0 && <p className="text-inksoft text-[13px]">Semua stok aman 👍</p>}
          {low.map(p => (
            <div key={p.id} className="flex items-center gap-3 py-2 border-b border-[#EEF1EB] last:border-0">
              <span className="text-xl">{p.emoji}</span>
              <div><b className="text-[13px]">{p.name}</b><div className="text-[11.5px] text-inksoft">sisa {p.stock} (min {p.minStock})</div></div>
              <span className="ml-auto pill bg-coral-soft text-[#A83A28]">Restock</span>
            </div>
          ))}
        </Card>
      </div>
    </div>
  )
}
function Kpi({cls,label,value,note}) {
  return <div className={`bg-white border border-line rounded-2xl px-4.5 py-4 px-5 ${cls}`} style={{borderTopWidth:3}}>
    <div className="text-inksoft text-xs font-medium">{label}</div>
    <div className="font-disp text-[22px] font-extrabold mt-1">{value}</div>
    <div className="text-[11.5px] font-semibold text-inksoft mt-1">{note}</div>
  </div>
}
export function Card({title, children}) {
  return <div className="bg-white border border-line rounded-2xl p-5"><h3 className="font-disp font-bold text-[14.5px] mb-3">{title}</h3>{children}</div>
}