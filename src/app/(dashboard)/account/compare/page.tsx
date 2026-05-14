"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useMemo, useState, Suspense } from "react";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { artists } from "@/lib/mock-data";

function CompareContent() {
  const router = useRouter();
  const params = useSearchParams();
  const initialA = params.get("a") ?? artists[0]?.id;
  const initialB = params.get("b") ?? artists[1]?.id;

  const [leftId, setLeftId] = useState(initialA ?? "");
  const [rightId, setRightId] = useState(initialB ?? "");

  const left = useMemo(
    () => artists.find((a) => a.id === leftId) ?? artists[0],
    [leftId],
  );
  const right = useMemo(
    () =>
      artists.find((a) => a.id === rightId && a.id !== leftId) ??
      artists.find((a) => a.id !== left?.id) ??
      artists[1],
    [rightId, left?.id],
  );

  const rows = [
    { label: "Specialty", l: left.specialty, r: right.specialty },
    { label: "City", l: left.city, r: right.city },
    {
      label: "Rating",
      l: `${left.rating} (${left.reviewCount} reviews)`,
      r: `${right.rating} (${right.reviewCount} reviews)`,
    },
    {
      label: "From price",
      l: `₹${left.priceFrom.toLocaleString("en-IN")}`,
      r: `₹${right.priceFrom.toLocaleString("en-IN")}`,
    },
    {
      label: "Experience",
      l: `${left.yearsExperience} yrs`,
      r: `${right.yearsExperience} yrs`,
    },
    { label: "Typical reply", l: left.responseTime, r: right.responseTime },
  ];

  const syncUrl = (a: string, b: string) => {
    router.replace(`/account/compare?a=${encodeURIComponent(a)}&b=${encodeURIComponent(b)}`);
  };

  return (
    <div>
      <PageHeader
        title="Compare artists"
        description="Side-by-side view for up to two artists — pick columns from your shortlist or full directory."
      />

      <div className="mb-8 grid gap-4 md:grid-cols-2">
        <label className="block text-sm font-medium">
          Left column
          <select
            className="mt-2 w-full rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-900"
            value={left.id}
            onChange={(e) => {
              const v = e.target.value;
              setLeftId(v);
              syncUrl(v, right.id);
            }}
          >
            {artists.map((a) => (
              <option key={a.id} value={a.id}>
                {a.name}
              </option>
            ))}
          </select>
        </label>
        <label className="block text-sm font-medium">
          Right column
          <select
            className="mt-2 w-full rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-900"
            value={right.id}
            onChange={(e) => {
              const v = e.target.value;
              setRightId(v);
              syncUrl(left.id, v);
            }}
          >
            {artists.map((a) => (
              <option key={a.id} value={a.id} disabled={a.id === left.id}>
                {a.name}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="overflow-hidden rounded-2xl border border-zinc-200/80 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900/60">
        <div className="grid grid-cols-2 gap-px bg-zinc-200 dark:bg-zinc-800">
          {[left, right].map((a) => (
            <div
              key={a.id}
              className="bg-white px-4 py-6 text-center dark:bg-zinc-900"
            >
              <div
                className={`mx-auto mb-3 h-16 w-16 rounded-2xl bg-gradient-to-br ${a.avatarColor}`}
              />
              <p className="font-semibold">{a.name}</p>
              <p className="text-sm text-zinc-500">{a.specialty}</p>
            </div>
          ))}
        </div>
        <table className="w-full text-left text-sm">
          <tbody>
            {rows.map((row) => (
              <tr
                key={row.label}
                className="border-t border-zinc-100 dark:border-zinc-800"
              >
                <th className="w-1/3 bg-zinc-50 px-4 py-3 font-medium text-zinc-600 dark:bg-zinc-950 dark:text-zinc-400">
                  {row.label}
                </th>
                <td className="w-1/3 px-4 py-3">{row.l}</td>
                <td className="w-1/3 px-4 py-3">{row.r}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default function ComparePage() {
  return (
    <Suspense fallback={<p className="text-sm text-zinc-500">Loading…</p>}>
      <CompareContent />
    </Suspense>
  );
}
