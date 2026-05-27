# GPOS Lite Design System Rules

---

# Scope Rules

- Focus only requested task
- Focus only requested file
- Do not scan unrelated files
- Do not analyze unrelated components
- Modify existing file only
- Do not create new architecture
- Do not rewrite full component unless requested
- Do not modify unrelated code
- Do not refactor unrelated sections

---

# Tech Rules

- Tailwind CSS only
- No React
- No Vue
- No Mantine
- No external UI library
- No inline style unless required
- No CSS module
- No styled-components
- No unnecessary JavaScript

---

# Token Rules

- Use existing semantic color token only
- Use existing spacing token only
- Use existing typography token only
- Use existing border radius token only
- Use existing shadow token only
- Use existing z-index token only
- No hardcoded color
- No hardcoded spacing
- No hardcoded radius
- No hardcoded shadow
- Do not create new token

---

# Structure Rules

- Preserve existing foundation
- Preserve existing architecture
- Preserve existing HTML structure
- Preserve existing component structure
- Preserve existing class naming if possible
- Preserve existing accessibility structure
- Avoid unnecessary DOM changes
- Avoid unnecessary wrapper div

---

# Icon Rules

- Use icons from assets/icons only
- Do not create new icons
- Do not use external icon library
- Preserve existing icon sizing system

---

# Anatomy Precision Rules

- Follow anatomy reference exactly
- Use exact spacing from anatomy spec
- Use exact padding values from reference
- Use exact gap values from reference
- Use exact min-width from reference
- Use exact height from reference
- Use exact icon spacing from reference
- Use exact alignment from reference

If anatomy reference exists:
- anatomy reference becomes source of truth
- never estimate spacing manually
- never approximate dimensions
- never improvise layout density

Priority:
1. Existing token system
2. Anatomy spec
3. Visual reference
4. Existing structure

Do not:
- visually approximate
- guess spacing
- invent layout values
- create alternative proportions

---

# Figma Rules

- Use Figma as visual reference only
- Do not copy raw Figma structure
- Avoid absolute positioning unless required
- Translate Figma into clean production HTML
- Prioritize clean layout implementation

---

# UI Quality Rules

- Maintain premium visual quality
- Improve spacing consistency
- Improve visual hierarchy
- Improve typography readability
- Improve accessibility if possible
- Improve hover state
- Improve focus state
- Improve active state
- Improve loading state
- Improve disabled state
- Improve microinteraction carefully
- Maintain clean alignment
- Maintain consistent spacing rhythm

---

# Accessibility Rules

- Preserve semantic HTML
- Preserve keyboard accessibility
- Preserve focus visibility
- Use accessible button behavior
- Avoid accessibility regression

---

# Visual Accuracy Rules

- Match visual hierarchy exactly
- Match component density exactly
- Match whitespace rhythm exactly
- Match Figma proportions exactly
- Match interaction behavior closely
- Match optical alignment closely

Prefer:
- accuracy over creativity
- consistency over redesign
- implementation fidelity over interpretation

Avoid:
- redesigning UI
- modernizing layout
- adding stylistic improvisation
- changing component personality

---

# Performance Rules

- Avoid unnecessary complexity
- Avoid unnecessary DOM nesting
- Avoid unnecessary animation
- Avoid unnecessary dependency
- Keep implementation lightweight

---

# Response Style Rules

- Give concise answer only
- Direct to implementation
- Do not explain basic concepts unless requested
- Avoid long reasoning
- Avoid repeating user request
- Avoid unnecessary summary
- Avoid tutorial style explanation
- Focus on actionable output

---

# Code Response Rules

- Show modified code only
- Prefer diff format
- Do not rewrite full file for small changes
- Show only affected function/block/component
- Do not output unchanged code
- Keep response minimal
- Avoid large unnecessary snippet

---

# Communication Rules

Avoid phrases like:
- "Sure, here's the code..."
- "Here is the implementation..."
- "Hope this helps"
- "Let me know if you need..."
- "As requested..."
- "I will help you..."

Start directly from result.

---

# Token Efficiency Rules

- Minimize token usage
- Avoid verbose explanation
- Avoid duplicate code
- Avoid unnecessary comments
- Focus only requested change
- Stop after solution is complete
- Avoid regenerating existing code
- Avoid repeating context

---

# Reference Rules

Reference images inside:
- .claude/references/

may contain:
- visual reference
- anatomy reference
- interaction reference
- responsive reference

When reference exists:
- use reference as implementation source
- do not reinterpret design
- do not simplify anatomy
- do not recreate spacing manually

Preferred workflow:
1. Read anatomy reference
2. Read visual reference
3. Match tokens
4. Implement in existing structure

---

# Dashboard UI Rules

- Maintain clean SaaS dashboard aesthetic
- Prefer soft surface layering
- Prefer subtle hierarchy separation
- Prefer spacious but controlled layout density
- Maintain consistent card structure
- Maintain consistent sidebar rhythm
- Maintain clean navigation hierarchy
- Maintain premium whitespace distribution

Avoid:
- excessive decoration
- strong shadows
- inconsistent card radius
- uneven spacing
- crowded layout
- random visual treatment

---

# Preferred Output Format

Prefer:

```diff
- old code
+ new code

---

If exact anatomy exists,
never optimize spacing subjectively.