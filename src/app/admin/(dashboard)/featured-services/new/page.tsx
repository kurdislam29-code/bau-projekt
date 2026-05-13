import { prisma } from "@/lib/prisma";
import { FeaturedServiceForm } from "@/components/admin/FeaturedServiceForm";

export const dynamic = "force-dynamic";

export default async function AdminFeaturedServiceNewPage() {
  const used = await prisma.featuredServiceHighlight.findMany({
    select: { serviceId: true },
  });
  const occupiedServiceIds = used.map((u) => u.serviceId);

  const allServices = await prisma.service.findMany({
    where:
      occupiedServiceIds.length > 0
        ? { id: { notIn: occupiedServiceIds } }
        : undefined,
    orderBy: { title: "asc" },
    select: { id: true, title: true, slug: true },
  });

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-bold text-zinc-900">Neues Featured-Raster</h1>
      {allServices.length === 0 ? (
        <p className="text-sm text-zinc-600">
          Alle Leistungen sind bereits zugeordnet oder es existieren noch keine
          Leistungen. Legen Sie zuerst unter „Leistungen“ Einträge an.
        </p>
      ) : (
        <FeaturedServiceForm
          allServices={allServices}
          occupiedServiceIds={occupiedServiceIds}
        />
      )}
    </div>
  );
}
