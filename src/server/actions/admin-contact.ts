"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { requireAdminSession } from "@/server/auth-guard";

const schema = z.object({
  companyName: z.string().min(1),
  legalName: z.string().min(1),
  phone: z.string().min(1),
  phoneRaw: z.string().min(1),
  email: z.string().email(),
  whatsappUrl: z.string().min(1),
  addressStreet: z.string().min(1),
  addressZip: z.string().min(1),
  addressCity: z.string().min(1),
  addressCountry: z.string().min(1),
  hours: z.string().min(1),
  siteUrl: z.string().min(1),
  defaultDescription: z.string().min(1),
});

export async function updateContactSettingsAction(formData: FormData): Promise<void> {
  await requireAdminSession();
  const raw = {
    companyName: String(formData.get("companyName") ?? ""),
    legalName: String(formData.get("legalName") ?? ""),
    phone: String(formData.get("phone") ?? ""),
    phoneRaw: String(formData.get("phoneRaw") ?? ""),
    email: String(formData.get("email") ?? ""),
    whatsappUrl: String(formData.get("whatsappUrl") ?? ""),
    addressStreet: String(formData.get("addressStreet") ?? ""),
    addressZip: String(formData.get("addressZip") ?? ""),
    addressCity: String(formData.get("addressCity") ?? ""),
    addressCountry: String(formData.get("addressCountry") ?? ""),
    hours: String(formData.get("hours") ?? ""),
    siteUrl: String(formData.get("siteUrl") ?? ""),
    defaultDescription: String(formData.get("defaultDescription") ?? ""),
  };
  const parsed = schema.safeParse(raw);
  if (!parsed.success) return;
  await prisma.contactSettings.update({
    where: { id: "default" },
    data: parsed.data,
  });
  revalidatePath("/", "layout");
  revalidatePath("/");
}
