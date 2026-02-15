/**
 * HomeScreen (Tab)
 * 
 * Main dashboard screen with:
 * - Personalized greeting
 * - Calorie tracking chart
 * - Quick stats cards
 * - Recommended meals
 * - Quick actions
 * 
 * UI only - no business logic
 */

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useRouter } from 'expo-router';
import {
  SectionHeader,
  StatCard,
  MealCard,
  CaloriesChart
} from '../../components';
import { Theme } from '../../constants';

export default function HomeScreen() {
  const router = useRouter();

  // Placeholder data - will be replaced with real data
  const userName = 'Tejasvi';
  const todayCalories = 1900;
  const calorieGoal = 2000;
  const todayProtein = 85;
  const todayCarbs = 180;
  const todayFats = 45;

  const recommendedMeals = [
    {
      id: '1',
      name: 'Grilled Chicken Bowl',
      description: 'Quinoa, grilled chicken, roasted vegetables with tahini dressing',
      calories: 520,
      protein: 42,
      carbs: 48,
      fats: 18,
      chefName: 'Chef Maria',
      rating: 4.8,
      price: 299,
    },
    {
      id: '2',
      name: 'High-Protein Pasta',
      description: 'Whole wheat pasta with lean turkey meatballs and tomato sauce',
      calories: 480,
      protein: 38,
      carbs: 52,
      fats: 14,
      chefName: 'Chef Rahul',
      rating: 4.6,
      price: 249,
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Good Morning,</Text>
            <Text style={styles.userName}>{userName}! 👋</Text>
          </View>

          {/* Notification Icon Placeholder */}
          <View style={styles.notificationIcon}>
            <Text style={styles.notificationEmoji}>🔔</Text>
            {/* Notification badge */}
            <View style={styles.notificationBadge}>
              <Text style={styles.notificationBadgeText}>2</Text>
            </View>
          </View>
        </View>

        {/* Today's Summary Card */}
        <View style={styles.summaryCard}>
          <View style={styles.summaryHeader}>
            <Text style={styles.summaryTitle}>Today's Progress</Text>
            <Text style={styles.summaryDate}>
              {new Date().toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric'
              })}
            </Text>
          </View>

          <View style={styles.calorieProgress}>
            <View style={styles.calorieInfo}>
              <Text style={styles.calorieValue}>{todayCalories}</Text>
              <Text style={styles.calorieLabel}>consumed</Text>
            </View>

            <View style={styles.progressBarContainer}>
              <View
                style={[
                  styles.progressBar,
                  { width: `${(todayCalories / calorieGoal) * 100}%` }
                ]}
              />
            </View>

            <View style={styles.calorieInfo}>
              <Text style={styles.calorieValue}>{calorieGoal - todayCalories}</Text>
              <Text style={styles.calorieLabel}>remaining</Text>
            </View>
          </View>
        </View>

        {/* Quick Stats */}
        <View style={styles.statsContainer}>
          <StatCard
            value={`${todayProtein}g`}
            label="Protein"
            valueColor={Theme.colors.protein}
            style={styles.statCard}
          />
          <StatCard
            value={`${todayCarbs}g`}
            label="Carbs"
            valueColor={Theme.colors.carbs}
            style={styles.statCard}
          />
          <StatCard
            value={`${todayFats}g`}
            label="Fats"
            valueColor={Theme.colors.fats}
            style={styles.statCard}
          />
        </View>

        {/* Calories Chart */}
        <View style={styles.chartSection}>
          <CaloriesChart />
        </View>

        {/* Recommended Meals */}
        <SectionHeader
          title="Recommended for You"
          subtitle="Based on your fitness goals"
          actionText="View All"
          onActionPress={() => console.log('View all meals')}
        />

        <View style={styles.mealsContainer}>
          {recommendedMeals.map((meal) => (
            <MealCard
              key={meal.id}
              name={meal.name}
              description={meal.description}
              calories={meal.calories}
              protein={meal.protein}
              carbs={meal.carbs}
              fats={meal.fats}
              chefName={meal.chefName}
              rating={meal.rating}
              price={meal.price}
              onPress={() => router.push('/meal-detail')}
            />
          ))}
        </View>

        {/* Quick Actions */}
        <View style={styles.quickActions}>
          <QuickActionCard
            icon="🍽️"
            title="Browse Meals"
            subtitle="Explore our menu"
            onPress={() => router.push('/meals')}
          />
          <QuickActionCard
            icon="📊"
            title="Track Progress"
            subtitle="View your stats"
            onPress={() => router.push('/tracking')}
          />
        </View>

        {/* Bottom Spacing */}
        <View style={styles.bottomSpacing} />
      </ScrollView>
    </SafeAreaView>
  );
}

// Quick Action Card Component
interface QuickActionCardProps {
  icon: string;
  title: string;
  subtitle: string;
  onPress?: () => void;
}

const QuickActionCard: React.FC<QuickActionCardProps> = ({
  icon,
  title,
  subtitle,
  onPress
}) => (
  <TouchableOpacity
    style={styles.quickActionCard}
    onPress={onPress}
    activeOpacity={0.7}
  >
    <Text style={styles.quickActionIcon}>{icon}</Text>
    <View style={styles.quickActionText}>
      <Text style={styles.quickActionTitle}>{title}</Text>
      <Text style={styles.quickActionSubtitle}>{subtitle}</Text>
    </View>
    <Text style={styles.quickActionArrow}>→</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.background,
  },
  scrollView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Theme.spacing.screenPadding,
    paddingTop: Theme.spacing.md,
    paddingBottom: Theme.spacing.lg,
  },
  greeting: {
    ...Theme.textStyles.body,
    color: Theme.colors.textSecondary,
  },
  userName: {
    ...Theme.textStyles.h2,
    color: Theme.colors.text,
    marginTop: Theme.spacing.xs,
  },
  notificationIcon: {
    width: 40,
    height: 40,
    backgroundColor: Theme.colors.backgroundSecondary,
    borderRadius: Theme.borderRadius.full,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  notificationEmoji: {
    fontSize: 20,
  },
  notificationBadge: {
    position: 'absolute',
    top: -2,
    right: -2,
    backgroundColor: Theme.colors.error,
    width: 18,
    height: 18,
    borderRadius: Theme.borderRadius.full,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationBadgeText: {
    ...Theme.textStyles.badge,
    color: Theme.colors.textInverse,
  },
  summaryCard: {
    backgroundColor: Theme.colors.card,
    marginHorizontal: Theme.spacing.screenPadding,
    marginBottom: Theme.spacing.lg,
    padding: Theme.spacing.md,
    borderRadius: Theme.borderRadius.md,
    ...Theme.shadows.sm,
  },
  summaryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Theme.spacing.md,
  },
  summaryTitle: {
    ...Theme.textStyles.h4,
    color: Theme.colors.text,
  },
  summaryDate: {
    ...Theme.textStyles.caption,
    color: Theme.colors.textSecondary,
  },
  calorieProgress: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Theme.spacing.md,
  },
  calorieInfo: {
    alignItems: 'center',
  },
  calorieValue: {
    ...Theme.textStyles.h3,
    color: Theme.colors.primary,
    marginBottom: Theme.spacing.xs,
  },
  calorieLabel: {
    ...Theme.textStyles.caption,
    color: Theme.colors.textSecondary,
  },
  progressBarContainer: {
    flex: 1,
    height: 8,
    backgroundColor: Theme.colors.backgroundSecondary,
    borderRadius: Theme.borderRadius.full,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: Theme.colors.primary,
    borderRadius: Theme.borderRadius.full,
  },
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: Theme.spacing.screenPadding,
    gap: Theme.spacing.md,
    marginBottom: Theme.spacing.lg,
  },
  statCard: {
    flex: 1,
    marginHorizontal: 0,
    marginBottom: 0,
  },
  chartSection: {
    paddingHorizontal: Theme.spacing.screenPadding,
    marginBottom: Theme.spacing.lg,
  },
  mealsContainer: {
    marginBottom: Theme.spacing.lg,
  },
  quickActions: {
    paddingHorizontal: Theme.spacing.screenPadding,
    gap: Theme.spacing.md,
    marginBottom: Theme.spacing.lg,
  },
  quickActionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Theme.colors.card,
    padding: Theme.spacing.md,
    borderRadius: Theme.borderRadius.md,
    gap: Theme.spacing.md,
    ...Theme.shadows.xs,
  },
  quickActionIcon: {
    fontSize: 32,
  },
  quickActionText: {
    flex: 1,
  },
  quickActionTitle: {
    ...Theme.textStyles.bodyBold,
    color: Theme.colors.text,
    marginBottom: Theme.spacing.xs,
  },
  quickActionSubtitle: {
    ...Theme.textStyles.caption,
    color: Theme.colors.textSecondary,
  },
  quickActionArrow: {
    ...Theme.textStyles.h3,
    color: Theme.colors.textLight,
  },
  bottomSpacing: {
    height: Theme.spacing.lg,
  },
});

