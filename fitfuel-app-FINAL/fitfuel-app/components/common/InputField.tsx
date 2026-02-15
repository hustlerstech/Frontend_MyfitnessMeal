/**
 * InputField Component
 * 
 * Reusable text input with validation, error handling, and icons
 * Fully integrated with MyFitness Meals design system
 * 
 * Features:
 * - Label support
 * - Error state with message
 * - Focus state styling
 * - Left/right icon support
 * - Password visibility toggle
 * - Character counter
 * - Multiline support
 * - Customizable keyboard types
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ViewStyle,
  TextStyle,
  TouchableOpacity,
  TextInputProps,
} from 'react-native';
import { Theme } from '../../constants';

export interface InputFieldProps extends Omit<TextInputProps, 'style'> {
  /** Input label */
  label?: string;

  /** Input value */
  value: string;

  /** Change handler */
  onChangeText: (text: string) => void;

  /** Placeholder text */
  placeholder?: string;

  /** Error message (shows error state when provided) */
  error?: string;

  /** Helper text (shown below input) */
  helperText?: string;

  /** Left icon component */
  leftIcon?: React.ReactNode;

  /** Right icon component */
  rightIcon?: React.ReactNode;

  /** Password input (shows toggle visibility icon) */
  secureTextEntry?: boolean;

  /** Show character counter */
  showCharacterCount?: boolean;

  /** Maximum character length */
  maxLength?: number;

  /** Disabled state */
  disabled?: boolean;

  /** Multiline input */
  multiline?: boolean;

  /** Number of lines (for multiline) */
  numberOfLines?: number;

  /** Custom container style */
  containerStyle?: ViewStyle;

  /** Custom input style */
  inputStyle?: TextStyle;

  /** Custom label style */
  labelStyle?: TextStyle;

  /** Test ID for testing */
  testID?: string;
}

export const InputField: React.FC<InputFieldProps> = ({
  label,
  value,
  onChangeText,
  placeholder,
  error,
  helperText,
  leftIcon,
  rightIcon,
  secureTextEntry = false,
  showCharacterCount = false,
  maxLength,
  disabled = false,
  multiline = false,
  numberOfLines = 1,
  containerStyle,
  inputStyle,
  labelStyle,
  testID,
  ...textInputProps
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const hasError = !!error;
  const showPassword = secureTextEntry && !isPasswordVisible;

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <View style={[styles.container, containerStyle]} testID={testID}>
      {/* Label */}
      {label && (
        <Text style={[styles.label, labelStyle]}>
          {label}
        </Text>
      )}

      {/* Input Container */}
      <View
        style={[
          styles.inputContainer,
          isFocused && styles.inputFocused,
          hasError && styles.inputError,
          disabled && styles.inputDisabled,
          multiline && styles.inputMultiline,
        ]}
      >
        {/* Left Icon */}
        {leftIcon && (
          <View style={styles.leftIconContainer}>
            {leftIcon}
          </View>
        )}

        {/* Text Input */}
        <TextInput
          style={[
            styles.input,
            leftIcon && styles.inputWithLeftIcon,
            (rightIcon || secureTextEntry) && styles.inputWithRightIcon,
            multiline && styles.inputMultilineText,
            inputStyle,
          ]}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={Theme.colors.textPlaceholder}
          secureTextEntry={showPassword}
          editable={!disabled}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          maxLength={maxLength}
          multiline={multiline}
          numberOfLines={multiline ? numberOfLines : 1}
          {...textInputProps}
        />

        {/* Right Icon or Password Toggle */}
        {(rightIcon || secureTextEntry) && (
          <View style={styles.rightIconContainer}>
            {secureTextEntry ? (
              <TouchableOpacity
                onPress={togglePasswordVisibility}
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                activeOpacity={0.7}
              >
                <Text style={styles.passwordToggle}>
                  {isPasswordVisible ? '👁️' : '👁️‍🗨️'}
                </Text>
              </TouchableOpacity>
            ) : (
              rightIcon
            )}
          </View>
        )}
      </View>

      {/* Error Message */}
      {hasError && (
        <Text style={styles.errorText}>
          {error}
        </Text>
      )}

      {/* Helper Text or Character Count */}
      {!hasError && (helperText || showCharacterCount) && (
        <View style={styles.helperContainer}>
          {helperText && (
            <Text style={styles.helperText}>
              {helperText}
            </Text>
          )}
          {showCharacterCount && maxLength && (
            <Text style={styles.characterCount}>
              {value.length}/{maxLength}
            </Text>
          )}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: Theme.spacing.input.marginBottom,
  },
  label: {
    ...Theme.textStyles.inputLabel,
    color: Theme.colors.text,
    marginBottom: Theme.spacing.xs,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Theme.colors.inputBackground,
    borderRadius: Theme.borderRadius.sm,
    borderWidth: 1,
    borderColor: Theme.colors.inputBorder,
    paddingHorizontal: Theme.spacing.input.paddingHorizontal,
    minHeight: Theme.spacing.input.minHeight,
  },
  inputFocused: {
    borderColor: Theme.colors.inputFocus,
    backgroundColor: Theme.colors.background,
  },
  inputError: {
    borderColor: Theme.colors.inputError,
  },
  inputDisabled: {
    backgroundColor: Theme.colors.inputDisabled,
    opacity: 0.6,
  },
  inputMultiline: {
    paddingVertical: Theme.spacing.md,
    alignItems: 'flex-start',
  },
  input: {
    flex: 1,
    ...Theme.textStyles.input,
    color: Theme.colors.text,
    paddingVertical: 0, // Remove default padding
  },
  inputWithLeftIcon: {
    marginLeft: Theme.spacing.sm,
  },
  inputWithRightIcon: {
    marginRight: Theme.spacing.sm,
  },
  inputMultilineText: {
    textAlignVertical: 'top',
    paddingTop: Theme.spacing.xs,
  },
  leftIconContainer: {
    marginRight: Theme.spacing.xs,
  },
  rightIconContainer: {
    marginLeft: Theme.spacing.xs,
  },
  passwordToggle: {
    fontSize: Theme.fontSizes.lg,
  },
  errorText: {
    ...Theme.textStyles.errorMessage,
    color: Theme.colors.error,
    marginTop: Theme.spacing.xs,
  },
  helperContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: Theme.spacing.xs,
  },
  helperText: {
    ...Theme.textStyles.caption,
    color: Theme.colors.textSecondary,
    flex: 1,
  },
  characterCount: {
    ...Theme.textStyles.caption,
    color: Theme.colors.textLight,
    marginLeft: Theme.spacing.sm,
  },
});

export default InputField;
