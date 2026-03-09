/**
 * WelcomeScreen — Premium Edition
 *
 * Dark gradient hero (top half) + white content card (bottom half)
 * Preserves all routing logic — only visual changes.
 */

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useAuth } from '@/store/AuthContext';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

export default function WelcomeScreen() {
  const router = useRouter();
  const { setPendingRole } = useAuth();

  const handleRole = (role: 'customer' | 'admin' | 'superadmin') => {
    setPendingRole(role);
    router.push('/(auth)/login');
  };

  return (
    <View style={styles.root}>
      {/* ─── GRADIENT HERO ─── */}
      <LinearGradient
        colors={['#0a1a0d', '#0f2b17', '#1a6b40']}
        locations={[0, 0.45, 1]}
        style={styles.hero}
      >
        {/* Decorative background rings */}
        <View style={styles.decorRingLarge} />
        <View style={styles.decorRingSmall} />

        {/* Logo */}
        <View style={styles.logoRow}>
          <View style={styles.logoBadge}>
            <Text style={styles.logoInitials}>FF</Text>
          </View>
          <Text style={styles.brandName}>MyFitness Meals</Text>
        </View>

        {/* Hero illustration */}
        <View style={styles.heroIllustration}>
          <Text style={styles.heroEmoji}>🥗</Text>
          <View style={styles.floatingBadge}>
            <Text style={styles.floatingBadgeText}>🔥 Chef prepared</Text>
          </View>
        </View>
      </LinearGradient>

      {/* ─── CONTENT CARD ─── */}
      <ScrollView
        style={styles.contentCard}
        contentContainerStyle={styles.contentInner}
        showsVerticalScrollIndicator={false}
        bounces={false}
      >
        <Text style={styles.title}>Your Personal{'\n'}Meal Partner</Text>

        <Text style={styles.subtitle}>
          Chef-prepared meals delivered fresh, matched to your fitness goals.
        </Text>

        {/* Feature list */}
        <View style={styles.features}>
          <FeatureRow text="Personalised meal plans built for you" />
          <FeatureRow text="Chef-prepared, nutritionist approved" />
          <FeatureRow text="Delivered fresh to your doorstep" />
        </View>

        {/* Role Selection */}
        <Text style={styles.roleLabel}>Continue as</Text>

        {/* Customer — primary green */}
        <TouchableOpacity
          style={styles.primaryBtn}
          onPress={() => handleRole('customer')}
          activeOpacity={0.85}
        >
          <LinearGradient
            colors={['#2bee75', '#22c669', '#1db85d']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.primaryBtnGradient}
          >
            <Text style={styles.primaryBtnText}>👤  Customer</Text>
          </LinearGradient>
        </TouchableOpacity>

        {/* Franchise Admin — outlined green */}
        <TouchableOpacity
          style={styles.secondaryBtn}
          onPress={() => handleRole('admin')}
          activeOpacity={0.7}
        >
          <Text style={styles.secondaryBtnText}>🏪  Franchise Admin</Text>
        </TouchableOpacity>

        {/* Super Admin — outlined purple */}
        <TouchableOpacity
          style={[styles.secondaryBtn, styles.superAdminBtn]}
          onPress={() => handleRole('superadmin')}
          activeOpacity={0.7}
        >
          <Text style={[styles.secondaryBtnText, styles.superAdminBtnText]}>⚡  Super Admin</Text>
        </TouchableOpacity>

        {/* Terms */}
        <Text style={styles.terms}>
          By continuing, you agree to our{' '}
          <Text style={styles.termsLink}>Terms</Text>
          {' '}and{' '}
          <Text style={styles.termsLink}>Privacy Policy</Text>
        </Text>
      </ScrollView>
    </View>
  );
}

const FeatureRow = ({ text }: { text: string }) => (
  <View style={styles.featureRow}>
    <View style={styles.featureDot}>
      <Text style={styles.featureTick}>✓</Text>
    </View>
    <Text style={styles.featureText}>{text}</Text>
  </View>
);

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#0a1a0d',
  },

  /* ── Hero ── */
  hero: {
    height: SCREEN_HEIGHT * 0.50,
    paddingTop: 56,
    paddingHorizontal: 24,
    overflow: 'hidden',
    justifyContent: 'space-between',
    paddingBottom: 40,
  },
  decorRingLarge: {
    position: 'absolute',
    width: 320,
    height: 320,
    borderRadius: 160,
    borderWidth: 40,
    borderColor: 'rgba(255,255,255,0.04)',
    top: -80,
    right: -100,
  },
  decorRingSmall: {
    position: 'absolute',
    width: 180,
    height: 180,
    borderRadius: 90,
    borderWidth: 24,
    borderColor: 'rgba(43,238,117,0.08)',
    bottom: 40,
    left: -60,
  },
  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  logoBadge: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(43,238,117,0.15)',
  },
  logoInitials: {
    fontSize: 14,
    fontWeight: '800',
    color: '#2bee75',
  },
  brandName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#ffffff',
    letterSpacing: 0.3,
  },
  heroIllustration: {
    alignItems: 'center',
    position: 'relative',
  },
  heroEmoji: {
    fontSize: 80,
    opacity: 0.85,
  },
  floatingBadge: {
    position: 'absolute',
    right: 20,
    bottom: 8,
    backgroundColor: 'rgba(0,0,0,0.55)',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: 'rgba(43,238,117,0.4)',
  },
  floatingBadgeText: {
    color: '#2bee75',
    fontSize: 12,
    fontWeight: '600',
  },

  /* ── Content Card ── */
  contentCard: {
    flex: 1,
    backgroundColor: '#fafffe',
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    marginTop: -32,
  },
  contentInner: {
    padding: 28,
    paddingBottom: 40,
  },
  title: {
    fontSize: 30,
    fontWeight: '800',
    color: '#111827',
    lineHeight: 38,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 15,
    color: '#6b7280',
    lineHeight: 22,
    marginBottom: 24,
  },
  features: {
    gap: 14,
    marginBottom: 32,
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  featureDot: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: '#2bee75',
    justifyContent: 'center',
    alignItems: 'center',
  },
  featureTick: {
    fontSize: 12,
    fontWeight: '800',
    color: '#0a1a0d',
  },
  featureText: {
    fontSize: 15,
    color: '#374151',
    flex: 1,
    lineHeight: 20,
  },

  /* ── Buttons ── */
  roleLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#9ca3af',
    textAlign: 'center',
    marginBottom: 14,
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  primaryBtn: {
    borderRadius: 9999,
    overflow: 'hidden',
    marginBottom: 12,
    shadowColor: '#2bee75',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 12,
    elevation: 6,
  },
  primaryBtnGradient: {
    paddingVertical: 17,
    alignItems: 'center',
    borderRadius: 9999,
  },
  primaryBtnText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0a1a0d',
    letterSpacing: 0.3,
  },
  secondaryBtn: {
    paddingVertical: 17,
    alignItems: 'center',
    borderRadius: 9999,
    borderWidth: 1.5,
    borderColor: '#2bee75',
    marginBottom: 20,
  },
  secondaryBtnText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1db85d',
  },
  superAdminBtn: {
    borderColor: '#8B5CF6',
    marginBottom: 20,
  },
  superAdminBtnText: {
    color: '#8B5CF6',
  },
  terms: {
    fontSize: 12,
    color: '#9ca3af',
    textAlign: 'center',
    lineHeight: 18,
  },
  termsLink: {
    color: '#2bee75',
    fontWeight: '600',
  },
});
