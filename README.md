# Costumbres Argentinas

Restaurant web app for Pizzeria Costumbres Argentinas.

This project is a static React + Vite site:

- React 19 + Vite frontend in `client/`
- Static menu data in `seed-menu.mjs`
- Shared helpers in `shared/`

## Development

Install dependencies:

```bash
pnpm install
```

Run in development mode:

```bash
pnpm dev
```

The app runs as a static Vite site with no server runtime.

To edit the menu, update `seed-menu.mjs`.

## Build and preview

Build the static site:

```bash
pnpm build
```

Preview the built site locally:

```bash
pnpm preview
```

## Deployment

Deploy the contents of `dist/public/` to any static hosting platform, including GitHub Pages, Netlify, Cloudflare Pages, Azure Static Web Apps, or object storage.

## Environment variables

- `VITE_BASE_PATH`: optional frontend base path for subpath deployments
