"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";
import { Plus, Trash2, Loader2, ArrowLeft, Upload, X, Package, Layers } from "lucide-react";
import { slugify, getFriendlyErrorMessage } from "@/lib/utils";
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
    name: "",
    slug: "",
    description: "",
    long_description: "",
    category_id: "",
  });
  const [variants, setVariants] = useState<Variant[]>([]);
  const [existingImages, setExistingImages] = useState<string[]>([]);
  const [newImageFiles, setNewImageFiles] = useState<File[]>([]);
  const [newImagePreviews, setNewImagePreviews] = useState<string[]>([]);

  useEffect(() => {
    async function load() {
      const [{ data: product }, { data: cats }, { data: variantData }] =
        await Promise.all([
          supabase.from("products").select("*").eq("id", id).single(),
          supabase.from("categories").select("id, name").order("name"),
          supabase
            .from("product_variants")
            .select("*")
            .eq("product_id", id)
            .order("price"),
        ]);
      if (product) {
        setForm({
          name: product.name,
          slug: product.slug,
          description: product.description ?? "",
          long_description: product.long_description ?? "",
          category_id: product.category_id ?? "",
        });
        setExistingImages(product.images ?? []);
      }
      if (cats) setCategories(cats);
      if (variantData) {
        type RawVariant = { id: string; weight_label: string; price: number };
        setVariants(
          (variantData as RawVariant[]).map((v) => ({
            id: v.id,
            weight_label: v.weight_label,
            price: String(v.price),
          })),
        );
      }
      setLoading(false);
    }
    load();
  }, [id, supabase]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setNewImageFiles((prev) => [...prev, ...files]);
    setNewImagePreviews((prev) => [
      ...prev,
      ...files.map((f) => URL.createObjectURL(f)),
    ]);
  };

  const removeExistingImage = (url: string) =>
    setExistingImages((prev) => prev.filter((u) => u !== url));
  const removeNewImage = (idx: number) => {
    setNewImageFiles((prev) => prev.filter((_, i) => i !== idx));
    setNewImagePreviews((prev) => prev.filter((_, i) => i !== idx));
  };

  const addVariant = () =>
    setVariants((prev) => [...prev, { weight_label: "", price: "" }]);
  const removeVariant = (idx: number) =>
    setVariants((prev) => prev.filter((_, i) => i !== idx));
  const updateVariant = (idx: number, field: keyof Variant, value: string) =>
    setVariants((prev) =>
      prev.map((v, i) => (i === idx ? { ...v, [field]: value } : v)),
    );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const uploadedUrls: string[] = [];
      for (const file of newImageFiles) {
        const ext = file.name.split(".").pop();
        const path = `products/${form.slug}/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
        const { error } = await supabase.storage
          .from("product-images")
          .upload(path, file, { upsert: true });
        if (error) throw error;
        const { data: urlData } = supabase.storage
          .from("product-images")
          .getPublicUrl(path);
        uploadedUrls.push(urlData.publicUrl);
      }

      const finalImages = [...existingImages, ...uploadedUrls];

      const { error: productError } = await supabase
        .from("products")
        .update({
          name: form.name,
          slug: form.slug,
          description: form.description,
          long_description: form.long_description,
          category_id: form.category_id || null,
          images: finalImages,
        })
        .eq("id", id);

      if (productError) throw productError;

      // Delete all old variants, re-insert
      await supabase.from("product_variants").delete().eq("product_id", id);
      const validVariants = variants.filter((v) => v.weight_label && v.price);
      if (validVariants.length > 0) {
        const { error: varError } = await supabase
          .from("product_variants")
          .insert(
            validVariants.map((v) => ({
              product_id: id,
              weight_label: v.weight_label,
              price: parseFloat(v.price),
            })),
          );
        if (varError) throw varError;
      }

      toast.success("Product updated successfully!");
      router.push("/products");
    } catch (err: unknown) {
      toast.error(getFriendlyErrorMessage(err));
    }
    setSaving(false);
  };

  if (loading)
    return (
      <div className="flex items-center justify-center py-32">
        <Loader2 className="w-8 h-8 animate-spin text-[#111111]" />
      </div>
    );

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header with back button */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => router.back()}
          className="p-2 rounded-xl bg-white border border-[#E5E5E5] hover:bg-[#F5F5F5] transition text-[#4B4B4D] btn-press-active shadow-sm"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="font-display text-3xl sm:text-4xl text-[#111111] uppercase tracking-wide">
            Edit Product
          </h1>
          <p className="text-sm text-[#707072] font-medium">{form.name || "Update Catalog Entry"}</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Section 1: Basic Information */}
        <div className="bg-white rounded-2xl border border-[#EAEAEA] shadow-sm p-6 sm:p-7">
          <div className="flex items-center gap-2 mb-5 pb-3 border-b border-[#EAEAEA]">
            <Package className="w-4 h-4 text-[#111111]" />
            <h2 className="text-sm font-bold uppercase tracking-wider text-[#111111]">
              Basic Information
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#4B4B4D] mb-1.5">
                Product Title *
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
                className="w-full px-3.5 py-2.5 bg-[#F9F9F9] border border-[#E5E5E5] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#111111] focus:bg-white text-[#111111]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#4B4B4D] mb-1.5">
                URL Slug <span className="normal-case font-normal text-[#9E9EA0]">(auto-generated)</span>
              </label>
              <input
                readOnly
                tabIndex={-1}
                value={form.slug}
                className="w-full px-3.5 py-2.5 bg-[#F5F5F5] border border-[#E5E5E5] rounded-xl text-xs text-[#707072] font-mono cursor-not-allowed select-none"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-[#4B4B4D] mb-1.5">
                Category
              </label>
              <select
                value={form.category_id}
                onChange={(e) =>
                  setForm({ ...form, category_id: e.target.value })
                }
                className="w-full px-3.5 py-2.5 bg-[#F9F9F9] border border-[#E5E5E5] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#111111] focus:bg-white text-[#111111] cursor-pointer"
              >
                <option value="">-- Select Category --</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="mt-4 sm:mt-5">
            <label className="block text-xs font-bold uppercase tracking-wider text-[#4B4B4D] mb-1.5">
              Short Description
            </label>
            <input
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
              placeholder="Crisp one-sentence summary for catalog cards..."
              className="w-full px-3.5 py-2.5 bg-[#F9F9F9] border border-[#E5E5E5] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#111111] focus:bg-white text-[#111111]"
            />
          </div>

          <div className="mt-4 sm:mt-5">
            <label className="block text-xs font-bold uppercase tracking-wider text-[#4B4B4D] mb-1.5">
              Detailed Description & Origin
            </label>
            <textarea
              value={form.long_description}
              onChange={(e) =>
                setForm({ ...form, long_description: e.target.value })
              }
              rows={4}
              placeholder="Tell customers about the aroma, grinding technique, recipe pairings, and spice purity..."
              className="w-full px-3.5 py-2.5 bg-[#F9F9F9] border border-[#E5E5E5] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#111111] focus:bg-white text-[#111111] resize-none leading-relaxed"
            />
          </div>
        </div>

        {/* Section 2: Media Gallery */}
        <div className="bg-white rounded-2xl border border-[#EAEAEA] shadow-sm p-6 sm:p-7">
          <div className="flex items-center gap-2 mb-5 pb-3 border-b border-[#EAEAEA]">
            <Upload className="w-4 h-4 text-[#111111]" />
            <h2 className="text-sm font-bold uppercase tracking-wider text-[#111111]">
              Product Photography
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
            {existingImages.map((url, i) => (
              <div
                key={url}
                className="relative aspect-square rounded-xl overflow-hidden bg-[#F5F5F5] border border-[#EAEAEA] group"
              >
                <img
                  src={url}
                  alt=""
                  className="w-full h-full object-cover"
                />
                <button
                  type="button"
                  onClick={() => removeExistingImage(url)}
                  className="absolute top-2 right-2 w-7 h-7 bg-[#111111]/80 hover:bg-[#D30005] text-white rounded-full flex items-center justify-center transition shadow-md"
                  title="Remove photo"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
            {newImagePreviews.map((src, i) => (
              <div
                key={i}
                className="relative aspect-square rounded-xl overflow-hidden bg-[#F5F5F5] border-2 border-dashed border-[#111111] group"
              >
                <img
                  src={src}
                  alt=""
                  className="w-full h-full object-cover"
                />
                <button
                  type="button"
                  onClick={() => removeNewImage(i)}
                  className="absolute top-2 right-2 w-7 h-7 bg-[#111111]/80 hover:bg-[#D30005] text-white rounded-full flex items-center justify-center transition shadow-md"
                  title="Remove photo"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>

          <label className="flex flex-col items-center justify-center border-2 border-dashed border-[#CACACB] hover:border-[#111111] rounded-2xl py-6 px-4 cursor-pointer bg-[#F9F9F9] hover:bg-[#F5F5F5] transition text-center">
            <div className="w-9 h-9 rounded-xl bg-white border border-[#E5E5E5] flex items-center justify-center mb-1.5 shadow-sm">
              <Upload className="w-4 h-4 text-[#4B4B4D]" />
            </div>
            <p className="text-xs font-semibold text-[#111111]">
              Add additional photos
            </p>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageChange}
              className="hidden"
            />
          </label>
        </div>

        {/* Section 3: Variants */}
        <div className="bg-white rounded-2xl border border-[#EAEAEA] shadow-sm p-6 sm:p-7">
          <div className="flex items-center justify-between mb-5 pb-3 border-b border-[#EAEAEA]">
            <div className="flex items-center gap-2">
              <Layers className="w-4 h-4 text-[#111111]" />
              <h2 className="text-sm font-bold uppercase tracking-wider text-[#111111]">
                Weight & Price Variants
              </h2>
            </div>
            <button
              type="button"
              onClick={addVariant}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-[#111111] bg-[#F5F5F5] hover:bg-[#EAEAEA] border border-[#E5E5E5] rounded-lg transition btn-press-active"
            >
              <Plus className="w-3.5 h-3.5" /> Add Size
            </button>
          </div>

          <div className="space-y-3">
            {variants.map((v, i) => (
              <div
                key={i}
                className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 p-3 rounded-xl bg-[#F9F9F9] border border-[#EAEAEA]"
              >
                <div className="flex-1">
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-[#707072] mb-1">
                    Weight / Package Size
                  </label>
                  <input
                    value={v.weight_label}
                    onChange={(e) =>
                      updateVariant(i, "weight_label", e.target.value)
                    }
                    placeholder="e.g. 100g / 250g / 500g"
                    className="w-full px-3 py-2 bg-white border border-[#E5E5E5] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#111111] text-[#111111] font-mono text-xs"
                  />
                </div>

                <div className="flex-1">
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-[#707072] mb-1">
                    Price (INR ₹)
                  </label>
                  <input
                    type="number"
                    value={v.price}
                    onChange={(e) =>
                      updateVariant(i, "price", e.target.value)
                    }
                    placeholder="e.g. 150"
                    className="w-full px-3 py-2 bg-white border border-[#E5E5E5] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#111111] text-[#111111]"
                  />
                </div>

                <div className="flex items-end justify-end sm:pt-4">
                  <button
                    type="button"
                    onClick={() => removeVariant(i)}
                    className="p-2.5 rounded-lg text-[#707072] hover:text-[#D30005] hover:bg-red-50 transition"
                    title="Remove variant"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={() => router.back()}
            className="px-5 py-2.5 border border-[#E5E5E5] text-[#4B4B4D] hover:bg-[#F5F5F5] text-xs font-semibold rounded-xl transition"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-[#111111] hover:bg-[#222222] text-white text-xs font-semibold rounded-xl transition shadow-sm btn-press-active disabled:opacity-70"
          >
            {saving && <Loader2 className="w-4 h-4 animate-spin text-white" />}
            {saving ? "Saving Changes..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
}
