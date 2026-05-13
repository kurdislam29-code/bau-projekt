import { prisma } from "@/lib/prisma";
import { ServiceForm } from "@/components/admin/ServiceForm";

export const dynamic = "force-dynamic";

export default async function AdminServiceNewPage() {
  const [categories, media] = await Promise.all([
    prisma.serviceCategory.findMany({ orderBy: { name: "asc" } }),
    prisma.mediaFile.findMany({
      orderBy: { createdAt: "desc" },
      take: 400,
      select: { id: true, path: true, originalName: true },
    }),
  ]);

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-bold text-zinc-900">Neue Leistung</h1>
      <ServiceForm categories={categories} media={media} />
    </div>
  );
}
