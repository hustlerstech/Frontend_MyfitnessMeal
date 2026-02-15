/**
 * SectionHeader Component
 * 
 * Header for content sections with optional action button
 * Used to organize and label different sections of content
 * 
 * Features:
 * - Main title text
 * - Optional subtitle
 * - Optional action button (e.g., "View All")
 * - Customizable spacing
 * - Consistent typography
 */

import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { Theme } from '../../constants';

export interface SectionHeaderProps {
  /** Section title */
  title: string;
  
  /** Optional subtitle/description */
  subtitle?: string;
  
  /** Optional action button text (e.g., "View All") */
  actionText?: string;
  
  /** Action button press handler */
  onActionPress?: () => void;
  
  /** Custom title style */
  titleStyle?: TextStyle;
  
  /** Custom subtitle style */
  subtitleStyle?: TextStyle;
  
  /** Custom container style */
  style?: ViewStyle;
  
  /** Test ID for testing */
  testID?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  subtitle,
  actionText,
  onActionPress,
  titleStyle,
  subtitleStyle,
  style,
  testID,
}) => {
  return (
    <View style={[styles.container, style]} testID={testID}>
      <View style={styles.textContainer}>
        <Text style={[styles.title, titleStyle]}>
          {title}
        </Text>
        {subtitle && (
          <Text style={[styles.subtitle, subtitleStyle]}>
            {subtitle}
          </Text>
        )}
      </View>
      
      {actionText && onActionPress && (
        <TouchableOpacity
          onPress={onActionPress}
          activeOpacity={0.7}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          accessibilityRole="button"
          accessibilityLabel={actionText}
        >
          <Text style={styles.actionText}>{actionText}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Theme.spacing.screenPadding,
    paddingVertical: Theme.spacing.md,
    marginBottom: Theme.spacing.sm,
  },
  textContainer: {
    flex: 1,
    marginRight: Theme.spacing.md,
  },
  title: {
    ...Theme.textStyles.sectionHeader,
    color: Theme.colors.text,
    marginBottom: Theme.spacing.xs,
  },
  subtitle: {
    ...Theme.textStyles.bodySmall,
    color: Theme.colors.textSecondary,
  },
  actionText: {
    ...Theme.textStyles.link,
    color: Theme.colors.primary,
    textDecorationLine: 'none', // Override default link underline
  },
});

export default SectionHeader;
