import { createServerFn } from "@tanstack/react-start";
import { supabaseAdmin } from "@/integrations/supabase/client.server";
import type { Product } from "./parts-catalog";

// In-memory кэш в воркере на 5 минут — снижает число запросов к БД на популярные страницы.
let cache: { data: Product[]; ts: number } | null = null;
const TTL_MS = 5 * 60 * 1000;

export const getParts = createServerFn({ method: "GET" }).handler(async (): Promise<Product[]> => {
  if (cache && Date.now() - cache.ts < TTL_MS) return cache.data;

  const { data, error } = await supabaseAdmin
    .from("parts")
    .select("id, category, brand, title, oem, oem_eng, fits, price, stock, sort_order")
    .order("sort_order", { ascending: true })
    .limit(10000);

  if (error) {
    throw new Error(`Failed to load parts from database: ${error.message}`);
  }

  const products: Product[] = (data ?? []).map((row) => ({
    id: row.id,
    category: row.category,
    brand: row.brand,
    title: row.title,
    oem: row.oem ?? "",
    oemEng: row.oem_eng ?? undefined,
    fits: row.fits ?? "",
    price: row.price != null ? Number(row.price) : null,
    stock: row.stock as Product["stock"],
  }));

  cache = { data: products, ts: Date.now() };
  return products;
});
