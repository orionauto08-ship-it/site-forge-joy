import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export type FaqItem = { q: string; a: string };

export function Faq({ items, title = "Частые вопросы" }: { items: FaqItem[]; title?: string }) {
  return (
    <section className="container-page mt-16">
      <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">{title}</h2>
      <div className="rounded-3xl bg-card border border-border p-2 md:p-4">
        <Accordion type="single" collapsible className="w-full">
          {items.map((f, i) => (
            <AccordionItem key={f.q} value={`item-${i}`} className="border-border">
              <AccordionTrigger className="text-left font-display font-semibold text-base md:text-lg px-4 md:px-6 hover:no-underline hover:text-forest">
                {f.q}
              </AccordionTrigger>
              <AccordionContent className="text-foreground/80 text-base px-4 md:px-6 pb-5">
                {f.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
