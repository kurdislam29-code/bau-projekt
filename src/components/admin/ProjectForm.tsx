"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  createProjectAction,
  deleteProjectAction,
  updateProjectAction,
} from "@/server/actions/admin-projects";

const label = "block text-sm font-medium text-zinc-700";
const input =
  "mt-1 w-full rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm outline-none focus:border-brand focus:ring-2 focus:ring-brand/20";
const ta = input + " min-h-[120px]";

type Cat = { id: string; name: string; sortOrder: number };
type Med = { id: string; path: string; originalName: string };

type Proj = {
  id: string;
  slug: string;
  title: string;
  location: string;
  description: string;
  galleryIds: string;
  beforeId: string;
  afterId: string;
  selectedCategoryIds: string[];
};

export function ProjectForm({
  categories,
  media,
  project,
}: {
  categories: Cat[];
  media: Med[];
  project?: Proj;
}) {
  const router = useRouter();
  const [msg, setMsg] = useState<string | null>(null);
  const isEdit = Boolean(project);

  const sortedCats = [...categories].sort(
    (a, b) => a.sortOrder - b.sortOrder || a.name.localeCompare(b.name, "de"),
  );

  return (
    <div className="max-w-3xl space-y-6">
      <form
        className="space-y-4 rounded-xl border border-zinc-200 bg-white p-6 shadow-sm"
        action={async (fd) => {
          setMsg(null);
          const res = isEdit
            ? await updateProjectAction(fd)
            : await createProjectAction(fd);
          if (!res.ok) {
            setMsg((res.error as string[] | undefined)?.join(", ") ?? "Fehler");
            return;
          }
          setMsg("Gespeichert.");
          if (!isEdit && "id" in res && res.id) {
            router.replace(`/admin/projects/${res.id}`);
          } else {
            router.refresh();
          }
        }}
      >
        {project ? <input type="hidden" name="id" value={project.id} /> : null}
        {!isEdit ? (
          <div>
            <label className={label}>Slug</label>
            <input name="slug" className={input} required />
          </div>
        ) : (
          <p className="text-sm text-zinc-500">
            Slug: <strong>{project?.slug}</strong>
          </p>
        )}
        <div>
          <label className={label}>Titel</label>
          <input name="title" className={input} required defaultValue={project?.title} />
        </div>
        <div>
          <label className={label}>Ort (optional, intern)</label>
          <input name="location" className={input} defaultValue={project?.location} />
        </div>
        <div>
          <label className={label}>Beschreibung</label>
          <textarea name="description" className={ta} defaultValue={project?.description} />
        </div>
        <fieldset>
          <legend className={label}>Projekt-Kategorien</legend>
          <p className="mt-1 text-xs text-zinc-500">
            Erscheinen unter der Referenz-Karte auf der Startseite. Mindestens eine Auswahl.
          </p>
          <div className="mt-2 grid gap-2 sm:grid-cols-2">
            {sortedCats.map((c) => (
              <label
                key={c.id}
                className="flex cursor-pointer items-center gap-2 rounded-lg border border-zinc-200 px-3 py-2 text-sm text-zinc-800 hover:bg-zinc-50"
              >
                <input
                  type="checkbox"
                  name="categoryIds"
                  value={c.id}
                  defaultChecked={project?.selectedCategoryIds?.includes(c.id) ?? false}
                  className="rounded border-zinc-300 text-brand focus:ring-brand/30"
                />
                {c.name}
              </label>
            ))}
          </div>
        </fieldset>
        <div>
          <label className={label}>Galerie-Bilder (Medien-IDs)</label>
          <input name="galleryIds" className={input} defaultValue={project?.galleryIds} />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className={label}>Vorher (Medien-ID)</label>
            <select name="beforeMediaId" className={input} defaultValue={project?.beforeId ?? ""}>
              <option value="">—</option>
              {media.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.originalName}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className={label}>Nachher (Medien-ID)</label>
            <select name="afterMediaId" className={input} defaultValue={project?.afterId ?? ""}>
              <option value="">—</option>
              {media.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.originalName}
                </option>
              ))}
            </select>
          </div>
        </div>
        {msg ? <p className="text-sm text-emerald-700">{msg}</p> : null}
        <button
          type="submit"
          className="rounded-lg bg-brand px-5 py-2.5 text-sm font-semibold text-white"
        >
          {isEdit ? "Speichern" : "Anlegen"}
        </button>
      </form>

      {project ? (
        <form
          action={async (fd) => {
            await deleteProjectAction(fd);
            router.push("/admin/projects");
            router.refresh();
          }}
          className="rounded-xl border border-red-100 bg-red-50/50 p-4"
        >
          <input type="hidden" name="id" value={project.id} />
          <button type="submit" className="text-sm font-semibold text-red-700 hover:underline">
            Projekt löschen
          </button>
        </form>
      ) : null}
    </div>
  );
}
