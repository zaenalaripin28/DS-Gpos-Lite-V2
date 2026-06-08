---
name: design-system
title: GPOS Lite Design System V2 — Comprehensive Reference
description: Consolidated design system documentation — single source of truth for all design decisions, tokens, components, and patterns
keywords: [design-system, tokens, components, foundations, patterns, tailwind, accessibility]
layout: doc
---

# GPOS Lite Design System V2 — Comprehensive Reference

> **Consolidated design system documentation** untuk GPOS Lite DS V2.  
> **Sumber kebenaran utama untuk AI, engineer, dan Figma Make.**  
> Hanya mencatat apa yang sudah diimplementasi di repositori — bukan spesifikasi baru.

---

## Identitas Sistem

**Brand:** GPOS Blue `#1E7FD6` · `--color-blue-b300` · `--color-primary-500`  
**Stack:** React (TSX) + HTML reference + Tailwind CSS + CSS custom properties  
**Cakupan:** 7 foundations · 34 komponen · 188 ikon SVG  
**Aturan proyek:** `CLAUDE.md`, `style_guide.md`

---

## 1. Source of Truth (urutan baca)

| Prioritas | Path | Peran |
|-----------|------|-------|
| 1 | `styles/tokens.css` | Token warna, spacing, typography, shadow, z-index |
| 2 | `styles/gp-lite-design-tokens.json` | Snapshot token untuk tooling |
| 3 | `scripts/figma_component_registry.json` | `htmlPath`, `rootClass`, `id` resmi per komponen |
| 4 | `components/{Name}/{slug}.html` | Anatomi DOM, variant, komposisi visual |
| 5 | `src/GposLite/components/{Name}.tsx` | Behavior/runtime React |
| 6 | `foundations/{topic}/{topic}.html` | Primitif design (colors, grid, dll.) |
| 7 | `.claude/figma/{id}.spec.json` | Nilai resolved untuk Figma generate |

**Jika bentrok:** ikuti registry (`rootClass`) → HTML referensi → dokumentasi rules.

---

## 2. Struktur Repositori

```
index.html                          # Home & navigasi DS
├── foundations/                    # 7 halaman primitif
├── components/                     # 34 halaman referensi HTML
├── src/GposLite/
│   ├── components/*.tsx            # Runtime React (34)
│   └── styles/*.css                # CSS per komponen
├── styles/
│   ├── tokens.css                  # Design tokens
│   ├── globals.css                 # Layout doc site (sidebar/topbar)
│   └── enhancements.css
├── assets/icons/                   # 188 SVG — satu-satunya sumber ikon
├── Docs/                           # Knowledge base & panduan AI
├── scripts/
│   ├── figma_component_registry.json
│   ├── extract_figma_specs.py
│   └── sync_component_doc_anatomy.py
└── .claude/figma/*.spec.json       # Spec auto-extract (34)
```

### Arsitektur repository (canonical stack)

Stack hybrid: React (TSX) + Tailwind + CSS custom properties untuk runtime, dengan HTML statis sebagai reference visual/anatomy.

**Rule pemakaian source:**

1. **Behavior/runtime logic:** `src/GposLite/components/*.tsx`
2. **Token/styling scale:** `styles/tokens.css`, `tailwind.config.js`
3. **Visual anatomy/layout fidelity:** `components/*/*.html`, `foundations/*/*.html`

### Status direktori

| Path | Status | Catatan |
|---|---|---|
| `index.html` | ✅ | Home / navigasi DS |
| `pages/*`, `patterns/*`, `templates/*`, `navigation/*` | ❌ | Tidak ada di disk (ghost paths sudah dihapus) |
| `styles/gp-lite-design-tokens.json` | ✅ | Snapshot token dari `tokens.css` |
| `components/*` | ✅ | 34 halaman dokumentasi (`*.html`); 34/34 punya folder `figma/` dengan PNG export |
| `src/GposLite/components/*` | ✅ | 34 komponen runtime React (`*.tsx`) |
| `src/GposLite/styles/*` | ✅ | CSS per komponen runtime React |
| `assets/*` | ✅ | `assets/icons/` (188 SVG), `assets/images/` (6 file) |
| `foundations/*` | ✅ | colors, typography, spacing, borders, shadows, grid, icons |
| `.claude/references/` | ✅ | Folder anatomy reference tersedia; fallback ke `foundations/*`, `components/*/*.html` bila konteks belum cukup |

---

## 3. Konvensi Implementasi

| Aturan | Detail |
|--------|--------|
| Class naming | BEM `ds-{block}__{element}--{modifier}` · kecuali Modal (`modal-*`), Popup (`popup-*`) |
| Warna & spacing | Hanya `var(--*)` atau utility Tailwind semantic (`bg-blue-b300`, `gap-200`) |
| Ikon | `assets/icons/icon-*.svg` via `<img>` — tanpa library eksternal |
| Bahasa | `lang="id"` pada halaman HTML |
| Elevation | Default `--shadow-1` / `shadow-1`; `--shadow-md` hanya di komponen yang sudah memakainya |
| State doc | Modifier `--hover`, `--focus`, `--press` untuk matrix; produksi pakai pseudo-class CSS |

---

## 4. Design Tokens — Katalog Lengkap

Semua token terpusat di `styles/tokens.css` (`:root`). Snapshot JSON untuk tooling: `styles/gp-lite-design-tokens.json`.

| Kategori | Prefix / nama | Rentang |
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
| Shadow | `--shadow-1` (utama), `--shadow-md` (sekunder) | 394–414 |
| Z-index | `--z-hide` … `--z-tooltip` | 416–428 |
| Transition | `--transition-fast\|base\|slow\|spring` | 430–436 |
| Breakpoint (CSS) | `--breakpoint-xs` … `--breakpoint-2xl` | 438–446 |
| Layout | `--sidebar-width: 270px` | 448–451 |

### Token elevation

- **Utama:** `--shadow-1` (default DS, foundation Shadows)
- **Sekunder:** `--shadow-md` (legacy, masih dipakai di Modal, Dropdown, Section Message, Time Picker, Tourguide, dll.)
- **Base:** rgba `#091E42` / `neutral-n900`

---

## 5. CSS Variables — Pemakaian

### Cara dipakai di implementasi

1. **Langsung di CSS komponen:** `color: var(--color-neutral-n900);`, `box-shadow: var(--shadow-1);`
2. **Via Tailwind utility:** `bg-primary-500`, `text-neutral-n900`, `shadow-1`, `gap-200` (memetakan ke `var(--…)`)
3. **Runtime CDN:** halaman komponen menduplikasi `theme.extend` di `<script>tailwind.config = …</script>`

### Semantic vs primitif

| Tipe | Contoh | Kapan |
|---|---|---|
| Primitif GP Lite | `--color-blue-b300` | Brand, komponen, state hover/press |
| Primitif utilitas | `--color-primary-500` | Alias brand, skala 50–900 |
| Semantic | `--color-text-secondary` | Body copy, label sekunder |
| Chrome | `--sidebar-link-active-color` | Shell dokumentasi DS |
| Komposit teks | `--text-body-medium-regular-size` | Typography foundation & komponen |

---

## 6. Tailwind Implementation

### Config

- **Build:** `tailwind.config.js` — `content` mencakup `index.html`, `components/**`, `foundations/**`
- **Runtime app/library:** kelas Tailwind pada komponen React `src/GposLite/components/*.tsx`
- **Runtime docs:** CDN + inline `theme.extend` mirror config di halaman HTML

### Mapping utama

| Token CSS | Utility contoh |
|---|---|
| `--color-blue-b300` | `bg-blue-b300`, `text-blue-b300` |
| `--color-neutral-n900` | `text-neutral-n900` |
| `--space-200` | `p-200`, `gap-200` |
| `--spacing-4` | `p-4` |
| `--border-radius-md` | `rounded-md` |
| `--shadow-1` | `shadow-1` |
| `--shadow-md` | `shadow-md` |
| Semantic | `bg-surface`, `text-text-primary`, `border-border` |

### Aturan Tailwind

1. Hanya utility yang memetakan token semantic — hindari warna Tailwind default
2. Spacing: prefer `gap-200`, `p-150` (GP Lite) atau `p-4` (rem)
3. Elevation: default `shadow-1` / `--shadow-1`; beberapa komponen memakai `shadow-md`
4. Styling komponen di `<style>` scoped per halaman; Tailwind untuk layout dokumentasi

### Breakpoint (dua sumber)

| Sumber | Nilai |
|---|---|
| `tokens.css` / `tailwind.config.js` `screens` | sm 640, md 768, lg 1024, xl 1280, 2xl 1536 |
| `foundations/grid/grid.html` | SM 320–600, MD 601–1024, LG 1025–1440, XL 1400+; kolom 4/8/12/12; margin 24px; gutter 16px |

---

## 7. Konvensi Penamaan

### Class CSS (komponen)

| Pola | Contoh | Pengecualian |
|---|---|---|
| Block | `ds-btn`, `ds-table`, `ds-flag` | — |
| Element | `ds-btn__label`, `ds-flag__header` | — |
| Modifier | `ds-btn--primary`, `ds-checkbox--error` | State doc: `--hover`, `--focus`, `--press` |
| Modal | `modal-composition-item`, `modal-header-item`, `modal-size-md` | Tanpa prefix `ds-` |
| Popup | `popup-anchor-wrap`, `popup-part-panel` | Tanpa prefix `ds-` |

### File & folder

| Entitas | Konvensi |
|---|---|
| Komponen | `components/{Nama Folder}/{slug}.html` (spasi di nama folder) |
| Foundation | `foundations/{topic}/{topic}.html` |
| Ikon SVG | `assets/icons/icon-{kebab}.svg` |
| Sidebar ikon | `icon-sidebar-{context}-{off\|on}.svg` |

### HTML dokumentasi

- `lang="id"` pada `<html>`
- Path relatif ke styles: `../../styles/globals.css`
- Path ikon: `../../assets/icons/...`

---

## 8. Foundations (7)

| Foundation | Halaman | Token / topik utama |
|------------|---------|---------------------|
| Colors | `foundations/colors/colors.html` | GP Lite palette, semantic color, 57 primitif |
| Typography | `foundations/typography/typography.html` | Poppins, 19 text styles Figma-sync |
| Spacing | `foundations/spacing/spacing.html` | `--space-*` (GP Lite) + `--spacing-*` (rem) |
| Borders | `foundations/borders/borders.html` | Radius, border width |
| Shadows | `foundations/shadows/shadows.html` | `--shadow-1` (default), `--shadow-md` |
| Grid | `foundations/grid/grid.html` | 4/8/12/12 kolom, margin 24px, gutter 16px |
| Icons | `foundations/icons/icons.html` | Katalog 188 SVG · `iconsData.js` |

### Colors

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

### Typography

- **Font:** Poppins only (`--font-primary`)
- **Skala:** `--font-size-xs` (12px) … `--font-size-5xl` (48px)
- **19 text styles** Figma-sync: `--text-overline-medium-*` … `--text-display-medium-*`

### Spacing

- Rem: `--spacing-1` (4px) … `--spacing-24`
- GP Lite: `--space-025` (2px) … `--space-1000` (80px); default dok **Space.200 (16px)**

### Borders

| Figma | CSS | px (doc) |
|---|---|---|
| Corner.0 | `--border-radius-none` | 0 |
| — | `--border-radius-sm` | 4 |
| Corner.100 | `--border-radius-md` | 8 (default input/button) |
| Corner.150 | `--border-radius-lg` | 12 |
| Corner.200 | `--border-radius-xl` | 16 |
| — | `--border-radius-2xl` | 24 |
| Corner.Full | `--border-radius-full` | pill |

**Width:** `--border-width-0|1|2|4`.

### Icons

| Ukuran | CSS | px |
|---|---|---|
| small | `--icon-size-small` | 16 |
| medium | `--icon-size-medium` | 24 |
| large | `--icon-size-large` | 32 |
| xlarge | `--icon-size-xlarge` | 48 |

**Katalog:** 188 SVG di `assets/icons/`; data: `foundations/icons/iconsData.js`.

### Shadow

- **Utama (foundation):** `--shadow-1` / `shadow-1` — card, dropdown, modal, popover
- **Sekunder (implementasi):** `--shadow-md` / `shadow-md` — dipakai di Modal, Dropdown, Section Message, Time Picker, dll.

### Grid & Layout

| Breakpoint (foundation) | Lebar | Kolom |
|---|---|---|
| SM | 320–600px | 4 |
| MD | 601–1024px | 8 |
| LG | 1025–1440px | 12 |
| XL | 1400px+ | 12 |

- Margin: **24px** (`--grid-margin`)
- Gutter: **16px** (`--grid-gutter`)

---

## 9. Motion, Z-Index & Breakpoints

### Motion / transition

| Token | Nilai | Pemakaian umum |
|---|---|---|
| `--transition-fast` | 150ms ease-in-out | Hover button, kontrol ringan |
| `--transition-base` | 200ms ease-in-out | Default interaksi |
| `--transition-slow` | 300ms ease-in-out | Sidebar collapse, panel |
| `--transition-spring` | 400ms cubic-bezier(0.175, 0.885, 0.32, 1.275) | Animasi dengan overshoot ringan |

**Aturan:** gunakan token di atas; hormati `prefers-reduced-motion`.

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

---

## 10. Pola Aksesibilitas

Pola yang **muncul di implementasi** halaman komponen.

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
| `role="menu"` / `menuitem` / `menuitemcheckbox` | Dropdown, Page Header |
| `aria-expanded`, `aria-haspopup`, `aria-controls` | Select, Date Picker, Dropdown, Flags |
| `role="grid"`, `aria-selected`, `aria-disabled` | Calendar, Date Picker |
| `role="tablist"`, `role="tab"`, `role="tabpanel"` | Tabs |
| `role="switch"`, `aria-checked` | Toggle |
| `role="tooltip"`, `aria-label` | Tooltip |

### Focus

- `:focus-visible` + `box-shadow: 0 0 0 2px var(--color-blue-b200)` pada Button, Checkbox, dll.
- Modal: focus trap disebut di dokumentasi halaman
- Ikon: `<img src="assets/icons/...">` — tanpa inline SVG

### WCAG & Motion

| Topik | Ringkasan |
|---|---|
| Kontras | Target AA: 4.5:1 body, 3:1 large text |
| Reduced motion | `@media (prefers-reduced-motion: reduce)` mematikan transisi panjang |
| Skip link | Lompat ke `#main-content` |
| Escape overlay | Menutup Select / Date Picker |
| Touch target | Icon action ≥40px di form row |

---

## 11. App Shell (halaman produk)

Task dashboard / halaman POS = **compose komponen existing**, bukan desain baru.

### Hierarki wajib

```
ds-page-layout.ds-page-layout--website
├── header.ds-topnav.ds-topnav--website     ← full width, DI ATAS body
└── .ds-page-layout__body
    ├── .ds-page-layout__aside (280px)
    │   └── .ds-sidebar-nav-expand          ← putih --color-neutral-n0
    └── .ds-page-layout__main
        ├── .ds-page-layout__content        ← grid 12 kolom
        └── .ds-page-layout__footer
            └── .ds-footer-nav
```

**Template:** `#pl-layout-template` di `components/Page layout/page-layout.html`

### Jangan tertukar

| Konteks | Pakai | Jangan |
|---------|-------|--------|
| Sidebar app | `ds-sidebar-nav-expand` (putih, 280px) | Token `--sidebar-*` (navy doc site) |
| Top bar | `ds-topnav--website` | Topbar generik tanpa variant |
| Banner global | `ds-banner` | Widget KPI/chart yang tidak ada di HTML |

---

## 12. Components Registry (34 komponen)

### Atoms

| Komponen | HTML | Root class |
|----------|------|------------|
| Avatar | `components/Avatar/avatar.html` | `.ds-avatar` |
| Badge | `components/Badge/badge.html` | `.ds-badge` |
| Button | `components/Button/button.html` | `.ds-btn` |
| Checkbox | `components/Checkbox/checkbox.html` | `.ds-checkbox` |
| Lozenge | `components/Lozenge/lozenge.html` | `.ds-lozenge` |
| Radio | `components/Radio/radio.html` | `.ds-radio` |
| Tags | `components/Tags/tags.html` | `.ds-tag` |
| Toggle | `components/Toggle/toggle.html` | `.ds-toggle` |
| Tooltip | `components/Tooltip/tooltip.html` | `.ds-tooltip` |
| Range | `components/Range/range.html` | `.ds-range` |

### Inputs

| Komponen | HTML | Root class |
|----------|------|------------|
| Text Field | `components/Text Field/text field.html` | `.ds-text-field` |
| Text Area | `components/Text Area/text area.html` | `.ds-text-area` |
| Select | `components/Select/select.html` | `.ds-select-trigger` |

### Molecules

| Komponen | HTML | Root class |
|----------|------|------------|
| Dropdown Button | `components/dropdown/dropdown.html` | `.ds-dropdown` |
| Pagination | `components/Pagination/pagination.html` | `.ds-pagination` |
| Tabs | `components/Tabs/tabs.html` | `.ds-tab` |
| Calendar | `components/Calendar/calendar.html` | `.ds-calendar` |
| Date Picker | `components/Date picker/date-picker.html` | `.ds-date-picker` |
| Time Picker | `components/Time picker/time-picker.html` | `.ds-time-picker` |
| Date Time Picker | `components/Date time picker/date time picker.html` | `.ds-date-time-picker` |
| Inline Edit | `components/Inline edit/inline-edit.html` | `.ds-inline-edit` |
| Breadcrumbs | `components/Breadcrumbs/breadcrumbs.html` | `.ds-bc-container` |

### Feedback & Overlays

| Komponen | HTML | Root class |
|----------|------|------------|
| Section Message | `components/section messages/section-message.html` | `.ds-section-message` |
| Toast Banner | `components/Toast-Banner/banner.html` | `.ds-banner` |
| Flags | `components/Flags/flags.html` | `.ds-flag` |
| Modal | `components/Modal/modal.html` | `.modal-composition-item` |
| Popup | `components/Popup/popup.html` | `.popup-anchor-wrap` |
| Tourguide | `components/Tourguide/tourguide.html` | `.ds-tourguide` |

### Data

| Komponen | HTML | Root class |
|----------|------|------------|
| Table | `components/Table/table.html` | `.ds-table` |

### Navigation

| Komponen | HTML | Root class |
|----------|------|------------|
| Navigation Menu | `components/Navigation menu/navigation.html` | `.ds-sidebar-nav-expand` |
| Top & Bottom Nav | `components/Top & bottom Navigation/top-bottom-nav.html` | `.ds-topnav` |

### Layout & Shell

| Komponen | HTML | Root class |
|----------|------|------------|
| Page Header | `components/Page Header/page-header.html` | `.ds-page-header` |
| Form | `components/Form/form.html` | `.ds-form-row` |
| Page Layout | `components/Page layout/page-layout.html` | `.ds-page-layout` |

---

## 13. Component Rules — DO/DON'T

### Global rules

| Aturan | Implementasi |
|--------|--------|
| Runtime | Komponen produk: `src/GposLite/components/{Name}.tsx` + `src/GposLite/styles/{slug}.css` |
| File doc | Satu halaman referensi per komponen: `components/{Name}/{slug}.html` |
| Stylesheet | `../../styles/globals.css` + `enhancements.css`; CSS komponen di `<style>` halaman |
| Class | BEM `ds-{block}`, `ds-{block}__{element}`, `ds-{block}--{modifier}` |
| Token | Hanya `var(--*)` / utility Tailwind yang memetakan token |
| Ikon | `../../assets/icons/icon-*.svg` via `<img>` |
| Tailwind | CDN + inline `tailwind.config` mirror; utility semantic |
| Elevation | Default `--shadow-1` / `shadow-1`. Beberapa komponen memakai `--shadow-md` |
| Bahasa | `lang="id"` |
| State doc | Modifier `--hover`, `--focus`, `--press` untuk matrix; produksi memakai CSS pseudo-class |

### Per-komponen summary

**Avatar:** Size variants `--sm`, `--md`, `--lg`, `--xl`; opsi presence indicator.

**Badge:** Variants `--default`, `--primary`, `--important`, `--subtle`, `--added`, `--removed`.

**Breadcrumbs:** Container `--truncated`; item `--default`, `--hover`, `--focus`, `--press`; `aria-current="page"`.

**Button:** Variants `--primary`, `--subtle`, `--subtle-link`, `--danger`, `--warning`, `--link`, `--icon-only`, `--compact`, `--loading`, `--none`; states `--hover`, `--focus`, `--press`, `--disabled`.

**Calendar:** Day variants `--selected`, `--disabled`, `--today`, `--outside`, `--range`; `role="grid"`, `aria-selected`, `aria-disabled`, `aria-current="date"`.

**Checkbox:** Variants `--error`, `--disabled`, `--snapshot`; states `--checked`, `--indeterminate`, `--hover`, `--pressed`, `--focus`.

**Date Picker:** Struktur `ds-date-picker` + `ds-select-trigger` + `ds-calendar`; `aria-expanded`, `aria-haspopup`, `role="dialog"`.

**Date Time Picker:** Variants `__bar--hover/focus`, `__segment--time/active`, `__dropdown--date/time`; `role="listbox"`, `role="grid"`.

**Dropdown Button:** Item `--selected`, `--hover`, `--pressed`, `--disabled`; menu `--scrollable`; `role="menu"`, `menuitem`, `aria-expanded`.

**Flags:** Variants `--normal`, `--success`, `--error`, `--warning`, `--info`, `--collapsed`; `role="region"`, `aria-expanded`, `aria-controls`.

**Form:** Row `--valid`, `--invalid`; message `--error`, `--information`, `--true`; `role="alert"` pada error.

**Inline Edit:** Variants `--active`, `--typing`, `--confirm`, `--cancel`, `--inline-message`.

**Lozenge:** Variants `--default`, `--bold`, `--new`, `--removed`, `--success`, `--inprogress`, `--moved`.

**Modal:** Sizes `modal-size-xs`, `sm`, `md`, `lg`; appearance `modal-header-icon--warning`, `--danger`; footer `ds-btn`.

**Navigation Menu:** Parts `ds-nav-mainmenu-snap`, `ds-nav-submenu-snap`, `ds-nav-menu-search`; `aria-expanded`, `aria-current`.

**Page Header:** Variants `--actions-on`, `--toolbar-on`, `--subfilters-on`; compose `ds-bc-*`, `ds-btn`, `ds-select-trigger`.

**Page Layout:** Struktur `ds-topnav` + main + `ds-footer-nav`; topnav variants `--website`, `--tablet`, `--mobile`; root `ds-page-layout`.

**Pagination:** Item `--active`, `--ellipsis`; `<nav aria-label="Pagination">`, `aria-current="page"`.

**Popup:** Position `popup-anchor-wrap--left`, `--center`, `--right`; `aria-live="polite"` (playground).

**Radio:** Grup `name` sama; `aria-invalid`; fieldset + legend.

**Range:** Variants `--value-0`, `--value-50`, `--value-100`, `--disabled`, `--interactive`; `aria-valuemin`, `aria-valuemax`, `aria-valuenow`.

**Section Message:** Variants `--information`, `--success`, `--warning`, `--error`, `--discovery`; `role="region"`, `aria-labelledby`.

**Select:** Trigger variants `--subtle`, `--disabled`, `--loading`, `--typing`, `--filled-invalid`; option `--selected`, `--hover`, `--pressed`; `role="listbox"`, `aria-expanded`, `aria-multiselectable`.

**Table:** Variants `--data`, `--row-hover`, `--sticky-head`; sort `--asc`, `--desc`; `aria-sort`, `role="columnheader"`, scroll `role="region"`.

**Tabs:** Variants `--selected`, `--required`, `--notification`; `role="tablist"`, `tab`, `tabpanel`, `aria-selected`.

**Tags:** Variants `--standard`, `--removable`, `--greylight`, `--bluelight`, `--greenlight`, `--purplelight`, `--redlight`, `--yellowlight`; `aria-label` pada remove.

**Text Area:** Variants `--compact`, `--invalid`; states `__field--hover`, `--focus`, `--invalid`, `--disabled`; `aria-invalid`, `aria-describedby`.

**Text Field:** Variants `--compact`, `--subtle`, `--none`, `--invalid`, `--monospaced`, `--disabled`; types `ds-phone-field`, `ds-icon-text-field`, `ds-search-select-field`.

**Time Picker:** Struktur `ds-select-trigger` + listbox options; `aria-expanded`, `aria-controls`, `role="listbox"`.

**Toast Banner:** Variants `--announcement`, `--success`, `--warning`, `--error`; struktur `div.ds-banner` → `__icon` + `__text` (tanpa dismiss); ikon dekoratif `alt=""` + `aria-hidden`.

**Toggle:** Variants `--large`, `--disabled`, `--snapshot`; states `__track--on`, `--hover-on`, `--hover-off`, `--focus`; `role="switch"`, `aria-checked`.

**Tooltip:** Variants `--top`, `--bottom`, `--position-left`, `--position-center`, `--position-right`; `role="tooltip"`, `aria-label`.

**Top & Bottom Navigation:** Topnav `--website`, `--tablet`, `--mobile`; footer nav roles `--banner`, `--contentinfo`; compose `ds-btn`, `ds-badge`, `ds-avatar`.

**Tourguide:** Parts `ds-spotlight-card`, `ds-btn-spotlight`, `ds-btn-onboarding-replay`; `aria-label` pada article; `bg-blue-b300`, `shadow-md`.

---

## 14. Larangan Umum (Anti-patterns)

- Hardcode hex, px spacing, atau radius di luar token
- Ikon dari library eksternal
- Sidebar app dengan tema `--sidebar-*` navy (gunakan `ds-sidebar-nav-expand` putih)
- Shell horizontal sidebar+main tanpa `ds-topnav`
- Logo brand + footer profil user di Navigation Menu (bukan di spec DS)
- Dismiss button di Toast Banner (belum diimplementasi)
- Variant/state baru tanpa ada di HTML referensi
- Rewrite CSS komponen di konteks berbeda (compose, jangan overstyle)
- Nested `ds-page-layout` dalam `ds-page-layout`
- Beberapa banner global sekaligus

---

## 15. Workflow AI

### Implementasi UI (code)

1. Baca `scripts/figma_component_registry.json` → `htmlPath` + `rootClass`
2. Buka `components/{Name}/{slug}.html` — sumber anatomi utama (jangan skip)
3. Read `Docs/components/{slug}.md` + section di `Docs/component-rules.md`
4. `src/GposLite/components/{Name}.tsx` untuk behavior/runtime
5. Token dari `styles/tokens.css` / `tailwind.config.js`

### Screen / dashboard composition

1. `components/Page layout/page-layout.html` — shell template
2. `components/Navigation menu/navigation.html` — sidebar nav
3. `components/Top & bottom Navigation/top-bottom-nav.html` — top nav
4. Child components dari registry (Page Header, Table, Section Message, dll.)
5. Compose existing, jangan desain shell baru

### Token quick reference

**Semantic colors:** `--color-neutral-n0`–`n900` · `--color-blue-b50`–`b500` · `--color-red-r*` · `--color-green-g*` · `--color-orange-o*` · `--color-text-primary` · `--color-border` · `--color-surface` · `--color-background`

**Spacing:** `--space-025`(2px) · `--space-050`(4px) · `--space-075`(6px) · `--space-100`(8px) · `--space-150`(12px) · `--space-200`(16px) · `--space-250`(20px) · `--space-300`(24px)

**Typography:** body-sm · body-md · body-lg · caption · overline · title

---

## 16. Prinsip Visual (ringkas)

- **Estetika:** premium SaaS dashboard — hierarki bersih, whitespace lapang, kepadatan terkontrol
- **Surface:** halaman `--color-background` (#F8FAFC) · konten `--color-surface` (#FFFFFF)
- **Aksi utama:** GPOS Blue `b300` — bukan orange/green sebagai primary CTA
- **Radius default:** `--border-radius-md` (8px) untuk button & form
- **Shadow default:** `--shadow-1` — hindari shadow berat custom
- **Akurasi > kreativitas:** reuse komponen & token existing; jangan improvisasi variant baru

---

## 17. Referensi Cepat

| Kebutuhan | File |
|-----------|------|
| Buka DS di browser | `index.html` |
| Tailwind mapping | `tailwind.config.js` |
| Style guide visual | `style_guide.md` |
| Aturan AI | `CLAUDE.md` |
| Manifest Figma | `.claude/figma-library-manifest.json` |
| Anatomy reference (opsional) | `.claude/references/` |

---

## 18. Assets

### `assets/icons/`

188 SVG; path relatif `../../assets/icons/...` dari halaman komponen.

### `assets/images/`

| File | Penggunaan |
|---|---|
| `avatar.svg` | Avatar |
| `logo-parts.svg` | Top/bottom navigation, page layout |
| `Divider.svg` | Dekorasi |
| `range=default.svg`, `range =hover.svg`, `range =press.svg` | Range slider states |

---

## 19. Styles & JavaScript

| File | Peran |
|---|---|
| `styles/tokens.css` | Semua design token CSS |
| `styles/globals.css` | Reset, typography base, `.container`, navigation doc |
| `styles/enhancements.css` | Utilitas halaman dokumentasi saja |
| `tailwind.config.js` | Build Tailwind |
| `foundations/icons/iconsData.js` | Katalog ikon |
| Inline `<script>` | Sidebar, copy code, playground per halaman |

**Catatan:** Class `ds-*` komponen ada di `<style>` per file HTML, **bukan** di `globals.css`.

---

## 20. Responsive — Decision Matrix

| Konteks | Pakai |
|---|---|
| Utility class `sm:` / `md:` / … | Tailwind screens (`tailwind.config.js`) |
| Margin halaman, kolom layout mockup | Grid foundation (`foundations/grid/grid.html`) |
| Shell app (topnav/footer) | `ds-topnav--website` / `--tablet` / `--mobile` |

**Contoh implementasi:**

| Komponen | Perilaku responsif |
|---|---|
| **Table** | `.ds-table-scroll` horizontal scroll; `min-width: 36rem` pada `--data` |
| **Form** | ≤640px: label/field stack (`form-parts-stack__row` 1 kolom); `ds-form-row` full width |
| **Page Layout** | Satu varian topnav per breakpoint — lihat `page-layout.html` |

---

*Terakhir diselaraskan dengan: 7 foundations · 34 components · `Docs/` · `scripts/figma_component_registry.json`*
