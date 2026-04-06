/**
 * Pizzería Costumbres Argentinas – Main Application Script
 *
 * Restaurant info is loaded from data/restaurant.md (YAML frontmatter).
 * Menu data is loaded from data/menu.md (structured Markdown).
 * To update the menu or restaurant info, edit those files only – no code changes needed.
 */

'use strict';

/* ── State ───────────────────────────────────────────────── */
let menuData = null;
let activeCategory = null;
let searchQuery = '';
let serviceMode = 'onsite';
let priceFormat = {
  locale: 'es-AR',
  currency: 'ARS',
  digits: 0,
};

const FEATURED_MENU_MEDIA = {
  'pizzas-clasicas': {
    Mozzarella: 'assets/pizza-muzzarella.jpg',
    Napolitana: 'assets/pizza-napolitana.jpg',
  },
  bebidas: {
    'Coca-Cola 500ml': 'assets/beverage-linea-coca.jpg',
  },
};

/* ── DOM helpers ─────────────────────────────────────────── */
const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

/* ── Formatters ──────────────────────────────────────────── */
function formatPrice(amount) {
  return new Intl.NumberFormat(priceFormat.locale, {
    style: 'currency',
    currency: priceFormat.currency,
    minimumFractionDigits: priceFormat.digits,
    maximumFractionDigits: priceFormat.digits,
  }).format(amount);
}

/* ── Menu rendering ──────────────────────────────────────── */
function renderTabs(categories) {
  const container = $('#category-tabs');
  if (!container) return;

  container.innerHTML = `
    <button type="button" class="tab-btn active" data-cat="all" role="tab" aria-selected="true">
      🍽️ Todo
    </button>
    ${categories
      .map(
        (cat) => `
      <button type="button" class="tab-btn" data-cat="${cat.id}" role="tab" aria-selected="false">
        ${cat.icon} ${cat.name}
      </button>
    `
      )
      .join('')}
  `;

  container.addEventListener('click', (e) => {
    const btn = e.target.closest('.tab-btn');
    if (!btn) return;
    $$('.tab-btn', container).forEach((b) => {
      b.classList.remove('active');
      b.setAttribute('aria-selected', 'false');
    });
    btn.classList.add('active');
    btn.setAttribute('aria-selected', 'true');
    activeCategory = btn.dataset.cat;
    filterAndRender();
  });
}

function buildPriceHTML(prices) {
  const labelMap = {
    individual: 'Porcion',
    media: 'Media',
    entera: 'Grande',
    unidad: 'Unidad',
    docena: 'Docena',
    precio: 'Precio',
  };
  return Object.entries(prices)
    .map(
      ([key, val]) => `
    <div class="price-item">
      <span class="price-label">${labelMap[key] || key}</span>
      <span class="price-value">${formatPrice(val)}</span>
    </div>
  `
    )
    .join('');
}

function getFeaturedMedia(categoryId, itemName) {
  return FEATURED_MENU_MEDIA[categoryId]?.[itemName] || null;
}

function buildTagsHTML(tags) {
  return tags
    .map((t) => {
      const cls = `tag-${t.replace(/\s+/g, '-')}`;
      return `<span class="tag ${cls}">${t}</span>`;
    })
    .join('');
}

function renderMenuCard(item, categoryId) {
  const media = getFeaturedMedia(categoryId, item.name);
  return `
    <article class="menu-card" data-name="${item.name.toLowerCase()}" data-desc="${item.description.toLowerCase()}" data-tags="${item.tags.join(' ').toLowerCase()}">
      ${
        media
          ? `<div class="menu-card-media"><img src="${media}" alt="${item.name}" loading="lazy" /></div>`
          : ''
      }
      <div class="menu-card-body">
        <div class="menu-card-top">
          <h4 class="menu-card-name">${item.name}</h4>
          <div class="menu-card-tags">${buildTagsHTML(item.tags)}</div>
        </div>
        <p class="menu-card-desc">${item.description}</p>
        <div class="menu-card-prices">${buildPriceHTML(item.prices)}</div>
      </div>
    </article>
  `;
}

function renderCategories(categories) {
  const container = $('#menu-categories');
  if (!container) return;

  container.innerHTML = categories
    .map(
      (cat) => `
    <section class="menu-category-section ${activeCategory === 'all' || activeCategory === cat.id ? 'active' : ''}" id="cat-${cat.id}">
      <div class="category-header">
        <span class="category-icon">${cat.icon}</span>
        <div>
          <h3>${cat.name}</h3>
          <p>${cat.description}</p>
        </div>
      </div>
      <div class="menu-grid">
        ${cat.items.map((item) => renderMenuCard(item, cat.id)).join('')}
      </div>
    </section>
  `
    )
    .join('');
}

function filterAndRender() {
  if (!menuData) return;

  const sections = $$('.menu-category-section');
  const noResults = $('#no-results');
  const summary = $('#menu-results-summary');
  const clearBtn = $('#menu-clear-search');
  const q = searchQuery.trim().toLowerCase();
  let anyVisible = false;
  let visibleCards = 0;
  let visibleSections = 0;

  sections.forEach((sec) => {
    const catId = sec.id.replace('cat-', '');
    const catMatch = activeCategory === 'all' || activeCategory === catId;

    if (!catMatch) {
      sec.classList.remove('active');
      return;
    }

    if (!q) {
      // Show all cards in this section
      const cards = $$('.menu-card', sec);
      cards.forEach((c) => (c.style.display = ''));
      sec.classList.add('active');
      anyVisible = true;
      visibleSections += 1;
      visibleCards += cards.length;
      return;
    }

    // Filter cards by search query
    const cards = $$('.menu-card', sec);
    let sectionHasVisible = false;
    cards.forEach((card) => {
      const matchName = card.dataset.name.includes(q);
      const matchDesc = card.dataset.desc.includes(q);
      const matchTags = card.dataset.tags.includes(q);
      const visible = matchName || matchDesc || matchTags;
      card.style.display = visible ? '' : 'none';
      if (visible) {
        sectionHasVisible = true;
        visibleCards += 1;
      }
    });

    if (sectionHasVisible) {
      sec.classList.add('active');
      anyVisible = true;
      visibleSections += 1;
    } else {
      sec.classList.remove('active');
    }
  });

  if (summary) {
    const scope = serviceMode === 'remote' ? 'para pedido telefónico' : 'para consultar en el salón';
    summary.textContent = q
      ? `${visibleCards} opciones en ${visibleSections} categorías ${scope}.`
      : `${visibleCards} opciones disponibles en ${visibleSections} categorías ${scope}.`;
  }

  if (clearBtn) {
    clearBtn.hidden = !q;
  }

  if (noResults) {
    const noResultsQuery = $('#no-results-query');
    if (noResultsQuery) noResultsQuery.textContent = searchQuery.trim();
    noResults.style.display = anyVisible ? 'none' : 'block';
  }
}

function renderServiceMode() {
  const isRemote = serviceMode === 'remote';
  const heroServiceCopy = $('#hero-service-copy');
  const menuHeading = $('#menu-heading');
  const menuIntroCopy = $('#menu-intro-copy');

  if (heroServiceCopy) {
    heroServiceCopy.textContent = isRemote
      ? 'Elegí tus variedades favoritas, llamanos y prepará tu visita para pasar a retirarlo.'
      : 'Abrí la carta, descubrí nuestros sabores y hacé tu pedido cuando estés listo.';
  }

  if (menuHeading) {
    menuHeading.textContent = isRemote ? 'Carta para pedir y llevar' : 'Carta para disfrutar en el local';
  }

  if (menuIntroCopy) {
    menuIntroCopy.textContent = isRemote
      ? 'Buscá variedades y cantidades para llamar con tu pedido ya decidido.'
      : 'Recorré la carta por categorías y elegí con calma tu próxima pizza, empanada o pasta.';
  }

  $$('.service-chip').forEach((button) => {
    const active = button.dataset.service === serviceMode;
    button.classList.toggle('active', active);
    button.setAttribute('aria-pressed', String(active));
  });

  $$('[data-service-card]').forEach((card) => {
    card.classList.toggle('is-active', card.dataset.serviceCard === serviceMode);
  });

  filterAndRender();
}

/* ── Promotions rendering ────────────────────────────────── */
function renderPromos(promos) {
  const section = $('#promos');
  const container = $('#promos-grid');
  const navLink = $('.nav-link[href="#promos"]');
  if (!container) return;

  if (!promos || promos.length === 0) {
    if (section) section.hidden = true;
    if (navLink) navLink.hidden = true;
    return;
  }

  if (section) section.hidden = false;
  if (navLink) navLink.hidden = false;

  const icons = ['🍕', '🥂', '🥟', '🍺', '🌟'];
  container.innerHTML = promos
    .map(
      (promo, i) => `
    <div class="promo-card">
      <div class="promo-icon">${icons[i % icons.length]}</div>
      <h3>${promo.title}</h3>
      <p>${promo.description}</p>
      ${promo.note ? `<span class="promo-note">${promo.note}</span>` : ''}
      ${promo.price > 0 ? `<div class="promo-price">${formatPrice(promo.price)}</div>` : `<div class="promo-cta">${promo.note || 'Consultar'}</div>`}
    </div>
  `
    )
    .join('');
}

/* ── Restaurant info rendering ───────────────────────────── */
function renderRestaurantInfo(restaurant) {
  priceFormat = {
    locale: restaurant.locale || 'es-AR',
    currency: restaurant.currency || 'ARS',
    digits: Number.isFinite(restaurant.priceDigits) ? restaurant.priceDigits : 0,
  };

  const taglineEl = $('#hero-tagline');
  if (taglineEl) taglineEl.textContent = restaurant.tagline;

  const descEl = $('#hero-desc');
  if (descEl) descEl.textContent = restaurant.description;

  const heroHours = $('#hero-hours');
  if (heroHours) heroHours.textContent = restaurant.hours.primary;

  const heroAddressShort = $('#hero-address-short');
  if (heroAddressShort) heroAddressShort.textContent = restaurant.address.split(',').slice(0, 2).join(',').trim();

  const logoLocation = $('#logo-location');
  if (logoLocation) logoLocation.textContent = restaurant.locationLabel;

  const heroPhoneNumber = $('#hero-phone-number');
  if (heroPhoneNumber) heroPhoneNumber.textContent = restaurant.phone;

  const addressEl = $('#info-address');
  if (addressEl) {
    addressEl.innerHTML = restaurant.address
      .split(',')
      .map((line) => `<span>${line.trim()}</span>`)
      .join('<br>');
  }

  const phoneEl = $('#info-phone');
  if (phoneEl) {
    phoneEl.textContent = restaurant.phone;
    phoneEl.href = `tel:${restaurant.phone.replace(/\s/g, '')}`;
  }

  $$('.phone-link').forEach((el) => {
    el.href = `tel:${restaurant.phone.replace(/\s/g, '')}`;
    el.setAttribute('title', `Llamar al ${restaurant.phone}`);
  });

  const emailEl = $('#info-email');
  const emailRow = $('#info-email-row');
  if (emailEl) {
    emailEl.textContent = restaurant.email;
    emailEl.href = `mailto:${restaurant.email}`;
  }
  if (emailRow) {
    emailRow.parentElement.style.display = restaurant.email ? '' : 'none';
  }

  const footerPhone = $('#footer-phone');
  if (footerPhone) {
    footerPhone.textContent = restaurant.phone;
    footerPhone.href = `tel:${restaurant.phone.replace(/\s/g, '')}`;
  }

  const footerEmail = $('#footer-email');
  if (footerEmail) {
    footerEmail.textContent = restaurant.email;
    footerEmail.href = `mailto:${restaurant.email}`;
    footerEmail.style.display = restaurant.email ? '' : 'none';
  }

  const footerTagline = $('#footer-tagline');
  if (footerTagline) footerTagline.textContent = restaurant.tagline;

  const footerSignature = $('#footer-signature');
  if (footerSignature) footerSignature.textContent = restaurant.footerSignature;

  const hoursPrimaryLabel = $('#info-hours-primary-label');
  if (hoursPrimaryLabel) hoursPrimaryLabel.textContent = restaurant.hours.primaryLabel;

  const hoursWeekEl = $('#info-hours-weekdays');
  if (hoursWeekEl) hoursWeekEl.textContent = restaurant.hours.primary;

  const hoursSecondaryLabel = $('#info-hours-secondary-label');
  if (hoursSecondaryLabel) hoursSecondaryLabel.textContent = restaurant.hours.secondaryLabel;

  const hoursWeekendEl = $('#info-hours-weekends');
  if (hoursWeekendEl) hoursWeekendEl.textContent = restaurant.hours.secondary;

  const mapFrame = $('#info-map-frame');
  if (mapFrame) {
    mapFrame.src = `https://www.google.com/maps?q=${encodeURIComponent(restaurant.address)}&output=embed`;
  }

  const igLink = $('#link-instagram');
  if (igLink) {
    igLink.href = restaurant.social.instagram;
    igLink.style.display = restaurant.social.instagram ? '' : 'none';
  }

  const fbLink = $('#link-facebook');
  if (fbLink) {
    fbLink.href = restaurant.social.facebook;
    fbLink.style.display = restaurant.social.facebook ? '' : 'none';
  }

  const justEatLink = $('#link-justeat');
  if (justEatLink) {
    justEatLink.href = restaurant.social.justeat;
    justEatLink.style.display = restaurant.social.justeat ? '' : 'none';
  }

  document.title = restaurant.name;
}

/* ── Navigation helpers ──────────────────────────────────── */
function setupNavHighlight() {
  const sections = $$('section[id], div[id]').filter((el) =>
    $$('.nav-link').some((nl) => nl.getAttribute('href') === `#${el.id}`)
  );

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        $$('.nav-link').forEach((link) => {
          link.classList.toggle(
            'active',
            link.getAttribute('href') === `#${entry.target.id}`
          );
        });
      });
    },
    { rootMargin: '-30% 0px -60% 0px' }
  );

  sections.forEach((s) => observer.observe(s));
}

function setupHamburger() {
  const btn = $('#hamburger');
  const nav = $('nav');
  if (!btn || !nav) return;

  btn.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    btn.setAttribute('aria-expanded', open);
  });

  // Close on nav link click
  $$('.nav-link', nav).forEach((link) => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');
    });
  });
}

function setupScrollTop() {
  const btn = $('#scroll-top');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 400);
  });

  btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

/* ── Search ──────────────────────────────────────────────── */
function setupSearch() {
  const input = $('#menu-search');
  const clearBtn = $('#menu-clear-search');
  if (!input) return;

  input.addEventListener('input', (e) => {
    searchQuery = e.target.value;
    filterAndRender();
  });

  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      searchQuery = '';
      input.value = '';
      filterAndRender();
      input.focus();
    });
  }
}

function setupServiceMode() {
  $$('.service-chip').forEach((button) => {
    button.addEventListener('click', () => {
      serviceMode = button.dataset.service;
      renderServiceMode();
    });
  });
}

/* ── Markdown parsers ────────────────────────────────────── */

/**
 * Parse data/restaurant.md.
 * Expects a YAML-style frontmatter block between the first pair of --- lines.
 * Each line inside the block is treated as  key: value.
 * Values may be optionally wrapped in single or double quotes.
 */
function parseRestaurantMd(text) {
  const match = text.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!match) throw new Error('restaurant.md: frontmatter block not found');

  const fm = {};
  match[1].split(/\r?\n/).forEach((line) => {
    const colonIdx = line.indexOf(':');
    if (colonIdx === -1) return;
    const key = line.slice(0, colonIdx).trim();
    const value = line.slice(colonIdx + 1).trim().replace(/^["']|["']$/g, '');
    fm[key] = value;
  });

  return {
    name:        fm.name        || '',
    tagline:     fm.tagline     || '',
    description: fm.description || '',
    address:     fm.address     || '',
    phone:       fm.phone       || '',
    email:       fm.email       || '',
    hours: {
      primaryLabel: fm.hours_primary_label || 'Atención',
      primary: fm.hours_primary || '',
      secondaryLabel: fm.hours_secondary_label || 'Cierre',
      secondary: fm.hours_secondary || '',
    },
    locationLabel: fm.location_label || '',
    footerSignature: fm.footer_signature || '',
    locale: fm.locale || 'es-AR',
    currency: fm.currency || 'ARS',
    priceDigits: Number(fm.price_digits || 0),
    social: {
      instagram: fm.instagram || '',
      facebook:  fm.facebook  || '',
      justeat:   fm.justeat   || '',
    },
  };
}

/**
 * Parse data/menu.md.
 *
 * Structure expected:
 *
 *   # Menú …                          (ignored H1)
 *
 *   ## category-id | 🍕 | Category Name
 *   > Category description
 *
 *   ### Item Name | tag1, tag2        (tags are optional)
 *   Item description text
 *   - priceKey: numericValue
 *
 *   # Promociones                     (second H1 separates promos)
 *
 *   ## Promo Title
 *   Promo description
 *   - price: numericValue
 *   - note: text
 */
function parseMenuMd(text) {
  // Strip HTML comments so the "how to update" block doesn't interfere
  const cleaned = text.replace(/<!--[\s\S]*?-->/g, '');

  // Split on the second H1 heading ("# Promociones")
  const promoSplit = cleaned.split(/\n# Promociones\b/);
  const menuSection   = promoSplit[0]  || '';
  const promosSection = promoSplit[1]  || '';

  /* ── helpers ── */
  function parsePrices(lines) {
    const prices = {};
    lines.forEach((line) => {
      const m = line.match(/^-\s+(\w+):\s*(.+)/);
      if (m) prices[m[1]] = Number(m[2]);
    });
    return prices;
  }

  function parseItems(sectionText) {
    // Split on lines that begin with ### (item headings)
    const blocks = sectionText.split(/\n(?=### )/);
    const items = [];
    for (const block of blocks) {
      const lines = block.split(/\r?\n/);
      const heading = lines[0];
      if (!heading.startsWith('### ')) continue;

      // ### Item Name | tag1, tag2  (tags optional)
      const parts = heading.slice(4).split('|').map((s) => s.trim());
      const itemName = parts[0];
      const tags = parts[1]
        ? parts[1].split(',').map((t) => t.trim()).filter(Boolean)
        : [];

      // First non-empty, non-list line after the heading is the description
      let description = '';
      const priceLines = [];
      for (let i = 1; i < lines.length; i++) {
        const l = lines[i].trim();
        if (!l) continue;
        if (l.startsWith('- ')) {
          priceLines.push(l);
        } else if (!description) {
          description = l;
        }
      }

      items.push({
        id:          itemName.toLowerCase().replace(/\s+/g, '-'),
        name:        itemName,
        description,
        prices:      parsePrices(priceLines),
        tags,
      });
    }
    return items;
  }

  /* ── parse categories ── */
  const categories = [];
  // Split on lines that begin with ## (category headings), skip the opening H1
  const catBlocks = menuSection.split(/\n(?=## )/);
  for (const block of catBlocks) {
    const lines = block.split(/\r?\n/);
    const heading = lines[0].trim();
    if (!heading.startsWith('## ')) continue;

    // ## id | icon | Category Name
    const parts = heading.slice(3).split('|').map((s) => s.trim());
    if (parts.length < 3) continue;
    const [id, icon, name] = parts;

    // Description comes from the first > blockquote line
    let description = '';
    for (const l of lines.slice(1)) {
      if (l.startsWith('> ')) { description = l.slice(2).trim(); break; }
    }

    const items = parseItems(block);
    categories.push({ id, icon, name, description, items });
  }

  /* ── parse promos ── */
  const promos = [];
  const promoBlocks = promosSection.split(/\n(?=## )/);
  for (const block of promoBlocks) {
    const lines = block.split(/\r?\n/);
    const heading = lines[0].trim();
    if (!heading.startsWith('## ')) continue;

    const title = heading.slice(3).trim();
    let description = '';
    let price = 0;
    let note = '';

    for (let i = 1; i < lines.length; i++) {
      const l = lines[i].trim();
      if (!l) continue;
      if (l.startsWith('- ')) {
        const m = l.match(/^-\s+(\w+):\s*(.+)/);
        if (m) {
          if (m[1] === 'price') price = Number(m[2]);
          else if (m[1] === 'note') note = m[2].trim();
        }
      } else if (!description) {
        description = l;
      }
    }

    promos.push({
      id: title.toLowerCase().replace(/\s+/g, '-'),
      title,
      description,
      price,
      note,
    });
  }

  return { categories, promos };
}

/* ── Data loading ────────────────────────────────────────── */
async function loadData() {
  const [restaurantRes, menuRes] = await Promise.all([
    fetch('./data/restaurant.md'),
    fetch('./data/menu.md'),
  ]);
  if (!restaurantRes.ok) throw new Error(`restaurant.md HTTP ${restaurantRes.status}`);
  if (!menuRes.ok)       throw new Error(`menu.md HTTP ${menuRes.status}`);

  const [restaurantText, menuText] = await Promise.all([
    restaurantRes.text(),
    menuRes.text(),
  ]);

  const restaurant = parseRestaurantMd(restaurantText);
  const { categories, promos } = parseMenuMd(menuText);
  return { restaurant, categories, promos };
}

/* ── Init ────────────────────────────────────────────────── */
async function init() {
  try {
    menuData = await loadData();

    activeCategory = 'all';

    renderRestaurantInfo(menuData.restaurant);
    renderPromos(menuData.promos);
    renderTabs(menuData.categories);
    renderCategories(menuData.categories);
    setupSearch();
    setupServiceMode();
    setupNavHighlight();
    setupHamburger();
    setupScrollTop();
    renderServiceMode();
  } catch (err) {
    console.error('Error loading menu data:', err);
    const errDiv = $('#loading-error');
    if (errDiv) errDiv.style.display = 'flex';
  } finally {
    const overlay = $('#loading-overlay');
    if (overlay) {
      setTimeout(() => overlay.classList.add('hidden'), 200);
    }
  }
}

document.addEventListener('DOMContentLoaded', init);
