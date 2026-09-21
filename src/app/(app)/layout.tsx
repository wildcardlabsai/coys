import { TopNav } from "@/components/layout/TopNav";
import { BottomNav } from "@/components/layout/BottomNav";
import { DesktopSidebar } from "@/components/layout/DesktopSidebar";

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <DesktopSidebar />
      <TopNav />

      <div className="md:pl-64">
        <main className="main-content">
          <div className="mx-auto max-w-4xl">{children}</div>
        </main>
      </div>

      <BottomNav />
    </>
  );
}
