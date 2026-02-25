"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const BLOCK_SELECTOR =
  "[data-page-content] h1, [data-page-content] .h1, [data-page-content] .h2, [data-page-content] .case-block, [data-page-content] .reveal-svgs, [data-page-content] .book-ledger, [data-page-content] .double-side-block__container, [data-page-content] footer";

function supportsMotion() {
  if (typeof window === "undefined") return false;
  return !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export default function RebuildScrollMotion() {
  const pathname = usePathname();

  useEffect(() => {
    if (!supportsMotion()) return;

    gsap.registerPlugin(ScrollTrigger);
    const scrollWrapper = document.querySelector<HTMLElement>("[data-scroll-wrapper]");
    if (!scrollWrapper) return;

    const root = document.documentElement;
    const markReady = (element: HTMLElement) => {
      element.dataset.motionReady = "true";
    };
    const clearReady = (element: HTMLElement) => {
      delete element.dataset.motionReady;
    };

    const context = gsap.context(() => {
      const blocks = gsap.utils.toArray<HTMLElement>(BLOCK_SELECTOR);
      blocks.forEach((element) => {
        if (!element || element.dataset.motionReady === "true") return;
        markReady(element);
        gsap.set(element, { autoAlpha: 0, y: 24, willChange: "transform, opacity" });
        gsap.to(element, {
          autoAlpha: 1,
          y: 0,
          duration: 0.85,
          ease: "power3.out",
          clearProps: "willChange",
          scrollTrigger: {
            scroller: scrollWrapper,
            trigger: element,
            start: "top 88%",
            end: "bottom 15%",
            toggleActions: "play none none reverse",
          },
        });
      });

      const staggerTargets = gsap.utils.toArray<HTMLElement>("[data-page-content] [data-stagger]");
      if (staggerTargets.length) {
        gsap.set(staggerTargets, {
          autoAlpha: 0,
          y: 12,
          willChange: "transform, opacity",
        });
        ScrollTrigger.batch(staggerTargets, {
          scroller: scrollWrapper,
          start: "top 92%",
          onEnter: (batch) =>
            gsap.to(batch, {
              autoAlpha: 1,
              y: 0,
              duration: 0.5,
              stagger: 0.04,
              ease: "power2.out",
              clearProps: "willChange",
            }),
          onLeaveBack: (batch) =>
            gsap.to(batch, {
              autoAlpha: 0,
              y: 12,
              duration: 0.3,
              stagger: 0.02,
              ease: "power1.inOut",
            }),
        });
      }
    }, scrollWrapper);

    const onReadyChange = () => {
      if (root.classList.contains("is-ready")) {
        ScrollTrigger.refresh();
      }
    };

    const readyObserver = new MutationObserver(onReadyChange);
    readyObserver.observe(root, { attributes: true, attributeFilter: ["class"] });

    ScrollTrigger.refresh();

    return () => {
      readyObserver.disconnect();
      const animatedBlocks = gsap.utils.toArray<HTMLElement>(BLOCK_SELECTOR);
      animatedBlocks.forEach(clearReady);
      context.revert();
    };
  }, [pathname]);

  return null;
}
