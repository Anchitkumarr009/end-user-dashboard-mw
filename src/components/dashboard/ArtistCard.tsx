import Link from "next/link";
import type { Artist } from "@/lib/types";
import { initialFromName } from "@/lib/mock-data";

export function ArtistCard({ artist }: { artist: Artist }) {
  const initial = initialFromName(artist.name);

  return (
    <div className="flex gap-4 rounded-2xl border border-[#e8e0d6] bg-white p-4 shadow-[0_1px_3px_rgba(74,20,20,0.05)]">
      <div
        className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-[#fef9c3] text-lg font-bold text-[#854d0e] shadow-inner"
        aria-hidden
      >
        {initial}
      </div>
      <div className="min-w-0 flex-1">
        <p className="font-semibold text-[#4A1414]">{artist.name}</p>
        <p className="text-sm text-[#4A1414]/60">
          {artist.specialty} · {artist.city}
        </p>
        <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-[#4A1414]/55">
          <span className="rounded-full bg-[#FFF9F0] px-2 py-0.5 font-medium text-[#4A1414]">
            ★ {artist.rating} ({artist.reviewCount})
          </span>
          <span>From ₹{artist.priceFrom.toLocaleString("en-IN")}</span>
        </div>
        <Link
          href={`/account/compare?a=${artist.id}`}
          className="mt-3 inline-block text-sm font-semibold text-[#b8892c] hover:text-[#4A1414]"
        >
          Compare
        </Link>
      </div>
    </div>
  );
}
