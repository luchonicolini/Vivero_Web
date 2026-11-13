"use client";

import Link from "next/link";
import PlantImage from "@/components/PlantImage";
import { useConsulta } from "@/context/ConsultaContext";
import { CATEGORIES, PRODUCTS, VIVERO_CONFIG } from "@/data/vivero";

export default function HomePage() {
  const { setModalType } = useConsulta();
  const featured = PRODUCTS.filter((p) => p.featured).slice(0, 4);

  return (
    <>
      {/* 2. Hero Section */}
      <section className="relative overflow-hidden border-b border-borderline bg-background">
        <div className="max-w-content mx-auto px-5 sm:px-8 py-12 md:py-20 lg:py-24">
          <div className="grid md:grid-cols-12 gap-8 md:gap-12 items-center">
            {/* Copy: 5 columns on desktop */}
            <div className="md:col-span-5 space-y-6">
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-[60px] font-bold text-primary leading-[1.08] tracking-[-0.035em]">
                Un poco más<br />de verde en<br />tu vida.
              </h1>

              {/* Decorative flourish */}
              <svg
                className="w-28 h-5 text-primary"
                viewBox="0 0 120 22"
                fill="none"
                aria-hidden="true"
              >
                <path d="M2 15 C28 19, 54 14, 72 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M72 11 C84 3, 102 4, 114 9 C103 17, 86 18, 72 11 Z" stroke="currentColor" strokeWidth="1.5" fill="rgba(24,61,35,0.08)" />
              </svg>

              <p className="text-base sm:text-lg text-ink/90 leading-relaxed max-w-md">
                Conocé nuestras plantas, flores y productos para tu jardín.
              </p>

              {/* ONE main button as requested by brief */}
              <div>
                <Link
                  href="/catalogo"
                  className="inline-flex items-center justify-center min-h-[48px] px-6 rounded-md bg-primary hover:bg-primary-hover text-surface font-semibold text-base transition-colors"
                >
                  Explorar catálogo <span className="ml-2" aria-hidden="true">›</span>
                </Link>
              </div>
            </div>

            {/* Photograph: 7 columns on desktop */}
            <div className="md:col-span-7">
              <div className="relative rounded-lg overflow-hidden border border-borderline shadow-sm aspect-[5/4] sm:aspect-[4/3] md:aspect-[5/4] bg-surface">
                <PlantImage
                  src="/images/hero-vivero.jpg"
                  alt="Sector de plantas y flores de Vivero Siempre Verde"
                  fallbackKey="hero-home"
                  className="w-full h-full object-cover"
                  loading="eager"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Category Strip */}
      <section className="py-12 sm:py-16 bg-surface border-b border-borderline" aria-label="Categorías principales">
        <div className="max-w-content mx-auto px-5 sm:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {CATEGORIES.map((cat) => (
              <Link
                key={cat.label}
                href={`/catalogo?categoria=${encodeURIComponent(cat.label)}`}
                className="group flex flex-col bg-background border border-borderline hover:border-primary rounded-lg overflow-hidden transition-all"
              >
                <div className="aspect-[3/2] overflow-hidden bg-sage/30">
                  <PlantImage
                    src={`/images/cat-${cat.key}.jpg`}
                    alt={cat.label}
                    fallbackKey={cat.key}
                    className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
                  />
                </div>
                <div className="p-3 text-center bg-surface border-t border-borderline group-hover:bg-sage/20 transition-colors">
                  <span className="font-serif font-bold text-sm sm:text-base text-primary">
                    {cat.label} <span className="text-xs text-muted" aria-hidden="true">›</span>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 4. "Un jardín de posibilidades" (Featured products) */}
      <section className="py-16 sm:py-20 bg-background border-b border-borderline" aria-labelledby="featuredHeading">
        <div className="max-w-content mx-auto px-5 sm:px-8">
          <div className="leaf-divider mb-10 sm:mb-12">
            <h2 id="featuredHeading" className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-primary text-center tracking-[-0.025em]">
              Un jardín de posibilidades
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featured.map((product) => (
              <article
                key={product.id}
                className="bg-surface border border-borderline rounded-lg overflow-hidden flex flex-col text-center"
              >
                <Link
                  href={`/catalogo/${product.slug}`}
                  className="aspect-[4/3] overflow-hidden bg-sage/20 block"
                >
                  <PlantImage
                    src={product.images[0]?.src || "/images/monstera.jpg"}
                    alt={product.commonName}
                    fallbackKey={product.images[0]?.fallbackKey || "interior"}
                    className="w-full h-full object-cover hover:scale-102 transition-transform duration-300"
                  />
                </Link>

                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-serif font-bold text-lg sm:text-xl text-primary mb-1">
                      {product.commonName}
                    </h3>
                    <p className="text-xs text-muted mb-4">{product.badge}</p>
                  </div>

                  <Link
                    href={`/catalogo/${product.slug}`}
                    className="inline-flex items-center justify-center min-h-[40px] px-4 rounded border border-controlBorder hover:border-primary text-primary hover:bg-primary hover:text-surface text-sm font-semibold transition-colors mx-auto"
                  >
                    Ver producto <span className="ml-1" aria-hidden="true">›</span>
                  </Link>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link
              href="/catalogo"
              className="inline-flex items-center justify-center min-h-[48px] px-6 rounded-md border border-controlBorder hover:border-primary text-primary hover:bg-sage/30 font-semibold text-sm transition-colors"
            >
              Ver catálogo completo <span className="ml-2" aria-hidden="true">›</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 5. "Conocé Siempre Verde" */}
      <section className="py-16 sm:py-20 bg-surface border-b border-borderline" aria-labelledby="aboutHeading">
        <div className="max-w-content mx-auto px-5 sm:px-8">
          <div className="grid md:grid-cols-12 gap-8 md:gap-12 items-center">
            <div className="md:col-span-6">
              <div className="rounded-lg overflow-hidden border border-borderline aspect-[4/3] bg-background">
                <PlantImage
                  src="/images/nosotros-vivero.jpg"
                  alt="Plantas y cultivo en Vivero Siempre Verde"
                  fallbackKey="about"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div className="md:col-span-6 space-y-4">
              <h2 id="aboutHeading" className="font-serif text-3xl sm:text-4xl font-bold text-primary tracking-[-0.025em]">
                Conocé Siempre Verde
              </h2>

              <svg
                className="w-24 h-4 text-primary"
                viewBox="0 0 120 22"
                fill="none"
                aria-hidden="true"
              >
                <path d="M2 15 C28 19, 54 14, 72 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M72 11 C84 3, 102 4, 114 9 C103 17, 86 18, 72 11 Z" stroke="currentColor" strokeWidth="1.5" fill="rgba(24,61,35,0.08)" />
              </svg>

              <p className="text-base sm:text-lg text-ink leading-relaxed">
                Un vivero en Goya para encontrar plantas, flores y compartir el amor por el jardín.
              </p>
              <p className="text-sm text-muted leading-relaxed">
                Cultivamos y seleccionamos variedades adaptadas al clima de nuestra región, asesorándote en cada consulta para que disfrutes de tu espacio verde en casa o en tu proyecto.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. "De nuestro vivero a tu jardín" */}
      <section className="py-16 sm:py-20 bg-background" aria-labelledby="galleryHeading">
        <div className="max-w-content mx-auto px-5 sm:px-8">
          <div className="leaf-divider mb-10">
            <h2 id="galleryHeading" className="font-serif text-2xl sm:text-3xl font-bold text-primary text-center tracking-[-0.025em]">
              De nuestro vivero a tu jardín
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-10">
            {[
              { src: "/images/galeria-1.jpg", alt: "Flores de hibisco cultivadas en el vivero", key: "exterior" },
              { src: "/images/galeria-2.jpg", alt: "Pasillo de cultivo y plantines", key: "huerta" },
              { src: "/images/galeria-3.jpg", alt: "Agapantos y plantas ornamentales", key: "citricos" },
            ].map((img, i) => (
              <div key={i} className="aspect-[4/3] rounded-lg overflow-hidden border border-borderline bg-surface">
                <PlantImage
                  src={img.src}
                  alt={img.alt}
                  fallbackKey={img.key}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>

          {/* 7. Contact invitation bar */}
          <div className="bg-surface border border-borderline rounded-lg p-5 sm:p-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <svg
                className="w-5 h-5 text-primary shrink-0"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                aria-hidden="true"
              >
                <path d="M12 21s-6-5.33-6-10a6 6 0 1 1 12 0c0 4.67-6 10-6 10z" />
                <circle cx="12" cy="11" r="2.2" />
              </svg>
              <div>
                <strong className="font-serif text-lg font-bold text-primary block">
                  Vení a conocernos
                </strong>
                <span className="text-xs text-muted">{VIVERO_CONFIG.locationShort}</span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4 text-sm">
              <button
                type="button"
                onClick={() => setModalType("ubicacion")}
                className="text-primary hover:underline font-semibold cursor-pointer"
              >
                Consultar ubicación
              </button>
              <span className="text-borderline" aria-hidden="true">|</span>
              <button
                type="button"
                onClick={() => setModalType("horarios")}
                className="text-primary hover:underline font-semibold cursor-pointer"
              >
                Consultar horarios
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
