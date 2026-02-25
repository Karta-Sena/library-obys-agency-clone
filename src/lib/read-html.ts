import fs from "node:fs";
import path from "node:path";

const ROOT = path.join(process.cwd(), "src", "legacy", "reference");
const PARTIALS = path.join(ROOT, "partials");

export function readHtml(relPath: string): string {
  return fs.readFileSync(path.join(ROOT, relPath), "utf8");
}

export function readPartial(name: string): string {
  return fs.readFileSync(path.join(PARTIALS, name), "utf8");
}

function extractMainInner(html: string): string {
  const normalized = html.trim();
  const match = normalized.match(/^<main[^>]*>([\s\S]*)<\/main>$/);
  if (!match) return html;
  return match[1];
}

const STICKY_NAV_MARKUP =
  '<div class="fixed left-0 top-240 md:px-20 w-140" data-sticky-nav=""></div>';
const PAGES_GRID_RE =
  /<div class="grid[^"]*pages-grid[^"]*">(?:\s*<div[^>]*><\/div>){4}\s*<\/div>/;

function stripMainScaffold(html: string): string {
  let output = html.replace(STICKY_NAV_MARKUP, "");
  output = output.replace(PAGES_GRID_RE, "");
  return output;
}

export function readMain(name: "home" | "books" | "credits" | "contacts"): string {
  const html = readPartial(`main-${name}.html`);
  return stripMainScaffold(extractMainInner(html));
}

export function readBookMain(slug: string): string {
  const html = readPartial(`main-book-${slug}.html`);
  return stripMainScaffold(extractMainInner(html));
}

export function listBookSlugs(): string[] {
  if (!fs.existsSync(PARTIALS)) return [];
  return fs
    .readdirSync(PARTIALS)
    .filter((file) => file.startsWith("main-book-") && file.endsWith(".html"))
    .map((file) => file.replace(/^main-book-/, "").replace(/\.html$/, ""));
}
