import { NextResponse } from "next/server";
import { adminClient } from "@/lib/supabase/admin";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const categoryId = searchParams.get("category");
  const search = searchParams.get("search");

  let query = adminClient
    .from("products")
    .select("*, categories(name), product_variants(count)")
    .order("created_at", { ascending: false });

  if (categoryId && categoryId !== "all") {
    query = query.eq("category_id", categoryId);
  }

  if (search) {
    query = query.ilike("name", `%${search}%`);
  }

  const { data, error } = await query;

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json(data);
}

export async function POST(request: Request) {
  const body = await request.json();
  const { variants, ...productData } = body;

  // Step 1: Insert product
  const { data: product, error: productError } = await adminClient
    .from("products")
    .insert([productData])
    .select()
    .single();

  if (productError) {
    return NextResponse.json({ error: productError.message }, { status: 500 });
  }

  // Step 2: Insert variants (if any) — runs right after product insert, no extra round-trip wait
  if (variants && variants.length > 0) {
    const variantsData = variants.map(
      (v: { weight_label: string; price: number; stock_quantity: number }) => ({
        product_id: product.id,
        weight_label: v.weight_label,
        price: v.price,
        stock_quantity: v.stock_quantity,
      }),
    );

    const { error: variantError } = await adminClient
      .from("product_variants")
      .insert(variantsData);

    if (variantError) {
      return NextResponse.json(
        { error: variantError.message, product },
        { status: 201 },
      );
    }
  }

  return NextResponse.json(product, { status: 201 });
}
