# Anti-Patterns — GPOS Lite DS V2

> Larangan dan kesalahan umum berdasarkan `CLAUDE.md`, audit dokumentasi, dan implementasi repo.

---

## Larangan mutlak

| Jangan | Ganti dengan |
|--------|--------------|
| Token baru | Variable di `styles/tokens.css` |
| Komponen / variant / state baru | Class di halaman HTML referensi |
| Hex / px spacing / radius / shadow / z-index hardcoded | `var(--*)` atau utility Tailwind semantic |
| Warna Tailwind default (`bg-blue-500`) | `bg-blue-b300`, `text-neutral-n900`, … |
| Vue, Mantine, Bootstrap, UI library eksternal | React TSX + HTML reference + Tailwind |
| Ikon library eksternal | `assets/icons/icon-*.svg` via `<img>` |
| Inline SVG di komponen | `<img>` — kecuali implementasi doc Toast (catatan legacy) |
| Redesign / refactor luas / DOM wrapper berlebihan | Diff minimal pada file diminta |
| Contoh placeholder tidak ada di repo | Salin markup dari halaman doc komponen |
| Custom shadow di luar token | `--shadow-1` atau `--shadow-md` sesuai referensi |

---

## Warna & token

| Anti-pattern | Mengapa salah | Benar |
|--------------|---------------|-------|
| `color: #1E7FD6` | Hardcode | `var(--color-blue-b300)` |
| `bg-blue-500` | Bukan skala GP Lite | `bg-blue-b300` |
| Orange/green sebagai primary CTA | Brand = blue | `ds-btn--primary` |
| B300 sebagai background luas | Kontras & hierarchy | Surface putih + aksen blue |
| N0–N30 untuk teks | Kontras rendah | N500–N900 untuk teks |
| N800–N900 sebagai background luas | Terlalu gelap | `--color-background`, `--color-surface` |

---

## Spacing & layout

| Anti-pattern | Mengapa salah | Benar |
|--------------|---------------|-------|
| `padding: 18px` | Di luar skala | `--space-200` (16px) atau `--space-250` (20px) |
| Micro spacing untuk container padding | Salah kategori | `--space-200`+ untuk card/form |
| Layout padat / section rapat | Melanggar style guide | `--space-400`–`600` antar section |
| Sidebar + main sejajar tanpa topnav | Salah hierarki shell | `ds-topnav` di atas `ds-page-layout__body` |
| `--sidebar-*` navy untuk app sidebar | Tertukar doc vs app | `ds-sidebar-nav-expand` putih |

---

## Komponen & shell

| Anti-pattern | Mengapa salah | Benar |
|--------------|---------------|-------|
| Logo brand + footer profil di Navigation Menu | Bukan spec DS | Template HTML navigation |
| Dismiss button di Toast Banner | Belum diimplementasi | `ds-banner__icon` + `ds-banner__text` saja |
| `ds-toggle--lg` | Tidak ada di CSS | `ds-toggle--large` |
| Modal root `ds-modal` | Naming exception | `modal-composition-item` |
| Popup root `ds-popup` | Naming exception | `popup-anchor-wrap` |
| Dua `ds-btn--primary` dalam satu area CTA | Hierarchy | Satu primary + subtle/link |
| Badge sebagai satu-satunya label aksi | A11y | Teks label + badge |
| Widget KPI/chart tidak ada di HTML | Invented UI | Compose dari komponen existing |
| `--website` + `--mobile` topnav bersamaan | Responsive conflict | Satu varian per viewport |

---

## Shadow & elevation

| Anti-pattern | Mengapa salah | Benar |
|--------------|---------------|-------|
| Custom `box-shadow` arbitrary | Di luar token | `--shadow-1` atau `--shadow-md` |
| Shadow berat / stacked | Melanggar elevation philosophy | `--shadow-1` default |
| Shadow di background gelap | Tidak terbaca | Surface terang + border |

---

## Typography

| Anti-pattern | Mengapa salah | Benar |
|--------------|---------------|-------|
| Font selain Poppins | Token hanya satu family | `--font-primary` |
| Body < 14px | Readability | `--font-size-sm` minimum |
| Skip heading levels (H1→H4) | Hierarchy | Urutan H1→H2→H3 |
| Font size ad hoc di komponen | Inkonsisten | `--text-body-*` atau `--font-size-*` |

---

## Accessibility

| Anti-pattern | Mengapa salah | Benar |
|--------------|---------------|-------|
| `<div onclick>` menggantikan `<button>` | Keyboard/a11y | `<button>` atau native control |
| Ikon tanpa label pada icon-only button | Screen reader | `aria-label` |
| Decorative icon dengan alt panjang | Noise SR | `alt=""` + `aria-hidden="true"` |
| Error tanpa `role="alert"` | Tidak diumumkan | `ds-form-message--error` + `role="alert"` |
| Custom widget tanpa ARIA role | Tidak accessible | Pola di [accessibility.md](./accessibility.md) |
| Animasi tanpa `prefers-reduced-motion` | Motion sensitivity | Media query reduce |
| Tabel memaksa kolom shrink | Data loss | `.ds-table-scroll` horizontal scroll |

---

## Dokumentasi & AI

| Anti-pattern | Mengapa salah | Benar |
|--------------|---------------|-------|
| Improvise spacing dari Figma tanpa anatomy | Tidak akurat | `components/*/*.html` + `figma/` |
| Klaim `.claude/references/` sebagai ✅ penuh | Folder bisa kosong | Fallback ke foundations + components |
| Path `docs/` lowercase | Case mismatch Linux | `Docs/` |
| Invent variant dari Figma Make | Tidak di repo | Cek `component-rules.md` + HTML |
| Rewrite file panjang untuk perubahan kecil | Scope creep | Diff minimal |

---

## Storybook / React

| Anti-pattern | Mengapa salah | Benar |
|--------------|---------------|-------|
| Storybook sebagai source implementasi | Tidak aktif di repo | HTML + TSX |
| React component baru di luar `src/GposLite` | Arsitektur | Extend existing TSX |
| "No React" over-applied ke runtime | CLAUDE scope doc vs product | TSX canonical untuk produk |

---

## Referensi

| File | Path |
|------|------|
| Aturan agent | `CLAUDE.md` |
| Larangan engineer | `Docs/engineer-skill.md` § Larangan mutlak |
| DO/DON'T per komponen | `Docs/component-rules.md` |
| Patterns yang benar | [patterns.md](./patterns.md) |
