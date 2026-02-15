// import { Slot, Redirect, useSegments } from 'expo-router';
// import { View, ActivityIndicator } from 'react-native';
// import { AuthProvider, useAuth } from '@/store/AuthContext';

// export default function RootLayout() {
//   return (
//     <AuthProvider>
//       <RootNavigator />
//     </AuthProvider>
//   );
// }

// function RootNavigator() {
//   const { role, isLoading } = useAuth();
//   const segments = useSegments();


//   if (isLoading) {
//     return (
//       <View
//         style={{
//           flex: 1,
//           justifyContent: 'center',
//           alignItems: 'center',
//           backgroundColor: 'white',
//         }}
//       >
//         <ActivityIndicator size="large" color="#0000ff" />
//       </View>
//     );
//   }



//   const inAuthGroup = segments[0] === '(auth)';

//   // Not logged in → redirect to login
//   if (!role && !inAuthGroup) {
//     return <Redirect href="/(auth)/login" />;
//   }

//   // Logged in but inside auth → redirect to dashboard
//   if (role && inAuthGroup) {
//     if (role === 'admin') {
//       return <Redirect href="/admin/dashboard" />;
//     }

//     if (role === 'superadmin') {
//       return <Redirect href="/superadmin/dashboard" />;
//     }

//     return <Redirect href="/(tabs)" />;
//   }

//   return <Slot />;
// }
// ===========================================================================================

// import { Slot, Redirect, useSegments, useRouter, useRootNavigationState } from 'expo-router';
// import { View } from 'react-native';
// import { Theme } from '../constants';
// import { AuthProvider, useAuth } from '@/store/AuthContext';
// import { useEffect } from 'react';

// export default function RootLayout() {
//   return (
//     <AuthProvider>
//       <RootNavigator />
//     </AuthProvider>
//   );
// }

// function RootNavigator() {
//   const { role } = useAuth();
//   const segments = useSegments();
//   const router = useRouter();
//   const navigationState = useRootNavigationState();

//   useEffect(() => {
//     if (!navigationState?.key) return;

//     const inAuthGroup = segments[0] === '(auth)';
//     const inAdminGroup = segments[0] === 'admin';
//     const inSuperAdminGroup = segments[0] === 'superadmin';
//     const inCustomerGroup = segments[0] === '(tabs)';

//     // No role - must be in auth
//     if (role === null && !inAuthGroup) {
//       router.replace('/(auth)/login');
//     }
//     // Has customer role - must be in customer group
//     else if (role === 'customer' && !inCustomerGroup) {
//       router.replace('/(tabs)');
//     }
//     // Has admin role - must be in admin group
//     else if (role === 'admin' && !inAdminGroup) {
//       router.replace('/admin/dashboard');
//     }
//     // Has superadmin role - must be in superadmin group
//     else if (role === 'superadmin' && !inSuperAdminGroup) {
//       router.replace('/superadmin/dashboard');
//     }
//   }, [role, segments, navigationState?.key]);

//   return <Slot />;
// }

import { Slot } from 'expo-router';
import { AuthProvider, useAuth } from '@/store/AuthContext';
import { useEffect } from 'react';
import { useRouter, useSegments, useRootNavigationState } from 'expo-router';

export default function RootLayout() {
  return (
    <AuthProvider>
      <RootNavigator />
    </AuthProvider>
  );
}

function RootNavigator() {
  const { role } = useAuth();
  const segments = useSegments();
  const router = useRouter();
  const navigationState = useRootNavigationState();

  useEffect(() => {
    if (!navigationState?.key) return;

    const inAuthGroup = segments[0] === '(auth)';
    const inAdminGroup = segments[0] === 'admin';
    const inSuperAdminGroup = segments[0] === 'superadmin';
    const inCustomerGroup = segments[0] === '(tabs)';
    const onIndex = segments.length;

    if (!segments || segments.length < 1) return;


    setTimeout(() => {
      if (role === null && !inAuthGroup && !onIndex) {
        router.replace('/');
      }
      else if (role === 'customer' && !inCustomerGroup) {
        router.replace('/(tabs)');
      }
      else if (role === 'admin' && !inAdminGroup) {
        router.replace('/admin/dashboard');
      }
      else if (role === 'superadmin' && !inSuperAdminGroup) {
        router.replace('/superadmin/dashboard');
      }
    }, 0);
  }, [role, segments, navigationState?.key]);

  return <Slot />;
}