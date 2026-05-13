"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { requireAdminSession } from "@/server/auth-guard";

const idSchema = z.string().min(15).max(32);
const serviceIdSchema = z.string().min(15).max(32);

async function revalidateFeaturedPaths(serviceSlug?: string | null) {
  revalidatePath("/");
  revalidatePath("/admin/featured-services");
  if (serviceSlug) {
    revalidatePath(`/dienstleistungen/${serviceSlug}`);
  }
}

export async function createFeaturedHighlightAction(formData: FormData) {
  await requireAdminSession();
  const serviceIdParsed = serviceIdSchema.safeParse(
    String(formData.get("serviceId") ?? "").trim(),
  );
  if (!serviceIdParsed.success) {
    return { ok: false as const, error: ["Bitte eine Leistung auswählen."] };
  }

  const serviceId = serviceIdParsed.data;
  const badge = String(formData.get("badge") ?? "").trim();
  const visible = String(formData.get("visible") ?? "") === "on";

  const svc = await prisma.service.findUnique({ where: { id: serviceId } });
  if (!svc) {
    return { ok: false as const, error: ["Leistung nicht gefunden."] };
  }

  const taken = await prisma.featuredServiceHighlight.findUnique({
    where: { serviceId },
  });
  if (taken) {
    return {
      ok: false as const,
      error: ["Diese Leistung ist bereits im Featured-Raster verknüpft."],
    };
  }

  const row = await prisma.featuredServiceHighlight.create({
    data: {
      serviceId,
      badge,
      visible,
      sortOrder: (await prisma.featuredServiceHighlight.count()) + 1,
    },
  });

  await revalidateFeaturedPaths(svc.slug);
  return { ok: true as const, id: row.id };
}

export async function updateFeaturedHighlightAction(formData: FormData) {
  await requireAdminSession();
  const idParsed = idSchema.safeParse(String(formData.get("id") ?? "").trim());
  if (!idParsed.success) {
    return { ok: false as const, error: ["ID fehlt oder ungültig"] };
  }
  const id = idParsed.data;

  const serviceIdParsed = serviceIdSchema.safeParse(
    String(formData.get("serviceId") ?? "").trim(),
  );
  if (!serviceIdParsed.success) {
    return { ok: false as const, error: ["Bitte eine Leistung auswählen."] };
  }
  const serviceId = serviceIdParsed.data;

  const badge = String(formData.get("badge") ?? "").trim();
  const visible = String(formData.get("visible") ?? "") === "on";

  const svc = await prisma.service.findUnique({ where: { id: serviceId } });
  if (!svc) {
    return { ok: false as const, error: ["Leistung nicht gefunden."] };
  }

  const duplicate = await prisma.featuredServiceHighlight.findFirst({
    where: { serviceId, id: { not: id } },
  });
  if (duplicate) {
    return {
      ok: false as const,
      error: ["Diese Leistung ist bereits einem anderen Raster-Eintrag zugeordnet."],
    };
  }

  const prev = await prisma.featuredServiceHighlight.findUnique({
    where: { id },
    include: { service: { select: { slug: true } } },
  });

  await prisma.featuredServiceHighlight.update({
    where: { id },
    data: {
      serviceId,
      badge,
      visible,
    },
  });

  await revalidateFeaturedPaths(svc.slug);
  if (prev?.service?.slug && prev.service.slug !== svc.slug) {
    await revalidateFeaturedPaths(prev.service.slug);
  }
  return { ok: true as const };
}

export async function deleteFeaturedHighlightAction(formData: FormData) {
  await requireAdminSession();
  const id = String(formData.get("id") ?? "").trim();
  if (!id) return;
  const row = await prisma.featuredServiceHighlight.findUnique({
    where: { id },
    include: { service: { select: { slug: true } } },
  });
  if (!row) return;
  await prisma.featuredServiceHighlight.delete({ where: { id } });
  await revalidateFeaturedPaths(row.service?.slug ?? null);
}

export async function toggleFeaturedHighlightVisibilityAction(
  formData: FormData,
) {
  await requireAdminSession();
  const id = String(formData.get("id") ?? "").trim();
  if (!id) return;
  const row = await prisma.featuredServiceHighlight.findUnique({
    where: { id },
    include: { service: { select: { slug: true } } },
  });
  if (!row) return;
  await prisma.featuredServiceHighlight.update({
    where: { id },
    data: { visible: !row.visible },
  });
  await revalidateFeaturedPaths(row.service?.slug ?? null);
}

export async function moveFeaturedHighlightAction(formData: FormData) {
  await requireAdminSession();
  const id = String(formData.get("id") ?? "").trim();
  const direction = String(formData.get("direction") ?? "").trim();
  if (!id || (direction !== "up" && direction !== "down")) return;

  const rows = await prisma.featuredServiceHighlight.findMany({
    orderBy: { sortOrder: "asc" },
    include: { service: { select: { slug: true } } },
  });
  const idx = rows.findIndex((r) => r.id === id);
  if (idx === -1) return;
  const j = direction === "up" ? idx - 1 : idx + 1;
  if (j < 0 || j >= rows.length) return;
  const a = rows[idx]!;
  const b = rows[j]!;
  await prisma.$transaction([
    prisma.featuredServiceHighlight.update({
      where: { id: a.id },
      data: { sortOrder: b.sortOrder },
    }),
    prisma.featuredServiceHighlight.update({
      where: { id: b.id },
      data: { sortOrder: a.sortOrder },
    }),
  ]);

  const slugs = new Set(
    [a.service?.slug, b.service?.slug].filter(Boolean) as string[],
  );
  for (const slug of slugs) {
    await revalidateFeaturedPaths(slug);
  }
}

export async function reorderFeaturedHighlightsAction(
  formData: FormData,
): Promise<void> {
  await requireAdminSession();
  const order = String(formData.get("order") ?? "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
  let i = 0;
  const touched = await prisma.featuredServiceHighlight.findMany({
    where: { id: { in: order } },
    include: { service: { select: { slug: true } } },
  });
  for (const hid of order) {
    await prisma.featuredServiceHighlight.update({
      where: { id: hid },
      data: { sortOrder: i++ },
    });
  }
  revalidatePath("/");
  revalidatePath("/admin/featured-services");
  for (const t of touched) {
    if (t.service?.slug) revalidatePath(`/dienstleistungen/${t.service.slug}`);
  }
}
