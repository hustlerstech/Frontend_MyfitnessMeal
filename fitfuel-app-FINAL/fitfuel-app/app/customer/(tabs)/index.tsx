/**
 * CustomerHomeScreen — Reference Layout Edition
 *
 * Layout:
 *   1. Compact dark gradient header ("Delivery in 10 mins")
 *   2. Hero promo banner (overlapping card, LinearGradient)
 *   3. Top Picks horizontal scroll (static data)
 *   4. Today's Meals card (Breakfast / Lunch / Dinner + per-meal "— cal" badge)
 *   5. Active Order card (unchanged)
 *   6. Quick Actions row (unchanged)
 *   7. Sticky bottom cart bar (only when cart has items)
 *
 * No tracking UI. No goal/consumed/remaining. No progress bar.
 * Calories per meal show "— cal" — PlannedMeal has no .calories field.
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Alert,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { usePlannerStore } from '@/store/plannerStore';
import { useOrderStore } from '@/store/orderStore';
import { useSubscriptionStore } from '@/store/subscriptionStore';
import { useCartStore } from '@/store/cartStore';
import { Theme } from '@/constants';

// ─── Static top-picks data ────────────────────────────────────────────────────

const TOP_PICKS = [
  {
    id: '1', name: 'Grilled Chicken Bowl', price: 299, originalPrice: 349,
    rating: 4.8, calories: 520, emoji: '🥩',
    gradientColors: ['#0f2b17', '#1a6b40', '#2bee75'] as [string, string, string],
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&q=80',
  },
  {
    id: '3', name: 'Salmon Power Bowl', price: 399, originalPrice: 459,
    rating: 4.9, calories: 580, emoji: '🐟',
    gradientColors: ['#271900', '#4a3000', '#fbbf24'] as [string, string, string],
    image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400&q=80',
  },
  {
    id: '4', name: 'Veggie Buddha Bowl', price: 199, originalPrice: 249,
    rating: 4.5, calories: 420, emoji: '🥗',
    gradientColors: ['#0d2b20', '#1a4a3a', '#22c68a'] as [string, string, string],
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&q=80',
  },
  {
    id: '7', name: 'Turkey Wrap', price: 179, originalPrice: 219,
    rating: 4.6, calories: 350, emoji: '🌯',
    gradientColors: ['#0f1d38', '#1e3a5f', '#60a5fa'] as [string, string, string],
    image: 'https://images.unsplash.com/photo-1604909052868-dea20d956bbd?w=400&q=80',
  },
  {
    id: '8', name: 'Avocado Salad Bowl', price: 249, originalPrice: 299,
    rating: 4.7, calories: 380, emoji: '🥑',
    gradientColors: ['#0f2b17', '#1a6b40', '#2bee75'] as [string, string, string],
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400&q=80',
  },
];

// ─── Component ────────────────────────────────────────────────────────────────

export default function CustomerHomeScreen() {
  const router = useRouter();
  const { weekPlan } = usePlannerStore();
  const { orders } = useOrderStore();
  const { subscription, canUsePlanner } = useSubscriptionStore();
  const { totalMeals, subtotal } = useCartStore();

  // ── Helpers ──────────────────────────────────────────────────────────────

  const getTodayPlan = () => {
    const today = new Date().toISOString().split('T')[0];
    return weekPlan.find(day => day.date === today);
  };

  const isTodayPrepared = () => {
    const today = new Date().toISOString().split('T')[0];
    return orders.some(order => {
      const orderDate = new Date(order.createdAt).toISOString().split('T')[0];
      return orderDate === today;
    });
  };

  const getActiveOrder = () => {
    const active = orders.filter(o => o.status !== 'delivered');
    return active.length > 0 ? active[active.length - 1] : null;
  };

  const formatStatus = (status: string) =>
    status.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());

  // ── Derived data ─────────────────────────────────────────────────────────

  const todayPlan     = getTodayPlan();
  const activeOrder   = getActiveOrder();
  const todayPrepared = isTodayPrepared();

  // ── Render ───────────────────────────────────────────────────────────────

  return (
    <SafeAreaView style={styles.root} edges={['top']}>
      <View style={styles.flex}>

        {/* ── SCROLL CONTENT ── */}
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >

          {/* ── 1. GRADIENT HEADER (compact) ── */}
          <LinearGradient
            colors={['#111827', '#1a2e1d', '#0f2319']}
            locations={[0, 0.6, 1]}
            style={styles.header}
          >
            <View style={styles.headerDecorCircle} />

            <View style={styles.headerContent}>
              <View style={styles.headerLeft}>
                <Text style={styles.headerEyebrow}>📍 Delivery in 10 mins</Text>
                <Text style={styles.headerSub}>To your location</Text>
              </View>
              <View style={styles.avatarCircle}>
                <Text style={styles.avatarEmoji}>👤</Text>
              </View>
            </View>
          </LinearGradient>

          {/* ── OVERLAP ZONE ── */}
          <View style={styles.overlap}>

            {/* ── 2. HERO BANNER ── */}
            <LinearGradient
              colors={['#0f2b17', '#1a6b40']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.heroBanner}
            >
              <View style={styles.heroRing} />
              <Text style={styles.heroEmoji}>🍗</Text>
              <View style={styles.heroRight}>
                <Text style={styles.heroHeadline}>{"High‑protein meals\nin 10 minutes"}</Text>
                <TouchableOpacity
                  style={styles.heroBtn}
                  // @ts-ignore
                  onPress={() => router.push('/customer/(tabs)/meals')}
                  activeOpacity={0.85}
                >
                  <Text style={styles.heroBtnText}>Order Now →</Text>
                </TouchableOpacity>
              </View>
            </LinearGradient>

            {/* ── 3. TOP PICKS ── */}
            <Text style={styles.sectionTitle}>Top Picks</Text>

            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              data={TOP_PICKS}
              keyExtractor={item => item.id}
              renderItem={({ item }) => <TopPickCard item={item} />}
              contentContainerStyle={styles.topPicksList}
              style={styles.topPicksFlatList}
            />

            {/* ── 4. TODAY'S MEALS ── */}
            <View style={styles.card}>
              <View style={styles.cardHeaderRow}>
                <Text style={styles.cardTitle}>Today's Meals</Text>
                {todayPrepared && (
                  <View style={styles.sentBadge}>
                    <Text style={styles.sentBadgeText}>✓ Sent to kitchen</Text>
                  </View>
                )}
              </View>

              <MealRow
                emoji="🍳"
                label="Breakfast"
                name={todayPlan?.breakfast?.name || 'Not Planned'}
                accentColor={Theme.colors.protein}
                calories={(todayPlan?.breakfast as any)?.calories}
              />
              <MealRow
                emoji="🥗"
                label="Lunch"
                name={todayPlan?.lunch?.name || 'Not Planned'}
                accentColor={Theme.colors.carbs}
                calories={(todayPlan?.lunch as any)?.calories}
              />
              <MealRow
                emoji="🍽️"
                label="Dinner"
                name={todayPlan?.dinner?.name || 'Not Planned'}
                accentColor={Theme.colors.fats}
                calories={(todayPlan?.dinner as any)?.calories}
              />
            </View>

            {/* ── 5. ACTIVE ORDER (unchanged) ── */}
            {activeOrder && (
              <View style={styles.card}>
                <Text style={styles.cardTitle}>Active Order</Text>
                <View style={styles.orderRow}>
                  <View>
                    <Text style={styles.orderId}>#{activeOrder.id}</Text>
                    <View style={styles.orderStatusBadge}>
                      <Text style={styles.orderStatusText}>
                        {formatStatus(activeOrder.status)}
                      </Text>
                    </View>
                  </View>
                  <TouchableOpacity
                    style={styles.viewDetailsBtn}
                    onPress={() =>
                      router.push({
                        pathname: '/customer/orders/[id]',
                        params: { id: activeOrder.id },
                      })
                    }
                    activeOpacity={0.85}
                  >
                    <LinearGradient
                      colors={[Theme.colors.primary, Theme.colors.primaryDark]}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 0 }}
                      style={styles.viewDetailsBtnGradient}
                    >
                      <Text style={styles.viewDetailsBtnText}>View Details</Text>
                    </LinearGradient>
                  </TouchableOpacity>
                </View>
              </View>
            )}

            {/* ── 6. QUICK ACTIONS ── */}
            <Text style={styles.sectionTitle}>Quick Actions</Text>
            <View style={styles.quickActionsRow}>
              <QuickAction
                emoji={canUsePlanner ? '📅' : '🔒'}
                label="Plan Meals"
                bgColor={
                  canUsePlanner
                    ? 'rgba(43,238,117,0.15)'
                    : 'rgba(120,120,120,0.10)'
                }
                locked={!canUsePlanner}
                onPress={() => {
                  if (canUsePlanner) {
                    router.push('/customer/meal/weekly-planner');
                  } else {
                    Alert.alert(
                      '🔒 Premium Feature',
                      'Weekly Planner is available on Basic and Premium plans.\n\nUpgrade from your Profile to unlock.',
                      [
                        { text: 'Not Now', style: 'cancel' },
                        {
                          text: 'Go to Profile',
                          onPress: () => router.push('/customer/(tabs)/profile'),
                        },
                      ],
                    );
                  }
                }}
              />
              <QuickAction
                emoji="📦"
                label="My Orders"
                bgColor="rgba(96,165,250,0.15)"
                onPress={() => router.push('/customer/(tabs)/orders')}
              />
              <QuickAction
                emoji="👤"
                label="Profile"
                bgColor="rgba(167,139,250,0.15)"
                onPress={() => router.push('/customer/(tabs)/profile')}
              />
            </View>

          </View>{/* end overlap */}
        </ScrollView>

        {/* ── 7. STICKY BOTTOM BAR ── */}
        {totalMeals > 0 && (
          <LinearGradient
            colors={['#111827', '#1a2e1d']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.stickyBar}
          >
            <View style={styles.stickyBarLeft}>
              <Text style={styles.stickyBarCount}>
                {totalMeals} item{totalMeals > 1 ? 's' : ''}
              </Text>
              <Text style={styles.stickyBarDivider}> | </Text>
              <Text style={styles.stickyBarPrice}>₹{subtotal}</Text>
            </View>
            <TouchableOpacity
              style={styles.stickyBarBtn}
              // @ts-ignore
              onPress={() => router.push('/customer/cart')}
              activeOpacity={0.85}
            >
              <LinearGradient
                colors={[Theme.colors.primary, Theme.colors.primaryDark]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.stickyBarBtnGradient}
              >
                <Text style={styles.stickyBarBtnText}>Continue to Payment →</Text>
              </LinearGradient>
            </TouchableOpacity>
          </LinearGradient>
        )}

      </View>
    </SafeAreaView>
  );
}

// ─── Sub-components ───────────────────────────────────────────────────────────

/** Top Picks horizontal card — shows real food photo when image URL available */
const TopPickCard = ({ item }: { item: (typeof TOP_PICKS)[0] }) => {
  const [imageError, setImageError] = useState(false);
  const showImage = !!item.image && !imageError;
  const discountPct = Math.round((1 - item.price / item.originalPrice) * 100);

  return (
    <View style={styles.topPickCard}>

      {/* ── Image area ── */}
      <View style={styles.topPickImageArea}>

        {showImage ? (
          /* Real food photo */
          <Image
            source={{ uri: item.image }}
            style={StyleSheet.absoluteFillObject}
            resizeMode="cover"
            onError={() => setImageError(true)}
          />
        ) : (
          /* Fallback: category gradient + emoji */
          <LinearGradient
            colors={item.gradientColors}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.topPickGradientFill}
          >
            <View style={styles.topPickDecorRing} />
            <Text style={styles.topPickEmoji}>{item.emoji}</Text>
          </LinearGradient>
        )}

        {/* Scrim for badge readability over bright photos */}
        {showImage && (
          <LinearGradient
            colors={['transparent', 'rgba(0,0,0,0.55)']}
            start={{ x: 0, y: 0.2 }}
            end={{ x: 0, y: 1 }}
            style={StyleSheet.absoluteFillObject}
          />
        )}

        {/* Calorie badge — bottom-right */}
        <View style={styles.topPickCalBadge}>
          <Text style={styles.topPickCalText}>🔥 {item.calories} cal</Text>
        </View>
      </View>

      {/* ── Info below the image ── */}
      <View style={styles.topPickInfo}>
        <Text style={styles.topPickName} numberOfLines={1}>{item.name}</Text>
        <View style={styles.topPickPriceRow}>
          <Text style={styles.topPickPrice}>₹{item.price}</Text>
          <Text style={styles.topPickOriginalPrice}>₹{item.originalPrice}</Text>
          <View style={styles.discountBadge}>
            <Text style={styles.discountText}>{discountPct}% OFF</Text>
          </View>
        </View>
        <Text style={styles.topPickRating}>⭐ {item.rating.toFixed(1)}</Text>
      </View>
    </View>
  );
};

/** Meal row with per-meal calorie badge */
const MealRow = ({
  emoji,
  label,
  name,
  accentColor,
  calories,
}: {
  emoji: string;
  label: string;
  name: string;
  accentColor: string;
  calories?: number;
}) => (
  <View style={styles.mealRow}>
    <View style={[styles.mealAccentBar, { backgroundColor: accentColor }]} />
    <View style={[styles.mealIconCircle, { backgroundColor: accentColor + '18' }]}>
      <Text style={styles.mealIcon}>{emoji}</Text>
    </View>
    <View style={styles.mealInfo}>
      <Text style={styles.mealLabel}>{label}</Text>
      <Text style={styles.mealName} numberOfLines={1}>{name}</Text>
    </View>
    <View style={styles.calBadge}>
      <Text style={styles.calBadgeText}>
        {calories != null ? `${calories} cal` : '— cal'}
      </Text>
    </View>
  </View>
);

/** Quick action tile — pass locked=true to render with muted/greyed style */
const QuickAction = ({
  emoji,
  label,
  bgColor,
  onPress,
  locked = false,
}: {
  emoji: string;
  label: string;
  bgColor: string;
  onPress: () => void;
  locked?: boolean;
}) => (
  <TouchableOpacity
    style={[styles.quickActionCard, locked && styles.quickActionCardLocked]}
    onPress={onPress}
    activeOpacity={0.75}
  >
    <View style={[styles.quickActionIconCircle, { backgroundColor: bgColor }]}>
      <Text style={styles.quickActionEmoji}>{emoji}</Text>
    </View>
    <Text style={[styles.quickActionLabel, locked && styles.quickActionLabelLocked]}>
      {label}
    </Text>
  </TouchableOpacity>
);

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Theme.colors.background,
  },
  flex: { flex: 1 },
  scroll: { flex: 1 },
  scrollContent: {
    paddingBottom: 120, // clears sticky bar + tab bar
  },

  // ── Header ──
  header: {
    height: 130,
    paddingHorizontal: Theme.spacing.md,
    paddingTop: Theme.spacing.md,
    paddingBottom: 36,
    overflow: 'hidden',
    justifyContent: 'flex-end',
  },
  headerDecorCircle: {
    position: 'absolute',
    width: 220,
    height: 220,
    borderRadius: 110,
    backgroundColor: 'rgba(43,238,117,0.06)',
    top: -80,
    right: -50,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerLeft: { gap: 3 },
  headerEyebrow: {
    fontSize: 16,
    fontFamily: Theme.fonts.semiBold,
    color: Theme.colors.white,
    letterSpacing: 0.1,
  },
  headerSub: {
    fontSize: 12,
    fontFamily: Theme.fonts.regular,
    color: 'rgba(255,255,255,0.55)',
  },
  avatarCircle: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: 'rgba(255,255,255,0.12)',
    borderWidth: 1.5,
    borderColor: 'rgba(43,238,117,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarEmoji: { fontSize: 16 },

  // ── Overlap zone ──
  overlap: {
    marginTop: -28,
    paddingHorizontal: Theme.spacing.md,
  },

  // ── Hero banner ──
  heroBanner: {
    borderRadius: Theme.borderRadius.xl,
    height: 130,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Theme.spacing.md,
    marginBottom: Theme.spacing.md,
    overflow: 'hidden',
  },
  heroRing: {
    position: 'absolute',
    width: 180,
    height: 180,
    borderRadius: 90,
    borderWidth: 24,
    borderColor: 'rgba(255,255,255,0.05)',
    top: -60,
    right: -40,
  },
  heroEmoji: {
    fontSize: 64,
    opacity: 0.7,
    marginRight: Theme.spacing.md,
  },
  heroRight: {
    flex: 1,
    gap: Theme.spacing.sm,
  },
  heroHeadline: {
    fontSize: 17,
    fontFamily: Theme.fonts.bold,
    color: Theme.colors.white,
    lineHeight: 23,
  },
  heroBtn: {
    backgroundColor: Theme.colors.white,
    borderRadius: Theme.borderRadius.full,
    paddingHorizontal: Theme.spacing.md,
    paddingVertical: 7,
    alignSelf: 'flex-start',
  },
  heroBtnText: {
    fontSize: 13,
    fontFamily: Theme.fonts.bold,
    color: Theme.colors.primaryDark,
  },

  // ── Section title ──
  sectionTitle: {
    ...Theme.textStyles.sectionHeader,
    color: Theme.colors.text,
    marginBottom: Theme.spacing.sm,
    marginTop: Theme.spacing.xs,
  },

  // ── Top Picks ──
  topPicksFlatList: {
    marginHorizontal: -Theme.spacing.md,
    marginBottom: Theme.spacing.md,
  },
  topPicksList: {
    paddingHorizontal: Theme.spacing.md,
    gap: Theme.spacing.sm,
  },
  topPickCard: {
    width: 160,
    backgroundColor: Theme.colors.card,
    borderRadius: Theme.borderRadius.xl,
    overflow: 'hidden',
    ...Theme.shadows.sm,
  },
  // Outer image container (View, not LinearGradient)
  topPickImageArea: {
    height: 110,
    overflow: 'hidden',
    backgroundColor: '#0a1a0d',  // avoids white flash while loading
    position: 'relative',
  },
  // Inner LinearGradient fill (only rendered in fallback mode)
  topPickGradientFill: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  topPickDecorRing: {
    position: 'absolute',
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 16,
    borderColor: 'rgba(255,255,255,0.06)',
    top: -40,
    right: -30,
  },
  topPickEmoji: { fontSize: 48, opacity: 0.75 },
  topPickCalBadge: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: Theme.borderRadius.full,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  topPickCalText: {
    fontSize: 10,
    fontFamily: Theme.fonts.bold,
    color: Theme.colors.white,
  },
  topPickInfo: {
    padding: Theme.spacing.sm,
    gap: 4,
  },
  topPickName: {
    fontSize: 13,
    fontFamily: Theme.fonts.semiBold,
    color: Theme.colors.text,
  },
  topPickPriceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    flexWrap: 'wrap',
  },
  topPickPrice: {
    fontSize: 14,
    fontFamily: Theme.fonts.bold,
    color: Theme.colors.primary,
  },
  topPickOriginalPrice: {
    fontSize: 11,
    fontFamily: Theme.fonts.regular,
    color: Theme.colors.textLight,
    textDecorationLine: 'line-through',
  },
  discountBadge: {
    backgroundColor: '#fff7ed',
    borderRadius: Theme.borderRadius.full,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  discountText: {
    fontSize: 10,
    fontFamily: Theme.fonts.bold,
    color: '#ea580c',
  },
  topPickRating: {
    fontSize: 12,
    fontFamily: Theme.fonts.medium,
    color: Theme.colors.textSecondary,
  },

  // ── White cards ──
  card: {
    backgroundColor: Theme.colors.card,
    borderRadius: Theme.borderRadius.xl,
    padding: Theme.spacing.md,
    marginBottom: Theme.spacing.sm + 2,
    shadowColor: 'rgba(43,238,117,0.12)',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 12,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 15,
    fontFamily: Theme.fonts.bold,
    color: Theme.colors.text,
  },
  cardHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Theme.spacing.sm,
  },

  // ── Sent badge ──
  sentBadge: {
    backgroundColor: 'rgba(43,238,117,0.12)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: Theme.borderRadius.full,
    borderWidth: 1,
    borderColor: 'rgba(43,238,117,0.3)',
  },
  sentBadgeText: {
    fontSize: 11,
    fontFamily: Theme.fonts.semiBold,
    color: Theme.colors.primaryDark,
  },

  // ── Meal rows ──
  mealRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 9,
    gap: Theme.spacing.sm,
  },
  mealAccentBar: {
    width: 3,
    height: 40,
    borderRadius: 2,
  },
  mealIconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mealIcon: { fontSize: 20 },
  mealInfo: { flex: 1 },
  mealLabel: {
    fontSize: 10,
    fontFamily: Theme.fonts.semiBold,
    color: Theme.colors.textLight,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 2,
  },
  mealName: {
    fontSize: 14,
    fontFamily: Theme.fonts.semiBold,
    color: Theme.colors.text,
  },
  calBadge: {
    backgroundColor: Theme.colors.backgroundSecondary,
    borderRadius: Theme.borderRadius.full,
    paddingHorizontal: Theme.spacing.sm,
    paddingVertical: Theme.spacing.xs,
    borderWidth: 1,
    borderColor: Theme.colors.border,
  },
  calBadgeText: {
    ...Theme.textStyles.caption,
    color: Theme.colors.textSecondary,
    fontWeight: '600',
  },

  // ── Active order ──
  orderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: Theme.spacing.sm,
    marginTop: Theme.spacing.sm,
  },
  orderId: {
    fontSize: 16,
    fontFamily: Theme.fonts.bold,
    color: Theme.colors.text,
    marginBottom: 6,
  },
  orderStatusBadge: {
    backgroundColor: 'rgba(43,238,117,0.12)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: Theme.borderRadius.full,
    alignSelf: 'flex-start',
  },
  orderStatusText: {
    fontSize: 12,
    fontFamily: Theme.fonts.semiBold,
    color: Theme.colors.primaryDark,
  },
  viewDetailsBtn: {
    borderRadius: Theme.borderRadius.full,
    overflow: 'hidden',
    shadowColor: Theme.colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 4,
  },
  viewDetailsBtnGradient: {
    paddingHorizontal: Theme.spacing.md,
    paddingVertical: Theme.spacing.sm + 2,
    borderRadius: Theme.borderRadius.full,
  },
  viewDetailsBtnText: {
    fontSize: 14,
    fontFamily: Theme.fonts.bold,
    color: '#0a1a0d',
  },

  // ── Quick Actions ──
  quickActionsRow: {
    flexDirection: 'row',
    gap: Theme.spacing.sm,
    marginBottom: Theme.spacing.md,
  },
  quickActionCard: {
    flex: 1,
    backgroundColor: Theme.colors.card,
    borderRadius: Theme.borderRadius.xl,
    padding: Theme.spacing.md,
    alignItems: 'center',
    shadowColor: 'rgba(43,238,117,0.08)',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 10,
    elevation: 2,
  },
  quickActionIconCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Theme.spacing.sm,
  },
  quickActionEmoji: { fontSize: 24 },
  quickActionLabel: {
    fontSize: 12,
    fontFamily: Theme.fonts.semiBold,
    color: Theme.colors.grey700,
    textAlign: 'center',
  },
  quickActionCardLocked: {
    opacity: 0.65,
  },
  quickActionLabelLocked: {
    color: Theme.colors.textLight,
  },

  // ── Sticky bottom bar ──
  stickyBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Theme.spacing.md,
    paddingVertical: Theme.spacing.md,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.08)',
  },
  stickyBarLeft: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  stickyBarCount: {
    ...Theme.textStyles.bodyBold,
    color: Theme.colors.white,
  },
  stickyBarDivider: {
    ...Theme.textStyles.body,
    color: 'rgba(255,255,255,0.4)',
  },
  stickyBarPrice: {
    ...Theme.textStyles.bodyBold,
    color: Theme.colors.primary,
  },
  stickyBarBtn: {
    borderRadius: Theme.borderRadius.full,
    overflow: 'hidden',
  },
  stickyBarBtnGradient: {
    paddingHorizontal: Theme.spacing.lg,
    paddingVertical: Theme.spacing.sm,
    borderRadius: Theme.borderRadius.full,
  },
  stickyBarBtnText: {
    ...Theme.textStyles.buttonSmall,
    color: '#0a1a0d',
    fontWeight: '700',
  },
});
