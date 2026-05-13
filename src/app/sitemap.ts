import type { MetadataRoute } from "next";
import { getContactSettings } from "@/server/cms/contact";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const contact = await getContactSettings();
  const base = contact.siteUrl.replace(/\/$/, "");

  const [services] = await Promise.all([
    prisma.service.findMany({ select: { slug: true, updatedAt: true } }),
  ]);

  const serviceUrls = services.map((s) => ({
    url: `${base}/dienstleistungen/${s.slug}`,
    lastModified: s.updatedAt,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [
    { url: base, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    {
      url: `${base}/karriere`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.4,
    },
    {
      url: `${base}/impressum`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.2,
    },
    {
      url: `${base}/datenschutz`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.2,
    },
    {
      url: `${base}/agb`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.2,
    },
    ...serviceUrls,
  ];
}
