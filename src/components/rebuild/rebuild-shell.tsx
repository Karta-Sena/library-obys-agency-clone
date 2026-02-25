import type { ReactNode } from "react";
import RebuildHeader from "@/components/rebuild/rebuild-header";
import RebuildMenuController from "@/components/rebuild/rebuild-menu-controller";
import RebuildPagesController from "@/components/rebuild/rebuild-pages-controller";
import RebuildPagesGrid from "@/components/rebuild/rebuild-pages-grid";
import RebuildStickyNav from "@/components/rebuild/rebuild-sticky-nav";
import RebuildParticleHover from "@/components/rebuild/rebuild-particle-hover";
import RebuildSmoothScroll from "@/components/rebuild/rebuild-smooth-scroll";
import RebuildScrollMotion from "@/components/rebuild/rebuild-scroll-motion";
import RebuildSvgSprite from "@/components/rebuild/rebuild-svg-sprite";

type RebuildShellProps = {
  children: ReactNode;
  activePath?: string | null;
};

export default function RebuildShell({ children, activePath }: RebuildShellProps) {
  return (
    <>
      <div className="wrapper" data-scroll-wrapper="">
        <div className="page-holder relative" data-scroller="">
          <div data-transitions-container="">
            <RebuildHeader />
            <RebuildMenuController />
            <RebuildPagesController />
            <RebuildParticleHover />
            <RebuildSmoothScroll />
            <RebuildScrollMotion />
            <main className="main" data-component="pages">
              <RebuildStickyNav />
              <RebuildPagesGrid activePath={activePath} />
              {children}
            </main>
            <RebuildSvgSprite />
          </div>
        </div>
      </div>
      <div className="absolute left-0 p-12 md:p-20 z-[9]" data-loading-overlay="">
        <div className="flex items-center loader" />
      </div>
    </>
  );
}
