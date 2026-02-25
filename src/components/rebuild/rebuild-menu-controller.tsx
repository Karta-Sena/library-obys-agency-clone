"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const THUMB_MAP: Record<string, string> = {
  "/rebuild/": "/assets/static/about.avif",
  "/rebuild/books/": "/assets/static/books.avif",
  "/rebuild/credits/": "/assets/static/logo.png",
  "/rebuild/contacts/": "/assets/static/contacts.avif",
};

function normalizePath(value: string): string {
  if (!value) return "/";
  if (!value.endsWith("/")) return `${value}/`;
  return value;
}

export default function RebuildMenuController() {
  const pathname = usePathname();

  useEffect(() => {
    const root = document.documentElement;
    const menuOpeners = Array.from(document.querySelectorAll("[data-menu-opener]"));
    const mobileOpeners = Array.from(
      document.querySelectorAll("[data-mobile-menu-opener]"),
    );

    const toggleMenu = () => root.classList.toggle("menu--opened");
    const toggleMobile = () => root.classList.toggle("menu-mobile--opened");

    menuOpeners.forEach((btn) => btn.addEventListener("click", toggleMenu));
    mobileOpeners.forEach((btn) => btn.addEventListener("click", toggleMobile));

    return () => {
      menuOpeners.forEach((btn) => btn.removeEventListener("click", toggleMenu));
      mobileOpeners.forEach((btn) => btn.removeEventListener("click", toggleMobile));
    };
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    const path = normalizePath(pathname || "/rebuild/");
    const navLinks = Array.from(
      document.querySelectorAll<HTMLAnchorElement>("[data-nav-link]"),
    );
    const navDesktopLinks = Array.from(
      document.querySelectorAll<HTMLAnchorElement>("[data-nav-link-desktop]"),
    );
    const allLinks = [...navLinks, ...navDesktopLinks];

    allLinks.forEach((link) => {
      const href = normalizePath(link.getAttribute("href") || "");
      if (href === path) link.classList.add("is-active");
      else link.classList.remove("is-active");
    });

    const currentLabel = document.querySelector<HTMLElement>("[data-current-page-label]");
    const currentImage = document.querySelector<HTMLImageElement>(
      "[data-current-page-image]",
    );

    const activeLink = navLinks.find(
      (link) => normalizePath(link.getAttribute("href") || "") === path,
    );
    if (currentLabel && activeLink) {
      const label =
        activeLink.querySelector(".px-6")?.textContent?.trim() ||
        activeLink.textContent?.trim() ||
        "";
      currentLabel.textContent = label;
    }

    if (currentImage) {
      currentImage.src = THUMB_MAP[path] || THUMB_MAP["/rebuild/"];
    }

    const mobileThumbs = Array.from(
      document.querySelectorAll<HTMLImageElement>("[data-mobile-page-image]"),
    );
    mobileThumbs.forEach((img) => {
      const target = normalizePath(img.getAttribute("data-mobile-page-image") || "");
      const src = THUMB_MAP[target];
      if (src) img.src = src;
    });

    root.classList.remove("menu--opened", "menu-mobile--opened");
  }, [pathname]);

  return null;
}
