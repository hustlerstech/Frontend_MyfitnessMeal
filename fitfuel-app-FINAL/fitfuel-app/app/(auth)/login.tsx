/**
 * LoginScreen
 * 
 * Phone number + OTP authentication flow
 * Modern Zomato/Swiggy style authentication
 * 
 * Flow:
 * 1. Enter phone number
 * 2. Request OTP
 * 3. Verify OTP
 * 4. Navigate to home (existing user) or register (new user)
 * 
 * Features:
 * - Phone number validation
 * - OTP auto-send
 * - OTP auto-verification
 * - Resend OTP with timer
 * - Error handling
 * - Demo mode with role selection
 */

import React, { useState, useEffect } from 'react';
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
import { PrimaryButton, InputField } from '../../components/common';
import { OTPInput, BackButton } from '../../components/auth';
import { Theme } from '../../constants';
import { useAuth } from '@/store/AuthContext';

type AuthStep = 'phone' | 'otp';

export default function LoginScreen() {
  const router = useRouter();
  const { login, pendingRole } = useAuth();

  // State
  const [step, setStep] = useState<AuthStep>('phone');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [resendTimer, setResendTimer] = useState(0);

  // Countdown timer for resend OTP
  useEffect(() => {
    if (resendTimer > 0) {
      const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendTimer]);

  // Phone number validation
  const isValidPhone = (phone: string): boolean => {
    return /^\d{10}$/.test(phone);
  };

  // Handle Get OTP
  const handleGetOTP = async () => {
    if (!isValidPhone(phoneNumber)) {
      setError('Please enter a valid 10-digit phone number');
      return;
    }

    setError('');
    setLoading(true);

    try {
      // TODO: Replace with actual API call
      // await authService.sendOTP(phoneNumber);

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      setStep('otp');
      setResendTimer(30);
    } catch (err) {
      setError('Failed to send OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Handle OTP verification
  // Handle OTP verification
  const handleVerifyOTP = async (otpValue: string) => {
    setError('');
    setLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Use the pending role (set on the welcome screen before navigating here)
      const roleToLogin = pendingRole || 'customer';
      login(roleToLogin);

      // Navigation will be handled automatically by RootLayout
    } catch (err) {
      setError('Invalid OTP. Please try again.');
      setOtp('');
    } finally {
      setLoading(false);
    }
  };

  // Handle OTP complete
  const handleOTPComplete = (otpValue: string) => {
    if (otpValue.length === 6) {
      handleVerifyOTP(otpValue);
    }
  };

  // Handle Resend OTP
  const handleResendOTP = async () => {
    if (resendTimer > 0) return;

    setError('');
    setOtp('');

    try {
      // TODO: Replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setResendTimer(30);
    } catch (err) {
      setError('Failed to resend OTP');
    }
  };

  // Handle Back
  const handleBack = () => {
    if (step === 'otp') {
      setStep('phone');
      setOtp('');
      setError('');
    } else {
      router.back();
    }
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
            <BackButton onPress={handleBack} />
          </View>

          {/* Content */}
          {step === 'phone' ? (
            <PhoneStep
              phoneNumber={phoneNumber}
              setPhoneNumber={setPhoneNumber}
              error={error}
              loading={loading}
              onGetOTP={handleGetOTP}
            />
          ) : (
            <OTPStep
              phoneNumber={phoneNumber}
              otp={otp}
              setOtp={setOtp}
              error={error}
              loading={loading}
              resendTimer={resendTimer}
              onResend={handleResendOTP}
              onComplete={handleOTPComplete}
              onEditPhone={() => setStep('phone')}
            />
          )}

        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

// Phone Number Entry Step
interface PhoneStepProps {
  phoneNumber: string;
  setPhoneNumber: (value: string) => void;
  error: string;
  loading: boolean;
  onGetOTP: () => void;
}

const PhoneStep: React.FC<PhoneStepProps> = ({
  phoneNumber,
  setPhoneNumber,
  error,
  loading,
  onGetOTP,
}) => {
  return (
    <View style={styles.stepContainer}>
      <Text style={styles.title}>Enter your phone number</Text>
      <Text style={styles.subtitle}>
        We'll send you an OTP to verify your number
      </Text>

      <View style={styles.inputContainer}>
        <InputField
          label="Phone Number"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
          placeholder="10-digit number"
          keyboardType="phone-pad"
          maxLength={10}
          error={error}
          leftIcon={<Text style={styles.countryCode}>+91</Text>}
        />
      </View>

      <PrimaryButton
        title="Get OTP"
        onPress={onGetOTP}
        loading={loading}
        disabled={phoneNumber.length !== 10}
      />
    </View>
  );
};

// OTP Verification Step
interface OTPStepProps {
  phoneNumber: string;
  otp: string;
  setOtp: (value: string) => void;
  error: string;
  loading: boolean;
  resendTimer: number;
  onResend: () => void;
  onComplete: (otp: string) => void;
  onEditPhone: () => void;
}

const OTPStep: React.FC<OTPStepProps> = ({
  phoneNumber,
  otp,
  setOtp,
  error,
  loading,
  resendTimer,
  onResend,
  onComplete,
  onEditPhone,
}) => {
  const maskedPhone = `+91 ${phoneNumber.slice(0, 5)} ${phoneNumber.slice(5)}`;

  return (
    <View style={styles.stepContainer}>
      <Text style={styles.title}>Verify your phone number</Text>
      <Text style={styles.subtitle}>
        Enter the 6-digit code sent to{'\n'}
        <Text style={styles.phoneNumber}>{maskedPhone}</Text>
      </Text>

      <View style={styles.otpContainer}>
        <OTPInput
          value={otp}
          onChange={setOtp}
          onComplete={onComplete}
          error={!!error}
          disabled={loading}
        />

        {error && <Text style={styles.errorText}>{error}</Text>}
      </View>

      {/* Resend OTP */}
      <View style={styles.resendContainer}>
        {resendTimer > 0 ? (
          <Text style={styles.timerText}>
            Resend OTP in 0:{resendTimer.toString().padStart(2, '0')}
          </Text>
        ) : (
          <TouchableOpacity onPress={onResend} activeOpacity={0.7}>
            <Text style={styles.resendText}>Resend OTP</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Edit Phone Number */}
      <TouchableOpacity onPress={onEditPhone} activeOpacity={0.7}>
        <Text style={styles.editPhoneText}>Wrong number? Edit</Text>
      </TouchableOpacity>

      <PrimaryButton
        title="Verify & Continue"
        onPress={() => onComplete(otp)}
        loading={loading}
        disabled={otp.length !== 6}
      />
    </View>
  );
};

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
  stepContainer: {
    flex: 1,
    paddingHorizontal: Theme.spacing.screenPadding,
    paddingTop: Theme.spacing.xl,
  },
  title: {
    ...Theme.textStyles.h1,
    color: Theme.colors.text,
    marginBottom: Theme.spacing.sm,
  },
  subtitle: {
    ...Theme.textStyles.body,
    color: Theme.colors.textSecondary,
    marginBottom: Theme.spacing.xxl,
    lineHeight: 24,
  },
  phoneNumber: {
    ...Theme.textStyles.bodyBold,
    color: Theme.colors.text,
  },
  inputContainer: {
    marginBottom: Theme.spacing.xl,
  },
  countryCode: {
    ...Theme.textStyles.input,
    color: Theme.colors.text,
    fontWeight: '600',
  },
  otpContainer: {
    marginBottom: Theme.spacing.lg,
  },
  errorText: {
    ...Theme.textStyles.errorMessage,
    color: Theme.colors.error,
    marginTop: Theme.spacing.md,
    textAlign: 'center',
  },
  resendContainer: {
    alignItems: 'center',
    marginBottom: Theme.spacing.md,
  },
  timerText: {
    ...Theme.textStyles.caption,
    color: Theme.colors.textSecondary,
  },
  resendText: {
    ...Theme.textStyles.link,
    color: Theme.colors.primary,
    textDecorationLine: 'none',
  },
  editPhoneText: {
    ...Theme.textStyles.link,
    color: Theme.colors.primary,
    textAlign: 'center',
    marginBottom: Theme.spacing.xl,
    textDecorationLine: 'none',
  },
});