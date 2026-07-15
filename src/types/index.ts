export type CategoryId =
  | "protein"
  | "sides"
  | "wraps-pizza"
  | "combos";

export interface Category {
  id: CategoryId;
  label: string;
  tagline: string;
}

export interface Product {
  slug: string;
  name: string;
  category: CategoryId;
  style?: string;
  description: string;
  price: number;
  image?: string;
  badge?: string;
  isFeatured?: boolean;
}

export interface Testimonial {
  name: string;
  quote: string;
  rating: number;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface OrderStep {
  title: string;
  description: string;
}

export interface Hours {
  days: string;
  time: string;
}
