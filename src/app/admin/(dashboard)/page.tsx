import Link from "next/link";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const [services, projects, media, lastProjects, lastMedia] = await Promise.all([
    prisma.service.count(),
    prisma.project.count(),
    prisma.mediaFile.count(),
    prisma.project.findMany({
      orderBy: { updatedAt: "desc" },
      take: 5,
      select: { id: true, title: true, slug: true, updatedAt: true },
    }),
    prisma.mediaFile.findMany({
      orderBy: { createdAt: "desc" },
      take: 5,
      select: { id: true, path: true, originalName: true, folder: true, createdAt: true },
    }),
  ]);

  return (
    <div className="space-y-8">
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-zinc-200 bg-white p-5 shadow-sm">
          <p className="text-xs font-medium uppercase tracking-wide text-zinc-500">
            Leistungen
          </p>
          <p className="mt-2 text-3xl font-bold text-zinc-900">{services}</p>
        </div>
        <div className="rounded-xl border border-zinc-200 bg-white p-5 shadow-sm">
          <p className="text-xs font-medium uppercase tracking-wide text-zinc-500">
            Projekte
          </p>
          <p className="mt-2 text-3xl font-bold text-zinc-900">{projects}</p>
        </div>
        <div className="rounded-xl border border-zinc-200 bg-white p-5 shadow-sm">
          <p className="text-xs font-medium uppercase tracking-wide text-zinc-500">
            Medien
          </p>
          <p className="mt-2 text-3xl font-bold text-zinc-900">{media}</p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <section className="rounded-xl border border-zinc-200 bg-white p-5 shadow-sm">
          <h2 className="text-sm font-semibold text-zinc-900">Neueste Projekte</h2>
          <ul className="mt-4 divide-y divide-zinc-100">
            {lastProjects.map((p) => (
              <li key={p.id} className="flex items-center justify-between py-3 text-sm">
                <span className="font-medium text-zinc-800">{p.title}</span>
                <Link
                  href={`/admin/projects/${p.id}`}
                  className="text-brand hover:underline"
                >
                  Bearbeiten
                </Link>
              </li>
            ))}
          </ul>
        </section>
        <section className="rounded-xl border border-zinc-200 bg-white p-5 shadow-sm">
          <h2 className="text-sm font-semibold text-zinc-900">Neueste Uploads</h2>
          <ul className="mt-4 divide-y divide-zinc-100">
            {lastMedia.map((m) => (
              <li key={m.id} className="py-3 text-sm">
                <p className="font-medium text-zinc-800 truncate">{m.originalName}</p>
                <p className="text-xs text-zinc-500 truncate">{m.path}</p>
              </li>
            ))}
          </ul>
        </section>
      </div>

      <div className="flex flex-wrap gap-3">
        <Link
          href="/admin/homepage"
          className="rounded-lg bg-brand px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-brand-600"
        >
          Startseite bearbeiten
        </Link>
        <Link
          href="/admin/media"
          className="rounded-lg border border-zinc-200 bg-white px-4 py-2.5 text-sm font-semibold text-zinc-800 hover:border-brand hover:text-brand"
        >
          Medien hochladen
        </Link>
        <Link
          href="/admin/services/new"
          className="rounded-lg border border-zinc-200 bg-white px-4 py-2.5 text-sm font-semibold text-zinc-800 hover:border-brand hover:text-brand"
        >
          Leistung hinzufügen
        </Link>
      </div>
    </div>
  );
}
