
import { Slot } from 'expo-router';
import { AuthProvider, useAuth } from '@/store/AuthContext';
import { useSubscriptionStore } from '@/store/subscriptionStore';
import { useEffect } from 'react';
import { useRouter, useSegments, useRootNavigationState } from 'expo-router';
import { PaperProvider } from 'react-native-paper';
import {
  useFonts,
  Manrope_300Light,
  Manrope_400Regular,
  Manrope_500Medium,
  Manrope_600SemiBold,
  Manrope_700Bold,
  Manrope_800ExtraBold,
} from '@expo-google-fonts/manrope';
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    Manrope_300Light,
    Manrope_400Regular,
    Manrope_500Medium,
    Manrope_600SemiBold,
    Manrope_700Bold,
    Manrope_800ExtraBold,
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) return null;

  return (
    <PaperProvider>
      <AuthProvider>
        <RootNavigator />
      </AuthProvider>
    </PaperProvider>
  );
}

function RootNavigator() {
  const { role } = useAuth();
  const segments = useSegments();
  const router = useRouter();
  const navigationState = useRootNavigationState();

  // ── Hydrate subscription store from JSON service on first mount ──────────
  useEffect(() => {
    useSubscriptionStore.getState().initialize();
  }, []);

  useEffect(() => {
    // Wait until the navigation tree is mounted and ready.
    if (!navigationState?.key) return;

    // segments[0] is undefined at the root index route — all `=== 'x'`
    // checks safely return false, so the guards below work for every route
    // including the root `/` (index) with an empty segments array.
    const inAuthGroup      = segments[0] === '(auth)';
    const inAdminGroup     = segments[0] === 'admin';
    const inSuperAdminGroup = segments[0] === 'superadmin';
    const inCustomerGroup  = segments[0] === 'customer';

    setTimeout(() => {
      if (role === null && !inAuthGroup) {
        // Not logged in and not in the auth flow → send to welcome screen.
        // This fires for the root index route (segments=[]) AND for any
        // non-auth deep link visited while logged out.
        router.replace('/(auth)/welcome');
      } else if (role === 'customer' && !inCustomerGroup) {
        router.replace('/customer/(tabs)');
      } else if (role === 'admin' && !inAdminGroup) {
        router.replace('/admin/dashboard');
      } else if (role === 'superadmin' && !inSuperAdminGroup) {
        router.replace('/superadmin/dashboard');
      }
    }, 0);
  }, [role, segments, navigationState?.key]);

  return <Slot />;
}
