import PageShell from "@/components/page-shell";
import { readMain } from "@/lib/read-html";

export default function CreditsPage() {
  const mainInner = readMain("credits");
  return <PageShell mainInnerHtml={mainInner} activePage="/credits/" />;
}
