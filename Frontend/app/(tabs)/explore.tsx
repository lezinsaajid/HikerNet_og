import { StyleSheet, ScrollView, TextInput, Image, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Stack } from 'expo-router';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Colors } from '@/constants/Colors';
import { useThemeColor } from '@/hooks/useThemeColor';

const CATEGORIES = ['All', 'Mountains', 'Forests', 'Rivers', 'Deserts'];

const TRAILS = [
    { id: '1', name: 'Mystic Mountain Loop', rating: 4.8, reviews: 124, difficulty: 'Hard', distance: '12 km', image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=2070&auto=format&fit=crop' },
    { id: '2', name: 'Emerald Lake Trail', rating: 4.5, reviews: 89, difficulty: 'Moderate', distance: '8.5 km', image: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=2070&auto=format&fit=crop' },
    { id: '3', name: 'Whispering Woods', rating: 4.9, reviews: 210, difficulty: 'Easy', distance: '5 km', image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=2070&auto=format&fit=crop' },
];

export default function ExploreScreen() {
    const textColor = useThemeColor({}, 'text');
    const iconColor = useThemeColor({}, 'icon');
    const cardColor = useThemeColor({}, 'card');

    return (
        <ThemedView style={styles.container}>
            <Stack.Screen options={{ headerShown: false }} />

            <ThemedView style={styles.header}>
                <ThemedText type="title">Explore</ThemedText>
            </ThemedView>

            <ThemedView style={[styles.searchContainer, { backgroundColor: cardColor }]}>
                <Ionicons name="search" size={20} color={iconColor} style={{ marginRight: 8 }} />
                <TextInput
                    placeholder="Find your next adventure..."
                    placeholderTextColor={iconColor}
                    style={[styles.searchInput, { color: textColor }]}
                />
            </ThemedView>

            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categories}>
                {CATEGORIES.map((cat, index) => (
                    <ThemedView key={cat} style={[
                        styles.categoryChip,
                        index === 0 ? { backgroundColor: Colors.dark.primary } : { borderColor: iconColor, borderWidth: 1 }
                    ]}>
                        <ThemedText style={{ color: index === 0 ? 'white' : textColor, fontWeight: '600' }}>{cat}</ThemedText>
                    </ThemedView>
                ))}
            </ScrollView>

            <FlatList
                data={TRAILS}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.listContent}
                renderItem={({ item }) => (
                    <ThemedView style={[styles.trailCard, { backgroundColor: cardColor }]}>
                        <Image source={{ uri: item.image }} style={styles.trailImage} />
                        <ThemedView style={styles.cardContent}>
                            <ThemedView style={styles.row}>
                                <ThemedText type="subtitle">{item.name}</ThemedText>
                                <ThemedView style={styles.ratingBadge}>
                                    <Ionicons name="star" size={12} color="#FFD700" />
                                    <ThemedText style={styles.ratingText}>{item.rating}</ThemedText>
                                </ThemedView>
                            </ThemedView>
                            <ThemedText style={{ opacity: 0.7, marginVertical: 4 }}>{item.distance} • {item.difficulty}</ThemedText>
                            <ThemedText type="link">View Details</ThemedText>
                        </ThemedView>
                    </ThemedView>
                )}
            />

        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 60,
    },
    header: {
        paddingHorizontal: 20,
        marginBottom: 16,
        backgroundColor: 'transparent'
    },
    searchContainer: {
        marginHorizontal: 20,
        marginBottom: 20,
        flexDirection: 'row',
        alignItems: 'center',
        padding: 12,
        borderRadius: 12,
    },
    searchInput: {
        flex: 1,
        fontSize: 16,
    },
    categories: {
        paddingHorizontal: 20,
        marginBottom: 20,
        flexGrow: 0,
    },
    categoryChip: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 20,
        marginRight: 10,
        backgroundColor: 'transparent'
    },
    listContent: {
        paddingHorizontal: 20,
        paddingBottom: 40
    },
    trailCard: {
        borderRadius: 20,
        marginBottom: 24,
        overflow: 'hidden',
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 4,
    },
    trailImage: {
        width: '100%',
        height: 180,
    },
    cardContent: {
        padding: 16,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        backgroundColor: 'transparent'
    },
    ratingBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.1)',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 8,
    },
    ratingText: {
        marginLeft: 4,
        fontWeight: 'bold',
        fontSize: 12,
    }
});
