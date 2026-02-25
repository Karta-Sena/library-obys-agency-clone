# project-structure

Dokumen ini menjelaskan struktur folder aktif agar proses split ke repo terpisah tetap konsisten.

## direktori utama

- `src/app/(legacy)`: route parity terhadap versi lama.
- `src/app/(rebuild)`: route rebuild modular.
- `src/components/rebuild`: komponen UI dan controller untuk route rebuild.
- `src/data`: dataset statis hasil ekstraksi (books, credits, featured, site).
- `src/legacy/reference`: sumber HTML mentah + partial hasil ingest clone.
- `src/lib`: util pembacaan HTML, helper route, dan util runtime.
- `public/assets`: aset runtime yang dipakai legacy dan rebuild.
- `scripts`: util ekstraksi dataset dan normalisasi aset.

## prinsip organisasi

- `src/legacy/reference` adalah sumber ingest, bukan lokasi implementasi komponen runtime.
- Data hasil parsing dari sumber legacy harus ditulis ke `src/data`.
- Route baru diarahkan ke `(rebuild)`; `(legacy)` dipertahankan untuk parity check.
- Folder generated (`.next`, `out`) harus dibersihkan sebelum commit release.
