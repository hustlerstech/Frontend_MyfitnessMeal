/**
 * MealCard Component — with real food photography + floating Add button
 *
 * Image area:
 *  - Shows a real photo from the meal's `imageUrl` prop (loaded via <Image>).
 *  - Falls back to the category LinearGradient + emoji if the URL is missing
 *    or fails to load.
 *  - Category badge (top-left) and calorie badge (bottom-right) sit on top
 *    of the image as absolute overlays.
 *  - Floating circular ⊕ button (top-right) replaces the old footer "+ Add"
 *    button — always visible over the photo for quick add-to-cart.
 *
 * All other functionality (macros, chef, rating, price, compact mode) is
 * unchanged.
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ViewStyle,
  Image,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Theme } from '../../constants';

// ─── Props ──────────────────────────────────────────────────────────────────

export interface MealCardProps {
  name: string;
  description?: string;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  chefName?: string;
  rating?: number;
  price: number;
  /** Direct image URL (Unsplash, CDN, etc.) */
  imageUrl?: string;
  /** Meal category — drives fallback gradient colour */
  category?: string;
  onPress?: () => void;
  style?: ViewStyle;
  compact?: boolean;
  isAdded?: boolean;
  /** Called when the floating ⊕ button is tapped */
  onAddPress?: () => void;
}

// ─── Category → fallback gradient colours + emoji ───────────────────────────

interface CategoryConfig {
  colors: [string, string, string];
  emoji: string;
}

const CATEGORY_CONFIGS: Record<string, CategoryConfig> = {
  'High Protein': { colors: ['#0f2b17', '#1a6b40', '#2bee75'], emoji: '🥩' },
  'Low Calorie':  { colors: ['#0f1d38', '#1e3a5f', '#60a5fa'], emoji: '🥗' },
  'Vegetarian':   { colors: ['#0d2b20', '#1a4a3a', '#22c68a'], emoji: '🥦' },
  'Healthy Fats': { colors: ['#271900', '#4a3000', '#fbbf24'], emoji: '🥑' },
};

const DEFAULT_CONFIG: CategoryConfig = {
  colors: ['#0a1a0d', '#0f2b17', '#1db85d'],
  emoji: '🍱',
};

function getCategoryConfig(category?: string): CategoryConfig {
  if (!category) return DEFAULT_CONFIG;
  return CATEGORY_CONFIGS[category] ?? DEFAULT_CONFIG;
}

// ─── Component ───────────────────────────────────────────────────────────────

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
  category,
  onPress,
  style,
  compact = false,
  isAdded,
  onAddPress,
}) => {
  const catConfig = getCategoryConfig(category);

  // Track whether the network image failed to load — if so, show fallback gradient.
  const [imageError, setImageError] = useState(false);
  const showRealImage = !!imageUrl && !imageError;

  return (
    <TouchableOpacity
      style={[styles.card, compact && styles.cardCompact, style]}
      onPress={onPress}
      activeOpacity={0.75}
      disabled={!onPress}
    >

      {/* ── Image area ─────────────────────────────────────────────── */}
      <View style={[styles.imageContainer, compact && styles.imageContainerCompact]}>

        {showRealImage ? (
          /* Real food photo */
          <Image
            source={{ uri: imageUrl }}
            style={styles.mealImage}
            resizeMode="cover"
            onError={() => setImageError(true)}
          />
        ) : (
          /* Fallback: category-tinted gradient + emoji */
          <LinearGradient
            colors={catConfig.colors}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.gradientPlaceholder}
          >
            <View style={styles.decorRing} />
            <Text style={compact ? styles.imageEmojiCompact : styles.imageEmoji}>
              {catConfig.emoji}
            </Text>
          </LinearGradient>
        )}

        {/* Dark scrim so badges stay readable over bright photos */}
        {showRealImage && <View style={styles.imageScrim} />}

        {/* Category badge — top-left */}
        {category && !compact && (
          <View style={styles.categoryBadge}>
            <Text style={styles.categoryBadgeText}>{category}</Text>
          </View>
        )}

        {/* Calorie badge — bottom-right */}
        <View style={[styles.calorieBadge, compact && styles.calorieBadgeCompact]}>
          <Text style={styles.calorieText}>🔥 {calories} cal</Text>
        </View>

        {/* ── Floating ⊕ / ✓ button — top-right ── */}
        {onAddPress && !compact && (
          <TouchableOpacity
            style={[styles.plusBtn, isAdded && styles.plusBtnAdded]}
            onPress={(e) => {
              e.stopPropagation?.();   // prevent card onPress
              onAddPress();
            }}
            activeOpacity={0.85}
            hitSlop={{ top: 6, right: 6, bottom: 6, left: 6 }}
          >
            {isAdded ? (
              <Text style={styles.plusBtnTextAdded}>✓</Text>
            ) : (
              <Text style={styles.plusBtnText}>＋</Text>
            )}
          </TouchableOpacity>
        )}
      </View>

      {/* ── Meal Info ──────────────────────────────────────────────── */}
      <View style={styles.infoContainer}>

        <Text style={styles.mealName} numberOfLines={1}>{name}</Text>

        {description && !compact && (
          <Text style={styles.mealDescription} numberOfLines={2}>
            {description}
          </Text>
        )}

        {!compact && (
          <View style={styles.macrosContainer}>
            <MacroBadge label="P" value={protein} color={Theme.colors.protein} />
            <MacroBadge label="C" value={carbs}   color={Theme.colors.carbs}   />
            <MacroBadge label="F" value={fats}    color={Theme.colors.fats}    />
          </View>
        )}

        {/* Footer — chef & price (no add button — it's in the image now) */}
        <View style={styles.footer}>
          <View style={styles.leftFooter}>
            {chefName && (
              <Text style={styles.chefName} numberOfLines={1}>{chefName}</Text>
            )}
            {rating != null && (
              <Text style={styles.rating}>⭐ {rating.toFixed(1)}</Text>
            )}
          </View>
          <Text style={styles.price}>₹{price}</Text>
        </View>

      </View>
    </TouchableOpacity>
  );
};

// ─── Macro Badge ─────────────────────────────────────────────────────────────

interface MacroBadgeProps { label: string; value: number; color: string; }

const MacroBadge: React.FC<MacroBadgeProps> = ({ label, value, color }) => (
  <View style={[styles.macroBadge, { backgroundColor: color + '20' }]}>
    <Text style={[styles.macroLabel, { color }]}>{label}</Text>
    <Text style={styles.macroValue}>{value}g</Text>
  </View>
);

// ─── Styles ──────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({

  // ── Card shell ────────────────────────────────────────────────────
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

  // ── Image area ────────────────────────────────────────────────────
  imageContainer: {
    width: '100%',
    height: 180,
    position: 'relative',
    overflow: 'hidden',
    backgroundColor: '#0a1a0d',   // ensures no white flash while loading
  },
  imageContainerCompact: {
    width: 120,
    height: 120,
  },

  // Real photo (fills the container)
  mealImage: {
    width: '100%',
    height: '100%',
  },

  // Subtle gradient scrim at the bottom so badges stay readable
  imageScrim: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.18)',
  },

  // Fallback gradient (used when no URL or image fails)
  gradientPlaceholder: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  decorRing: {
    position: 'absolute',
    width: 200,
    height: 200,
    borderRadius: 100,
    borderWidth: 30,
    borderColor: 'rgba(255,255,255,0.06)',
    top: -60,
    right: -60,
  },
  imageEmoji: {
    fontSize: 72,
    opacity: 0.75,
  },
  imageEmojiCompact: {
    fontSize: 40,
    opacity: 0.75,
  },

  // ── Overlay badges ────────────────────────────────────────────────
  categoryBadge: {
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: 'rgba(0,0,0,0.52)',
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.15)',
  },
  categoryBadgeText: {
    fontSize: 11,
    fontFamily: Theme.fonts.semiBold,
    color: 'rgba(255,255,255,0.92)',
  },
  calorieBadge: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    backgroundColor: 'rgba(0,0,0,0.55)',
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.12)',
  },
  calorieBadgeCompact: {
    bottom: 6,
    right: 6,
    paddingHorizontal: 6,
    paddingVertical: 3,
  },
  calorieText: {
    fontSize: 12,
    fontFamily: Theme.fonts.bold,
    color: '#ffffff',
  },

  // ── Floating ⊕ add button (top-right corner of image) ────────────
  plusBtn: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: Theme.colors.primary,   // solid green
    justifyContent: 'center',
    alignItems: 'center',
    // Drop shadow for visibility over photo
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.35,
    shadowRadius: 4,
    elevation: 6,
  },
  plusBtnAdded: {
    backgroundColor: '#0a1a0d',
    borderWidth: 2,
    borderColor: Theme.colors.primary,
  },
  plusBtnText: {
    fontSize: 22,
    lineHeight: 26,
    color: '#0a1a0d',
    fontFamily: Theme.fonts.bold,
    includeFontPadding: false,
  },
  plusBtnTextAdded: {
    fontSize: 18,
    lineHeight: 22,
    color: Theme.colors.primary,
    fontFamily: Theme.fonts.bold,
    includeFontPadding: false,
  },

  // ── Info area ────────────────────────────────────────────────────
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
    fontFamily: Theme.fonts.bold,
  },
  macroValue: {
    ...Theme.textStyles.caption,
    color: Theme.colors.text,
  },

  // ── Footer ───────────────────────────────────────────────────────
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  leftFooter: {
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
    fontFamily: Theme.fonts.semiBold,
  },
  price: {
    ...Theme.textStyles.priceSmall,
    color: Theme.colors.primary,
    fontFamily: Theme.fonts.bold,
  },
});

export default MealCard;
