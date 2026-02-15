/**
 * SecondaryButton Component
 * 
 * Secondary action button with light grey background and border
 * Used for less prominent actions or alternative options
 * 
 * Features:
 * - Loading state with spinner
 * - Disabled state
 * - Custom icon support
 * - Press animations
 * - Border variant option
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

export interface SecondaryButtonProps {
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
  
  /** Outline variant (transparent bg with border) */
  outline?: boolean;
  
  /** Custom style for button container */
  style?: ViewStyle;
  
  /** Custom style for button text */
  textStyle?: TextStyle;
  
  /** Optional icon component (placed before text) */
  icon?: React.ReactNode;
  
  /** Test ID for testing */
  testID?: string;
}

export const SecondaryButton: React.FC<SecondaryButtonProps> = ({
  title,
  onPress,
  loading = false,
  disabled = false,
  fullWidth = true,
  outline = false,
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
        outline ? styles.outline : styles.filled,
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
          color={outline ? Theme.colors.primary : Theme.colors.text} 
          size="small"
        />
      ) : (
        <View style={styles.content}>
          {icon && <View style={styles.icon}>{icon}</View>}
          <Text 
            style={[
              styles.text,
              outline && styles.outlineText,
              isDisabled && styles.disabledText,
              textStyle,
            ]}
          >
            {title}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: Theme.borderRadius.md,
    paddingVertical: Theme.spacing.button.paddingVertical,
    paddingHorizontal: Theme.spacing.button.paddingHorizontal,
    minHeight: Theme.spacing.button.minHeight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  filled: {
    backgroundColor: Theme.colors.buttonSecondary,
    borderWidth: 1,
    borderColor: Theme.colors.border,
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: Theme.colors.primary,
  },
  fullWidth: {
    width: '100%',
  },
  disabled: {
    backgroundColor: Theme.colors.buttonDisabled,
    borderColor: Theme.colors.buttonDisabled,
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
    color: Theme.colors.text,
  },
  outlineText: {
    color: Theme.colors.primary,
  },
  disabledText: {
    color: Theme.colors.buttonTextDisabled,
  },
});

export default SecondaryButton;
