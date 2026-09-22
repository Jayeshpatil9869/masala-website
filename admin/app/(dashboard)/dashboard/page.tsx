export const dynamic = "force-dynamic";

import { adminClient } from "@/lib/supabase/admin";
import { Package, Tags, MessageSquare, Plus, ArrowUpRight, Clock, Sparkles } from "lucide-react";
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
      href: "/categories",
      accent: "bg-[#111111] text-white",
      badge: "Organized Blends",
    },
    {
      label: "Active Products",
      value: productCount ?? 0,
      icon: Package,
      href: "/products",
      accent: "bg-[#111111] text-white",
      badge: "In Catalog",
    },
    {
      label: "Customer Inquiries",
      value: queryCount ?? 0,
      icon: MessageSquare,
      href: "/queries",
      accent: "bg-[#D30005] text-white",
      badge: "Direct Leads",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-[#007D48] border border-emerald-100">
              <span className="w-1.5 h-1.5 rounded-full bg-[#007D48] animate-pulse" />
              Live Store Connected
            </span>
          </div>
          <h1 className="font-display text-3xl sm:text-4xl text-[#111111] uppercase tracking-wide">
            Catalog Overview
          </h1>
          <p className="text-sm text-[#707072]">
            Monitor your spice product collection and incoming customer messages.
          </p>
        </div>

        {/* Action Shortcuts */}
        <div className="flex items-center gap-2.5 flex-wrap">
          <Link
            href="/categories"
            className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2.5 bg-white border border-[#E5E5E5] text-[#111111] hover:bg-[#F5F5F5] text-xs font-semibold rounded-xl transition shadow-sm btn-press-active"
          >
            <Plus className="w-3.5 h-3.5" /> Category
          </Link>
          <Link
            href="/products/new"
            className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 bg-[#111111] hover:bg-[#222222] text-white text-xs font-semibold rounded-xl transition shadow-sm btn-press-active"
          >
            <Plus className="w-3.5 h-3.5" /> Add Product
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-6">
        {stats.map(({ label, value, icon: Icon, href, accent, badge }) => (
          <Link
            key={label}
            href={href}
            className="group block bg-white rounded-2xl border border-[#EAEAEA] p-5 sm:p-6 shadow-sm hover:shadow-md hover:border-[#111111]/20 transition-all btn-press-active relative overflow-hidden"
          >
            <div className="flex items-start justify-between mb-4">
              <div
                className={`w-11 h-11 rounded-xl ${accent} flex items-center justify-center shadow-sm transition-transform group-hover:scale-105`}
              >
                <Icon className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-semibold uppercase tracking-wider text-[#707072] bg-[#F5F5F5] px-2 py-1 rounded-md">
                {badge}
              </span>
            </div>
            
            <div className="flex items-baseline justify-between">
              <div>
                <p className="display-number text-4xl sm:text-5xl font-normal text-[#111111] leading-none">
                  {value}
                </p>
                <p className="text-xs font-medium text-[#707072] mt-1.5">
                  {label}
                </p>
              </div>
              <ArrowUpRight className="w-4 h-4 text-[#9E9EA0] group-hover:text-[#111111] transition-colors" />
            </div>
          </Link>
        ))}
      </div>

      {/* Two Column Grid: Recent Products & Recent Queries */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Products */}
        <div className="bg-white rounded-2xl border border-[#EAEAEA] shadow-sm overflow-hidden flex flex-col">
          <div className="px-6 py-4 border-b border-[#EAEAEA] flex items-center justify-between bg-white">
            <div className="flex items-center gap-2">
              <Package className="w-4 h-4 text-[#111111]" />
              <h2 className="text-sm font-bold uppercase tracking-wider text-[#111111]">
                Recent Products
              </h2>
            </div>
            <Link
              href="/products"
              className="text-xs text-[#111111] hover:text-[#D30005] font-semibold flex items-center gap-1 transition"
            >
              View All <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="divide-y divide-[#F0F0F0] flex-1">
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
                    className="flex items-center gap-4 px-6 py-3.5 hover:bg-[#FAFAFA] transition-colors group"
                  >
                    <div className="relative w-11 h-11 rounded-xl bg-[#F5F5F5] overflow-hidden flex-shrink-0 border border-[#EAEAEA] group-hover:border-[#111111] transition-all">
                      {p.images?.[0] ? (
                        <Image
                          src={p.images[0]}
                          alt={p.name}
                          fill
                          sizes="44px"
                          className="object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-[#9E9EA0]">
                          <Package className="w-5 h-5" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-[#111111] truncate group-hover:text-[#D30005] transition-colors">
                        {p.name}
                      </p>
                      <span className="inline-block text-[10px] font-medium text-[#707072] bg-[#F5F5F5] px-2 py-0.5 rounded-full mt-0.5">
                        {(Array.isArray(p.categories)
                          ? p.categories[0]?.name
                          : p.categories?.name) ?? "Uncategorized"}
                      </span>
                    </div>
                    <span className="text-[11px] text-[#9E9EA0] flex items-center gap-1 flex-shrink-0">
                      <Clock className="w-3 h-3" />
                      {formatDate(p.created_at)}
                    </span>
                  </Link>
                ),
              )
            ) : (
              <div className="px-6 py-12 text-center text-xs text-[#9E9EA0]">
                No products found in the catalog yet.
              </div>
            )}
          </div>
        </div>

        {/* Recent Queries */}
        <div className="bg-white rounded-2xl border border-[#EAEAEA] shadow-sm overflow-hidden flex flex-col">
          <div className="px-6 py-4 border-b border-[#EAEAEA] flex items-center justify-between bg-white">
            <div className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-[#111111]" />
              <h2 className="text-sm font-bold uppercase tracking-wider text-[#111111]">
                Customer Inquiries
              </h2>
            </div>
            <Link
              href="/queries"
              className="text-xs text-[#111111] hover:text-[#D30005] font-semibold flex items-center gap-1 transition"
            >
              View All <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="divide-y divide-[#F0F0F0] flex-1">
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
                    className={`block px-6 py-3.5 hover:bg-[#FAFAFA] transition-colors group ${
                      !q.is_read ? "bg-orange-50/20" : ""
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-semibold text-[#111111] truncate group-hover:text-[#D30005] transition-colors">
                            {q.name}
                          </p>
                          {!q.is_read && (
                            <span className="flex-shrink-0 px-1.5 py-0.5 bg-[#D30005] text-white text-[9px] font-bold rounded-full uppercase">
                              New
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-[#707072] truncate mt-0.5">
                          {q.email}
                        </p>
                        <p className="text-xs text-[#4B4B4D] mt-1 line-clamp-1">
                          {q.message}
                        </p>
                      </div>
                      <span className="text-[11px] text-[#9E9EA0] flex items-center gap-1 flex-shrink-0">
                        {formatDate(q.created_at)}
                      </span>
                    </div>
                  </Link>
                ),
              )
            ) : (
              <div className="px-6 py-12 text-center text-xs text-[#9E9EA0]">
                No contact inquiries received yet.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
