import Link from "next/link";
import { prisma } from "@/lib/prisma";
import {
  moveFeaturedHighlightAction,
  reorderFeaturedHighlightsAction,
  toggleFeaturedHighlightVisibilityAction,
} from "@/server/actions/admin-featured-services";

export const dynamic = "force-dynamic";

export default async function AdminFeaturedServicesPage() {
  const items = await prisma.featuredServiceHighlight.findMany({
    orderBy: { sortOrder: "asc" },
    include: {
      service: {
        select: {
          title: true,
          slug: true,
          heroMedia: { select: { originalName: true } },
        },
      },
    },
  });
  const orderCsv = items.map((r) => r.id).join(",");

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold text-zinc-900">Featured Services</h1>
          <p className="text-sm text-zinc-500">
            Wählen Sie bis zu vier Leistungen für das Raster neben „Über uns“.
            Inhalte und SEO pflegen Sie pro Leistung unter Leistungen.
          </p>
        </div>
        <Link
          href="/admin/featured-services/new"
          className="rounded-lg bg-brand px-4 py-2 text-sm font-semibold text-white"
        >
          Neuer Eintrag
        </Link>
      </div>

      <form
        action={reorderFeaturedHighlightsAction}
        className="rounded-xl border border-zinc-200 bg-white p-4 shadow-sm space-y-2"
      >
        <label className="text-xs font-medium text-zinc-600">
          Reihenfolge (IDs kommagetrennt – Reihenfolge von oben nach unten)
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
              <th className="px-4 py-3">Pos.</th>
              <th className="px-4 py-3">Leistung</th>
              <th className="px-4 py-3">Slug</th>
              <th className="px-4 py-3">Hero-Medium</th>
              <th className="px-4 py-3">Badge</th>
              <th className="px-4 py-3">Sichtbar</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody>
            {items.map((row, index) => (
              <tr key={row.id} className="border-b border-zinc-50">
                <td className="px-4 py-3 align-middle">
                  <div className="flex flex-col gap-1">
                    <form action={moveFeaturedHighlightAction}>
                      <input type="hidden" name="id" value={row.id} />
                      <input type="hidden" name="direction" value="up" />
                      <button
                        type="submit"
                        disabled={index === 0}
                        className="rounded border border-zinc-200 px-1.5 py-0.5 text-[10px] font-semibold disabled:opacity-40 hover:bg-zinc-50"
                      >
                        ↑
                      </button>
                    </form>
                    <form action={moveFeaturedHighlightAction}>
                      <input type="hidden" name="id" value={row.id} />
                      <input type="hidden" name="direction" value="down" />
                      <button
                        type="submit"
                        disabled={index === items.length - 1}
                        className="rounded border border-zinc-200 px-1.5 py-0.5 text-[10px] font-semibold disabled:opacity-40 hover:bg-zinc-50"
                      >
                        ↓
                      </button>
                    </form>
                  </div>
                </td>
                <td className="px-4 py-3 font-medium text-zinc-800 max-w-[200px]">
                  <span className="line-clamp-2">
                    {row.service?.title ?? "—"}
                  </span>
                </td>
                <td className="px-4 py-3 font-mono text-xs text-zinc-600">
                  {row.service?.slug ?? "—"}
                </td>
                <td className="px-4 py-3 text-xs text-zinc-500">
                  <span className="line-clamp-1 max-w-[160px]">
                    {row.service?.heroMedia?.originalName ?? "—"}
                  </span>
                </td>
                <td className="px-4 py-3 text-zinc-500 text-xs">
                  {row.badge?.trim() || "—"}
                </td>
                <td className="px-4 py-3">
                  <form action={toggleFeaturedHighlightVisibilityAction}>
                    <input type="hidden" name="id" value={row.id} />
                    <button
                      type="submit"
                      className={
                        row.visible
                          ? "rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-semibold text-emerald-800 hover:bg-emerald-200"
                          : "rounded-full bg-zinc-200 px-2.5 py-1 text-xs font-semibold text-zinc-600 hover:bg-zinc-300"
                      }
                    >
                      {row.visible ? "Sichtbar" : "Aus"}
                    </button>
                  </form>
                </td>
                <td className="px-4 py-3 text-right">
                  <Link
                    href={`/admin/featured-services/${row.id}`}
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
