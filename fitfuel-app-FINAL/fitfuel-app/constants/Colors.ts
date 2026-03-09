/**
 * Colors - MyFitness Meals Design System
 *
 * Updated to match Figma prototype design tokens.
 * Primary: #2bee75 (vibrant green)
 * Background: #f5f8f6 (light mint — not pure white)
 */

export const Colors = {
  // Primary Brand Colors
  primary: '#2bee75',           // Figma green — main brand color
  primaryLight: '#5df49a',      // Lighter green for hover states
  primaryDark: '#1db85d',       // Darker green for pressed states
  primaryBackground: '#f0fff8', // Very light green tint

  // Backgrounds
  background: '#f5f8f6',          // Light mint (was #FFFFFF)
  backgroundSecondary: '#f9fafb', // Input / card inner bg (was #F8F8F8)
  backgroundTertiary: '#f3f4f6',  // Chips / inactive tabs (was #F0F0F0)

  // Text Colors
  text: '#111827',             // Dark text (was #1A1A1A)
  textSecondary: '#6b7280',    // Secondary grey (was #666666)
  textLight: '#9ca3af',        // Light grey captions (was #999999)
  textPlaceholder: '#d1d5db',  // Placeholder (was #BDBDBD)
  textInverse: '#FFFFFF',      // White text on dark backgrounds

  // UI Element Colors
  border: '#e5e7eb',           // Default border (was #E0E0E0)
  borderLight: '#f3f4f6',      // Lighter borders (was #F0F0F0)
  borderDark: '#d1d5db',       // Darker borders (was #CCCCCC)
  divider: '#f3f4f6',          // Divider lines

  // Card & Surface Colors
  card: '#FFFFFF',             // Card background
  cardElevated: '#FFFFFF',     // Elevated card with shadow
  surface: '#f9fafb',          // Surface color

  // Status Colors
  success: '#2bee75',          // Success green (matches primary)
  error: '#FF3B30',            // Error red
  warning: '#FFCC00',          // Warning yellow
  info: '#007AFF',             // Info blue

  // Input Colors
  inputBackground: '#f9fafb',  // Input field background (was #F8F8F8)
  inputBorder: '#e5e7eb',      // Input border (was #E0E0E0)
  inputFocus: '#2bee75',       // Input border when focused
  inputError: '#FF3B30',       // Input border on error
  inputDisabled: '#f3f4f6',    // Disabled input background

  // Button Colors
  buttonPrimary: '#2bee75',         // Primary button (was #00D563)
  buttonPrimaryHover: '#1db85d',    // Primary button hover
  buttonPrimaryPressed: '#17a050',  // Primary button pressed
  buttonSecondary: '#f9fafb',       // Secondary button
  buttonDisabled: '#e5e7eb',        // Disabled button
  buttonTextDisabled: '#9ca3af',    // Disabled button text

  // Overlay & Shadow
  overlay: 'rgba(0, 0, 0, 0.5)',
  overlayLight: 'rgba(0, 0, 0, 0.3)',
  shadow: 'rgba(43, 238, 117, 0.08)',      // Green-tinted shadow (Figma)
  shadowDark: 'rgba(43, 238, 117, 0.15)',  // Stronger green shadow

  // Category/Tag Colors
  tag: '#f3f4f6',              // Tag background
  tagText: '#6b7280',          // Tag text
  tagActive: '#2bee75',        // Active tag background
  tagActiveText: '#111827',    // Active tag text (dark on bright green)

  // Rating & Stats
  rating: '#FFCC00',           // Star rating yellow
  discount: '#FF3B30',         // Discount/offer red
  badge: '#2bee75',            // Badge background

  // Tab Bar Colors
  tabActive: '#2bee75',        // Active tab
  tabInactive: '#9ca3af',      // Inactive tab
  tabBackground: '#FFFFFF',    // Tab bar background

  // Special UI States
  shimmer: '#e5e7eb',
  shimmerHighlight: '#f9fafb',
  skeleton: '#f3f4f6',

  // Splash screen (dark theme — special case)
  splashBackground: '#0f2319', // Dark green-black
  splashAccent: '#00ff94',     // Neon mint glow

  // Gradient Colors
  gradientStart: '#2bee75',
  gradientEnd: '#1db85d',

  // Nutritional Macro Colors (Figma progress bar colors)
  protein: '#2bee75',   // Green  (was #FF6B6B)
  carbs: '#60a5fa',     // Blue   (was #4ECDC4)
  fats: '#fbbf24',      // Yellow (was #FFE66D)
  calories: '#2bee75',  // Green

  // Utility
  white: '#FFFFFF',
  black: '#000000',
  transparent: 'transparent',

  // Grey Scale
  grey50: '#f9fafb',
  grey100: '#f3f4f6',
  grey200: '#e5e7eb',
  grey300: '#d1d5db',
  grey400: '#9ca3af',
  grey500: '#6b7280',
  grey600: '#4b5563',
  grey700: '#374151',
  grey800: '#1f2937',
  grey900: '#111827',
} as const;

export type ColorKey = keyof typeof Colors;

export const colorWithOpacity = (color: string, opacity: number): string => {
  const hex = color.replace('#', '');
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};

export const SemanticColors = {
  authBackground: Colors.background,
  authPrimary: Colors.primary,
  authText: Colors.text,
  authSubtext: Colors.textSecondary,
  authInputBg: Colors.inputBackground,
  authInputBorder: Colors.inputBorder,

  homeBackground: Colors.background,
  mealCardBg: Colors.card,
  mealCardBorder: Colors.borderLight,
  chefRating: Colors.rating,
  quickDelivery: Colors.success,

  orderActive: Colors.success,
  orderPending: Colors.warning,
  orderCancelled: Colors.error,
  orderBackground: Colors.background,

  profileBackground: Colors.background,
  profileCard: Colors.card,
  profileBorder: Colors.border,
  logoutDanger: Colors.error,
} as const;

export default Colors;
