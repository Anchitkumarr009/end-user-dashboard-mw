import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy policy · Studio",
};

export default function PrivacyPage() {
  return (
    <article className="mx-auto max-w-2xl px-4 py-16 text-zinc-800 dark:text-zinc-100">
      <h1 className="text-3xl font-semibold tracking-tight">Privacy policy</h1>
      <p className="mt-6 leading-relaxed text-zinc-600 dark:text-zinc-400">
        Placeholder privacy policy. Describe what personal data you collect
        (profile, bookings, chat, mood boards), retention, processors, and user
        rights (access, deletion).
      </p>
    </article>
  );
}
