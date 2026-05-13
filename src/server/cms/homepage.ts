import { prisma } from "@/lib/prisma";

export type HomepagePublic = {
  heroTitle: string;
  heroTitleAccent: string;
  heroSubtitle: string;
  heroCta1Label: string;
  heroCta1Href: string;
  heroCta2Label: string;
  heroCta2Href: string;
  heroImage: string | null;
  aboutTitlePrefix: string;
  aboutTitleAccent: string;
  aboutParagraph1: string;
  aboutParagraph2: string;
  statistics: { label: string; value: string }[];
  ctaBannerTitle: string;
  ctaBannerSubtitle: string;
  ctaBannerButtonLabel: string;
  ctaBannerButtonHref: string;
  ctaBannerImage: string | null;
  contactSectionTitle: string;
  contactSectionLead: string;
};

export async function getHomepageContent(): Promise<HomepagePublic> {
  const h = await prisma.homepageContent.findUnique({
    where: { id: "default" },
    include: {
      heroMedia: true,
      ctaBannerMedia: true,
    },
  });
  if (!h) {
    throw new Error(
      "HomepageContent fehlt. Bitte `npx prisma db seed` ausführen.",
    );
  }
  let statistics: { label: string; value: string }[] = [];
  try {
    statistics = JSON.parse(h.statisticsJson) as { label: string; value: string }[];
    if (!Array.isArray(statistics)) statistics = [];
  } catch {
    statistics = [];
  }
  return {
    heroTitle: h.heroTitle,
    heroTitleAccent: h.heroTitleAccent ?? "",
    heroSubtitle: h.heroSubtitle,
    heroCta1Label: h.heroCta1Label,
    heroCta1Href: h.heroCta1Href,
    heroCta2Label: h.heroCta2Label,
    heroCta2Href: h.heroCta2Href,
    heroImage: h.heroMedia?.path ?? null,
    aboutTitlePrefix: h.aboutTitlePrefix,
    aboutTitleAccent: h.aboutTitleAccent,
    aboutParagraph1: h.aboutParagraph1,
    aboutParagraph2: h.aboutParagraph2,
    statistics,
    ctaBannerTitle: h.ctaBannerTitle,
    ctaBannerSubtitle: h.ctaBannerSubtitle,
    ctaBannerButtonLabel: h.ctaBannerButtonLabel,
    ctaBannerButtonHref: h.ctaBannerButtonHref,
    ctaBannerImage: h.ctaBannerMedia?.path ?? null,
    contactSectionTitle: h.contactSectionTitle,
    contactSectionLead: h.contactSectionLead,
  };
}
