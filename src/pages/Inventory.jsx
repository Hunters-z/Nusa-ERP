import { useState } from 'react'
import { loadDB, saveDB, rp } from '../lib/store.js'
import { Card } from './Dashboard.jsx'
// Palette v0.2: ocean/navy

export default function Inventory() {
  const [db, setDb] = useState(loadDB())
  const [form, setForm] = useState({name:'', emoji:'📦', price:'', stock:'', minStock:''})
  const add = e => {
    e.preventDefault()
    const next = {...db, products: [...db.products, {...form, id:'p'+Date.now(), price:+form.price, stock:+form.stock, minStock:+form.minStock||0}]}
    saveDB(next); setDb(next); setForm({name:'', emoji:'📦', price:'', stock:'', minStock:''})
  }
  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="font-disp text-lg md:text-xl font-extrabold mb-6">Inventori</h1>
      <Card title="Daftar produk">
        <table className="w-full text-[13px]">
          <thead><tr className="text-left text-inksoft text-[11.5px] uppercase tracking-wide">
            <th className="py-2 font-semibold">Produk</th><th className="font-semibold">Harga</th><th className="font-semibold">Stok</th><th className="font-semibold">Status</th></tr></thead>
          <tbody>
            {db.products.map(p => (
              <tr key={p.id} className="border-t border-[#EEF1EB]">
                <td className="py-2.5">{p.emoji} <b>{p.name}</b></td>
                <td>{rp(p.price)}</td>
                <td>{p.stock}</td>
                <td>{p.stock<=p.minStock ? <span className="pill bg-coral-soft text-red-700">Restock</span> : <span className="pill bg-mint-soft text-emerald-700">Aman</span>}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
      <form onSubmit={add} className="mt-4 bg-white border border-line rounded-2xl p-5 flex flex-wrap gap-2.5 items-end">
        <Input label="Nama" value={form.name} onChange={v=>setForm({...form,name:v})} required/>
        <Input label="Emoji" value={form.emoji} onChange={v=>setForm({...form,emoji:v})} w="w-16"/>
        <Input label="Harga" type="number" value={form.price} onChange={v=>setForm({...form,price:v})} required/>
        <Input label="Stok" type="number" value={form.stock} onChange={v=>setForm({...form,stock:v})} required/>
        <Input label="Min. stok" type="number" value={form.minStock} onChange={v=>setForm({...form,minStock:v})}/>
        <button className="btn-primary text-[13px] px-4 py-2.5">Tambah produk</button>
      </form>
    </div>
  )
}
export function Input({label,...props}) {
  return <label className="flex flex-col gap-1 text-[11.5px] font-semibold text-inksoft"> {label}
    <input {...props} className="border border-line rounded-[9px] px-3 py-2 text-[13px] font-normal text-ink w-36 focus:outline-teal"/></label>
}