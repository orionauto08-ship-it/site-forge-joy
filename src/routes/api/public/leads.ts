import { createFileRoute } from "@tanstack/react-router";
import { createClient } from "@supabase/supabase-js";
import { z } from "zod";

const LeadItemSchema = z.object({
  title: z.string().max(300),
  brand: z.string().max(120).optional().nullable(),
  oem: z.string().max(120).optional().nullable(),
  qty: z.number().int().min(1).max(999),
  price: z.number().nullable().optional(),
});

const LeadSchema = z.object({
  source: z.enum(["cart", "contacts", "parts", "cars"]).default("contacts"),
  name: z.string().trim().min(1).max(120),
  phone: z.string().trim().min(3).max(40),
  email: z.string().trim().email().max(200).optional().or(z.literal("")).nullable(),
  message: z.string().trim().max(2000).optional().nullable(),
  items: z.array(LeadItemSchema).max(100).optional().nullable(),
  total_amount: z.number().nullable().optional(),
  page_url: z.string().max(500).optional().nullable(),
});

async function sendTelegram(text: string) {
  const apiKey = process.env.TELEGRAM_API_KEY;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  const lovableKey = process.env.LOVABLE_API_KEY;
  if (!apiKey || !chatId || !lovableKey) {
    console.warn("Telegram not configured");
    return;
  }
  try {
    const res = await fetch("https://connector-gateway.lovable.dev/telegram/sendMessage", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${lovableKey}`,
        "X-Connection-Api-Key": apiKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: chatId,
        text,
        parse_mode: "HTML",
        disable_web_page_preview: true,
      }),
    });
    if (!res.ok) {
      const body = await res.text();
      console.error(`Telegram sendMessage failed [${res.status}]: ${body}`);
    }
  } catch (e) {
    console.error("Telegram error", e);
  }
}

function escapeHtml(s: string) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function formatTelegram(data: z.infer<typeof LeadSchema>) {
  const sourceMap: Record<string, string> = {
    cart: "🛒 Корзина",
    contacts: "✉️ Форма контактов",
    parts: "🔧 Запчасти",
    cars: "🚘 Автомобили",
  };
  const lines = [
    `<b>Новая заявка — ${sourceMap[data.source] ?? data.source}</b>`,
    `<b>Имя:</b> ${escapeHtml(data.name)}`,
    `<b>Телефон:</b> ${escapeHtml(data.phone)}`,
  ];
  if (data.email) lines.push(`<b>Email:</b> ${escapeHtml(data.email)}`);
  if (data.message) lines.push(`<b>Сообщение:</b> ${escapeHtml(data.message)}`);
  if (data.items && data.items.length) {
    lines.push("", "<b>Позиции:</b>");
    data.items.slice(0, 30).forEach((it, i) => {
      const price = it.price != null ? `${(it.price * it.qty).toLocaleString("ru-BY")} BYN` : "по запросу";
      lines.push(
        `${i + 1}. ${escapeHtml(it.title)} ${it.oem ? `(${escapeHtml(it.oem)})` : ""} × ${it.qty} — ${price}`,
      );
    });
    if (data.total_amount) {
      lines.push("", `<b>Итого ориентировочно:</b> ${data.total_amount.toLocaleString("ru-BY")} BYN`);
    }
  }
  if (data.page_url) lines.push("", `<i>${escapeHtml(data.page_url)}</i>`);
  return lines.join("\n");
}

export const Route = createFileRoute("/api/public/leads")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        let raw: unknown;
        try {
          raw = await request.json();
        } catch {
          return Response.json({ error: "Invalid JSON" }, { status: 400 });
        }

        const parsed = LeadSchema.safeParse(raw);
        if (!parsed.success) {
          return Response.json({ error: "Validation failed", details: parsed.error.flatten() }, { status: 400 });
        }
        const data = parsed.data;

        const userAgent = request.headers.get("user-agent")?.slice(0, 500) ?? null;

        // 1) Telegram first — независимо от БД
        try {
          await sendTelegram(formatTelegram(data));
        } catch (e) {
          console.error("Telegram send failed", e);
        }

        // 2) Пробуем сохранить в БД, но ошибка не валит заявку
        let insertedId: string | null = null;
        try {
          const supabase = createClient(
            process.env.SUPABASE_URL!,
            process.env.SUPABASE_SERVICE_ROLE_KEY!,
            { auth: { autoRefreshToken: false, persistSession: false } },
          );

          const { data: inserted, error } = await supabase
            .from("leads")
            .insert({
              source: data.source,
              name: data.name,
              phone: data.phone,
              email: data.email || null,
              message: data.message || null,
              items: data.items ?? null,
              total_amount: data.total_amount ?? null,
              page_url: data.page_url ?? null,
              user_agent: userAgent,
            })
            .select("id")
            .single();

          if (error) {
            console.error("Lead insert failed", error);
          } else {
            insertedId = inserted.id as string;
          }
        } catch (e) {
          console.error("Lead DB error", e);
        }

        return Response.json({ ok: true, id: insertedId });
      },
    },
  },
});
