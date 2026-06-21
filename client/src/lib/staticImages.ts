const LOGO_KEY = "Logocostumbres(Opcion1)_31a77d93.png";

const IMAGE_LABELS: Record<string, string> = {
  "Logocostumbres(Opcion1)_31a77d93.png": "Costumbres Argentinas",
  "Bolasdemasalistasparafermentar_edf1d274.png": "Bolas de masa fermentando",
  "Prepizzapreparada_688f196a.png": "Prepizza preparada",
  "Bollospizza_e288ce0f.png": "Bollos de pizza",
  "Empanadaslistasparahornear_98f58e08.png": "Empanadas listas para hornear",
  "Motocicletasderepartoenlacalle_a664c26a.png": "Motocicletas de reparto",
  "Pizzashorneándoseenhornoindustrial_b40deb89.png": "Pizzas horneándose",
  "Celebracióndecostumbresargentinas_e18fbbce.png": "Celebración en Costumbres Argentinas",
  "Amasadoenmezcladoraindustrial_be3d940b.png": "Amasado en mezcladora industrial",
  "PizzeríaCostumbresArgentinasencalleempedrada_e68b4278.png": "Pizzería Costumbres Argentinas",
  "Tríosdebandejasconmasadescansando_d489212e.png": "Bandejas con masa descansando",
};

function toDataUri(svg: string) {
  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

function buildLogoSvg() {
  return `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 240" role="img" aria-label="Costumbres Argentinas">
      <rect width="640" height="240" fill="transparent" />
      <g fill="#111827">
        <circle cx="100" cy="120" r="54" fill="none" stroke="#111827" stroke-width="10" />
        <path d="M76 98c18-20 50-23 72 0" fill="none" stroke="#111827" stroke-width="10" stroke-linecap="round" />
        <path d="M74 138c16 18 52 18 72 0" fill="none" stroke="#111827" stroke-width="10" stroke-linecap="round" />
        <circle cx="88" cy="118" r="6" />
        <circle cx="112" cy="118" r="6" />
        <circle cx="128" cy="144" r="6" />
      </g>
      <text x="176" y="102" fill="#111827" font-family="Arial, Helvetica, sans-serif" font-size="28" font-weight="700" letter-spacing="4">PIZZERÍA</text>
      <text x="176" y="148" fill="#111827" font-family="Georgia, 'Times New Roman', serif" font-size="44" font-weight="700">Costumbres Argentinas</text>
      <text x="176" y="184" fill="#374151" font-family="Arial, Helvetica, sans-serif" font-size="20">Sabés lo que comés</text>
    </svg>
  `.trim();
}

function buildPhotoSvg(label: string) {
  return `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 900" role="img" aria-label="${label}">
      <defs>
        <linearGradient id="bg" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stop-color="#1B3A6B" />
          <stop offset="55%" stop-color="#355C7D" />
          <stop offset="100%" stop-color="#E63946" />
        </linearGradient>
      </defs>
      <rect width="1200" height="900" fill="url(#bg)" />
      <circle cx="960" cy="180" r="120" fill="rgba(255,255,255,0.12)" />
      <circle cx="170" cy="720" r="180" fill="rgba(255,248,240,0.14)" />
      <path d="M210 610c70-160 200-270 390-270s320 110 390 270" fill="none" stroke="rgba(255,255,255,0.3)" stroke-width="36" stroke-linecap="round" />
      <text x="600" y="370" text-anchor="middle" fill="#FFF8F0" font-family="Arial, Helvetica, sans-serif" font-size="48" font-weight="700" letter-spacing="8">COSTUMBRES ARGENTINAS</text>
      <text x="600" y="470" text-anchor="middle" fill="#FFFFFF" font-family="Georgia, 'Times New Roman', serif" font-size="74" font-weight="700">${label}</text>
      <text x="600" y="548" text-anchor="middle" fill="#FFF8F0" font-family="Arial, Helvetica, sans-serif" font-size="28">Imagen estática lista para exportar como sitio web sin servidor</text>
    </svg>
  `.trim();
}

export function getStaticImageSrc(key: string) {
  const label = IMAGE_LABELS[key] ?? key;
  const svg = key === LOGO_KEY ? buildLogoSvg() : buildPhotoSvg(label);
  return toDataUri(svg);
}

export const STATIC_IMAGE_SRC = {
  logo: getStaticImageSrc(LOGO_KEY),
  doughBalls: getStaticImageSrc("Bolasdemasalistasparafermentar_edf1d274.png"),
  prepizza: getStaticImageSrc("Prepizzapreparada_688f196a.png"),
  doughBuns: getStaticImageSrc("Bollospizza_e288ce0f.png"),
  empanadas: getStaticImageSrc("Empanadaslistasparahornear_98f58e08.png"),
  delivery: getStaticImageSrc("Motocicletasderepartoenlacalle_a664c26a.png"),
  ovenPizzas: getStaticImageSrc("Pizzashorneándoseenhornoindustrial_b40deb89.png"),
  celebration: getStaticImageSrc("Celebracióndecostumbresargentinas_e18fbbce.png"),
  kneading: getStaticImageSrc("Amasadoenmezcladoraindustrial_be3d940b.png"),
  storefront: getStaticImageSrc("PizzeríaCostumbresArgentinasencalleempedrada_e68b4278.png"),
  restingTrays: getStaticImageSrc("Tríosdebandejasconmasadescansando_d489212e.png"),
} as const;
