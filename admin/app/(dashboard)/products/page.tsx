"use client";

import { useState, useEffect, useCallback } from "react";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";
import { Plus, Pencil, Trash2, Package, Loader2, Search, Filter, X } from "lucide-react";
import { formatDate } from "@/lib/utils";
import Link from "next/link";
import { useRouter } from "next/navigation";
import DeleteConfirmModal from "@/components/admin/DeleteConfirmModal";
import Image from "next/image";

type Product = {
  id: string;
  name: string;
  slug: string;
  images: string[];
  created_at: string;
  categories: { name: string } | null;
  product_variants: { count: number }[];
};

type Category = { id: string; name: string };

function LazyProductImage({
  src,
  alt,
}: {
  src: string | undefined;
  alt: string;
}) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  if (!src || error) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-[#F5F5F5]">
        <Package className="w-5 h-5 text-[#9E9EA0]" />
      </div>
    );
  }

  return (
    <>
      {!loaded && (
        <div className="absolute inset-0 bg-[#F5F5F5] animate-pulse rounded-xl" />
      )}
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 640px) 44px, 48px"
        onLoad={() => setLoaded(true)}
        onError={() => setError(true)}
        className={`object-cover transition-opacity duration-300 ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
      />
    </>
  );
}

export default function ProductsPage() {
  const supabase = createClient();
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [search, setSearch] = useState("");
  const [filterCat, setFilterCat] = useState("");

  const loadCategories = useCallback(async () => {
    const client = createClient();
    const { data: cats } = await client
      .from("categories")
      .select("id, name")
      .order("name");
    if (cats) setCategories(cats);
  }, []);

  const loadProducts = useCallback(
    async (catId: string, searchTerm: string) => {
      setLoading(true);
      try {
        let url = "/api/admin/products";
        const params = new URLSearchParams();
        if (catId && catId !== "all") {
          params.append("category", catId);
        }
        if (searchTerm.trim()) {
          params.append("search", searchTerm.trim());
        }
        if (params.toString()) {
          url += `?${params.toString()}`;
        }

        const res = await fetch(url);
        if (!res.ok) throw new Error("Failed to load products");
        const data = await res.json();
        setProducts(data || []);
      } catch (error: unknown) {
        toast.error(
          error instanceof Error ? error.message : "Failed to load products",
        );
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  useEffect(() => {
    loadCategories();
  }, [loadCategories]);

  useEffect(() => {
    const handler = setTimeout(() => {
      loadProducts(filterCat, search);
    }, 200);

    return () => clearTimeout(handler);
  }, [filterCat, search, loadProducts]);

  const openDeleteModal = (id: string) => {
    setPendingDeleteId(id);
    setDeleteModalOpen(true);
  };

  const handleDeleteCancel = () => {
    if (isDeleting) return;
    setDeleteModalOpen(false);
    setPendingDeleteId(null);
  };

  const handleDeleteConfirm = async () => {
    if (!pendingDeleteId) return;
    setIsDeleting(true);
    setDeleteId(pendingDeleteId);
    try {
      const res = await fetch(`/api/admin/products/${pendingDeleteId}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete product");
      toast.success("Product deleted successfully");
      setProducts((prev) => prev.filter((p) => p.id !== pendingDeleteId));
      setDeleteModalOpen(false);
      setPendingDeleteId(null);
    } catch (error: unknown) {
      toast.error(
        error instanceof Error ? error.message : "Failed to delete product",
      );
    } finally {
      setIsDeleting(false);
      setDeleteId(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl sm:text-4xl text-[#111111] uppercase tracking-wide">
            Product Catalog
          </h1>
          <p className="text-sm text-[#707072] mt-0.5">
            Manage your spice powders, boxes, and weight variant pricing.
          </p>
        </div>
        <Link
          href="/products/new"
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-[#111111] hover:bg-[#222222] text-white text-xs font-semibold rounded-xl transition shadow-sm btn-press-active w-full sm:w-auto"
        >
          <Plus className="w-4 h-4" /> Add Product
        </Link>
      </div>

      {/* Filter Row */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9E9EA0]" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search products by title..."
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-[#E5E5E5] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#111111] text-[#111111] placeholder:text-[#9E9EA0] shadow-sm"
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-[#9E9EA0] hover:text-[#111111]"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        <div className="flex items-center gap-2">
          <div className="relative w-full sm:w-56">
            <select
              value={filterCat}
              onChange={(e) => setFilterCat(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-white border border-[#E5E5E5] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#111111] text-[#111111] shadow-sm appearance-none cursor-pointer pr-8"
            >
              <option value="">All Categories</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
            <Filter className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#9E9EA0] pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Products Table Card */}
      <div className="bg-white rounded-2xl border border-[#EAEAEA] shadow-sm overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-24">
            <Loader2 className="w-7 h-7 animate-spin text-[#111111]" />
          </div>
        ) : products.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center px-4">
            <div className="w-12 h-12 rounded-2xl bg-[#F5F5F5] flex items-center justify-center mb-3">
              <Package className="w-6 h-6 text-[#9E9EA0]" />
            </div>
            <p className="text-sm font-semibold text-[#111111]">
              {search ? "No matching products found" : "No products in catalog yet"}
            </p>
            <p className="text-xs text-[#707072] mt-1 max-w-sm">
              {search
                ? "Try searching for a different keyword or reset your filter."
                : "Add your first spice product to start selling across India."}
            </p>
            {search ? (
              <button
                onClick={() => setSearch("")}
                className="mt-4 px-4 py-2 border border-[#E5E5E5] text-[#111111] text-xs font-semibold rounded-xl hover:bg-[#F5F5F5] transition"
              >
                Clear Search Filter
              </button>
            ) : (
              <Link
                href="/products/new"
                className="mt-4 px-4 py-2 bg-[#111111] text-white text-xs font-semibold rounded-xl hover:bg-[#222222] transition"
              >
                + Add First Product
              </Link>
            )}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-[#EAEAEA] bg-[#FAFAFA] text-[11px] font-bold text-[#707072] uppercase tracking-wider">
                  <th className="px-5 py-3.5">Product</th>
                  <th className="px-5 py-3.5">Category</th>
                  <th className="hidden sm:table-cell px-5 py-3.5">Variants</th>
                  <th className="hidden md:table-cell px-5 py-3.5">Date Added</th>
                  <th className="text-right px-5 py-3.5">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F0F0F0]">
                {products.map((p) => (
                  <tr
                    key={p.id}
                    className="hover:bg-[#FAFAFA] transition-colors cursor-pointer group"
                    onClick={() => router.push(`/products/${p.id}/edit`)}
                  >
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3.5">
                        <div className="relative w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-[#F5F5F5] border border-[#EAEAEA] overflow-hidden flex-shrink-0 group-hover:border-[#111111] transition-all">
                          <LazyProductImage
                            src={p.images?.[0]}
                            alt={p.name}
                          />
                        </div>
                        <div className="min-w-0">
                          <p className="font-semibold text-[#111111] group-hover:text-[#D30005] transition-colors truncate max-w-[160px] sm:max-w-none">
                            {p.name}
                          </p>
                          <p className="text-[11px] text-[#9E9EA0] font-mono truncate max-w-[160px] sm:max-w-none mt-0.5">
                            /{p.slug}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <span className="inline-flex items-center px-2.5 py-1 bg-[#F5F5F5] text-[#111111] text-xs font-medium rounded-full border border-[#EAEAEA] whitespace-nowrap">
                        {p.categories?.name ?? "Uncategorized"}
                      </span>
                    </td>
                    <td className="hidden sm:table-cell px-5 py-4">
                      <span className="text-xs font-semibold text-[#4B4B4D]">
                        {p.product_variants?.[0]?.count ?? 0} variants
                      </span>
                    </td>
                    <td className="hidden md:table-cell px-5 py-4 text-xs text-[#707072]">
                      {formatDate(p.created_at)}
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center justify-end gap-1.5">
                        <Link
                          href={`/products/${p.id}/edit`}
                          className="p-2 rounded-lg text-[#707072] hover:text-[#111111] hover:bg-[#F5F5F5] transition"
                          onClick={(e) => e.stopPropagation()}
                          title="Edit Product"
                        >
                          <Pencil className="w-4 h-4" />
                        </Link>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            openDeleteModal(p.id);
                          }}
                          disabled={deleteId === p.id}
                          className="p-2 rounded-lg text-[#707072] hover:text-[#D30005] hover:bg-red-50 transition disabled:opacity-50"
                          title="Delete Product"
                        >
                          {deleteId === p.id ? (
                            <Loader2 className="w-4 h-4 animate-spin text-[#D30005]" />
                          ) : (
                            <Trash2 className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={deleteModalOpen}
        onConfirm={handleDeleteConfirm}
        onCancel={handleDeleteCancel}
        title="Delete Product"
        description="Are you sure you want to delete this product? All variants and photos will be permanently removed from the store."
        isDeleting={isDeleting}
      />
    </div>
  );
}
