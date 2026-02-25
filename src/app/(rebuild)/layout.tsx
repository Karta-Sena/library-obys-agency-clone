import type { ReactNode } from "react";
import RebuildBoot from "@/components/rebuild/rebuild-boot";
import "./rebuild.css";

export default function RebuildLayout({ children }: { children: ReactNode }) {
  return (
    <div className="rebuild-root" data-rebuild="">
      <RebuildBoot />
      {children}
    </div>
  );
}
