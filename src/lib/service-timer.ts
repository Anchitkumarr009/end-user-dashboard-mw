/**
 * Shared live service timer — same storage key + channel as the artist dashboard
 * so both surfaces stay in sync on this device (and across tabs).
 */
export const SERVICE_TIMER_STORAGE_KEY = "studio:live-service-session";
export const SERVICE_TIMER_CHANNEL = "studio-live-service";

export type LiveServiceSession = {
  bookingId: string;
  artistName: string;
  serviceName: string;
  startedAt: string; // ISO
};

function parseSession(raw: string | null): LiveServiceSession | null {
  if (!raw) return null;
  try {
    const v = JSON.parse(raw) as LiveServiceSession;
    if (v.bookingId && v.startedAt && v.artistName) return v;
  } catch {
    /* ignore */
  }
  return null;
}

export function readLiveServiceSession(): LiveServiceSession | null {
  if (typeof window === "undefined") return null;
  return parseSession(localStorage.getItem(SERVICE_TIMER_STORAGE_KEY));
}

export function writeLiveServiceSession(session: LiveServiceSession | null) {
  if (typeof window === "undefined") return;
  if (session) {
    localStorage.setItem(SERVICE_TIMER_STORAGE_KEY, JSON.stringify(session));
  } else {
    localStorage.removeItem(SERVICE_TIMER_STORAGE_KEY);
  }
  window.dispatchEvent(new Event("studio-live-service-changed"));
  try {
    const bc = new BroadcastChannel(SERVICE_TIMER_CHANNEL);
    bc.postMessage(session);
    bc.close();
  } catch {
    /* BroadcastChannel unsupported */
  }
}
