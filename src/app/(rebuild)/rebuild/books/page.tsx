import RebuildShell from "@/components/rebuild/rebuild-shell";
import { books } from "@/data/books";
import { siteCopy } from "@/data/site";

const ledgerRows = Array.from({ length: 2 }).map((_, rowIndex) => (
  <div key={`ledger-${rowIndex}`} className="flex book-ledger animate-crawling-line">
    {Array.from({ length: 17 }).map((__, index) => (
      <div
        key={`ledger-item-${rowIndex}-${index}`}
        className="aspect-[38/175] h-[17.5rem] w-auto flex-shrink-0 book-item px-4"
      />
    ))}
  </div>
));

export default function RebuildBooksPage() {
  return (
    <RebuildShell activePath="/rebuild/books/">
      <div
        className="pt-[47vw] pb-100 md:pb-200 laptop:pb-350 md:pt-240 relative -left-10 md:left-0 max-w-[82.8rem]"
        data-page-content="/rebuild/books/"
      >
        <div className="bg-texture--white inset-wrapper shadow pb-120 relative">
          <div className="relative h-30 border-b border-current grid grid-cols-12 gap-x-16 text-xs laptop:text-sm font-bold mb-10 md:mb-0 container">
            <div className="col-span-4 flex items-center">
              <div className="pr-16 border-r border-current h-full gap-x-3 flex items-center justify-center">
                <span className="w-9 h-9 rounded-full bg-current" />
                <span className="w-9 h-9 rounded-full bg-current opacity-50" />
              </div>
              <div className="flex-grow px-10 py-5">Books</div>
            </div>
            <div className="col-span-8 flex items-center justify-end md:justify-between py-5">
              <div className="hidden md:block">Obys Agency</div>
              <div className="text-right">©2025</div>
            </div>
          </div>

          <div className="md:grid md:grid-cols-12 md:gap-x-16 container border-b border-current">
            <div className="md:col-span-4 md:border-r md:border-current py-10 md:flex md:flex-col -mx-12 px-12 md:px-0 border-b border-current md:mx-0 md:border-b-0">
              <p className="font-bold mb-120 md:mb-20">ODB Books:</p>
              <div className="mt-auto">
                <h2 className="mb-0 leading-[0.92] -tracking-[0.03em]">{siteCopy.booksIntro}</h2>
              </div>
            </div>
            <div className="md:col-span-8 pt-10 md:pt-5">
              <h1 className="mb-40 md:mb-60 leading-[0.84] md:-ml-[0.05em]">
                Books We Recommend
              </h1>
              <div className="overflow-hidden pt-40 -mt-40 flex mix-blend-multiply pb-12 -mx-12 px-12 md:-mx-16 md:px-16">
                {ledgerRows}
              </div>
            </div>
          </div>

          <div className="relative" data-animation="particle-hover">
            {books.map((book, index) => (
              <a
                key={book.slug}
                className="block border-b border-current pt-10 pb-25 md:pb-40 container md:grid md:grid-cols-12 md:gap-x-16 relative group"
                href={`/rebuild/books/${book.slug}/`}
                data-case={`/rebuild/books/${book.slug}/`}
              >
                <span className="bg-gray absolute left-0 top-0 w-full h-full opacity-0 transition-opacity duration-500 group-hover:opacity-100 mix-blend-multiply pointer-events-none" />
                <div className="md:col-span-4 hidden md:block">
                  <p className="h2 mb-0">{index + 1}</p>
                </div>
                <div className="md:col-span-8 flex items-start justify-between relative">
                  <img
                    data-src={book.hoverImage}
                    data-particle-image=""
                    alt={book.title}
                  />
                  <div className="flex-grow pr-20">
                    <h2
                      className="mb-5"
                      dangerouslySetInnerHTML={{ __html: book.titleHtml }}
                    />
                    <p className="mb-0 font-bold">
                      ({book.author}
                      {book.year ? `, ${book.year}` : ""})
                    </p>
                  </div>
                  <div className="flex-shrink-0 relative md:top-2">
                    <span className="badge">{book.badge}</span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </RebuildShell>
  );
}
