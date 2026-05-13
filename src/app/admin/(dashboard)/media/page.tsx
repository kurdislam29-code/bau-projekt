import { prisma } from "@/lib/prisma";
import { MediaLibraryClient } from "@/components/admin/MediaLibraryClient";

export const dynamic = "force-dynamic";

export default async function AdminMediaPage() {
  const media = await prisma.mediaFile.findMany({
    orderBy: { createdAt: "desc" },
    take: 200,
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-zinc-900">Medienbibliothek</h1>
        <p className="text-sm text-zinc-500">
          Uploads unter <code className="text-zinc-700">/public/uploads</code> ·
          automatische Optimierung.
        </p>
      </div>
      <MediaLibraryClient initial={media} />
    </div>
  );
}
