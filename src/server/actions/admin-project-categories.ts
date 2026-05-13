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

export async function createProjectCategoryAction(formData: FormData): Promise<void> {
  await requireAdminSession();
  const name = String(formData.get("name") ?? "").trim();
  const slug = slugSchema.safeParse(String(formData.get("slug") ?? "").trim());
  if (!name || !slug.success) return;
  await prisma.projectCategory.create({
    data: {
      name,
      slug: slug.data,
      sortOrder: (await prisma.projectCategory.count()) + 1,
    },
  });
  revalidatePath("/admin/project-categories");
}

export async function updateProjectCategoryAction(formData: FormData): Promise<void> {
  await requireAdminSession();
  const id = String(formData.get("id") ?? "");
  const name = String(formData.get("name") ?? "").trim();
  const slug = slugSchema.safeParse(String(formData.get("slug") ?? "").trim());
  if (!id || !name || !slug.success) return;
  await prisma.projectCategory.update({
    where: { id },
    data: { name, slug: slug.data },
  });
  revalidatePath("/admin/project-categories");
}

export async function deleteProjectCategoryAction(formData: FormData): Promise<void> {
  await requireAdminSession();
  const id = String(formData.get("id") ?? "");
  if (!id) return;
  await prisma.projectOnCategory.deleteMany({ where: { categoryId: id } });
  await prisma.projectCategory.delete({ where: { id } });
  revalidatePath("/admin/project-categories");
}
