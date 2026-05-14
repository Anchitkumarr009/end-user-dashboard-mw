import type { BookingStatus } from "@/lib/types";
import { BOOKING_FLOW } from "@/lib/types";

const endStates: BookingStatus[] = ["completed", "cancelled"];

function statusIndex(status: BookingStatus): number {
  if (status === "cancelled") return -1;
  return BOOKING_FLOW.findIndex((s) => s.id === status);
}

export function BookingStatusTimeline({
  status,
  compact = false,
}: {
  status: BookingStatus;
  compact?: boolean;
}) {
  const isCancelled = status === "cancelled";
  const activeIdx = statusIndex(status);

  return (
    <div className={compact ? "space-y-2" : "space-y-4"}>
      <ol className="flex flex-col gap-3">
        {BOOKING_FLOW.map((step, i) => {
          const reached =
            !isCancelled &&
            activeIdx >= 0 &&
            BOOKING_FLOW.findIndex((s) => s.id === step.id) <= activeIdx;
          const current = !isCancelled && BOOKING_FLOW[activeIdx]?.id === step.id;

          return (
            <li key={step.id} className="flex gap-3">
              <div className="flex flex-col items-center">
                <span
                  className={
                    reached
                      ? "flex h-8 w-8 items-center justify-center rounded-full bg-[#4A1414] text-xs font-semibold text-white"
                      : "flex h-8 w-8 items-center justify-center rounded-full border border-[#e8e0d6] bg-[#FFF9F0] text-xs font-medium text-[#4A1414]/35"
                  }
                >
                  {i + 1}
                </span>
                {i < BOOKING_FLOW.length - 1 ? (
                  <span
                    className={
                      reached && !current
                        ? "my-1 h-6 w-px bg-[#d4a84b]/60"
                        : "my-1 h-6 w-px bg-[#e8e0d6]"
                    }
                  />
                ) : null}
              </div>
              <div className="pb-1">
                <p
                  className={
                    reached
                      ? "text-sm font-medium text-[#4A1414]"
                      : "text-sm text-[#4A1414]/45"
                  }
                >
                  {step.label}
                </p>
                {current ? (
                  <p className="text-xs font-semibold text-[#b8892c]">Current step</p>
                ) : null}
              </div>
            </li>
          );
        })}
      </ol>

      {endStates.includes(status) ? (
        <div
          className={
            status === "completed"
              ? "rounded-xl border border-[#bbf7d0] bg-[#f0fdf4] px-4 py-3 text-sm text-[#166534]"
              : "rounded-xl border border-[#e8e0d6] bg-[#faf8f5] px-4 py-3 text-sm text-[#4A1414]/80"
          }
        >
          {status === "completed" ? (
            <span className="font-semibold">Completed</span>
          ) : (
            <span className="font-semibold">Cancelled</span>
          )}
        </div>
      ) : null}

      {isCancelled ? (
        <p className="text-xs text-[#4A1414]/50">
          Flow stopped — booking was cancelled before completion.
        </p>
      ) : null}
    </div>
  );
}
