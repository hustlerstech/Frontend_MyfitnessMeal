/**
 * ProfileScreen (Tab) — Premium Edition
 *
 * Changes from previous version:
 *  - Dark LinearGradient header (#111827 → #1a2e1d → #0f2319) with subtitle + initials badge
 *  - SafeAreaView from react-native-safe-area-context with edges={['top']}
 *  - contentWrapper overlaps header by 28px (marginTop: -28)
 *  - useSafeAreaInsets() for correct bottom padding (paddingBottom: insets.bottom + 80)
 *  - Avatar reduced to 80px with green border; "Edit Profile" is now a LinearGradient pill
 *  - Stats: 3 StatCards → 2 ("Meals Ordered" + "Active Plan"); tracking cards removed
 *  - Subscription card: soft borderLight border (no heavy 2px green border)
 *    – Plan badge is pill-shaped; credits as icon rows (💰 / ✨); status as colour-coded pill
 *    – Action buttons: LinearGradient primary pill + outline ghost pill
 *  - Settings: subtle borderLight card border; emoji icons 18px; fontFamily tokens
 *  - Logout: SecondaryButton outline styled with error colour (red border + text)
 *  - All fontWeight strings replaced with Theme.fonts.* tokens
 *
 * Business logic (logout, useSubscriptionStore, navigation) is 100% unchanged.
 */

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { StatCard, PrimaryButton, SecondaryButton } from '../../../components';
import { Theme } from '../../../constants';
import { useAuth } from '../../../store/AuthContext';
import { useSubscriptionStore } from '@/store/subscriptionStore';


// ─── Mock user data ───────────────────────────────────────────────────────────

const USER_DATA = {
  name: 'Tejasvi Malvi',
  email: 'tejasvi.malvi@email.com',
  phone: '+91 98765 43210',
  memberSince: 'January 2024',
  stats: {
    mealsOrdered: 47,
  },
};

const SETTINGS_SECTIONS = [
  {
    title: 'Account',
    items: [
      { id: '1', icon: '👤', label: 'Edit Profile', badge: null },
      { id: '2', icon: '🎯', label: 'Fitness Goals', badge: null },
      { id: '3', icon: '🍽️', label: 'Dietary Preferences', badge: null },
      { id: '4', icon: '📍', label: 'Delivery Addresses', badge: '2' },
    ],
  },
  {
    title: 'Preferences',
    items: [
      { id: '5', icon: '🔔', label: 'Notifications', badge: null },
      { id: '6', icon: '💳', label: 'Payment Methods', badge: '1' },
      { id: '7', icon: '📦', label: 'Order History', badge: null },
      { id: '8', icon: '⭐', label: 'Favorites', badge: '8' },
    ],
  },
  {
    title: 'Support',
    items: [
      { id: '9',  icon: '❓', label: 'Help & FAQ', badge: null },
      { id: '10', icon: '💬', label: 'Contact Support', badge: null },
      { id: '11', icon: '📄', label: 'Terms & Privacy', badge: null },
      { id: '12', icon: 'ℹ️', label: 'About MyFitness Meals', badge: null },
    ],
  },
];

// ─── Helper: subscription status colour pill ──────────────────────────────────

function getSubStatusStyle(status: string): { bg: string; text: string } {
  if (status === 'active')  return { bg: 'rgba(43, 238, 117, 0.12)', text: Theme.colors.primaryDark };
  if (status === 'paused')  return { bg: 'rgba(255, 204, 0, 0.15)',  text: '#b45309' }; // amber
  return                           { bg: 'rgba(255, 59, 48, 0.12)',  text: Theme.colors.error }; // grace/expired
}

// ─── Screen ───────────────────────────────────────────────────────────────────

export default function ProfileScreen() {
  const router = useRouter();
  const { logout } = useAuth();
  const insets = useSafeAreaInsets();
  const {
    subscription,
    credits,
    canUsePlanner,
    canUseCredits,
    canDirectPay,
    isInGrace,
    graceDaysRemaining,
    pausePlan,
    resumePlan,
    renewPlan,
    setPlan,
  } = useSubscriptionStore();

  const statusStyle = getSubStatusStyle(subscription.status);

  const handleEditProfile = () => {
    console.log('Edit profile');
  };

  const handleUpgradePlan = () => {
    router.push('/customer/cart/payment');
  };

  const handleWeeklyPlanner = () => {
    router.push('/customer/meal/weekly-planner');
  };

  const handleSettingPress = (label: string) => {
    console.log('Setting pressed:', label);
  };

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: () => {
            logout();
            router.replace('/(auth)/login');
          },
        },
      ],
    );
  };

  return (
    <SafeAreaView style={styles.root} edges={['top']}>

      {/* ── Gradient Header — sticky, outside ScrollView ── */}
      <LinearGradient
        colors={['#111827', '#1a2e1d', '#0f2319']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.header}
      >
        <View style={styles.decorRing} />
        <View style={styles.headerContent}>
          <View style={{ flex: 1 }}>
            <Text style={styles.headerTitle}>Profile</Text>
            <Text style={styles.headerSubtitle}>Manage your plan & preferences</Text>
          </View>
          <View style={styles.headerAvatar}>
            <Text style={styles.headerAvatarText}>
              {USER_DATA.name.split(' ').map(n => n[0]).join('')}
            </Text>
          </View>
        </View>
      </LinearGradient>

      {/* ── Overlap content wrapper ── */}
      <View style={styles.contentWrapper}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: Math.max(insets.bottom + 80, 100) }}
        >

          {/* ── User card ── */}
          <View style={styles.userCard}>
            <View style={styles.avatarContainer}>
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>
                  {USER_DATA.name.split(' ').map(n => n[0]).join('')}
                </Text>
              </View>
              <TouchableOpacity style={styles.editAvatarButton} onPress={handleEditProfile}>
                <Text style={styles.editAvatarIcon}>✎</Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.userName}>{USER_DATA.name}</Text>
            <Text style={styles.userEmail}>{USER_DATA.email}</Text>
            <Text style={styles.memberSince}>Member since {USER_DATA.memberSince}</Text>
            <TouchableOpacity
              style={styles.editProfileButton}
              onPress={handleEditProfile}
              activeOpacity={0.85}
            >
              <LinearGradient
                colors={[Theme.colors.primary, Theme.colors.primaryDark]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.editProfileGradient}
              >
                <Text style={styles.editProfileText}>✎  Edit Profile</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>

          {/* ── Stats — 2 cards only (tracking stats removed) ── */}
          <View style={styles.statsContainer}>
            <StatCard
              value={USER_DATA.stats.mealsOrdered.toString()}
              label="Meals Ordered"
              style={styles.statCard}
            />
            <StatCard
              value={subscription.planName}
              label="Active Plan"
              valueColor={Theme.colors.primary}
              style={styles.statCard}
            />
          </View>

          {/* ── Subscription card ── */}
          <View style={styles.subscriptionSection}>
            <Text style={styles.myPlanTitle}>My Plan</Text>
            <View style={styles.subscriptionCard}>

              {/* ── Plan selector chips: Free / Basic / Premium ── */}
              <View style={styles.planSelectorRow}>
                {([
                  { id: 'free',    label: 'Free',    price: '₹0'   },
                  { id: 'basic',   label: 'Basic',   price: '₹499' },
                  { id: 'premium', label: 'Premium', price: '₹999' },
                ] as const).map((plan) => {
                  const isActive = subscription.planId === plan.id;
                  return (
                    <TouchableOpacity
                      key={plan.id}
                      style={[styles.planChip, isActive && styles.planChipActive]}
                      onPress={() => setPlan(plan.id)}
                      activeOpacity={0.75}
                    >
                      <Text style={[styles.planChipLabel, isActive && styles.planChipLabelActive]}>
                        {plan.label}
                      </Text>
                      <Text style={[styles.planChipPrice, isActive && styles.planChipPriceActive]}>
                        {plan.price}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>

              {/* ── Plan name badge + status pill ── */}
              <View style={styles.subHeader}>
                <View style={styles.planBadge}>
                  <Text style={styles.planBadgeText}>{subscription.planName}</Text>
                </View>
                <View style={[styles.statusPill, { backgroundColor: statusStyle.bg }]}>
                  <Text style={[styles.statusPillText, { color: statusStyle.text }]}>
                    {subscription.status.toUpperCase()}
                  </Text>
                </View>
              </View>

              {/* ── Paid plan: price + credits ── */}
              {subscription.planId !== 'free' && (
                <>
                  <Text style={styles.subscriptionPrice}>
                    ₹{subscription.planId === 'premium' ? 999 : 499}
                    <Text style={styles.subscriptionPeriod}>/month</Text>
                  </Text>
                  <Text style={styles.validUntil}>
                    Valid until {new Date(subscription.endDate).toLocaleDateString()}
                  </Text>
                  <View style={styles.cardDivider} />
                  <View style={styles.creditRow}>
                    <Text style={styles.creditIcon}>💰</Text>
                    <Text style={styles.creditLabel}>Total Credits</Text>
                    <Text style={styles.creditValue}>₹{credits.totalAmount}</Text>
                  </View>
                  <View style={styles.creditRow}>
                    <Text style={styles.creditIcon}>✨</Text>
                    <Text style={styles.creditLabel}>Available Credits</Text>
                    <Text style={styles.creditValue}>₹{credits.availableAmount}</Text>
                  </View>
                </>
              )}

              {/* ── Grace warning ── */}
              {isInGrace && (
                <Text style={styles.graceText}>
                  ⚠️ {graceDaysRemaining} days left in grace period
                </Text>
              )}

              {/* ── Free plan: Upgrade CTA ── */}
              {subscription.planId === 'free' && (
                <View style={styles.upgradeCta}>
                  <View style={styles.upgradeCtaHeader}>
                    <Text style={styles.upgradeCtaEmoji}>🚀</Text>
                    <Text style={styles.upgradeCtaTitle}>Unlock Planner &amp; Credits</Text>
                  </View>
                  <Text style={styles.upgradeCtaBullet}>✓  Plan meals for the next 7 days</Text>
                  <Text style={styles.upgradeCtaBullet}>✓  60–90 meal credits per month</Text>
                  <Text style={styles.upgradeCtaBullet}>✓  Free delivery on every order</Text>
                  <TouchableOpacity
                    style={styles.upgradeCtaBtn}
                    onPress={handleUpgradePlan}
                    activeOpacity={0.85}
                  >
                    <LinearGradient
                      colors={[Theme.colors.primary, Theme.colors.primaryDark]}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 0 }}
                      style={styles.upgradeCtaBtnGradient}
                    >
                      <Text style={styles.upgradeCtaBtnText}>Upgrade Now →</Text>
                    </LinearGradient>
                  </TouchableOpacity>
                </View>
              )}

              {/* ── Paid plan: Pause/Resume + Weekly Planner ── */}
              {subscription.planId !== 'free' && (
                <View style={styles.actionRow}>
                  <TouchableOpacity
                    style={styles.actionBtnPrimary}
                    onPress={
                      subscription.status === 'active'
                        ? pausePlan
                        : subscription.status === 'paused'
                          ? resumePlan
                          : renewPlan
                    }
                    activeOpacity={0.85}
                  >
                    <LinearGradient
                      colors={[Theme.colors.primary, Theme.colors.primaryDark]}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 0 }}
                      style={styles.actionBtnGradient}
                    >
                      <Text style={styles.actionBtnPrimaryText}>
                        {subscription.status === 'active'
                          ? 'Pause Plan'
                          : subscription.status === 'paused'
                            ? 'Resume Plan'
                            : 'Renew Plan'}
                      </Text>
                    </LinearGradient>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.actionBtnSecondary}
                    onPress={handleWeeklyPlanner}
                    activeOpacity={0.85}
                  >
                    <Text style={styles.actionBtnSecondaryText}>📅 Weekly Planner</Text>
                  </TouchableOpacity>
                </View>
              )}

            </View>
          </View>

          {/* ── Settings sections ── */}
          {SETTINGS_SECTIONS.map((section) => (
            <View key={section.title} style={styles.settingsSection}>
              <Text style={styles.sectionTitle}>{section.title}</Text>
              <View style={styles.settingsCard}>
                {section.items.map((item, index) => (
                  <TouchableOpacity
                    key={item.id}
                    style={[
                      styles.settingItem,
                      index !== section.items.length - 1 && styles.settingItemBorder,
                    ]}
                    onPress={() => handleSettingPress(item.label)}
                    activeOpacity={0.7}
                  >
                    <View style={styles.settingLeft}>
                      <Text style={styles.settingIcon}>{item.icon}</Text>
                      <Text style={styles.settingLabel}>{item.label}</Text>
                    </View>
                    <View style={styles.settingRight}>
                      {item.badge && (
                        <View style={styles.settingBadge}>
                          <Text style={styles.settingBadgeText}>{item.badge}</Text>
                        </View>
                      )}
                      <Text style={styles.settingArrow}>›</Text>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          ))}

          {/* ── Logout — calm destructive outline ── */}
          <View style={styles.logoutSection}>
            <SecondaryButton
              title="Logout"
              onPress={handleLogout}
              outline
              style={{ borderColor: Theme.colors.error }}
              textStyle={{ color: Theme.colors.error }}
              icon={<Text style={{ fontSize: 16, color: Theme.colors.error }}>⎋</Text>}
            />
          </View>

          <Text style={styles.appVersion}>MyFitness Meals v1.0.0</Text>

        </ScrollView>
      </View>

    </SafeAreaView>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({

  // ── Root & layout ──────────────────────────────────────────────────────────

  root: {
    flex: 1,
    backgroundColor: Theme.colors.background,
  },

  // ── Header (LinearGradient) ────────────────────────────────────────────────

  header: {
    paddingHorizontal: Theme.spacing.screenPadding,
    paddingTop: Theme.spacing.lg,
    paddingBottom: 44,
    overflow: 'hidden',
  },
  decorRing: {
    position: 'absolute',
    width: 200,
    height: 200,
    borderRadius: 100,
    borderWidth: 28,
    borderColor: 'rgba(255,255,255,0.05)',
    top: -60,
    right: -60,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    ...Theme.textStyles.h2,
    color: Theme.colors.white,
    fontFamily: Theme.fonts.extraBold,
  },
  headerSubtitle: {
    ...Theme.textStyles.bodySmall,
    color: 'rgba(255,255,255,0.6)',
    fontFamily: Theme.fonts.regular,
    marginTop: Theme.spacing.xs,
  },
  headerAvatar: {
    width: 48,
    height: 48,
    borderRadius: Theme.borderRadius.full,
    backgroundColor: 'rgba(43,238,117,0.2)',
    borderWidth: 2,
    borderColor: Theme.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerAvatarText: {
    fontSize: 16,
    fontFamily: Theme.fonts.bold,
    color: Theme.colors.primary,
  },

  // ── Content wrapper (overlaps header) ────────────────────────────────────

  contentWrapper: {
    marginTop: -28,
    flex: 1,
    backgroundColor: Theme.colors.background,
  },

  // ── User card ─────────────────────────────────────────────────────────────

  userCard: {
    alignItems: 'center',
    paddingVertical: Theme.spacing.lg,
    marginHorizontal: Theme.spacing.screenPadding,
    marginBottom: Theme.spacing.lg,
    backgroundColor: Theme.colors.card,
    borderRadius: Theme.borderRadius.md,
    borderWidth: 1,
    borderColor: Theme.colors.borderLight,
    ...Theme.shadows.sm,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: Theme.spacing.md,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: Theme.borderRadius.full,
    backgroundColor: Theme.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: Theme.colors.primary,
  },
  avatarText: {
    ...Theme.textStyles.h2,
    color: Theme.colors.textInverse,
    fontFamily: Theme.fonts.extraBold,
  },
  editAvatarButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 28,
    height: 28,
    borderRadius: Theme.borderRadius.full,
    backgroundColor: Theme.colors.background,
    borderWidth: 2,
    borderColor: Theme.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  editAvatarIcon: {
    fontSize: 14,
    color: Theme.colors.primary,
  },
  userName: {
    ...Theme.textStyles.h2,
    color: Theme.colors.text,
    marginBottom: Theme.spacing.xs,
  },
  userEmail: {
    ...Theme.textStyles.body,
    color: Theme.colors.textSecondary,
    marginBottom: Theme.spacing.xs,
  },
  memberSince: {
    ...Theme.textStyles.caption,
    color: Theme.colors.textLight,
    marginBottom: Theme.spacing.md,
  },
  editProfileButton: {
    borderRadius: Theme.borderRadius.full,
    overflow: 'hidden',
    marginTop: Theme.spacing.xs,
  },
  editProfileGradient: {
    paddingHorizontal: Theme.spacing.lg,
    paddingVertical: Theme.spacing.sm,
    alignItems: 'center',
  },
  editProfileText: {
    ...Theme.textStyles.bodySmall,
    color: Theme.colors.textInverse,
    fontFamily: Theme.fonts.semiBold,
  },

  // ── Stats container ───────────────────────────────────────────────────────

  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: Theme.spacing.screenPadding,
    gap: Theme.spacing.md,
    marginBottom: Theme.spacing.xl,
  },
  statCard: {
    flex: 1,
    marginHorizontal: 0,
    marginBottom: 0,
  },

  // ── Subscription card ─────────────────────────────────────────────────────

  subscriptionSection: {
    paddingHorizontal: Theme.spacing.screenPadding,
    marginBottom: Theme.spacing.xl,
  },
  subscriptionCard: {
    backgroundColor: Theme.colors.card,
    borderRadius: Theme.borderRadius.md,
    padding: Theme.spacing.md,
    borderWidth: 1,
    borderColor: Theme.colors.borderLight,
    ...Theme.shadows.sm,
  },
  subHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: Theme.spacing.sm,
  },
  planBadge: {
    backgroundColor: Theme.colors.primary,
    paddingHorizontal: Theme.spacing.sm,
    paddingVertical: Theme.spacing.xs,
    borderRadius: Theme.borderRadius.full,
    marginBottom: Theme.spacing.xs,
    alignSelf: 'flex-start',
  },
  planBadgeText: {
    ...Theme.textStyles.caption,
    color: Theme.colors.textInverse,
    fontFamily: Theme.fonts.bold,
    textTransform: 'uppercase',
  },
  subscriptionPrice: {
    ...Theme.textStyles.h1,
    color: Theme.colors.primary,
  },
  subscriptionPeriod: {
    ...Theme.textStyles.body,
    color: Theme.colors.textSecondary,
  },
  upgradeLink: {
    ...Theme.textStyles.link,
    color: Theme.colors.primary,
    fontFamily: Theme.fonts.semiBold,
  },
  validUntil: {
    ...Theme.textStyles.caption,
    color: Theme.colors.textSecondary,
    marginBottom: Theme.spacing.xs,
  },
  cardDivider: {
    height: 1,
    backgroundColor: Theme.colors.borderLight,
    marginVertical: Theme.spacing.md,
  },
  creditRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Theme.spacing.sm,
  },
  creditIcon: {
    fontSize: 14,
    marginRight: Theme.spacing.sm,
  },
  creditLabel: {
    ...Theme.textStyles.bodySmall,
    color: Theme.colors.textSecondary,
    flex: 1,
    fontFamily: Theme.fonts.regular,
  },
  creditValue: {
    ...Theme.textStyles.bodySmall,
    fontFamily: Theme.fonts.semiBold,
    color: Theme.colors.text,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: Theme.spacing.xs,
  },
  statusLabel: {
    ...Theme.textStyles.bodySmall,
    color: Theme.colors.textSecondary,
    flex: 1,
    fontFamily: Theme.fonts.regular,
  },
  statusPill: {
    paddingHorizontal: Theme.spacing.sm,
    paddingVertical: Theme.spacing.xs,
    borderRadius: Theme.borderRadius.full,
  },
  statusPillText: {
    fontSize: 11,
    fontFamily: Theme.fonts.bold,
    textTransform: 'capitalize',
  },
  graceText: {
    ...Theme.textStyles.caption,
    color: Theme.colors.error,
    fontFamily: Theme.fonts.semiBold,
    marginTop: Theme.spacing.xs,
  },
  actionRow: {
    marginTop: Theme.spacing.md,
    gap: Theme.spacing.sm,
  },
  actionBtnPrimary: {
    borderRadius: Theme.borderRadius.full,
    overflow: 'hidden',
  },
  actionBtnGradient: {
    paddingVertical: Theme.spacing.sm,
    paddingHorizontal: Theme.spacing.md,
    alignItems: 'center',
  },
  actionBtnPrimaryText: {
    ...Theme.textStyles.bodySmall,
    fontFamily: Theme.fonts.semiBold,
    color: '#0a1a0d',
  },
  actionBtnSecondary: {
    borderRadius: Theme.borderRadius.full,
    borderWidth: 1,
    borderColor: Theme.colors.primary,
    paddingVertical: Theme.spacing.sm,
    paddingHorizontal: Theme.spacing.md,
    alignItems: 'center',
  },
  actionBtnSecondaryText: {
    ...Theme.textStyles.bodySmall,
    fontFamily: Theme.fonts.semiBold,
    color: Theme.colors.primary,
  },

  // ── Settings sections ─────────────────────────────────────────────────────

  settingsSection: {
    marginBottom: Theme.spacing.lg,
  },
  sectionTitle: {
    ...Theme.textStyles.h4,
    color: Theme.colors.text,
    fontFamily: Theme.fonts.bold,
    paddingHorizontal: Theme.spacing.screenPadding,
    marginBottom: Theme.spacing.md,
  },
  settingsCard: {
    backgroundColor: Theme.colors.card,
    marginHorizontal: Theme.spacing.screenPadding,
    borderRadius: Theme.borderRadius.md,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: Theme.colors.borderLight,
    ...Theme.shadows.xs,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: Theme.spacing.md,
    paddingHorizontal: Theme.spacing.md,
    minHeight: 56,
  },
  settingItemBorder: {
    borderBottomWidth: 1,
    borderBottomColor: Theme.colors.borderLight,
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingIcon: {
    fontSize: 18,
    marginRight: Theme.spacing.md,
  },
  settingLabel: {
    ...Theme.textStyles.body,
    color: Theme.colors.text,
    fontFamily: Theme.fonts.regular,
  },
  settingRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingBadge: {
    backgroundColor: Theme.colors.primary,
    paddingHorizontal: Theme.spacing.sm,
    paddingVertical: 2,
    borderRadius: Theme.borderRadius.full,
    marginRight: Theme.spacing.sm,
    minWidth: 20,
    alignItems: 'center',
  },
  settingBadgeText: {
    ...Theme.textStyles.caption,
    color: Theme.colors.textInverse,
    fontFamily: Theme.fonts.semiBold,
    fontSize: 11,
  },
  settingArrow: {
    fontSize: 24,
    color: Theme.colors.textLight,
  },

  // ── Logout & footer ───────────────────────────────────────────────────────

  logoutSection: {
    paddingHorizontal: Theme.spacing.screenPadding,
    marginBottom: Theme.spacing.md,
  },
  appVersion: {
    ...Theme.textStyles.caption,
    color: Theme.colors.textLight,
    textAlign: 'center',
    marginBottom: Theme.spacing.md,
  },

  // ── My Plan section title ─────────────────────────────────────────────────

  myPlanTitle: {
    ...Theme.textStyles.h4,
    color: Theme.colors.text,
    fontFamily: Theme.fonts.bold,
    marginBottom: Theme.spacing.sm,
  },

  // ── Plan selector chips (Free / Basic / Premium) ──────────────────────────

  planSelectorRow: {
    flexDirection: 'row',
    gap: Theme.spacing.sm,
    marginBottom: Theme.spacing.md,
  },
  planChip: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: Theme.spacing.sm,
    borderRadius: Theme.borderRadius.full,
    backgroundColor: Theme.colors.backgroundSecondary,
    borderWidth: 1,
    borderColor: Theme.colors.borderLight,
  },
  planChipActive: {
    backgroundColor: Theme.colors.primary,
    borderColor: Theme.colors.primary,
  },
  planChipLabel: {
    fontSize: 12,
    fontFamily: Theme.fonts.bold,
    color: Theme.colors.textSecondary,
  },
  planChipLabelActive: {
    color: '#0a1a0d',
  },
  planChipPrice: {
    fontSize: 10,
    fontFamily: Theme.fonts.regular,
    color: Theme.colors.textLight,
    marginTop: 2,
  },
  planChipPriceActive: {
    color: 'rgba(10,26,13,0.65)',
  },

  // ── Upgrade CTA (shown for Free plan users) ───────────────────────────────

  upgradeCta: {
    backgroundColor: 'rgba(43,238,117,0.06)',
    borderRadius: Theme.borderRadius.md,
    padding: Theme.spacing.md,
    borderWidth: 1,
    borderColor: 'rgba(43,238,117,0.2)',
    marginBottom: Theme.spacing.sm,
    marginTop: Theme.spacing.xs,
  },
  upgradeCtaHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Theme.spacing.sm,
    marginBottom: Theme.spacing.sm,
  },
  upgradeCtaEmoji: {
    fontSize: 22,
  },
  upgradeCtaTitle: {
    ...Theme.textStyles.bodyBold,
    color: Theme.colors.text,
    fontFamily: Theme.fonts.bold,
    flex: 1,
  },
  upgradeCtaBullet: {
    ...Theme.textStyles.bodySmall,
    color: Theme.colors.textSecondary,
    fontFamily: Theme.fonts.regular,
    marginBottom: Theme.spacing.xs,
    paddingLeft: Theme.spacing.xs,
  },
  upgradeCtaBtn: {
    borderRadius: Theme.borderRadius.full,
    overflow: 'hidden',
    marginTop: Theme.spacing.sm,
  },
  upgradeCtaBtnGradient: {
    paddingVertical: Theme.spacing.sm,
    paddingHorizontal: Theme.spacing.md,
    alignItems: 'center',
  },
  upgradeCtaBtnText: {
    ...Theme.textStyles.bodySmall,
    fontFamily: Theme.fonts.bold,
    color: '#0a1a0d',
  },

});
