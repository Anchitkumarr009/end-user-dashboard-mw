import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of service · Studio",
};

export default function TermsPage() {
  return (
    <article className="mx-auto max-w-2xl px-4 py-16 text-zinc-800 dark:text-zinc-100">
      <h1 className="text-3xl font-semibold tracking-tight">Terms of service</h1>
      <p className="mt-6 leading-relaxed text-zinc-600 dark:text-zinc-400">
        This is placeholder copy for a client-facing terms page. Replace with
        your legal text and jurisdiction-specific disclosures.
      </p>
      <p className="mt-4 leading-relaxed text-zinc-600 dark:text-zinc-400">
        Bookings made through Studio are agreements between you and the
        independent artist; the platform facilitates discovery, scheduling, and
        payments where enabled.
      </p>
    </article>
  );
}
