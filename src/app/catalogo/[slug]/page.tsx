import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PRODUCTS, VIVERO_CONFIG } from "@/data/vivero";
import ProductDetailClient from "@/components/ProductDetailClient";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return PRODUCTS.map((product) => ({
    slug: product.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = PRODUCTS.find((p) => p.slug === slug);

  if (!product) {
    return {
      title: `Planta no encontrada · ${VIVERO_CONFIG.name}`,
    };
  }

  return {
    title: `${product.name} · ${VIVERO_CONFIG.name}`,
    description: `${product.badge}. ${product.description} Consultá disponibilidad y precio en Goya, Corrientes.`,
    openGraph: {
      title: `${product.name} · ${VIVERO_CONFIG.name}`,
      description: `${product.badge}. ${product.description}`,
      locale: "es_AR",
      type: "website",
    },
  };
}

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params;
  const product = PRODUCTS.find((p) => p.slug === slug);

  if (!product) {
    notFound();
  }

  // Get up to 3 related products in same category
  const related = PRODUCTS.filter(
    (p) => p.category === product.category && p.id !== product.id
  ).slice(0, 3);

  return <ProductDetailClient product={product} relatedProducts={related} />;
}
