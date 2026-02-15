import { Stack } from 'expo-router';
import { TouchableOpacity, Text } from 'react-native';
import { useRouter } from 'expo-router';
import { Colors } from '@/constants/Colors';
import { useAuth } from '@/store/AuthContext';

export default function SuperAdminLayout() {
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
                options={{ title: 'Super Admin Dashboard' }}
            />
            <Stack.Screen
                name="franchises"
                options={{ title: 'Franchises' }}
            />
            <Stack.Screen
                name="franchise-details"
                options={{ title: 'Franchise Details' }}
            />
            <Stack.Screen
                name="revenue"
                options={{ title: 'Revenue' }}
            />
            <Stack.Screen
                name="analytics"
                options={{ title: 'Analytics' }}
            />
            <Stack.Screen
                name="payouts"
                options={{ title: 'Payouts' }}
            />
            <Stack.Screen
                name="members"
                options={{ title: 'Members' }}
            />
            <Stack.Screen
                name="notifications"
                options={{ title: 'Notifications' }}
            />
            <Stack.Screen
                name="settings"
                options={{ title: 'Settings' }}
            />
        </Stack>
    );
}