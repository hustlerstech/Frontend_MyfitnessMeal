/**
 * Backward-compatibility re-export.
 * The canonical data lives in data/mockMeals.ts.
 * Any file that already imports from '@/data/meals' continues to work
 * without modification (e.g. select-meal.tsx, meal-detail.tsx).
 */
export * from './mockMeals';
