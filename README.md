# Ramlaptops — Computers E-Commerce Hub

Retail storefront + B2B wholesale + admin portal for Ramlaptops, Bengaluru.

## Pages

| Page | Description |
| --- | --- |
| `index.html` | Storefront — hero, product grid, wholesale quote form, testimonials, contact |
| `admin-login.html` | Admin portal secure login / sign-up |
| `admin-dashboard.html` | Overview with KPIs, sales chart, activity feed |
| `admin-inventory.html` | Product catalog management (desktop table + mobile cards + add-product modal) |
| `admin-wholesale.html` | Inbound wholesale quote requests |

## Stack

- Vanilla HTML + Tailwind CSS (CDN) + Material Symbols
- Shared design system in `assets/css/theme.css` and `assets/js/theme.js`
- Motion via `esm.sh/motion` (progressive enhancement — the page is fully functional without it)
- Cart state persisted in `localStorage`

## Deploy

Static site — deploy the folder as-is (Vercel / Netlify / any static host).