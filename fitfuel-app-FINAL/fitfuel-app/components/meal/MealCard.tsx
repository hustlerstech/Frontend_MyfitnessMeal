/**
 * MealCard Component
 * 
 * Display meal information with image, name, calories, macros, and chef info
 * Used for meal recommendations and listings
 * 
 * Features:
 * - Meal image placeholder
 * - Meal name and description
 * - Calorie count
 * - Macro badges (protein, carbs, fats)
 * - Chef info
 * - Rating
 * - Price
 * - Pressable to view details
 */

import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ViewStyle,
} from 'react-native';
import { Theme } from '../../constants';

export interface MealCardProps {
  /** Meal name */
  name: string;
  
  /** Meal description */
  description?: string;
  
  /** Calories */
  calories: number;
  
  /** Protein in grams */
  protein: number;
  
  /** Carbs in grams */
  carbs: number;
  
  /** Fats in grams */
  fats: number;
  
  /** Chef name */
  chefName?: string;
  
  /** Rating (0-5) */
  rating?: number;
  
  /** Price */
  price: number;
  
  /** Image URL (placeholder for now) */
  imageUrl?: string;
  
  /** Press handler */
  onPress?: () => void;
  
  /** Custom style */
  style?: ViewStyle;
  
  /** Compact variant (smaller card) */
  compact?: boolean;
}

export const MealCard: React.FC<MealCardProps> = ({
  name,
  description,
  calories,
  protein,
  carbs,
  fats,
  chefName,
  rating,
  price,
  imageUrl,
  onPress,
  style,
  compact = false,
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.card,
        compact && styles.cardCompact,
        style,
      ]}
      onPress={onPress}
      activeOpacity={0.7}
      disabled={!onPress}
    >
      {/* Meal Image */}
      <View style={[styles.imageContainer, compact && styles.imageContainerCompact]}>
        {/* Placeholder for actual image */}
        <View style={styles.imagePlaceholder}>
          <Text style={styles.imageEmoji}>🍱</Text>
        </View>
        
        {/* Calorie Badge */}
        <View style={styles.calorieBadge}>
          <Text style={styles.calorieText}>{calories} cal</Text>
        </View>
      </View>

      {/* Meal Info */}
      <View style={styles.infoContainer}>
        {/* Name */}
        <Text style={styles.mealName} numberOfLines={1}>
          {name}
        </Text>

        {/* Description */}
        {description && !compact && (
          <Text style={styles.mealDescription} numberOfLines={2}>
            {description}
          </Text>
        )}

        {/* Macros */}
        {!compact && (
          <View style={styles.macrosContainer}>
            <MacroBadge label="P" value={protein} color={Theme.colors.protein} />
            <MacroBadge label="C" value={carbs} color={Theme.colors.carbs} />
            <MacroBadge label="F" value={fats} color={Theme.colors.fats} />
          </View>
        )}

        {/* Footer - Chef & Price */}
        <View style={styles.footer}>
          <View style={styles.chefContainer}>
            {chefName && (
              <Text style={styles.chefName} numberOfLines={1}>
                👨‍🍳 {chefName}
              </Text>
            )}
            {rating && (
              <Text style={styles.rating}>⭐ {rating.toFixed(1)}</Text>
            )}
          </View>
          
          <Text style={styles.price}>₹{price}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

// Macro Badge Component
interface MacroBadgeProps {
  label: string;
  value: number;
  color: string;
}

const MacroBadge: React.FC<MacroBadgeProps> = ({ label, value, color }) => (
  <View style={[styles.macroBadge, { backgroundColor: color + '20' }]}>
    <Text style={[styles.macroLabel, { color }]}>{label}</Text>
    <Text style={styles.macroValue}>{value}g</Text>
  </View>
);

const styles = StyleSheet.create({
  card: {
    backgroundColor: Theme.colors.card,
    borderRadius: Theme.borderRadius.md,
    ...Theme.shadows.sm,
    marginHorizontal: Theme.spacing.md,
    marginBottom: Theme.spacing.md,
    overflow: 'hidden',
  },
  cardCompact: {
    flexDirection: 'row',
    marginHorizontal: 0,
  },
  imageContainer: {
    width: '100%',
    height: 180,
    position: 'relative',
  },
  imageContainerCompact: {
    width: 120,
    height: 120,
  },
  imagePlaceholder: {
    width: '100%',
    height: '100%',
    backgroundColor: Theme.colors.primaryBackground,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageEmoji: {
    fontSize: 60,
  },
  calorieBadge: {
    position: 'absolute',
    top: Theme.spacing.sm,
    right: Theme.spacing.sm,
    backgroundColor: Theme.colors.background,
    paddingHorizontal: Theme.spacing.sm,
    paddingVertical: Theme.spacing.xs,
    borderRadius: Theme.borderRadius.sm,
    ...Theme.shadows.xs,
  },
  calorieText: {
    ...Theme.textStyles.caption,
    color: Theme.colors.primary,
    fontWeight: '600',
  },
  infoContainer: {
    padding: Theme.spacing.md,
  },
  mealName: {
    ...Theme.textStyles.cardTitle,
    color: Theme.colors.text,
    marginBottom: Theme.spacing.xs,
  },
  mealDescription: {
    ...Theme.textStyles.cardSubtitle,
    color: Theme.colors.textSecondary,
    marginBottom: Theme.spacing.sm,
    lineHeight: 20,
  },
  macrosContainer: {
    flexDirection: 'row',
    gap: Theme.spacing.xs,
    marginBottom: Theme.spacing.sm,
  },
  macroBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Theme.spacing.sm,
    paddingVertical: Theme.spacing.xs,
    borderRadius: Theme.borderRadius.xs,
    gap: Theme.spacing.xs,
  },
  macroLabel: {
    ...Theme.textStyles.caption,
    fontWeight: '600',
  },
  macroValue: {
    ...Theme.textStyles.caption,
    color: Theme.colors.text,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  chefContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: Theme.spacing.sm,
  },
  chefName: {
    ...Theme.textStyles.caption,
    color: Theme.colors.textSecondary,
    flex: 1,
  },
  rating: {
    ...Theme.textStyles.caption,
    color: Theme.colors.text,
    fontWeight: '600',
  },
  price: {
    ...Theme.textStyles.priceSmall,
    color: Theme.colors.primary,
  },
});

export default MealCard;
