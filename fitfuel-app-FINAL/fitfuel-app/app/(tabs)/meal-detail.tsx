/**
 * MealDetailScreen
 * 
 * Detailed view of a single meal
 * Shows complete information including:
 * - Large hero image
 * - Meal name and description
 * - Chef information
 * - Complete nutrition breakdown
 * - Ingredients list
 * - Add to meal plan button
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
  Dimensions,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { PrimaryButton, StatCard, BackButton } from '../../components';
import { Theme } from '../../constants';

const { width } = Dimensions.get('window');

// Mock meal data - in production would come from route params or API
const MOCK_MEAL_DETAIL = {
  id: '1',
  name: 'Grilled Chicken Bowl',
  description: 'A perfectly balanced meal featuring tender grilled chicken breast served over a bed of fluffy quinoa, accompanied by a colorful array of roasted seasonal vegetables including bell peppers, zucchini, and cherry tomatoes. Finished with a drizzle of our house-made tahini dressing for a creamy, nutty flavor.',
  longDescription: 'Our signature Grilled Chicken Bowl is designed with your fitness goals in mind. The high-quality protein from free-range chicken helps build and repair muscles, while the complex carbohydrates from quinoa provide sustained energy. The variety of roasted vegetables not only adds vibrant colors but also delivers essential vitamins and minerals.',
  calories: 520,
  protein: 42,
  carbs: 48,
  fats: 18,
  fiber: 8,
  sugar: 6,
  sodium: 450,
  chefName: 'Chef Maria Rodriguez',
  chefBio: 'Certified nutritionist and chef with 10+ years experience',
  rating: 4.8,
  reviews: 234,
  price: 299,
  prepTime: '15-20 min',
  servingSize: '450g',
  ingredients: [
    'Grilled chicken breast (150g)',
    'Quinoa (100g)',
    'Roasted bell peppers',
    'Roasted zucchini',
    'Cherry tomatoes',
    'Tahini dressing',
    'Olive oil',
    'Garlic',
    'Lemon juice',
    'Spices and herbs',
  ],
  allergens: ['Sesame (tahini)'],
  dietaryInfo: ['High Protein', 'Gluten Free', 'Dairy Free'],
};

export default function MealDetailScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [isAddedToPlan, setIsAddedToPlan] = useState(false);

  const meal = MOCK_MEAL_DETAIL; // In production: fetch based on params.id

  const handleAddToPlan = () => {
    setIsAddedToPlan(!isAddedToPlan);
    console.log('Meal added to plan:', meal.name);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <BackButton onPress={() => router.back()} />
        <TouchableOpacity style={styles.favoriteButton}>
          <Text style={styles.favoriteIcon}>♡</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {/* Hero Image */}
        <View style={styles.heroImageContainer}>
          <View style={styles.heroImagePlaceholder}>
            <Text style={styles.heroEmoji}>🍱</Text>
          </View>

          {/* Calorie Badge */}
          <View style={styles.calorieBadge}>
            <Text style={styles.calorieText}>{meal.calories}</Text>
            <Text style={styles.calorieLabel}>calories</Text>
          </View>
        </View>

        {/* Main Content */}
        <View style={styles.content}>
          {/* Title Section */}
          <View style={styles.titleSection}>
            <Text style={styles.mealName}>{meal.name}</Text>

            {/* Rating and Reviews */}
            <View style={styles.ratingContainer}>
              <Text style={styles.ratingStars}>⭐ {meal.rating}</Text>
              <Text style={styles.ratingReviews}>({meal.reviews} reviews)</Text>
              <View style={styles.dot} />
              <Text style={styles.prepTime}>⏱ {meal.prepTime}</Text>
            </View>

            {/* Price */}
            <Text style={styles.price}>₹{meal.price}</Text>
          </View>

          {/* Chef Info Card */}
          <View style={styles.chefCard}>
            <View style={styles.chefAvatar}>
              <Text style={styles.chefEmoji}>👨‍🍳</Text>
            </View>
            <View style={styles.chefInfo}>
              <Text style={styles.chefName}>{meal.chefName}</Text>
              <Text style={styles.chefBio}>{meal.chefBio}</Text>
            </View>
          </View>

          {/* Description */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Description</Text>
            <Text style={styles.description}>{meal.description}</Text>
            <Text style={styles.longDescription}>{meal.longDescription}</Text>
          </View>

          {/* Nutrition Stats */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Nutrition Facts</Text>
            <Text style={styles.servingSize}>Per serving ({meal.servingSize})</Text>

            {/* Macro Cards */}
            <View style={styles.macroCardsContainer}>
              <StatCard
                value={`${meal.protein}g`}
                label="Protein"
                valueColor={Theme.colors.protein}
                style={styles.macroCard}
              />
              <StatCard
                value={`${meal.carbs}g`}
                label="Carbs"
                valueColor={Theme.colors.carbs}
                style={styles.macroCard}
              />
              <StatCard
                value={`${meal.fats}g`}
                label="Fats"
                valueColor={Theme.colors.fats}
                style={styles.macroCard}
              />
            </View>

            {/* Additional Nutrition */}
            <View style={styles.nutritionTable}>
              <NutritionRow label="Fiber" value={`${meal.fiber}g`} />
              <NutritionRow label="Sugar" value={`${meal.sugar}g`} />
              <NutritionRow label="Sodium" value={`${meal.sodium}mg`} />
            </View>
          </View>

          {/* Ingredients */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Ingredients</Text>
            <View style={styles.ingredientsList}>
              {meal.ingredients.map((ingredient, index) => (
                <View key={index} style={styles.ingredientItem}>
                  <Text style={styles.ingredientBullet}>•</Text>
                  <Text style={styles.ingredientText}>{ingredient}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* Dietary Info */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Dietary Information</Text>
            <View style={styles.tagsContainer}>
              {meal.dietaryInfo.map((info, index) => (
                <View key={index} style={styles.tag}>
                  <Text style={styles.tagText}>{info}</Text>
                </View>
              ))}
            </View>

            {/* Allergens */}
            {meal.allergens.length > 0 && (
              <View style={styles.allergensContainer}>
                <Text style={styles.allergensTitle}>⚠️ Contains:</Text>
                <Text style={styles.allergensText}>
                  {meal.allergens.join(', ')}
                </Text>
              </View>
            )}
          </View>

          {/* Bottom Spacing */}
          <View style={styles.bottomSpacing} />
        </View>
      </ScrollView>

      {/* Fixed Bottom Button */}
      <View style={styles.bottomBar}>
        <PrimaryButton
          title={isAddedToPlan ? '✓ Added to Plan' : 'Add to Meal Plan'}
          onPress={handleAddToPlan}
          style={isAddedToPlan && styles.addedButton}
        />
      </View>
    </SafeAreaView>
  );
}

// Nutrition Row Component
interface NutritionRowProps {
  label: string;
  value: string;
}

const NutritionRow: React.FC<NutritionRowProps> = ({ label, value }) => (
  <View style={styles.nutritionRow}>
    <Text style={styles.nutritionLabel}>{label}</Text>
    <View style={styles.nutritionDots} />
    <Text style={styles.nutritionValue}>{value}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Theme.spacing.screenPadding,
    paddingVertical: Theme.spacing.md,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
  },
  favoriteButton: {
    width: 40,
    height: 40,
    backgroundColor: Theme.colors.background,
    borderRadius: Theme.borderRadius.full,
    justifyContent: 'center',
    alignItems: 'center',
    ...Theme.shadows.sm,
  },
  favoriteIcon: {
    fontSize: 24,
    color: Theme.colors.error,
  },
  scrollView: {
    flex: 1,
  },
  heroImageContainer: {
    width: width,
    height: width * 0.75,
    position: 'relative',
  },
  heroImagePlaceholder: {
    width: '100%',
    height: '100%',
    backgroundColor: Theme.colors.primaryBackground,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heroEmoji: {
    fontSize: 120,
  },
  calorieBadge: {
    position: 'absolute',
    bottom: Theme.spacing.lg,
    right: Theme.spacing.lg,
    backgroundColor: Theme.colors.background,
    paddingHorizontal: Theme.spacing.md,
    paddingVertical: Theme.spacing.sm,
    borderRadius: Theme.borderRadius.md,
    alignItems: 'center',
    ...Theme.shadows.md,
  },
  calorieText: {
    ...Theme.textStyles.h2,
    color: Theme.colors.primary,
  },
  calorieLabel: {
    ...Theme.textStyles.caption,
    color: Theme.colors.textSecondary,
    marginTop: Theme.spacing.xs,
  },
  content: {
    flex: 1,
  },
  titleSection: {
    paddingHorizontal: Theme.spacing.screenPadding,
    paddingTop: Theme.spacing.lg,
    paddingBottom: Theme.spacing.md,
  },
  mealName: {
    ...Theme.textStyles.h1,
    color: Theme.colors.text,
    marginBottom: Theme.spacing.sm,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Theme.spacing.md,
  },
  ratingStars: {
    ...Theme.textStyles.bodyBold,
    color: Theme.colors.text,
  },
  ratingReviews: {
    ...Theme.textStyles.body,
    color: Theme.colors.textSecondary,
    marginLeft: Theme.spacing.xs,
  },
  dot: {
    width: 4,
    height: 4,
    borderRadius: Theme.borderRadius.full,
    backgroundColor: Theme.colors.textLight,
    marginHorizontal: Theme.spacing.sm,
  },
  prepTime: {
    ...Theme.textStyles.body,
    color: Theme.colors.textSecondary,
  },
  price: {
    ...Theme.textStyles.price,
    color: Theme.colors.primary,
  },
  chefCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Theme.colors.backgroundSecondary,
    marginHorizontal: Theme.spacing.screenPadding,
    marginBottom: Theme.spacing.lg,
    padding: Theme.spacing.md,
    borderRadius: Theme.borderRadius.md,
  },
  chefAvatar: {
    width: 48,
    height: 48,
    borderRadius: Theme.borderRadius.full,
    backgroundColor: Theme.colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Theme.spacing.md,
  },
  chefEmoji: {
    fontSize: 24,
  },
  chefInfo: {
    flex: 1,
  },
  chefName: {
    ...Theme.textStyles.bodyBold,
    color: Theme.colors.text,
    marginBottom: Theme.spacing.xs,
  },
  chefBio: {
    ...Theme.textStyles.caption,
    color: Theme.colors.textSecondary,
  },
  section: {
    paddingHorizontal: Theme.spacing.screenPadding,
    marginBottom: Theme.spacing.xl,
  },
  sectionTitle: {
    ...Theme.textStyles.h3,
    color: Theme.colors.text,
    marginBottom: Theme.spacing.md,
  },
  servingSize: {
    ...Theme.textStyles.caption,
    color: Theme.colors.textSecondary,
    marginBottom: Theme.spacing.md,
  },
  description: {
    ...Theme.textStyles.body,
    color: Theme.colors.text,
    lineHeight: 24,
    marginBottom: Theme.spacing.md,
  },
  longDescription: {
    ...Theme.textStyles.body,
    color: Theme.colors.textSecondary,
    lineHeight: 24,
  },
  macroCardsContainer: {
    flexDirection: 'row',
    gap: Theme.spacing.md,
    marginBottom: Theme.spacing.lg,
  },
  macroCard: {
    flex: 1,
    marginHorizontal: 0,
    marginBottom: 0,
  },
  nutritionTable: {
    backgroundColor: Theme.colors.backgroundSecondary,
    borderRadius: Theme.borderRadius.sm,
    padding: Theme.spacing.md,
  },
  nutritionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Theme.spacing.sm,
  },
  nutritionLabel: {
    ...Theme.textStyles.body,
    color: Theme.colors.text,
  },
  nutritionDots: {
    flex: 1,
    height: 1,
    borderBottomWidth: 1,
    borderBottomColor: Theme.colors.borderLight,
    borderStyle: 'dotted',
    marginHorizontal: Theme.spacing.sm,
  },
  nutritionValue: {
    ...Theme.textStyles.bodyBold,
    color: Theme.colors.text,
  },
  ingredientsList: {
    gap: Theme.spacing.sm,
  },
  ingredientItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  ingredientBullet: {
    ...Theme.textStyles.body,
    color: Theme.colors.primary,
    marginRight: Theme.spacing.sm,
    fontWeight: 'bold',
  },
  ingredientText: {
    ...Theme.textStyles.body,
    color: Theme.colors.text,
    flex: 1,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Theme.spacing.sm,
    marginBottom: Theme.spacing.md,
  },
  tag: {
    backgroundColor: Theme.colors.primaryBackground,
    paddingHorizontal: Theme.spacing.md,
    paddingVertical: Theme.spacing.sm,
    borderRadius: Theme.borderRadius.full,
    borderWidth: 1,
    borderColor: Theme.colors.primary,
  },
  tagText: {
    ...Theme.textStyles.caption,
    color: Theme.colors.primary,
    fontWeight: '600',
  },
  allergensContainer: {
    backgroundColor: Theme.colors.error + '10',
    padding: Theme.spacing.md,
    borderRadius: Theme.borderRadius.sm,
    borderLeftWidth: 3,
    borderLeftColor: Theme.colors.error,
  },
  allergensTitle: {
    ...Theme.textStyles.bodyBold,
    color: Theme.colors.error,
    marginBottom: Theme.spacing.xs,
  },
  allergensText: {
    ...Theme.textStyles.body,
    color: Theme.colors.text,
  },
  bottomSpacing: {
    height: Theme.spacing.xxl + Theme.spacing.tabBar.height,
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: Theme.colors.background,
    paddingHorizontal: Theme.spacing.screenPadding,
    paddingVertical: Theme.spacing.md,
    borderTopWidth: 1,
    borderTopColor: Theme.colors.borderLight,
    ...Theme.shadows.lg,
  },
  addedButton: {
    backgroundColor: Theme.colors.background,
    borderWidth: 2,
    borderColor: Theme.colors.primary,
  },
});
