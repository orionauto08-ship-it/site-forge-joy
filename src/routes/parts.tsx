import { createFileRoute, Link } from "@tanstack/react-router";
import { Layout } from "@/components/site/Layout";
import { Faq } from "@/components/site/Faq";
import { Search, ShieldCheck, FileText, Award, Filter, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/parts")({
  head: () => ({
    meta: [
      { title: "Запчасти — оригинал с документами | Орионавто" },
      { name: "description", content: "Каталог оригинальных автозапчастей: BYD, Zeekr, LiXiang, Changan, Chery, Voyah, Deepal, Leapmotor, Xiaomi и др. Подбор по VIN, фильтры, документы подлинности." },
    ],
  }),
  component: PartsPage,
});

const categories = [
  { t: "Масла и жидкости", d: "Моторные, антифризы, тормозные.", stock: true },
  { t: "Группа ТО", d: "Фильтры, свечи, ремни.", stock: true },
  { t: "Подвеска", d: "Амортизаторы, рычаги, опоры.", stock: true, badge: "Новое" },
  { t: "Тормозная система", d: "Колодки, диски, суппорты.", stock: true, badge: "Новое" },
  { t: "Лобовые стёкла", d: "Под заказ, точно по VIN.", stock: false },
  { t: "Кузовные детали", d: "Под заказ, точно по VIN.", stock: false },
];

const faq = [
  { q: "Как подтвердить оригинальность?", a: "Каждая позиция сопровождается сертификатами, декларациями соответствия или паспортами качества. Документы прилагаются к заказу." },
  { q: "Можно ли подобрать по VIN?", a: "Да, укажите VIN автомобиля — мы проверим совместимость и предложим оригинальные варианты." },
  { q: "Что есть в наличии?", a: "Масла, жидкости, группа ТО и ходовые позиции. Остальное — под заказ. Актуальный статус виден в каталоге." },
  { q: "Какие сроки под заказ?", a: "Зависят от позиции и поставщика. Точные сроки согласовываем перед заказом." },
  { q: "Есть ли скидки для СТО?", a: "Да, до 15% за объём при регулярных закупках. Условия обсуждаем индивидуально." },
];

function PartsPage() {
  return (
    <Layout>
      <section className="container-page pt-10 md:pt-16">
        <div className="rounded-3xl surface-sand p-8 md:p-14">
          <span className="text-xs uppercase tracking-widest text-brown font-semibold">Каталог</span>
          <h1 className="mt-4 text-4xl md:text-6xl font-display font-extrabold tracking-tight max-w-3xl">
            Оригинальные запасные части с подтверждённой подлинностью
          </h1>
          <p className="mt-4 text-foreground/75 max-w-2xl">
            BYD, Zeekr, LiXiang, Changan, Chery, Voyah, Deepal, Leapmotor, Xiaomi · Volkswagen, Audi, Mazda, Kia, Renault.
          </p>

          <div className="mt-8 grid md:grid-cols-[1fr_auto] gap-3 max-w-3xl">
            <div className="flex items-center gap-3 h-14 px-4 rounded-2xl bg-background border border-border">
              <Search size={20} className="text-forest" />
              <input className="flex-1 bg-transparent outline-none text-base" placeholder="Артикул, OEM или VIN" />
            </div>
            <button className="h-14 px-6 rounded-2xl surface-forest font-semibold inline-flex items-center justify-center gap-2">
              Найти <ArrowRight size={18} />
            </button>
          </div>

          <div className="mt-4 flex flex-wrap gap-2 text-sm">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-background/60 border border-border"><Filter size={14} /> Марка</span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-background/60 border border-border"><Filter size={14} /> Модель</span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-background/60 border border-border"><Filter size={14} /> Год</span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-background/60 border border-border"><Filter size={14} /> Категория</span>
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

      {/* Categories */}
      <section className="container-page mt-16">
        <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">Категории каталога</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map((c) => (
            <div key={c.t} className="rounded-2xl bg-card border border-border p-6 hover:-translate-y-0.5 transition-transform">
              <div className="flex items-center justify-between gap-3">
                <div className="font-display font-bold text-lg">{c.t}</div>
                {c.stock ? (
                  <span className="text-[11px] uppercase tracking-wider font-semibold text-forest bg-cream px-2 py-1 rounded-md">В наличии</span>
                ) : (
                  <span className="text-[11px] uppercase tracking-wider font-semibold text-warning bg-sand px-2 py-1 rounded-md">Под заказ</span>
                )}
              </div>
              <div className="mt-1 text-sm text-foreground/70">{c.d}</div>
              {c.badge && <span className="mt-3 inline-block text-[11px] uppercase tracking-wider font-semibold text-brown">{c.badge}</span>}
            </div>
          ))}
        </div>
      </section>

      {/* How we work */}
      <section className="container-page mt-16 grid md:grid-cols-2 gap-4">
        <div className="rounded-2xl surface-cream p-8">
          <div className="text-xs uppercase tracking-widest text-brown font-semibold">Вариант 1</div>
          <h3 className="mt-2 font-display font-bold text-2xl">Самостоятельный подбор</h3>
          <p className="mt-2 text-foreground/75">Ищите по артикулу/OEM, фильтруйте по марке и модели, добавляйте в корзину-заявку.</p>
        </div>
        <div className="rounded-2xl surface-forest p-8">
          <div className="text-xs uppercase tracking-widest font-semibold text-sand">Вариант 2</div>
          <h3 className="mt-2 font-display font-bold text-2xl">Подбор через менеджера</h3>
          <p className="mt-2 text-forest-foreground/85">Пришлите VIN — мы подберём детали и пришлём прайс с документами.</p>
        </div>
      </section>

      <Faq items={faq} />

      <section className="container-page mt-16">
        <div className="rounded-3xl surface-sand p-8 md:p-12 flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
          <div>
            <h3 className="text-2xl md:text-3xl font-display font-bold">Нужен точный подбор или коммерческое предложение?</h3>
            <p className="text-foreground/75 mt-1">Менеджер ответит в течение рабочего часа.</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Link to="/contacts" className="inline-flex items-center gap-2 h-12 px-6 rounded-xl surface-forest font-semibold">Запросить подбор <ArrowRight size={18} /></Link>
            <Link to="/for-sto" className="inline-flex items-center gap-2 h-12 px-6 rounded-xl bg-background border border-border font-semibold">Получить прайс</Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
