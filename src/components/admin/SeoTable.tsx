"use client";

import { useState } from "react";
import { updateSeoSettingsAction } from "@/server/actions/admin-seo";

const label = "block text-xs font-medium text-zinc-600";
const input =
  "mt-0.5 w-full rounded-md border border-zinc-200 bg-white px-2 py-1.5 text-sm text-zinc-900 outline-none focus:border-brand focus:ring-1 focus:ring-brand/25";

type Row = {
  id: string;
  label: string;
  title: string | null;
  description: string | null;
  canonicalUrl: string | null;
  ogMediaId: string | null;
};

export function SeoTable({
  rows,
  media,
}: {
  rows: Row[];
  media: { id: string; path: string; originalName: string }[];
}) {
  const [msg, setMsg] = useState<string | null>(null);

  return (
    <div className="space-y-4">
      {msg ? (
        <p className="text-sm text-emerald-700">{msg}</p>
      ) : null}
      <div className="space-y-4">
        {rows.map((r) => (
          <div
            key={r.id}
            className="rounded-xl border border-zinc-200 bg-white p-5 shadow-sm"
          >
            <h3 className="text-sm font-semibold text-zinc-900">{r.label}</h3>
            <form
              className="mt-4 grid gap-3 md:grid-cols-2"
                    action={async (fd) => {
                      await updateSeoSettingsAction(fd);
                      setMsg("SEO gespeichert.");
                    }}
            >
              <input type="hidden" name="id" value={r.id} />
              <div className="md:col-span-2">
                <label className={label}>Titel</label>
                <input
                  name="title"
                  className={input}
                  defaultValue={r.title ?? ""}
                />
              </div>
              <div className="md:col-span-2">
                <label className={label}>Beschreibung</label>
                <textarea
                  name="description"
                  className={input + " min-h-[80px]"}
                  defaultValue={r.description ?? ""}
                />
              </div>
              <div>
                <label className={label}>OG-Bild</label>
                <select
                  name="ogMediaId"
                  className={input}
                  defaultValue={r.ogMediaId ?? ""}
                >
                  <option value="">—</option>
                  {media.map((m) => (
                    <option key={m.id} value={m.id}>
                      {m.originalName}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className={label}>Canonical URL</label>
                <input
                  name="canonicalUrl"
                  className={input}
                  defaultValue={r.canonicalUrl ?? ""}
                />
              </div>
              <div className="md:col-span-2 flex justify-end">
                <button
                  type="submit"
                  className="rounded-md bg-brand px-4 py-2 text-sm font-semibold text-white hover:bg-brand-600"
                >
                  Speichern
                </button>
              </div>
            </form>
          </div>
        ))}
      </div>
    </div>
  );
}
