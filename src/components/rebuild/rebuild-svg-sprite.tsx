export default function RebuildSvgSprite() {
  return (
    <div style={{ width: 0, height: 0, position: "absolute", overflow: "hidden" }}>
      <svg xmlns="http://www.w3.org/2000/svg">
        <symbol fill="none" viewBox="0 0 13 13" id="svg-arrow-left">
          <path
            d="M1.146 6.854a.5.5 0 0 1 0-.708l3.182-3.182a.5.5 0 1 1 .708.708L2.207 6.5l2.829 2.828a.5.5 0 1 1-.708.708L1.146 6.854ZM12 7H1.5V6H12v1Z"
            fill="currentColor"
          />
        </symbol>
        <symbol fill="none" viewBox="0 0 10 7" id="svg-arrow-right">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M6.069 2.698 3.37 0h2.262l2.933 2.932.565.566-.565.566L5.629 7H3.367l2.702-2.702H0v-1.6h6.069Z"
            fill="#262626"
          />
        </symbol>
        <symbol fill="none" viewBox="0 0 13 13" id="svg-close">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M10.013 10.765 2.235 2.987l.752-.752 7.778 7.778-.752.752Z"
            fill="currentColor"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="m10.765 2.987-7.778 7.778-.752-.752 7.778-7.778.752.752Z"
            fill="currentColor"
          />
        </symbol>
        <symbol fill="none" viewBox="0 0 13 13" id="svg-plus">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M12 7.032H1V5.968h11v1.064Z"
            fill="currentColor"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M7.032 1v11H5.968V1h1.064Z"
            fill="currentColor"
          />
        </symbol>
      </svg>
    </div>
  );
}
