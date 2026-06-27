# Project Context – PDFcleaner

## What is this project?

I'm building **PDFcleaner** — a web-based application (pdfcleaner.se) where users can upload one or more PDF files, manipulate the pages (reorder, delete, merge), and download the result as a single PDF. There is also a page editor tool for adding text, shapes, and other elements to PDF pages, as well as a converter tool for turning other file types into PDFs.

## Purpose

To offer a simple, free, and privacy-first web tool for working with PDF files — entirely in the browser, without uploading documents to external servers.

## Tech stack

- **Static frontend** — HTML, CSS, and vanilla JavaScript (no frameworks, no build pipeline)
- **Bilingual** — the site has a Swedish version (`/sv/`) and an English version (`/en/`). Language is auto-detected from the browser and handled via a redirect in `frontend/index.html`
- **Shared codebase** — common logic and styles live in `frontend/shared.js` and `frontend/shared.css`, used by both language versions
- **PDF processing** — done entirely client-side in the browser using JavaScript PDF libraries (pdf-lib and PDF.js)
- **Backend exists but is not in use** — a Flask (Python) backend is present on the server (`backend/`), set up with security middleware (Talisman for CSP, Flask-Limiter for rate limiting), but is currently not wired up to the frontend. It exists as groundwork for potential future server-side features
- **Hosting** — static files served under the domain pdfcleaner.se

## Repository (branch: `live`)

```
/
├── frontend/           # All frontend code
├── backend/            # Flask backend (exists on server, not currently used)
├── requirements.txt    # Python dependencies for the backend
└── .gitignore
```

## Current status

The frontend is functional with a working multi-language setup, a dark/light theme switcher, and several tool pages (page editor, converter, PDF cleaner). The backend exists but is not yet connected to the frontend.
