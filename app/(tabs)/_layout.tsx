import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: 'absolute',
          },
          default: {},
        }),
      }}>
      <Tabs.Screen
        name="dashboard"
        options={{
          title: 'Dashboard',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="gauge" color={color} />,
        }}
      />
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="my-ticket"
        options={{
          title: 'Ticket',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="ticket" color={color} />,
        }}
      />
      <Tabs.Screen
        name="floor-map"
        options={{
          title: 'Map',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="map" color={color} />,
        }}
      />
      <Tabs.Screen
        name="scan-leads"
        options={{
          title: 'Scan',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="qrcode" color={color} />,
        }}
      />
      <Tabs.Screen
        name="my-leads"
        options={{
          title: 'Leads',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="person.2" color={color} />,
        }}
      />
      <Tabs.Screen
        name="leaderboard"
        options={{
          title: 'Points',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="trophy" color={color} />,
        }}
      />
      <Tabs.Screen
        name="schedule"
        options={{
          title: 'Schedule',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="calendar" color={color} />,
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Explore',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="paperplane.fill" color={color} />,
        }}
      />
    </Tabs>
  );
}
