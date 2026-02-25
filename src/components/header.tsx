export default function Header() {
  return (
    <header
      className="absolute left-0 top-0 w-full px-12 md:px-20 z-10"
      data-header=""
    >
      <div className="absolute p-12 md:p-20 left-0 top-0 header__logo text-gray w-full pointer-events-none">
        <div className="relative w-full">
          <svg
            className="w-full h-auto logo__desktop absolute left-0 top-0 w-full invisible md:visible"
            width="1400"
            height="76"
            viewBox="0 0 1400 76"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            data-header-logo-desktop=""
          >
            <rect y="16" width="1400" height="12" fill="currentColor" data-wide-path="" />
            <g data-last-letter="">
              <rect x="1329" width="59.3497" height="12" fill="currentColor" />
              <rect x="1329" y="31.8945" width="59.3497" height="12" fill="currentColor" />
              <rect x="1329" y="63.5098" width="59.3497" height="12" fill="currentColor" />
              <rect x="1329" y="47.7031" width="70.7204" height="12" fill="currentColor" />
              <rect x="1329" y="16" width="70.7204" height="12" fill="currentColor" />
            </g>
            <g data-mid-letter="">
              <rect x="665" y="0" width="59.0723" height="12" fill="currentColor" />
              <rect x="665" y="16" width="70.4431" height="12" fill="currentColor" />
              <rect x="665" y="31.8945" width="70.4431" height="12" fill="currentColor" />
              <rect x="665" y="63.5195" width="59.0723" height="12" fill="currentColor" />
              <rect x="665" y="47.7031" width="70.4431" height="12" fill="currentColor" />
            </g>
            <g data-first-letter="">
              <rect x="11.6484" y="0.00976562" width="47.7016" height="12" fill="currentColor" />
              <rect y="16" width="70.7204" height="12" fill="currentColor" />
              <rect x="0" y="31.8926" width="70.7204" height="12" fill="currentColor" />
              <rect x="11.6484" y="63.5195" width="47.7016" height="12" fill="currentColor" />
              <rect y="47.7012" width="70.7204" height="12" fill="currentColor" />
            </g>
          </svg>
          <svg
            className="w-full h-auto logo__mobile absolute left-0 top-0 w-full md:invisible"
            width="296"
            height="52"
            viewBox="0 0 296 52"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            data-header-logo-mobile=""
          >
            <rect
              x="0.0390625"
              y="10.6875"
              width="295.961"
              height="8.4378"
              fill="currentColor"
              data-wide-path=""
            />
            <g data-last-letter="">
              <rect x="248.297" width="40.0926" height="8.24334" fill="currentColor" />
              <rect x="248.297" y="10.6875" width="47.7739" height="8.24334" fill="currentColor" />
              <rect x="248.297" y="21.5449" width="40.0926" height="8.24334" fill="currentColor" />
              <rect x="248.297" y="42.9043" width="40.0926" height="8.43069" fill="currentColor" />
              <rect x="248.219" y="32.2246" width="47.7739" height="8.43069" fill="currentColor" />
            </g>
            <g data-mid-letter="">
              <rect x="124.109" y="0.00585938" width="39.9053" height="8.24334" fill="currentColor" />
              <rect x="124.125" y="10.6875" width="47.5866" height="8.24334" fill="currentColor" />
              <rect x="124.125" y="21.5449" width="47.5866" height="8.24334" fill="currentColor" />
              <rect x="124.109" y="42.9082" width="39.9053" height="8.43069" fill="currentColor" />
              <rect x="124.125" y="32.2246" width="47.5866" height="8.43069" fill="currentColor" />
            </g>
            <g data-first-letter="">
              <rect x="7.86719" y="0.00585938" width="32.224" height="8.24334" fill="currentColor" />
              <rect x="0.0234375" y="10.6875" width="47.7739" height="8.24334" fill="currentColor" />
              <rect x="0.0234375" y="21.5449" width="47.7739" height="8.24334" fill="currentColor" />
              <rect x="7.86719" y="42.9082" width="32.224" height="8.43069" fill="currentColor" />
              <rect y="32.2246" width="47.7739" height="8.43069" fill="currentColor" />
            </g>
          </svg>
        </div>
      </div>
      <div className="py-20 font-bold justify-between md:max-w-[51rem] md:ml-auto header__bar hidden md:flex">
        <ul className="flex items-center gap-x-15 header-top-menu transition-transform duration-300">
          <li>
            <a className="link" href="/" data-nav-link-desktop="">
              About
            </a>
          </li>
          <li>
            <a className="link" href="/books/" data-nav-link-desktop="">
              Books
            </a>
          </li>
          <li>
            <a className="link" href="/credits/" data-nav-link-desktop="">
              Credits
            </a>
          </li>
          <li>
            <a className="link" href="/contacts/" data-nav-link-desktop="">
              Contacts
            </a>
          </li>
        </ul>
        <button className="link text-right" type="button" data-menu-opener="">
          <span>Menu</span>
          <span>Close</span>
        </button>
        <div className="absolute left-0 w-full grid-cols-4 gap-x-20 font-bold px-20 top-[23.8rem] hidden md:grid items-end header__page-labels">
          <div className="inline-flex">
            <span className="border border-current rounded-full w-16 h-16 flex items-center justify-center">
              1
            </span>
            <span className="px-6 border border-current flex items-center rounded-full h-16">
              About
            </span>
          </div>
          <div className="inline-flex">
            <span className="border border-current rounded-full w-16 h-16 flex items-center justify-center">
              2
            </span>
            <span className="px-6 border border-current flex items-center rounded-full h-16">
              Books
            </span>
          </div>
          <div className="inline-flex">
            <span className="border border-current rounded-full w-16 h-16 flex items-center justify-center">
              3
            </span>
            <span className="px-6 border border-current flex items-center rounded-full h-16">
              Credits
            </span>
          </div>
          <div className="inline-flex">
            <span className="border border-current rounded-full w-16 h-16 flex items-center justify-center">
              4
            </span>
            <span className="px-6 border border-current flex items-center rounded-full h-16">
              Contacts
            </span>
          </div>
        </div>
      </div>
      <div
        className="md:hidden fixed left-0 right-0 bottom-0 px-6 py-12 h-screen mobile-menu text-white text-xs translate-y-full"
        data-mobile-menu=""
      >
        <div className="relative h-full overflow-hidden">
          <div
            className="absolute h-70 w-full bg-gray-700 bottom-0 left-0 p-6 flex items-center justify-between font-bold mobile-menu__fixed-part"
            data-mobile-menu-opener=""
          >
            <div className="flex items-center">
              <img
                className="w-58 h-58 mr-10 object-cover object-left-top"
                data-current-page-image=""
                alt="mobile image thumbnail"
              />
              <span className="font-bold capitalize" data-current-page-label="">
                About
              </span>
            </div>
            <div className="p-6">
              <svg
                width="12"
                height="12"
                className="w-12 h-12"
                viewBox="0 0 12 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M0 2.25H12" stroke="currentColor" strokeWidth="1.4" />
                <path d="M0 6H12" stroke="currentColor" strokeWidth="1.4" />
                <path d="M0 9.75H12" stroke="currentColor" strokeWidth="1.4" />
              </svg>
            </div>
          </div>
          <div className="w-full h-full bg-gray-700 relative flex flex-col mobile-menu__content translate-y-full">
            <div className="flex-grow">
              <div className="pt-10 pb-20 px-10 text-center" data-mobile-menu-opener="">
                <div className="bg-gray-600 mx-auto rounded-full h-6 w-80 mb-25" />
                <svg
                  width="221"
                  height="76"
                  viewBox="0 0 221 76"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-140 h-auto mx-auto"
                >
                  <rect x="150.148" width="59.3497" height="12.2027" fill="#D9D9D9" />
                  <rect x="150.039" y="15.8086" width="70.7204" height="12.4801" fill="#D9D9D9" />
                  <rect x="150.148" y="31.8926" width="59.3497" height="12.2027" fill="#D9D9D9" />
                  <rect x="150.148" y="63.5098" width="59.3497" height="12.4801" fill="#D9D9D9" />
                  <rect x="150.039" y="47.7012" width="70.7204" height="12.4801" fill="#D9D9D9" />
                  <rect x="75.1562" y="0.00976562" width="59.0723" height="12.2027" fill="#D9D9D9" />
                  <rect x="75.1797" y="15.8086" width="70.4431" height="12.4801" fill="#D9D9D9" />
                  <rect x="75.1797" y="31.8926" width="70.4431" height="12.2027" fill="#D9D9D9" />
                  <rect x="75.1562" y="63.5195" width="59.0723" height="12.4801" fill="#D9D9D9" />
                  <rect x="75.1797" y="47.7012" width="70.4431" height="12.4801" fill="#D9D9D9" />
                  <rect x="11.6484" y="0.00976562" width="47.7016" height="12.2027" fill="#D9D9D9" />
                  <rect y="15.8086" width="70.7204" height="12.4801" fill="#D9D9D9" />
                  <rect x="0.0390625" y="31.8926" width="70.7204" height="12.2027" fill="#D9D9D9" />
                  <rect x="11.6484" y="63.5195" width="47.7016" height="12.4801" fill="#D9D9D9" />
                  <rect y="47.7012" width="70.7204" height="12.4801" fill="#D9D9D9" />
                </svg>
              </div>
              <a
                className="flex items-center py-12 px-6 border-t border-gray-100 border-opacity-20 mobile-menu__link"
                href="/"
                data-nav-link=""
              >
                <img
                  className="size-58 mr-10 object-cover object-left-top mobile-menu__thumbnail"
                  data-mobile-page-image="/"
                  alt="page image thumbnail"
                />
                <span className="inline-flex leading-[1.6rem]">
                  <span className="border border-current rounded-full size-16 flex items-center justify-center">
                    1
                  </span>
                  <span className="px-6 border border-current flex items-center rounded-full h-16">
                    About
                  </span>
                </span>
              </a>
              <a
                className="flex items-center py-12 px-6 border-t border-gray-100 border-opacity-20 mobile-menu__link"
                href="/books/"
                data-nav-link=""
              >
                <img
                  className="size-58 mr-10 object-cover object-left-top mobile-menu__thumbnail"
                  data-mobile-page-image="/books/"
                  alt="page image thumbnail"
                />
                <span className="inline-flex leading-[1.6rem]">
                  <span className="border border-current rounded-full size-16 flex items-center justify-center">
                    2
                  </span>
                  <span className="px-6 border border-current flex items-center rounded-full h-16">
                    Books
                  </span>
                </span>
              </a>
              <a
                className="flex items-center py-12 px-6 border-t border-gray-100 border-opacity-20 mobile-menu__link"
                href="/credits/"
                data-nav-link=""
              >
                <img
                  className="size-58 mr-10 object-cover object-left-top mobile-menu__thumbnail"
                  data-mobile-page-image="/credits/"
                  alt="page image thumbnail"
                />
                <span className="inline-flex leading-[1.6rem]">
                  <span className="border border-current rounded-full size-16 flex items-center justify-center">
                    3
                  </span>
                  <span className="px-6 border border-current flex items-center rounded-full h-16">
                    Credits
                  </span>
                </span>
              </a>
              <a
                className="flex items-center py-12 px-6 border-t border-gray-100 border-opacity-20 mobile-menu__link"
                href="/contacts/"
                data-nav-link=""
              >
                <img
                  className="size-58 mr-10 object-cover object-left-top mobile-menu__thumbnail"
                  data-mobile-page-image="/contacts/"
                  alt="page image thumbnail"
                />
                <span className="inline-flex leading-[1.6rem]">
                  <span className="border border-current rounded-full size-16 flex items-center justify-center">
                    4
                  </span>
                  <span className="px-6 border border-current flex items-center rounded-full h-16">
                    Contacts
                  </span>
                </span>
              </a>
            </div>
            <div className="flex-shrink-0 h-70 border-t border-gray-100 border-opacity-20 p-12 flex items-end">
              <div className="flex justify-between w-full">
                <ul>
                  <li>
                    <a
                      className="link link--underline"
                      href="https://www.instagram.com/obys_agency/?hl=en"
                      target="_blank"
                    >
                      Instagram
                    </a>
                  </li>
                  <li>
                    <a
                      className="link link--underline"
                      href="mailto:info@obys.agency"
                      target="_blank"
                    >
                      info@obys.agency
                    </a>
                  </li>
                </ul>
                <div
                  className="w-30 flex items-center justify-end relative z-2"
                  data-mobile-menu-opener=""
                >
                  <svg
                    width="10"
                    height="10"
                    className="w-10 h-10"
                    viewBox="0 0 10 10"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M1 1L9 9" stroke="currentColor" strokeWidth="1.4" />
                    <path d="M9 1L1 9" stroke="currentColor" strokeWidth="1.4" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
