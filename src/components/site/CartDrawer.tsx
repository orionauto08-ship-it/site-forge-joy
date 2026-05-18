import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { useCart } from "@/lib/cart-store";
import { Minus, Plus, Trash2, ShoppingBag, CheckCircle2, Loader2 } from "lucide-react";
import { submitLead } from "@/lib/submit-lead";
import { toast } from "sonner";

export function CartDrawer() {
  const { items, isOpen, close, setQty, remove, total, count, clear } = useCart();
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [agree, setAgree] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;
    if (!agree) {
      toast.error("Подтвердите согласие на обработку персональных данных.");
      return;
    }
    setSubmitting(true);
    try {
      await submitLead({
        source: "cart",
        name,
        phone,
        total_amount: total || null,
        items: items.map((i) => ({
          title: i.product.title,
          brand: i.product.brand ?? null,
          oem: i.product.oem ?? null,
          qty: i.qty,
          price: i.product.price ?? null,
        })),
      });
      setSubmitted(true);
      setTimeout(() => {
        clear();
        setSubmitted(false);
        setPhone("");
        setName("");
        close();
      }, 2200);
    } catch (err) {
      console.error(err);
      toast.error("Не удалось отправить заявку. Попробуйте ещё раз или позвоните нам.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={(v) => (v ? null : close())}>
      <SheetContent side="right" className="w-full sm:max-w-md flex flex-col p-0">
        <SheetHeader className="px-6 pt-6 pb-4 border-b border-border">
          <SheetTitle className="font-display text-2xl flex items-center gap-2">
            <ShoppingBag size={20} className="text-forest" /> Корзина-заявка
          </SheetTitle>
          <SheetDescription>
            {count > 0 ? `Позиций: ${count}` : "Здесь будут собранные позиции"}
          </SheetDescription>
        </SheetHeader>

        {submitted ? (
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
            <CheckCircle2 size={48} className="text-forest" />
            <div className="mt-4 font-display font-bold text-xl">Заявка принята</div>
            <p className="mt-2 text-sm text-foreground/70">
              Менеджер свяжется в течение рабочего часа и пришлёт КП с документами.
            </p>
          </div>
        ) : items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
            <ShoppingBag size={40} className="text-foreground/30" />
            <div className="mt-4 font-display font-bold text-lg">Корзина пуста</div>
            <p className="mt-2 text-sm text-foreground/60 max-w-xs">
              Добавьте позиции из каталога — мы соберём их в одну заявку и пришлём прайс с документами.
            </p>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-3">
              {items.map(({ product, qty }) => (
                <div key={product.id} className="rounded-xl border border-border bg-card p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <div className="text-[10px] uppercase tracking-widest text-brown font-semibold">{product.brand}</div>
                      <div className="mt-1 font-medium text-sm leading-snug">{product.title}</div>
                      <div className="mt-1 text-xs text-foreground/60 font-mono">{product.oem}</div>
                    </div>
                    <button
                      onClick={() => remove(product.id)}
                      className="text-foreground/50 hover:text-destructive shrink-0"
                      aria-label="Удалить"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                  <div className="mt-3 flex items-center justify-between">
                    <div className="inline-flex items-center rounded-lg border border-border">
                      <button
                        onClick={() => setQty(product.id, qty - 1)}
                        className="h-8 w-8 inline-flex items-center justify-center hover:bg-cream"
                        aria-label="Уменьшить"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="w-8 text-center text-sm font-semibold">{qty}</span>
                      <button
                        onClick={() => setQty(product.id, qty + 1)}
                        className="h-8 w-8 inline-flex items-center justify-center hover:bg-cream"
                        aria-label="Увеличить"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                    <div className="font-display font-bold">{product.price != null ? `${(product.price * qty).toLocaleString("ru-BY")} BYN` : "По запросу"}</div>
                  </div>
                </div>
              ))}
            </div>

            <form onSubmit={handleSubmit} className="border-t border-border px-6 py-5 space-y-3 bg-cream/30">
              <div className="flex items-center justify-between">
                <span className="text-sm text-foreground/70">Итого ориентировочно</span>
                <span className="font-display font-bold text-xl">{total.toLocaleString("ru-BY")} BYN</span>
              </div>
              <p className="text-[11px] text-foreground/60">
                Итоговая стоимость и наличие подтверждаются менеджером. Это заявка, не оплата.
              </p>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Имя"
                required
                className="w-full h-11 px-4 rounded-xl border border-border bg-background focus:outline-none focus:border-forest"
              />
              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                type="tel"
                placeholder="Телефон"
                required
                className="w-full h-11 px-4 rounded-xl border border-border bg-background focus:outline-none focus:border-forest"
              />
              <button
                type="submit"
                disabled={submitting}
                className="w-full h-12 rounded-xl surface-forest font-semibold inline-flex items-center justify-center gap-2 disabled:opacity-60"
              >
                {submitting ? (<><Loader2 size={16} className="animate-spin" /> Отправляем…</>) : "Отправить заявку"}
              </button>
              <button
                type="button"
                onClick={clear}
                className="w-full h-10 rounded-xl text-sm text-foreground/60 hover:text-foreground"
              >
                Очистить корзину
              </button>
            </form>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
