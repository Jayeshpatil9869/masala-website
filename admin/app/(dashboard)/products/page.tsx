"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";
import { Plus, Pencil, Trash2, Package, Loader2, Search } from "lucide-react";
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

// Lazy-loaded image with skeleton placeholder
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
      <div className="w-full h-full flex items-center justify-center bg-gray-100">
        <Package className="w-5 h-5 text-gray-300" />
      </div>
    );
  }

  return (
    <>
      {!loaded && (
        <div className="absolute inset-0 bg-gray-100 animate-pulse rounded-xl" />
      )}
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 640px) 40px, 48px"
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
    const { data: cats } = await supabase
      .from("categories")
      .select("id, name")
      .order("name");
    if (cats) setCategories(cats);
  }, [supabase]);

  const loadProducts = useCallback(
    async (catId: string, searchTerm: string) => {
      setLoading(true);
      try {
        let url = "/api/admin/products";
        const params = new URLSearchParams();
        if (catId && catId !== "all") {
          params.append("category", catId);
        }
        if (searchTerm) {
          params.append("search", searchTerm);
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
    loadProducts(filterCat, search);
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

  // Skeleton rows shown while loading
  const SkeletonRow = () => (
    <tr className="border-b border-gray-50">
      <td className="px-4 sm:px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gray-100 animate-pulse flex-shrink-0" />
          <div className="space-y-2 flex-1">
            <div className="h-3.5 bg-gray-100 animate-pulse rounded w-32" />
            <div className="h-3 bg-gray-100 animate-pulse rounded w-20" />
          </div>
        </div>
      </td>
      <td className="px-4 sm:px-6 py-4">
        <div className="h-6 bg-gray-100 animate-pulse rounded-full w-24" />
      </td>
      <td className="hidden sm:table-cell px-4 sm:px-6 py-4">
        <div className="h-3.5 bg-gray-100 animate-pulse rounded w-16" />
      </td>
      <td className="hidden sm:table-cell px-4 sm:px-6 py-4">
        <div className="h-3.5 bg-gray-100 animate-pulse rounded w-20" />
      </td>
      <td className="px-4 sm:px-6 py-4">
        <div className="flex items-center justify-end gap-2">
          <div className="w-8 h-8 rounded-lg bg-gray-100 animate-pulse" />
          <div className="w-8 h-8 rounded-lg bg-gray-100 animate-pulse" />
        </div>
      </td>
    </tr>
  );

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Products</h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage your spice product catalog
          </p>
        </div>
        <Link
          href="/products/new"
          className="flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-orange-500 to-red-600 text-white text-sm font-semibold rounded-xl shadow-sm hover:shadow-md transition w-full sm:w-auto"
        >
          <Plus className="w-4 h-4" /> Add Product
        </Link>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search products..."
            className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white"
          />
        </div>
        <select
          value={filterCat}
          onChange={(e) => setFilterCat(e.target.value)}
          className="px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white"
        >
          <option value="">All Categories</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        {/* Always render the table shell — show skeletons while loading */}
        {!loading && products.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <Package className="w-10 h-10 text-gray-200 mb-3" />
            <p className="text-sm text-gray-400">
              {search
                ? "No products match your search."
                : "No products yet. Add your first product!"}
            </p>
          </div>
        ) : (
          <div className="overflow-auto max-h-[calc(100vh-250px)]">
            <table className="w-full text-sm relative">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50/95 backdrop-blur-sm sticky top-0 z-10 shadow-sm">
                  <th className="text-left px-4 sm:px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Product
                  </th>
                  <th className="text-left px-4 sm:px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="hidden sm:table-cell text-left px-4 sm:px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Variants
                  </th>
                  <th className="hidden sm:table-cell text-left px-4 sm:px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Created
                  </th>
                  <th className="text-right px-4 sm:px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {loading
                  ? // Show 8 skeleton rows while fetching
                    Array.from({ length: 8 }).map((_, i) => (
                      <SkeletonRow key={i} />
                    ))
                  : products.map((p) => (
                      <tr
                        key={p.id}
                        className="hover:bg-orange-50/30 transition-colors cursor-pointer"
                        onClick={() => router.push(`/products/${p.id}/edit`)}
                      >
                        <td className="px-4 sm:px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="relative w-10 h-10 sm:w-12 sm:h-12 rounded-xl overflow-hidden flex-shrink-0">
                              <LazyProductImage
                                src={p.images?.[0]}
                                alt={p.name}
                              />
                            </div>
                            <div className="min-w-0">
                              <p className="font-medium text-gray-900 truncate max-w-[120px] sm:max-w-none">
                                {p.name}
                              </p>
                              <p className="text-xs text-gray-400 font-mono truncate max-w-[120px] sm:max-w-none">
                                {p.slug}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 sm:px-6 py-4">
                          <span className="inline-flex px-2.5 py-1 bg-orange-50 text-orange-600 text-xs font-medium rounded-full whitespace-nowrap">
                            {p.categories?.name ?? "Uncategorized"}
                          </span>
                        </td>
                        <td className="hidden sm:table-cell px-4 sm:px-6 py-4">
                          <span className="text-gray-600 font-medium">
                            {p.product_variants?.[0]?.count ?? 0} sizes
                          </span>
                        </td>
                        <td className="hidden sm:table-cell px-4 sm:px-6 py-4 text-gray-400">
                          {formatDate(p.created_at)}
                        </td>
                        <td className="px-4 sm:px-6 py-4">
                          <div className="flex items-center justify-end gap-2">
                            <Link
                              href={`/products/${p.id}/edit`}
                              className="p-2 rounded-lg text-gray-400 hover:text-orange-500 hover:bg-orange-50 transition"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <Pencil className="w-4 h-4" />
                            </Link>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                openDeleteModal(p.id);
                              }}
                              disabled={deleteId === p.id}
                              className="p-2 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition disabled:opacity-50"
                            >
                              {deleteId === p.id ? (
                                <Loader2 className="w-4 h-4 animate-spin" />
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
        description="Are you sure you want to delete this product? All associated variants and data will be permanently removed. This action cannot be undone."
        isDeleting={isDeleting}
      />
    </div>
  );
}
