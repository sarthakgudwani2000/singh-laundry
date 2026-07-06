import { pathnamePrefixBeforeAssetsChunk } from "@/lib/utils";

/** Top promo strip (legacy template wording; price matches PRICING). */
export const ANNOUNCEMENT_BAR =
  "Did you know there is NO CHARGE for our Pickup & Delivery Service? That's Right! It's only $2.15 per pound.";

/** Parent brand + operating brands (add new stores to STORES later). */
export const BRAND = {
  parent: "Singh Laundry",
  pickup: "Bergen Laundry Service",
  store: "New Bridge Laundromat",
  phoneBergen: "973-626-3896",
  phoneStore: "201-482-6615",
  email: "support@singhlaundry.com",
};

/** TryCents online ordering — all “Schedule pickup” CTAs and `/schedule-pickup` redirect here. */
export const SCHEDULE_ORDER_URL =
  "https://app.trycents.com/new-order/YWF4/home";

/** External site URLs for each brand's standalone website. */
export const BERGEN_SITE_URL = "https://bergenlaundryservice.com/";
export const NEW_BRIDGE_SITE_URL = "https://newbridgelaundromat.com/";

/** This site's own canonical domain — used to build canonical/OG URLs per route. */
export const SITE_URL = "https://singhlaundry.com/";

/** Pricing & policy lines (aligned with client template / singhlaundry concept). */
export const PRICING = {
  bergenWashFoldLb: "$2.15",
  minOrderLbs: 15,
  ccFeeNote: "4% credit card processing fee per order",
  pickupDeliveryFree: "No charge for pickup & delivery",
  newBridgeWashFoldLb: "$1.49",
  nextDayNote: "Next-day returns Mon–Fri on most orders",
  /** Legacy template: $10 off first order with FIRST10 (also referenced on-site). */
  firstOrderAmount: "$10.00",
  firstOrderCode: "FIRST10",
  firstOrderHeadline: "$10.00 Off Your 1st Order!!!",
  firstOrderSubhead: "Schedule Your Pickup Today…",
};

export const LOCATIONS = {
  newBridge: {
    name: "New Bridge Laundromat",
    line1: "97 New Bridge Rd",
    city: "Bergenfield",
    state: "NJ",
    zip: "07621",
    get full() {
      return `${this.line1}, ${this.city}, ${this.state} ${this.zip}`;
    },
  },
};

export const MAPS_LINK_NEW_BRIDGE = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  `${LOCATIONS.newBridge.line1}, ${LOCATIONS.newBridge.city} ${LOCATIONS.newBridge.state} ${LOCATIONS.newBridge.zip}`,
)}`;

export const HOURS = {
  newBridgeWeekday: "Mon-Fri: 7am-10pm",
  newBridgeWeekend: "Sat + Sun: 6am-10pm",
  lastWash: "Last Wash: 8:30pm",
};

/** Expandable list for future locations. */
export const STORES = [
  {
    id: "new-bridge",
    slug: "/new-bridge-laundromat",
    name: "New Bridge Laundromat",
    subtitle: "Pickup & fold hub · self-serve laundromat",
    address: LOCATIONS.newBridge.full,
  },
];

export const SOCIAL = {
  bergen: {
    label: "Bergen Laundry Service",
    facebook: "https://www.facebook.com/newbridgelaundromat",
    instagram: "https://www.instagram.com/bergenlaundry",
    yelp: "https://www.yelp.com/biz/bergen-laundry-service-bergenfield-2",
    google:
      "https://www.google.com/maps/search/?api=1&query=Bergen+Laundry+Service+Bergenfield+NJ",
  },
  newBridge: {
    label: "New Bridge Laundromat",
    facebook: "https://www.facebook.com/newbridgelaundromat/",
    instagram:
      "https://www.instagram.com/explore/locations/32887075/new-bridge-laundromat/",
    yelp: "https://www.yelp.com/biz/new-bridge-laundromat-bergenfield-2",
    google:
      "https://www.google.com/maps/search/?api=1&query=New+Bridge+Laundromat+Bergenfield+NJ",
  },
};

/**
 * Site imagery — files must live under `public/images/site/` before `npm run build`
 * (Vite copies `public/` into `dist/`). Uses `import.meta.env.BASE_URL` when set (e.g. `VITE_BASE`);
 * with the default `./` base, paths are also corrected from the bundle URL so `/new` (no trailing slash) still loads `/new/images/...`.
 */
function encodeSiteFileName(file) {
  return file.replace(/&/g, "%26").replace(/#/g, "%23").replace(/ /g, "%20");
}

function publicAsset(pathFromPublicDir) {
  const rel = pathFromPublicDir.replace(/^\//, "");
  const base = import.meta.env.BASE_URL;
  if (base && base !== "/" && base !== "./") {
    const normalized = base.endsWith("/") ? base : `${base}/`;
    return `${normalized}${rel}`;
  }
  const prefix = pathnamePrefixBeforeAssetsChunk();
  if (prefix) return `${prefix}/${rel}`;
  return `/${rel}`;
}

const img = (file) => publicAsset(`images/site/${encodeSiteFileName(file)}`);

const homePagePromo = img("Home Page.png");
const homeSlide1 = img("Home (Slideshow 1).png");
const homeSlide2 = img("Home (Slideshow 2).png");
const homeSlide3 = img("Home (Slideshow 3).png");
const washFoldHome = img("wash-dry-fold-home-page.jpg");
const renovatedHome = img("Fully Renovated  November 2025 (Home Page).jpg");
const newBridgeHome = img("New Bridge Laundromat (Home Page).jpg");
const pickupServices = img("pickup-delivery-service-services-page.png");
const washFoldServices1 = img("wash-dry-fold-service-1-services-page.png");
const washFoldServices2 = img("wash-dry-fold-service-2-services-page.png");
const logoSingh = img("sl-shirt-logo-1aa-w314-o.png");
const logoBergen = img("Bergen-Laundry-Logo.png");
const logoBergenBlue = img("Bergen-Laundry-Logo (Blue logo).png");
const logoNewBridge = img("New Bridge Laundromat logo.png");
const newBridgePhoto1 = img("New Bridge Laundromat (Slideshow 1).jpg");
const newBridgePhoto2 = img("New Bridge Laundromat (Slideshow 2).jpg");
const newBridgePhoto3 = img("New Bridge Laundromat (Slideshow 3).jpg");
const newBridgePhoto4 = img("New Bridge Laundromat (Slideshow 4).jpg");
const newBridgePhoto5 = img("New Bridge Laundromat (Slideshow 5).jpg");
const aboutPhoto = img("home-page-image-1c-w1685-o.jpg");
const commercialDryers = img("laundromat-dryers.png");
const operationBags = img("laundry-operation-bags.png");
const washFoldStaff = img("wash-fold-staff.png");
const contactSlideNew = img("ContactUs-Page-slide.jpg");
const bergenVanWrapSlide1 = img("BergenLaundryService-Page-slide-1.jpg");
const bergenVanWrapSlide2 = img("BergenLaundryService-Page-slide-2.jpg");

export const IMAGES = {
  clientBergenVan: homePagePromo,
  clientWashFold: washFoldHome,
  clientLaundromat: newBridgeHome,
  clientBags: operationBags,

  logoSingh,
  logoBergen,
  logoBergenBlue,
  logoNewBridge,

  homePromoVan: homePagePromo,
  homeSlide1,
  homeSlide2,
  homeSlide3,
  homeCardLaundromat: newBridgeHome,
  homeCardRenovated: renovatedHome,
  homeCardWashFold: washFoldHome,
  homeBergenAside: washFoldStaff,
  homeNewBridgeAside: newBridgeHome,

  bergenPromoVan: homePagePromo,
  bergenPickupAside: washFoldStaff,
  bergenParallax: operationBags,
  bergenVanWrapSlide1,
  bergenVanWrapSlide2,

  servicesPickup: pickupServices,
  servicesWashFold: washFoldServices1,
  servicesSelfServe: washFoldServices2,
  servicesCommercial: commercialDryers,

  newBridgeCarousel1: newBridgePhoto1,
  newBridgeCarousel2: newBridgePhoto2,
  newBridgeCarousel3: newBridgePhoto3,
  newBridgeCarousel4: newBridgePhoto4,
  newBridgeCarousel5: newBridgePhoto5,
  newBridgeWashFoldLeft: washFoldHome,
  newBridgeWashFoldRight: img("New Bridge Laundromat4.jpg"),

  aboutBanner: aboutPhoto,
  contactSideA: homePagePromo,
  contactSideB: newBridgeHome,
  contactSlideNew,
};

export const PICKUP_WINDOWS = [
  "8:00 AM – 10:00 AM",
  "10:00 AM – 12:00 PM",
  "12:00 PM – 2:00 PM",
  "2:00 PM – 4:00 PM",
  "4:00 PM – 6:00 PM",
  "6:00 PM – 8:00 PM",
];

export const SERVICE_TYPES = [
  { value: "wash_fold", label: "Wash & Fold" },
  { value: "dry_clean", label: "Dry Cleaning" },
  { value: "mixed", label: "Mixed (Wash + Dry Clean)" },
  { value: "commercial", label: "Commercial" },
];

/** Special-care categories (Bergen pickup) — shown in-page and in the Special Items dialog. */
export const SPECIAL_ITEMS_LIST = [
  "Comforters & duvets",
  "Wedding & formal wear",
  "Leather & suede (partner vendor)",
  "Rugs up to 6×9",
  "Drapery",
  "Uniforms & aprons",
];

/**
 * App Store / Google Play URLs from the client’s email signature.
 * Paste full URLs when available; until then the Bergen page shows phone / search fallback.
 */
export const APP_LINKS = {
  ios: "",
  android: "",
};

/** SEO: zips + towns served (pickup & delivery). */
export const SERVICE_ZIPS = [
  { zip: "07621", town: "Bergenfield" },
  { zip: "07620", town: "Alpine" },
  { zip: "07624", town: "Closter" },
  { zip: "07626", town: "Cresskill" },
  { zip: "07627", town: "Demarest" },
  { zip: "07640", town: "Harrington Park" },
  { zip: "07642", town: "Haworth" },
  { zip: "07644", town: "Little Ferry" },
  { zip: "07645", town: "Montvale" },
  { zip: "07646", town: "New Milford" },
  { zip: "07649", town: "Northvale" },
  { zip: "07666", town: "Teaneck" },
  { zip: "07670", town: "Tenafly" },
];

/** JSON-LD: Singh Laundry is the corporate parent — no storefront/GBP of its own. */
export const ORG_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: BRAND.parent,
  url: SITE_URL,
  logo: new URL(IMAGES.logoSingh, SITE_URL).href,
  description:
    "Singh Laundry is the Bergenfield, NJ parent company behind Bergen Laundry Service and New Bridge Laundromat.",
  brand: [{ "@type": "Brand", name: BRAND.pickup }, { "@type": "Brand", name: BRAND.store }],
};
