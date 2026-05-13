import Image from "next/image";
import Link from "next/link";
import { LayoutGrid } from "lucide-react";
import { FadeIn } from "@/components/motion/FadeIn";
import { cn } from "@/lib/cn";
import type { PublicFeaturedHighlight } from "@/server/cms/featured-services-public";

type Props = {
  items: PublicFeaturedHighlight[];
};

const cardShell =
  "group relative block h-full min-h-0 overflow-hidden rounded-2xl shadow-md ring-1 ring-black/10 outline-none transition duration-500 ease-out hover:z-[1] hover:shadow-xl hover:ring-brand/30 focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-50";

function FeaturedImageCard({
  item,
  priority,
}: {
  item: PublicFeaturedHighlight;
  priority?: boolean;
}) {
  const body = (
    <>
      {item.imageSrc ? (
        <Image
          src={item.imageSrc}
          alt={item.title}
          fill
          priority={priority}
          className="object-cover transition duration-700 ease-out group-hover:scale-[1.06]"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 45vw, 22vw"
        />
      ) : (
        <div
          className="absolute inset-0 bg-gradient-to-br from-zinc-600 via-zinc-800 to-zinc-950"
          aria-hidden
        />
      )}
      {!item.imageSrc ? (
        <div className="absolute inset-0 flex items-center justify-center text-brand/70">
          <LayoutGrid className="h-10 w-10 sm:h-12 sm:w-12" aria-hidden />
        </div>
      ) : null}
      <div
        className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/5 transition duration-500 group-hover:from-black/90"
        aria-hidden
      />
      {item.badge.trim() ? (
        <p
          className={cn(
            "pointer-events-none absolute right-0 top-3 z-10 w-max max-w-[min(88%,11rem)] rounded-l-lg rounded-r-none sm:top-4 sm:max-w-[13rem]",
            "border border-r-0 border-white/12 bg-zinc-950/78 py-1.5 pl-3 pr-2.5 backdrop-blur-md sm:py-2 sm:pl-3.5 sm:pr-3",
            "text-left text-[9px] font-semibold uppercase leading-snug tracking-[0.16em] text-white antialiased shadow-[0_6px_18px_rgba(0,0,0,0.45)] sm:text-[10px]",
            "ring-1 ring-inset ring-white/[0.07]",
          )}
        >
          {item.badge.trim()}
        </p>
      ) : null}
      <div className="absolute inset-0 flex flex-col justify-end p-3.5 sm:p-4 md:p-5">
        <h3 className="text-balance text-base font-bold leading-snug text-white sm:text-lg md:text-xl lg:text-2xl">
          {item.title}
        </h3>
        {item.description.trim() ? (
          <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-white/90 sm:text-sm">
            {item.description.trim()}
          </p>
        ) : null}
      </div>
    </>
  );

  return (
    <Link href={item.href} className={cardShell}>
      {body}
    </Link>
  );
}

function EmptySlot() {
  return (
    <div className="flex h-full min-h-0 items-center justify-center rounded-2xl border border-dashed border-zinc-300/90 bg-zinc-100/60 p-3 text-center text-[11px] font-medium leading-snug text-zinc-500 sm:text-xs">
      Freier Platz – im CMS unter „Featured Services“ ergänzen
    </div>
  );
}

export function AboutFeaturedGrid({ items }: Props) {
  if (items.length === 0) {
    return (
      <FadeIn className="flex h-full min-h-[280px] w-full items-center">
        <p className="w-full rounded-2xl border border-dashed border-zinc-200 bg-white/80 px-4 py-12 text-center text-sm text-zinc-500">
          Highlights werden im CMS unter „Featured Services“ gepflegt.
        </p>
      </FadeIn>
    );
  }

  const slots: (PublicFeaturedHighlight | null)[] = [...items.slice(0, 4)];
  while (slots.length < 4) {
    slots.push(null);
  }

  return (
    <FadeIn className="h-full w-full min-h-0">
      <div
        className={cn(
          "mx-auto grid aspect-square h-full w-full max-w-lg grid-cols-2 grid-rows-2 gap-2 sm:gap-3",
          "lg:mx-0 lg:max-w-none lg:aspect-auto",
        )}
      >
        {slots.map((item, i) => (
          <div key={item?.id ?? `empty-${i}`} className="min-h-0 h-full">
            {item ? (
              <FeaturedImageCard item={item} priority={i < 2} />
            ) : (
              <EmptySlot />
            )}
          </div>
        ))}
      </div>
    </FadeIn>
  );
}
