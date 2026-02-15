
Using the prebuilt container image (GHCR)

This repository publishes a container image to GitHub Container Registry (GHCR) via the GitHub Actions workflow on push to `main`/`master` (or via manual dispatch).

Image names produced by the workflow:
- `ghcr.io/MaximilianHertenstein/sql_book:latest`
- `ghcr.io/MaximilianHertenstein/sql_book:<commit-sha>`

Replace `<OWNER>` with your GitHub user or organization name. To discover the owner from your local repo, run:

```bash
git remote get-url origin || true
# if the URL looks like git@github.com:OWNER/repo.git or https://github.com/OWNER/repo.git
# you can extract OWNER manually.
```

Quick local run example:

```bash
docker run --rm -p 8888:8888 ghcr.io/MaximilianHertenstein/sql_book:latest
```

Notes for Binder / BinderHub:
- To avoid repo2docker builds on Binder, configure your BinderHub or instance to use the prebuilt image `ghcr.io/MaximilianHertenstein/sql_book:latest`. How to set the image depends on the BinderHub deployment (public MyBinder.org typically does not accept arbitrary GHCR images by notebook authors; a private BinderHub instance can be configured to use this image).
- If you need anonymous public access, make sure the package/image is visible publicly in GHCR (see GitHub Packages settings for your repository or organization).

Action authentication and visibility:
- The workflow uses the repository `GITHUB_TOKEN` to authenticate and push to GHCR. For repository-owned images this usually works without additional secrets.
- To allow anonymous pulls (e.g., Binder pulling without authentication) you must make the package public in GitHub Packages settings: go to the package page in your repository and set visibility to public.

Want me to replace `<OWNER>` in this file with your actual GitHub user/org name and add a README badge linking the image? If yes, tell me your GitHub user or org name (or I can add a template badge file you can fill).

