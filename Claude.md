# GPOS Lite Design System Rules

## Scope

* Focus only requested task and file
* Do not modify unrelated code
* Do not refactor unrelated sections
* Modify existing structure only
* Do not create new architecture unless requested

---

## Tech

* Tailwind CSS only
* No React / Vue / Mantine
* No external UI library
* No unnecessary JavaScript
* Avoid inline styles unless required

---

## Token System

* Use existing design tokens only
* No hardcoded color, spacing, radius, shadow, or z-index
* Do not create new tokens

Priority:

1. Existing token system
2. Anatomy spec
3. Visual reference
4. Existing structure

---

## Structure

* Preserve existing foundation and architecture
* Preserve semantic HTML and accessibility
* Preserve component structure and class naming if possible
* Avoid unnecessary DOM changes or wrapper elements

---

## Icons

* Use icons from `assets/icons` only
* Do not use external icon libraries
* Preserve existing icon sizing system

---

## Figma & References

* Use Figma as visual reference only
* Do not copy raw Figma structure
* Translate into clean production HTML
* Avoid absolute positioning unless required

Optional anatomy folder (may be empty):
`.claude/references/`

Until files exist there, use `foundations/*/*.html`, `components/*/*.html`, and `components/*/figma/` as proportion references.

**Screen / dashboard tasks:** resolve paths from `scripts/figma_component_registry.json`, then read `components/Page layout/page-layout.html`, `components/Navigation menu/navigation.html`, and `components/Top & bottom Navigation/top-bottom-nav.html` before composing. Sidebar app = `ds-sidebar-nav-expand` (white `--color-neutral-n0`), not `--sidebar-*` doc tokens. Details: `Docs/figma-generate-skill.md`, `Docs/component-rules.md` § Komposisi layar.

If anatomy reference exists in `.claude/references/`:

* treat it as source of truth
* never estimate spacing or dimensions
* never improvise layout proportions

---

## UI Quality

Maintain:

* visual hierarchy
* spacing consistency
* typography readability
* accessibility
* hover / focus / active / disabled states
* clean alignment
* premium dashboard aesthetic

Avoid:

* redesigning UI
* stylistic improvisation
* excessive decoration
* inconsistent spacing or radius
* unnecessary animation

Prefer:

* accuracy over creativity
* consistency over redesign
* implementation fidelity over interpretation

---

## Performance

* Keep implementation lightweight
* Avoid unnecessary complexity, dependency, animation, or DOM nesting

---

## Response Style

* Give concise implementation-focused responses
* Show modified code only
* Prefer diff format
* Avoid rewriting full files for small changes
* Avoid long explanations or repeated context

Preferred output:

```diff
- old code
+ new code
```

## Foundation Documentation Rules

### Existing Foundation

* Foundations already exist and are the source of truth.
* Never recreate foundations.
* Never generate new foundation examples unless explicitly requested.
* Never create new design tokens.
* Never modify existing design tokens.
* Never modify Tailwind configuration unless explicitly requested.

### Foundation Examples

* Use existing implementation as the source of truth.
* Code examples must reflect the actual implementation shown on the page.
* Do not invent alternative code examples.
* Do not generate placeholder code.
* Do not generate hypothetical implementations.

### Foundation Page Changes

* Preserve existing layout.
* Preserve existing hierarchy.
* Preserve existing navigation.
* Preserve existing styling.
* Preserve existing responsiveness.
* Preserve existing section structure.
* Do not redesign foundation pages.
* Do not refactor unrelated code.

### Reusability

* Reuse existing components whenever possible.
* Reuse existing tokens whenever possible.
* Reuse existing utilities whenever possible.
* Avoid duplicate implementations.

### Documentation Features

When adding documentation features (Code Copy, Code Preview, Code Block, Playground, Usage Example):

* Attach them to the existing implementation.
* Do not create new examples when an existing example is available.
* Display the actual code used by the example.
* Keep documentation synchronized with the implementation.

### Tailwind Rules

Tailwind CSS only.
Do not use Mantine.
Do not use Bootstrap.
Do not use external UI libraries.
Do not use React components.
Do not use inline styles unless explicitly required.

Never use raw Tailwind colors.
Always use semantic token utilities.

---

## Design System Knowledge Sources

Before implementing Design System related changes, reference:

* Docs/design.md
* Docs/ai/skill.md (AI entry point — modular: tokens, colors, spacing, typography, components, patterns, anti-patterns, accessibility)
* Docs/design-system-knowledge.md
* Docs/design-principles.md
* Docs/component-rules.md
* Docs/engineer-skill.md
* Docs/figma-make-skill.md

These files describe the current repository implementation and should be treated as Design System documentation.