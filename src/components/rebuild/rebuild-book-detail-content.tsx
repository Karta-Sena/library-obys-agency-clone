import { Fragment } from "react";
import type { CSSProperties, ReactNode } from "react";
import type { BookDetail } from "@/data/book-details";
import RebuildFooter from "@/components/rebuild/rebuild-footer";

type RebuildBookDetailContentProps = {
  detail: BookDetail;
};

function renderWithBreaks(value: string): ReactNode {
  const parts = value.split("\n");
  return parts.map((part, index) => (
    <Fragment key={`${part}-${index}`}>
      {part}
      {index < parts.length - 1 ? <br /> : null}
    </Fragment>
  ));
}

function createPlaceholder(width: number, height: number): string {
  return `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='%23000000' viewBox='0 0 ${width} ${height}'%3E%3C/svg%3E`;
}

export default function RebuildBookDetailContent({
  detail,
}: RebuildBookDetailContentProps) {
  return (
    <div
      className="max-w-[82.8rem] pt-120 pb-100 md:pt-80 md:pb-200 laptop:pb-350 "
      data-page-content={detail.pagePath}
    >
      <div className="bg-texture--light font-bold shadow inset-wrapper">
        <div className="relative h-30 border-b border-current grid grid-cols-12 gap-x-16 text-xs laptop:text-sm font-bold mb-10 container">
          <div className="col-span-8 flex items-center">
            <div className="pr-16 border-r border-current h-full gap-x-3 flex items-center justify-center">
              <span className="w-9 h-9 rounded-full bg-current" />
              <span className="w-9 h-9 rounded-full bg-current opacity-50" />
            </div>
            <div className="flex-grow px-10 py-5">Book</div>
          </div>
          <div className="col-span-4 flex items-center justify-end py-5">
            <span
              className="text-right inline-flex items-center cursor-pointer group"
              data-case-close="/rebuild/books/"
            >
              <span className="mr-5 link">Close</span>
              <svg
                width="10"
                height="10"
                className="w-10 h-10"
                viewBox="0 0 10 10"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M1 1L9 9" stroke="currentColor" strokeWidth="1.6" />
                <path d="M9 1L1 9" stroke="currentColor" strokeWidth="1.6" />
              </svg>
            </span>
          </div>
        </div>
        <div className="md:flex md:justify-between md:items-start container mb-100 md:mb-200">
          <h1 className="mb-0 relative -top-[0.12em]">{renderWithBreaks(detail.title)}</h1>
          <div className="flex-shrink-0 mt-40 md:mt-0 md:pt-5 relative md:-top-2">
            <span className="badge !text-cream">{detail.badge}</span>
          </div>
        </div>
        <div className="border-t border-current">
          <div className="container case-block pt-12 pb-12 md:pb-16">
            <div className="laptop:grid laptop:grid-cols-3 laptop:gap-x-16 pb-40 md:pb-80">
              <div className="order-first">
                <p className="mb-10">({renderWithBreaks(detail.meta)})</p>
              </div>
              <div className="order-1">
                <h2 className="mb-0">{renderWithBreaks(detail.subtitle)}</h2>
                <div className="wysiwyg reset-last mt-15 md:mt-25 laptop:-mr-10">
                  {detail.description.map((paragraph, index) => (
                    <p key={`${detail.slug}-paragraph-${index}`}>
                      {renderWithBreaks(paragraph)}
                    </p>
                  ))}
                </div>
              </div>
              <div className="laptop:order-last hidden laptop:block">
                <p className="mb-10 laptop:text-right">{detail.isbn}</p>
              </div>
            </div>
            <div className="relative">
              <div className="w-190 p-12 md:w-[27.2rem] md:p-16 bg-texture--quote absolute -right-12 -bottom-30 md:bottom-80 md:-right-16 z-[11]">
                <div className="absolute w-45 md:w-90 -right-10 md:-right-18 top-10 md:top-20 z-2">
                  <picture className="w-full h-auto flex" style={{ "--aspect": 3 } as CSSProperties}>
                    <img
                      className="block w-full h-full object-cover"
                      src="/assets/images/quote-clip.png"
                      alt="image description"
                      width={45}
                      height={15}
                    />
                  </picture>
                </div>
                <div className="relative w-full pt-30 md:pt-80 h2 mb-0">
                  <span className="absolute left-0 top-0 h1 mb-0">“</span>
                  <p className="mb-0">{renderWithBreaks(detail.quote)}</p>
                </div>
              </div>
              <picture
                className="w-full h-auto flex"
                style={{ "--aspect": detail.coverAspect } as CSSProperties}
              >
                <img
                  className="block w-full h-full object-cover"
                  data-gl="data-gl"
                  src={createPlaceholder(detail.coverWidth, detail.coverHeight)}
                  data-src={detail.coverImage}
                  alt="image description"
                  width={detail.coverWidth}
                  height={detail.coverHeight}
                />
              </picture>
            </div>
          </div>
        </div>
      </div>
      <RebuildFooter />
    </div>
  );
}
