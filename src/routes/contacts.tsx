import { createFileRoute } from "@tanstack/react-router";
import { Layout } from "@/components/site/Layout";
import { Phone, Mail, MapPin, MessageCircle, Loader2, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { submitLead, type LeadSource } from "@/lib/submit-lead";
import { toast } from "sonner";

type ContactsSearch = {
  source?: LeadSource;
  model?: string;
};

export const Route = createFileRoute("/contacts")({
  validateSearch: (search: Record<string, unknown>): ContactsSearch => {
    const src = search.source;
    const allowed: LeadSource[] = ["cart", "contacts", "parts", "cars"];
    const source = typeof src === "string" && (allowed as string[]).includes(src) ? (src as LeadSource) : undefined;
    const model = typeof search.model === "string" ? search.model.slice(0, 200) : undefined;
    return { source, model };
  },
  head: () => ({
    meta: [
      { title: "Контакты — Орионавто, Минск" },
      { name: "description", content: "Свяжитесь с Орионавто: телефон, email, Telegram, WhatsApp. Минск, Республика Беларусь." },
      { property: "og:title", content: "Контакты Орионавто" },
      { property: "og:description", content: "Минск. Телефон, email, Telegram, WhatsApp. Ответим в течение часа." },
    ],
  }),
  component: ContactsPage,
});

function ContactsPage() {
  return (
    <Layout>
      <section className="container-page pt-10 md:pt-16">
        <div className="rounded-3xl surface-sand p-8 md:p-14">
          <span className="text-xs uppercase tracking-widest text-brown font-semibold">Контакты</span>
          <h1 className="mt-4 text-4xl md:text-6xl font-display font-extrabold">Свяжитесь с нами</h1>
          <p className="mt-4 text-foreground/75 max-w-xl">Ответим в рабочее время в течение часа. Для срочных запросов — Telegram и WhatsApp.</p>
        </div>
      </section>

      <section className="container-page mt-10 grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          {[
            { i: Phone, t: "Телефон", v: "+375 29 322 30 80", href: "tel:+375293223080" },
            { i: Mail, t: "Email", v: "info@orionavto.by", href: "mailto:info@orionavto.by" },
            { i: MessageCircle, t: "Telegram / WhatsApp", v: "Написать в мессенджере", href: "#" },
            { i: MapPin, t: "Офис", v: "Минск, пр-т Победителей, 127, офис 310", href: "#" },
          ].map((c) => (
            <a key={c.t} href={c.href} className="block rounded-2xl bg-card border border-border p-6 hover:-translate-y-0.5 transition-transform">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-xl surface-cream flex items-center justify-center text-forest">
                  <c.i size={22} />
                </div>
                <div>
                  <div className="text-xs uppercase tracking-widest text-brown font-semibold">{c.t}</div>
                  <div className="font-display font-semibold text-lg">{c.v}</div>
                </div>
              </div>
            </a>
          ))}

          <div className="rounded-2xl surface-cream border border-border p-6">
            <div className="text-xs uppercase tracking-widest text-brown font-semibold mb-3">Реквизиты</div>
            <dl className="grid gap-3 text-sm">
              <div>
                <dt className="text-muted-foreground">Юридическое лицо</dt>
                <dd className="font-semibold">ООО «ДаймондПроТеч»</dd>
              </div>
              <div>
                <dt className="text-muted-foreground">УНП</dt>
                <dd className="font-semibold">193737947</dd>
              </div>
              <div>
                <dt className="text-muted-foreground">Юридический адрес</dt>
                <dd>220099, г. Минск, ул. Лейтенанта Кижеватова, д. 8, пом. 1</dd>
              </div>
              <div>
                <dt className="text-muted-foreground">Фактический адрес</dt>
                <dd>220062, г. Минск, пр-т Победителей, д. 127, 2 этаж, офис 310</dd>
              </div>
            </dl>
          </div>
        </div>

        <ContactForm />
      </section>
    </Layout>
  );
}

function ContactForm() {
  const { source, model } = Route.useSearch();
  const leadSource: LeadSource = source ?? "contacts";
  const initialMessage = model ? `Интересует автомобиль: ${model}` : "";

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState(initialMessage);
  const [agree, setAgree] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!agree) {
      toast.error("Подтвердите согласие на обработку персональных данных.");
      return;
    }
    if (submitting) return;
    setSubmitting(true);
    try {
      await submitLead({
        source: leadSource,
        name,
        phone,
        email: email || null,
        message: message || null,
      });
      setDone(true);
      setName(""); setPhone(""); setEmail(""); setMessage(""); setAgree(false);
    } catch (err) {
      console.error(err);
      toast.error("Не удалось отправить заявку. Попробуйте позвонить нам.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="rounded-3xl bg-card border border-border p-8 h-fit sticky top-24">
      <h2 className="text-2xl font-display font-bold">Оставить заявку</h2>
      <p className="text-sm text-foreground/70 mt-1">Опишите задачу — подберём решение.</p>
      {done ? (
        <div className="mt-6 rounded-2xl surface-cream p-6 text-center">
          <CheckCircle2 className="mx-auto text-forest" size={36} />
          <div className="mt-3 font-display font-bold text-lg">Заявка принята</div>
          <p className="mt-1 text-sm text-foreground/70">Свяжемся с вами в ближайшее время.</p>
          <button onClick={() => setDone(false)} className="mt-4 text-sm text-forest hover:underline">Отправить ещё одну</button>
        </div>
      ) : (
        <form onSubmit={onSubmit} className="mt-5 grid gap-3">
          <input value={name} onChange={(e) => setName(e.target.value)} required maxLength={120} placeholder="Имя" className="h-12 px-4 rounded-xl border border-border bg-background outline-none focus:border-forest" />
          <input value={phone} onChange={(e) => setPhone(e.target.value)} required maxLength={40} type="tel" placeholder="Телефон" className="h-12 px-4 rounded-xl border border-border bg-background outline-none focus:border-forest" />
          <input value={email} onChange={(e) => setEmail(e.target.value)} maxLength={200} type="email" placeholder="Email" className="h-12 px-4 rounded-xl border border-border bg-background outline-none focus:border-forest" />
          <textarea value={message} onChange={(e) => setMessage(e.target.value)} maxLength={2000} placeholder="Сообщение / марка / модель / артикул" rows={5} className="px-4 py-3 rounded-xl border border-border bg-background outline-none focus:border-forest resize-none" />
          <label className="flex items-start gap-2 text-xs text-muted-foreground">
            <input type="checkbox" checked={agree} onChange={(e) => setAgree(e.target.checked)} className="mt-0.5" /> Я согласен на обработку персональных данных согласно политике конфиденциальности.
          </label>
          <button type="submit" disabled={submitting} className="h-12 rounded-xl surface-forest font-semibold inline-flex items-center justify-center gap-2 disabled:opacity-60">
            {submitting ? (<><Loader2 size={16} className="animate-spin" /> Отправляем…</>) : "Отправить"}
          </button>
        </form>
      )}
    </div>
  );
}
