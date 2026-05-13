"use client";

import Link from "next/link";
import { useState } from "react";
import { updateHomepageAction } from "@/server/actions/admin-homepage";

const label = "block text-sm font-medium text-zinc-700";
const input =
  "mt-1 w-full rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 shadow-sm outline-none focus:border-brand focus:ring-2 focus:ring-brand/20";
const textarea =
  "mt-1 w-full rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 shadow-sm outline-none focus:border-brand focus:ring-2 focus:ring-brand/20 min-h-[88px]";

type MediaOpt = { id: string; path: string; originalName: string };

type Home = {
  heroTitle: string;
  heroTitleAccent: string;
  heroSubtitle: string;
  heroCta1Label: string;
  heroCta1Href: string;
  heroCta2Label: string;
  heroCta2Href: string;
  heroMediaId: string | null;
  aboutTitlePrefix: string;
  aboutTitleAccent: string;
  aboutParagraph1: string;
  aboutParagraph2: string;
  statisticsJson: string;
  ctaBannerTitle: string;
  ctaBannerSubtitle: string;
  ctaBannerButtonLabel: string;
  ctaBannerButtonHref: string;
  ctaBannerMediaId: string | null;
  contactSectionTitle: string;
  contactSectionLead: string;
};

export function HomepageFormClient({
  initial,
  media,
}: {
  initial: Home;
  media: MediaOpt[];
}) {
  const [msg, setMsg] = useState<string | null>(null);
  const [err, setErr] = useState<Record<string, string[] | undefined> | null>(
    null,
  );

  const mediaSelect = (
    name: string,
    value: string | null,
    labelText: string,
  ) => (
    <div>
      <label className={label}>{labelText}</label>
      <select name={name} className={input} defaultValue={value ?? ""}>
        <option value="">— kein Bild —</option>
        {media.map((m) => (
          <option key={m.id} value={m.id}>
            {m.originalName} ({m.path})
          </option>
        ))}
      </select>
    </div>
  );

  return (
    <form
      className="max-w-4xl space-y-10"
      action={async (fd) => {
        setMsg(null);
        setErr(null);
        const r = await updateHomepageAction(fd);
        if (!r.ok) {
          setErr(r.error);
          return;
        }
        setMsg("Gespeichert.");
      }}
    >
      {msg ? (
        <p className="rounded-lg bg-emerald-50 px-3 py-2 text-sm text-emerald-800">
          {msg}
        </p>
      ) : null}
      {err ? (
        <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">
          Bitte Eingaben prüfen.
        </p>
      ) : null}

      <section className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm space-y-4">
        <h2 className="text-base font-semibold text-zinc-900">Hero</h2>
        <div>
          <label className={label}>Hero-Titel (weiß)</label>
          <input
            name="heroTitle"
            className={input}
            defaultValue={initial.heroTitle}
            required
          />
        </div>
        <div>
          <label className={label}>Hero-Titel (Akzent orange, optional)</label>
          <input
            name="heroTitleAccent"
            className={input}
            defaultValue={initial.heroTitleAccent}
            placeholder="z. B. zweite Zeile im Titel"
          />
        </div>
        <div>
          <label className={label}>Untertitel</label>
          <textarea
            name="heroSubtitle"
            className={textarea}
            defaultValue={initial.heroSubtitle}
            required
          />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className={label}>CTA 1 Text</label>
            <input
              name="heroCta1Label"
              className={input}
              defaultValue={initial.heroCta1Label}
            />
          </div>
          <div>
            <label className={label}>CTA 1 Link</label>
            <input
              name="heroCta1Href"
              className={input}
              defaultValue={initial.heroCta1Href}
            />
          </div>
          <div>
            <label className={label}>CTA 2 Text</label>
            <input
              name="heroCta2Label"
              className={input}
              defaultValue={initial.heroCta2Label}
            />
          </div>
          <div>
            <label className={label}>CTA 2 Link</label>
            <input
              name="heroCta2Href"
              className={input}
              defaultValue={initial.heroCta2Href}
            />
          </div>
        </div>
        {mediaSelect("heroMediaId", initial.heroMediaId, "Hero-Bild (Medienbibliothek)")}
      </section>

      <section className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm space-y-4">
        <h2 className="text-base font-semibold text-zinc-900">Über uns</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className={label}>Titel (Teil 1)</label>
            <input
              name="aboutTitlePrefix"
              className={input}
              defaultValue={initial.aboutTitlePrefix}
            />
          </div>
          <div>
            <label className={label}>Akzent (orange)</label>
            <input
              name="aboutTitleAccent"
              className={input}
              defaultValue={initial.aboutTitleAccent}
            />
          </div>
        </div>
        <div>
          <label className={label}>Absatz 1</label>
          <textarea
            name="aboutParagraph1"
            className={textarea}
            defaultValue={initial.aboutParagraph1}
          />
        </div>
        <div>
          <label className={label}>Absatz 2</label>
          <textarea
            name="aboutParagraph2"
            className={textarea}
            defaultValue={initial.aboutParagraph2}
          />
        </div>
        <p className="text-xs text-zinc-500">
          Die Highlight-Karten links neben diesem Text werden unter{" "}
          <Link
            href="/admin/featured-services"
            className="font-medium text-brand hover:underline"
          >
            Featured Services
          </Link>{" "}
          gepflegt.
        </p>
      </section>

      <section className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm space-y-4">
        <h2 className="text-base font-semibold text-zinc-900">Statistik-Kacheln</h2>
        <p className="text-xs text-zinc-500">
          JSON-Array mit Objekten label und value (siehe Seed-Beispiel).
        </p>
        <textarea
          name="statisticsJson"
          className={textarea + " min-h-[140px] font-mono text-xs"}
          defaultValue={initial.statisticsJson}
        />
      </section>

      <section className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm space-y-4">
        <h2 className="text-base font-semibold text-zinc-900">CTA-Banner</h2>
        <div>
          <label className={label}>Titel</label>
          <input
            name="ctaBannerTitle"
            className={input}
            defaultValue={initial.ctaBannerTitle}
          />
        </div>
        <div>
          <label className={label}>Untertitel (optional)</label>
          <input
            name="ctaBannerSubtitle"
            className={input}
            defaultValue={initial.ctaBannerSubtitle}
          />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className={label}>Button-Text</label>
            <input
              name="ctaBannerButtonLabel"
              className={input}
              defaultValue={initial.ctaBannerButtonLabel}
            />
          </div>
          <div>
            <label className={label}>Button-Link</label>
            <input
              name="ctaBannerButtonHref"
              className={input}
              defaultValue={initial.ctaBannerButtonHref}
            />
          </div>
        </div>
        {mediaSelect(
          "ctaBannerMediaId",
          initial.ctaBannerMediaId,
          "Hintergrundbild",
        )}
      </section>

      <section className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm space-y-4">
        <h2 className="text-base font-semibold text-zinc-900">Kontakt-Sektion (Startseite)</h2>
        <div>
          <label className={label}>Überschrift</label>
          <input
            name="contactSectionTitle"
            className={input}
            defaultValue={initial.contactSectionTitle}
          />
        </div>
        <div>
          <label className={label}>Einleitung</label>
          <textarea
            name="contactSectionLead"
            className={textarea}
            defaultValue={initial.contactSectionLead}
          />
        </div>
      </section>

      <button
        type="submit"
        className="rounded-lg bg-brand px-6 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-brand-600"
      >
        Speichern
      </button>
    </form>
  );
}
