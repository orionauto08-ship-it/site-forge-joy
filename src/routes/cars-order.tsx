import { createFileRoute, Link } from "@tanstack/react-router";
import { Layout } from "@/components/site/Layout";
import carImg from "@/assets/car-order.jpg";
import { ArrowRight } from "lucide-react";

export const Route = createFileRoute("/cars-order")({
  head: () => ({
    meta: [
      { title: "Авто под заказ — Китай, Европа, ОАЭ | Орионавто" },
      { name: "description", content: "Подбор, проверка, поставка автомобилей под заказ. Прозрачный договор, документы, растаможка под ключ." },
      { property: "og:image", content: "/src/assets/car-order.jpg" },
    ],
  }),
  component: CarsPage,
});

const steps = [
  "Заявка с пожеланиями: марка, модель, бюджет, срок",
  "Подбор и предложение вариантов",
  "Согласование комплектации и цены",
  "Предоплата",
  "Выкуп и логистика",
  "Растаможка и передача клиенту",
];

function CarsPage() {
  return (
    <Layout>
      <section className="container-page pt-10 md:pt-16">
        <div className="grid lg:grid-cols-12 gap-6">
          <div className="lg:col-span-7 rounded-3xl surface-sand p-8 md:p-14 flex flex-col justify-between min-h-[440px]">
            <div>
              <span className="text-xs uppercase tracking-widest text-brown font-semibold">Авто под заказ</span>
              <h1 className="mt-4 text-4xl md:text-6xl font-display font-extrabold">Китай · Европа · ОАЭ. Под ключ.</h1>
              <p className="mt-4 text-foreground/75 max-w-xl">Подбор, проверка, поставка. Прозрачный договор, документы на ввоз, растаможка под ключ.</p>
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link to="/contacts" className="inline-flex items-center gap-2 h-12 px-6 rounded-xl surface-forest font-semibold">Оставить заявку <ArrowRight size={18} /></Link>
              <Link to="/contacts" className="inline-flex items-center gap-2 h-12 px-6 rounded-xl bg-background border border-border font-semibold">Получить расчёт</Link>
            </div>
          </div>
          <div className="lg:col-span-5 rounded-3xl overflow-hidden relative min-h-[300px]">
            <img src={carImg} alt="Авто под заказ" className="absolute inset-0 h-full w-full object-cover" width={1400} height={900} />
          </div>
        </div>

        <div className="mt-6 rounded-2xl bg-card border border-border px-5 py-4 flex flex-wrap gap-x-8 gap-y-2 text-sm text-foreground/80">
          <span>20 лет опыта</span><span>Прозрачный договор</span><span>Документы на ввоз</span><span>Растаможка под ключ</span>
        </div>
      </section>

      <section className="container-page mt-16">
        <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">Как это работает</h2>
        <div className="grid md:grid-cols-3 gap-4">
          {steps.map((s, i) => (
            <div key={s} className="rounded-2xl bg-card border border-border p-6">
              <div className="text-3xl font-display font-extrabold text-forest">0{i + 1}</div>
              <div className="mt-2 font-medium">{s}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="container-page mt-16 rounded-3xl surface-cream p-8 md:p-12">
        <h3 className="text-2xl md:text-3xl font-display font-bold">Что входит в стоимость</h3>
        <p className="mt-3 text-foreground/75 max-w-2xl">Цена авто + логистика + растаможка + страховка + комиссия. Никаких скрытых платежей.</p>
      </section>
    </Layout>
  );
}
