import type { Metadata } from "next";
import { Section } from "@/components/layout/Section";
import { getContactSettings } from "@/server/cms/contact";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Impressum",
  robots: { index: true, follow: true },
};

export default async function ImpressumPage() {
  const siteConfig = await getContactSettings();
  return (
    <Section className="bg-white py-14 md:py-16">
      <div className="max-w-2xl">
        <h1 className="text-3xl font-bold text-zinc-900">Impressum</h1>
        <p className="mt-6 text-sm text-zinc-700 leading-relaxed">
          <strong className="text-zinc-900">Angaben gemäß § 5 TMG</strong>
          <br />
          <br />
          {siteConfig.legalName}
          <br />
          {siteConfig.addressStreet}
          <br />
          {siteConfig.addressZip} {siteConfig.addressCity}
          <br />
          {siteConfig.addressCountry}
        </p>
        <p className="mt-6 text-sm text-zinc-700 leading-relaxed">
          <strong className="text-zinc-900">Kontakt</strong>
          <br />
          Telefon: {siteConfig.phone}
          <br />
          E-Mail: {siteConfig.email}
        </p>
        <p className="mt-6 text-sm text-zinc-700 leading-relaxed">
          <strong className="text-zinc-900">Umsatzsteuer-ID</strong>
          <br />
          Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz:
          DE123456789
        </p>
        <p className="mt-6 text-sm text-zinc-700 leading-relaxed">
          <strong className="text-zinc-900">Verantwortlich für den Inhalt</strong>
          <br />
          Geschäftsführung, {siteConfig.legalName}, Anschrift wie oben.
        </p>
        <p className="mt-6 text-xs text-zinc-500 leading-relaxed">
          Hinweis: Dieses Impressum ist eine Beispielvorlage für eine
          Demonstrationswebsite und ersetzt keine Rechtsberatung.
        </p>
      </div>
    </Section>
  );
}
