"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { IconBell, IconChevronDown, IconHeart } from "@/components/dashboard/icons";
import { shortlistIds } from "@/lib/mock-data";

const topLinks = [
  { href: "/", label: "Home" },
  { href: "/account/enquiries", label: "Find Artists" },
  { href: "/account/mood-board", label: "Design Inspiration" },
  { href: "/#how-it-works", label: "How It Works" },
  { href: "/artist/live", label: "For Artists" },
];

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function close(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("click", close);
    return () => document.removeEventListener("click", close);
  }, []);

  const shortlistCount = shortlistIds.length;
  const notifCount = 3;

  return (
    <header className="sticky top-0 z-40 border-b border-[#e8e0d6] bg-[#FFFDF5]/95 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-[1400px] items-center gap-4 px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex shrink-0 items-center gap-2.5">
          <span
            className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-[#d4a84b] to-[#b8892c] text-sm font-bold text-white shadow-sm"
            aria-hidden
          >
            M
          </span>
          <span className="font-serif text-xl font-semibold tracking-tight text-[#4A1414] sm:text-[1.35rem]">
            MehndiWalaa
          </span>
        </Link>

        <nav className="ml-4 hidden flex-1 items-center justify-center gap-1 lg:flex">
          {topLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="rounded-full px-3 py-2 text-sm font-medium text-[#4A1414]/75 transition hover:bg-white hover:text-[#4A1414]"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-1 sm:gap-2">
          <Link
            href="/account/shortlist"
            className="relative flex h-10 w-10 items-center justify-center rounded-full text-[#4A1414] transition hover:bg-white"
            aria-label="Shortlist"
          >
            <IconHeart className="h-5 w-5" />
            <span className="absolute -right-0.5 -top-0.5 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-[#c94a4a] px-1 text-[10px] font-bold text-white">
              {shortlistCount}
            </span>
          </Link>
          <button
            type="button"
            className="relative flex h-10 w-10 items-center justify-center rounded-full text-[#4A1414] transition hover:bg-white"
            aria-label="Notifications"
          >
            <IconBell className="h-5 w-5" />
            <span className="absolute -right-0.5 -top-0.5 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-[#4A1414] px-1 text-[10px] font-bold text-white">
              {notifCount}
            </span>
          </button>
          <div className="relative pl-1" ref={menuRef}>
            <button
              type="button"
              onClick={() => setMenuOpen((o) => !o)}
              className="flex items-center gap-2 rounded-full border border-[#e8e0d6] bg-white py-1 pl-1 pr-2 shadow-sm transition hover:border-[#d4c4b8]"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#4A1414] text-sm font-semibold text-white">
                N
              </span>
              <span className="hidden text-sm font-medium text-[#4A1414] sm:inline">
                Neha
              </span>
              <IconChevronDown className="hidden text-[#4A1414]/50 sm:block" />
            </button>
            {menuOpen ? (
              <div className="absolute right-0 mt-2 w-48 rounded-xl border border-[#e8e0d6] bg-white py-1 shadow-lg">
                <Link
                  href="/account/settings"
                  className="block px-4 py-2.5 text-sm text-[#4A1414] hover:bg-[#FFF9F0]"
                  onClick={() => setMenuOpen(false)}
                >
                  Profile settings
                </Link>
                <Link
                  href="/account/support"
                  className="block px-4 py-2.5 text-sm text-[#4A1414] hover:bg-[#FFF9F0]"
                  onClick={() => setMenuOpen(false)}
                >
                  Help & support
                </Link>
                <Link
                  href="/terms"
                  className="block px-4 py-2.5 text-sm text-[#4A1414]/70 hover:bg-[#FFF9F0]"
                  onClick={() => setMenuOpen(false)}
                >
                  Terms
                </Link>
              </div>
            ) : null}
          </div>
        </div>
      </div>
      <div className="flex gap-1 overflow-x-auto border-t border-[#e8e0d6]/60 px-4 py-2 lg:hidden">
        {topLinks.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            className="shrink-0 rounded-full bg-white px-3 py-1.5 text-xs font-medium text-[#4A1414]/80 shadow-sm"
          >
            {l.label}
          </Link>
        ))}
      </div>
    </header>
  );
}
