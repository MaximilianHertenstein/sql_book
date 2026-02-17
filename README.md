# SQL Book

[![GHCR Image](https://img.shields.io/badge/ghcr.io%2FMaximilianHertenstein%2Fsql_book-latest-blue?logo=github)](https://ghcr.io/MaximilianHertenstein/sql_book)

An interactive SQL book built with [mdBook](https://rust-lang.github.io/mdBook/), featuring live, browser-based SQL execution powered by [PGlite](https://github.com/electric-sql/pglite) and [codapi](https://github.com/nalgeon/codapi).

**📖 [Read the book online](https://maximilianhertenstein.github.io/sql_book)**  
**🔗 [GitHub Repository](https://github.com/MaximilianHertenstein/sql_book)**

## Features

- **Interactive SQL snippets** — Run PostgreSQL queries directly in the browser (no server required).
- **Multiple engines** — Supports PGlite (Postgres), SQLite (via WASI), and MySQL sandbox environments.
- **Quiz support** — Uses `mdbook-quiz` for interactive learning exercises.

## Key Files

- `src/` — Markdown source files for book chapters.
- `src/book_theme/` — Custom theme templates and scripts:
  - `head.hbs` — Loads codapi dependencies.
  - `loadPGLite.js` — Minimal PGlite engine adapter for codapi.
- `book.toml` — mdBook configuration.

## Building

```bash
mdbook build
```

The built site is output to `book/`.

## Usage

Open `book/index.html` in a browser, navigate to a chapter with SQL snippets, and click **Run** to execute queries in-browser.
