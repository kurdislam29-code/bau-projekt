"use server";

import { revalidatePath } from "next/cache";
import fs from "fs/promises";
import path from "path";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { requireAdminSession } from "@/server/auth-guard";

const idSchema = z.string().cuid();

export async function deleteMediaFileAction(formData: FormData): Promise<void> {
  await requireAdminSession();
  const id = idSchema.safeParse(String(formData.get("id") ?? ""));
  if (!id.success) return;

  const row = await prisma.mediaFile.findUnique({ where: { id: id.data } });
  if (!row) return;

  if (row.path.startsWith("/uploads/")) {
    const abs = path.join(process.cwd(), "public", row.path.replace(/^\//, ""));
    try {
      await fs.unlink(abs);
    } catch {
      /* */
    }
  }

  try {
    await prisma.mediaFile.delete({ where: { id: id.data } });
  } catch {
    return;
  }

  revalidatePath("/admin/media");
}
