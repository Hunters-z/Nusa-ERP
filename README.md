# Toko Kita ERP

ERP ringan berbahasa Indonesia — alternatif simpel dari Odoo. Jalan penuh di Vercel, tanpa server sendiri.

## Fitur
- 📊 Dasbor: penjualan, invoice tertunggak, peringatan stok
- 🛒 Kasir (POS): klik produk → bayar → stok otomatis berkurang
- 📦 Inventori: daftar produk + ambang stok minimum
- 🧾 Invoice: terbitkan & tandai dibayar
- 👥 Pelanggan (CRM ringkas)

## Jalankan lokal
```bash
npm install
npm run dev
```

## Deploy ke Vercel
1. Push repo ini ke GitHub
2. Import di vercel.com → Framework: Vite → Deploy
3. Selesai — tidak butuh env apa pun

## Data
Data tersimpan di localStorage browser (tanpa setup). Untuk sinkron multi-device, isi `VITE_SUPABASE_URL` + `VITE_SUPABASE_ANON_KEY` di Vercel (lihat .env.example).

## Lisensi
MIT
