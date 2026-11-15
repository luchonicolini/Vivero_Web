import Link from "next/link";
import { VIVERO_CONFIG } from "@/data/vivero";

export default function Footer() {
  return (
    <footer className="bg-background border-t border-borderline py-8 sm:py-12">
      <div className="max-w-content mx-auto px-5 sm:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-6 border-b border-borderline">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <svg
              className="w-10 h-auto shrink-0"
              viewBox="0 0 88 54"
              fill="none"
              aria-hidden="true"
            >
              <path d="M44 22 C37 13, 27 11, 21 15 C26 22, 34 25, 44 22 Z" fill="#183D23" />
              <path d="M44 22 C44 10, 52 4, 60 6 C59 15, 53 21, 44 22 Z" fill="#2A5B37" />
              <rect x="14" y="34" width="60" height="3" rx="1" fill="#183D23" />
              <rect x="14" y="44" width="60" height="3" rx="1" fill="#183D23" />
              <path d="M21 50V29L24.5 24L28 29V50H21Z" fill="#183D23" />
              <path d="M31 50V29L34.5 24L38 29V50H31Z" fill="#183D23" />
              <path d="M41 50V29L44.5 24L48 29V50H41Z" fill="#183D23" />
              <path d="M51 50V29L54.5 24L58 29V50H51Z" fill="#183D23" />
              <path d="M61 50V29L64.5 24L68 29V50H61Z" fill="#183D23" />
            </svg>
            <div>
              <span className="block font-serif font-bold text-base text-primary">
                {VIVERO_CONFIG.name}
              </span>
              <span className="block text-[10px] tracking-wider text-muted uppercase">
                Goya · Corrientes
              </span>
            </div>
          </div>

          {/* Links as defined in brief: Catálogo, Contacto */}
          <nav className="flex flex-wrap items-center justify-center gap-6 text-sm font-medium text-ink">
            <Link href="/" className="hover:text-primary hover:underline">
              Inicio
            </Link>
            <Link href="/catalogo" className="hover:text-primary hover:underline">
              Catálogo
            </Link>
            <Link href="/mayoristas" className="hover:text-primary hover:underline">
              Mayoristas
            </Link>
            <Link href="/contacto" className="hover:text-primary hover:underline">
              Contacto
            </Link>
          </nav>

          {/* Social media links */}
          <div className="flex items-center gap-4 text-sm text-ink">
            <a
              href={VIVERO_CONFIG.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary hover:underline"
              aria-label="Instagram de Vivero Siempre Verde (abre en pestaña nueva)"
            >
              Instagram
            </a>
            <a
              href={VIVERO_CONFIG.facebookUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary hover:underline"
              aria-label="Facebook de Vivero Siempre Verde (abre en pestaña nueva)"
            >
              Facebook
            </a>
            <a
              href={VIVERO_CONFIG.threadsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary hover:underline"
              aria-label="Threads de Vivero Siempre Verde (abre en pestaña nueva)"
            >
              Threads
            </a>
            <a
              href={VIVERO_CONFIG.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary hover:underline"
              aria-label="WhatsApp de Vivero Siempre Verde (abre en pestaña nueva)"
            >
              WhatsApp
            </a>
          </div>
        </div>

        {/* Mandatory demo disclaimer */}
        <div className="pt-5 text-center text-xs text-muted space-y-1">
          <p>Propuesta visual · Fotos y productos ilustrativos para demostración.</p>
          <p>© {new Date().getFullYear()} {VIVERO_CONFIG.name}. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
