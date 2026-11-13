"use client";

import Link from "next/link";
import { Suspense, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import PlantImage from "@/components/PlantImage";
import { CATEGORIES, Category, LightLevel, PRODUCTS } from "@/data/vivero";

function removeAccents(str: string): string {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
}

function CatalogoContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("categoria");

  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>(initialCategory || "Todas");
  const [selectedLights, setSelectedLights] = useState<LightLevel[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 6;

  // Toggle light filter
  const toggleLight = (light: LightLevel) => {
    setCurrentPage(1);
    setSelectedLights((prev) =>
      prev.includes(light) ? prev.filter((l) => l !== light) : [...prev, light]
    );
  };

  // Filter products
  const filteredProducts = useMemo(() => {
    const qClean = removeAccents(searchQuery.trim());

    return PRODUCTS.filter((product) => {
      // Search term
      if (qClean) {
        const targetClean = removeAccents(
          `${product.name} ${product.commonName} ${product.category} ${product.description} ${product.botanicalName || ""}`
        );
        if (!targetClean.includes(qClean)) return false;
      }

      // Category filter
      if (activeCategory !== "Todas" && product.category !== activeCategory) {
        return false;
      }

      // Light filter
      if (selectedLights.length > 0 && !selectedLights.includes(product.light)) {
        return false;
      }

      return true;
    });
  }, [searchQuery, activeCategory, selectedLights]);

  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / itemsPerPage));
  const safePage = Math.min(currentPage, totalPages);
  const paginated = filteredProducts.slice(
    (safePage - 1) * itemsPerPage,
    safePage * itemsPerPage
  );

  const resetFilters = () => {
    setSearchQuery("");
    setActiveCategory("Todas");
    setSelectedLights([]);
    setCurrentPage(1);
  };

  return (
    <>
      {/* Catalog Hero */}
      <section className="relative overflow-hidden bg-primary text-surface py-12 md:py-16 text-center">
        <div className="absolute inset-0 opacity-20">
          <PlantImage
            src="/images/banner-catalogo.jpg"
            alt="Catálogo botánico"
            fallbackKey="catalog-hero"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative z-10 max-w-2xl mx-auto px-5 sm:px-8 space-y-4">
          <nav className="text-xs text-sage flex items-center justify-center gap-1.5 mb-2" aria-label="Ruta de navegación">
            <Link href="/" className="hover:underline">Inicio</Link>
            <span>/</span>
            <span className="font-semibold text-surface">Catálogo</span>
          </nav>

          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-[-0.025em]">
            Encontrá tu próxima planta
          </h1>
          <p className="text-sm sm:text-base text-surface/90">
            Explorá el catálogo y armá tu consulta personalizada.
          </p>

          {/* Search bar */}
          <div className="pt-2">
            <label htmlFor="catalogSearch" className="sr-only">
              Buscar plantas o productos
            </label>
            <div className="relative max-w-xl mx-auto">
              <input
                id="catalogSearch"
                type="search"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                placeholder="Buscar plantas o productos (ej: monstera, lavanda, limonero)..."
                className="w-full bg-surface text-ink text-sm sm:text-base rounded-full pl-11 pr-4 py-3 outline-none focus:ring-2 focus:ring-sage shadow-md"
              />
              <svg
                className="w-5 h-5 text-muted absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="M21 21l-4.35-4.35" />
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* Demo warning badge required by brief */}
      <div className="bg-sage/40 border-b border-borderline py-2 px-4 text-center text-xs text-muted">
        <span>Catálogo ilustrativo de demostración. Las variedades, tamaños y disponibilidad se confirman por WhatsApp.</span>
      </div>

      <div className="max-w-content mx-auto px-5 sm:px-8 py-10">
        {/* Category Pills Strip */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8" role="radiogroup" aria-label="Filtro rápido por categoría">
          <button
            type="button"
            onClick={() => {
              setActiveCategory("Todas");
              setCurrentPage(1);
            }}
            className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold border transition cursor-pointer ${
              activeCategory === "Todas"
                ? "bg-primary text-surface border-primary"
                : "bg-surface text-primary border-borderline hover:border-primary"
            }`}
          >
            Todas ({PRODUCTS.length})
          </button>
          {CATEGORIES.map((cat) => (
            <button
              key={cat.label}
              type="button"
              onClick={() => {
                setActiveCategory(cat.label);
                setCurrentPage(1);
              }}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold border transition cursor-pointer ${
                activeCategory === cat.label
                  ? "bg-primary text-surface border-primary"
                  : "bg-surface text-primary border-borderline hover:border-primary"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Layout: Sidebar 240px + Grid */}
        <div className="grid lg:grid-cols-[240px_1fr] gap-8 items-start">
          {/* Filters Sidebar */}
          <aside className="bg-surface border border-borderline rounded-lg p-5 space-y-6" aria-label="Filtros de búsqueda">
            <div>
              <h2 className="font-serif font-bold text-primary text-base mb-3 pb-2 border-b border-borderline">
                Categorías
              </h2>
              <div className="space-y-2 text-sm text-ink">
                {CATEGORIES.map((cat) => (
                  <label key={cat.label} className="flex items-center gap-2.5 cursor-pointer">
                    <input
                      type="radio"
                      name="sidebarCategory"
                      checked={activeCategory === cat.label}
                      onChange={() => {
                        setActiveCategory(cat.label);
                        setCurrentPage(1);
                      }}
                      className="text-primary focus:ring-focusRing"
                    />
                    <span>{cat.label}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <h2 className="font-serif font-bold text-primary text-base mb-3 pb-2 border-b border-borderline">
                Requerimiento de luz
              </h2>
              <div className="space-y-2 text-sm text-ink">
                {(["Plena", "Media", "Indirecta"] as LightLevel[]).map((light) => (
                  <label key={light} className="flex items-center gap-2.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedLights.includes(light)}
                      onChange={() => toggleLight(light)}
                      className="rounded text-primary focus:ring-focusRing"
                    />
                    <span>Luz {light.toLowerCase()}</span>
                  </label>
                ))}
              </div>
            </div>

            <button
              type="button"
              onClick={resetFilters}
              className="w-full py-2 px-3 text-xs font-semibold text-primary bg-background hover:bg-sage/40 rounded border border-controlBorder transition cursor-pointer"
            >
              Restablecer filtros
            </button>
          </aside>

          {/* Product Results */}
          <section aria-label="Resultados de plantas">
            <div className="flex items-center justify-between text-xs sm:text-sm text-muted mb-4 pb-2 border-b border-borderline">
              <span>Mostrando {filteredProducts.length} variedad(es)</span>
              {(searchQuery || activeCategory !== "Todas" || selectedLights.length > 0) && (
                <button
                  type="button"
                  onClick={resetFilters}
                  className="text-primary hover:underline font-semibold"
                >
                  Limpiar búsqueda
                </button>
              )}
            </div>

            {filteredProducts.length === 0 ? (
              <div className="bg-surface border border-borderline rounded-lg p-10 text-center space-y-4">
                <p className="font-serif text-xl text-primary font-bold">
                  No encontramos plantas con esos filtros
                </p>
                <p className="text-sm text-muted max-w-md mx-auto">
                  Probá ajustando los términos de búsqueda o limpiá los filtros para ver todo el catálogo.
                </p>
                <button
                  type="button"
                  onClick={resetFilters}
                  className="inline-block bg-primary hover:bg-primary-hover text-surface px-5 py-2.5 rounded-md text-sm font-semibold cursor-pointer"
                >
                  Ver todo el catálogo
                </button>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {paginated.map((product) => (
                    <article
                      key={product.id}
                      className="bg-surface border border-borderline rounded-lg overflow-hidden flex flex-col text-center"
                    >
                      <Link
                        href={`/catalogo/${product.slug}`}
                        className="aspect-[4/3] overflow-hidden bg-background block"
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
                          <h3 className="font-serif font-bold text-lg text-primary">
                            {product.commonName}
                          </h3>
                          {product.botanicalName && (
                            <p className="text-xs italic text-muted mb-1">
                              {product.botanicalName}
                            </p>
                          )}
                          <p className="text-xs text-muted mb-2">{product.badge}</p>

                          <div className="inline-flex items-center gap-1.5 text-xs text-primary font-semibold bg-sage/40 px-2.5 py-1 rounded-full mb-4">
                            <svg className="w-3.5 h-3.5 text-primary" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M17.5 3C11 3 6 8 6 14.5c0 1.7.4 3.3 1.1 4.7L4 22l1.4 1.4 3.1-3.1c1.4.7 3 1.1 4.7 1.1C19.7 21.4 22 15.6 22 9.1 22 5.7 19.9 3 17.5 3z" />
                            </svg>
                            <span>Consultar precio</span>
                          </div>
                        </div>

                        <Link
                          href={`/catalogo/${product.slug}`}
                          className="w-full bg-primary hover:bg-primary-hover text-surface text-sm font-semibold py-2.5 px-4 rounded transition-colors"
                        >
                          Ver producto
                        </Link>
                      </div>
                    </article>
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex items-center justify-center gap-2 mt-10" aria-label="Paginación de productos">
                    <button
                      type="button"
                      disabled={safePage === 1}
                      onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                      className="px-3 py-1.5 rounded border border-borderline bg-surface text-sm font-semibold disabled:opacity-40 cursor-pointer"
                      aria-label="Página anterior"
                    >
                      ‹ Anterior
                    </button>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
                      <button
                        key={num}
                        type="button"
                        onClick={() => setCurrentPage(num)}
                        className={`w-9 h-9 rounded text-sm font-semibold transition cursor-pointer ${
                          num === safePage
                            ? "bg-primary text-surface font-bold"
                            : "bg-surface border border-borderline text-ink hover:bg-sage/30"
                        }`}
                        aria-label={`Página ${num}`}
                        aria-current={num === safePage ? "page" : undefined}
                      >
                        {num}
                      </button>
                    ))}
                    <button
                      type="button"
                      disabled={safePage === totalPages}
                      onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                      className="px-3 py-1.5 rounded border border-borderline bg-surface text-sm font-semibold disabled:opacity-40 cursor-pointer"
                      aria-label="Página siguiente"
                    >
                      Siguiente ›
                    </button>
                  </div>
                )}
              </>
            )}
          </section>
        </div>
      </div>
    </>
  );
}

export default function CatalogoPage() {
  return (
    <Suspense fallback={<div className="max-w-content mx-auto px-5 py-16 text-center">Cargando catálogo...</div>}>
      <CatalogoContent />
    </Suspense>
  );
}
