# GPOS Lite V2 — Documentation Audit

> **⚠️ Dokumen historis (2026-06-04).** Banyak temuan di bawah sudah diselesaikan pada P0–P3 (2026-06-05).  
> **Gunakan sebagai referensi audit awal saja.** Untuk status terkini: `Docs/documentation-changes-summary.md`, `CLAUDE.md`, `Docs/components-index.md`, `Docs/figma-make-context.md`.

**Date:** 2026-06-04  
**Scope:** `Docs/design-system-knowledge.md`, `Docs/design-principles.md`, `Docs/component-rules.md`, `Docs/engineer-skill.md`, `Docs/figma-make-skill.md`  
**Compared against:** `CLAUDE.md`, `style_guide.md`, `styles/tokens.css`, `foundations/*`, `components/*`, `index.html`, `package.json`, `tailwind.config.js`  
**Method:** Read-only review; no existing doc files were modified.

---

## Executive summary

| Area | Verdict |
|---|---|
| Coverage vs repo (34 components, 7 foundations) | **Strong** — inventories match disk |
| Internal consistency across 5 docs | **Moderate** — heavy duplication; a few naming/shadow conflicts |
| Alignment with `CLAUDE.md` | **Good** with gaps — Storybook/JS, path casing, shadow usage |
| Accessibility guidance | **Partial** — ARIA catalog good; WCAG, keyboard, reduced-motion thin |
| Responsive guidance | **Partial** — dual breakpoints noted; per-component rules sparse |
| Variant & state completeness | **Uneven** — Button/Select rich; Avatar/Badge/Toast/Modal/Popup thin |

**Highest-priority doc gaps:** (1) no foundation pages for motion, z-index, or breakpoints despite tokens; (2) `shadow-1` vs `--shadow-md` tension not reconciled; (3) `docs/` vs `Docs/` path inconsistency; (4) `.claude/references/` cited but empty; (5) accessibility patterns in code (skip link, Escape, `prefers-reduced-motion`) not reflected in Docs.

---

## File-by-file audit

### 1. `Docs/design-system-knowledge.md`

**Role:** Canonical catalog (tokens, structure, components, a11y index).

| Check | Finding |
|---|---|
| Missing foundations | Documents 7 HTML foundations correctly. **Does not document:** `foundations/*/*.mdx` (Storybook MDX), motion/transition tokens (only listed in token table), z-index scale (token table only), dedicated breakpoint foundation |
| Missing components | **None** — 34/34 match `components/**/*.html` |
| Duplicate information | Component table (lines 392–427), per-component sections (431–667), and closing list (705–707) repeat the same inventory three times |
| Contradicting rules | Notes **dual breakpoints** (good) but does not prescribe when to use which |
| vs `CLAUDE.md` | Aligned on tokens, BEM, icons, no new tokens. **Gap:** cites `.claude/references/` as ✅ but folder is **empty** in repo |
| Accessibility | Strong ARIA matrix (198–249). **Missing:** WCAG contrast ratios, `prefers-reduced-motion`, skip links, Escape/keyboard contracts, `aria-modal` |
| Responsive | Grid foundation documented; Page Layout topnav variants noted. **Missing:** Tailwind breakpoint usage matrix; table/form responsive rules |
| Design constraints | Build gap (`styles/styles.css` missing) documented — good. **Missing:** min tap targets, max line length, content width |
| Component states | Summary tables per component; depth varies (Button deep, Badge/Avatar shallow) |
| Variant definitions | Mostly class-based; **Toggle** lists `--large` and `--lg` in engineer-skill cross-ref — implementation uses `--large` (copy text mentions `--lg`) |

**Strengths:** Accurate repo map, token line references, honest exceptions (Toast inline SVG, Modal/Popup naming).

---

### 2. `Docs/design-principles.md`

**Role:** Visual and interaction philosophy extracted from implementation.

| Check | Finding |
|---|---|
| Missing foundations | Covers colors, type, spacing, borders, shadow, grid, icons. **No sections for:** motion (tokens exist in `tokens.css`), z-index layering, breakpoints as first-class topic |
| Missing components | None listed as inventory; refers to knowledge base |
| Duplicate information | Overlaps knowledge base on: brand color, shadow-1, spacing categories, grid breakpoints, a11y bullets, focus ring |
| Contradicting rules | States **Shadow 1 only** in elevation (215) while implementation uses `--shadow-md` on multiple components (Select, Date Time Picker, Section Message, etc.) — not called out |
| vs `CLAUDE.md` | Consistent priorities (token → anatomy → visual). References `docs/design-system-knowledge.md` (**lowercase `docs/`**) while files live in **`Docs/`** |
| Accessibility | Philosophy section (266–306) duplicates knowledge base. **Missing:** measurable contrast, focus order, reduced motion |
| Responsive | Page layout + grid + dual breakpoints (40–41). **Missing:** component-level responsive beyond topnav |
| Design constraints | Good “avoid” lists from `style_guide.md`. **Missing:** explicit density/whitespace numbers beyond spacing philosophy |
| Component states | Interaction model (233–239) is clear globally; no per-component state catalog |
| Variant definitions | Variant vs state vs snapshot explained; no component-level variant tables |

**Strengths:** Coherent design language; documents sidebar/content contrast and implementation priority order.

---

### 3. `Docs/component-rules.md`

**Role:** Per-component DO/DON'T and structure for engineers.

| Check | Finding |
|---|---|
| Missing foundations | N/A (by design). Does not point engineers to MDX foundation stories |
| Missing components | **None** — all 34 have sections |
| Duplicate information | Global rules repeat engineer-skill + knowledge base; each component repeats variant lists also in knowledge base |
| Contradicting rules | **Tourguide:** recommends `shadow-md` (859) while global DS rule is `shadow-1` — conflicts with design-principles and figma-make |
| vs `CLAUDE.md` | Matches BEM, native inputs, token-only styling. **Soft conflict:** doc pages use inline `style=` in demos (allowed by CLAUDE “unless required”) but rules do not clarify doc-only exception |
| Accessibility | Per-component a11y rows are valuable. **Gaps:** Modal — “focus trap (script doc)” without `aria-modal`/`aria-labelledby`; Popup — only `aria-live`; Toast — dismiss `aria-label` when **no dismiss control** exists in `banner.html` |
| Responsive | **Page Layout** and **Top & Bottom Nav** only. Table, Form, Page Header lack breakpoint guidance |
| Design constraints | Strong DO/DON'T per component. **Missing:** Calendar month/week/day composed parts as variants |
| Component states | Documented unevenly: Button/Checkbox/Select rich; Badge, Lozenge, Toast, Popup, Modal list “—” for states |
| Variant definitions | Generally complete for documented components. **Gaps:** Avatar presence (element, not variant); Text Field conflates **types** (phone, icon, search) with **variants** |

**Strengths:** Actionable DO/DON'T; compose patterns (Date Picker → Select + Calendar).

---

### 4. `Docs/engineer-skill.md`

**Role:** Implementation checklist for engineers and AI agents.

| Check | Finding |
|---|---|
| Missing foundations | Table (71–81) lists 7 foundations — complete vs HTML. **Omits:** MDX, motion/z-index foundations (absent on disk) |
| Missing components | Compact table (104–138) — all 34 present |
| Duplicate information | Larangan table duplicates CLAUDE.md; a11y table duplicates knowledge base; HTML boilerplate unique |
| Contradicting rules | Authority order (12–18) is clear. **Toggle sizes:** lists `--large` / `--lg` (782) — code uses `--large`; copy examples use `--lg` |
| vs `CLAUDE.md` | **Storybook + `Button.js`:** documented (334) but CLAUDE says “No React” without Storybook exception — agents may over-apply ban |
| Accessibility | Practical snippets (183–234). **Missing:** when to add skip links; Escape handlers (present in Date/Select picker HTML only) |
| Responsive | Grid vs Tailwind noted (81). **Missing:** checklist item for responsive verification |
| Design constraints | Strong “larangan mutlak” table |
| Component states | Only via pointer to component-rules — no new gaps |
| Variant definitions | Summary only — defers to component-rules |

**Strengths:** Best workflow section (AI steps 314–321); authority hierarchy; PR checklist (296–310).

---

### 5. `Docs/figma-make-skill.md`

**Role:** Figma Make prompts — visual translation of repo.

| Check | Finding |
|---|---|
| Missing foundations | Mirrors 7 foundations + token tables. **Missing:** same motion/z-index/breakpoint foundation gaps |
| Missing components | All 34 in catalog (267–646) |
| Duplicate information | Largest overlap with design-principles + component-rules (colors, spacing, shadow, responsive frames) |
| Contradicting rules | **Shadow 1 only** (29, 65–71) vs many components using `shadow-md` in code — not documented for Figma |
| vs `CLAUDE.md` | Aligns on no new variants, Indonesia UI, anatomy folder. **References** `components/Tooltip/figma/*.png` — path may exist locally but **no PNG tracked** in repo snapshot used for audit |
| Accessibility | “Accessibility expectations (desain)” (246–263) — best contrast/focus/tap guidance of the set. **Still missing:** WCAG levels per pair, reduced motion |
| Responsive | **Strongest** doc for responsive — website/tablet/mobile frames (224–242) |
| Design constraints | Explicit Corner/Space tables, z-index table (210–220), compose patterns (667–676) |
| Component states | Global interaction table (652–661); per-component states in entries |
| Variant definitions | Good Figma-oriented variant lists; Avatar “presence online/offline” as states without color/token spec |

**Strengths:** Prompt template, z-index stack, compose patterns for screen types.

---

## Cross-cutting analysis (10 audit criteria)

### 1. Missing foundations

| Expected in DS | In repo | Documented in Docs |
|---|---|---|
| Colors | `foundations/colors/colors.html` | Yes |
| Typography | `foundations/typography/typography.html` | Yes |
| Spacing | `foundations/spacing/spacing.html` | Yes |
| Borders | `foundations/borders/borders.html` | Yes |
| Shadows | `foundations/shadows/shadows.html` | Yes |
| Grid | `foundations/grid/grid.html` | Yes |
| Icons | `foundations/icons/icons.html` | Yes |
| **Motion / transition** | `--transition-*` in `tokens.css` | Principles only — **no foundation page** |
| **Z-index** | `--z-*` in `tokens.css` | figma-make table only — **no foundation page** |
| **Breakpoints** | `--breakpoint-*` in `tokens.css` + grid page | Split across grid + tailwind — **no unified foundation** |
| **Focus** | Per-component CSS | Scattered — **no foundation** |
| **MDX / Storybook** | `foundations/*/*.mdx` | **Not documented** in any of the 5 files |

**Also referenced but absent:** `pages/`, `patterns/`, `templates/`, `navigation/` (correctly marked missing in knowledge base). `.claude/references/` is cited as anatomy source but **directory is empty**.

---

### 2. Missing components

**None.** All five files agree on 34 components; glob confirms 34 `*.html` under `components/`.

**Doc-only gaps (not missing components, missing *documentation depth*):**

| Component | Gap |
|---|---|
| Toast Banner | No dismiss UI in implementation; docs still mention dismiss a11y |
| Popup | Open/closed, focus management undocumented |
| Modal | No `aria-modal`, backdrop interaction, or disabled state |
| Avatar | Presence colors/states (online/offline/busy) not specified |
| Badge | No interaction states (correct if static) — not stated explicitly |

---

### 3. Duplicate information

| Topic | Files repeating it |
|---|---|
| 34-component list | All 5 (esp. knowledge ×3 internally) |
| Token / brand / shadow-1 | knowledge, principles, figma-make, engineer |
| Dual breakpoints | knowledge, principles, engineer, figma-make |
| BEM + Modal/Popup exceptions | knowledge, component-rules, engineer |
| ARIA role matrix | knowledge, principles, engineer, figma-make (shorter) |
| Larangan (no new tokens/components) | engineer, figma-make, CLAUDE |
| Grid 4/8/12 + margin 24 / gutter 16 | principles, knowledge, figma-make, engineer |

**Recommendation (for future doc maintenance, not applied here):** Keep full catalog in `design-system-knowledge.md` only; other files should link, not copy.

---

### 4. Contradicting rules (within Docs)

| Issue | Detail |
|---|---|
| **Elevation token** | principles / figma-make: standard = **Shadow 1 only**; codebase + component-rules Tourguide: **`--shadow-md`** widely used |
| **Toggle size class** | engineer-skill + component-rules: `--large` **and** `--lg`; HTML/CSS implements **`--large`** only |
| **Icon catalog count** | knowledge: 146 catalog vs 188 files — explained but easy to misread as error |
| **Avatar variants** | knowledge: “—”; figma-make: presence as **states**; component-rules: presence as **element** — compatible but inconsistent terminology |
| **Select scope** | knowledge implies full select; component-rules: doc focuses **Option Part** — readers may think Select is incomplete |

---

### 5. Rules conflicting with `CLAUDE.md`

| CLAUDE.md rule | Doc behavior | Severity |
|---|---|---|
| No React / Vue | Storybook `Button.js` documented without “doc toolchain exception” | Medium — clarify in engineer-skill + CLAUDE cross-ref |
| No unnecessary JavaScript | Heavy inline scripts on component pages not discussed | Low — doc pages vs product |
| Avoid inline styles | Widespread `style=` on doc shells not flagged as doc-only | Low |
| Never estimate spacing if anatomy exists | All docs cite `.claude/references/` but folder **empty** | High — agents lack anatomy |
| No new tokens | Docs consistent | OK |
| Semantic token utilities only | Docs consistent | OK |
| `docs/*.md` paths in CLAUDE | Files live under **`Docs/`** (case) | Medium on Linux/CI |

---

### 6. Missing accessibility guidance

**Documented well:** `lang="id"`, native form controls, ARIA roles for custom widgets, focus ring tokens, icon decorative patterns, `role="alert"` for errors.

**In codebase but not in Docs:**

| Pattern | Example location |
|---|---|
| `prefers-reduced-motion` | `button.html`, `index.html`, `colors.html`, `table.html` |
| Skip link | `table.html` (`.skip-link`) |
| Escape closes overlay | `select.html`, `date-picker.html`, `date-time-picker.html` |
| WCAG AA badges in UI | `button.html`, `colors.html`, `form.html` |
| WCAG checklist | `README.md` only — not in Docs |

**Missing globally:**

- Minimum contrast ratios (4.5:1 body, 3:1 large text)
- Focus order / tabindex policy beyond table scroll region
- `aria-modal`, `aria-labelledby` / `aria-describedby` pairing rules for Modal
- Live region politeness levels (`assertive` vs `polite`)
- Keyboard roving tabindex for Tabs/menus (only roles listed)
- Screen reader text for loading/skeleton states

---

### 7. Missing responsive behavior guidance

**Documented:** Grid foundation breakpoints; Page Layout / Topnav `--website|--tablet|--mobile`; figma-make three-frame guidance; dual Tailwind vs grid note.

**Missing:**

- Decision rule: *layout mockups → grid breakpoints; utility classes → Tailwind screens*
- Component behavior: Table horizontal scroll, Form stacking, Page Header toolbar wrap, Modal width on mobile
- Typography scaling across breakpoints (Poppins sizes fixed)
- Touch targets on `--compact` / `--icon-only` (figma-make mentions comfort; no px)
- `pages/`, `patterns/`, `templates/` referenced in `tailwind.config.js` content paths — no responsive patterns doc

---

### 8. Missing design constraints

| Constraint | Status in Docs |
|---|---|
| Brand hex / tokens | Documented |
| One primary CTA per area | Documented (Button, figma-make) |
| Max 2 Section Message actions | Documented |
| Modal max 2 footer actions | Documented |
| Spacing scale only Space.* / spacing.* | Documented |
| **Min touch target (e.g. 44px)** | Not specified |
| **Max content / prose width** | Not specified |
| **Modal body length / scroll** | Partial (DON'T long text) |
| **Icon stroke width / grid** | Not specified |
| **Truncation / line-clamp** | Tooltip variants only |
| **Build pipeline** (`styles/styles.css` missing) | knowledge only |
| **npm scripts broken input** | knowledge only — engineer checklist silent |

---

### 9. Missing component states

| Component | Documented states | Gap |
|---|---|---|
| Button | hover, focus, press, disabled, loading, selected | OK |
| Select / Dropdown | loading, typing, empty, selected, … | OK |
| Checkbox / Radio / Toggle | checked, indeterminate, error, … | OK |
| Modal | — | No open/closed, no backdrop, no focus trap spec |
| Popup | — | No open/closed |
| Toast Banner | — | No dismiss/interaction |
| Badge | — | OK if static — should say “non-interactive” |
| Avatar | — | Presence on/off not tokenized |
| Flags | collapsed + semantic | OK |
| Calendar | day states | Composed month/week/day layouts not mapped to states |
| Tourguide | button hover/focus | No “step active” variant class |

**Doc vs production state modifiers:** All files explain `--hover`/`--focus`/`--press` are **documentation matrix** classes; production uses pseudo-classes — good, but easy to miss in figma-make “States” tables.

---

### 10. Missing variant definitions

| Component | Issue |
|---|---|
| Toggle | `--lg` documented, `--large` implemented |
| Text Field | Types (`ds-phone-field`, etc.) vs modifiers (`--compact`) not separated in knowledge base |
| Calendar | “month/week/day parts + composed” in component-rules purpose — variants not enumerated |
| Select | Trigger variants long in component-rules; knowledge base shorter |
| Navigation Menu | Many snap modifiers — only in component-rules |
| Page Layout | `--menu-expand`, `--submenu-on` in component-rules / figma-make — absent from knowledge component table |
| Tooltip | Position matrix in knowledge; figma PNG refs may be missing from repo |
| Table | Column **types** (`ds-table-col-text|link|status`) — component-rules only |

---

## Path and reference integrity

| Reference | Issue |
|---|---|
| `docs/*.md` in body text | Actual folder: **`Docs/`** (case mismatch vs `CLAUDE.md` lines 187–191) |
| `style_guide.md` | Exists at repo root — OK |
| `components/Tooltip/figma/` | Cited in figma-make; verify on disk when committing assets |
| `.claude/references/` | Cited in all docs + CLAUDE; **empty** — anatomy workflow non-functional |
| `README.md` | Outdated paths (`css/styles.css`) — **not** in audit scope but conflicts with knowledge base for new contributors |

---

## Severity matrix (recommended fix order)

| Priority | Item | Affected files |
|---|---|---|
| P0 | Align `Docs/` vs `docs/` paths everywhere (including `CLAUDE.md`) | All + CLAUDE |
| P0 | Document or populate `.claude/references/`; until then, stop claiming anatomy ✅ | knowledge, principles, engineer, figma-make, CLAUDE |
| P1 | Reconcile **shadow-1** policy with `--shadow-md` usage in components | principles, figma-make, component-rules |
| P1 | Fix Toggle `--lg` vs `--large`; Toast dismiss a11y vs implementation | component-rules, engineer-skill, knowledge |
| P2 | Add accessibility appendix: WCAG, reduced motion, keyboard, skip links | New section or engineer-skill |
| P2 | Add responsive decision matrix + 2–3 component examples (Table, Form) | figma-make or engineer-skill |
| P3 | Document motion/z-index/breakpoint tokens (foundation pages or knowledge sections) | knowledge |
| P3 | Deduplicate component inventory in knowledge base | knowledge |
| P3 | Document `foundations/*.mdx` + Storybook scope | engineer-skill |
| P4 | Clarify Storybook/React exception vs CLAUDE “No React” | engineer-skill, CLAUDE |

---

## Per-file scores (1–5)

| File | Complete | Consistent | A11y | Responsive | Variants/states |
|---|---|---|---|---|---|
| design-system-knowledge.md | 5 | 3 | 4 | 3 | 4 |
| design-principles.md | 4 | 3 | 3 | 3 | 2 |
| component-rules.md | 5 | 4 | 4 | 3 | 4 |
| engineer-skill.md | 4 | 4 | 3 | 2 | 3 |
| figma-make-skill.md | 5 | 3 | 4 | 5 | 4 |

---

## Conclusion

The five documentation files form a **coherent, implementation-faithful** description of GPOS Lite V2: component count, foundation set, token system, and most ARIA patterns match the repository. The main weaknesses are **redundancy across files**, a few **internal inconsistencies** (shadow, toggle naming, toast dismiss), **incomplete accessibility and responsive playbooks** relative to what already exists in HTML, and **broken or misleading references** (`docs/` casing, empty anatomy folder, optional figma PNG paths).

No additional product components or HTML foundations were found on disk beyond what the docs claim; gaps are predominantly **documentation depth** (motion, z-index, breakpoints, keyboard, WCAG) and **alignment** with `CLAUDE.md` and actual CSS usage—not missing UI inventory.

---

*Generated as read-only audit. Existing documentation files were not modified.*
