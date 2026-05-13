import { auth } from "@/auth";

export async function requireAdminSession() {
  const session = await auth();
  if (!session?.user?.id) {
    throw new Error("Nicht autorisiert");
  }
  return session;
}
