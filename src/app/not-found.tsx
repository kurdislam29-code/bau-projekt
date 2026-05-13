import Link from "next/link";
import { Container } from "@/components/layout/Container";

export default function NotFound() {
  return (
    <section className="py-20 md:py-28 bg-white">
      <Container className="text-center max-w-lg">
        <p className="text-sm font-semibold text-brand uppercase tracking-wide">
          404
        </p>
        <h1 className="mt-2 text-2xl md:text-3xl font-bold text-zinc-900">
          Seite nicht gefunden
        </h1>
        <p className="mt-3 text-zinc-600 text-sm leading-relaxed">
          Die angeforderte Seite existiert nicht oder wurde verschoben.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex items-center justify-center rounded-md bg-brand px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-600 transition-colors"
        >
          Zur Startseite
        </Link>
      </Container>
    </section>
  );
}
