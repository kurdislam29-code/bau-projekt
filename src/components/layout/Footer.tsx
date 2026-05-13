import Link from "next/link";
import { Mail, MapPin, Phone, Clock } from "lucide-react";
import { Logo } from "@/components/branding/Logo";
import { Container } from "@/components/layout/Container";
import type { ContactPublic } from "@/server/cms/contact";
import { publicSocial } from "@/lib/public-social";
import { BackToTop } from "@/components/ui/BackToTop";

const quick = [
  { href: "/", label: "Startseite" },
  { href: "/#ueber-uns", label: "Über uns" },
  { href: "/#leistungen", label: "Leistungen" },
  { href: "/#projekte", label: "Projekte" },
  { href: "/karriere", label: "Karriere" },
  { href: "/#kontakt", label: "Kontakt" },
];

type ServiceNav = { slug: string; title: string };

type Props = {
  contact: ContactPublic;
  services: ServiceNav[];
};

export function Footer({ contact, services }: Props) {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-black text-zinc-300 mt-auto">
      <Container className="py-12 md:py-14 grid gap-10 md:grid-cols-2 lg:grid-cols-4">
        <div className="space-y-4">
          <Logo variant="footer" />
          <p className="text-sm leading-relaxed text-zinc-400 max-w-sm">
            {contact.companyName} steht für präzise Ausführung, transparente
            Projekte und partnerschaftliche Zusammenarbeit – von der Baugrube
            bis zur Fertigstellung.
          </p>
          <div className="flex gap-3">
            <a
              href={publicSocial.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-zinc-500 hover:text-brand transition-colors"
            >
              LinkedIn
            </a>
            <a
              href={publicSocial.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-zinc-500 hover:text-brand transition-colors"
            >
              Instagram
            </a>
          </div>
        </div>

        <div>
          <h3 className="text-white text-sm font-semibold tracking-wide uppercase mb-4">
            Schnellzugriff
          </h3>
          <ul className="space-y-2 text-sm">
            {quick.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="hover:text-brand transition-colors inline-block"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-white text-sm font-semibold tracking-wide uppercase mb-4">
            Leistungen
          </h3>
          <ul className="space-y-2 text-sm max-h-56 overflow-y-auto pr-1">
            {services.map((s) => (
              <li key={s.slug}>
                <Link
                  href={`/dienstleistungen/${s.slug}`}
                  className="hover:text-brand transition-colors inline-block"
                >
                  {s.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-4">
          <h3 className="text-white text-sm font-semibold tracking-wide uppercase mb-4">
            Kontakt
          </h3>
          <ul className="space-y-3 text-sm">
            <li className="flex gap-2">
              <MapPin className="h-4 w-4 text-brand shrink-0 mt-0.5" />
              <span>
                {contact.addressStreet}
                <br />
                {contact.addressZip} {contact.addressCity}
              </span>
            </li>
            <li className="flex gap-2 items-center">
              <Phone className="h-4 w-4 text-brand shrink-0" />
              <a
                href={`tel:${contact.phoneRaw.replace(/\s/g, "")}`}
                className="hover:text-white transition-colors"
              >
                {contact.phone}
              </a>
            </li>
            <li className="flex gap-2 items-center">
              <Mail className="h-4 w-4 text-brand shrink-0" />
              <a
                href={`mailto:${contact.email}`}
                className="hover:text-white transition-colors break-all"
              >
                {contact.email}
              </a>
            </li>
            <li className="flex gap-2">
              <Clock className="h-4 w-4 text-brand shrink-0 mt-0.5" />
              <span>{contact.hours}</span>
            </li>
          </ul>
        </div>
      </Container>

      <div className="border-t border-zinc-800">
        <Container className="py-4 flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between text-xs text-zinc-500">
          <p>
            © {year} {contact.legalName}. Alle Rechte vorbehalten.
          </p>
          <div className="flex flex-wrap gap-x-4 gap-y-2">
            <Link href="/datenschutz" className="hover:text-brand transition-colors">
              Datenschutz
            </Link>
            <Link href="/impressum" className="hover:text-brand transition-colors">
              Impressum
            </Link>
            <Link href="/agb" className="hover:text-brand transition-colors">
              AGB
            </Link>
          </div>
        </Container>
      </div>
      <BackToTop />
    </footer>
  );
}
