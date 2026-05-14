import { SiteHeader } from "@/components/dashboard/SiteHeader";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { SupportFab } from "@/components/dashboard/SupportFab";
import { MobileAccountNav } from "@/components/dashboard/MobileAccountNav";

export function DashboardShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#FFFDF5] text-[#4A1414]">
      <SiteHeader />
      <div className="mx-auto flex max-w-[1400px] gap-6 px-4 py-6 sm:px-6 lg:gap-8 lg:px-8 lg:py-8">
        <DashboardSidebar />
        <div className="min-w-0 flex-1 pb-24">
          <MobileAccountNav />
          {children}
        </div>
      </div>
      <SupportFab />
    </div>
  );
}
