import { MapPin, Phone, Mail, MessageCircle } from "lucide-react";
import { Section } from "@/components/layout/Section";
import { FadeIn } from "@/components/motion/FadeIn";
import { ContactForm } from "@/components/forms/ContactForm";
import type { ContactPublic } from "@/server/cms/contact";
import type { HomepagePublic } from "@/server/cms/homepage";

type ContactSectionProps = {
  contact: ContactPublic;
  home: Pick<HomepagePublic, "contactSectionTitle" | "contactSectionLead">;
  id?: string;
};

export function ContactSection({
  contact,
  home,
  id = "kontakt",
}: ContactSectionProps) {
  return (
    <Section id={id} className="bg-white border-t border-zinc-100">
      <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
        <div>
          <FadeIn>
            <p className="text-xs font-semibold tracking-[0.18em] text-brand uppercase mb-2">
              Kontakt
            </p>
            <h2 className="text-2xl md:text-3xl font-bold text-zinc-900 tracking-tight text-balance leading-snug">
              {home.contactSectionTitle}
            </h2>
            <p className="mt-4 text-zinc-600 text-sm md:text-[15px] leading-relaxed max-w-prose">
              {home.contactSectionLead}
            </p>
          </FadeIn>

          <ul className="mt-8 space-y-4 text-sm text-zinc-700">
            <FadeIn delay={0.05}>
              <li className="flex gap-3">
                <MapPin className="h-5 w-5 text-brand shrink-0 mt-0.5" />
                <span>
                  <strong className="text-zinc-900">{contact.legalName}</strong>
                  <br />
                  {contact.addressStreet}
                  <br />
                  {contact.addressZip} {contact.addressCity}
                </span>
              </li>
            </FadeIn>
            <FadeIn delay={0.08}>
              <li className="flex gap-3 items-center">
                <Phone className="h-5 w-5 text-brand shrink-0" />
                <a
                  href={`tel:${contact.phoneRaw.replace(/\s/g, "")}`}
                  className="hover:text-brand transition-colors font-medium"
                >
                  {contact.phone}
                </a>
              </li>
            </FadeIn>
            <FadeIn delay={0.1}>
              <li className="flex gap-3 items-center">
                <Mail className="h-5 w-5 text-brand shrink-0" />
                <a
                  href={`mailto:${contact.email}`}
                  className="hover:text-brand transition-colors font-medium break-all"
                >
                  {contact.email}
                </a>
              </li>
            </FadeIn>
          </ul>

          <FadeIn delay={0.12} className="mt-8">
            <a
              href={contact.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-md border border-emerald-600/30 bg-emerald-50 px-4 py-2.5 text-sm font-semibold text-emerald-900 hover:bg-emerald-100 transition-colors"
            >
              <MessageCircle className="h-4 w-4" aria-hidden />
              WhatsApp Chat starten
            </a>
          </FadeIn>
        </div>

        <FadeIn delay={0.06}>
          <div className="rounded-lg border border-zinc-200 bg-zinc-50/50 p-6 md:p-7 shadow-sm">
            <h3 className="mb-2 text-lg font-bold tracking-tight text-zinc-900 md:text-xl">
              Unverbindliche Anfrage
            </h3>
            <p className="text-sm text-zinc-600 mb-5">
              Beschreiben Sie kurz Ihr Vorhaben – wir melden uns mit einem
              klaren nächsten Schritt.
            </p>
            <ContactForm />
          </div>
        </FadeIn>
      </div>
    </Section>
  );
}
