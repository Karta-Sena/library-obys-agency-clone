import RebuildShell from "@/components/rebuild/rebuild-shell";
import { books, type Book } from "@/data/books";
import { featuredSlugs } from "@/data/featured";
import { siteCopy } from "@/data/site";

const featuredBooks: Book[] = featuredSlugs
  .map((slug) => books.find((book) => book.slug === slug))
  .filter((book): book is Book => Boolean(book));

export default function RebuildHomePage() {
  return (
    <RebuildShell activePath="/rebuild/">
      <div
        className="pb-100 md:pb-200 laptop:pb-350 pt-[37.5vw] md:pt-70 max-w-[82.8rem]"
        data-page-content="/rebuild/"
      >
        <div className="bg-texture--gray inset-wrapper shadow">
          <div className="relative h-30 border-b border-current grid grid-cols-12 gap-x-16 text-xs laptop:text-sm font-bold mb-10 container">
            <div className="col-span-8 flex items-center">
              <div className="pr-16 border-r border-current h-full gap-x-3 flex items-center justify-center">
                <span className="w-9 h-9 rounded-full bg-current" />
                <span className="w-9 h-9 rounded-full bg-current opacity-50" />
              </div>
              <div className="flex-grow px-10 py-5">About</div>
            </div>
            <div className="col-span-4 flex items-center justify-end md:justify-between py-5">
              <div className="hidden md:block">Obys Agency</div>
              <div className="text-right">©2025</div>
            </div>
          </div>

          <section>
            <div className="md:grid md:grid-cols-12 md:gap-x-16 font-bold mix-blend-overlay mb-100 md:mb-250 container">
              <div className="md:col-span-8">
                <h1 className="mb-15 md:mb-0 leading-xs h2">{siteCopy.heroTitle}</h1>
              </div>
              <div className="md:col-span-4 md:pr-1/6">
                <p className="mb-0">{siteCopy.heroSubtitle}</p>
              </div>
            </div>

            <div className="pt-10 mb-100 container">
              <div className="md:grid md:grid-cols-12 md:gap-x-16">
                <div className="md:col-span-8 mb-12 md:mb-0">
                  <div className="mb-0 h2 mix-blend-overlay">
                    <div>Contacts:</div>
                    <div>
                      <span className="link link--underline pointer-events-none opacity-60" aria-disabled="true">
                        {siteCopy.contactEmail}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="md:col-span-4">
                  <div className="mb-0 h2 mix-blend-overlay">
                    <div>Social:</div>
                    <ul className="social-list">
                      {siteCopy.socialLinks.map((link) => (
                        <li key={link.label}>
                          <span className="link link--underline pointer-events-none opacity-60" aria-disabled="true">
                            {link.label}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t border-current pt-12 laptop:pt-4 pb-55 laptop:pb-85 px-12 md:px-16">
              <h2 className="h1 mb-0">Featured Books</h2>
            </div>
            <div data-animation="particle-hover">
              {featuredBooks.map((book, index) => (
                <a
                  key={book.slug}
                  className="border-t border-current pt-12 pb-24 laptop:pt-10 px-12 md:px-16 block relative laptop:pb-[3.6rem]"
                  href={`/rebuild/books/${book.slug}/`}
                  data-case={`/rebuild/books/${book.slug}/`}
                >
                  <img
                    data-src={book.hoverImage}
                    data-particle-image=""
                    alt={book.title}
                  />
                  <div className="flex items-baseline justify-between h2 mb-3">
                    <div
                      className="flex-grow"
                      dangerouslySetInnerHTML={{ __html: book.titleHtml }}
                    />
                    <div className="flex-shrink-0 ml-20 hidden laptop:block">
                      {index + 1}
                    </div>
                  </div>
                  <p className="mb-0 font-bold">
                    ({book.author}
                    {book.year ? `, ${book.year}` : ""})
                  </p>
                </a>
              ))}
            </div>
          </section>
        </div>
      </div>
    </RebuildShell>
  );
}
