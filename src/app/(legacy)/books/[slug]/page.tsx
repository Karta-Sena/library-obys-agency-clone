import PageShell from "@/components/page-shell";
import { listBookSlugs, readBookMain } from "@/lib/read-html";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return listBookSlugs().map((slug) => ({ slug }));
}

export default function BookDetailPage({ params }: { params: { slug: string } }) {
  try {
    const mainInner = readBookMain(params.slug);
    return <PageShell mainInnerHtml={mainInner} activePage={null} />;
  } catch {
    notFound();
  }
}
