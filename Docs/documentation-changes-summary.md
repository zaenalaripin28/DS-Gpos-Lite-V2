# Documentation Changes Summary (P0 + P1)

**Date:** 2026-06-04  
**Scope:** Documentation only — no design system implementation (`components/`, `foundations/`, `styles/`, dll.) diubah.

---

## Issues addressed

| Priority | Issue | Status |
|---|---|---|
| P0 | Path `docs/` vs `Docs/` | Fixed |
| P0 | Empty `.claude/references/` cited as available | Corrected |
| P1 | `shadow-1` vs `shadow-md` policy | Reconciled |
| P1 | Toggle `--lg` vs `--large` | Standardized to `--large` |
| P1 | Toast dismiss vs implementation | Aligned (no dismiss) |

---

## Files modified

| File | Changes |
|---|---|
| `CLAUDE.md` | Sudah memakai `Docs/` dan penjelasan folder anatomy opsional/kosong (tidak diubah lagi pada pass ini jika sudah sesuai) |
| `Docs/design-system-knowledge.md` | Path N/A; `.claude/references/` → ⚠️ kosong; shadow dual-token; mapping `shadow-md`; Toast structure/a11y |
| `Docs/design-principles.md` | `Docs/` paths; elevation `--shadow-1` + `--shadow-md`; referensi visual tanpa anatomy wajib; prioritas implementasi |
| `Docs/component-rules.md` | `Docs/` paths; baris Elevation global; Toast tanpa dismiss; Toggle hanya `--large`; referensi footer |
| `Docs/engineer-skill.md` | `Docs/` paths; authority order proporsi; shadows + checklist; utility shadow-md |
| `Docs/figma-make-skill.md` | `Docs/` paths; anatomy kosong; elevation Shadow 1 + md; Toast layout; Toggle `--large`; Tourguide shadow-md; prompt template |

**Not modified:** `Docs/documentation-audit.md` (laporan audit historis).

---

## 1. Path consistency (`Docs/`)

Semua referensi silang `docs/*.md` diganti ke **`Docs/*.md`** di:

- `Docs/design-principles.md`
- `Docs/component-rules.md`
- `Docs/engineer-skill.md`
- `Docs/figma-make-skill.md`

`CLAUDE.md` bagian *Design System Knowledge Sources* sudah memakai `Docs/`.

---

## 2. Shadow reconciliation

**Kebijakan dokumentasi (baru, konsisten):**

- **Default:** `--shadow-1` / `shadow-1` — sesuai `foundations/shadows/shadows.html`
- **Sekunder:** `--shadow-md` / `shadow-md` — token existing, dipakai di implementasi tertentu (Modal, Dropdown, Section Message, Time Picker, Text Field focus, Tourguide, Page Header/Layout shell, Table focus, dll.)
- **Larangan:** custom shadow di luar token `tokens.css`

Diperbarui di: knowledge (token table, Shadow section, Tailwind rules, mapping), principles (Elevation), component-rules (global Elevation), engineer-skill (foundations + checklist + utilities), figma-make (larangan, Elevation, prompt template, Tourguide).

---

## 3. Toggle naming

- **Canonical modifier:** `ds-toggle--large` (sesuai CSS di `toggle.html`)
- **`--lg` dihapus** dari daftar variant di `component-rules.md`; dicatat sebagai teks salin lama di halaman HTML saja
- **figma-make:** entri Sizes = `ds-toggle--large`

`ds-topnav--lg` dan `ds-avatar--lg` **tidak diubah** (komponen berbeda, valid di implementasi).

---

## 4. Toast Banner alignment

Implementasi: `div.ds-banner` → `div.ds-banner__icon` + `span.ds-banner__text` — **tanpa** tombol dismiss.

Diperbarui di:

- `design-system-knowledge.md` — Structure + A11y (ikon dekoratif, teks)
- `component-rules.md` — Structure, A11y, DON'T tambah dismiss
- `figma-make-skill.md` — Layout baris Toast

---

## 5. `.claude/references/`

| Sebelum | Sesudah |
|---|---|
| Status ✅ / “anatomy bila ada” tanpa caveat | Folder **reserved, kosong saat ini** |
| Prioritas anatomy tanpa fallback | Fallback: `foundations/*`, `components/*/*.html`, `components/*/figma/` |
| Anatomy wajib dianggap ada | Anatomy di `.claude/references/` hanya jika file ditambahkan nanti |

Diperbarui di: knowledge (scope table), principles, engineer-skill, figma-make; `CLAUDE.md` sudah menyatakan folder opsional dan fallback.

---

## Verification

- Tidak ada file di `components/`, `foundations/`, `styles/`, `assets/` yang diubah.
- Grep `docs/` di folder `Docs/` (file aktif): hanya tersisa di `documentation-audit.md` (konteks audit historis).

---

## P2 (2026-06-05)

| Item | Status |
|---|---|
| WCAG / reduced motion / keyboard / skip link appendix | Added to `Docs/engineer-skill.md` |
| Responsive decision matrix + Table/Form/Page Layout examples | Added to `Docs/engineer-skill.md`, `Docs/design-system-knowledge.md`, `Docs/figma-make-context.md` |
| Checklist engineer diperluas (kontras, motion, Escape, responsive) | `Docs/engineer-skill.md` |
| Figma PNG: Avatar, Badge, Breadcrumbs, Pagination, Toast-Banner | User-added; **Range** masih tanpa PNG |

## P3 (2026-06-05)

| Item | Status |
|---|---|
| Motion / z-index / breakpoint token docs | `Docs/design-system-knowledge.md` (section Motion, Z-Index & Breakpoints) |
| Motion / z-index / breakpoints di figma-make-context | Expanded token tables |
| Deduplicate component inventory | Removed closing list in knowledge base; engineer-skill → link `components-index`; components-index → link knowledge base |
| Storybook / React scope | `CLAUDE.md`, `Docs/engineer-skill.md`, knowledge base scope table |
| Figma PNG Range | User-added (0% / 50% / 100% variants) — 34/34 components complete |

## P4 polish (2026-06-05)

| Item | Status |
|---|---|
| `documentation-audit.md` ditandai historis | Banner superseded P0–P3 |
| `component-rules.md` hybrid stack + registry link | Runtime TSX + visual HTML |
| `README.md` entry point `components-index.md` | Ditambahkan di tabel docs |

**AI-readability estimasi setelah P4:** ~9.2–9.5 / 10

## Remaining (opsional)

Halaman foundation HTML terpisah untuk motion/z-index (saat ini cukup di knowledge base). Per-komponen a11y depth (Modal/Popup) masih bisa diperdalam.
