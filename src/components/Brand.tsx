import Image from "next/image";
import Link from "next/link";

export function Brand() {
  return (
    <Link href={"/"}>
      <div className="flex items-center gap-2">
        <div className="relative aspect-square h-8">
          <Image
            src="/logo.png"
            alt="logo"
            quality={100}
            className="h-auto w-auto object-cover"
            fill
          />
        </div>
        <div className="font-medium">RepeatList</div>
      </div>
    </Link>
  );
}
