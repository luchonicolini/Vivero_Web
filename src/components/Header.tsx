"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useConsulta } from "@/context/ConsultaContext";
import { VIVERO_CONFIG } from "@/data/vivero";

export default function Header() {
  const pathname = usePathname();
  const { totalUnits, setDrawerOpen } = useConsulta();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const mobileMenuTriggerRef = useRef<HTMLButtonElement>(null);
  const scrollSentinelRef = useRef<HTMLSpanElement>(null);

  // Add depth only after the utility bar has scrolled out of view.
  useEffect(() => {
    const sentinel = scrollSentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(([entry]) => {
      setIsScrolled(!entry.isIntersecting);
    });

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  // Handle Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && mobileMenuOpen) {
        setMobileMenuOpen(false);
        mobileMenuTriggerRef.current?.focus();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [mobileMenuOpen]);

  const navLinks = [
    { href: "/", label: "Inicio", active: pathname === "/" },
    { href: "/catalogo", label: "Catálogo", active: pathname.startsWith("/catalogo") },
    { href: "/mayoristas", label: "Mayoristas", active: pathname === "/mayoristas" },
    { href: "/contacto", label: "Contacto", active: pathname === "/contacto" },
  ];

  return (
    <>
      {/* Top bar (28px) */}
      <div className="bg-primary text-surface text-xs font-medium py-1.5 px-4">
        <div className="max-w-content mx-auto flex items-center justify-center gap-2">
          <svg
            className="w-3.5 h-3.5 text-sage"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            aria-hidden="true"
          >
            <path d="M12 21s-6-5.33-6-10a6 6 0 1 1 12 0c0 4.67-6 10-6 10z" />
            <circle cx="12" cy="11" r="2.2" />
          </svg>
          <span>{VIVERO_CONFIG.locationShort} · Vivero botánico</span>
        </div>
      </div>
      <span ref={scrollSentinelRef} aria-hidden="true" className="block h-px" />

      {/* Main Header */}
      <header className={`sticky top-0 z-40 bg-background border-b border-borderline transition-shadow duration-300 motion-reduce:transition-none ${isScrolled ? "shadow-[0_8px_24px_rgba(24,61,35,0.11)]" : "shadow-none"}`}>
        <div className="max-w-content mx-auto w-full min-w-0 px-3 sm:px-8 py-3.5 flex items-center justify-between gap-2 sm:gap-4">
          {/* Brand */}
          <Link
            href="/"
            className="flex min-w-0 items-center gap-2 sm:gap-3 focus-visible:outline-2 focus-visible:outline-focusRing focus-visible:outline-offset-2 rounded"
            aria-label={`${VIVERO_CONFIG.name} - Ir al inicio`}
          >
            <svg
              className="w-10 sm:w-14 h-auto shrink-0"
              viewBox="0 0 88 54"
              fill="none"
              aria-hidden="true"
            >
              <path d="M44 22 C37 13, 27 11, 21 15 C26 22, 34 25, 44 22 Z" fill="#183D23" />
              <path d="M44 22 C44 10, 52 4, 60 6 C59 15, 53 21, 44 22 Z" fill="#2A5B37" />
              <path d="M26 30 C16 28, 9 32, 8 38 C15 40, 22 36, 26 30 Z" fill="#2A5B37" />
              <path d="M63 29 C72 26, 79 30, 80 36 C73 39, 67 35, 63 29 Z" fill="#183D23" />
              <rect x="14" y="34" width="60" height="3" rx="1" fill="#183D23" />
              <rect x="14" y="44" width="60" height="3" rx="1" fill="#183D23" />
              {[21, 31, 41, 51, 61].map((x) => (
                <path key={x} d={`M${x} 50V29L${x + 3.5} 24L${x + 7} 29V50H${x}Z`} fill="#183D23" />
              ))}
            </svg>

            <div className="flex flex-col">
              <span className="font-serif font-bold text-base sm:text-xl leading-tight text-primary">
                Vivero<br className="hidden sm:inline" /> Siempre Verde
              </span>
              <span className="text-[9px] sm:text-[10px] tracking-widest text-muted uppercase font-medium mt-0.5">
                — Goya · Corrientes —
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2" aria-label="Navegación principal">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-1.5 rounded-md text-[15px] transition-colors ${
                  link.active
                    ? "font-bold text-primary border-b-2 border-primary"
                    : "font-medium text-ink hover:text-primary hover:bg-sage/40"
                }`}
                aria-current={link.active ? "page" : undefined}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Actions: Mi consulta & Mobile Menu Toggle */}
          <div className="flex shrink-0 items-center gap-1.5 sm:gap-2.5">
            <button
              ref={mobileMenuTriggerRef}
              type="button"
              onClick={() => setDrawerOpen(true)}
              className="inline-flex min-h-11 min-w-11 items-center justify-center gap-2 border border-controlBorder hover:border-primary text-primary hover:bg-primary hover:text-surface transition-colors rounded-md px-2.5 sm:px-3.5 py-2 text-xs sm:text-sm font-semibold cursor-pointer"
              aria-label={`Mi consulta con ${totalUnits} unidades agregadas`}
            >
              <svg
                className="w-4 h-4 shrink-0"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M17.5 3C11 3 6 8 6 14.5c0 1.7.4 3.3 1.1 4.7L4 22l1.4 1.4 3.1-3.1c1.4.7 3 1.1 4.7 1.1C19.7 21.4 22 15.6 22 9.1 22 5.7 19.9 3 17.5 3z" />
              </svg>
              <span className="hidden sm:inline">Mi consulta ({totalUnits})</span>
              <span className="sr-only sm:hidden">Mi consulta</span>
              <span className="sm:hidden text-[11px] tabular-nums" aria-hidden="true">{totalUnits}</span>
            </button>

            {/* Mobile hamburger */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden min-h-11 min-w-11 flex items-center justify-center p-2 text-primary rounded border border-borderline"
              aria-label={mobileMenuOpen ? "Cerrar menú" : "Abrir menú de navegación"}
              aria-expanded={mobileMenuOpen}
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                {mobileMenuOpen ? (
                  <path d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        {mobileMenuOpen && (
        <div className="animate-menu md:hidden border-t border-borderline bg-surface px-3 py-3 shadow-lg">
            <nav className="flex flex-col gap-2" aria-label="Menú móvil">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`min-h-11 py-2 px-3 rounded-md text-base ${
                    link.active
                      ? "font-bold text-primary bg-sage/50"
                      : "text-ink hover:bg-sage/20"
                  }`}
                  aria-current={link.active ? "page" : undefined}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </header>
    </>
  );
}
