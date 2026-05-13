import type { Metadata } from "next";
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "@fontsource/inter/700.css";
import "./globals.css";
import { TopBar } from "@/components/layout/TopBar";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { getContactSettings } from "@/server/cms/contact";
import { getSeoByPageKey } from "@/server/cms/seo-public";
import { listServiceNav } from "@/server/cms/services-public";

export async function generateMetadata(): Promise<Metadata> {
  const [contact, seo] = await Promise.all([
    getContactSettings(),
    getSeoByPageKey("HOME"),
  ]);
  const baseUrl = contact.siteUrl;
  const desc = seo?.description ?? contact.defaultDescription;
  return {
    metadataBase: new URL(baseUrl),
    title: {
      default: `${contact.companyName} | Hochbau, Tiefbau & Sanierung`,
      template: `%s | ${contact.companyName}`,
    },
    description: desc,
    openGraph: {
      type: "website",
      locale: "de_DE",
      siteName: contact.companyName,
      title: `${contact.companyName} | Hochbau, Tiefbau & Sanierung`,
      description: desc,
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [contact, serviceNav] = await Promise.all([
    getContactSettings(),
    listServiceNav(),
  ]);

  return (
    <html lang="de">
      <body className="font-sans min-h-screen flex flex-col antialiased text-[15px] sm:text-base text-zinc-800 leading-relaxed">
        <TopBar contact={contact} />
        <Header services={serviceNav} />
        <main className="flex-1">{children}</main>
        <Footer contact={contact} services={serviceNav} />
      </body>
    </html>
  );
}
