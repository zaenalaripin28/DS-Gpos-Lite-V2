#!/usr/bin/env python3
"""Append arbitrary var(--*) → semantic Tailwind utility mappings to token_mapping.json."""

from __future__ import annotations

import json
from pathlib import Path

PROJECT_ROOT = Path(__file__).resolve().parent.parent
MAPPING_FILE = PROJECT_ROOT / "scripts" / "token_mapping.json"

# Invalid/legacy CSS var names in HTML → semantic Tailwind class (via tailwind.config.js)
VAR_TO_CLASS: dict[str, str] = {
    # Colors — GP Lite palette
    "bg-[var(--color-neutral-n0)]": "bg-neutral-n0",
    "bg-[var(--color-neutral-n20)]": "bg-neutral-n20",
    "bg-[var(--color-neutral-n0)]": "bg-neutral-n0",
    "bg-[var(--color-blue-b50)]": "bg-blue-b50",
    "text-[var(--color-neutral-n500)]": "text-neutral-n500",
    "text-[var(--color-neutral-n800)]": "text-neutral-n800",
    "text-[var(--color-neutral-n900)]": "text-neutral-n900",
    "text-[var(--color-blue-b300)]": "text-blue-b300",
    "text-[var(--color-text-primary)]": "text-text-primary",
    "text-[var(--color-text-secondary)]": "text-text-secondary",
    "border-[var(--color-neutral-n30)]": "border-neutral-n30",
    "border-[var(--color-neutral-n40)]": "border-neutral-n40",
    "border-[var(--color-blue-b300)]": "border-blue-b300",
    "border-[var(--color-red-r300)]": "border-red-r300",
    "hover:bg-[var(--color-neutral-n20)]": "hover:bg-neutral-n20",
    "hover:border-[var(--color-neutral-n100)]": "hover:border-neutral-n100",
    "focus-within:border-[var(--color-blue-b300)]": "focus-within:border-blue-b300",
    # Legacy/invalid var names → closest existing semantic token
    "bg-[var(--color-border-subtle)]": "bg-border-light",
    "bg-[var(--color-surface-hover)]": "bg-neutral-n20",
    "bg-[var(--color-surface-active)]": "bg-neutral-n30",
    "bg-[var(--color-accent-primary)]": "bg-blue-b300",
    "bg-[var(--color-border-muted)]": "bg-neutral-n40",
    "rounded-[var(--radius-md)]": "rounded-md",
    "rounded-[var(--border-radius-sm)]": "rounded-sm",
    "rounded-[var(--border-radius-md)]": "rounded-md",
    # Spacing
    "px-[var(--space-150)]": "px-150",
    "py-[var(--space-075)]": "py-075",
    "px-[var(--space-100)]": "px-100",
    "gap-[var(--space-075)]": "gap-075",
    "gap-[var(--space-100)]": "gap-100",
    # Typography
    "font-[var(--font-weight-regular)]": "font-normal",
    "font-[var(--font-weight-medium)]": "font-medium",
    "text-[var(--font-size-body3)]": "text-body-sm",
    "text-[var(--font-size-caption)]": "text-caption",
    "text-[var(--font-size-overline)]": "text-overline",
    "leading-[var(--line-height-tight)]": "leading-tight",
    "leading-[var(--text-body-small-regular-lh)]": "leading-body-sm",
    "tracking-[var(--letter-spacing-overline)]": "tracking-overline",
    # Focus ring shadows (keep var for complex values)
    "focus-within:shadow-[0_0_0_2px_var(--color-blue-b200)]": "focus-within:shadow-[0_0_0_2px_var(--color-blue-b200)]",
    "focus-visible:shadow-[inset_0_0_0_2px_var(--color-blue-b200)]": "focus-visible:shadow-[inset_0_0_0_2px_var(--color-blue-b200)]",
}

UTIL_PREFIXES = [
    "bg", "text", "border", "ring", "outline", "from", "to", "via", "divide",
    "hover:bg", "hover:text", "hover:border",
    "focus:bg", "focus:text", "focus:border",
    "active:bg", "active:text", "active:border",
    "disabled:bg", "disabled:text", "disabled:border",
    "focus-within:border", "focus-visible:ring",
    "px", "py", "p", "m", "mx", "my", "mt", "mb", "ml", "mr",
    "gap", "space-x", "space-y",
    "rounded", "shadow",
    "font", "leading", "tracking",
    "w", "h", "min-h", "max-w",
]


def expand_color_var_mappings() -> dict[str, str]:
    """Generate bg/text/border-[var(--color-*)] for all palette tokens."""
    palettes = {
        "neutral-n": ["0", "10", "20", "30", "40", "50", "60", "70", "80", "90", "100", "200", "300", "400", "500", "600", "700", "800", "900"],
        "blue-b": ["50", "75", "100", "200", "300", "400", "500"],
        "red-r": ["50", "75", "100", "200", "300", "400", "500"],
        "green-g": ["50", "75", "100", "200", "300", "400", "500"],
        "orange-o": ["50", "75", "100", "200", "300", "400", "500"],
        "purple-p": ["50", "75", "100", "200", "300", "400", "500"],
        "primary-": ["50", "100", "200", "300", "400", "500", "600", "700", "800", "900"],
    }
    util_types = ["bg", "text", "border", "ring", "outline"]
    out: dict[str, str] = {}

    for family, steps in palettes.items():
        for step in steps:
            css_var = f"--color-{family}{step}"
            if family == "primary-":
                tw = f"primary-{step}"
            elif family == "neutral-n":
                tw = f"neutral-n{step}"
            else:
                palette, prefix = family.split("-")
                tw = f"{palette}-{prefix}{step}"

            for util in util_types:
                old = f"{util}-[var({css_var})]"
                new = f"{util}-{tw}"
                out[old] = new

                for state in ("hover:", "focus:", "active:", "disabled:", "focus-within:", "focus-visible:"):
                    out[f"{state}{util}-[var({css_var})]"] = f"{state}{new}"

    return out


def main() -> None:
    data = json.loads(MAPPING_FILE.read_text(encoding="utf-8"))
    categories = data.setdefault("categories", {})

    arbitrary = dict(VAR_TO_CLASS)
    arbitrary.update(expand_color_var_mappings())

    # Spacing var mappings
    for token in ["025", "050", "075", "100", "150", "200", "250", "300", "400", "500", "600", "800", "1000"]:
        for util in ["p", "px", "py", "pt", "pb", "pl", "pr", "m", "mx", "my", "mt", "mb", "ml", "mr", "gap"]:
            arbitrary[f"{util}-[var(--space-{token})]"] = f"{util}-{token}"

    # Radius
    for name, tw in [("sm", "sm"), ("md", "md"), ("lg", "lg"), ("xl", "xl"), ("2xl", "2xl"), ("3xl", "3xl"), ("full", "full")]:
        arbitrary[f"rounded-[var(--border-radius-{name})]"] = f"rounded-{tw}"

    # Semantic text colors
    for name in ["primary", "secondary", "tertiary", "disabled", "inverse", "brand", "code"]:
        arbitrary[f"text-[var(--color-text-{name})]"] = f"text-text-{name}"

    categories["arbitrary_vars"] = arbitrary
    data["categories"] = categories

    MAPPING_FILE.write_text(json.dumps(data, indent=2) + "\n", encoding="utf-8")
    print(f"Added {len(arbitrary)} arbitrary var mappings to {MAPPING_FILE.name}")


if __name__ == "__main__":
    main()
