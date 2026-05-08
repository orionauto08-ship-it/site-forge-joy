export type PartCategory =
  | "Масла и жидкости"
  | "Группа ТО"
  | "Подвеска"
  | "Тормозная система"
  | "Лобовые стёкла"
  | "Кузовные детали";

export type Stock = "in_stock" | "on_order";

export type Product = {
  id: string;
  brand: string;
  category: PartCategory;
  title: string;
  oem: string;
  fits: string;
  price: number; // BYN
  stock: Stock;
  badge?: "Хит" | "Новое";
};

export const CATEGORIES: PartCategory[] = [
  "Масла и жидкости",
  "Группа ТО",
  "Подвеска",
  "Тормозная система",
  "Лобовые стёкла",
  "Кузовные детали",
];

export const BRANDS = [
  "BYD",
  "Zeekr",
  "LiXiang",
  "Changan",
  "Chery",
  "Voyah",
  "Volkswagen",
  "Audi",
];

export const PRODUCTS: Product[] = [
  {
    id: "p-001",
    brand: "BYD",
    category: "Масла и жидкости",
    title: "Масло моторное BYD 5W-30 SP, 4 л",
    oem: "BYDOIL-5W30-4L",
    fits: "BYD Han / Tang / Song Plus",
    price: 189,
    stock: "in_stock",
    badge: "Хит",
  },
  {
    id: "p-002",
    brand: "Zeekr",
    category: "Группа ТО",
    title: "Фильтр салонный угольный Zeekr 001",
    oem: "ZK001-CAB-AC",
    fits: "Zeekr 001 (2022–)",
    price: 78,
    stock: "in_stock",
  },
  {
    id: "p-003",
    brand: "LiXiang",
    category: "Тормозная система",
    title: "Колодки тормозные передние Li L9",
    oem: "LIL9-BPF-A",
    fits: "Li Auto L9 / L8",
    price: 365,
    stock: "in_stock",
    badge: "Новое",
  },
  {
    id: "p-004",
    brand: "Changan",
    category: "Подвеска",
    title: "Амортизатор передний Changan UNI-K",
    oem: "CHN-UNIK-FSA",
    fits: "Changan UNI-K (2021–)",
    price: 540,
    stock: "in_stock",
  },
  {
    id: "p-005",
    brand: "Chery",
    category: "Группа ТО",
    title: "Свечи зажигания Chery Tiggo 7 Pro, к-т 4 шт",
    oem: "CHR-T7P-SP4",
    fits: "Chery Tiggo 7 Pro / 8 Pro",
    price: 142,
    stock: "in_stock",
  },
  {
    id: "p-006",
    brand: "Voyah",
    category: "Кузовные детали",
    title: "Бампер передний Voyah Free",
    oem: "VYH-FREE-FBMP",
    fits: "Voyah Free (2022–)",
    price: 2850,
    stock: "on_order",
  },
  {
    id: "p-007",
    brand: "BYD",
    category: "Тормозная система",
    title: "Диск тормозной задний BYD Atto 3",
    oem: "BYD-ATTO3-RBD",
    fits: "BYD Atto 3 / Yuan Plus",
    price: 295,
    stock: "in_stock",
  },
  {
    id: "p-008",
    brand: "Volkswagen",
    category: "Лобовые стёкла",
    title: "Лобовое стекло VW Touareg III с обогревом",
    oem: "VW-TRG3-WS-H",
    fits: "Volkswagen Touareg (2018–)",
    price: 1890,
    stock: "on_order",
  },
  {
    id: "p-009",
    brand: "Audi",
    category: "Масла и жидкости",
    title: "Антифриз G13 концентрат Audi/VW, 5 л",
    oem: "VAG-G13-C-5L",
    fits: "Audi / VW / Skoda",
    price: 215,
    stock: "in_stock",
  },
  {
    id: "p-010",
    brand: "Zeekr",
    category: "Подвеска",
    title: "Стойка стабилизатора Zeekr 001",
    oem: "ZK001-SBL",
    fits: "Zeekr 001 (2022–)",
    price: 168,
    stock: "in_stock",
  },
  {
    id: "p-011",
    brand: "LiXiang",
    category: "Группа ТО",
    title: "Фильтр воздушный Li Auto L9",
    oem: "LIL9-AF",
    fits: "Li Auto L9 / L8 / L7",
    price: 96,
    stock: "in_stock",
  },
  {
    id: "p-012",
    brand: "Chery",
    category: "Кузовные детали",
    title: "Решётка радиатора Chery Tiggo 8 Pro Max",
    oem: "CHR-T8PM-GR",
    fits: "Chery Tiggo 8 Pro Max",
    price: 720,
    stock: "on_order",
  },
];
