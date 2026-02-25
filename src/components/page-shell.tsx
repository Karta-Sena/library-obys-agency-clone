import Header from "@/components/header";
import { readPartial } from "@/lib/read-html";

const AFTER_WRAPPER_HTML = readPartial("after-wrapper.html");
const STICKY_NAV_HTML =
  '<div class="fixed left-0 top-240 md:px-20 w-140" data-sticky-nav=""></div>';

const PAGE_DEFS = [
  {
    path: "/",
    className:
      "col-start-1 md:col-span-8 md:col-start-4 laptop:col-span-7 laptop:col-start-4 row-start-1 md:-ml-20",
  },
  {
    path: "/books/",
    className:
      "col-start-1 md:col-span-8 md:col-start-3 laptop:col-span-7 laptop:col-start-3 row-start-1",
  },
  {
    path: "/credits/",
    className:
      "col-start-1 md:col-span-6 md:-right-40 laptop:right-0 md:col-start-6 row-start-1",
  },
  {
    path: "/contacts/",
    className:
      "col-start-1 md:col-span-6 md:col-start-7 laptop:col-span-4 laptop:col-start-9 row-start-1 relative -right-6 md:-right-15",
  },
];

function renderPagesGridHtml(activePage?: string | null): string {
  const items = PAGE_DEFS.map((page) => {
    const activeClass = activePage === page.path ? " page-is-active" : "";
    return `<div class="${page.className}${activeClass}" data-page="${page.path}"></div>`;
  }).join("");

  return `<div class="grid grid-cols-1 px-12 md:grid-cols-12 md:gap-x-20 md:px-20 items-start pages-grid">${items}</div>`;
}

type PageShellProps = {
  activePage?: string | null;
  mainInnerHtml: string;
};

export default function PageShell({ activePage, mainInnerHtml }: PageShellProps) {
  const combinedHtml = `${STICKY_NAV_HTML}${renderPagesGridHtml(
    activePage,
  )}${mainInnerHtml}`;

  return (
    <>
      <div className="wrapper" data-scroll-wrapper="">
        <div className="page-holder relative" data-scroller="">
          <div data-transitions-container="">
            <Header />
            <main
              className="main"
              data-component="pages"
              dangerouslySetInnerHTML={{ __html: combinedHtml }}
            />
          </div>
        </div>
      </div>
      <div dangerouslySetInnerHTML={{ __html: AFTER_WRAPPER_HTML }} />
    </>
  );
}
