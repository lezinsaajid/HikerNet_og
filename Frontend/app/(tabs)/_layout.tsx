import { Tabs } from 'expo-router';
import React from 'react';
import { Platform, useColorScheme, ViewStyle } from 'react-native';

import { Ionicons } from '@expo/vector-icons';

import { Colors } from '@/constants/Colors';
import { useThemeColor } from '@/hooks/useThemeColor';

export default function TabLayout() {
    const colorScheme = useColorScheme();
    const tintColor = Colors[colorScheme ?? 'light'].tint;
    const backgroundColor = Colors[colorScheme ?? 'light'].background;

    // Custom tab bar style for "Floating" effect
    const tabBarStyle: ViewStyle = {
        backgroundColor: colorScheme === 'dark' ? '#27272a' : '#ffffff',
        borderTopWidth: 0,
        elevation: 0,
        height: 60,
        paddingBottom: 10,
        paddingTop: 10,
        borderTopColor: 'transparent',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: -2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3.84,
    };

    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: tintColor,
                headerShown: false,
                tabBarStyle: Platform.select({
                    ios: {
                        ...tabBarStyle,
                        position: 'absolute', // Use a transparent background on iOS to show the blur effect
                    },
                    default: tabBarStyle,
                }),
            }}>
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Home',
                    tabBarIcon: ({ color, focused }) => (
                        <Ionicons name={focused ? 'home' : 'home-outline'} size={24} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="explore"
                options={{
                    title: 'Explore',
                    tabBarIcon: ({ color, focused }) => (
                        <Ionicons name={focused ? 'compass' : 'compass-outline'} size={24} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="trek"
                options={{
                    title: 'Trek',
                    tabBarIcon: ({ color, focused }) => (
                        <Ionicons name={focused ? 'navigate' : 'navigate-outline'} size={32} color={color} style={{ marginBottom: -3 }} /> // Larger icon for main action
                    ),
                    tabBarLabelStyle: { display: "none" }, // Optional: hide label for the middle button
                }}
            />
            <Tabs.Screen
                name="chat"
                options={{
                    title: 'Chat',
                    tabBarIcon: ({ color, focused }) => (
                        <Ionicons name={focused ? 'chatbubbles' : 'chatbubbles-outline'} size={24} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    title: 'Profile',
                    tabBarIcon: ({ color, focused }) => (
                        <Ionicons name={focused ? 'person' : 'person-outline'} size={24} color={color} />
                    ),
                }}
            />
        </Tabs>
    );
}
