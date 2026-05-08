import { createFileRoute, Link } from "@tanstack/react-router";
import { Layout } from "@/components/site/Layout";
import { Faq } from "@/components/site/Faq";
import { ArrowRight, Plane, Percent, FileText, Wrench, ShieldCheck, Award, Boxes, Clock, Coins } from "lucide-react";

export const Route = createFileRoute("/for-sto")({
  head: () => ({
    meta: [
      { title: "Для СТО — оригинальные запчасти оптом | Орионавто" },
      { name: "description", content: "Надёжный поставщик для станций технического обслуживания. Только оригинал, подтверждённый документами, с подбором и скидками за объём до 10%." },
      { property: "og:title", content: "Орионавто для СТО — оригинал с документами" },
      { property: "og:description", content: "Стабильные поставки, подбор, скидки за объём до 10%. Документы на каждую позицию." },
    ],
  }),
  component: StoPage,
});

const why = [
  { i: ShieldCheck, t: "Репутация важнее скидки", d: "Когда вы ставите клиенту деталь, важна уверенность в её происхождении. Без аналогов, восстановленных деталей и «серых» схем." },
  { i: FileText, t: "Подтверждение подлинности", d: "Каждая позиция сопровождается сертификатами, декларациями соответствия или паспортами качества. Документы — к заказу." },
  { i: Award, t: "Опыт команды", d: "Специалисты с 20-летним стажем в автобизнесе. Знают совместимость, нюансы подбора и типичные ошибки." },
];

const conditions = [
  { i: Percent, t: "Скидка до 10% за объём", d: "При регулярных закупках обсуждаем индивидуальные условия." },
  { i: Boxes, t: "Быстрые позиции в наличии", d: "Масла, жидкости, группа ТО — без ожидания." },
  { i: Plane, t: "Под заказ — по договорённости", d: "Точные сроки согласовываем перед заказом. Гибкие условия для гарантийных кейсов." },
  { i: Wrench, t: "Гибкость по ассортименту", d: "Фокус на BYD, Zeekr, Changan, Chery + популярные европейские бренды." },
];

const benefits = [
  { i: ShieldCheck, t: "Снижение рисков", points: ["Нет подделок и восстановленных деталей", "Документы на каждую позицию"] },
  { i: Clock, t: "Экономия времени", points: ["Быстрые позиции без ожидания", "Счёт и условия для бухгалтерии"] },
  { i: Coins, t: "Стабильность", points: ["Регулярные поставки без сюрпризов", "Скидки за объём", "Понятная схема оплаты"] },
];

const faq = [
  { q: "Какие скидки для СТО?", a: "До 10% при регулярных закупках. Условия обсуждаем индивидуально." },
  { q: "Как оформляется счёт?", a: "Выставляем счёт для юрлица с НДС. Закрывающие документы — в полном объёме." },
  { q: "Что есть в наличии?", a: "Масла, жидкости, группа ТО. Остальное — под заказ. Точные сроки согласовываем перед заказом." },
  { q: "Запасные части для каких брендов мы привозим?", a: "BYD, Zeekr, Changan, Chery, Volkswagen, Mazda, Kia, Renault и др." },
  { q: "Есть ли минимальный заказ?", a: "Нет, но при объёме действуют скидки." },
];

function StoPage() {
  return (
    <Layout>
      {/* Hero */}
      <section className="container-page pt-10 md:pt-16">
        <div className="rounded-3xl surface-forest p-8 md:p-14">
          <span className="text-xs uppercase tracking-widest text-sand font-semibold">B2B · СТО</span>
          <h1 className="mt-4 text-4xl md:text-6xl font-display font-extrabold tracking-tight max-w-3xl">
            Оригинальные запчасти для СТО без компромиссов
          </h1>
          <p className="mt-4 text-forest-foreground/85 max-w-2xl">
            Надёжный поставщик для станций технического обслуживания. Только оригинал, подтверждённый документами, с подбором и скидками за объём.
          </p>
          <p className="mt-3 text-sm text-sand/85 max-w-2xl">
            BYD, Zeekr, Changan, Chery, Volkswagen, Mazda, Kia, Renault и др.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <a href="#kp" className="inline-flex items-center gap-2 h-12 px-6 rounded-xl bg-background text-foreground font-semibold">Получить коммерческое предложение <ArrowRight size={18} /></a>
            <Link to="/parts" className="inline-flex items-center gap-2 h-12 px-6 rounded-xl border border-background/30 text-background font-semibold">Подобрать запчасти</Link>
          </div>
        </div>
      </section>

      {/* Why STO choose us */}
      <section className="container-page mt-16">
        <div className="text-xs uppercase tracking-widest text-brown font-semibold">Блок доверия</div>
        <h2 className="mt-2 text-3xl md:text-4xl font-display font-bold">Почему СТО выбирают Орионавто</h2>
        <div className="mt-6 grid md:grid-cols-3 gap-4">
          {why.map((x) => (
            <div key={x.t} className="rounded-2xl bg-card border border-border p-6">
              <x.i size={26} className="text-forest" />
              <div className="mt-3 font-display font-bold text-lg">{x.t}</div>
              <div className="mt-1 text-sm text-foreground/75">{x.d}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Conditions */}
      <section className="container-page mt-16">
        <h2 className="text-3xl md:text-4xl font-display font-bold">Условия для СТО</h2>
        <div className="mt-6 grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {conditions.map((c) => (
            <div key={c.t} className="rounded-2xl surface-cream p-6">
              <c.i size={24} className="text-brown" />
              <div className="mt-3 font-display font-bold">{c.t}</div>
              <div className="text-sm text-foreground/75 mt-1">{c.d}</div>
            </div>
          ))}
        </div>
      </section>

      {/* How we work with STO */}
      <section className="container-page mt-16 grid md:grid-cols-2 gap-4">
        <div className="rounded-2xl bg-card border border-border p-8">
          <div className="text-xs uppercase tracking-widest text-brown font-semibold">Вариант 1</div>
          <h3 className="mt-2 font-display font-bold text-2xl">Подбор через сайт</h3>
          <ol className="mt-4 space-y-2 text-foreground/80 list-decimal pl-5">
            <li>Ищете в каталоге или по артикулу.</li>
            <li>Добавляете в корзину.</li>
            <li>Отправляете запрос.</li>
          </ol>
          <p className="mt-4 text-sm text-foreground/70">Мы подтверждаем наличие, стоимость и готовность к отгрузке.</p>
        </div>
        <div className="rounded-2xl surface-forest p-8">
          <div className="text-xs uppercase tracking-widest font-semibold text-sand">Вариант 2</div>
          <h3 className="mt-2 font-display font-bold text-2xl">Подбор через специалиста</h3>
          <p className="mt-3 text-forest-foreground/85">
            Вам необходимо постоянно поддерживать склад запасных частей — свяжитесь с нами, и мы обеспечим бесперебойные поставки.
          </p>
          <Link to="/contacts" className="mt-5 inline-flex items-center gap-2 h-11 px-5 rounded-xl bg-background text-foreground font-semibold">Связаться с менеджером <ArrowRight size={16} /></Link>
        </div>
      </section>

      {/* Benefits */}
      <section className="container-page mt-16">
        <h2 className="text-3xl md:text-4xl font-display font-bold">Что вы получаете</h2>
        <div className="mt-6 grid md:grid-cols-3 gap-4">
          {benefits.map((b) => (
            <div key={b.t} className="rounded-2xl bg-card border border-border p-6">
              <b.i size={26} className="text-forest" />
              <div className="mt-3 font-display font-bold text-lg">{b.t}</div>
              <ul className="mt-3 space-y-1.5 text-sm text-foreground/80 list-disc pl-5">
                {b.points.map((p) => <li key={p}>{p}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <Faq items={faq} />

      {/* CTA form */}
      <section id="kp" className="container-page mt-16">
        <div className="rounded-3xl bg-card border border-border p-8 md:p-12 grid md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-3xl font-display font-bold">Готовы работать стабильно?</h2>
            <p className="mt-3 text-foreground/75">Заполните форму — пришлём прайс и условия в течение рабочего дня.</p>
          </div>
          <form className="grid gap-3">
            <input placeholder="Компания" className="h-12 px-4 rounded-xl border border-border bg-background outline-none focus:border-forest" />
            <input placeholder="Контактное лицо" className="h-12 px-4 rounded-xl border border-border bg-background outline-none focus:border-forest" />
            <div className="grid grid-cols-2 gap-3">
              <input type="tel" placeholder="Телефон" className="h-12 px-4 rounded-xl border border-border bg-background outline-none focus:border-forest" />
              <input type="email" placeholder="Email" className="h-12 px-4 rounded-xl border border-border bg-background outline-none focus:border-forest" />
            </div>
            <textarea placeholder="Комментарии" rows={4} className="px-4 py-3 rounded-xl border border-border bg-background outline-none focus:border-forest resize-none" />
            <button type="button" className="h-12 rounded-xl surface-forest font-semibold">Получить коммерческое предложение</button>
          </form>
        </div>
      </section>
    </Layout>
  );
}
