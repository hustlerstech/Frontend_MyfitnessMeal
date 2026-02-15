/**
 * PrimaryButton Component
 * 
 * Main call-to-action button using electric green color
 * Fully integrated with MyFitness Meals design system
 * 
 * Features:
 * - Loading state with spinner
 * - Disabled state
 * - Custom icon support
 * - Press animations
 * - Accessibility compliant
 */

import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
  View,
} from 'react-native';
import { Theme } from '../../constants';

export interface PrimaryButtonProps {
  /** Button text */
  title: string;

  /** Press handler */
  onPress: () => void;

  /** Loading state - shows spinner */
  loading?: boolean;

  /** Disabled state */
  disabled?: boolean;

  /** Full width button */
  fullWidth?: boolean;

  /** Custom style for button container */
  style?: ViewStyle;

  /** Custom style for button text */
  textStyle?: TextStyle;

  /** Optional icon component (placed before text) */
  icon?: React.ReactNode;

  /** Test ID for testing */
  testID?: string;
}

export const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  title,
  onPress,
  loading = false,
  disabled = false,
  fullWidth = true,
  style,
  textStyle,
  icon,
  testID,
}) => {
  const isDisabled = disabled || loading;

  return (
    <TouchableOpacity
      style={[
        styles.button,
        fullWidth && styles.fullWidth,
        isDisabled && styles.disabled,
        style,
      ]}
      onPress={onPress}
      disabled={isDisabled}
      activeOpacity={0.8}
      testID={testID}
      accessibilityRole="button"
      accessibilityState={{ disabled: isDisabled }}
      accessibilityLabel={title}
    >
      {loading ? (
        <ActivityIndicator
          color={Theme.colors.textInverse}
          size="small"
        />
      ) : (
        <View style={styles.content}>
          {icon && <View style={styles.icon}>{icon}</View>}
          <Text style={[styles.text, textStyle]}>
            {title}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: Theme.colors.primary,
    borderRadius: Theme.borderRadius.md,
    paddingVertical: Theme.spacing.button.paddingVertical,
    paddingHorizontal: Theme.spacing.button.paddingHorizontal,
    minHeight: Theme.spacing.button.minHeight,
    justifyContent: 'center',
    alignItems: 'center',
    // Shadow for elevation
    ...Theme.shadows.sm,
  },
  fullWidth: {
    width: '100%',
  },
  disabled: {
    backgroundColor: Theme.colors.buttonDisabled,
    // Remove shadow when disabled
    shadowOpacity: 0,
    elevation: 0,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    marginRight: Theme.spacing.sm,
  },
  text: {
    ...Theme.textStyles.button,
    color: Theme.colors.textInverse,
  },
});

export default PrimaryButton;
