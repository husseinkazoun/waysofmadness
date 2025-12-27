#!/usr/bin/env python3
"""Fetch Squarespace page HTML and extract the main <article> content."""
from __future__ import annotations

import pathlib
import re
import sys
import urllib.request

BASE_URL = "https://www.naderbahsounstudios.com"

PAGES = {
    "home": "/",
    "about": "/about",
    "projects": "/projects",
    "co-creations": "/co-creations",
    "xprints": "/xprints",
    "contact": "/contact",
    "archive-x": "/archive-x",
    "southern-birds-project": "/southern-birds-project",
    "i-was-naver": "/i-was-naver",
    "the-bleed-zine": "/the-bleed-zine",
    "three-decades-and-a-climax": "/three-decades-and-a-climax",
    "shabah-el-rih": "/shabah-el-rih",
    "snakes-and-ladders": "/snakes-and-ladders",
    "msafreen": "/msafreen",
    "jal-el-bahr": "/jal-el-bahr",
    "unhearable-voices": "/unhearable-voices",
}

ARTICLE_RE = re.compile(r"(<article class=\"sections\"[^>]*>.*?</article>)", re.S)


def fetch(url: str) -> str:
    req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
    with urllib.request.urlopen(req, timeout=20) as response:
        return response.read().decode("utf-8", "ignore")


def main() -> int:
    output_dir = pathlib.Path(__file__).resolve().parent.parent / "content" / "squarespace"
    output_dir.mkdir(parents=True, exist_ok=True)

    for name, path in PAGES.items():
        url = f"{BASE_URL}{path}"
        try:
            html = fetch(url)
        except Exception as exc:
            print(f"Failed to fetch {url}: {exc}")
            continue

        match = ARTICLE_RE.search(html)
        if not match:
            print(f"No <article> found for {url}")
            continue

        content = match.group(1).strip()
        dest = output_dir / f"{name}.html"
        dest.write_text(content, encoding="utf-8")
        print(f"Saved {dest}")

    return 0


if __name__ == "__main__":
    raise SystemExit(main())
