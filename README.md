# Design System GPOS Lite V2

Dokumentasi design system GPOS Lite V2 — design tokens, 7 foundations, 34 komponen, dan panduan implementasi. Menggunakan stack hybrid: React + Tailwind + CSS custom properties untuk implementasi runtime, dan HTML statis sebagai visual/anatomy reference.

**Brand color:** GPOS Blue `#1E7FD6` (`--color-primary-500`)

---

## Struktur Repositori

```
├── index.html                    # Home & navigasi design system
├── foundations/                  # 7 foundation pages (HTML)
│   ├── colors/
│   ├── typography/
│   ├── spacing/
│   ├── borders/
│   ├── shadows/
│   ├── grid/
│   └── icons/
├── components/                   # 34 komponen (HTML + CSS per folder)
├── src/GposLite/                 # 34 komponen runtime React (TSX + CSS)
│   ├── components/
│   └── styles/
├── styles/
│   ├── tokens.css                # Design tokens (CSS variables)
│   ├── globals.css               # Base layout, sidebar, topbar
│   └── enhancements.css          # Utilitas halaman dokumentasi
├── assets/
│   ├── icons/                    # 188 SVG icons
│   └── images/
├── Docs/                         # Knowledge base & panduan engineer
│   ├── design-system-knowledge.md
│   ├── design-principles.md
│   ├── component-rules.md
│   ├── engineer-skill.md
│   ├── figma-make-skill.md
│   └── figma-make-context.md
├── tailwind.config.js            # Mapping token → Tailwind utilities
├── CLAUDE.md                     # Aturan implementasi untuk AI/engineer
├── style_guide.md                # Visual style reference
└── package.json
```

**Stack:** React (TSX) · HTML statis (reference) · Tailwind CSS v3 · CSS custom properties · BEM `ds-*` · ikon dari `assets/icons/` saja

**Posisi stack:**
- Runtime implementation: `src/GposLite/components/*.tsx`
- Visual/anatomy reference: `components/*/*.html`, `foundations/*/*.html`, `components/*/figma/`

**Tidak dipakai:** Vue, Mantine, Bootstrap, external UI library

---

## Quick Start

### 1. Buka dokumentasi lokal

Buka `index.html` di browser, atau jalankan static server:

```bash
npx serve .
```

### 2. Build Tailwind (opsional)

```bash
npm install
npm run dev      # watch → dist/output.css
npm run build    # minify → dist/output.css
```

Input build: `styles/globals.css` (meng-`@import` `tokens.css`).

### 3. Integrasi ke project lain

1. Salin `tailwind.config.js` ke project target
2. Import token via `styles/tokens.css` atau `styles/globals.css`
3. Gunakan utility Tailwind semantic (`bg-primary-500`, `text-neutral-n900`, `shadow-1`, dll.)

```html
<button class="px-6 py-3 rounded-md bg-primary-500 text-white font-semibold hover:bg-primary-600">
  Button
</button>
```

```css
.custom-component {
  background-color: var(--color-primary-500);
  padding: var(--spacing-4);
  border-radius: var(--border-radius-md);
  box-shadow: var(--shadow-1);
}
```

---

## Design Tokens

Semua token terpusat di `styles/tokens.css`. Snapshot JSON: `styles/gp-lite-design-tokens.json` (regenerate: `python3 scripts/export_tokens_json.py`).

| Kategori | Contoh |
|---|---|
| Brand / primary | `--color-primary-500` → `#1E7FD6` |
| GP Lite palette | `--color-blue-b*`, `--color-neutral-n*`, dll. |
| Semantic | `--color-background`, `--color-text-*`, `--color-border` |
| Typography | `--font-*`, `--font-size-*`, `--text-{category}-{variant}-*` |
| Spacing | `--spacing-*` (rem), `--space-*` (GP Lite scale) |
| Radius & border | `--border-radius-*`, `--border-width-*` |
| Elevation | `--shadow-1` (default), `--shadow-md` (komponen tertentu) |
| Layout | `--sidebar-width`, `--topbar-height`, `--breakpoint-*` |

**Aturan shadow:**
- Default: `--shadow-1` / `shadow-1`
- Sekunder (Modal, Dropdown, Section Message, dll.): `--shadow-md` / `shadow-md`
- Jangan buat custom shadow di luar token

---

## Foundations (7)

| Foundation | Path |
|---|---|
| Colors | `foundations/colors/colors.html` |
| Typography | `foundations/typography/typography.html` |
| Spacing | `foundations/spacing/spacing.html` |
| Borders | `foundations/borders/borders.html` |
| Shadows | `foundations/shadows/shadows.html` |
| Grid | `foundations/grid/grid.html` |
| Icons | `foundations/icons/icons.html` |

---

## Components (34)

Avatar · Badge · Breadcrumbs · Button · Calendar · Checkbox · Date picker · Date time picker · Dropdown · Flags · Form · Inline edit · Lozenge · Modal · Navigation menu · Page Header · Page layout · Pagination · Popup · Radio · Range · Section messages · Select · Table · Tabs · Tags · Text Area · Text Field · Time picker · Toast-Banner · Toggle · Tooltip · Top & bottom Navigation · Tourguide

Setiap komponen: `components/{Name}/*.html` + CSS scoped di halaman.

---

## Panduan Implementasi

### Prioritas sumber (wajib)

1. Runtime component behavior (`src/GposLite/components/*.tsx`)
2. Token system (`styles/tokens.css`, `tailwind.config.js`)
3. Anatomy spec (`.claude/references/` jika tersedia)
4. Visual reference (`foundations/*/*.html`, `components/*/*.html`, `components/*/figma/`)
5. Struktur existing

### Best practices

- Gunakan semantic token utilities — hindari hardcode warna/spacing/radius
- Mobile-first responsive (`sm:`, `md:`, `lg:`, `xl:`, `2xl:`)
- Semantic HTML + ARIA untuk aksesibilitas
- Hover / focus / active / disabled states konsisten
- Ikon hanya dari `assets/icons/`

### Hindari

- Hardcode hex/rgba di luar token
- External icon library
- Redesign visual tanpa permintaan
- Token baru tanpa persetujuan

---

## Dokumentasi Engineer

| File | Isi |
|---|---|
| `Docs/components-index.md` | **Entry point AI** — registry 34 komponen + workflow |
| `Docs/design-system-knowledge.md` | Katalog token, struktur repo, komponen |
| `Docs/design-principles.md` | Filosofi visual & interaksi |
| `Docs/component-rules.md` | DO/DON'T per komponen |
| `Docs/engineer-skill.md` | Workflow implementasi |
| `Docs/figma-make-skill.md` | Figma → HTML workflow |
| `Docs/figma-make-context.md` | Context lengkap token, registry, dan composition untuk AI/Figma Make |
| `CLAUDE.md` | Aturan proyek untuk AI assistant |
| `style_guide.md` | Referensi visual (`index.html` = primary) |

---

## Breakpoints

```
xs: 0       (mobile)
sm: 640px   (landscape mobile)
md: 768px   (tablet)
lg: 1024px  (desktop)
xl: 1280px  (wide desktop)
2xl: 1536px (ultra wide)
```

---

## Contributing

Saat menambah token atau komponen:

1. Update `styles/tokens.css` (token existing saja — jangan buat token baru tanpa persetujuan)
2. Update `tailwind.config.js` jika perlu mapping utility
3. Dokumentasikan di halaman foundation/komponen yang sesuai
4. Sinkronkan `Docs/` jika ada perubahan aturan
5. Uji aksesibilitas (kontras, keyboard, screen reader)

---

## Version History

### V2.0 (2026)

- 7 foundation pages + 34 komponen HTML
- Token system GP Lite (`tokens.css`)
- Tailwind integration + BEM `ds-*`
- Knowledge base di `Docs/`
- Shadow policy: `shadow-1` default, `shadow-md` sekunder
- Hybrid stack: React runtime (`src/GposLite`) + HTML visual reference; Storybook tidak aktif
- 34/34 komponen punya folder `figma/` dengan PNG export

---

**Maintained by GPOS Team · Last Updated: June 2026**
