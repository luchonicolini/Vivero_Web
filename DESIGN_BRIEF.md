# Vivero Siempre Verde — Design specification and implementation prompt

## Read first
This repository currently defines a website; do not interpret this document as an already implemented application.
The approved visuals were AI-generated raster mockups. They do not contain inspectable font families, CSS, exact measurements, original photographs or production assets. All values below are deliberate implementation specifications chosen to reproduce their appearance, not extracted original values.
Final user correction overrides ALL mockups: keep Mayoristas only as a normal primary navigation item (including its mobile equivalent). Remove the homepage “Soy mayorista” button, wholesale promotional banner, wholesale top-bar mention and duplicate wholesale links in the footer. Wholesale page content may explain that service and have its own relevant action.

## Business and content
- Brand: Vivero Siempre Verde.
- Location confirmed by user/profile: Goya, Corrientes, Argentina.
- Wholesale and retail, as supplied by the owner’s relative. Commercial conditions still require confirmation.
- Instagram: https://www.instagram.com/vivero.siempre.verde/
- Facebook: https://www.facebook.com/p/Vivero-Siempre-Verde-100046941047657/
- Threads: https://www.threads.com/@vivero.siempre.verde
- WhatsApp visible in supplied Instagram screenshot: https://wa.me/543777704993 . Preserve this observed link in one configuration value; owner must confirm it before production.
- Address is UNCONFIRMED: public sources conflict between Alvear 274 and 284. Do not publish either as fact. Hours, deliveries, minimum purchase, prices and stock are also unconfirmed.
- Do not invent years in business, nationwide shipping, reviews, customer counts, team identities, guarantees or payment methods.
- Use Argentine Spanish and voseo. Browser locale es-AR.
- Generated mockup people, plants, storefront and logos are illustrative. Do not present generated people as actual owners or a fictional storefront as the real premises.
- No real product inventory has been provided. Demo products must carry a clear demo notice. Production must use confirmed content.

## Visual direction
Warm botanical editorial website: ivory surfaces, forest green typography, large plant photography, clear hierarchy and generous spacing. Familiar family nursery, professional and welcoming. Light theme only for this scope.
Avoid SaaS dashboard aesthetics, oversized pill badges, decorative gradients, gray drop-shadow card grids, neon green branding, repeated WhatsApp buttons, excessive botanical clip art and wholesale promotion everywhere.
The mockups contain minor decorative variations. Use this written specification as the consistent source of truth.

## Typography — chosen implementation pair
Use **Libre Baskerville** for display headings and product names; **Inter** for body, navigation, forms, buttons and metadata. These are selected approximations, not identifiable original fonts from the generated image. Prefer locally hosted licensed WOFF2 with Latin accents, font-display: swap. Include license files. Use actual supplied brand logo when available; text fallback must not be described as a logo redesign.

| Role | Desktop >=1200px | Tablet 768–1199px | Mobile <768px | Weight | Line height | Tracking |
|---|---|---|---|---|---|---|
| Hero H1 | 64px | 52px | 40px | 700 | 1.08 | -0.035em |
| Internal page H1 | 52px | 44px | 36px | 700 | 1.12 | -0.025em |
| Section H2 | 40px | 34px | 30px | 700 | 1.18 | -0.025em |
| H3 | 28px | 26px | 24px | 700 | 1.25 | -0.015em |
| Product title | 22px | 22px | 20px | 700 | 1.3 | -0.01em |
| Hero supporting text | 20px | 18px | 18px | 400 | 1.6 | 0 |
| Body | 16px | 16px | 16px | 400 | 1.6 | 0 |
| Navigation and buttons | 16px | 16px | 16px | 500/600 | 1.25 | 0 |
| Metadata and breadcrumbs | 14px | 14px | 14px | 400/500 | 1.5 | 0 |
| Caption | 12px | 12px | 12px | 400 | 1.5 | 0 |

Use clamp() for transitions, e.g. hero clamp(2.5rem, 4.45vw, 4rem). 1rem = browser default 16px; never disable user zoom. Heading max-width 11–13ch; body max-width 60ch. Do not force desktop line breaks on phones.

## Color tokens
These are chosen approximate colors, not sampled originals.

| Token | Value | Usage |
|---|---|---|
| background | #F7F5EF | Main ivory page |
| surface | #FFFEFA | Cards, drawers, inputs |
| primary | #183D23 | Headings and primary buttons |
| primary-hover | #102D19 | Hover/pressed buttons |
| text | #203427 | Body text |
| muted | #526052 | Secondary text |
| sage | #E8EDDF | Quiet backgrounds |
| border | #C5CDBF | Decorative separators |
| control-border | #6B7B68 | Input and button boundaries |
| inverse | #FFFFFF | Text on dark green |
| focus | #365F3A | Focus ring with ivory offset |
| error | #A52A2A | Error label plus icon/text |

Check actual rendered WCAG AA contrast, especially metadata, focus and controls; adjust if necessary. Availability must never be conveyed only by color. WhatsApp icon may use its recognizable green, only once per viewport and never over content.

## Layout and rhythm
- Desktop reference viewport: 1440px wide. Main centered content max-width 1280px, side gutters 48px (remaining centering space is additional).
- Tablet gutters 32px, mobile 20px (16px at <=375px).
- Desktop 12-column grid, gap 24px; tablet 8 columns; mobile 4 columns, gap 16px.
- Spacing scale: 4, 8, 12, 16, 24, 32, 40, 48, 64, 80, 96px.
- Section vertical padding: desktop 80px, tablet 64px, mobile 48px.
- Header: desktop 88px, mobile 72px; brand max-width 220px desktop/160px mobile. Top bar 28px with “Goya, Corrientes”. Sticky header may have fine border, no large shadow.
- Buttons: min-height 48px, horizontal padding 24px, radius 6px, 1px border. Mobile full width only where needed.
- Form controls: min-height 48px; 16px text, padding 12px 14px; radius 6px. Textarea min-height 144px.
- Cards: radius 8px, 1px border, no default shadow. Product image aspect ratio 4:3, object-fit cover; product photo focal point must remain visible.
- Category photos: 3:2. Hero photo: approximately 5:4 in split desktop composition; mobile 4:3. Reserve dimensions to avoid layout shift.
- Header icons 20–24px; touch target minimum 44x44px.
- Product gallery main image 1:1, thumbnails 72px, gap 12px.
- Drawer width 420px desktop, full-width mobile, max-width 100vw. Must respect viewport and safe-area insets.
- Footer 48px vertical padding desktop/32px mobile.

## Sitemap and screens
### / — Home
1. Header: brand; Inicio, Catálogo, Mayoristas, Contacto; “Mi consulta (0)”. Mayoristas is a normal link, not a highlighted CTA.
2. Hero: desktop 5-column copy / 7-column photograph. Minimum content-driven height around 520px, never fixed clipping. H1 “Un poco más de verde en tu vida.” Supporting “Conocé nuestras plantas, flores y productos para tu jardín.” ONE main button “Explorar catálogo”.
3. Category strip: Interior, Exterior, Cítricos y frutales, Huerta, Macetas e insumos. Five columns desktop; horizontal accessible scroll or wrapping grid mobile.
4. “Un jardín de posibilidades”: four featured products desktop, two tablet/mobile where readable; 1 column at <=360px if needed. Link “Ver catálogo”.
5. “Conocé Siempre Verde”: real photo and concise confirmed story. Until photos arrive use botanical demo imagery, never fake owner portraits.
6. “De nuestro vivero a tu jardín”: 3 photographs, no fabricated live social feed.
7. Contact invitation: Goya, Corrientes, verified contact options. No fake address/map.
8. Footer brand, Catálogo, Contacto, social links. Do not repeat Mayoristas.
NO wholesale banner, “Soy mayorista” hero action or repeated WhatsApp sections.

### /catalogo
- Breadcrumb, H1 “Encontrá tu próxima planta”, supporting text.
- Search input: label “Buscar plantas o productos”.
- Filters: category and light requirements where reliable product data supports them. Do not duplicate category filters with redundant yes/no Interior and Exterior filters shown in one illustrative mockup.
- Desktop sidebar 240px and 3 product columns; tablet 2 columns with collapsible filters; mobile 2 columns or 1 if required for text.
- Search handles accents and case, combines with filters, reports count, reset action and helpful empty state.
- Product card: image, common name, short presentation, optional VERIFIED price, availability if confirmed, “Ver producto”.
- If no confirmed price use “Consultar precio”. Never display invented currency values.
- No decorative pagination: implement real pagination only when sufficient items exist.
- Product examples for DEMO only: Monstera, Potus, Sansevieria, Petunias, Limonero, Lavanda, macetas.

### /catalogo/[slug]
- Breadcrumb, product photos with accessible thumbnail controls.
- Name, botanical name only if verified, category, care guidance only if verified, size/pot/variant.
- Price/availability when confirmed; otherwise “Consultá precio y disponibilidad”.
- Variant selector if applicable, quantity stepper min 1 max configurable.
- “Agregar a mi consulta”; confirmation announced accessibly.
- Related products may appear once; avoid promotional clutter.
- Missing slug yields real not-found page.

### Mi consulta — drawer or /consulta
- Show actual selected products, variants, quantities; edit/remove and empty state.
- Persist nonsensitive selection locally; recover safely from invalid/stale stored data.
- Count means total units; label rows and total clearly to avoid ambiguity.
- Explain: “El vivero confirmará disponibilidad, precios y entrega.”
- “Preparar consulta por WhatsApp” opens wa.me with URL-encoded draft; user reviews and sends in WhatsApp. Opening WhatsApp DOES NOT mean a sent message, confirmed order or reserved stock.
- Include product names, variants, quantities and optional locality; do not include hidden personal data.
- Provide copy-message fallback and handle missing business phone.
- No checkout, payment, automated send, login requirement or fake order confirmation.

### /mayoristas
- Heading “Hagamos crecer tu negocio.”
- Audience: viveros, revendedores y profesionales del jardín.
- Explain enquiry, confirmation and coordination without asserting unconfirmed logistics.
- Relevant categories and one enquiry form: nombre, negocio/actividad, localidad, productos/cantidades.
- Visible labels, errors, required marks; prepare WhatsApp draft only after user action.
- Minimum purchase and delivery answer: consult conditions. Do not fabricate quantities or routes.
- No repeated wholesale CTA in every section.

### /contacto
- Verified WhatsApp and social links, location Goya Corrientes.
- Exact address, map, hours, payment/delivery details only after confirmation.
- Graceful demo placeholder explaining pending information, not “open now”.
- No nonfunctional map or fake contact form that claims delivery.

## Interaction and responsive behavior
- Breakpoints: mobile <768px, tablet 768–1199px, desktop >=1200px. Also verify 360, 390, 768, 1024, 1440px.
- Mobile header menu button exposes all navigation including Mayoristas once; closes on selection/Escape, restores focus.
- Stack hero text then photo on mobile; H1 remains readable without clipping.
- Filters mobile drawer and query drawer support keyboard, focus trap, Escape, return focus, background scroll lock.
- Hover: border/color change and subtle photo scale <=1.025, never moving text.
- Buttons 160–200ms, drawer 220–260ms; optional section entrance opacity/translateY <=12px for 350–450ms, once only. Prefer no animation over janky motion.
- Respect prefers-reduced-motion; no autoplay, parallax or loading screen. Content visible without animation JS.
- Use clear focus-visible 2px outline + 3px offset. Validate hover, active, disabled, error, empty, loading and unavailable states.
- Links navigate; buttons act. Semantic header/nav/main/footer, one H1 per page, logical headings and alt text.

## Suggested implementation architecture (decision, not existing code)
If the repo has no framework, use Next.js App Router + TypeScript + CSS custom properties/CSS Modules. If a framework is later supplied, preserve it unless incompatible. Resolve supported stable dependency versions when implementation starts, do not blindly use obsolete versions from a prompt.
Central files: site config, typed product dataset, shared components and tokens. Separate content from layout. No database, authentication, CMS or Supabase is required for this first demo. Future editing panel is a later scoped project.
Suggested Product model: id, slug, commonName, botanicalName?, category, description, images[{src,alt}], variants[{id,label,priceArs?,availability?}], care?, featured, isDemo.
Availability enum available / consult / unavailable only when appropriate. Do not pretend static JSON is live stock.
Missing production assets must be reported in README. Use licensed imagery or approved supplied assets; do not scrape profile media indiscriminately.
Keep business phone only in config. No hardcoded address or replicated contact literals.
Use responsive optimized images, lazy-load below-fold images, prioritize hero only. Avoid massive animation/component libraries for simple interactions.
Include unique page titles/descriptions and social preview metadata. Structured data must include only verified facts. No invented aggregate rating.
Do not deploy or publish externally unless requested.

## Reference images
Approved visual reference titles from this conversation:
1. Hogar botánico de Vivero Siempre Verde.png — home composition.
2. Catálogo botánico y consulta de plantas.png — catalogue and product consultation.
3. Mayoristas y contacto · Vivero Siempre Verde.png — wholesale/contact.
Reference images have NOT been committed to this repository. If supplied locally later, place approved screenshots under docs/references/ and read them visually. Never claim to have reviewed absent assets. Initial concept also titled Catálogo botánico de Vivero Siempre Verde.png.
Written corrections in this document override banner repetition and decorative differences in images.

## Acceptance checks
- Visually inspect all routes at 390px and 1440px and check 360/768/1024px for overflow.
- Compare spacing, hierarchy, photography, colors and density to supplied references; not only functional checks.
- Verify navigation, search/filter combinations, empty results, invalid slug, quantity, variant grouping, add/remove/persistence and empty query.
- Verify WhatsApp draft encoding with accents, line breaks and multiple items; never claim it was sent.
- Keyboard navigation, focus restore, reduced motion and zoom 200%.
- Run framework build, lint/type checks and meaningful interaction tests for selection/message generation.
- No dead buttons, mock success alerts, fake data presented as live, unverified commercial promises, duplicate wholesale promotions or screenshot images used as the entire site.
- Report what was built, verification run and outstanding real content. Do not claim a perfect match without screenshots.

## Copy/paste agent prompt (English)
You are implementing the public website for Vivero Siempre Verde, a family nursery in Goya, Corrientes, Argentina.
Read this entire DESIGN_BRIEF.md before coding. Its explicit corrections override generated references.
Build the actual responsive multi-page website, not a screenshot, generic landing page or dashboard.
Use the typography, tokens, spacing, sitemap, exact Spanish copy and interactions specified above. Libre Baskerville headings and Inter UI are chosen implementation fonts, not measured original fonts.
Preserve the warm ivory/forest-green editorial look and authentic botanical photography. The only wholesale entry outside its page is the normal Mayoristas primary-navigation link, including the mobile equivalent. Remove homepage wholesale button/banner and footer duplication.
Implement Home, Catalogue, Product Detail, consultation selection and WhatsApp draft, Wholesale and Contact. Keep all customer-facing copy in Argentine Spanish.
Treat unconfirmed data as unconfirmed. Use a clearly labeled demo dataset until inventory is supplied. Do not invent prices, live stock, owners, address, schedules, delivery coverage or business history.
Inspect repository contents first; preserve existing work. If empty, initialize the suggested stack. Keep content/config independent of components and use accessible, reusable controls.
Proceed through implementation and verification without stopping after a plan. Ask only for genuinely blocking information; otherwise use the safe documented defaults.
Do not create an admin panel, checkout, login, backend or external deployment in this scope.
If the reference screenshots are absent, implement from the written specification and state the limitation; do not claim visual comparison.
Run appropriate checks and visual responsive QA. Fix issues found. Finish with changed files, validation evidence and remaining content requirements.
