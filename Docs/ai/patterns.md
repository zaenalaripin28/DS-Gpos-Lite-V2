# Patterns — GPOS Lite DS V2

> Pola implementasi yang **sudah ada** di repositori. Reuse — jangan reimplement.

---

## Authority order

1. Runtime behavior: `src/GposLite/components/*.tsx`
2. Token: `styles/tokens.css` + `tailwind.config.js`
3. `Docs/component-rules.md` (komponen spesifik)
4. Visual/anatomy: `components/*/*.html`, `components/*/figma/`, `.claude/references/` (jika terisi)

---

## BEM naming

```html
<button type="button" class="ds-btn ds-btn--primary">
  <span class="ds-btn__label">Simpan</span>
</button>
```

| Pola | Contoh | Pengecualian |
|------|--------|--------------|
| Block | `ds-btn`, `ds-table` | — |
| Element | `ds-btn__label` | — |
| Modifier | `ds-btn--primary` | Modal: `modal-*` · Popup: `popup-*` |
| State doc | `--hover`, `--focus`, `--press` | Matrix saja; produksi pakai `:hover`, `:focus-visible` |

---

## Compose — jangan reimplement

| Butuh | Reuse |
|-------|-------|
| Pilih tanggal | `ds-select-trigger` + `ds-calendar` |
| Pilih waktu | `ds-select-trigger` + `ds-time-picker__menu` |
| Pilih tanggal+waktu | `ds-date-time-picker` (composed) |
| Halaman app | `ds-page-layout` + `ds-page-header` + konten |
| Form field | `ds-form-row` + `ds-text-field` / `ds-select-trigger` / `ds-checkbox` |
| Menu aksi | `ds-dropdown` atau `ds-btn` + `role="menu"` |
| Pesan in-page | `ds-section-message` |
| Banner global | `ds-banner` (Toast Banner) |
| Konfirmasi | `modal-composition-item` + `ds-btn` footer |
| Hint kontekstual | `popup-anchor-wrap` + panel |

---

## App shell (dashboard / halaman POS)

Task screen = **compose komponen existing**, bukan desain shell baru.

### Wajib dibaca sebelum compose

| Peran | File |
|-------|------|
| Shell | `components/Page layout/page-layout.html` — `#pl-layout-template` |
| Sidebar | `components/Navigation menu/navigation.html` — `ds-sidebar-nav-expand` |
| Top bar | `components/Top & bottom Navigation/top-bottom-nav.html` — `ds-topnav` |

### Hierarki `ds-page-layout--website`

```
ds-page-layout.ds-page-layout--website
├── header.ds-topnav.ds-topnav--website     ← full width, DI ATAS body
└── .ds-page-layout__body
    ├── .ds-page-layout__aside (280px, --color-neutral-n0)
    │   └── .ds-sidebar-nav-expand
    └── .ds-page-layout__main
        ├── .ds-page-layout__content        ← grid 12 kolom
        └── .ds-page-layout__footer
            └── .ds-footer-nav
```

### Sidebar app vs doc site

| | App (`ds-sidebar-nav-expand`) | Doc site (`--sidebar-*`) |
|---|-------------------------------|--------------------------|
| Background | `--color-neutral-n0` (putih) | `--sidebar-bg` (navy) |
| Dipakai di | `page-layout.html` | `index.html` |
| Item | `ds-nav-mainmenu-snap`, `ds-nav-submenu-snap` | Link dokumentasi |

---

## Responsive decision matrix

| Konteks | Gunakan | Nilai |
|---------|---------|-------|
| Utility Tailwind `sm:` / `md:` | `tailwind.config.js` | 640 / 768 / 1024 / 1280 / 1536 |
| Layout mockup / grid | `foundations/grid/grid.html` | SM 320–600, MD 601–1024, LG 1025–1440, XL 1400+ |
| Shell app | Page Layout / Topnav variants | `--website` / `--tablet` / `--mobile` |

**Aturan:** satu varian topnav per viewport — jangan campur `--website` dan `--mobile`.

### Table

- `.ds-table-scroll` — horizontal scroll
- `.ds-table--data` `min-width: 36rem`
- Scroll region: `tabindex="0"` + focus ring
- Skip link ke `#main-content` (doc)

### Form

- Desktop: `.ds-form-row` max-width 540px
- ≤640px: stack vertikal (`form-parts-stack__row` → 1 kolom)

### Page Layout topnav

| Varian | Kapan |
|--------|-------|
| `ds-topnav--website` | Desktop lebar |
| `ds-topnav--tablet` | Tablet |
| `ds-topnav--mobile` | Mobile |

---

## HTML page boilerplate

```html
<!DOCTYPE html>
<html lang="id">
<head>
  <link rel="stylesheet" href="../../styles/globals.css">
  <link rel="stylesheet" href="../../styles/enhancements.css">
  <script src="https://cdn.tailwindcss.com"></script>
  <script>/* tailwind.config mirror tailwind.config.js */</script>
  <style>/* .ds-* scoped */</style>
</head>
```

---

## Landmark layout

```html
<header class="ds-topnav ds-topnav--website" role="banner" aria-label="…">…</header>
<main id="main-content">…</main>
<footer class="ds-footer-nav" role="contentinfo">…</footer>
```

---

## State model

| Tipe | Contoh | Catatan |
|------|--------|---------|
| **Variant** | `--primary`, `--success`, `--error` | Visual identity |
| **State** | `--disabled`, `--loading`, `--selected` | Interaksi |
| **Snapshot** | `--snapshot` | Matrix dokumentasi saja |

---

## CTA & form rules

- **Satu** `ds-btn--primary` per area CTA
- Danger hanya untuk aksi destruktif
- Icon-only: wajib `aria-label`
- Error: `ds-form-row--invalid` + `ds-form-message--error` + `role="alert"`
- Section message in-page ≠ toast banner global
- Modal footer: maks **2** aksi
- Section Message: maks **2** tautan aksi

---

## Elevation pattern

- Default: `--shadow-1` / `shadow-1`
- Sekunder (komponen tertentu): `--shadow-md` / `shadow-md`
- Ikuti halaman referensi komponen — tidak custom shadow

---

## Figma workflows

### Code → Figma (MCP)

```
@Docs/design.md
@Docs/figma-generate-skill.md
@scripts/figma_component_registry.json
@components/Page layout/page-layout.html
@.claude/figma/{id}.spec.json
```

Commands: `./.cursor/scripts/figma-prep.sh {id}` · `python3 scripts/extract_figma_specs.py --validate`

### Figma → HTML (Make)

Ikuti `Docs/figma-make-skill.md` + `Docs/figma-make-context.md`

---

## TODO

- [ ] `pages/`, `patterns/`, `templates/` — direktori belum ada di disk
- [ ] Page Header toolbar wrap behavior on mobile — belum terdokumentasi detail
- [ ] Modal width on mobile — partial guidance only
- [ ] Keyboard roving tabindex untuk Tabs/menus — belum distandarkan

---

## Referensi

| File | Path |
|------|------|
| Component rules | `Docs/component-rules.md` |
| App shell | `Docs/component-rules.md` § Komposisi layar |
| Figma generate | `Docs/figma-generate-skill.md` |
| Anti-patterns | [anti-patterns.md](./anti-patterns.md) |
