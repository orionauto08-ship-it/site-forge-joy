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
};

const slides: Slide[] = [
  {
    eyebrow: "Запасные части",
    title: (
      <>
        Оригинальные автозапчасти<br />
        с <span className="text-sand">подтверждением подлинности</span>
      </>
    ),
    subtitle:
      "Сертификаты, декларации соответствия и паспорта качества. Подбор и поставка для СТО и автовладельцев.",
    image: heroParts,
    cta: { label: "Подобрать запчасти", to: "/parts" },
    cta2: { label: "Получить консультацию", to: "/contacts" },
  },
  {
    eyebrow: "Diamond ProTech",
    title: (
      <>
        Diamond ProTech —<br />
        химия для <span className="text-sand">профессионального детейлинга</span>
      </>
    ),
    subtitle:
      "Покрытия и уходовые составы с акцентом на защиту, стойкость к внешним воздействиям и стабильный результат в работе студии.",
    image: heroDiamond,
    cta: { label: "Подобрать продукт", to: "/diamond-protech" },
    cta2: { label: "Получить консультацию", to: "/contacts" },
  },
  {
    eyebrow: "Автомобили под заказ",
    title: (
      <>
        Автомобиль вашей мечты —<br />
        <span className="text-sand">с безупречным сопровождением</span>
      </>
    ),
    subtitle:
      "Находим и доставляем автомобили из любой точки мира — в выбранной вами комплектации. Безупречный сервис на каждом этапе: от подбора до ключей в ваших руках.",
    image: heroCar,
    cta: { label: "Узнать детали", to: "/cars-order" },
    cta2: { label: "Персональная консультация", to: "/contacts" },
  },
];

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
      <div className="relative rounded-3xl overflow-hidden min-h-[520px] md:min-h-[620px]">
        {/* Background images */}
        {slides.map((sl, idx) => (
          <img
            key={sl.image}
            src={sl.image}
            alt={sl.eyebrow}
            width={2000}
            height={1200}
            fetchPriority={idx === 0 ? "high" : "low"}
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${idx === i ? "opacity-100" : "opacity-0"}`}
          />
        ))}

        {/* Gradient overlay for legibility */}
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/90 via-foreground/75 to-foreground/45" />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent md:hidden" />

        {/* Content */}
        <div
          key={`text-${i}`}
          className="relative p-8 md:p-14 lg:p-16 flex flex-col justify-between min-h-[520px] md:min-h-[620px] max-w-3xl text-background animate-in fade-in slide-in-from-bottom-2 duration-500"
        >
          <div>
            <span className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-sand font-semibold">
              <span className="h-1.5 w-1.5 rounded-full bg-sand" /> {s.eyebrow}
            </span>
            <h1 className="mt-5 text-4xl md:text-5xl lg:text-6xl font-display font-extrabold tracking-tight leading-[1.05]">
              {s.title}
            </h1>
            <p className="mt-6 max-w-xl text-base md:text-lg text-background/85">{s.subtitle}</p>
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
              className="inline-flex items-center gap-2 h-12 px-6 rounded-xl bg-background/10 border border-background/40 backdrop-blur-sm text-background font-semibold hover:bg-background/20"
            >
              {s.cta2.label}
            </Link>
          </div>
        </div>

        {/* Controls */}
        <div className="absolute right-4 md:right-6 top-1/2 -translate-y-1/2 hidden md:flex flex-col gap-2 z-10">
          <button
            aria-label="Предыдущий слайд"
            onClick={() => go(i - 1)}
            className="h-11 w-11 rounded-full bg-background/15 border border-background/40 backdrop-blur-sm text-background flex items-center justify-center hover:bg-background hover:text-foreground transition-colors"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            aria-label="Следующий слайд"
            onClick={() => go(i + 1)}
            className="h-11 w-11 rounded-full bg-background/15 border border-background/40 backdrop-blur-sm text-background flex items-center justify-center hover:bg-background hover:text-foreground transition-colors"
          >
            <ChevronRight size={18} />
          </button>
        </div>

        {/* Dots */}
        <div className="absolute inset-x-4 md:inset-x-6 bottom-4 md:bottom-6 flex items-center justify-between gap-3 z-10">
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
    </section>
  );
}
