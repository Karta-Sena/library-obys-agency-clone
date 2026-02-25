type RebuildPagesGridProps = {
  activePath?: string | null;
};

const PAGES = [
  {
    path: "/rebuild/",
    className:
      "col-start-1 md:col-span-8 md:col-start-4 laptop:col-span-7 laptop:col-start-4 row-start-1 md:-ml-20",
  },
  {
    path: "/rebuild/books/",
    className:
      "col-start-1 md:col-span-8 md:col-start-3 laptop:col-span-7 laptop:col-start-3 row-start-1",
  },
  {
    path: "/rebuild/credits/",
    className:
      "col-start-1 md:col-span-6 md:-right-40 laptop:right-0 md:col-start-6 row-start-1",
  },
  {
    path: "/rebuild/contacts/",
    className:
      "col-start-1 md:col-span-6 md:col-start-7 laptop:col-span-4 laptop:col-start-9 row-start-1 relative -right-6 md:-right-15",
  },
];

function normalizePath(value?: string | null): string {
  if (!value) return "/rebuild/";
  if (value.startsWith("/rebuild/books/") && value !== "/rebuild/books/") {
    return "/rebuild/books/";
  }
  if (!value.endsWith("/")) return `${value}/`;
  return value;
}

function buildClassName(base: string, isActive: boolean): string {
  return isActive ? `${base} page-is-active` : base;
}

export default function RebuildPagesGrid({ activePath }: RebuildPagesGridProps) {
  const normalized = normalizePath(activePath);
  return (
    <div className="grid grid-cols-1 px-12 md:grid-cols-12 md:gap-x-20 md:px-20 items-start pages-grid">
      {PAGES.map((page) => (
        <div
          key={page.path}
          className={buildClassName(page.className, normalized === page.path)}
          data-page={page.path}
        />
      ))}
    </div>
  );
}
