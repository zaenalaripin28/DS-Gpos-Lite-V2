# GPOS Lite — Figma Generate Skill (Code → Figma)

> Arah: **codebase → Figma**. Pelengkap `Docs/figma-make-skill.md` (Figma → HTML).
> Spesifikasi komponen: `.claude/figma/{id}.spec.json` (auto-extract dari source).

## Core Principle

GPOS Lite Design System **sudah jadi**. Generate ke Figma = **rekonstruksi faithful**, bukan desain baru.

| Rule | Enforcement |
|------|-------------|
| Source hierarchy | `.claude/figma/*.spec.json` → `components/*/*.html` → `styles/tokens.css` |
| Tokens | Hanya `var(--*)` / nilai resolved di spec — **no hex baru** |
| Variants | Hanya yang ada di spec `anatomy.variants` / `anatomy.sizes` / `anatomy.states` |
| Class names | BEM `ds-*` — kecuali `modal-*`, `popup-*` |
| Icons | `assets/icons/icon-*.svg` only |
| Improvisation | **Dilarang** — jika tidak ada di spec, laporkan ke user |

## Resolusi komponen dari `components/` (wajib)

Sebelum menulis ke Figma (atau generate HTML), **baca file HTML di folder `components/`** — bukan menggambar dari pola SaaS umum.

| Langkah | File | Isi |
|---------|------|-----|
| 1 | `scripts/figma_component_registry.json` | `htmlPath`, `rootClass`, `id` resmi per komponen |
| 2 | `components/{Name}/{slug}.html` | Anatomi DOM, class BEM, contoh komposisi |
| 3 | `.claude/figma/{id}.spec.json` | Nilai resolved (px/hex) + `tokens.used` |
| 4 | `components/*/figma/*.png` | Referensi visual (bila ada) |
| 5 | `Docs/component-rules.md` | DO/DON'T per komponen |

**Folder `components/`** memakai nama folder dengan spasi (contoh: `Navigation menu`, `Page layout`, `Top & bottom Navigation`). Jangan tebak path — ambil dari registry.

**Root class** di `Docs/components-index.md` atau `Docs/components/*.md` bisa usang. Jika bentrok, ikuti `scripts/figma_component_registry.json` → `rootClass`.

## Komposisi layar / dashboard (1 frame)

Task seperti "dashboard POS SaaS" = **susun komponen DS yang sudah ada**, bukan desain shell baru.

### Wajib dibaca (screen composition)

```
@Docs/figma-generate-skill.md
@Docs/figma-make-context.md
@Docs/component-rules.md
@scripts/figma_component_registry.json
@components/Page layout/page-layout.html
@components/Navigation menu/navigation.html
@components/Top & bottom Navigation/top-bottom-nav.html
@.claude/figma/page-layout.spec.json
@.claude/figma/navigation-menu.spec.json
@styles/tokens.css
```

Tambahkan HTML child sesuai konten halaman (mis. `Page Header/page-header.html`, `Table/table.html`, `Toast-Banner/banner.html`).

### Hierarki shell — ikuti `page-layout.html`

Root: `ds-page-layout ds-page-layout--website` (column, bukan sidebar+main sejajar tanpa topnav).

```
ds-page-layout
├── ds-topnav.ds-topnav--website          ← full width, DI ATAS body
└── ds-page-layout__body
    ├── ds-page-layout__aside (280px)
    │   └── ds-page-layout__nav-main
    │       └── ds-sidebar-nav-expand     ← dari navigation.html
    ├── ds-page-layout__overlay           ← hidden di website
    └── ds-page-layout__main
        ├── ds-page-layout__content       ← grid 12 kolom, padding 24px
        └── ds-page-layout__footer
            └── ds-footer-nav
```

Template HTML: `#pl-layout-template` di `components/Page layout/page-layout.html` (baris ~1225).

### Sidebar — ikuti `navigation.html`, bukan tema gelap custom

| Aspek | Benar (DS) | Salah (jangan) |
|-------|------------|----------------|
| Root | `ds-sidebar-nav-expand` | Sidebar generik / dark app shell |
| Background | `--color-neutral-n0` (putih) | `--sidebar-bg` / navy gelap |
| Lebar | 280px (`max-width` nav; aside di page-layout) | 270px atau lebar bebas |
| Header | `MENU GPOS` + `__collapse` + chevron-left | Logo brand + versi app |
| Search | `ds-nav-menu-search`, placeholder **"Cari Menu Disini"**, icon kanan | Search generik, icon kiri |
| Section | `Terakhir Dibuka` + `__recent` + divider | Heading `MENU` / `AKUN` buatan |
| Item | `ds-nav-mainmenu-snap` + icon `icon-sidebar-offline-*` 24px | Kotak/ellipse placeholder |
| Submenu | `ds-nav-composed__submenu` + `ds-nav-submenu-snap` | Flat list tanpa submenu |
| Selected | bg `--color-blue-b50`, teks `--color-blue-b300` | Solid blue + teks putih |
| Footer profil | **Tidak ada** di Navigation Menu | User card di bawah sidebar |

Token `--sidebar-*` di `tokens.css` = **doc site shell** (`index.html`), **bukan** surface `ds-sidebar-nav-expand`.

### Konten halaman — compose, jangan improvisasi widget

Untuk list/dashboard di DS, default dari `page-layout.html`:

- `ds-banner` → `ds-page-header` → `ds-table` (+ opsional `ds-pagination`)
- `ds-footer-nav` di `__footer`

Jangan buat KPI cards, chart placeholder, atau menu label yang tidak ada di HTML referensi kecuali user meminta eksplisit.

### Anti-pattern (audit)

| # | Kesalahan AI | Perbaikan |
|---|--------------|-----------|
| 1 | Sidebar dark + token `sidebar/*` | Baca CSS `.ds-sidebar-nav-expand` di `navigation.html` |
| 2 | Layout horizontal Sidebar+Main tanpa `ds-topnav` | Ikuti `ds-page-layout` column + template |
| 3 | Menu "POS Kasir", "AKUN", dll. | Copy item dari playground/template di `navigation.html` / `page-layout.html` |
| 4 | Icon placeholder rectangle | `assets/icons/icon-sidebar-offline-*.svg` |
| 5 | Skip spec JSON, langsung gambar | Phase 0: baca `htmlPath` + `.spec.json` dulu |
| 6 | Root class dari memory | `scripts/figma_component_registry.json` |

## Prep Commands

```bash
# Satu komponen
./.cursor/scripts/figma-prep.sh button

# Semua 34 komponen (1 library frame)
./.cursor/scripts/figma-prep-all.sh

# Regenerate specs dari source
python3 scripts/extract_figma_specs.py --validate
```

## Required Context (@-mentions)

### Single component

```
@Docs/figma-generate-skill.md
@Docs/figma-make-context.md
@Docs/component-rules.md
@.claude/figma/{id}.spec.json
@Docs/components/{slug}.md
@components/{Name}/{slug}.html
@src/GposLite/components/{Name}.tsx
@styles/tokens.css
```

### Full library (34 components)

```
@Docs/figma-generate-skill.md
@.claude/figma-library-manifest.json
@.claude/figma/*.spec.json
@styles/tokens.css
@styles/gp-lite-design-tokens.json
```

## Spec JSON Structure

Setiap `.claude/figma/{id}.spec.json` berisi data **extracted** dari implementasi:

| Field | Isi |
|-------|-----|
| `meta` | Nama, root class, layer, path source |
| `anatomy.base` | CSS base rule + declarations resolved ke px/hex |
| `anatomy.variants` | Modifier `--primary`, `--danger`, dll |
| `anatomy.sizes` | Modifier `--sm`, `--compact`, dll |
| `anatomy.states` | Modifier `--hover`, `--focus`, dll |
| `anatomy.elements` | BEM elements `__image`, `__label`, dll |
| `tokens.used` | Semua `--*` yang dipakai komponen |
| `structure.modifiersInHtml` | Modifier yang benar-benar dipakai di HTML |
| `figmaReferences` | PNG di `components/*/figma/` bila ada |

**Gunakan `anatomy.*.declarations.*.resolved` untuk nilai Figma.**
**Gunakan `anatomy.*.declarations.*.token` untuk variable binding.**

## Build Order (1 Library Frame)

Urutan dari `.claude/figma-library-manifest.json`:

1. **Foundations** — colors, typography, spacing, borders, shadows, grid, icons
2. **Atoms** — Avatar, Badge, Button, Checkbox, Lozenge, Radio, Tags, Toggle, Tooltip, Range
3. **Inputs** — Text Field, Text Area, Select
4. **Molecules** — Dropdown, Pagination, Tabs, Calendar, Date/Time pickers, Inline Edit, Breadcrumbs
5. **Feedback** — Section Message, Toast Banner, Flags, Modal, Popup, Tourguide
6. **Data** — Table
7. **Navigation** — Navigation Menu, Top & Bottom Nav
8. **Layout** — Page Header, Form, Page Layout

## Workflow

### Phase 0 — Discovery (no Figma writes)

1. Baca `scripts/figma_component_registry.json` → `htmlPath` + `rootClass` tiap komponen yang dipakai
2. Buka **setiap** `components/{Name}/{slug}.html` yang relevan; untuk layar: minimal `page-layout.html` + `navigation.html` + `top-bottom-nav.html`
3. Baca `.claude/figma/{id}.spec.json` + bandingkan dengan HTML (jangan skip ke Figma write)
4. Inspect Figma file: variables, existing components, page structure
5. Identifikasi gap: token belum ada vs komponen belum ada
6. Lock scope — tidak menambah variant, menu item, atau section di luar HTML referensi

### Phase 1 — Variables / Tokens

Buat atau verifikasi Figma Variables dari `styles/tokens.css`:

| CSS token | Figma variable |
|---------|----------------|
| `--color-blue-b300` | Color/Brand/Primary |
| `--space-150` | Space/150 (12px) |
| `--border-radius-sm` | Radius/SM (4px) |
| `--shadow-1` | Effect/Shadow-1 |
| `--font-size-sm` | Typography/Body-SM |

- Scope: `FRAME_FILL`, `TEXT_FILL`, `STROKE_COLOR`, `GAP`, `CORNER_RADIUS`
- Code syntax WEB: `var(--color-blue-b300)`

**Exit:** semua token di `tokens.used` untuk batch ini sudah ada.

### Phase 2 — Components (one at a time)

Per komponen, ikuti spec JSON:

1. Baca `anatomy.base` → buat root frame (auto-layout, padding, min-height, radius)
2. Bind fill/stroke/text ke variables dari `declarations.*.token`
3. Buat variant properties dari `anatomy.variants` + `anatomy.sizes`
4. Grid layout variant matrix
5. `get_screenshot` → bandingkan dengan `figmaReferences` PNG bila ada
6. **Checkpoint** — tunggu approval sebelum komponen berikutnya

**Composed components** (Date Picker, Form, Page Layout): reuse child instances (Select + Calendar, Form row + Text Field), jangan redraw.

### Phase 3 — Library Frame Assembly

Susun 1 frame vertikal:

```
GPOS Lite DS V2 — Component Library
├── Section: Atoms
│   ├── Avatar (variants grid)
│   ├── Badge
│   └── ...
├── Section: Inputs
└── ...
```

Auto-layout vertical, gap `--space-300` (24px), section headers pakai `--text-title-medium-*`.

### Phase 4 — QA

- [ ] Setiap komponen: variant count = spec
- [ ] Token bindings: no hardcoded fills
- [ ] Proportions: base `min-height`, `padding`, `font-size` match `anatomy.baseResolved`
- [ ] Tidak ada variant/warna/spacing baru
- [ ] Screenshot per section vs `components/*/figma/*.png`

## Figma MCP Skills

Load sebelum `use_figma`:

- `figma-generate-library` — build design system (variables + components)
- `figma-use` — Plugin API syntax

Load untuk screen composition:

- `figma-generate-design` — assemble views from library instances

## Code Connect (opsional, fase berikutnya)

File `src/GposLite/components/{Name}.figma.ts` menghubungkan React component ke Figma node URL.
Tanpa Code Connect: AI tetap bisa build dari spec JSON.
Dengan Code Connect: AI bisa `import` instance dari library yang sudah published.

## Larangan

- Jangan estimasi spacing/warna — selalu dari spec resolved values
- Jangan one-shot 34 komponen dalam 1 `use_figma` call
- Jangan parallel `use_figma` calls
- Jangan buat komponen baru jika sudah ada di spec/registry
- Jangan campur `shadow-1` dan `shadow-md` — ikuti `declarations` per komponen di spec
- Jangan gambar app shell / sidebar tanpa membuka `components/Page layout/page-layout.html` dan `components/Navigation menu/navigation.html`
- Jangan pakai token `--sidebar-*` untuk `ds-sidebar-nav-expand`
- Jangan inventaris menu, KPI widget, atau footer user di sidebar

## Prompt Shell — Screen / Dashboard (1 frame)

```
Task: Build {screen name} in Figma (1 frame)
Context: @Docs/figma-generate-skill.md @scripts/figma_component_registry.json
         @components/Page layout/page-layout.html
         @components/Navigation menu/navigation.html
         @components/Top & bottom Navigation/top-bottom-nav.html
         @.claude/figma/page-layout.spec.json @.claude/figma/navigation-menu.spec.json
Rules: ds-page-layout--website shell; compose existing DS components only;
       sidebar = ds-sidebar-nav-expand (white surface); no improvisation
Output: Single Figma frame matching page-layout template hierarchy
```

## Prompt Shell — Single Component

```
Task: Build {Name} in Figma
Context: @.claude/figma/{id}.spec.json @Docs/figma-generate-skill.md
Rules: 100% match spec anatomy; bind tokens; no improvisation
Output: Figma component with variant matrix per spec
```

## Prompt Shell — Full Library

```
Task: Build GPOS Lite DS V2 component library (34 components, 1 frame)
Context: @.claude/figma-library-manifest.json @Docs/figma-generate-skill.md @.claude/figma/*.spec.json
Rules: buildPhases order; spec JSON per component; checkpoint every section
Output: Single Figma frame with all 34 components, token-bound
```
