import Link from "next/link";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { chats } from "@/lib/mock-data";

export default function ChatHistoryPage() {
  return (
    <div>
      <PageHeader
        title="Chat history"
        description="Continue conversations with artists you have booked or messaged."
      />
      <ul className="space-y-3">
        {chats.map((c) => (
          <li key={c.id}>
            <Link
              href={`#thread-${c.id}`}
              className="block rounded-2xl border border-zinc-200/80 bg-white p-4 transition hover:border-rose-200 hover:shadow-sm dark:border-zinc-800 dark:bg-zinc-900/60 dark:hover:border-rose-900/50"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-semibold">{c.artistName}</p>
                  <p className="mt-1 line-clamp-2 text-sm text-zinc-600 dark:text-zinc-400">
                    {c.lastMessage}
                  </p>
                </div>
                <div className="shrink-0 text-right text-xs text-zinc-500">
                  <time dateTime={c.updatedAt}>
                    {new Date(c.updatedAt).toLocaleDateString(undefined, {
                      month: "short",
                      day: "numeric",
                    })}
                  </time>
                  {c.unread > 0 ? (
                    <span className="mt-1 flex justify-end">
                      <span className="rounded-full bg-rose-600 px-2 py-0.5 text-[10px] font-bold text-white">
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
      <p className="mt-6 text-sm text-zinc-500">
        Thread view is a placeholder — wire your chat provider (Stream, Sendbird,
        etc.) here.
      </p>
    </div>
  );
}
