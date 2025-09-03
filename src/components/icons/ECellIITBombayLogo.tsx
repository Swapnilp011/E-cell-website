export function ECellIITBombayLogo(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      viewBox="0 0 220 100"
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
    >
      <g>
        <path d="M10,10 H90 V90 H10 Z" fill="#4A4A4A" />
        <text
          x="50"
          y="55"
          fontFamily="Arial, sans-serif"
          fontSize="40"
          fill="white"
          textAnchor="middle"
        >
          E
        </text>
      </g>
      <text
        x="100"
        y="40"
        fontFamily="Arial, sans-serif"
        fontSize="20"
        fill="currentColor"
      >
        E-CELL
      </text>
      <text
        x="100"
        y="70"
        fontFamily="Arial, sans-serif"
        fontSize="20"
        fill="currentColor"
        fontWeight="bold"
      >
        IIT BOMBAY
      </text>
    </svg>
  );
}
