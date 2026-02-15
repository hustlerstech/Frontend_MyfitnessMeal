/**
 * Auth Layout
 * 
 * Stack navigator for authentication flow
 * Handles navigation between welcome, login, and register screens
 */

import { Stack } from 'expo-router';
import { Theme } from '../../constants';

export default function AuthLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: Theme.colors.background,
        },
        animation: 'slide_from_right',
      }}
    >
      <Stack.Screen
        name="welcome"
        options={{
          title: 'Welcome',
        }}
      />
      <Stack.Screen
        name="login"
        options={{
          title: 'Login',
        }}
      />
      <Stack.Screen
        name="register"
        options={{
          title: 'Complete Profile',
        }}
      />
    </Stack>
  );
}
