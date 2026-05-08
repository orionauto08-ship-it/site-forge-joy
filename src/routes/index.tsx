import { createFileRoute, Link } from "@tanstack/react-router";
import { Layout } from "@/components/site/Layout";
import { HeroSlider } from "@/components/site/HeroSlider";
import diamondImg from "@/assets/diamond.jpg";
import carImg from "@/assets/car-order.jpg";
import { ShieldCheck, FileText, Award, Truck, Search, Wrench, Droplets, Disc3, CircleDot, Car, ArrowRight, CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Орионавто — оригинальные автозапчасти с документами | Минск" },
      { name: "description", content: "Поставщик оригинальных автозапчастей BYD, Zeekr, LiXiang, Changan, Chery и др. Diamond ProTech. Авто под заказ. Документы подлинности на каждую позицию." },
      { property: "og:title", content: "Орионавто — оригинальные автозапчасти с документами" },
      { property: "og:description", content: "Запчасти, Diamond ProTech и авто под заказ. Только оригинал, подтверждённый документами." },
    ],
  }),
  component: HomePage,
});

const brands = ["BYD", "Zeekr", "LiXiang", "Changan", "Chery", "Voyah", "Deepal", "Leapmotor", "Xiaomi", "Volkswagen", "Audi", "Mazda", "Kia", "Renault"];

function HomePage() {
  return (
    <Layout>
      {/* HERO SLIDER */}
      <HeroSlider />

      <section className="container-page mt-6">
        <div className="rounded-2xl bg-card border border-border px-5 py-4 flex flex-wrap gap-x-8 gap-y-2 text-sm text-foreground/80">
          <span className="inline-flex items-center gap-2"><ShieldCheck size={16} className="text-forest" /> Только оригинал</span>
          <span className="inline-flex items-center gap-2"><Award size={16} className="text-forest" /> 20 лет опыта в автобизнесе</span>
          <span className="inline-flex items-center gap-2"><FileText size={16} className="text-forest" /> Сертификаты и декларации</span>
          <span className="inline-flex items-center gap-2"><CheckCircle2 size={16} className="text-forest" /> СТО и автовладельцы · РБ</span>
        </div>
      </section>

      {/* TRUST BLOCK moved into section 01 */}

      {/* THREE DIRECTIONS OVERVIEW */}
      <section className="container-page mt-20">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-3 mb-6">
          <div>
            <div className="text-xs uppercase tracking-widest text-brown font-semibold">Что мы делаем</div>
            <h2 className="mt-2 text-3xl md:text-4xl font-display font-bold">Как мы можем быть полезны</h2>
          </div>
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          {[
            {
              i: Wrench,
              eyebrow: "Направление 01",
              t: "Запасные части",
              d: "Оригинал с документами для СТО и автовладельцев. BYD, Zeekr, LiXiang, Changan, Chery и не только.",
              to: "/parts",
              cta: "Открыть каталог",
              cls: "surface-cream",
            },
            {
              i: Droplets,
              eyebrow: "Направление 02",
              t: "Diamond ProTech",
              d: "Профессиональная химия и керамические покрытия для детейлинг-студий. Эксклюзив в Беларуси.",
              to: "/diamond-protech",
              cta: "Смотреть продукты",
              cls: "surface-forest",
            },
            {
              i: Car,
              eyebrow: "Направление 03",
              t: "Авто под заказ",
              d: "Подберём именно тот автомобиль, который вы хотите: доставим, растаможим, подготовим и привезём. Поможем поставить на учёт.",
              to: "/cars-order",
              cta: "Узнать детали",
              cls: "surface-brown",
            },
          ].map((c) => (
            <Link
              key={c.t}
              to={c.to}
              className={`rounded-3xl ${c.cls} p-7 md:p-8 flex flex-col group hover:-translate-y-1 transition-transform`}
            >
              <c.i size={32} />
              <div className="mt-5 text-[11px] uppercase tracking-widest font-semibold opacity-70">{c.eyebrow}</div>
              <div className="mt-1 font-display font-bold text-2xl">{c.t}</div>
              <p className="mt-2 text-sm opacity-85 flex-1">{c.d}</p>
              <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold">
                {c.cta} <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* ───────────── НАПРАВЛЕНИЕ 01 — ЗАПАСНЫЕ ЧАСТИ ───────────── */}
      <section className="container-page mt-24">
        <div className="flex items-end justify-between mb-6">
          <div>
            <div className="text-xs uppercase tracking-widest text-brown font-semibold">01 · Запасные части</div>
            <h2 className="mt-2 text-2xl md:text-3xl font-display font-bold">Каталог запасных частей</h2>
          </div>
          <Link to="/parts" className="hidden md:inline-flex items-center gap-1 text-sm font-semibold text-forest">
            Весь каталог <ArrowRight size={16} />
          </Link>
        </div>

        <div className="bento">
          <div className="bento-card surface-forest span-2 row-2 flex flex-col justify-between min-h-[220px]">
            <div>
              <Droplets size={28} />
              <div className="mt-3 font-display font-bold text-xl">Масла и технические жидкости</div>
              <div className="mt-2 text-sm text-forest-foreground/85">Моторные масла, антифризы, трансмиссионные и тормозные жидкости.</div>
            </div>
            <div className="mt-4 inline-flex items-center gap-2 text-sm font-semibold">В наличии <ArrowRight size={16} /></div>
          </div>

          <div className="bento-card surface-cream">
            <Wrench size={24} className="text-brown" />
            <div className="mt-3 font-display font-bold text-base">Группа ТО</div>
            <div className="mt-1 text-sm text-foreground/70">Фильтры, свечи, ремни, расходники.</div>
          </div>

          <div className="bento-card">
            <CircleDot size={24} className="text-forest" />
            <div className="mt-3 font-display font-bold text-base">Подвеска</div>
            <div className="mt-1 text-sm text-foreground/70">Амортизаторы, рычаги, опоры.</div>
          </div>

          <div className="bento-card surface-cream">
            <Disc3 size={24} className="text-brown" />
            <div className="mt-3 font-display font-bold text-base">Тормозная система</div>
            <div className="mt-1 text-sm text-foreground/70">Колодки, диски, суппорты.</div>
          </div>

          <div className="bento-card surface-brown span-2">
            <Car size={24} />
            <div className="mt-3 font-display font-bold text-base">Лобовые стёкла и кузов</div>
            <div className="mt-1 text-sm text-brown-foreground/85">Кузовные элементы под заказ — для большинства марок и моделей.</div>
          </div>
        </div>

        {/* Бренды — внутри направления 01 */}
        <div className="mt-6 rounded-3xl surface-cream p-8 md:p-10">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-3 mb-6">
            <div>
              <div className="text-xs uppercase tracking-widest text-brown font-semibold">Фокус на брендах</div>
              <h3 className="mt-2 text-2xl md:text-3xl font-display font-bold">Китайские бренды и не только</h3>
            </div>
            <Link to="/parts" className="text-sm font-semibold text-forest inline-flex items-center gap-1">Открыть каталог <ArrowRight size={16} /></Link>
          </div>
          <div className="flex flex-wrap gap-2">
            {brands.map((b) => (
              <span key={b} className="px-4 py-2 rounded-xl bg-background border border-border font-display font-semibold text-sm hover:border-forest hover:text-forest transition-colors cursor-default">
                {b}
              </span>
            ))}
          </div>
        </div>

      </section>

      {/* ───────────── НАПРАВЛЕНИЕ 02 — DIAMOND PROTECH ───────────── */}
      <section className="container-page mt-24">
        <div className="mb-6">
          <div className="text-xs uppercase tracking-widest text-brown font-semibold">02 · Diamond ProTech</div>
          <h2 className="mt-2 text-3xl md:text-4xl font-display font-bold">Профессиональная защита кузова</h2>
        </div>

        <div className="rounded-3xl overflow-hidden relative min-h-[420px] md:min-h-[480px]">
          <img src={diamondImg} alt="Diamond ProTech керамическое покрытие" className="absolute inset-0 h-full w-full object-cover" loading="lazy" width={1400} height={1000} />
          <div className="absolute inset-0 bg-gradient-to-r from-foreground/85 via-foreground/55 to-transparent" />
          <div className="relative p-8 md:p-14 max-w-2xl text-background">
            <div className="text-xs uppercase tracking-widest text-sand font-semibold">Эксклюзив в РБ · производство Швейцария</div>
            <h3 className="mt-3 text-3xl md:text-5xl font-display font-bold">Защита, которой доверяют профессионалы</h3>
            <p className="mt-4 text-background/85">Патенты, лаборатория, PRO-линейка с защитой до 10 лет. Программы обучения и сертификации для детейлинг-студий.</p>
            <Link to="/diamond-protech" className="mt-6 inline-flex items-center gap-2 h-12 px-6 rounded-xl bg-background text-foreground font-semibold">
              Смотреть продукты <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* ───────────── НАПРАВЛЕНИЕ 03 — АВТО ПОД ЗАКАЗ ───────────── */}
      <section className="container-page mt-24">
        <div className="mb-6">
          <div className="text-xs uppercase tracking-widest text-brown font-semibold">03 · Авто под заказ</div>
          <h2 className="mt-2 text-3xl md:text-4xl font-display font-bold">Автомобиль вашей мечты — с безупречным сопровождением</h2>
        </div>

        <div className="rounded-3xl overflow-hidden relative min-h-[520px] md:min-h-[640px] bg-foreground">
          <img
            src={carImg}
            alt="Премиальный автомобиль под заказ"
            className="absolute inset-0 h-full w-full object-cover"
            loading="lazy"
            width={1920}
            height={1080}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground via-foreground/70 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-foreground/70 via-transparent to-transparent" />

          <div className="relative h-full p-8 md:p-14 flex flex-col justify-end text-background min-h-[520px] md:min-h-[640px]">
            <div className="max-w-2xl">
              <div className="text-[11px] uppercase tracking-[0.25em] text-background/70 font-semibold">Bespoke Delivery · Под ключ</div>
              <h3 className="mt-4 text-3xl md:text-5xl font-display font-bold leading-[1.05]">
                Создан для тех, кто привык выбирать лучшее.
              </h3>
              <p className="mt-5 text-background/85 text-lg max-w-xl">
                Мы находим автомобиль вашей мечты — в любой комплектации, в любой точке мира. Сопровождаем безупречно: от выбора до момента, когда ключи окажутся в ваших руках.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link to="/cars-order" className="inline-flex items-center gap-2 h-12 px-7 rounded-xl bg-background text-foreground font-semibold hover:bg-background/90 transition-colors">
                  Узнать детали <ArrowRight size={18} />
                </Link>
                <Link to="/contacts" className="inline-flex items-center gap-2 h-12 px-7 rounded-xl border border-background/40 text-background font-semibold hover:bg-background/10 transition-colors">
                  Персональная консультация
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Премиальные карточки услуг */}
        <div className="mt-6 grid md:grid-cols-4 gap-4">
          {[
            { t: "Индивидуальный подбор", d: "Подбираем модель и комплектацию точно под ваши пожелания и стиль жизни." },
            { t: "Глобальная логистика", d: "Прозрачный договор и контроль поставки на каждом этапе — от выкупа до доставки." },
            { t: "Таможенное сопровождение", d: "Полное оформление документов и прохождение всех формальностей — без вашего участия." },
            { t: "Подготовка и учёт", d: "Предпродажная подготовка, защита кузова и постановка на учёт за вас." },
          ].map((c) => (
            <div key={c.t} className="rounded-2xl bg-card border border-border p-6 md:p-7 flex flex-col">
              <div className="text-[11px] uppercase tracking-[0.2em] text-brown font-semibold">— Сервис</div>
              <div className="mt-3 font-display font-bold text-lg">{c.t}</div>
              <p className="mt-2 text-sm text-foreground/70 flex-1">{c.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* AUDIENCES */}
      <section className="container-page mt-24">
        <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">Для кого мы работаем</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { t: "СТО", d: "Стабильные поставки оригинальных запчастей. Скидки до 10%. Ускорение поставки для гарантийных ремонтов.", to: "/for-sto", cta: "Получить КП" },
            { t: "Автовладельцы", d: "Точный подбор оригинала с документами подлинности и прозрачными сроками.", to: "/parts", cta: "Подобрать запчасть" },
            { t: "Покупатели авто", d: "Поможем выбрать и привезти именно тот автомобиль, который хотите вы. Сопровождаем от подбора до постановки на учёт.", to: "/cars-order", cta: "Узнать детали" },
            { t: "Детейлинг-студии", d: "Diamond ProTech, PRO-линейка, программы сертификации.", to: "/diamond-protech", cta: "Условия для студий" },
          ].map((a) => (
            <div key={a.t} className="rounded-2xl bg-card border border-border p-6 md:p-8 flex flex-col">
              <div className="text-xs uppercase tracking-widest text-brown font-semibold">{a.t}</div>
              <p className="mt-3 text-foreground/80 flex-1">{a.d}</p>
              <Link to={a.to} className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-forest">{a.cta} <ArrowRight size={16} /></Link>
            </div>
          ))}
        </div>
      </section>


      {/* B2B + FINAL CTA */}
      <section className="container-page mt-20">
        <div className="grid md:grid-cols-12 gap-6 items-stretch">
          <div className="md:col-span-7 rounded-3xl surface-forest p-8 md:p-12">
            <div className="text-xs uppercase tracking-widest font-semibold text-sand">Для B2B</div>
            <h2 className="mt-3 text-3xl md:text-4xl font-display font-bold">Стабильные поставки для СТО и дилеров</h2>
            <p className="mt-4 text-forest-foreground/85 max-w-xl">Скидки до 10% за объём, индивидуальные условия для регулярных закупок, документы и счета для бухгалтерии — закрываем рабочие задачи СТО и официальных представительств.</p>
            <Link to="/for-sto" className="mt-6 inline-flex items-center gap-2 h-12 px-6 rounded-xl bg-background text-foreground font-semibold">Получить КП <ArrowRight size={18} /></Link>
          </div>
          <div className="md:col-span-5 rounded-3xl bg-card border border-border p-8 md:p-10">
            <div className="text-xs uppercase tracking-widest text-brown font-semibold">Финальный CTA</div>
            <h3 className="mt-3 text-2xl font-display font-bold">Нужен оригинал без риска?</h3>
            <p className="mt-2 text-foreground/70 text-sm">Оставьте заявку — подберём оригинал и пришлём документы.</p>
            <form className="mt-5 grid gap-3">
              <input type="tel" placeholder="Телефон" className="h-12 px-4 rounded-xl border border-border bg-background focus:outline-none focus:border-forest" />
              <input type="text" placeholder="Марка / модель / артикул (опционально)" className="h-12 px-4 rounded-xl border border-border bg-background focus:outline-none focus:border-forest" />
              <button type="button" className="h-12 rounded-xl surface-forest font-semibold">Запросить подбор</button>
              <p className="text-[11px] text-muted-foreground">Нажимая, вы соглашаетесь с политикой конфиденциальности.</p>
            </form>
          </div>
        </div>
      </section>

      {/* SEARCH HINT */}
      <section className="container-page mt-20">
        <div className="rounded-3xl bg-card border border-border p-6 md:p-8 flex flex-col md:flex-row md:items-center gap-4">
          <Search size={28} className="text-forest" />
          <div className="flex-1">
            <div className="font-display font-bold text-lg">Поиск по артикулу или OEM</div>
            <div className="text-sm text-foreground/70">Подбираем точно — без аналогов и компромиссов.</div>
          </div>
          <Link to="/parts" className="inline-flex items-center justify-center gap-2 h-12 px-6 rounded-xl surface-forest font-semibold">Открыть каталог</Link>
        </div>
      </section>
    </Layout>
  );
}
