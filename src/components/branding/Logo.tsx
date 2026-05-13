import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/cn";
import {
  LOGO_FOOTER_INTRINSIC,
  LOGO_FOOTER_SRC,
  LOGO_HEADER_INTRINSIC,
  LOGO_HEADER_SRC,
} from "@/lib/branding";

type LogoProps = {
  /** Header: helle Logo-Version · Footer: dunkle Logo-Version */
  variant: "header" | "footer";
  className?: string;
  priority?: boolean;
};

export function Logo({ variant, className, priority = false }: LogoProps) {
  const src = variant === "header" ? LOGO_HEADER_SRC : LOGO_FOOTER_SRC;
  const intrinsic =
    variant === "header" ? LOGO_HEADER_INTRINSIC : LOGO_FOOTER_INTRINSIC;

  return (
    <Link
      href="/"
      className={cn(
        "inline-flex shrink-0 items-center rounded-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2",
        variant === "header" &&
          "min-h-[2.25rem] py-1 pr-2 -my-0.5 md:min-h-[2.5rem] md:py-1.5 md:pr-3",
        variant === "footer" && "min-h-[2.5rem] py-2 pr-3 md:min-h-[2.75rem] md:py-2.5",
        className
      )}
      aria-label="DELIKAYA BAU Startseite"
    >
      <Image
        src={src}
        alt="DELIKAYA BAU"
        width={intrinsic.width}
        height={intrinsic.height}
        priority={priority}
        className={cn(
          "w-auto object-contain object-left",
          "max-h-8 max-w-[min(100%,12rem)] sm:max-h-9 sm:max-w-[13.5rem]",
          "md:max-h-10 md:max-w-[15rem]",
          variant === "footer" &&
            "max-h-9 max-w-[min(100%,13rem)] sm:max-h-10 sm:max-w-[14.5rem] md:max-h-11 md:max-w-[16rem]"
        )}
        sizes="(max-width: 768px) 180px, 220px"
      />
    </Link>
  );
}
