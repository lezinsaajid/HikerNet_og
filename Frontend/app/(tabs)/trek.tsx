import { StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Stack } from 'expo-router';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Colors } from '@/constants/Colors';
import { useThemeColor } from '@/hooks/useThemeColor';

const { width } = Dimensions.get('window');

export default function TrekScreen() {
    const cardColor = useThemeColor({}, 'card');

    return (
        <ThemedView style={styles.container}>
            <Stack.Screen options={{ headerShown: false }} />

            {/* Map Placeholder */}
            <ThemedView style={[styles.mapPlaceholder, { backgroundColor: cardColor }]}>
                <Ionicons name="map-outline" size={64} color={Colors.dark.primary} style={{ opacity: 0.5 }} />
                <ThemedText style={{ marginTop: 16, opacity: 0.6 }}>Map View Loading...</ThemedText>

                {/* Floating Stats */}
                <ThemedView style={styles.floatingStats}>
                    <StatItem value="0.0" unit="km" label="Distance" />
                    <StatItem value="00:00" unit="h:m" label="Time" />
                    <StatItem value="0" unit="m" label="Elevation" />
                </ThemedView>
            </ThemedView>

            {/* Main Action Button */}
            <ThemedView style={styles.actionContainer}>
                <TouchableOpacity style={styles.startBtn}>
                    <ThemedText style={styles.startBtnText}>START TRACKING</ThemedText>
                </TouchableOpacity>
            </ThemedView>

        </ThemedView>
    );
}

function StatItem({ value, unit, label }: { value: string, unit: string, label: string }) {
    const textColor = useThemeColor({}, 'text');
    return (
        <ThemedView style={styles.statItem}>
            <ThemedText type="title" style={{ fontSize: 24, lineHeight: 30 }}>{value}<ThemedText style={{ fontSize: 14 }}>{unit}</ThemedText></ThemedText>
            <ThemedText style={{ fontSize: 12, opacity: 0.7 }}>{label}</ThemedText>
        </ThemedView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    mapPlaceholder: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 20,
        marginTop: 60,
        borderRadius: 32,
        borderWidth: 2,
        borderColor: 'rgba(128,128,128, 0.1)',
        position: 'relative',
        overflow: 'hidden'
    },
    floatingStats: {
        position: 'absolute',
        top: 20,
        left: 20,
        right: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: 'rgba(0,0,0,0.6)', // Glassmorphism-ish
        padding: 16,
        borderRadius: 20,
        backdropFilter: 'blur(10px)', // Web only property, but keeping for intent
    },
    statItem: {
        alignItems: 'center',
        backgroundColor: 'transparent'
    },
    actionContainer: {
        padding: 20,
        paddingBottom: 40,
        alignItems: 'center',
    },
    startBtn: {
        backgroundColor: Colors.dark.primary,
        paddingVertical: 18,
        paddingHorizontal: 40,
        borderRadius: 40,
        width: width * 0.8,
        alignItems: 'center',
        shadowColor: Colors.dark.primary,
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.3,
        shadowRadius: 16,
        elevation: 8,
    },
    startBtnText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
        letterSpacing: 1,
    }
});
