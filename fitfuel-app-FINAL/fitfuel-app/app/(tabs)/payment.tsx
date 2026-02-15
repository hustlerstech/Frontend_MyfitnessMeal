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
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useRouter } from 'expo-router';
import { PrimaryButton, BackButton } from '../../components';
import { Theme } from '../../constants';

// Plan data
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
      { text: 'Calorie tracking', included: true },
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
      { text: 'Advanced tracking', included: true },
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
      { text: 'Complete tracking suite', included: true },
      { text: 'Express delivery', included: true },
      { text: 'Priority chef selection', included: true },
      { text: 'Weekly nutrition consultation', included: true },
      { text: 'Free delivery', included: true },
      { text: '24/7 priority support', included: true },
    ],
  },
];

export default function PaymentScreen() {
  const router = useRouter();
  const [selectedPlan, setSelectedPlan] = useState('premium');
  const [billingPeriod, setBillingPeriod] = useState<'month' | 'year'>('month');

  const currentPlan = PLANS.find(p => p.id === selectedPlan);
  const finalPrice = currentPlan?.price || 0;
  const yearlyDiscount = billingPeriod === 'year' ? 0.2 : 0;
  const yearlyPrice = finalPrice * 12 * (1 - yearlyDiscount);
  const displayPrice = billingPeriod === 'year' ? yearlyPrice : finalPrice;

  const handlePayment = () => {
    console.log('Processing payment for:', selectedPlan, billingPeriod);
    // In production: Navigate to payment gateway or process payment
    alert(`Payment initiated for ${currentPlan?.name} plan!`);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <BackButton onPress={() => router.back()} />
        <Text style={styles.headerTitle}>Choose Your Plan</Text>
        <View style={styles.headerRight} />
      </View>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {/* Billing Period Toggle */}
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
            <View style={styles.saveBadge}>
              <Text style={styles.saveBadgeText}>Save 20%</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Plans */}
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
              {/* Popular Badge */}
              {plan.popular && (
                <View style={styles.popularBadge}>
                  <Text style={styles.popularBadgeText}>MOST POPULAR</Text>
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
                      <Text style={styles.planPeriod}>/{billingPeriod === 'year' ? 'mo' : 'month'}</Text>
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

        {/* Price Summary */}
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

        {/* Payment Button */}
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

        {/* Bottom Spacing */}
        <View style={styles.bottomSpacing} />
      </ScrollView>
    </SafeAreaView>
  );
}

// Payment Method Icon Component
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
    borderBottomWidth: 1,
    borderBottomColor: Theme.colors.borderLight,
  },
  headerTitle: {
    ...Theme.textStyles.h3,
    color: Theme.colors.text,
  },
  headerRight: {
    width: 40,
  },
  scrollView: {
    flex: 1,
  },
  billingToggleContainer: {
    flexDirection: 'row',
    backgroundColor: Theme.colors.backgroundSecondary,
    marginHorizontal: Theme.spacing.screenPadding,
    marginTop: Theme.spacing.lg,
    marginBottom: Theme.spacing.xl,
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
  },
  billingToggleTextActive: {
    color: Theme.colors.textInverse,
  },
  saveBadge: {
    position: 'absolute',
    top: -8,
    right: -8,
    backgroundColor: Theme.colors.error,
    paddingHorizontal: Theme.spacing.xs,
    paddingVertical: 2,
    borderRadius: Theme.borderRadius.xs,
  },
  saveBadgeText: {
    ...Theme.textStyles.badge,
    color: Theme.colors.textInverse,
    fontSize: 10,
  },
  plansContainer: {
    paddingHorizontal: Theme.spacing.screenPadding,
    gap: Theme.spacing.md,
    marginBottom: Theme.spacing.xl,
  },
  planCard: {
    backgroundColor: Theme.colors.card,
    borderRadius: Theme.borderRadius.md,
    padding: Theme.spacing.md,
    borderWidth: 2,
    borderColor: Theme.colors.border,
    position: 'relative',
    ...Theme.shadows.sm,
  },
  planCardSelected: {
    borderColor: Theme.colors.primary,
    borderWidth: 3,
  },
  popularBadge: {
    position: 'absolute',
    top: -10,
    left: Theme.spacing.md,
    backgroundColor: Theme.colors.primary,
    paddingHorizontal: Theme.spacing.sm,
    paddingVertical: Theme.spacing.xs,
    borderRadius: Theme.borderRadius.xs,
  },
  popularBadgeText: {
    ...Theme.textStyles.badge,
    color: Theme.colors.textInverse,
    fontWeight: '700',
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
    fontWeight: '700',
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
  summaryCard: {
    backgroundColor: Theme.colors.card,
    marginHorizontal: Theme.spacing.screenPadding,
    marginBottom: Theme.spacing.lg,
    padding: Theme.spacing.md,
    borderRadius: Theme.borderRadius.md,
    ...Theme.shadows.sm,
  },
  summaryTitle: {
    ...Theme.textStyles.h4,
    color: Theme.colors.text,
    marginBottom: Theme.spacing.md,
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
  },
  summaryTotal: {
    ...Theme.textStyles.h2,
    color: Theme.colors.primary,
  },
  savingsText: {
    ...Theme.textStyles.caption,
    color: Theme.colors.primary,
    textAlign: 'center',
    marginTop: Theme.spacing.sm,
    fontWeight: '600',
  },
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
    fontWeight: '600',
  },
  bottomSpacing: {
    height: Theme.spacing.xl,
  },
});
