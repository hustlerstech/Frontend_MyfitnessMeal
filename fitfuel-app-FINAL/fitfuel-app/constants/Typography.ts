/**
 * Typography - MyFitness Meals Design System
 * 
 * Font family: Poppins
 * Comprehensive text styles for the entire app
 * Based on modern mobile app design standards
 */

/**
 * Font Families
 * Using Poppins from Google Fonts
 * Will be loaded via expo-font
 */
export const FontFamily = {
  light: 'Poppins-Light',           // 300 weight
  regular: 'Poppins-Regular',       // 400 weight (default)
  medium: 'Poppins-Medium',         // 500 weight
  semiBold: 'Poppins-SemiBold',     // 600 weight
  bold: 'Poppins-Bold',             // 700 weight
  extraBold: 'Poppins-ExtraBold',   // 800 weight (optional)
} as const;

/**
 * Font Sizes
 * Following a modular scale for visual hierarchy
 */
export const FontSize = {
  xxs: 10,   // Very small - fine print, captions
  xs: 12,    // Extra small - labels, helper text
  sm: 14,    // Small - secondary text, descriptions
  base: 16,  // Base size - body text, inputs
  md: 18,    // Medium - emphasized body text
  lg: 20,    // Large - card titles, section headers
  xl: 24,    // Extra large - screen titles, main headers
  xxl: 28,   // Very large - hero text
  xxxl: 32,  // Huge - splash screen, special displays
  display: 40, // Display - extra large displays
} as const;

/**
 * Font Weights
 * Numeric values for platforms that need them
 */
export const FontWeight = {
  light: '300',
  regular: '400',
  medium: '500',
  semiBold: '600',
  bold: '700',
  extraBold: '800',
} as const;

/**
 * Line Heights
 * Relative to font size for good readability
 */
export const LineHeight = {
  tight: 1.2,     // Tight line height for headings
  normal: 1.5,    // Normal line height for body text
  relaxed: 1.75,  // Relaxed line height for comfortable reading
  loose: 2,       // Loose line height for special cases
} as const;

/**
 * Letter Spacing
 * Subtle tracking for better readability
 */
export const LetterSpacing = {
  tighter: -0.5,
  tight: -0.25,
  normal: 0,
  wide: 0.5,
  wider: 1,
  widest: 1.5,
} as const;

/**
 * Predefined Text Styles
 * Ready-to-use text style objects for common use cases
 */
export const TextStyles = {
  // Display styles (largest text)
  displayLarge: {
    fontFamily: FontFamily.bold,
    fontSize: FontSize.display,
    lineHeight: FontSize.display * LineHeight.tight,
    letterSpacing: LetterSpacing.tight,
  },

  displayMedium: {
    fontFamily: FontFamily.bold,
    fontSize: FontSize.xxxl,
    lineHeight: FontSize.xxxl * LineHeight.tight,
    letterSpacing: LetterSpacing.tight,
  },

  displaySmall: {
    fontFamily: FontFamily.semiBold,
    fontSize: FontSize.xxl,
    lineHeight: FontSize.xxl * LineHeight.tight,
    letterSpacing: LetterSpacing.normal,
  },

  // Heading styles
  h1: {
    fontFamily: FontFamily.bold,
    fontSize: FontSize.xxxl,
    lineHeight: FontSize.xxxl * LineHeight.tight,
    letterSpacing: LetterSpacing.tight,
  },

  h2: {
    fontFamily: FontFamily.bold,
    fontSize: FontSize.xxl,
    lineHeight: FontSize.xxl * LineHeight.tight,
    letterSpacing: LetterSpacing.normal,
  },

  h3: {
    fontFamily: FontFamily.semiBold,
    fontSize: FontSize.xl,
    lineHeight: FontSize.xl * LineHeight.normal,
    letterSpacing: LetterSpacing.normal,
  },

  h4: {
    fontFamily: FontFamily.semiBold,
    fontSize: FontSize.lg,
    lineHeight: FontSize.lg * LineHeight.normal,
    letterSpacing: LetterSpacing.normal,
  },

  h5: {
    fontFamily: FontFamily.medium,
    fontSize: FontSize.md,
    lineHeight: FontSize.md * LineHeight.normal,
    letterSpacing: LetterSpacing.normal,
  },

  // Body text styles
  bodyLarge: {
    fontFamily: FontFamily.regular,
    fontSize: FontSize.md,
    lineHeight: FontSize.md * LineHeight.normal,
    letterSpacing: LetterSpacing.normal,
  },

  body: {
    fontFamily: FontFamily.regular,
    fontSize: FontSize.base,
    lineHeight: FontSize.base * LineHeight.normal,
    letterSpacing: LetterSpacing.normal,
  },

  bodySmall: {
    fontFamily: FontFamily.regular,
    fontSize: FontSize.sm,
    lineHeight: FontSize.sm * LineHeight.normal,
    letterSpacing: LetterSpacing.normal,
  },

  // Emphasized text
  bodyBold: {
    fontFamily: FontFamily.semiBold,
    fontSize: FontSize.base,
    lineHeight: FontSize.base * LineHeight.normal,
    letterSpacing: LetterSpacing.normal,
  },

  bodyMedium: {
    fontFamily: FontFamily.medium,
    fontSize: FontSize.base,
    lineHeight: FontSize.base * LineHeight.normal,
    letterSpacing: LetterSpacing.normal,
  },

  // Caption and helper text
  caption: {
    fontFamily: FontFamily.regular,
    fontSize: FontSize.xs,
    lineHeight: FontSize.xs * LineHeight.normal,
    letterSpacing: LetterSpacing.wide,
  },

  captionBold: {
    fontFamily: FontFamily.semiBold,
    fontSize: FontSize.xs,
    lineHeight: FontSize.xs * LineHeight.normal,
    letterSpacing: LetterSpacing.wide,
  },

  overline: {
    fontFamily: FontFamily.semiBold,
    fontSize: FontSize.xxs,
    lineHeight: FontSize.xxs * LineHeight.normal,
    letterSpacing: LetterSpacing.widest,
    textTransform: 'uppercase' as const,
  },

  // Button text
  buttonLarge: {
    fontFamily: FontFamily.semiBold,
    fontSize: FontSize.md,
    lineHeight: FontSize.md * LineHeight.tight,
    letterSpacing: LetterSpacing.normal,
  },

  button: {
    fontFamily: FontFamily.semiBold,
    fontSize: FontSize.base,
    lineHeight: FontSize.base * LineHeight.tight,
    letterSpacing: LetterSpacing.normal,
  },

  buttonSmall: {
    fontFamily: FontFamily.medium,
    fontSize: FontSize.sm,
    lineHeight: FontSize.sm * LineHeight.tight,
    letterSpacing: LetterSpacing.normal,
  },

  // Input text
  input: {
    fontFamily: FontFamily.regular,
    fontSize: FontSize.base,
    lineHeight: FontSize.base * LineHeight.tight,
    letterSpacing: LetterSpacing.normal,
  },

  inputLabel: {
    fontFamily: FontFamily.medium,
    fontSize: FontSize.sm,
    lineHeight: FontSize.sm * LineHeight.normal,
    letterSpacing: LetterSpacing.normal,
  },

  placeholder: {
    fontFamily: FontFamily.regular,
    fontSize: FontSize.base,
    lineHeight: FontSize.base * LineHeight.tight,
    letterSpacing: LetterSpacing.normal,
  },

  // Link text
  link: {
    fontFamily: FontFamily.medium,
    fontSize: FontSize.base,
    lineHeight: FontSize.base * LineHeight.normal,
    letterSpacing: LetterSpacing.normal,
    textDecorationLine: 'underline' as const,
  },

  linkSmall: {
    fontFamily: FontFamily.medium,
    fontSize: FontSize.sm,
    lineHeight: FontSize.sm * LineHeight.normal,
    letterSpacing: LetterSpacing.normal,
    textDecorationLine: 'underline' as const,
  },

  // Tab bar text
  tabLabel: {
    fontFamily: FontFamily.medium,
    fontSize: FontSize.xs,
    lineHeight: FontSize.xs * LineHeight.tight,
    letterSpacing: LetterSpacing.normal,
  },

  // Badge/Tag text
  tag: {
    fontFamily: FontFamily.medium,
    fontSize: FontSize.xs,
    lineHeight: FontSize.xs * LineHeight.tight,
    letterSpacing: LetterSpacing.normal,
  },

  badge: {
    fontFamily: FontFamily.semiBold,
    fontSize: FontSize.xxs,
    lineHeight: FontSize.xxs * LineHeight.tight,
    letterSpacing: LetterSpacing.wider,
  },

  // Price/Number display
  price: {
    fontFamily: FontFamily.bold,
    fontSize: FontSize.xl,
    lineHeight: FontSize.xl * LineHeight.tight,
    letterSpacing: LetterSpacing.tight,
  },

  priceSmall: {
    fontFamily: FontFamily.semiBold,
    fontSize: FontSize.base,
    lineHeight: FontSize.base * LineHeight.tight,
    letterSpacing: LetterSpacing.normal,
  },

  // Screen-specific styles
  screenTitle: {
    fontFamily: FontFamily.bold,
    fontSize: FontSize.xl,
    lineHeight: FontSize.xl * LineHeight.tight,
    letterSpacing: LetterSpacing.normal,
  },

  cardTitle: {
    fontFamily: FontFamily.semiBold,
    fontSize: FontSize.lg,
    lineHeight: FontSize.lg * LineHeight.normal,
    letterSpacing: LetterSpacing.normal,
  },

  cardSubtitle: {
    fontFamily: FontFamily.regular,
    fontSize: FontSize.sm,
    lineHeight: FontSize.sm * LineHeight.normal,
    letterSpacing: LetterSpacing.normal,
  },

  sectionHeader: {
    fontFamily: FontFamily.semiBold,
    fontSize: FontSize.md,
    lineHeight: FontSize.md * LineHeight.normal,
    letterSpacing: LetterSpacing.normal,
  },

  // Error/Success messages
  errorMessage: {
    fontFamily: FontFamily.regular,
    fontSize: FontSize.sm,
    lineHeight: FontSize.sm * LineHeight.normal,
    letterSpacing: LetterSpacing.normal,
  },

  successMessage: {
    fontFamily: FontFamily.medium,
    fontSize: FontSize.sm,
    lineHeight: FontSize.sm * LineHeight.normal,
    letterSpacing: LetterSpacing.normal,
  },

  // OTP input
  otpDigit: {
    fontFamily: FontFamily.bold,
    fontSize: FontSize.xl,
    lineHeight: FontSize.xl * LineHeight.tight,
    letterSpacing: LetterSpacing.normal,
  },

  // Timer/Countdown
  timer: {
    fontFamily: FontFamily.medium,
    fontSize: FontSize.sm,
    lineHeight: FontSize.sm * LineHeight.tight,
    letterSpacing: LetterSpacing.normal,
  },

  // Welcome screen
  welcomeTitle: {
    fontFamily: FontFamily.bold,
    fontSize: FontSize.xxl,
    lineHeight: FontSize.xxl * LineHeight.tight,
    letterSpacing: LetterSpacing.tight,
  },

  welcomeSubtitle: {
    fontFamily: FontFamily.regular,
    fontSize: FontSize.base,
    lineHeight: FontSize.base * LineHeight.relaxed,
    letterSpacing: LetterSpacing.normal,
  },
} as const;

/**
 * Component-specific typography configurations
 */
export const ComponentTypography = {
  // Auth screens
  auth: {
    title: TextStyles.h1,
    subtitle: TextStyles.body,
    input: TextStyles.input,
    button: TextStyles.button,
    link: TextStyles.link,
    error: TextStyles.errorMessage,
  },

  // Home/Meal cards
  mealCard: {
    name: TextStyles.cardTitle,
    description: TextStyles.cardSubtitle,
    price: TextStyles.price,
    chef: TextStyles.bodySmall,
    rating: TextStyles.caption,
  },

  // Navigation
  navigation: {
    screenTitle: TextStyles.screenTitle,
    tabLabel: TextStyles.tabLabel,
    headerTitle: TextStyles.h3,
  },

  // Forms
  form: {
    label: TextStyles.inputLabel,
    input: TextStyles.input,
    placeholder: TextStyles.placeholder,
    helper: TextStyles.caption,
    error: TextStyles.errorMessage,
  },

  // Lists
  list: {
    title: TextStyles.bodyBold,
    subtitle: TextStyles.bodySmall,
    caption: TextStyles.caption,
  },
} as const;

// Type exports
export type FontFamilyKey = keyof typeof FontFamily;
export type FontSizeKey = keyof typeof FontSize;
export type TextStyleKey = keyof typeof TextStyles;

// Default export
export default {
  FontFamily,
  FontSize,
  FontWeight,
  LineHeight,
  LetterSpacing,
  TextStyles,
  ComponentTypography,
};

export const Typography = FontFamily;
