import PageShell from "@/components/page-shell";
import { readMain } from "@/lib/read-html";

export default function HomePage() {
  const mainInner = readMain("home");
  return <PageShell mainInnerHtml={mainInner} activePage="/" />;
}
