import { useState } from 'react'
import { loadDB, saveDB, rp } from '../lib/store.js'

export default function POS() {
  const [db, setDb] = useState(loadDB())
  const [cart, setCart] = useState([])
  const [paid, setPaid] = useState(false)
  const add = p => setCart(c => { const f=c.find(x=>x.id===p.id); return f ? c.map(x=>x.id===p.id?{...x,qty:x.qty+1}:x) : [...c,{...p,qty:1}] })
  const dec = id => setCart(c => c.flatMap(x => x.id===id ? (x.qty>1 ? [{...x,qty:x.qty-1}] : []) : [x]))
  const total = cart.reduce((s,x)=>s+x.price*x.qty,0)
  const pay = () => {
    const next = {...db,
      txs: [...db.txs, {id:'t'+Date.now(), items:cart, total, at:new Date().toISOString()}],
      products: db.products.map(p => { const c=cart.find(x=>x.id===p.id); return c ? {...p, stock:p.stock-c.qty} : p })}
    saveDB(next); setDb(next); setCart([]); setPaid(true); setTimeout(()=>setPaid(false),2500)
  }
  return (
    <div className="p-4 md:p-7 max-w-6xl mx-auto">
      <header className="flex items-center gap-3 mb-5">
        <h1 className="font-disp text-lg md:text-xl font-extrabold">Kasir</h1>
        {paid && <span className="ml-auto pill bg-mint-soft text-emerald-700">✓ Transaksi tersimpan</span>}
      </header>
      <div className="grid lg:grid-cols-[1.5fr_1fr] gap-3.5">
        <div className="card p-5">
          <h3 className="font-disp font-bold text-[14.5px] mb-3">Pilih produk</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5">
            {db.products.map(p => (
              <button key={p.id} onClick={()=>add(p)} disabled={p.stock<1}
                className="border border-line rounded-2xl p-3.5 text-center hover:border-ocean hover:shadow-soft transition disabled:opacity-40 bg-white">
                <div className="text-3xl">{p.emoji}</div>
                <div className="font-semibold text-xs mt-2">{p.name}</div>
                <div className="text-ocean-ink font-extrabold text-[13px] mt-0.5">{rp(p.price)}</div>
                <div className="text-[10.5px] text-inksoft mt-0.5">stok {p.stock}</div>
              </button>
            ))}
          </div>
        </div>
        <div className="card p-5 h-fit lg:sticky lg:top-20">
          <h3 className="font-disp font-bold mb-2">Keranjang</h3>
          {cart.length===0 && <p className="text-inksoft text-[13px] py-5 text-center">Belum ada item.<br/>Klik produk di samping.</p>}
          {cart.map(x => (
            <div key={x.id} className="flex items-center gap-2 py-2 text-[13px] border-b border-dashed border-line">
              <span className="flex-1">{x.name}</span>
              <button onClick={()=>dec(x.id)} className="w-6 h-6 rounded-lg bg-paper font-bold">−</button>
              <b className="w-6 text-center">{x.qty}</b>
              <button onClick={()=>add(x)} className="w-6 h-6 rounded-lg bg-ocean-soft text-ocean-ink font-bold">+</button>
              <b className="w-20 text-right">{rp(x.price*x.qty)}</b>
            </div>
          ))}
          {cart.length>0 && <>
            <div className="flex justify-between font-disp font-extrabold text-lg my-3.5"><span>Total</span><span className="text-ocean-ink">{rp(total)}</span></div>
            <button onClick={pay} className="btn-primary w-full py-3.5">Bayar Sekarang</button>
          </>}
        </div>
      </div>
    </div>
  )
}