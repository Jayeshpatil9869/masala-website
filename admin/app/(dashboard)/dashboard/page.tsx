import { createClient } from "@/lib/supabase/server";
import { Package, Tags, ListOrdered, MessageSquare } from "lucide-react";
import { formatDate } from "@/lib/utils";

export default async function DashboardPage() {
  const supabase = await createClient();

  const [
    { count: categoryCount },
    { count: productCount },
    { count: variantCount },
    { count: queryCount },
    { data: recentProducts },
    { data: recentQueries },
  ] = await Promise.all([
    supabase.from("categories").select("*", { count: "exact", head: true }),
    supabase.from("products").select("*", { count: "exact", head: true }),
    supabase.from("product_variants").select("*", { count: "exact", head: true }),
    supabase.from("contact_queries").select("*", { count: "exact", head: true }),
    supabase
      .from("products")
      .select("id, name, images, created_at, categories(name)")
      .order("created_at", { ascending: false })
      .limit(5),
    supabase
      .from("contact_queries")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(5),
  ]);

  const stats = [
    { label: "Total Categories", value: categoryCount ?? 0, icon: Tags, color: "text-orange-500", bg: "bg-orange-50" },
    { label: "Total Products", value: productCount ?? 0, icon: Package, color: "text-blue-500", bg: "bg-blue-50" },
    { label: "Contact Queries", value: queryCount ?? 0, icon: MessageSquare, color: "text-purple-500", bg: "bg-purple-50" },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-sm text-gray-500 mt-1">Welcome back! Here&apos;s an overview of your catalog.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-10">
        {stats.map(({ label, value, icon: Icon, color, bg }) => (
          <div key={label} className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
            <div className={`w-11 h-11 rounded-xl ${bg} flex items-center justify-center mb-4`}>
              <Icon className={`w-5 h-5 ${color}`} />
            </div>
            <p className="text-2xl font-bold text-gray-900">{value}</p>
            <p className="text-sm text-gray-500 mt-0.5">{label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Products */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-50 flex items-center justify-between">
            <h2 className="font-semibold text-gray-900">Recent Products</h2>
            <a href="/products" className="text-xs text-orange-500 hover:text-orange-600 font-medium">View all →</a>
          </div>
          <div className="divide-y divide-gray-50">
            {recentProducts && recentProducts.length > 0 ? recentProducts.map((p: any) => (
              <div key={p.id} className="flex items-center gap-4 px-6 py-3">
                <div className="w-10 h-10 rounded-lg bg-gray-100 overflow-hidden flex-shrink-0">
                  {p.images?.[0] ? (
                    <img src={p.images[0]} alt={p.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-300">
                      <Package className="w-5 h-5" />
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">{p.name}</p>
                  <p className="text-xs text-gray-400">{(p as any).categories?.name ?? "Uncategorized"}</p>
                </div>
                <span className="text-xs text-gray-400">{formatDate(p.created_at)}</span>
              </div>
            )) : (
              <div className="px-6 py-8 text-center text-sm text-gray-400">No products yet</div>
            )}
          </div>
        </div>

        {/* Recent Queries */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-50 flex items-center justify-between">
            <h2 className="font-semibold text-gray-900">Recent Queries</h2>
            <a href="/queries" className="text-xs text-orange-500 hover:text-orange-600 font-medium">View all →</a>
          </div>
          <div className="divide-y divide-gray-50">
            {recentQueries && recentQueries.length > 0 ? recentQueries.map((q: any) => (
              <div key={q.id} className="px-6 py-3">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-medium text-gray-900 truncate">{q.name}</p>
                      {!q.is_read && (
                        <span className="flex-shrink-0 w-2 h-2 bg-orange-400 rounded-full" />
                      )}
                    </div>
                    <p className="text-xs text-gray-400 truncate">{q.email}</p>
                    <p className="text-xs text-gray-500 mt-0.5 line-clamp-1">{q.message}</p>
                  </div>
                  <span className="text-xs text-gray-400 flex-shrink-0">{formatDate(q.created_at)}</span>
                </div>
              </div>
            )) : (
              <div className="px-6 py-8 text-center text-sm text-gray-400">No queries yet</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
