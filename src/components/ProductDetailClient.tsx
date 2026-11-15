"use client";

import Link from "next/link";
import { useState } from "react";
import { useConsulta } from "@/context/ConsultaContext";
import { Product } from "@/data/vivero";
import PlantImage from "./PlantImage";

interface Props {
  product: Product;
  relatedProducts: Product[];
}

export default function ProductDetailClient({ product, relatedProducts }: Props) {
  const { addItem, setDrawerOpen, sendWhatsApp, totalUnits } = useConsulta();
  const [selectedImgIndex, setSelectedImgIndex] = useState(0);
  const [selectedVariantId, setSelectedVariantId] = useState(
    product.variants[0]?.id || ""
  );
  const [qty, setQty] = useState(1);
  const [addedNotice, setAddedNotice] = useState(false);

  const currentImage = product.images[selectedImgIndex] || product.images[0];

  const handleAdd = () => {
    addItem(product.id, qty, selectedVariantId || undefined);
    setAddedNotice(true);
    setTimeout(() => setAddedNotice(false), 3000);
  };

  return (
    <div className="max-w-content mx-auto px-5 sm:px-8 py-8 sm:py-12">
      {/* Breadcrumb */}
      <nav className="text-xs sm:text-sm text-muted flex flex-wrap items-center gap-2 mb-8" aria-label="Ruta de navegación">
        <Link href="/" className="hover:underline hover:text-primary">Inicio</Link>
        <span aria-hidden="true">/</span>
        <Link href="/catalogo" className="hover:underline hover:text-primary">Catálogo</Link>
        <span aria-hidden="true">/</span>
        <Link
          href={`/catalogo?categoria=${encodeURIComponent(product.category)}`}
          className="hover:underline hover:text-primary"
        >
          {product.category}
        </Link>
        <span aria-hidden="true">/</span>
        <strong className="text-primary font-semibold">{product.commonName}</strong>
      </nav>

      {/* Main Product Layout: 2 columns */}
      <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Left Column: Gallery (1:1 main image, 72px thumbnails with 12px gap) */}
        <div className="lg:col-span-6 space-y-3">
          <div className="aspect-square rounded-lg overflow-hidden border border-borderline bg-surface shadow-sm">
            <PlantImage
              src={currentImage?.src || "/images/monstera.jpg"}
              alt={currentImage?.alt || product.name}
              className="w-full h-full object-cover"
              loading="eager"
              priority
            />
          </div>

          {/* Thumbnails */}
          {product.images.length > 1 && (
            <div className="flex items-center gap-3" role="group" aria-label="Fotos del producto">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setSelectedImgIndex(idx)}
                  className={`w-[72px] h-[72px] rounded border-2 overflow-hidden bg-surface transition-all cursor-pointer ${
                    selectedImgIndex === idx
                      ? "border-primary ring-2 ring-primary/20"
                      : "border-borderline hover:border-primary"
                  }`}
                  aria-label={`Ver foto ${idx + 1} de ${product.commonName}`}
                  aria-pressed={selectedImgIndex === idx}
                >
                  <PlantImage
                    src={img.src}
                    alt={img.alt}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Information & Consultation */}
        <div className="lg:col-span-6 space-y-6">
          <div>
            <span className="inline-block bg-sage/60 text-primary text-xs font-semibold px-3 py-1 rounded mb-3">
              {product.badge}
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-primary tracking-[-0.025em]">
              {product.name}
            </h1>
            {product.botanicalName && (
              <p className="text-sm italic text-muted mt-1">
                Nombre botánico: {product.botanicalName}
              </p>
            )}
          </div>

          <p className="text-sm sm:text-base text-ink leading-relaxed">
            {product.description}
          </p>

          {/* Care & specs card */}
          <div className="bg-surface border border-borderline rounded-lg p-5 space-y-3 text-sm text-ink">
            <h2 className="font-serif font-bold text-primary text-base pb-1 border-b border-borderline">
              Guía de cultivo y cuidados
            </h2>
            <div className="flex items-start gap-2.5">
              <svg className="w-4 h-4 text-primary shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="5" />
                <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
              </svg>
              <div>
                <strong>Luz:</strong> Luz {product.light.toLowerCase()} ({product.careSummary})
              </div>
            </div>
            <div className="flex items-start gap-2.5">
              <svg className="w-4 h-4 text-primary shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
              </svg>
              <div>
                <strong>Riego:</strong> {product.watering}
              </div>
            </div>
          </div>

          {/* Variant Selector (if applicable) */}
          {product.variants.length > 0 && (
            <div className="space-y-2">
              <label htmlFor="variantSelect" className="block text-sm font-semibold text-primary">
                Presentación / Tamaño:
              </label>
              <select
                id="variantSelect"
                value={selectedVariantId}
                onChange={(e) => setSelectedVariantId(e.target.value)}
                className="w-full min-w-0 bg-surface border border-controlBorder rounded-md px-3.5 py-2.5 text-base text-ink outline-none focus:ring-2 focus:ring-focusRing"
              >
                {product.variants.map((v) => (
                  <option key={v.id} value={v.id}>
                    {v.label} — {v.priceNote || "Consultar precio"}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Price notice */}
          <div className="bg-sage/40 border border-borderline rounded p-4 flex items-center justify-between">
            <div>
              <span className="text-xs text-muted block uppercase tracking-wider font-medium">Condición</span>
              <strong className="text-base text-primary font-serif">Consultá precio y disponibilidad</strong>
            </div>
            <span className="text-xs text-muted">Stock a confirmar</span>
          </div>

          {/* Quantity Stepper & Add to Consultation */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center gap-4">
              <span className="text-sm font-semibold text-primary">Cantidad:</span>
              <div className="inline-flex items-center border border-controlBorder rounded bg-surface">
                <button
                  type="button"
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  className="w-11 h-11 flex items-center justify-center font-bold text-primary hover:bg-sage/40 text-lg cursor-pointer"
                  aria-label="Restar una unidad"
                >
                  −
                </button>
                <span className="w-12 text-center font-bold text-base">
                  {qty}
                </span>
                <button
                  type="button"
                  onClick={() => setQty((q) => q + 1)}
                  className="w-11 h-11 flex items-center justify-center font-bold text-primary hover:bg-sage/40 text-lg cursor-pointer"
                  aria-label="Sumar una unidad"
                >
                  +
                </button>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                type="button"
                onClick={handleAdd}
                className="flex-1 min-h-[48px] bg-primary hover:bg-primary-hover text-surface font-semibold py-3 px-6 rounded-md transition cursor-pointer text-base flex items-center justify-center gap-2"
              >
                <span>+ Agregar a mi consulta</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  addItem(product.id, qty, selectedVariantId || undefined);
                  setDrawerOpen(true);
                }}
                className="min-h-[48px] px-5 rounded-md border border-controlBorder hover:border-primary text-primary hover:bg-sage/30 text-sm font-semibold transition cursor-pointer"
              >
                Ver consulta ({totalUnits + qty})
              </button>
            </div>

            {addedNotice && (
              <div className="animate-confirm p-3 bg-sage border border-primary/30 rounded text-xs text-primary font-semibold text-center">
                ✓ Se agregaron {qty} unidad(es) a tu consulta.
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="mt-16 sm:mt-20 pt-12 border-t border-borderline" aria-labelledby="relatedHeading">
          <h2 id="relatedHeading" className="font-serif text-2xl font-bold text-primary mb-6">
            Variedades recomendadas de {product.category.toLowerCase()}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {relatedProducts.map((rel) => (
              <article
                key={rel.id}
                className="bg-surface border border-borderline rounded-lg overflow-hidden flex flex-col text-center"
              >
                <Link href={`/catalogo/${rel.slug}`} className="aspect-[4/3] overflow-hidden bg-background block">
                  <PlantImage
                    src={rel.images[0]?.src || "/images/monstera.jpg"}
                    alt={rel.images[0]?.alt || rel.commonName}
                    className="w-full h-full object-cover hover:scale-102 transition-transform duration-300"
                  />
                </Link>
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-serif font-bold text-base text-primary mb-1">
                      {rel.commonName}
                    </h3>
                    <p className="text-xs text-muted mb-3">{rel.badge}</p>
                  </div>
                  <Link
                    href={`/catalogo/${rel.slug}`}
                    className="inline-block bg-background hover:bg-sage/40 text-primary border border-controlBorder rounded py-1.5 px-3 text-xs font-semibold transition"
                  >
                    Ver detalle
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
