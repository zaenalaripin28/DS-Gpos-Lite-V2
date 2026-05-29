#!/usr/bin/env python3
"""
GPOS Lite Design System — Tailwind utility refactor tool.

Scans HTML files and replaces hardcoded Tailwind utilities with token-based
classes defined in token_mapping.json. Only modifies real `class` attribute
values; preserves HTML structure, accessibility, and data attributes.

Usage:
  python scripts/refactor_tokens.py --dry-run
  python scripts/refactor_tokens.py --apply
  python scripts/refactor_tokens.py --rollback
  python scripts/refactor_tokens.py --rollback --backup-id 20260529-143022
"""

from __future__ import annotations

import argparse
import json
import re
import shutil
import sys
from collections import defaultdict
from dataclasses import dataclass, field
from datetime import datetime
from pathlib import Path
from typing import DefaultDict, Iterable, Iterator, List, Optional, Tuple

# ---------------------------------------------------------------------------
# Paths (relative to repository root)
# ---------------------------------------------------------------------------

SCRIPT_DIR = Path(__file__).resolve().parent
PROJECT_ROOT = SCRIPT_DIR.parent
DEFAULT_MAPPING_FILE = SCRIPT_DIR / "token_mapping.json"
DEFAULT_BACKUP_DIR = PROJECT_ROOT / ".refactor-backups"

# Scan targets per project requirements
SCAN_TARGETS = [
    PROJECT_ROOT / "index.html",
    PROJECT_ROOT / "components",
    PROJECT_ROOT / "foundations",
    PROJECT_ROOT / "pages",
    PROJECT_ROOT / "patterns",
    PROJECT_ROOT / "templates",
    PROJECT_ROOT / "navigation",
]

# Regex: optional variant/responsive/state prefixes + utility body
VARIANT_PREFIX_RE = re.compile(
    r"^((?:(?:hover|focus|focus-within|focus-visible|active|disabled|visited|"
    r"group-hover|peer-focus|sm|md|lg|xl|2xl|max-sm|max-md|max-lg|max-xl):)+)"
)

CLASS_ATTR_RE = re.compile(
    r"(?<![\w-])class\s*=\s*"
    r"(?P<quote>['\"])"
    r"(?P<value>.*?)"
    r"(?P=quote)",
    re.DOTALL | re.IGNORECASE,
)

COPY_UTILITY_RE = re.compile(
    r"copy(?:Code|Tailwind)\(\s*[^,]+,\s*"
    r"(?P<quote>['\"])"
    r"(?P<value>.*?)"
    r"(?P=quote)\s*\)",
    re.DOTALL,
)

CODE_UTILITY_TEXT_RE = re.compile(
    r"(<code\b[^>]*>)(?P<text>[^<]+)(</code>)",
    re.IGNORECASE,
)


@dataclass
class ReplacementRecord:
    """Single utility replacement inside one class attribute."""

    file: Path
    line: int
    old_token: str
    new_token: str
    full_class_before: str
    full_class_after: str


@dataclass
class FileResult:
    """Aggregated refactor result for one HTML file."""

    path: Path
    replacements: List[ReplacementRecord] = field(default_factory=list)
    changed: bool = False
    new_content: str = ""


@dataclass
class RunSummary:
    """Overall run statistics."""

    files_scanned: int = 0
    files_changed: int = 0
    tokens_replaced: int = 0
    by_mapping: DefaultDict[str, int] = field(default_factory=lambda: defaultdict(int))


# ---------------------------------------------------------------------------
# Mapping loader
# ---------------------------------------------------------------------------


def load_mapping(mapping_path: Path) -> dict[str, str]:
    """
    Load token_mapping.json and return a flat old→new dict.

    Supports:
      - Top-level "mappings" object
      - Nested "categories" object (colors, spacing, radius, …)
    """
    if not mapping_path.is_file():
        raise FileNotFoundError(f"Mapping file not found: {mapping_path}")

    with mapping_path.open(encoding="utf-8") as fh:
        data = json.load(fh)

    flat: dict[str, str] = {}

    if isinstance(data.get("mappings"), dict):
        flat.update(data["mappings"])

    categories = data.get("categories")
    if isinstance(categories, dict):
        for _category, entries in categories.items():
            if isinstance(entries, dict):
                flat.update(entries)

    # Identity / no-op entries are removed so they never trigger writes
    flat = {k: v for k, v in flat.items() if k != v}

    if not flat:
        raise ValueError(
            f"No mappings found in {mapping_path}. "
            "Add entries under 'categories' or 'mappings'."
        )

    return flat


def sort_mapping_keys(mapping: dict[str, str]) -> list[str]:
    """Longest keys first to avoid partial-token replacements."""
    return sorted(mapping.keys(), key=len, reverse=True)


# ---------------------------------------------------------------------------
# Class token utilities
# ---------------------------------------------------------------------------


def split_variant_prefix(token: str) -> Tuple[str, str]:
    """Return (prefix, base) e.g. ('hover:', 'bg-blue-500')."""
    match = VARIANT_PREFIX_RE.match(token)
    if not match:
        return "", token
    prefix = match.group(1)
    return prefix, token[len(prefix) :]


def replace_class_token(token: str, mapping: dict[str, str], ordered_keys: list[str]) -> Tuple[str, Optional[str]]:
    """
    Replace one class token if mapped.

    Returns (new_token, old_base) where old_base is the matched mapping key
  without variant prefix, or None if unchanged.
    """
    prefix, base = split_variant_prefix(token)
    for key in ordered_keys:
        if base == key:
            replacement = mapping[key]
            new_base = replacement
            # If mapping key already includes a variant prefix, use as-is
            mapped_prefix, mapped_body = split_variant_prefix(replacement)
            if mapped_prefix:
                return replacement, key
            return f"{prefix}{new_base}", key
    return token, None


def refactor_class_value(
    class_value: str,
    mapping: dict[str, str],
    ordered_keys: list[str],
) -> Tuple[str, List[Tuple[str, str]]]:
    """
    Refactor a full class attribute string.

    Returns (new_value, [(old_token, new_token), ...]).
    """
    if not class_value.strip():
        return class_value, []

    tokens = class_value.split()
    new_tokens: list[str] = []
    changes: list[Tuple[str, str]] = []

    for token in tokens:
        new_token, matched_key = replace_class_token(token, mapping, ordered_keys)
        new_tokens.append(new_token)
        if matched_key is not None and new_token != token:
            changes.append((token, new_token))

    return " ".join(new_tokens), changes


def line_number_at(content: str, index: int) -> int:
    """1-based line number for a character index."""
    return content.count("\n", 0, index) + 1


def is_real_html_class_attribute(content: str, match_start: int) -> bool:
    """
    Return True when `class=` belongs to a real HTML tag, not escaped docs.

    Skips patterns like `&lt;div class="..."` used in code examples.
    """
    lookback = content[max(0, match_start - 300) : match_start]

    # Inside escaped documentation snippet
    lt_escaped = lookback.rfind("&lt;")
    lt_real = lookback.rfind("<")
    if lt_escaped != -1 and (lt_real == -1 or lt_escaped > lt_real):
        return False

    # Must be preceded by `<` opening a tag (not `&lt;`)
    i = match_start - 1
    while i >= 0 and content[i] in " \t\n\r":
        i -= 1

    while i >= 0:
        ch = content[i]
        if ch == "<":
            if i > 0 and content[i - 1] == "&":
                return False
            return True
        if ch in ">":
            return False
        i -= 1

    return False


def is_inside_code_or_pre(content: str, match_start: int) -> bool:
    """True when position is inside an open <code> or <pre> element."""
    before = content[:match_start].lower()
    for tag in ("code", "pre"):
        open_idx = before.rfind(f"<{tag}")
        close_idx = before.rfind(f"</{tag}>")
        if open_idx != -1 and open_idx > close_idx:
            return True
    return False


def is_escaped_markup_class(content: str, match_start: int) -> bool:
    """True for class= in documentation snippets like &lt;div class=\"...\"."""
    lookback = content[max(0, match_start - 400) : match_start]
    lt_escaped = lookback.rfind("&lt;")
    lt_real = lookback.rfind("<")
    return lt_escaped != -1 and (lt_real == -1 or lt_escaped > lt_real)


def should_refactor_class(content: str, match_start: int, include_snippets: bool) -> bool:
    """Decide whether a class= match should be refactored."""
    if is_real_html_class_attribute(content, match_start):
        return True
    if not include_snippets:
        return False
    return is_inside_code_or_pre(content, match_start) or is_escaped_markup_class(
        content, match_start
    )


def looks_like_utility_string(text: str) -> bool:
    """Heuristic: plain Tailwind utility list (not HTML/JS)."""
    stripped = text.strip()
    if not stripped or "<" in stripped or "&lt;" in stripped:
        return False
    if "\n" in stripped:
        return False
    return bool(re.search(r"\b(?:bg|text|border|ring|hover:|focus:|p-|m-|gap-|rounded)", stripped))


def append_records(
    records: list[ReplacementRecord],
    file_path: Path,
    line: int,
    changes: list[Tuple[str, str]],
    before: str,
    after: str,
) -> None:
    for old_token, new_token in changes:
        records.append(
            ReplacementRecord(
                file=file_path,
                line=line,
                old_token=old_token,
                new_token=new_token,
                full_class_before=before,
                full_class_after=after,
            )
        )


# ---------------------------------------------------------------------------
# File processing
# ---------------------------------------------------------------------------


def iter_html_files(targets: Iterable[Path]) -> Iterator[Path]:
    """Yield existing .html files from scan targets."""
    for target in targets:
        if not target.exists():
            continue
        if target.is_file() and target.suffix.lower() == ".html":
            yield target.resolve()
        elif target.is_dir():
            yield from sorted(target.rglob("*.html"))


def refactor_html_content(
    content: str,
    mapping: dict[str, str],
    ordered_keys: list[str],
    file_path: Path,
    *,
    include_snippets: bool = False,
) -> Tuple[str, List[ReplacementRecord]]:
    """Refactor class attributes and optional documentation utility strings."""
    records: list[ReplacementRecord] = []
    working = content

    def _class_replacer(match: re.Match[str]) -> str:
        start = match.start()
        if not should_refactor_class(working, start, include_snippets):
            return match.group(0)

        quote = match.group("quote")
        value = match.group("value")
        new_value, changes = refactor_class_value(value, mapping, ordered_keys)

        if not changes:
            return match.group(0)

        line = line_number_at(working, start)
        append_records(records, file_path, line, changes, value, new_value)
        return f"class={quote}{new_value}{quote}"

    working = CLASS_ATTR_RE.sub(_class_replacer, working)

    if include_snippets:

        def _copy_replacer(match: re.Match[str]) -> str:
            quote = match.group("quote")
            value = match.group("value")
            new_value, changes = refactor_class_value(value, mapping, ordered_keys)
            if not changes:
                return match.group(0)
            line = line_number_at(working, match.start())
            append_records(records, file_path, line, changes, value, new_value)
            return (
                match.string[match.start() : match.start("value")]
                + new_value
                + match.string[match.end("value") : match.end()]
            )

        working = COPY_UTILITY_RE.sub(_copy_replacer, working)

        def _code_text_replacer(match: re.Match[str]) -> str:
            text = match.group("text")
            if not looks_like_utility_string(text):
                return match.group(0)
            new_text, changes = refactor_class_value(text, mapping, ordered_keys)
            if not changes:
                return match.group(0)
            line = line_number_at(working, match.start())
            append_records(records, file_path, line, changes, text.strip(), new_text)
            return f"{match.group(1)}{new_text}{match.group(3)}"

        working = CODE_UTILITY_TEXT_RE.sub(_code_text_replacer, working)

    return working, records


def process_file(
    file_path: Path,
    mapping: dict[str, str],
    ordered_keys: list[str],
    *,
    include_snippets: bool = False,
) -> FileResult:
    """Read, refactor, and return result for one HTML file."""
    result = FileResult(path=file_path)
    original = file_path.read_text(encoding="utf-8")
    new_content, records = refactor_html_content(
        original,
        mapping,
        ordered_keys,
        file_path,
        include_snippets=include_snippets,
    )
    result.replacements = records
    result.changed = new_content != original
    result.new_content = new_content
    return result


# ---------------------------------------------------------------------------
# Backup / rollback
# ---------------------------------------------------------------------------


def create_backup(
    files: list[Path],
    backup_root: Path,
    backup_id: str,
) -> Path:
    """Copy original files into timestamped backup folder."""
    session_dir = backup_root / backup_id
    session_dir.mkdir(parents=True, exist_ok=True)

    manifest = {
        "backup_id": backup_id,
        "created_at": datetime.now().isoformat(timespec="seconds"),
        "files": [],
    }

    for file_path in files:
        rel = file_path.relative_to(PROJECT_ROOT)
        dest = session_dir / rel
        dest.parent.mkdir(parents=True, exist_ok=True)
        shutil.copy2(file_path, dest)
        manifest["files"].append(str(rel))

    manifest_path = session_dir / "manifest.json"
    manifest_path.write_text(json.dumps(manifest, indent=2), encoding="utf-8")
    return session_dir


def list_backups(backup_root: Path) -> list[str]:
    """Return backup IDs sorted newest first."""
    if not backup_root.is_dir():
        return []
    ids = [
        p.name
        for p in backup_root.iterdir()
        if p.is_dir() and (p / "manifest.json").is_file()
    ]
    return sorted(ids, reverse=True)


def rollback_backup(backup_root: Path, backup_id: Optional[str], dry_run: bool) -> int:
    """Restore files from a backup session."""
    backups = list_backups(backup_root)
    if not backups:
        print(f"No backups found in {backup_root}")
        return 1

    chosen = backup_id or backups[0]
    session_dir = backup_root / chosen
    manifest_path = session_dir / "manifest.json"

    if not manifest_path.is_file():
        print(f"Invalid backup (missing manifest): {chosen}")
        return 1

    manifest = json.loads(manifest_path.read_text(encoding="utf-8"))
    restored = 0

    print(f"{'[DRY-RUN] ' if dry_run else ''}Rolling back from backup: {chosen}")

    for rel in manifest.get("files", []):
        src = session_dir / rel
        dest = PROJECT_ROOT / rel
        if not src.is_file():
            print(f"  SKIP (missing in backup): {rel}")
            continue
        print(f"  restore: {rel}")
        if not dry_run:
            dest.parent.mkdir(parents=True, exist_ok=True)
            shutil.copy2(src, dest)
        restored += 1

    print(f"Restored {restored} file(s).")
    return 0


# ---------------------------------------------------------------------------
# Logging / summary
# ---------------------------------------------------------------------------


def log_replacement(record: ReplacementRecord, verbose: bool) -> None:
    rel = record.file.relative_to(PROJECT_ROOT)
    print(f"  [{rel}:{record.line}] {record.old_token} → {record.new_token}")
    if verbose:
        print(f"      before: {record.full_class_before}")
        print(f"      after:  {record.full_class_after}")


def print_summary(summary: RunSummary, *, dry_run: bool) -> None:
    mode = "DRY-RUN" if dry_run else "APPLIED"
    print()
    print("=" * 60)
    print(f"  REFACTOR SUMMARY ({mode})")
    print("=" * 60)
    print(f"  Files scanned:     {summary.files_scanned}")
    print(f"  Files changed:     {summary.files_changed}")
    print(f"  Tokens replaced:   {summary.tokens_replaced}")
    print()

    if summary.by_mapping:
        print("  Top mappings used:")
        for key, count in sorted(
            summary.by_mapping.items(), key=lambda x: (-x[1], x[0])
        )[:20]:
            print(f"    {count:4d}×  {key}")
        if len(summary.by_mapping) > 20:
            print(f"    … and {len(summary.by_mapping) - 20} more")
    print("=" * 60)


# ---------------------------------------------------------------------------
# CLI
# ---------------------------------------------------------------------------


def build_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(
        description="Refactor Tailwind utilities to GPOS Lite design token classes.",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Examples:
  python scripts/refactor_tokens.py --dry-run
  python scripts/refactor_tokens.py --dry-run --verbose
  python scripts/refactor_tokens.py --apply
  python scripts/refactor_tokens.py --apply --backup-dir .refactor-backups
  python scripts/refactor_tokens.py --rollback
  python scripts/refactor_tokens.py --rollback --backup-id 20260529-120000
  python scripts/refactor_tokens.py --list-backups
        """,
    )

    mode = parser.add_mutually_exclusive_group(required=True)
    mode.add_argument(
        "--dry-run",
        action="store_true",
        help="Preview refactor changes without writing files",
    )
    mode.add_argument(
        "--apply",
        action="store_true",
        help="Apply refactor changes (creates backup first)",
    )
    mode.add_argument(
        "--rollback",
        action="store_true",
        help="Restore files from the latest backup (or --backup-id)",
    )
    mode.add_argument(
        "--list-backups",
        action="store_true",
        help="List available backup sessions",
    )

    parser.add_argument(
        "--rollback-dry-run",
        action="store_true",
        help="With --rollback: preview restore without writing files",
    )

    parser.add_argument(
        "--mapping",
        type=Path,
        default=DEFAULT_MAPPING_FILE,
        help=f"Path to token mapping JSON (default: {DEFAULT_MAPPING_FILE.name})",
    )
    parser.add_argument(
        "--backup-dir",
        type=Path,
        default=DEFAULT_BACKUP_DIR,
        help=f"Backup directory (default: {DEFAULT_BACKUP_DIR.name})",
    )
    parser.add_argument(
        "--backup-id",
        type=str,
        default=None,
        help="Specific backup session for --rollback",
    )
    parser.add_argument(
        "--verbose",
        "-v",
        action="store_true",
        help="Log each replacement with full class before/after",
    )
    parser.add_argument(
        "--target",
        action="append",
        type=Path,
        help="Scan path (can be repeated). With --only-target, replaces default paths.",
    )
    parser.add_argument(
        "--only-target",
        action="store_true",
        help="Scan only paths from --target (do not include default pages/components/index)",
    )
    parser.add_argument(
        "--include-snippets",
        action="store_true",
        help="Also refactor docs: <code> utility text, copyCode/copyTailwind strings, escaped markup",
    )

    return parser


def resolve_scan_targets(
    extra: Optional[list[Path]],
    *,
    only_target: bool = False,
) -> list[Path]:
    if only_target:
        if not extra:
            return list(SCAN_TARGETS)
        targets: list[Path] = []
    else:
        targets = list(SCAN_TARGETS)

    if extra:
        for path in extra:
            resolved = path if path.is_absolute() else PROJECT_ROOT / path
            targets.append(resolved)
    return targets


def run_refactor(args: argparse.Namespace) -> int:
    backup_root: Path = (
        args.backup_dir if args.backup_dir.is_absolute() else PROJECT_ROOT / args.backup_dir
    )

    if args.list_backups:
        backups = list_backups(backup_root)
        if not backups:
            print(f"No backups in {backup_root}")
        else:
            print(f"Backups in {backup_root}:")
            for bid in backups:
                print(f"  {bid}")
        return 0

    if args.rollback:
        return rollback_backup(
            backup_root,
            args.backup_id,
            dry_run=args.rollback_dry_run,
        )

    mapping_path: Path = (
        args.mapping if args.mapping.is_absolute() else PROJECT_ROOT / args.mapping
    )

    try:
        mapping = load_mapping(mapping_path)
    except (FileNotFoundError, ValueError, json.JSONDecodeError) as exc:
        print(f"Error loading mapping: {exc}", file=sys.stderr)
        return 1

    ordered_keys = sort_mapping_keys(mapping)
    targets = resolve_scan_targets(args.target, only_target=args.only_target)
    html_files = list(iter_html_files(targets))

    if not html_files:
        print("No HTML files found in scan targets:")
        for t in targets:
            print(f"  - {t}")
        return 0

    dry_run = args.dry_run
    summary = RunSummary(files_scanned=len(html_files))
    changed_files: list[Path] = []
    pending_results: list[FileResult] = []

    print(f"Mapping: {mapping_path} ({len(mapping)} rules)")
    print(f"Mode:    {'DRY-RUN' if dry_run else 'APPLY'}")
    if args.include_snippets:
        print("Snippets: documentation + copy strings enabled")
    print(f"Files:   {len(html_files)} HTML file(s)")
    print()

    for file_path in html_files:
        result = process_file(
            file_path,
            mapping,
            ordered_keys,
            include_snippets=args.include_snippets,
        )
        if not result.changed:
            continue

        rel = file_path.relative_to(PROJECT_ROOT)
        print(f"→ {rel} ({len(result.replacements)} replacement(s))")

        for record in result.replacements:
            log_replacement(record, args.verbose)
            summary.tokens_replaced += 1
            _, matched_base = split_variant_prefix(record.old_token)
            base_only = matched_base or record.old_token
            _, base = split_variant_prefix(base_only)
            summary.by_mapping[f"{base} → {mapping.get(base, '?')}"] += 1

        summary.files_changed += 1
        changed_files.append(file_path)
        pending_results.append(result)

    if not dry_run and changed_files:
        backup_id = datetime.now().strftime("%Y%m%d-%H%M%S")
        backup_dir = create_backup(changed_files, backup_root, backup_id)
        print(f"\nBackup created: {backup_dir}")

        for result in pending_results:
            result.path.write_text(result.new_content, encoding="utf-8")

    print_summary(summary, dry_run=dry_run)

    if dry_run and summary.files_changed:
        print("\nRun with --apply to write changes.")

    return 0


def main() -> int:
    parser = build_parser()
    args = parser.parse_args()
    return run_refactor(args)


if __name__ == "__main__":
    sys.exit(main())
