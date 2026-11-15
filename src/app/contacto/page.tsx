"use client";

import Link from "next/link";
import PlantImage from "@/components/PlantImage";
import { useConsulta } from "@/context/ConsultaContext";
import { VIVERO_CONFIG } from "@/data/vivero";

export default function ContactoPage() {
  const { setModalType } = useConsulta();

  return (
    <div className="max-w-content mx-auto px-5 sm:px-8 py-10 sm:py-16 space-y-12 sm:space-y-16">
      {/* Breadcrumb */}
      <nav className="text-xs sm:text-sm text-muted flex items-center gap-2" aria-label="Ruta de navegación">
        <Link href="/" className="hover:underline hover:text-primary">Inicio</Link>
        <span aria-hidden="true">/</span>
        <strong className="text-primary font-semibold">Contacto</strong>
      </nav>

      <section className="grid md:grid-cols-12 gap-8 md:gap-12 items-center">
        {/* Photo */}
        <div className="md:col-span-6">
          <div className="relative aspect-[4/3] rounded-lg overflow-hidden border border-borderline bg-surface shadow-sm">
            <PlantImage
              src="/images/hero-vivero.webp"
              alt="Vista ilustrativa del interior de un vivero con plantas y flores"
              className="w-full h-full object-cover"
              loading="eager"
              priority
            />
            <span className="absolute bottom-3 left-3 rounded bg-surface/90 px-2.5 py-1 text-xs font-medium text-primary">Foto ilustrativa</span>
          </div>
        </div>

        {/* Contact Info */}
        <div className="md:col-span-6 space-y-6">
          <div>
            <span className="text-xs uppercase tracking-widest text-muted font-semibold block mb-2">
              Atención y consultas
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-primary leading-tight tracking-[-0.025em]">
              Estamos en Goya,<br />Corrientes
            </h1>
          </div>

          <p className="text-base text-ink leading-relaxed">
            Atendemos consultas minoristas y mayoristas de manera directa y personalizada a través de nuestros canales oficiales.
          </p>

          {/* Social and WhatsApp links */}
          <div className="bg-surface border border-borderline rounded-lg p-5 space-y-3">
            <h2 className="font-serif font-bold text-base text-primary pb-2 border-b border-borderline">
              Canales de contacto verificados
            </h2>

            <ul className="space-y-3 text-sm">
              <li className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                <span className="font-medium text-ink">WhatsApp directo:</span>
                <a
                  href={VIVERO_CONFIG.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-primary underline hover:text-primary-hover flex items-center gap-1.5"
                >
                  <svg className="w-4 h-4 text-whatsapp" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12.04 2a9.9 9.9 0 0 0-8.52 15l-1.1 4 4.1-1.08A9.92 9.92 0 1 0 12.04 2zm5.8 14.08c-.24.68-1.42 1.3-1.97 1.38-.52.08-1.18.11-1.9-.12-.44-.14-1-.33-1.72-.64-3.03-1.31-5-4.38-5.15-4.58-.15-.2-1.23-1.64-1.23-3.13 0-1.49.78-2.22 1.06-2.52.27-.3.6-.38.8-.38h.58c.18 0 .44-.07.68.52.25.6.85 2.08.92 2.23.08.15.13.33.03.53-.1.2-.15.33-.3.5-.15.18-.32.4-.45.54-.15.15-.3.32-.13.62.18.3.78 1.29 1.68 2.09 1.15 1.03 2.13 1.35 2.43 1.5.3.15.48.13.66-.08.18-.2.75-.88.95-1.18.2-.3.4-.25.68-.15.28.1 1.77.84 2.07.99.3.15.5.22.58.35.08.12.08.73-.17 1.41z"/>
                  </svg>
                  +54 3777 70-4993
                </a>
              </li>

              <li className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                <span className="font-medium text-ink">Instagram:</span>
                <a
                  href={VIVERO_CONFIG.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-primary underline hover:text-primary-hover"
                >
                  @vivero.siempre.verde
                </a>
              </li>

              <li className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                <span className="font-medium text-ink">Facebook:</span>
                <a
                  href={VIVERO_CONFIG.facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-primary underline hover:text-primary-hover"
                >
                  Vivero Siempre Verde
                </a>
              </li>

              <li className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                <span className="font-medium text-ink">Threads:</span>
                <a
                  href={VIVERO_CONFIG.threadsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-primary underline hover:text-primary-hover"
                >
                  @vivero.siempre.verde
                </a>
              </li>
            </ul>
          </div>

          {/* Location and pending confirmation note */}
          <div className="bg-sage/40 border border-borderline rounded-lg p-5 space-y-2 text-xs sm:text-sm text-ink">
            <h3 className="font-bold text-primary">Dirección y horarios de visita</h3>
            <p className="text-muted leading-relaxed">
              Para visitar las instalaciones o coordinar el retiro presencial de plantas y pedidos, te solicitamos escribir previamente por WhatsApp para coordinar la dirección exacta y el horario disponible de la jornada.
            </p>
            <div className="pt-2">
              <button
                type="button"
                onClick={() => setModalType("ubicacion")}
                className="inline-flex items-center gap-1.5 text-primary hover:underline font-semibold cursor-pointer"
              >
                <span>Ver información de ubicación y horarios ›</span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
