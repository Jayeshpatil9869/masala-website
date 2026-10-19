import { Sidebar } from "@/components/admin/Sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-[#FAFAFA] text-[#111111]">
      <Sidebar />
      <main className="flex-1 min-w-0 lg:min-h-screen flex flex-col overflow-x-hidden">
        {/* Mobile top header spacer */}
        <div className="lg:hidden h-14 w-full flex-shrink-0" />
        
        {/* Main Content Area */}
        <div className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6 lg:pt-8 pb-32 sm:pb-36 lg:pb-12">
          {children}
        </div>
      </main>
    </div>
  );
}
