import Image from "next/image";
import type { FavouriteImage } from "@/lib/types";

export function FavouriteImagesGrid({ items }: { items: FavouriteImage[] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-3">
      {items.map((img) => (
        <figure
          key={img.id}
          className="overflow-hidden rounded-2xl border border-[#e8e0d6] bg-white shadow-sm"
        >
          <div className="relative aspect-[4/3] w-full">
            <Image
              src={img.imageUrl}
              alt={img.caption}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
          </div>
          <figcaption className="px-3 py-2 text-sm text-[#4A1414]/65">
            {img.caption}
          </figcaption>
        </figure>
      ))}
    </div>
  );
}
