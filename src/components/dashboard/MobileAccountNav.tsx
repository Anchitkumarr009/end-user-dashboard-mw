"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  IconCalendar,
  IconCog,
  IconHeart,
  IconLayout,
  IconMessage,
  IconPalette,
  IconScale,
  IconStar,
  IconWallet,
} from "@/components/dashboard/icons";

const links: { href: string; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { href: "/account", label: "Overview", icon: IconLayout },
  { href: "/account/wallet", label: "Wallet", icon: IconWallet },
  { href: "/account/shortlist", label: "Shortlist", icon: IconHeart },
  { href: "/account/mood-board", label: "Mood", icon: IconPalette },
  { href: "/account/bookings", label: "Bookings", icon: IconCalendar },
  { href: "/account/chat", label: "Chat", icon: IconMessage },
  { href: "/account/compare", label: "Compare", icon: IconScale },
  { href: "/account/reviews", label: "Reviews", icon: IconStar },
  { href: "/account/settings", label: "Settings", icon: IconCog },
];

function active(pathname: string, href: string) {
  if (href === "/account") return pathname === "/account";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function MobileAccountNav() {
  const pathname = usePathname();

  return (
    <div className="mb-6 md:hidden">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-[#4A1414]/45">
        Account
      </p>
      <div className="flex gap-2 overflow-x-auto pb-1 [-webkit-overflow-scrolling:touch]">
        {links.map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className={
              active(pathname, href)
                ? "flex shrink-0 items-center gap-1.5 rounded-full bg-[#4A1414] px-3 py-2 text-xs font-semibold text-white"
                : "flex shrink-0 items-center gap-1.5 rounded-full border border-[#e8e0d6] bg-white px-3 py-2 text-xs font-medium text-[#4A1414]/85 shadow-sm"
            }
          >
            <Icon className="h-3.5 w-3.5" />
            {label}
          </Link>
        ))}
      </div>
    </div>
  );
}
