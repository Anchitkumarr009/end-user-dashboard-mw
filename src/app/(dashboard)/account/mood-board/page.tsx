"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { moodBoard, artistById } from "@/lib/mock-data";

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
        description="Save looks by occasion, share references with your artist, then discover the right pro for the job."
      />

      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-2">
          {occasions.map((o) => (
            <button
              key={o}
              type="button"
              onClick={() => setFilter(o)}
              className={
                o === filter
                  ? "rounded-full bg-rose-600 px-4 py-1.5 text-sm font-medium text-white"
                  : "rounded-full border border-zinc-200 bg-white px-4 py-1.5 text-sm text-zinc-700 hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200"
              }
            >
              {o}
            </button>
          ))}
        </div>
        <Link
          href="/account/enquiries"
          className="inline-flex items-center justify-center rounded-full bg-zinc-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-white"
        >
          Find artists
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
              className="overflow-hidden rounded-2xl border border-zinc-200/80 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900/60"
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
                <p className="text-xs font-medium uppercase tracking-wide text-rose-600">
                  {item.occasion}
                </p>
                <h3 className="font-semibold">{item.title}</h3>
                {shared ? (
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">
                    Shared with {shared.name}
                  </p>
                ) : (
                  <p className="text-sm text-zinc-500">Not shared yet</p>
                )}
                <button
                  type="button"
                  className="text-sm font-medium text-rose-600 hover:underline dark:text-rose-400"
                  onClick={() =>
                    alert(
                      "In production this opens a share sheet / notifies your artist.",
                    )
                  }
                >
                  Share with artist
                </button>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
