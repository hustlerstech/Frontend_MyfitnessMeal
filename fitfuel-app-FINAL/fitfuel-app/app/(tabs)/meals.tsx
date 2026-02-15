/**
 * MealsScreen (Tab)
 * 
 * Browse and explore meals
 * Features:
 * - Search bar
 * - Category filters
 * - FlatList of meals
 * - Meal cards with image, calories, price
 * - Add to cart button
 * 
 * UI only - no backend integration yet
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { useRouter } from 'expo-router';
import { MealCard } from '../../components';
import { Theme } from '../../constants';

// Mock meal data
const MOCK_MEALS = [
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
    category: 'High Protein',
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
    category: 'High Protein',
  },
  {
    id: '3',
    name: 'Salmon Power Bowl',
    description: 'Grilled salmon, brown rice, edamame, avocado, sesame ginger dressing',
    calories: 580,
    protein: 45,
    carbs: 42,
    fats: 24,
    chefName: 'Chef Priya',
    rating: 4.9,
    price: 399,
    category: 'Healthy Fats',
  },
  {
    id: '4',
    name: 'Vegetarian Buddha Bowl',
    description: 'Mixed greens, chickpeas, roasted sweet potato, tahini sauce',
    calories: 420,
    protein: 18,
    carbs: 58,
    fats: 16,
    chefName: 'Chef Amit',
    rating: 4.5,
    price: 199,
    category: 'Vegetarian',
  },
  {
    id: '5',
    name: 'Lean Beef Burrito Bowl',
    description: 'Lean beef, black beans, brown rice, pico de gallo, guacamole',
    calories: 550,
    protein: 40,
    carbs: 55,
    fats: 20,
    chefName: 'Chef Carlos',
    rating: 4.7,
    price: 329,
    category: 'High Protein',
  },
  {
    id: '6',
    name: 'Tofu Stir Fry',
    description: 'Crispy tofu, mixed vegetables, teriyaki sauce, jasmine rice',
    calories: 380,
    protein: 22,
    carbs: 48,
    fats: 12,
    chefName: 'Chef Li',
    rating: 4.4,
    price: 219,
    category: 'Vegetarian',
  },
  {
    id: '7',
    name: 'Turkey Wrap',
    description: 'Whole wheat wrap, lean turkey, hummus, mixed greens, tomatoes',
    calories: 350,
    protein: 32,
    carbs: 38,
    fats: 10,
    chefName: 'Chef Sarah',
    rating: 4.6,
    price: 179,
    category: 'Low Calorie',
  },
  {
    id: '8',
    name: 'Shrimp & Avocado Salad',
    description: 'Grilled shrimp, mixed greens, avocado, cherry tomatoes, lime dressing',
    calories: 320,
    protein: 28,
    carbs: 18,
    fats: 16,
    chefName: 'Chef Maria',
    rating: 4.8,
    price: 349,
    category: 'Low Calorie',
  },
  {
    id: '9',
    name: 'Chicken Tikka Masala',
    description: 'Tender chicken in creamy tomato sauce, basmati rice, naan',
    calories: 620,
    protein: 48,
    carbs: 62,
    fats: 22,
    chefName: 'Chef Rahul',
    rating: 4.9,
    price: 319,
    category: 'High Protein',
  },
  {
    id: '10',
    name: 'Greek Quinoa Bowl',
    description: 'Quinoa, feta cheese, olives, cucumber, tomatoes, tzatziki',
    calories: 450,
    protein: 20,
    carbs: 52,
    fats: 18,
    chefName: 'Chef Dimitri',
    rating: 4.5,
    price: 269,
    category: 'Vegetarian',
  },
];

const CATEGORIES = ['All', 'High Protein', 'Low Calorie', 'Vegetarian', 'Healthy Fats'];

export default function MealsScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [addedMeals, setAddedMeals] = useState<Set<string>>(new Set());

  // Filter meals based on search and category
  const filteredMeals = MOCK_MEALS.filter((meal) => {
    const matchesSearch = meal.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      meal.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || meal.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Handle add to cart
  const handleAddMeal = (mealId: string) => {
    const newAddedMeals = new Set(addedMeals);
    if (newAddedMeals.has(mealId)) {
      newAddedMeals.delete(mealId);
    } else {
      newAddedMeals.add(mealId);
    }
    setAddedMeals(newAddedMeals);
    console.log('Meal added/removed:', mealId);
  };

  // Render meal card with add button
  const renderMealCard = ({ item }: { item: typeof MOCK_MEALS[0] }) => {
    const isAdded = addedMeals.has(item.id);

    return (
      <View style={styles.mealCardContainer}>
        <MealCard
          name={item.name}
          description={item.description}
          calories={item.calories}
          protein={item.protein}
          carbs={item.carbs}
          fats={item.fats}
          chefName={item.chefName}
          rating={item.rating}
          price={item.price}
          onPress={() => router.push('/meal-detail')}
        />

        {/* Add Button Overlay */}
        <TouchableOpacity
          style={[styles.addButton, isAdded && styles.addButtonAdded]}
          onPress={() => handleAddMeal(item.id)}
          activeOpacity={0.8}
        >
          <Text style={[styles.addButtonText, isAdded && styles.addButtonTextAdded]}>
            {isAdded ? '✓ Added' : '+ Add'}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Browse Meals</Text>
        <Text style={styles.subtitle}>{filteredMeals.length} meals available</Text>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
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

      {/* Category Filters */}
      <View style={styles.categoriesContainer}>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={CATEGORIES}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                styles.categoryChip,
                selectedCategory === item && styles.categoryChipActive,
              ]}
              onPress={() => setSelectedCategory(item)}
              activeOpacity={0.7}
            >
              <Text
                style={[
                  styles.categoryText,
                  selectedCategory === item && styles.categoryTextActive,
                ]}
              >
                {item}
              </Text>
            </TouchableOpacity>
          )}
          contentContainerStyle={styles.categoriesList}
        />
      </View>

      {/* Meals List */}
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

      {/* Cart Footer (if meals added) */}
      {addedMeals.size > 0 && (
        <View style={styles.cartFooter}>
          <View style={styles.cartInfo}>
            <Text style={styles.cartCount}>{addedMeals.size} items</Text>
            <Text style={styles.cartLabel}>in cart</Text>
          </View>
          <TouchableOpacity
            style={styles.viewCartButton}
            onPress={() => console.log('View cart')}
          >
            <Text style={styles.viewCartText}>View Cart →</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.background,
  },
  header: {
    paddingHorizontal: Theme.spacing.screenPadding,
    paddingTop: Theme.spacing.md,
    paddingBottom: Theme.spacing.sm,
  },
  title: {
    ...Theme.textStyles.h2,
    color: Theme.colors.text,
    marginBottom: Theme.spacing.xs,
  },
  subtitle: {
    ...Theme.textStyles.body,
    color: Theme.colors.textSecondary,
  },
  searchContainer: {
    paddingHorizontal: Theme.spacing.screenPadding,
    paddingVertical: Theme.spacing.md,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Theme.colors.inputBackground,
    borderRadius: Theme.borderRadius.sm,
    paddingHorizontal: Theme.spacing.md,
    paddingVertical: Theme.spacing.sm,
    borderWidth: 1,
    borderColor: Theme.colors.inputBorder,
  },
  searchIcon: {
    fontSize: 20,
    marginRight: Theme.spacing.sm,
  },
  searchInput: {
    flex: 1,
    ...Theme.textStyles.input,
    color: Theme.colors.text,
    padding: 0,
  },
  clearIcon: {
    fontSize: 18,
    color: Theme.colors.textLight,
    padding: Theme.spacing.xs,
  },
  categoriesContainer: {
    marginBottom: Theme.spacing.md,
  },
  categoriesList: {
    paddingHorizontal: Theme.spacing.screenPadding,
    gap: Theme.spacing.sm,
  },
  categoryChip: {
    paddingHorizontal: Theme.spacing.md,
    paddingVertical: Theme.spacing.sm,
    borderRadius: Theme.borderRadius.full,
    backgroundColor: Theme.colors.backgroundSecondary,
    borderWidth: 1,
    borderColor: Theme.colors.border,
  },
  categoryChipActive: {
    backgroundColor: Theme.colors.primary,
    borderColor: Theme.colors.primary,
  },
  categoryText: {
    ...Theme.textStyles.bodySmall,
    color: Theme.colors.textSecondary,
    fontWeight: '500',
  },
  categoryTextActive: {
    color: Theme.colors.textInverse,
    fontWeight: '600',
  },
  mealsList: {
    paddingBottom: Theme.spacing.xxl,
  },
  mealCardContainer: {
    position: 'relative',
    marginBottom: Theme.spacing.md,
  },
  addButton: {
    position: 'absolute',
    bottom: Theme.spacing.md,
    right: Theme.spacing.xl,
    backgroundColor: Theme.colors.primary,
    paddingHorizontal: Theme.spacing.md,
    paddingVertical: Theme.spacing.sm,
    borderRadius: Theme.borderRadius.full,
    ...Theme.shadows.md,
  },
  addButtonAdded: {
    backgroundColor: Theme.colors.background,
    borderWidth: 2,
    borderColor: Theme.colors.primary,
  },
  addButtonText: {
    ...Theme.textStyles.buttonSmall,
    color: Theme.colors.textInverse,
  },
  addButtonTextAdded: {
    color: Theme.colors.primary,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: Theme.spacing.xxl,
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
  cartFooter: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Theme.colors.card,
    paddingHorizontal: Theme.spacing.screenPadding,
    paddingVertical: Theme.spacing.md,
    borderTopWidth: 1,
    borderTopColor: Theme.colors.borderLight,
    ...Theme.shadows.lg,
  },
  cartInfo: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: Theme.spacing.xs,
  },
  cartCount: {
    ...Theme.textStyles.h3,
    color: Theme.colors.primary,
  },
  cartLabel: {
    ...Theme.textStyles.body,
    color: Theme.colors.textSecondary,
  },
  viewCartButton: {
    backgroundColor: Theme.colors.primary,
    paddingHorizontal: Theme.spacing.lg,
    paddingVertical: Theme.spacing.md,
    borderRadius: Theme.borderRadius.full,
  },
  viewCartText: {
    ...Theme.textStyles.button,
    color: Theme.colors.textInverse,
  },
});

