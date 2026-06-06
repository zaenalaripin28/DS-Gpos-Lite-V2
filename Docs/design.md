# GPOS Lite Design System V2 — Design Guide

> **Entry point** untuk foundations, components, dan dokumentasi `Docs/`.
> Hanya mencatat apa yang sudah diimplementasi di repositori — bukan spesifikasi baru.

**Brand:** GPOS Blue `#1E7FD6` · `--color-blue-b300` · `--color-primary-500`  
**Stack:** React (TSX) + HTML reference + Tailwind CSS + CSS custom properties  
**Cakupan:** 7 foundations · 34 komponen · 188 ikon SVG

---

## Source of Truth (urutan baca)

| Prioritas | Path | Peran |
|-----------|------|-------|
| 1 | `styles/tokens.css` | Token warna, spacing, typography, shadow, z-index |
| 2 | `styles/gp-lite-design-tokens.json` | Snapshot token untuk tooling |
| 3 | `scripts/figma_component_registry.json` | `htmlPath`, `rootClass`, `id` resmi per komponen |
| 4 | `components/{Name}/{slug}.html` | Anatomi DOM, variant, komposisi visual |
| 5 | `src/GposLite/components/{Name}.tsx` | Behavior/runtime React |
| 6 | `foundations/{topic}/{topic}.html` | Primitif design (colors, grid, dll.) |
| 7 | `Docs/component-rules.md` | DO/DON'T per komponen |
| 8 | `.claude/figma/{id}.spec.json` | Nilai resolved untuk Figma generate |

**Jika bentrok:** ikuti registry (`rootClass`) → HTML referensi → `component-rules.md`.

---

## Struktur Repositori

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

**Tidak dipakai:** Vue, Mantine, Bootstrap, external UI library, `/pages` directory.

---

## Konvensi Implementasi

| Aturan | Detail |
|--------|--------|
| Class naming | BEM `ds-{block}__{element}--{modifier}` · kecuali Modal (`modal-*`), Popup (`popup-*`) |
| Warna & spacing | Hanya `var(--*)` atau utility Tailwind semantic (`bg-blue-b300`, `gap-200`) |
| Ikon | `assets/icons/icon-*.svg` via `<img>` — tanpa library eksternal |
| Bahasa | `lang="id"` pada halaman HTML |
| Elevation | Default `--shadow-1` / `shadow-1`; `--shadow-md` hanya di komponen yang sudah memakainya |
| State doc | Modifier `--hover`, `--focus`, `--press` untuk matrix; produksi pakai pseudo-class CSS |

Detail lengkap: [`CLAUDE.md`](../CLAUDE.md) · [`Docs/design-principles.md`](./design-principles.md)

---

## Foundations (7)

| Foundation | Halaman | Token / topik utama |
|------------|---------|---------------------|
| Colors | [`foundations/colors/colors.html`](../foundations/colors/colors.html) | GP Lite palette, semantic color, 57 primitif |
| Typography | [`foundations/typography/typography.html`](../foundations/typography/typography.html) | Poppins, 19 text styles Figma-sync |
| Spacing | [`foundations/spacing/spacing.html`](../foundations/spacing/spacing.html) | `--space-*` (GP Lite) + `--spacing-*` (rem) |
| Borders | [`foundations/borders/borders.html`](../foundations/borders/borders.html) | Radius, border width |
| Shadows | [`foundations/shadows/shadows.html`](../foundations/shadows/shadows.html) | `--shadow-1` (default), `--shadow-md` |
| Grid | [`foundations/grid/grid.html`](../foundations/grid/grid.html) | 4/8/12/12 kolom, margin 24px, gutter 16px |
| Icons | [`foundations/icons/icons.html`](../foundations/icons/icons.html) | Katalog 188 SVG · `iconsData.js` |

**Token pusat:** [`styles/tokens.css`](../styles/tokens.css)

### Token cepat

- **Semantic:** `--color-background` · `--color-surface` · `--color-text-primary` · `--color-border`
- **Spacing:** `--space-025`(2px) … `--space-300`(24px) — default doc **Space.200 (16px)**
- **Typography:** `--font-primary` (Poppins) · `--text-body-*` · `--text-caption-*`
- **Layout doc site:** `--sidebar-*` (270px navy) — **bukan** app shell produk
- **Layout app:** `ds-page-layout`, `ds-sidebar-nav-expand` (putih 280px)

---

## Components (34)

Registry lengkap: [`Docs/components-index.md`](./components-index.md) · machine-readable: [`scripts/figma_component_registry.json`](../scripts/figma_component_registry.json)

### Atoms

| Komponen | HTML | Root class | AI doc |
|----------|------|------------|--------|
| Avatar | `components/Avatar/avatar.html` | `.ds-avatar` | [avatar.md](./components/avatar.md) |
| Badge | `components/Badge/badge.html` | `.ds-badge` | [badge.md](./components/badge.md) |
| Button | `components/Button/button.html` | `.ds-btn` | [button.md](./components/button.md) |
| Checkbox | `components/Checkbox/checkbox.html` | `.ds-checkbox` | [checkbox.md](./components/checkbox.md) |
| Lozenge | `components/Lozenge/lozenge.html` | `.ds-lozenge` | [lozenge.md](./components/lozenge.md) |
| Radio | `components/Radio/radio.html` | `.ds-radio` | [radio.md](./components/radio.md) |
| Tags | `components/Tags/tags.html` | `.ds-tag` | [tags.md](./components/tags.md) |
| Toggle | `components/Toggle/toggle.html` | `.ds-toggle` | [toggle.md](./components/toggle.md) |
| Tooltip | `components/Tooltip/tooltip.html` | `.ds-tooltip` | [tooltip.md](./components/tooltip.md) |
| Range | `components/Range/range.html` | `.ds-range` | [range.md](./components/range.md) |

### Inputs

| Komponen | HTML | Root class | AI doc |
|----------|------|------------|--------|
| Text Field | `components/Text Field/text field.html` | `.ds-text-field` | [text-field.md](./components/text-field.md) |
| Text Area | `components/Text Area/text area.html` | `.ds-text-area` | [text-area.md](./components/text-area.md) |
| Select | `components/Select/select.html` | `.ds-select-trigger` | [select.md](./components/select.md) |

### Molecules

| Komponen | HTML | Root class | AI doc |
|----------|------|------------|--------|
| Dropdown Button | `components/dropdown/dropdown.html` | `.ds-dropdown` | [dropdown.md](./components/dropdown.md) |
| Pagination | `components/Pagination/pagination.html` | `.ds-pagination` | [pagination.md](./components/pagination.md) |
| Tabs | `components/Tabs/tabs.html` | `.ds-tab` / container `.ds-tablist` | [tabs.md](./components/tabs.md) |
| Calendar | `components/Calendar/calendar.html` | `.ds-calendar` | [calendar.md](./components/calendar.md) |
| Date Picker | `components/Date picker/date-picker.html` | `.ds-date-picker-layout` (doc) · composed `.ds-date-picker` | [date-picker.md](./components/date-picker.md) |
| Time Picker | `components/Time picker/time-picker.html` | `.ds-time-picker` + `.ds-select-trigger` | [time-picker.md](./components/time-picker.md) |
| Date Time Picker | `components/Date time picker/date time picker.html` | `.ds-date-time-picker` | [date-time-picker.md](./components/date-time-picker.md) |
| Inline Edit | `components/Inline edit/inline-edit.html` | `.ds-inline-edit` · host `.ds-inline-edit-host` | [inline-edit.md](./components/inline-edit.md) |
| Breadcrumbs | `components/Breadcrumbs/breadcrumbs.html` | `.ds-bc-container` | [breadcrumbs.md](./components/breadcrumbs.md) |

### Feedback & Overlays

| Komponen | HTML | Root class | AI doc |
|----------|------|------------|--------|
| Section Message | `components/section messages/section-message.html` | `.ds-section-message` | [section-messages.md](./components/section-messages.md) |
| Toast Banner | `components/Toast-Banner/banner.html` | `.ds-banner` | [toast-banner.md](./components/toast-banner.md) |
| Flags | `components/Flags/flags.html` | `.ds-flag` | [flags.md](./components/flags.md) |
| Modal | `components/Modal/modal.html` | `.modal-composition-item` | [modal.md](./components/modal.md) |
| Popup | `components/Popup/popup.html` | `.popup-anchor-wrap` | [popup.md](./components/popup.md) |
| Tourguide | `components/Tourguide/tourguide.html` | `.ds-tourguide` | [tourguide.md](./components/tourguide.md) |

### Data

| Komponen | HTML | Root class | AI doc |
|----------|------|------------|--------|
| Table | `components/Table/table.html` | `.ds-table` (dalam `.ds-table-scroll`) | [table.md](./components/table.md) |

### Navigation

| Komponen | HTML | Root class | AI doc |
|----------|------|------------|--------|
| Navigation Menu | `components/Navigation menu/navigation.html` | `.ds-sidebar-nav-expand` | [navigation-menu.md](./components/navigation-menu.md) |
| Top & Bottom Nav | `components/Top & bottom Navigation/top-bottom-nav.html` | `.ds-topnav` · `.ds-footer-nav` | [top-bottom-navigation.md](./components/top-bottom-navigation.md) |

### Layout & Shell

| Komponen | HTML | Root class | AI doc |
|----------|------|------------|--------|
| Page Header | `components/Page Header/page-header.html` | `.ds-page-header` | [page-header.md](./components/page-header.md) |
| Form | `components/Form/form.html` | `.ds-form-row` | [form.md](./components/form.md) |
| Page Layout | `components/Page layout/page-layout.html` | `.ds-page-layout` | [page-layout.md](./components/page-layout.md) |

Setiap folder `components/{Name}/figma/` berisi referensi visual PNG (bila ada).

---

## App Shell (halaman produk)

Task dashboard / halaman POS = **compose komponen existing**, bukan desain shell baru.

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

Detail: [`Docs/component-rules.md` § Komposisi layar](./component-rules.md) · [`Docs/figma-generate-skill.md` § Komposisi layar](./figma-generate-skill.md)

---

## Dokumentasi `Docs/`

| Dokumen | Audiens | Isi |
|---------|---------|-----|
| **design.md** (ini) | Semua | Entry point & peta repo |
| [design-principles.md](./design-principles.md) | Designer / engineer | Visual personality, layout, color, spacing, elevation |
| [design-system-knowledge.md](./design-system-knowledge.md) | Engineer / AI | Katalog token, a11y, foundations & components detail |
| [component-rules.md](./component-rules.md) | Engineer / AI | DO/DON'T + Structure per komponen |
| [components-index.md](./components-index.md) | AI / Figma | Registry 34 komponen + workflow |
| [components/*.md](./components/) | AI | Anatomy, variant, token, prompt per komponen |
| [engineer-skill.md](./engineer-skill.md) | Engineer | Implementasi, responsive, a11y checklist |
| [figma-make-skill.md](./figma-make-skill.md) | AI | Figma → HTML |
| [figma-make-context.md](./figma-make-context.md) | AI | Konteks lengkap Figma Make |
| [figma-generate-skill.md](./figma-generate-skill.md) | AI / Figma MCP | Code → Figma, komposisi layar |

---

## Workflow AI

### Implementasi UI (code)

1. Baca `scripts/figma_component_registry.json` → `htmlPath` + `rootClass`
2. Buka `components/{Name}/{slug}.html`
3. `Docs/components/{slug}.md` + section di `Docs/component-rules.md`
4. `src/GposLite/components/{Name}.tsx` untuk behavior
5. Token dari `styles/tokens.css` / `tailwind.config.js`

### Figma MCP (code → Figma)

```
@Docs/design.md
@Docs/figma-generate-skill.md
@Docs/component-rules.md
@scripts/figma_component_registry.json
@components/Page layout/page-layout.html        # untuk screen
@components/Navigation menu/navigation.html       # untuk screen
@components/Top & bottom Navigation/top-bottom-nav.html
@.claude/figma/{id}.spec.json
```

| Command | Fungsi |
|---------|--------|
| `./.cursor/scripts/figma-prep.sh {id}` | Prep 1 komponen |
| `./.cursor/scripts/figma-prep-all.sh` | Prep 34 komponen |
| `python3 scripts/extract_figma_specs.py --validate` | Regenerate spec JSON |
| `python3 scripts/sync_component_doc_anatomy.py` | Sync Anatomy docs dari component-rules |

### Figma Make (Figma → HTML)

Ikuti [`figma-make-skill.md`](./figma-make-skill.md) + [`figma-make-context.md`](./figma-make-context.md).

---

## Prinsip Visual (ringkas)

- **Estetika:** premium SaaS dashboard — hierarki bersih, whitespace lapang, kepadatan terkontrol
- **Surface:** halaman `--color-background` (#F8FAFC) · konten `--color-surface` (#FFFFFF)
- **Aksi utama:** GPOS Blue `b300` — bukan orange/green sebagai primary CTA
- **Radius default:** `--border-radius-md` (8px) untuk button & form
- **Shadow default:** `--shadow-1` — hindari shadow berat custom
- **Akurasi > kreativitas:** reuse komponen & token existing; jangan improvisasi variant baru

Detail: [`design-principles.md`](./design-principles.md)

---

## Larangan Umum

- Hardcode hex, px spacing, atau radius di luar token
- Ikon dari library eksternal
- Sidebar app dengan tema `--sidebar-bg` navy
- Shell horizontal sidebar+main tanpa `ds-topnav`
- Logo brand + footer profil user di Navigation Menu (bukan di spec DS)
- Dismiss button di Toast Banner (belum diimplementasi)
- Variant/state baru tanpa ada di HTML referensi

---

## Referensi Cepat

| Kebutuhan | File |
|-----------|------|
| Buka DS di browser | `index.html` |
| Tailwind mapping | `tailwind.config.js` |
| Style guide visual | `style_guide.md` |
| Aturan AI | `CLAUDE.md` |
| Manifest Figma | `.claude/figma-library-manifest.json` |
| Anatomy reference (opsional) | `.claude/references/` |

---

*Terakhir diselaraskan dengan: 7 foundations · 34 components · `Docs/` · `scripts/figma_component_registry.json`*
