import { useState } from 'react'
import { loadDB, saveDB, rp } from '../lib/store.js'

export default function POS() {
  const [db, setDb] = useState(loadDB())
  const [cart, setCart] = useState([])
  const [paid, setPaid] = useState(false)
  const add = p => setCart(c => { const f=c.find(x=>x.id===p.id); return f ? c.map(x=>x.id===p.id?{...x,qty:x.qty+1}:x) : [...c,{...p,qty:1}] })
  const total = cart.reduce((s,x)=>s+x.price*x.qty,0)
  const pay = () => {
    const next = {...db,
      txs: [...db.txs, {id:'t'+Date.now(), items:cart, total, at:new Date().toISOString()}],
      products: db.products.map(p => { const c=cart.find(x=>x.id===p.id); return c ? {...p, stock:p.stock-c.qty} : p })}
    saveDB(next); setDb(next); setCart([]); setPaid(true); setTimeout(()=>setPaid(false),2500)
  }
  return (
    <div className="p-6 max-w-6xl mx-auto">
      <header className="flex items-center gap-3 mb-6"><h1 className="font-disp text-lg font-bold">Kasir</h1>
        {paid && <span className="ml-auto pill bg-teal-soft text-teal-ink">✓ Transaksi tersimpan</span>}</header>
      <div className="grid lg:grid-cols-[1.5fr_1fr] gap-3.5">
        <div className="bg-white border border-line rounded-2xl p-5">
          <h3 className="font-disp font-bold text-[14.5px] mb-3">Pilih produk</h3>
          <div className="grid grid-cols-3 md:grid-cols-4 gap-2.5">
            {db.products.map(p => (
              <button key={p.id} onClick={()=>add(p)} disabled={p.stock<1}
                className="border border-line rounded-xl p-3 text-center hover:border-teal transition-colors disabled:opacity-40">
                <div className="text-2xl">{p.emoji}</div><div className="font-semibold text-xs mt-1.5">{p.name}</div>
                <div className="text-teal-ink font-bold text-xs mt-0.5">{rp(p.price)}</div>
                <div className="text-[10px] text-inksoft mt-0.5">stok {p.stock}</div>
              </button>
            ))}
          </div>
        </div>
        <div className="bg-white border border-line rounded-2xl p-4 h-fit">
          <h3 className="font-disp font-bold mb-2">Keranjang</h3>
          {cart.length===0 && <p className="text-inksoft text-[13px] py-4">Belum ada item. Klik produk di kiri.</p>}
          {cart.map(x => (
            <div key={x.id} className="flex justify-between py-1.5 text-[13px] border-b border-dashed border-line">
              <span>{x.name} × {x.qty}</span><b>{rp(x.price*x.qty)}</b>
            </div>
          ))}
          {cart.length>0 && <>
            <div className="flex justify-between font-disp font-extrabold text-[17px] my-3"><span>Total</span><span>{rp(total)}</span></div>
            <button onClick={pay} className="w-full bg-teal hover:bg-teal-ink text-white font-bold rounded-[10px] py-3 transition-colors">Bayar</button>
          </>}
        </div>
      </div>
    </div>
  )
}