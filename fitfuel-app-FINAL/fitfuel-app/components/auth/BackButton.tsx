/**
 * BackButton Component
 * 
 * Simple back navigation button with arrow icon
 * Used in screen headers for navigation
 * 
 * Features:
 * - Left arrow icon
 * - Customizable size and color
 * - Proper touch target
 * - Accessibility support
 */

import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ViewStyle,
} from 'react-native';
import { Theme } from '../../constants';

export interface BackButtonProps {
  /** Press handler */
  onPress: () => void;
  
  /** Custom style */
  style?: ViewStyle;
  
  /** Custom color */
  color?: string;
  
  /** Test ID */
  testID?: string;
}

export const BackButton: React.FC<BackButtonProps> = ({
  onPress,
  style,
  color = Theme.colors.text,
  testID,
}) => {
  return (
    <TouchableOpacity
      style={[styles.button, style]}
      onPress={onPress}
      hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
      activeOpacity={0.7}
      accessibilityRole="button"
      accessibilityLabel="Go back"
      testID={testID}
    >
      <Text style={[styles.arrow, { color }]}>←</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  arrow: {
    fontSize: 24,
    fontWeight: '600',
  },
});

export default BackButton;
