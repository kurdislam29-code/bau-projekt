import { Section } from "@/components/layout/Section";
import { FadeIn } from "@/components/motion/FadeIn";
import { AboutFeaturedGrid } from "@/components/sections/AboutFeaturedGrid";
import type { HomepagePublic } from "@/server/cms/homepage";
import type { PublicFeaturedHighlight } from "@/server/cms/featured-services-public";

type Props = {
  data: HomepagePublic;
  featured: PublicFeaturedHighlight[];
};

export function AboutSection({ data, featured }: Props) {
  return (
    <Section id="ueber-uns" className="bg-zinc-50/80">
      <div className="grid gap-10 lg:grid-cols-2 lg:gap-14 lg:items-stretch">
        <div className="min-h-[300px] w-full sm:min-h-[360px] lg:min-h-0 lg:h-full">
          <AboutFeaturedGrid items={featured} />
        </div>
        <div className="min-h-0">
          <FadeIn delay={0.05}>
            <p className="text-xs font-semibold tracking-[0.18em] text-brand uppercase mb-2">
              Über uns
            </p>
            <h2 className="text-2xl md:text-3xl font-bold text-zinc-900 tracking-tight text-balance max-w-prose leading-snug">
              {data.aboutTitleAccent?.trim() ? (
                <>
                  {data.aboutTitlePrefix}{" "}
                  <span className="text-brand">{data.aboutTitleAccent}</span>
                </>
              ) : (
                data.aboutTitlePrefix
              )}
            </h2>
            <p className="mt-4 text-zinc-600 leading-relaxed text-[15px] md:text-base max-w-prose">
              {data.aboutParagraph1}
            </p>
            <p className="mt-3 text-zinc-600 leading-relaxed text-[15px] md:text-base max-w-prose">
              {data.aboutParagraph2}
            </p>
          </FadeIn>
          <div className="mt-8 grid grid-cols-2 gap-4 sm:gap-5">
            {data.statistics.map((s, i) => (
              <FadeIn key={s.label} delay={0.08 + i * 0.04}>
                <div className="rounded-lg border border-zinc-200 bg-white p-4 shadow-sm">
                  <p className="text-2xl font-bold text-zinc-900 tabular-nums">
                    {s.value}
                  </p>
                  <p className="text-xs text-zinc-500 mt-1 leading-snug">
                    {s.label}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
