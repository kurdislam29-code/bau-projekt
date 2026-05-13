import type { MetadataRoute } from "next";
import { getContactSettings } from "@/server/cms/contact";

export const dynamic = "force-dynamic";

export default async function robots(): Promise<MetadataRoute.Robots> {
  const contact = await getContactSettings();
  const base = contact.siteUrl.replace(/\/$/, "");
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${base}/sitemap.xml`,
  };
}
