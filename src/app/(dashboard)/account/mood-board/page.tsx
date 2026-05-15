"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { moodBoard, artistById } from "@/lib/mock-data";

const MOOD_BOARD_FEATURES = [
  " User design images save kar sakta hai platform se share kr skta hai",
  "Mood board is organized by occasion — Wedding, Karva Chauth, Party, and more.",
  "When you send an enquiry, your mood board can be shared directly with the artist.",
  "Use “Find artists who match this style” from your mood board to discover the right pro.",
] as const;

const occasions = ["All", ...Array.from(new Set(moodBoard.map((m) => m.occasion)))];

export default function MoodBoardPage() {
  const [filter, setFilter] = useState("All");

  const filtered = useMemo(() => {
    if (filter === "All") return moodBoard;
    return moodBoard.filter((m) => m.occasion === filter);
  }, [filter]);

  return (
    <div>
      <PageHeader
        title="Mood board"
        description="Collect mehndi inspiration, organise by occasion, and share with artists when you enquire."
      />

      <section className="mb-8 rounded-2xl border border-[#e8e0d6] bg-white p-5 shadow-sm sm:p-6">
        <h2 className="font-serif text-lg font-semibold text-[#4A1414]">
          How your mood board works
        </h2>
        <ul className="mt-4 list-disc space-y-2.5 pl-5 text-sm leading-relaxed text-[#4A1414]/80">
          {MOOD_BOARD_FEATURES.map((point) => (
            <li key={point}>{point}</li>
          ))}
        </ul>
      </section>

      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-2">
          {occasions.map((o) => (
            <button
              key={o}
              type="button"
              onClick={() => setFilter(o)}
              className={
                o === filter
                  ? "rounded-full bg-[#4A1414] px-4 py-1.5 text-sm font-semibold text-white"
                  : "rounded-full border border-[#e8e0d6] bg-white px-4 py-1.5 text-sm font-medium text-[#4A1414]/85 hover:bg-[#FFF9F0]"
              }
            >
              {o}
            </button>
          ))}
        </div>
        <Link
          href="/account/enquiries"
          className="inline-flex shrink-0 items-center justify-center rounded-full bg-[#4A1414] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#3a1010]"
        >
          Find artists who match this style
        </Link>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((item) => {
          const shared = item.sharedWithArtistId
            ? artistById(item.sharedWithArtistId)
            : null;
          return (
            <article
              key={item.id}
              className="overflow-hidden rounded-2xl border border-[#e8e0d6] bg-white shadow-sm"
            >
              <div className="relative aspect-[4/3] w-full">
                <Image
                  src={item.imageUrl}
                  alt={item.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 50vw, 33vw"
                />
              </div>
              <div className="space-y-2 p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-[#b8892c]">
                  {item.occasion}
                </p>
                <h3 className="font-semibold text-[#4A1414]">{item.title}</h3>
                {shared ? (
                  <p className="text-sm text-[#4A1414]/60">
                    Shared with {shared.name}
                  </p>
                ) : (
                  <p className="text-sm text-[#4A1414]/45">Not shared yet</p>
                )}
                <div className="flex flex-col gap-2 pt-1 sm:flex-row sm:flex-wrap">
                  <button
                    type="button"
                    className="text-sm font-semibold text-[#b8892c] hover:text-[#4A1414]"
                    onClick={() =>
                      alert(
                        "In production this opens a share sheet / notifies your artist.",
                      )
                    }
                  >
                    Share with artist
                  </button>
                  <Link
                    href={`/account/enquiries?style=${encodeURIComponent(item.occasion)}`}
                    className="text-sm font-semibold text-[#4A1414] underline decoration-[#d4a84b]/60 underline-offset-2 hover:decoration-[#4A1414]"
                  >
                    Find artists who match this style
                  </Link>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
