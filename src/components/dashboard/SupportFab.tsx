import Link from "next/link";
import { IconMessage } from "@/components/dashboard/icons";

export function SupportFab() {
  return (
    <Link
      href="/account/support"
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#4A1414] text-white shadow-[0_8px_24px_rgba(74,20,20,0.35)] transition hover:scale-105 hover:bg-[#3a1010] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4A1414]"
      aria-label="Customer support chat"
    >
      <IconMessage className="h-6 w-6" />
    </Link>
  );
}
