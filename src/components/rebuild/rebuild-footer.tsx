type RebuildFooterProps = {
  className?: string;
};

const DEFAULT_CLASS_NAME =
  "footer container pb-20 text-gray absolute left-0 bottom-0 w-full opacity-0 md:opacity-100";

export default function RebuildFooter({ className }: RebuildFooterProps) {
  return (
    <footer
      className={className ?? DEFAULT_CLASS_NAME}
      data-animation="logo-transform"
      data-start="top bottom-=50"
      data-end="bottom bottom"
      data-ease="none"
    >
      <svg
        className="w-full h-auto logo__desktop hidden md:block"
        width="1400"
        height="76"
        viewBox="0 0 1400 76"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        data-footer-logo-desktop=""
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
        className="w-full h-auto logo__mobile md:hidden"
        width="296"
        height="52"
        viewBox="0 0 296 52"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        data-footer-logo-mobile=""
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
    </footer>
  );
}
