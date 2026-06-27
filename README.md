# PDFcleaner.se

A free, privacy-first web tool for editing PDF files — entirely in the browser. No uploads to external servers, no account required, no cost. This github repository is currently used to document this project.

**Live site:** [pdfcleaner.se](https://pdfcleaner.se)

---

## Features

- **Clean one PDF** — reorder or remove pages from a single PDF file
- **Merge multiple PDFs** — combine several files and manipulate pages across them *(in progress)*
- **Page editor** — add text, shapes, and other elements to a PDF page
- **File converter** — convert images and other file types into PDF
- **Dark / light theme** — persisted per browser
- **Bilingual** — English and Swedish, auto-detected from the browser

---

## Project structure

```
PDFcleaner/                        (branch: live)
├── frontend/
│   ├── index.html                 # Entry point — detects language and redirects
│   ├── shared.js                  # Shared JS: theme switcher, language dropdown
│   ├── shared.css                 # Shared design system (CSS variables, components)
│   ├── home-light.css             # Light theme overrides for the home page
│   ├── en/                        # English version
│   │   ├── index.html
│   │   ├── one.html               # PDF cleaner — single file
│   │   ├── two.html               # PDF cleaner — multiple files
│   │   ├── editor.html            # Page editor
│   │   ├── converter.html         # File-to-PDF converter
│   │   ├── about.html
│   │   ├── contact.html
│   │   ├── policy.html
│   │   ├── tack.html              # Thank-you / confirmation page
│   │   └── 404.html
│   └── sv/                        # Swedish version (mirrors en/)
├── backend/
│   ├── test1py.py                 # Flask app (on server, not yet used by frontend)
│   └── templates/
│       └── index.html             # Jinja2 template for backend test route
└── requirements.txt               # Python dependencies for the backend
```

---

## Tech stack

| Layer | Technology |
|---|---|
| Markup | HTML5 |
| Styles | CSS3 — no preprocessor |
| Logic | Vanilla JavaScript — no framework, no bundler |
| PDF processing | Client-side JS libraries (pdf-lib, PDF.js) |
| Backend | Flask + Gunicorn — on server, not currently connected |
| Hosting | Static files on pdfcleaner.se |

---

## Backend

A Flask backend is present on the server (`backend/test1py.py`) and includes security middleware (Talisman for CSP headers, Flask-Limiter for rate limiting) and a Gunicorn setup for production. It is **not currently connected to the frontend** — all PDF processing happens client-side. The backend exists as groundwork for future server-side features.

---
 
## Prompts folder
 
The repo includes a set of markdown prompt files (`projectcontext.md`, `architecture.md`) used to quickly bring AI assistants up to speed on the project.
 
These are pasted at the start of a conversation to give the AI relevant context and background — saving time instead of re-explaining the project from scratch each time. Currently used across three tools with different roles:
 
- **Claude** — writing and iterating on code
- **Gemini** — general help and server-side topics (Nginx config, deployments, installations)
- **ChatGPT** — discussing the project, exploring future ideas and directions
---

## Contributing

The project is open source. Feel free to open a pull request or an issue on GitHub.

---

*© 2026 PDFcleaner.se*
