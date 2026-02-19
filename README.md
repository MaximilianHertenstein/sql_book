# SQL Book


An interactive SQL book built with [mdBook](https://rust-lang.github.io/mdBook/), featuring live, browser-based SQL execution powered by [PGlite](https://github.com/electric-sql/pglite) and [codapi](https://github.com/nalgeon/codapi).

**📖 [Read the book online](https://maximilianhertenstein.github.io/sql_book)**  
**🔗 [GitHub Repository](https://github.com/MaximilianHertenstein/sql_book)**

## Tooling

This project uses:
- **mdBook v0.4.52** — builds the book
- **mdbook-quiz v0.4.0** — interactive quiz support
- **mdbook-admonish v1.20.0** — admonition blocks (notes, tips, warnings)

## Important: Version Compatibility

`mdbook-quiz v0.4.0` is currently compatible with mdBook `0.4.x` (not `0.5.x`). See [mdbook-quiz issue #61](https://github.com/cognitive-engineering-lab/mdbook-quiz/issues/61).

### Install dependencies

Install the required CLI tools with Cargo:

```bash
# Install mdBook v0.4.x
cargo install mdbook --version 0.4.52 --locked

# Install mdbook-quiz v0.4.0
cargo install mdbook-quiz --version 0.4.0 --locked

# Install mdbook-admonish v1.20.0
cargo install mdbook-admonish --version 1.20.0 --locked

# Install admonish assets
mdbook-admonish install .
```

## Features

- **Interactive SQL snippets** — Run PostgreSQL queries directly in the browser (no server required).
- **Multiple engines** — Supports PGlite (Postgres), SQLite (via WASI), and MySQL sandbox environments.
- **Quiz support** — Uses `mdbook-quiz` for interactive learning exercises.

## Writing Style (Klasse 12/13)

- Fachbegriffe aus der Datenbanktheorie werden als bekannt vorausgesetzt.
- Neue Spezialbegriffe werden nur kurz und direkt beim ersten Auftreten erklärt.
- Pro Kapitel maximal **eine** kurze `admonish info`-Box für Begriffsklärung.

## Key Files

- `src/` — Markdown source files for book chapters.
- `src/book_theme/` — Custom theme templates and scripts:
  - `head.hbs` — Loads codapi dependencies.
  - `loadPGLite.js` — Minimal PGlite engine adapter for codapi.
- `book.toml` — mdBook configuration.

## Build

```bash
mdbook build
```

The generated site is written to `book/`.

## Serve locally

```bash
mdbook serve --open
```

## Usage

Open `book/index.html` in a browser, navigate to a chapter with SQL snippets, and click **Run** to execute queries in-browser.
