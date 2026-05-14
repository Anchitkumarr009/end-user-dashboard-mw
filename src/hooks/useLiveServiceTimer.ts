"use client";

import { useCallback, useEffect, useState } from "react";
import {
  SERVICE_TIMER_CHANNEL,
  readLiveServiceSession,
  writeLiveServiceSession,
  type LiveServiceSession,
} from "@/lib/service-timer";

export function useLiveServiceTimer() {
  const [session, setSession] = useState<LiveServiceSession | null>(null);

  const refresh = useCallback(() => {
    setSession(readLiveServiceSession());
  }, []);

  useEffect(() => {
    refresh();
    const onStorage = (e: StorageEvent) => {
      if (e.key === null || e.key === "studio:live-service-session") refresh();
    };
    const onCustom = () => refresh();
    window.addEventListener("storage", onStorage);
    window.addEventListener("studio-live-service-changed", onCustom);

    let bc: BroadcastChannel | null = null;
    try {
      bc = new BroadcastChannel(SERVICE_TIMER_CHANNEL);
      bc.onmessage = () => {
        refresh();
      };
    } catch {
      /* no-op */
    }

    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("studio-live-service-changed", onCustom);
      bc?.close();
    };
  }, [refresh]);

  const clear = useCallback(() => {
    writeLiveServiceSession(null);
    setSession(null);
  }, []);

  return { session, refresh, clear };
}
