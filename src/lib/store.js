// Data layer: localStorage dulu (ringan, tanpa setup), siap Supabase.
const KEY = 'nusa_erp_db_v1'
const seed = {
  products: [
    { id: 'p1', name: 'Kopi Arabika 250g', emoji: '☕', price: 85000, stock: 24, minStock: 5 },
    { id: 'p2', name: 'Teh Melati 100g', emoji: '🍵', price: 45000, stock: 18, minStock: 5 },
    { id: 'p3', name: 'Cokelat Timur', emoji: '🍫', price: 32000, stock: 3, minStock: 5 },
    { id: 'p4', name: 'Kacang Garing', emoji: '🥜', price: 18000, stock: 40, minStock: 10 },
    { id: 'p5', name: 'Beras Premium 5kg', emoji: '🍚', price: 68000, stock: 12, minStock: 4 },
    { id: 'p6', name: 'Minyak Goreng 1L', emoji: '🛢️', price: 24000, stock: 30, minStock: 8 },
  ],
  customers: [
    { id: 'c1', name: 'Budi Santoso', phone: '0812-1111-2222', note: 'Pelanggan langganan' },
    { id: 'c2', name: 'PT Maju Jaya', phone: '021-555-0101', note: 'Korporat' },
    { id: 'c3', name: 'Toko Sinar', phone: '0813-3333-4444', note: '' },
  ],
  invoices: [],
  txs: [],
  employees: [
    { id: 'e1', name: 'Rina Kasir', role: 'Kasir', pin: '1234', credId: null },
    { id: 'e2', name: 'Doni Gudang', role: 'Gudang', pin: '2345', credId: null },
  ],
  attendance: [],
  suppliers: [],
  expenses: [],
}
export function loadDB() {
  try { return JSON.parse(localStorage.getItem(KEY)) || structuredClone(seed) }
  catch { return structuredClone(seed) }
}
export function saveDB(db) { localStorage.setItem(KEY, JSON.stringify(db)) }
export function resetDB() { localStorage.removeItem(KEY) }
export const rp = n => 'Rp ' + (n ?? 0).toLocaleString('id-ID')
