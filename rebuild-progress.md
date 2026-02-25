# Obys Agency Rebuild Progress

Last updated: 2026-02-25

**Goal**
Pixel-perfect rebuild of ODB that is independent from the original minified bundles, while preserving exact layout, assets, and interactions.

**Progress Achieved**
- Rebuild route group (`/rebuild/*`) with isolated layout and runtime boot.
- Legacy scripts isolated to `(legacy)` layout; rebuild routes no longer depend on minified JS.
- Local asset mirror + URL rewrite map for remote uploads.
- Structured data extraction for books + featured list.
- Rebuild pages implemented: Home, Books list, Book detail, Credits, Contacts.
- Rebuild header + menu controller with active state and mobile thumbnails.
- Rebuild runtime updates: `is-ready`/`is-loaded` classes + auto-hydrate `data-src` images.
- Rebuild scroll unlocked via `rebuild.css` override.
- Sticky nav + pages grid scaffold added to rebuild shell.
- Sticky nav controller: draggable ordering + page stack class updates.
- Particle hover preview (2D canvas halftone) on rebuild pages.
- Page stack transitions: click-to-reorder + `pages-animating` state.
- Case mode class (`case--is-active`) for book detail routes.
- Lightweight smooth scroll for rebuild routes (wheel interpolation).
- Contacts page converted from HTML partial to typed React component.
- Credits page converted to React component with embedded HTML dataset.
- Book detail routes converted to typed React + generated `book-details` dataset (no partial HTML injection in route).
- SVG symbol sprite injected for rebuild routes.
- Credits route converted from `credits-html` raw blob into typed React + data modules.
- Shared rebuild footer component extracted and reused across rebuild pages.
- Unused rebuild partial helper (`rebuild-html`) removed.
- GSAP scroll motion layer added for rebuild sections (`reveal`, headings, footer, stagger targets).
- Page stack motion refined with GSAP depth animation + improved sticky-nav drag transition handling.
- Main rebuild stylesheet normalized from hashed filename to stable `main.css`.
- Legacy script references normalized to stable filenames (`runtime.js`, `gsap.js`, `three.js`, `app.js`).
- Hashed CSS/JS asset files removed from active bundle paths after reference migration.
- Repo hygiene cleanup: `.gitignore` added, generated folders cleaned, dan duplikasi `style.min.css` dihapus.
- Deduplikasi aset thumbnail selesai: path disatukan ke `/assets/static/*` dan file duplikat di `/public/assets/images` dihapus (`about.avif`, `books.avif`, `contacts.avif`, `logo.png`).
- Struktur source dirapikan: referensi mentah dipindah ke `src/legacy/reference`, script ingest diselaraskan, dan dead component legacy (`PagesGrid`, `StickyNav`) dihapus.
- Penamaan file komponen distandarkan ke `kebab-case` (legacy + rebuild) dengan pembaruan import path menyeluruh.

**Current Focus (Phase 4: Motion + Parity Tuning)**
- Tune rebuild interactions and motion timing for closer parity with original behavior.

**Next Steps**
1. Fine-tune GSAP timings/easings against source behavior (desktop + mobile).
2. Tune particle hover and page transition timing for closer visual parity.
3. Lanjutkan cleanup struktur source (`src/legacy/reference`, legacy dump files) agar siap dipindah ke repo terpisah.

**Known Gaps**
- Three.js-driven effects are not yet recreated for rebuild routes.
- Particle hover uses 2D canvas; visual parity may need tuning.
- Some animations rely on `is-loaded`/`is-ready` timing; further tuning may be needed.
