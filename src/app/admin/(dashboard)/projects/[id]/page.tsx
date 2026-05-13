import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { ProjectForm } from "@/components/admin/ProjectForm";

export const dynamic = "force-dynamic";

export default async function AdminProjectEditPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [project, categories, media] = await Promise.all([
    prisma.project.findUnique({
      where: { id },
      include: {
        images: true,
        categories: { include: { category: true } },
      },
    }),
    prisma.projectCategory.findMany({ orderBy: { sortOrder: "asc" } }),
    prisma.mediaFile.findMany({
      orderBy: { createdAt: "desc" },
      take: 400,
      select: { id: true, path: true, originalName: true },
    }),
  ]);
  if (!project) notFound();

  const galleryIds = project.images
    .filter((i) => i.kind === "GALLERY")
    .sort((a, b) => a.sortOrder - b.sortOrder)
    .map((i) => i.mediaFileId)
    .join(" ");
  const beforeId =
    project.images.find((i) => i.kind === "BEFORE")?.mediaFileId ?? "";
  const afterId =
    project.images.find((i) => i.kind === "AFTER")?.mediaFileId ?? "";
  const selectedCategoryIds = project.categories.map((c) => c.categoryId);

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-bold text-zinc-900">Projekt bearbeiten</h1>
      <ProjectForm
        categories={categories}
        media={media}
        project={{
          id: project.id,
          slug: project.slug,
          title: project.title,
          location: project.location,
          description: project.description,
          galleryIds,
          beforeId,
          afterId,
          selectedCategoryIds,
        }}
      />
    </div>
  );
}
