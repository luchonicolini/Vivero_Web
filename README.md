# Vivero Siempre Verde — Sitio Web Oficial

Sitio web botánico y catálogo para **Vivero Siempre Verde** (Goya, Corrientes, Argentina).

Desarrollado con **Next.js (App Router)**, **React 19**, **TypeScript** y **Tailwind CSS**, implementando al detalle la especificación visual y comercial de `DESIGN_BRIEF.md`.

---

## 📸 Vistas del Proyecto (Capturas de Portafolio)

### 🖥️ Versión Desktop

#### 1. Portada e Identidad Editorial
![Portada Desktop](docs/portfolio-screenshots/01-desktop-home-hero.png)

#### 2. Catálogo Botánico con Filtros en Tiempo Real
![Catálogo Desktop](docs/portfolio-screenshots/03-desktop-catalogo.png)

#### 3. Ficha de Producto y Guía de Cuidados
![Ficha de Producto Monstera](docs/portfolio-screenshots/04-desktop-producto-monstera.png)

#### 4. Flujo de "Mi Consulta" (Panel Lateral Desplegable)
![Panel Mi Consulta](docs/portfolio-screenshots/05-desktop-mi-consulta-drawer.png)

#### 5. Propuesta y Formulario para Mayoristas
![Sección Mayoristas](docs/portfolio-screenshots/06-desktop-mayoristas.png)

#### 6. Contacto y Canales Oficiales
![Contacto y Ubicación](docs/portfolio-screenshots/07-desktop-contacto.png)

---

### 📱 Versión Mobile (Diseño Responsivo)

<p align="center">
  <img src="docs/portfolio-screenshots/08-mobile-home.png" width="32%" alt="Mobile Inicio" />
  <img src="docs/portfolio-screenshots/09-mobile-catalogo.png" width="32%" alt="Mobile Catálogo" />
  <img src="docs/portfolio-screenshots/10-mobile-producto.png" width="32%" alt="Mobile Producto" />
</p>

---

## 🌿 Características implementadas

1. **Arquitectura Multi-Página & SEO Dinámico:**
   - `/` — Inicio: Hero editorial, tira de categorías, "Un jardín de posibilidades" (destacados), "Conocé Siempre Verde" y galería.
   - `/catalogo` — Catálogo botánico: Buscador en tiempo real (insensible a mayúsculas y acentos), filtros combinados por categoría y luz, conteo de resultados, estado vacío asistido y paginación.
   - `/catalogo/[slug]` — Ficha de producto: Galería con miniaturas 1:1, guía de cuidados, selector de presentación/tamaño, selector de cantidad y aviso de precio a confirmar.
   - `/mayoristas` — Propuesta para revendedores y viveros: Los 3 pasos de pedido, categorías mayoristas, formulario con preparación de mensaje por WhatsApp y preguntas frecuentes (FAQ).
   - `/contacto` — Canales oficiales verificados (WhatsApp, Instagram, Facebook, Threads) e información de ubicación para coordinar visitas.
   - `/not-found` — Página 404 personalizada y accesible.

2. **Flujo de "Mi consulta" (WhatsApp sin pasarelas de pago ficticias):**
   - Panel lateral desplegable (*slide-over drawer*) accesible mediante teclado (`Escape`) y con bloqueo de scroll.
   - Persistencia local segura en `localStorage` con recuperación ante datos obsoletos.
   - Contador de unidades totales.
   - Generación de borrador codificado para WhatsApp (`wa.me`) con botón alternativo para copiar texto al portapapeles.
   - Notificaciones accesibles para lectores de pantalla (`aria-live="polite"`).

3. **Respaldo visual inteligente (`PlantImage`):**
   - Si no se encuentran fotografías reales en `public/images/`, el componente genera automáticamente ilustraciones botánicas vectoriales en SVG armonizadas con la paleta de la marca, asegurando una navegación sin imágenes rotas.

4. **Identidad tipográfica y de color (`DESIGN_BRIEF.md`):**
   - Tipografía display: **Libre Baskerville** (serif).
   - Tipografía de lectura e interfaz: **Inter** (sans-serif).
   - Paleta: Marfil cálido (`#F7F5EF`), blanco superficie (`#FFFEFA`), verde bosque (`#183D23`), salvia (`#E8EDDF`) y verde WhatsApp oficial (`#25D366`).
   - Respeto estricto a las correcciones del brief: *Mayoristas* se mantiene como enlace de navegación primario normal, sin banner mayorista en la portada ni botones duplicados de WhatsApp.

---

## 📁 Estado de contenidos y fotografías reales

Como se estipula en `DESIGN_BRIEF.md`:
- **Catálogo de demostración:** Los productos actuales (`Monstera`, `Potus`, `Sansevieria`, `Petunias`, `Limonero`, `Lavanda`, `Macetas`, `Huerta`, `Naranjo`) son variedades de muestra mientras el vivero confecciona su inventario confirmado.
- **Fotos ilustrativas temporales:** La portada, la sección institucional y la galería usan imágenes de muestra de [Unsplash](https://unsplash.com/license), optimizadas en WebP dentro de `public/images/`. No representan el vivero ni su inventario real.
- **Fotografías reales pendientes:** Cuando estén disponibles, reemplazá las imágenes de muestra en `public/images/` conservando estos nombres y formato WebP:
  - `hero-vivero.webp` (portada)
  - `nosotros-vivero.webp` (equipo/cultivo)
  - `frente-vivero.webp` (fachada o entrada)
  - `galeria-1.webp`, `galeria-2.webp`, `galeria-3.webp` (tira de fotos)
  - Para productos, actualizá las rutas de imagen correspondientes en `src/data/vivero.ts`.
  - `monstera.jpg`, `potus.jpg`, `petunias.jpg`, `limonero.jpg`, `lavanda.jpg`, `macetas.jpg`, `huerta.jpg`, `naranjo.jpg` (plantas)
- **Datos a confirmar antes de producción:** La dirección física exacta en Goya y los horarios de atención según temporada están configurados en `src/data/vivero.ts` para ser confirmados por WhatsApp.

---

## 🚀 Cómo ejecutar en desarrollo

1. Instalar dependencias:
   ```bash
   npm install
   ```
2. Iniciar el servidor local:
   ```bash
   npm run dev
   ```
3. Abrir en el navegador: [http://localhost:3000](http://localhost:3000)

## 🏗️ Cómo compilar para producción

```bash
npm run build
npm run start
```

## 🎨 Skill de diseño Impeccable

El proyecto incluye la skill local de Impeccable en `.agents/skills/impeccable/`. En una nueva sesión de Codex, podés invocar `$impeccable harden` para revisar y robustecer una pantalla. La pasada actual endureció validación y límites del formulario mayorista, apertura de WhatsApp, recuperación de datos guardados y manejo del foco en paneles y modales. El detector manual se ejecuta con:

```powershell
.agents\skills\impeccable\scripts\impeccable.cmd detect --json src
```
