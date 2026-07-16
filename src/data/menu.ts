import type { Category, Product, Review } from "@/types";

export const categories: Category[] = [
  {
    id: "suya-grill",
    label: "Suya & Grill",
    tagline: "Straight off the coals",
  },
  {
    id: "rice",
    label: "Rice",
    tagline: "Fried rice & jollof",
  },
  {
    id: "loaded-favorites",
    label: "Loaded Favorites",
    tagline: "Shawarma, pizza & loaded fries",
  },
  {
    id: "combos",
    label: "Combos",
    tagline: "Come hungry, leave happy",
  },
];

export const products: Product[] = [
  {
    slug: "chicken-suya",
    name: "Chicken Suya",
    category: "suya-grill",
    style: "Nigerian style",
    description:
      "Char grilled chicken suya, spiced and smoky, sliced fresh off the coals and served with onion, cucumber and pepper.",
    price: 60,
    images: [
      "/images/menu/chicken-suya/1.webp",
      "/images/menu/chicken-suya/2.webp",
    ],
  },
  {
    slug: "fried-rice",
    name: "Fried Rice",
    category: "rice",
    style: "Chinese style",
    description:
      "Vegetable fried rice, wok tossed with carrot, spring onion and egg, served with pepper sauce on the side.",
    price: 40,
    images: [
      "/images/menu/fried-rice/1.webp",
      "/images/menu/fried-rice/2.webp",
      "/images/menu/fried-rice/3.webp",
    ],
    extras: [
      {
        group: "Add a Protein",
        optional: true,
        options: [
          { name: "Chicken Suya", price: 60 },
          { name: "Chicken Wings", price: 70 },
          { name: "Half Grilled Chicken", price: 110 },
          { name: "Grilled Goat", price: 150 },
        ],
      },
    ],
  },
  {
    slug: "assorted-jollof",
    name: "Assorted Jollof",
    category: "rice",
    description:
      "Jollof rice stir fried with spicy chicken suya and sausage, served with coleslaw and wings on the side.",
    price: 120,
    images: ["/images/menu/assorted-jollof/1.webp"],
  },
  {
    slug: "flicks-licks-combo",
    name: "Flicks & Licks Combo",
    category: "combos",
    description:
      "Chicken suya, beef suya, spicy chicken wings, spring rolls, french fries, pizza slices, fried rice and jollof rice, built for sharing.",
    price: 290,
    images: [
      "/images/menu/flicks-licks-combo/1.webp",
      "/images/menu/flicks-licks-combo/2.webp",
      "/images/menu/flicks-licks-combo/3.webp",
    ],
    extras: [
      {
        group: "À La Carte Extras",
        optional: true,
        options: [
          { name: "Chicken Suya Only", price: 60 },
          { name: "Beef Suya Only", price: 35 },
          { name: "Chicken Wings Only", price: 70 },
          { name: "French Fries Only", price: 35 },
          { name: "Fried Rice Only", price: 40 },
          { name: "Jollof Rice Only", price: 40 },
        ],
      },
    ],
  },
  {
    slug: "flicks-special-pizza",
    name: "Flicks Special Pizza",
    category: "loaded-favorites",
    description:
      "House pizza loaded with chicken, peppers and melted cheese, baked fresh to order.",
    price: 140,
    images: [
      "/images/menu/flicks-special-pizza/1.webp",
      "/images/menu/flicks-special-pizza/2.webp",
      "/images/menu/flicks-special-pizza/3.webp",
    ],
  },
  {
    slug: "fully-loaded-shawarma",
    name: "Fully Loaded Shawarma",
    category: "loaded-favorites",
    description:
      "Hand rolled shawarma stuffed with meat, veg and sauce, wrapped fresh and packed with flavor.",
    price: 95,
    images: ["/images/menu/fully-loaded-shawarma/1.webp"],
    badge: "Hot Sale",
    isHotSale: true,
  },
  {
    slug: "cheesy-shawarma",
    name: "Cheesy Shawarma",
    category: "loaded-favorites",
    description:
      "Our loaded shawarma, finished with extra melted cheese for the ultimate gooey bite.",
    price: 120,
    images: ["/images/menu/cheesy-shawarma/1.webp"],
  },
  {
    slug: "the-squad-combo",
    name: "The Squad Combo",
    category: "combos",
    description:
      "Flicks Special Pizza + 1 Liter Coke for the whole squad. Limited time deal, 11th June to 19th July.",
    price: 149,
    images: ["/images/menu/the-squad-combo/1.webp"],
    badge: "Hot Sale",
    isHotSale: true,
  },
  {
    slug: "super-loaded-plantain",
    name: "Super Loaded (Plantain +)",
    category: "loaded-favorites",
    description:
      "Includes everything in Loaded Fries with an extra quantity of constituents, plus kelewele.",
    price: 170,
    images: [
      "/images/menu/super-loaded-plantain/1.webp",
      "/images/menu/super-loaded-plantain/2.webp",
      "/images/menu/super-loaded-plantain/3.webp",
      "/images/menu/super-loaded-plantain/4.webp",
    ],
    extras: [
      {
        group: "Extras",
        optional: true,
        options: [
          { name: "Cheese", price: 25 },
          { name: "Chicken", price: 20 },
          { name: "Sausage", price: 15 },
        ],
      },
    ],
    badge: "Hot Sale",
    isHotSale: true,
  },
  {
    slug: "loaded-fries-cheese",
    name: "Loaded Fries with Cheese",
    category: "loaded-favorites",
    description:
      "Crispy fries loaded with melted cheese, seasoned protein and a runny egg on top.",
    price: 135,
    images: [
      "/images/menu/loaded-fries-cheese/1.webp",
      "/images/menu/loaded-fries-cheese/2.webp",
      "/images/menu/loaded-fries-cheese/3.webp",
      "/images/menu/loaded-fries-cheese/4.webp",
    ],
    extras: [
      {
        group: "Extras",
        optional: true,
        options: [
          { name: "Cheese", price: 25 },
          { name: "Chicken", price: 20 },
          { name: "Sausage", price: 15 },
        ],
      },
      {
        group: "Protein",
        optional: true,
        options: [
          { name: "Chicken Wings", price: 70 },
          { name: "Chicken Suya", price: 60 },
        ],
      },
    ],
    badge: "Hot Sale",
    isHotSale: true,
  },
];

export const hotSaleProducts = products.filter((p) => p.isHotSale);

export const seedReviews: Record<string, Review[]> = {
  "fully-loaded-shawarma": [
    {
      id: "seed-1",
      name: "Kwame O.",
      rating: 5,
      comment:
        "Lives up to the name. Generous, messy, exactly how it should be.",
      date: "2026-06-02",
    },
    {
      id: "seed-2",
      name: "Efua D.",
      rating: 5,
      comment: "My favorite order every single time. Never disappoints.",
      date: "2026-05-14",
    },
  ],
  "super-loaded-plantain": [
    {
      id: "seed-1",
      name: "Nana A.",
      rating: 5,
      comment: "The kelewele addition is genius. Huge portion for the price.",
      date: "2026-06-20",
    },
  ],
  "the-squad-combo": [
    {
      id: "seed-1",
      name: "Yaw B.",
      rating: 5,
      comment: "Perfect for watching the match with the guys. Great deal.",
      date: "2026-06-28",
    },
  ],
  "loaded-fries-cheese": [
    {
      id: "seed-1",
      name: "Abena K.",
      rating: 5,
      comment: "That runny egg on top is a game changer. So good.",
      date: "2026-05-30",
    },
    {
      id: "seed-2",
      name: "Kojo M.",
      rating: 4,
      comment: "Loaded doesn't even begin to describe it. Bring a friend.",
      date: "2026-06-10",
    },
  ],
  "chicken-suya": [
    {
      id: "seed-1",
      name: "Ama S.",
      rating: 5,
      comment: "Smoky, spicy, perfectly grilled. Haatso's best suya spot.",
      date: "2026-06-05",
    },
  ],
  "flicks-licks-combo": [
    {
      id: "seed-1",
      name: "Kwabena T.",
      rating: 5,
      comment: "Ordered this for a game night and it fed the whole squad.",
      date: "2026-06-15",
    },
  ],
};
