# Architecture – PDFcleaner

## Overview

PDFcleaner is a **static frontend application** with a **Flask backend that lives on the server but is not currently connected to the frontend**. All PDF processing happens in the user's browser. The repo lives on the `live` branch at: https://github.com/FastTurtle70/PDFcleaner

---

## Repository structure

```
PDFcleaner/                        (branch: live)
├── frontend/
│   ├── index.html                 # Entry point — language detection + redirect
│   ├── shared.js                  # Shared JS (theme switcher, language dropdown)
│   ├── shared.css                 # Shared styles (13 KB — design system)
│   ├── home-light.css             # Light-theme overrides for the home page
│   ├── en/                        # English language version
│   │   ├── index.html             # Landing page (EN)
│   │   ├── editor.html            # Page editor tool (EN)
│   │   ├── converter.html         # File-to-PDF converter (EN)
│   │   ├── one.html               # PDF cleaner tool — step 1 (EN)
│   │   ├── two.html               # PDF cleaner tool — step 2 (EN)
│   │   ├── about.html             # About page (EN)
│   │   ├── contact.html           # Contact page (EN)
│   │   ├── policy.html            # Privacy policy (EN)
│   │   ├── tack.html              # Thank-you / confirmation page (EN)
│   │   └── 404.html               # 404 error page (EN)
│   └── sv/                        # Swedish language version (mirrors EN)
│       ├── index.html
│       ├── editor.html
│       ├── converter.html
│       ├── one.html
│       ├── two.html
│       ├── about.html
│       ├── contact.html
│       ├── policy.html
│       ├── tack.html
│       └── 404.html
├── backend/
│   ├── test1py.py                 # Flask app (not currently used by frontend)
│   └── templates/
│       └── index.html             # Jinja2 template for backend test route
└── requirements.txt               # Python dependencies for the backend
```

---

## Language routing

`frontend/index.html` is a thin redirect — no visible content. It reads `navigator.language` and sends the user to `/sv/` or `/en/` using `window.location.replace()`.

```
User visits pdfcleaner.se
        ↓
frontend/index.html checks navigator.language
        ↓
   Starts with "sv"? → /sv/
   Otherwise?        → /en/
```

---

## Shared frontend code

`frontend/shared.js` and `frontend/shared.css` are linked from all pages in `/en/` and `/sv/`.

**shared.js** handles two things:
- **Language dropdown** — `toggleLang()` opens/closes the language picker; a global click listener closes it when clicking outside
- **Theme switcher** — `applyTheme()` / `toggleTheme()` swap the theme stylesheet and update the icon/label. The selected theme (`light` or `dark`) is persisted in `localStorage` under the key `pdfcleaner-theme`. On page load, the saved theme is applied immediately

**shared.css** is the core design system (~13 KB). It defines CSS variables for colors, typography, spacing, and radius, and provides all shared layout components (navbar, buttons, panels, etc.)

**home-light.css** — additional CSS for the landing page's light theme variant.

---

## Frontend tools and pages

### PDF Cleaner (`one.html` → `two.html`)
The core feature. A two-step flow for uploading one or more PDF files, manipulating pages (reorder, delete), and downloading the result as a merged PDF. Processing is entirely client-side.

### Page Editor (`editor.html`)
A canvas-based editor (three-column layout: tools panel / canvas / properties panel) for adding and editing elements on a PDF page — text, shapes, images, etc. Uses an HTML `<canvas>` element for rendering. Export downloads the result as a PDF.

### Converter (`converter.html`)
A tool for converting other file types (images, etc.) into PDF. Three-column layout similar to the editor — file queue on the left, preview in the center, settings on the right. Entirely client-side.

### Static pages
`about.html`, `contact.html`, `policy.html`, `tack.html` (thank-you/confirmation), `404.html`

---

## Backend (exists on server — not currently connected)

The backend is a **Flask application** (`backend/test1py.py`) deployed on the server alongside the static files. It is not currently wired up to the frontend in any way.

### Stack
- **Flask** — Python web framework
- **Flask-Talisman** — sets HTTP security headers including a Content Security Policy (CSP)
- **Flask-Limiter** — rate limiting (default: 100 requests per minute per IP)
- **Gunicorn** — WSGI server for production

### CSP configuration
```python
csp = {
    'default-src': ["'self'"],
    'style-src':   ["'self'", "https://fonts.googleapis.com", "'unsafe-inline'"],
    'font-src':    ["'self'", "https://fonts.gstatic.com"],
    'script-src':  ["'self'", "'unsafe-inline'"]
}
```

### Routes (current)
- `GET /test1` — renders `backend/templates/index.html` with a test message
- `404` handler — returns plain text "Sidan hittades inte."
- `500` handler — returns plain text "Internt serverfel."

### Python dependencies (`requirements.txt`)
```
flask==3.0.3
Flask-Limiter==3.8.0
flask-talisman==1.1.0
gunicorn==23.0.0
# + supporting packages (blinker, click, jinja2, werkzeug, etc.)
```

### Backend templates
`backend/templates/index.html` — a Jinja2 HTML template (full page, styled with the shared design system) used by the `/test1` route. It mirrors the visual design of the frontend.

---

## Key architectural decisions

| Decision | Rationale |
|---|---|
| No backend in the user flow | Files never leave the browser — privacy by design |
| No build pipeline | No npm, no bundler — plain HTML/CSS/JS, easy to deploy |
| Multilingual via separate folders | `/en/` and `/sv/` instead of runtime i18n — simpler to maintain |
| Shared logic centralized | `shared.js` / `shared.css` avoid duplication across language versions |
| Backend ready but dormant | Flask backend is in place for future server-side features (e.g. contact form, analytics, or heavier processing) without blocking the current static-first approach |
