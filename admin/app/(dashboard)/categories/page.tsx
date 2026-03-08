"use client";

import { useState, useEffect, useCallback } from "react";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";
import {
  Plus,
  Pencil,
  Trash2,
  Tags,
  Image as ImageIcon,
  Loader2,
} from "lucide-react";
import { formatDate, slugify } from "@/lib/utils";
import DeleteConfirmModal from "@/components/admin/DeleteConfirmModal";

type Category = {
  id: string;
  name: string;
  slug: string;
  image_url: string | null;
  description: string | null;
  created_at: string;
  product_count?: number;
};

export default function CategoriesPage() {
  const supabase = createClient();
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editItem, setEditItem] = useState<Category | null>(null);
  const [saving, setSaving] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const [form, setForm] = useState({
    name: "",
    slug: "",
    description: "",
    image_url: "",
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    const { data } = await supabase
      .from("categories")
      .select("*, products(count)")
      .order("created_at", { ascending: false });

    if (data) {
      type RawCategory = {
        id: string;
        name: string;
        slug: string;
        image_url: string | null;
        description: string | null;
        created_at: string;
        products?: { count: number }[];
      };
      setCategories(
        (data as RawCategory[]).map((c) => ({
          id: c.id,
          name: c.name,
          slug: c.slug,
          image_url: c.image_url,
          description: c.description,
          created_at: c.created_at,
          product_count: c.products?.[0]?.count ?? 0,
        })),
      );
    }
    setLoading(false);
  }, [supabase]);

  useEffect(() => {
    load();
  }, [load]);

  const openDialog = (item?: Category) => {
    if (item) {
      setEditItem(item);
      setForm({
        name: item.name,
        slug: item.slug,
        description: item.description ?? "",
        image_url: item.image_url ?? "",
      });
      setImagePreview(item.image_url ?? null);
    } else {
      setEditItem(null);
      setForm({ name: "", slug: "", description: "", image_url: "" });
      setImagePreview(null);
      setImageFile(null);
    }
    setDialogOpen(true);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    let imageUrl = form.image_url;

    if (imageFile) {
      const ext = imageFile.name.split(".").pop();
      const path = `categories/${form.slug}-${Date.now()}.${ext}`;
      const { error: uploadError } = await supabase.storage
        .from("product-images")
        .upload(path, imageFile, { upsert: true });

      if (uploadError) {
        toast.error("Image upload failed: " + uploadError.message);
        setSaving(false);
        return;
      }

      const { data: urlData } = supabase.storage
        .from("product-images")
        .getPublicUrl(path);
      imageUrl = urlData.publicUrl;
    }

    const payload = {
      name: form.name,
      slug: form.slug,
      description: form.description,
      image_url: imageUrl,
    };

    try {
      let res;
      if (editItem) {
        res = await fetch(`/api/admin/categories/${editItem.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      } else {
        res = await fetch("/api/admin/categories", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      }

      const data = await res.json();
      if (!res.ok) {
        throw new Error(
          data.error || `Failed to ${editItem ? "update" : "create"} category`,
        );
      }

      toast.success(editItem ? "Category updated!" : "Category created!");
      setDialogOpen(false);
      load();
    } catch (error: unknown) {
      toast.error(
        error instanceof Error ? error.message : "Failed to save category",
      );
    } finally {
      setSaving(false);
    }
  };

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
      const res = await fetch(`/api/admin/categories/${pendingDeleteId}`, {
        method: "DELETE",
      });
      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Failed to delete category");

      setCategories(categories.filter((c) => c.id !== pendingDeleteId));
      toast.success("Category deleted");
      setDeleteModalOpen(false);
      setPendingDeleteId(null);
    } catch (error: unknown) {
      toast.error(
        error instanceof Error ? error.message : "Failed to delete category",
      );
    } finally {
      setIsDeleting(false);
      setDeleteId(null);
    }
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Categories</h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage product categories
          </p>
        </div>
        <button
          onClick={() => openDialog()}
          className="flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-orange-500 to-red-600 text-white text-sm font-semibold rounded-xl shadow-sm hover:shadow-md transition w-full sm:w-auto"
        >
          <Plus className="w-4 h-4" /> Add Category
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-6 h-6 animate-spin text-orange-500" />
          </div>
        ) : categories.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <Tags className="w-10 h-10 text-gray-200 mb-3" />
            <p className="text-sm text-gray-400">
              No categories yet. Add your first category!
            </p>
          </div>
        ) : (
          <div className="overflow-auto max-h-[calc(100vh-250px)]">
            <table className="w-full text-sm relative">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50/95 backdrop-blur-sm sticky top-0 z-10 shadow-sm">
                  <th className="text-left px-4 sm:px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Image
                  </th>
                  <th className="text-left px-4 sm:px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="hidden sm:table-cell text-left px-4 sm:px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Slug
                  </th>
                  <th className="text-left px-4 sm:px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Products
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
                {categories.map((cat) => (
                  <tr
                    key={cat.id}
                    className="hover:bg-orange-50/30 transition-colors cursor-pointer"
                    onClick={() => openDialog(cat)}
                  >
                    <td className="px-4 sm:px-6 py-4">
                      <div className="w-10 h-10 rounded-lg bg-gray-100 overflow-hidden">
                        {cat.image_url ? (
                          <img
                            src={cat.image_url}
                            alt={cat.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <ImageIcon className="w-4 h-4 text-gray-300" />
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-4 sm:px-6 py-4">
                      <p className="font-medium text-gray-900">{cat.name}</p>
                      {cat.description && (
                        <p className="text-xs text-gray-400 mt-0.5 line-clamp-1">
                          {cat.description}
                        </p>
                      )}
                    </td>
                    <td className="hidden sm:table-cell px-4 sm:px-6 py-4">
                      <span className="font-mono text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                        {cat.slug}
                      </span>
                    </td>
                    <td className="px-4 sm:px-6 py-4">
                      <span className="text-gray-600 font-medium">
                        {cat.product_count}
                      </span>
                    </td>
                    <td className="hidden sm:table-cell px-4 sm:px-6 py-4 text-gray-400">
                      {formatDate(cat.created_at)}
                    </td>
                    <td className="px-4 sm:px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            openDialog(cat);
                          }}
                          className="p-2 rounded-lg text-gray-400 hover:text-orange-500 hover:bg-orange-50 transition"
                        >
                          <Pencil className="w-4 h-4" />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            openDeleteModal(cat.id);
                          }}
                          disabled={deleteId === cat.id}
                          className="p-2 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition disabled:opacity-50"
                        >
                          {deleteId === cat.id ? (
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

      {/* Edit / Create Dialog */}
      {dialogOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/30 backdrop-blur-sm"
            onClick={() => setDialogOpen(false)}
          />
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 z-10">
            <h2 className="text-lg font-bold text-gray-900 mb-6">
              {editItem ? "Edit Category" : "Add Category"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wider">
                  Category Name *
                </label>
                <input
                  required
                  value={form.name}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      name: e.target.value,
                      slug: slugify(e.target.value),
                    })
                  }
                  placeholder="e.g. Pure Spices"
                  className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 bg-gray-50"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wider">
                  Slug *
                </label>
                <input
                  required
                  value={form.slug}
                  onChange={(e) => setForm({ ...form, slug: e.target.value })}
                  placeholder="pure-spices"
                  className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 bg-gray-50 font-mono"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wider">
                  Description
                </label>
                <textarea
                  value={form.description}
                  onChange={(e) =>
                    setForm({ ...form, description: e.target.value })
                  }
                  rows={2}
                  placeholder="Short description..."
                  className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 bg-gray-50 resize-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wider">
                  Category Image
                </label>
                {imagePreview && (
                  <div className="mb-2 w-20 h-20 rounded-xl overflow-hidden border border-gray-200">
                    <img
                      src={imagePreview}
                      alt="preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="w-full text-sm text-gray-500 file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-orange-50 file:text-orange-600 hover:file:bg-orange-100"
                />
              </div>
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setDialogOpen(false)}
                  className="flex-1 px-4 py-2.5 border border-gray-200 text-gray-600 text-sm font-medium rounded-xl hover:bg-gray-50 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-orange-500 to-red-600 text-white text-sm font-semibold rounded-xl transition disabled:opacity-70"
                >
                  {saving && <Loader2 className="w-4 h-4 animate-spin" />}
                  {saving ? "Saving..." : editItem ? "Save Changes" : "Create"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={deleteModalOpen}
        onConfirm={handleDeleteConfirm}
        onCancel={handleDeleteCancel}
        title="Delete Category"
        description="Are you sure you want to delete this category? This action cannot be undone and may affect associated products."
        isDeleting={isDeleting}
      />
    </div>
  );
}
