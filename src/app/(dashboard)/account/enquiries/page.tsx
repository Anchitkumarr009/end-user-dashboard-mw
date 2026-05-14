import Link from "next/link";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { ArtistCard } from "@/components/dashboard/ArtistCard";
import { artistById, enquiredArtistIds } from "@/lib/mock-data";

export default function EnquiriesPage() {
  const list = enquiredArtistIds
    .map((id) => artistById(id))
    .filter(Boolean) as NonNullable<ReturnType<typeof artistById>>[];

  return (
    <div>
      <PageHeader
        title="My enquired artists"
        description="Artists you have reached out to — follow up or add them to your shortlist."
      />
      <div className="space-y-4">
        {list.map((a) => (
          <ArtistCard key={a.id} artist={a} />
        ))}
      </div>
      <Link
        href="/account/mood-board"
        className="mt-8 inline-flex text-sm font-medium text-rose-600 hover:underline dark:text-rose-400"
      >
        Share mood board references →
      </Link>
    </div>
  );
}
