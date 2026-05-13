"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  createServiceAction,
  deleteServiceAction,
  updateServiceAction,
} from "@/server/actions/admin-services";

const label = "block text-sm font-medium text-zinc-700";
const input =
  "mt-1 w-full rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm outline-none focus:border-brand focus:ring-2 focus:ring-brand/20";
const ta = input + " min-h-[160px]";

type Cat = { id: string; name: string };
type Med = { id: string; path: string; originalName: string };

type Svc = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  intro: string;
  body: string;
  categoryId: string | null;
  heroMediaId: string | null;
  galleryIds: string;
};

export function ServiceForm({
  categories,
  media,
  service,
}: {
  categories: Cat[];
  media: Med[];
  service?: Svc;
}) {
  const router = useRouter();
  const [msg, setMsg] = useState<string | null>(null);
  const isEdit = Boolean(service);

  return (
    <div className="max-w-3xl space-y-6">
      <form
        className="space-y-4 rounded-xl border border-zinc-200 bg-white p-6 shadow-sm"
        action={async (fd) => {
          setMsg(null);
          const res = isEdit
            ? await updateServiceAction(fd)
            : await createServiceAction(fd);
          if (!res.ok) {
            setMsg((res.error as string[] | undefined)?.join(", ") ?? "Fehler");
            return;
          }
          setMsg("Gespeichert.");
          if (!isEdit && "id" in res && res.id) {
            router.replace(`/admin/services/${res.id}`);
          } else {
            router.refresh();
          }
        }}
      >
        {service ? <input type="hidden" name="id" value={service.id} /> : null}
        {!isEdit ? (
          <div>
            <label className={label}>Slug</label>
            <input name="slug" className={input} required placeholder="z. B. hochbau" />
          </div>
        ) : (
          <p className="text-sm text-zinc-500">
            Slug: <strong className="text-zinc-800">{service?.slug}</strong>
          </p>
        )}
        <div>
          <label className={label}>Titel</label>
          <input
            name="title"
            className={input}
            required
            defaultValue={service?.title}
          />
        </div>
        <div>
          <label className={label}>Kurzbeschreibung (Karte)</label>
          <textarea
            name="excerpt"
            className={ta + " min-h-[80px]"}
            required
            defaultValue={service?.excerpt}
          />
        </div>
        <div>
          <label className={label}>Intro (Hero-Text)</label>
          <textarea name="intro" className={ta + " min-h-[80px]"} required defaultValue={service?.intro} />
        </div>
        <div>
          <label className={label}>Fließtext (Absätze durch Leerzeile trennen)</label>
          <textarea name="body" className={ta} required defaultValue={service?.body} />
        </div>
        <div>
          <label className={label}>Kategorie</label>
          <select
            name="categoryId"
            className={input}
            defaultValue={service?.categoryId ?? ""}
          >
            <option value="">— keine —</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className={label}>Hero-Bild (Medien-ID)</label>
          <select
            name="heroMediaId"
            className={input}
            defaultValue={service?.heroMediaId ?? ""}
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
          <label className={label}>Galerie (Medien-IDs, Leerzeichen/Komma)</label>
          <input
            name="galleryIds"
            className={input}
            placeholder="id1 id2 id3"
            defaultValue={service?.galleryIds}
          />
        </div>
        {msg ? <p className="text-sm text-emerald-700">{msg}</p> : null}
        <button
          type="submit"
          className="rounded-lg bg-brand px-5 py-2.5 text-sm font-semibold text-white"
        >
          {isEdit ? "Speichern" : "Anlegen"}
        </button>
      </form>

      {service ? (
        <form
          action={async (fd) => {
            await deleteServiceAction(fd);
            router.push("/admin/services");
            router.refresh();
          }}
          className="rounded-xl border border-red-100 bg-red-50/50 p-4"
        >
          <input type="hidden" name="id" value={service.id} />
          <button type="submit" className="text-sm font-semibold text-red-700 hover:underline">
            Leistung löschen
          </button>
        </form>
      ) : null}
    </div>
  );
}
