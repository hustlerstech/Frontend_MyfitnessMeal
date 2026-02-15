/**
 * ProfileScreen (Tab)
 * 
 * User profile and settings
 * Features:
 * - User info header
 * - Stats overview
 * - Subscription plan card
 * - Settings menu
 * - Logout button
 * 
 * UI only - no backend integration yet
 */

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { StatCard, Card, PrimaryButton, SecondaryButton } from '../../components';
import { Theme } from '../../constants';
import { useAuth } from '../../store/AuthContext';

// Mock user data
const USER_DATA = {
  name: 'Tejasvi Malvi',
  email: 'tejasvi.malvi@email.com',
  phone: '+91 98765 43210',
  memberSince: 'January 2024',
  stats: {
    mealsOrdered: 47,
    caloriesSaved: 12400,
    daysStreak: 12,
  },
  subscription: {
    plan: 'Premium',
    price: 999,
    period: 'month',
    validUntil: 'March 15, 2024',
    features: [
      'Unlimited meal plans',
      'Priority chef selection',
      'Free delivery',
      'Nutrition consultation',
    ],
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
      { id: '9', icon: '❓', label: 'Help & FAQ', badge: null },
      { id: '10', icon: '💬', label: 'Contact Support', badge: null },
      { id: '11', icon: '📄', label: 'Terms & Privacy', badge: null },
      { id: '12', icon: 'ℹ️', label: 'About MyFitness Meals', badge: null },
    ],
  },
];

export default function ProfileScreen() {
  const router = useRouter();
  const { logout } = useAuth();

  const handleEditProfile = () => {
    console.log('Edit profile');
  };

  const handleUpgradePlan = () => {
    router.push('/payment');
  };

  const handleSettingPress = (label: string) => {
    console.log('Setting pressed:', label);
  };

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: () => {
            logout(); // Clear auth state
            router.replace('/(auth)/login'); // Navigate to login
          },
        },
      ],
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Profile</Text>
        </View>

        {/* User Info Card */}
        <View style={styles.userCard}>
          {/* Avatar */}
          <View style={styles.avatarContainer}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>
                {USER_DATA.name.split(' ').map(n => n[0]).join('')}
              </Text>
            </View>
            <TouchableOpacity
              style={styles.editAvatarButton}
              onPress={handleEditProfile}
            >
              <Text style={styles.editAvatarIcon}>✎</Text>
            </TouchableOpacity>
          </View>

          {/* User Info */}
          <Text style={styles.userName}>{USER_DATA.name}</Text>
          <Text style={styles.userEmail}>{USER_DATA.email}</Text>
          <Text style={styles.memberSince}>
            Member since {USER_DATA.memberSince}
          </Text>

          {/* Edit Profile Button */}
          <TouchableOpacity
            style={styles.editProfileButton}
            onPress={handleEditProfile}
          >
            <Text style={styles.editProfileText}>Edit Profile</Text>
          </TouchableOpacity>
        </View>

        {/* Stats Overview */}
        <View style={styles.statsContainer}>
          <StatCard
            value={USER_DATA.stats.mealsOrdered.toString()}
            label="Meals Ordered"
            style={styles.statCard}
          />
          <StatCard
            value={`${(USER_DATA.stats.caloriesSaved / 1000).toFixed(1)}K`}
            label="Calories Managed"
            style={styles.statCard}
          />
          <StatCard
            value={`${USER_DATA.stats.daysStreak}`}
            label="Days Streak"
            valueColor={Theme.colors.primary}
            style={styles.statCard}
          />
        </View>

        {/* Subscription Plan Card */}
        <View style={styles.subscriptionSection}>
          <View style={styles.subscriptionCard}>
            <View style={styles.subscriptionHeader}>
              <View>
                <View style={styles.planBadge}>
                  <Text style={styles.planBadgeText}>
                    {USER_DATA.subscription.plan}
                  </Text>
                </View>
                <Text style={styles.subscriptionPrice}>
                  ₹{USER_DATA.subscription.price}
                  <Text style={styles.subscriptionPeriod}>
                    /{USER_DATA.subscription.period}
                  </Text>
                </Text>
              </View>
              <TouchableOpacity onPress={handleUpgradePlan}>
                <Text style={styles.upgradeLink}>Upgrade</Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.validUntil}>
              Valid until {USER_DATA.subscription.validUntil}
            </Text>

            <View style={styles.featuresContainer}>
              {USER_DATA.subscription.features.map((feature, index) => (
                <View key={index} style={styles.featureItem}>
                  <Text style={styles.featureCheck}>✓</Text>
                  <Text style={styles.featureText}>{feature}</Text>
                </View>
              ))}
            </View>

            <TouchableOpacity
              style={styles.managePlanButton}
              onPress={() => router.push('/payment')}
            >
              <Text style={styles.managePlanText}>Manage Subscription</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Settings Sections */}
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

        {/* Logout Button */}
        <View style={styles.logoutSection}>
          <SecondaryButton
            title="Logout"
            onPress={handleLogout}
            outline
            icon={<Text style={styles.logoutIcon}>⎋</Text>}
          />
        </View>

        {/* App Version */}
        <Text style={styles.appVersion}>MyFitness Meals v1.0.0</Text>

        {/* Bottom Spacing */}
        <View style={styles.bottomSpacing} />
      </ScrollView>
    </SafeAreaView>
  );
}

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
  },
  userCard: {
    alignItems: 'center',
    paddingVertical: Theme.spacing.xl,
    marginHorizontal: Theme.spacing.screenPadding,
    marginBottom: Theme.spacing.lg,
    backgroundColor: Theme.colors.card,
    borderRadius: Theme.borderRadius.md,
    ...Theme.shadows.sm,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: Theme.spacing.md,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: Theme.borderRadius.full,
    backgroundColor: Theme.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    ...Theme.textStyles.displayMedium,
    color: Theme.colors.textInverse,
    fontWeight: '700',
  },
  editAvatarButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 32,
    height: 32,
    borderRadius: Theme.borderRadius.full,
    backgroundColor: Theme.colors.background,
    borderWidth: 2,
    borderColor: Theme.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  editAvatarIcon: {
    fontSize: 16,
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
    paddingHorizontal: Theme.spacing.lg,
    paddingVertical: Theme.spacing.sm,
    borderRadius: Theme.borderRadius.full,
    borderWidth: 1,
    borderColor: Theme.colors.primary,
  },
  editProfileText: {
    ...Theme.textStyles.bodySmall,
    color: Theme.colors.primary,
    fontWeight: '600',
  },
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
  subscriptionSection: {
    paddingHorizontal: Theme.spacing.screenPadding,
    marginBottom: Theme.spacing.xl,
  },
  subscriptionCard: {
    backgroundColor: Theme.colors.card,
    borderRadius: Theme.borderRadius.md,
    padding: Theme.spacing.md,
    borderWidth: 2,
    borderColor: Theme.colors.primary,
    ...Theme.shadows.sm,
  },
  subscriptionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: Theme.spacing.sm,
  },
  planBadge: {
    backgroundColor: Theme.colors.primary,
    paddingHorizontal: Theme.spacing.sm,
    paddingVertical: Theme.spacing.xs,
    borderRadius: Theme.borderRadius.xs,
    marginBottom: Theme.spacing.xs,
    alignSelf: 'flex-start',
  },
  planBadgeText: {
    ...Theme.textStyles.caption,
    color: Theme.colors.textInverse,
    fontWeight: '700',
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
    textDecorationLine: 'none',
  },
  validUntil: {
    ...Theme.textStyles.caption,
    color: Theme.colors.textSecondary,
    marginBottom: Theme.spacing.md,
  },
  featuresContainer: {
    gap: Theme.spacing.sm,
    marginBottom: Theme.spacing.md,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  featureCheck: {
    fontSize: 16,
    color: Theme.colors.primary,
    marginRight: Theme.spacing.sm,
    fontWeight: '700',
  },
  featureText: {
    ...Theme.textStyles.body,
    color: Theme.colors.text,
  },
  managePlanButton: {
    paddingVertical: Theme.spacing.sm,
    alignItems: 'center',
  },
  managePlanText: {
    ...Theme.textStyles.bodySmall,
    color: Theme.colors.primary,
    fontWeight: '600',
  },
  settingsSection: {
    marginBottom: Theme.spacing.lg,
  },
  sectionTitle: {
    ...Theme.textStyles.h4,
    color: Theme.colors.text,
    paddingHorizontal: Theme.spacing.screenPadding,
    marginBottom: Theme.spacing.md,
  },
  settingsCard: {
    backgroundColor: Theme.colors.card,
    marginHorizontal: Theme.spacing.screenPadding,
    borderRadius: Theme.borderRadius.md,
    overflow: 'hidden',
    ...Theme.shadows.xs,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: Theme.spacing.md,
    paddingHorizontal: Theme.spacing.md,
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
    fontSize: 20,
    marginRight: Theme.spacing.md,
  },
  settingLabel: {
    ...Theme.textStyles.body,
    color: Theme.colors.text,
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
    fontWeight: '600',
    fontSize: 11,
  },
  settingArrow: {
    fontSize: 24,
    color: Theme.colors.textLight,
  },
  logoutSection: {
    paddingHorizontal: Theme.spacing.screenPadding,
    marginBottom: Theme.spacing.md,
  },
  logoutIcon: {
    fontSize: 18,
  },
  appVersion: {
    ...Theme.textStyles.caption,
    color: Theme.colors.textLight,
    textAlign: 'center',
    marginBottom: Theme.spacing.md,
  },
  bottomSpacing: {
    height: Theme.spacing.lg,
  },
});

