import { Stack } from 'expo-router';
import { Colors } from '@/constants/Colors';

export default function KitchenLayout() {
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
            }}
        >
            <Stack.Screen
                name="dashboard"
                options={{ title: 'Kitchen Dashboard' }}
            />
            <Stack.Screen
                name="orders"
                options={{ title: 'Kitchen Orders' }}
            />
            <Stack.Screen
                name="order-details"
                options={{ title: 'Order Details' }}
            />
            <Stack.Screen
                name="stats"
                options={{ title: 'Kitchen Stats' }}
            />
        </Stack>
    );
}