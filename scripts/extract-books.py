import re
import html
import pathlib

SOURCE = pathlib.Path("src/legacy/reference/partials/main-books.html")
OUTPUT = pathlib.Path("src/data/books.ts")


def clean_text(value: str) -> str:
    value = html.unescape(value)
    value = re.sub(r"<br\s*/?>", "\n", value, flags=re.IGNORECASE)
    value = re.sub(r"<[^>]+>", "", value)
    return " ".join(value.split())


def main() -> int:
    text = SOURCE.read_text(encoding="utf-8", errors="ignore")
    pattern = re.compile(
        r'<a[^>]*data-case="(/books/[^"]+/)"[^>]*>(.*?)</a>',
        re.DOTALL,
    )
    items = []
    for match in pattern.finditer(text):
        href = match.group(1)
        block = match.group(2)

        slug = href.strip("/").split("/")[-1]
        img_match = re.search(r'data-src="([^"]+)"', block)
        title_match = re.search(r"<h2[^>]*>(.*?)</h2>", block, re.DOTALL)
        meta_match = re.search(
            r'<p[^>]*class="[^"]*font-bold[^"]*"[^>]*>\((.*?)\)</p>',
            block,
            re.DOTALL,
        )
        badge_match = re.search(r'<span class="badge[^"]*">(.*?)</span>', block)

        if not (img_match and title_match and meta_match and badge_match):
            continue

        title_html = html.unescape(title_match.group(1).strip())
        title = clean_text(title_html)
        meta_raw = clean_text(meta_match.group(1))
        badge = clean_text(badge_match.group(1))
        hover_image = img_match.group(1).strip()

        author = meta_raw
        year = ""
        if "," in meta_raw:
            author, year = [p.strip() for p in meta_raw.rsplit(",", 1)]

        items.append(
            {
                "slug": slug,
                "title": title,
                "titleHtml": title_html,
                "author": author,
                "year": year,
                "badge": badge,
                "hoverImage": hover_image,
            }
        )

    lines = [
        'import { resolveAsset } from "./assets";',
        "",
        "export type Book = {",
        "  id: number;",
        "  slug: string;",
        "  title: string;",
        "  titleHtml: string;",
        "  author: string;",
        "  year: string;",
        "  badge: string;",
        "  hoverImage: string;",
        "};",
        "",
        "export const books: Book[] = [",
    ]
    for idx, item in enumerate(items, 1):
        lines.append("  {")
        lines.append(f"    id: {idx},")
        lines.append(f'    slug: "{item["slug"]}",')
        lines.append(f'    title: "{item["title"]}",')
        lines.append(f'    titleHtml: "{item["titleHtml"]}",')
        lines.append(f'    author: "{item["author"]}",')
        lines.append(f'    year: "{item["year"]}",')
        lines.append(f'    badge: "{item["badge"]}",')
        lines.append(f'    hoverImage: resolveAsset("{item["hoverImage"]}"),')
        lines.append("  },")
    lines.append("];")
    lines.append("")
    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    OUTPUT.write_text("\n".join(lines), encoding="utf-8")
    print(f"Wrote {OUTPUT} with {len(items)} books")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
