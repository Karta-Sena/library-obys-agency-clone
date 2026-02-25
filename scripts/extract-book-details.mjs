import fs from "node:fs";
import path from "node:path";

const PARTIALS_DIR = path.join(process.cwd(), "src", "legacy", "reference", "partials");
const OUTPUT_FILE = path.join(process.cwd(), "src", "data", "book-details.ts");
const BOOK_PARTIAL_RE = /^main-book-(.+)\.html$/;

const ENTITY_MAP = {
  amp: "&",
  lt: "<",
  gt: ">",
  quot: '"',
  apos: "'",
  nbsp: " ",
};

function decodeEntities(input) {
  return input
    .replace(/&(#x?[0-9a-fA-F]+|[a-zA-Z]+);/g, (match, entity) => {
      if (entity.startsWith("#x") || entity.startsWith("#X")) {
        const code = Number.parseInt(entity.slice(2), 16);
        return Number.isFinite(code) ? String.fromCodePoint(code) : match;
      }

      if (entity.startsWith("#")) {
        const code = Number.parseInt(entity.slice(1), 10);
        return Number.isFinite(code) ? String.fromCodePoint(code) : match;
      }

      return ENTITY_MAP[entity] ?? match;
    })
    .replace(/\r/g, "");
}

function normalizeText(input) {
  return input
    .replace(/\u00a0/g, " ")
    .replace(/[ \t]+\n/g, "\n")
    .replace(/\n[ \t]+/g, "\n")
    .replace(/[ \t]{2,}/g, " ")
    .trim();
}

function htmlToText(input) {
  const withBreaks = input
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/p>\s*<p[^>]*>/gi, "\n\n");
  const withoutTags = withBreaks.replace(/<[^>]+>/g, "");
  return normalizeText(decodeEntities(withoutTags));
}

function extractSingle(html, regex, field, slug) {
  const match = html.match(regex);
  if (!match) {
    throw new Error(`Failed to extract "${field}" for "${slug}"`);
  }
  return match[1].trim();
}

function extractCover(html, slug) {
  const coverRe =
    /<picture class="w-full h-auto flex" style="--aspect:\s*([^"]+)"><img[^>]*data-src="([^"]+)"[^>]*width="(\d+)"[^>]*height="(\d+)"/g;
  const matches = [...html.matchAll(coverRe)];
  if (!matches.length) {
    throw new Error(`Failed to extract cover image for "${slug}"`);
  }

  const [_, aspectRaw, src, widthRaw, heightRaw] = matches[matches.length - 1];
  const aspect = Number.parseFloat(aspectRaw);
  const width = Number.parseInt(widthRaw, 10);
  const height = Number.parseInt(heightRaw, 10);
  if (!Number.isFinite(aspect) || !Number.isFinite(width) || !Number.isFinite(height)) {
    throw new Error(`Invalid cover image metadata for "${slug}"`);
  }

  return {
    aspect,
    src: src.trim(),
    width,
    height,
  };
}

function parseBookPartial(fileName) {
  const slug = fileName.replace(/^main-book-/, "").replace(/\.html$/, "");
  const html = fs.readFileSync(path.join(PARTIALS_DIR, fileName), "utf8");

  const titleHtml = extractSingle(html, /<h1[^>]*>([\s\S]*?)<\/h1>/i, "title", slug);
  const badgeHtml = extractSingle(
    html,
    /<span class="badge[^"]*"[^>]*>([\s\S]*?)<\/span>/i,
    "badge",
    slug,
  );
  const metaHtml = extractSingle(
    html,
    /<div class="order-first"><p class="mb-10">\(([\s\S]*?)\)<\/p><\/div>/i,
    "meta",
    slug,
  );
  const subtitleHtml = extractSingle(
    html,
    /<div class="order-1"><h2 class="mb-0">([\s\S]*?)<\/h2>/i,
    "subtitle",
    slug,
  );
  const bodyHtml = extractSingle(
    html,
    /<div class="wysiwyg reset-last[\s\S]*?">([\s\S]*?)<\/div><\/div><div class="laptop:order-last hidden laptop:block">/i,
    "description",
    slug,
  );
  const isbnHtml = extractSingle(
    html,
    /<p class="mb-10 laptop:text-right">([\s\S]*?)<\/p>/i,
    "isbn",
    slug,
  );
  const quoteHtml = extractSingle(
    html,
    /<div class="relative w-full pt-30 md:pt-80 h2 mb-0">[\s\S]*?<p class="mb-0">([\s\S]*?)<\/p>/i,
    "quote",
    slug,
  );
  const pagePathRaw = extractSingle(
    html,
    /data-page-content="([^"]+)"/i,
    "pagePath",
    slug,
  );

  const paragraphs = [...bodyHtml.matchAll(/<p[^>]*>([\s\S]*?)<\/p>/gi)]
    .map((match) => htmlToText(match[1]))
    .filter(Boolean);

  const cover = extractCover(html, slug);

  return {
    slug,
    pagePath: pagePathRaw.replace(/^\/books\//, "/rebuild/books/"),
    title: htmlToText(titleHtml),
    badge: htmlToText(badgeHtml),
    meta: htmlToText(metaHtml),
    subtitle: htmlToText(subtitleHtml),
    description: paragraphs,
    isbn: htmlToText(isbnHtml),
    quote: htmlToText(quoteHtml),
    coverImage: cover.src,
    coverAspect: cover.aspect,
    coverWidth: cover.width,
    coverHeight: cover.height,
  };
}

function toTsLiteral(value, indent = 2) {
  if (Array.isArray(value)) {
    if (!value.length) return "[]";
    const pad = " ".repeat(indent);
    const inner = value
      .map((entry) => `${pad}${toTsLiteral(entry, indent + 2)}`)
      .join(",\n");
    return `[\n${inner}\n${" ".repeat(indent - 2)}]`;
  }
  return JSON.stringify(value);
}

function buildOutput(details) {
  const lines = [];
  lines.push('import { resolveAsset } from "./assets";');
  lines.push("");
  lines.push("export type BookDetail = {");
  lines.push("  slug: string;");
  lines.push("  pagePath: string;");
  lines.push("  title: string;");
  lines.push("  badge: string;");
  lines.push("  meta: string;");
  lines.push("  subtitle: string;");
  lines.push("  description: string[];");
  lines.push("  isbn: string;");
  lines.push("  quote: string;");
  lines.push("  coverImage: string;");
  lines.push("  coverAspect: number;");
  lines.push("  coverWidth: number;");
  lines.push("  coverHeight: number;");
  lines.push("};");
  lines.push("");
  lines.push("export const bookDetails: BookDetail[] = [");

  for (const detail of details) {
    lines.push("  {");
    lines.push(`    slug: ${toTsLiteral(detail.slug)},`);
    lines.push(`    pagePath: ${toTsLiteral(detail.pagePath)},`);
    lines.push(`    title: ${toTsLiteral(detail.title)},`);
    lines.push(`    badge: ${toTsLiteral(detail.badge)},`);
    lines.push(`    meta: ${toTsLiteral(detail.meta)},`);
    lines.push(`    subtitle: ${toTsLiteral(detail.subtitle)},`);
    lines.push(`    description: ${toTsLiteral(detail.description, 8)},`);
    lines.push(`    isbn: ${toTsLiteral(detail.isbn)},`);
    lines.push(`    quote: ${toTsLiteral(detail.quote)},`);
    lines.push(`    coverImage: resolveAsset(${toTsLiteral(detail.coverImage)}),`);
    lines.push(`    coverAspect: ${detail.coverAspect},`);
    lines.push(`    coverWidth: ${detail.coverWidth},`);
    lines.push(`    coverHeight: ${detail.coverHeight},`);
    lines.push("  },");
  }

  lines.push("];");
  lines.push("");
  lines.push("const bookDetailMap: Record<string, BookDetail> = Object.fromEntries(");
  lines.push("  bookDetails.map((book) => [book.slug, book]),");
  lines.push(");");
  lines.push("");
  lines.push("export function getBookDetail(slug: string): BookDetail | undefined {");
  lines.push("  return bookDetailMap[slug];");
  lines.push("}");
  lines.push("");
  return lines.join("\n");
}

function main() {
  const files = fs
    .readdirSync(PARTIALS_DIR)
    .filter((file) => BOOK_PARTIAL_RE.test(file))
    .sort((a, b) => a.localeCompare(b));

  const details = files.map((file) => parseBookPartial(file));
  const content = buildOutput(details);
  fs.writeFileSync(OUTPUT_FILE, content, "utf8");
  console.log(`Wrote ${OUTPUT_FILE} with ${details.length} book details`);
}

main();
