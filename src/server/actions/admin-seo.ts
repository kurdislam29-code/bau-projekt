"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { requireAdminSession } from "@/server/auth-guard";

const schema = z.object({
  id: z.string().min(1),
  title: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
  ogMediaId: z.string().optional().nullable(),
  canonicalUrl: z.string().optional().nullable(),
});

function emptyToNull(v: string | undefined | null) {
  const t = v?.trim();
  return t ? t : null;
}

export async function updateSeoSettingsAction(formData: FormData): Promise<void> {
  await requireAdminSession();
  const raw = {
    id: String(formData.get("id") ?? ""),
    title: emptyToNull(String(formData.get("title") ?? "")),
    description: emptyToNull(String(formData.get("description") ?? "")),
    ogMediaId: emptyToNull(String(formData.get("ogMediaId") ?? "")),
    canonicalUrl: emptyToNull(String(formData.get("canonicalUrl") ?? "")),
  };
  const parsed = schema.safeParse(raw);
  if (!parsed.success) return;
  await prisma.sEOSettings.update({
    where: { id: parsed.data.id },
    data: {
      title: parsed.data.title,
      description: parsed.data.description,
      ogMediaId: parsed.data.ogMediaId,
      canonicalUrl: parsed.data.canonicalUrl,
    },
  });
  revalidatePath("/");
  revalidatePath("/dienstleistungen", "layout");
  revalidatePath("/karriere");
}
