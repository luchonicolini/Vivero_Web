import { VIVERO_CONFIG } from "@/data/vivero";

export default function WhatsAppFloat() {
  return (
    <aside aria-label="Contacto directo por WhatsApp">
      <a
        href={VIVERO_CONFIG.whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Abrir WhatsApp para consultar a Vivero Siempre Verde"
        className="fixed bottom-6 right-6 z-30 w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-whatsapp text-white flex items-center justify-center shadow-lg hover:scale-105 transition-transform focus-visible:outline-2 focus-visible:outline-focusRing focus-visible:outline-offset-2"
      >
        <svg
          className="w-7 h-7 sm:w-8 sm:h-8"
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M12.04 2a9.9 9.9 0 0 0-8.52 15l-1.1 4 4.1-1.08A9.92 9.92 0 1 0 12.04 2zm5.8 14.08c-.24.68-1.42 1.3-1.97 1.38-.52.08-1.18.11-1.9-.12-.44-.14-1-.33-1.72-.64-3.03-1.31-5-4.38-5.15-4.58-.15-.2-1.23-1.64-1.23-3.13 0-1.49.78-2.22 1.06-2.52.27-.3.6-.38.8-.38h.58c.18 0 .44-.07.68.52.25.6.85 2.08.92 2.23.08.15.13.33.03.53-.1.2-.15.33-.3.5-.15.18-.32.4-.45.54-.15.15-.3.32-.13.62.18.3.78 1.29 1.68 2.09 1.15 1.03 2.13 1.35 2.43 1.5.3.15.48.13.66-.08.18-.2.75-.88.95-1.18.2-.3.4-.25.68-.15.28.1 1.77.84 2.07.99.3.15.5.22.58.35.08.12.08.73-.17 1.41z" />
        </svg>
      </a>
    </aside>
  );
}
