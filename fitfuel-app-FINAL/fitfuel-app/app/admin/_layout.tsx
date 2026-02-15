import { Stack } from 'expo-router';
import { TouchableOpacity, Text } from 'react-native';
import { useRouter } from 'expo-router';
import { Colors } from '@/constants/Colors';
import { useAuth } from '@/store/AuthContext';

export default function AdminLayout() {
  const router = useRouter();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    router.replace('/');
  };

  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: Colors.primary,
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: '600',
          fontFamily: 'Poppins_600SemiBold',
        },
        headerBackTitle: 'Back',
        headerRight: () => (
          <TouchableOpacity onPress={handleLogout} style={{ marginRight: 15 }}>
            <Text style={{ color: '#fff', fontSize: 14, fontWeight: '600' }}>
              Logout
            </Text>
          </TouchableOpacity>
        ),
      }}
    >
      <Stack.Screen
        name="dashboard"
        options={{ title: 'Admin Dashboard' }}
      />
      <Stack.Screen
        name="orders"
        options={{ title: 'Orders' }}
      />
      <Stack.Screen
        name="order-details"
        options={{ title: 'Order Details' }}
      />
      <Stack.Screen
        name="members"
        options={{ title: 'Members' }}
      />
      <Stack.Screen
        name="menu"
        options={{ title: 'Menu' }}
      />
      <Stack.Screen
        name="earnings"
        options={{ title: 'Earnings' }}
      />
      <Stack.Screen
        name="stats"
        options={{ title: 'Statistics' }}
      />
      <Stack.Screen
        name="notifications"
        options={{ title: 'Notifications' }}
      />
      <Stack.Screen
        name="kitchen"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="delivery"
        options={{ headerShown: false }}
      />
    </Stack>
  );
}