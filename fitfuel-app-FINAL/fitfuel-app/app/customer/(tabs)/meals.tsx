/**
 * MealsScreen — Premium Edition
 *
 * Changes from previous version:
 *  - chefName removed from MealCard render (not shown on browse screen)
 *  - Add button moved out of overlay into a stable addButtonRow below the card
 *  - Hardcoded colours / sizes replaced with Theme tokens throughout
 *  - Search bar shadow lightened via Theme.shadows.xs
 *  - Business logic (stores, filtering, navigation) is 100% unchanged
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { MealCard } from '../../../components';
import { Theme } from '../../../constants';
import { useCartStore } from '@/store/cartStore';
import { useSubscriptionStore } from '@/store/subscriptionStore';
import { getMeals, MEAL_CATEGORIES as CATEGORIES, MealData } from '@/data';

// ─── Screen ───────────────────────────────────────────────────────────────────

export default function MealsScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // ── Stores ────────────────────────────────────────────────────────────────
  const { items, totalMeals, addItem } = useCartStore();
  const { credits, subscription, isSubscribed } = useSubscriptionStore();

  // ── Meal catalogue from JSON (replaces local MOCK_MEALS array) ────────────
  const ALL_MEALS = getMeals();

  // ── Filtering ─────────────────────────────────────────────────────────────
  const filteredMeals = ALL_MEALS.filter((meal) => {
    const matchesSearch =
      meal.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      meal.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === 'All' || meal.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // ── Add to cart — uses the subscriber or regular price depending on plan ──
  const handleAddMeal = (meal: MealData) => {
    const effectivePrice = isSubscribed
      ? meal.price.subscriber
      : meal.price.regular;
    addItem({
      id:       meal.id,
      name:     meal.name,
      price:    effectivePrice,
      mealType: 'lunch',
    });
  };

  // ── Render card ───────────────────────────────────────────────────────────
  const renderMealCard = ({ item }: { item: MealData }) => {
    const isAdded      = items.some((i) => i.id === item.id);
    const displayPrice = isSubscribed ? item.price.subscriber : item.price.regular;
    const savings      = item.price.regular - item.price.subscriber;

    return (
      <View style={styles.mealCardContainer}>
        {/* MealCard — real photo + floating ⊕ button built-in */}
        <MealCard
          name={item.name}
          description={item.description}
          calories={item.nutrition.calories}
          protein={item.nutrition.protein}
          carbs={item.nutrition.carbs}
          fats={item.nutrition.fats}
          rating={item.rating}
          price={displayPrice}
          category={item.category}
          imageUrl={item.image}                   // direct CDN URL from meals.json
          isAdded={isAdded}
          onAddPress={() => handleAddMeal(item)}  // floating ⊕ button handler
          // @ts-ignore
          onPress={() => router.push({ pathname: '/customer/meal/meal-detail', params: { id: item.id } })}
        />

        {/* ── Pricing comparison row (non-subscribers only) ── */}
        {!isSubscribed && (
          <View style={styles.priceCompareRow}>
            <Text style={styles.priceCompareText}>
              Subscribe &amp; pay{' '}
              <Text style={styles.priceCompareSubscriber}>₹{item.price.subscriber}</Text>
              {'  '}
              <Text style={styles.priceCompareSave}>Save ₹{savings}</Text>
            </Text>
          </View>
        )}
      </View>
    );
  };

  // ── JSX ───────────────────────────────────────────────────────────────────
  return (
    <SafeAreaView style={styles.root} edges={['top']}>

      {/* ── Gradient Header ── */}
      <LinearGradient
        colors={['#111827', '#1a2e1d', '#0f2319']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.header}
      >
        <View style={styles.decorRing} />
        <View style={styles.headerContent}>
          <View>
            <Text style={styles.headerTitle}>Browse Meals</Text>
            <Text style={styles.headerSubtitle}>
              {filteredMeals.length} meals available
            </Text>
          </View>
          <View style={styles.headerBadge}>
            <Text style={styles.headerBadgeText}>🍽️</Text>
          </View>
        </View>
      </LinearGradient>

      {/* ── Search Bar ── */}
      <View style={styles.searchWrapper}>
        <View style={styles.searchBar}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            style={styles.searchInput}
            placeholder="Search meals..."
            placeholderTextColor={Theme.colors.textPlaceholder}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Text style={styles.clearIcon}>✕</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* ── Category Filters ── */}
      <View style={styles.categoriesWrapper}>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={CATEGORIES}
          keyExtractor={(item) => item}
          renderItem={({ item }) => {
            const active = selectedCategory === item;
            return (
              <TouchableOpacity
                style={[styles.categoryChip, active && styles.categoryChipActive]}
                onPress={() => setSelectedCategory(item)}
                activeOpacity={0.7}
              >
                <Text style={[styles.categoryText, active && styles.categoryTextActive]}>
                  {item}
                </Text>
              </TouchableOpacity>
            );
          }}
          contentContainerStyle={styles.categoriesList}
        />
      </View>

      {/* ── Meals List ── */}
      <FlatList
        data={filteredMeals}
        keyExtractor={(item) => item.id}
        renderItem={renderMealCard}
        contentContainerStyle={styles.mealsList}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Text style={styles.emptyEmoji}>🍽️</Text>
            <Text style={styles.emptyTitle}>No meals found</Text>
            <Text style={styles.emptySubtitle}>
              Try adjusting your search or filters
            </Text>
          </View>
        }
      />

      {/* ── Cart Footer ── */}
      {totalMeals > 0 && (
        <LinearGradient
          colors={['#111827', '#1a2e1d']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.cartFooter}
        >
          <View style={styles.cartInfo}>
            <Text style={styles.cartCount}>{totalMeals}</Text>
            <Text style={styles.cartLabel}> item{totalMeals > 1 ? 's' : ''} in cart</Text>
          </View>
          <TouchableOpacity
            style={styles.viewCartButton}
            // @ts-ignore
            onPress={() => router.push('/customer/cart')}
            activeOpacity={0.85}
          >
            <LinearGradient
              colors={[Theme.colors.primary, Theme.colors.primaryDark]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.viewCartGradient}
            >
              <Text style={styles.viewCartText}>View Cart →</Text>
            </LinearGradient>
          </TouchableOpacity>
        </LinearGradient>
      )}
    </SafeAreaView>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Theme.colors.background,
  },

  // ── Header ──
  header: {
    paddingHorizontal: Theme.spacing.screenPadding,
    paddingTop: Theme.spacing.sm,
    paddingBottom: Theme.spacing.md,
    overflow: 'hidden',
  },
  decorRing: {
    position: 'absolute',
    width: 200,
    height: 200,
    borderRadius: 100,
    borderWidth: 28,
    borderColor: 'rgba(255,255,255,0.04)',
    top: -80,
    right: -60,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerTitle: {
    fontSize: 22,
    fontFamily: Theme.fonts.extraBold,
    color: Theme.colors.white,
    letterSpacing: 0.2,
  },
  headerSubtitle: {
    fontSize: 13,
    fontFamily: Theme.fonts.regular,
    color: 'rgba(255,255,255,0.6)',
    marginTop: 3,
  },
  headerBadge: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(43,238,117,0.15)',
    borderWidth: 1.5,
    borderColor: 'rgba(43,238,117,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerBadgeText: {
    fontSize: 22,
  },

  // ── Search ──
  searchWrapper: {
    paddingHorizontal: Theme.spacing.md,
    paddingTop: Theme.spacing.sm + 2,
    paddingBottom: Theme.spacing.xs,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Theme.colors.card,
    borderRadius: Theme.borderRadius.full,
    paddingHorizontal: Theme.spacing.md,
    paddingVertical: 11,
    borderWidth: 1,
    borderColor: Theme.colors.inputBorder,
    // Lighter shadow — uses green-tinted system shadow
    ...Theme.shadows.xs,
  },
  searchIcon: {
    fontSize: 18,
    marginRight: Theme.spacing.sm,
  },
  searchInput: {
    flex: 1,
    ...Theme.textStyles.input,
    color: Theme.colors.text,
    padding: 0,
  },
  clearIcon: {
    fontSize: 16,
    color: Theme.colors.textLight,
    padding: Theme.spacing.xs,
  },

  // ── Categories ──
  categoriesWrapper: {
    paddingVertical: Theme.spacing.sm,
  },
  categoriesList: {
    paddingHorizontal: Theme.spacing.md,
    gap: Theme.spacing.sm,
  },
  categoryChip: {
    paddingHorizontal: Theme.spacing.md,
    paddingVertical: Theme.spacing.sm,
    borderRadius: Theme.borderRadius.full,
    backgroundColor: Theme.colors.borderLight,
    borderWidth: 1,
    borderColor: Theme.colors.border,
  },
  categoryChipActive: {
    backgroundColor: Theme.colors.primary,
    borderColor: Theme.colors.primary,
  },
  categoryText: {
    fontSize: 13,
    fontFamily: Theme.fonts.medium,
    color: Theme.colors.textSecondary,
  },
  categoryTextActive: {
    color: '#0a1a0d',
    fontFamily: Theme.fonts.bold,
  },

  // ── Meals list ──
  mealsList: {
    paddingTop: Theme.spacing.xs,
    paddingBottom: 120, // clears cart footer + tab bar
  },

  // Card wrapper — ⊕ button is now inside MealCard's image overlay
  mealCardContainer: {
    marginBottom: Theme.spacing.sm,   // tighter since no separate button row below
  },

  // ── Pricing comparison (non-subscriber hint) ──
  priceCompareRow: {
    paddingHorizontal: Theme.spacing.md,
    paddingTop: 2,
    paddingBottom: Theme.spacing.xs,
  },
  priceCompareText: {
    fontSize: 12,
    fontFamily: Theme.fonts.regular,
    color: Theme.colors.textSecondary,
  },
  priceCompareSubscriber: {
    fontFamily: Theme.fonts.semiBold,
    color: Theme.colors.text,
  },
  priceCompareSave: {
    fontFamily: Theme.fonts.semiBold,
    color: '#1db85d',
  },

  // ── Empty state ──
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyEmoji: {
    fontSize: 64,
    marginBottom: Theme.spacing.md,
  },
  emptyTitle: {
    ...Theme.textStyles.h3,
    color: Theme.colors.text,
    marginBottom: Theme.spacing.xs,
  },
  emptySubtitle: {
    ...Theme.textStyles.body,
    color: Theme.colors.textSecondary,
    textAlign: 'center',
  },

  // ── Cart footer ──
  cartFooter: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Theme.spacing.screenPadding,
    paddingVertical: Theme.spacing.sm + 2,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.08)',
  },
  cartInfo: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  cartCount: {
    fontSize: 20,
    fontFamily: Theme.fonts.extraBold,
    color: Theme.colors.primary,
  },
  cartLabel: {
    fontSize: 14,
    fontFamily: Theme.fonts.regular,
    color: 'rgba(255,255,255,0.7)',
  },
  viewCartButton: {
    borderRadius: Theme.borderRadius.full,
    overflow: 'hidden',
  },
  viewCartGradient: {
    paddingHorizontal: Theme.spacing.lg,
    paddingVertical: Theme.spacing.sm,
    borderRadius: Theme.borderRadius.full,
  },
  viewCartText: {
    fontSize: 14,
    fontFamily: Theme.fonts.bold,
    color: '#0a1a0d',
  },
});
