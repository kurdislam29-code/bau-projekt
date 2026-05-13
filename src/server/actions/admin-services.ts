"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { requireAdminSession } from "@/server/auth-guard";

const slugSchema = z
  .string()
  .min(2)
  .max(80)
  .regex(/^[a-z0-9-]+$/, "Slug: nur Kleinbuchstaben, Zahlen und Bindestrich");

function parseBodyText(text: string): string[] {
  return text
    .split(/\n\s*\n/g)
    .map((p) => p.trim())
    .filter(Boolean);
}

export async function reorderServicesAction(formData: FormData): Promise<void> {
  await requireAdminSession();
  const order = String(formData.get("order") ?? "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
  let i = 0;
  for (const id of order) {
    await prisma.service.update({
      where: { id },
      data: { sortOrder: i++ },
    });
  }
  revalidatePath("/");
  revalidatePath("/admin/services");
}

export async function createServiceAction(formData: FormData) {
  await requireAdminSession();
  const slug = slugSchema.safeParse(String(formData.get("slug") ?? ""));
  if (!slug.success) return { ok: false as const, error: slug.error.flatten().formErrors };

  const title = String(formData.get("title") ?? "").trim();
  if (!title) return { ok: false as const, error: ["Titel erforderlich"] };

  const excerpt = String(formData.get("excerpt") ?? "").trim();
  const intro = String(formData.get("intro") ?? "").trim();
  const bodyText = String(formData.get("body") ?? "");
  const body = JSON.stringify(parseBodyText(bodyText));
  const categoryId = String(formData.get("categoryId") ?? "").trim() || null;
  const heroMediaId = String(formData.get("heroMediaId") ?? "").trim() || null;
  const galleryRaw = String(formData.get("galleryIds") ?? "")
    .split(/[|,;\s]+/)
    .map((s) => s.trim())
    .filter(Boolean);

  const exists = await prisma.service.findUnique({ where: { slug: slug.data } });
  if (exists) return { ok: false as const, error: ["Slug existiert bereits"] };

  const service = await prisma.service.create({
    data: {
      slug: slug.data,
      title,
      excerpt,
      intro,
      body,
      categoryId,
      heroMediaId,
      sortOrder: (await prisma.service.count()) + 1,
    },
  });

  let order = 0;
  for (const mid of galleryRaw) {
    const ok = await prisma.mediaFile.findUnique({ where: { id: mid } });
    if (!ok) continue;
    await prisma.serviceGalleryImage.create({
      data: { serviceId: service.id, mediaFileId: mid, sortOrder: order++ },
    });
  }

  await prisma.sEOSettings.create({
    data: {
      serviceId: service.id,
      title: `${title} | Dienstleistungen`,
      description: `${intro} ${title}.`,
    },
  });

  revalidatePath("/", "layout");
  revalidatePath("/");
  revalidatePath("/admin/services");
  return { ok: true as const, id: service.id };
}

export async function updateServiceAction(formData: FormData) {
  await requireAdminSession();
  const id = String(formData.get("id") ?? "");
  if (!id) return { ok: false as const, error: ["ID fehlt"] };

  const title = String(formData.get("title") ?? "").trim();
  if (!title) return { ok: false as const, error: ["Titel erforderlich"] };

  const excerpt = String(formData.get("excerpt") ?? "").trim();
  const intro = String(formData.get("intro") ?? "").trim();
  const bodyText = String(formData.get("body") ?? "");
  const body = JSON.stringify(parseBodyText(bodyText));
  const categoryId = String(formData.get("categoryId") ?? "").trim() || null;
  const heroMediaId = String(formData.get("heroMediaId") ?? "").trim() || null;
  const galleryRaw = String(formData.get("galleryIds") ?? "")
    .split(/[|,;\s]+/)
    .map((s) => s.trim())
    .filter(Boolean);

  await prisma.service.update({
    where: { id },
    data: {
      title,
      excerpt,
      intro,
      body,
      categoryId,
      heroMediaId,
    },
  });

  await prisma.serviceGalleryImage.deleteMany({ where: { serviceId: id } });
  let order = 0;
  for (const mid of galleryRaw) {
    const ok = await prisma.mediaFile.findUnique({ where: { id: mid } });
    if (!ok) continue;
    await prisma.serviceGalleryImage.create({
      data: { serviceId: id, mediaFileId: mid, sortOrder: order++ },
    });
  }

  revalidatePath("/", "layout");
  revalidatePath("/");
  revalidatePath("/admin/services");
  revalidatePath(`/dienstleistungen`, "layout");
  return { ok: true as const };
}

export async function deleteServiceAction(formData: FormData): Promise<void> {
  await requireAdminSession();
  const id = String(formData.get("id") ?? "");
  if (!id) return;
  await prisma.service.delete({ where: { id } });
  revalidatePath("/", "layout");
  revalidatePath("/");
  revalidatePath("/admin/services");
}
