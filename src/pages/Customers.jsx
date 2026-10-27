import { useState } from 'react'
import { loadDB, saveDB } from '../lib/store.js'
import { Card } from './Dashboard.jsx'
import { Input } from './Inventory.jsx'

export default function Customers() {
  const [db, setDb] = useState(loadDB())
  const [form, setForm] = useState({name:'', phone:'', note:''})
  const add = e => {
    e.preventDefault()
    const next = {...db, customers:[...db.customers, {...form, id:'c'+Date.now()}]}
    saveDB(next); setDb(next); setForm({name:'', phone:'', note:''})
  }
  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="font-disp text-lg font-bold mb-6">Pelanggan</h1>
      <Card title="Tambah pelanggan">
        <form onSubmit={add} className="flex flex-wrap gap-2.5 items-end">
          <Input label="Nama" value={form.name} onChange={v=>setForm({...form,name:v})} required/>
          <Input label="Telepon" value={form.phone} onChange={v=>setForm({...form,phone:v})}/>
          <Input label="Catatan" value={form.note} onChange={v=>setForm({...form,note:v})}/>
          <button className="bg-teal text-white font-bold text-[13px] rounded-[10px] px-4 py-2">Simpan</button>
        </form>
      </Card>
      <div className="grid md:grid-cols-3 gap-3.5 mt-4">
        {db.customers.map(c => (
          <div key={c.id} className="bg-white border border-line rounded-2xl p-5">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-teal to-teal-ink text-white grid place-items-center font-bold text-xs">{c.name.slice(0,2).toUpperCase()}</div>
            <b className="block mt-2.5 text-[14px]">{c.name}</b>
            <div className="text-inksoft text-[12.5px]">{c.phone||'—'}</div>
            {c.note && <div className="text-[11.5px] mt-1 pill bg-amber-soft text-[#9A6B14] inline-block">{c.note}</div>}
          </div>
        ))}
      </div>
    </div>
  )
}