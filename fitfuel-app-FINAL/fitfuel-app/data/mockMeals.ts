/**
 * data/mockMeals.ts — backward-compat adapter
 *
 * The canonical data now lives in data/meals.json (via data/index.ts).
 * This file maps it to the flat `Meal` type that existing screens already
 * import from '@/data/mockMeals', so no other screen needs to change.
 *
 * New field added: `subscriberPrice` — discounted price for paid subscribers.
 * Screens that need pricing comparison can read both `price` and `subscriberPrice`.
 *
 * Imported by:
 *   app/customer/meal/select-meal.tsx  — planner meal picker
 *   app/customer/meal/meal-detail.tsx  — detail view
 *   (app/customer/(tabs)/meals.tsx now imports from @/data directly)
 */

import { getMeals as _getMeals, MEAL_CATEGORIES } from './index';

export { MEAL_CATEGORIES };

// ─── Flat Meal type (backward-compatible + extended) ─────────────────────────

export interface Meal {
  id:              string;
  name:            string;
  description:     string;
  category:        string;
  chefName:        string;
  calories:        number;
  protein:         number;
  carbs:           number;
  fats:            number;
  rating:          number;
  reviews:         number;
  /** Regular (non-subscriber) price — used by select-meal, planner, cart. */
  price:           number;
  /** Discounted price for active paid subscribers. */
  subscriberPrice: number;
  /** Direct CDN image URL (Unsplash etc.) for rendering in <Image> */
  image:           string;
}

// ─── Data (mapped from JSON) ──────────────────────────────────────────────────

export const MOCK_MEALS: Meal[] = _getMeals().map((raw) => ({
  id:              raw.id,
  name:            raw.name,
  description:     raw.description,
  category:        raw.category,
  chefName:        raw.chefName,
  calories:        raw.nutrition.calories,
  protein:         raw.nutrition.protein,
  carbs:           raw.nutrition.carbs,
  fats:            raw.nutrition.fats,
  rating:          raw.rating,
  reviews:         raw.reviews,
  price:           raw.price.regular,
  subscriberPrice: raw.price.subscriber,
  image:           raw.image,               // propagated from meals.json
}));

// ─── Lookup helper ────────────────────────────────────────────────────────────

/** Returns a flat Meal by id, or undefined if not found. */
export function getMealById(id: string): Meal | undefined {
  return MOCK_MEALS.find((m) => m.id === id);
}
