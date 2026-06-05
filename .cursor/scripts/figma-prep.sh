#!/usr/bin/env bash
# Prep Figma task context for a single GPOS Lite component.
# Usage: ./.cursor/scripts/figma-prep.sh button
#        ./.cursor/scripts/figma-prep.sh Button

set -euo pipefail

ROOT="$(git rev-parse --show-toplevel 2>/dev/null || pwd)"
cd "$ROOT"

INPUT="${1:-}"
if [[ -z "$INPUT" ]]; then
  echo "Usage: ./.cursor/scripts/figma-prep.sh <component-id|ComponentName>"
  echo "Example: ./.cursor/scripts/figma-prep.sh button"
  exit 1
fi

# Normalize: Button → button
COMPONENT_ID="$(echo "$INPUT" | tr '[:upper:]' '[:lower:]' | tr ' ' '-')"

MANIFEST=".claude/figma-library-manifest.json"
SPEC=".claude/figma/${COMPONENT_ID}.spec.json"
REGISTRY="scripts/figma_component_registry.json"

echo "🔍 Figma prep: $COMPONENT_ID"
echo ""

# Regenerate specs if missing or stale
if [[ ! -f "$SPEC" ]]; then
  echo "⚙️  Spec missing — extracting from source..."
  python3 scripts/extract_figma_specs.py --component "$COMPONENT_ID"
  echo ""
fi

if [[ ! -f "$SPEC" ]]; then
  echo "✗ Unknown component: $COMPONENT_ID"
  echo "  Available ids in $REGISTRY"
  python3 -c "import json; r=json.load(open('$REGISTRY')); print('  ', '\n   '.join(c['id'] for c in r['components']))"
  exit 1
fi

# Read metadata from spec
read -r NAME ROOT_CLASS LAYER HTML REACT DOC <<< "$(python3 -c "
import json
s=json.load(open('$SPEC'))
m=s['meta']
print(m['component'], m['rootClass'], m['layer'], m['sourceOfTruth']['html'], m['sourceOfTruth'].get('react',''), m['sourceOfTruth'].get('doc',''))
")"

VARIANTS="$(python3 -c "import json; s=json.load(open('$SPEC')); print(', '.join(s['anatomy']['variants'].keys()) or '—')")"
SIZES="$(python3 -c "import json; s=json.load(open('$SPEC')); print(', '.join(s['anatomy']['sizes'].keys()) or '—')")"
STATES="$(python3 -c "import json; s=json.load(open('$SPEC')); print(', '.join(s['anatomy']['states'].keys()) or '—')")"
TOKENS="$(python3 -c "import json; s=json.load(open('$SPEC')); print(s['tokens']['count'])")"

echo "📋 Component"
echo "  Name:       $NAME"
echo "  Root:       .$ROOT_CLASS"
echo "  Layer:      $LAYER"
echo "  Variants:   $VARIANTS"
echo "  Sizes:      $SIZES"
echo "  States:     $STATES"
echo "  Tokens:     $TOKENS"
echo ""

# File checks
check() { [[ -f "$1" ]] && echo "  ✅ $1" || echo "  ⚠️  $1 (missing)"; }

echo "📁 Source files"
check "$SPEC"
check "Docs/figma-generate-skill.md"
check "Docs/figma-make-context.md"
check "Docs/component-rules.md"
check "$HTML"
check "$REACT"
check "$DOC"
check "styles/tokens.css"
check "styles/gp-lite-design-tokens.json"

REACT_BASE="$(basename "$REACT" .tsx)"
CODE_CONNECT="src/GposLite/components/${REACT_BASE}.figma.ts"
if [[ -f "$CODE_CONNECT" ]]; then
  echo "  ✅ $CODE_CONNECT"
else
  echo "  ⚠️  $CODE_CONNECT (optional — not yet created)"
fi
echo ""

echo "📌 @-mentions (paste into prompt)"
MENTIONS=(
  "Docs/figma-generate-skill.md"
  "Docs/figma-make-context.md"
  "Docs/component-rules.md"
  "$SPEC"
  "$DOC"
  "$HTML"
  "$REACT"
  "styles/tokens.css"
  "styles/gp-lite-design-tokens.json"
)
for f in "${MENTIONS[@]}"; do
  [[ -f "$f" ]] && echo "  @$f"
done
echo ""

echo "🤖 Prompt template"
echo "────────────────────────────────────────────────────────"
cat <<EOF
Build Figma component: $NAME

@-mentions:
$(for f in "${MENTIONS[@]}"; do [[ -f "$f" ]] && echo "  @$f"; done)

Rules (100% fidelity — no improvisation):
- Copy anatomy from $SPEC — use resolved token values only
- Root class: .$ROOT_CLASS — do not invent new class names
- Variants: $VARIANTS | Sizes: $SIZES | States: $STATES
- Bind Figma variables to CSS tokens from styles/tokens.css
- Icons from assets/icons/ only
- No new colors, spacing, radius, or typography

Workflow (Docs/figma-generate-skill.md):
1. Phase 0: Discovery — read all @-mentions, compare spec vs Figma file
2. Phase 1: Variables — verify/create token bindings
3. Phase 2: Build component + variant matrix — checkpoint screenshot
4. Phase 3: Validate proportions against spec JSON

Output: Figma component instance linked to design tokens.
EOF
echo "────────────────────────────────────────────────────────"
