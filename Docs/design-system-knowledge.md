# GPOS Lite Design System V2 — Knowledge Base

> **Source of truth:** implementasi di repositori `DS-Gpos-Lite-V2`. Dokumen ini hanya mencatat apa yang ada di kode; tidak ada rekomendasi redesign.

**Aturan proyek:** `CLAUDE.md`, `style_guide.md`.

---

## Daftar isi

1. [Scope & struktur repositori](#scope--struktur-repositori)
2. [Design tokens — katalog](#design-tokens--katalog)
3. [CSS variables](#css-variables)
4. [Konvensi penamaan](#konvensi-penamaan)
5. [Tailwind](#tailwind-implementasi)
6. [Pola aksesibilitas](#pola-aksesibilitas)
7. [Foundations](#foundations)
8. [Motion, z-index & breakpoints (token)](#motion-z-index--breakpoints-token)
9. [Assets](#assets)
10. [Styles & JavaScript](#styles--javascript)
11. [Components (34)](#components)
12. [index.html](#indexhtml--home)
13. [Referensi file](#referensi-file-kunci)

---

## Scope & Struktur Repositori

| Path | Status | Catatan |
|---|---|---|
| `index.html` | ✅ | Home / navigasi DS |
| `pages/*`, `patterns/*`, `templates/*`, `navigation/*` | ❌ | Tidak ada di disk (ghost paths sudah dihapus dari `tailwind.config.js`) |
| `styles/gp-lite-design-tokens.json` | ✅ | Snapshot token dari `tokens.css` |
| `components/*` | ✅ | 34 halaman dokumentasi (`*.html`); 34/34 punya folder `figma/` dengan PNG export |
| `src/stories/`, `.storybook/` | ❌ | Tidak aktif di repo saat ini — dokumentasi via HTML + `src/GposLite` |
| `src/GposLite/components/*` | ✅ | 34 komponen runtime React (`*.tsx`) |
| `src/GposLite/styles/*` | ✅ | CSS per komponen runtime React |
| `CSS/*` | ❌ | Styles di `styles/` |
| `js/*` (root) | ❌ | JS inline di HTML; modul: `foundations/icons/iconsData.js` |
| `assets/*` | ✅ | `assets/icons/` (188 SVG), `assets/images/` (6 file) |
| `foundations/*` | ✅ | colors, typography, spacing, borders, shadows, grid, icons |
| `styles/*` | ✅ | `tokens.css`, `globals.css`, `enhancements.css`, `gp-lite-design-tokens.json` |
| `.claude/references/` | ✅ | Folder anatomy reference tersedia; tetap fallback ke `foundations/*`, `components/*/*.html`, `components/*/figma/` bila konteks belum cukup |

### Arsitektur repository (canonical stack)

```
index.html
├── src/GposLite/components/*.tsx  → canonical runtime components
├── src/GposLite/styles/*.css      → canonical runtime component styles
├── styles/globals.css      → @import tokens.css + layout sidebar/topbar
├── styles/enhancements.css   → utilitas halaman dokumentasi
├── tailwind.config.js        → mapping token → Tailwind (build)
├── foundations/{topic}/*.html
└── components/{Name}/*.html  → visual/anatomy reference + Tailwind CDN inline config
```

**Stack hybrid (canonical):** React (TSX) + Tailwind + CSS custom properties untuk runtime, dengan HTML statis sebagai reference visual/anatomy.

**Rule pemakaian source:**

1. Behavior/runtime logic: `src/GposLite/components/*.tsx`
2. Token/styling scale: `styles/tokens.css`, `tailwind.config.js`
3. Visual anatomy/layout fidelity: `components/*/*.html`, `foundations/*/*.html`, `components/*/figma/`

**Brand:** GPOS Blue `#1E7FD6` (`--color-primary-500`, `--color-blue-b300`).

**Build npm:** `dev` / `build` / `watch` memakai input `./styles/globals.css` → output `./dist/output.css`.

---

## Design Tokens — Katalog

Semua token terpusat di `styles/tokens.css` (`:root`). Snapshot JSON untuk tooling: `styles/gp-lite-design-tokens.json` (export: `scripts/export_tokens_json.py`).

| Kategori | Prefix / nama | Rentang baris (tokens.css) |
|---|---|---|
| Primary & utilitas warna | `--color-primary-*` … `--color-gray-*` | 13–95 |
| GP Lite palette | `--color-blue-b*`, `orange-o*`, `red-r*`, `green-g*`, `purple-p*`, `neutral-n*` | 97–165 |
| Semantic color | `--color-background`, `--color-text-*`, `--color-border*` | 167–181 |
| Sidebar | `--sidebar-*` | 183–200 |
| Topbar | `--topbar-*`, `--topbar-height: 56px` | 202–207 |
| Typography base | `--font-*`, `--font-size-*`, `--font-weight-*`, `--line-height-*`, `--letter-spacing-*` | 209–245 |
| Figma text styles | `--text-{category}-{variant}-{size\|weight\|lh\|ls\|transform}` | 247–339 |
| Spacing rem | `--spacing-0` … `--spacing-24` | 341–356 |
| GP Lite space | `--space-0` … `--space-1000` | 358–372 |
| Border radius | `--border-radius-*` | 374–384 |
| Border width | `--border-width-*` | 386–392 |
| Shadow | `--shadow-1` (utama), `--shadow-md` (sekunder di komponen), legacy `--shadow-xs` … | 394–414 |
| Z-index | `--z-hide` … `--z-tooltip` | 416–428 |
| Transition | `--transition-fast\|base\|slow\|spring` | 430–436 |
| Breakpoint (CSS) | `--breakpoint-xs` … `--breakpoint-2xl` | 438–446 |
| Layout | `--sidebar-width: 270px` | 448–451 |

**Token elevation:** `--shadow-1` (default DS, foundation Shadows); `--shadow-md` (legacy, masih dipakai di beberapa komponen — Modal, Dropdown, Section Message, Time Picker, Tourguide, dll.). Base rgba: `#091E42` / `neutral-n900`.

**Token layout grid (halaman foundation, bukan tokens.css global):** `--grid-columns-sm|md|lg|xl`, `--grid-margin`, `--grid-gutter`, `--grid-bp-*` di `foundations/grid/grid.html`.

---

## CSS Variables

### Cara dipakai di implementasi

1. **Langsung di CSS komponen:** `color: var(--color-neutral-n900);`, `box-shadow: var(--shadow-1);`
2. **Via Tailwind utility:** `bg-primary-500`, `text-neutral-n900`, `shadow-1`, `gap-200` (memetakan ke `var(--…)` di `tailwind.config.js`)
3. **Runtime CDN:** halaman komponen menduplikasi `theme.extend` di `<script>tailwind.config = …</script>`

### Semantic vs primitif

| Tipe | Contoh | Kapan |
|---|---|---|
| Primitif GP Lite | `--color-blue-b300` | Brand, komponen, state hover/press |
| Primitif utilitas | `--color-primary-500` | Alias brand, skala 50–900 |
| Semantic | `--color-text-secondary` | Body copy, label sekunder |
| Chrome | `--sidebar-link-active-color` | Shell dokumentasi DS |
| Komposit teks | `--text-body-medium-regular-size` | Typography foundation & komponen |

### Icon size (scope foundation)

`--icon-size-small|medium|large|xlarge` didefinisikan di `foundations/icons/icons.html`, **bukan** di `tokens.css`.

---

## Konvensi Penamaan

### Class CSS (komponen)

| Pola | Contoh | Pengecualian |
|---|---|---|
| Block | `ds-btn`, `ds-table`, `ds-flag` | — |
| Element | `ds-btn__label`, `ds-flag__header` | — |
| Modifier | `ds-btn--primary`, `ds-checkbox--error` | State doc: `--hover`, `--focus`, `--press` |
| Modal | `modal-composition-item`, `modal-header-item`, `modal-size-md` | Tanpa prefix `ds-` |
| Popup | `popup-anchor-wrap`, `popup-part-panel` | Tanpa prefix `ds-` |
| Dokumentasi shell | `ds-hero-banner`, `ds-playground-panel`, `ds-doc-*` | Bukan komponen produk |

### File & folder

| Entitas | Konvensi |
|---|---|
| Komponen | `components/{Nama Folder}/{slug}.html` (spasi di nama folder: `Date picker`, `Top & bottom Navigation`) |
| Foundation | `foundations/{topic}/{topic}.html` |
| Ikon SVG | `assets/icons/icon-{kebab}.svg` |
| Sidebar ikon | `icon-sidebar-{context}-{off\|on}.svg` |
| Data ikon | `iconsData.js`: `name` PascalCase, `file` kebab |

### Figma ↔ CSS (yang dipakai di repo)

| Figma | CSS |
|---|---|
| `Text.{Category}.{Variant}` | `--text-{category}-{variant}-{property}` |
| `Corner.*` | `--border-radius-*` (sm/md/lg/…) |
| `Space.*` | `--space-{025\|050\|…}` |
| `Shadow 1` | `--shadow-1` |
| GP Lite color steps | `--color-{family}-{step}` (`b300`, `n40`) |

### HTML dokumentasi

- `lang="id"` pada `<html>`
- Path relatif ke styles: `../../styles/globals.css`
- Path ikon: `../../assets/icons/...`
- `data-*` pada playground (contoh Page Layout: `data-pl-topnav`)

---

## Tailwind Implementasi

### Config

- **Build:** `tailwind.config.js` — `content` mencakup `index.html`, `components/**`, `foundations/**`, `styles/**`
- **Runtime app/library:** kelas Tailwind pada komponen React `src/GposLite/components/*.tsx`
- **Runtime docs:** CDN + inline `theme.extend` mirror config di halaman HTML komponen/foundation

### Mapping utama (`theme.extend`)

| Token CSS | Utility contoh |
|---|---|
| `--color-blue-b300` | `bg-blue-b300`, `text-blue-b300` |
| `--color-neutral-n900` | `text-neutral-n900` |
| `--space-200` | `p-200`, `gap-200` |
| `--spacing-4` | `p-4` |
| `--border-radius-md` | `rounded-md` |
| `--shadow-1` | `shadow-1` |
| `--shadow-md` | `shadow-md` |
| `--font-size-sm` | `text-sm` |
| `--text-body-medium-regular-size` | `text-body-md` |
| Semantic | `bg-surface`, `text-text-primary`, `border-border` |

### Aturan (dari `CLAUDE.md` + implementasi halaman)

1. Hanya utility yang memetakan token semantic — hindari warna Tailwind default (`bg-blue-500` bukan skala GP Lite).
2. Spacing: prefer `gap-200`, `p-150` (GP Lite) atau `p-4` (rem).
3. Elevation: default `shadow-1` / `--shadow-1`; beberapa komponen memakai `shadow-md` / `--shadow-md` — ikuti halaman komponen referensi; tidak custom shadow.
4. Styling komponen utama di `<style>` scoped per halaman; Tailwind untuk layout dokumentasi dan utilitas sporadis.

### Breakpoint (dua sumber di repo)

| Sumber | Nilai |
|---|---|
| `tokens.css` / `tailwind.config.js` `screens` | sm 640, md 768, lg 1024, xl 1280, 2xl 1536 |
| `foundations/grid/grid.html` | SM 320–600, MD 601–1024, LG 1025–1440, XL 1400+; kolom 4/8/12/12; margin 24px; gutter 16px |

### Responsive — decision matrix (P2)

| Konteks | Pakai |
|---|---|
| Utility class `sm:` / `md:` / … | Tailwind screens (`tailwind.config.js`) |
| Margin halaman, kolom layout mockup | Grid foundation (`foundations/grid/grid.html`) |
| Shell app (topnav/footer) | `ds-topnav--website` / `--tablet` / `--mobile` |

**Contoh implementasi:**

| Komponen | Perilaku responsif |
|---|---|
| **Table** | `.ds-table-scroll` horizontal scroll; `min-width: 36rem` pada `--data`; skip link di halaman doc |
| **Form** | ≤640px: label/field stack (`form-parts-stack__row` 1 kolom); `ds-form-row` full width |
| **Page Layout** | Satu varian topnav per breakpoint — lihat `page-layout.html` |

Detail lengkap: `Docs/engineer-skill.md` (bagian Responsive — decision matrix).

---

## Pola Aksesibilitas

Pola yang **muncul di implementasi** halaman komponen (bukan standar baru).

### Global dokumentasi

| Pola | Lokasi |
|---|---|
| `lang="id"` | Semua halaman HTML DS |
| `aria-label` pada sidebar close, nav | `index.html`, shell komponen |
| `aria-expanded` pada nav section | Sidebar dokumentasi |
| Scroll progress | `role="progressbar"` + `aria-hidden="true"` (dekoratif) |

### Form controls (native first)

| Komponen | Pola |
|---|---|
| Checkbox, Radio, Toggle | `<input>` native di dalam `<label>`; visual `aria-hidden="true"` |
| Text Field, Text Area | `aria-invalid`, `aria-describedby`, `aria-label` |
| Range | `aria-valuemin`, `aria-valuemax`, `aria-valuenow`, `aria-label` |
| Form row | `role="alert"` pada pesan error |

### Custom widgets

| Pola | Komponen |
|---|---|
| `role="listbox"` + `role="option"` + `aria-selected` | Select, Time Picker, Date Time Picker |
| `role="menu"` / `menuitem` / `menuitemcheckbox` / `menuitemradio` | Dropdown, Page Header |
| `aria-expanded`, `aria-haspopup`, `aria-controls` | Select, Date Picker, Dropdown, Flags |
| `role="grid"`, `row`, `columnheader`, `aria-selected`, `aria-disabled`, `aria-current="date"` | Calendar, Date Picker |
| `role="tablist"`, `role="tab"`, `role="tabpanel"`, `aria-selected` | Tabs |
| `role="switch"`, `aria-checked` | Toggle |
| `role="tooltip"`, `aria-label` | Tooltip |
| `role="region"`, `aria-labelledby` | Section Message, Flags |
| `role="banner"`, `role="contentinfo"` | Top & Bottom Nav, Page Layout |
| `role="status"` | Page Layout banner |
| `aria-live="polite"` | Popup playground, Select loading |
| `aria-busy`, `aria-pressed` | Button |
| `aria-sort` | Table header |
| `aria-current="page"` | Breadcrumbs, Pagination |

### Focus

- `:focus-visible` + `box-shadow: 0 0 0 2px var(--color-blue-b200)` atau `var(--color-primary-500)` pada Button, Checkbox, dll.
- Section Message docs: ring fokus tautan memakai `Border.Focused` (`b200`)
- Modal: focus trap disebut di dokumentasi halaman (script inline doc)

### Ikon

- **Aturan repo:** `<img src="assets/icons/...">` — tanpa inline SVG di komponen (kecuali Toast Banner doc memakai inline SVG di contoh — catat sebagai implementasi halaman itu)
- Dekoratif: `alt=""` + `aria-hidden="true"`
- Informatif: `alt` deskriptif atau `aria-label` pada kontrol induk

### Appendix a11y tambahan (P2)

| Topik | Ringkasan | Referensi |
|---|---|---|
| WCAG kontras | Target AA: 4.5:1 body, 3:1 large text | `foundations/colors/colors.html`, `button.html` |
| Reduced motion | `@media (prefers-reduced-motion: reduce)` mematikan transisi panjang | `index.html`, `table.html`, banyak komponen |
| Skip link | Lompat ke `#main-content` | `components/Table/table.html` |
| Escape overlay | Menutup Select / Date Picker / Date Time Picker | `select.html`, `date-picker.html`, `date-time-picker.html` |
| Touch target | Icon action ≥40px di form row | `form.html` `ds-form-row__action-btn` |

Detail checklist: `Docs/engineer-skill.md` (Appendix — WCAG, motion, keyboard).

---

# Foundations

## Colors

**Skala utilitas (50–900):** `primary`, `secondary`, `success`, `warning`, `error`, `info`, `gray`.

**GP Lite palette:**

| Family | CSS prefix | Steps |
|---|---|---|
| Blue (brand) | `--color-blue-b*` | b50–b500 (**b300 = brand**) |
| Orange | `--color-orange-o*` | o50–o500 |
| Red | `--color-red-r*` | r50–r500 |
| Green | `--color-green-g*` | g50–g500 |
| Purple | `--color-purple-p*` | p50–p500 |
| Neutral | `--color-neutral-n*` | n0–n900 |

**Semantic:** `--color-background`, `--color-surface`, `--color-text-*`, `--color-border*`.

**Dokumentasi:** `foundations/colors/colors.html` — 57 token primitif + grup semantic (Background, Text, Notification, Elevation, Border, Icon).

---

## Typography

- **Font:** Poppins only (`--font-primary`)
- **Skala:** `--font-size-xs` (12px) … `--font-size-5xl` (48px)
- **19 text styles** Figma-sync: `--text-overline-medium-*` … `--text-display-medium-*`
- **Dokumentasi:** `foundations/typography/typography.html`
- **Base headings:** `styles/globals.css` (`h1`–`h6` → `--font-size-*`)

---

## Spacing

- Rem: `--spacing-1` (4px) … `--spacing-24`
- GP Lite: `--space-025` (2px) … `--space-1000` (80px); default dok **Space.200 (16px)**
- **Dokumentasi:** `foundations/spacing/spacing.html`

---

## Borders

| Figma | CSS | px (doc) |
|---|---|---|
| Corner.0 | `--border-radius-none` | 0 |
| — | `--border-radius-sm` | 4 |
| Corner.100 | `--border-radius-md` | 8 (default input/button) |
| Corner.150 | `--border-radius-lg` | 12 |
| Corner.200 | `--border-radius-xl` | 16 |
| — | `--border-radius-2xl` | 24 |
| Corner.Full | `--border-radius-full` | pill |

**Width:** `--border-width-0|1|2|4`. **Dokumentasi:** `foundations/borders/borders.html`.

---

## Icons

| Ukuran | CSS | px |
|---|---|---|
| small | `--icon-size-small` | 16 |
| medium | `--icon-size-medium` | 24 |
| large | `--icon-size-large` | 32 |
| xlarge | `--icon-size-xlarge` | 48 |

| Katalog | Jumlah |
|---|---|
| GENERAL | 110 |
| Sidebar OFFLINE/ONLINE | 25 + 11 item (pasangan off/on) |
| **Total katalog** | **146** |
| File di disk | **188** |

**Data:** `foundations/icons/iconsData.js`. **Dokumentasi:** `foundations/icons/icons.html`.

---

## Shadow

- **Utama (foundation):** `--shadow-1` / `shadow-1` — card, dropdown, modal, popover (dokumentasi `foundations/shadows/shadows.html`)
- **Sekunder (implementasi):** `--shadow-md` / `shadow-md` — dipakai di halaman komponen tertentu (mis. Modal, Dropdown, Section Message, Time Picker, Text Field focus, Tourguide spotlight, Page Header/Layout shell, Table focus ring)
- Legacy lain: `--shadow-xs` … `--shadow-2xl`, `--shadow-brand`, `--shadow-inner` — hanya jika sudah ada di halaman target
- **Dokumentasi:** `foundations/shadows/shadows.html`

---

## Grid & Layout

**File:** `foundations/grid/grid.html`

| Breakpoint (foundation) | Lebar | Kolom |
|---|---|---|
| SM | 320–600px | 4 |
| MD | 601–1024px | 8 |
| LG | 1025–1440px | 12 |
| XL | 1400px+ | 12 |

- Margin: **24px** (`--grid-margin`)
- Gutter: **16px** (`--grid-gutter`)
- CSS lokal halaman: `--grid-bp-sm: 320px`, `--grid-bp-md: 601px`, `--grid-bp-lg: 1025px`, `--grid-bp-xl: 1400px`

---

## Motion, Z-Index & Breakpoints (token)

> Tidak ada halaman foundation HTML terpisah untuk motion/z-index/breakpoint — token ada di `styles/tokens.css`. Detail responsif: [Responsive — decision matrix](#responsive--decision-matrix-p2).

### Motion / transition

| Token | Nilai | Pemakaian umum |
|---|---|---|
| `--transition-fast` | 150ms ease-in-out | Hover button, kontrol ringan |
| `--transition-base` | 200ms ease-in-out | Default interaksi |
| `--transition-slow` | 300ms ease-in-out | Sidebar collapse, panel |
| `--transition-spring` | 400ms cubic-bezier(0.175, 0.885, 0.32, 1.275) | Animasi dengan overshoot ringan |

**Aturan:** gunakan token di atas; hormati `prefers-reduced-motion` (lihat `Docs/engineer-skill.md`).

### Z-index stack

| Token | Nilai | Lapisan |
|---|---|---|
| `--z-hide` | -1 | Sembunyikan dari stack |
| `--z-base` | 0 | Konten default |
| `--z-dropdown` | 1000 | Menu, select listbox |
| `--z-sticky` | 1020 | Header sticky |
| `--z-fixed` | 1030 | Sidebar doc shell |
| `--z-modal-backdrop` | 1040 | Overlay backdrop |
| `--z-modal` | 1050 | Dialog/modal |
| `--z-popover` | 1060 | Popover, popup panel |
| `--z-tooltip` | 1070 | Tooltip (paling atas) |

**Aturan:** jangan hardcode `z-index` di luar skala token.

### Breakpoint (Tailwind / CSS)

| Token / screen | px | Catatan |
|---|---|---|
| `--breakpoint-xs` / default | 0 | Mobile |
| `--breakpoint-sm` / `sm:` | 640 | Landscape mobile |
| `--breakpoint-md` / `md:` | 768 | Tablet |
| `--breakpoint-lg` / `lg:` | 1024 | Desktop |
| `--breakpoint-xl` / `xl:` | 1280 | Wide desktop |
| `--breakpoint-2xl` / `2xl:` | 1536 | Ultra wide |

Grid foundation memakai rentang berbeda (320–1400+) — lihat [Grid & Layout](#grid--layout) dan matriks responsif P2.

---

# Assets

## `assets/icons/`

188 SVG; path relatif `../../assets/icons/...` dari halaman komponen.

## `assets/images/`

| File | Penggunaan |
|---|---|
| `avatar.svg` | Avatar |
| `logo-parts.svg` | Top/bottom navigation, page layout |
| `Divider.svg` | Dekorasi |
| `range=default.svg`, `range =hover.svg`, `range =press.svg` | Range slider states |

---

# Styles & JavaScript

| File | Peran |
|---|---|
| `styles/tokens.css` | Semua design token CSS |
| `styles/globals.css` | Reset, typography base, `.container`, `.sidebar`, `.topbar`, nav doc |
| `styles/enhancements.css` | Utilitas halaman dokumentasi saja |
| `tailwind.config.js` | Build Tailwind |
| `foundations/icons/iconsData.js` | Katalog ikon |
| Inline `<script>` | Sidebar, copy code, playground per halaman |

**Catatan:** Class `ds-*` komponen ada di `<style>` per file HTML, **bukan** di `globals.css`.

---

# Components

> **Registry AI (entry point):** `Docs/components-index.md` — daftar 34 komponen + link ke `Docs/components/{slug}.md`.  
> Bagian di bawah = katalog implementasi + variant/a11y per komponen (sumber detail di knowledge base).

Pola bersama: `globals.css` + `enhancements.css` + Tailwind CDN + CSS scoped BEM + matrix variant di halaman doc.

| # | Komponen | File | Root class |
|---|---|---|---|
| 1 | Avatar | `components/Avatar/avatar.html` | `ds-avatar` |
| 2 | Badge | `components/Badge/badge.html` | `ds-badge` |
| 3 | Breadcrumbs | `components/Breadcrumbs/breadcrumbs.html` | `ds-bc-container` |
| 4 | Button | `components/Button/button.html` | `ds-btn` |
| 5 | Calendar | `components/Calendar/calendar.html` | `ds-calendar` |
| 6 | Checkbox | `components/Checkbox/checkbox.html` | `ds-checkbox` |
| 7 | Date Picker | `components/Date picker/date-picker.html` | `ds-date-picker` |
| 8 | Date Time Picker | `components/Date time picker/date time picker.html` | `ds-date-time-picker` |
| 9 | Dropdown Button | `components/dropdown/dropdown.html` | `ds-dropdown` |
| 10 | Flags | `components/Flags/flags.html` | `ds-flag` |
| 11 | Form | `components/Form/form.html` | `ds-form-row` |
| 12 | Inline Edit | `components/Inline edit/inline-edit.html` | `ds-inline-edit` |
| 13 | Lozenge | `components/Lozenge/lozenge.html` | `ds-lozenge` |
| 14 | Modal | `components/Modal/modal.html` | `modal-composition-item` |
| 15 | Navigation Menu | `components/Navigation menu/navigation.html` | `ds-sidebar-nav-expand` |
| 16 | Page Header | `components/Page Header/page-header.html` | `ds-page-header` |
| 17 | Page Layout | `components/Page layout/page-layout.html` | `ds-page-layout` |
| 18 | Pagination | `components/Pagination/pagination.html` | `ds-pagination` |
| 19 | Popup | `components/Popup/popup.html` | `popup-anchor-wrap` |
| 20 | Radio | `components/Radio/radio.html` | `ds-radio` |
| 21 | Range | `components/Range/range.html` | `ds-range` |
| 22 | Section Message | `components/section messages/section-message.html` | `ds-section-message` |
| 23 | Select | `components/Select/select.html` | `ds-select-trigger`, `ds-option` |
| 24 | Table | `components/Table/table.html` | `ds-table` |
| 25 | Tabs | `components/Tabs/tabs.html` | `ds-tab` |
| 26 | Tags | `components/Tags/tags.html` | `ds-tag` |
| 27 | Text Area | `components/Text Area/text area.html` | `ds-text-area` |
| 28 | Text Field | `components/Text Field/text field.html` | `ds-text-field` |
| 29 | Time Picker | `components/Time picker/time-picker.html` | `ds-time-picker` |
| 30 | Toast Banner | `components/Toast-Banner/banner.html` | `ds-banner` |
| 31 | Toggle | `components/Toggle/toggle.html` | `ds-toggle` |
| 32 | Tooltip | `components/Tooltip/tooltip.html` | `ds-tooltip` |
| 33 | Top & Bottom Navigation | `components/Top & bottom Navigation/top-bottom-nav.html` | `ds-topnav`, `ds-footer-nav` |
| 34 | Tourguide | `components/Tourguide/tourguide.html` | `ds-tourguide` |

---

## Avatar

| Field | Detail |
|---|---|
| **Variants** | — |
| **Sizes** | `--sm`, `--md`, `--lg`, `--xl` |
| **A11y** | `aria-label`; `alt` pada image |

## Badge

| Field | Detail |
|---|---|
| **Variants** | `--default`, `--primary`, `--important`, `--subtle`, `--added`, `--removed` |

## Breadcrumbs

| Field | Detail |
|---|---|
| **Variants** | Container `--truncated`; item `--default`, `--hover`, `--focus`, `--press` |
| **A11y** | `aria-current="page"`; `aria-label` container |

## Button

| Field | Detail |
|---|---|
| **Variants** | `--primary`, `--subtle`, `--subtle-link`, `--danger`, `--warning`, `--link`, `--icon-only`, `--compact`, `--loading`, `--none` |
| **States** | `--hover`, `--focus`, `--press`, `--disabled`, `--selected` |
| **A11y** | `aria-label`, `aria-busy`, `aria-pressed`; `disabled` |

## Calendar

| Field | Detail |
|---|---|
| **Day variants** | `--selected`, `--disabled`, `--today`, `--outside`, `--range`, `--text-subtle` |
| **A11y** | `role="grid"`, `aria-selected`, `aria-disabled`, `aria-current="date"` |

## Checkbox

| Field | Detail |
|---|---|
| **Variants** | `--error`, `--disabled`, `--snapshot` |
| **Box states** | `--checked`, `--indeterminate`, `--hover`, `--pressed`, `--focus` |
| **A11y** | Native input; `aria-invalid`; visual `aria-hidden` |

## Date Picker

| Field | Detail |
|---|---|
| **Structure** | `ds-date-picker` + `ds-select-trigger` + `ds-calendar` |
| **A11y** | `aria-expanded`, `aria-haspopup`, `role="dialog"` |

## Date Time Picker

| Field | Detail |
|---|---|
| **Variants** | `__bar--hover/focus`, `__segment--time/active`, `__dropdown--date/time` |
| **A11y** | `role="listbox"`, `role="grid"` |

## Dropdown Button

| Field | Detail |
|---|---|
| **Variants** | Item `--selected`, `--hover`, `--pressed`, `--disabled`; menu `--scrollable`; btn `--icon-only` |
| **A11y** | `role="menu"`, `menuitem`, `aria-expanded`, `aria-checked` |

## Flags

| Field | Detail |
|---|---|
| **Variants** | `--normal`, `--success`, `--error`, `--warning`, `--info`, `--collapsed` |
| **A11y** | `role="region"`, `aria-expanded`, `aria-controls` |

## Form

| Field | Detail |
|---|---|
| **Variants** | Row `--valid`, `--invalid`; message `--error`, `--information`, `--true` |
| **A11y** | `role="alert"` pada error |

## Inline Edit

| Field | Detail |
|---|---|
| **Variants** | `--active`, `--typing`, `--confirm`, `--cancel`, `--inline-message`, dll. |

## Lozenge

| Field | Detail |
|---|---|
| **Variants** | `--default`, `--bold`, `--new`, `--removed`, `--success`, `--inprogress`, `--moved` |

## Modal

| Field | Detail |
|---|---|
| **Sizes** | `modal-size-xs`, `sm`, `md`, `lg` |
| **Appearance** | `modal-header-icon--warning`, `--danger` |
| **Footer** | `ds-btn` di `modal-footer-container` |

## Navigation Menu

| Field | Detail |
|---|---|
| **Parts** | `ds-nav-mainmenu-snap`, `ds-nav-submenu-snap`, `ds-nav-menu-search` |
| **A11y** | `aria-expanded`, `aria-current` |

## Page Header

| Field | Detail |
|---|---|
| **Variants** | `--actions-on`, `--toolbar-on`, `--subfilters-on` |
| **A11y** | `role="menu"`, `aria-haspopup` |

## Page Layout

| Field | Detail |
|---|---|
| **Structure** | `ds-topnav` + main + `ds-footer-nav` |
| **Topnav variants** | `--website`, `--tablet`, `--mobile` |

## Pagination

| Field | Detail |
|---|---|
| **Variants** | Item `--active`, `--ellipsis` |
| **A11y** | `<nav aria-label="Pagination">`, `aria-current="page"` |

## Popup

| Field | Detail |
|---|---|
| **Position** | `popup-anchor-wrap--left`, `--center`, `--right` |
| **A11y** | `aria-live="polite"` (playground) |

## Radio

| Field | Detail |
|---|---|
| **Variants** | `--error`, `--disabled`, `--snapshot` |
| **A11y** | Grup `name` sama; `aria-invalid` |

## Range

| Field | Detail |
|---|---|
| **Variants** | `--value-0`, `--value-50`, `--value-100`, `--disabled`, `--interactive` |
| **Assets** | `assets/images/range=*.svg` |

## Section Message

| Field | Detail |
|---|---|
| **Variants** | `--information`, `--success`, `--warning`, `--error`, `--discovery` |
| **A11y** | `role="region"`, `aria-labelledby` |

## Select

| Field | Detail |
|---|---|
| **Trigger variants** | `--subtle`, `--disabled`, `--loading`, `--typing`, `--filled-invalid`, dll. |
| **A11y** | `role="listbox"`, `aria-multiselectable`, `aria-busy` |

## Table

| Field | Detail |
|---|---|
| **Variants** | `--data`, `--row-hover`, `--sticky-head`; sort `--asc`, `--desc` |
| **A11y** | `aria-sort`, `role="columnheader"`, scroll `role="region"` |

## Tabs

| Field | Detail |
|---|---|
| **Variants** | `--selected`, `--required`, `--notification` |
| **A11y** | `role="tablist"`, `tab`, `tabpanel` |

## Tags

| Field | Detail |
|---|---|
| **Variants** | `--standard`, `--removable`, `--bluelight`, `--greenlight`, `--greylight`, `--purplelight`, `--redlight`, `--yellowlight` |

## Text Area

| Field | Detail |
|---|---|
| **Variants** | `--invalid`, `--focus` |
| **A11y** | `aria-describedby`, `aria-invalid` |

## Text Field

| Field | Detail |
|---|---|
| **Types** | `ds-text-field`, `ds-phone-field`, `ds-icon-text-field`, `ds-search-select-field` |
| **Variants** | `--compact`, `--subtle`, `--invalid`, `--snapshot` |

## Time Picker

| Field | Detail |
|---|---|
| **Structure** | `ds-time-picker` + `ds-select-trigger` + listbox |
| **A11y** | Sama pola Select |

## Toast Banner

| Field | Detail |
|---|---|
| **Variants** | `--announcement`, `--success`, `--warning`, `--error` |
| **Structure** | `div.ds-banner` → `div.ds-banner__icon` + `span.ds-banner__text` (tanpa tombol dismiss di implementasi saat ini) |
| **A11y** | Makna dari teks banner; ikon dekoratif `alt=""` + `aria-hidden="true"` bila tidak informatif |

## Toggle

| Field | Detail |
|---|---|
| **Variants** | `--large`, `--disabled`, `--snapshot` |
| **A11y** | `role="switch"`, `aria-checked` |

## Tooltip

| Field | Detail |
|---|---|
| **Variants** | `--top`, `--bottom`; `--position-left/center/right`; `--overflow`, `--truncate` |
| **A11y** | `role="tooltip"` |

## Top & Bottom Navigation

| Field | Detail |
|---|---|
| **Variants** | Topnav `--website`, `--tablet`, `--mobile`; sizes `--lg`, `--icon-only` |
| **A11y** | `role="banner"`, `aria-label` |

## Tourguide

| Field | Detail |
|---|---|
| **Parts** | `ds-spotlight-card`, `ds-btn-spotlight`, `ds-btn-onboarding-replay` |
| **A11y** | `aria-label` pada article |

---

# index.html — Home

| Aspek | Implementasi |
|---|---|
| **Layout** | `.container` → `.sidebar` (270px) + `.main-content` |
| **Styles** | `globals.css`, `enhancements.css` |
| **Nav** | 6 foundations + 34 komponen |
| **Visual** | `style_guide.md`: premium SaaS dashboard, soft surfaces, `shadow-1`, spacing konsisten |

---

# Referensi File Kunci

| Topik | Path |
|---|---|
| Rules | `CLAUDE.md` |
| Visual guide | `style_guide.md` |
| Tokens | `styles/tokens.css` |
| Layout | `styles/globals.css` |
| Doc UI | `styles/enhancements.css` |
| Tailwind | `tailwind.config.js` |
| Colors | `foundations/colors/colors.html` |
| Typography | `foundations/typography/typography.html` |
| Spacing | `foundations/spacing/spacing.html` |
| Borders | `foundations/borders/borders.html` |
| Icons | `foundations/icons/icons.html`, `iconsData.js` |
| Shadows | `foundations/shadows/shadows.html` |
| Grid | `foundations/grid/grid.html` |
| Komponen | `components/*/*.html` |
| Component registry (AI) | `Docs/components-index.md` |
| Runtime React | `src/GposLite/components/` |
| Index | `index.html` |
