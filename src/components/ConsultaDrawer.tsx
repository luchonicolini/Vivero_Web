"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { useConsulta } from "@/context/ConsultaContext";
import { PRODUCTS } from "@/data/vivero";
import PlantImage from "./PlantImage";

export default function ConsultaDrawer() {
  const {
    items,
    totalUnits,
    drawerOpen,
    setDrawerOpen,
    updateQty,
    removeItem,
    clearConsulta,
    sendWhatsApp,
    copyDraftToClipboard,
  } = useConsulta();

  const [locality, setLocality] = useState("");
  const [copied, setCopied] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);

  // Close on Escape & trap focus
  useEffect(() => {
    if (!drawerOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setDrawerOpen(false);
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [drawerOpen, setDrawerOpen]);

  if (!drawerOpen) return null;

  const handleCopy = async () => {
    const success = await copyDraftToClipboard(locality);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end"
      role="dialog"
      aria-modal="true"
      aria-label="Panel de Mi Consulta"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-ink/40 backdrop-blur-[1px] transition-opacity"
        onClick={() => setDrawerOpen(false)}
        aria-hidden="true"
      />

      {/* Drawer content (desktop 420px, full-width mobile) */}
      <div
        ref={drawerRef}
        className="relative z-10 w-full max-w-[420px] bg-surface h-full flex flex-col shadow-2xl border-l border-borderline"
      >
        {/* Header */}
        <div className="bg-sage px-6 py-4 flex items-center justify-between border-b border-borderline text-primary">
          <div className="flex items-center gap-2">
            <svg
              className="w-5 h-5 shrink-0"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M17.5 3C11 3 6 8 6 14.5c0 1.7.4 3.3 1.1 4.7L4 22l1.4 1.4 3.1-3.1c1.4.7 3 1.1 4.7 1.1C19.7 21.4 22 15.6 22 9.1 22 5.7 19.9 3 17.5 3z" />
            </svg>
            <h2 className="font-serif text-xl font-bold">Mi consulta</h2>
          </div>
          <button
            type="button"
            onClick={() => setDrawerOpen(false)}
            className="w-8 h-8 flex items-center justify-center rounded text-2xl text-primary hover:bg-black/5 cursor-pointer leading-none"
            aria-label="Cerrar panel de consulta"
          >
            &times;
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-5">
          {items.length === 0 ? (
            <div className="py-12 text-center space-y-4">
              <p className="font-serif text-lg text-primary">Tu consulta está vacía</p>
              <p className="text-sm text-muted max-w-xs mx-auto">
                Explorá el catálogo para sumar plantas, macetas o insumos a tu lista.
              </p>
              <Link
                href="/catalogo"
                onClick={() => setDrawerOpen(false)}
                className="inline-block bg-primary hover:bg-primary-hover text-surface px-5 py-2.5 rounded-md text-sm font-semibold transition"
              >
                Explorar catálogo
              </Link>
            </div>
          ) : (
            <>
              {/* Product list */}
              <div className="divide-y divide-borderline">
                {items.map((item) => {
                  const product = PRODUCTS.find((p) => p.id === item.productId);
                  if (!product) return null;
                  const variant = product.variants.find((v) => v.id === item.variantId);

                  return (
                    <div key={`${item.productId}-${item.variantId || "default"}`} className="py-3.5 flex items-start gap-3">
                      <div className="w-16 h-14 rounded overflow-hidden border border-borderline shrink-0">
                        <PlantImage
                          src={product.images[0]?.src || "/images/monstera.jpg"}
                          alt={product.commonName}
                          fallbackKey={product.images[0]?.fallbackKey || "interior"}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      <div className="flex-1 min-w-0">
                        <h3 className="font-serif font-bold text-primary text-base truncate">
                          {product.commonName}
                        </h3>
                        {variant && (
                          <p className="text-xs text-muted truncate">{variant.label}</p>
                        )}
                        <p className="text-xs text-muted mt-0.5">Precio a confirmar</p>

                        {/* Stepper controls */}
                        <div className="flex items-center gap-2 mt-2">
                          <div className="inline-flex items-center border border-controlBorder rounded bg-surface">
                            <button
                              type="button"
                              onClick={() => updateQty(item.productId, item.qty - 1, item.variantId)}
                              className="w-7 h-7 flex items-center justify-center font-bold text-primary hover:bg-sage/40"
                              aria-label={`Restar una unidad de ${product.commonName}`}
                            >
                              −
                            </button>
                            <span className="w-8 text-center text-xs font-semibold">
                              {item.qty}
                            </span>
                            <button
                              type="button"
                              onClick={() => updateQty(item.productId, item.qty + 1, item.variantId)}
                              className="w-7 h-7 flex items-center justify-center font-bold text-primary hover:bg-sage/40"
                              aria-label={`Sumar una unidad de ${product.commonName}`}
                            >
                              +
                            </button>
                          </div>
                          <span className="text-xs text-muted">unidades</span>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => removeItem(item.productId, item.variantId)}
                        className="text-muted hover:text-error p-1 text-lg leading-none cursor-pointer"
                        aria-label={`Eliminar ${product.commonName} de la consulta`}
                      >
                        &times;
                      </button>
                    </div>
                  );
                })}
              </div>

              {/* Total units & Clear */}
              <div className="pt-2 flex items-center justify-between text-sm border-t border-borderline">
                <span className="font-semibold text-primary">
                  Total acumulado: {totalUnits} {totalUnits === 1 ? "unidad" : "unidades"}
                </span>
                <button
                  type="button"
                  onClick={clearConsulta}
                  className="text-xs text-muted hover:text-error underline cursor-pointer"
                >
                  Vaciar lista
                </button>
              </div>

              {/* Optional destination locality */}
              <div className="space-y-1.5 pt-2">
                <label htmlFor="consultaLocality" className="block text-xs font-semibold text-primary">
                  Localidad o zona (opcional)
                </label>
                <input
                  id="consultaLocality"
                  type="text"
                  value={locality}
                  onChange={(e) => setLocality(e.target.value)}
                  placeholder="Ej: Goya centro, zona rural, otra localidad"
                  className="w-full text-sm px-3 py-2 border border-controlBorder rounded bg-background focus:outline-2 focus:outline-focusRing"
                />
              </div>

              {/* Essential notice required by brief */}
              <div className="bg-sage/40 p-3.5 rounded border border-borderline text-xs text-ink/80 flex items-start gap-2.5">
                <svg
                  className="w-4 h-4 text-primary shrink-0 mt-0.5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  aria-hidden="true"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 16v-4M12 8h.01" />
                </svg>
                <p>
                  <strong>Importante:</strong> El vivero confirmará disponibilidad, precios vigentes y opciones de entrega o retiro al recibir tu mensaje.
                </p>
              </div>
            </>
          )}
        </div>

        {/* Footer actions */}
        {items.length > 0 && (
          <div className="p-5 border-t border-borderline bg-background space-y-2.5">
            <button
              type="button"
              onClick={() => sendWhatsApp(locality)}
              className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary-hover text-surface font-semibold py-3 px-4 rounded-md transition cursor-pointer text-sm"
            >
              <svg className="w-5 h-5 text-whatsapp" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12.04 2a9.9 9.9 0 0 0-8.52 15l-1.1 4 4.1-1.08A9.92 9.92 0 1 0 12.04 2zm5.8 14.08c-.24.68-1.42 1.3-1.97 1.38-.52.08-1.18.11-1.9-.12-.44-.14-1-.33-1.72-.64-3.03-1.31-5-4.38-5.15-4.58-.15-.2-1.23-1.64-1.23-3.13 0-1.49.78-2.22 1.06-2.52.27-.3.6-.38.8-.38h.58c.18 0 .44-.07.68.52.25.6.85 2.08.92 2.23.08.15.13.33.03.53-.1.2-.15.33-.3.5-.15.18-.32.4-.45.54-.15.15-.3.32-.13.62.18.3.78 1.29 1.68 2.09 1.15 1.03 2.13 1.35 2.43 1.5.3.15.48.13.66-.08.18-.2.75-.88.95-1.18.2-.3.4-.25.68-.15.28.1 1.77.84 2.07.99.3.15.5.22.58.35.08.12.08.73-.17 1.41z"/>
              </svg>
              <span>Preparar consulta por WhatsApp</span>
            </button>

            <button
              type="button"
              onClick={handleCopy}
              className="w-full py-2 px-3 text-xs font-semibold text-primary hover:bg-sage/40 rounded border border-controlBorder transition cursor-pointer text-center"
            >
              {copied ? "✓ Mensaje copiado al portapapeles" : "Copiar borrador de mensaje"}
            </button>

            <p className="text-[11px] text-center text-muted">
              Al hacer clic se abrirá WhatsApp con el borrador listo para que lo revises antes de enviar.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
