export type Stock = "in_stock" | "on_order";

export type Product = {
  id: string;
  brand: string;
  category: string;
  title: string;
  oem: string;
  oemEng?: string;
  fits: string;
  /** Цена в BYN. null = "По запросу". */
  price: number | null;
  stock: Stock;
  badge?: "Хит" | "Новое";
};
