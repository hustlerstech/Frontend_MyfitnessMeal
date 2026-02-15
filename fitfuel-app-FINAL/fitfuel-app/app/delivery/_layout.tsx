import { Stack } from 'expo-router';
import { Colors } from '@/constants/Colors';

export default function DeliveryLayout() {
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
                options={{ title: 'Delivery Dashboard' }}
            />
            <Stack.Screen
                name="active-delivery"
                options={{ title: 'Active Delivery' }}
            />
            <Stack.Screen
                name="earnings"
                options={{ title: 'Delivery Earnings' }}
            />
            <Stack.Screen
                name="history"
                options={{ title: 'Delivery History' }}
            />
            <Stack.Screen
                name="cashout"
                options={{ title: 'Cash Out' }}
            />
        </Stack>
    );
}