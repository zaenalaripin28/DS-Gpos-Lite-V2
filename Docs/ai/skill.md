# AI Skill — GPOS Lite DS V2

> **Entry point modular** untuk Cursor, Claude Code, dan code-generation tools.  
> Aturan wajib: `CLAUDE.md` · Peta repo: [`../design.md`](../design.md)

---

## Modular docs (baca sesuai task)

| Task | Baca |
|------|------|
| Token / CSS vars | [tokens.md](./tokens.md) |
| Warna | [colors.md](./colors.md) |
| Spacing | [spacing.md](./spacing.md) |
| Typography | [typography.md](./typography.md) |
| Komponen & registry | [components.md](./components.md) |
| Compose / app shell | [patterns.md](./patterns.md) |
| Larangan | [anti-patterns.md](./anti-patterns.md) |
| A11y | [accessibility.md](./accessibility.md) |

Dokumen panjang (detail per komponen): `Docs/component-rules.md` · `Docs/components/{slug}.md`

---

## Authority order

Jika konflik, ikuti urutan:

1. Runtime behavior: `src/GposLite/components/*.tsx`
2. `styles/tokens.css` + `tailwind.config.js`
3. `Docs/component-rules.md` (komponen spesifik)
4. `Docs/design-system-knowledge.md` (katalog global)
5. Visual/anatomy: `components/*/*.html`, `components/*/figma/`, `.claude/references/` (jika terisi)
6. Registry: `scripts/figma_component_registry.json` → `rootClass` menang jika bentrok

---

## Larangan mutlak

| Jangan | Ganti dengan |
|--------|--------------|
| Token / variant / state baru | Existing di repo |
| Hardcode warna/spacing/radius/shadow/z-index | `var(--*)` atau utility semantic |
| UI library eksternal | Stack existing |
| Redesign / refactor luas | Diff minimal |
| Placeholder tidak ada di repo | Markup dari halaman doc |

Detail: [anti-patterns.md](./anti-patterns.md)

---

## Workflow — implementasi UI

1. Baca `CLAUDE.md` + [patterns.md](./patterns.md) + [anti-patterns.md](./anti-patterns.md)
2. Resolve komponen dari `scripts/figma_component_registry.json`
3. Buka `src/GposLite/components/{Name}.tsx` — behavior/runtime
4. Buka `components/{Name}/{slug}.html` — visual/anatomy (**jangan skip**)
5. Baca `Docs/components/{slug}.md` + section `Docs/component-rules.md`
6. Token dari [tokens.md](./tokens.md) / `styles/tokens.css`
7. Edit **minimal** — output prefer diff
8. Jika tidak ada di repo → laporkan ke user, jangan invent

### Screen / dashboard

1. `components/Page layout/page-layout.html` — `#pl-layout-template`
2. `components/Navigation menu/navigation.html` — `ds-sidebar-nav-expand`
3. `components/Top & bottom Navigation/top-bottom-nav.html` — `ds-topnav--website`
4. Child: Page Header, Table, Banner, dll. dari registry
5. Skill: `Docs/figma-generate-skill.md` § Komposisi layar

---

## Workflow — Figma MCP (code → Figma)

```
@Docs/design.md
@Docs/figma-generate-skill.md
@Docs/ai/patterns.md
@scripts/figma_component_registry.json
@components/Page layout/page-layout.html
@.claude/figma/{id}.spec.json
```

| Command | Fungsi |
|---------|--------|
| `./.cursor/scripts/figma-prep.sh {id}` | Prep 1 komponen |
| `./.cursor/scripts/figma-prep-all.sh` | Prep 34 komponen |
| `python3 scripts/extract_figma_specs.py --validate` | Regenerate spec JSON |
| `python3 scripts/sync_component_doc_anatomy.py` | Sync Anatomy docs |

---

## Workflow — Figma Make (Figma → HTML)

1. `Docs/figma-make-skill.md` + `Docs/figma-make-context.md`
2. [colors.md](./colors.md) · [spacing.md](./spacing.md) · [typography.md](./typography.md)
3. [components.md](./components.md) + `Docs/components/{slug}.md`
4. Never invent variants outside documented HTML

---

## Stack scope

| Layer | Path | Status |
|-------|------|--------|
| Runtime | `src/GposLite/components/*.tsx` | **Canonical** — 34 komponen |
| Visual reference | `components/*/*.html` | Anatomy + variant matrix |
| Storybook / MDX | `src/stories/`, `foundations/*.mdx` | **Tidak aktif** — jangan jadikan source |

Hybrid: React runtime + HTML reference + Tailwind + CSS custom properties.

---

## HTML boilerplate

```html
<!DOCTYPE html>
<html lang="id">
<head>
  <link rel="stylesheet" href="../../styles/globals.css">
  <link rel="stylesheet" href="../../styles/enhancements.css">
  <script src="https://cdn.tailwindcss.com"></script>
  <script>/* tailwind.config mirror */</script>
  <style>/* .ds-* scoped — var(--token) only */</style>
</head>
```

---

## PR checklist

- [ ] Hanya file diminta yang diubah
- [ ] Class modifier sudah ada di halaman komponen target
- [ ] Token-only styling ([tokens.md](./tokens.md))
- [ ] Ikon dari `assets/icons/`
- [ ] `lang="id"` pada HTML baru
- [ ] A11y: [accessibility.md](./accessibility.md) checklist
- [ ] Responsive: [patterns.md](./patterns.md) decision matrix
- [ ] Elevation: `--shadow-1` atau `--shadow-md` sesuai referensi
- [ ] Contoh doc = markup aktual (bukan placeholder)

---

## Prioritas visual

1. Akurasi & konsistensi > kreativitas
2. Token system > anatomy > visual reference > struktur existing
3. Reuse komponen — compose, jangan reimplement
4. Premium SaaS dashboard — whitespace lapang, shadow minimal, GPOS Blue primary

Detail: `Docs/design-principles.md`

---

## File referensi cepat

| Kebutuhan | Path |
|-----------|------|
| Index AI docs | `Docs/ai/README.md` |
| Entry design | `Docs/design.md` |
| Component index | `Docs/components-index.md` |
| Registry JSON | `scripts/figma_component_registry.json` |
| Token CSS | `styles/tokens.css` |
| Tailwind | `tailwind.config.js` |
| Aturan agent | `CLAUDE.md` |
| Engineer mirror | `Docs/engineer-skill.md` |

---

## TODO

- [ ] Sinkron otomatis `skill.md` ↔ `engineer-skill.md` (saat ini manual cross-ref)
- [ ] `.claude/references/` — populate anatomy atau update status di semua docs
- [ ] Storybook exception note di `CLAUDE.md` vs runtime React

---

*Modular AI docs — `Docs/ai/`. Mirror implementasi checklist: `Docs/engineer-skill.md`.*
