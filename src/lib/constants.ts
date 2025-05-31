export const WEEK_IN_MS = 1000 * 60 * 60 * 24 * 7;
export const MONTH_IN_MS = 1000 * 60 * 60 * 24 * 30;
export const YEAR_IN_MS = 1000 * 60 * 60 * 24 * 365;
export const TABLE_ROWS_PER_PAGE = 15;
export const FREE_TRIAL_END = new Date("2026-01-01");

export const LG_WIDTH = 1024;
export const MD_WIDTH = 768;

export const LOGIN_PAGE_URL = `/login`;
export const REGISTER_PAGE_URL = `/register`;
export const PRODUCT_PAGE_URL = `/pricing`;
export const ACCOUNT_PAGE_URL = `/account`;
export const APP_URL = "/";
export const LANDING_PAGE_URL = "/home";

export const ADMIN_PATH_PREFIX = "/admin";
export const MAX_FREE_TIER_FLASHCARDS = 9;

export const ACCENT_COLOR = "#049904";

export const IS_DEV = process.env.NODE_ENV === "development";

export type Product = {
  id: string;
  name: string;
  description: string;
  priceInPennies: number;
  isSubscription: boolean;
  subscriptionInterval: "day" | "week" | "month" | "year";
  discount?: number;
};

export const PRODUCTS: Record<string, Product> = {
  monthly: {
    id: "1",
    name: "Monthly Subscription",
    description: "Unlimited use of flashcards generator for a one-month period",
    priceInPennies: 499,
    isSubscription: true,
    subscriptionInterval: "month",
  },
  yearly: {
    id: "2",
    name: "Yearly Subscription",
    description: "Unlimited use of flashcards generator for a one-year period",
    priceInPennies: 4999,
    isSubscription: true,
    subscriptionInterval: "year",
    discount: 0.17,
  },
};

export const PRODUCTS_ARRAY: Product[] = Object.values(PRODUCTS);
