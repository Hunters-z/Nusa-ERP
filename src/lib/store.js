// Data layer Toko Kita: localStorage (ringan, tanpa setup), adapter GAS/Supabase opsional.
const KEY = 'toko_kita_db_v1'
const seed = {
  products: [
    { id:'p1', name:'Kopi Arabika 250g', emoji:'☕', price:85000, stock:24, minStock:5, discount:0 },
    { id:'p2', name:'Teh Melati 100g', emoji:'🍵', price:45000, stock:18, minStock:5, discount:0 },
    { id:'p3', name:'Cokelat Timur', emoji:'🍫', price:32000, stock:3, minStock:5, discount:10 },
    { id:'p4', name:'Kacang Garing', emoji:'🥜', price:18000, stock:40, minStock:10, discount:0 },
    { id:'p5', name:'Beras Premium 5kg', emoji:'🍚', price:68000, stock:12, minStock:4, discount:0 },
    { id:'p6', name:'Minyak Goreng 1L', emoji:'🛢️', price:24000, stock:30, minStock:8, discount:0 },
  ],
  customers: [
    { id:'c1', name:'Budi Santoso', phone:'0812-1111-2222', note:'Pelanggan langganan' },
    { id:'c2', name:'PT Maju Jaya', phone:'021-555-0101', note:'Korporat' },
    { id:'c3', name:'Toko Sinar', phone:'0813-3333-4444', note:'' },
  ],
  invoices: [], txs: [], employees: [
    { id:'e1', name:'Rina Kasir', role:'Kasir', pin:'1234', credId:null },
    { id:'e2', name:'Doni Gudang', role:'Gudang', pin:'2345', credId:null },
  ],
  attendance: [], suppliers: [], expenses: [],
  purchases: [],   // pembelian: {id, supplierId, items:[{productId,qty,cost}], total, date, status}
  bundles: [],     // paket/produksi: {id, name, emoji, items:[{productId,qty}], price, stock}
  payments: [],    // metode bayar tx: {txId, method, paid, change}
  settings: { ppn: 0, ppnOn: false, shopName: 'Toko Kita' },
}
export function loadDB() {
  try {
    const db = JSON.parse(localStorage.getItem(KEY))
    if (!db) return migrate(structuredClone(seed))
    return migrate(db)
  } catch { return migrate(structuredClone(seed)) }
}
// migrasi ringan: pastikan field baru ada di db lama
function migrate(db) {
  for (const k of ['purchases','bundles','payments']) if (!db[k]) db[k] = []
  if (!db.settings) db.settings = structuredClone(seed.settings)
  db.products?.forEach(p => { if (p.discount == null) p.discount = 0 })
  return db
}
export function saveDB(db) { localStorage.setItem(KEY, JSON.stringify(db)) }
export function resetDB() { localStorage.removeItem(KEY) }
export const rp = n => 'Rp ' + Math.round(n ?? 0).toLocaleString('id-ID')
export const effPrice = p => Math.round(p.price * (1 - (p.discount||0)/100))
export const uid = pre => pre + Date.now().toString(36) + Math.random().toString(36).slice(2,6)
