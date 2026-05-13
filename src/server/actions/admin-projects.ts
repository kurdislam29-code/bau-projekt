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

function parseCategoryIdsFromForm(formData: FormData): string[] {
  const fromMulti = formData
    .getAll("categoryIds")
    .map(String)
    .map((s) => s.trim())
    .filter(Boolean);
  if (fromMulti.length) return fromMulti;
  return String(formData.get("categoryIds") ?? "")
    .split(/[|,;\s]+/)
    .map((s) => s.trim())
    .filter(Boolean);
}

export async function reorderProjectsAction(formData: FormData): Promise<void> {
  await requireAdminSession();
  const order = String(formData.get("order") ?? "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
  let i = 0;
  for (const id of order) {
    await prisma.project.update({
      where: { id },
      data: { sortOrder: i++ },
    });
  }
  revalidatePath("/");
  revalidatePath("/admin/projects");
}

export async function createProjectAction(formData: FormData) {
  await requireAdminSession();
  const slug = slugSchema.safeParse(String(formData.get("slug") ?? "").trim());
  if (!slug.success) return { ok: false as const, error: slug.error.flatten().formErrors };

  const title = String(formData.get("title") ?? "").trim();
  const location = String(formData.get("location") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();
  if (!title) {
    return { ok: false as const, error: ["Titel erforderlich"] };
  }

  const cats = parseCategoryIdsFromForm(formData);
  if (cats.length === 0) {
    return {
      ok: false as const,
      error: ["Bitte mindestens eine Projekt-Kategorie auswählen."],
    };
  }

  const galleryRaw = String(formData.get("galleryIds") ?? "")
    .split(/[|,;\s]+/)
    .map((s) => s.trim())
    .filter(Boolean);
  const beforeId = String(formData.get("beforeMediaId") ?? "").trim();
  const afterId = String(formData.get("afterMediaId") ?? "").trim();

  const exists = await prisma.project.findUnique({ where: { slug: slug.data } });
  if (exists) return { ok: false as const, error: ["Slug existiert bereits"] };

  const project = await prisma.project.create({
    data: {
      slug: slug.data,
      title,
      location,
      description,
      sortOrder: (await prisma.project.count()) + 1,
    },
  });

  let sort = 0;
  for (const mid of galleryRaw) {
    const ok = await prisma.mediaFile.findUnique({ where: { id: mid } });
    if (!ok) continue;
    await prisma.projectImage.create({
      data: {
        projectId: project.id,
        mediaFileId: mid,
        sortOrder: sort++,
        kind: "GALLERY",
      },
    });
  }
  if (beforeId) {
    const ok = await prisma.mediaFile.findUnique({ where: { id: beforeId } });
    if (ok) {
      await prisma.projectImage.create({
        data: {
          projectId: project.id,
          mediaFileId: beforeId,
          sortOrder: sort++,
          kind: "BEFORE",
        },
      });
    }
  }
  if (afterId) {
    const ok = await prisma.mediaFile.findUnique({ where: { id: afterId } });
    if (ok) {
      await prisma.projectImage.create({
        data: {
          projectId: project.id,
          mediaFileId: afterId,
          sortOrder: sort++,
          kind: "AFTER",
        },
      });
    }
  }

  for (const cid of cats) {
    const c = await prisma.projectCategory.findUnique({ where: { id: cid } });
    if (c) {
      await prisma.projectOnCategory.create({
        data: { projectId: project.id, categoryId: c.id },
      });
    }
  }

  await prisma.sEOSettings.create({
    data: {
      projectId: project.id,
      title: `${title} | Referenz`,
      description: description || title,
    },
  });

  revalidatePath("/");
  revalidatePath("/admin/projects");
  return { ok: true as const, id: project.id };
}

export async function updateProjectAction(formData: FormData) {
  await requireAdminSession();
  const id = String(formData.get("id") ?? "");
  if (!id) return { ok: false as const, error: ["ID fehlt"] };

  const title = String(formData.get("title") ?? "").trim();
  const location = String(formData.get("location") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();
  if (!title) {
    return { ok: false as const, error: ["Titel erforderlich"] };
  }

  const cats = parseCategoryIdsFromForm(formData);
  if (cats.length === 0) {
    return {
      ok: false as const,
      error: ["Bitte mindestens eine Projekt-Kategorie auswählen."],
    };
  }

  const galleryRaw = String(formData.get("galleryIds") ?? "")
    .split(/[|,;\s]+/)
    .map((s) => s.trim())
    .filter(Boolean);
  const beforeId = String(formData.get("beforeMediaId") ?? "").trim();
  const afterId = String(formData.get("afterMediaId") ?? "").trim();

  await prisma.project.update({
    where: { id },
    data: { title, location, description },
  });

  await prisma.projectImage.deleteMany({ where: { projectId: id } });
  await prisma.projectOnCategory.deleteMany({ where: { projectId: id } });

  let sort = 0;
  for (const mid of galleryRaw) {
    const ok = await prisma.mediaFile.findUnique({ where: { id: mid } });
    if (!ok) continue;
    await prisma.projectImage.create({
      data: {
        projectId: id,
        mediaFileId: mid,
        sortOrder: sort++,
        kind: "GALLERY",
      },
    });
  }
  if (beforeId) {
    const ok = await prisma.mediaFile.findUnique({ where: { id: beforeId } });
    if (ok) {
      await prisma.projectImage.create({
        data: {
          projectId: id,
          mediaFileId: beforeId,
          sortOrder: sort++,
          kind: "BEFORE",
        },
      });
    }
  }
  if (afterId) {
    const ok = await prisma.mediaFile.findUnique({ where: { id: afterId } });
    if (ok) {
      await prisma.projectImage.create({
        data: {
          projectId: id,
          mediaFileId: afterId,
          sortOrder: sort++,
          kind: "AFTER",
        },
      });
    }
  }

  for (const cid of cats) {
    const c = await prisma.projectCategory.findUnique({ where: { id: cid } });
    if (c) {
      await prisma.projectOnCategory.create({
        data: { projectId: id, categoryId: c.id },
      });
    }
  }

  revalidatePath("/");
  revalidatePath("/admin/projects");
  return { ok: true as const };
}

export async function deleteProjectAction(formData: FormData): Promise<void> {
  await requireAdminSession();
  const id = String(formData.get("id") ?? "");
  if (!id) return;
  await prisma.project.delete({ where: { id } });
  revalidatePath("/");
  revalidatePath("/admin/projects");
}
