# Typography — GPOS Lite DS V2

> **Source of truth:** `styles/tokens.css` · **Foundation page:** `foundations/typography/typography.html`  
> **Font:** Poppins only (`--font-primary`)

---

## Aturan

1. **Hanya Poppins** — tidak ada font sekunder di token.
2. **Minimal 14px** untuk body copy readability.
3. Hindari skip level heading (mis. H1 langsung ke H4).
4. Komponen memakai CSS variables teks (`--text-body-*`) atau `--font-size-*` — bukan font ad hoc.
5. Link: `--color-primary-600`, underline on hover (`globals.css`).

---

## Font family & weights

| Token | Nilai |
|-------|-------|
| `--font-primary` | `'Poppins', sans-serif` |
| `--font-weight-light` | 300 |
| `--font-weight-normal` | 400 |
| `--font-weight-medium` | 500 |
| `--font-weight-semibold` | 600 |
| `--font-weight-bold` | 700 |

---

## Generic size scale

| Token | rem | px |
|-------|-----|-----|
| `--font-size-xs` | 0.75rem | 12 |
| `--font-size-sm` | 0.875rem | 14 |
| `--font-size-base` | 1rem | 16 |
| `--font-size-lg` | 1.125rem | 18 |
| `--font-size-xl` | 1.25rem | 20 |
| `--font-size-2xl` | 1.5rem | 24 |
| `--font-size-3xl` | 1.875rem | 30 |
| `--font-size-4xl` | 2.25rem | 36 |
| `--font-size-5xl` | 3rem | 48 |

---

## Line height & letter spacing

| Token | Nilai |
|-------|-------|
| `--line-height-tight` | 1.2 |
| `--line-height-snug` | 1.375 |
| `--line-height-normal` | 1.5 |
| `--line-height-relaxed` | 1.625 |
| `--line-height-loose` | 2 |
| `--letter-spacing-tight` | -0.02em |
| `--letter-spacing-normal` | 0 |
| `--letter-spacing-wide` | 0.04em |
| `--letter-spacing-wider` | 0.08em |

---

## Figma text styles (19 styles)

Naming: `Text.{Category}.{Variant}` → `--text-{category}-{variant}-{property}`

| Style | Size | Weight | Line-height | Catatan |
|-------|------|--------|-------------|---------|
| Overline / Medium | 12px | 500 | 20px | Uppercase, ls 0.1em |
| Caption / Regular | 12px | 400 | 14px | Metadata |
| Caption / Medium | 12px | 500 | 20px | Label kecil |
| Caption / Link | 12px | 400 | 14px | — |
| Body / Small / Regular | 14px | 400 | 20px | Label form, button |
| Body / Small / Medium | 14px | 500 | 20px | — |
| Body / Link | 14px | 400 | 20px | — |
| **Body / Medium / Regular** | **16px** | **400** | **24px** | **Konten utama ★** |
| Body / Medium / Medium | 16px | 500 | 24px | Emphasis |
| Body / Large / Regular | 18px | 400 | 28px | Lead text |
| Title / Medium | 20px | 500 | 24px | Subheading |
| Header / Small / Regular | 24px | 400 | 32px | H3-level |
| Header / Small / Medium | 24px | 500 | 32px | — |
| Header / Medium / Regular | 36px | 400 | 44px | H2-level |
| Header / Medium / Medium | 36px | 500 | 44px | — |
| Header / Large / Regular | 44px | 400 | 52px | H1-level |
| Header / Large / Medium | 44px | 500 | 52px | — |
| Display / Regular | 64px | 400 | 68px | Hero |
| Display / Medium | 64px | 600 | 68px | Hero emphasis |

---

## Peran teks (pemakaian)

| Peran | Style yang dipakai |
|-------|-------------------|
| Konten utama | **Body / Medium / Regular** (16px / 24px lh) |
| Metadata, label kecil | Caption |
| Hero / judul besar | Header / Large, Display |
| Overline / kategori | Overline / Medium |
| Button label | Body / Small / Medium (14px) — lihat `button.html` |

---

## Base headings (`styles/globals.css`)

`h1`–`h6` memakai `--font-size-*`, weight semibold, `--line-height-tight`, `--letter-spacing-tight`.

---

## Tailwind utilities

| Kebutuhan | Utility |
|-----------|---------|
| Size | `text-xs`, `text-sm`, `text-base`, `text-lg`, … |
| Text styles | `text-body-md`, `text-body-sm`, `leading-body-sm` |
| Weight | `font-normal`, `font-medium`, `font-semibold`, `font-bold` |
| Family | `font-primary` (via config) |

Mapping detail: `tailwind.config.js`

---

## Code inline (`globals.css`)

```css
code {
  background: var(--color-primary-50);
  color: var(--color-primary-700);
  border-radius: var(--border-radius-sm);
}
```

---

## TODO

- [ ] Typography scaling across breakpoints — saat ini ukuran fixed (tidak fluid)
- [ ] Truncation / line-clamp policy global — hanya di Tooltip variants
- [ ] Tabular nums untuk angka/data — belum distandarkan

---

## Referensi

| File | Path |
|------|------|
| Token CSS | `styles/tokens.css` |
| Foundation page | `foundations/typography/typography.html` |
| Base styles | `styles/globals.css` |
| Prinsip typography | `Docs/design-principles.md` § Typography Philosophy |
| Token index | [tokens.md](./tokens.md) |
