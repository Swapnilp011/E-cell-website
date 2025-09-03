import Image from "next/image";

export function EcellLogo(props: React.ComponentProps<"div">) {
  return (
    <div {...props}>
        <Image
          src="https://raw.githubusercontent.com/Swapnilp011/E-Cell-IICT-MGMU/main/public/logo.png"
          alt="E-Cell IICT Logo"
          width={40}
          height={40}
          className="h-full w-full"
        />
    </div>
  );
}
