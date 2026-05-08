import { createFileRoute, Link } from "@tanstack/react-router";
import { Layout } from "@/components/site/Layout";
import diamondImg from "@/assets/diamond.jpg";
import { ArrowRight, Award, FlaskConical, Globe2, ShieldCheck } from "lucide-react";

export const Route = createFileRoute("/diamond-protech")({
  head: () => ({
    meta: [
      { title: "Diamond ProTech — керамика и химия для детейлинга | Орионавто" },
      { name: "description", content: "Эксклюзивный поставщик Diamond ProTech в РБ/РФ. Швейцарское производство. PRO-линейка с защитой до 10 лет, программы сертификации." },
      { property: "og:image", content: "/src/assets/diamond.jpg" },
    ],
  }),
  component: DiamondPage,
});

const products = [
  "Diamond Body Kit", "Diamond Body 36 Kit", "Diamond Wrap Kit", "Diamond Glass Kit",
  "Diamond Wheels Kit", "Diamond Maintenance Kit", "Diamond Interior Kit", "Diamond Leather Kit",
];

function DiamondPage() {
  return (
    <Layout>
      <section className="container-page pt-10 md:pt-16">
        <div className="rounded-3xl overflow-hidden relative min-h-[480px]">
          <img src={diamondImg} alt="Diamond ProTech керамика" className="absolute inset-0 h-full w-full object-cover" width={1400} height={1000} />
          <div className="absolute inset-0 bg-gradient-to-r from-foreground/85 via-foreground/55 to-transparent" />
          <div className="relative p-8 md:p-14 max-w-2xl text-background">
            <div className="text-xs uppercase tracking-widest text-sand font-semibold">Diamond ProTech</div>
            <h1 className="mt-3 text-4xl md:text-6xl font-display font-extrabold">Защита, которой доверяют профессионалы</h1>
            <p className="mt-4 text-background/85 max-w-xl">
              Эксклюзив в РБ/РФ. Производство Швейцария (г. Поми). Патенты и лаборатория. Представлены в ЕС, США, Великобритании, Турции, Индии.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href="#catalog" className="inline-flex items-center gap-2 h-12 px-6 rounded-xl bg-background text-foreground font-semibold">Смотреть каталог <ArrowRight size={18} /></a>
              <Link to="/contacts" className="inline-flex items-center gap-2 h-12 px-6 rounded-xl border border-background/30 text-background font-semibold backdrop-blur">Подобрать решение</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Trust */}
      <section className="container-page mt-10 grid md:grid-cols-4 gap-4">
        {[
          { i: ShieldCheck, t: "Эксклюзив РБ/РФ", d: "Прямые официальные поставки." },
          { i: FlaskConical, t: "Швейцария", d: "Производство, патенты, лаборатория." },
          { i: Globe2, t: "ЕС · США · UK · TR · IN", d: "География присутствия бренда." },
          { i: Award, t: "PRO до 10 лет", d: "Сертифицированные студии." },
        ].map((x) => (
          <div key={x.t} className="rounded-2xl bg-card border border-border p-5">
            <x.i size={24} className="text-forest" />
            <div className="mt-3 font-display font-bold">{x.t}</div>
            <div className="text-sm text-foreground/70">{x.d}</div>
          </div>
        ))}
      </section>

      {/* Categories */}
      <section className="container-page mt-16">
        <h2 className="text-3xl md:text-4xl font-display font-bold">Категории</h2>
        <p className="text-foreground/70 mt-2 max-w-2xl">Структура по поверхностям и статусным блокам — для удобства подбора.</p>
        <div className="mt-6 grid md:grid-cols-3 lg:grid-cols-4 gap-4">
          {["Кузов", "Плёнки", "Стёкла", "Колёса", "Интерьер", "Кожа", "Уход", "PRO-линейка"].map((c) => (
            <div key={c} className="rounded-2xl bg-card border border-border p-5 hover:-translate-y-0.5 transition-transform">
              <div className="font-display font-semibold">{c}</div>
            </div>
          ))}
        </div>
      </section>

      {/* PRO line */}
      <section className="container-page mt-16">
        <div className="grid md:grid-cols-12 gap-6">
          <div className="md:col-span-7 rounded-3xl surface-forest p-8 md:p-12">
            <div className="text-xs uppercase tracking-widest font-semibold text-sand">PRO-линейка</div>
            <h2 className="mt-3 text-3xl md:text-4xl font-display font-bold">Защита до 10 лет — только для сертифицированных студий</h2>
            <p className="mt-4 text-forest-foreground/85 max-w-xl">УФ-стойкость, химическая защита, олеофобность, устойчивость к царапинам. Сертификация и обучение — официально.</p>
            <Link to="/contacts" className="mt-6 inline-flex items-center gap-2 h-12 px-6 rounded-xl bg-background text-foreground font-semibold">Записаться на сертификацию <ArrowRight size={18} /></Link>
          </div>
          <div className="md:col-span-5 rounded-3xl surface-sand p-8 md:p-10">
            <div className="text-xs uppercase tracking-widest text-brown font-semibold">Новинки</div>
            <h3 className="mt-2 text-2xl font-display font-bold">Diamond Quick Body · Diamond Q-D</h3>
            <p className="mt-2 text-foreground/75">Новые продукты в линейке — для быстрого нанесения.</p>
          </div>
        </div>
      </section>

      {/* Catalog */}
      <section id="catalog" className="container-page mt-16">
        <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">Популярные продукты</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {products.map((p) => (
            <div key={p} className="rounded-2xl bg-card border border-border p-6 flex flex-col">
              <div className="aspect-square rounded-xl surface-cream mb-4 flex items-center justify-center text-brown font-display font-bold text-xl">DP</div>
              <div className="font-display font-semibold">{p}</div>
              <div className="text-sm text-muted-foreground mt-1">Кит для самостоятельного нанесения</div>
              <div className="mt-4 flex gap-2">
                <button className="flex-1 h-10 rounded-lg surface-forest text-sm font-semibold">В корзину</button>
                <button className="h-10 px-3 rounded-lg border border-border text-sm font-semibold">Видео</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Hypothesis */}
      <section className="container-page mt-16 grid md:grid-cols-2 gap-4">
        <div className="rounded-2xl surface-cream p-8">
          <div className="text-xs uppercase tracking-widest text-brown font-semibold">Для физлиц</div>
          <h3 className="mt-2 font-display font-bold text-2xl">Купить кит и нанести самому</h3>
          <p className="mt-2 text-foreground/75">К каждому продукту — короткая видео-инструкция.</p>
        </div>
        <div className="rounded-2xl surface-brown p-8">
          <div className="text-xs uppercase tracking-widest font-semibold text-sand">Для студий</div>
          <h3 className="mt-2 font-display font-bold text-2xl">Получить условия для студии</h3>
          <p className="mt-2 text-brown-foreground/85">Прямые поставки, PRO-линейка, обучение.</p>
        </div>
      </section>
    </Layout>
  );
}
