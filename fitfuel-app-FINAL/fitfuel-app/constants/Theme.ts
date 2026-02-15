/**
 * Theme - MyFitness Meals Unified Design System
 * 
 * Complete theme object combining colors, spacing, and typography
 * Import this for a unified theme experience
 * 
 * Usage:
 * import { Theme } from '@/constants';
 * 
 * <Text style={{ color: Theme.colors.primary }}>Hello</Text>
 */

import { Colors, SemanticColors, colorWithOpacity } from './Colors';
import {
  Spacing,
  Padding,
  Margin,
  BorderRadius,
  getSpacing,
  responsiveSpacing
} from './Spacing';
import {
  FontFamily,
  FontSize,
  FontWeight,
  LineHeight,
  LetterSpacing,
  TextStyles,
  ComponentTypography
} from './Typography';

/**
 * Unified Theme Object
 * Single source of truth for all design system values
 */
export const Theme = {
  // Color system
  colors: Colors,
  semanticColors: SemanticColors,

  // Spacing system
  spacing: Spacing,
  padding: Padding,
  margin: Margin,
  borderRadius: BorderRadius,

  // Typography system
  fonts: FontFamily,
  fontSizes: FontSize,
  fontWeights: FontWeight,
  lineHeights: LineHeight,
  letterSpacing: LetterSpacing,
  textStyles: TextStyles,
  componentTypography: ComponentTypography,

  // Helper functions
  helpers: {
    colorWithOpacity,
    getSpacing,
    responsiveSpacing,
  },

  // Shadow presets (for elevation)
  shadows: {
    none: {
      shadowColor: 'transparent',
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0,
      shadowRadius: 0,
      elevation: 0,
    },
    xs: {
      shadowColor: Colors.shadow,
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.1,
      shadowRadius: 2,
      elevation: 1,
    },
    sm: {
      shadowColor: Colors.shadow,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 2,
    },
    md: {
      shadowColor: Colors.shadow,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 4,
    },
    lg: {
      shadowColor: Colors.shadow,
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.15,
      shadowRadius: 16,
      elevation: 8,
    },
    xl: {
      shadowColor: Colors.shadowDark,
      shadowOffset: { width: 0, height: 12 },
      shadowOpacity: 0.2,
      shadowRadius: 24,
      elevation: 12,
    },
  },

  // Common button styles
  buttonStyles: {
    primary: {
      backgroundColor: Colors.primary,
      borderRadius: BorderRadius.md,
      paddingVertical: Spacing.button.paddingVertical,
      paddingHorizontal: Spacing.button.paddingHorizontal,
      minHeight: Spacing.button.minHeight,
    },
    secondary: {
      backgroundColor: Colors.buttonSecondary,
      borderRadius: BorderRadius.md,
      paddingVertical: Spacing.button.paddingVertical,
      paddingHorizontal: Spacing.button.paddingHorizontal,
      minHeight: Spacing.button.minHeight,
      borderWidth: 1,
      borderColor: Colors.border,
    },
    outline: {
      backgroundColor: 'transparent',
      borderRadius: BorderRadius.md,
      paddingVertical: Spacing.button.paddingVertical,
      paddingHorizontal: Spacing.button.paddingHorizontal,
      minHeight: Spacing.button.minHeight,
      borderWidth: 1,
      borderColor: Colors.primary,
    },
    disabled: {
      backgroundColor: Colors.buttonDisabled,
      borderRadius: BorderRadius.md,
      paddingVertical: Spacing.button.paddingVertical,
      paddingHorizontal: Spacing.button.paddingHorizontal,
      minHeight: Spacing.button.minHeight,
    },
  },

  // Common input styles
  inputStyles: {
    default: {
      backgroundColor: Colors.inputBackground,
      borderRadius: BorderRadius.sm,
      paddingVertical: Spacing.input.paddingVertical,
      paddingHorizontal: Spacing.input.paddingHorizontal,
      minHeight: Spacing.input.minHeight,
      borderWidth: 1,
      borderColor: Colors.inputBorder,
      fontSize: FontSize.base,
      fontFamily: FontFamily.regular,
      color: Colors.text,
    },
    focused: {
      borderColor: Colors.inputFocus,
      backgroundColor: Colors.background,
    },
    error: {
      borderColor: Colors.inputError,
    },
    disabled: {
      backgroundColor: Colors.inputDisabled,
      color: Colors.textLight,
    },
  },

  // Common card styles
  cardStyles: {
    default: {
      backgroundColor: Colors.card,
      borderRadius: BorderRadius.md,
      padding: Spacing.card.padding,
      marginHorizontal: Spacing.card.margin,
      marginBottom: Spacing.card.margin,
    },
    elevated: {
      backgroundColor: Colors.cardElevated,
      borderRadius: BorderRadius.md,
      padding: Spacing.card.padding,
      marginHorizontal: Spacing.card.margin,
      marginBottom: Spacing.card.margin,
      shadowColor: Colors.shadow,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 2,
    },
    outlined: {
      backgroundColor: Colors.card,
      borderRadius: BorderRadius.md,
      padding: Spacing.card.padding,
      marginHorizontal: Spacing.card.margin,
      marginBottom: Spacing.card.margin,
      borderWidth: 1,
      borderColor: Colors.border,
    },
  },

  // Common container styles
  containerStyles: {
    screen: {
      flex: 1,
      backgroundColor: Colors.background,
    },
    scrollView: {
      flex: 1,
      backgroundColor: Colors.background,
    },
    centered: {
      flex: 1,
      backgroundColor: Colors.background,
      justifyContent: 'center' as const,
      alignItems: 'center' as const,
      paddingHorizontal: Spacing.screenPadding,
    },
    safeArea: {
      flex: 1,
      backgroundColor: Colors.background,
    },
  },

  // Animation timing
  animation: {
    fast: 150,
    normal: 250,
    slow: 350,
  },

  // Common transitions
  transitions: {
    easeInOut: 'ease-in-out',
    easeIn: 'ease-in',
    easeOut: 'ease-out',
    linear: 'linear',
  },

  // Screen dimensions (will be calculated at runtime)
  dimensions: {
    fullWidth: 0,   // Set by app at runtime
    fullHeight: 0,  // Set by app at runtime
  },
} as const;

// Type for the theme
export type ThemeType = typeof Theme;

// Export as default
export default Theme;
