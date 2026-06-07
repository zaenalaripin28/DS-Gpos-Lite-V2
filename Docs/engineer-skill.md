# GPOS Lite — Engineer Skill

> Panduan implementasi untuk engineer, **Claude Code**, dan **Cursor**.  
> **Source of truth:** kode di repositori — bukan interpretasi desain baru.

> **AI modular docs:** [`Docs/ai/skill.md`](./ai/skill.md) — entry point terpisah per topik ([tokens](./ai/tokens.md), [colors](./ai/colors.md), [spacing](./ai/spacing.md), [typography](./ai/typography.md), [components](./ai/components.md), [patterns](./ai/patterns.md), [anti-patterns](./ai/anti-patterns.md), [accessibility](./ai/accessibility.md)).

**Dokumen terkait:** `CLAUDE.md` (aturan wajib) · `Docs/design-system-knowledge.md` (katalog) · `Docs/component-rules.md` (per komponen) · `Docs/design-principles.md` (prinsip visual)

---

## Peran dokumen ini

Gunakan file ini sebagai **checklist kerja** saat menulis atau mengubah komponen di DS-Gpos-Lite-V2 (runtime React + visual reference HTML). Jika ada konflik, urutan otoritas:

1. Runtime behavior/logika komponen di `src/GposLite/components/*.tsx`
2. `styles/tokens.css` + `tailwind.config.js`
3. `Docs/component-rules.md` untuk komponen spesifik
4. `Docs/design-system-knowledge.md` untuk token & pola global
5. Visual/anatomy fidelity di `foundations/*`, `components/*/*.html`, `components/*/figma/`, dan `.claude/references/`

---

## Larangan mutlak

Jangan pernah (kecuali user secara eksplisit meminta perubahan token/config):

| Larangan | Ganti dengan |
|---|---|
| Token baru | Variable yang sudah ada di `styles/tokens.css` |
| Komponen / variant / state baru | Class & modifier di halaman komponen yang ada |
| Warna/spacing/radius/shadow/z-index hardcoded | `var(--…)` atau utility Tailwind semantic |
| Warna Tailwind default (`bg-blue-500`, dll.) | `bg-blue-b300`, `bg-primary-500`, `text-neutral-n900`, … |
| Vue, Mantine, Bootstrap, UI library eksternal | Stack existing: React (`src/GposLite`) + HTML reference + Tailwind |
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
src/GposLite/components/   → 34 komponen runtime React (TSX)
src/GposLite/styles/       → style runtime komponen React
index.html                 → home DS
foundations/{topic}/*.html → token & pedoman foundation
components/{Name}/*.html   → visual/anatomy reference + <style> komponen + Tailwind CDN
assets/icons/              → 188 SVG
```

### Stack scope — React, HTML, Storybook

| Layer | Path | Status |
|---|---|---|
| **Runtime (canonical)** | `src/GposLite/components/*.tsx` | 34 komponen React — dipakai FE produk |
| **Visual reference** | `components/*/*.html` | Dokumentasi + anatomy fidelity |
| **Storybook / MDX** | `src/stories/`, `.storybook/`, `foundations/*.mdx` | **Tidak aktif** di repo saat ini — jangan jadikan sumber implementasi |

README menyatakan dokumentasi via HTML statis; hybrid stack = React runtime + HTML reference. Jangan buat Storybook baru kecuali diminta eksplisit.

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
2. Buka **`src/GposLite/components/{Name}.tsx`** → source utama behavior/runtime.
3. Buka **`components/{Name}/*.html`** → source visual/anatomy class & state matrix.
4. Jangan menambah modifier di luar yang didefinisikan pada source existing.

### Pola global (`Docs/component-rules.md`)

| Pola | Detail |
|---|---|
| Naming | `ds-{block}`, `ds-{block}__{element}`, `ds-{block}--{modifier}` |
| Pengecualian | Modal: `modal-*`, `modal-size-{xs\|sm\|md\|lg}` · Popup: `popup-*` |
| State doc | `--hover`, `--focus`, `--press` untuk matrix; produksi: `:hover`, `:focus-visible`, `:active` |
| Compose | Date/Time picker → `ds-select-trigger` + calendar/listbox · Page layout → `ds-topnav` + child components · Form → `ds-form-row` + field components |

### Registry komponen

**Jangan duplikasi daftar 34 komponen di sini.** Gunakan:

| Kebutuhan | Buka |
|---|---|
| Registry + link AI doc | `Docs/components-index.md` |
| Tabel file + root class | `Docs/design-system-knowledge.md` → Components |
| DO/DON'T per komponen | `Docs/component-rules.md` |
| Runtime TSX | `src/GposLite/components/{Name}.tsx` |

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

### Appendix — WCAG, motion, keyboard (P2)

Pola berikut **sudah muncul di implementasi**; gunakan saat menambah halaman/komponen baru.

#### Kontras (target WCAG 2.1 AA)

| Konteks | Target | Referensi repo |
|---|---|---|
| Body copy / label | **4.5:1** minimum | `foundations/colors/colors.html`, badge WCAG di `button.html` / `form.html` |
| Teks besar (≥18px regular / ≥14px bold) | **3:1** minimum | Typography foundation |
| Fokus / state interaktif | Ring terlihat (`blue-b200` / `primary-500`) | Button, Table scroll, Checkbox |

Gunakan pasangan token semantic (`--color-text-primary` on `--color-surface`) — hindari hex ad hoc.

#### Reduced motion

Banyak halaman memakai:

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    transition-duration: 0.01ms !important;
    animation-duration: 0.01ms !important;
  }
}
```

**Contoh:** `index.html`, `button.html`, `table.html`, `avatar.html`, foundations. Terapkan pola yang sama pada komponen baru yang punya transisi/animasi.

#### Skip link

Halaman dengan konten panjang / tabel data boleh menyertakan skip link ke `#main-content`:

```html
<a href="#main-content" class="skip-link">Lewati ke konten utama</a>
```

**Referensi:** `components/Table/table.html` (`.skip-link` — visible on `:focus`).

#### Keyboard — Escape menutup overlay

| Komponen | Perilaku | File |
|---|---|---|
| Select | `Escape` menutup listbox | `components/Select/select.html` |
| Date Picker | `Escape` menutup panel kalender | `components/Date picker/date-picker.html` |
| Date Time Picker | `Escape` menutup dropdown date/time | `components/Date time picker/date time picker.html` |

Overlay baru (dropdown, popover, dialog) sebaiknya mengikuti kontrak yang sama.

#### Live regions

| Pola | Pemakaian |
|---|---|
| `role="alert"` | Pesan error form (`ds-form-message--error`) |
| `aria-live="polite"` | Loading Select, Popup playground |
| Teks banner/toast | Makna dari copy — **tanpa** dismiss button di `banner.html` saat ini |

#### Modal & overlay (status implementasi)

- Modal doc menyebut focus trap (script inline) — belum distandarkan `aria-modal` / `aria-labelledby` di seluruh contoh.
- Saat memperluas Modal/Popup: tambahkan `aria-modal="true"`, label/deskripsi via `aria-labelledby` / `aria-describedby`, dan trap fokus konsisten dengan halaman referensi.

#### Touch target (guidance)

- Action button default memakai padding ~12–16px (`--space-150` / `--space-200`).
- Icon-only button: pertahankan hit area ≥ **40px** (lihat `ds-form-row__action-btn` 40×40 di `form.html`).
- `--compact` / `--icon-only`: jangan kurangi di bawah area sentuh nyaman tanpa alasan layout.

---

## Responsive — decision matrix (P2)

Repo punya **dua sistem breakpoint**. Pilih sesuai konteks:

| Konteks kerja | Gunakan | Nilai |
|---|---|---|
| Utility Tailwind di markup (`sm:`, `md:`, …) | `tailwind.config.js` / `tokens.css` `--breakpoint-*` | 640 / 768 / 1024 / 1280 / 1536 |
| Layout halaman / mockup grid | `foundations/grid/grid.html` | SM 320–600, MD 601–1024, LG 1025–1440, XL 1400+; margin 24px; gutter 16px |
| Shell aplikasi | Varian komponen Page Layout / Topnav | `ds-topnav--website` / `--tablet` / `--mobile` |

**Aturan:** satu varian topnav per viewport — jangan campur `--website` dan `--mobile` dalam satu layout.

### Contoh — Table (`components/Table/table.html`)

| Lebar | Perilaku |
|---|---|
| Semua | Tabel data dalam `.ds-table-scroll` — `overflow-x: auto`, `-webkit-overflow-scrolling: touch` |
| Semua | `.ds-table--data` `min-width: 36rem` — scroll horizontal bila kolom tidak muat |
| Semua | Scroll region fokus keyboard: `tabindex="0"` + ring `blue-b200` pada `:focus-visible` |
| Doc shell | Skip link ke `#main-content` untuk lompatan keyboard |

**Jangan** memaksa kolom menyusut di bawah min-width — pertahankan scroll horizontal.

### Contoh — Form (`components/Form/form.html`)

| Lebar | Perilaku |
|---|---|
| Desktop | `.ds-form-row` max-width 540px; label di atas field (stack vertikal) |
| Desktop | `.ds-form-row__field` grid `1fr auto` (field + action button) |
| ≤640px | `.form-parts-stack__row` → `grid-template-columns: 1fr` (label/field stack) |
| ≤640px | `.ds-form-row__field` → satu kolom; `max-width: 100%` pada row & playground |

**Compose:** `ds-form-row` + `ds-text-field` / `ds-select-trigger` — jangan buat layout form baru di luar pola row.

### Contoh — Page Layout (ringkas)

| Varian | Kapan |
|---|---|
| `ds-topnav--website` | Desktop lebar |
| `ds-topnav--tablet` | Tablet |
| `ds-topnav--mobile` | Mobile — menu/icon-only patterns |

**Referensi:** `components/Page layout/page-layout.html`, `components/Top & bottom Navigation/top-bottom-nav.html`.

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
- [ ] Kontras teks/latar memenuhi target WCAG AA (4.5:1 body, 3:1 large text)
- [ ] `prefers-reduced-motion` diterapkan bila komponen punya transisi/animasi
- [ ] Overlay punya kontrak keyboard (`Escape` menutup) bila applicable
- [ ] Tabel lebar: horizontal scroll via `.ds-table-scroll`, bukan memotong kolom
- [ ] Form mobile: row/field stack di breakpoint ≤640px (lihat `form.html`)
- [ ] Elevation dari token `--shadow-1` atau `--shadow-md` sesuai halaman komponen referensi (bukan custom shadow)
- [ ] Tidak ada dependency UI framework baru
- [ ] Contoh kode di doc = markup aktual di halaman (bukan placeholder)

---

## Workflow AI (Claude Code / Cursor)

1. **Baca** `CLAUDE.md`, `Docs/component-rules.md`, dan `Docs/figma-make-context.md`.
2. **Buka** source React (`src/GposLite/components/{Name}.tsx`) untuk logic dan API komponen.
3. **Buka** source HTML referensi (`components/{Name}/*.html`) untuk fidelity visual.
4. **Cek** `styles/tokens.css` dan `tailwind.config.js` jika perlu nama token/class pasti.
5. **Edit minimal** — diff kecil, jangan rewrite file panjang tanpa permintaan.
6. **Jangan** usulkan token/komponen/variant baru; jika tidak ada di repo, laporkan ke user.
7. **Output** prefer diff; hanya potongan yang berubah.

---

## Referensi cepat

| Kebutuhan | Buka |
|---|---|
| Token lengkap | `styles/tokens.css`, `Docs/design-system-knowledge.md` |
| Aturan per komponen | `Docs/component-rules.md` |
| Prinsip visual | `Docs/design-principles.md` |
| Pedoman agent | `CLAUDE.md` |
| Index navigasi | `index.html` |
