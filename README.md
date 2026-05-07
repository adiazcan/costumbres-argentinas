# Costumbres Argentinas

Restaurant web app for Pizzeria Costumbres Argentinas.

This project is now a full-stack TypeScript app:

- React 19 + Vite frontend in `client/`
- Express + tRPC backend in `server/`
- Shared types/constants in `shared/`
- Drizzle ORM schema and migrations in `drizzle/`

## Development

Install dependencies:

```bash
pnpm install
```

Run in development mode:

```bash
pnpm dev
```

The app starts an Express server and uses Vite middleware in dev mode.

## Build and production run

Build frontend and backend bundles:

```bash
pnpm build
```

Start production server:

```bash
pnpm start
```

## Deployment options

### 1) Frontend-only (GitHub Pages)

`.github/workflows/deploy.yml` now builds the Vite client and deploys `dist/public` to GitHub Pages.

Important:

- Frontend pages that call `/api/trpc` require a deployed backend.
- Set `VITE_API_BASE_URL` at build time if your API is hosted on another domain.

Example:

```bash
VITE_API_BASE_URL=https://api.example.com pnpm exec vite build
```

### 2) Full-stack deployment (recommended)

Deploy the Node server (`pnpm build` + `pnpm start`) to a platform like Render, Railway, Fly.io, or Azure App Service.

Required runtime values depend on your integrations (database, auth, storage, etc.).

## Environment variables

- `PORT`: server port (default `3000`)
- `NODE_ENV`: `development` or `production`
- `VITE_BASE_PATH`: optional frontend base path (used for GitHub Pages subpath deployments)
- `VITE_API_BASE_URL`: optional absolute API origin for client tRPC calls
