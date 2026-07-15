export type CategoryId =
  | "suya-grill"
  | "rice"
  | "loaded-favorites"
  | "combos";

export interface Category {
  id: CategoryId;
  label: string;
  tagline: string;
}

export interface ExtrasOption {
  name: string;
  price: number;
}

export interface ExtrasGroup {
  group: string;
  optional: boolean;
  options: ExtrasOption[];
}

export interface Product {
  slug: string;
  name: string;
  category: CategoryId;
  style?: string;
  description: string;
  price: number;
  images: string[];
  extras?: ExtrasGroup[];
  badge?: string;
  isHotSale?: boolean;
}

export interface CartItem {
  slug: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

export interface Review {
  id: string;
  name: string;
  rating: number;
  comment: string;
  date: string;
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

export interface Branch {
  name: string;
  address: string;
  mapsUrl: string;
  isFlagship?: boolean;
}
