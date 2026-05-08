import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X, Phone } from "lucide-react";

const nav = [
  { to: "/parts", label: "Запчасти" },
  { to: "/diamond-protech", label: "Diamond ProTech" },
  { to: "/for-sto", label: "Для СТО" },
  { to: "/cars-order", label: "Авто под заказ" },
  { to: "/about", label: "О компании" },
  { to: "/contacts", label: "Контакты" },
] as const;

export function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 backdrop-blur-md bg-background/80 border-b border-border">
      <div className="container-page flex items-center justify-between h-16 md:h-20">
        <Link to="/" className="flex items-center gap-2 group">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl surface-forest font-display font-bold">O</span>
          <div className="leading-tight">
            <div className="font-display font-bold text-lg tracking-tight">Орионавто</div>
            <div className="text-[11px] text-muted-foreground -mt-0.5">Ориентир в мире автомобилей</div>
          </div>
        </Link>

        <nav className="hidden lg:flex items-center gap-1">
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className="px-3 py-2 rounded-lg text-sm font-medium text-foreground/80 hover:text-foreground hover:bg-cream transition-colors"
              activeProps={{ className: "px-3 py-2 rounded-lg text-sm font-semibold text-forest bg-cream" }}
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <a href="tel:+375293223080" className="inline-flex items-center gap-2 text-sm font-medium hover:text-forest">
            <Phone size={16} /> +375 29 322 30 80
          </a>
          <Link to="/contacts" className="inline-flex h-10 items-center rounded-xl px-4 surface-forest text-sm font-semibold hover:opacity-95">
            Заявка
          </Link>
        </div>

        <button
          className="lg:hidden h-10 w-10 inline-flex items-center justify-center rounded-lg border border-border"
          onClick={() => setOpen((v) => !v)}
          aria-label="Меню"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden border-t border-border bg-background">
          <div className="container-page py-4 flex flex-col gap-1">
            {nav.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                onClick={() => setOpen(false)}
                className="px-3 py-3 rounded-lg text-base font-medium hover:bg-cream"
              >
                {n.label}
              </Link>
            ))}
            <div className="flex gap-2 pt-2">
              <a href="tel:+375293223080" className="flex-1 inline-flex items-center justify-center gap-2 h-11 rounded-xl border border-border text-sm font-medium">
                <Phone size={16} /> Позвонить
              </a>
              <Link to="/contacts" onClick={() => setOpen(false)} className="flex-1 inline-flex items-center justify-center h-11 rounded-xl surface-forest text-sm font-semibold">
                Оставить заявку
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
