import { StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Stack } from 'expo-router';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Colors } from '@/constants/Colors';
import { useThemeColor } from '@/hooks/useThemeColor';

export default function ProfileScreen() {
    const cardColor = useThemeColor({}, 'card');
    const iconColor = useThemeColor({}, 'icon');

    return (
        <ThemedView style={styles.container}>
            <Stack.Screen options={{ headerShown: false }} />
            <ScrollView contentContainerStyle={styles.scrollContent}>

                {/* Profile Header */}
                <ThemedView style={styles.header}>
                    <Image
                        source={{ uri: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=1780&auto=format&fit=crop' }}
                        style={styles.avatar}
                    />
                    <ThemedView style={styles.headerText}>
                        <ThemedText type="title">Alex Hiker</ThemedText>
                        <ThemedText style={{ opacity: 0.7 }}>Mountain Enthusiast</ThemedText>
                    </ThemedView>
                    <TouchableOpacity style={[styles.editBtn, { backgroundColor: cardColor }]}>
                        <Ionicons name="pencil" size={20} color={iconColor} />
                    </TouchableOpacity>
                </ThemedView>

                {/* Stats Row */}
                <ThemedView style={styles.statsRow}>
                    <StatBox value="1,240" label="km Walked" />
                    <StatBox value="42" label="Treks" />
                    <StatBox value="15k" label="Elevation" />
                </ThemedView>

                {/* Badges Section */}
                <ThemedView style={styles.sectionHeader}>
                    <ThemedText type="subtitle">Achievements</ThemedText>
                    <ThemedText type="link">See All</ThemedText>
                </ThemedView>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.badgesScroll}>
                    <Badge icon="ribbon" label="Early Bird" color="#FFD700" />
                    <Badge icon="flame" label="Streak" color="#FF4500" />
                    <Badge icon="leaf" label="Eco Friendly" color="#32CD32" />
                    <Badge icon="snow" label="Winter Hiker" color="#1E90FF" />
                </ScrollView>

                {/* Menu Options */}
                <ThemedView style={styles.menuContainer}>
                    <MenuItem icon="settings-outline" label="Settings" />
                    <MenuItem icon="time-outline" label="History" />
                    <MenuItem icon="heart-outline" label="Favorites" />
                    <MenuItem icon="help-circle-outline" label="Help & Support" />
                    <MenuItem icon="log-out-outline" label="Log Out" color="#ff6b6b" />
                </ThemedView>

            </ScrollView>
        </ThemedView>
    );
}

function StatBox({ value, label }: { value: string, label: string }) {
    const cardColor = useThemeColor({}, 'card');
    return (
        <ThemedView style={[styles.statBox, { backgroundColor: cardColor }]}>
            <ThemedText type="title" style={{ fontSize: 24, marginBottom: 4 }}>{value}</ThemedText>
            <ThemedText style={{ opacity: 0.6, fontSize: 12 }}>{label}</ThemedText>
        </ThemedView>
    )
}

function Badge({ icon, label, color }: { icon: any, label: string, color: string }) {
    const cardColor = useThemeColor({}, 'card');
    return (
        <ThemedView style={[styles.badgeContainer, { backgroundColor: cardColor }]}>
            <Ionicons name={icon} size={32} color={color} style={{ marginBottom: 8 }} />
            <ThemedText style={{ fontSize: 12, fontWeight: '600' }}>{label}</ThemedText>
        </ThemedView>
    )
}

function MenuItem({ icon, label, color }: { icon: any, label: string, color?: string }) {
    const iconColor = useThemeColor({}, 'icon');
    const themeColor = useThemeColor({}, 'text');
    return (
        <TouchableOpacity style={styles.menuItem}>
            <Ionicons name={icon} size={24} color={color || iconColor} style={{ marginRight: 16 }} />
            <ThemedText style={{ fontSize: 16, color: color || themeColor }}>{label}</ThemedText>
            <Ionicons name="chevron-forward" size={20} color={iconColor} style={{ marginLeft: 'auto', opacity: 0.5 }} />
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollContent: {
        padding: 20,
        paddingTop: 60,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 32,
        backgroundColor: 'transparent'
    },
    avatar: {
        width: 80,
        height: 80,
        borderRadius: 40,
        marginRight: 20,
    },
    headerText: {
        flex: 1,
        backgroundColor: 'transparent'
    },
    editBtn: {
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    statsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 32,
        backgroundColor: 'transparent'
    },
    statBox: {
        width: '31%',
        padding: 16,
        borderRadius: 20,
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
        backgroundColor: 'transparent'
    },
    badgesScroll: {
        marginBottom: 32,
        flexGrow: 0,
    },
    badgeContainer: {
        padding: 16,
        borderRadius: 20,
        marginRight: 16,
        alignItems: 'center',
        width: 100,
    },
    menuContainer: {
        backgroundColor: 'transparent'
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(128,128,128, 0.1)',
    }
});
