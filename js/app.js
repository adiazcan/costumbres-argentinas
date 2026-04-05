/**
 * Pizzería Costumbres Argentinas – Main Application Script
 *
 * Menu data is loaded from data/menu.json.
 * To update the menu, edit data/menu.json only – no code changes needed.
 */

'use strict';

/* ── State ───────────────────────────────────────────────── */
let menuData = null;
let activeCategory = null;
let searchQuery = '';

/* ── DOM helpers ─────────────────────────────────────────── */
const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

/* ── Formatters ──────────────────────────────────────────── */
function formatPrice(amount) {
  return new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    maximumFractionDigits: 0,
  }).format(amount);
}

/* ── Menu rendering ──────────────────────────────────────── */
function renderTabs(categories) {
  const container = $('#category-tabs');
  if (!container) return;

  container.innerHTML = `
    <button class="tab-btn active" data-cat="all">
      🍽️ Todo
    </button>
    ${categories
      .map(
        (cat) => `
      <button class="tab-btn" data-cat="${cat.id}">
        ${cat.icon} ${cat.name}
      </button>
    `
      )
      .join('')}
  `;

  container.addEventListener('click', (e) => {
    const btn = e.target.closest('.tab-btn');
    if (!btn) return;
    $$('.tab-btn', container).forEach((b) => b.classList.remove('active'));
    btn.classList.add('active');
    activeCategory = btn.dataset.cat;
    filterAndRender();
  });
}

function buildPriceHTML(prices) {
  const labelMap = {
    individual: 'Individual',
    media: 'Media',
    entera: 'Entera',
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

function buildTagsHTML(tags) {
  return tags
    .map((t) => {
      const cls = `tag-${t.replace(/\s+/g, '-')}`;
      return `<span class="tag ${cls}">${t}</span>`;
    })
    .join('');
}

function renderMenuCard(item) {
  return `
    <article class="menu-card" data-name="${item.name.toLowerCase()}" data-desc="${item.description.toLowerCase()}">
      <div class="menu-card-top">
        <h4 class="menu-card-name">${item.name}</h4>
        <div class="menu-card-tags">${buildTagsHTML(item.tags)}</div>
      </div>
      <p class="menu-card-desc">${item.description}</p>
      <div class="menu-card-prices">${buildPriceHTML(item.prices)}</div>
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
        ${cat.items.map(renderMenuCard).join('')}
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
  const q = searchQuery.trim().toLowerCase();
  let anyVisible = false;

  sections.forEach((sec) => {
    const catId = sec.id.replace('cat-', '');
    const catMatch = activeCategory === 'all' || activeCategory === catId;

    if (!catMatch) {
      sec.classList.remove('active');
      return;
    }

    if (!q) {
      // Show all cards in this section
      $$('.menu-card', sec).forEach((c) => (c.style.display = ''));
      sec.classList.add('active');
      anyVisible = true;
      return;
    }

    // Filter cards by search query
    const cards = $$('.menu-card', sec);
    let sectionHasVisible = false;
    cards.forEach((card) => {
      const matchName = card.dataset.name.includes(q);
      const matchDesc = card.dataset.desc.includes(q);
      const visible = matchName || matchDesc;
      card.style.display = visible ? '' : 'none';
      if (visible) sectionHasVisible = true;
    });

    if (sectionHasVisible) {
      sec.classList.add('active');
      anyVisible = true;
    } else {
      sec.classList.remove('active');
    }
  });

  if (noResults) {
    noResults.style.display = anyVisible ? 'none' : 'block';
  }
}

/* ── Promotions rendering ────────────────────────────────── */
function renderPromos(promos) {
  const container = $('#promos-grid');
  if (!container || !promos || promos.length === 0) return;

  const icons = ['🍕', '🥂', '🥟', '🍺', '🌟'];
  container.innerHTML = promos
    .map(
      (promo, i) => `
    <div class="promo-card">
      <div class="promo-icon">${icons[i % icons.length]}</div>
      <h3>${promo.title}</h3>
      <p>${promo.description}</p>
      <span class="promo-note">${promo.note}</span>
      <div class="promo-price">${formatPrice(promo.price)} <small>por combo</small></div>
    </div>
  `
    )
    .join('');
}

/* ── Restaurant info rendering ───────────────────────────── */
function renderRestaurantInfo(restaurant) {
  // Populate tagline in hero
  const taglineEl = $('#hero-tagline');
  if (taglineEl) taglineEl.textContent = restaurant.tagline;

  const descEl = $('#hero-desc');
  if (descEl) descEl.textContent = restaurant.description;

  // Address & contact info cards
  const addressEl = $('#info-address');
  if (addressEl) addressEl.textContent = restaurant.address;

  const addressMapEl = $('#info-address-map');
  if (addressMapEl) addressMapEl.textContent = restaurant.address;

  // Update Google Maps link with actual address
  const mapsLink = $('#map-section a[href*="google"]');
  if (mapsLink) {
    mapsLink.href = `https://www.google.com/maps/search/${encodeURIComponent(restaurant.address)}`;
  }

  const phoneEl = $('#info-phone');
  if (phoneEl) {
    phoneEl.textContent = restaurant.phone;
    phoneEl.href = `tel:${restaurant.phone.replace(/\s/g, '')}`;
  }

  const emailEl = $('#info-email');
  if (emailEl) {
    emailEl.textContent = restaurant.email;
    emailEl.href = `mailto:${restaurant.email}`;
  }

  // Footer contact links
  const footerPhone = $('#footer-phone');
  if (footerPhone) {
    footerPhone.textContent = restaurant.phone;
    footerPhone.href = `tel:${restaurant.phone.replace(/\s/g, '')}`;
  }

  const footerEmail = $('#footer-email');
  if (footerEmail) {
    footerEmail.textContent = restaurant.email;
    footerEmail.href = `mailto:${restaurant.email}`;
  }

  const hoursWeekEl = $('#info-hours-weekdays');
  if (hoursWeekEl) hoursWeekEl.textContent = restaurant.hours.weekdays;

  const hoursWeekendEl = $('#info-hours-weekends');
  if (hoursWeekendEl) hoursWeekendEl.textContent = restaurant.hours.weekends;

  // WhatsApp button
  $$('.whatsapp-link').forEach((el) => {
    el.href = `https://wa.me/${restaurant.whatsapp}?text=Hola!%20Quiero%20hacer%20un%20pedido%20😊`;
  });

  // Social links
  const igLink = $('#link-instagram');
  if (igLink) igLink.href = restaurant.social.instagram;

  const fbLink = $('#link-facebook');
  if (fbLink) fbLink.href = restaurant.social.facebook;
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
    link.addEventListener('click', () => nav.classList.remove('open'));
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
  if (!input) return;

  input.addEventListener('input', (e) => {
    searchQuery = e.target.value;
    filterAndRender();
  });
}

/* ── Data loading ────────────────────────────────────────── */
async function loadMenuData() {
  const res = await fetch('./data/menu.json');
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

/* ── Init ────────────────────────────────────────────────── */
async function init() {
  try {
    menuData = await loadMenuData();

    activeCategory = 'all';

    renderRestaurantInfo(menuData.restaurant);
    renderPromos(menuData.promos);
    renderTabs(menuData.categories);
    renderCategories(menuData.categories);
    setupSearch();
    setupNavHighlight();
    setupHamburger();
    setupScrollTop();
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
