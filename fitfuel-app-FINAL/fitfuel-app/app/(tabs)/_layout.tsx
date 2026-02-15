/**
 * Tabs Layout
 * 
 * Bottom tab navigation for main app screens
 * 4 tabs: Home, Meals, Tracking, Profile
 * 
 * Features:
 * - Bottom tab bar with icons
 * - Active/inactive states
 * - Theme integration
 * - Tab labels
 */

import { Tabs } from 'expo-router';
import { Text } from 'react-native';
import { Theme } from '../../constants';

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
          height: Theme.spacing.tabBar.height,
          paddingBottom: Theme.spacing.tabBar.paddingVertical,
          paddingTop: Theme.spacing.tabBar.paddingVertical,
        },
        tabBarLabelStyle: {
          ...Theme.textStyles.tabLabel,
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
          title: 'Tracking',
          tabBarIcon: ({ color, focused }) => (
            <TabIcon icon="📊" color={color} focused={focused} />
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
      <Tabs.Screen
        name="meal-detail"
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
