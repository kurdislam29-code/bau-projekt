import { prisma } from "@/lib/prisma";

export type ContactPublic = {
  companyName: string;
  legalName: string;
  phone: string;
  phoneRaw: string;
  email: string;
  whatsappUrl: string;
  addressStreet: string;
  addressZip: string;
  addressCity: string;
  addressCountry: string;
  hours: string;
  siteUrl: string;
  defaultDescription: string;
};

export async function getContactSettings(): Promise<ContactPublic> {
  const row = await prisma.contactSettings.findUnique({
    where: { id: "default" },
  });
  if (!row) {
    throw new Error(
      "ContactSettings fehlen. Bitte `npx prisma db seed` ausführen.",
    );
  }
  return row;
}
