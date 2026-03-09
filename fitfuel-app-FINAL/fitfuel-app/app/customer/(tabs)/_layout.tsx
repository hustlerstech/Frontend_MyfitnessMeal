/**
 * Tabs Layout
 * 
 * Bottom tab navigation for main app screens
 * 4 tabs: Home, Meals, Orders, Profile
 * 
 * Features:
 * - Bottom tab bar with icons
 * - Active/inactive states
 * - Theme integration
 * - Tab labels
 */

import { Tabs } from 'expo-router';
import { Text } from 'react-native';
import { Theme } from '../../../constants';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: Theme.colors.primary,
        tabBarInactiveTintColor: Theme.colors.tabInactive,
        tabBarStyle: {
          backgroundColor: Theme.colors.tabBackground,
          borderTopWidth: 1,
          borderTopColor: Theme.colors.borderLight,
          height: 60,
          paddingBottom: 8,
          paddingTop: 8,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <TabIcon icon="🏠" color={color} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="meals"
        options={{
          title: 'Meals',
          tabBarIcon: ({ color, focused }) => (
            <TabIcon icon="🍽️" color={color} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="tracking"
        options={{
          href: null, // Hidden from tab bar — not needed for now
        }}
      />
      <Tabs.Screen
        name="orders"
        options={{
          title: 'Orders',
          tabBarIcon: ({ color, focused }) => (
            <TabIcon icon="📦" color={color} focused={focused} />
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, focused }) => (
            <TabIcon icon="👤" color={color} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="payment"
        options={{
          href: null, // Hide from tab bar
        }}
      />

    </Tabs>
  );
}

// Tab Icon Component
interface TabIconProps {
  icon: string;
  color: string;
  focused: boolean;
}

const TabIcon: React.FC<TabIconProps> = ({ icon, focused }) => {
  return (
    <Text
      style={{
        fontSize: Theme.spacing.tabBar.iconSize,
        opacity: focused ? 1 : 0.6,
      }}
    >
      {icon}
    </Text>
  );
};
