import { createFileRoute, Link } from "@tanstack/react-router";
import { Layout } from "@/components/site/Layout";
import heroImg from "@/assets/hero-parts.jpg";
import diamondImg from "@/assets/diamond.jpg";
import carImg from "@/assets/car-order.jpg";
import { ShieldCheck, FileText, Award, Truck, Search, Wrench, Droplets, Disc3, CircleDot, Car, ArrowRight, CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Орионавто — оригинальные автозапчасти с документами | Минск" },
      { name: "description", content: "Поставщик оригинальных автозапчастей BYD, Zeekr, LiXiang, Changan, Chery и др. Diamond ProTech. Авто под заказ. Подбор по VIN, документы подлинности." },
    ],
  }),
  component: HomePage,
});

const brands = ["BYD", "Zeekr", "LiXiang", "Changan", "Chery", "Voyah", "Deepal", "Leapmotor", "Xiaomi", "Volkswagen", "Audi", "Mazda", "Kia", "Renault"];

function HomePage() {
  return (
    <Layout>
      {/* HERO */}
      <section className="container-page pt-10 md:pt-16">
        <div className="grid lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
          <div className="lg:col-span-7 rounded-3xl surface-sand p-8 md:p-12 lg:p-14 flex flex-col justify-between min-h-[440px] md:min-h-[520px]">
            <div>
              <span className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-brown font-semibold">
                <span className="h-1.5 w-1.5 rounded-full bg-forest" /> Орионавто · с 2005
              </span>
              <h1 className="mt-5 text-4xl md:text-6xl lg:text-7xl font-display font-extrabold tracking-tight">
                Оригинал —<br />это не обещание,<br />
                <span className="text-forest">а документ.</span>
              </h1>
              <p className="mt-6 max-w-xl text-base md:text-lg text-foreground/75">
                Оригинальные автозапчасти с подтверждённой подлинностью, профессиональная химия Diamond ProTech и автомобили под заказ. Подбор и поставка с гарантией.
              </p>
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/parts" className="inline-flex items-center gap-2 h-12 px-6 rounded-xl surface-forest font-semibold hover:opacity-95">
                Подобрать запчасти <ArrowRight size={18} />
              </Link>
              <Link to="/contacts" className="inline-flex items-center gap-2 h-12 px-6 rounded-xl bg-background border border-border font-semibold hover:bg-cream">
                Получить консультацию
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5 rounded-3xl overflow-hidden relative min-h-[300px]">
            <img src={heroImg} alt="Оригинальные автозапчасти на складе Орионавто" className="absolute inset-0 h-full w-full object-cover" width={1600} height={1100} />
            <div className="absolute bottom-4 left-4 right-4 backdrop-blur bg-background/85 rounded-2xl p-4 border border-border">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg surface-forest flex items-center justify-center">
                  <Truck size={20} />
                </div>
                <div>
                  <div className="font-display font-semibold leading-tight">Авиадоставка Китай → Минск</div>
                  <div className="text-xs text-muted-foreground">2 недели — закрываем гарантийные кейсы дилеров</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Trust strip */}
        <div className="mt-6 rounded-2xl bg-card border border-border px-5 py-4 flex flex-wrap gap-x-8 gap-y-2 text-sm text-foreground/80">
          <span className="inline-flex items-center gap-2"><ShieldCheck size={16} className="text-forest" /> Только оригинал</span>
          <span className="inline-flex items-center gap-2"><Award size={16} className="text-forest" /> 20 лет у официальных дилеров</span>
          <span className="inline-flex items-center gap-2"><FileText size={16} className="text-forest" /> Сертификаты и декларации</span>
          <span className="inline-flex items-center gap-2"><CheckCircle2 size={16} className="text-forest" /> СТО и автовладельцы · РБ</span>
        </div>
      </section>

      {/* TRUST BLOCK */}
      <section className="container-page mt-20">
        <div className="grid lg:grid-cols-12 gap-6">
          <div className="lg:col-span-5">
            <div className="text-xs uppercase tracking-widest text-brown font-semibold">Почему Орионавто</div>
            <h2 className="mt-3 text-3xl md:text-4xl font-display font-bold">
              Ориентир в мире, где трудно отличить оригинал от копии.
            </h2>
            <p className="mt-4 text-foreground/70 max-w-md">
              Мы работаем для тех, кому нужна предсказуемость: для СТО, детейлинг-студий и осознанных автовладельцев. К каждой позиции — документы.
            </p>
          </div>
          <div className="lg:col-span-7 grid sm:grid-cols-2 gap-4">
            {[
              { i: FileText, t: "Документы", d: "Сертификаты, декларации соответствия, паспорта качества." },
              { i: Award, t: "20 лет опыта", d: "Команда специалистов из официальных дилерских центров." },
              { i: ShieldCheck, t: "Без серых деталей", d: "Не везём аналоги, восстановленные и фабричные копии." },
              { i: Truck, t: "Надёжная логистика", d: "Склад ходовых позиций + авиадоставка из Китая 14 дней." },
            ].map((f) => (
              <div key={f.t} className="bento-card surface-cream !border-transparent">
                <f.i size={28} className="text-forest" />
                <div className="mt-4 font-display font-bold text-lg">{f.t}</div>
                <div className="mt-1 text-sm text-foreground/70">{f.d}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CATEGORIES BENTO */}
      <section className="container-page mt-20">
        <div className="flex items-end justify-between mb-6">
          <h2 className="text-3xl md:text-4xl font-display font-bold">Категории</h2>
          <Link to="/parts" className="hidden md:inline-flex items-center gap-1 text-sm font-semibold text-forest">
            Весь каталог <ArrowRight size={16} />
          </Link>
        </div>

        <div className="bento">
          <div className="bento-card surface-forest span-2 row-2 flex flex-col justify-between min-h-[260px]">
            <div>
              <Droplets size={32} />
              <div className="mt-4 font-display font-bold text-2xl">Масла и технические жидкости</div>
              <div className="mt-2 text-sm text-forest-foreground/85">Моторные масла, антифризы, трансмиссионные и тормозные жидкости — со склада.</div>
            </div>
            <div className="mt-6 inline-flex items-center gap-2 text-sm font-semibold">В наличии <ArrowRight size={16} /></div>
          </div>

          <div className="bento-card surface-cream">
            <Wrench size={28} className="text-brown" />
            <div className="mt-4 font-display font-bold text-lg">Группа ТО</div>
            <div className="mt-1 text-sm text-foreground/70">Фильтры, свечи, ремни, расходники.</div>
          </div>

          <div className="bento-card">
            <CircleDot size={28} className="text-forest" />
            <div className="mt-4 font-display font-bold text-lg">Подвеска</div>
            <div className="mt-1 text-sm text-foreground/70">Амортизаторы, рычаги, опоры. Со склада.</div>
            <span className="mt-3 inline-block text-[11px] font-semibold uppercase tracking-wider text-forest bg-cream px-2 py-1 rounded-md">Новое — со склада</span>
          </div>

          <div className="bento-card surface-cream">
            <Disc3 size={28} className="text-brown" />
            <div className="mt-4 font-display font-bold text-lg">Тормозная система</div>
            <div className="mt-1 text-sm text-foreground/70">Колодки, диски, суппорты.</div>
            <span className="mt-3 inline-block text-[11px] font-semibold uppercase tracking-wider text-forest bg-background px-2 py-1 rounded-md">Новое — со склада</span>
          </div>

          <div className="bento-card span-2">
            <div className="text-xs uppercase tracking-widest text-brown font-semibold">Diamond ProTech</div>
            <div className="mt-3 font-display font-bold text-2xl">Профессиональная химия и керамика</div>
            <p className="mt-2 text-sm text-foreground/70 max-w-md">Эксклюзивный поставщик в РБ/РФ. Производство Швейцария. PRO-линейка с защитой до 10 лет.</p>
            <Link to="/diamond-protech" className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-forest">Подробнее <ArrowRight size={16} /></Link>
          </div>

          <div className="bento-card surface-brown">
            <Car size={28} />
            <div className="mt-4 font-display font-bold text-lg">Лобовые стёкла и кузов</div>
            <div className="mt-1 text-sm text-brown-foreground/85">Кузовные элементы под заказ.</div>
          </div>

          <div className="bento-card span-2">
            <div className="font-display font-bold text-lg">Авто под заказ</div>
            <div className="mt-1 text-sm text-foreground/70">Китай · Европа · ОАЭ. Подбор, проверка, растаможка.</div>
            <Link to="/cars-order" className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-forest">Оставить заявку <ArrowRight size={16} /></Link>
          </div>
        </div>
      </section>

      {/* BRANDS */}
      <section className="container-page mt-20">
        <div className="rounded-3xl surface-cream p-8 md:p-12">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-3 mb-6">
            <div>
              <div className="text-xs uppercase tracking-widest text-brown font-semibold">Фокус на брендах</div>
              <h2 className="mt-2 text-2xl md:text-3xl font-display font-bold">Китайские бренды и не только</h2>
            </div>
            <Link to="/parts" className="text-sm font-semibold text-forest inline-flex items-center gap-1">Подбор по VIN <ArrowRight size={16} /></Link>
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

      {/* AUDIENCES */}
      <section className="container-page mt-20">
        <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">Для кого мы работаем</h2>
        <div className="grid md:grid-cols-3 gap-4">
          {[
            { t: "СТО", d: "Стабильные поставки оригинала. Скидки до 10% за объём. Авиадоставка для гарантийных кейсов.", to: "/for-sto", cta: "Получить КП" },
            { t: "Автовладельцы", d: "Подбор по VIN, документы подлинности, прозрачные сроки.", to: "/parts", cta: "Подобрать запчасть" },
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

      {/* HOW WE WORK */}
      <section className="container-page mt-20">
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

      {/* DIAMOND BANNER */}
      <section className="container-page mt-20">
        <div className="rounded-3xl overflow-hidden relative min-h-[420px] md:min-h-[480px]">
          <img src={diamondImg} alt="Diamond ProTech керамическое покрытие" className="absolute inset-0 h-full w-full object-cover" loading="lazy" width={1400} height={1000} />
          <div className="absolute inset-0 bg-gradient-to-r from-foreground/85 via-foreground/55 to-transparent" />
          <div className="relative p-8 md:p-14 max-w-2xl text-background">
            <div className="text-xs uppercase tracking-widest text-sand font-semibold">Diamond ProTech · эксклюзив РБ/РФ</div>
            <h2 className="mt-3 text-3xl md:text-5xl font-display font-bold">Защита, которой доверяют профессионалы</h2>
            <p className="mt-4 text-background/80">Швейцарское производство. Патенты, лаборатория. PRO-линейка с защитой до 10 лет, программы обучения и сертификации.</p>
            <Link to="/diamond-protech" className="mt-6 inline-flex items-center gap-2 h-12 px-6 rounded-xl bg-background text-foreground font-semibold">
              Смотреть каталог <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* B2B AIR DELIVERY */}
      <section className="container-page mt-20">
        <div className="grid md:grid-cols-12 gap-6 items-stretch">
          <div className="md:col-span-7 rounded-3xl surface-forest p-8 md:p-12">
            <div className="text-xs uppercase tracking-widest font-semibold text-sand">Для B2B</div>
            <h2 className="mt-3 text-3xl md:text-4xl font-display font-bold">Авиадоставка из Китая за 2 недели</h2>
            <p className="mt-4 text-forest-foreground/85 max-w-xl">Закрываем гарантийные кейсы дилерских центров в Беларуси. Это отдельное конкурентное преимущество для СТО и официальных представительств.</p>
            <Link to="/for-sto" className="mt-6 inline-flex items-center gap-2 h-12 px-6 rounded-xl bg-background text-foreground font-semibold">Получить КП <ArrowRight size={18} /></Link>
          </div>
          <div className="md:col-span-5 rounded-3xl bg-card border border-border p-8 md:p-10">
            <div className="text-xs uppercase tracking-widest text-brown font-semibold">Финальный CTA</div>
            <h3 className="mt-3 text-2xl font-display font-bold">Нужен оригинал без риска?</h3>
            <p className="mt-2 text-foreground/70 text-sm">Оставьте заявку — подберём по VIN и пришлём документы.</p>
            <form className="mt-5 grid gap-3">
              <input type="tel" placeholder="Телефон" className="h-12 px-4 rounded-xl border border-border bg-background focus:outline-none focus:border-forest" />
              <input type="text" placeholder="Марка / модель / VIN (опционально)" className="h-12 px-4 rounded-xl border border-border bg-background focus:outline-none focus:border-forest" />
              <button type="button" className="h-12 rounded-xl surface-forest font-semibold">Запросить подбор</button>
              <p className="text-[11px] text-muted-foreground">Нажимая, вы соглашаетесь с политикой конфиденциальности.</p>
            </form>
          </div>
        </div>
      </section>

      {/* CARS UNDER ORDER PEEK */}
      <section className="container-page mt-20">
        <div className="grid md:grid-cols-12 gap-6">
          <div className="md:col-span-5 rounded-3xl overflow-hidden relative min-h-[280px]">
            <img src={carImg} alt="Автомобиль под заказ" className="absolute inset-0 h-full w-full object-cover" loading="lazy" width={1400} height={900} />
          </div>
          <div className="md:col-span-7 rounded-3xl surface-sand p-8 md:p-12">
            <div className="text-xs uppercase tracking-widest text-brown font-semibold">Авто под заказ</div>
            <h2 className="mt-3 text-3xl md:text-4xl font-display font-bold">Китай · Европа · ОАЭ. Под ключ.</h2>
            <p className="mt-3 text-foreground/75 max-w-xl">Прозрачный договор, документы на ввоз, растаможка под ключ. 20 лет опыта в подборе и поставке.</p>
            <Link to="/cars-order" className="mt-6 inline-flex items-center gap-2 h-12 px-6 rounded-xl surface-forest font-semibold">Получить расчёт <ArrowRight size={18} /></Link>
          </div>
        </div>
      </section>

      {/* SEARCH HINT */}
      <section className="container-page mt-20">
        <div className="rounded-3xl bg-card border border-border p-6 md:p-8 flex flex-col md:flex-row md:items-center gap-4">
          <Search size={28} className="text-forest" />
          <div className="flex-1">
            <div className="font-display font-bold text-lg">Поиск по артикулу, OEM или VIN</div>
            <div className="text-sm text-foreground/70">Подбираем точно — без аналогов и компромиссов.</div>
          </div>
          <Link to="/parts" className="inline-flex items-center justify-center gap-2 h-12 px-6 rounded-xl surface-forest font-semibold">Открыть каталог</Link>
        </div>
      </section>
    </Layout>
  );
}
