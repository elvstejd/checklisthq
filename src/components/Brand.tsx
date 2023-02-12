import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";

interface BrandProps {
  hideName?: boolean;
}

export function Brand({ hideName }: BrandProps) {
  return (
    <Link href={"/"}>
      <div className="flex items-center md:gap-3">
        <div className="relative aspect-square h-8">
          <Image
            src="/logo.png"
            alt="logo"
            quality={100}
            className="h-auto w-auto object-cover"
            fill
          />
        </div>
        <div className={clsx(hideName && "hidden")}>
          <div className={"hidden font-semibold text-gray-700 md:block"}>
            ChecklistHQ
          </div>
        </div>
      </div>
    </Link>
  );
}
