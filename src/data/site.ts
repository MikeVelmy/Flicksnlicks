import type { Branch, FaqItem, Hours, OrderStep, Testimonial } from "@/types";

export const siteInfo = {
  name: "Flicks & Licks",
  shortName: "F&L",
  tagline: "The Suya Boss",
  location: "Haatso Atomic, near Centrepoint Mall",
  city: "Accra, Ghana",
  phonePrimary: "0302 208 054",
  phoneSecondary: "0242 438 720",
  whatsappNumber: "233242438720",
  instagram: "https://instagram.com/flicks_n_licks",
  tiktok: "https://tiktok.com/@flicks_n_licks",
  facebook: "https://facebook.com/flicks_n_licks",
  twitter: "https://twitter.com/flicks_n_licks",
  handle: "@flicks_n_licks",
};

export const hours: Hours[] = [
  { days: "Monday – Thursday", time: "11:00 AM – 11:00 PM" },
  { days: "Friday – Saturday", time: "11:00 AM – 1:00 AM" },
  { days: "Sunday", time: "1:00 PM – 11:00 PM" },
];

export const branches: Branch[] = [
  {
    name: "Haatso Atomic",
    address: `${siteInfo.location}, ${siteInfo.city}`,
    mapsUrl: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
      "Flicks & Licks, Haatso Atomic, near Centrepoint Mall, Accra, Ghana"
    )}`,
    isFlagship: true,
  },
  {
    name: "Mile 7 T-Junction",
    address: "Nii Okaiman West Main Rd, T-Junction, Accra, Ghana",
    mapsUrl: "http://bit.ly/3GCmFkm",
  },
  {
    name: "Kingsby Achimota",
    address: "Justice A. Brobbey Ave, Achimota, Accra, Ghana",
    mapsUrl: "https://bit.ly/3IFchc3",
  },
  {
    name: "East Legon",
    address: "Lagos Ave, East Legon, Accra, Ghana",
    mapsUrl: "http://bit.ly/3GKq8gC",
  },
  {
    name: "Dansoman",
    address: "Dansoman Roundabout, Accra, Ghana",
    mapsUrl: "http://bit.ly/3GKq8gC",
  },
];

export const orderSteps: OrderStep[] = [
  {
    title: "Browse the menu",
    description: "Scroll the suya, sides, wraps and combos and pick your cravings.",
  },
  {
    title: "Head to the counter",
    description: "Walk in to your nearest Flicks & Licks branch and place your order.",
  },
  {
    title: "Pay cash on pickup",
    description: "Cash only, no card, no fuss. Pay when your order's ready.",
  },
  {
    title: "Dig in",
    description: "Grab your plate hot off the grill and enjoy every bite.",
  },
];

export const testimonials: Testimonial[] = [
  {
    name: "Abena K.",
    quote:
      "The beef suya is unmatched. This is the spot my friends and I hit every Friday night.",
    rating: 5,
  },
  {
    name: "Kwame O.",
    quote:
      "Fully Loaded Shawarma lives up to the name. Generous, messy, exactly how it should be.",
    rating: 5,
  },
  {
    name: "Nana A.",
    quote:
      "Ordered the Flicks & Licks Combo for a get-together and it fed everyone with leftovers. Worth every cedi.",
    rating: 5,
  },
];

export const faqItems: FaqItem[] = [
  {
    question: "Is Flicks & Licks cash only?",
    answer:
      "Yes. We currently accept cash only at the counter — no card payments. We're working on more options soon.",
  },
  {
    question: "Where is Flicks & Licks located?",
    answer:
      "We've got five spots across Accra: Haatso Atomic, Mile 7 T-Junction, Kingsby Achimota, East Legon and Dansoman. See the full list with directions in the Location & Hours section above.",
  },
  {
    question: "Can I pre-order for pickup?",
    answer:
      "Give us a call or WhatsApp ahead of time and we'll have your order ready when you arrive.",
  },
  {
    question: "Do you deliver?",
    answer:
      "Right now we're pickup and dine-in only across all our locations. Delivery is on the way as we grow.",
  },
  {
    question: "What are your hours?",
    answer:
      "We're open daily — check the Location & Hours section above for the full schedule.",
  },
  {
    question: "Are more Flicks & Licks locations opening?",
    answer:
      "Yes! We're growing across Accra and beyond. Follow @flicks_n_licks for new branch announcements and launch updates.",
  },
];
