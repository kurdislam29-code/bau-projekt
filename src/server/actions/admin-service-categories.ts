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

export async function createServiceCategoryAction(formData: FormData): Promise<void> {
  await requireAdminSession();
  const name = String(formData.get("name") ?? "").trim();
  const slug = slugSchema.safeParse(String(formData.get("slug") ?? "").trim());
  if (!name || !slug.success) return;
  await prisma.serviceCategory.create({
    data: {
      name,
      slug: slug.data,
      sortOrder: (await prisma.serviceCategory.count()) + 1,
    },
  });
  revalidatePath("/admin/service-categories");
}

export async function updateServiceCategoryAction(formData: FormData): Promise<void> {
  await requireAdminSession();
  const id = String(formData.get("id") ?? "");
  const name = String(formData.get("name") ?? "").trim();
  const slug = slugSchema.safeParse(String(formData.get("slug") ?? "").trim());
  if (!id || !name || !slug.success) return;
  await prisma.serviceCategory.update({
    where: { id },
    data: { name, slug: slug.data },
  });
  revalidatePath("/admin/service-categories");
}

export async function deleteServiceCategoryAction(formData: FormData): Promise<void> {
  await requireAdminSession();
  const id = String(formData.get("id") ?? "");
  if (!id) return;
  const count = await prisma.service.count({ where: { categoryId: id } });
  if (count > 0) return;
  await prisma.serviceCategory.delete({ where: { id } });
  revalidatePath("/admin/service-categories");
}
