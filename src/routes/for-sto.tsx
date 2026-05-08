import { createFileRoute, Link } from "@tanstack/react-router";
import { Layout } from "@/components/site/Layout";
import { ArrowRight, Plane, Percent, FileText, Wrench } from "lucide-react";

export const Route = createFileRoute("/for-sto")({
  head: () => ({
    meta: [
      { title: "Для СТО — оригинальные запчасти оптом | Орионавто" },
      { name: "description", content: "Поставщик оригинальных запчастей для СТО. Скидки за объём, авиадоставка из Китая 14 дней, документы для бухгалтерии." },
    ],
  }),
  component: StoPage,
});

function StoPage() {
  return (
    <Layout>
      <section className="container-page pt-10 md:pt-16">
        <div className="rounded-3xl surface-forest p-8 md:p-14">
          <span className="text-xs uppercase tracking-widest text-sand font-semibold">B2B · СТО</span>
          <h1 className="mt-4 text-4xl md:text-6xl font-display font-extrabold tracking-tight max-w-3xl">
            Оригинальные запчасти для СТО без компромиссов
          </h1>
          <p className="mt-4 text-forest-foreground/85 max-w-2xl">
            Скидки до 10% за объём. Ходовые позиции в наличии. Авиадоставка из Китая 14 дней — для гарантийных кейсов дилерских центров в РБ.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <a href="#kp" className="inline-flex items-center gap-2 h-12 px-6 rounded-xl bg-background text-foreground font-semibold">Получить КП <ArrowRight size={18} /></a>
            <Link to="/parts" className="inline-flex items-center gap-2 h-12 px-6 rounded-xl border border-background/30 text-background font-semibold">Подобрать запчасти</Link>
          </div>
        </div>
      </section>

      {/* Advantages */}
      <section className="container-page mt-10 grid md:grid-cols-4 gap-4">
        {[
          { i: Percent, t: "Скидки до 10%", d: "За объём — индивидуально." },
          { i: Plane, t: "Авиа 14 дней", d: "Гарантийные кейсы — без простоев." },
          { i: FileText, t: "Документы", d: "Полный пакет для бухгалтерии." },
          { i: Wrench, t: "Подбор", d: "Через сайт или с менеджером." },
        ].map((x) => (
          <div key={x.t} className="rounded-2xl bg-card border border-border p-6">
            <x.i size={26} className="text-forest" />
            <div className="mt-3 font-display font-bold">{x.t}</div>
            <div className="text-sm text-foreground/70">{x.d}</div>
          </div>
        ))}
      </section>

      <section className="container-page mt-16 grid md:grid-cols-2 gap-4">
        <div className="rounded-2xl surface-cream p-8">
          <h3 className="font-display font-bold text-2xl">Что вы получаете</h3>
          <ul className="mt-4 space-y-2 text-foreground/80 list-disc pl-5">
            <li>Снижение рисков подделки</li>
            <li>Экономия времени на подборе</li>
            <li>Стабильность поставок</li>
            <li>Прозрачные документы и счёт</li>
          </ul>
        </div>
        <div className="rounded-2xl surface-sand p-8">
          <h3 className="font-display font-bold text-2xl">Бренды в фокусе</h3>
          <p className="mt-3 text-foreground/80">BYD (и суббренды), Zeekr, LiXiang, Changan, Chery, Voyah, Deepal, Leapmotor, Xiaomi. Дополнительно — европейские бренды.</p>
        </div>
      </section>

      {/* CTA form */}
      <section id="kp" className="container-page mt-16">
        <div className="rounded-3xl bg-card border border-border p-8 md:p-12 grid md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-3xl font-display font-bold">Получить коммерческое предложение</h2>
            <p className="mt-3 text-foreground/75">Заполните форму — пришлём прайс и условия в течение рабочего дня.</p>
          </div>
          <form className="grid gap-3">
            <input placeholder="Компания" className="h-12 px-4 rounded-xl border border-border bg-background outline-none focus:border-forest" />
            <input placeholder="Контактное лицо" className="h-12 px-4 rounded-xl border border-border bg-background outline-none focus:border-forest" />
            <div className="grid grid-cols-2 gap-3">
              <input type="tel" placeholder="Телефон" className="h-12 px-4 rounded-xl border border-border bg-background outline-none focus:border-forest" />
              <input type="email" placeholder="Email" className="h-12 px-4 rounded-xl border border-border bg-background outline-none focus:border-forest" />
            </div>
            <input placeholder="Объём закупок в месяц" className="h-12 px-4 rounded-xl border border-border bg-background outline-none focus:border-forest" />
            <input placeholder="Бренды авто" className="h-12 px-4 rounded-xl border border-border bg-background outline-none focus:border-forest" />
            <button type="button" className="h-12 rounded-xl surface-forest font-semibold">Отправить заявку</button>
          </form>
        </div>
      </section>
    </Layout>
  );
}
