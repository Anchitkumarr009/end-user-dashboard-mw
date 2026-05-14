import { PageHeader } from "@/components/dashboard/PageHeader";
import { reviews } from "@/lib/mock-data";

export default function ReviewsPage() {
  return (
    <div>
      <PageHeader
        title="My reviews"
        description="Feedback you have shared after completed bookings."
      />
      <ul className="space-y-4">
        {reviews.map((r) => (
          <li
            key={r.id}
            className="rounded-2xl border border-zinc-200/80 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900/60"
          >
            <div className="flex items-center justify-between gap-3">
              <p className="font-semibold">{r.artistName}</p>
              <span className="text-sm text-amber-600 dark:text-amber-400">
                {"★".repeat(r.rating)}
                <span className="sr-only">{r.rating} stars</span>
              </span>
            </div>
            <p className="mt-2 text-sm text-zinc-700 dark:text-zinc-300">
              {r.excerpt}
            </p>
            <time
              className="mt-3 block text-xs text-zinc-500"
              dateTime={r.createdAt}
            >
              {new Date(r.createdAt).toLocaleDateString(undefined, {
                dateStyle: "long",
              })}
            </time>
          </li>
        ))}
      </ul>
    </div>
  );
}
