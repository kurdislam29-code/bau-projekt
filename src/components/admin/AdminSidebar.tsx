import Link from "next/link";
import { logoutAction } from "@/server/actions/auth";
import {
  Building2,
  FolderOpen,
  Home,
  ImageIcon,
  LayoutDashboard,
  Layers,
  LogOut,
  Phone,
  Search,
  Sparkles,
  Wrench,
} from "lucide-react";

const nav = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/homepage", label: "Startseite", icon: Home },
  { href: "/admin/featured-services", label: "Featured Services", icon: Sparkles },
  { href: "/admin/services", label: "Leistungen", icon: Wrench },
  { href: "/admin/service-categories", label: "Leistungs-Kategorien", icon: Layers },
  { href: "/admin/projects", label: "Projekte", icon: Building2 },
  { href: "/admin/project-categories", label: "Projekt-Kategorien", icon: FolderOpen },
  { href: "/admin/media", label: "Medien", icon: ImageIcon },
  { href: "/admin/seo", label: "SEO", icon: Search },
  { href: "/admin/contact", label: "Kontakt", icon: Phone },
] as const;

export function AdminSidebar() {
  return (
    <aside className="flex w-64 shrink-0 flex-col border-r border-zinc-200 bg-white">
      <div className="border-b border-zinc-100 px-5 py-5">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand">
          CMS
        </p>
        <p className="mt-1 text-sm font-semibold text-zinc-900">DELIKAYA BAU</p>
      </div>
      <nav className="flex-1 space-y-0.5 p-3">
        {nav.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium text-zinc-600 transition hover:bg-orange-50 hover:text-brand"
          >
            <item.icon className="h-4 w-4 opacity-80" aria-hidden />
            {item.label}
          </Link>
        ))}
      </nav>
      <div className="border-t border-zinc-100 p-3">
        <Link
          href="/"
          className="mb-2 block rounded-lg px-3 py-2 text-sm text-zinc-500 hover:bg-zinc-50 hover:text-zinc-800"
        >
          Zur Website
        </Link>
        <form action={logoutAction}>
          <button
            type="submit"
            className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-zinc-600 transition hover:bg-red-50 hover:text-red-700"
          >
            <LogOut className="h-4 w-4" aria-hidden />
            Abmelden
          </button>
        </form>
      </div>
    </aside>
  );
}
