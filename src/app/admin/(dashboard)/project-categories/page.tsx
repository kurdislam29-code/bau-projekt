import { prisma } from "@/lib/prisma";
import {
  createProjectCategoryAction,
  deleteProjectCategoryAction,
  updateProjectCategoryAction,
} from "@/server/actions/admin-project-categories";

export const dynamic = "force-dynamic";

export default async function AdminProjectCategoriesPage() {
  const categories = await prisma.projectCategory.findMany({
    orderBy: { sortOrder: "asc" },
  });

  return (
    <div className="max-w-3xl space-y-8">
      <h1 className="text-xl font-bold text-zinc-900">Projekt-Kategorien</h1>

      <form
        action={createProjectCategoryAction}
        className="rounded-xl border border-zinc-200 bg-white p-5 shadow-sm space-y-3"
      >
        <h2 className="text-sm font-semibold text-zinc-900">Neue Kategorie</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          <input
            name="name"
            placeholder="Name"
            required
            className="rounded-lg border border-zinc-200 px-3 py-2 text-sm"
          />
          <input
            name="slug"
            placeholder="slug"
            required
            className="rounded-lg border border-zinc-200 px-3 py-2 text-sm"
          />
        </div>
        <button
          type="submit"
          className="rounded-lg bg-brand px-4 py-2 text-sm font-semibold text-white"
        >
          Anlegen
        </button>
      </form>

      <ul className="space-y-3">
        {categories.map((c) => (
          <li
            key={c.id}
            className="flex flex-col gap-3 rounded-xl border border-zinc-200 bg-white p-4 shadow-sm sm:flex-row sm:items-end"
          >
            <form action={updateProjectCategoryAction} className="flex-1 space-y-2">
              <input type="hidden" name="id" value={c.id} />
              <div className="grid gap-2 sm:grid-cols-2">
                <input
                  name="name"
                  defaultValue={c.name}
                  className="rounded-lg border border-zinc-200 px-3 py-2 text-sm"
                />
                <input
                  name="slug"
                  defaultValue={c.slug}
                  className="rounded-lg border border-zinc-200 px-3 py-2 text-sm"
                />
              </div>
              <button
                type="submit"
                className="text-xs font-semibold text-brand hover:underline"
              >
                Speichern
              </button>
            </form>
            <form action={deleteProjectCategoryAction}>
              <input type="hidden" name="id" value={c.id} />
              <button
                type="submit"
                className="text-xs font-semibold text-red-600 hover:underline"
              >
                Löschen
              </button>
            </form>
          </li>
        ))}
      </ul>
    </div>
  );
}
