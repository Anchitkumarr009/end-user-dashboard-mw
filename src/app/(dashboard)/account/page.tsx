import Link from "next/link";
import { LiveServiceTimer } from "@/components/dashboard/LiveServiceTimer";
import { FavouriteImagesGrid } from "@/components/dashboard/FavouriteImages";
import { ArtistCard } from "@/components/dashboard/ArtistCard";
import {
  RecentBookingsList,
  StatSummaryCards,
} from "@/components/dashboard/DashboardOverview";
import {
  artistById,
  bookings,
  chats,
  favouriteImages,
  moodBoard,
  shortlistIds,
  initialFromName,
} from "@/lib/mock-data";

export default function AccountHomePage() {
  const shortlist = shortlistIds
    .map((id) => artistById(id))
    .filter(Boolean) as NonNullable<ReturnType<typeof artistById>>[];

  const nextBooking = bookings.find((b) => b.status === "service_in_progress");

  const recentRows = ["b1", "b2", "b3"]
    .map((id) => bookings.find((b) => b.id === id))
    .filter(Boolean)
    .map((b) => {
      const artist = artistById(b!.artistId);
      return {
        id: b!.id,
        artistName: artist?.name ?? "Artist",
        initial: initialFromName(artist?.name ?? "A"),
        eventType: b!.eventType,
        date: b!.date,
        status: b!.status,
        priceInr: b!.priceInr,
      };
    });

  return (
    <div>
      <header className="mb-8">
        <h1 className="font-serif text-3xl font-semibold tracking-tight text-[#4A1414] sm:text-[2rem]">
          My Dashboard
        </h1>
        <p className="mt-2 text-[#4A1414]/65">
          Welcome back! Here&apos;s your activity overview.
        </p>
      </header>

      <section className="mb-8">
        <StatSummaryCards
          shortlisted={shortlistIds.length}
          bookings={bookings.length}
          chats={chats.length}
          moodBoard={moodBoard.length}
        />
      </section>

      <section className="mb-8">
        <RecentBookingsList rows={recentRows} />
      </section>

      <section className="mb-10 space-y-3">
        <h2 className="font-serif text-lg font-semibold text-[#4A1414]">
          Live service timer
        </h2>
        <LiveServiceTimer />
      </section>

      <div className="grid gap-8 lg:grid-cols-2">
        <section>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-serif text-lg font-semibold text-[#4A1414]">
              My Shortlist
            </h2>
            <Link
              href="/account/shortlist"
              className="text-sm font-semibold text-[#b8892c] hover:text-[#4A1414]"
            >
              View all
            </Link>
          </div>
          <div className="space-y-3">
            {shortlist.map((a) => (
              <ArtistCard key={a.id} artist={a} />
            ))}
          </div>
        </section>

        <section>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-serif text-lg font-semibold text-[#4A1414]">
              Active booking
            </h2>
            <Link
              href="/account/bookings"
              className="text-sm font-semibold text-[#b8892c] hover:text-[#4A1414]"
            >
              All bookings
            </Link>
          </div>
          {nextBooking ? (
            <div className="rounded-2xl border border-[#e8e0d6] bg-white p-5 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-wider text-[#b8892c]">
                In progress
              </p>
              <p className="mt-1 font-semibold text-[#4A1414]">
                {nextBooking.serviceName}
              </p>
              <p className="text-sm text-[#4A1414]/60">
                {artistById(nextBooking.artistId)?.name}
              </p>
            </div>
          ) : (
            <p className="text-sm text-[#4A1414]/60">
              No live appointment. Explore your{" "}
              <Link href="/account/enquiries" className="font-semibold text-[#b8892c] underline">
                enquiries
              </Link>{" "}
              or{" "}
              <Link href="/account/shortlist" className="font-semibold text-[#b8892c] underline">
                shortlist
              </Link>
              .
            </p>
          )}
        </section>
      </div>

      <section className="mt-12">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <h2 className="font-serif text-lg font-semibold text-[#4A1414]">
            Favourite images
          </h2>
          <Link
            href="/account/mood-board"
            className="text-sm font-semibold text-[#b8892c] hover:text-[#4A1414]"
          >
            Add to mood board
          </Link>
        </div>
        <FavouriteImagesGrid items={favouriteImages} />
      </section>

      <section className="mt-12 rounded-2xl border border-[#e8e0d6] bg-white p-6 shadow-sm">
        <h2 className="font-serif text-lg font-semibold text-[#4A1414]">
          Enjoying MehndiWalaa?
        </h2>
        <p className="mt-2 text-sm text-[#4A1414]/65">
          A quick rating helps other clients discover trusted artists.
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <a
            href="https://apps.apple.com"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center rounded-full bg-[#4A1414] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#3a1010]"
          >
            Rate on App Store
          </a>
          <a
            href="https://play.google.com/store"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center rounded-full border border-[#e8e0d6] bg-[#FFFDF5] px-5 py-2.5 text-sm font-semibold text-[#4A1414] transition hover:bg-white"
          >
            Rate on Google Play
          </a>
        </div>
      </section>

      <footer className="mt-12 flex flex-wrap gap-x-6 gap-y-2 border-t border-[#e8e0d6] pt-8 text-sm text-[#4A1414]/55">
        <Link href="/terms" className="font-medium hover:text-[#4A1414]">
          Terms
        </Link>
        <Link href="/privacy" className="font-medium hover:text-[#4A1414]">
          Privacy
        </Link>
        <Link href="/account/support" className="font-medium hover:text-[#4A1414]">
          Customer support
        </Link>
      </footer>
    </div>
  );
}
