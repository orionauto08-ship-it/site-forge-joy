import { Link } from "@tanstack/react-router";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border bg-cream">
      <div className="container-page py-14 grid gap-10 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl surface-forest font-display font-bold">O</span>
            <div className="font-display font-bold text-lg">Орионавто</div>
          </div>
          <p className="text-sm text-muted-foreground max-w-xs">
            Оригинальные автозапчасти с подтверждённой подлинностью. Профессиональная химия Diamond ProTech. Автомобили под заказ.
          </p>
        </div>
        <div>
          <div className="font-display font-semibold mb-3">Разделы</div>
          <ul className="space-y-2 text-sm">
            <li><Link to="/parts" className="hover:text-forest">Запчасти</Link></li>
            <li><Link to="/diamond-protech" className="hover:text-forest">Diamond ProTech</Link></li>
            <li><Link to="/for-sto" className="hover:text-forest">Для СТО</Link></li>
            <li><Link to="/cars-order" className="hover:text-forest">Авто под заказ</Link></li>
          </ul>
        </div>
        <div>
          <div className="font-display font-semibold mb-3">Компания</div>
          <ul className="space-y-2 text-sm">
            <li><Link to="/about" className="hover:text-forest">О компании</Link></li>
            <li><Link to="/contacts" className="hover:text-forest">Контакты</Link></li>
            <li><a href="#" className="hover:text-forest">Политика конфиденциальности</a></li>
            <li><a href="#" className="hover:text-forest">Оферта</a></li>
            <li><a href="#" className="hover:text-forest">Куки-политика</a></li>
          </ul>
        </div>
        <div>
          <div className="font-display font-semibold mb-3">Контакты</div>
          <ul className="space-y-2 text-sm">
            <li className="font-semibold text-foreground">ООО «ДаймондПроТеч»</li>
            <li className="text-muted-foreground">УНП 193737947</li>
            <li><a href="tel:+375293223080" className="hover:text-forest">+375 29 322 30 80</a></li>
            <li><a href="mailto:info@orionavto.by" className="hover:text-forest">info@orionavto.by</a></li>
            <li className="text-muted-foreground">
              <span className="block text-foreground/80">Юр. адрес:</span>
              220099, г. Минск, ул. Лейтенанта Кижеватова, д. 8, пом. 1
            </li>
            <li className="text-muted-foreground">
              <span className="block text-foreground/80">Факт. адрес:</span>
              220062, г. Минск, пр-т Победителей, д. 127, 2 этаж, офис 310
            </li>
            <li className="flex gap-3 pt-2">
              <a href="#" className="px-3 py-1.5 rounded-lg surface-forest text-xs font-medium">Telegram</a>
              <a href="#" className="px-3 py-1.5 rounded-lg surface-brown text-xs font-medium">WhatsApp</a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="container-page py-5 flex flex-col md:flex-row gap-2 justify-between text-xs text-muted-foreground">
          <div>© {new Date().getFullYear()} ООО «ДаймондПроТеч». УНП 193737947.</div>
          <div>Оригинал — это не обещание, а документ.</div>
        </div>
      </div>
    </footer>
  );
}
