import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Cookie, X } from "lucide-react";

const STORAGE_KEY = "orionavto_cookie_consent_v1";

export function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const v = localStorage.getItem(STORAGE_KEY);
      if (!v) setVisible(true);
    } catch {
      setVisible(true);
    }
  }, []);

  const decide = (value: "accepted" | "declined") => {
    try {
      localStorage.setItem(STORAGE_KEY, value);
    } catch {
      /* ignore */
    }
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-[60] px-3 pb-3 sm:px-6 sm:pb-6 pointer-events-none">
      <div className="pointer-events-auto mx-auto max-w-3xl rounded-2xl border border-border bg-card/95 backdrop-blur shadow-2xl p-4 sm:p-5">
        <div className="flex items-start gap-3">
          <div className="shrink-0 mt-0.5 h-9 w-9 rounded-full bg-cream inline-flex items-center justify-center">
            <Cookie size={18} className="text-brown" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="font-display font-bold text-sm sm:text-base">Мы используем файлы cookie</div>
            <p className="mt-1 text-xs sm:text-sm text-foreground/70 leading-relaxed">
              Cookie помогают сайту работать корректно и улучшать ваш опыт. Продолжая пользоваться сайтом, вы соглашаетесь с{" "}
              <Link to="/cookie-policy" className="underline hover:text-forest">Политикой Cookie</Link>{" "}
              и{" "}
              <Link to="/privacy-policy" className="underline hover:text-forest">Политикой обработки персональных данных</Link>.
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              <button
                onClick={() => decide("accepted")}
                className="h-9 px-4 rounded-xl surface-forest text-sm font-semibold"
              >
                Принять
              </button>
              <button
                onClick={() => decide("declined")}
                className="h-9 px-4 rounded-xl border border-border text-sm font-medium hover:bg-cream"
              >
                Только необходимые
              </button>
            </div>
          </div>
          <button
            onClick={() => decide("declined")}
            aria-label="Закрыть"
            className="shrink-0 text-foreground/50 hover:text-foreground"
          >
            <X size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
