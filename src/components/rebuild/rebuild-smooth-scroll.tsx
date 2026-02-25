"use client";

import { useEffect } from "react";

function prefersReducedMotion() {
  if (typeof window === "undefined") return true;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function isTouchDevice() {
  if (typeof window === "undefined") return false;
  return (
    "ontouchstart" in window ||
    navigator.maxTouchPoints > 0 ||
    window.matchMedia("(pointer: coarse)").matches
  );
}

export default function RebuildSmoothScroll() {
  useEffect(() => {
    if (prefersReducedMotion() || isTouchDevice()) return;

    const root = document.documentElement;
    root.classList.add("lenis", "lenis-smooth");

    return () => {
      root.classList.remove("lenis", "lenis-smooth");
    };
  }, []);

  return null;
}
