import type { Metadata } from "next";
import { Section } from "@/components/layout/Section";

export const metadata: Metadata = {
  title: "Datenschutz",
  robots: { index: true, follow: true },
};

export default function DatenschutzPage() {
  return (
    <Section className="bg-white py-14 md:py-16">
      <div className="max-w-2xl space-y-6 text-sm text-zinc-700 leading-relaxed">
        <h1 className="text-3xl font-bold text-zinc-900">Datenschutzerklärung</h1>
        <p>
          Wir nehmen den Schutz Ihrer persönlichen Daten sehr ernst. Diese
          Seite informiert Sie über Art, Umfang und Zweck der Verarbeitung
          personenbezogener Daten bei Nutzung dieser Website (Beispielinhalt).
        </p>
        <h2 className="text-lg font-semibold text-zinc-900 pt-2">
          Verantwortliche Stelle
        </h2>
        <p>
          Verantwortlich im Sinne der DSGVO ist die in unserem Impressum
          genannte Gesellschaft.
        </p>
        <h2 className="text-lg font-semibold text-zinc-900 pt-2">
          Hosting und Server-Logfiles
        </h2>
        <p>
          Beim Aufruf dieser Website werden durch den Hosting-Provider technisch
          notwendige Informationen (z. B. IP-Adresse, Zeitstempel, User-Agent)
          in Server-Logfiles verarbeitet, um einen stabilen und sicheren Betrieb
          zu gewährleisten.
        </p>
        <h2 className="text-lg font-semibold text-zinc-900 pt-2">Kontaktformular</h2>
        <p>
          Wenn Sie uns per Formular Anfragen zukommen lassen, werden Ihre Angaben
          zur Bearbeitung sowie für Anschlussfragen gespeichert und intern
          weitergeleitet. Eine Weitergabe an Dritte erfolgt nicht ohne
          Rechtsgrundlage oder Einwilligung.
        </p>
        <h2 className="text-lg font-semibold text-zinc-900 pt-2">Ihre Rechte</h2>
        <p>
          Sie haben das Recht auf Auskunft, Berichtigung, Löschung,
          Einschränkung der Verarbeitung, Datenübertragbarkeit sowie Widerspruch
          gegen die Verarbeitung, soweit dem keine berechtigten Interessen
          entgegenstehen.
        </p>
        <p className="text-xs text-zinc-500">
          Diese Datenschutzerklärung ist eine Mustervorlage und sollte durch
          eine juristische Prüfung an Ihre konkrete Datenverarbeitung
          angepasst werden.
        </p>
      </div>
    </Section>
  );
}
