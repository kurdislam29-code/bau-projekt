import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { FadeIn } from "@/components/motion/FadeIn";
import type { HomepagePublic } from "@/server/cms/homepage";

type Props = {
  data: HomepagePublic;
};

export function CtaBanner({ data }: Props) {
  const src = data.ctaBannerImage ?? "/images/cta/construction-bg.jpg";
  return (
    <section className="relative overflow-hidden bg-brand">
      <Image
        src={src}
        alt=""
        fill
        className="object-cover opacity-15 mix-blend-overlay pointer-events-none"
        aria-hidden
        sizes="100vw"
      />
      <Container className="relative z-10 py-12 md:py-14">
        <FadeIn className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="max-w-xl">
            <h2 className="text-balance text-xl font-bold leading-snug tracking-tight text-white md:text-2xl">
              {data.ctaBannerTitle}
            </h2>
            {data.ctaBannerSubtitle ? (
              <p className="mt-2 text-sm text-white/90">{data.ctaBannerSubtitle}</p>
            ) : null}
          </div>
          <Link
            href={data.ctaBannerButtonHref}
            className="inline-flex items-center justify-center self-start rounded-md bg-white px-5 py-2.5 text-sm font-semibold text-brand shadow-sm hover:bg-zinc-100 transition-colors"
          >
            {data.ctaBannerButtonLabel}
          </Link>
        </FadeIn>
      </Container>
    </section>
  );
}
