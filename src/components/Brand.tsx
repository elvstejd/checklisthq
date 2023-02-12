import Image from "next/image";
import Link from "next/link";

export function Brand() {
  return (
    <Link href={"/"}>
      <Image
        src="/logo.png"
        alt="logo"
        quality={100}
        className="h-auto w-auto object-cover"
        width={212}
        height={31}
      />
    </Link>
  );
}
