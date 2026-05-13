import { prisma } from "@/lib/prisma";

export type PublicServiceDetail = {
  slug: string;
  title: string;
  excerpt: string;
  intro: string;
  body: string[];
  heroImage: string;
  gallery: string[];
};

function parseBody(raw: string): string[] {
  try {
    const v = JSON.parse(raw) as unknown;
    return Array.isArray(v) ? v.map(String) : [];
  } catch {
    return [];
  }
}

export async function listServiceNav(): Promise<{ slug: string; title: string }[]> {
  const rows = await prisma.service.findMany({
    orderBy: { sortOrder: "asc" },
    select: { slug: true, title: true },
  });
  return rows;
}

export async function listServicesPublic(): Promise<
  Pick<PublicServiceDetail, "slug" | "title" | "excerpt">[]
> {
  return prisma.service.findMany({
    orderBy: { sortOrder: "asc" },
    select: { slug: true, title: true, excerpt: true },
  });
}

export async function getServiceBySlugPublic(
  slug: string,
): Promise<PublicServiceDetail | null> {
  const s = await prisma.service.findUnique({
    where: { slug },
    include: {
      heroMedia: true,
      gallery: { orderBy: { sortOrder: "asc" }, include: { mediaFile: true } },
    },
  });
  if (!s) return null;
  return {
    slug: s.slug,
    title: s.title,
    excerpt: s.excerpt,
    intro: s.intro,
    body: parseBody(s.body),
    heroImage: s.heroMedia?.path ?? `/images/services/${s.slug}.jpg`,
    gallery: s.gallery.map((g) => g.mediaFile.path),
  };
}

export async function getAllServiceSlugs(): Promise<string[]> {
  const rows = await prisma.service.findMany({ select: { slug: true } });
  return rows.map((r) => r.slug);
}
