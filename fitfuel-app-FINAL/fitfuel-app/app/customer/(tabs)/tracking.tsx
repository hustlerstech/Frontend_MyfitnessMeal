/**
 * TrackingScreen (Tab)
 * 
 * Track meals, nutrition, and fitness progress
 * Features:
 * - Daily calorie progress circle
 * - Weekly calorie graph
 * - Activity summary cards
 * - Macro breakdown
 * - Meal log
 * 
 * UI only - no backend integration yet
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {
  SectionHeader,
  StatCard,
  CaloriesChart,
  CircularProgress
} from '../../../components';
import { Theme } from '../../../constants';

// Mock data
const TODAY_DATA = {
  date: new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric'
  }),
  calories: {
    current: 1900,
    goal: 2000,
  },
  macros: {
    protein: { current: 85, goal: 100 },
    carbs: { current: 180, goal: 200 },
    fats: { current: 45, goal: 55 },
  },
  water: {
    current: 6,
    goal: 8,
  },
  steps: {
    current: 8432,
    goal: 10000,
  },
};

const ACTIVITY_SUMMARY = [
  {
    id: '1',
    icon: '🔥',
    label: 'Calories Burned',
    value: '420',
    unit: 'cal',
    color: Theme.colors.error,
  },
  {
    id: '2',
    icon: '🚶',
    label: 'Steps Today',
    value: '8,432',
    unit: '',
    color: Theme.colors.primary,
  },
  {
    id: '3',
    icon: '💧',
    label: 'Water Intake',
    value: '6/8',
    unit: 'glasses',
    color: Theme.colors.info,
  },
  {
    id: '4',
    icon: '⏱️',
    label: 'Active Time',
    value: '45',
    unit: 'min',
    color: Theme.colors.warning,
  },
];

const MEAL_LOG = [
  {
    id: '1',
    time: '8:30 AM',
    meal: 'Breakfast',
    name: 'Oatmeal with Berries',
    calories: 350,
  },
  {
    id: '2',
    time: '12:45 PM',
    meal: 'Lunch',
    name: 'Grilled Chicken Salad',
    calories: 520,
  },
  {
    id: '3',
    time: '4:00 PM',
    meal: 'Snack',
    name: 'Protein Shake',
    calories: 180,
  },
  {
    id: '4',
    time: '7:30 PM',
    meal: 'Dinner',
    name: 'Salmon with Quinoa',
    calories: 580,
  },
];

export default function TrackingScreen() {
  const [selectedTab, setSelectedTab] = useState<'day' | 'week' | 'month'>('day');

  const caloriePercentage = Math.round(
    (TODAY_DATA.calories.current / TODAY_DATA.calories.goal) * 100
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.title}>Tracking</Text>
            <Text style={styles.date}>{TODAY_DATA.date}</Text>
          </View>

          {/* Period Selector */}
          <View style={styles.periodSelector}>
            <PeriodTab
              label="Day"
              isActive={selectedTab === 'day'}
              onPress={() => setSelectedTab('day')}
            />
            <PeriodTab
              label="Week"
              isActive={selectedTab === 'week'}
              onPress={() => setSelectedTab('week')}
            />
            <PeriodTab
              label="Month"
              isActive={selectedTab === 'month'}
              onPress={() => setSelectedTab('month')}
            />
          </View>
        </View>

        {/* Daily Calorie Progress Circle */}
        <View style={styles.progressSection}>
          <CircularProgress
            current={TODAY_DATA.calories.current}
            goal={TODAY_DATA.calories.goal}
            size={220}
            strokeWidth={22}
            color={
              caloriePercentage > 100
                ? Theme.colors.error
                : Theme.colors.primary
            }
            unit="cal"
            label={
              caloriePercentage > 100
                ? 'Over goal'
                : `${TODAY_DATA.calories.goal - TODAY_DATA.calories.current} cal remaining`
            }
          />
        </View>

        {/* Macro Progress Bars */}
        <View style={styles.macrosSection}>
          <Text style={styles.sectionTitle}>Macros Today</Text>

          <MacroProgress
            label="Protein"
            current={TODAY_DATA.macros.protein.current}
            goal={TODAY_DATA.macros.protein.goal}
            color={Theme.colors.protein}
            unit="g"
          />

          <MacroProgress
            label="Carbs"
            current={TODAY_DATA.macros.carbs.current}
            goal={TODAY_DATA.macros.carbs.goal}
            color={Theme.colors.carbs}
            unit="g"
          />

          <MacroProgress
            label="Fats"
            current={TODAY_DATA.macros.fats.current}
            goal={TODAY_DATA.macros.fats.goal}
            color={Theme.colors.fats}
            unit="g"
          />
        </View>

        {/* Weekly Graph */}
        <View style={styles.weeklySection}>
          <SectionHeader
            title="Weekly Overview"
            actionText="Details"
            onActionPress={() => console.log('View details')}
            style={styles.sectionHeader}
          />
          <CaloriesChart />
        </View>

        {/* Activity Summary */}
        <View style={styles.activitySection}>
          <Text style={styles.sectionTitle}>Activity Summary</Text>
          <View style={styles.activityGrid}>
            {ACTIVITY_SUMMARY.map((item) => (
              <View key={item.id} style={styles.activityCard}>
                <Text style={styles.activityIcon}>{item.icon}</Text>
                <Text style={styles.activityLabel}>{item.label}</Text>
                <Text style={[styles.activityValue, { color: item.color }]}>
                  {item.value}
                  {item.unit && (
                    <Text style={styles.activityUnit}> {item.unit}</Text>
                  )}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* Meal Log */}
        <View style={styles.mealLogSection}>
          <SectionHeader
            title="Today's Meals"
            actionText="Add Meal"
            onActionPress={() => console.log('Add meal')}
            style={styles.sectionHeader}
          />

          {MEAL_LOG.map((meal) => (
            <View key={meal.id} style={styles.mealLogCard}>
              <View style={styles.mealLogLeft}>
                <Text style={styles.mealLogTime}>{meal.time}</Text>
                <Text style={styles.mealLogType}>{meal.meal}</Text>
              </View>
              <View style={styles.mealLogCenter}>
                <Text style={styles.mealLogName}>{meal.name}</Text>
                <Text style={styles.mealLogCalories}>{meal.calories} cal</Text>
              </View>
              <TouchableOpacity style={styles.mealLogButton}>
                <Text style={styles.mealLogButtonText}>→</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>

        {/* Bottom Spacing */}
        <View style={styles.bottomSpacing} />
      </ScrollView>
    </SafeAreaView>
  );
}

// Period Tab Component
interface PeriodTabProps {
  label: string;
  isActive: boolean;
  onPress: () => void;
}

const PeriodTab: React.FC<PeriodTabProps> = ({ label, isActive, onPress }) => (
  <TouchableOpacity
    style={[styles.periodTab, isActive && styles.periodTabActive]}
    onPress={onPress}
    activeOpacity={0.7}
  >
    <Text style={[styles.periodTabText, isActive && styles.periodTabTextActive]}>
      {label}
    </Text>
  </TouchableOpacity>
);

// Macro Progress Bar Component
interface MacroProgressProps {
  label: string;
  current: number;
  goal: number;
  color: string;
  unit: string;
}

const MacroProgress: React.FC<MacroProgressProps> = ({
  label,
  current,
  goal,
  color,
  unit,
}) => {
  const percentage = Math.min((current / goal) * 100, 100);

  return (
    <View style={styles.macroProgressContainer}>
      <View style={styles.macroProgressHeader}>
        <Text style={styles.macroLabel}>{label}</Text>
        <Text style={styles.macroValues}>
          {current}{unit} / {goal}{unit}
        </Text>
      </View>
      <View style={styles.progressBarContainer}>
        <View
          style={[
            styles.progressBarFill,
            { width: `${percentage}%`, backgroundColor: color },
          ]}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.background,
  },
  scrollView: {
    flex: 1,
  },
  header: {
    paddingHorizontal: Theme.spacing.screenPadding,
    paddingTop: Theme.spacing.md,
    paddingBottom: Theme.spacing.lg,
  },
  title: {
    ...Theme.textStyles.h2,
    color: Theme.colors.text,
    marginBottom: Theme.spacing.xs,
  },
  date: {
    ...Theme.textStyles.body,
    color: Theme.colors.textSecondary,
    marginBottom: Theme.spacing.md,
  },
  periodSelector: {
    flexDirection: 'row',
    gap: Theme.spacing.sm,
  },
  periodTab: {
    paddingHorizontal: Theme.spacing.md,
    paddingVertical: Theme.spacing.sm,
    borderRadius: Theme.borderRadius.full,
    backgroundColor: Theme.colors.backgroundSecondary,
  },
  periodTabActive: {
    backgroundColor: Theme.colors.primary,
  },
  periodTabText: {
    ...Theme.textStyles.bodySmall,
    color: Theme.colors.textSecondary,
    fontWeight: '500',
  },
  periodTabTextActive: {
    color: Theme.colors.textInverse,
    fontWeight: '600',
  },
  progressSection: {
    alignItems: 'center',
    paddingVertical: Theme.spacing.lg,
    marginBottom: Theme.spacing.lg,
  },
  macrosSection: {
    paddingHorizontal: Theme.spacing.screenPadding,
    marginBottom: Theme.spacing.xl,
  },
  sectionTitle: {
    ...Theme.textStyles.h3,
    color: Theme.colors.text,
    marginBottom: Theme.spacing.md,
  },
  macroProgressContainer: {
    marginBottom: Theme.spacing.md,
  },
  macroProgressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Theme.spacing.xs,
  },
  macroLabel: {
    ...Theme.textStyles.bodyBold,
    color: Theme.colors.text,
  },
  macroValues: {
    ...Theme.textStyles.body,
    color: Theme.colors.textSecondary,
  },
  progressBarContainer: {
    height: 8,
    backgroundColor: Theme.colors.backgroundSecondary,
    borderRadius: Theme.borderRadius.full,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    borderRadius: Theme.borderRadius.full,
  },
  weeklySection: {
    marginBottom: Theme.spacing.xl,
  },
  sectionHeader: {
    paddingHorizontal: Theme.spacing.screenPadding,
    marginBottom: Theme.spacing.md,
  },
  activitySection: {
    paddingHorizontal: Theme.spacing.screenPadding,
    marginBottom: Theme.spacing.xl,
  },
  activityGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Theme.spacing.md,
  },
  activityCard: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: Theme.colors.card,
    padding: Theme.spacing.md,
    borderRadius: Theme.borderRadius.md,
    alignItems: 'center',
    ...Theme.shadows.sm,
  },
  activityIcon: {
    fontSize: 32,
    marginBottom: Theme.spacing.sm,
  },
  activityLabel: {
    ...Theme.textStyles.caption,
    color: Theme.colors.textSecondary,
    textAlign: 'center',
    marginBottom: Theme.spacing.xs,
  },
  activityValue: {
    ...Theme.textStyles.h3,
    fontWeight: '700',
  },
  activityUnit: {
    ...Theme.textStyles.bodySmall,
    fontWeight: '400',
  },
  mealLogSection: {
    marginBottom: Theme.spacing.xl,
  },
  mealLogCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Theme.colors.card,
    marginHorizontal: Theme.spacing.screenPadding,
    marginBottom: Theme.spacing.sm,
    padding: Theme.spacing.md,
    borderRadius: Theme.borderRadius.md,
    ...Theme.shadows.xs,
  },
  mealLogLeft: {
    marginRight: Theme.spacing.md,
  },
  mealLogTime: {
    ...Theme.textStyles.caption,
    color: Theme.colors.textSecondary,
    marginBottom: Theme.spacing.xs,
  },
  mealLogType: {
    ...Theme.textStyles.bodySmall,
    color: Theme.colors.primary,
    fontWeight: '600',
  },
  mealLogCenter: {
    flex: 1,
  },
  mealLogName: {
    ...Theme.textStyles.bodyBold,
    color: Theme.colors.text,
    marginBottom: Theme.spacing.xs,
  },
  mealLogCalories: {
    ...Theme.textStyles.caption,
    color: Theme.colors.textSecondary,
  },
  mealLogButton: {
    width: 32,
    height: 32,
    borderRadius: Theme.borderRadius.full,
    backgroundColor: Theme.colors.backgroundSecondary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mealLogButtonText: {
    fontSize: 18,
    color: Theme.colors.text,
  },
  bottomSpacing: {
    height: Theme.spacing.xxl,
  },
});

