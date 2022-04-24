const Error = ({ ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 50 50"
    width={24}
    height={24}
    xmlSpace="preserve"
    {...props}
  >
    <circle
      style={{
        fill: "#d75a4a",
      }}
      cx={25}
      cy={25}
      r={25}
    />
    <path
      style={{
        fill: "none",
        stroke: "#fff",
        strokeWidth: 2,
        strokeLinecap: "round",
        strokeMiterlimit: 10,
      }}
      d="m16 34 9-9 9-9M16 16l9 9 9 9"
    />
  </svg>
);

export default Error;
