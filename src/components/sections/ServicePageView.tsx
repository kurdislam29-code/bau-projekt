import type { ServiceDetail } from "@/types/service";
import type { ContactPublic } from "@/server/cms/contact";
import type { HomepagePublic } from "@/server/cms/homepage";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { FadeIn } from "@/components/motion/FadeIn";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { ContactSection } from "@/components/sections/ContactSection";

type Props = {
  service: ServiceDetail;
  contact: ContactPublic;
  homepage: HomepagePublic;
};

export function ServicePageView({ service, contact, homepage }: Props) {
  return (
    <>
      <section className="relative flex min-h-[17rem] items-end md:min-h-[19rem]">
        <Image
          src={service.heroImage}
          alt={`${service.title} – Leistungsbereich bei ${contact.companyName}`}
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-zinc-950/45" aria-hidden />
        <div
          className="absolute inset-0 bg-gradient-to-t from-zinc-950/92 via-zinc-950/55 to-zinc-950/20"
          aria-hidden
        />
        <Container className="relative z-10 pb-8 md:pb-10">
          <nav aria-label="Brotkrumen" className="text-xs text-zinc-200 mb-3">
            <ol className="flex flex-wrap items-center gap-1.5">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  Startseite
                </Link>
              </li>
              <ChevronRight className="h-3.5 w-3.5 opacity-70" aria-hidden />
              <li>
                <Link
                  href="/#leistungen"
                  className="hover:text-white transition-colors"
                >
                  Leistungen
                </Link>
              </li>
              <ChevronRight className="h-3.5 w-3.5 opacity-70" aria-hidden />
              <li className="text-white font-medium">{service.title}</li>
            </ol>
          </nav>
          <FadeIn>
            <h1 className="text-2xl font-bold tracking-tight text-white md:text-3xl lg:text-4xl text-balance max-w-3xl leading-tight">
              {service.title}
            </h1>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-zinc-100/95 md:text-base">
              {service.intro}
            </p>
          </FadeIn>
        </Container>
      </section>

      <article className="bg-white py-14 md:py-16">
        <Container className="max-w-3xl">
          <FadeIn>
            <div className="max-w-none">
              {service.body.map((p, idx) => (
                <p
                  key={idx}
                  className="text-[15px] leading-relaxed text-zinc-700 mb-4"
                >
                  {p}
                </p>
              ))}
            </div>
          </FadeIn>
        </Container>
      </article>

      <section className="pb-12 md:pb-14 bg-white">
        <Container>
          <FadeIn>
            <h2 className="text-lg md:text-xl font-bold text-zinc-900 mb-6">
              Projektbilder &amp; Einblicke
            </h2>
          </FadeIn>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {service.gallery.map((src, i) => (
              <FadeIn key={src} delay={0.04 * i}>
                <div className="relative aspect-[4/3] overflow-hidden rounded-lg border border-zinc-200 shadow-sm group">
                  <Image
                    src={src}
                    alt={`${service.title} – Galerie ${i + 1}`}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
              </FadeIn>
            ))}
          </div>
        </Container>
      </section>

      <CtaBanner data={homepage} />
      <ContactSection
        id="kontakt-leistung"
        contact={contact}
        home={homepage}
      />
    </>
  );
}
