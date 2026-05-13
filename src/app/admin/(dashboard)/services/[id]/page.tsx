import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { ServiceForm } from "@/components/admin/ServiceForm";

export const dynamic = "force-dynamic";

function parseBody(raw: string): string {
  try {
    const v = JSON.parse(raw) as unknown;
    if (!Array.isArray(v)) return "";
    return v.map(String).join("\n\n");
  } catch {
    return "";
  }
}

export default async function AdminServiceEditPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [service, categories, media] = await Promise.all([
    prisma.service.findUnique({
      where: { id },
      include: { gallery: { orderBy: { sortOrder: "asc" } } },
    }),
    prisma.serviceCategory.findMany({ orderBy: { name: "asc" } }),
    prisma.mediaFile.findMany({
      orderBy: { createdAt: "desc" },
      take: 400,
      select: { id: true, path: true, originalName: true },
    }),
  ]);
  if (!service) notFound();

  const galleryIds = service.gallery.map((g) => g.mediaFileId).join(" ");

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-bold text-zinc-900">Leistung bearbeiten</h1>
      <ServiceForm
        categories={categories}
        media={media}
        service={{
          id: service.id,
          slug: service.slug,
          title: service.title,
          excerpt: service.excerpt,
          intro: service.intro,
          body: parseBody(service.body),
          categoryId: service.categoryId,
          heroMediaId: service.heroMediaId,
          galleryIds,
        }}
      />
    </div>
  );
}
