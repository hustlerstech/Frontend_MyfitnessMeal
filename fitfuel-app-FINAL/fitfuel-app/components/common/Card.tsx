/**
 * Card Component
 * 
 * Versatile card container with modern rounded design
 * Used for displaying content in organized, elevated sections
 * 
 * Features:
 * - Optional shadow/elevation
 * - Border variant
 * - Pressable variant
 * - Customizable padding
 * - Flexible content layout
 */

import React from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  ViewStyle,
} from 'react-native';
import { Theme } from '../../constants';

export interface CardProps {
  /** Card content */
  children: React.ReactNode;
  
  /** Add elevation shadow */
  elevated?: boolean;
  
  /** Add border instead of shadow */
  outlined?: boolean;
  
  /** Make card pressable */
  onPress?: () => void;
  
  /** Custom padding (overrides default) */
  padding?: number;
  
  /** Custom margin (overrides default) */
  margin?: number;
  
  /** Custom style */
  style?: ViewStyle;
  
  /** Test ID for testing */
  testID?: string;
}

export const Card: React.FC<CardProps> = ({
  children,
  elevated = false,
  outlined = false,
  onPress,
  padding,
  margin,
  style,
  testID,
}) => {
  const cardStyle = [
    styles.card,
    elevated && styles.elevated,
    outlined && styles.outlined,
    padding !== undefined && { padding },
    margin !== undefined && { margin },
    style,
  ];

  // If onPress is provided, use TouchableOpacity
  if (onPress) {
    return (
      <TouchableOpacity
        style={cardStyle}
        onPress={onPress}
        activeOpacity={0.7}
        testID={testID}
        accessibilityRole="button"
      >
        {children}
      </TouchableOpacity>
    );
  }

  // Otherwise, use regular View
  return (
    <View style={cardStyle} testID={testID}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Theme.colors.card,
    borderRadius: Theme.borderRadius.md,
    padding: Theme.spacing.card.padding,
    marginHorizontal: Theme.spacing.card.margin,
    marginBottom: Theme.spacing.card.margin,
  },
  elevated: {
    ...Theme.shadows.md,
  },
  outlined: {
    borderWidth: 1,
    borderColor: Theme.colors.border,
  },
});

export default Card;
