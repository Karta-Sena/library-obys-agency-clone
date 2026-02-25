import PageShell from "@/components/page-shell";
import { readMain } from "@/lib/read-html";

export default function ContactsPage() {
  const mainInner = readMain("contacts");
  return <PageShell mainInnerHtml={mainInner} activePage="/contacts/" />;
}
