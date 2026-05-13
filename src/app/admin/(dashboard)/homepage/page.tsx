import { prisma } from "@/lib/prisma";
import { HomepageFormClient } from "@/components/admin/HomepageFormClient";

export const dynamic = "force-dynamic";

export default async function AdminHomepagePage() {
  const [home, media] = await Promise.all([
    prisma.homepageContent.findUnique({
      where: { id: "default" },
      include: { heroMedia: true, ctaBannerMedia: true },
    }),
    prisma.mediaFile.findMany({
      orderBy: { createdAt: "desc" },
      take: 400,
      select: { id: true, path: true, originalName: true },
    }),
  ]);

  if (!home) {
    return <p className="text-red-600">Homepage-Daten fehlen (Seed ausführen).</p>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-zinc-900">Startseite</h1>
        <p className="text-sm text-zinc-500">
          Hero, Über uns, Statistiken, CTA und Kontakt-Texte.
        </p>
      </div>
      <HomepageFormClient
        media={media}
        initial={{
          heroTitle: home.heroTitle,
          heroTitleAccent: home.heroTitleAccent,
          heroSubtitle: home.heroSubtitle,
          heroCta1Label: home.heroCta1Label,
          heroCta1Href: home.heroCta1Href,
          heroCta2Label: home.heroCta2Label,
          heroCta2Href: home.heroCta2Href,
          heroMediaId: home.heroMediaId,
          aboutTitlePrefix: home.aboutTitlePrefix,
          aboutTitleAccent: home.aboutTitleAccent,
          aboutParagraph1: home.aboutParagraph1,
          aboutParagraph2: home.aboutParagraph2,
          statisticsJson: home.statisticsJson,
          ctaBannerTitle: home.ctaBannerTitle,
          ctaBannerSubtitle: home.ctaBannerSubtitle,
          ctaBannerButtonLabel: home.ctaBannerButtonLabel,
          ctaBannerButtonHref: home.ctaBannerButtonHref,
          ctaBannerMediaId: home.ctaBannerMediaId,
          contactSectionTitle: home.contactSectionTitle,
          contactSectionLead: home.contactSectionLead,
        }}
      />
    </div>
  );
}
