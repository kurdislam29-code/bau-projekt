import { PrismaClient } from "@prisma/client";
import { hash } from "bcryptjs";
import {
  SEED_FEATURED_GRID,
  SEED_PROJECTS,
  SEED_PROJECT_CATEGORIES,
  SEED_SERVICE_CATEGORIES,
  SEED_SERVICE_ROWS,
} from "./seed-data";

const prisma = new PrismaClient();

async function ensureMedia(
  path: string,
  originalName: string,
  folder: string,
) {
  const filename = path.split("/").pop() ?? path;
  return prisma.mediaFile.upsert({
    where: { path },
    create: {
      path,
      filename,
      originalName,
      mimeType: "image/jpeg",
      size: 0,
      folder,
    },
    update: {},
  });
}

async function main() {
  await prisma.$transaction([
    prisma.featuredServiceHighlight.deleteMany(),
    prisma.sEOSettings.deleteMany(),
    prisma.serviceGalleryImage.deleteMany(),
    prisma.service.deleteMany(),
    prisma.projectImage.deleteMany(),
    prisma.projectOnCategory.deleteMany(),
    prisma.project.deleteMany(),
    prisma.projectCategory.deleteMany(),
    prisma.serviceCategory.deleteMany(),
    prisma.homepageContent.deleteMany(),
    prisma.contactSettings.deleteMany(),
    prisma.mediaFile.deleteMany(),
    prisma.user.deleteMany(),
  ]);

  const adminEmail =
    process.env.ADMIN_SEED_EMAIL ?? "admin@delikaya-bau.local";
  const adminPassword = process.env.ADMIN_SEED_PASSWORD ?? "Admin12345!";
  const passwordHash = await hash(adminPassword, 12);

  await prisma.user.create({
    data: {
      email: adminEmail.toLowerCase(),
      passwordHash,
      name: "Administrator",
      role: "ADMIN",
    },
  });

  await prisma.contactSettings.create({
    data: {
      id: "default",
      companyName: "DELIKAYA BAU",
      legalName: "DELIKAYA BAU GmbH",
      phone: "+49 (0) 30 123 456 789",
      phoneRaw: "+4930123456789",
      email: "info@delikaya-bau.de",
      whatsappUrl: "https://wa.me/4930123456789",
      addressStreet: "Industriestraße 42",
      addressZip: "10115",
      addressCity: "Berlin",
      addressCountry: "Deutschland",
      hours: "Montag – Samstag: 08:00 – 18:00 Uhr",
      siteUrl: "https://www.delikaya-bau.de",
      defaultDescription:
        "DELIKAYA BAU – Ihr Partner für Hochbau, Tiefbau und gewerbliche Sanierung in Deutschland. Präzise Ausführung, transparente Kommunikation, termintreue Projekte.",
    },
  });

  const heroHome = await ensureMedia(
    "/images/hero/construction-site.jpg",
    "Hero Startseite",
    "legacy",
  );
  const aboutImg = await ensureMedia(
    "/images/about/construction-team.jpg",
    "Über uns",
    "legacy",
  );
  const ctaImg = await ensureMedia(
    "/images/cta/construction-bg.jpg",
    "CTA Hintergrund",
    "legacy",
  );

  await prisma.homepageContent.create({
    data: {
      id: "default",
      heroTitle: "Ihr Partner für modernes",
      heroTitleAccent: "Bauen , Sanieren",
      heroSubtitle:
        "Wir realisieren hochwertige Bauprojekte mit Präzision, Erfahrung und professionellem Handwerk.",
      heroCta1Label: "Unser Unternehmen",
      heroCta1Href: "/#ueber-uns",
      heroCta2Label: "Kontaktieren Sie uns",
      heroCta2Href: "/#kontakt",
      heroMediaId: heroHome.id,
      aboutTitlePrefix:
        "Ihr zuverlässiger Partner für hochwertige Bau- und Sanierungsarbeiten",
      aboutTitleAccent: "",
      aboutParagraph1:
        "Aus einem regionalen Rohbauunternehmen ist ein leistungsfähiger Generalunternehmer-Partner geworden, der komplexe Bauaufgaben in urbanen und industriellen Umgebungen beherrscht. Wir kombinieren Handwerk, Planungskompetenz und digitale Baustellendokumentation.",
      aboutParagraph2:
        "Unser Anspruch: transparente Kosten, nachvollziehbare Meilensteine und eine Ausführung, die den Anforderungen an Statik, Brandschutz und Energieeffizienz gerecht wird – ohne das Tagesgeschäft unserer Auftraggeber zu überfrachten.",
      aboutMediaId: aboutImg.id,
      statisticsJson: JSON.stringify([
        { label: "Jahre Erfahrung", value: "20+" },
        { label: "Abgeschlossene Projekte", value: "Tausende+" },
        { label: "Fachkräfte im Netzwerk", value: "100er+" },
        { label: "Kundenzufriedenheit", value: "100%" },
      ]),
      ctaBannerTitle:
        "Wir sind bereit, Ihr Projekt strukturiert und termintreu umzusetzen.",
      ctaBannerSubtitle: "",
      ctaBannerButtonLabel: "Angebot anfordern",
      ctaBannerButtonHref: "/#kontakt",
      ctaBannerMediaId: ctaImg.id,
      contactSectionTitle: "Direkter Draht zu Ihrem Projekt",
      contactSectionLead:
        "Wir antworten werktags innerhalb von 24 Stunden. Für dringende Rückfragen auf der Baustelle erreichen Sie unser Projektteam telefonisch.",
    },
  });

  const catMap = new Map<string, string>();
  for (const c of SEED_SERVICE_CATEGORIES) {
    const row = await prisma.serviceCategory.create({ data: { ...c } });
    catMap.set(c.slug, row.id);
  }

  let sort = 0;
  for (const s of SEED_SERVICE_ROWS) {
    const heroPath = `/images/services/${s.slug}.jpg`;
    const hero = await ensureMedia(heroPath, `${s.title} Hero`, "legacy");

    const service = await prisma.service.create({
      data: {
        slug: s.slug,
        title: s.title,
        excerpt: s.excerpt,
        intro: s.intro,
        body: JSON.stringify(s.body),
        sortOrder: sort++,
        categoryId: catMap.get(s.categorySlug) ?? null,
        heroMediaId: hero.id,
      },
    });

    for (let i = 1; i <= 3; i++) {
      const gPath = `/images/services/${s.slug}/gallery-${i}.jpg`;
      const gm = await ensureMedia(gPath, `${s.title} Galerie ${i}`, "legacy");
      await prisma.serviceGalleryImage.create({
        data: {
          serviceId: service.id,
          mediaFileId: gm.id,
          sortOrder: i,
        },
      });
    }

    await prisma.sEOSettings.create({
      data: {
        title: `${s.title} | Dienstleistungen`,
        description: `${s.intro} DELIKAYA BAU – ${s.title}.`,
        ogMediaId: hero.id,
        serviceId: service.id,
      },
    });
  }

  let fh = 0;
  for (const row of SEED_FEATURED_GRID) {
    const svc = await prisma.service.findUnique({
      where: { slug: row.serviceSlug },
    });
    if (!svc) {
      throw new Error(
        `Seed: Service „${row.serviceSlug}“ fehlt für Featured-Raster.`,
      );
    }
    await prisma.featuredServiceHighlight.create({
      data: {
        serviceId: svc.id,
        badge: row.badge,
        sortOrder: fh++,
        visible: true,
      },
    });
  }

  const projCatIds = new Map<string, string>();
  for (const c of SEED_PROJECT_CATEGORIES) {
    const row = await prisma.projectCategory.create({ data: { ...c } });
    projCatIds.set(c.slug, row.id);
  }

  let pSort = 0;
  for (const p of SEED_PROJECTS) {
    const card = await ensureMedia(p.cardImage, p.title, "legacy");
    const project = await prisma.project.create({
      data: {
        slug: p.slug,
        title: p.title,
        location: "",
        description: p.description,
        sortOrder: pSort++,
        images: {
          create: {
            mediaFileId: card.id,
            sortOrder: 0,
            kind: "GALLERY",
          },
        },
      },
    });

    for (const slug of p.categorySlugs) {
      const cid = projCatIds.get(slug);
      if (cid) {
        await prisma.projectOnCategory.create({
          data: { projectId: project.id, categoryId: cid },
        });
      }
    }

    await prisma.sEOSettings.create({
      data: {
        title: `${p.title} | Referenz`,
        description: p.description,
        ogMediaId: card.id,
        projectId: project.id,
      },
    });
  }

  const contact = await prisma.contactSettings.findUnique({
    where: { id: "default" },
  });

  await prisma.sEOSettings.create({
    data: {
      pageKey: "HOME",
      title: "Startseite",
      description: contact?.defaultDescription ?? "",
      ogMediaId: heroHome.id,
      canonicalUrl: `${contact?.siteUrl ?? "https://www.delikaya-bau.de"}/`,
    },
  });

  await prisma.sEOSettings.create({
    data: {
      pageKey: "KARRIERE",
      title: "Karriere",
      description:
        "Werden Sie Teil von DELIKAYA BAU – sichere Arbeitsplätze, anspruchsvolle Projekte und Weiterbildung im Bauwesen.",
    },
  });

  // eslint-disable-next-line no-console
  console.log("Seed OK. Admin:", adminEmail, "/ Passwort:", adminPassword);
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    // eslint-disable-next-line no-console
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
