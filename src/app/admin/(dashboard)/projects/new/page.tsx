import { prisma } from "@/lib/prisma";
import { ProjectForm } from "@/components/admin/ProjectForm";

export const dynamic = "force-dynamic";

export default async function AdminProjectNewPage() {
  const [categories, media] = await Promise.all([
    prisma.projectCategory.findMany({ orderBy: { sortOrder: "asc" } }),
    prisma.mediaFile.findMany({
      orderBy: { createdAt: "desc" },
      take: 400,
      select: { id: true, path: true, originalName: true },
    }),
  ]);

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-bold text-zinc-900">Neues Projekt</h1>
      <ProjectForm categories={categories} media={media} />
    </div>
  );
}
