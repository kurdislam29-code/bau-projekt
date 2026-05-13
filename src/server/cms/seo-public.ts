import { prisma } from "@/lib/prisma";

export type PageSeoPublic = {
  title: string | null;
  description: string | null;
  ogImage: string | null;
  canonicalUrl: string | null;
};

export async function getSeoForService(serviceId: string) {
  return prisma.sEOSettings.findUnique({
    where: { serviceId },
    include: { ogMedia: true },
  });
}

export async function getSeoForProject(projectId: string) {
  return prisma.sEOSettings.findUnique({
    where: { projectId },
    include: { ogMedia: true },
  });
}

export async function getSeoByPageKey(pageKey: string) {
  return prisma.sEOSettings.findUnique({
    where: { pageKey },
    include: { ogMedia: true },
  });
}
