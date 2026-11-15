export const VIVERO_CONFIG = {
  name: "Vivero Siempre Verde",
  location: "Goya, Corrientes, Argentina",
  locationShort: "Goya, Corrientes",
  whatsappNumber: "543777704993",
  whatsappUrl: "https://wa.me/543777704993",
  instagramUrl: "https://www.instagram.com/vivero.siempre.verde/",
  facebookUrl: "https://www.facebook.com/p/Vivero-Siempre-Verde-100046941047657/",
  threadsUrl: "https://www.threads.com/@vivero.siempre.verde",
  locationNotice: "Estamos en Goya, Corrientes. Para coordinar visita o retiro, consultanos por WhatsApp.",
  hoursNotice: "Horarios y días de atención a confirmar según temporada por WhatsApp.",
};

export type Category = 
  | "Interior" 
  | "Exterior" 
  | "Cítricos y frutales" 
  | "Huerta" 
  | "Macetas e insumos";

export type LightLevel = "Plena" | "Media" | "Indirecta";

export interface ProductVariant {
  id: string;
  label: string;
  priceNote?: string;
  availability?: "consultar" | "disponible" | "sin-stock";
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  commonName: string;
  botanicalName?: string;
  category: Category;
  badge: string;
  description: string;
  light: LightLevel;
  careSummary: string;
  watering: string;
  indoor: boolean;
  outdoor: boolean;
  featured: boolean;
  isDemo: boolean;
  images: {
    src: string;
    alt: string;
  }[];
  variants: ProductVariant[];
}

export const CATEGORIES: { label: Category; key: string }[] = [
  { label: "Interior", key: "interior" },
  { label: "Exterior", key: "exterior" },
  { label: "Cítricos y frutales", key: "citricos" },
  { label: "Huerta", key: "huerta" },
  { label: "Macetas e insumos", key: "macetas" },
];

export const PRODUCTS: Product[] = [
  {
    id: "monstera",
    slug: "monstera",
    name: "Monstera deliciosa",
    commonName: "Monstera",
    botanicalName: "Monstera deliciosa",
    category: "Interior",
    badge: "Planta de interior",
    description: "Hojas grandes y acorazonadas con fenestraciones características. Ideal para aportar verde y vida a espacios luminosos de interior.",
    light: "Indirecta",
    careSummary: "Luz brillante indirecta y humedad moderada",
    watering: "Riego moderado cuando el sustrato superficial esté seco",
    indoor: true,
    outdoor: false,
    featured: true,
    isDemo: true,
    images: [
      {
        src: "/images/monstera.jpg",
        alt: "Monstera deliciosa con hojas grandes y fenestradas, en maceta. Foto ilustrativa.",
      },
      {
        src: "/images/galeria-3.webp",
        alt: "Otra vista ilustrativa de una planta ornamental de interior; no necesariamente Monstera.",
      },
    ],
    variants: [
      { id: "m-chica", label: "Maceta chica (Ø 16cm)", priceNote: "Consultar precio" },
      { id: "m-mediana", label: "Maceta mediana (Ø 22cm)", priceNote: "Consultar precio" },
    ],
  },
  {
    id: "potus",
    slug: "potus",
    name: "Potus verde",
    commonName: "Potus",
    botanicalName: "Epipremnum aureum",
    category: "Interior",
    badge: "Planta de interior",
    description: "Planta trepadora o colgante muy resistente, con follaje verde brillante variegado. Excelente para principiantes.",
    light: "Indirecta",
    careSummary: "Tolera niveles variados de luz, evitar sol directo",
    watering: "Riego semanal moderado",
    indoor: true,
    outdoor: false,
    featured: false,
    isDemo: true,
    images: [
      {
        src: "/images/galeria-3.webp",
        alt: "Planta de interior de follaje verde. Foto ilustrativa; no representa necesariamente un potus.",
      },
    ],
    variants: [
      { id: "potus-colgante", label: "Presentación colgante", priceNote: "Consultar precio" },
      { id: "potus-tutor", label: "Con tutor de musgo", priceNote: "Consultar precio" },
    ],
  },
  {
    id: "sansevieria",
    slug: "sansevieria",
    name: "Sansevieria trifasciata",
    commonName: "Sansevieria",
    botanicalName: "Dracaena trifasciata",
    category: "Interior",
    badge: "Planta de interior y semi-sombra",
    description: "Muy rústica y purificadora del aire. Resiste sequías y distintas condiciones de luz sin perder su porte vertical.",
    light: "Media",
    careSummary: "Muy resistente a la falta de riego",
    watering: "Riego escaso, espaciado cada 15 a 20 días",
    indoor: true,
    outdoor: true,
    featured: false,
    isDemo: true,
    images: [
      {
        src: "/images/sansevieria.jpg",
        alt: "Sansevieria de hojas erguidas en maceta. Foto ilustrativa.",
      },
    ],
    variants: [
      { id: "san-estandar", label: "Maceta estándar", priceNote: "Consultar precio" },
    ],
  },
  {
    id: "petunias",
    slug: "petunias",
    name: "Petunias en flor",
    commonName: "Petunias",
    botanicalName: "Petunia hybrida",
    category: "Exterior",
    badge: "Planta de exterior",
    description: "Flores abundantes y coloridas para balcones, canteros y jardines soleados. Floración prolongada.",
    light: "Plena",
    careSummary: "Requiere sol directo para florecer en abundancia",
    watering: "Riego regular, más frecuente en días calurosos",
    indoor: false,
    outdoor: true,
    featured: true,
    isDemo: true,
    images: [
      {
        src: "/images/petunias.jpg",
        alt: "Petunias violetas florecidas en maceta. Foto ilustrativa.",
      },
    ],
    variants: [
      { id: "pet-plantin", label: "Pack de plantines", priceNote: "Consultar precio" },
      { id: "pet-maceta", label: "Maceta armada florecida", priceNote: "Consultar precio" },
    ],
  },
  {
    id: "limonero",
    slug: "limonero",
    name: "Limonero 4 estaciones",
    commonName: "Limonero",
    botanicalName: "Citrus x limon",
    category: "Cítricos y frutales",
    badge: "Cítricos y frutales",
    description: "Árbol frutal injertado de gran productividad. Ofrece limones jugosos y flores de azahar perfumadas a lo largo de todo el año.",
    light: "Plena",
    careSummary: "Pleno sol, suelo con buen drenaje y nutrientes",
    watering: "Riego regular y profundo, sin encharcar",
    indoor: false,
    outdoor: true,
    featured: true,
    isDemo: true,
    images: [
      {
        src: "/images/limonero.jpg",
        alt: "Limonero en maceta con frutos amarillos. Foto ilustrativa.",
      },
    ],
    variants: [
      { id: "lim-injerto-1", label: "Envasado 10L", priceNote: "Consultar precio" },
      { id: "lim-injerto-2", label: "Envasado 15L desarrollado", priceNote: "Consultar precio" },
    ],
  },
  {
    id: "lavanda",
    slug: "lavanda",
    name: "Lavanda aromática",
    commonName: "Lavanda",
    botanicalName: "Lavandula angustifolia",
    category: "Exterior",
    badge: "Planta de exterior",
    description: "Aromática perenne con espigas violáceas muy perfumadas. Gran resistencia al sol y atractiva para polinizadores.",
    light: "Plena",
    careSummary: "Mucho sol y excelente drenaje",
    watering: "Riego moderado, dejar secar el sustrato entre riegos",
    indoor: false,
    outdoor: true,
    featured: false,
    isDemo: true,
    images: [
      {
        src: "/images/petunias.jpg",
        alt: "Flores ornamentales violetas en maceta; imagen ilustrativa, no identifica lavanda.",
      },
    ],
    variants: [
      { id: "lav-maceta", label: "Maceta mediana", priceNote: "Consultar precio" },
    ],
  },
  {
    id: "macetas",
    slug: "macetas",
    name: "Macetas de barro y diseño",
    commonName: "Macetas",
    category: "Macetas e insumos",
    badge: "Macetas e insumos",
    description: "Macetas tradicionales de barro cocido y diseños contemporáneos para realzar plantas de interior y jardín.",
    light: "Media",
    careSummary: "Aptas para interior y exterior con drenaje",
    watering: "Variedad de tamaños y acabados",
    indoor: true,
    outdoor: true,
    featured: true,
    isDemo: true,
    images: [
      {
        src: "/images/galeria-2.webp",
        alt: "Sustrato y herramientas de jardinería; imagen ilustrativa para la categoría macetas e insumos.",
      },
    ],
    variants: [
      { id: "mac-barro-18", label: "Barro clásico Ø 18cm", priceNote: "Consultar precio" },
      { id: "mac-barro-24", label: "Barro clásico Ø 24cm", priceNote: "Consultar precio" },
    ],
  },
  {
    id: "huerta-albahaca",
    slug: "huerta",
    name: "Plantines de huerta aromática",
    commonName: "Huerta",
    category: "Huerta",
    badge: "Huerta",
    description: "Variedad de plantines de estación para armar tu propia huerta en casa: albahaca, perejil, orégano, romero y más.",
    light: "Plena",
    careSummary: "Mínimo 4 a 6 horas de sol directo",
    watering: "Riego suave y regular",
    indoor: false,
    outdoor: true,
    featured: false,
    isDemo: true,
    images: [
      {
        src: "/images/albahaca.jpg",
        alt: "Plantines jóvenes de albahaca en macetas. Foto ilustrativa.",
      },
    ],
    variants: [
      { id: "pack-huerta-6", label: "Pack 6 plantines a elección", priceNote: "Consultar precio" },
    ],
  },
  {
    id: "naranjo",
    slug: "naranjo",
    name: "Naranjo de ombligo injertado",
    commonName: "Naranjo",
    botanicalName: "Citrus x sinensis",
    category: "Cítricos y frutales",
    badge: "Cítricos y frutales",
    description: "Planta de naranja dulce injertada y aclimatada a la región correntina. Follaje perenne verde oscuro.",
    light: "Plena",
    careSummary: "Pleno sol y protección contra vientos fuertes",
    watering: "Riego regular en floración y fructificación",
    indoor: false,
    outdoor: true,
    featured: false,
    isDemo: true,
    images: [
      {
        src: "/images/naranjo.jpg",
        alt: "Árbol cítrico en maceta con frutos amarillos. Foto ilustrativa.",
      },
    ],
    variants: [
      { id: "nar-10l", label: "Envasado 10L", priceNote: "Consultar precio" },
    ],
  },
];
