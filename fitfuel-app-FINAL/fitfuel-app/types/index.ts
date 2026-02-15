/**
 * types/ - TypeScript Type Definitions
 * 
 * This folder contains all TypeScript interfaces and type definitions.
 * 
 * Type files will include:
 * - auth.types.ts (User, AuthState, LoginResponse)
 * - meal.types.ts (Meal, MealCategory, NutritionalInfo)
 * - order.types.ts (Order, OrderStatus, OrderItem)
 * - chef.types.ts (Chef, ChefProfile, Menu)
 * - location.types.ts (Address, Coordinates)
 * - api.types.ts (ApiResponse, ApiError)
 * - navigation.types.ts (Route parameters)
 * 
 * Example:
 * export interface User {
 *   id: string;
 *   phoneNumber: string;
 *   fullName: string;
 *   email?: string;
 *   profilePicture?: string;
 *   fitnessGoal?: FitnessGoal;
 *   dietaryPreference?: DietaryPreference;
 * }
 * 
 * export type FitnessGoal = 'weight_loss' | 'muscle_gain' | 'stay_fit';
 * export type DietaryPreference = 'vegetarian' | 'non_vegetarian' | 'vegan' | 'eggetarian';
 */

export {};
