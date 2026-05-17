/**
 * Narrative + list copy aligned with the legacy Singh Laundry site template
 * (screenshots), merged with live values from `brand.js` at render time.
 */

const ABOUT_RAW = [
  "{{parent}} is a family-owned business proudly serving Bergen, Passaic, and parts of Morris & Essex Counties. We’ve built trust with thousands of neighbors who rely on us for dependable laundry care.",
  "We were motivated by a simple idea: laundry shouldn’t feel neglected. Our flagship location is {{store}} in Bergenfield, NJ — where pickup orders are processed. After a full renovation with high-efficiency machines, we’re set up to move orders quickly without sacrificing quality.",
  "Whether you need pickup & delivery, self-serve machines, or drop-off wash & fold, we invite you to stop by, call, or schedule online. We’re here to make laundry day easier.",
];

export function getAboutParagraphs(brand) {
  return ABOUT_RAW.map((p) =>
    p.replace(/\{\{parent\}\}/g, brand.parent).replace(/\{\{store\}\}/g, brand.store),
  );
}

/** Classic “Areas We Service” lines (ZIP + towns) from the legacy template. */
export const SERVICE_AREA_LINES = [
  "07506 Fair Lawn, Hawthorne, Paterson",
  "07507 Fair Lawn, Hawthorne, North Haledon, Paterson",
  "07508 Paterson, Totowa, Wayne",
  "07601 Hackensack, Lodi",
  "07602 Hackensack",
  "07603 Hackensack, Bogota, Teaneck",
  "07605 Englewood, Fort Lee, Leonia, Palisades Park",
  "07607 Elmwood Park, Fair Lawn, Garfield, Hackensack, Lodi",
  "07620 Alpine, Closter, Cresskill, Demarest, Harrington Park, Haworth",
  "07621 Bergenfield, Cresskill, Dumont, Englewood, Haworth, Tenafly",
  "07622 Bergenfield",
  "07624 Closter, Demarest, Dumont, Harrington Park, Haworth",
  "07626 Alpine, Closter, Cresskill, Demarest, Haworth",
  "07627 Closter, Cresskill, Demarest, Dumont, Harrington Park, Haworth",
  "07628 Cresskill, Demarest, Dumont, Emerson, Harrington Park, Haworth",
  "07630 Demarest, Emerson, Haworth, Tenafly",
  "07631 Englewood, Englewood Cliffs, Fort Lee, Leonia",
  "07632 Englewood, Englewood Cliffs, Fort Lee, Leonia",
  "07633 Englewood, Teaneck, Tenafly",
  "07640 Harrington Park, Northvale, Norwood, Old Tappan",
  "07641 Haworth, Dumont, Emerson, Hillsdale, Montvale, River Vale, Westwood, Woodcliff Lake",
  "07642 Hillsdale, Montvale, River Vale, Woodcliff Lake",
  "07643 Little Ferry, Moonachie, Ridgefield, South Hackensack, Teterboro",
  "07644 Lodi, Maywood, Rochelle Park, Saddle Brook",
  "07645 Montvale, Park Ridge, Woodcliff Lake",
  "07646 New Milford, Oradell, River Edge",
  "07647 Norwood, Northvale, Old Tappan, Rockleigh",
  "07648 Norwood, Northvale, Old Tappan",
  "07649 Northvale, Norwood, Old Tappan, Rockleigh",
  "07652 Paramus, Ridgewood, Ho-Ho-Kus, Saddle River, Waldwick",
  "07656 Park Ridge, River Vale, Woodcliff Lake",
  "07657 Ridgewood, Glen Rock, Ho-Ho-Kus, Midland Park, Wyckoff",
  "07661 River Edge, Oradell, New Milford, River Vale",
  "07662 Rochelle Park, Saddle Brook, Wallington",
  "07663 Saddle Brook, Elmwood Park, Garfield",
  "07666 Teaneck, Bogota, Hackensack, Leonia, Ridgefield Park",
  "07670 Tenafly, Alpine, Cresskill, Demarest, Englewood Cliffs",
  "07675 Westwood, Emerson, Hillsdale, Old Tappan, Oradell, River Vale, Woodcliff Lake",
  "07676 Township of Washington, Westwood, Woodcliff Lake",
];

/** Services page — section bodies from the legacy template. */
export const SERVICES_TEMPLATE = {
  selfServe: {
    title: "In-Store Services @ New Bridge Laundromat in Bergenfield, NJ",
    body: "Enjoy a top-rated self-service laundry experience in Bergen County. Our {{store}} location offers FREE Wi‑Fi, comfortable seating, TVs, folding stations, and vending machines — everything you need while your loads run.",
  },
  pickup: {
    title: "Pickup & Delivery Service",
    intro: "Let {{pickup}} handle the heavy lifting. Schedule a pickup and we’ll return your laundry fresh, folded, and ready to put away the next day.",
    benefits: [
      {
        title: "Unmatched Convenience",
        text: "Schedule a pickup and we’ll handle the rest — pickup and delivery with no mileage charge for our service area.",
      },
      {
        title: "Exceptional Quality",
        text: "We treat your laundry with care, using professional wash processes and clear communication if anything needs special handling.",
      },
      {
        title: "Friendly Service",
        text: "Our team is dedicated to a seamless experience — from route texts to predictable pickup windows.",
      },
    ],
  },
  washFold: {
    title: "Wash, Dry & Fold Service",
    intro: "Think of it as a mini spa vacation for your laundry. Drop off at {{store}} and we’ll wash, dry, and fold with the same attention we give pickup orders.",
    benefits: [
      {
        title: "Time Saver",
        text: "Reclaim your weekends — we sort, wash, dry, and fold so you don’t have to.",
      },
      {
        title: "Professional Clean",
        text: "High-quality detergents and techniques to get clothes their cleanest.",
      },
      {
        title: "Stress-Free",
        text: "Say goodbye to sorting, washing, and folding — we handle the dirty work.",
      },
    ],
  },
  commercial: {
    title: "Commercial Laundry Service",
    body: "We’re a trusted partner for businesses across Bergen, Passaic, Morris, and Essex Counties. From salons and restaurants to rentals and offices, we tailor pickup schedules and pricing for linens, towels, uniforms, and more.",
  },
};

export function fillServicesTemplate(store, pickup) {
  const rep = (s) => s.replace(/\{\{store\}\}/gi, store).replace(/\{\{pickup\}\}/gi, pickup);
  return {
    selfServe: {
      title: SERVICES_TEMPLATE.selfServe.title,
      body: rep(SERVICES_TEMPLATE.selfServe.body),
    },
    pickup: {
      title: SERVICES_TEMPLATE.pickup.title,
      intro: rep(SERVICES_TEMPLATE.pickup.intro),
      benefits: SERVICES_TEMPLATE.pickup.benefits.map((b) => ({
        title: b.title,
        text: rep(b.text),
      })),
    },
    washFold: {
      title: SERVICES_TEMPLATE.washFold.title,
      intro: rep(SERVICES_TEMPLATE.washFold.intro),
      benefits: SERVICES_TEMPLATE.washFold.benefits.map((b) => ({
        title: b.title,
        text: rep(b.text),
      })),
    },
    commercial: {
      title: SERVICES_TEMPLATE.commercial.title,
      body: rep(SERVICES_TEMPLATE.commercial.body),
    },
  };
}

/** New Bridge “First-Class Amenities” cards from the legacy template. */
export const NEW_BRIDGE_AMENITIES = [
  {
    title: "Free Wi‑Fi",
    body: "Stay connected while you wait — catch up on work or browse the web with complimentary Wi‑Fi.",
  },
  {
    title: "Ample Seating & Waiting Areas",
    body: "Relax in comfortable seating while your laundry runs — our space is designed to feel welcoming.",
  },
  {
    title: "Entertainment Options",
    body: "Enjoy flat-screen TVs and a comfortable atmosphere while you wait.",
  },
  {
    title: "Spacious Folding Stations",
    body: "Large, clean folding areas so you can finish on-site without juggling baskets in the aisle.",
  },
  {
    title: "Vending Machines",
    body: "Snacks, drinks, and laundry essentials — stocked for quick grab-and-go convenience.",
  },
  {
    title: "Secure Premises",
    body: "Well-lit, monitored premises so you can do laundry with peace of mind.",
  },
];
