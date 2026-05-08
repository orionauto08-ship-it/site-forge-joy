import { createFileRoute, Link } from "@tanstack/react-router";
import { Layout } from "@/components/site/Layout";
import { ArrowRight } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "О компании Орионавто — 20 лет у официальных дилеров" },
      { name: "description", content: "Орионавто — поставщик оригинальных автозапчастей в Беларуси. 20 лет опыта команды у официальных дилеров." },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <Layout>
      <section className="container-page pt-10 md:pt-16">
        <div className="rounded-3xl surface-sand p-8 md:p-14">
          <span className="text-xs uppercase tracking-widest text-brown font-semibold">О компании</span>
          <h1 className="mt-4 text-4xl md:text-6xl font-display font-extrabold max-w-3xl">
            Ориентир в мире автозапчастей
          </h1>
          <p className="mt-4 max-w-2xl text-foreground/75">
            Рынок — это «тёмное небо», где сложно отличить оригинал от копии. Орионавто — созвездие, по которому ориентируются СТО, детейлинг-студии и осознанные автовладельцы.
          </p>
        </div>
      </section>

      <section className="container-page mt-12 grid md:grid-cols-3 gap-4">
        {[
          { n: "20", t: "лет опыта", d: "Команда из официальных дилерских центров." },
          { n: "9+", t: "приоритетных брендов", d: "BYD, Zeekr, LiXiang, Changan, Chery, Voyah, Deepal, Leapmotor, Xiaomi." },
          { n: "14", t: "дней авиадоставки", d: "Из Китая в Минск — для гарантийных кейсов." },
        ].map((s) => (
          <div key={s.t} className="rounded-2xl bg-card border border-border p-8">
            <div className="font-display font-extrabold text-5xl text-forest">{s.n}</div>
            <div className="mt-2 font-display font-semibold">{s.t}</div>
            <div className="mt-1 text-sm text-foreground/70">{s.d}</div>
          </div>
        ))}
      </section>

      <section className="container-page mt-16 grid md:grid-cols-2 gap-4">
        <div className="rounded-2xl surface-cream p-8">
          <h3 className="font-display font-bold text-2xl">Наша позиция</h3>
          <p className="mt-3 text-foreground/80">
            Мы работаем только с оригиналом. Не везём аналоги, восстановленные детали и «фабричные копии». К каждой позиции — документы подлинности.
          </p>
        </div>
        <div className="rounded-2xl surface-forest p-8">
          <h3 className="font-display font-bold text-2xl">Tone of voice</h3>
          <p className="mt-3 text-forest-foreground/85">
            Экспертный, спокойный, рациональный. Без агрессивного маркетинга и пустых обещаний. Документы важнее слов.
          </p>
        </div>
      </section>

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
