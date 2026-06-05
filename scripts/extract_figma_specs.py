#!/usr/bin/env python3
"""
Extract Figma-ready component specs from GPOS Lite source of truth.

Parses:
  - styles/tokens.css + styles/gp-lite-design-tokens.json
  - components/*/*.html (<style> blocks)
  - src/GposLite/styles/*.css (runtime mirror)
  - scripts/figma_component_registry.json

Output:
  - .claude/figma/{id}.spec.json (per component)
  - .claude/figma-library-manifest.json (full library)

Usage:
  python scripts/extract_figma_specs.py
  python scripts/extract_figma_specs.py --component button
  python scripts/extract_figma_specs.py --validate
"""

from __future__ import annotations

import argparse
import json
import re
import sys
from datetime import datetime, timezone
from pathlib import Path
from typing import Any

PROJECT_ROOT = Path(__file__).resolve().parent.parent
REGISTRY_PATH = PROJECT_ROOT / "scripts" / "figma_component_registry.json"
TOKENS_JSON_PATH = PROJECT_ROOT / "styles" / "gp-lite-design-tokens.json"
TOKENS_CSS_PATH = PROJECT_ROOT / "styles" / "tokens.css"
OUTPUT_DIR = PROJECT_ROOT / ".claude" / "figma"
MANIFEST_PATH = PROJECT_ROOT / ".claude" / "figma-library-manifest.json"

STATE_MODIFIERS = {
    "hover", "focus", "press", "pressed", "disabled", "loading", "selected",
    "snapshot", "invalid", "valid", "typing", "empty", "filled", "reset",
    "hydrate", "searching", "active", "on", "off", "checked", "indeterminate",
    "error", "state-hover", "state-pressed", "state-focus",
}
SIZE_MODIFIERS = {
    "sm", "md", "lg", "xl", "xs", "2xl", "3xl", "compact", "large", "icon-only",
}

VAR_RE = re.compile(r"var\(\s*(--[\w-]+)\s*(?:,\s*([^)]+))?\)")
TOKEN_IN_VALUE_RE = re.compile(r"var\(\s*(--[\w-]+)")
ICON_RE = re.compile(r"assets/icons/(icon-[\w-]+\.svg)")
CLASS_RE = re.compile(
    r'class="([^"]*(?:ds-|modal-|popup-)[^"]*)"', re.IGNORECASE
)
FIGMA_COMMENT_RE = re.compile(
    r"/\*[^*]*Figma\s+(?:source|properties)[^*]*\*/", re.IGNORECASE | re.DOTALL
)
PX_COMMENT_RE = re.compile(r"/\*\s*(\d+(?:\.\d+)?)\s*px\s*\*/")
REM_TO_PX_BASE = 16.0


def load_json(path: Path) -> dict[str, Any]:
    with path.open(encoding="utf-8") as f:
        return json.load(f)


def parse_tokens_css(path: Path) -> dict[str, str]:
    """Parse :root tokens from tokens.css (including multi-line shadow)."""
    content = path.read_text(encoding="utf-8")
    tokens: dict[str, str] = {}
    for match in re.finditer(
        r"(--[\w-]+)\s*:\s*([^;]+);", content, re.MULTILINE
    ):
        name, value = match.group(1), match.group(2).strip()
        tokens[name] = re.sub(r"\s+", " ", value)
    return tokens


def merge_tokens() -> dict[str, str]:
    tokens: dict[str, str] = {}
    if TOKENS_JSON_PATH.exists():
        data = load_json(TOKENS_JSON_PATH)
        tokens.update(data.get("tokens", {}))
    tokens.update(parse_tokens_css(TOKENS_CSS_PATH))
    return tokens


def rem_to_px(value: str) -> str | None:
    m = re.match(r"^(-?\d+(?:\.\d+)?)rem$", value.strip())
    if m:
        px = float(m.group(1)) * REM_TO_PX_BASE
        if px == int(px):
            return f"{int(px)}px"
        return f"{px:.2f}px"
    return None


def resolve_value(value: str, tokens: dict[str, str], depth: int = 0) -> dict[str, Any]:
    """Resolve CSS value to token reference + computed display value."""
    if depth > 8:
        return {"raw": value, "resolved": value, "tokens": []}

    original = value.strip()
    used_tokens: list[str] = []

    def _resolve_single(v: str) -> str:
        nonlocal used_tokens
        v = v.strip()
        while True:
            m = VAR_RE.search(v)
            if not m:
                break
            token_name = m.group(1)
            fallback = (m.group(2) or "").strip()
            used_tokens.append(token_name)
            replacement = tokens.get(token_name, fallback or token_name)
            v = v[: m.start()] + replacement + v[m.end() :]
        px = rem_to_px(v)
        if px:
            return px
        return v

    resolved = _resolve_single(original)
    unique_tokens = list(dict.fromkeys(used_tokens))

    entry: dict[str, Any] = {
        "raw": original,
        "resolved": resolved,
    }
    if unique_tokens:
        entry["tokens"] = unique_tokens
        if len(unique_tokens) == 1 and resolved == tokens.get(unique_tokens[0], resolved):
            entry["token"] = unique_tokens[0]
            entry["tokenValue"] = tokens.get(unique_tokens[0])
    return entry


def extract_style_blocks(html: str) -> str:
    blocks = re.findall(r"<style[^>]*>(.*?)</style>", html, re.DOTALL | re.IGNORECASE)
    return "\n".join(blocks)


def parse_css_rules(css: str) -> list[dict[str, Any]]:
    """Parse CSS into selector + declarations (merge duplicate selectors)."""
    css = re.sub(r"/\*.*?\*/", "", css, flags=re.DOTALL)
    merged: dict[str, dict[str, dict[str, Any]]] = {}
    for chunk in re.split(r"(?<=})\s*", css):
        chunk = chunk.strip()
        if not chunk or "{" not in chunk:
            continue
        selector, body = chunk.split("{", 1)
        selector = re.sub(r"\s+", " ", selector.strip())
        body = body.rsplit("}", 1)[0].strip()
        if not selector or not body:
            continue
        if selector not in merged:
            merged[selector] = {}
        for decl in body.split(";"):
            decl = decl.strip()
            if not decl or ":" not in decl:
                continue
            prop, val = decl.split(":", 1)
            prop, val = prop.strip(), val.strip()
            if prop and val:
                merged[selector][prop] = {"raw": val}
    return [
        {"selector": sel, "declarations": decls}
        for sel, decls in merged.items()
        if decls
    ]


def classify_modifier(class_name: str, root_class: str) -> tuple[str, str] | None:
    """Return (category, name) for BEM modifier on root block."""
    root = root_class.lstrip(".")
    if not class_name.startswith(root + "--"):
        return None
    mod = class_name[len(root) + 2 :]
    if mod in STATE_MODIFIERS or mod.startswith("state-"):
        return ("state", mod)
    if mod in SIZE_MODIFIERS:
        return ("size", mod)
    return ("variant", mod)


def extract_classes_from_html(html: str) -> dict[str, int]:
    counts: dict[str, int] = {}
    for match in CLASS_RE.finditer(html):
        for cls in match.group(1).split():
            if cls.startswith(("ds-", "modal-", "popup-")):
                counts[cls] = counts.get(cls, 0) + 1
    return dict(sorted(counts.items(), key=lambda x: (-x[1], x[0])))


def extract_icons(html: str) -> list[str]:
    return sorted(set(ICON_RE.findall(html)))


def extract_figma_comments(css: str) -> list[str]:
    return [m.group(0).strip() for m in FIGMA_COMMENT_RE.finditer(css)]


def extract_size_annotations(css: str) -> list[dict[str, str]]:
    """Parse comments like 'Size: Extra Large — 96px'."""
    annotations: list[dict[str, str]] = []
    for line in css.splitlines():
        m = re.search(
            r"Size:\s*([^—\-]+)[—\-]+\s*(\d+(?:\.\d+)?)\s*px", line, re.IGNORECASE
        )
        if m:
            annotations.append({
                "label": m.group(1).strip(),
                "px": f"{m.group(2)}px",
            })
    return annotations


def build_component_spec(
    entry: dict[str, Any], tokens: dict[str, str]
) -> dict[str, Any]:
    html_path = PROJECT_ROOT / entry["htmlPath"]
    css_path = PROJECT_ROOT / entry.get("reactCssPath", "")

    if not html_path.exists():
        raise FileNotFoundError(f"Missing HTML: {html_path}")

    html = html_path.read_text(encoding="utf-8")
    html_css = extract_style_blocks(html)
    react_css = css_path.read_text(encoding="utf-8") if css_path.exists() else ""
    combined_css = html_css if len(html_css) >= len(react_css) else react_css
    if html_css and react_css and html_css != react_css:
        combined_css = html_css  # HTML is visual truth

    rules = parse_css_rules(combined_css)
    root_class = entry["rootClass"]
    root_selector = f".{root_class}"

    # Resolve all declarations
    resolved_rules: list[dict[str, Any]] = []
    all_tokens_used: set[str] = set()

    for rule in rules:
        resolved_decls: dict[str, Any] = {}
        for prop, data in rule["declarations"].items():
            resolved = resolve_value(data["raw"], tokens)
            resolved_decls[prop] = resolved
            all_tokens_used.update(resolved.get("tokens", []))
        resolved_rules.append({
            "selector": rule["selector"],
            "declarations": resolved_decls,
        })

    # Categorize selectors
    base_rule: dict[str, Any] | None = None
    elements: dict[str, dict[str, Any]] = {}
    variants: dict[str, dict[str, Any]] = {}
    sizes: dict[str, dict[str, Any]] = {}
    states: dict[str, dict[str, Any]] = {}
    other_rules: list[dict[str, Any]] = []

    for rule in resolved_rules:
        selector = rule["selector"].strip()
        decls = rule["declarations"]

        # Single class selectors only for categorization
        single_class = re.match(r"^\.([a-zA-Z0-9_-]+)$", selector)
        if single_class:
            cls = single_class.group(1)
            if cls == root_class:
                base_rule = {"class": cls, "declarations": decls}
                continue
            if cls.startswith(root_class + "__"):
                elements[cls] = {"class": cls, "declarations": decls}
                continue
            classified = classify_modifier(cls, root_class)
            if classified:
                cat, name = classified
                bucket = {"class": cls, "declarations": decls}
                if cat == "variant":
                    variants[name] = bucket
                elif cat == "size":
                    sizes[name] = bucket
                elif cat == "state":
                    states[name] = bucket
                continue
        other_rules.append({"selector": selector, "declarations": decls})

    # HTML class inventory
    class_usage = extract_classes_from_html(html)
    html_modifiers = [
        c for c in class_usage
        if c.startswith(root_class + "--")
    ]

    # Figma reference assets
    figma_dir = html_path.parent / "figma"
    figma_refs: list[str] = []
    if figma_dir.exists():
        for f in sorted(figma_dir.iterdir()):
            if f.suffix.lower() in {".png", ".jpg", ".webp", ".svg"}:
                figma_refs.append(str(f.relative_to(PROJECT_ROOT)))

    spec: dict[str, Any] = {
        "meta": {
            "component": entry["name"],
            "id": entry["id"],
            "slug": entry["slug"],
            "layer": entry["layer"],
            "rootClass": root_class,
            "extractedAt": datetime.now(timezone.utc).isoformat(),
            "sourceOfTruth": {
                "html": entry["htmlPath"],
                "react": entry.get("reactPath"),
                "reactCss": entry.get("reactCssPath"),
                "doc": entry.get("docPath"),
            },
        },
        "figmaHints": extract_figma_comments(combined_css),
        "sizeAnnotations": extract_size_annotations(combined_css),
        "structure": {
            "rootClass": root_class,
            "elements": sorted(elements.keys()),
            "classesUsedInHtml": class_usage,
            "modifiersInHtml": html_modifiers,
        },
        "anatomy": {
            "base": base_rule,
            "elements": elements,
            "sizes": sizes,
            "variants": variants,
            "states": states,
        },
        "cssRules": {
            "count": len(resolved_rules),
            "other": other_rules[:120],  # pseudo-selectors, compounds, media
        },
        "tokens": {
            "used": sorted(all_tokens_used),
            "count": len(all_tokens_used),
        },
        "icons": extract_icons(html),
        "figmaReferences": figma_refs,
        "constraints": {
            "noInventedVariants": True,
            "noHardcodedColors": True,
            "tokenSource": "styles/tokens.css",
            "classPrefix": (
                "modal-" if root_class.startswith("modal-")
                else "popup-" if root_class.startswith("popup-")
                else "ds-"
            ),
        },
    }

    if base_rule:
        spec["anatomy"]["baseResolved"] = {
            k: v.get("resolved", v.get("raw"))
            for k, v in base_rule["declarations"].items()
        }

    return spec


def build_manifest(specs: list[dict[str, Any]], registry: dict[str, Any]) -> dict[str, Any]:
    return {
        "version": "1.0.0",
        "generatedAt": datetime.now(timezone.utc).isoformat(),
        "componentCount": len(specs),
        "sourceOfTruth": registry.get("sourceOfTruth", []),
        "buildPhases": registry.get("buildPhases", []),
        "globalContext": [
            "Docs/figma-generate-skill.md",
            "Docs/figma-make-context.md",
            "Docs/component-rules.md",
            "styles/tokens.css",
            "styles/gp-lite-design-tokens.json",
            "foundations/colors/colors.html",
            "foundations/typography/typography.html",
            "foundations/spacing/spacing.html",
            "foundations/borders/borders.html",
            "foundations/shadows/shadows.html",
            "foundations/grid/grid.html",
            "foundations/icons/icons.html",
        ],
        "figmaFrame": {
            "name": "GPOS Lite DS V2 — Component Library",
            "layout": "vertical-auto-layout",
            "sections": [
                {"id": phase["id"], "label": phase["label"], "components": phase.get("componentIds", [])}
                for phase in registry.get("buildPhases", [])
                if phase.get("componentIds")
            ],
        },
        "components": [
            {
                "id": s["meta"]["id"],
                "name": s["meta"]["component"],
                "rootClass": s["meta"]["rootClass"],
                "layer": s["meta"]["layer"],
                "specPath": f".claude/figma/{s['meta']['id']}.spec.json",
                "variantCount": len(s["anatomy"].get("variants", {})),
                "sizeCount": len(s["anatomy"].get("sizes", {})),
                "stateCount": len(s["anatomy"].get("states", {})),
                "tokenCount": s["tokens"]["count"],
                "hasFigmaPng": len(s.get("figmaReferences", [])) > 0,
            }
            for s in specs
        ],
    }


def validate_specs(specs: list[dict[str, Any]]) -> list[str]:
    errors: list[str] = []
    composed_roots = {"date-picker", "date-time-picker", "time-picker", "form", "page-header", "page-layout"}
    for spec in specs:
        cid = spec["meta"]["id"]
        has_base = bool(spec["anatomy"].get("base"))
        has_rules = spec["cssRules"]["count"] > 0
        if not has_base and cid not in composed_roots:
            errors.append(f"{cid}: missing base rule for {spec['meta']['rootClass']}")
        if not has_base and cid in composed_roots and not has_rules:
            errors.append(f"{cid}: composed component has no CSS rules")
        if spec["tokens"]["count"] == 0:
            errors.append(f"{cid}: no tokens extracted")
    return errors


def main() -> int:
    parser = argparse.ArgumentParser(description="Extract Figma component specs")
    parser.add_argument("--component", "-c", help="Extract single component id")
    parser.add_argument("--validate", action="store_true", help="Validate output specs")
    parser.add_argument("--stdout", action="store_true", help="Print spec to stdout")
    args = parser.parse_args()

    registry = load_json(REGISTRY_PATH)
    tokens = merge_tokens()
    components = registry["components"]

    if args.component:
        components = [c for c in components if c["id"] == args.component]
        if not components:
            print(f"Unknown component id: {args.component}", file=sys.stderr)
            return 1

    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    specs: list[dict[str, Any]] = []

    for entry in components:
        try:
            spec = build_component_spec(entry, tokens)
            specs.append(spec)
            out_path = OUTPUT_DIR / f"{entry['id']}.spec.json"
            with out_path.open("w", encoding="utf-8") as f:
                json.dump(spec, f, indent=2, ensure_ascii=False)
            print(f"✓ {entry['id']}: {spec['tokens']['count']} tokens, "
                  f"{len(spec['anatomy']['variants'])} variants, "
                  f"{len(spec['anatomy']['sizes'])} sizes")
            if args.stdout and len(components) == 1:
                print(json.dumps(spec, indent=2, ensure_ascii=False))
        except Exception as exc:
            print(f"✗ {entry['id']}: {exc}", file=sys.stderr)
            return 1

    manifest = build_manifest(specs, registry)
    MANIFEST_PATH.parent.mkdir(parents=True, exist_ok=True)
    with MANIFEST_PATH.open("w", encoding="utf-8") as f:
        json.dump(manifest, f, indent=2, ensure_ascii=False)
    print(f"\n✓ Manifest: {MANIFEST_PATH.relative_to(PROJECT_ROOT)} ({len(specs)} components)")

    if args.validate:
        errors = validate_specs(specs)
        if errors:
            print("\nValidation errors:")
            for err in errors:
                print(f"  - {err}")
            return 1
        print("\n✓ Validation passed")

    return 0


if __name__ == "__main__":
    sys.exit(main())
