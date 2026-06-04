# GPOS Lite — Engineer Skill

> Panduan implementasi untuk engineer, **Claude Code**, dan **Cursor**.  
> **Source of truth:** kode di repositori — bukan interpretasi desain baru.

**Dokumen terkait:** `CLAUDE.md` (aturan wajib) · `Docs/design-system-knowledge.md` (katalog) · `Docs/component-rules.md` (per komponen) · `Docs/design-principles.md` (prinsip visual)

---

## Peran dokumen ini

Gunakan file ini sebagai **checklist kerja** saat menulis atau mengubah HTML/CSS di DS-Gpos-Lite-V2. Jika ada konflik, urutan otoritas:

1. Implementasi di file yang diminta (`components/*/*.html`, `foundations/*/*.html`)
2. `styles/tokens.css` + `tailwind.config.js`
3. `Docs/component-rules.md` untuk komponen spesifik
4. `Docs/design-system-knowledge.md` untuk token & pola global
5. `foundations/*`, `components/*/*.html`, `components/*/figma/` untuk proporsi — `.claude/references/` **kosong saat ini**; bila anatomy ditambahkan, naikkan prioritas di atas visual reference

---

## Larangan mutlak

Jangan pernah (kecuali user secara eksplisit meminta perubahan token/config):

| Larangan | Ganti dengan |
|---|---|
| Token baru | Variable yang sudah ada di `styles/tokens.css` |
| Komponen / variant / state baru | Class & modifier di halaman komponen yang ada |
| Warna/spacing/radius/shadow/z-index hardcoded | `var(--…)` atau utility Tailwind semantic |
| Warna Tailwind default (`bg-blue-500`, dll.) | `bg-blue-b300`, `bg-primary-500`, `text-neutral-n900`, … |
| React, Vue, Mantine, Bootstrap, UI library eksternal | HTML statis + Tailwind + CSS scoped |
| Ikon library eksternal | `assets/icons/icon-*.svg` via `<img>` |
| Redesign, refactor luas, DOM/wrapper berlebihan | Perubahan minimal pada file yang diminta |
| Contoh/placeholder yang tidak ada di repo | Salin markup dari halaman doc komponen |

---

## Stack & file layout

```
styles/tokens.css          → semua design token (:root)
styles/globals.css         → reset, typography base, .sidebar, .topbar (bukan ds-* komponen)
styles/enhancements.css    → utilitas halaman dokumentasi saja
tailwind.config.js         → mapping token → Tailwind (build)
index.html                 → home DS
foundations/{topic}/*.html → token & pedoman foundation
components/{Name}/*.html   → implementasi + <style> komponen + Tailwind CDN
assets/icons/              → 188 SVG
```

**Halaman komponen/foundation standar:**

```html
<!DOCTYPE html>
<html lang="id">
<head>
  <link rel="stylesheet" href="../../styles/globals.css">
  <link rel="stylesheet" href="../../styles/enhancements.css">
  <script src="https://cdn.tailwindcss.com"></script>
  <script>/* tailwind.config = { theme: { extend: { … mirror tailwind.config.js } } } */</script>
  <style>/* CSS komponen: .ds-* { … var(--token) … } */</style>
</head>
```

- CSS komponen **`ds-*` ada di `<style>` per halaman**, bukan di `globals.css`.
- **Brand:** `#1E7FD6` → `--color-blue-b300` / `--color-primary-500`.

---

## Foundations — cara pakai

| Foundation | File | Token / aturan implementasi |
|---|---|---|
| Colors | `foundations/colors/colors.html` | GP Lite (`blue-b*`, `neutral-n*`, …) + semantic (`--color-text-primary`, `--color-background`, `--color-border`). UI pakai semantic/primitif, **bukan hex langsung**. |
| Typography | `foundations/typography/typography.html` | Hanya **Poppins**. Body utama: **Body / Medium / Regular** (16px/24px). Metadata: Caption. Judul: Header/Display. Variabel: `--text-body-medium-regular-*`, `--font-size-*`. |
| Spacing | `foundations/spacing/spacing.html` | GP Lite `--space-*` (default **200 = 16px**) + `--spacing-*` rem. Micro (2–6px) untuk outline/gap ikon; base 16–24px untuk form/card. |
| Borders | `foundations/borders/borders.html` | Default control: **`--border-radius-md` (8px)**. Checkbox/radio: `sm`. Card/dropdown: `lg`/`xl`. Modal: `2xl`. Pill/avatar/toggle: `full`. |
| Shadows | `foundations/shadows/shadows.html` | Default **`--shadow-1`** (`shadow-1`). **`--shadow-md`** (`shadow-md`) dipakai di beberapa komponen — ikuti halaman target; tidak custom shadow. |
| Icons | `foundations/icons/icons.html`, `iconsData.js` | Ukuran: 16/24/32/48px (`--icon-size-*` di halaman icons). Default **medium 24px**. Path: `icon-{kebab}.svg`. |
| Grid | `foundations/grid/grid.html` | Kolom 4/8/12/12; margin **24px**; gutter **16px**. Breakpoint foundation (320/601/1025/1400) ≠ Tailwind screens (640/768/…) — pakai sesuai konteks doc. |

**Prioritas token** (`CLAUDE.md`): token system → anatomy spec (`.claude/references/` bila terisi) → `foundations/*` + halaman komponen → struktur existing.

---

## Komponen — cara pakai

### Sebelum coding

1. Buka **`Docs/component-rules.md`** → bagian komponen target.
2. Buka **`components/{Name}/*.html`** → salin struktur HTML + class dari contoh/playground.
3. Jangan menambah modifier di luar yang didefinisikan di `<style>` halaman itu.

### Pola global (`Docs/component-rules.md`)

| Pola | Detail |
|---|---|
| Naming | `ds-{block}`, `ds-{block}__{element}`, `ds-{block}--{modifier}` |
| Pengecualian | Modal: `modal-*`, `modal-size-{xs\|sm\|md\|lg}` · Popup: `popup-*` |
| State doc | `--hover`, `--focus`, `--press` untuk matrix; produksi: `:hover`, `:focus-visible`, `:active` |
| Compose | Date/Time picker → `ds-select-trigger` + calendar/listbox · Page layout → `ds-topnav` + child components · Form → `ds-form-row` + field components |

### 34 komponen (root class)

| Komponen | Root / catatan |
|---|---|
| Avatar | `ds-avatar` + `--sm\|md\|lg\|xl` |
| Badge | `ds-badge` |
| Breadcrumbs | `ds-bc-container` |
| Button | `ds-btn` + `--primary\|subtle\|danger\|…` |
| Calendar | `ds-calendar` + `ds-calendar-day` |
| Checkbox / Radio / Toggle | `ds-checkbox` / `ds-radio` / `ds-toggle` + native `<input>` |
| Date Picker | `ds-date-picker` + `ds-select-trigger` + `ds-calendar` |
| Date Time Picker | `ds-date-time-picker` |
| Dropdown | `ds-dropdown` + `role="menu"` |
| Flags | `ds-flag` + `--collapsed` |
| Form | `ds-form-row`, `ds-form-message` |
| Inline Edit | `ds-inline-edit` |
| Lozenge | `ds-lozenge` |
| Modal | `modal-composition-item` + footer `ds-btn` |
| Navigation Menu | `ds-sidebar-nav-expand` |
| Page Header | `ds-page-header` |
| Page Layout | `ds-page-layout` + `--website\|tablet\|mobile` |
| Pagination | `nav.ds-pagination` |
| Popup | `popup-anchor-wrap` |
| Range | `ds-range` + `assets/images/range=*.svg` |
| Section Message | `ds-section-message` |
| Select | `ds-select-trigger`, `ds-option` |
| Table | `ds-table` + `ds-table-scroll` |
| Tabs | `ds-tablist` / `ds-tab` |
| Tags | `ds-tag` |
| Text Area / Text Field | `ds-text-area` / `ds-text-field` (+ phone, icon, search variants) |
| Time Picker | `ds-time-picker` |
| Toast Banner | `ds-banner` (`components/Toast-Banner/banner.html`) |
| Tooltip | `ds-tooltip` |
| Top & Bottom Nav | `ds-topnav`, `ds-footer-nav` |
| Tourguide | `ds-tourguide`, `ds-spotlight-card` |

### Aturan CTA & form (ringkas dari component-rules)

- **Satu** `ds-btn--primary` per area CTA; danger hanya destruktif.
- Icon-only button: wajib `aria-label`.
- Error: `ds-form-row--invalid` + `ds-form-message--error` + `role="alert"`.
- Section message in-page ≠ toast banner global.

---

## Tailwind — pola implementasi

### Config

- Build: `tailwind.config.js`
- Runtime halaman HTML: duplikasi `theme.extend` setelah CDN Tailwind

### Utility yang dipakai di repo

| Kebutuhan | Utility contoh |
|---|---|
| Brand | `bg-blue-b300`, `text-blue-b300`, `bg-primary-500` |
| Neutral | `text-neutral-n900`, `bg-neutral-n20`, `border-neutral-n40` |
| Semantic | `bg-surface`, `text-text-primary`, `border-border` |
| Spacing GP Lite | `p-200`, `gap-150`, `m-100` |
| Spacing rem | `p-4`, `gap-4` |
| Radius | `rounded-md`, `rounded-lg`, `rounded-xl`, `rounded-full` |
| Shadow | `shadow-1` (default), `shadow-md` (sesuai halaman komponen) |
| Type | `text-sm`, `text-body-md`, `font-medium`, `leading-body-sm` |

### Pembagian tanggung jawab

| Lapisan | Gunakan untuk |
|---|---|
| `<style>` scoped | Semua styling `ds-*` / `modal-*` / `popup-*` (warna state, layout komponen) |
| Tailwind utility | Layout doc (`flex`, `gap-200`), hero shell (`bg-neutral-n900`, `rounded-2xl`) |
| `var(--*)` dalam CSS | Semua nilai warna, spacing, radius, shadow komponen |

**Jangan** mencampur `bg-blue-500` (Tailwind default) dengan skala GP Lite.

---

## Accessibility — pola implementasi

### Dokumen & halaman

```html
<html lang="id">
```

### Form controls — native first

```html
<label class="ds-checkbox">
  <input type="checkbox" class="ds-checkbox__input" />
  <span class="ds-checkbox__box" aria-hidden="true">…</span>
  <span class="ds-checkbox__label">Label</span>
</label>
```

- Text field/area: `aria-invalid`, `aria-describedby` ke id pesan error.
- Toggle: `role="switch"`, `aria-checked="true|false"`.
- Range: `aria-valuemin`, `aria-valuemax`, `aria-valuenow`, `aria-label`.

### Custom widgets — role yang sudah dipakai

| UI | Roles / attributes |
|---|---|
| Select, Time picker | `listbox`, `option`, `aria-expanded`, `aria-controls`, `aria-busy` |
| Dropdown | `menu`, `menuitem`, `aria-expanded`, `aria-haspopup="menu"` |
| Tabs | `tablist`, `tab`, `tabpanel`, `aria-selected` |
| Calendar | `grid`, `aria-selected`, `aria-disabled`, `aria-current="date"` |
| Date picker | `aria-haspopup="dialog"`, `role="dialog"` |
| Flags, Section message | `role="region"`, `aria-labelledby` / `aria-expanded` |
| Breadcrumbs, Pagination | `aria-current="page"` |
| Table | `aria-sort`, `columnheader`, scroll `role="region"` `tabindex="0"` |
| Button loading | `aria-busy` |
| Tooltip | `role="tooltip"` |

### Focus

```css
:focus-visible {
  outline: none;
  box-shadow: 0 0 0 2px var(--color-blue-b200);
}
```

(Gunakan token focus yang sama dengan variant di halaman komponen — lihat `button.html`.)

### Ikon

```html
<img src="../../assets/icons/icon-x-mark.svg" alt="" aria-hidden="true" />
<!-- atau alt deskriptif / aria-label pada parent button -->
```

---

## HTML structure — pola implementasi

### BEM komponen

```html
<button type="button" class="ds-btn ds-btn--primary">
  <span class="ds-btn__label">Simpan</span>
</button>
```

### Landmark layout aplikasi

```html
<header class="ds-topnav ds-topnav--website" role="banner" aria-label="…">…</header>
<main>…</main>
<footer class="ds-footer-nav" role="contentinfo">…</footer>
```

### Navigasi

```html
<nav class="ds-bc-container" aria-label="Breadcrumb">…</nav>
<nav class="ds-pagination" aria-label="Pagination">…</nav>
```

### Pesan & alert

```html
<article class="ds-section-message ds-section-message--warning" role="region" aria-labelledby="judul-id">
  <h3 id="judul-id" class="ds-section-message__title">…</h3>
</article>

<p class="ds-form-message ds-form-message--error" role="alert">…</p>
```

### Modal (bukan `ds-*` root)

```html
<article class="modal-composition-item modal-size-md">
  <div class="modal-composition-body">…</div>
  <div class="modal-footer-container">
    <button class="ds-btn ds-btn--subtle">Batal</button>
    <button class="ds-btn ds-btn--primary">Konfirmasi</button>
  </div>
</article>
```

### Compose, jangan reimplement

| Butuh | Reuse |
|---|---|
| Pilih tanggal | `ds-select-trigger` + `ds-calendar` |
| Pilih waktu | `ds-select-trigger` + `ds-time-picker__menu` |
| Halaman app | `ds-page-layout` + `ds-page-header` + `ds-table` |
| Menu aksi | `ds-dropdown` atau `ds-btn` + `role="menu"` |

---

## Konsistensi implementasi — checklist

Sebelum PR / selesai task, verifikasi:

- [ ] Hanya file yang diminta yang diubah (`CLAUDE.md` scope)
- [ ] Class modifier **sudah ada** di halaman komponen target
- [ ] Semua warna/spacing/radius/shadow dari **token** (`var(--*)` atau utility mapped)
- [ ] Ikon dari `assets/icons/`, ukuran sesuai foundation
- [ ] `lang="id"` pada halaman HTML baru
- [ ] Form: native input + label; error dengan `role="alert"` bila applicable
- [ ] Interactive custom control: `aria-expanded` / roles sesuai tabel a11y di atas
- [ ] Focus visible dengan ring token (`blue-b200` / `primary-500`)
- [ ] Elevation dari token `--shadow-1` atau `--shadow-md` sesuai halaman komponen referensi (bukan custom shadow)
- [ ] Tidak ada dependency UI framework baru
- [ ] Contoh kode di doc = markup aktual di halaman (bukan placeholder)

---

## Workflow AI (Claude Code / Cursor)

1. **Baca** `CLAUDE.md` + bagian relevan di `Docs/component-rules.md`.
2. **Buka** file HTML komponen yang menjadi referensi; salin struktur class.
3. **Cek** `styles/tokens.css` jika perlu nama variable pasti.
4. **Edit minimal** — diff kecil, jangan rewrite file panjang tanpa permintaan.
5. **Jangan** usulkan token/komponen/variant baru; jika tidak ada di repo, laporkan ke user.
6. **Output** prefer diff; hanya potongan yang berubah.

---

## Referensi cepat

| Kebutuhan | Buka |
|---|---|
| Token lengkap | `styles/tokens.css`, `Docs/design-system-knowledge.md` |
| Aturan per komponen | `Docs/component-rules.md` |
| Prinsip visual | `Docs/design-principles.md` |
| Pedoman agent | `CLAUDE.md` |
| Index navigasi | `index.html` |
