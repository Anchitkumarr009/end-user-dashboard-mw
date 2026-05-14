"use client";

import { useEffect, useMemo, useState } from "react";
import { useLiveServiceTimer } from "@/hooks/useLiveServiceTimer";

function formatElapsed(ms: number) {
  const s = Math.floor(ms / 1000);
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const sec = s % 60;
  if (h > 0) return `${h}h ${m}m ${sec}s`;
  if (m > 0) return `${m}m ${sec}s`;
  return `${sec}s`;
}

export function LiveServiceTimer() {
  const { session, clear } = useLiveServiceTimer();
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    if (!session) return;
    const id = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(id);
  }, [session]);

  const elapsed = useMemo(() => {
    if (!session) return 0;
    return Math.max(0, now - new Date(session.startedAt).getTime());
  }, [session, now]);

  if (!session) {
    return (
      <div className="rounded-2xl border border-dashed border-[#e8e0d6] bg-white/80 p-6">
        <p className="text-sm font-semibold text-[#4A1414]">No live service right now</p>
        <p className="mt-2 text-sm leading-relaxed text-[#4A1414]/60">
          When your artist starts the appointment on their dashboard, the timer
          appears here automatically — same session, synced across tabs.
        </p>
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden rounded-2xl border border-[#e8e0d6] bg-gradient-to-br from-[#fff9f0] via-white to-[#fefce8] p-6 shadow-sm">
      <div className="pointer-events-none absolute -right-10 -top-10 h-36 w-36 rounded-full bg-[#d4a84b]/20 blur-2xl" />
      <div className="relative flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-[#b8892c]">
            Live service
          </p>
          <p className="mt-1 text-lg font-semibold text-[#4A1414]">{session.serviceName}</p>
          <p className="text-sm text-[#4A1414]/65">with {session.artistName}</p>
        </div>
        <div className="flex items-baseline gap-3">
          <span className="font-mono text-4xl font-semibold tabular-nums tracking-tight text-[#4A1414]">
            {formatElapsed(elapsed)}
          </span>
        </div>
      </div>
      <div className="relative mt-4 flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={clear}
          className="rounded-full border border-[#e8e0d6] bg-white px-4 py-2 text-sm font-semibold text-[#4A1414] shadow-sm transition hover:bg-[#FFF9F0]"
        >
          Dismiss (demo)
        </button>
        <p className="text-xs text-[#4A1414]/50">
          Clearing only hides this card; your artist ends the session from their
          dashboard in production.
        </p>
      </div>
    </div>
  );
}
