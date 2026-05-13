import { prisma } from "@/lib/prisma";

export type PublicFeaturedHighlight = {
  id: string;
  slug: string;
  title: string;
  description: string;
  badge: string;
  imageSrc: string | null;
  href: string;
};

export async function listPublicFeaturedHighlights(): Promise<
  PublicFeaturedHighlight[]
> {
  const rows = await prisma.featuredServiceHighlight.findMany({
    where: { visible: true },
    orderBy: { sortOrder: "asc" },
    include: {
      service: {
        include: {
          heroMedia: true,
          category: true,
        },
      },
    },
  });

  return rows
    .filter((r) => r.service)
    .map((r) => {
      const s = r.service!;
      const badge =
        r.badge.trim() ||
        (s.category?.name ? s.category.name.toUpperCase() : "");
      return {
        id: r.id,
        slug: s.slug,
        title: s.title,
        description: s.excerpt,
        badge,
        imageSrc: s.heroMedia?.path ?? null,
        href: `/dienstleistungen/${s.slug}`,
      };
    });
}
