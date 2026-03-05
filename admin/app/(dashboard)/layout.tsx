import { Sidebar } from "@/components/admin/Sidebar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 lg:min-h-screen overflow-auto">
        {/* Mobile top header spacer */}
        <div className="lg:hidden h-14" />
        <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto pb-24 lg:pb-8">
          {children}
        </div>
      </main>
    </div>
  );
}
