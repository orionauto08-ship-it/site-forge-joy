import { createFileRoute, Link } from "@tanstack/react-router";
import { Layout } from "@/components/site/Layout";
import { Faq } from "@/components/site/Faq";
import { ArrowRight, Wrench, Droplets, Car, Building2, Sparkles, User, Users } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "О компании Орионавто — ориентир в автомобильном мире" },
      { name: "description", content: "Орионавто — поставщик оригинальных запчастей, профессиональной химии Diamond ProTech и автомобилей под заказ. Только оригинал, подтверждённый документами." },
    ],
  }),
  component: AboutPage,
});

const directions = [
  { i: Wrench, t: "Запасные части", d: "Оригинальные запчасти для BYD, Zeekr, Changan, Chery и популярных европейских брендов. Только оригинал с подтверждением документов." },
  { i: Droplets, t: "Детейлинг-химия Diamond ProTech", d: "Профессиональные защитные покрытия для кузова, стёкол, колёс и салона. Гидрофобность и блеск до 18 месяцев." },
  { i: Car, t: "Автомобили под заказ", d: "Подбор и поставка по вашим параметрам. Полный цикл: от поиска до постановки на учёт." },
];

const audiences = [
  { i: Building2, t: "Станции технического обслуживания", d: "Нужны стабильные поставки оригинала без сюрпризов." },
  { i: Sparkles, t: "Детейлинг-студии", d: "Профессиональная химия и защита для работы с клиентами." },
  { i: User, t: "Автовладельцы", d: "Осознанные, которые хотят оригинал без риска ошибиться." },
  { i: Car, t: "Покупатели автомобилей", d: "Подберём и привезём авто под ключ — от поиска до постановки на учёт." },
  { i: Users, t: "Корпоративные автопарки", d: "Регулярные закупки запчастей и автомобилей с чёткими условиями." },
];

const principles = [
  { t: "Оригинал или ничего", d: "Без компромиссов по качеству и происхождению." },
  { t: "Прозрачность", d: "Документы, сроки, цены — всё обсуждаем заранее." },
  { t: "Экспертиза", d: "Подбор не по каталогу, а с учётом реальных задач — будь то деталь или автомобиль." },
  { t: "Стабильность", d: "Для СТО: скидки до 10% за объём, регулярные поставки запчастей и автомобилей под заказ." },
];

const faq = [
  { q: "Почему только оригинал?", a: "Чтобы клиент был уверен в качестве и совместимости. Подделки и аналоги — это всегда риск." },
  { q: "Как подтверждаете подлинность?", a: "Сертификаты, декларации соответствия, паспорта качества." },
  { q: "Работаете ли с юрлицами?", a: "Да, выставляем счета с НДС, обсуждаем условия для СТО." },
  { q: "Запасные части для каких брендов мы привозим?", a: "BYD, Zeekr, Changan, Chery, Volkswagen, Mazda, Kia и др." },
  { q: "Есть ли минимальный заказ?", a: "Нет, но при объёме действуют скидки." },
];

function AboutPage() {
  return (
    <Layout>
      {/* Hero */}
      <section className="container-page pt-10 md:pt-16">
        <div className="rounded-3xl surface-sand p-8 md:p-14">
          <span className="text-xs uppercase tracking-widest text-brown font-semibold">О компании</span>
          <h1 className="mt-4 text-4xl md:text-6xl font-display font-extrabold max-w-3xl">
            Орионавто — ориентир в автомобильном мире
          </h1>
          <p className="mt-5 max-w-2xl text-foreground/75 text-lg">
            Поставщик оригинальных запчастей, профессиональной химии Diamond ProTech и автомобилей под заказ.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link to="/for-sto" className="inline-flex items-center gap-2 h-12 px-6 rounded-xl surface-forest font-semibold">Начать сотрудничество <ArrowRight size={18} /></Link>
            <Link to="/cars-order" className="inline-flex items-center gap-2 h-12 px-6 rounded-xl bg-background border border-border font-semibold">Подобрать автомобиль</Link>
            <Link to="/parts" className="inline-flex items-center gap-2 h-12 px-6 rounded-xl bg-background border border-border font-semibold">Подобрать запчасть</Link>
          </div>
        </div>
      </section>

      {/* Brand story */}
      <section className="container-page mt-16 grid lg:grid-cols-12 gap-6">
        <div className="lg:col-span-5 rounded-3xl surface-forest p-8 md:p-10">
          <div className="text-xs uppercase tracking-widest font-semibold text-sand">Кто мы</div>
          <h2 className="mt-3 text-3xl md:text-4xl font-display font-bold">Не просто поставщик</h2>
          <p className="mt-4 text-forest-foreground/85">
            Мы строим сервис, который помогает ориентироваться в сложном рынке автозапчастей и автомобилей. Когда вокруг много «серых» схем и подделок, клиентам нужен ориентир — проверенный источник с прозрачными правилами.
          </p>
        </div>
        <div className="lg:col-span-7 rounded-3xl surface-cream p-8 md:p-10">
          <div className="text-xs uppercase tracking-widest text-brown font-semibold">Созвездие Ориона</div>
          <h3 className="mt-3 text-2xl md:text-3xl font-display font-bold">Точность. Надёжность. Понятный путь.</h3>
          <p className="mt-4 text-foreground/80">
            Созвездие Ориона — одно из самых ярких и узнаваемых на небе. Исторически звёзды были ориентирами для путешественников. Для нас это символ навигации в автомобильном мире: точность, надёжность, понятный путь к решению.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="container-page mt-12 grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { n: "20", t: "лет опыта", d: "Команда специалистов с многолетним стажем в автобизнесе." },
          { n: "9+", t: "брендов привозим", d: "BYD, Zeekr, LiXiang, Changan, Chery, Voyah, Deepal, Leapmotor, Xiaomi и др." },
          { n: "500+", t: "автомобилей поставлено", d: "Электромобили, гибриды и классические ДВС под ключ — от подбора до постановки на учёт." },
          { n: "100%", t: "оригинал", d: "Сертификаты, декларации соответствия, паспорта качества." },
        ].map((s) => (
          <div key={s.t} className="rounded-2xl bg-card border border-border p-8">
            <div className="font-display font-extrabold text-5xl text-forest">{s.n}</div>
            <div className="mt-2 font-display font-semibold">{s.t}</div>
            <div className="mt-1 text-sm text-foreground/70">{s.d}</div>
          </div>
        ))}
      </section>

      {/* Directions */}
      <section className="container-page mt-16">
        <h2 className="text-3xl md:text-4xl font-display font-bold">Наши направления</h2>
        <div className="mt-6 grid md:grid-cols-3 gap-4">
          {directions.map((d) => (
            <div key={d.t} className="rounded-2xl bg-card border border-border p-6">
              <d.i size={28} className="text-forest" />
              <div className="mt-3 font-display font-bold text-lg">{d.t}</div>
              <p className="mt-2 text-sm text-foreground/75">{d.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Expertise */}
      <section className="container-page mt-16 grid md:grid-cols-3 gap-4">
        <div className="rounded-2xl surface-cream p-7">
          <h3 className="font-display font-bold text-xl">20 лет опыта в автобизнесе</h3>
          <p className="mt-2 text-foreground/75 text-sm">Команда знает рынок изнутри: как проверить совместимость, как избежать подделок, как правильно подобрать деталь под автомобиль клиента.</p>
        </div>
        <div className="rounded-2xl surface-cream p-7">
          <h3 className="font-display font-bold text-xl">Принципиальная позиция</h3>
          <p className="mt-2 text-foreground/75 text-sm">Не работаем с аналогами, восстановленными деталями, «фабричными копиями» или серыми схемами. Только оригинал с документами.</p>
        </div>
        <div className="rounded-2xl surface-cream p-7">
          <h3 className="font-display font-bold text-xl">Фокус на доверии</h3>
          <p className="mt-2 text-foreground/75 text-sm">Сертификаты, декларации соответствия, паспорта качества — к каждой позиции, где это требуется.</p>
        </div>
      </section>

      {/* Audiences */}
      <section className="container-page mt-16">
        <h2 className="text-3xl md:text-4xl font-display font-bold">Для кого работаем</h2>
        <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {audiences.map((a) => (
            <div key={a.t} className="rounded-2xl bg-card border border-border p-6">
              <a.i size={24} className="text-forest" />
              <div className="mt-3 font-display font-bold">{a.t}</div>
              <p className="mt-2 text-sm text-foreground/75">{a.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Principles */}
      <section className="container-page mt-16">
        <h2 className="text-3xl md:text-4xl font-display font-bold">Наши принципы</h2>
        <div className="mt-6 grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {principles.map((p, i) => (
            <div key={p.t} className="rounded-2xl surface-sand p-6">
              <div className="text-3xl font-display font-extrabold text-forest">0{i + 1}</div>
              <div className="mt-2 font-display font-bold">{p.t}</div>
              <p className="mt-2 text-sm text-foreground/75">{p.d}</p>
            </div>
          ))}
        </div>
      </section>

      <Faq items={faq} />

      {/* CTA */}
      <section className="container-page mt-16 rounded-3xl bg-card border border-border p-8 md:p-12 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h3 className="text-2xl md:text-3xl font-display font-bold">Поговорим о вашей задаче?</h3>
          <p className="text-foreground/70 mt-1">Менеджер ответит в течение рабочего часа.</p>
        </div>
        <Link to="/contacts" className="inline-flex items-center gap-2 h-12 px-6 rounded-xl surface-forest font-semibold">Связаться <ArrowRight size={18} /></Link>
      </section>
    </Layout>
  );
}
