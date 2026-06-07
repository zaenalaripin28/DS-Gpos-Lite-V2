# Design Tokens — GPOS Lite DS V2

> **Source of truth:** `styles/tokens.css` · Snapshot JSON: `styles/gp-lite-design-tokens.json`  
> **Tailwind mapping:** `tailwind.config.js`  
> **Foundation pages:** `foundations/{topic}/{topic}.html`

---

## Aturan

1. **Jangan buat token baru** — gunakan variable yang sudah ada di `tokens.css`.
2. **Jangan hardcode** hex, px spacing, radius, shadow, atau z-index.
3. Pemakaian: `var(--token)` di CSS scoped **atau** utility Tailwind semantic (`bg-blue-b300`, `gap-200`).
4. Hindari warna Tailwind default (`bg-blue-500`) — bukan skala GP Lite.

---

## Katalog token (`styles/tokens.css`)

| Kategori | Prefix / nama | Baris (approx.) |
|----------|---------------|-----------------|
| Primary & utilitas | `--color-primary-*` … `--color-gray-*` | 13–95 |
| GP Lite palette | `--color-blue-b*`, `orange-o*`, `red-r*`, `green-g*`, `purple-p*`, `neutral-n*` | 97–165 |
| Semantic color | `--color-background`, `--color-text-*`, `--color-border*` | 167–181 |
| Sidebar (doc site) | `--sidebar-*` | 183–200 |
| Topbar (doc site) | `--topbar-*`, `--topbar-height: 56px` | 202–207 |
| Typography base | `--font-*`, `--font-size-*`, `--font-weight-*`, `--line-height-*`, `--letter-spacing-*` | 209–245 |
| Figma text styles | `--text-{category}-{variant}-{size\|weight\|lh\|ls\|transform}` | 247–339 |
| Spacing rem | `--spacing-0` … `--spacing-24` | 341–356 |
| GP Lite space | `--space-0` … `--space-1000` | 358–372 |
| Border radius | `--border-radius-*` | 374–384 |
| Border width | `--border-width-*` | 386–392 |
| Shadow | `--shadow-1` (default), `--shadow-md` (sekunder), legacy `--shadow-xs` … | 394–414 |
| Z-index | `--z-hide` … `--z-tooltip` | 416–428 |
| Transition | `--transition-fast\|base\|slow\|spring` | 430–436 |
| Breakpoint CSS | `--breakpoint-xs` … `--breakpoint-2xl` | 438–446 |
| Layout | `--sidebar-width: 270px` | 448–451 |

Detail per kategori: [colors.md](./colors.md) · [spacing.md](./spacing.md) · [typography.md](./typography.md)

---

## Cara dipakai

### 1. CSS komponen (scoped `<style>`)

```css
.ds-btn--primary {
  background: var(--color-blue-b300);
  padding: var(--space-150) var(--space-200);
  border-radius: var(--border-radius-md);
  box-shadow: var(--shadow-1);
  transition: background-color var(--transition-fast);
}
```

### 2. Tailwind utility (build atau CDN inline config)

| Token CSS | Utility contoh |
|-----------|----------------|
| `--color-blue-b300` | `bg-blue-b300`, `text-blue-b300` |
| `--color-neutral-n900` | `text-neutral-n900`, `bg-neutral-n20` |
| `--space-200` | `p-200`, `gap-200`, `m-200` |
| `--spacing-4` | `p-4`, `gap-4` |
| `--border-radius-md` | `rounded-md` |
| `--shadow-1` | `shadow-1` |
| `--shadow-md` | `shadow-md` |
| Semantic | `bg-surface`, `text-text-primary`, `border-border` |
| Text styles | `text-body-md`, `text-sm`, `leading-body-sm` |

### 3. Semantic vs primitif

| Tipe | Contoh | Kapan |
|------|--------|-------|
| Primitif GP Lite | `--color-blue-b300` | Brand, hover/press, komponen |
| Primitif utilitas | `--color-primary-500` | Alias brand, skala 50–900 |
| Semantic | `--color-text-secondary` | Body copy, label sekunder |
| Chrome doc site | `--sidebar-link-active-color` | Shell dokumentasi DS saja |
| Komposit teks | `--text-body-medium-regular-size` | Typography foundation & komponen |

---

## Elevation

| Token | Peran |
|-------|-------|
| `--shadow-1` | **Default DS** — card, dropdown, modal, button elevation |
| `--shadow-md` | **Sekunder** — Modal, Dropdown, Section Message, Time Picker, Text Field focus, Tourguide, Page Header/Layout shell, Table focus ring |

**Larangan:** custom shadow di luar token `tokens.css`.

Base rgba bayangan: `#091E42` (`--color-neutral-n900`).

---

## Z-index stack

| Token | Nilai | Lapisan |
|-------|-------|---------|
| `--z-hide` | -1 | Sembunyikan dari stack |
| `--z-base` | 0 | Konten default |
| `--z-dropdown` | 1000 | Menu, select listbox |
| `--z-sticky` | 1020 | Header sticky |
| `--z-fixed` | 1030 | Sidebar doc shell |
| `--z-modal-backdrop` | 1040 | Overlay backdrop |
| `--z-modal` | 1050 | Dialog/modal |
| `--z-popover` | 1060 | Popover, popup panel |
| `--z-tooltip` | 1070 | Tooltip (paling atas) |

---

## Motion / transition

| Token | Nilai |
|-------|-------|
| `--transition-fast` | 150ms ease-in-out |
| `--transition-base` | 200ms ease-in-out |
| `--transition-slow` | 300ms ease-in-out |
| `--transition-spring` | 400ms cubic-bezier(0.175, 0.885, 0.32, 1.275) |

Hormati `prefers-reduced-motion` — lihat [accessibility.md](./accessibility.md).

---

## Breakpoints (dua sistem)

| Sumber | Nilai | Pakai untuk |
|--------|-------|-------------|
| `tokens.css` / Tailwind `screens` | 640 / 768 / 1024 / 1280 / 1536 | Utility `sm:` / `md:` / … |
| `foundations/grid/grid.html` | SM 320–600, MD 601–1024, LG 1025–1440, XL 1400+ | Layout mockup, margin/gutter |

Grid foundation: margin **24px**, gutter **16px**, kolom **4/8/12/12**.

---

## Border radius & width

| Token | px | Pemakaian umum |
|-------|-----|----------------|
| `--border-radius-none` | 0 | Tabel, divider |
| `--border-radius-sm` | 4 | Checkbox, radio |
| `--border-radius-md` | 8 | **Default button & form** |
| `--border-radius-lg` | 12 | Card, dropdown |
| `--border-radius-xl` | 16 | Dropdown panel |
| `--border-radius-2xl` | 24 | Modal |
| `--border-radius-full` | pill | Avatar, toggle track |

Width: `--border-width-0|1|2|4`

---

## Icon size (scope foundation)

Didefinisikan di `foundations/icons/icons.html`, **bukan** di `tokens.css`:

| Token | px |
|-------|-----|
| `--icon-size-small` | 16 |
| `--icon-size-medium` | 24 |
| `--icon-size-large` | 32 |
| `--icon-size-xlarge` | 48 |

Default komponen: **medium (24px)**.

---

## Token di luar `tokens.css`

| Token | Lokasi | Catatan |
|-------|--------|---------|
| `--grid-columns-sm\|md\|lg\|xl` | `foundations/grid/grid.html` | Grid layout halaman |
| `--grid-margin`, `--grid-gutter` | `foundations/grid/grid.html` | 24px / 16px |
| `--grid-bp-*` | `foundations/grid/grid.html` | Breakpoint foundation |

---

## Figma ↔ CSS mapping

| Figma | CSS |
|-------|-----|
| `Text.{Category}.{Variant}` | `--text-{category}-{variant}-{property}` |
| `Corner.*` | `--border-radius-*` |
| `Space.*` | `--space-{025\|050\|…}` |
| `Shadow 1` | `--shadow-1` |
| GP Lite color steps | `--color-{family}-{step}` |

---

## TODO

- [ ] Foundation HTML terpisah untuk motion, z-index, breakpoints (saat ini hanya token + docs)
- [ ] Dokumentasi `--border-radius-3xl` (32px) — ada di tokens.css, penggunaan komponen belum terkatalog penuh
- [ ] Max content / prose width — belum distandarkan di token

---

## Referensi

| File | Path |
|------|------|
| Token CSS | `styles/tokens.css` |
| JSON snapshot | `styles/gp-lite-design-tokens.json` |
| Tailwind | `tailwind.config.js` |
| Katalog lengkap | `Docs/design-system-knowledge.md` |
