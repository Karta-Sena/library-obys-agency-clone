"use client";

import { useEffect, useMemo } from "react";
import { usePathname } from "next/navigation";
import { gsap } from "gsap";

const STORAGE_KEY = "rebuild-page-order";

const PAGES = [
  "/rebuild/",
  "/rebuild/books/",
  "/rebuild/credits/",
  "/rebuild/contacts/",
];

const DEFAULT_ORDER: Record<string, string[]> = {
  "/rebuild/": ["/rebuild/", "/rebuild/books/", "/rebuild/contacts/", "/rebuild/credits/"],
  "/rebuild/books/": ["/rebuild/books/", "/rebuild/", "/rebuild/contacts/", "/rebuild/credits/"],
  "/rebuild/credits/": [
    "/rebuild/credits/",
    "/rebuild/",
    "/rebuild/books/",
    "/rebuild/contacts/",
  ],
  "/rebuild/contacts/": [
    "/rebuild/contacts/",
    "/rebuild/",
    "/rebuild/books/",
    "/rebuild/credits/",
  ],
};

const THUMBS: Record<string, string> = {
  "/rebuild/": "/assets/static/about.avif",
  "/rebuild/books/": "/assets/static/books.avif",
  "/rebuild/credits/": "/assets/static/logo.png",
  "/rebuild/contacts/": "/assets/static/contacts.avif",
};
const DRAG_TRANSITION = "transform 0.32s cubic-bezier(0.43, 0.195, 0.02, 1)";

function normalizePath(value?: string | null): string {
  if (!value) return "/rebuild/";
  if (value.startsWith("/rebuild/books/") && value !== "/rebuild/books/") {
    return "/rebuild/books/";
  }
  if (!value.endsWith("/")) return `${value}/`;
  return value;
}

function isCasePath(value?: string | null): boolean {
  if (!value) return false;
  return value.startsWith("/rebuild/books/") && value !== "/rebuild/books/";
}

function arrayMove<T>(list: T[], from: number, to: number): T[] {
  const next = [...list];
  const [item] = next.splice(from, 1);
  next.splice(to, 0, item);
  return next;
}

function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value));
}

function supportsMotion() {
  if (typeof window === "undefined") return false;
  return !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

type Metrics = {
  offsets: number[];
  heights: number[];
  total: number;
};

function getMetrics(items: HTMLElement[]): Metrics {
  const heights = items.map((el) => el.getBoundingClientRect().height || 0);
  const offsets: number[] = [];
  heights.forEach((height, index) => {
    offsets.push(index === 0 ? 0 : offsets[index - 1] + heights[index - 1]);
  });
  const total = heights.reduce((sum, height) => sum + height, 0);
  return { offsets, heights, total };
}

function applyPositions(
  holder: HTMLElement,
  items: HTMLElement[],
  offsets: number[],
  skip?: HTMLElement,
) {
  items.forEach((item, index) => {
    if (item === skip) return;
    item.style.transform = `translateY(${offsets[index]}px)`;
  });
  holder.style.height = `${offsets[offsets.length - 1] || 0}px`;
  if (items.length && offsets.length) {
    const lastIndex = offsets.length - 1;
    const lastItem = items[lastIndex];
    const lastRect = lastItem.getBoundingClientRect().height || 0;
    holder.style.height = `${offsets[lastIndex] + lastRect}px`;
  }
}

function animatePageStack(order: string[], animate = true) {
  const pageContainers = Array.from(
    document.querySelectorAll<HTMLElement>("[data-page]"),
  );
  const canAnimate = animate && supportsMotion();

  pageContainers.forEach((container) => {
    const path = normalizePath(container.getAttribute("data-page"));
    const indexInOrder = order.indexOf(path);
    const stackIndex = indexInOrder === -1 ? order.length - 1 : indexInOrder;
    const targetY = stackIndex * 10;
    const targetScale = 1 - Math.min(stackIndex * 0.025, 0.08);
    const targetAlpha = stackIndex === 0 ? 1 : Math.max(0.55, 1 - stackIndex * 0.14);

    gsap.killTweensOf(container);
    if (!canAnimate) {
      gsap.set(container, {
        y: targetY,
        scale: targetScale,
        autoAlpha: targetAlpha,
        transformOrigin: "top center",
      });
      return;
    }

    gsap.to(container, {
      y: targetY,
      scale: targetScale,
      autoAlpha: targetAlpha,
      transformOrigin: "top center",
      duration: 0.45,
      ease: "power3.out",
      overwrite: "auto",
    });
  });
}

function applyPageOrder(order: string[], options?: { animate?: boolean }) {
  const pageContainers = Array.from(
    document.querySelectorAll<HTMLElement>("[data-page]"),
  );
  order.forEach((path, index) => {
    const target = pageContainers.find(
      (el) => normalizePath(el.getAttribute("data-page")) === path,
    );
    if (!target) return;
    target.style.zIndex = `${order.length - index}`;
    if (index === 0) target.classList.add("page-is-active");
    else target.classList.remove("page-is-active");
  });
  animatePageStack(order, options?.animate ?? true);
}

function getStoredOrder(): string[] | null {
  try {
    const stored = sessionStorage.getItem(STORAGE_KEY);
    if (!stored) return null;
    const parsed = JSON.parse(stored);
    if (!Array.isArray(parsed)) return null;
    const normalized = parsed.filter((item) => PAGES.includes(item));
    if (normalized.length !== PAGES.length) return null;
    return normalized;
  } catch {
    return null;
  }
}

function setStoredOrder(order: string[]) {
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(order));
  } catch {
    // ignore storage errors
  }
}

export default function RebuildPagesController() {
  const pathname = usePathname();
  const activePath = useMemo(() => normalizePath(pathname), [pathname]);

  useEffect(() => {
    const holder = document.querySelector<HTMLElement>("[data-sticky-nav]");
    if (!holder) return;

    const root = document.documentElement;
    const existingItems = Array.from(
      holder.querySelectorAll<HTMLElement>("[data-draggable-page]"),
    );
    const itemMap = new Map<string, HTMLElement>();

    if (existingItems.length) {
      existingItems.forEach((item) => {
        const id = normalizePath(item.getAttribute("data-draggable-page"));
        itemMap.set(id, item);
      });
    } else {
      holder.innerHTML = "";
      PAGES.forEach((path) => {
        const item = document.createElement("div");
        item.className = "draggable-item";
        item.setAttribute("data-draggable-page", path);
        const img = document.createElement("img");
        img.width = 58;
        img.height = 58;
        img.setAttribute("data-page-preview", path);
        img.alt = `${path} preview`;
        img.src = THUMBS[path] || THUMBS["/rebuild/"];
        item.appendChild(img);
        holder.appendChild(item);
        itemMap.set(path, item);
      });
    }

    let order = getStoredOrder() || DEFAULT_ORDER[activePath] || [...PAGES];
    if (!order.includes(activePath)) {
      order = DEFAULT_ORDER["/rebuild/"];
    }
    if (order[0] !== activePath) {
      order = [activePath, ...order.filter((path) => path !== activePath)];
    }

    let items = order.map((path) => itemMap.get(path)).filter(Boolean) as HTMLElement[];
    holder.innerHTML = "";
    items.forEach((item) => holder.appendChild(item));

    const syncItemMotionStyle = () => {
      items.forEach((item) => {
        if (!item.classList.contains("is-dragging")) {
          item.style.transition = DRAG_TRANSITION;
        }
        item.style.touchAction = "none";
      });
    };

    syncItemMotionStyle();

    let metrics = getMetrics(items);
    applyPositions(holder, items, metrics.offsets);
    applyPageOrder(order, { animate: false });
    setStoredOrder(order);

    let pagesAnimatingTimer: number | null = null;
    const triggerPageAnimation = () => {
      root.classList.add("pages-animating");
      if (pagesAnimatingTimer) window.clearTimeout(pagesAnimatingTimer);
      pagesAnimatingTimer = window.setTimeout(() => {
        root.classList.remove("pages-animating");
        pagesAnimatingTimer = null;
      }, 350);
    };

    const handlePageClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      if (!target) return;
      if (target.closest("a")) return;
      const pageContent = target.closest<HTMLElement>("[data-page-content]");
      if (!pageContent) return;
      const pagePath = normalizePath(pageContent.getAttribute("data-page-content"));
      if (!PAGES.includes(pagePath)) return;
      if (order[0] === pagePath) return;
      order = DEFAULT_ORDER[pagePath] || [pagePath, ...PAGES.filter((p) => p !== pagePath)];
      items = order
        .map((path) => itemMap.get(path))
        .filter(Boolean) as HTMLElement[];
      holder.innerHTML = "";
      items.forEach((entry) => holder.appendChild(entry));
      syncItemMotionStyle();
      metrics = getMetrics(items);
      applyPositions(holder, items, metrics.offsets);
      applyPageOrder(order);
      setStoredOrder(order);
      triggerPageAnimation();
    };

    document.addEventListener("click", handlePageClick);

    const teardown: Array<() => void> = [];

    items.forEach((item) => {
      let dragState:
        | {
            pointerId: number;
            startY: number;
            startOffset: number;
            index: number;
            moved: boolean;
          }
        | undefined;

      const onPointerMove = (event: PointerEvent) => {
        if (!dragState || event.pointerId !== dragState.pointerId) return;
        const delta = event.clientY - dragState.startY;
        if (Math.abs(delta) > 3) dragState.moved = true;
        const newY = dragState.startOffset + delta;
        item.style.transform = `translateY(${newY}px)`;

        const midpoint = newY + metrics.heights[dragState.index] / 2;
        let targetIndex = metrics.offsets.findIndex(
          (offset, idx) => midpoint < offset + metrics.heights[idx],
        );
        if (targetIndex === -1) targetIndex = items.length - 1;
        targetIndex = clamp(targetIndex, 0, items.length - 1);

        if (targetIndex !== dragState.index) {
          order = arrayMove(order, dragState.index, targetIndex);
          items = order
            .map((path) => itemMap.get(path))
            .filter(Boolean) as HTMLElement[];
          metrics = getMetrics(items);
          applyPositions(holder, items, metrics.offsets, item);
          dragState.index = targetIndex;
          dragState.startOffset = newY;
          dragState.startY = event.clientY;
        }
      };

      const onPointerUp = (event: PointerEvent) => {
        if (!dragState || event.pointerId !== dragState.pointerId) return;
        if (item.hasPointerCapture(event.pointerId)) {
          item.releasePointerCapture(event.pointerId);
        }
        item.classList.remove("is-dragging");
        item.style.zIndex = "";
        item.style.transition = DRAG_TRANSITION;
        metrics = getMetrics(items);
        applyPositions(holder, items, metrics.offsets);
        if (!dragState.moved) {
          const path = normalizePath(item.getAttribute("data-draggable-page"));
          if (path && order[0] !== path) {
            order = [path, ...order.filter((entry) => entry !== path)];
            items = order
              .map((entry) => itemMap.get(entry))
              .filter(Boolean) as HTMLElement[];
            metrics = getMetrics(items);
            holder.innerHTML = "";
            items.forEach((entry) => holder.appendChild(entry));
            syncItemMotionStyle();
            applyPositions(holder, items, metrics.offsets);
          }
        }
        applyPageOrder(order);
        setStoredOrder(order);
        triggerPageAnimation();
        dragState = undefined;
      };

      const onPointerDown = (event: PointerEvent) => {
        if (event.button !== 0) return;
        metrics = getMetrics(items);
        const index = items.indexOf(item);
        dragState = {
          pointerId: event.pointerId,
          startY: event.clientY,
          startOffset: metrics.offsets[index] || 0,
          index,
          moved: false,
        };
        item.setPointerCapture(event.pointerId);
        item.classList.add("is-dragging");
        item.style.transition = "none";
        item.style.zIndex = `${PAGES.length + 1}`;
      };

      item.addEventListener("pointerdown", onPointerDown);
      window.addEventListener("pointermove", onPointerMove);
      window.addEventListener("pointerup", onPointerUp);
      window.addEventListener("pointercancel", onPointerUp);

      teardown.push(() => {
        item.removeEventListener("pointerdown", onPointerDown);
        window.removeEventListener("pointermove", onPointerMove);
        window.removeEventListener("pointerup", onPointerUp);
        window.removeEventListener("pointercancel", onPointerUp);
      });
    });

    const onResize = () => {
      metrics = getMetrics(items);
      applyPositions(holder, items, metrics.offsets);
    };

    window.addEventListener("resize", onResize);
    teardown.push(() => window.removeEventListener("resize", onResize));
    teardown.push(() => document.removeEventListener("click", handlePageClick));
    teardown.push(() => {
      if (pagesAnimatingTimer) window.clearTimeout(pagesAnimatingTimer);
      root.classList.remove("pages-animating");
      const pageContainers = Array.from(
        document.querySelectorAll<HTMLElement>("[data-page]"),
      );
      pageContainers.forEach((container) => gsap.killTweensOf(container));
    });

    return () => {
      teardown.forEach((cleanup) => cleanup());
    };
  }, [activePath]);

  useEffect(() => {
    const root = document.documentElement;
    if (isCasePath(pathname)) root.classList.add("case--is-active");
    else root.classList.remove("case--is-active");
  }, [pathname]);

  return null;
}
