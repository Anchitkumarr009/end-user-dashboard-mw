import Link from "next/link";
import { IconCalendar, IconHeart, IconMessage, IconPalette } from "@/components/dashboard/icons";
import type { BookingStatus } from "@/lib/types";

export function StatSummaryCards(props: {
  shortlisted: number;
  bookings: number;
  chats: number;
  moodBoard: number;
}) {
  const cards = [
    {
      label: "Shortlisted",
      value: props.shortlisted,
      icon: IconHeart,
      box: "bg-[#fde8e8] text-[#c94a4a]",
    },
    {
      label: "Bookings",
      value: props.bookings,
      icon: IconCalendar,
      box: "bg-[#e3eefc] text-[#2563eb]",
    },
    {
      label: "Chats",
      value: props.chats,
      icon: IconMessage,
      box: "bg-[#e6f7ef] text-[#0d8a54]",
    },
    {
      label: "Mood Board",
      value: props.moodBoard,
      icon: IconPalette,
      box: "bg-[#f1e8ff] text-[#7c3aed]",
    },
  ] as const;

  return (
    <div className="grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-4">
      {cards.map(({ label, value, icon: Icon, box }) => (
        <div
          key={label}
          className="rounded-2xl border border-[#e8e0d6] bg-white p-4 shadow-[0_1px_3px_rgba(74,20,20,0.05)] transition hover:shadow-[0_4px_14px_rgba(74,20,20,0.08)]"
        >
          <div
            className={`mb-3 flex h-10 w-10 items-center justify-center rounded-xl ${box}`}
          >
            <Icon className="h-5 w-5" />
          </div>
          <p className="text-3xl font-semibold tabular-nums tracking-tight">{value}</p>
          <p className="mt-1 text-sm font-medium text-[#4A1414]/65">{label}</p>
        </div>
      ))}
    </div>
  );
}

function statusBadge(status: BookingStatus) {
  switch (status) {
    case "completed":
      return "bg-[#dcfce7] text-[#166534] ring-1 ring-[#bbf7d0]";
    case "booking_confirmed":
    case "contacted":
      return "bg-[#ecfccb] text-[#3f6212] ring-1 ring-[#d9f99d]";
    case "enquiry_sent":
      return "bg-[#e0f2fe] text-[#075985] ring-1 ring-[#bae6fd]";
    case "service_in_progress":
      return "bg-[#ffedd5] text-[#9a3412] ring-1 ring-[#fed7aa]";
    case "cancelled":
      return "bg-[#f4f4f5] text-[#52525b] ring-1 ring-[#e4e4e7]";
    default:
      return "bg-[#f4f4f5] text-[#52525b]";
  }
}

function statusLabel(status: BookingStatus) {
  switch (status) {
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

export function RecentBookingsList(props: {
  rows: {
    id: string;
    artistName: string;
    initial: string;
    eventType: string;
    date: string;
    status: BookingStatus;
    priceInr: number;
  }[];
}) {
  return (
    <div className="rounded-2xl border border-[#e8e0d6] bg-white shadow-[0_1px_3px_rgba(74,20,20,0.05)]">
      <div className="flex items-center justify-between border-b border-[#f0ebe4] px-5 py-4">
        <h2 className="font-serif text-lg font-semibold text-[#4A1414]">
          Recent Bookings
        </h2>
        <Link
          href="/account/bookings"
          className="text-sm font-semibold text-[#b8892c] transition hover:text-[#4A1414]"
        >
          View All →
        </Link>
      </div>
      <ul className="divide-y divide-[#f0ebe4]">
        {props.rows.map((row) => (
          <li key={row.id} className="flex items-center gap-4 px-5 py-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#fef9c3] text-base font-bold text-[#854d0e] shadow-inner">
              {row.initial}
            </div>
            <div className="min-w-0 flex-1">
              <p className="font-semibold text-[#4A1414]">{row.artistName}</p>
              <p className="text-sm text-[#4A1414]/60">
                {row.eventType} —{" "}
                {new Date(row.date).toLocaleDateString(undefined, {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </p>
            </div>
            <div className="flex shrink-0 flex-col items-end gap-1.5 sm:flex-row sm:items-center sm:gap-3">
              <span
                className={`rounded-full px-2.5 py-1 text-xs font-semibold ${statusBadge(row.status)}`}
              >
                {statusLabel(row.status)}
              </span>
              <span className="text-sm font-semibold tabular-nums text-[#4A1414]">
                ₹{row.priceInr.toLocaleString("en-IN")}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
