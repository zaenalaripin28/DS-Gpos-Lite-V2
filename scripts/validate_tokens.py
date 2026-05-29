#!/usr/bin/env python3
"""
GPOS Lite Design System — validate Tailwind classes against token mappings.

Flags legacy/hardcoded utilities in HTML `class` attributes that should use
design token classes from token_mapping.json.

Usage:
  python scripts/validate_tokens.py
  python scripts/validate_tokens.py --verbose
  python scripts/validate_tokens.py --strict
"""

from __future__ import annotations

import argparse
import re
import sys
from collections import defaultdict
from dataclasses import dataclass, field
from pathlib import Path
from typing import DefaultDict, Iterator, List, Optional

# Reuse scan + HTML helpers from refactor tool
SCRIPT_DIR = Path(__file__).resolve().parent
sys.path.insert(0, str(SCRIPT_DIR))

from refactor_tokens import (  # noqa: E402
    CLASS_ATTR_RE,
    DEFAULT_MAPPING_FILE,
    PROJECT_ROOT,
    SCAN_TARGETS,
    is_real_html_class_attribute,
    iter_html_files,
    line_number_at,
    load_mapping,
    split_variant_prefix,
)

# Default Tailwind palette (not GP Lite tokens)
LEGACY_PALETTE_RE = re.compile(
    r"^(?:bg|text|border|ring|outline|fill|stroke|from|to|via|decoration|divide|"
    r"placeholder|accent|caret|shadow)-"
    r"(?:gray|slate|zinc|stone|red|orange|amber|yellow|lime|green|emerald|teal|"
    r"cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)"
    r"(?:-\d+)?$"
)

# Tailwind default `neutral-500` scale (project uses `neutral-n500`)
TW_NEUTRAL_SCALE_RE = re.compile(
    r"^(?:bg|text|border|ring|outline|from|to|via)-neutral-\d+$"
)

# GP Lite shorthand: bg-n0, text-b300, border-r200, bg-b300/20
SHORTHAND_GP_RE = re.compile(
    r"^(?:bg|text|border|ring|outline|from|to|via|divide)-[nbrgop]\d+(?:/\d+)?$"
)

# Raw hex/rgb in arbitrary utilities (prefer CSS variables)
ARBITRARY_COLOR_RE = re.compile(
    r"^(?:bg|text|border|ring|outline|fill|stroke|from|to|via|decoration)-"
    r"\[(?:#|rgb|hsl)"
)


@dataclass
class Issue:
    file: Path
    line: int
    token: str
    rule: str
    suggestion: str
    class_value: str


@dataclass
class ValidationSummary:
    files_scanned: int = 0
    files_with_issues: int = 0
    issue_count: int = 0
    by_rule: DefaultDict[str, int] = field(default_factory=lambda: defaultdict(int))


def check_token(
    token: str,
    mapping: dict[str, str],
) -> Optional[Issue]:
    """Return an Issue if token violates token rules, else None."""
    _prefix, base = split_variant_prefix(token)

    if base in mapping:
        return Issue(
            file=Path(),
            line=0,
            token=token,
            rule="mapped_legacy",
            suggestion=mapping[base],
            class_value="",
        )

    if LEGACY_PALETTE_RE.match(base):
        return Issue(
            file=Path(),
            line=0,
            token=token,
            rule="legacy_palette",
            suggestion="Use GP Lite token class (see token_mapping.json)",
            class_value="",
        )

    if TW_NEUTRAL_SCALE_RE.match(base):
        return Issue(
            file=Path(),
            line=0,
            token=token,
            rule="tailwind_neutral_scale",
            suggestion="Use neutral-n* token (e.g. bg-neutral-n0)",
            class_value="",
        )

    if SHORTHAND_GP_RE.match(base):
        palette_hint = {
            "n": "neutral-n",
            "b": "blue-b",
            "r": "red-r",
            "g": "green-g",
            "o": "orange-o",
            "p": "purple-p",
        }
        hint = "full GP Lite token class"
        for letter, replacement in palette_hint.items():
            if f"-{letter}" in f"-{base.split('-', 1)[-1]}" or base.endswith(letter + base.split(letter)[-1][:0]):
                pass
        m = re.match(r"^(\w+)-([nbrgop])(\d+.*)$", base)
        if m:
            util, pal, rest = m.group(1), m.group(2), m.group(3)
            full = palette_hint.get(pal, "")
            if full:
                hint = f"{util}-{full}{rest}"
        return Issue(
            file=Path(),
            line=0,
            token=token,
            rule="shorthand_gp",
            suggestion=f"Use {hint} (see token_mapping.json)",
            class_value="",
        )

    if ARBITRARY_COLOR_RE.match(base):
        return Issue(
            file=Path(),
            line=0,
            token=token,
            rule="arbitrary_color",
            suggestion="Use var(--color-*) via arbitrary value or token class",
            class_value="",
        )

    return None


def validate_html_content(
    content: str,
    file_path: Path,
    mapping: dict[str, str],
) -> List[Issue]:
    """Collect validation issues from one HTML file."""
    issues: list[Issue] = []

    for match in CLASS_ATTR_RE.finditer(content):
        if not is_real_html_class_attribute(content, match.start()):
            continue

        class_value = match.group("value")
        line = line_number_at(content, match.start())

        for token in class_value.split():
            hit = check_token(token, mapping)
            if hit is None:
                continue
            issues.append(
                Issue(
                    file=file_path,
                    line=line,
                    token=hit.token,
                    rule=hit.rule,
                    suggestion=hit.suggestion,
                    class_value=class_value,
                )
            )

    return issues


def validate_files(
    html_files: list[Path],
    mapping: dict[str, str],
) -> tuple[list[Issue], ValidationSummary]:
    """Validate all HTML files."""
    summary = ValidationSummary(files_scanned=len(html_files))
    all_issues: list[Issue] = []
    files_hit: set[Path] = set()

    for file_path in html_files:
        content = file_path.read_text(encoding="utf-8")
        file_issues = validate_html_content(content, file_path, mapping)
        if file_issues:
            files_hit.add(file_path)
            all_issues.extend(file_issues)

    summary.files_with_issues = len(files_hit)
    summary.issue_count = len(all_issues)
    for issue in all_issues:
        summary.by_rule[issue.rule] += 1

    return all_issues, summary


def print_issues(issues: list[Issue], verbose: bool) -> None:
    by_file: DefaultDict[Path, list[Issue]] = defaultdict(list)
    for issue in issues:
        by_file[issue.file].append(issue)

    for file_path in sorted(by_file.keys(), key=lambda p: str(p)):
        rel = file_path.relative_to(PROJECT_ROOT)
        print(f"\n→ {rel}")
        for issue in by_file[file_path]:
            print(f"  [{issue.line}] {issue.token}  ({issue.rule})")
            print(f"       → {issue.suggestion}")
            if verbose:
                print(f"       class: {issue.class_value}")


def print_summary(summary: ValidationSummary, *, passed: bool) -> None:
    status = "PASSED" if passed else "FAILED"
    print()
    print("=" * 60)
    print(f"  VALIDATION {status}")
    print("=" * 60)
    print(f"  Files scanned:       {summary.files_scanned}")
    print(f"  Files with issues:   {summary.files_with_issues}")
    print(f"  Total issues:        {summary.issue_count}")
    if summary.by_rule:
        print()
        print("  By rule:")
        for rule, count in sorted(summary.by_rule.items(), key=lambda x: (-x[1], x[0])):
            print(f"    {count:4d}×  {rule}")
    print("=" * 60)


def build_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(
        description="Validate HTML Tailwind classes against GPOS Lite token mappings.",
    )
    parser.add_argument(
        "--mapping",
        type=Path,
        default=DEFAULT_MAPPING_FILE,
        help="Path to token_mapping.json",
    )
    parser.add_argument(
        "--verbose",
        "-v",
        action="store_true",
        help="Show full class attribute for each issue",
    )
    parser.add_argument(
        "--strict",
        action="store_true",
        help="Exit 1 on any issue (default: exit 1 if issues found)",
    )
    parser.add_argument(
        "--target",
        action="append",
        type=Path,
        help="Additional scan path",
    )
    return parser


def resolve_targets(extra: Optional[list[Path]]) -> list[Path]:
    targets = list(SCAN_TARGETS)
    if extra:
        for path in extra:
            targets.append(path if path.is_absolute() else PROJECT_ROOT / path)
    return targets


def main() -> int:
    args = build_parser().parse_args()

    mapping_path = args.mapping if args.mapping.is_absolute() else PROJECT_ROOT / args.mapping

    try:
        mapping = load_mapping(mapping_path)
    except (FileNotFoundError, ValueError) as exc:
        print(f"Error: {exc}", file=sys.stderr)
        return 1

    html_files = list(iter_html_files(resolve_targets(args.target)))
    if not html_files:
        print("No HTML files found in scan targets.")
        return 0

    issues, summary = validate_files(html_files, mapping)
    passed = summary.issue_count == 0

    if issues:
        print_issues(issues, args.verbose)

    print_summary(summary, passed=passed)

    if not passed:
        print("\nFix issues manually or run: python scripts/refactor_tokens.py --apply")

    return 0 if passed else 1


if __name__ == "__main__":
    sys.exit(main())
