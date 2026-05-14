import { PageHeader } from "@/components/dashboard/PageHeader";
import { ArtistCard } from "@/components/dashboard/ArtistCard";
import { artistById, shortlistIds } from "@/lib/mock-data";

export default function ShortlistPage() {
  const list = shortlistIds
    .map((id) => artistById(id))
    .filter(Boolean) as NonNullable<ReturnType<typeof artistById>>[];

  return (
    <div>
      <PageHeader
        title="My Shortlist"
        description="Artists you saved for faster booking and comparison."
      />
      <div className="space-y-4">
        {list.map((a) => (
          <ArtistCard key={a.id} artist={a} />
        ))}
      </div>
    </div>
  );
}
