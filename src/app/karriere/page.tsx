import type { Metadata } from "next";
import Link from "next/link";
import { Section } from "@/components/layout/Section";
import { FadeIn } from "@/components/motion/FadeIn";
import { getSeoByPageKey } from "@/server/cms/seo-public";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSeoByPageKey("KARRIERE");
  return {
    title: seo?.title ?? "Karriere",
    description:
      seo?.description ??
      "Werden Sie Teil von DELIKAYA BAU – sichere Arbeitsplätze, anspruchsvolle Projekte und Weiterbildung im Bauwesen.",
  };
}

export default function KarrierePage() {
  return (
    <Section className="bg-white py-16 md:py-20">
      <FadeIn>
        <p className="text-xs font-semibold tracking-[0.18em] text-brand uppercase mb-2">
          Karriere
        </p>
        <h1 className="text-3xl md:text-4xl font-bold text-zinc-900 tracking-tight">
          Bauen mit Verantwortung – bei DELIKAYA BAU
        </h1>
        <p className="mt-4 text-zinc-600 max-w-2xl leading-relaxed text-[15px] md:text-base">
          Wir suchen Menschen, die Präzision schätzen und im Team Großes
          bewegen wollen. Ob Polier, Bauleiter oder kaufmännisches Personal –
          sprechen Sie uns an und lassen Sie Ihre Unterlagen prüfen.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/#kontakt"
            className="inline-flex items-center justify-center rounded-md bg-brand px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-600 transition-colors"
          >
            Initiativbewerbung senden
          </Link>
          <Link
            href="/#leistungen"
            className="inline-flex items-center justify-center rounded-md border border-zinc-300 px-5 py-2.5 text-sm font-semibold text-zinc-800 hover:border-brand hover:text-brand transition-colors"
          >
            Unsere Gewerke
          </Link>
        </div>
      </FadeIn>
    </Section>
  );
}
