import PageShell from "@/components/page-shell";
import { readMain } from "@/lib/read-html";

export default function BooksPage() {
  const mainInner = readMain("books");
  return <PageShell mainInnerHtml={mainInner} activePage="/books/" />;
}
