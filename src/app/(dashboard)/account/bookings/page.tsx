import Link from "next/link";
import { BookingStatusTimeline } from "@/components/dashboard/BookingStatusTimeline";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { artistById, bookings } from "@/lib/mock-data";
import type { BookingStatus } from "@/lib/types";

function labelForStatus(s: BookingStatus) {
  switch (s) {
    case "enquiry_sent":
      return "Enquiry Sent";
    case "contacted":
      return "Contacted";
    case "booking_confirmed":
      return "Booking Confirmed";
    case "service_in_progress":
      return "Service In Progress";
    case "completed":
      return "Completed";
    case "cancelled":
      return "Cancelled";
  }
}

export default function BookingsPage() {
  return (
    <div>
      <PageHeader
        title="My Bookings"
        description="Every booking follows the same clear status flow — from first enquiry through to completion."
      />

      <ol className="space-y-10">
        {bookings.map((b) => {
          const artist = artistById(b.artistId);
          return (
            <li
              key={b.id}
              className="rounded-2xl border border-[#e8e0d6] bg-white p-6 shadow-sm"
            >
              <div className="flex flex-col gap-2 border-b border-[#f0ebe4] pb-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <p className="font-semibold text-[#4A1414]">{b.serviceName}</p>
                  <p className="text-sm text-[#4A1414]/60">
                    {artist?.name} · {b.eventType} ·{" "}
                    {new Date(b.date).toLocaleString(undefined, {
                      dateStyle: "medium",
                      timeStyle: "short",
                    })}
                  </p>
                  <p className="mt-1 text-sm font-semibold text-[#4A1414]">
                    ₹{b.priceInr.toLocaleString("en-IN")}
                  </p>
                </div>
                <span className="inline-flex w-fit rounded-full bg-[#FFF9F0] px-3 py-1 text-xs font-semibold text-[#4A1414] ring-1 ring-[#e8e0d6]">
                  {labelForStatus(b.status)}
                </span>
              </div>

              <div className="mt-6 grid gap-8 lg:grid-cols-2">
                <div>
                  <h3 className="mb-3 text-sm font-semibold text-[#4A1414]">
                    Status timeline
                  </h3>
                  <BookingStatusTimeline status={b.status} />
                </div>
                <div>
                  <h3 className="mb-3 text-sm font-semibold text-[#4A1414]">
                    History
                  </h3>
                  <ul className="space-y-2 text-sm">
                    {b.statusHistory.map((h) => (
                      <li
                        key={`${h.status}-${h.at}`}
                        className="flex justify-between gap-4 rounded-lg bg-[#FFF9F0] px-3 py-2 text-[#4A1414]"
                      >
                        <span>{labelForStatus(h.status)}</span>
                        <time className="text-[#4A1414]/50" dateTime={h.at}>
                          {new Date(h.at).toLocaleString(undefined, {
                            month: "short",
                            day: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </time>
                      </li>
                    ))}
                  </ul>
                  <Link
                    href="/account/chat"
                    className="mt-4 inline-block text-sm font-semibold text-[#b8892c] hover:text-[#4A1414]"
                  >
                    Open chat with artist
                  </Link>
                </div>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
