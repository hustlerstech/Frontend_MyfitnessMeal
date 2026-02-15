/**
 * Spacing - MyFitness Meals Design System
 * 
 * 8px base unit spacing system
 * Provides consistent spacing throughout the app
 * Based on Material Design and modern mobile app standards
 */

export const Spacing = {
  // Base unit (8px)
  base: 8,

  // Micro spacing (for tight layouts)
  xxs: 2,   // 2px  - Very tight spacing, rarely used
  xs: 4,    // 4px  - Minimal spacing between closely related items

  // Standard spacing (most commonly used)
  sm: 8,    // 8px  - Small spacing, compact layouts
  md: 16,   // 16px - Medium spacing, default for most elements
  lg: 24,   // 24px - Large spacing, section separators
  xl: 32,   // 32px - Extra large spacing, major sections
  xxl: 40,  // 40px - Very large spacing, screen padding top
  xxxl: 48, // 48px - Maximum spacing for special cases

  // Semantic spacing aliases
  screenPadding: 24,        // Default horizontal screen padding
  screenPaddingVertical: 32, // Default vertical screen padding
  cardPadding: 16,          // Padding inside cards
  cardMargin: 16,           // Margin between cards
  buttonPadding: 16,        // Vertical padding for buttons
  inputPadding: 16,         // Padding inside input fields
  sectionGap: 24,           // Gap between major sections
  itemGap: 12,              // Gap between list items
  iconTextGap: 8,           // Gap between icon and text

  // Component-specific spacing
  header: {
    height: 56,             // Standard header height
    paddingHorizontal: 24,  // Header horizontal padding
    paddingVertical: 16,    // Header vertical padding
  },

  tabBar: {
    height: 60,             // Bottom tab bar height
    paddingVertical: 8,     // Tab bar vertical padding
    iconSize: 24,           // Tab icon size
    iconTextGap: 4,         // Gap between icon and label
  },

  button: {
    paddingVertical: 16,    // Button vertical padding
    paddingHorizontal: 24,  // Button horizontal padding
    minHeight: 48,          // Minimum touchable height
    borderRadius: 12,       // Button border radius
    iconGap: 8,             // Gap between icon and text in button
  },

  input: {
    paddingVertical: 16,    // Input vertical padding
    paddingHorizontal: 16,  // Input horizontal padding
    minHeight: 56,          // Input minimum height
    borderRadius: 8,        // Input border radius
    marginBottom: 16,       // Space between inputs
  },

  card: {
    padding: 16,            // Card inner padding
    margin: 16,             // Card outer margin
    borderRadius: 12,       // Card border radius
    gap: 12,                // Gap between card elements
  },

  list: {
    itemPadding: 16,        // List item padding
    itemGap: 12,            // Gap between list items
    sectionHeaderPadding: 16, // Section header padding
    sectionGap: 24,         // Gap between sections
  },

  modal: {
    padding: 24,            // Modal content padding
    borderRadius: 20,       // Modal border radius (top corners)
    handleHeight: 4,        // Bottom sheet handle height
    handleWidth: 40,        // Bottom sheet handle width
    handleMargin: 12,       // Space around handle
  },

  otp: {
    boxSize: 56,            // OTP input box size
    boxGap: 12,             // Gap between OTP boxes
    boxBorderRadius: 8,     // OTP box border radius
  },

  avatar: {
    xs: 24,                 // Extra small avatar
    sm: 32,                 // Small avatar
    md: 48,                 // Medium avatar
    lg: 64,                 // Large avatar
    xl: 100,                // Extra large avatar (profile setup)
  },

  icon: {
    xs: 16,                 // Extra small icon
    sm: 20,                 // Small icon
    md: 24,                 // Medium icon (default)
    lg: 32,                 // Large icon
    xl: 48,                 // Extra large icon
  },

  // Progress indicator
  progress: {
    dotSize: 8,             // Progress dot size
    dotGap: 8,              // Gap between dots
  },

  // Safe area insets (for notched devices)
  safeArea: {
    top: 0,                 // Will be dynamic based on device
    bottom: 0,              // Will be dynamic based on device
  },

  // Meal card specific
  mealCard: {
    imageHeight: 180,       // Meal image height
    padding: 12,            // Card padding
    margin: 12,             // Card margin
    borderRadius: 12,       // Card border radius
    contentGap: 8,          // Gap between content elements
  },

  // Chef card specific
  chefCard: {
    imageHeight: 120,       // Chef image height
    padding: 12,            // Card padding
    borderRadius: 12,       // Card border radius
  },

  // Banner/Hero section
  banner: {
    height: 200,            // Banner height
    padding: 24,            // Banner padding
    borderRadius: 16,       // Banner border radius
  },
} as const;

// Type for spacing keys
export type SpacingKey = keyof typeof Spacing;

// Helper function to get spacing value
export const getSpacing = (multiplier: number): number => {
  return Spacing.base * multiplier;
};

// Helper to create responsive spacing (useful for different screen sizes)
export const responsiveSpacing = {
  xs: (base: number) => base * 0.75,   // 75% for extra small screens
  sm: (base: number) => base,          // 100% for small screens
  md: (base: number) => base * 1.25,   // 125% for medium screens
  lg: (base: number) => base * 1.5,    // 150% for large screens
};

// Common padding presets (for quick use)
export const Padding = {
  none: 0,
  screen: Spacing.screenPadding,
  card: Spacing.cardPadding,
  button: Spacing.buttonPadding,
  input: Spacing.inputPadding,
  small: Spacing.sm,
  medium: Spacing.md,
  large: Spacing.lg,
} as const;

// Common margin presets
export const Margin = {
  none: 0,
  card: Spacing.cardMargin,
  small: Spacing.sm,
  medium: Spacing.md,
  large: Spacing.lg,
  section: Spacing.sectionGap,
} as const;

// Border radius presets (modern rounded design)
export const BorderRadius = {
  none: 0,
  xs: 4,      // Extra small radius
  sm: 8,      // Small radius (inputs)
  md: 12,     // Medium radius (buttons, cards)
  lg: 16,     // Large radius (modals, banners)
  xl: 20,     // Extra large radius
  xxl: 24,    // Very large radius
  full: 9999, // Fully rounded (pills, circles)
} as const;

export default Spacing;
