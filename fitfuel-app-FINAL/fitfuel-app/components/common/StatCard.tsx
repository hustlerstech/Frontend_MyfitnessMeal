/**
 * StatCard Component
 * 
 * Display statistical information or key metrics
 * Used for dashboards, profiles, and analytics screens
 * 
 * Features:
 * - Large value display
 * - Label/description
 * - Optional icon
 * - Optional trend indicator
 * - Color-coded option
 * - Pressable variant
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

export interface StatCardProps {
  /** Main value to display (e.g., "1,234" or "85%") */
  value: string | number;
  
  /** Label/description for the stat */
  label: string;
  
  /** Optional icon component */
  icon?: React.ReactNode;
  
  /** Optional trend indicator (e.g., "+12%") */
  trend?: string;
  
  /** Trend direction for coloring */
  trendDirection?: 'up' | 'down' | 'neutral';
  
  /** Custom color for the value */
  valueColor?: string;
  
  /** Make card pressable */
  onPress?: () => void;
  
  /** Custom style */
  style?: ViewStyle;
  
  /** Custom value style */
  valueStyle?: TextStyle;
  
  /** Custom label style */
  labelStyle?: TextStyle;
  
  /** Test ID for testing */
  testID?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  value,
  label,
  icon,
  trend,
  trendDirection = 'neutral',
  valueColor,
  onPress,
  style,
  valueStyle,
  labelStyle,
  testID,
}) => {
  const getTrendColor = () => {
    switch (trendDirection) {
      case 'up':
        return Theme.colors.success;
      case 'down':
        return Theme.colors.error;
      default:
        return Theme.colors.textSecondary;
    }
  };

  const content = (
    <>
      {icon && <View style={styles.iconContainer}>{icon}</View>}
      
      <View style={styles.contentContainer}>
        <Text 
          style={[
            styles.value,
            valueColor && { color: valueColor },
            valueStyle,
          ]}
        >
          {value}
        </Text>
        
        {trend && (
          <Text 
            style={[
              styles.trend,
              { color: getTrendColor() },
            ]}
          >
            {trend}
          </Text>
        )}
      </View>
      
      <Text style={[styles.label, labelStyle]}>
        {label}
      </Text>
    </>
  );

  const cardStyle = [
    styles.card,
    style,
  ];

  if (onPress) {
    return (
      <TouchableOpacity
        style={cardStyle}
        onPress={onPress}
        activeOpacity={0.7}
        testID={testID}
        accessibilityRole="button"
        accessibilityLabel={`${label}: ${value}`}
      >
        {content}
      </TouchableOpacity>
    );
  }

  return (
    <View style={cardStyle} testID={testID}>
      {content}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Theme.colors.card,
    borderRadius: Theme.borderRadius.md,
    padding: Theme.spacing.md,
    ...Theme.shadows.sm,
    minWidth: 120,
  },
  iconContainer: {
    marginBottom: Theme.spacing.sm,
    alignSelf: 'flex-start',
  },
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: Theme.spacing.xs,
  },
  value: {
    ...Theme.textStyles.price,
    color: Theme.colors.text,
  },
  trend: {
    ...Theme.textStyles.caption,
    marginLeft: Theme.spacing.xs,
    fontWeight: '600',
  },
  label: {
    ...Theme.textStyles.caption,
    color: Theme.colors.textSecondary,
  },
});

export default StatCard;
