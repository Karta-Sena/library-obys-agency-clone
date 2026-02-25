import re
import sys
import json
import pathlib
import urllib.request

ROOT = pathlib.Path("src/legacy/reference")
DEST_DIR = pathlib.Path("public/assets/remote")
OUTPUT_TS = pathlib.Path("src/data/assets.ts")

HOST_PREFIX = "https://ttf-7ecj.onrender.com/uploads/"


def find_urls() -> set[str]:
    urls: set[str] = set()
    for path in ROOT.rglob("*"):
        if not path.is_file():
            continue
        text = path.read_text(encoding="utf-8", errors="ignore")
        urls.update(re.findall(r"https?://[^\s\"']+", text))
    return urls


def download(url: str, target: pathlib.Path) -> None:
    target.parent.mkdir(parents=True, exist_ok=True)
    if target.exists():
        return
    try:
        urllib.request.urlretrieve(url, target)
    except Exception as exc:
        print(f"[warn] failed: {url} -> {exc}")


def main() -> int:
    urls = sorted(u for u in find_urls() if u.startswith(HOST_PREFIX))
    mapping: dict[str, str] = {}

    for url in urls:
        filename = url.split("/")[-1]
        local_path = DEST_DIR / filename
        download(url, local_path)
        mapping[url] = f"/assets/remote/{filename}"

    OUTPUT_TS.parent.mkdir(parents=True, exist_ok=True)
    lines = [
        "export const REMOTE_ASSET_MAP: Record<string, string> = {",
    ]
    for key in sorted(mapping.keys()):
        lines.append(f'  "{key}": "{mapping[key]}",')
    lines.append("};")
    lines.append("")
    lines.append("export function resolveAsset(url: string): string {")
    lines.append("  return REMOTE_ASSET_MAP[url] ?? url;")
    lines.append("}")
    OUTPUT_TS.write_text("\n".join(lines), encoding="utf-8")

    print(f"Downloaded: {len(mapping)} assets")
    print(f"Wrote mapping: {OUTPUT_TS}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
