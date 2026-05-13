import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { reorderServicesAction } from "@/server/actions/admin-services";

export const dynamic = "force-dynamic";

export default async function AdminServicesPage() {
  const services = await prisma.service.findMany({
    orderBy: { sortOrder: "asc" },
    include: { category: true },
  });
  const orderCsv = services.map((s) => s.id).join(",");

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-xl font-bold text-zinc-900">Leistungen</h1>
        <Link
          href="/admin/services/new"
          className="rounded-lg bg-brand px-4 py-2 text-sm font-semibold text-white"
        >
          Neue Leistung
        </Link>
      </div>

      <form
        action={reorderServicesAction}
        className="rounded-xl border border-zinc-200 bg-white p-4 shadow-sm space-y-2"
      >
        <label className="text-xs font-medium text-zinc-600">
          Reihenfolge (Service-IDs, kommagetrennt – aktuelle Reihenfolge unten
          kopieren und anpassen)
        </label>
        <textarea
          name="order"
          className="w-full rounded-lg border border-zinc-200 p-2 font-mono text-xs"
          rows={3}
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
              <th className="px-4 py-3">Slug</th>
              <th className="px-4 py-3">Kategorie</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody>
            {services.map((s) => (
              <tr key={s.id} className="border-b border-zinc-50">
                <td className="px-4 py-3 font-medium text-zinc-800">{s.title}</td>
                <td className="px-4 py-3 text-zinc-500">{s.slug}</td>
                <td className="px-4 py-3 text-zinc-500">
                  {s.category?.name ?? "—"}
                </td>
                <td className="px-4 py-3 text-right">
                  <Link
                    href={`/admin/services/${s.id}`}
                    className="text-brand hover:underline"
                  >
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
