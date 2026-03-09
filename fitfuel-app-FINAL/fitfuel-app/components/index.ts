/**
 * Components - Main Export
 * 
 * Central export point for all components
 * Import from '@/components'
 */

// Export all common components
export * from './common';

// Export all auth components
export * from './auth';

// Export all meal components
export * from './meal';

// Export all tracking components
export * from './tracking';

// Re-export common components for convenience
export { 
  PrimaryButton,
  SecondaryButton,
  Card,
  SectionHeader,
  StatCard,
  InputField,
} from './common';

// Re-export auth components
export {
  OTPInput,
  BackButton,
} from './auth';

// Re-export meal components
export {
  MealCard,
  CaloriesChart,
} from './meal';

// Re-export tracking components
export {
  CircularProgress,
} from './tracking';

// Export types
export type {
  PrimaryButtonProps,
  SecondaryButtonProps,
  CardProps,
  SectionHeaderProps,
  StatCardProps,
  InputFieldProps,
} from './common';

export type {
  OTPInputProps,
  BackButtonProps,
} from './auth';

export type {
  MealCardProps,
  CaloriesChartProps,
} from './meal';

export type {
  CircularProgressProps,
} from './tracking';
