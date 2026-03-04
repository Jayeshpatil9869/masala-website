"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";
import { Plus, Trash2, Loader2, ArrowLeft, Upload, X } from "lucide-react";
import { slugify } from "@/lib/utils";
import { useRouter, useParams } from "next/navigation";

type Variant = { id?: string; weight_label: string; price: string };
type Category = { id: string; name: string };

export default function EditProductPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const supabase = createClient();

  const [categories, setCategories] = useState<Category[]>([]);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
    name: "", slug: "", description: "", long_description: "", category_id: "",
  });
  const [variants, setVariants] = useState<Variant[]>([]);
  const [existingImages, setExistingImages] = useState<string[]>([]);
  const [newImageFiles, setNewImageFiles] = useState<File[]>([]);
  const [newImagePreviews, setNewImagePreviews] = useState<string[]>([]);

  useEffect(() => {
    async function load() {
      const [{ data: product }, { data: cats }, { data: variantData }] = await Promise.all([
        supabase.from("products").select("*").eq("id", id).single(),
        supabase.from("categories").select("id, name").order("name"),
        supabase.from("product_variants").select("*").eq("product_id", id).order("price"),
      ]);
      if (product) {
        setForm({
          name: product.name, slug: product.slug,
          description: product.description ?? "",
          long_description: product.long_description ?? "",
          category_id: product.category_id ?? "",
        });
        setExistingImages(product.images ?? []);
      }
      if (cats) setCategories(cats);
      if (variantData) setVariants(variantData.map((v: any) => ({ id: v.id, weight_label: v.weight_label, price: String(v.price) })));
      setLoading(false);
    }
    load();
  }, [id]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setNewImageFiles((prev) => [...prev, ...files]);
    setNewImagePreviews((prev) => [...prev, ...files.map((f) => URL.createObjectURL(f))]);
  };

  const removeExistingImage = (url: string) => setExistingImages((prev) => prev.filter((u) => u !== url));
  const removeNewImage = (idx: number) => {
    setNewImageFiles((prev) => prev.filter((_, i) => i !== idx));
    setNewImagePreviews((prev) => prev.filter((_, i) => i !== idx));
  };

  const addVariant = () => setVariants((prev) => [...prev, { weight_label: "", price: "" }]);
  const removeVariant = (idx: number) => setVariants((prev) => prev.filter((_, i) => i !== idx));
  const updateVariant = (idx: number, field: keyof Variant, value: string) =>
    setVariants((prev) => prev.map((v, i) => i === idx ? { ...v, [field]: value } : v));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const uploadedUrls: string[] = [];
      for (const file of newImageFiles) {
        const ext = file.name.split(".").pop();
        const path = `products/${form.slug}/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
        const { error } = await supabase.storage.from("product-images").upload(path, file, { upsert: true });
        if (error) throw error;
        const { data: urlData } = supabase.storage.from("product-images").getPublicUrl(path);
        uploadedUrls.push(urlData.publicUrl);
      }

      const finalImages = [...existingImages, ...uploadedUrls];

      const { error: productError } = await supabase.from("products").update({
        name: form.name, slug: form.slug,
        description: form.description, long_description: form.long_description,
        category_id: form.category_id || null, images: finalImages,
      }).eq("id", id);

      if (productError) throw productError;

      // Delete all old variants, re-insert
      await supabase.from("product_variants").delete().eq("product_id", id);
      const validVariants = variants.filter((v) => v.weight_label && v.price);
      if (validVariants.length > 0) {
        const { error: varError } = await supabase.from("product_variants").insert(
          validVariants.map((v) => ({ product_id: id, weight_label: v.weight_label, price: parseFloat(v.price) }))
        );
        if (varError) throw varError;
      }

      toast.success("Product updated successfully!");
      router.push("/products");
    } catch (err: any) {
      toast.error(err.message || "Failed to update product");
    }
    setSaving(false);
  };

  if (loading) return (
    <div className="flex items-center justify-center py-32">
      <Loader2 className="w-8 h-8 animate-spin text-orange-500" />
    </div>
  );

  return (
    <div>
      <div className="flex items-center gap-3 mb-8">
        <button onClick={() => router.back()} className="p-2 rounded-xl hover:bg-gray-100 transition text-gray-500">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Edit Product</h1>
          <p className="text-sm text-gray-500 mt-0.5">{form.name}</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 max-w-3xl">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <h2 className="font-semibold text-gray-900 mb-5">Basic Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wider">Product Name *</label>
              <input required value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value, slug: slugify(e.target.value) })}
                className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 bg-gray-50"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wider">Slug *</label>
              <input required value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })}
                className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 bg-gray-50 font-mono"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wider">Category</label>
              <select value={form.category_id} onChange={(e) => setForm({ ...form, category_id: e.target.value })}
                className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 bg-gray-50"
              >
                <option value="">-- Select Category --</option>
                {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            </div>
          </div>
          <div className="mt-4">
            <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wider">Short Description</label>
            <input value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })}
              className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 bg-gray-50"
            />
          </div>
          <div className="mt-4">
            <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wider">Long Description</label>
            <textarea value={form.long_description} onChange={(e) => setForm({ ...form, long_description: e.target.value })}
              rows={4} className="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 bg-gray-50 resize-none"
            />
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <h2 className="font-semibold text-gray-900 mb-5">Product Images</h2>
          <div className="grid grid-cols-4 gap-3 mb-4">
            {existingImages.map((url, i) => (
              <div key={url} className="relative aspect-square rounded-xl overflow-hidden bg-gray-100 group">
                <img src={url} alt="" className="w-full h-full object-cover" />
                <button type="button" onClick={() => removeExistingImage(url)}
                  className="absolute top-1 right-1 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                  <X className="w-3 h-3" />
                </button>
              </div>
            ))}
            {newImagePreviews.map((src, i) => (
              <div key={i} className="relative aspect-square rounded-xl overflow-hidden bg-gray-100 group border-2 border-dashed border-orange-300">
                <img src={src} alt="" className="w-full h-full object-cover" />
                <button type="button" onClick={() => removeNewImage(i)}
                  className="absolute top-1 right-1 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                  <X className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>
          <label className="flex flex-col items-center justify-center border-2 border-dashed border-gray-200 rounded-xl py-6 cursor-pointer hover:border-orange-400 hover:bg-orange-50/30 transition">
            <Upload className="w-6 h-6 text-gray-300 mb-1.5" />
            <p className="text-sm text-gray-500 font-medium">Add more images</p>
            <input type="file" accept="image/*" multiple onChange={handleImageChange} className="hidden" />
          </label>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-semibold text-gray-900">Variants</h2>
            <button type="button" onClick={addVariant}
              className="flex items-center gap-2 px-3 py-2 text-xs font-semibold text-orange-600 bg-orange-50 hover:bg-orange-100 rounded-lg transition">
              <Plus className="w-3 h-3" /> Add
            </button>
          </div>
          <div className="space-y-3">
            {variants.map((v, i) => (
              <div key={i} className="flex items-center gap-3">
                <input value={v.weight_label} onChange={(e) => updateVariant(i, "weight_label", e.target.value)}
                  placeholder="100g"
                  className="flex-1 px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 bg-gray-50 font-mono"
                />
                <input type="number" value={v.price} onChange={(e) => updateVariant(i, "price", e.target.value)}
                  placeholder="Price (₹)"
                  className="flex-1 px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 bg-gray-50"
                />
                <button type="button" onClick={() => removeVariant(i)}
                  className="p-2.5 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="flex gap-3">
          <button type="button" onClick={() => router.back()}
            className="px-5 py-2.5 border border-gray-200 text-gray-600 text-sm font-medium rounded-xl hover:bg-gray-50 transition">
            Cancel
          </button>
          <button type="submit" disabled={saving}
            className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-orange-500 to-red-600 text-white text-sm font-semibold rounded-xl shadow-sm hover:shadow-md transition disabled:opacity-70">
            {saving && <Loader2 className="w-4 h-4 animate-spin" />}
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
}
