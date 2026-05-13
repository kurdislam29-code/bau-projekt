import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { reorderProjectsAction } from "@/server/actions/admin-projects";

export const dynamic = "force-dynamic";

export default async function AdminProjectsPage() {
  const projects = await prisma.project.findMany({
    orderBy: { sortOrder: "asc" },
    include: {
      categories: { include: { category: true } },
    },
  });
  const orderCsv = projects.map((p) => p.id).join(",");

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-xl font-bold text-zinc-900">Projekte</h1>
        <Link
          href="/admin/projects/new"
          className="rounded-lg bg-brand px-4 py-2 text-sm font-semibold text-white"
        >
          Neues Projekt
        </Link>
      </div>

      <form
        action={reorderProjectsAction}
        className="rounded-xl border border-zinc-200 bg-white p-4 shadow-sm space-y-2"
      >
        <label className="text-xs font-medium text-zinc-600">
          Reihenfolge (Projekt-IDs, kommagetrennt)
        </label>
        <textarea
          name="order"
          className="w-full rounded-lg border border-zinc-200 p-2 font-mono text-xs"
          rows={2}
          defaultValue={orderCsv}
        />
        <button
          type="submit"
          className="rounded-md bg-zinc-900 px-3 py-1.5 text-xs font-semibold text-white"
        >
          Reihenfolge speichern
        </button>
      </form>

      <div className="overflow-x-auto rounded-xl border border-zinc-200 bg-white shadow-sm">
        <table className="min-w-full text-left text-sm">
          <thead className="border-b border-zinc-100 bg-zinc-50 text-xs uppercase text-zinc-500">
            <tr>
              <th className="px-4 py-3">Titel</th>
              <th className="px-4 py-3">Kategorien</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody>
            {projects.map((p) => (
              <tr key={p.id} className="border-b border-zinc-50">
                <td className="px-4 py-3 font-medium">{p.title}</td>
                <td className="px-4 py-3 text-zinc-500">
                  {[...p.categories]
                    .sort(
                      (a, b) =>
                        a.category.sortOrder - b.category.sortOrder ||
                        a.category.name.localeCompare(b.category.name, "de"),
                    )
                    .map((x) => x.category.name)
                    .join(" · ") || "—"}
                </td>
                <td className="px-4 py-3 text-right">
                  <Link href={`/admin/projects/${p.id}`} className="text-brand hover:underline">
                    Bearbeiten
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
