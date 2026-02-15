/**
 * CircularProgress Component
 * 
 * Circular progress indicator for displaying calorie/macro progress
 * Shows percentage with animated ring
 * 
 * Features:
 * - Circular SVG progress ring
 * - Percentage display in center
 * - Current/Goal values
 * - Color customization
 * - Size customization
 */

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ViewStyle,
} from 'react-native';
import { Theme } from '../../constants';

export interface CircularProgressProps {
  /** Current value */
  current: number;
  
  /** Goal/target value */
  goal: number;
  
  /** Size of circle */
  size?: number;
  
  /** Stroke width */
  strokeWidth?: number;
  
  /** Progress color */
  color?: string;
  
  /** Background color */
  backgroundColor?: string;
  
  /** Label text */
  label?: string;
  
  /** Unit text (e.g., "cal", "g") */
  unit?: string;
  
  /** Custom style */
  style?: ViewStyle;
}

export const CircularProgress: React.FC<CircularProgressProps> = ({
  current,
  goal,
  size = 200,
  strokeWidth = 20,
  color = Theme.colors.primary,
  backgroundColor = Theme.colors.borderLight,
  label,
  unit = '',
  style,
}) => {
  const percentage = Math.min((current / goal) * 100, 100);
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <View style={[styles.container, { width: size, height: size }, style]}>
      {/* SVG Circle (Placeholder - using View for demo) */}
      <View style={styles.circleContainer}>
        {/* Background Circle */}
        <View
          style={[
            styles.circle,
            {
              width: size,
              height: size,
              borderRadius: size / 2,
              borderWidth: strokeWidth,
              borderColor: backgroundColor,
            },
          ]}
        />
        
        {/* Progress Circle Placeholder */}
        {/* In production, use react-native-svg for actual circular progress */}
        {percentage > 0 && (
          <View
            style={[
              styles.progressOverlay,
              {
                width: size,
                height: size,
                borderRadius: size / 2,
                borderWidth: strokeWidth,
                borderColor: color,
                borderTopColor: backgroundColor,
                borderRightColor: percentage > 25 ? color : backgroundColor,
                borderBottomColor: percentage > 50 ? color : backgroundColor,
                borderLeftColor: percentage > 75 ? color : backgroundColor,
              },
            ]}
          />
        )}

        {/* Center Content */}
        <View style={styles.centerContent}>
          <Text style={styles.percentage}>{Math.round(percentage)}%</Text>
          <Text style={styles.currentValue}>
            {current.toLocaleString()} {unit}
          </Text>
          <Text style={styles.divider}>—</Text>
          <Text style={styles.goalValue}>
            Goal: {goal.toLocaleString()} {unit}
          </Text>
          {label && <Text style={styles.label}>{label}</Text>}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  circleContainer: {
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  circle: {
    position: 'absolute',
  },
  progressOverlay: {
    position: 'absolute',
    transform: [{ rotate: '-90deg' }],
  },
  centerContent: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  percentage: {
    ...Theme.textStyles.displayLarge,
    color: Theme.colors.primary,
    fontWeight: '700',
  },
  currentValue: {
    ...Theme.textStyles.h4,
    color: Theme.colors.text,
    marginTop: Theme.spacing.xs,
  },
  divider: {
    ...Theme.textStyles.body,
    color: Theme.colors.textLight,
    marginVertical: Theme.spacing.xs,
  },
  goalValue: {
    ...Theme.textStyles.caption,
    color: Theme.colors.textSecondary,
  },
  label: {
    ...Theme.textStyles.caption,
    color: Theme.colors.textSecondary,
    marginTop: Theme.spacing.sm,
  },
});

export default CircularProgress;
