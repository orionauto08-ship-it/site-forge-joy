export type LeadSource = "cart" | "contacts" | "parts" | "cars";

export interface LeadItem {
  title: string;
  brand?: string | null;
  oem?: string | null;
  qty: number;
  price?: number | null;
}

export interface LeadPayload {
  source: LeadSource;
  name: string;
  phone: string;
  email?: string | null;
  message?: string | null;
  items?: LeadItem[] | null;
  total_amount?: number | null;
  page_url?: string | null;
}

export async function submitLead(payload: LeadPayload) {
  const res = await fetch("/api/public/leads", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      ...payload,
      page_url: payload.page_url ?? (typeof window !== "undefined" ? window.location.href : null),
    }),
  });
  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`Не удалось отправить заявку (${res.status}): ${body}`);
  }
  return res.json() as Promise<{ ok: true; id: string }>;
}
