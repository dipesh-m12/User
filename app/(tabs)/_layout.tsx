import { AppTheme } from '@/constants/theme';
import { Tabs } from 'expo-router';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from '../../components/ThemeProvider';

export default function TabLayout() {
  const { isDark } = useTheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: AppTheme.colors.blue[600],
        tabBarInactiveTintColor: isDark ? AppTheme.colors.gray[400] : AppTheme.colors.gray[500],
        headerShown: false,
        tabBarStyle: {
          backgroundColor: isDark ? AppTheme.colors.gray[900] : AppTheme.colors.gray[50],
          borderTopColor: isDark ? AppTheme.colors.gray[700] : AppTheme.colors.gray[200],
          borderTopWidth: 1,
          paddingBottom: 8,
          paddingTop: 8,
          height: 80,
        },
        tabBarLabelStyle: {
          fontSize: AppTheme.typography.fontSizes.xs,
          fontWeight: '500',
          marginTop: 4,
        },
        tabBarIconStyle: {
          marginBottom: 2,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Queue',
          tabBarIcon: ({ color, size }) => (
            <Icon name="qr-code-scanner" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Explore',
          tabBarIcon: ({ color, size }) => (
            <Icon name="explore" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="history"
        options={{
          title: 'History',
          tabBarIcon: ({ color, size }) => (
            <Icon name="history" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <Icon name="person" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
