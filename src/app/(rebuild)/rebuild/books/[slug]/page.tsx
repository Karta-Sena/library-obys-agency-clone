import RebuildShell from "@/components/rebuild/rebuild-shell";
import RebuildBookDetailContent from "@/components/rebuild/rebuild-book-detail-content";
import { bookDetails, getBookDetail } from "@/data/book-details";
import { notFound } from "next/navigation";

type Params = {
  slug: string;
};

export function generateStaticParams() {
  return bookDetails.map((book) => ({ slug: book.slug }));
}

export default function RebuildBookPage({ params }: { params: Params }) {
  const detail = getBookDetail(params.slug);
  if (!detail) {
    notFound();
  }

  return (
    <RebuildShell activePath="/rebuild/books/">
      <RebuildBookDetailContent detail={detail} />
    </RebuildShell>
  );
}
