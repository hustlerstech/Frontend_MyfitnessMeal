/**
 * CaloriesChart Component
 * 
 * Visual chart showing calorie consumption
 * Placeholder for actual chart implementation
 * 
 * Features:
 * - Weekly calorie bars
 * - Current day highlight
 * - Goal line indicator
 * - Simple bar chart visualization
 */

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ViewStyle,
} from 'react-native';
import { Theme } from '../../constants';

export interface CaloriesChartProps {
  /** Daily calorie data (7 days) */
  data?: number[];
  
  /** Calorie goal */
  goal?: number;
  
  /** Current day index (0-6) */
  currentDay?: number;
  
  /** Custom style */
  style?: ViewStyle;
}

export const CaloriesChart: React.FC<CaloriesChartProps> = ({
  data = [1800, 2100, 1950, 2200, 1850, 2000, 1900],
  goal = 2000,
  currentDay = 6,
  style,
}) => {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const maxCalories = Math.max(...data, goal);

  return (
    <View style={[styles.container, style]}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Weekly Calories</Text>
        <View style={styles.goalIndicator}>
          <View style={styles.goalDot} />
          <Text style={styles.goalText}>Goal: {goal} cal</Text>
        </View>
      </View>

      {/* Chart */}
      <View style={styles.chart}>
        {data.map((calories, index) => {
          const heightPercentage = (calories / maxCalories) * 100;
          const goalHeightPercentage = (goal / maxCalories) * 100;
          const isCurrentDay = index === currentDay;
          const isAboveGoal = calories > goal;

          return (
            <View key={index} style={styles.barContainer}>
              {/* Bar */}
              <View style={styles.barWrapper}>
                {/* Goal line */}
                <View
                  style={[
                    styles.goalLine,
                    { bottom: `${goalHeightPercentage}%` },
                  ]}
                />
                
                {/* Calorie bar */}
                <View
                  style={[
                    styles.bar,
                    {
                      height: `${heightPercentage}%`,
                      backgroundColor: isCurrentDay
                        ? Theme.colors.primary
                        : isAboveGoal
                        ? Theme.colors.error + '40'
                        : Theme.colors.primary + '40',
                    },
                  ]}
                />
              </View>

              {/* Day label */}
              <Text
                style={[
                  styles.dayLabel,
                  isCurrentDay && styles.currentDayLabel,
                ]}
              >
                {days[index]}
              </Text>

              {/* Calorie value */}
              {isCurrentDay && (
                <Text style={styles.calorieValue}>{calories}</Text>
              )}
            </View>
          );
        })}
      </View>

      {/* Summary */}
      <View style={styles.summary}>
        <SummaryItem label="Avg" value={Math.round(data.reduce((a, b) => a + b, 0) / data.length)} />
        <SummaryItem label="Today" value={data[currentDay]} highlight />
        <SummaryItem label="Remaining" value={Math.max(0, goal - data[currentDay])} />
      </View>
    </View>
  );
};

// Summary Item Component
interface SummaryItemProps {
  label: string;
  value: number;
  highlight?: boolean;
}

const SummaryItem: React.FC<SummaryItemProps> = ({ label, value, highlight }) => (
  <View style={styles.summaryItem}>
    <Text style={styles.summaryLabel}>{label}</Text>
    <Text style={[styles.summaryValue, highlight && styles.summaryValueHighlight]}>
      {value}
    </Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: Theme.colors.card,
    borderRadius: Theme.borderRadius.md,
    padding: Theme.spacing.md,
    ...Theme.shadows.sm,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Theme.spacing.lg,
  },
  title: {
    ...Theme.textStyles.h4,
    color: Theme.colors.text,
  },
  goalIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Theme.spacing.xs,
  },
  goalDot: {
    width: 8,
    height: 8,
    borderRadius: Theme.borderRadius.full,
    backgroundColor: Theme.colors.primary,
  },
  goalText: {
    ...Theme.textStyles.caption,
    color: Theme.colors.textSecondary,
  },
  chart: {
    flexDirection: 'row',
    height: 120,
    gap: Theme.spacing.xs,
    marginBottom: Theme.spacing.lg,
  },
  barContainer: {
    flex: 1,
    alignItems: 'center',
  },
  barWrapper: {
    flex: 1,
    width: '100%',
    position: 'relative',
    justifyContent: 'flex-end',
  },
  bar: {
    width: '100%',
    borderRadius: Theme.borderRadius.xs,
    minHeight: 4,
  },
  goalLine: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: Theme.colors.primary,
    borderStyle: 'dashed',
  },
  dayLabel: {
    ...Theme.textStyles.caption,
    color: Theme.colors.textSecondary,
    marginTop: Theme.spacing.xs,
  },
  currentDayLabel: {
    color: Theme.colors.primary,
    fontWeight: '600',
  },
  calorieValue: {
    ...Theme.textStyles.caption,
    color: Theme.colors.primary,
    fontWeight: '600',
    marginTop: Theme.spacing.xs,
  },
  summary: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: Theme.spacing.md,
    borderTopWidth: 1,
    borderTopColor: Theme.colors.borderLight,
  },
  summaryItem: {
    alignItems: 'center',
  },
  summaryLabel: {
    ...Theme.textStyles.caption,
    color: Theme.colors.textSecondary,
    marginBottom: Theme.spacing.xs,
  },
  summaryValue: {
    ...Theme.textStyles.bodyBold,
    color: Theme.colors.text,
  },
  summaryValueHighlight: {
    color: Theme.colors.primary,
  },
});

export default CaloriesChart;
