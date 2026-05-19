import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { supabaseAdmin } from "@/integrations/supabase/client.server";
import { clearPartsCache } from "./parts.functions";

async function assertAdmin(userId: string) {
  const { data, error } = await supabaseAdmin
    .from("user_roles")
    .select("role")
    .eq("user_id", userId);
  if (error) throw new Error(error.message);
  const roles = (data ?? []).map((r) => r.role);
  if (!roles.includes("admin") && !roles.includes("manager")) {
    throw new Error("Forbidden: admin role required");
  }
}

export type AdminPart = {
  id: string;
  category: string;
  brand: string;
  title: string;
  oem: string;
  oem_eng: string | null;
  fits: string;
  price: number | null;
  stock: "in_stock" | "on_order";
  sort_order: number;
};

const partInput = z.object({
  category: z.string().trim().min(1).max(200),
  brand: z.string().trim().min(1).max(200),
  title: z.string().trim().min(1).max(500),
  oem: z.string().trim().max(200).default(""),
  oem_eng: z.string().trim().max(200).nullable().optional(),
  fits: z.string().trim().max(2000).default(""),
  price: z.number().nullable(),
  stock: z.enum(["in_stock", "on_order"]),
  sort_order: z.number().int().default(0),
});

export const adminWhoAmI = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { data } = await supabaseAdmin
      .from("user_roles")
      .select("role")
      .eq("user_id", context.userId);
    const roles = (data ?? []).map((r) => r.role);
    return { userId: context.userId, roles, isAdmin: roles.includes("admin") || roles.includes("manager") };
  });

export const claimFirstAdmin = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { data, error } = await context.supabase.rpc("claim_admin_if_none");
    if (error) throw new Error(error.message);
    return { claimed: data === true };
  });

export const adminListParts = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }): Promise<AdminPart[]> => {
    await assertAdmin(context.userId);
    const { data, error } = await supabaseAdmin
      .from("parts")
      .select("id, category, brand, title, oem, oem_eng, fits, price, stock, sort_order")
      .order("sort_order", { ascending: true })
      .order("title", { ascending: true })
      .limit(10000);
    if (error) throw new Error(error.message);
    return (data ?? []).map((r) => ({
      ...r,
      price: r.price != null ? Number(r.price) : null,
      stock: r.stock as "in_stock" | "on_order",
    }));
  });

export const adminCreatePart = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) => partInput.parse(input))
  .handler(async ({ context, data }) => {
    await assertAdmin(context.userId);
    const { data: row, error } = await supabaseAdmin.from("parts").insert(data).select().single();
    if (error) throw new Error(error.message);
    clearPartsCache();
    return row;
  });

export const adminUpdatePart = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) => partInput.extend({ id: z.string().uuid() }).parse(input))
  .handler(async ({ context, data }) => {
    await assertAdmin(context.userId);
    const { id, ...rest } = data;
    const { data: row, error } = await supabaseAdmin
      .from("parts")
      .update(rest)
      .eq("id", id)
      .select()
      .single();
    if (error) throw new Error(error.message);
    clearPartsCache();
    return row;
  });

export const adminDeletePart = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) => z.object({ id: z.string().uuid() }).parse(input))
  .handler(async ({ context, data }) => {
    await assertAdmin(context.userId);
    const { error } = await supabaseAdmin.from("parts").delete().eq("id", data.id);
    if (error) throw new Error(error.message);
    clearPartsCache();
    return { ok: true };
  });
