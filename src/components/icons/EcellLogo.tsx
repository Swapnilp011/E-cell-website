export function EcellLogo(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      aria-label="E-Cell IICT Logo"
    >
      <rect width="100" height="100" fill="#1A2035" />
      <g transform="translate(5, 5)">
        <path
          d="M80.8,24.1C72,13.2,59.5,6.5,45.5,6.5c-18.9,0-35.1,12.5-40.8,30.2h13.2c5-11.7,16.5-20,29.9-20 c11.5,0,21.8,5.7,27.8,14.6l-8.6,8.6h28.4V6.5L80.8,24.1z"
          fill="#F2F2F2"
        />
        <path
          d="M20.9,50.3h28.4v11.8H20.9V50.3z"
          fill="#F2F2F2"
        />
        <path
          d="M49.3,25.9l12.4,12.4L49.3,50.7V25.9z"
          fill="#F9A825"
        />
        <path
          d="M72.2,62.1c0,11.8-9.6,21.4-21.4,21.4c-8.9,0-16.5-5.4-19.8-13.2h12.5c2.6,3.8,6.9,6.4,11.8,6.4 c7.6,0,13.7-6.1,13.7-13.7H72.2z"
          fill="#F2F2F2"
        />
         <path
          d="M60.8,62.1c0,8.4-6.8,15.2-15.2,15.2c-4.9,0-9.2-2.3-12-5.9l16.7-16.7h10.5V62.1z"
          fill="#F9A825"
          opacity="0"
        >
          <animate attributeName="opacity" from="0" to="1" begin="0.5s" dur="0.5s" fill="freeze" />
        </path>
         <rect x="67" y="61" width="10" height="5" fill="#F9A825" />
      </g>
    </svg>
  );
}
