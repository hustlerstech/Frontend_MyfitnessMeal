/**
 * RegisterScreen
 * 
 * Profile setup for new users after OTP verification
 * Collects basic information to personalize the experience
 * 
 * Features:
 * - Full name input
 * - Email input (optional)
 * - Profile picture upload (optional)
 * - Skip option
 * - Form validation
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useRouter } from 'expo-router';
import { PrimaryButton, SecondaryButton, InputField } from '../../components/common';
import { BackButton } from '../../components/auth';
import { Theme } from '../../constants';

export default function RegisterScreen() {
  const router = useRouter();

  // Form state
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({
    fullName: '',
    email: '',
  });

  // Email validation
  const isValidEmail = (email: string): boolean => {
    if (!email) return true; // Email is optional
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Form validation
  const validateForm = (): boolean => {
    const newErrors = {
      fullName: '',
      email: '',
    };

    if (!fullName.trim()) {
      newErrors.fullName = 'Please enter your full name';
    } else if (fullName.trim().length < 2) {
      newErrors.fullName = 'Name must be at least 2 characters';
    }

    if (email && !isValidEmail(email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    setErrors(newErrors);
    return !newErrors.fullName && !newErrors.email;
  };

  // Handle Continue
  const handleContinue = async () => {
    if (!validateForm()) return;

    setLoading(true);

    try {
      // TODO: Replace with actual API call
      // await authService.completeProfile({ fullName, email });

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Navigate to home
      router.replace('/(tabs)');
    } catch (err) {
      setErrors({
        ...errors,
        fullName: 'Failed to create profile. Please try again.',
      });
    } finally {
      setLoading(false);
    }
  };

  // Handle Skip
  const handleSkip = () => {
    // Navigate to home with incomplete profile
    router.replace('/(tabs)');
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Header */}
          <View style={styles.header}>
            <BackButton onPress={() => router.back()} />
          </View>

          {/* Content */}
          <View style={styles.content}>
            {/* Title */}
            <View style={styles.titleContainer}>
              <Text style={styles.title}>Complete your profile</Text>
              <Text style={styles.subtitle}>
                Help us personalize your meal experience
              </Text>
            </View>

            {/* Profile Picture Upload (Optional) */}
            <View style={styles.profilePictureContainer}>
              <TouchableOpacity
                style={styles.profilePicturePlaceholder}
                activeOpacity={0.7}
                onPress={() => {
                  // TODO: Implement image picker
                  alert('Image picker coming soon!');
                }}
              >
                <Text style={styles.profilePictureEmoji}>👤</Text>
                <Text style={styles.addPhotoText}>Add Photo</Text>
              </TouchableOpacity>
              <Text style={styles.optionalText}>(Optional)</Text>
            </View>

            {/* Form Inputs */}
            <View style={styles.formContainer}>
              <InputField
                label="Full Name"
                value={fullName}
                onChangeText={(text) => {
                  setFullName(text);
                  setErrors({ ...errors, fullName: '' });
                }}
                placeholder="Enter your full name"
                error={errors.fullName}
                autoCapitalize="words"
                autoFocus
              />

              <InputField
                label="Email (Optional)"
                value={email}
                onChangeText={(text) => {
                  setEmail(text);
                  setErrors({ ...errors, email: '' });
                }}
                placeholder="your@email.com"
                error={errors.email}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            {/* Info Box */}
            <View style={styles.infoBox}>
              <Text style={styles.infoIcon}>💡</Text>
              <Text style={styles.infoText}>
                This helps us create personalized meal recommendations for you
              </Text>
            </View>

            {/* Buttons */}
            <View style={styles.buttonContainer}>
              <PrimaryButton
                title="Continue"
                onPress={handleContinue}
                loading={loading}
                disabled={!fullName.trim()}
              />

              <SecondaryButton
                title="Skip for now"
                onPress={handleSkip}
                outline
              />
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.background,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: Theme.spacing.lg,
  },
  header: {
    paddingHorizontal: Theme.spacing.screenPadding,
    paddingTop: Theme.spacing.md,
    paddingBottom: Theme.spacing.sm,
  },
  content: {
    flex: 1,
    paddingHorizontal: Theme.spacing.screenPadding,
    paddingTop: Theme.spacing.lg,
  },
  titleContainer: {
    marginBottom: Theme.spacing.xxl,
  },
  title: {
    ...Theme.textStyles.h1,
    color: Theme.colors.text,
    marginBottom: Theme.spacing.sm,
  },
  subtitle: {
    ...Theme.textStyles.body,
    color: Theme.colors.textSecondary,
    lineHeight: 24,
  },
  profilePictureContainer: {
    alignItems: 'center',
    marginBottom: Theme.spacing.xl,
  },
  profilePicturePlaceholder: {
    width: 100,
    height: 100,
    borderRadius: Theme.borderRadius.full,
    backgroundColor: Theme.colors.backgroundSecondary,
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: Theme.colors.border,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Theme.spacing.xs,
  },
  profilePictureEmoji: {
    fontSize: 40,
    marginBottom: Theme.spacing.xs,
  },
  addPhotoText: {
    ...Theme.textStyles.caption,
    color: Theme.colors.textSecondary,
  },
  optionalText: {
    ...Theme.textStyles.caption,
    color: Theme.colors.textLight,
    fontStyle: 'italic',
  },
  formContainer: {
    marginBottom: Theme.spacing.lg,
  },
  infoBox: {
    flexDirection: 'row',
    backgroundColor: Theme.colors.primaryBackground,
    padding: Theme.spacing.md,
    borderRadius: Theme.borderRadius.sm,
    marginBottom: Theme.spacing.xl,
    borderLeftWidth: 3,
    borderLeftColor: Theme.colors.primary,
  },
  infoIcon: {
    fontSize: 20,
    marginRight: Theme.spacing.sm,
  },
  infoText: {
    ...Theme.textStyles.bodySmall,
    color: Theme.colors.text,
    flex: 1,
    lineHeight: 20,
  },
  buttonContainer: {
    gap: Theme.spacing.md,
  },
});
