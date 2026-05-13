import { auth } from "@/auth";
import { NextResponse } from "next/server";
import { randomUUID } from "crypto";
import path from "path";
import fs from "fs/promises";
import sharp from "sharp";
import { z } from "zod";
import { prisma } from "@/lib/prisma";

const folderSchema = z
  .string()
  .max(64)
  .regex(/^[a-z0-9-]+$/i, "Ordner: nur Buchstaben, Zahlen und Bindestrich");

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const form = await req.formData();
  const file = form.get("file");
  const folderRaw = String(form.get("folder") ?? "general").trim() || "general";

  const folderParsed = folderSchema.safeParse(folderRaw);
  if (!folderParsed.success) {
    return NextResponse.json(
      { error: folderParsed.error.flatten().formErrors[0] ?? "Ungültiger Ordner" },
      { status: 400 },
    );
  }
  const folder = folderParsed.data.toLowerCase();

  if (!file || !(file instanceof File)) {
    return NextResponse.json({ error: "Keine Datei" }, { status: 400 });
  }

  if (!file.type.startsWith("image/")) {
    return NextResponse.json({ error: "Nur Bilder erlaubt" }, { status: 400 });
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  if (buffer.length > 12 * 1024 * 1024) {
    return NextResponse.json({ error: "Max. 12 MB" }, { status: 400 });
  }

  const id = randomUUID();
  const filename = `${id}.jpg`;
  const dir = path.join(process.cwd(), "public", "uploads", folder);
  await fs.mkdir(dir, { recursive: true });
  const fsPath = path.join(dir, filename);

  let width: number | undefined;
  let height: number | undefined;
  let size = 0;
  try {
    const meta = await sharp(buffer)
      .rotate()
      .resize({
        width: 1920,
        height: 1920,
        fit: "inside",
        withoutEnlargement: true,
      })
      .jpeg({ quality: 88, mozjpeg: true })
      .toFile(fsPath);
    width = meta.width;
    height = meta.height;
    size = meta.size;
  } catch {
    return NextResponse.json({ error: "Bildverarbeitung fehlgeschlagen" }, { status: 400 });
  }

  const publicPath = `/uploads/${folder}/${filename}`;

  const media = await prisma.mediaFile.create({
    data: {
      filename,
      originalName: file.name.slice(0, 240),
      mimeType: "image/jpeg",
      size,
      path: publicPath,
      folder,
      width,
      height,
    },
  });

  return NextResponse.json(media);
}
