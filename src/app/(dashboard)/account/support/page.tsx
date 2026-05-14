import Link from "next/link";
import { PageHeader } from "@/components/dashboard/PageHeader";

const phone = "919876543210";

export default function SupportPage() {
  return (
    <div>
      <PageHeader
        title="Customer support"
        description="Reach us on WhatsApp or continue an in-app conversation."
      />
      <div className="grid gap-4 sm:grid-cols-2">
        <a
          href={`https://wa.me/${phone}`}
          target="_blank"
          rel="noreferrer"
          className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6 transition hover:shadow-md dark:border-emerald-900/50 dark:bg-emerald-950/30"
        >
          <p className="text-sm font-semibold uppercase tracking-wide text-emerald-800 dark:text-emerald-300">
            WhatsApp
          </p>
          <p className="mt-2 text-lg font-semibold text-emerald-950 dark:text-emerald-50">
            Message care team
          </p>
          <p className="mt-2 text-sm text-emerald-800/80 dark:text-emerald-200/80">
            Typical reply under 15 minutes, 9am–9pm.
          </p>
        </a>
        <Link
          href="/account/chat"
          className="rounded-2xl border border-zinc-200 bg-white p-6 transition hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900/60"
        >
          <p className="text-sm font-semibold uppercase tracking-wide text-zinc-500">
            In-app chat
          </p>
          <p className="mt-2 text-lg font-semibold">Open chat history</p>
          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
            Pick up threads with artists or support.
          </p>
        </Link>
      </div>
      <div className="mt-10 text-sm text-zinc-500">
        <Link href="/terms" className="underline hover:text-rose-600">
          Terms of service
        </Link>
        {" · "}
        <Link href="/privacy" className="underline hover:text-rose-600">
          Privacy policy
        </Link>
      </div>
    </div>
  );
}
