import { PageHeader } from "@/components/dashboard/PageHeader";
import { trials } from "@/lib/mock-data";

export default function TrialsPage() {
  return (
    <div>
      <PageHeader
        title="Trial sessions"
        description="Trials booked with artists before your main event."
      />
      <ul className="divide-y divide-zinc-200 rounded-2xl border border-zinc-200/80 bg-white dark:divide-zinc-800 dark:border-zinc-800 dark:bg-zinc-900/60">
        {trials.map((t) => (
          <li key={t.id} className="flex flex-col gap-1 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="font-medium">{t.service}</p>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                {t.artistName}
              </p>
            </div>
            <div className="text-right text-sm">
              <p className="text-zinc-500">
                {new Date(t.scheduledAt).toLocaleString(undefined, {
                  dateStyle: "medium",
                  timeStyle: "short",
                })}
              </p>
              <span
                className={
                  t.status === "completed"
                    ? "text-emerald-600 dark:text-emerald-400"
                    : t.status === "missed"
                    ? "text-red-600 dark:text-red-400"
                    : "text-amber-600 dark:text-amber-400"
                }
              >
                {t.status === "scheduled"
                  ? "Scheduled"
                  : t.status === "completed"
                  ? "Completed"
                  : "Missed"}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
