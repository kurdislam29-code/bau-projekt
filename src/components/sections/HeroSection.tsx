import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { FadeIn } from "@/components/motion/FadeIn";
import type { HomepagePublic } from "@/server/cms/homepage";

type Props = {
  data: HomepagePublic;
};

export function HeroSection({ data }: Props) {
  const src = data.heroImage ?? "/images/hero/construction-site.jpg";
  return (
    <section className="relative flex min-h-[21rem] items-center sm:min-h-[23rem] md:min-h-[28rem]">
      <Image
        src={src}
        alt="Baustelle mit Kran und Stahlkonstruktion im Industriebau"
        fill
        priority
        className="object-cover object-center"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-zinc-950/50" aria-hidden />
      <div
        className="absolute inset-0 bg-gradient-to-r from-zinc-950/90 via-zinc-950/65 to-zinc-950/30"
        aria-hidden
      />
      <Container className="relative z-10 py-12 md:py-16 lg:py-20">
        <FadeIn>
          <h1 className="max-w-[22rem] text-balance text-[1.7rem] font-bold leading-[1.12] tracking-tight text-white sm:max-w-2xl sm:text-4xl sm:leading-[1.1] md:max-w-3xl md:text-[2.5rem] lg:text-[2.65rem]">
            <span className="text-white">{data.heroTitle}</span>
            {data.heroTitleAccent ? (
              <>
                {" "}
                <span className="text-brand">{data.heroTitleAccent}</span>
              </>
            ) : null}
          </h1>
          <p className="mt-5 max-w-xl text-sm leading-relaxed text-zinc-100/95 sm:text-[15px] md:max-w-2xl md:text-base">
            {data.heroSubtitle}
          </p>
          <div className="mt-8 flex flex-wrap gap-3 md:mt-9">
            <Link
              href={data.heroCta1Href}
              className="inline-flex min-h-[2.75rem] min-w-[10rem] items-center justify-center rounded-md bg-brand px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-brand-600"
            >
              {data.heroCta1Label}
            </Link>
            <Link
              href={data.heroCta2Href}
              className="inline-flex min-h-[2.75rem] min-w-[10rem] items-center justify-center rounded-md border border-white/85 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-white/10"
            >
              {data.heroCta2Label}
            </Link>
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}
