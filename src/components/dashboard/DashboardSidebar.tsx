"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  IconArrowLeft,
  IconCalendar,
  IconCog,
  IconHeart,
  IconLayout,
  IconMessage,
  IconPalette,
  IconScale,
  IconStar,
} from "@/components/dashboard/icons";

const primaryNav: {
  href: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}[] = [
  { href: "/account", label: "Overview", icon: IconLayout },
  { href: "/account/shortlist", label: "My Shortlist", icon: IconHeart },
  { href: "/account/mood-board", label: "Mood Board", icon: IconPalette },
  { href: "/account/bookings", label: "My Bookings", icon: IconCalendar },
  { href: "/account/chat", label: "Chat", icon: IconMessage },
  { href: "/account/compare", label: "Compare Artists", icon: IconScale },
  { href: "/account/reviews", label: "My Reviews", icon: IconStar },
  { href: "/account/settings", label: "Settings", icon: IconCog },
];

const secondaryNav: { href: string; label: string }[] = [
  { href: "/account/trials", label: "Trial sessions" },
  { href: "/account/enquiries", label: "Enquired artists" },
  { href: "/account/support", label: "Support" },
  { href: "/artist/live", label: "Artist live timer (demo)" },
];

function isActive(pathname: string, href: string) {
  if (href === "/account") return pathname === "/account";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function DashboardSidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden w-[260px] shrink-0 md:block">
      <div className="sticky top-24 space-y-4">
        <div className="rounded-2xl border border-[#e8e0d6] bg-white p-3 shadow-[0_1px_3px_rgba(74,20,20,0.06)]">
          <Link
            href="/"
            className="mb-2 flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-medium text-[#4A1414]/80 transition hover:bg-[#FFF9F0] hover:text-[#4A1414]"
          >
            <IconArrowLeft className="shrink-0 opacity-70" />
            Back to Home
          </Link>
          <nav className="space-y-1 pt-1">
            {primaryNav.map(({ href, label, icon: Icon }) => {
              const active = isActive(pathname, href);
              return (
                <Link
                  key={href}
                  href={href}
                  className={
                    active
                      ? "flex items-center gap-3 rounded-xl bg-[#4A1414] px-3 py-2.5 text-sm font-medium text-white shadow-sm"
                      : "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-[#4A1414]/85 transition hover:bg-[#FFF9F0]"
                  }
                >
                  <Icon
                    className={
                      active ? "shrink-0 opacity-100" : "shrink-0 opacity-70"
                    }
                  />
                  {label}
                </Link>
              );
            })}
          </nav>
        </div>
        <div className="rounded-2xl border border-[#e8e0d6] bg-white/80 px-3 py-3 text-xs text-[#4A1414]/55">
          <p className="mb-2 font-semibold uppercase tracking-wider text-[#4A1414]/40">
            More
          </p>
          <ul className="space-y-1">
            {secondaryNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="block rounded-lg px-2 py-1.5 transition hover:bg-[#FFF9F0] hover:text-[#4A1414]"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </aside>
  );
}
