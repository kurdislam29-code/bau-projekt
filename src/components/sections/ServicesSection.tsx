import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Section } from "@/components/layout/Section";
import { FadeIn } from "@/components/motion/FadeIn";

export type ServiceListItem = {
  slug: string;
  title: string;
  excerpt: string;
};

type Props = {
  services: ServiceListItem[];
};

export function ServicesSection({ services }: Props) {
  return (
    <Section id="leistungen" className="bg-white">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5 mb-12 md:mb-14">
        <FadeIn>
          <p className="text-xs font-semibold tracking-[0.18em] text-brand uppercase mb-2">
            Unsere Leistungen
          </p>
          <h2 className="text-2xl md:text-3xl font-bold text-zinc-900 tracking-tight max-w-2xl text-balance leading-snug">
            Gewerke und Leistungen für anspruchsvolle Bauvorhaben
          </h2>
          <p className="mt-4 text-zinc-600 text-sm md:text-[15px] max-w-2xl leading-relaxed md:max-w-prose">
            Von der Rohbauphase bis zum Feinausbau – wählen Sie eine Leistung für
            Detailinformationen, Referenzbilder und direkte Ansprechpartner.
          </p>
        </FadeIn>
        <FadeIn delay={0.05}>
          <Link
            href="/#kontakt"
            className="inline-flex items-center justify-center self-start rounded-md border border-zinc-300 px-4 py-2 text-sm font-semibold text-zinc-800 hover:border-brand hover:text-brand transition-colors"
          >
            Beratung anfragen
          </Link>
        </FadeIn>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((s, i) => (
          <FadeIn key={s.slug} delay={0.03 * (i % 6)}>
            <Link
              href={`/dienstleistungen/${s.slug}`}
              className="group flex h-full flex-col rounded-lg border border-zinc-200 bg-zinc-50/40 p-5 shadow-sm hover:shadow-md hover:border-brand/40 transition-all"
            >
              <div className="flex items-start justify-between gap-3">
                <h3 className="text-base font-semibold text-zinc-900 group-hover:text-brand transition-colors">
                  {s.title}
                </h3>
                <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-brand text-white group-hover:bg-brand-600 transition-colors">
                  <ArrowUpRight className="h-4 w-4" aria-hidden />
                </span>
              </div>
              <p className="mt-3 text-sm text-zinc-600 leading-relaxed flex-1">
                {s.excerpt}
              </p>
              <span className="mt-4 text-sm font-semibold text-brand inline-flex items-center gap-1">
                Zur Leistungsseite
                <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
              </span>
            </Link>
          </FadeIn>
        ))}
      </div>
    </Section>
  );
}
