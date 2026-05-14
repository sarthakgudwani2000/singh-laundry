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
function publicAsset(pathFromPublicDir) {
  const rel = pathFromPublicDir.replace(/^\//, "");
  const base = import.meta.env.BASE_URL;
  if (base && base !== "/" && base !== "./") {
    return `${base}${rel}`;
  }
  const prefix = pathnamePrefixBeforeAssetsChunk();
  if (prefix) return `${prefix}/${rel}`;
  return `${base}${rel}`;
}

const V = publicAsset("images/site/bergen-delivery-van.png");
const W = publicAsset("images/site/wash-fold-staff.png");
const L = publicAsset("images/site/laundromat-dryers.png");
const B = publicAsset("images/site/laundry-operation-bags.png");

export const IMAGES = {
  clientBergenVan: V,
  clientWashFold: W,
  clientLaundromat: L,
  clientBags: B,

  homePromoVan: V,
  homeCardLaundromat: L,
  homeCardRenovated: W,
  homeCardWashFold: W,
  homeBergenAside: W,
  homeNewBridgeAside: L,

  bergenPromoVan: V,
  bergenPickupAside: W,
  bergenParallax: B,

  servicesPickup: V,
  servicesWashFold: W,
  servicesSelfServe: L,
  servicesCommercial: B,

  newBridgeCarousel1: L,
  newBridgeCarousel2: W,
  newBridgeCarousel3: V,
  newBridgeWashFoldLeft: W,
  newBridgeWashFoldRight: L,

  aboutBanner: L,
  contactSideA: V,
  contactSideB: L,
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
