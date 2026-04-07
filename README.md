# Costumbres Argentinas

Static site for **Pizzería Costumbres Argentinas**, built as a content-driven restaurant menu and contact experience for GitHub Pages.

## Project structure

- `index.html`: site markup and section structure
- `css/styles.css`: responsive styles
- `js/app.js`: menu rendering, search, service-mode toggle, and content loading
- `data/restaurant.md`: restaurant details loaded into the UI
- `data/menu.md`: menu categories, items, prices, and promotions
- `assets/`: site images
- `site.webmanifest`: installable web app metadata
- `sw.js`: offline caching for the app shell and content files
- `robots.txt` and `sitemap.xml`: search engine discovery assets
- `.github/workflows/deploy.yml`: GitHub Pages deployment workflow
- `docs/ux/`: UX research artifacts for the menu-ordering experience

## Content updates

Most day-to-day updates do not require code changes.

### Restaurant info

Edit `data/restaurant.md` to update:

- name and tagline
- description
- address and phone
- opening hours
- footer/location labels
- social links
- locale and currency formatting

### Menu and promotions

Edit `data/menu.md` to update:

- categories
- menu items
- descriptions
- prices
- promotions

The JavaScript parser reads this markdown and renders the menu UI automatically.

## Local preview

This is a plain static site with no build step. Open `index.html` in a browser or serve the repository with any simple static file server.

## Deployment

Deployments are handled through GitHub Pages via `.github/workflows/deploy.yml` on pushes to `main`.
