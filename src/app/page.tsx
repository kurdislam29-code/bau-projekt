import { HeroSection } from "@/components/sections/HeroSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { ContactSection } from "@/components/sections/ContactSection";
import type { Metadata } from "next";
import { getContactSettings } from "@/server/cms/contact";
import { listPublicFeaturedHighlights } from "@/server/cms/featured-services-public";
import { getHomepageContent } from "@/server/cms/homepage";
import { listFeaturedProjectsPublic } from "@/server/cms/projects-public";
import { listServicesPublic } from "@/server/cms/services-public";
import { getSeoByPageKey } from "@/server/cms/seo-public";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const [seo, contact] = await Promise.all([
    getSeoByPageKey("HOME"),
    getContactSettings(),
  ]);
  return {
    title: seo?.title ?? "Startseite",
    description: seo?.description ?? contact.defaultDescription,
  };
}

export default async function HomePage() {
  const [home, services, projects, contact, featured] = await Promise.all([
    getHomepageContent(),
    listServicesPublic(),
    listFeaturedProjectsPublic(),
    getContactSettings(),
    listPublicFeaturedHighlights(),
  ]);

  return (
    <>
      <HeroSection data={home} />
      <AboutSection data={home} featured={featured} />
      <ServicesSection services={services} />
      <ProjectsSection projects={projects} />
      <CtaBanner data={home} />
      <ContactSection contact={contact} home={home} />
    </>
  );
}
