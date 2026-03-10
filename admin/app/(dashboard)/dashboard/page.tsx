export const dynamic = "force-dynamic";

import { adminClient } from "@/lib/supabase/admin";
import { Package, Tags, MessageSquare } from "lucide-react";
import { formatDate } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";

export default async function DashboardPage() {
  const [
    { count: categoryCount },
    { count: productCount },
    { count: queryCount },
    { data: recentProducts },
    { data: recentQueries },
  ] = await Promise.all([
    adminClient.from("categories").select("*", { count: "exact", head: true }),
    adminClient.from("products").select("*", { count: "exact", head: true }),
    adminClient
      .from("contact_queries")
      .select("*", { count: "exact", head: true }),
    adminClient
      .from("products")
      .select("id, name, images, created_at, categories(name)")
      .order("created_at", { ascending: false })
      .limit(5),
    adminClient
      .from("contact_queries")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(5),
  ]);

  const stats = [
    {
      label: "Total Categories",
      value: categoryCount ?? 0,
      icon: Tags,
      color: "text-orange-500",
      bg: "bg-orange-50",
    },
    {
      label: "Total Products",
      value: productCount ?? 0,
      icon: Package,
      color: "text-blue-500",
      bg: "bg-blue-50",
    },
    {
      label: "Contact Queries",
      value: queryCount ?? 0,
      icon: MessageSquare,
      color: "text-purple-500",
      bg: "bg-purple-50",
    },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-sm text-gray-500 mt-1">
          Welcome back! Here&apos;s an overview of your catalog.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-10">
        {stats.map(({ label, value, icon: Icon, color, bg }) => (
          <div
            key={label}
            className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm"
          >
            <div
              className={`w-11 h-11 rounded-xl ${bg} flex items-center justify-center mb-4`}
            >
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
            <a
              href="/products"
              className="text-xs text-orange-500 hover:text-orange-600 font-medium"
            >
              View all →
            </a>
          </div>
          <div className="divide-y divide-gray-50">
            {recentProducts && recentProducts.length > 0 ? (
              recentProducts.map(
                (p: {
                  id: string;
                  name: string;
                  images: string[] | null;
                  created_at: string;
                  categories: { name: string }[] | { name: string } | null;
                }) => (
                  <Link
                    href={`/products/${p.id}/edit`}
                    key={p.id}
                    className="flex items-center gap-4 px-6 py-3 hover:bg-orange-50/30 transition-colors cursor-pointer group"
                  >
                    <div className="relative w-10 h-10 rounded-lg bg-gray-100 overflow-hidden flex-shrink-0 group-hover:ring-2 ring-orange-100 transition-all">
                      {p.images?.[0] ? (
                        <Image
                          src={p.images[0]}
                          alt={p.name}
                          fill
                          sizes="40px"
                          className="object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-300">
                          <Package className="w-5 h-5" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate group-hover:text-orange-600 transition-colors">
                        {p.name}
                      </p>
                      <p className="text-xs text-gray-400">
                        {(Array.isArray(p.categories)
                          ? p.categories[0]?.name
                          : p.categories?.name) ?? "Uncategorized"}
                      </p>
                    </div>
                    <span className="text-xs text-gray-400">
                      {formatDate(p.created_at)}
                    </span>
                  </Link>
                ),
              )
            ) : (
              <div className="px-6 py-8 text-center text-sm text-gray-400">
                No products yet
              </div>
            )}
          </div>
        </div>

        {/* Recent Queries */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-50 flex items-center justify-between">
            <h2 className="font-semibold text-gray-900">Recent Queries</h2>
            <a
              href="/queries"
              className="text-xs text-orange-500 hover:text-orange-600 font-medium"
            >
              View all →
            </a>
          </div>
          <div className="divide-y divide-gray-50">
            {recentQueries && recentQueries.length > 0 ? (
              recentQueries.map(
                (q: {
                  id: string;
                  name: string;
                  email: string;
                  message: string;
                  is_read: boolean;
                  created_at: string;
                }) => (
                  <Link
                    href="/queries"
                    key={q.id}
                    className={`block px-6 py-3 hover:bg-orange-50/30 transition-colors cursor-pointer group ${
                      !q.is_read ? "bg-orange-50/10" : ""
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-medium text-gray-900 truncate group-hover:text-orange-600 transition-colors">
                            {q.name}
                          </p>
                          {!q.is_read && (
                            <span className="flex-shrink-0 w-2 h-2 bg-orange-400 rounded-full" />
                          )}
                        </div>
                        <p className="text-xs text-gray-400 truncate">
                          {q.email}
                        </p>
                        <p className="text-xs text-gray-500 mt-0.5 line-clamp-1">
                          {q.message}
                        </p>
                      </div>
                      <span className="text-xs text-gray-400 flex-shrink-0">
                        {formatDate(q.created_at)}
                      </span>
                    </div>
                  </Link>
                ),
              )
            ) : (
              <div className="px-6 py-8 text-center text-sm text-gray-400">
                No queries yet
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
