/**
 * App Index
 * 
 * Entry point.
 * Navigation logic is handled in app/_layout.tsx
 */

// export default function Index() {
//   return null;
// }


import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Colors } from '@/constants/Colors';
import { Typography } from '@/constants/Typography';
import { Spacing } from '@/constants/Spacing';
import { useAuth } from '@/store/AuthContext';

export default function RoleSelection() {
  const router = useRouter();
  const { setPendingRole } = useAuth();

  const handleRoleSelect = (role: 'customer' | 'admin' | 'superadmin') => {
    setPendingRole(role);
    router.push('/(auth)/login');
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Welcome to MyFitness Meals</Text>
        <Text style={styles.subtitle}>Select your role to continue</Text>

        <View style={styles.rolesContainer}>
          <TouchableOpacity
            style={[styles.roleCard, styles.customerCard]}
            onPress={() => handleRoleSelect('customer')}
            activeOpacity={0.8}
          >
            <Text style={styles.roleIcon}>👤</Text>
            <Text style={styles.roleTitle}>Customer</Text>
            <Text style={styles.roleDescription}>Browse meals, track fitness, manage orders</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.roleCard, styles.adminCard]}
            onPress={() => handleRoleSelect('admin')}
            activeOpacity={0.8}
          >
            <Text style={styles.roleIcon}>🏪</Text>
            <Text style={styles.roleTitle}>Franchise Admin</Text>
            <Text style={styles.roleDescription}>Manage franchise, orders, kitchen, delivery</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.roleCard, styles.superAdminCard]}
            onPress={() => handleRoleSelect('superadmin')}
            activeOpacity={0.8}
          >
            <Text style={styles.roleIcon}>⚡</Text>
            <Text style={styles.roleTitle}>Super Admin</Text>
            <Text style={styles.roleDescription}>Manage all franchises, analytics, payouts</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  content: {
    flex: 1,
    padding: Spacing.lg,
    justifyContent: 'center',
  },
  title: {
    fontSize: 32,
    fontFamily: Typography.bold,
    color: '#1A1A1A',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: Typography.regular,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: Spacing.xxl,
  },
  rolesContainer: {
    gap: Spacing.md,
  },
  roleCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: Spacing.lg,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  customerCard: {
    borderWidth: 2,
    borderColor: '#3B82F6',
  },
  adminCard: {
    borderWidth: 2,
    borderColor: Colors.primary,
  },
  superAdminCard: {
    borderWidth: 2,
    borderColor: '#8B5CF6',
  },
  roleIcon: {
    fontSize: 48,
    marginBottom: Spacing.sm,
  },
  roleTitle: {
    fontSize: 20,
    fontFamily: Typography.bold,
    color: '#1A1A1A',
    marginBottom: Spacing.xs,
  },
  roleDescription: {
    fontSize: 14,
    fontFamily: Typography.regular,
    color: '#6B7280',
    textAlign: 'center',
  },
});