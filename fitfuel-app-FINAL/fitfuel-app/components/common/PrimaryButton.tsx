/**
 * PrimaryButton Component — Premium Edition
 *
 * LinearGradient fill instead of flat green.
 * All props and behaviour are unchanged.
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
import { LinearGradient } from 'expo-linear-gradient';
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
        styles.wrapper,
        fullWidth && styles.fullWidth,
        isDisabled && styles.wrapperDisabled,
        style,
      ]}
      onPress={onPress}
      disabled={isDisabled}
      activeOpacity={0.85}
      testID={testID}
      accessibilityRole="button"
      accessibilityState={{ disabled: isDisabled }}
      accessibilityLabel={title}
    >
      {isDisabled ? (
        /* Flat grey when disabled — no gradient */
        <View style={[styles.inner, styles.innerDisabled]}>
          {loading && (
            <ActivityIndicator
              color="#ffffff"
              size="small"
              style={{ marginRight: 8 }}
            />
          )}
          <View style={styles.content}>
            {icon && <View style={styles.icon}>{icon}</View>}
            <Text style={[styles.text, styles.textDisabled, textStyle]}>
              {title}
            </Text>
          </View>
        </View>
      ) : (
        /* Gradient when active */
        <LinearGradient
          colors={['#2bee75', '#22c669', '#1db85d']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.inner}
        >
          <View style={styles.content}>
            {icon && <View style={styles.icon}>{icon}</View>}
            <Text style={[styles.text, textStyle]}>{title}</Text>
          </View>
        </LinearGradient>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    borderRadius: Theme.borderRadius.md,
    overflow: 'hidden',
    // Green glow shadow
    shadowColor: '#2bee75',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 12,
    elevation: 6,
  },
  fullWidth: {
    alignSelf: 'stretch',
  },
  wrapperDisabled: {
    shadowOpacity: 0,
    elevation: 0,
  },
  inner: {
    paddingVertical: Theme.spacing.button.paddingVertical,
    paddingHorizontal: Theme.spacing.button.paddingHorizontal,
    minHeight: Theme.spacing.button.minHeight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerDisabled: {
    backgroundColor: Theme.colors.buttonDisabled,
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
    color: '#0a1a0d', // dark text on bright green
  },
  textDisabled: {
    color: 'rgba(255,255,255,0.5)',
  },
});

export default PrimaryButton;
