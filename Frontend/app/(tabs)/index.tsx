import { StyleSheet, ScrollView, Image, TouchableOpacity, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Stack } from 'expo-router';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Colors } from '@/constants/Colors';
import { useThemeColor } from '@/hooks/useThemeColor';

const RECENT_TREKS = [
    { id: '1', title: 'Sunset Peak', distance: '5.2 km', date: '2 days ago', image: 'https://images.unsplash.com/photo-1551632811-561732d1e306?q=80&w=2070&auto=format&fit=crop' },
    { id: '2', title: 'Riverbend Trail', distance: '3.8 km', date: '1 week ago', image: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=2070&auto=format&fit=crop' },
];

export default function HomeScreen() {
    const iconColor = useThemeColor({}, 'icon');
    const cardColor = useThemeColor({}, 'card');

    return (
        <ThemedView style={styles.container}>
            <Stack.Screen options={{ headerShown: false }} />
            <ScrollView contentContainerStyle={styles.scrollContent}>

                {/* Header Section */}
                <ThemedView style={styles.header}>
                    <ThemedView style={{ backgroundColor: 'transparent' }}>
                        <ThemedText type="caption" style={{ marginBottom: 4 }}>Welcome Back,</ThemedText>
                        <ThemedText type="title">Trekker!</ThemedText>
                    </ThemedView>
                    <TouchableOpacity style={[styles.profileButton, { backgroundColor: cardColor }]}>
                        <Ionicons name="notifications-outline" size={24} color={iconColor} />
                    </TouchableOpacity>
                </ThemedView>

                {/* Weather / Status Card */}
                <ThemedView style={[styles.statusCard, { backgroundColor: Colors.dark.secondary }]}>
                    <ThemedText type="subtitle" style={{ color: 'white' }}>Perfect Hiking Weather</ThemedText>
                    <ThemedText style={{ color: 'white', opacity: 0.9 }}>24°C • Sunny • UV Moderate</ThemedText>
                    <Ionicons name="partly-sunny" size={48} color="white" style={styles.weatherIcon} />
                </ThemedView>

                {/* Quick Actions */}
                <ThemedView style={styles.sectionHeader}>
                    <ThemedText type="subtitle">Quick Actions</ThemedText>
                </ThemedView>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.quickActions}>
                    <QuickActionButton icon="map" label="Saved Maps" color="#4dabf7" />
                    <QuickActionButton icon="people" label="Community" color="#ffd43b" />
                    <QuickActionButton icon="trophy" label="Challenges" color="#ff6b6b" />
                    <QuickActionButton icon="images" label="Gallery" color="#20c997" />
                </ScrollView>

                {/* Recent Activity */}
                <ThemedView style={styles.sectionHeader}>
                    <ThemedText type="subtitle">Recent Activity</ThemedText>
                    <ThemedText type="link">See All</ThemedText>
                </ThemedView>

                {RECENT_TREKS.map((trek) => (
                    <ThemedView key={trek.id} style={[styles.trekCard, { backgroundColor: cardColor }]}>
                        <Image source={{ uri: trek.image }} style={styles.trekImage} />
                        <ThemedView style={styles.trekInfo}>
                            <ThemedText type="defaultSemiBold">{trek.title}</ThemedText>
                            <ThemedText type="caption">{trek.date} • {trek.distance}</ThemedText>
                        </ThemedView>
                        <TouchableOpacity>
                            <Ionicons name="chevron-forward" size={20} color={iconColor} />
                        </TouchableOpacity>
                    </ThemedView>
                ))}

            </ScrollView>
        </ThemedView>
    );
}

function QuickActionButton({ icon, label, color }: { icon: any, label: string, color: string }) {
    const cardBg = useThemeColor({}, 'card');
    return (
        <TouchableOpacity style={[styles.actionButton, { backgroundColor: cardBg }]}>
            <ThemedView style={[styles.iconContainer, { backgroundColor: color }]}>
                <Ionicons name={icon} size={24} color="white" />
            </ThemedView>
            <ThemedText style={styles.actionLabel}>{label}</ThemedText>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollContent: {
        padding: 20,
        paddingTop: 60, // Space for status bar
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 24,
        backgroundColor: 'transparent'
    },
    profileButton: {
        padding: 10,
        borderRadius: 20,
    },
    statusCard: {
        padding: 20,
        borderRadius: 24,
        marginBottom: 32,
        position: 'relative',
        overflow: 'hidden',
    },
    weatherIcon: {
        position: 'absolute',
        right: -10,
        bottom: -10,
        opacity: 0.2,
        transform: [{ scale: 2.5 }]
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 8,
        marginBottom: 16,
        backgroundColor: 'transparent'
    },
    quickActions: {
        marginBottom: 32,
        overflow: 'visible' // Ensure shadows are visible
    },
    actionButton: {
        marginRight: 16,
        alignItems: 'center',
        padding: 12,
        borderRadius: 16,
        width: 100,
        shadowColor: "#000", // Basic shadow for iOS
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3, // For Android
    },
    iconContainer: {
        width: 48,
        height: 48,
        borderRadius: 24,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 8,
    },
    actionLabel: {
        fontSize: 12,
        textAlign: 'center',
        fontWeight: '500'
    },
    trekCard: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 12,
        borderRadius: 16,
        marginBottom: 16,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 2,
    },
    trekImage: {
        width: 50,
        height: 50,
        borderRadius: 12,
        marginRight: 16,
    },
    trekInfo: {
        flex: 1,
        backgroundColor: 'transparent'
    }
});
