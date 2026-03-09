/**
 * PaymentScreen
 *
 * Subscription plan selection and payment
 * Features:
 * - Plan options (Free, Basic, Premium)
 * - Feature comparison
 * - Price summary
 * - Payment button
 *
 * UI only - no payment integration yet
 */

import React, { useState } from 'react';
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
import { PrimaryButton, BackButton } from '../../../components';
import { Theme } from '../../../constants';
import { useSubscriptionStore } from '@/store/subscriptionStore';
import type { PlanId } from '@/store/subscriptionStore';

// ─── Plan data (feature text updated: "tracking" → meal-planning wording) ─────
const PLANS = [
  {
    id: 'free',
    name: 'Free',
    price: 0,
    period: 'forever',
    popular: false,
    features: [
      { text: '5 meals per week', included: true },
      { text: 'Basic meal plans', included: true },
      { text: 'Nutrition info', included: true },       // was 'Calorie tracking'
      { text: 'Standard delivery', included: true },
      { text: 'Priority chef selection', included: false },
      { text: 'Nutrition consultation', included: false },
      { text: 'Free delivery', included: false },
      { text: '24/7 support', included: false },
    ],
  },
  {
    id: 'basic',
    name: 'Basic',
    price: 499,
    period: 'month',
    popular: false,
    features: [
      { text: '15 meals per week', included: true },
      { text: 'Custom meal plans', included: true },
      { text: 'Meal planning tools', included: true },  // was 'Advanced tracking'
      { text: 'Standard delivery', included: true },
      { text: 'Priority chef selection', included: true },
      { text: 'Nutrition consultation', included: false },
      { text: 'Free delivery', included: false },
      { text: '24/7 support', included: true },
    ],
  },
  {
    id: 'premium',
    name: 'Premium',
    price: 999,
    period: 'month',
    popular: true,
    features: [
      { text: 'Unlimited meals', included: true },
      { text: 'Personalized meal plans', included: true },
      { text: 'Planner access', included: true },       // was 'Complete tracking suite'
      { text: 'Express delivery', included: true },
      { text: 'Priority chef selection', included: true },
      { text: 'Weekly nutrition consultation', included: true },
      { text: 'Free delivery', included: true },
      { text: '24/7 priority support', included: true },
    ],
  },
];

// ─── PaymentScreen ─────────────────────────────────────────────────────────────
export default function PaymentScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  // ─── Subscription store ───────────────────────────────────────────
  const { subscription, setPlan } = useSubscriptionStore();

  // Pre-select the user's current plan so it's highlighted on open.
  const [selectedPlan, setSelectedPlan] = useState<string>(subscription.planId);
  const [billingPeriod, setBillingPeriod] = useState<'month' | 'year'>('month');

  // ─── Pricing logic ────────────────────────────────────────────────
  const currentPlan = PLANS.find(p => p.id === selectedPlan);
  const finalPrice = currentPlan?.price || 0;
  const yearlyDiscount = billingPeriod === 'year' ? 0.2 : 0;
  const yearlyPrice = finalPrice * 12 * (1 - yearlyDiscount);
  const displayPrice = billingPeriod === 'year' ? yearlyPrice : finalPrice;

  // ─── Activate plan (demo) ─────────────────────────────────────────
  // 1. Calls setPlan() → updates Zustand instantly + writes to JSON (async).
  // 2. Shows success alert.
  // 3. Navigates to profile so the user sees the updated plan immediately.
  const handlePayment = () => {
    setPlan(selectedPlan as PlanId, billingPeriod);
    Alert.alert(
      'Plan Activated! 🎉',
      `You are now on the ${currentPlan?.name} plan.`,
      [{
        text: 'OK',
        onPress: () => router.replace('/customer/(tabs)/profile'),
      }],
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
          <BackButton onPress={() => router.back()} />
          <Text style={styles.headerTitle}>Choose Your Plan</Text>
          <View style={styles.headerSpacer} />
        </View>
      </LinearGradient>

      <ScrollView
        style={{ flex: 1 }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: Math.max(insets.bottom + 32, 48) }}
      >

        {/* ── Billing Period Toggle ── */}
        <View style={styles.billingToggleContainer}>
          <TouchableOpacity
            style={[
              styles.billingToggle,
              billingPeriod === 'month' && styles.billingToggleActive,
            ]}
            onPress={() => setBillingPeriod('month')}
            activeOpacity={0.7}
          >
            <Text
              style={[
                styles.billingToggleText,
                billingPeriod === 'month' && styles.billingToggleTextActive,
              ]}
            >
              Monthly
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.billingToggle,
              billingPeriod === 'year' && styles.billingToggleActive,
            ]}
            onPress={() => setBillingPeriod('year')}
            activeOpacity={0.7}
          >
            <Text
              style={[
                styles.billingToggleText,
                billingPeriod === 'year' && styles.billingToggleTextActive,
              ]}
            >
              Yearly
            </Text>
            {/* Premium save badge — green-tint pill, not harsh red */}
            <View style={styles.saveBadge}>
              <Text style={styles.saveBadgeText}>Save 20%</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* ── Plan Cards ── */}
        <View style={styles.plansContainer}>
          {PLANS.map((plan) => (
            <TouchableOpacity
              key={plan.id}
              style={[
                styles.planCard,
                selectedPlan === plan.id && styles.planCardSelected,
              ]}
              onPress={() => setSelectedPlan(plan.id)}
              activeOpacity={0.8}
            >
              {/* Popular Badge — premium green-tint pill */}
              {plan.popular && (
                <View style={styles.popularBadge}>
                  <Text style={styles.popularBadgeText}>MOST POPULAR</Text>
                </View>
              )}

              {/* Current Plan badge — shown when this plan is already active */}
              {subscription.planId === plan.id && (
                <View style={styles.currentPlanBadge}>
                  <Text style={styles.currentPlanBadgeText}>✓ CURRENT PLAN</Text>
                </View>
              )}

              {/* Plan Header */}
              <View style={styles.planHeader}>
                <View>
                  <Text style={styles.planName}>{plan.name}</Text>
                  <View style={styles.priceContainer}>
                    <Text style={styles.planPrice}>
                      ₹{billingPeriod === 'year' && plan.price > 0
                        ? Math.round(plan.price * 12 * 0.8 / 12)
                        : plan.price}
                    </Text>
                    {plan.price > 0 && (
                      <Text style={styles.planPeriod}>
                        /{billingPeriod === 'year' ? 'mo' : 'month'}
                      </Text>
                    )}
                  </View>
                  {billingPeriod === 'year' && plan.price > 0 && (
                    <Text style={styles.billedAnnually}>
                      Billed ₹{Math.round(plan.price * 12 * 0.8)} annually
                    </Text>
                  )}
                </View>

                {/* Radio Button */}
                <View style={styles.radioContainer}>
                  <View
                    style={[
                      styles.radioOuter,
                      selectedPlan === plan.id && styles.radioOuterSelected,
                    ]}
                  >
                    {selectedPlan === plan.id && (
                      <View style={styles.radioInner} />
                    )}
                  </View>
                </View>
              </View>

              {/* Features List */}
              <View style={styles.featuresContainer}>
                {plan.features.map((feature, index) => (
                  <View key={index} style={styles.featureRow}>
                    <Text
                      style={[
                        styles.featureIcon,
                        !feature.included && styles.featureIconDisabled,
                      ]}
                    >
                      {feature.included ? '✓' : '×'}
                    </Text>
                    <Text
                      style={[
                        styles.featureText,
                        !feature.included && styles.featureTextDisabled,
                      ]}
                    >
                      {feature.text}
                    </Text>
                  </View>
                ))}
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* ── Price Summary ── */}
        <View style={styles.summaryCard}>
          <Text style={styles.summaryTitle}>Price Summary</Text>

          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Plan</Text>
            <Text style={styles.summaryValue}>{currentPlan?.name}</Text>
          </View>

          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Billing Period</Text>
            <Text style={styles.summaryValue}>
              {billingPeriod === 'year' ? 'Yearly' : 'Monthly'}
            </Text>
          </View>

          {billingPeriod === 'year' && finalPrice > 0 && (
            <>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Subtotal</Text>
                <Text style={styles.summaryValue}>₹{finalPrice * 12}</Text>
              </View>

              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Discount (20%)</Text>
                <Text style={[styles.summaryValue, styles.discountText]}>
                  -₹{Math.round(finalPrice * 12 * 0.2)}
                </Text>
              </View>
            </>
          )}

          <View style={styles.summaryDivider} />

          <View style={styles.summaryRow}>
            <Text style={styles.summaryTotalLabel}>Total</Text>
            <Text style={styles.summaryTotal}>
              ₹{billingPeriod === 'year' ? Math.round(yearlyPrice) : displayPrice}
            </Text>
          </View>

          {billingPeriod === 'year' && finalPrice > 0 && (
            <Text style={styles.savingsText}>
              You save ₹{Math.round(finalPrice * 12 * 0.2)} with yearly billing!
            </Text>
          )}
        </View>

        {/* ── Payment Button ── */}
        <View style={styles.paymentSection}>
          <PrimaryButton
            title={
              finalPrice === 0
                ? 'Continue with Free Plan'
                : `Pay ₹${billingPeriod === 'year' ? Math.round(yearlyPrice) : displayPrice}`
            }
            onPress={handlePayment}
            disabled={!selectedPlan}
          />

          {/* Payment Methods */}
          {finalPrice > 0 && (
            <View style={styles.paymentMethods}>
              <Text style={styles.paymentMethodsLabel}>We accept:</Text>
              <View style={styles.paymentIcons}>
                <PaymentMethodIcon emoji="💳" label="Card" />
                <PaymentMethodIcon emoji="🏦" label="UPI" />
                <PaymentMethodIcon emoji="📱" label="Wallet" />
                <PaymentMethodIcon emoji="🏧" label="Net Banking" />
              </View>
            </View>
          )}

          {/* Terms */}
          <Text style={styles.termsText}>
            By continuing, you agree to our{' '}
            <Text style={styles.termsLink}>Terms of Service</Text> and{' '}
            <Text style={styles.termsLink}>Privacy Policy</Text>
          </Text>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

// ─── PaymentMethodIcon sub-component (unchanged) ──────────────────────────────
interface PaymentMethodIconProps {
  emoji: string;
  label: string;
}

const PaymentMethodIcon: React.FC<PaymentMethodIconProps> = ({ emoji, label }) => (
  <View style={styles.paymentIcon}>
    <Text style={styles.paymentIconEmoji}>{emoji}</Text>
    <Text style={styles.paymentIconLabel}>{label}</Text>
  </View>
);

// ─── Styles ───────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({

  // ── Root ──────────────────────────────────────────────────────────
  root: {
    flex: 1,
    backgroundColor: Theme.colors.background,
  },

  // ── Header ────────────────────────────────────────────────────────
  header: {
    paddingHorizontal: Theme.spacing.screenPadding,
    paddingTop: Theme.spacing.sm,
    paddingBottom: 40,
    overflow: 'hidden',
  },
  decorRing: {
    position: 'absolute',
    width: 180,
    height: 180,
    borderRadius: 90,
    borderWidth: 24,
    borderColor: 'rgba(255,255,255,0.05)',
    top: -60,
    right: -50,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    ...Theme.textStyles.h3,
    color: Theme.colors.white,
    fontFamily: Theme.fonts.extraBold,
  },
  headerSpacer: {
    width: 40,   // matches BackButton width so title stays centered
  },

  // ── Billing Toggle ────────────────────────────────────────────────
  billingToggleContainer: {
    flexDirection: 'row',
    backgroundColor: Theme.colors.backgroundSecondary,
    marginHorizontal: Theme.spacing.screenPadding,
    marginTop: Theme.spacing.md,
    marginBottom: Theme.spacing.md,
    padding: Theme.spacing.xs,
    borderRadius: Theme.borderRadius.full,
  },
  billingToggle: {
    flex: 1,
    paddingVertical: Theme.spacing.sm,
    paddingHorizontal: Theme.spacing.md,
    borderRadius: Theme.borderRadius.full,
    alignItems: 'center',
    position: 'relative',
  },
  billingToggleActive: {
    backgroundColor: Theme.colors.primary,
  },
  billingToggleText: {
    ...Theme.textStyles.bodyBold,
    color: Theme.colors.textSecondary,
    fontFamily: Theme.fonts.semiBold,
  },
  billingToggleTextActive: {
    color: Theme.colors.textInverse,
    fontFamily: Theme.fonts.bold,
  },
  // Premium green-tint pill badge (not harsh red)
  saveBadge: {
    position: 'absolute',
    top: -8,
    right: -8,
    backgroundColor: 'rgba(43,238,117,0.15)',
    paddingHorizontal: Theme.spacing.xs + 2,
    paddingVertical: 2,
    borderRadius: Theme.borderRadius.full,
    borderWidth: 1,
    borderColor: Theme.colors.primaryDark,
  },
  saveBadgeText: {
    ...Theme.textStyles.badge,
    color: Theme.colors.primaryDark,
    fontSize: 10,
    fontFamily: Theme.fonts.bold,
  },

  // ── Plan Cards ────────────────────────────────────────────────────
  plansContainer: {
    paddingHorizontal: Theme.spacing.screenPadding,
    gap: Theme.spacing.sm,       // was md — tighter
    marginBottom: Theme.spacing.xl,
  },
  planCard: {
    backgroundColor: Theme.colors.card,
    borderRadius: Theme.borderRadius.md,
    padding: Theme.spacing.md,
    borderWidth: 1,              // was 2 — softer
    borderColor: Theme.colors.borderLight,
    position: 'relative',
    ...Theme.shadows.sm,
  },
  planCardSelected: {
    borderWidth: 2,              // was 3 — less heavy
    borderColor: Theme.colors.primary,
  },
  // Premium green-tint popular badge (not solid green)
  popularBadge: {
    position: 'absolute',
    top: -10,
    left: Theme.spacing.md,
    backgroundColor: 'rgba(43,238,117,0.12)',
    paddingHorizontal: Theme.spacing.sm,
    paddingVertical: Theme.spacing.xs,
    borderRadius: Theme.borderRadius.full,   // pill
    borderWidth: 1,
    borderColor: Theme.colors.primaryDark,
  },
  popularBadgeText: {
    ...Theme.textStyles.badge,
    color: Theme.colors.primaryDark,         // was textInverse (white)
    fontFamily: Theme.fonts.bold,
  },
  // ── "Current Plan" badge — solid green pill on the active plan card ──
  currentPlanBadge: {
    position: 'absolute',
    top: -10,
    right: Theme.spacing.md,
    backgroundColor: Theme.colors.primary,
    paddingHorizontal: Theme.spacing.sm,
    paddingVertical: Theme.spacing.xs,
    borderRadius: Theme.borderRadius.full,
  },
  currentPlanBadgeText: {
    ...Theme.textStyles.badge,
    color: '#0a1a0d',
    fontFamily: Theme.fonts.bold,
    fontSize: 10,
  },
  planHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: Theme.spacing.md,
  },
  planName: {
    ...Theme.textStyles.h3,
    color: Theme.colors.text,
    marginBottom: Theme.spacing.xs,
    fontFamily: Theme.fonts.bold,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  planPrice: {
    ...Theme.textStyles.displayLarge,
    color: Theme.colors.primary,
    lineHeight: 40,
  },
  planPeriod: {
    ...Theme.textStyles.body,
    color: Theme.colors.textSecondary,
    marginLeft: Theme.spacing.xs,
  },
  billedAnnually: {
    ...Theme.textStyles.caption,
    color: Theme.colors.textSecondary,
    marginTop: Theme.spacing.xs,
  },
  radioContainer: {
    marginTop: Theme.spacing.xs,
  },
  radioOuter: {
    width: 24,
    height: 24,
    borderRadius: Theme.borderRadius.full,
    borderWidth: 2,
    borderColor: Theme.colors.border,
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioOuterSelected: {
    borderColor: Theme.colors.primary,
  },
  radioInner: {
    width: 12,
    height: 12,
    borderRadius: Theme.borderRadius.full,
    backgroundColor: Theme.colors.primary,
  },
  featuresContainer: {
    gap: Theme.spacing.sm,
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  featureIcon: {
    fontSize: 16,
    color: Theme.colors.primary,
    marginRight: Theme.spacing.sm,
    fontFamily: Theme.fonts.bold,
    width: 16,
  },
  featureIconDisabled: {
    color: Theme.colors.textLight,
  },
  featureText: {
    ...Theme.textStyles.body,
    color: Theme.colors.text,
    flex: 1,
  },
  featureTextDisabled: {
    color: Theme.colors.textLight,
    textDecorationLine: 'line-through',
  },

  // ── Price Summary Card ────────────────────────────────────────────
  summaryCard: {
    backgroundColor: Theme.colors.card,
    marginHorizontal: Theme.spacing.screenPadding,
    marginBottom: Theme.spacing.lg,
    padding: Theme.spacing.md,
    borderRadius: Theme.borderRadius.md,
    borderWidth: 1,
    borderColor: Theme.colors.borderLight,
    ...Theme.shadows.sm,
  },
  summaryTitle: {
    ...Theme.textStyles.h4,
    color: Theme.colors.text,
    marginBottom: Theme.spacing.md,
    fontFamily: Theme.fonts.bold,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: Theme.spacing.sm,
  },
  summaryLabel: {
    ...Theme.textStyles.body,
    color: Theme.colors.textSecondary,
  },
  summaryValue: {
    ...Theme.textStyles.bodyBold,
    color: Theme.colors.text,
    fontFamily: Theme.fonts.semiBold,
  },
  discountText: {
    color: Theme.colors.primary,
  },
  summaryDivider: {
    height: 1,
    backgroundColor: Theme.colors.borderLight,
    marginVertical: Theme.spacing.sm,
  },
  summaryTotalLabel: {
    ...Theme.textStyles.h4,
    color: Theme.colors.text,
    fontFamily: Theme.fonts.semiBold,
  },
  summaryTotal: {
    ...Theme.textStyles.h2,
    color: Theme.colors.primary,
    fontFamily: Theme.fonts.bold,
  },
  savingsText: {
    ...Theme.textStyles.caption,
    color: Theme.colors.primary,
    textAlign: 'center',
    marginTop: Theme.spacing.sm,
    fontFamily: Theme.fonts.semiBold,
  },

  // ── Payment Section ───────────────────────────────────────────────
  paymentSection: {
    paddingHorizontal: Theme.spacing.screenPadding,
  },
  paymentMethods: {
    alignItems: 'center',
    marginTop: Theme.spacing.lg,
  },
  paymentMethodsLabel: {
    ...Theme.textStyles.caption,
    color: Theme.colors.textSecondary,
    marginBottom: Theme.spacing.sm,
  },
  paymentIcons: {
    flexDirection: 'row',
    gap: Theme.spacing.md,
  },
  paymentIcon: {
    alignItems: 'center',
  },
  paymentIconEmoji: {
    fontSize: 32,
    marginBottom: Theme.spacing.xs,
  },
  paymentIconLabel: {
    ...Theme.textStyles.caption,
    color: Theme.colors.textSecondary,
    fontSize: 11,
  },
  termsText: {
    ...Theme.textStyles.caption,
    color: Theme.colors.textSecondary,
    textAlign: 'center',
    marginTop: Theme.spacing.lg,
    lineHeight: 18,
  },
  termsLink: {
    color: Theme.colors.primary,
    fontFamily: Theme.fonts.semiBold,
  },
});
