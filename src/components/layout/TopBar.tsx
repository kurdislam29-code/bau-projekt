import {
  Mail,
  Phone,
  Clock,
  Facebook,
  Linkedin,
  Instagram,
  Twitter,
} from "lucide-react";
import type { ContactPublic } from "@/server/cms/contact";
import { Container } from "@/components/layout/Container";
import { publicSocial } from "@/lib/public-social";

const social = [
  { label: "Facebook", href: publicSocial.facebook, Icon: Facebook },
  { label: "X", href: publicSocial.x, Icon: Twitter },
  { label: "LinkedIn", href: publicSocial.linkedin, Icon: Linkedin },
  { label: "Instagram", href: publicSocial.instagram, Icon: Instagram },
];

type Props = {
  contact: ContactPublic;
};

export function TopBar({ contact }: Props) {
  return (
    <div className="bg-zinc-900 text-zinc-100 text-xs sm:text-sm border-b border-zinc-800">
      <Container className="flex flex-wrap items-center justify-between gap-3 py-2.5">
        <div className="flex items-center gap-2 text-zinc-300 min-w-0">
          <Clock className="h-3.5 w-3.5 text-brand shrink-0" aria-hidden />
          <span className="truncate">{contact.hours}</span>
        </div>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-zinc-200">
          <a
            href={`tel:${contact.phoneRaw.replace(/\s/g, "")}`}
            className="inline-flex items-center gap-1.5 hover:text-white transition-colors"
          >
            <Phone className="h-3.5 w-3.5 text-brand" aria-hidden />
            <span className="tabular-nums">{contact.phone}</span>
          </a>
          <a
            href={`mailto:${contact.email}`}
            className="inline-flex items-center gap-1.5 hover:text-white transition-colors"
          >
            <Mail className="h-3.5 w-3.5 text-brand" aria-hidden />
            <span className="hidden sm:inline truncate max-w-[200px]">
              {contact.email}
            </span>
            <span className="sm:hidden">Mail</span>
          </a>
        </div>
        <nav aria-label="Social Media" className="flex items-center gap-2.5">
          {social.map((item) => (
            <a
              key={item.label}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-400 hover:text-white transition-colors p-1 rounded"
              aria-label={item.label}
            >
              <item.Icon className="h-4 w-4" aria-hidden />
            </a>
          ))}
        </nav>
      </Container>
    </div>
  );
}
