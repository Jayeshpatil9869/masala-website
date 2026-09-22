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
  X,
  Upload,
} from "lucide-react";
import { formatDate, slugify } from "@/lib/utils";
import DeleteConfirmModal from "@/components/admin/DeleteConfirmModal";
import Image from "next/image";

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
    const client = createClient();
    const { data } = await client
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
  }, []);

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

      toast.success(editItem ? "Category updated successfully!" : "Category created successfully!");
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
      toast.success("Category removed");
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
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl sm:text-4xl text-[#111111] uppercase tracking-wide">
            Categories
          </h1>
          <p className="text-sm text-[#707072] mt-0.5">
            Organize spices, whole seeds, pooja specials, and blend collections.
          </p>
        </div>
        <button
          onClick={() => openDialog()}
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-[#111111] hover:bg-[#222222] text-white text-xs font-semibold rounded-xl transition shadow-sm btn-press-active w-full sm:w-auto"
        >
          <Plus className="w-4 h-4" /> Add Category
        </button>
      </div>

      {/* Main Table / List Container */}
      <div className="bg-white rounded-2xl border border-[#EAEAEA] shadow-sm overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-24">
            <Loader2 className="w-7 h-7 animate-spin text-[#111111]" />
          </div>
        ) : categories.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center px-4">
            <div className="w-12 h-12 rounded-2xl bg-[#F5F5F5] flex items-center justify-center mb-3">
              <Tags className="w-6 h-6 text-[#9E9EA0]" />
            </div>
            <p className="text-sm font-semibold text-[#111111]">No categories yet</p>
            <p className="text-xs text-[#707072] mt-1 max-w-sm">
              Create your first category like &quot;Pooja Special Masala&quot; or &quot;Pure Spices&quot; to begin.
            </p>
            <button
              onClick={() => openDialog()}
              className="mt-4 px-4 py-2 bg-[#111111] text-white text-xs font-semibold rounded-xl hover:bg-[#222222] transition"
            >
              + Create Category
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-[#EAEAEA] bg-[#FAFAFA] text-[11px] font-bold text-[#707072] uppercase tracking-wider">
                  <th className="px-5 py-3.5">Image</th>
                  <th className="px-5 py-3.5">Category Name</th>
                  <th className="hidden sm:table-cell px-5 py-3.5">Slug / URL</th>
                  <th className="px-5 py-3.5">Products</th>
                  <th className="hidden md:table-cell px-5 py-3.5">Date Created</th>
                  <th className="text-right px-5 py-3.5">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F0F0F0]">
                {categories.map((cat) => (
                  <tr
                    key={cat.id}
                    className="hover:bg-[#FAFAFA] transition-colors cursor-pointer group"
                    onClick={() => openDialog(cat)}
                  >
                    <td className="px-5 py-4">
                      <div className="relative w-11 h-11 rounded-xl bg-[#F5F5F5] border border-[#EAEAEA] overflow-hidden flex-shrink-0 group-hover:border-[#111111] transition-all">
                        {cat.image_url ? (
                          <Image
                            src={cat.image_url}
                            alt={cat.name}
                            fill
                            sizes="44px"
                            className="object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-[#9E9EA0]">
                            <ImageIcon className="w-5 h-5" />
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <p className="font-semibold text-[#111111] group-hover:text-[#D30005] transition-colors">
                        {cat.name}
                      </p>
                      {cat.description && (
                        <p className="text-xs text-[#707072] mt-0.5 line-clamp-1 max-w-xs">
                          {cat.description}
                        </p>
                      )}
                    </td>
                    <td className="hidden sm:table-cell px-5 py-4">
                      <span className="font-mono text-xs bg-[#F5F5F5] text-[#4B4B4D] px-2.5 py-1 rounded-md border border-[#EAEAEA]">
                        {cat.slug}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 bg-[#F5F5F5] text-[#111111] text-xs font-semibold rounded-full border border-[#EAEAEA]">
                        {cat.product_count} items
                      </span>
                    </td>
                    <td className="hidden md:table-cell px-5 py-4 text-xs text-[#707072]">
                      {formatDate(cat.created_at)}
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            openDialog(cat);
                          }}
                          className="p-2 rounded-lg text-[#707072] hover:text-[#111111] hover:bg-[#F5F5F5] transition"
                          title="Edit Category"
                        >
                          <Pencil className="w-4 h-4" />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            openDeleteModal(cat.id);
                          }}
                          disabled={deleteId === cat.id}
                          className="p-2 rounded-lg text-[#707072] hover:text-[#D30005] hover:bg-red-50 transition disabled:opacity-50"
                          title="Delete Category"
                        >
                          {deleteId === cat.id ? (
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

      {/* Edit / Create Dialog */}
      {dialogOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
            onClick={() => setDialogOpen(false)}
          />
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 sm:p-7 z-10 border border-[#EAEAEA]">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h2 className="font-bold text-lg text-[#111111]">
                  {editItem ? "Edit Category" : "New Category"}
                </h2>
                <p className="text-xs text-[#707072] mt-0.5">
                  {editItem ? "Update existing category details" : "Add a new spice category to your catalog"}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setDialogOpen(false)}
                className="p-1.5 rounded-lg text-[#707072] hover:bg-[#F5F5F5] transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#4B4B4D] mb-1.5">
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
                  placeholder="e.g. Pooja Special Masala"
                  className="w-full px-3.5 py-2.5 bg-[#F9F9F9] border border-[#E5E5E5] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#111111] focus:bg-white text-[#111111]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#4B4B4D] mb-1.5">
                  Slug / URL Handle *
                </label>
                <input
                  required
                  value={form.slug}
                  onChange={(e) => setForm({ ...form, slug: e.target.value })}
                  placeholder="pooja-special-masala"
                  className="w-full px-3.5 py-2.5 bg-[#F9F9F9] border border-[#E5E5E5] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#111111] focus:bg-white text-[#111111] font-mono text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#4B4B4D] mb-1.5">
                  Description
                </label>
                <textarea
                  value={form.description}
                  onChange={(e) =>
                    setForm({ ...form, description: e.target.value })
                  }
                  rows={2}
                  placeholder="Brief description for customers and SEO..."
                  className="w-full px-3.5 py-2.5 bg-[#F9F9F9] border border-[#E5E5E5] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#111111] focus:bg-white text-[#111111] resize-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#4B4B4D] mb-1.5">
                  Category Banner Image
                </label>
                {imagePreview && (
                  <div className="mb-2.5 w-20 h-20 rounded-xl overflow-hidden border border-[#EAEAEA] relative">
                    <img
                      src={imagePreview}
                      alt="preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <label className="flex items-center gap-2 px-3.5 py-2.5 border border-dashed border-[#CACACB] hover:border-[#111111] rounded-xl cursor-pointer bg-[#F9F9F9] hover:bg-[#F5F5F5] transition">
                  <Upload className="w-4 h-4 text-[#707072]" />
                  <span className="text-xs font-medium text-[#4B4B4D]">
                    {imageFile ? imageFile.name : "Upload category image"}
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>
              </div>

              <div className="flex gap-2.5 pt-3">
                <button
                  type="button"
                  onClick={() => setDialogOpen(false)}
                  className="flex-1 px-4 py-2.5 border border-[#E5E5E5] text-[#4B4B4D] hover:bg-[#F5F5F5] text-xs font-semibold rounded-xl transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-[#111111] hover:bg-[#222222] text-white text-xs font-semibold rounded-xl transition disabled:opacity-70 btn-press-active shadow-sm"
                >
                  {saving && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                  {saving ? "Saving..." : editItem ? "Save Changes" : "Create Category"}
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
