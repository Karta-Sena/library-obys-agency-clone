import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();

const PUBLIC_DIR = path.join(ROOT, "public");
const REMOTE_DIR = path.join(ROOT, "public", "assets", "remote");
const IMAGES_DIR = path.join(ROOT, "public", "assets", "images");
const FONTS_DIR = path.join(ROOT, "public", "assets", "fonts");
const CSS_DIR = path.join(ROOT, "public", "assets", "css");

const IMAGE_FILE_MAP = {
  "a5506add059fc0d50f8e.png": "texture-noise.png",
  "0da70bd8a65e85ad629a.avif": "texture-orange-dots.avif",
  "ff52c77659a07cee2a55.webp": "texture-gray.webp",
  "1baa47fce79c526ac352.webp": "texture-light.webp",
  "511b68bd87fd11eca301.webp": "texture-white.webp",
  "d560e40dc92a65e6dfcf.jpg": "texture-quote.jpg",
  "7144a5c6a4649edd6374.avif": "texture-orange.avif",
  "852b2162e3bc4f40db5f.jpg": "texture-orange-horizontal.jpg",
  "fed2e45fc7636932b806.jpg": "texture-sand.jpg",
};

const FONT_FILE_MAP = {
  "acaef67b8305f91f1d61.woff2": "kh-teka-900.woff2",
  "1aff22618cd67f1f4152.woff2": "kh-teka-700.woff2",
  "19691f97956be0122c33.woff2": "kh-teka-500.woff2",
  "d83220777a587d3be8f1.woff2": "kh-teka-400.woff2",
  "1ac485cd25551ee8d0df.woff2": "kh-teka-300.woff2",
};

function normalizeRemoteBaseName(baseName) {
  const withoutHash = baseName.replace(/(?:_|-)[0-9a-f]{10}$/i, "");
  const withKebab = withoutHash
    .replace(/_/g, "-")
    .replace(/([a-z])([A-Z])/g, "$1-$2")
    .replace(/book(\d+)/gi, "book-$1")
    .replace(/-{2,}/g, "-")
    .replace(/^-+|-+$/g, "");
  return withKebab.toLowerCase();
}

function areFilesIdentical(fileA, fileB) {
  const fileABuffer = fs.readFileSync(fileA);
  const fileBBuffer = fs.readFileSync(fileB);
  return fileABuffer.equals(fileBBuffer);
}

function relocateLegacyRootImages(imageMap) {
  let moved = 0;
  let removedDuplicates = 0;

  for (const [oldName, newName] of Object.entries(imageMap)) {
    const legacyPath = path.join(PUBLIC_DIR, oldName);
    if (!fs.existsSync(legacyPath)) continue;

    const targetPath = path.join(IMAGES_DIR, newName);
    if (fs.existsSync(targetPath)) {
      if (!areFilesIdentical(legacyPath, targetPath)) {
        throw new Error(
          `Legacy file differs from target file: ${legacyPath} -> ${targetPath}`,
        );
      }
      fs.unlinkSync(legacyPath);
      removedDuplicates += 1;
      continue;
    }

    fs.renameSync(legacyPath, targetPath);
    moved += 1;
  }

  return { moved, removedDuplicates };
}

function getTargetTextFiles() {
  const targetFiles = [path.join(ROOT, "src", "data", "assets.ts")];

  if (fs.existsSync(CSS_DIR)) {
    const cssFiles = fs
      .readdirSync(CSS_DIR)
      .filter((name) => name.endsWith(".css"))
      .map((name) => path.join(CSS_DIR, name));
    targetFiles.push(...cssFiles);
  }

  return targetFiles;
}

function renameWithMap(directory, renameMap) {
  const replacements = new Map();
  const entries = Object.entries(renameMap);

  for (const [oldName, newName] of entries) {
    if (oldName === newName) continue;

    const oldPath = path.join(directory, oldName);
    const newPath = path.join(directory, newName);

    if (!fs.existsSync(oldPath)) continue;
    if (fs.existsSync(newPath)) {
      throw new Error(`Target already exists: ${newPath}`);
    }

    fs.renameSync(oldPath, newPath);
    replacements.set(oldName, newName);
  }

  return replacements;
}

function renameRemoteAssets(directory) {
  const replacements = new Map();
  const fileNames = fs
    .readdirSync(directory)
    .filter((name) => fs.statSync(path.join(directory, name)).isFile());
  const reserved = new Set(fileNames);

  for (const oldName of fileNames) {
    const extension = path.extname(oldName).toLowerCase();
    const rawBase = path.basename(oldName, path.extname(oldName));
    const normalizedBase = normalizeRemoteBaseName(rawBase);
    let candidate = `${normalizedBase}${extension}`;
    let counter = 2;

    while (reserved.has(candidate) && candidate !== oldName) {
      candidate = `${normalizedBase}-${counter}${extension}`;
      counter += 1;
    }

    reserved.add(candidate);

    if (candidate === oldName) continue;

    const oldPath = path.join(directory, oldName);
    const newPath = path.join(directory, candidate);
    fs.renameSync(oldPath, newPath);
    replacements.set(oldName, candidate);
  }

  return replacements;
}

function applyReplacementsToFiles(replacements, files) {
  for (const filePath of files) {
    if (!fs.existsSync(filePath)) continue;
    let content = fs.readFileSync(filePath, "utf8");
    let updated = content;

    for (const [fromValue, toValue] of replacements.entries()) {
      if (!updated.includes(fromValue)) continue;
      updated = updated.split(fromValue).join(toValue);
    }

    if (updated !== content) {
      fs.writeFileSync(filePath, updated, "utf8");
    }
  }
}

function mergeMaps(...maps) {
  const merged = new Map();

  for (const map of maps) {
    for (const [oldName, newName] of map.entries()) {
      if (oldName === newName) continue;
      merged.set(oldName, newName);
    }
  }

  return merged;
}

function buildPathReplacementMap({
  remoteReplacements,
  imageMappings,
  fontMappings,
}) {
  const replacements = new Map();

  for (const [oldName, newName] of remoteReplacements.entries()) {
    replacements.set(`/assets/remote/${oldName}`, `/assets/remote/${newName}`);
  }

  for (const [oldName, newName] of imageMappings.entries()) {
    replacements.set(`../images/${oldName}`, `../images/${newName}`);
    replacements.set(`/assets/images/${oldName}`, `/assets/images/${newName}`);
    replacements.set(`/${oldName}`, `/assets/images/${newName}`);
  }

  for (const [oldName, newName] of fontMappings.entries()) {
    replacements.set(`../fonts/${oldName}`, `../fonts/${newName}`);
    replacements.set(`/assets/fonts/${oldName}`, `/assets/fonts/${newName}`);
  }

  return replacements;
}

function main() {
  const targetTextFiles = getTargetTextFiles();
  const rootImageRelocation = relocateLegacyRootImages(IMAGE_FILE_MAP);
  const remoteReplacements = renameRemoteAssets(REMOTE_DIR);
  const imageReplacements = renameWithMap(IMAGES_DIR, IMAGE_FILE_MAP);
  const fontReplacements = renameWithMap(FONTS_DIR, FONT_FILE_MAP);
  const imageMappings = mergeMaps(
    new Map(Object.entries(IMAGE_FILE_MAP)),
    imageReplacements,
  );
  const fontMappings = mergeMaps(
    new Map(Object.entries(FONT_FILE_MAP)),
    fontReplacements,
  );

  const pathReplacements = buildPathReplacementMap({
    remoteReplacements,
    imageMappings,
    fontMappings,
  });
  applyReplacementsToFiles(pathReplacements, targetTextFiles);

  console.log(
    [
      `Renamed remote assets: ${remoteReplacements.size}`,
      `Renamed image assets: ${imageReplacements.size}`,
      `Renamed font assets: ${fontReplacements.size}`,
      `Moved root legacy images: ${rootImageRelocation.moved}`,
      `Removed root duplicate images: ${rootImageRelocation.removedDuplicates}`,
      `Updated text files: ${targetTextFiles.length}`,
    ].join("\n"),
  );
}

main();
