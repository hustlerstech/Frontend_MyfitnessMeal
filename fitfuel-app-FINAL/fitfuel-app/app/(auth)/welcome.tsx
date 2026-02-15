/**
 * WelcomeScreen
 * 
 * First screen users see when opening the app
 * Shows hero image, value proposition, and CTA to start authentication
 * 
 * Features:
 * - Hero image/illustration
 * - App branding
 * - Value proposition text
 * - Primary CTA button
 * - Terms & privacy footer
 */

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  ScrollView,
} from 'react-native';
import { useRouter } from 'expo-router';
import { PrimaryButton, SecondaryButton } from '../../components/common';
import { Theme } from '../../constants';

export default function WelcomeScreen() {
  const router = useRouter();

  const handleGetStarted = () => {
    router.push('/(auth)/login');
  };

  const handleLogin = () => {
    router.push('/(auth)/login');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Logo/Branding */}
        <View style={styles.logoContainer}>
          <View style={styles.logoPlaceholder}>
            <Text style={styles.logoText}>FF</Text>
          </View>
          <Text style={styles.brandName}>MyFitness Meals</Text>
        </View>

        {/* Hero Image Placeholder */}
        <View style={styles.heroContainer}>
          <View style={styles.heroPlaceholder}>
            {/* In production, replace with actual image */}
            {/* <Image source={require('@/assets/hero-bowl.png')} style={styles.heroImage} /> */}
            <Text style={styles.heroEmoji}>🥗</Text>
          </View>
        </View>

        {/* Value Proposition */}
        <View style={styles.contentContainer}>
          <Text style={styles.title}>Your Personal{'\n'}Meal Partner</Text>

          <Text style={styles.subtitle}>
            Get chef-prepared meals delivered to match your fitness goals
          </Text>

          {/* Features List */}
          <View style={styles.featuresContainer}>
            <FeatureItem icon="✓" text="Personalized meal plans" />
            <FeatureItem icon="✓" text="Chef-prepared fresh meals" />
            <FeatureItem icon="✓" text="Delivery to your doorstep" />
          </View>
        </View>

        {/* CTA Buttons */}
        <View style={styles.buttonContainer}>
          <PrimaryButton
            title="Get Started"
            onPress={handleGetStarted}
          />

          <SecondaryButton
            title="I already have an account"
            onPress={handleLogin}
            outline
          />
        </View>

        {/* Terms Footer */}
        <Text style={styles.termsText}>
          By continuing, you agree to our{' '}
          <Text style={styles.termsLink}>Terms of Service</Text>
          {' '}and{' '}
          <Text style={styles.termsLink}>Privacy Policy</Text>
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

// Feature Item Component
interface FeatureItemProps {
  icon: string;
  text: string;
}

const FeatureItem: React.FC<FeatureItemProps> = ({ icon, text }) => (
  <View style={styles.featureItem}>
    <Text style={styles.featureIcon}>{icon}</Text>
    <Text style={styles.featureText}>{text}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.background,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: Theme.spacing.screenPadding,
    paddingTop: Theme.spacing.xl,
    paddingBottom: Theme.spacing.lg,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: Theme.spacing.xl,
  },
  logoPlaceholder: {
    width: 60,
    height: 60,
    borderRadius: Theme.borderRadius.full,
    backgroundColor: Theme.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Theme.spacing.sm,
  },
  logoText: {
    ...Theme.textStyles.h2,
    color: Theme.colors.textInverse,
  },
  brandName: {
    ...Theme.textStyles.h3,
    color: Theme.colors.text,
  },
  heroContainer: {
    alignItems: 'center',
    marginBottom: Theme.spacing.xxl,
  },
  heroPlaceholder: {
    width: 250,
    height: 250,
    borderRadius: Theme.borderRadius.lg,
    backgroundColor: Theme.colors.primaryBackground,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heroEmoji: {
    fontSize: 120,
  },
  heroImage: {
    width: '100%',
    height: '100%',
    borderRadius: Theme.borderRadius.lg,
  },
  contentContainer: {
    marginBottom: Theme.spacing.xl,
  },
  title: {
    ...Theme.textStyles.welcomeTitle,
    color: Theme.colors.text,
    textAlign: 'center',
    marginBottom: Theme.spacing.md,
  },
  subtitle: {
    ...Theme.textStyles.welcomeSubtitle,
    color: Theme.colors.textSecondary,
    textAlign: 'center',
    marginBottom: Theme.spacing.lg,
  },
  featuresContainer: {
    gap: Theme.spacing.sm,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Theme.spacing.xs,
  },
  featureIcon: {
    fontSize: 18,
    color: Theme.colors.primary,
    marginRight: Theme.spacing.md,
    fontWeight: '600',
  },
  featureText: {
    ...Theme.textStyles.body,
    color: Theme.colors.text,
  },
  buttonContainer: {
    gap: Theme.spacing.md,
    marginBottom: Theme.spacing.lg,
  },
  termsText: {
    ...Theme.textStyles.caption,
    color: Theme.colors.textLight,
    textAlign: 'center',
    lineHeight: 18,
  },
  termsLink: {
    color: Theme.colors.primary,
    fontWeight: '600',
  },
});
