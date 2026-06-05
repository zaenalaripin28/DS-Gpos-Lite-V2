#!/usr/bin/env bash
# Prep full GPOS Lite Figma library build (all 34 components).
# Usage: ./.cursor/scripts/figma-prep-all.sh

set -euo pipefail

ROOT="$(git rev-parse --show-toplevel 2>/dev/null || pwd)"
cd "$ROOT"

MANIFEST=".claude/figma-library-manifest.json"

echo "🔍 Figma library prep — GPOS Lite DS V2 (34 components)"
echo ""

# Always refresh specs from source of truth
echo "⚙️  Extracting specs from HTML + CSS + tokens..."
python3 scripts/extract_figma_specs.py --validate
echo ""

if [[ ! -f "$MANIFEST" ]]; then
  echo "✗ Manifest not found: $MANIFEST"
  exit 1
fi

python3 <<'PY'
import json
from pathlib import Path

manifest = json.loads(Path(".claude/figma-library-manifest.json").read_text())
print(f"📦 Library: {manifest['figmaFrame']['name']}")
print(f"   Components: {manifest['componentCount']}")
print()

for phase in manifest["buildPhases"]:
    ids = phase.get("componentIds", [])
    if not ids:
        continue
    print(f"── {phase['label']} ({len(ids)}) ──")
    for cid in ids:
        comp = next(c for c in manifest["components"] if c["id"] == cid)
        png = "📷" if comp["hasFigmaPng"] else "  "
        print(f"  {png} {comp['name']:22} .{comp['rootClass']:28} "
              f"v={comp['variantCount']} s={comp['sizeCount']} t={comp['tokenCount']}")
    print()
PY

echo "📌 Global @-mentions"
GLOBAL=(
  "Docs/figma-generate-skill.md"
  "Docs/figma-make-context.md"
  "Docs/component-rules.md"
  "Docs/components-index.md"
  ".claude/figma-library-manifest.json"
  "styles/tokens.css"
  "styles/gp-lite-design-tokens.json"
  "scripts/figma_component_registry.json"
)
for f in "${GLOBAL[@]}"; do
  [[ -f "$f" ]] && echo "  @$f"
done
echo "  @.claude/figma/*.spec.json  (34 files)"
echo ""

echo "📁 Per-component specs"
ls -1 .claude/figma/*.spec.json | sed 's/^/  @/'
echo ""

echo "🤖 Full library prompt template"
echo "────────────────────────────────────────────────────────"
cat <<'EOF'
Build GPOS Lite DS V2 — complete Figma component library (1 frame)

Global @-mentions:
  @Docs/figma-generate-skill.md
  @Docs/figma-make-context.md
  @Docs/component-rules.md
  @.claude/figma-library-manifest.json
  @styles/tokens.css
  @styles/gp-lite-design-tokens.json

Per-component specs: @.claude/figma/{id}.spec.json (all 34)

Rules (100% fidelity):
- NEVER improvise colors, spacing, radius, typography, or variants
- Each component MUST match its .spec.json anatomy (resolved token values)
- Build in phase order from figma-library-manifest.json buildPhases
- One component per use_figma batch — checkpoint every 5 components
- Bind all visual properties to Figma Variables mapped to CSS tokens
- Icons from assets/icons/ only

Frame structure:
  GPOS Lite DS V2 — Component Library
  ├── Foundations (reference pages)
  ├── Atoms
  ├── Inputs
  ├── Molecules
  ├── Feedback & Overlays
  ├── Data
  ├── Navigation
  └── Layout & Shell

Workflow:
  Phase 0: Discovery — inspect Figma file + read manifest
  Phase 1: Create/verify all Design Token variables from tokens.css
  Phase 2: Build components per buildPhases order (use spec JSON per component)
  Phase 3: QA — screenshot each section, compare to components/*/figma/*.png if available

Checkpoint: after each buildPhases section, await approval before next.
EOF
echo "────────────────────────────────────────────────────────"
echo ""
echo "✨ Ready. Copy prompt above → paste into Cursor → start Phase 0."
