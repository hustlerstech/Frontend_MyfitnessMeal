/**
 * OTPInput Component
 * 
 * 6-digit OTP input with auto-focus and auto-advance
 * Used in authentication flow for phone verification
 * 
 * Features:
 * - 6 individual input boxes
 * - Auto-focus on first box
 * - Auto-advance to next box
 * - Auto-submit when complete
 * - Backspace handling
 * - Error state
 * - Paste support
 */

import React, { useRef, useState, useEffect } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  ViewStyle,
} from 'react-native';
import { Theme } from '../../constants';

export interface OTPInputProps {
  /** Current OTP value */
  value: string;
  
  /** Change handler - receives full 6-digit OTP */
  onChange: (otp: string) => void;
  
  /** Called when all 6 digits are entered */
  onComplete?: (otp: string) => void;
  
  /** Error state */
  error?: boolean;
  
  /** Number of digits */
  length?: number;
  
  /** Disabled state */
  disabled?: boolean;
  
  /** Custom container style */
  style?: ViewStyle;
  
  /** Test ID */
  testID?: string;
}

export const OTPInput: React.FC<OTPInputProps> = ({
  value,
  onChange,
  onComplete,
  error = false,
  length = 6,
  disabled = false,
  style,
  testID,
}) => {
  const inputRefs = useRef<Array<TextInput | null>>([]);
  const [otp, setOtp] = useState<string[]>(Array(length).fill(''));

  // Update internal state when value prop changes
  useEffect(() => {
    if (value.length <= length) {
      const newOtp = value.split('');
      while (newOtp.length < length) {
        newOtp.push('');
      }
      setOtp(newOtp);
    }
  }, [value, length]);

  // Focus first input on mount
  useEffect(() => {
    if (inputRefs.current[0] && !disabled) {
      inputRefs.current[0].focus();
    }
  }, [disabled]);

  const handleChange = (text: string, index: number) => {
    // Only allow single digit
    const digit = text.slice(-1);
    
    if (!/^\d*$/.test(digit)) {
      return; // Only numbers allowed
    }

    const newOtp = [...otp];
    newOtp[index] = digit;
    setOtp(newOtp);

    // Update parent
    const otpString = newOtp.join('');
    onChange(otpString);

    // Auto-advance to next input
    if (digit && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }

    // Call onComplete if all digits filled
    if (otpString.length === length && onComplete) {
      onComplete(otpString);
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    // Handle backspace
    if (e.nativeEvent.key === 'Backspace') {
      if (!otp[index] && index > 0) {
        // If current box is empty, go to previous box
        inputRefs.current[index - 1]?.focus();
      }
    }
  };

  const handlePaste = (text: string) => {
    // Handle paste - extract digits only
    const digits = text.replace(/\D/g, '').slice(0, length);
    const newOtp = Array(length).fill('');
    
    digits.split('').forEach((digit, index) => {
      if (index < length) {
        newOtp[index] = digit;
      }
    });
    
    setOtp(newOtp);
    const otpString = newOtp.join('');
    onChange(otpString);

    // Focus last filled input or first empty
    const lastFilledIndex = digits.length - 1;
    if (lastFilledIndex < length - 1) {
      inputRefs.current[lastFilledIndex + 1]?.focus();
    }

    // Call onComplete if full
    if (otpString.length === length && onComplete) {
      onComplete(otpString);
    }
  };

  return (
    <View style={[styles.container, style]} testID={testID}>
      {Array(length)
        .fill(0)
        .map((_, index) => (
          <TextInput
            key={index}
            ref={(ref) => { inputRefs.current[index] = ref; }}
            style={[
              styles.input,
              otp[index] && styles.inputFilled,
              error && styles.inputError,
              disabled && styles.inputDisabled,
            ]}
            value={otp[index]}
            onChangeText={(text) => handleChange(text, index)}
            onKeyPress={(e) => handleKeyPress(e, index)}
            keyboardType="number-pad"
            maxLength={1}
            selectTextOnFocus
            editable={!disabled}
            accessibilityLabel={`OTP digit ${index + 1}`}
            testID={`otp-input-${index}`}
          />
        ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: Theme.spacing.otp.boxGap,
  },
  input: {
    width: Theme.spacing.otp.boxSize,
    height: Theme.spacing.otp.boxSize,
    borderRadius: Theme.spacing.otp.boxBorderRadius,
    backgroundColor: Theme.colors.inputBackground,
    borderWidth: 1,
    borderColor: Theme.colors.inputBorder,
    ...Theme.textStyles.otpDigit,
    color: Theme.colors.text,
    textAlign: 'center',
  },
  inputFilled: {
    backgroundColor: Theme.colors.background,
    borderColor: Theme.colors.primary,
  },
  inputError: {
    borderColor: Theme.colors.error,
  },
  inputDisabled: {
    backgroundColor: Theme.colors.inputDisabled,
    opacity: 0.6,
  },
});

export default OTPInput;
