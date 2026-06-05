#!/usr/bin/env python3
"""Export CSS custom properties from styles/tokens.css to JSON snapshot."""

from __future__ import annotations

import json
import re
from datetime import datetime, timezone
from pathlib import Path

PROJECT_ROOT = Path(__file__).resolve().parent.parent
TOKENS_CSS = PROJECT_ROOT / "styles" / "tokens.css"
OUTPUT_JSON = PROJECT_ROOT / "styles" / "gp-lite-design-tokens.json"

VAR_RE = re.compile(r"^\s*(--[\w-]+)\s*:\s*([^;]+);")


def parse_tokens(css: str) -> dict[str, str]:
    tokens: dict[str, str] = {}
    for line in css.splitlines():
        match = VAR_RE.match(line)
        if match:
            name, value = match.groups()
            tokens[name] = value.strip()
    return tokens


def main() -> None:
    css = TOKENS_CSS.read_text(encoding="utf-8")
    tokens = parse_tokens(css)
    payload = {
        "name": "GP Lite Design tokens",
        "version": "2.0.0",
        "canonicalSource": "styles/tokens.css",
        "description": "JSON snapshot exported from tokens.css for tooling and traceability.",
        "generatedAt": datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ"),
        "tokenCount": len(tokens),
        "tokens": tokens,
    }
    OUTPUT_JSON.write_text(
        json.dumps(payload, indent=2, ensure_ascii=False) + "\n",
        encoding="utf-8",
    )
    print(f"Exported {len(tokens)} tokens → {OUTPUT_JSON}")


if __name__ == "__main__":
    main()
