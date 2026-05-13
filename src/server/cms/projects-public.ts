import { prisma } from "@/lib/prisma";

export type PublicProjectCard = {
  slug: string;
  title: string;
  /** Anzeige unter dem Titel: aus Projekt-Kategorien (CMS), sortiert */
  categoryLine: string;
  image: string;
};

export async function listFeaturedProjectsPublic(): Promise<PublicProjectCard[]> {
  const projects = await prisma.project.findMany({
    orderBy: { sortOrder: "asc" },
    include: {
      categories: {
        include: { category: true },
      },
      images: {
        orderBy: { sortOrder: "asc" },
        where: { kind: "GALLERY" },
        take: 1,
        include: { mediaFile: true },
      },
    },
  });

  return projects.map((p) => {
    const names = [...p.categories]
      .sort(
        (a, b) =>
          a.category.sortOrder - b.category.sortOrder ||
          a.category.name.localeCompare(b.category.name, "de"),
      )
      .map((x) => x.category.name);
    const categoryLine = names.join(" · ");

    return {
      slug: p.slug,
      title: p.title,
      categoryLine,
      image: p.images[0]?.mediaFile.path ?? "/images/projects/project-1.jpg",
    };
  });
}
