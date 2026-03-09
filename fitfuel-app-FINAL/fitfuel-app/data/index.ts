/**
 * data/index.ts — Typed data access layer
 *
 * All application code should import from @/data (this file).
 * The raw JSON files are the single source of truth; this module
 * adds types, validation-free helpers, and a stable public API.
 *
 * Usage:
 *   import { getMeals, getMealById, getDeliveryFee, ... } from '@/data';
 */

// Metro / React Native resolves require() for JSON reliably.
// eslint-disable-next-line @typescript-eslint/no-var-requires
const mealsRaw = require('./meals.json') as MealData[];
// eslint-disable-next-line @typescript-eslint/no-var-requires
const pricingRaw = require('./pricing.json') as PricingConfig;
// eslint-disable-next-line @typescript-eslint/no-var-requires
const subscriptionsRaw = require('./subscriptions.json') as { plans: SubscriptionPlan[] };

// ─── Types ────────────────────────────────────────────────────────────────────

export interface MealNutrition {
  calories: number;
  protein:  number;
  carbs:    number;
  fats:     number;
  fiber?:   number;
  sugar?:   number;
  sodium?:  number;
}

export interface MealPrice {
  /** Full price paid without a subscription. */
  regular: number;
  /** Discounted price for active paid subscribers. */
  subscriber: number;
}

export interface MealData {
  id:          string;
  name:        string;
  description: string;
  category:    string;
  chefName:    string;
  nutrition:   MealNutrition;
  rating:      number;
  reviews:     number;
  price:       MealPrice;
  image:       string;
}

export interface PricingConfig {
  deliveryFee:               number;
  deliveryFeeForSubscribers: number;
  currency:                  string;
}

export interface SubscriptionPlan {
  id:           string;
  name:         string;
  monthlyPrice: number;
  benefits:     string[];
}

// ─── Meal helpers ─────────────────────────────────────────────────────────────

/** Returns all meals from the JSON catalogue. */
export function getMeals(): MealData[] {
  return mealsRaw;
}

/** Returns a single meal by id, or undefined when not found. */
export function getMealById(id: string): MealData | undefined {
  return mealsRaw.find((m) => m.id === id);
}

/**
 * The price a customer actually pays for a meal.
 * Subscribers pay the discounted `subscriber` price; others pay `regular`.
 */
export function getEffectiveMealPrice(meal: MealData, isSubscriber: boolean): number {
  return isSubscriber ? meal.price.subscriber : meal.price.regular;
}

/**
 * How much cheaper a meal is with a subscription.
 * Always returns a non-negative number.
 */
export function getSubscriberSavings(meal: MealData): number {
  return Math.max(0, meal.price.regular - meal.price.subscriber);
}

// ─── Pricing helpers ──────────────────────────────────────────────────────────

/** Delivery fee for this order. Subscribers always pay ₹0. */
export function getDeliveryFee(isSubscriber: boolean): number {
  return isSubscriber
    ? pricingRaw.deliveryFeeForSubscribers
    : pricingRaw.deliveryFee;
}

/** Full pricing config object (for currency symbol, etc.). */
export function getPricing(): PricingConfig {
  return pricingRaw;
}

// ─── Subscription plan helpers ────────────────────────────────────────────────

/** All available subscription plans. */
export function getSubscriptionPlans(): SubscriptionPlan[] {
  return subscriptionsRaw.plans;
}

/** Returns a plan by id; falls back to the Free plan if not found. */
export function getPlanById(id: string): SubscriptionPlan {
  return (
    subscriptionsRaw.plans.find((p) => p.id === id) ??
    subscriptionsRaw.plans[0]
  );
}

// ─── Category list (derived from data — no hardcoding) ────────────────────────

/**
 * Unique, ordered category list with 'All' always first.
 * Screens can import this instead of maintaining a separate constant.
 */
export const MEAL_CATEGORIES: string[] = [
  'All',
  ...Array.from(new Set(mealsRaw.map((m) => m.category))),
];
