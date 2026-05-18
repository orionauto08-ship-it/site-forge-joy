import { createServerFn } from "@tanstack/react-start";
import type { Product, Stock } from "./parts-catalog";

const SHEET_ID = "1WR8i3S-Sx4-6ex4oIIiljwrvK6gM3cQV-TkQQoQ9b8A";
const RANGE = "A2:H10000";
const GATEWAY_URL = "https://connector-gateway.lovable.dev/google_sheets/v4";

type SheetResponse = { values?: string[][] };

// Простой in-memory кэш в воркере на 5 минут — снижает нагрузку на Google API.
let cache: { data: Product[]; ts: number } | null = null;
const TTL_MS = 5 * 60 * 1000;

function parsePrice(raw: string | undefined): number | null {
  if (!raw) return null;
  const cleaned = raw.replace(/\s|\u00A0/g, "").replace(",", ".");
  const n = Number.parseFloat(cleaned);
  return Number.isFinite(n) && n > 0 ? n : null;
}

function parseStock(raw: string | undefined): Stock {
  const v = (raw ?? "").trim().toLowerCase();
  if (v.startsWith("в налич")) return "in_stock";
  return "on_order";
}

export const getParts = createServerFn({ method: "GET" }).handler(async (): Promise<Product[]> => {
  if (cache && Date.now() - cache.ts < TTL_MS) return cache.data;

  const LOVABLE_API_KEY = process.env.LOVABLE_API_KEY;
  if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

  const GOOGLE_SHEETS_API_KEY = process.env.GOOGLE_SHEETS_API_KEY;
  if (!GOOGLE_SHEETS_API_KEY) throw new Error("GOOGLE_SHEETS_API_KEY is not configured");

  const url = `${GATEWAY_URL}/spreadsheets/${SHEET_ID}/values/${RANGE}`;
  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${LOVABLE_API_KEY}`,
      "X-Connection-Api-Key": GOOGLE_SHEETS_API_KEY,
    },
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Google Sheets request failed [${res.status}]: ${body}`);
  }

  const json = (await res.json()) as SheetResponse;
  const rows = json.values ?? [];

  const products: Product[] = rows
    .map((row, idx): Product | null => {
      const [category, brand, title, oem, oemEng, fits, price, stock] = row;
      if (!title || !title.trim()) return null;
      return {
        id: `row-${idx + 2}`,
        category: (category ?? "Без категории").trim(),
        brand: (brand ?? "").trim() || "—",
        title: title.trim(),
        oem: (oem ?? "").trim(),
        oemEng: (oemEng ?? "").trim() || undefined,
        fits: (fits ?? "").trim(),
        price: parsePrice(price),
        stock: parseStock(stock),
      };
    })
    .filter((p): p is Product => p !== null);

  cache = { data: products, ts: Date.now() };
  return products;
});
