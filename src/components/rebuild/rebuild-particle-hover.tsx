"use client";

import { useEffect } from "react";

type ParticleSample = {
  image: HTMLImageElement;
  sampleWidth: number;
  sampleHeight: number;
  grayscale: Uint8ClampedArray;
};

const BASE_COLOR = "rgba(60, 60, 60, 1)";
const SAMPLE_SIZE = 120;

function supportsHover() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(hover: hover) and (pointer: fine)").matches;
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

async function createSample(src: string): Promise<ParticleSample> {
  const image = await loadImage(src);
  const aspect = image.width / image.height || 1;
  const sampleWidth = SAMPLE_SIZE;
  const sampleHeight = Math.max(1, Math.round(SAMPLE_SIZE / aspect));

  const canvas = document.createElement("canvas");
  canvas.width = sampleWidth;
  canvas.height = sampleHeight;
  const ctx = canvas.getContext("2d");
  if (!ctx) {
    return {
      image,
      sampleWidth,
      sampleHeight,
      grayscale: new Uint8ClampedArray(),
    };
  }

  ctx.drawImage(image, 0, 0, sampleWidth, sampleHeight);
  const data = ctx.getImageData(0, 0, sampleWidth, sampleHeight).data;
  const grayscale = new Uint8ClampedArray(sampleWidth * sampleHeight);
  for (let i = 0; i < grayscale.length; i += 1) {
    const offset = i * 4;
    const r = data[offset];
    const g = data[offset + 1];
    const b = data[offset + 2];
    grayscale[i] = Math.round(0.299 * r + 0.587 * g + 0.114 * b);
  }

  return { image, sampleWidth, sampleHeight, grayscale };
}

function getParticleImageFromEvent(event: Event): HTMLImageElement | null {
  const target = event.target as HTMLElement | null;
  if (!target) return null;
  if (target instanceof HTMLImageElement && target.hasAttribute("data-particle-image")) {
    return target;
  }
  const closestCase = target.closest("[data-case]");
  if (closestCase) {
    const img = closestCase.querySelector<HTMLImageElement>("[data-particle-image]");
    if (img) return img;
  }
  return null;
}

export default function RebuildParticleHover() {
  useEffect(() => {
    if (!supportsHover()) return;

    const containers = Array.from(
      document.querySelectorAll<HTMLElement>("[data-animation='particle-hover']"),
    );
    if (!containers.length) return;

    const canvas = document.createElement("canvas");
    canvas.className = "case-canvas";
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    document.body.appendChild(canvas);

    let width = 0;
    let height = 0;
    let dpr = Math.max(1, Math.min(window.devicePixelRatio || 1, 2));
    let active = false;
    let targetProgress = 0;
    let progress = 0;
    let raf = 0;
    let time = 0;
    let cursorX = window.innerWidth * 0.5;
    let cursorY = window.innerHeight * 0.5;
    let currentImageEl: HTMLImageElement | null = null;
    let currentSample: ParticleSample | null = null;
    let samples = new Map<HTMLImageElement, ParticleSample>();

    const resize = () => {
      dpr = Math.max(1, Math.min(window.devicePixelRatio || 1, 2));
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * dpr * 0.7);
      canvas.height = Math.floor(height * dpr * 0.7);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr * 0.7, 0, 0, dpr * 0.7, 0, 0);
    };

    const ensureSample = async (img: HTMLImageElement) => {
      if (samples.has(img)) return samples.get(img) || null;
      const src = img.getAttribute("data-src") || img.getAttribute("src");
      if (!src) return null;
      try {
        const sample = await createSample(src);
        samples.set(img, sample);
        return sample;
      } catch {
        return null;
      }
    };

    const handleEnter = async (event: Event) => {
      active = true;
      targetProgress = 1;
      const img = getParticleImageFromEvent(event);
      if (img && img !== currentImageEl) {
        currentImageEl = img;
        currentSample = await ensureSample(img);
        progress = 0;
      }
    };

    const handleLeave = () => {
      active = false;
      targetProgress = 0;
    };

    const handleMove = async (event: MouseEvent) => {
      cursorX = event.clientX;
      cursorY = event.clientY;
      const img = getParticleImageFromEvent(event);
      if (img && img !== currentImageEl) {
        currentImageEl = img;
        currentSample = await ensureSample(img);
        progress = 0;
      }
    };

    const draw = () => {
      raf = window.requestAnimationFrame(draw);
      time += 0.016;
      progress += (targetProgress - progress) * 0.1;

      ctx.clearRect(0, 0, width, height);
      if (!currentSample || progress < 0.02) return;

      const { sampleWidth, sampleHeight, grayscale } = currentSample;
      const imgWidth = width * 0.7;
      const imgHeight = (imgWidth / sampleWidth) * sampleHeight;
      const baseX = 0;
      const baseY = (height - imgHeight) * 0.5;
      const offsetX = (cursorX / width - 0.5) * 60;
      const offsetY = (cursorY / height - 0.5) * 60;
      const drawX = baseX + offsetX;
      const drawY = baseY + offsetY;
      const cell = Math.min(imgWidth / sampleWidth, imgHeight / sampleHeight);

      ctx.fillStyle = BASE_COLOR;
      ctx.globalAlpha = progress;

      for (let y = 0; y < sampleHeight; y += 1) {
        for (let x = 0; x < sampleWidth; x += 1) {
          const idx = y * sampleWidth + x;
          const gray = grayscale[idx] / 255;
          const wave = Math.sin((x + y) * 0.12 + time * 3) * 0.05 + 0.95;
          const size = (1 - gray) * 0.7 * wave;
          if (size <= 0.01) continue;
          const half = (size * cell) / 2;
          const cx = drawX + x * cell + cell / 2;
          const cy = drawY + y * cell + cell / 2;
          ctx.fillRect(cx - half, cy - half, half * 2, half * 2);
        }
      }
    };

    resize();
    raf = window.requestAnimationFrame(draw);
    window.addEventListener("resize", resize);

    containers.forEach((container) => {
      container.addEventListener("mouseenter", handleEnter);
      container.addEventListener("mousemove", handleMove);
      container.addEventListener("mouseleave", handleLeave);
    });

    return () => {
      window.cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      containers.forEach((container) => {
        container.removeEventListener("mouseenter", handleEnter);
        container.removeEventListener("mousemove", handleMove);
        container.removeEventListener("mouseleave", handleLeave);
      });
      canvas.remove();
      samples.clear();
    };
  }, []);

  return null;
}
