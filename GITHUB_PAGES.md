# GitHub Pages Deployment

This portfolio is configured to deploy to:

```text
https://samithperera.github.io
```

## Repository Setup

1. Create a GitHub repository named exactly:

```text
samithperera.github.io
```

2. Push this project to the `main` branch.

3. In GitHub, open:

```text
Settings > Pages
```

4. Set the source to:

```text
GitHub Actions
```

## Deployment

Every push to `main` will run:

```text
.github/workflows/deploy.yml
```

The workflow installs dependencies, builds the Astro site, uploads `dist`, and deploys it to GitHub Pages.

## Local Build Check

Before pushing, you can run:

```bash
npm ci
npm run build
```

## Notes

- This is a user GitHub Pages site, so the Astro base path is `/`.
- The site URL is configured in `astro.config.mjs`.
- `public/.nojekyll` is included so GitHub Pages serves Astro asset folders correctly.
