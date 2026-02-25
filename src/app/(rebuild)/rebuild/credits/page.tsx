import RebuildCreditsContent from "@/components/rebuild/rebuild-credits-content";
import RebuildShell from "@/components/rebuild/rebuild-shell";

export default function RebuildCreditsPage() {
  return (
    <RebuildShell activePath="/rebuild/credits/">
      <RebuildCreditsContent />
    </RebuildShell>
  );
}
