# Verdant customization guide — Home Page 1

## 1. Installation
Open index.html directly, or serve the extracted folder with a static web server. Bundled Bootstrap 5.3.3 and Lucide do not require a CDN connection.

## 2. File structure
index.html, assets/css/{style,dark-mode,rtl}.css, assets/js/main.js, assets/vendor, assets/images, assets/favicon.svg, documentation, robots.txt and sitemap.xml. The hosted source keeps these files under dist; the review ZIP exposes index.html at its root.

## 3. Page structure
One homepage: hero, estimator, environment introduction, services, how it works, urban handoff, business solutions, tracking preview, coverage, testimonials, environmental benefits, final CTA and footer. Other menu pages will be added after approval of this design.

## 4. Color customization
Edit semantic variables in style.css and dark-mode.css. Keep surface/text pairs together and recheck contrast. Current palette uses only primary green #527f5b, black and white. The active theme-content-balanced.css defines both light and dark states; preserve the paired surface/text values.

## 5. Font customization
The edition uses the local Segoe UI / Arial sans-serif system stack to work offline. To use Google Fonts, download licensed WOFF2 assets into assets/fonts, define @font-face with font-display:swap, and update body font-family. No external font requests currently occur.

## 6. Image replacement
Replace hero-courier.jpg and business-handoff.jpg with your JPG images. Keep filenames or change the CSS paths. Recommended landscape ratio 3:2. Adjust background-position to preserve faces and the bicycle at mobile sizes. Update role=img aria-label descriptions. The shipped JPGs are plain replaceable placeholders. No generated photography is included.

## 7. Dark mode
System preference is read when no saved choice exists. The manual choice is persisted under verdant-theme. The theme is set in the head to reduce flashing. All theme surfaces are defined explicitly.

## 8. RTL
The RTL control saves verdant-dir and changes the document direction. Logical padding/margins handle most mirroring; rtl.css handles directional icon and map transforms. This is layout support, not Arabic or Hebrew translation.

## 9. Contact form integration
Contact and newsletter are validation previews. Connect Formspree or Netlify Forms before accepting inquiries. Add an endpoint in a server/environment configuration, POST validated data, then display success only after a confirmed response. Handle failures, rate limiting, consent, and retries. Remove the preview wording only after integration is verified. Never embed secret API keys in main.js.

## 10. Map integration
The tracking map is an SVG route diagram, not a map provider. Integrate Google Maps using restricted public browser keys or an approved server proxy; replace the illustrative diagram and label actual coordinate sources. Coverage lookup currently checks fictional neighborhood names and must be replaced with a real service-area dataset or server lookup.

## 11. Tracking API integration
Implement a read-only delivery endpoint supplying courier name, vehicle, status, coordinates, timestamp and ETA. Authenticate business data at the backend. Use polling or event updates, abort stale requests, and handle loading, connection errors and empty delivery lists. Replace manually selected preview stages only after integration. Never infer live statuses from a local timer.

## 12. Payment integration
No payments in Home Page 1. Stripe Checkout and PayPal must be created server-side, with booking IDs and webhook-confirmed payment status. Never mark paid because a user clicks a button or returns to a success URL.

## 13. Dashboard customization
The business account dialog is an explicit staged preview. The dedicated business-client dashboard is planned next, including deliveries, tracking, history, proof and billing. There is no account backend or authentication in this edition.

## 14. SEO
Update title, description, canonical URL, Open Graph properties and WebPage JSON-LD in index.html. Update sitemap and robots after moving domains. Fictional business content intentionally avoids asserting a genuine registered LocalBusiness. Add verified business/service schema only after real business information is provided.

## 15. Credits
Bootstrap 5.3.3 (MIT); Lucide 0.468.0 (ISC); generated project-bound bicycle courier photography. PeddalDrop was consulted for cycle-only local delivery positioning; no brand assets or source code were copied. Vendor distributions retain license notices.

## 16. Changelog
2026-10-07: Home Page 1 review edition. Earthy minimal design, responsive layouts, light/dark/RTL controls, local estimator and coverage UI, tracking stage preview, account and contact dialogs.

## 17. Support / next steps
Keep changes focused on the review feedback. Once Home Page 1 is accepted, build Home Page 2 with a distinct B2B composition and then the remaining pages. Add JPG background heroes to every public menu page as they are created. Retest all modes and devices after real content or images change.


## Home Page 2 update — 2026-10-07
Home Page 1 is approved. Home Page 2 is now built with a distinct B2B editorial composition, photo background hero, industry rows, cargo capacity, workflow, sample pricing, tracking and coverage previews, estimator and native FAQ disclosures. Both pages use natural green #527f5b and dark-theme peach #527f5b. Replace business-hero.jpg for the Home 2 hero. Pages are cross-linked. Source/DOM checks do not constitute browser visual QA. Earlier single-page scope notes refer to the initial edition.

## Current image placeholders and review styling
All three JPGs are now neutral replacement placeholders, rather than generated photos. Keep their filenames when adding your own images. The visible “Your JPG” labels can be removed after replacement. review-fixes.css contains the focused typography, equal-height, alignment and navigation adjustments. Home 2 has additional layout rules at the end of home-2.css. The Home dropdown uses native details/summary with Escape and outside-click closing. All existing demo functionality remains local.

## About page
about.html adds company story and courier content using the same theme and RTL controls. Replace about-hero.jpg, about-story.jpg, courier-alex.jpg, courier-jordan.jpg, courier-taylor.jpg and courier-morgan.jpg with your own JPGs. about.css controls the new page. All courier profiles and company milestones are illustrative. main.js checks for optional homepage widgets before initialization, while navigation, theme, forms and dialogs stay shared.

## Full dark-mode image surfaces
Dark mode adds a CSS tint over JPG areas; the original image files and replacement paths are unchanged. The image shade variables are in dark-mode.css. All badges and labels now use theme surfaces and text. Keep dark-mode.css as the final stylesheet on each new page to avoid light component rules overriding the theme.

## Current theme asset references
Pages now load dark-mode-20261007.css and main-20261007.js to avoid reuse of previous assets. The unversioned customization source files are retained with identical contents. If customizing, update both copies or change page references to your own fresh filename. Dark mode uses charcoal surfaces; light mode keeps warm cream surfaces and natural green branding.

Exact three-color palette: black #000000, white #FFFFFF, natural green #527f5b. Same primary in both modes.

Services page: eight equal-height cards, eight expandable service guides, four-step workflow, parcel guidance, FAQ and centered CTA. Replace services-hero.jpg and service-*.jpg. All services and limits are demo content. Service Details is a later separate page; Learn more links currently open guides on this page.

Service Details: service-details.html?service=slug selects one of eight services. Default same-day page works without JavaScript. Customize serviceData in assets/js/service-details.js and replace service-details-hero.jpg. No live booking, tracking or proof records are generated.

Request a Delivery: six-step browser-memory preview, required fields, phone/date/time checks, 25 lb combined limit and 24 × 18 × 18 in parcel limit. Prices use a fixed 3-mile demo route. Stripe/PayPal are disabled integration options. Confirmation IDs start DEMO-. No request is sent or persisted. Connect an authenticated API and server validation before real dispatch or payment.

Areas Covered: offline neighborhood-name lookup with core, extended, unavailable and unverified states. Map is a non-geographic schematic, with readable mobile rows. Coverage inquiry validates locally but sends nothing. Replace areas-hero.jpg, configure real coverage polygons and server checks, and connect a contact provider before receiving inquiries.

Content balance update: added pickup, handling and route guidance to shorter columns on coverage, service, about, tracking and request sections. Removed repeated template annotations from page copy; kept concise operational connection notices. Browser layout verification remains pending.

Pricing page: five sample service options, responsive comparison cards and a planning calculator. Formula: $12 base for up to 3 miles + $2 per extra mile + service addition + $6 above 8 lb. Inputs: 0.5–12 miles, 0.1–25 lb. All values require operator confirmation. Replace pricing-hero.jpg. Request page form box now stretches to its adjacent content on desktop, with automatic stacked heights on tablet/mobile. Visual verification remains pending.

Blog: nine articles with six-per-page local pagination, combined category/search filters, empty/reset states and native-dialog reading panels. Edit blogPosts in assets/js/blog.js and the corresponding HTML cards together; replace blog-*.jpg. A separate Blog Details page will connect article links in the next stage. Added three Services FAQs; Request text/controls now use 16px while retaining existing headings and layout.

## Contact page
Contact Us is available at contact.html. Replace assets/images/contact-hero.jpg with your own JPG. Update office details, hours and mailbox links before launch. assets/js/contact.js keeps contactEndpoint empty by default; the inquiry is validated locally and no data is sent or stored. Configure a Formspree endpoint or same-origin API to enable POST delivery, and test provider success and failure states. For Netlify Forms, adapt to its deployment and form detection requirements before enabling. Replace the schematic in contact.html with Google Maps only after confirming the business location. Public menus now link to Contact Us.

## Business Login
login.html contains business email/password inputs, an accessible visibility toggle, remember-me selection and password recovery dialog. Business Login links now open this page throughout the site. No credentials are transmitted or stored; there is no authenticated session. The remember-me checkbox does not persist a session until you connect secure server-backed authentication. Complete the integration TODOs in assets/js/login.js with a trusted provider, server validation, appropriate session cookies and recovery flow. The Create account link opens the standalone Register page. Replace assets/images/login-hero.jpg with your own JPG.

## Business Registration
register.html provides contact and business details, optional phone, password confirmation, terms notice and password visibility controls. assets/js/register.js validates locally; no data is transmitted or stored and no account is created. Integrate secure server/provider registration, duplicate-account handling and verification before enabling real account creation. Replace the terms dialog with approved business terms/privacy notices, and enforce validation on the server. Existing Create account links now open Register; Login and Register link to each other. Replace assets/images/register-hero.jpg with your own JPG.

## Business Client Dashboard
dashboard.html provides Overview, New Delivery, Active Deliveries, Tracking, Delivery History, Proof of Delivery, Billing, Invoices, Notifications, Business Profile, Settings and Logout. The sidebar changes views using URL fragments; footer links and Login offer access without implying authentication. assets/js/dashboard.js owns the clearly identified sample records, invoice periods, filters and local request review/confirmation. No local request is added to active dispatch or server history. Text receipts and CSV invoice records are actual browser-generated downloads of sample content. Replace dashboard-hero.jpg and dashboard-proof.jpg with your own JPGs.

Connect authenticated delivery/proof/billing APIs before handling real business records. Tracking needs delivery ID, coordinates, ETA and status; the route diagram is static. Stripe/PayPal actions currently explain the required secure payment integration. Email/SMS preferences do not activate notifications. Profile checks do not save an account. Theme/direction preferences use the existing browser storage keys. Logout navigates to Login because no authenticated session exists. Tables become labeled cards below 1024px to avoid horizontal overflow.
