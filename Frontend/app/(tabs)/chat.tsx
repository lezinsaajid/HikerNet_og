import { StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Stack } from 'expo-router';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Colors } from '@/constants/Colors';
import { useThemeColor } from '@/hooks/useThemeColor';

const CHATS = [
    { id: '1', name: 'Weekend Hikers Group', message: 'Anyone up for Blue Ridge this Sunday?', time: '10:30 AM', unread: 2, avatar: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=2070&auto=format&fit=crop', type: 'group' },
    { id: '2', name: 'Sarah Jenkins', message: 'Thanks for sharing that trail map!', time: 'Yesterday', unread: 0, avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2070&auto=format&fit=crop', type: 'direct' },
    { id: '3', name: 'Gear Swap Community', message: 'Selling my Osprey backpack, DM if interested.', time: 'Yesterday', unread: 5, avatar: 'https://images.unsplash.com/photo-1491553895911-0055eca6402d?q=80&w=2080&auto=format&fit=crop', type: 'group' },
];

export default function ChatScreen() {
    const cardColor = useThemeColor({}, 'card');
    const primaryColor = useThemeColor({}, 'primary');

    return (
        <ThemedView style={styles.container}>
            <Stack.Screen options={{ headerShown: false }} />

            <ThemedView style={styles.header}>
                <ThemedText type="title">Community</ThemedText>
                <TouchableOpacity style={[styles.newChatBtn, { backgroundColor: primaryColor }]}>
                    <Ionicons name="add" size={24} color="white" />
                </TouchableOpacity>
            </ThemedView>

            <FlatList
                data={CHATS}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.listContent}
                renderItem={({ item }) => (
                    <TouchableOpacity style={[styles.chatItem, { backgroundColor: cardColor }]}>
                        <Image source={{ uri: item.avatar }} style={styles.avatar} />
                        <ThemedView style={styles.chatInfo}>
                            <ThemedView style={styles.chatRow}>
                                <ThemedText type="defaultSemiBold" style={styles.chatName}>{item.name}</ThemedText>
                                <ThemedText type="caption">{item.time}</ThemedText>
                            </ThemedView>
                            <ThemedView style={styles.chatRow}>
                                <ThemedText numberOfLines={1} style={styles.messagePreview}>{item.message}</ThemedText>
                                {item.unread > 0 && (
                                    <ThemedView style={[styles.badge, { backgroundColor: primaryColor }]}>
                                        <ThemedText style={styles.badgeText}>{item.unread}</ThemedText>
                                    </ThemedView>
                                )}
                            </ThemedView>
                        </ThemedView>
                    </TouchableOpacity>
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
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        marginBottom: 20,
        backgroundColor: 'transparent'
    },
    newChatBtn: {
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    listContent: {
        paddingHorizontal: 20,
    },
    chatItem: {
        flexDirection: 'row',
        padding: 16,
        borderRadius: 20,
        marginBottom: 16,
        alignItems: 'center',
    },
    avatar: {
        width: 56,
        height: 56,
        borderRadius: 28,
        marginRight: 16,
    },
    chatInfo: {
        flex: 1,
        backgroundColor: 'transparent'
    },
    chatRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 4,
        backgroundColor: 'transparent'
    },
    chatName: {
        fontSize: 16,
    },
    messagePreview: {
        flex: 1,
        fontSize: 14,
        opacity: 0.6,
        marginRight: 8,
    },
    badge: {
        minWidth: 20,
        height: 20,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 6,
    },
    badgeText: {
        color: 'white',
        fontSize: 10,
        fontWeight: 'bold',
    }
});
