import { AdminSidebar } from "@/components/admin/AdminSidebar";

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-zinc-50">
      <AdminSidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="border-b border-zinc-200 bg-white/90 px-6 py-4 backdrop-blur">
          <h1 className="text-lg font-semibold text-zinc-900">Administration</h1>
          <p className="text-xs text-zinc-500">
            Inhalte verwalten · Medien · SEO · Kontakt
          </p>
        </header>
        <div className="flex-1 overflow-auto p-6 lg:p-8">{children}</div>
      </div>
    </div>
  );
}
