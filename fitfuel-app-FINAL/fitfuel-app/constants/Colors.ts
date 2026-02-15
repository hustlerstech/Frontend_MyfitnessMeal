/**
 * Colors - MyFitness Meals Design System
 * 
 * Complete color palette based on Figma design
 * Primary: Electric Green (#00D563) - Swiggy/Zomato inspired
 * Style: Modern food delivery app aesthetic
 */

export const Colors = {
  // Primary Brand Colors
  primary: '#00D563',           // Electric Green - Main brand color
  primaryLight: '#33E082',      // Lighter green for hover states
  primaryDark: '#00B854',       // Darker green for pressed states
  primaryBackground: '#F0FFF4', // Very light green for backgrounds

  // Background Colors
  background: '#FFFFFF',        // Main app background (white)
  backgroundSecondary: '#F8F8F8', // Secondary background (light grey)
  backgroundTertiary: '#F0F0F0', // Tertiary background

  // Text Colors
  text: '#1A1A1A',             // Primary dark text
  textSecondary: '#666666',    // Secondary grey text
  textLight: '#999999',        // Light grey text (captions)
  textPlaceholder: '#BDBDBD',  // Placeholder text
  textInverse: '#FFFFFF',      // White text on dark backgrounds

  // UI Element Colors
  border: '#E0E0E0',           // Default border color
  borderLight: '#F0F0F0',      // Lighter borders
  borderDark: '#CCCCCC',       // Darker borders
  divider: '#F0F0F0',          // Divider lines

  // Card & Surface Colors
  card: '#FFFFFF',             // Card background
  cardElevated: '#FFFFFF',     // Elevated card with shadow
  surface: '#FAFAFA',          // Surface color

  // Status Colors
  success: '#00D563',          // Success green (same as primary)
  error: '#FF3B30',            // Error red
  warning: '#FFCC00',          // Warning yellow
  info: '#007AFF',             // Info blue

  // Input Colors
  inputBackground: '#F8F8F8',  // Input field background
  inputBorder: '#E0E0E0',      // Input border
  inputFocus: '#00D563',       // Input border when focused
  inputError: '#FF3B30',       // Input border on error
  inputDisabled: '#F0F0F0',    // Disabled input background

  // Button Colors
  buttonPrimary: '#00D563',     // Primary button
  buttonPrimaryHover: '#00B854', // Primary button hover
  buttonPrimaryPressed: '#009940', // Primary button pressed
  buttonSecondary: '#F8F8F8',   // Secondary button
  buttonDisabled: '#E0E0E0',    // Disabled button
  buttonTextDisabled: '#999999', // Disabled button text

  // Overlay & Shadow
  overlay: 'rgba(0, 0, 0, 0.5)',      // Modal overlay
  overlayLight: 'rgba(0, 0, 0, 0.3)', // Light overlay
  shadow: 'rgba(0, 0, 0, 0.1)',       // Shadow color
  shadowDark: 'rgba(0, 0, 0, 0.15)',  // Darker shadow

  // Category/Tag Colors
  tag: '#F0F0F0',              // Tag background
  tagText: '#666666',          // Tag text
  tagActive: '#00D563',        // Active tag background
  tagActiveText: '#FFFFFF',    // Active tag text

  // Rating & Stats
  rating: '#FFCC00',           // Star rating yellow
  discount: '#FF3B30',         // Discount/offer red
  badge: '#00D563',            // Badge background

  // Tab Bar Colors
  tabActive: '#00D563',        // Active tab icon/text
  tabInactive: '#999999',      // Inactive tab icon/text
  tabBackground: '#FFFFFF',    // Tab bar background

  // Special UI States
  shimmer: '#E0E0E0',          // Shimmer loading effect
  shimmerHighlight: '#F5F5F5', // Shimmer highlight
  skeleton: '#F0F0F0',         // Skeleton loading

  // Gradient Colors (for premium features)
  gradientStart: '#00D563',    // Gradient start (green)
  gradientEnd: '#00B854',      // Gradient end (darker green)

  // Nutritional Info Colors (for macro displays)
  protein: '#FF6B6B',          // Red for protein
  carbs: '#4ECDC4',            // Teal for carbs
  fats: '#FFE66D',             // Yellow for fats
  calories: '#00D563',         // Green for calories

  // Additional Utility Colors
  white: '#FFFFFF',
  black: '#000000',
  transparent: 'transparent',

  // Grey Scale (for various UI needs)
  grey50: '#FAFAFA',
  grey100: '#F5F5F5',
  grey200: '#EEEEEE',
  grey300: '#E0E0E0',
  grey400: '#BDBDBD',
  grey500: '#9E9E9E',
  grey600: '#757575',
  grey700: '#616161',
  grey800: '#424242',
  grey900: '#212121',
} as const;

// Type for color keys (useful for TypeScript autocomplete)
export type ColorKey = keyof typeof Colors;

// Helper function to get color with opacity
export const colorWithOpacity = (color: string, opacity: number): string => {
  // Convert hex to rgba
  const hex = color.replace('#', '');
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};

// Semantic color aliases for specific use cases
export const SemanticColors = {
  // Authentication screens
  authBackground: Colors.background,
  authPrimary: Colors.primary,
  authText: Colors.text,
  authSubtext: Colors.textSecondary,
  authInputBg: Colors.inputBackground,
  authInputBorder: Colors.inputBorder,

  // Home/Explore screens
  homeBackground: Colors.background,
  mealCardBg: Colors.card,
  mealCardBorder: Colors.borderLight,
  chefRating: Colors.rating,
  quickDelivery: Colors.success,

  // Order screens
  orderActive: Colors.success,
  orderPending: Colors.warning,
  orderCancelled: Colors.error,
  orderBackground: Colors.background,

  // Profile screens
  profileBackground: Colors.background,
  profileCard: Colors.card,
  profileBorder: Colors.border,
  logoutDanger: Colors.error,
} as const;

export default Colors;
