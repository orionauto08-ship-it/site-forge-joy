import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import heroParts from "@/assets/hero-parts.jpg";
import heroDiamond from "@/assets/diamond.jpg";
import heroCar from "@/assets/car-order.jpg";

type Slide = {
  eyebrow: string;
  title: React.ReactNode;
  subtitle: string;
  image: string;
  cta: { label: string; to: string };
  cta2: { label: string; to: string };
  accent: "sand" | "forest" | "brown";
};

const slides: Slide[] = [
  {
    eyebrow: "Запасные части",
    title: (
      <>
        Оригинальные автозапчасти<br />
        с <span className="text-forest">подтверждением подлинности</span>
      </>
    ),
    subtitle:
      "Сертификаты, декларации соответствия и паспорта качества. Подбор и поставка для СТО и автовладельцев.",
    image: heroParts,
    cta: { label: "Подобрать запчасти", to: "/parts" },
    cta2: { label: "Получить консультацию", to: "/contacts" },
    accent: "sand",
  },
  {
    eyebrow: "Diamond ProTech",
    title: (
      <>
        Diamond ProTech —<br />
        химия для <span className="text-forest">профессионального детейлинга</span>
      </>
    ),
    subtitle:
      "Покрытия и уходовые составы с акцентом на защиту, стойкость к внешним воздействиям и стабильный результат в работе студии. Подберём решения под задачи клиента и формат применения.",
    image: heroDiamond,
    cta: { label: "Подобрать продукт", to: "/diamond-protech" },
    cta2: { label: "Получить консультацию", to: "/contacts" },
    accent: "forest",
  },
  {
    eyebrow: "Автомобили под заказ",
    title: (
      <>
        Автомобили под заказ<br />
        из <span className="text-forest">Китая, Европы и ОАЭ</span>
      </>
    ),
    subtitle:
      "Подбор, проверка, прозрачный договор и растаможка под ключ. 20 лет опыта в подборе и поставке.",
    image: heroCar,
    cta: { label: "Получить расчёт", to: "/cars-order" },
    cta2: { label: "Получить консультацию", to: "/contacts" },
    accent: "brown",
  },
];

const accentBg: Record<Slide["accent"], string> = {
  sand: "surface-sand",
  forest: "surface-cream",
  brown: "surface-sand",
};

export function HeroSlider() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (paused) return;
    timer.current = setInterval(() => setI((p) => (p + 1) % slides.length), 6500);
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, [paused]);

  const go = (n: number) => setI((n + slides.length) % slides.length);
  const s = slides[i];

  return (
    <section
      className="container-page pt-10 md:pt-16"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="grid lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
        <div
          key={`text-${i}`}
          className={`lg:col-span-7 rounded-3xl ${accentBg[s.accent]} p-8 md:p-12 lg:p-14 flex flex-col justify-between min-h-[460px] md:min-h-[540px] animate-in fade-in slide-in-from-bottom-2 duration-500`}
        >
          <div>
            <span className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-brown font-semibold">
              <span className="h-1.5 w-1.5 rounded-full bg-forest" /> {s.eyebrow}
            </span>
            <h1 className="mt-5 text-4xl md:text-5xl lg:text-6xl font-display font-extrabold tracking-tight leading-[1.05]">
              {s.title}
            </h1>
            <p className="mt-6 max-w-xl text-base md:text-lg text-foreground/75">{s.subtitle}</p>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              to={s.cta.to}
              className="inline-flex items-center gap-2 h-12 px-6 rounded-xl surface-forest font-semibold hover:opacity-95"
            >
              {s.cta.label} <ArrowRight size={18} />
            </Link>
            <Link
              to={s.cta2.to}
              className="inline-flex items-center gap-2 h-12 px-6 rounded-xl bg-background border border-border font-semibold hover:bg-cream"
            >
              {s.cta2.label}
            </Link>

            <div className="ml-auto flex items-center gap-2">
              <button
                aria-label="Предыдущий слайд"
                onClick={() => go(i - 1)}
                className="h-10 w-10 rounded-full bg-background border border-border flex items-center justify-center hover:border-forest hover:text-forest transition-colors"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                aria-label="Следующий слайд"
                onClick={() => go(i + 1)}
                className="h-10 w-10 rounded-full bg-background border border-border flex items-center justify-center hover:border-forest hover:text-forest transition-colors"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>

        <div className="lg:col-span-5 rounded-3xl overflow-hidden relative min-h-[320px] md:min-h-[540px]">
          {slides.map((sl, idx) => (
            <img
              key={sl.image}
              src={sl.image}
              alt={sl.eyebrow}
              width={1400}
              height={1100}
              fetchPriority={idx === 0 ? "high" : "low"}
              className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${idx === i ? "opacity-100" : "opacity-0"}`}
            />
          ))}
          <div className="absolute inset-x-4 bottom-4 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              {slides.map((_, idx) => (
                <button
                  key={idx}
                  aria-label={`Слайд ${idx + 1}`}
                  onClick={() => go(idx)}
                  className={`h-2 rounded-full transition-all ${idx === i ? "w-8 bg-background" : "w-2 bg-background/60 hover:bg-background"}`}
                />
              ))}
            </div>
            <span className="text-xs font-mono text-background/90 bg-foreground/40 backdrop-blur px-2.5 py-1 rounded-md">
              {String(i + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
