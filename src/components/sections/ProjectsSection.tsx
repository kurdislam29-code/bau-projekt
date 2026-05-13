import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Section } from "@/components/layout/Section";
import { FadeIn } from "@/components/motion/FadeIn";
import type { PublicProjectCard } from "@/server/cms/projects-public";

type Props = {
  projects: PublicProjectCard[];
};

export function ProjectsSection({ projects }: Props) {
  return (
    <Section id="projekte" className="bg-zinc-50/80">
      <FadeIn>
        <p className="text-xs font-semibold tracking-[0.18em] text-brand uppercase mb-2">
          Aktuelle Projekte
        </p>
        <h2 className="text-2xl md:text-3xl font-bold text-zinc-900 tracking-tight text-balance leading-snug">
          Ausgewählte Referenzen
        </h2>
        <p className="mt-4 text-zinc-600 text-sm md:text-[15px] max-w-2xl leading-relaxed md:max-w-prose">
          Hochwertige Industrie- und Gewerbeobjekte mit klarer Schnittstelle
          zwischen Rohbau, Technik und Fassade.
        </p>
      </FadeIn>

      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {projects.map((p, i) => (
          <FadeIn key={p.slug} delay={0.04 * i}>
            <article className="group rounded-lg border border-zinc-200 bg-white overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <Link href="/#kontakt" className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={p.image}
                    alt={
                      p.categoryLine
                        ? `Referenzprojekt ${p.title} – ${p.categoryLine}`
                        : `Referenzprojekt ${p.title}`
                    }
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                  <span className="absolute bottom-3 right-3 inline-flex h-9 w-9 items-center justify-center rounded-md bg-brand text-white shadow-md opacity-90 group-hover:opacity-100 transition-opacity">
                    <ArrowUpRight className="h-4 w-4" aria-hidden />
                  </span>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-zinc-900 group-hover:text-brand transition-colors">
                    {p.title}
                  </h3>
                  <p className="text-xs text-zinc-500 mt-1">
                    {p.categoryLine || "\u00a0"}
                  </p>
                </div>
              </Link>
            </article>
          </FadeIn>
        ))}
      </div>
    </Section>
  );
}
