"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, Search, X } from "lucide-react";
import { Logo } from "@/components/branding/Logo";
import { Container } from "@/components/layout/Container";
import { cn } from "@/lib/cn";

const navAfterLeistungen = [
  { href: "/#projekte", label: "Projekte" },
  { href: "/karriere", label: "Karriere" },
  { href: "/#kontakt", label: "Kontakt" },
] as const;

type ServiceNav = { slug: string; title: string };

type HeaderProps = {
  services: ServiceNav[];
};

export function Header({ services }: HeaderProps) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const servicesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setOpen(false);
    setServicesOpen(false);
  }, [pathname]);

  useEffect(() => {
    function onDoc(e: MouseEvent) {
      if (!servicesRef.current?.contains(e.target as Node)) {
        setServicesOpen(false);
      }
    }
    document.addEventListener("click", onDoc);
    return () => document.removeEventListener("click", onDoc);
  }, []);

  const linkClass =
    "px-3 py-2 rounded-md hover:text-brand transition-colors whitespace-nowrap";

  const servicesMenu = (
    <div className="relative" ref={servicesRef}>
      <button
        type="button"
        onClick={() => setServicesOpen((v) => !v)}
        className={cn(
          "inline-flex items-center gap-1 px-3 py-2 rounded-md hover:text-brand transition-colors",
          servicesOpen && "text-brand"
        )}
        aria-expanded={servicesOpen}
        aria-haspopup="true"
      >
        Leistungen
        <ChevronDown className="h-4 w-4 opacity-70" aria-hidden />
      </button>
      {servicesOpen && (
        <div className="absolute left-0 top-full mt-1 w-[min(90vw,22rem)] rounded-lg border border-zinc-200 bg-white py-2 shadow-lg max-h-[70vh] overflow-y-auto">
          <Link
            href="/#leistungen"
            className="block px-4 py-2 text-sm text-brand font-semibold hover:bg-zinc-50"
            onClick={() => setServicesOpen(false)}
          >
            Übersicht
          </Link>
          <div className="border-t border-zinc-100 my-1" />
          {services.map((s) => (
            <Link
              key={s.slug}
              href={`/dienstleistungen/${s.slug}`}
              className="block px-4 py-2 text-sm text-zinc-700 hover:bg-zinc-50 hover:text-brand"
              onClick={() => setServicesOpen(false)}
            >
              {s.title}
            </Link>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <header className="sticky top-0 z-40 border-b border-zinc-200/80 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
      <Container className="flex h-16 items-center justify-between gap-5 md:h-[4.25rem] lg:gap-10">
        <Logo variant="header" priority={pathname === "/"} />

        <nav
          className="hidden lg:flex items-center gap-0.5 text-[15px] font-medium leading-snug text-zinc-700"
          aria-label="Hauptnavigation"
        >
          <Link
            href="/"
            className={cn(linkClass, pathname === "/" && "text-brand")}
          >
            Startseite
          </Link>
          <Link href="/#ueber-uns" className={linkClass}>
            Über uns
          </Link>
          {servicesMenu}
          {navAfterLeistungen.map((item) => (
            <Link key={item.href} href={item.href} className={linkClass}>
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-2">
          <Link
            href="/#kontakt"
            className="inline-flex h-10 w-10 items-center justify-center rounded-md text-zinc-600 hover:text-brand hover:bg-zinc-50 transition-colors"
            aria-label="Kontakt"
          >
            <Search className="h-5 w-5" />
          </Link>
          <Link
            href="/#kontakt"
            className="inline-flex items-center justify-center rounded-md bg-brand px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-brand-600 transition-colors"
          >
            Angebot anfordern
          </Link>
        </div>

        <button
          type="button"
          className="lg:hidden inline-flex h-10 w-10 items-center justify-center rounded-md border border-zinc-200 text-zinc-800"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Menü schließen" : "Menü öffnen"}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </Container>

      {open && (
        <div
          id="mobile-nav"
          className="lg:hidden border-t border-zinc-200 bg-white max-h-[calc(100vh-4rem)] overflow-y-auto"
        >
          <Container className="py-4 flex flex-col gap-1">
            <Link
              href="/"
              className="py-2.5 text-base font-medium text-zinc-800 border-b border-zinc-100"
            >
              Startseite
            </Link>
            <Link
              href="/#ueber-uns"
              className="py-2.5 text-base font-medium text-zinc-800 border-b border-zinc-100"
            >
              Über uns
            </Link>
            <p className="pt-2 text-xs font-semibold uppercase tracking-wide text-zinc-500">
              Leistungen
            </p>
            {services.map((s) => (
              <Link
                key={s.slug}
                href={`/dienstleistungen/${s.slug}`}
                className="py-2 pl-1 text-sm text-zinc-700 border-b border-zinc-50"
              >
                {s.title}
              </Link>
            ))}
            {navAfterLeistungen.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="py-2.5 text-base font-medium text-zinc-800 border-b border-zinc-100"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/#kontakt"
              className="mt-3 inline-flex items-center justify-center rounded-md bg-brand px-4 py-3 text-sm font-semibold text-white"
            >
              Angebot anfordern
            </Link>
          </Container>
        </div>
      )}
    </header>
  );
}
