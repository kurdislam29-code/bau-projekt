import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { FeaturedServiceForm } from "@/components/admin/FeaturedServiceForm";

export const dynamic = "force-dynamic";

export default async function AdminFeaturedServiceEditPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const row = await prisma.featuredServiceHighlight.findUnique({
    where: { id },
    include: {
      service: { select: { id: true, title: true, slug: true } },
    },
  });

  if (!row || !row.service) notFound();

  const others = await prisma.featuredServiceHighlight.findMany({
    where: { id: { not: id } },
    select: { serviceId: true },
  });
  const occupiedServiceIds = others.map((o) => o.serviceId);

  const allServices = await prisma.service.findMany({
    orderBy: { title: "asc" },
    select: { id: true, title: true, slug: true },
  });

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-bold text-zinc-900">Featured-Raster bearbeiten</h1>
      <FeaturedServiceForm
        allServices={allServices}
        occupiedServiceIds={occupiedServiceIds}
        item={{
          id: row.id,
          serviceId: row.serviceId,
          badge: row.badge,
          visible: row.visible,
          service: row.service,
        }}
      />
    </div>
  );
}
