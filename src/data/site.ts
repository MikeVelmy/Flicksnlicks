import type {
  Category,
  FaqItem,
  Hours,
  OrderStep,
  Product,
  Testimonial,
} from "@/types";

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

export const categories: Category[] = [
  {
    id: "protein",
    label: "Protein",
    tagline: "Straight off the grill",
  },
  {
    id: "sides",
    label: "Sides",
    tagline: "Rice, fries & chips",
  },
  {
    id: "wraps-pizza",
    label: "Wraps & Pizzas",
    tagline: "Loaded and cheesy",
  },
  {
    id: "combos",
    label: "In-House Combos",
    tagline: "Come hungry, leave happy",
  },
];

export const products: Product[] = [
  // Protein
  {
    slug: "beef-suya",
    name: "Beef Suya",
    category: "protein",
    style: "Nigerian style",
    description: "Thin-sliced beef, dry-rubbed and grilled hot over the coals.",
    price: 35,
    badge: "Suya Boss Pick",
    isFeatured: true,
  },
  {
    slug: "ram-suya",
    name: "Ram Suya",
    category: "protein",
    style: "Nigerian style",
    description: "Peppery, smoky ram skewers grilled the Naija way.",
    price: 55,
  },
  {
    slug: "chicken-suya",
    name: "Chicken Suya",
    category: "protein",
    style: "Nigerian style",
    description: "Char-grilled chicken suya, spiced and smoky.",
    price: 60,
    isFeatured: true,
  },
  {
    slug: "spicy-chicken-wings",
    name: "Spicy Chicken Wings",
    category: "protein",
    style: "Ghanaian style",
    description: "Fiery, sticky wings grilled to a proper char.",
    price: 70,
  },
  {
    slug: "grilled-goat",
    name: "Grilled Goat",
    category: "protein",
    style: "Ghanaian style",
    description: "Slow-grilled goat meat, tender and full of flavor.",
    price: 140,
  },
  {
    slug: "half-grilled-chicken",
    name: "Half Grilled Chicken",
    category: "protein",
    style: "Ghanaian style",
    description: "Half a chicken, grilled whole and seasoned generously.",
    price: 110,
  },
  // Sides
  {
    slug: "fried-rice",
    name: "Fried Rice Only",
    category: "sides",
    style: "Chinese style",
    description: "Classic vegetable fried rice, made fresh to order.",
    price: 40,
  },
  {
    slug: "jollof-rice",
    name: "Jollof Rice Only",
    category: "sides",
    style: "Ghanaian style",
    description: "Smoky, well-seasoned jollof, the way it should be.",
    price: 40,
  },
  {
    slug: "french-fries",
    name: "French Fries",
    category: "sides",
    description: "Crispy golden fries, salted just right.",
    price: 35,
  },
  {
    slug: "yam-chips",
    name: "Yam Chips",
    category: "sides",
    description: "Fried yam chips, crispy outside and soft inside.",
    price: 35,
  },
  // Wraps and pizzas
  {
    slug: "loaded-fries-cheese",
    name: "Loaded Fries with Cheese",
    category: "wraps-pizza",
    description: "Fries stacked with melted cheese and toppings.",
    price: 135,
  },
  {
    slug: "super-loaded-fries",
    name: "Super Loaded Fries",
    category: "wraps-pizza",
    description: "The full works — meat, cheese, sauces, all in.",
    price: 170,
    badge: "Best Seller",
    isFeatured: true,
  },
  {
    slug: "fully-loaded-shawarma",
    name: "Fully Loaded Shawarma",
    category: "wraps-pizza",
    description: "Hand-rolled shawarma stuffed with meat, veg and sauce.",
    price: 80,
    image: "/images/product-shawarma.webp",
    badge: "Fan Favorite",
    isFeatured: true,
  },
  {
    slug: "cheesy-shawarma",
    name: "Cheesy Shawarma",
    category: "wraps-pizza",
    description: "Our loaded shawarma, finished with extra melted cheese.",
    price: 120,
  },
  {
    slug: "flicks-special-pizza",
    name: "Flicks Special Pizza",
    category: "wraps-pizza",
    description: "House pizza loaded with toppings, baked fresh.",
    price: 140,
    image: "/images/product-pizza.webp",
    badge: "House Special",
    isFeatured: true,
  },
  {
    slug: "mac-and-cheese",
    name: "Mac & Cheese",
    category: "wraps-pizza",
    description: "Creamy, cheesy mac — the ultimate comfort side.",
    price: 199,
  },
  // Combos
  {
    slug: "flicks-combo",
    name: "Flicks Combo",
    category: "combos",
    description:
      "Chicken suya, beef suya, spicy chicken wings, spring rolls, french fries, pizza slices and jollof rice.",
    price: 330,
  },
  {
    slug: "meat-plata",
    name: "Meat Plata",
    category: "combos",
    description:
      "Beef suya, chicken suya, ram suya, chicken wings, grilled goat and half grilled chicken, with yam chips, french fries and a side of fried or jollof rice.",
    price: 430,
    badge: "Sharing Size",
  },
  {
    slug: "family-friends-combo",
    name: "Family & Friends Combo",
    category: "combos",
    description: "A big spread built for the whole crew. Ask staff for details.",
    price: 700,
  },
  {
    slug: "birthday-package",
    name: "Birthday Package",
    category: "combos",
    description: "Celebrate in style with a Flicks & Licks birthday spread.",
    price: 990,
    badge: "Celebration",
  },
];

export const featuredProducts = products.filter((p) => p.isFeatured);

export const orderSteps: OrderStep[] = [
  {
    title: "Browse the menu",
    description: "Scroll the suya, sides, wraps and combos and pick your cravings.",
  },
  {
    title: "Head to the counter",
    description: "Walk in to Flicks & Licks in Haatso Atomic and place your order.",
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
      "Ordered the Meat Plata for a get-together and it fed everyone with leftovers. Worth every cedi.",
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
      `We're in ${"Haatso Atomic, near Centrepoint Mall"}, Accra. Look out for the red and black signage — you can't miss it.`,
  },
  {
    question: "Can I pre-order for pickup?",
    answer:
      "Give us a call or WhatsApp ahead of time and we'll have your order ready when you arrive.",
  },
  {
    question: "Do you deliver?",
    answer:
      "Right now we're pickup and dine-in only at our Haatso Atomic location. Delivery is on the way as we grow.",
  },
  {
    question: "What are your hours?",
    answer:
      "We're open daily — check the Location & Hours section above for the full schedule.",
  },
  {
    question: "Are more Flicks & Licks locations opening?",
    answer:
      "Yes! We're expanding to Ayeduase, Kasoa, Spintex, Osu and Tema. Follow @flicks_n_licks for launch updates.",
  },
];
