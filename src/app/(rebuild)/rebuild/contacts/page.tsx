import RebuildContactsContent from "@/components/rebuild/rebuild-contacts-content";
import RebuildShell from "@/components/rebuild/rebuild-shell";

export default function RebuildContactsPage() {
  return (
    <RebuildShell activePath="/rebuild/contacts/">
      <RebuildContactsContent />
    </RebuildShell>
  );
}
