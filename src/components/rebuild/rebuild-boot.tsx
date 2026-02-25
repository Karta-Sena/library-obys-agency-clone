"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { gsap } from "gsap";

const PLACEHOLDER_PREFIX = "data:image/svg+xml";
const FONT_READY_TIMEOUT_MS = 2500;
const LOADED_RESOLVE_OFFSET_MS = 1300;
const READY_DELAY_AFTER_LOADED_MS = 800;

type PreloaderTimelineOptions = {
  firstLetterGroup: Element | null;
  midLetterGroup: Element | null;
  lastLetterGroup: Element | null;
  widePath: Element | null;
  midX: number;
  lastX: number;
};

function hydrateImages(scope: ParentNode) {
  const images = Array.from(scope.querySelectorAll<HTMLImageElement>("img[data-src]"));
  images.forEach((img) => {
    const dataSrc = img.getAttribute("data-src");
    if (!dataSrc) return;
    const currentSrc = img.getAttribute("src") || "";
    if (!currentSrc || currentSrc.startsWith(PLACEHOLDER_PREFIX)) {
      img.setAttribute("src", dataSrc);
    }
    if (!img.hasAttribute("loading")) {
      img.setAttribute("loading", "lazy");
    }
  });
}

async function waitForFontsReady(timeoutMs: number) {
  if (typeof document === "undefined" || !("fonts" in document)) return;
  try {
    await Promise.race([
      document.fonts.ready,
      new Promise<void>((resolve) => {
        window.setTimeout(resolve, timeoutMs);
      }),
    ]);
  } catch {
    // fallback: continue preload flow even if fonts API fails
  }
}

function prepareLogoPreloaderState(logo: Element | null) {
  if (!logo) return;
  const widePath = logo.querySelector("[data-wide-path]");
  if (widePath) {
    gsap.set(widePath, { scaleX: 0, transformOrigin: "right" });
  }
  gsap.set(logo, { opacity: 1 });
}

function applyTouchClass(root: HTMLElement) {
  const isTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
  root.classList.toggle("touchevents", isTouch);
  root.classList.toggle("no-touchevents", !isTouch);
}

function createPreloaderTimeline({
  firstLetterGroup,
  midLetterGroup,
  lastLetterGroup,
  widePath,
  midX,
  lastX,
}: PreloaderTimelineOptions) {
  const timeline = gsap.timeline({ delay: 0.3, paused: true });
  if (!firstLetterGroup || !midLetterGroup || !lastLetterGroup || !widePath) {
    return timeline;
  }

  const intro = gsap.fromTo(
    [firstLetterGroup, midLetterGroup, lastLetterGroup],
    { yPercent: -120 },
    {
      yPercent: 0,
      ease: "circ.out",
      stagger: 0.1,
      duration: 0.9,
    },
  );
  const stretch = gsap.to(widePath, {
    scaleX: 1,
    ease: "power3.inOut",
    duration: 0.5,
    transformOrigin: "right",
  });
  const collapse = gsap.to(widePath, {
    scaleX: 0,
    transformOrigin: "left",
    ease: "power3.out",
    duration: 1.5,
  });
  const slideMid = gsap.to(midLetterGroup, {
    x: midX,
    ease: "power3.out",
    duration: 1.1,
  });
  const slideLast = gsap.to(lastLetterGroup, {
    x: lastX,
    ease: "power3.out",
    duration: 1.1,
  });

  timeline.add(intro).add(stretch).add(collapse).add(slideMid, "<").add(slideLast, "<");
  return timeline;
}

export default function RebuildBoot() {
  const pathname = usePathname();

  useEffect(() => {
    const root = document.documentElement;
    root.classList.add("is-loading", "show-loading-screen", "rebuild-mode");
    root.classList.remove("is-loaded", "is-ready");
    applyTouchClass(root);
    document.body.classList.add("rebuild-mode");

    let destroyed = false;
    const timers: number[] = [];
    const timelines: gsap.core.Timeline[] = [];

    const desktopLogo = document.querySelector("[data-header-logo-desktop]");
    const mobileLogo = document.querySelector("[data-header-logo-mobile]");
    prepareLogoPreloaderState(desktopLogo);
    prepareLogoPreloaderState(mobileLogo);

    hydrateImages(document);

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (!(node instanceof HTMLElement)) return;
          hydrateImages(node);
        });
      });
    });
    observer.observe(document.body, { childList: true, subtree: true });

    const runPreloader = async () => {
      await waitForFontsReady(FONT_READY_TIMEOUT_MS);
      if (destroyed) return;

      root.classList.remove("show-loading-screen");

      const desktopTimeline = createPreloaderTimeline({
        firstLetterGroup: desktopLogo?.querySelector("[data-first-letter]") || null,
        midLetterGroup: desktopLogo?.querySelector("[data-mid-letter]") || null,
        lastLetterGroup: desktopLogo?.querySelector("[data-last-letter]") || null,
        widePath: desktopLogo?.querySelector("[data-wide-path]") || null,
        midX: -590,
        lastX: -1179,
      });
      const mobileTimeline = createPreloaderTimeline({
        firstLetterGroup: mobileLogo?.querySelector("[data-first-letter]") || null,
        midLetterGroup: mobileLogo?.querySelector("[data-mid-letter]") || null,
        lastLetterGroup: mobileLogo?.querySelector("[data-last-letter]") || null,
        widePath: mobileLogo?.querySelector("[data-wide-path]") || null,
        midX: -74,
        lastX: -148,
      });

      timelines.push(desktopTimeline, mobileTimeline);
      desktopTimeline.play(0);
      mobileTimeline.play(0);

      const baseDuration = Math.max(desktopTimeline.duration(), mobileTimeline.duration());
      const loadedDelay = Math.max(
        0,
        Math.round(baseDuration * 1000 - LOADED_RESOLVE_OFFSET_MS),
      );

      const loadedTimer = window.setTimeout(() => {
        if (destroyed) return;
        root.classList.add("is-loaded");
        root.classList.remove("is-loading");
      }, loadedDelay);
      const readyTimer = window.setTimeout(() => {
        if (destroyed) return;
        root.classList.add("is-ready");
      }, loadedDelay + READY_DELAY_AFTER_LOADED_MS);

      timers.push(loadedTimer, readyTimer);
    };

    runPreloader();

    return () => {
      destroyed = true;
      timers.forEach((timer) => window.clearTimeout(timer));
      timelines.forEach((timeline) => timeline.kill());
      observer.disconnect();
      root.classList.remove(
        "rebuild-mode",
        "is-loading",
        "show-loading-screen",
        "is-ready",
        "is-loaded",
        "touchevents",
        "no-touchevents",
      );
      document.body.classList.remove("rebuild-mode");
    };
  }, []);

  useEffect(() => {
    hydrateImages(document);
  }, [pathname]);

  return null;
}
