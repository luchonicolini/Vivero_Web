"use client";

import { useEffect } from "react";
import { useConsulta } from "@/context/ConsultaContext";
import { VIVERO_CONFIG } from "@/data/vivero";

export default function InfoModal() {
  const { modalType, setModalType } = useConsulta();

  useEffect(() => {
    if (!modalType) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setModalType(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [modalType, setModalType]);

  if (!modalType) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-ink/40 flex items-center justify-center p-4 backdrop-blur-[1px]"
      role="dialog"
      aria-modal="true"
      aria-labelledby="infoModalHeading"
      onClick={() => setModalType(null)}
    >
      <div
        className="bg-surface border border-borderline rounded-lg max-w-md w-full p-6 sm:p-7 relative shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={() => setModalType(null)}
          className="absolute top-4 right-4 text-2xl text-primary hover:bg-black/5 w-8 h-8 rounded flex items-center justify-center leading-none cursor-pointer"
          aria-label="Cerrar modal de información"
        >
          &times;
        </button>

        <h2 id="infoModalHeading" className="font-serif text-2xl font-bold text-primary mb-3">
          {modalType === "horarios" ? "Horarios de atención" : "Ubicación y visitas"}
        </h2>

        <div className="space-y-3 text-sm text-ink mb-6">
          <p>
            <strong>Localidad:</strong> {VIVERO_CONFIG.location}
          </p>
          {modalType === "ubicacion" && (
            <p className="text-muted">
              {VIVERO_CONFIG.locationNotice}
            </p>
          )}
          <p className="text-muted">
            {VIVERO_CONFIG.hoursNotice}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <a
            href={VIVERO_CONFIG.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 bg-primary hover:bg-primary-hover text-surface text-center font-semibold py-2.5 px-4 rounded transition text-sm"
          >
            Consultar por WhatsApp
          </a>
          <button
            type="button"
            onClick={() => setModalType(null)}
            className="py-2.5 px-4 text-sm font-medium border border-controlBorder rounded hover:bg-sage/30 transition text-ink cursor-pointer"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
}
