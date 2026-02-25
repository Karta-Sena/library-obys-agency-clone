# library-obys-agency-clone

Rebuild proyek `library.obys.agency` menggunakan `Next.js 14 + TypeScript` dengan fokus pada parity visual, struktur kode modular, dan workflow cleanup yang rapi.

## tujuan repo

- Menyimpan hasil rebuild yang bisa dikembangkan lebih lanjut.
- Menjaga dua mode implementasi:
  - `(legacy)` untuk referensi parity dari bundle lama.
  - `(rebuild)` untuk implementasi modern berbasis komponen.

## stack

- `next@14`
- `react@18`
- `typescript`
- `gsap`

## cara jalankan lokal

```bash
npm install
npm run dev
```

Server default: `http://localhost:3000`

## script tersedia

- `npm run dev`: jalankan development server.
- `npm run build`: build produksi (juga validasi types).
- `npm run start`: jalankan hasil build produksi.
- `npm run lint`: linting via Next.js.
- `npm run clean`: hapus artefak generated (`.next`, `out`).
- `npm run clean:all`: hapus `.next`, `out`, dan `node_modules`.
- `npm run extract:books`: regenerasi dataset buku dari partial legacy.
- `npm run extract:book-details`: regenerasi dataset detail buku.
- `npm run download:assets`: mirror aset remote dari sumber legacy.
- `npm run normalize:assets`: normalisasi penamaan aset hasil mirror.

## struktur folder utama

- `src/app/(legacy)`: route referensi legacy.
- `src/app/(rebuild)`: route rebuild utama.
- `src/components/rebuild`: komponen modular untuk mode rebuild.
- `src/data`: source data statis.
- `src/legacy/reference`: materi referensi mentah untuk ekstraksi.
- `public/assets`: aset runtime.
- `scripts`: utilitas ekstraksi dan normalisasi aset.
- `docs`: catatan struktur proyek.

## kebersihan repository

- Artefak generated (`.next`, `out`) di-ignore.
- Dependensi lokal (`node_modules`) di-ignore.
- Perubahan data/asset dilakukan via script agar repeatable.

## catatan legal

- Repository ini dibuat untuk studi engineering dan rebuild workflow.
- Nama dagang, brand, dan aset pihak ketiga tetap milik pemilik aslinya.
- Detail lisensi proyek ada di `license.md`.
