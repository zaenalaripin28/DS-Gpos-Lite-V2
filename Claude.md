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

# Preferred Output Format

Prefer:

```diff
- old code
+ new code