import { createFileRoute, Link } from "@tanstack/react-router";
import { Layout } from "@/components/site/Layout";
import carImg from "@/assets/car-order.jpg";
import car1 from "@/assets/car-1.jpg";
import car2 from "@/assets/car-2.jpg";
import car3 from "@/assets/car-3.jpg";
import { ArrowRight, MessageSquare, Search, FileSignature, Ship, Wrench, Banknote, FileCheck2, Key } from "lucide-react";

export const Route = createFileRoute("/cars-order")({
  head: () => ({
    meta: [
      { title: "Автомобили под заказ | Премиальное сопровождение | Орионавто" },
      { name: "description", content: "Подбор и поставка автомобилей премиум-сегмента под ключ. Предпродажная подготовка, лизинг и кредит, постановка на учёт." },
      { property: "og:title", content: "Автомобили под заказ — от подбора до постановки на учёт" },
      { property: "og:description", content: "Премиум-сопровождение: поиск, доставка, таможня, лизинг, постановка на учёт." },
    ],
  }),
  component: CarsPage,
});

const collection = [
  {
    img: car1,
    brand: "Mercedes-Benz",
    model: "G 63 AMG",
    tag: "Iconic Off-Road",
    specs: ["4.0 V8 Bi-Turbo · 585 л.с.", "AWD · Designo интерьер", "Срок поставки · 8–12 недель"],
  },
  {
    img: car2,
    brand: "Porsche",
    model: "911 Turbo S",
    tag: "Sports Coupe",
    specs: ["3.7 Bi-Turbo · 650 л.с.", "0–100 за 2.7 с · PDK", "Срок поставки · 6–10 недель"],
  },
  {
    img: car3,
    brand: "BMW",
    model: "X7 M60i xDrive",
    tag: "Luxury SUV",
    specs: ["4.4 V8 · 530 л.с.", "AWD · 7 мест · Executive Lounge", "Срок поставки · 8–12 недель"],
  },
];

const pillars = [
  {
    i: MessageSquare,
    eyebrow: "01 · Запрос",
    t: "Бриф и консультация",
    d: "Обсуждаем модель, комплектацию, бюджет и сроки. Уточняем сценарий использования и индивидуальные пожелания.",
  },
  {
    i: Search,
    eyebrow: "02 · Подбор",
    t: "Поиск и проверка",
    d: "Находим автомобили в Европе, проверяем историю, состояние и комплектацию. Согласуем 2–3 лучших варианта.",
  },
  {
    i: FileSignature,
    eyebrow: "03 · Договор",
    t: "Прозрачные условия",
    d: "Фиксируем стоимость, сроки и зону ответственности в договоре. Принимаем предоплату на расчётный счёт.",
  },
  {
    i: Ship,
    eyebrow: "04 · Логистика",
    t: "Выкуп и доставка",
    d: "Выкупаем автомобиль, организуем безопасную транспортировку до Беларуси, проходим таможенное оформление.",
  },
  {
    i: Wrench,
    eyebrow: "05 · Подготовка",
    t: "Предпродажная подготовка",
    d: "Полная диагностика, детейлинг, защита кузова и салона. Автомобиль приезжает к вам в безупречном состоянии.",
  },
  {
    i: Banknote,
    eyebrow: "06 · Финансирование",
    t: "Лизинг и кредит",
    d: "Подбираем условия лизинга и кредитования от партнёрских банков — для физических лиц и компаний.",
  },
  {
    i: FileCheck2,
    eyebrow: "07 · Постановка на учёт",
    t: "ГАИ и страхование",
    d: "Регистрация в ГАИ, оформление страховки, получение номеров и документов — берём бюрократию на себя.",
  },
  {
    i: Key,
    eyebrow: "08 · Вручение ключей",
    t: "Передача автомобиля",
    d: "Передаём ключи и комплект документов, проводим знакомство с автомобилем. Остаёмся на связи для сервисной поддержки.",
  },
];

function CarsPage() {
  return (
    <Layout>
      {/* HERO — премиальный, в стиле главной */}
      <section className="container-page pt-10 md:pt-16">
        <div className="relative rounded-3xl overflow-hidden min-h-[560px] md:min-h-[640px] bg-foreground">
          <img
            src={carImg}
            alt="Премиальный автомобиль под заказ"
            className="absolute inset-0 h-full w-full object-cover"
            width={2000}
            height={1200}
            fetchPriority="high"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-foreground/85 via-foreground/65 to-foreground/25" />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-transparent to-transparent md:hidden" />

          <div className="relative p-8 md:p-14 lg:p-16 flex flex-col justify-between min-h-[560px] md:min-h-[640px] max-w-3xl text-background">
            <div>
              <span className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-sand font-semibold">
                <span className="h-1.5 w-1.5 rounded-full bg-sand" /> Bespoke Delivery · Под ключ
              </span>
              <h1 className="mt-5 text-4xl md:text-5xl lg:text-6xl font-display font-extrabold tracking-tight leading-[1.05]">
                Автомобиль вашей мечты —<br />
                <span className="text-sand">с безупречным сопровождением</span>
              </h1>
              <p className="mt-6 max-w-xl text-base md:text-lg text-background/85">
                Находим и доставляем автомобили премиум-сегмента в любой комплектации. Сопровождаем от первой консультации до момента, когда ключи окажутся в ваших руках.
              </p>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                to="/contacts"
                className="inline-flex items-center gap-2 h-12 px-6 rounded-xl surface-forest font-semibold hover:opacity-95"
              >
                Оставить заявку <ArrowRight size={18} />
              </Link>
              <Link
                to="/contacts"
                className="inline-flex items-center gap-2 h-12 px-6 rounded-xl bg-background/10 border border-background/40 backdrop-blur-sm text-background font-semibold hover:bg-background/20"
              >
                Персональная консультация
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-6 rounded-2xl bg-card border border-border px-5 py-4 flex flex-wrap gap-x-8 gap-y-2 text-sm text-foreground/80">
          <span>20 лет опыта в автобизнесе</span>
          <span>Прозрачный договор</span>
          <span>Документы на ввоз</span>
          <span>Таможенное сопровождение</span>
        </div>
      </section>

      {/* КОЛЛЕКЦИЯ — премиальные карточки авто */}
      <section className="container-page mt-20">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-3 mb-8">
          <div>
            <div className="text-xs uppercase tracking-widest text-brown font-semibold">Коллекция</div>
            <h2 className="mt-2 text-3xl md:text-4xl font-display font-bold">Автомобили, которые мы привозим</h2>
            <p className="mt-3 text-foreground/70 max-w-2xl">
              Несколько примеров из текущих и недавних поставок. Привезём любой автомобиль премиум-сегмента — в выбранной вами комплектации.
            </p>
          </div>
          <Link to="/contacts" className="hidden md:inline-flex items-center gap-1 text-sm font-semibold text-forest">
            Запросить подбор <ArrowRight size={16} />
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {collection.map((c) => (
            <article key={c.model} className="group rounded-3xl overflow-hidden bg-foreground text-background flex flex-col">
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={c.img}
                  alt={`${c.brand} ${c.model}`}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                  width={1280}
                  height={896}
                />
                <div className="absolute top-4 left-4 text-[10px] uppercase tracking-[0.25em] font-semibold bg-background/15 backdrop-blur-md border border-background/30 px-3 py-1.5 rounded-full">
                  {c.tag}
                </div>
              </div>
              <div className="p-6 md:p-7 flex flex-col flex-1">
                <div className="text-[11px] uppercase tracking-[0.2em] text-sand font-semibold">{c.brand}</div>
                <div className="mt-2 font-display font-bold text-2xl">{c.model}</div>
                <ul className="mt-4 space-y-1.5 text-sm text-background/75 flex-1">
                  {c.specs.map((s) => (
                    <li key={s} className="flex items-start gap-2">
                      <span className="mt-2 h-1 w-1 rounded-full bg-sand shrink-0" />
                      <span>{s}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  to="/contacts"
                  className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-sand"
                >
                  Узнать о поставке <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* КАК МЫ РАБОТАЕМ */}
      <section className="container-page mt-24">
        <div className="mb-8">
          <div className="text-xs uppercase tracking-widest text-brown font-semibold">Как мы работаем</div>
          <h2 className="mt-2 text-3xl md:text-4xl font-display font-bold">Сопровождение на каждом этапе</h2>
          <p className="mt-3 text-foreground/70 max-w-2xl">
            Берём на себя всё — от подготовки автомобиля до момента, когда вы садитесь за руль с готовыми документами.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {pillars.map((p) => (
            <div key={p.t} className="rounded-2xl surface-cream p-6 flex flex-col">
              <p.i size={24} className="text-brown" />
              <div className="mt-4 text-[10px] uppercase tracking-[0.25em] text-brown font-semibold">{p.eyebrow}</div>
              <div className="mt-2 font-display font-bold text-base leading-snug">{p.t}</div>
              <p className="mt-2 text-sm text-foreground/75 flex-1">{p.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ЧТО ВХОДИТ */}
      <section className="container-page mt-16 rounded-3xl surface-forest p-8 md:p-12">
        <div className="text-xs uppercase tracking-widest font-semibold text-sand">Прозрачная стоимость</div>
        <h3 className="mt-3 text-2xl md:text-3xl font-display font-bold">Что входит в стоимость</h3>
        <p className="mt-4 text-forest-foreground/85 max-w-2xl">
          Цена автомобиля, логистика, таможенное оформление, страхование и наша комиссия. Никаких скрытых платежей — фиксируем все условия в договоре до старта работы.
        </p>
      </section>

      {/* Дополнительные услуги */}
      <section className="container-page mt-16">
        <div className="mb-6">
          <div className="text-xs uppercase tracking-widest text-brown font-semibold">Дополнительные услуги</div>
          <h2 className="mt-2 text-3xl md:text-4xl font-display font-bold">Полный сервис для вашего автомобиля</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          {[
            { t: "Консьерж-сервис", d: "Сопровождение по ремонту, регистрации, ГАИ и техосмотру — берём бюрократию на себя." },
            { t: "Детейлинг", d: "Профессиональный уход за кузовом и салоном с применением премиальных составов." },
            { t: "Оклейка плёнкой", d: "Защитные и стилистические покрытия: антигравийная плёнка, виниловая стилизация." },
            { t: "Выкуп автомобиля", d: "Выкупаем ваш автомобиль по справедливой цене — оценка и оформление в один день." },
            { t: "Trade-in", d: "Зачёт вашего автомобиля в стоимость нового — прозрачная оценка без скрытых условий." },
            { t: "Лизинг", d: "Подбираем оптимальные условия лизинга от партнёрских банков — для физлиц и компаний." },
          ].map((s) => (
            <div key={s.t} className="rounded-2xl bg-card border border-border p-6 md:p-7 flex flex-col">
              <div className="text-[11px] uppercase tracking-[0.2em] text-brown font-semibold">— Сервис</div>
              <div className="mt-3 font-display font-bold text-lg">{s.t}</div>
              <p className="mt-2 text-sm text-foreground/70 flex-1">{s.d}</p>
            </div>
          ))}
        </div>
      </section>
    </Layout>
  );
}
