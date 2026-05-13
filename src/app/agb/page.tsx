import type { Metadata } from "next";
import { Section } from "@/components/layout/Section";

export const metadata: Metadata = {
  title: "AGB",
  robots: { index: true, follow: true },
};

export default function AgbPage() {
  return (
    <Section className="bg-white py-14 md:py-16">
      <div className="max-w-2xl space-y-6 text-sm text-zinc-700 leading-relaxed">
        <h1 className="text-3xl font-bold text-zinc-900">
          Allgemeine Geschäftsbedingungen
        </h1>
        <p>
          Diese AGB regeln die vertraglichen Beziehungen zwischen der DELIKAYA
          BAU GmbH und ihren Auftraggebern im Bereich Bauleistungen
          (Beispielinhalt).
        </p>
        <h2 className="text-lg font-semibold text-zinc-900 pt-2">Geltungsbereich</h2>
        <p>
          Maßgeblich sind unsere schriftlichen Angebote sowie die nachfolgenden
          Bedingungen, sofern nicht ausdrücklich abweichendes vereinbart wurde.
        </p>
        <h2 className="text-lg font-semibold text-zinc-900 pt-2">Leistungsumfang</h2>
        <p>
          Umfang und Qualität der Leistungen ergeben sich aus Leistungsverzeichnis,
          Plänen und vereinbarten Normen. Nachträge werden gesondert dokumentiert
          und bedürfen der Abstimmung.
        </p>
        <h2 className="text-lg font-semibold text-zinc-900 pt-2">Vergütung und Zahlung</h2>
        <p>
          Rechnungen sind innerhalb der vereinbarten Frist zahlbar. Bei
          Zahlungsverzug können gesetzliche Verzugszinsen berechnet werden.
        </p>
        <p className="text-xs text-zinc-500">
          Bitte lassen Sie Ihre individuellen AGB juristisch prüfen und ersetzen
          Sie diesen Mustertext vollständig.
        </p>
      </div>
    </Section>
  );
}
