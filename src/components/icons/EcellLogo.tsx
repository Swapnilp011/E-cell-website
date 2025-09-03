export function EcellLogo(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
    >
      <path
        fill="#F2F2F2"
        d="M89.2,33.4c-6-11.8-17.2-20.2-30.8-22.1V0H41.6v11.3C28,13.2,16.8,21.6,10.8,33.4H0v11.1h10.8c-1,5.8-1,11.8-0.1,17.7H0v11.1h10.7c3.6,9.8,10.5,17.9,19.5,23.1V100h16.8V85.7c5.8-0.8,11.3-2.6,16.5-5.1l7.8,7.8L79,77.3l-7.7-7.7c4.6-5.1,8.1-11.2,10.1-17.9h7.8V39.9h-9.9v-6.5H89.2z M72.5,50.1c-0.1,5.6-1.5,11-4,15.7l-2.6-2.6l-7.8,7.8l2.6,2.6c-4.4,3-9.5,4.9-15,5.5V62.4H41.6v16.7c-13.6-2-24.6-13-26.6-26.6h16.7v-11H15C17,28,28,17,41.6,15v16.2h11.1V15c13.6,2,24.6,13,26.6,26.6H62.4v11h16.7L72.5,50.1z"
      />
      <path
        fill="#F2F2F2"
        d="M30.5,44.5h22.2v11.1H30.5V44.5z"
        transform="rotate(0) translate(0, 0)"
      >
        <animateTransform
          attributeName="transform"
          type="translate"
          from="0 0"
          to="-5 0"
          begin="2s"
          dur="0.5s"
          fill="freeze"
        />
      </path>
      <polygon
        fill="#F28C28"
        points="52.8,33.4 69.5,33.4 69.5,44.5 52.8,44.5"
        transform="rotate(0) translate(0,0)"
      >
        <animateTransform
          attributeName="transform"
          type="rotate"
          from="0 61 39"
          to="-45 61 39"
          begin="1s"
          dur="0.5s"
          fill="freeze"
        />
        <animateTransform
          attributeName="transform"
          type="translate"
          from="0 0"
          to="5 -5"
          begin="1.5s"
          dur="0.5s"
          fill="freeze"
        />
      </polygon>
    </svg>
  );
}
