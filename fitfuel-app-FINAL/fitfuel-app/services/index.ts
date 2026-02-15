/**
 * services/ - API Services & External Integrations
 * 
 * This folder contains all API communication and external service integrations.
 * 
 * Services will include:
 * - api.ts (Base API client with axios/fetch)
 * - authService.ts (Authentication APIs - sendOTP, verifyOTP)
 * - userService.ts (User profile management)
 * - mealService.ts (Meal listing, search, details)
 * - orderService.ts (Order creation, tracking)
 * - chefService.ts (Chef profiles, menus)
 * - locationService.ts (Address management, geocoding)
 * - paymentService.ts (Razorpay integration)
 * - notificationService.ts (Push notifications)
 * - storageService.ts (AsyncStorage wrapper)
 * 
 * Example:
 * export const sendOTP = async (phoneNumber: string) => {
 *   return api.post('/auth/send-otp', { phoneNumber });
 * };
 */

export {};
