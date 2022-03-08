const Wave = ({ ...props }) => (
  <svg width={1920} height={1080} xmlns="http://www.w3.org/2000/svg" {...props}>
    <defs>
      <linearGradient id="a" gradientTransform="rotate(90)">
        <stop offset="5%" stopColor="#8800c7" />
        <stop offset="95%" stopColor="#a53fd5" />
      </linearGradient>
    </defs>
    <path fill="#fff" d="M0 0h1200v1200H0z" />
    <path
      d="M0 600c35.95 6.345 71.9 12.69 108 18 36.1 5.31 72.353 9.586 108 9 35.647-.586 70.69-6.034 108-20 37.31-13.966 76.886-36.452 114-32 37.114 4.452 71.765 35.841 108 42 36.235 6.159 74.053-12.913 110-23s70.025-11.189 106 1c35.975 12.189 73.85 37.67 111 34 37.15-3.67 73.58-36.488 109-42 35.42-5.512 69.835 16.282 106 23 36.165 6.718 74.083-1.641 152-10l-40 600H0Z"
      fill="url(#a)"
    />
  </svg>
);

export default Wave;
