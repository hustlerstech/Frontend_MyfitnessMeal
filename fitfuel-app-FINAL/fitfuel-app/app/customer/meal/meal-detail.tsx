/**
 * MealDetailScreen — Premium Edition
 *
 * v2 changes:
 *  - Reads `id` from useLocalSearchParams(); looks up meal in MOCK_MEALS
 *  - Shows error state + back button when id is missing or not found
 *  - Local EXTRAS map adds detail-only fields per meal id
 *    (hero emoji/gradient, ingredients, allergens, dietaryInfo, fiber…)
 *  - Hero gradient + emoji are now dynamic (driven by EXTRAS)
 *  - All other premium UI unchanged: calorie pill, macro cards, nutrition table
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Image,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { PrimaryButton, StatCard, BackButton } from '../../../components';
import { Theme } from '../../../constants';
import { getMealById, Meal } from '@/data/mockMeals';
import { useSubscriptionStore } from '@/store/subscriptionStore';

const { width } = Dimensions.get('window');

// ─── Detail-only fields (not in the shared Meal type) ────────────────────────

interface MealExtras {
  heroEmoji: string;
  heroGradient: [string, string, string];
  longDescription: string;
  fiber: number;
  sugar: number;
  sodium: number;
  reviews: number;
  prepTime: string;
  servingSize: string;
  ingredients: string[];
  allergens: string[];
  dietaryInfo: string[];
}

type MealDetail = Meal & MealExtras;

// ─── Per-meal extras ──────────────────────────────────────────────────────────

const EXTRAS: Record<string, MealExtras> = {
  '1': {
    heroEmoji: '🍗',
    heroGradient: ['#0f2b17', '#1a6b40', '#2bee75'],
    longDescription:
      'Our signature Grilled Chicken Bowl is designed with your fitness goals in mind. High-quality protein from free-range chicken helps build and repair muscles, while complex carbohydrates from quinoa provide sustained energy throughout the day.',
    fiber: 8, sugar: 6, sodium: 450, reviews: 234,
    prepTime: '15-20 min', servingSize: '450g',
    ingredients: [
      'Grilled chicken breast (150g)', 'Quinoa (100g)', 'Roasted bell peppers',
      'Roasted zucchini', 'Cherry tomatoes', 'Tahini dressing',
      'Olive oil', 'Garlic', 'Lemon juice', 'Herbs & spices',
    ],
    allergens: ['Sesame (tahini)'],
    dietaryInfo: ['High Protein', 'Gluten Free', 'Dairy Free'],
  },
  '2': {
    heroEmoji: '🍝',
    heroGradient: ['#0f2b17', '#1a6b40', '#2bee75'],
    longDescription:
      'A fitness-optimised take on a classic — lean turkey meatballs and whole-grain pasta fuel recovery without excess carbs, delivering a complete amino-acid profile your muscles will thank you for.',
    fiber: 6, sugar: 4, sodium: 520, reviews: 189,
    prepTime: '20-25 min', servingSize: '400g',
    ingredients: [
      'Whole wheat pasta (120g)', 'Lean turkey mince (150g)', 'Tomato sauce',
      'Onion', 'Garlic', 'Olive oil', 'Parmesan (10g)', 'Fresh basil',
    ],
    allergens: ['Gluten', 'Dairy'],
    dietaryInfo: ['High Protein', 'Whole Grain'],
  },
  '3': {
    heroEmoji: '🐟',
    heroGradient: ['#0c1e35', '#0f4c75', '#1a7fc2'],
    longDescription:
      'Wild-caught salmon delivers essential omega-3 fatty acids alongside a perfectly balanced combination of brown rice, edamame and avocado — sustained performance in every bite.',
    fiber: 7, sugar: 5, sodium: 390, reviews: 312,
    prepTime: '20-25 min', servingSize: '480g',
    ingredients: [
      'Grilled salmon (150g)', 'Brown rice (100g)', 'Edamame (80g)',
      'Avocado (60g)', 'Sesame ginger dressing', 'Nori strips', 'Sesame seeds',
    ],
    allergens: ['Fish', 'Sesame', 'Soy'],
    dietaryInfo: ['Healthy Fats', 'Omega-3 Rich', 'Gluten Free'],
  },
  '4': {
    heroEmoji: '🥗',
    heroGradient: ['#1a2e0c', '#3d7a1a', '#7ec850'],
    longDescription:
      'A plant-powered bowl built to satisfy. Chickpeas and sweet potato together deliver complete nutrition with plenty of fibre to keep you energised all day long.',
    fiber: 12, sugar: 8, sodium: 320, reviews: 156,
    prepTime: '20-25 min', servingSize: '420g',
    ingredients: [
      'Chickpeas (100g)', 'Roasted sweet potato (120g)', 'Mixed greens (80g)',
      'Tahini sauce', 'Lemon juice', 'Cumin', 'Smoked paprika', 'Olive oil',
    ],
    allergens: ['Sesame (tahini)'],
    dietaryInfo: ['Vegetarian', 'High Fibre', 'Vegan'],
  },
  '5': {
    heroEmoji: '🌯',
    heroGradient: ['#0f2b17', '#1a6b40', '#2bee75'],
    longDescription:
      'Lean grass-fed beef combined with fibre-rich black beans and wholesome brown rice delivers a macro-perfect meal that tastes as good as it performs on the track.',
    fiber: 9, sugar: 5, sodium: 580, reviews: 201,
    prepTime: '20-25 min', servingSize: '500g',
    ingredients: [
      'Lean ground beef (140g)', 'Black beans (80g)', 'Brown rice (100g)',
      'Pico de gallo', 'Guacamole (40g)', 'Lime juice', 'Cumin', 'Chilli powder',
    ],
    allergens: [],
    dietaryInfo: ['High Protein', 'Gluten Free', 'High Iron'],
  },
  '6': {
    heroEmoji: '🥢',
    heroGradient: ['#1a2e0c', '#3d7a1a', '#7ec850'],
    longDescription:
      'Crispy golden tofu marinated in teriyaki and tossed with seasonal vegetables over fragrant jasmine rice — a colourful, plant-based powerhouse.',
    fiber: 6, sugar: 7, sodium: 610, reviews: 143,
    prepTime: '15-20 min', servingSize: '380g',
    ingredients: [
      'Firm tofu (150g)', 'Mixed vegetables (200g)', 'Teriyaki sauce',
      'Jasmine rice (80g)', 'Sesame oil', 'Fresh ginger', 'Garlic', 'Spring onion',
    ],
    allergens: ['Soy', 'Sesame'],
    dietaryInfo: ['Vegetarian', 'Vegan', 'Low Fat'],
  },
  '7': {
    heroEmoji: '🥙',
    heroGradient: ['#0e2929', '#0f6b60', '#2be8c0'],
    longDescription:
      'Lean turkey, creamy hummus and fresh greens wrapped in a whole-grain tortilla — the ideal grab-and-go meal for busy days without sacrificing flavour or nutrition.',
    fiber: 5, sugar: 3, sodium: 420, reviews: 178,
    prepTime: '10-15 min', servingSize: '320g',
    ingredients: [
      'Whole wheat tortilla (1 large)', 'Lean turkey slices (120g)', 'Hummus (40g)',
      'Mixed greens (60g)', 'Tomatoes', 'Cucumber', 'Lemon juice',
    ],
    allergens: ['Gluten', 'Sesame (hummus)'],
    dietaryInfo: ['Low Calorie', 'High Protein', 'Whole Grain'],
  },
  '8': {
    heroEmoji: '🥑',
    heroGradient: ['#0e2929', '#0f6b60', '#2be8c0'],
    longDescription:
      'Sweet grilled shrimp meets creamy avocado on a bed of vibrant greens — a refreshing, low-carb meal that proves healthy eating never has to be boring.',
    fiber: 6, sugar: 4, sodium: 360, reviews: 267,
    prepTime: '15-20 min', servingSize: '350g',
    ingredients: [
      'Grilled shrimp (150g)', 'Mixed greens (100g)', 'Avocado (80g)',
      'Cherry tomatoes', 'Lime dressing', 'Olive oil', 'Fresh coriander', 'Chilli flakes',
    ],
    allergens: ['Shellfish'],
    dietaryInfo: ['Low Calorie', 'Low Carb', 'Gluten Free', 'Paleo'],
  },
  '9': {
    heroEmoji: '🍛',
    heroGradient: ['#0f2b17', '#1a6b40', '#2bee75'],
    longDescription:
      'Tender chicken breast slow-cooked in an aromatic tomato-cream sauce with authentic tikka spices, served over fluffy basmati rice — a high-protein comfort classic.',
    fiber: 5, sugar: 8, sodium: 680, reviews: 389,
    prepTime: '25-30 min', servingSize: '520g',
    ingredients: [
      'Chicken breast (180g)', 'Tomato cream sauce', 'Basmati rice (100g)',
      'Naan (1 small)', 'Yoghurt (30g)', 'Tikka spice blend',
      'Fresh ginger', 'Garlic', 'Single cream (20ml)', 'Fresh coriander',
    ],
    allergens: ['Dairy', 'Gluten'],
    dietaryInfo: ['High Protein', 'Gluten Friendly'],
  },
  '10': {
    heroEmoji: '🫙',
    heroGradient: ['#1a2e0c', '#3d7a1a', '#7ec850'],
    longDescription:
      'A Mediterranean-inspired bowl packed with protein-rich quinoa, briny feta, olives and a refreshing tzatziki — transport your tastebuds to the Aegean without leaving your macros.',
    fiber: 7, sugar: 5, sodium: 480, reviews: 212,
    prepTime: '15-20 min', servingSize: '400g',
    ingredients: [
      'Quinoa (100g)', 'Feta cheese (40g)', 'Kalamata olives (30g)',
      'Cucumber', 'Cherry tomatoes', 'Tzatziki (50g)',
      'Red onion', 'Olive oil', 'Lemon juice', 'Dried oregano',
    ],
    allergens: ['Dairy'],
    dietaryInfo: ['Vegetarian', 'Gluten Free', 'Mediterranean'],
  },
};

// Fallback used when a meal id has no entry in EXTRAS
const DEFAULT_EXTRAS: MealExtras = {
  heroEmoji: '🍽️',
  heroGradient: ['#111827', '#1a2e1d', '#0f2319'],
  longDescription: '',
  fiber: 0, sugar: 0, sodium: 0, reviews: 0,
  prepTime: 'N/A', servingSize: 'N/A',
  ingredients: [],
  allergens: [],
  dietaryInfo: [],
};

// ─── Screen ───────────────────────────────────────────────────────────────────

export default function MealDetailScreen() {
  const router   = useRouter();
  const { id }   = useLocalSearchParams<{ id: string }>();
  const insets   = useSafeAreaInsets();
  const [isAddedToPlan, setIsAddedToPlan] = useState(false);
  const [heroImageError, setHeroImageError] = useState(false);

  const { isSubscribed } = useSubscriptionStore();

  // ── Lookup — uses adapter helper (data flows from meals.json) ───────────────
  const baseMeal = getMealById(id);

  // ── Error state — id missing or not found ───────────────────────────────────
  if (!baseMeal) {
    return (
      <View style={styles.root}>
        <View style={[styles.header, { paddingTop: insets.top + Theme.spacing.sm }]}>
          <BackButton onPress={() => router.back()} />
        </View>
        <View style={styles.errorContainer}>
          <Text style={styles.errorEmoji}>🍽️</Text>
          <Text style={styles.errorTitle}>Meal Not Found</Text>
          <Text style={styles.errorSubtitle}>
            This meal isn't on the menu. It may have been removed or the link is invalid.
          </Text>
          <TouchableOpacity style={styles.errorBackBtn} onPress={() => router.back()}>
            <Text style={styles.errorBackBtnText}>← Go Back</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  // ── Merge shared data with per-meal extras ──────────────────────────────────
  const extras    = EXTRAS[baseMeal.id] ?? DEFAULT_EXTRAS;
  const meal: MealDetail = { ...baseMeal, ...extras };

  // Show the real food photo if URL is available and hasn't errored out
  const showHeroImage = !!meal.image && !heroImageError;

  const handleAddToPlan = () => {
    setIsAddedToPlan(!isAddedToPlan);
    console.log('Meal added to plan:', meal.name);
  };

  return (
    // Plain View — insets handled manually throughout
    <View style={styles.root}>

      {/* ── Absolute header — paddingTop via insets ── */}
      <View style={[styles.header, { paddingTop: insets.top + Theme.spacing.sm }]}>
        <BackButton onPress={() => router.back()} />
        <TouchableOpacity style={styles.favoriteButton}>
          <Text style={styles.favoriteIcon}>♡</Text>
        </TouchableOpacity>
      </View>

      {/* ── Scrollable content — starts below header ── */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={{ paddingTop: insets.top + 64 }}
        showsVerticalScrollIndicator={false}
      >

        {/* ── Hero — real food photo (fallback: category gradient + emoji) ── */}
        <View style={styles.heroContainer}>

          {showHeroImage ? (
            /* Real food photography */
            <Image
              source={{ uri: meal.image }}
              style={styles.heroFill}
              resizeMode="cover"
              onError={() => setHeroImageError(true)}
            />
          ) : (
            /* Fallback gradient + emoji */
            <LinearGradient
              colors={meal.heroGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.heroGradientFill}
            >
              <View style={styles.heroDecorRing} />
              <Text style={styles.heroEmoji}>{meal.heroEmoji}</Text>
            </LinearGradient>
          )}

          {/* Bottom-to-transparent scrim keeps badges readable over bright photos */}
          {showHeroImage && (
            <LinearGradient
              colors={['transparent', 'rgba(0,0,0,0.6)']}
              start={{ x: 0, y: 0.3 }}
              end={{ x: 0, y: 1 }}
              style={styles.heroFill}
            />
          )}

          {/* Calorie badge — always bottom-right */}
          <View style={styles.calorieBadge}>
            <Text style={styles.calorieText}>🔥 {meal.calories} cal</Text>
          </View>
        </View>

        {/* ── Main content ── */}
        <View style={styles.content}>

          {/* Title section */}
          <View style={styles.titleSection}>
            <Text style={styles.mealName}>{meal.name}</Text>

            {/* Rating + meta row */}
            <View style={styles.ratingContainer}>
              <Text style={styles.ratingStars}>⭐ {meal.rating}</Text>
              {meal.reviews > 0 && (
                <Text style={styles.ratingReviews}>({meal.reviews} reviews)</Text>
              )}
              {meal.prepTime !== 'N/A' && (
                <>
                  <View style={styles.dot} />
                  <Text style={styles.prepTime}>⏱ {meal.prepTime}</Text>
                </>
              )}
            </View>

            {/* ── Pricing — subscriber sees discounted price; others see comparison ── */}
            {isSubscribed ? (
              <View style={styles.priceRow}>
                <Text style={styles.price}>₹{meal.subscriberPrice}</Text>
                <View style={styles.subscriberBadge}>
                  <Text style={styles.subscriberBadgeText}>✓ Subscriber rate</Text>
                </View>
              </View>
            ) : (
              <View>
                <Text style={styles.price}>₹{meal.price}</Text>
                <Text style={styles.priceCompare}>
                  Subscribe &amp; pay{' '}
                  <Text style={styles.priceCompareSub}>₹{meal.subscriberPrice}</Text>
                  {'  '}
                  <Text style={styles.priceCompareSave}>
                    Save ₹{meal.price - meal.subscriberPrice}
                  </Text>
                </Text>
              </View>
            )}
          </View>

          {/* Description */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Description</Text>
            <Text style={styles.description}>{meal.description}</Text>
            {meal.longDescription.length > 0 && (
              <Text style={styles.longDescription}>{meal.longDescription}</Text>
            )}
          </View>

          {/* Nutrition Facts */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Nutrition Facts</Text>
            {meal.servingSize !== 'N/A' && (
              <Text style={styles.servingSize}>Per serving ({meal.servingSize})</Text>
            )}

            {/* Macro cards */}
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

            {/* Additional nutrition */}
            <View style={styles.nutritionTable}>
              <NutritionRow label="Fiber"  value={`${meal.fiber}g`}   />
              <NutritionRow label="Sugar"  value={`${meal.sugar}g`}   />
              <NutritionRow label="Sodium" value={`${meal.sodium}mg`} />
            </View>
          </View>

          {/* Ingredients — only when data exists */}
          {meal.ingredients.length > 0 && (
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
          )}

          {/* Dietary Information — only when data exists */}
          {meal.dietaryInfo.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Dietary Information</Text>
              <View style={styles.tagsContainer}>
                {meal.dietaryInfo.map((info, index) => (
                  <View key={index} style={styles.tag}>
                    <Text style={styles.tagText}>{info}</Text>
                  </View>
                ))}
              </View>

              {/* Allergens — no orange token, keep hex values */}
              {meal.allergens.length > 0 && (
                <View style={styles.allergensContainer}>
                  <Text style={styles.allergensTitle}>⚠️ Contains:</Text>
                  <Text style={styles.allergensText}>
                    {meal.allergens.join(', ')}
                  </Text>
                </View>
              )}
            </View>
          )}

          {/* Bottom spacing */}
          <View style={styles.bottomSpacing} />
        </View>
      </ScrollView>

      {/* ── Sticky bottom bar — paddingBottom via insets ── */}
      <View style={[
        styles.bottomBar,
        { paddingBottom: Math.max(insets.bottom, Theme.spacing.md) },
      ]}>
        <PrimaryButton
          title={isAddedToPlan ? '✓ Added to Plan' : 'Add to Meal Plan'}
          onPress={handleAddToPlan}
          style={isAddedToPlan ? styles.addedButton : undefined}
        />
      </View>
    </View>
  );
}

// ─── NutritionRow sub-component (unchanged) ──────────────────────────────────

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

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({

  // ── Root ──
  root: {
    flex: 1,
    backgroundColor: Theme.colors.background,
  },

  // ── Error state ──
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: Theme.spacing.screenPadding,
  },
  errorEmoji: {
    fontSize: 64,
    marginBottom: Theme.spacing.md,
  },
  errorTitle: {
    fontSize: 22,
    fontFamily: Theme.fonts.bold,
    color: Theme.colors.text,
    marginBottom: Theme.spacing.xs,
  },
  errorSubtitle: {
    fontSize: 15,
    fontFamily: Theme.fonts.regular,
    color: Theme.colors.textSecondary,
    textAlign: 'center',
    marginBottom: Theme.spacing.xl,
  },
  errorBackBtn: {
    paddingHorizontal: Theme.spacing.xl,
    paddingVertical: Theme.spacing.sm + 2,
    borderRadius: Theme.borderRadius.full,
    borderWidth: 1.5,
    borderColor: Theme.colors.primary,
  },
  errorBackBtnText: {
    fontSize: 15,
    fontFamily: Theme.fonts.semiBold,
    color: Theme.colors.primary,
  },

  // ── Header — absolute, paddingTop applied inline ──
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Theme.spacing.screenPadding,
    paddingBottom: Theme.spacing.sm,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    backgroundColor: Theme.colors.background,
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
    fontSize: 22,
    color: Theme.colors.error,
  },

  // ── Scroll view ──
  scrollView: {
    flex: 1,
  },

  // ── Hero image / gradient area ──
  heroContainer: {
    width: width,
    height: width * 0.7,
    overflow: 'hidden',
    backgroundColor: '#0a1a0d',   // prevents white flash while image loads
  },
  // Fills the hero container (used by both <Image> and the scrim gradient)
  heroFill: {
    ...StyleSheet.absoluteFillObject,
  },
  // Fills the hero container AND centres the emoji (fallback gradient)
  heroGradientFill: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heroDecorRing: {
    position: 'absolute',
    width: 280,
    height: 280,
    borderRadius: 140,
    borderWidth: 36,
    borderColor: 'rgba(255,255,255,0.05)',
    top: -100,
    right: -80,
  },
  heroEmoji: {
    fontSize: 96,
    opacity: 0.75,
  },

  // ── Calorie badge — dark translucent pill ──
  calorieBadge: {
    position: 'absolute',
    bottom: Theme.spacing.lg,
    right: Theme.spacing.lg,
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingHorizontal: Theme.spacing.md,
    paddingVertical: Theme.spacing.sm,
    borderRadius: Theme.borderRadius.full,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.15)',
  },
  calorieText: {
    fontSize: 13,
    fontFamily: Theme.fonts.bold,
    color: Theme.colors.white,
  },

  // ── Content wrapper ──
  content: {
    flex: 1,
    backgroundColor: Theme.colors.background,
  },

  // ── Title section ──
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
  // Pricing comparison — non-subscribers
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Theme.spacing.sm,
  },
  subscriberBadge: {
    backgroundColor: 'rgba(43,238,117,0.12)',
    borderRadius: Theme.borderRadius.full,
    paddingHorizontal: Theme.spacing.sm,
    paddingVertical: 3,
    borderWidth: 1,
    borderColor: 'rgba(43,238,117,0.35)',
  },
  subscriberBadgeText: {
    fontSize: 11,
    fontFamily: Theme.fonts.semiBold,
    color: Theme.colors.primaryDark,
  },
  priceCompare: {
    fontSize: 13,
    fontFamily: Theme.fonts.regular,
    color: Theme.colors.textSecondary,
    marginTop: 4,
  },
  priceCompareSub: {
    fontFamily: Theme.fonts.semiBold,
    color: Theme.colors.text,
  },
  priceCompareSave: {
    fontFamily: Theme.fonts.semiBold,
    color: '#1db85d',
  },

  // ── Sections ──
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

  // ── Macro cards ──
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

  // ── Nutrition table ──
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

  // ── Ingredients ──
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

  // ── Dietary tags ──
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
    color: Theme.colors.primaryDark,
    fontFamily: Theme.fonts.semiBold,
  },

  // ── Allergens (no orange token — keep hex values) ──
  allergensContainer: {
    backgroundColor: '#ffedd5',
    padding: Theme.spacing.md,
    borderRadius: Theme.borderRadius.lg,
    borderLeftWidth: 3,
    borderLeftColor: '#ea580c',
  },
  allergensTitle: {
    ...Theme.textStyles.bodyBold,
    color: '#ea580c',
    marginBottom: Theme.spacing.xs,
  },
  allergensText: {
    ...Theme.textStyles.body,
    color: Theme.colors.text,
  },

  // ── Bottom spacing ──
  bottomSpacing: {
    height: Theme.spacing.xxl + Theme.spacing.tabBar.height,
  },

  // ── Bottom bar — paddingBottom applied inline via insets ──
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: Theme.colors.background,
    paddingHorizontal: Theme.spacing.screenPadding,
    paddingTop: Theme.spacing.md,
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
