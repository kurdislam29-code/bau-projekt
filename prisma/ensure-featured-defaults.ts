/**
 * Legt die Standard-Featured-Einträge an (verknüpft mit Leistungen per Slug).
 * Ersetzt alle bisherigen Featured-Zeilen.
 *
 * Aufruf: npx tsx prisma/ensure-featured-defaults.ts
 * Voraussetzung: Services mit den Slugs aus SEED_FEATURED_GRID existieren (z. B. nach Seed).
 */
import { PrismaClient } from "@prisma/client";
import { SEED_FEATURED_GRID } from "./seed-data";

const prisma = new PrismaClient();

async function main() {
  await prisma.featuredServiceHighlight.deleteMany({});

  let order = 0;
  for (const row of SEED_FEATURED_GRID) {
    const svc = await prisma.service.findUnique({
      where: { slug: row.serviceSlug },
    });
    if (!svc) {
      // eslint-disable-next-line no-console
      console.warn(
        `Übersprungen: Service „${row.serviceSlug}“ nicht in der Datenbank.`,
      );
      continue;
    }
    await prisma.featuredServiceHighlight.create({
      data: {
        serviceId: svc.id,
        badge: row.badge,
        sortOrder: order++,
        visible: true,
      },
    });
  }

  // eslint-disable-next-line no-console
  console.log("Featured-Raster: Einträge aus Leistungs-Slugs synchronisiert.");
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
