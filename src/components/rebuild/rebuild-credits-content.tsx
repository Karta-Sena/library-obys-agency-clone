import RebuildFooter from "@/components/rebuild/rebuild-footer";
import { creditGroups, creditsPatternRects } from "@/data/credits";

type CreditsPatternProps = {
  className: string;
};

function CreditsPattern({ className }: CreditsPatternProps) {
  return (
    <svg
      className={className}
      width="629"
      height="217"
      viewBox="0 0 629 217"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {creditsPatternRects.map((rect, index) => (
        <rect
          key={`credits-rect-${index}`}
          x={rect.x}
          y={rect.y}
          width={rect.width}
          height={rect.height}
          fill="currentColor"
        />
      ))}
    </svg>
  );
}

export default function RebuildCreditsContent() {
  return (
    <div
      className="pb-100 md:pb-200 laptop:pb-350 pt-[30vw] md:pt-100 relative -mt-1 -right-10 md:right-0 max-w-[69rem]"
      data-page-content="/rebuild/credits/"
    >
      <div className="bg-texture--orange-dots inset-wrapper shadow aspect-[690/1024]">
        <div className="py-16 pl-16 pr-30 lg:pr-50 flex flex-col gap-y-14">
          <div className="relative reveal-svgs">
            <CreditsPattern className="w-full h-auto mix-blend-soft-light text-black" />
          </div>
          <div className="relative reveal-svgs">
            <CreditsPattern className="w-full h-auto mix-blend-soft-light text-black -scale-x-[1]" />
          </div>
          <div className="relative reveal-svgs -mb-5">
            <svg
              className="w-full h-auto mix-blend-multiply text-[#b7662e] absolute left-0 top-0 z-5 overflow-visible"
              width="629"
              height="217"
              viewBox="0 0 629 217"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect x="214" y="135.914" width="200.711" height="35.559" fill="currentColor" />
            </svg>
            <CreditsPattern className="w-full h-auto mix-blend-soft-light text-black" />
          </div>
          <div className="relative reveal-svgs">
            <CreditsPattern className="w-full h-auto mix-blend-soft-light text-black -scale-x-[1]" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-20 pt-10 pb-20 text-black">
            {creditGroups.map((group) => (
              <section key={group.title} className="border-t border-current pt-10">
                <h2 className="h4 mb-10">{group.title}</h2>
                <ul className="text-sm md:text-base">
                  {group.items.map((item) => (
                    <li key={`${group.title}-${item}`} className="mb-6 last:mb-0">
                      {item}
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
        </div>
      </div>
      <RebuildFooter />
    </div>
  );
}
