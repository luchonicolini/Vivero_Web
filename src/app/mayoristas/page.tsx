"use client";

import { useState } from "react";
import PlantImage from "@/components/PlantImage";
import { VIVERO_CONFIG } from "@/data/vivero";

const WHOLESALE_CATEGORIES = [
  { label: "Plantas ornamentales", img: "/images/may-ornamentales.jpg", key: "exterior" },
  { label: "Cítricos y frutales", img: "/images/may-citricos.jpg", key: "citricos" },
  { label: "Plantines de huerta", img: "/images/may-huerta.jpg", key: "huerta" },
  { label: "Macetas e insumos", img: "/images/may-macetas.jpg", key: "macetas" },
];

export default function MayoristasPage() {
  const [name, setName] = useState("");
  const [business, setBusiness] = useState("");
  const [city, setCity] = useState("");
  const [details, setDetails] = useState("");
  const [submittedNotice, setSubmittedNotice] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !city.trim() || !details.trim()) return;

    let text = `Hola ${VIVERO_CONFIG.name}! Consulta de PEDIDO MAYORISTA:\n\n`;
    text += `• Nombre y apellido: ${name.trim()}\n`;
    if (business.trim()) {
      text += `• Negocio o actividad: ${business.trim()}\n`;
    }
    text += `• Localidad / Destino: ${city.trim()}\n`;
    text += `• Detalle de pedido y cantidades:\n${details.trim()}\n\n`;
    text += `Aguardo condiciones comerciales y disponibilidad. Muchas gracias!`;

    const url = `https://wa.me/${VIVERO_CONFIG.whatsappNumber}?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank", "noopener,noreferrer");
    setSubmittedNotice(true);
  };

  const handleSelectTopic = (label: string) => {
    setDetails((prev) =>
      prev ? `${prev}\n• Interés en: ${label}` : `Estoy interesado/a en consultar por mayor sobre: ${label}.\n`
    );
    document.getElementById("formMayorista")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="max-w-content mx-auto px-5 sm:px-8 py-10 sm:py-16 space-y-16 sm:space-y-20">
      {/* 1. Hero Mayoristas */}
      <section className="grid md:grid-cols-12 gap-8 md:gap-12 items-center border-b border-borderline pb-12 sm:pb-16">
        <div className="md:col-span-6 space-y-5">
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-primary leading-[1.1] tracking-[-0.025em]">
            Hagamos crecer<br />tu negocio.
          </h1>
          <p className="text-base sm:text-lg text-ink leading-relaxed max-w-md">
            Una propuesta para viveros, revendedores y profesionales del jardín.
          </p>
          <div>
            <a
              href="#formMayorista"
              className="inline-flex items-center justify-center min-h-[48px] px-6 rounded-md bg-primary hover:bg-primary-hover text-surface font-semibold text-sm sm:text-base transition-colors"
            >
              Consultar por mayor <span className="ml-2" aria-hidden="true">›</span>
            </a>
          </div>
        </div>

        <div className="md:col-span-6">
          <div className="aspect-[4/3] rounded-lg overflow-hidden border border-borderline bg-surface shadow-sm">
            <PlantImage
              src="/images/mayoristas-hero.jpg"
              alt="Producción y cultivo mayorista en vivero"
              fallbackKey="wholesale"
              className="w-full h-full object-cover"
              loading="eager"
            />
          </div>
        </div>
      </section>

      {/* 2. Three Steps */}
      <section aria-labelledby="stepsHeading">
        <div className="leaf-divider mb-10">
          <h2 id="stepsHeading" className="font-serif text-2xl sm:text-3xl font-bold text-primary text-center tracking-[-0.025em]">
            Tu próximo pedido, más simple
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-borderline bg-surface border border-borderline rounded-lg">
          <div className="p-6 sm:p-8 space-y-2">
            <span className="font-serif font-bold text-3xl text-primary block">01</span>
            <h3 className="font-serif font-bold text-lg text-primary">Contanos qué necesitás</h3>
            <p className="text-sm text-muted">
              Indicá las variedades, tamaños y volúmenes estimados que buscás para tu comercio o proyecto.
            </p>
          </div>

          <div className="p-6 sm:p-8 space-y-2">
            <span className="font-serif font-bold text-3xl text-primary block">02</span>
            <h3 className="font-serif font-bold text-lg text-primary">Confirmamos disponibilidad</h3>
            <p className="text-sm text-muted">
              Te respondemos con stock actual, precios mayoristas y condiciones comerciales vigentes.
            </p>
          </div>

          <div className="p-6 sm:p-8 space-y-2">
            <span className="font-serif font-bold text-3xl text-primary block">03</span>
            <h3 className="font-serif font-bold text-lg text-primary">Coordinamos retiro o entrega</h3>
            <p className="text-sm text-muted">
              Acordamos el día y modalidad de entrega o retiro en Goya según el tamaño del pedido.
            </p>
          </div>
        </div>
      </section>

      {/* 3. Wholesale categories */}
      <section aria-labelledby="categoriesHeading">
        <h2 id="categoriesHeading" className="font-serif text-2xl sm:text-3xl font-bold text-primary text-center mb-8 tracking-[-0.025em]">
          ¿Qué estás buscando?
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {WHOLESALE_CATEGORIES.map((cat) => (
            <button
              key={cat.label}
              type="button"
              onClick={() => handleSelectTopic(cat.label)}
              className="group bg-surface border border-borderline hover:border-primary rounded-lg overflow-hidden text-center transition cursor-pointer flex flex-col"
            >
              <div className="aspect-[4/3] overflow-hidden bg-background">
                <PlantImage
                  src={cat.img}
                  alt={cat.label}
                  fallbackKey={cat.key}
                  className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
                />
              </div>
              <div className="p-3.5 bg-surface border-t border-borderline w-full flex-1 flex items-center justify-center">
                <span className="font-serif font-bold text-sm sm:text-base text-primary">
                  {cat.label}
                </span>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* 4. Form + FAQ Split */}
      <section id="formMayorista" className="border-t border-borderline pt-12 sm:pt-16">
        <div className="grid md:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Enquiry form (7 columns) */}
          <div className="md:col-span-7 bg-surface border border-borderline rounded-lg p-6 sm:p-8 space-y-5">
            <div>
              <h2 className="font-serif text-2xl font-bold text-primary">
                Contanos sobre tu pedido
              </h2>
              <p className="text-xs text-muted mt-1">
                Completá los datos y prepararemos el mensaje para coordinar por WhatsApp.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="wsName" className="block text-xs font-semibold text-primary mb-1">
                  Nombre y apellido <span className="text-error" aria-hidden="true">*</span>
                </label>
                <input
                  id="wsName"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Tu nombre completo"
                  className="w-full text-sm px-3.5 py-2.5 border border-controlBorder rounded bg-background focus:outline-2 focus:outline-focusRing"
                />
              </div>

              <div>
                <label htmlFor="wsBusiness" className="block text-xs font-semibold text-primary mb-1">
                  Negocio, actividad o profesión (opcional)
                </label>
                <input
                  id="wsBusiness"
                  type="text"
                  value={business}
                  onChange={(e) => setBusiness(e.target.value)}
                  placeholder="Ej: Vivero, paisajismo, revendedor, obras"
                  className="w-full text-sm px-3.5 py-2.5 border border-controlBorder rounded bg-background focus:outline-2 focus:outline-focusRing"
                />
              </div>

              <div>
                <label htmlFor="wsCity" className="block text-xs font-semibold text-primary mb-1">
                  Localidad / Provincia <span className="text-error" aria-hidden="true">*</span>
                </label>
                <input
                  id="wsCity"
                  type="text"
                  required
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="Ej: Goya, Bella Vista, Corrientes Capital..."
                  className="w-full text-sm px-3.5 py-2.5 border border-controlBorder rounded bg-background focus:outline-2 focus:outline-focusRing"
                />
              </div>

              <div>
                <label htmlFor="wsDetails" className="block text-xs font-semibold text-primary mb-1">
                  ¿Qué productos y cantidades estimadas necesitás? <span className="text-error" aria-hidden="true">*</span>
                </label>
                <textarea
                  id="wsDetails"
                  rows={4}
                  required
                  value={details}
                  onChange={(e) => setDetails(e.target.value)}
                  placeholder="Detallá variedades de plantas, tamaños de envase o macetas, o cantidades estimadas..."
                  className="w-full text-sm px-3.5 py-2.5 border border-controlBorder rounded bg-background focus:outline-2 focus:outline-focusRing"
                />
              </div>

              <button
                type="submit"
                className="w-full min-h-[48px] bg-primary hover:bg-primary-hover text-surface font-semibold py-3 px-6 rounded-md transition cursor-pointer text-sm sm:text-base flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5 text-whatsapp" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M12.04 2a9.9 9.9 0 0 0-8.52 15l-1.1 4 4.1-1.08A9.92 9.92 0 1 0 12.04 2zm5.8 14.08c-.24.68-1.42 1.3-1.97 1.38-.52.08-1.18.11-1.9-.12-.44-.14-1-.33-1.72-.64-3.03-1.31-5-4.38-5.15-4.58-.15-.2-1.23-1.64-1.23-3.13 0-1.49.78-2.22 1.06-2.52.27-.3.6-.38.8-.38h.58c.18 0 .44-.07.68.52.25.6.85 2.08.92 2.23.08.15.13.33.03.53-.1.2-.15.33-.3.5-.15.18-.32.4-.45.54-.15.15-.3.32-.13.62.18.3.78 1.29 1.68 2.09 1.15 1.03 2.13 1.35 2.43 1.5.3.15.48.13.66-.08.18-.2.75-.88.95-1.18.2-.3.4-.25.68-.15.28.1 1.77.84 2.07.99.3.15.5.22.58.35.08.12.08.73-.17 1.41z"/>
                </svg>
                <span>Preparar consulta por WhatsApp</span>
              </button>

              <p className="text-center text-xs text-muted">
                Al presionar el botón se abrirá WhatsApp con el mensaje armado para que lo revises antes de enviarlo.
              </p>

              {submittedNotice && (
                <div className="p-3 bg-sage border border-primary/30 rounded text-xs text-primary font-semibold text-center">
                  ✓ Mensaje preparado correctamente.
                </div>
              )}
            </form>
          </div>

          {/* FAQ (5 columns) */}
          <div className="md:col-span-5 space-y-6">
            <h2 className="font-serif text-2xl font-bold text-primary">
              Antes de hacer tu pedido
            </h2>

            <div className="space-y-4">
              <div className="bg-surface border border-borderline rounded-lg p-5 space-y-1.5">
                <h3 className="font-serif font-bold text-base text-primary">
                  ¿Cuál es la compra mínima?
                </h3>
                <p className="text-sm text-muted">
                  Consultanos las condiciones y cantidades mínimas según el rubro o variedad de plantas de tu pedido.
                </p>
              </div>

              <div className="bg-surface border border-borderline rounded-lg p-5 space-y-1.5">
                <h3 className="font-serif font-bold text-base text-primary">
                  ¿Cómo se coordina la entrega?
                </h3>
                <p className="text-sm text-muted">
                  Indicanos tu localidad y volumen para informarte sobre las opciones de despacho o entrega disponible.
                </p>
              </div>

              <div className="bg-surface border border-borderline rounded-lg p-5 space-y-1.5">
                <h3 className="font-serif font-bold text-base text-primary">
                  ¿Puedo retirar en el vivero?
                </h3>
                <p className="text-sm text-muted">
                  Sí, podés retirar en Goya previa coordinación para tener tu pedido listo y embalado.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
