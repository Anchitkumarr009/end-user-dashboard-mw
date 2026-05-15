import Link from "next/link";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { chats } from "@/lib/mock-data";

const CHAT_RETENTION_POINTS = [
  "Active booking chats: 1 month after function date (dispute resolution ke liye)",
  "Non-booking chats: 30 days retained",
  "Both artist aur user apni chat history dashboard se dekh sakte hain",
  "Chats involving active/recent bookings flagged and retained for dispute resolution",
] as const;

export default function ChatHistoryPage() {
  return (
    <div>
      <PageHeader
        title="Chat history"
        description="Continue conversations with artists you have booked or messaged."
      />

      <section className="mb-8 rounded-2xl border border-[#e8e0d6] bg-white p-5 shadow-sm sm:p-6">
        <h2 className="font-serif text-lg font-semibold text-[#7c3aed]">
          Chat History & Retention
        </h2>
        <ul className="mt-4 list-disc space-y-2.5 pl-5 text-sm leading-relaxed text-[#4A1414]/80">
          {CHAT_RETENTION_POINTS.map((point) => (
            <li key={point}>{point}</li>
          ))}
        </ul>
      </section>
      <section className="mb-8 rounded-2xl border border-[#e8e0d6] bg-white p-5 shadow-sm sm:p-6">
  <h2 className="font-serif text-lg font-semibold text-[#7c3aed]">
  Chat Interface
  </h2>

  <p className="mt-3 text-sm leading-relaxed text-[#4A1414]/80">
•	Real-time messaging between artist and user - human-to-human chat (no bot)
•	Chat opens after OTP login when user clicks 'Send Message'
•	Both artist and user can send text messages and images (reference designs)
•	Image sharing: max 5 images per message, max 5 MB per image, formats: JPG/PNG/WEBP
•	Mood Board share directly in chat if possible
•	Call button available within the chat window for both parties
•	Call review pop up after call disconnect
•	Chat notification: push notification (PWA) + WhatsApp if offline

  </p>
</section>
      <ul className="space-y-3">
        {chats.map((c) => (
          <li key={c.id}>
            <Link
              href={`#thread-${c.id}`}
              className="block rounded-2xl border border-[#e8e0d6] bg-white p-4 transition hover:border-[#d4c4b8] hover:shadow-sm"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-semibold text-[#4A1414]">{c.artistName}</p>
                  <p className="mt-1 line-clamp-2 text-sm text-[#4A1414]/65">
                    {c.lastMessage}
                  </p>
                </div>
                <div className="shrink-0 text-right text-xs text-[#4A1414]/50">
                  <time dateTime={c.updatedAt}>
                    {new Date(c.updatedAt).toLocaleDateString(undefined, {
                      month: "short",
                      day: "numeric",
                    })}
                  </time>
                  {c.unread > 0 ? (
                    <span className="mt-1 flex justify-end">
                      <span className="rounded-full bg-[#4A1414] px-2 py-0.5 text-[10px] font-bold text-white">
                        {c.unread}
                      </span>
                    </span>
                  ) : null}
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>

      <p className="mt-6 text-sm text-[#4A1414]/55">
        Thread view is a placeholder — wire your chat provider (Stream, Sendbird,
        etc.) here.
      </p>
    </div>
  
  );
}
