"use client";

import { useEffect, useRef } from "react";
import { useConsulta } from "@/context/ConsultaContext";
import { VIVERO_CONFIG } from "@/data/vivero";

export default function InfoModal() {
  const { modalType, setModalType } = useConsulta();
  const modalRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (!modalType) return;
    const previousOverflow = document.body.style.overflow;
    const dialog = modalRef.current;
    if (!dialog) return;
    if (!dialog.open) dialog.showModal();
    document.body.style.overflow = "hidden";
    return () => {
      if (dialog.open) dialog.close();
      document.body.style.overflow = previousOverflow;
    };
  }, [modalType, setModalType]);

  if (!modalType) return null;

  return (
    <dialog
      className="animate-modal fixed inset-0 z-50 m-auto max-h-[calc(100dvh-2rem)] w-[calc(100%-2rem)] max-w-md overflow-y-auto rounded-lg border border-borderline bg-surface p-6 shadow-xl backdrop:bg-ink/40 backdrop:backdrop-blur-[1px] sm:p-7"
      aria-labelledby="infoModalHeading"
      onCancel={(event) => { event.preventDefault(); setModalType(null); }}
      onClick={(event) => { if (event.target === event.currentTarget) setModalType(null); }}
      ref={modalRef}
    >
        <button
          type="button"
          onClick={() => setModalType(null)}
          className="absolute top-4 right-4 text-2xl text-primary hover:bg-black/5 w-11 h-11 rounded flex items-center justify-center leading-none cursor-pointer"
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
            className="min-h-11 py-2.5 px-4 text-sm font-medium border border-controlBorder rounded hover:bg-sage/30 transition text-ink cursor-pointer"
          >
            Cerrar
          </button>
        </div>
    </dialog>
  );
}
