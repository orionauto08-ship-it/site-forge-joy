import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useEffect, useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import {
  adminWhoAmI,
  adminListParts,
  adminCreatePart,
  adminUpdatePart,
  adminDeletePart,
  claimFirstAdmin,
  type AdminPart,
} from "@/lib/admin-parts.functions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

export const Route = createFileRoute("/admin")({
  component: AdminPage,
  head: () => ({ meta: [{ title: "Админка — Орионавто" }, { name: "robots", content: "noindex" }] }),
});

type Session = { userId: string; email: string | null } | null;

function AdminPage() {
  const [session, setSession] = useState<Session>(null);
  const [checking, setChecking] = useState(true);
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);

  const whoAmI = useServerFn(adminWhoAmI);
  const claim = useServerFn(claimFirstAdmin);

  const refreshRole = useCallback(async () => {
    try {
      const r = await whoAmI();
      setIsAdmin(r.isAdmin);
    } catch {
      setIsAdmin(false);
    }
  }, [whoAmI]);

  useEffect(() => {
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => {
      if (s?.user) {
        setSession({ userId: s.user.id, email: s.user.email ?? null });
        setTimeout(() => refreshRole(), 0);
      } else {
        setSession(null);
        setIsAdmin(null);
      }
    });
    supabase.auth.getSession().then(({ data }) => {
      if (data.session?.user) {
        setSession({ userId: data.session.user.id, email: data.session.user.email ?? null });
        refreshRole().finally(() => setChecking(false));
      } else {
        setChecking(false);
      }
    });
    return () => sub.subscription.unsubscribe();
  }, [refreshRole]);

  if (checking) {
    return <div className="flex min-h-screen items-center justify-center text-muted-foreground">Загрузка…</div>;
  }

  if (!session) return <LoginForm />;

  if (isAdmin === null) {
    return <div className="flex min-h-screen items-center justify-center text-muted-foreground">Проверка прав…</div>;
  }

  if (!isAdmin) {
    return (
      <div className="mx-auto max-w-md p-6 space-y-4 text-center">
        <h1 className="text-2xl font-bold">Нет доступа</h1>
        <p className="text-sm text-muted-foreground">
          У этого аккаунта ({session.email}) нет роли администратора.
        </p>
        <Button
          onClick={async () => {
            try {
              const r = await claim();
              if (r.claimed) {
                toast.success("Вы стали первым администратором");
                await refreshRole();
              } else {
                toast.error("Администратор уже существует. Попросите его выдать вам роль.");
              }
            } catch (e) {
              toast.error(String((e as Error).message ?? e));
            }
          }}
        >
          Стать первым администратором
        </Button>
        <Button variant="outline" className="ml-2" onClick={() => supabase.auth.signOut()}>
          Выйти
        </Button>
      </div>
    );
  }

  return <PartsCrud email={session.email} />;
}

function LoginForm() {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    try {
      if (mode === "login") {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        toast.success("Вход выполнен");
      } else {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: `${window.location.origin}/admin` },
        });
        if (error) throw error;
        toast.success("Аккаунт создан. Проверьте почту для подтверждения, затем войдите.");
      }
    } catch (e) {
      toast.error(String((e as Error).message ?? e));
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="mx-auto max-w-sm p-6 mt-16 space-y-4">
      <h1 className="text-2xl font-bold">Админка — {mode === "login" ? "Вход" : "Регистрация"}</h1>
      <form onSubmit={submit} className="space-y-3">
        <div>
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div>
          <Label htmlFor="password">Пароль</Label>
          <Input id="password" type="password" required minLength={6} value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <Button type="submit" disabled={busy} className="w-full">
          {busy ? "…" : mode === "login" ? "Войти" : "Создать аккаунт"}
        </Button>
      </form>
      <button
        type="button"
        className="text-sm text-muted-foreground underline"
        onClick={() => setMode(mode === "login" ? "signup" : "login")}
      >
        {mode === "login" ? "Создать первый аккаунт администратора" : "Уже есть аккаунт — войти"}
      </button>
    </div>
  );
}

const EMPTY: Omit<AdminPart, "id"> = {
  category: "",
  brand: "",
  title: "",
  oem: "",
  oem_eng: null,
  fits: "",
  price: null,
  stock: "on_order",
  sort_order: 0,
};

function PartsCrud({ email }: { email: string | null }) {
  const [items, setItems] = useState<AdminPart[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [editing, setEditing] = useState<AdminPart | null>(null);
  const [creating, setCreating] = useState(false);

  const list = useServerFn(adminListParts);
  const create = useServerFn(adminCreatePart);
  const update = useServerFn(adminUpdatePart);
  const del = useServerFn(adminDeletePart);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const rows = await list();
      setItems(rows);
    } catch (e) {
      toast.error(String((e as Error).message ?? e));
    } finally {
      setLoading(false);
    }
  }, [list]);

  useEffect(() => { load(); }, [load]);

  const filtered = items.filter((p) => {
    if (!search) return true;
    const q = search.toLowerCase();
    return (
      p.title.toLowerCase().includes(q) ||
      p.brand.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.oem.toLowerCase().includes(q)
    );
  });

  return (
    <div className="mx-auto max-w-7xl p-6 space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold">Каталог запчастей</h1>
          <p className="text-sm text-muted-foreground">{email} · всего: {items.length}</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={() => setCreating(true)}>Добавить</Button>
          <Button variant="outline" onClick={() => supabase.auth.signOut()}>Выйти</Button>
        </div>
      </div>

      <Input placeholder="Поиск по названию, бренду, категории, OEM…" value={search} onChange={(e) => setSearch(e.target.value)} />

      {loading ? (
        <p className="text-muted-foreground">Загрузка…</p>
      ) : (
        <div className="overflow-x-auto border rounded-md">
          <table className="w-full text-sm">
            <thead className="bg-muted">
              <tr className="text-left">
                <th className="p-2">Категория</th>
                <th className="p-2">Бренд</th>
                <th className="p-2">Название</th>
                <th className="p-2">OEM</th>
                <th className="p-2">Цена</th>
                <th className="p-2">Наличие</th>
                <th className="p-2">Порядок</th>
                <th className="p-2 w-32">Действия</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((p) => (
                <tr key={p.id} className="border-t">
                  <td className="p-2">{p.category}</td>
                  <td className="p-2">{p.brand}</td>
                  <td className="p-2">{p.title}</td>
                  <td className="p-2 font-mono text-xs">{p.oem}</td>
                  <td className="p-2">{p.price ?? "—"}</td>
                  <td className="p-2">{p.stock === "in_stock" ? "В наличии" : "Под заказ"}</td>
                  <td className="p-2">{p.sort_order}</td>
                  <td className="p-2">
                    <div className="flex gap-1">
                      <Button size="sm" variant="outline" onClick={() => setEditing(p)}>Изм.</Button>
                      <Button size="sm" variant="destructive" onClick={async () => {
                        if (!confirm(`Удалить «${p.title}»?`)) return;
                        try {
                          await del({ data: { id: p.id } });
                          toast.success("Удалено");
                          load();
                        } catch (e) {
                          toast.error(String((e as Error).message ?? e));
                        }
                      }}>×</Button>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr><td colSpan={8} className="p-4 text-center text-muted-foreground">Ничего не найдено</td></tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {(editing || creating) && (
        <PartDialog
          initial={editing ?? { id: "", ...EMPTY }}
          isNew={creating}
          onClose={() => { setEditing(null); setCreating(false); }}
          onSubmit={async (form) => {
            try {
              if (creating) {
                const { id: _id, ...rest } = form;
                await create({ data: rest });
                toast.success("Создано");
              } else {
                await update({ data: form });
                toast.success("Сохранено");
              }
              setEditing(null); setCreating(false);
              load();
            } catch (e) {
              toast.error(String((e as Error).message ?? e));
            }
          }}
        />
      )}
    </div>
  );
}

function PartDialog({ initial, isNew, onClose, onSubmit }: {
  initial: AdminPart;
  isNew: boolean;
  onClose: () => void;
  onSubmit: (data: AdminPart) => Promise<void>;
}) {
  const [form, setForm] = useState<AdminPart>(initial);
  const [busy, setBusy] = useState(false);

  const upd = <K extends keyof AdminPart>(k: K, v: AdminPart[K]) => setForm((f) => ({ ...f, [k]: v }));

  return (
    <Dialog open onOpenChange={(o) => { if (!o) onClose(); }}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{isNew ? "Новая запчасть" : "Редактирование"}</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="sm:col-span-2">
            <Label>Название</Label>
            <Input value={form.title} onChange={(e) => upd("title", e.target.value)} />
          </div>
          <div>
            <Label>Категория</Label>
            <Input value={form.category} onChange={(e) => upd("category", e.target.value)} />
          </div>
          <div>
            <Label>Бренд</Label>
            <Input value={form.brand} onChange={(e) => upd("brand", e.target.value)} />
          </div>
          <div>
            <Label>OEM</Label>
            <Input value={form.oem} onChange={(e) => upd("oem", e.target.value)} />
          </div>
          <div>
            <Label>OEM (англ.)</Label>
            <Input value={form.oem_eng ?? ""} onChange={(e) => upd("oem_eng", e.target.value || null)} />
          </div>
          <div className="sm:col-span-2">
            <Label>Применимость (fits)</Label>
            <Input value={form.fits} onChange={(e) => upd("fits", e.target.value)} />
          </div>
          <div>
            <Label>Цена, BYN (пусто = «По запросу»)</Label>
            <Input
              type="number"
              step="0.01"
              value={form.price ?? ""}
              onChange={(e) => upd("price", e.target.value === "" ? null : Number(e.target.value))}
            />
          </div>
          <div>
            <Label>Наличие</Label>
            <Select value={form.stock} onValueChange={(v) => upd("stock", v as AdminPart["stock"])}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="in_stock">В наличии</SelectItem>
                <SelectItem value="on_order">Под заказ</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Порядок сортировки</Label>
            <Input
              type="number"
              value={form.sort_order}
              onChange={(e) => upd("sort_order", Number(e.target.value) || 0)}
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Отмена</Button>
          <Button disabled={busy} onClick={async () => {
            setBusy(true);
            try { await onSubmit(form); } finally { setBusy(false); }
          }}>{busy ? "…" : "Сохранить"}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
