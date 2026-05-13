import { prisma } from "@/lib/prisma";
import { SeoTable } from "@/components/admin/SeoTable";

export const dynamic = "force-dynamic";

export default async function AdminSeoPage() {
  const [settings, media] = await Promise.all([
    prisma.sEOSettings.findMany({
      orderBy: { id: "asc" },
      include: {
        service: { select: { title: true, slug: true } },
        project: { select: { title: true, slug: true } },
      },
    }),
    prisma.mediaFile.findMany({
      orderBy: { createdAt: "desc" },
      take: 300,
      select: { id: true, path: true, originalName: true },
    }),
  ]);

  const rows = settings.map((s) => {
    let label = s.pageKey ?? "Eintrag";
    if (s.pageKey === "HOME") label = "Startseite (HOME)";
    if (s.pageKey === "KARRIERE") label = "Karriere";
    if (s.service) label = `Leistung: ${s.service.title}`;
    if (s.project) label = `Projekt: ${s.project.title}`;
    return {
      id: s.id,
      label,
      title: s.title,
      description: s.description,
      canonicalUrl: s.canonicalUrl,
      ogMediaId: s.ogMediaId,
    };
  });

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-bold text-zinc-900">SEO</h1>
      <p className="text-sm text-zinc-500">
        Meta-Titel, Beschreibungen, Open-Graph-Bilder und Canonical-URLs.
      </p>
      <SeoTable rows={rows} media={media} />
    </div>
  );
}
