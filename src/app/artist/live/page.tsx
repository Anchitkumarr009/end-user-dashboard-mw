"use client";

import { useLiveServiceTimer } from "@/hooks/useLiveServiceTimer";
import {
  writeLiveServiceSession,
  type LiveServiceSession,
} from "@/lib/service-timer";
import { bookings, artistById } from "@/lib/mock-data";

export default function ArtistLivePage() {
  const { session, refresh } = useLiveServiceTimer();

  const startDemo = () => {
    const b = bookings.find((x) => x.status === "service_in_progress");
    if (!b) return;
    const artist = artistById(b.artistId);
    const payload: LiveServiceSession = {
      bookingId: b.id,
      artistName: artist?.name ?? "Artist",
      serviceName: b.serviceName,
      startedAt: new Date().toISOString(),
    };
    writeLiveServiceSession(payload);
    refresh();
  };

  const endDemo = () => {
    writeLiveServiceSession(null);
    refresh();
  };

  return (
    <div className="mx-auto max-w-lg px-4 py-16">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-rose-600">
        Artist dashboard (demo)
      </p>
      <h1 className="mt-2 text-2xl font-semibold tracking-tight">
        Live service controls
      </h1>
      <p className="mt-3 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
        Starting a session writes to{" "}
        <code className="rounded bg-zinc-100 px-1 dark:bg-zinc-800">
          studio:live-service-session
        </code>{" "}
        and broadcasts on{" "}
        <code className="rounded bg-zinc-100 px-1 dark:bg-zinc-800">
          studio-live-service
        </code>
        — the client account dashboard listens for the same keys.
      </p>

      <div className="mt-8 space-y-4 rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
        <p className="text-sm font-medium text-zinc-800 dark:text-zinc-100">
          Current session
        </p>
        {session ? (
          <pre className="overflow-x-auto rounded-lg bg-zinc-50 p-3 text-xs dark:bg-zinc-950">
            {JSON.stringify(session, null, 2)}
          </pre>
        ) : (
          <p className="text-sm text-zinc-500">None active</p>
        )}
        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={startDemo}
            className="rounded-full bg-rose-600 px-5 py-2 text-sm font-semibold text-white hover:bg-rose-700"
          >
            Start service (demo)
          </button>
          <button
            type="button"
            onClick={endDemo}
            className="rounded-full border border-zinc-300 px-5 py-2 text-sm font-medium hover:bg-zinc-50 dark:border-zinc-600 dark:hover:bg-zinc-800"
          >
            End service
          </button>
        </div>
      </div>
      <a
        href="/account"
        className="mt-8 inline-block text-sm font-medium text-rose-600 hover:underline"
      >
        ← Back to client dashboard
      </a>
    </div>
  );
}
