# cmlabs-frontend-fulltime-test

Project ini menggunakan Next.js 16, React 19, TypeScript, dan Tailwind CSS 4.

## Demo

https://cmlabs-frontend-fulltime-test-l2c2t5pkc-dikapratanas-projects.vercel.app/

## Spesifikasi Environment

Supaya aplikasi berjalan aman di lokal, gunakan:

- Node.js `>= 20.9.0`
- npm `>= 10`

Rekomendasi paling aman:

- Node.js `20 LTS` atau `22 LTS`
- npm bawaan dari versi Node tersebut

Catatan:

- Repository ini memakai `package-lock.json`, jadi package manager yang disarankan adalah `npm`.
- Requirement minimal `Node.js 20.9+` mengikuti kebutuhan Next.js 16 yang dipakai project ini.

## Environment Variable

Buat file `.env` di root project, lalu isi dengan:

```env
MEAL_DB_API_HOST=https://www.themealdb.com
```

Atau, jika ingin lebih cepat, Anda bisa rename file `.env.example` menjadi `.env`, lalu pastikan isinya tetap seperti di atas.

Optional untuk metadata URL lokal:

```env
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

## Cara Menjalankan di Local

1. Pastikan versi Node.js dan npm sudah sesuai.

```bash
node -v
npm -v
```

2. Install dependency.

```bash
npm install
```

3. Siapkan file `.env`.

Buat file `.env`, lalu isi:

```env
MEAL_DB_API_HOST=https://www.themealdb.com
```

Atau rename `.env.example` menjadi `.env`.

4. Jalankan development server.

```bash
npm run dev
```

5. Buka aplikasi di browser:

```text
http://localhost:3000
```

## Langkah Aman Sampai Aplikasi Jalan

Ikuti checklist ini supaya setup lokal lebih aman dan minim error:

1. Gunakan Node versi LTS, jangan versi terlalu lama.
2. Jalankan `npm install` dari root project ini.
3. Pastikan file `.env` sudah ada sebelum menjalankan aplikasi.
4. Biarkan `MEAL_DB_API_HOST` tetap ke `https://www.themealdb.com` jika tidak ada kebutuhan khusus.
5. Jika port `3000` sedang dipakai, hentikan proses lama atau jalankan ulang setelah port tersedia.
6. Setelah server aktif, cek halaman utama di browser dan pastikan data meal berhasil tampil.

## Script yang Tersedia

```bash
npm run dev
npm run build
npm run start
npm run lint
```

Penjelasan singkat:

- `npm run dev` untuk development lokal
- `npm run build` untuk membuat build production
- `npm run start` untuk menjalankan hasil build production
- `npm run lint` untuk pengecekan code style dan potensi issue

## Verifikasi Production Build

Kalau ingin memastikan aplikasi aman dijalankan seperti mode production, gunakan:

```bash
npm run build
npm run start
```

Lalu buka kembali:

```text
http://localhost:3000
```

## Struktur Singkat

- `app/` berisi route App Router Next.js
- `features/` berisi modul fitur utama
- `components/` berisi komponen reusable
- `lib/` berisi utilitas dan helper

## Troubleshooting Singkat

Jika aplikasi tidak jalan di lokal:

- pastikan `node -v` minimal `20.9.0`
- hapus `node_modules`, lalu install ulang dengan `npm install`
- cek isi `.env` dan pastikan URL valid
- jalankan `npm run lint` untuk melihat error yang terdeteksi
