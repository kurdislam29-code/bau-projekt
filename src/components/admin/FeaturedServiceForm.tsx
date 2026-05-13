"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import {
  createFeaturedHighlightAction,
  deleteFeaturedHighlightAction,
  updateFeaturedHighlightAction,
} from "@/server/actions/admin-featured-services";

const label = "block text-sm font-medium text-zinc-700";
const input =
  "mt-1 w-full rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm outline-none focus:border-brand focus:ring-2 focus:ring-brand/20";

type Svc = { id: string; title: string; slug: string };

type Item = {
  id: string;
  serviceId: string;
  badge: string;
  visible: boolean;
  service: Svc;
};

export function FeaturedServiceForm({
  allServices,
  occupiedServiceIds,
  item,
}: {
  allServices: Svc[];
  occupiedServiceIds: string[];
  item?: Item;
}) {
  const router = useRouter();
  const [msg, setMsg] = useState<string | null>(null);
  const isEdit = Boolean(item);

  const options = useMemo(
    () =>
      allServices.filter(
        (s) =>
          !occupiedServiceIds.includes(s.id) || s.id === item?.serviceId,
      ),
    [allServices, occupiedServiceIds, item?.serviceId],
  );

  return (
    <div className="max-w-3xl space-y-6">
      <form
        className="space-y-4 rounded-xl border border-zinc-200 bg-white p-6 shadow-sm"
        action={async (fd) => {
          setMsg(null);
          const res = isEdit
            ? await updateFeaturedHighlightAction(fd)
            : await createFeaturedHighlightAction(fd);
          if (!res.ok) {
            setMsg((res.error as string[] | undefined)?.join(", ") ?? "Fehler");
            return;
          }
          setMsg("Gespeichert.");
          if (!isEdit && "id" in res && res.id) {
            router.replace(`/admin/featured-services/${res.id}`);
          } else {
            router.refresh();
          }
        }}
      >
        {item ? <input type="hidden" name="id" value={item.id} /> : null}
        <div>
          <label className={label}>Leistung (Zielseite)</label>
          <select
            name="serviceId"
            className={input}
            required
            defaultValue={item?.serviceId ?? ""}
          >
            <option value="">— Leistung wählen —</option>
            {options.map((s) => (
              <option key={s.id} value={s.id}>
                {s.title} ({s.slug})
              </option>
            ))}
          </select>
          <p className="mt-1 text-xs text-zinc-500">
            Die Karte verlinkt auf{" "}
            <code className="rounded bg-zinc-100 px-1">
              /dienstleistungen/[slug]
            </code>
            . Titel, Kurztext, Hero, Galerie und SEO bearbeiten Sie in der
            Leistungsverwaltung.
          </p>
        </div>
        {item ? (
          <p className="text-sm text-zinc-600">
            Leistung bearbeiten:{" "}
            <Link
              href={`/admin/services/${item.service.id}`}
              className="font-medium text-brand hover:underline"
            >
              {item.service.title} öffnen
            </Link>{" "}
            ·{" "}
            <Link
              href={`/dienstleistungen/${item.service.slug}`}
              className="text-zinc-500 hover:text-zinc-800 hover:underline"
              target="_blank"
              rel="noreferrer"
            >
              Vorschau
            </Link>
          </p>
        ) : null}
        <div>
          <label className={label}>Ribbon-Badge (optional)</label>
          <input
            name="badge"
            className={input}
            defaultValue={item?.badge}
            placeholder="Leer = Leistungs-Kategoriename auf der Karte"
          />
        </div>
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            name="visible"
            id="featured-visible"
            defaultChecked={item?.visible ?? true}
            className="h-4 w-4 rounded border-zinc-300 text-brand focus:ring-brand"
          />
          <label htmlFor="featured-visible" className="text-sm text-zinc-700">
            Auf der Website sichtbar
          </label>
        </div>
        {msg ? <p className="text-sm text-emerald-700">{msg}</p> : null}
        <button
          type="submit"
          className="rounded-lg bg-brand px-5 py-2.5 text-sm font-semibold text-white"
        >
          {isEdit ? "Speichern" : "Anlegen"}
        </button>
      </form>

      {item ? (
        <form
          action={async (fd) => {
            await deleteFeaturedHighlightAction(fd);
            router.push("/admin/featured-services");
            router.refresh();
          }}
          className="rounded-xl border border-red-100 bg-red-50/50 p-4"
        >
          <input type="hidden" name="id" value={item.id} />
          <button
            type="submit"
            className="text-sm font-semibold text-red-700 hover:underline"
          >
            Raster-Eintrag löschen
          </button>
        </form>
      ) : null}
    </div>
  );
}
