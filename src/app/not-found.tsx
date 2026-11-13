import Link from "next/link";

export default function NotFound() {
  return (
    <div className="max-w-content mx-auto px-5 sm:px-8 py-20 text-center space-y-6">
      <span className="font-serif text-6xl font-bold text-primary block">404</span>
      <h1 className="font-serif text-3xl font-bold text-primary">
        Página o planta no encontrada
      </h1>
      <p className="text-sm sm:text-base text-muted max-w-md mx-auto">
        La sección o variedad que estás buscando no existe o fue trasladada.
      </p>
      <div>
        <Link
          href="/catalogo"
          className="inline-block bg-primary hover:bg-primary-hover text-surface font-semibold px-6 py-3 rounded-md transition text-sm"
        >
          Volver al catálogo
        </Link>
      </div>
    </div>
  );
}
