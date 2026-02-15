GHCR image badge and README snippet

Use this snippet to add a small badge to your `README.md` that links to the GHCR image for `MaximilianHertenstein`.

Badge (Shields):

```markdown
[![GHCR Image](https://img.shields.io/badge/ghcr.io%2FMaximilianHertenstein%2Fsql_book-latest-blue?logo=github)](https://ghcr.io/MaximilianHertenstein/sql_book)
```

Direct link and run example:

```markdown
Container: https://ghcr.io/MaximilianHertenstein/sql_book:latest

Run locally:
```bash
docker run --rm -p 8888:8888 ghcr.io/MaximilianHertenstein/sql_book:latest
```

Make image public (so Binder or anonymous users can pull):
-- Go to https://github.com/MaximilianHertenstein/sql_book/packages and select the `sql_book` package.
-- Change visibility to "Public" (if you want anonymous pulls).

If you tell me your GitHub user/org name, I'll replace `<OWNER>` and add the badge to `README.md` for you.
