"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { requireAdminSession } from "@/server/auth-guard";

const statEntry = z.object({
  label: z.string().min(1),
  value: z.string().min(1),
});

const schema = z.object({
  heroTitle: z.string().min(1),
  heroTitleAccent: z.string(),
  heroSubtitle: z.string().min(1),
  heroCta1Label: z.string().min(1),
  heroCta1Href: z.string().min(1),
  heroCta2Label: z.string().min(1),
  heroCta2Href: z.string().min(1),
  heroMediaId: z.string().optional().nullable(),
  aboutTitlePrefix: z.string().min(1),
  aboutTitleAccent: z.string(),
  aboutParagraph1: z.string().min(1),
  aboutParagraph2: z.string().min(1),
  statisticsJson: z.string().transform((s, ctx) => {
    try {
      const v = JSON.parse(s) as unknown;
      if (!Array.isArray(v)) throw new Error();
      const parsed = z.array(statEntry).safeParse(v);
      if (!parsed.success) throw new Error();
      return JSON.stringify(parsed.data);
    } catch {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Statistik muss gültiges JSON sein, z. B. [{\"label\":\"…\",\"value\":\"…\"}]",
      });
      return z.NEVER;
    }
  }),
  ctaBannerTitle: z.string().min(1),
  ctaBannerSubtitle: z.string(),
  ctaBannerButtonLabel: z.string().min(1),
  ctaBannerButtonHref: z.string().min(1),
  ctaBannerMediaId: z.string().optional().nullable(),
  contactSectionTitle: z.string().min(1),
  contactSectionLead: z.string().min(1),
});

function emptyToNull(v: string | undefined | null) {
  const t = v?.trim();
  return t ? t : null;
}

export async function updateHomepageAction(formData: FormData) {
  await requireAdminSession();

  const raw = {
    heroTitle: String(formData.get("heroTitle") ?? ""),
    heroTitleAccent: String(formData.get("heroTitleAccent") ?? ""),
    heroSubtitle: String(formData.get("heroSubtitle") ?? ""),
    heroCta1Label: String(formData.get("heroCta1Label") ?? ""),
    heroCta1Href: String(formData.get("heroCta1Href") ?? ""),
    heroCta2Label: String(formData.get("heroCta2Label") ?? ""),
    heroCta2Href: String(formData.get("heroCta2Href") ?? ""),
    heroMediaId: emptyToNull(String(formData.get("heroMediaId") ?? "")),
    aboutTitlePrefix: String(formData.get("aboutTitlePrefix") ?? ""),
    aboutTitleAccent: String(formData.get("aboutTitleAccent") ?? ""),
    aboutParagraph1: String(formData.get("aboutParagraph1") ?? ""),
    aboutParagraph2: String(formData.get("aboutParagraph2") ?? ""),
    statisticsJson: String(formData.get("statisticsJson") ?? "[]"),
    ctaBannerTitle: String(formData.get("ctaBannerTitle") ?? ""),
    ctaBannerSubtitle: String(formData.get("ctaBannerSubtitle") ?? ""),
    ctaBannerButtonLabel: String(formData.get("ctaBannerButtonLabel") ?? ""),
    ctaBannerButtonHref: String(formData.get("ctaBannerButtonHref") ?? ""),
    ctaBannerMediaId: emptyToNull(String(formData.get("ctaBannerMediaId") ?? "")),
    contactSectionTitle: String(formData.get("contactSectionTitle") ?? ""),
    contactSectionLead: String(formData.get("contactSectionLead") ?? ""),
  };

  const parsed = schema.safeParse(raw);
  if (!parsed.success) {
    return { ok: false as const, error: parsed.error.flatten().fieldErrors };
  }

  const d = parsed.data;
  await prisma.homepageContent.update({
    where: { id: "default" },
    data: {
      heroTitle: d.heroTitle,
      heroTitleAccent: d.heroTitleAccent.trim(),
      heroSubtitle: d.heroSubtitle,
      heroCta1Label: d.heroCta1Label,
      heroCta1Href: d.heroCta1Href,
      heroCta2Label: d.heroCta2Label,
      heroCta2Href: d.heroCta2Href,
      heroMediaId: d.heroMediaId,
      aboutTitlePrefix: d.aboutTitlePrefix,
      aboutTitleAccent: d.aboutTitleAccent,
      aboutParagraph1: d.aboutParagraph1,
      aboutParagraph2: d.aboutParagraph2,
      statisticsJson: d.statisticsJson,
      ctaBannerTitle: d.ctaBannerTitle,
      ctaBannerSubtitle: d.ctaBannerSubtitle,
      ctaBannerButtonLabel: d.ctaBannerButtonLabel,
      ctaBannerButtonHref: d.ctaBannerButtonHref,
      ctaBannerMediaId: d.ctaBannerMediaId,
      contactSectionTitle: d.contactSectionTitle,
      contactSectionLead: d.contactSectionLead,
    },
  });

  revalidatePath("/");
  return { ok: true as const };
}
