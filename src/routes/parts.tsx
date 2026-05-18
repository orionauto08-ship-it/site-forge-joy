import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { Layout } from "@/components/site/Layout";
import { Faq } from "@/components/site/Faq";
import { Search, ShieldCheck, FileText, Award, ArrowRight, Plus, Check } from "lucide-react";
import type { Product } from "@/lib/parts-catalog";
import { getParts } from "@/lib/parts.functions";
import { useCart } from "@/lib/cart-store";
import heroParts from "@/assets/hero-parts.jpg";

const partsQueryOptions = () =>
  queryOptions({
    queryKey: ["parts"],
    queryFn: () => getParts(),
    staleTime: 5 * 60 * 1000,
  });

export const Route = createFileRoute("/parts")({
  head: () => ({
    meta: [
      { title: "Каталог запасных частей | Орионавто" },
      { name: "description", content: "Каталог оригинальных автозапчастей: BYD, Zeekr, LiXiang, Changan, Chery, Voyah, Volkswagen, Audi и др. Корзина-заявка, документы подлинности, доставка." },
      { property: "og:title", content: "Каталог оригинальных запасных частей" },
      { property: "og:description", content: "Запчасти под заказ и в наличии для китайских и европейских брендов. С документами подлинности." },
    ],
  }),
  loader: ({ context }) => context.queryClient.ensureQueryData(partsQueryOptions()),
  component: PartsPage,
});

const faq = [
  { q: "Как подтвердить оригинальность?", a: "Каждая позиция сопровождается сертификатами, декларациями соответствия или паспортами качества. Документы прилагаются к заказу." },
  { q: "Как подобрать нужную деталь?", a: "Укажите марку, модель, год выпуска и артикул (если есть) — мы проверим совместимость и предложим оригинальные варианты." },
  { q: "Как работает корзина?", a: "Корзина — это заявка на расчёт. Добавьте позиции, оставьте контакты — менеджер подтвердит наличие, сроки и итоговую цену с документами." },
  { q: "Какие сроки под заказ?", a: "Зависят от позиции и поставщика. Точные сроки согласовываем перед заказом." },
  { q: "Есть ли скидки для СТО?", a: "Да, до 10% за объём при регулярных закупках. Условия обсуждаем индивидуально." },
];

type StockFilter = "all" | "in_stock" | "on_order";

function PartsPage() {
  const { data: products } = useSuspenseQuery(partsQueryOptions());

  const [query, setQuery] = useState("");
  const [brand, setBrand] = useState<string | null>(null);
  const [category, setCategory] = useState<string | null>(null);
  const [stock, setStock] = useState<StockFilter>("all");
  const { add, open: openCart, items } = useCart();
  const [justAdded, setJustAdded] = useState<string | null>(null);

  const { categories, brands } = useMemo(() => {
    const cats = new Map<string, number>();
    const brs = new Map<string, number>();
    for (const p of products) {
      cats.set(p.category, (cats.get(p.category) ?? 0) + 1);
      brs.set(p.brand, (brs.get(p.brand) ?? 0) + 1);
    }
    return {
      categories: Array.from(cats.entries()).sort((a, b) => b[1] - a[1]).map(([c]) => c),
      brands: Array.from(brs.entries()).sort((a, b) => b[1] - a[1]).map(([b]) => b),
    };
  }, [products]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return products.filter((p) => {
      if (brand && p.brand !== brand) return false;
      if (category && p.category !== category) return false;
      if (stock !== "all" && p.stock !== stock) return false;
      if (q) {
        const hay = `${p.title} ${p.oem} ${p.oemEng ?? ""} ${p.brand} ${p.fits}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  }, [products, query, brand, category, stock]);

  const handleAdd = (p: Product) => {
    add(p);
    setJustAdded(p.id);
    setTimeout(() => setJustAdded((id) => (id === p.id ? null : id)), 1500);
  };

  const reset = () => {
    setQuery("");
    setBrand(null);
    setCategory(null);
    setStock("all");
  };

  return (
    <Layout>
      {/* HERO */}
      <section className="container-page pt-10 md:pt-16">
        <div className="relative rounded-3xl overflow-hidden p-8 md:p-14 min-h-[440px] md:min-h-[520px]">
          <img
            src={heroParts}
            alt="Каталог автозапчастей"
            className="absolute inset-0 h-full w-full object-cover"
            width={2000}
            height={1200}
            fetchPriority="high"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-foreground/85 via-foreground/65 to-foreground/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-transparent to-transparent md:hidden" />

          <div className="relative text-background">
            <span className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-sand font-semibold">
              <span className="h-1.5 w-1.5 rounded-full bg-sand" /> Каталог
            </span>
            <h1 className="mt-5 text-4xl md:text-6xl font-display font-extrabold tracking-tight max-w-3xl leading-[1.05]">
              Оригинальные запасные части <span className="text-sand">с подтверждённой подлинностью</span>
            </h1>
            <p className="mt-5 text-background/85 max-w-2xl">
              BYD, Zeekr, LiXiang, Changan, Chery, Voyah · Volkswagen, Audi и не только. Соберите позиции в корзину — менеджер пришлёт прайс с документами.
            </p>

            <div className="mt-8 grid md:grid-cols-[1fr_auto] gap-3 max-w-3xl">
              <div className="flex items-center gap-3 h-14 px-4 rounded-2xl bg-background border border-border focus-within:border-forest transition-colors text-foreground">
                <Search size={20} className="text-forest" />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="flex-1 bg-transparent outline-none text-base"
                  placeholder="Артикул, OEM или название"
                />
              </div>
              <button
                onClick={() => {
                  document.getElementById("catalog")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="h-14 px-6 rounded-2xl surface-forest font-semibold inline-flex items-center justify-center gap-2"
              >
                К результатам <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Trust badges */}
      <section className="container-page mt-10 grid md:grid-cols-4 gap-4">
        {[
          { i: ShieldCheck, t: "Только оригинал" },
          { i: FileText, t: "Сертификаты, декларации, паспорта качества" },
          { i: Award, t: "20 лет опыта в автобизнесе" },
          { i: ShieldCheck, t: "Без серых деталей" },
        ].map((x) => (
          <div key={x.t} className="rounded-2xl bg-card border border-border p-5 flex items-start gap-3">
            <x.i size={22} className="text-forest mt-0.5" />
            <div className="font-medium">{x.t}</div>
          </div>
        ))}
      </section>

      {/* CATALOG */}
      <section id="catalog" className="container-page mt-16">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-3 mb-6">
          <div>
            <div className="text-xs uppercase tracking-widest text-brown font-semibold">Каталог</div>
            <h2 className="mt-2 text-3xl md:text-4xl font-display font-bold">Запчасти в наличии и под заказ</h2>
            <p className="mt-2 text-sm text-foreground/60">Всего в базе: <span className="font-semibold text-foreground">{products.length}</span> позиций</p>
          </div>
          <div className="text-sm text-foreground/60">
            Найдено: <span className="font-semibold text-foreground">{filtered.length}</span> · в корзине: <span className="font-semibold text-foreground">{items.length}</span>
          </div>
        </div>

        <div className="grid lg:grid-cols-[260px_1fr] gap-6">
          {/* Filters */}
          <aside className="rounded-2xl bg-card border border-border p-5 h-fit lg:sticky lg:top-24">
            <div className="flex items-center justify-between">
              <div className="font-display font-bold">Фильтры</div>
              <button onClick={reset} className="text-xs text-forest hover:underline">Сбросить</button>
            </div>

            <div className="mt-5">
              <div className="text-[11px] uppercase tracking-widest text-brown font-semibold mb-2">Наличие</div>
              <div className="grid grid-cols-3 gap-1 rounded-lg bg-cream/60 p-1 text-xs font-medium">
                {([
                  { v: "all", l: "Все" },
                  { v: "in_stock", l: "В наличии" },
                  { v: "on_order", l: "Под заказ" },
                ] as { v: StockFilter; l: string }[]).map((o) => (
                  <button
                    key={o.v}
                    onClick={() => setStock(o.v)}
                    className={`h-8 rounded-md transition-colors ${stock === o.v ? "bg-background shadow-sm text-forest font-semibold" : "text-foreground/70 hover:text-foreground"}`}
                  >
                    {o.l}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-5">
              <div className="text-[11px] uppercase tracking-widest text-brown font-semibold mb-2">Категория</div>
              <div className="flex flex-col gap-1 max-h-[360px] overflow-y-auto pr-1">
                {categories.map((c) => (
                  <button
                    key={c}
                    onClick={() => setCategory((cur) => (cur === c ? null : c))}
                    className={`text-left px-3 py-2 rounded-lg text-sm transition-colors ${category === c ? "bg-cream text-forest font-semibold" : "hover:bg-cream/60"}`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-5">
              <div className="text-[11px] uppercase tracking-widest text-brown font-semibold mb-2">Бренд</div>
              <div className="flex flex-wrap gap-1.5">
                {brands.map((b) => (
                  <button
                    key={b}
                    onClick={() => setBrand((cur) => (cur === b ? null : b))}
                    className={`px-2.5 py-1.5 rounded-md text-xs font-semibold border transition-colors ${brand === b ? "border-forest bg-forest text-forest-foreground" : "border-border hover:border-forest hover:text-forest"}`}
                  >
                    {b}
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* Grid */}
          <div>
            {filtered.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-border p-10 text-center">
                <div className="font-display font-bold text-lg">Ничего не найдено</div>
                <p className="mt-2 text-sm text-foreground/60">Попробуйте сбросить фильтры или оставьте заявку — подберём вручную.</p>
                <Link to="/contacts" className="mt-5 inline-flex items-center gap-2 h-11 px-5 rounded-xl surface-forest font-semibold text-sm">
                  Запросить подбор <ArrowRight size={16} />
                </Link>
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
                {filtered.map((p) => (
                  <article key={p.id} className="group rounded-2xl bg-card border border-border p-5 flex flex-col hover:border-forest/40 hover:-translate-y-0.5 transition-all">
                    <div className="flex items-start justify-between gap-2">
                      <div className="text-[10px] uppercase tracking-widest text-brown font-semibold">{p.brand} · {p.category}</div>
                      {p.stock === "in_stock" ? (
                        <span className="text-[10px] uppercase tracking-wider font-semibold text-forest bg-cream px-2 py-0.5 rounded-md whitespace-nowrap">В наличии</span>
                      ) : (
                        <span className="text-[10px] uppercase tracking-wider font-semibold text-brown bg-sand px-2 py-0.5 rounded-md whitespace-nowrap">Под заказ</span>
                      )}
                    </div>

                    <h3 className="mt-3 font-display font-bold text-base leading-snug min-h-[3rem]">{p.title}</h3>

                    <div className="mt-3 space-y-1 text-xs text-foreground/65">
                      {p.oem && <div><span className="text-foreground/50">OEM:</span> <span className="font-mono">{p.oem}</span></div>}
                      {p.oemEng && <div><span className="text-foreground/50">Инж. №:</span> <span className="font-mono">{p.oemEng}</span></div>}
                      {p.fits && <div><span className="text-foreground/50">Применимость:</span> {p.fits}</div>}
                    </div>

                    <div className="mt-5 flex items-center justify-between gap-3 pt-4 border-t border-border">
                      <div>
                        <div className="text-[10px] uppercase tracking-widest text-foreground/50">Цена</div>
                        <div className="font-display font-bold text-lg">
                          {p.price != null ? `${p.price.toLocaleString("ru-BY")} BYN` : "По запросу"}
                        </div>
                      </div>
                      <button
                        onClick={() => handleAdd(p)}
                        className={`inline-flex items-center gap-1.5 h-10 px-4 rounded-xl text-sm font-semibold transition-colors ${justAdded === p.id ? "surface-cream text-forest" : "surface-forest hover:opacity-95"}`}
                      >
                        {justAdded === p.id ? (<><Check size={16} /> Добавлено</>) : (<><Plus size={16} /> В корзину</>)}
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            )}

            {items.length > 0 && (
              <div className="mt-6 rounded-2xl surface-forest p-5 flex flex-wrap items-center justify-between gap-3">
                <div className="text-sm">
                  В корзине {items.length} {items.length === 1 ? "позиция" : "позиций"} — отправьте заявку, и менеджер подтвердит наличие и пришлёт прайс с документами.
                </div>
                <button
                  onClick={openCart}
                  className="inline-flex items-center gap-2 h-11 px-5 rounded-xl bg-background text-foreground font-semibold text-sm hover:bg-background/90"
                >
                  Открыть корзину <ArrowRight size={16} />
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Почему Орионавто */}
      <section className="container-page mt-20">
        <div className="grid lg:grid-cols-12 gap-6">
          <div className="lg:col-span-5">
            <div className="text-xs uppercase tracking-widest text-brown font-semibold">Почему Орионавто</div>
            <h3 className="mt-3 text-3xl md:text-4xl font-display font-bold">
              Ориентир в мире, где трудно отличить оригинал от копии.
            </h3>
            <p className="mt-4 text-foreground/70 max-w-md">
              Работаем для СТО, детейлинг-студий и автовладельцев, которым важно ставить только то, в чём уверены. К каждой позиции — сертификаты, декларации и паспорта качества.
            </p>
          </div>
          <div className="lg:col-span-7 grid sm:grid-cols-2 gap-4">
            {[
              { i: FileText, t: "Документы", d: "Сертификаты, декларации соответствия, паспорта качества." },
              { i: Award, t: "20 лет опыта", d: "Команда специалистов с многолетним стажем в автобизнесе." },
              { i: ShieldCheck, t: "Без серых деталей", d: "Не везём аналоги, восстановленные и фабричные копии." },
              { i: ShieldCheck, t: "Надёжная логистика", d: "Склад ходовых позиций и понятные сроки под заказ." },
            ].map((f) => (
              <div key={f.t} className="rounded-2xl surface-cream p-6">
                <f.i size={28} className="text-forest" />
                <div className="mt-4 font-display font-bold text-lg">{f.t}</div>
                <div className="mt-1 text-sm text-foreground/70">{f.d}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Как мы работаем */}
      <section className="container-page mt-16">
        <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">Как мы работаем</h2>
        <div className="grid md:grid-cols-5 gap-4">
          {["Заявка", "Проверка и подбор", "Согласование", "Оплата", "Отгрузка / доставка"].map((s, i) => (
            <div key={s} className="rounded-2xl bg-card border border-border p-5">
              <div className="text-3xl font-display font-extrabold text-forest">0{i + 1}</div>
              <div className="mt-2 font-semibold">{s}</div>
            </div>
          ))}
        </div>
      </section>

      <Faq items={faq} />

      <section className="container-page mt-16">
        <div className="rounded-3xl surface-sand p-8 md:p-12 flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
          <div>
            <h3 className="text-2xl md:text-3xl font-display font-bold">Нужен точный подбор или коммерческое предложение?</h3>
            <p className="mt-2 text-foreground/80 max-w-xl">Оставьте заявку — соберём предложение под вашу модель и бюджет.</p>
          </div>
          <Link to="/contacts" className="inline-flex items-center gap-2 h-12 px-6 rounded-xl surface-forest font-semibold">
            Связаться <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </Layout>
  );
}
