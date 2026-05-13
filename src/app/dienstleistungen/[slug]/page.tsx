import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ServicePageView } from "@/components/sections/ServicePageView";
import { getContactSettings } from "@/server/cms/contact";
import { getHomepageContent } from "@/server/cms/homepage";
import {
  getServiceBySlugPublic,
} from "@/server/cms/services-public";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const row = await prisma.service.findUnique({
    where: { slug },
    include: {
      seo: { include: { ogMedia: true } },
      heroMedia: true,
    },
  });
  if (!row) return { title: "Leistung" };
  const contact = await getContactSettings();
  const title =
    row.seo?.title ?? `${row.title} | Dienstleistungen`;
  const description =
    row.seo?.description ??
    `${row.intro} ${contact.companyName} – ${row.title} in Berlin und deutschlandweit.`;
  const og = row.seo?.ogMedia?.path ?? row.heroMedia?.path;
  return {
    title,
    description,
    openGraph: {
      title: `${row.title} | ${contact.companyName}`,
      description: row.excerpt,
      images: og ? [{ url: og, width: 1200, height: 630, alt: row.title }] : undefined,
    },
  };
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  const [service, contact, homepage] = await Promise.all([
    getServiceBySlugPublic(slug),
    getContactSettings(),
    getHomepageContent(),
  ]);
  if (!service) notFound();
  return (
    <ServicePageView
      service={service}
      contact={contact}
      homepage={homepage}
    />
  );
}
