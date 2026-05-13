import { prisma } from "@/lib/prisma";
import { ContactSettingsForm } from "@/components/admin/ContactSettingsForm";

export const dynamic = "force-dynamic";

export default async function AdminContactPage() {
  const c = await prisma.contactSettings.findUnique({ where: { id: "default" } });
  if (!c) return <p>Fehlende Daten.</p>;
  return (
    <div className="space-y-6">
      <h1 className="text-xl font-bold text-zinc-900">Kontakt & Firmendaten</h1>
      <ContactSettingsForm initial={c} />
    </div>
  );
}
