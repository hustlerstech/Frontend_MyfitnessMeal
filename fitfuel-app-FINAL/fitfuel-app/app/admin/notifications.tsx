import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { Colors } from '@/constants/Colors';
import { Typography } from '@/constants/Typography';
import { Spacing } from '@/constants/Spacing';

interface Notification {
    id: string;
    icon: string;
    title: string;
    description: string;
    time: string;
    isNew: boolean;
}

export default function Notifications() {
    const notifications: Notification[] = [
        {
            id: '1',
            icon: '📦',
            title: 'New Order Received',
            description: 'Order #ORD123 has been placed by John Doe',
            time: '2 min ago',
            isNew: true,
        },
        {
            id: '2',
            icon: '💰',
            title: 'Payment Received',
            description: 'Payment of ₹450 received for order #ORD122',
            time: '15 min ago',
            isNew: true,
        },
        {
            id: '3',
            icon: '👤',
            title: 'New Member Joined',
            description: 'Sarah Wilson subscribed to Premium plan',
            time: '1 hour ago',
            isNew: false,
        },
        {
            id: '4',
            icon: '✅',
            title: 'Order Completed',
            description: 'Order #ORD121 has been successfully delivered',
            time: '2 hours ago',
            isNew: false,
        },
        {
            id: '5',
            icon: '🍽️',
            title: 'Menu Updated',
            description: 'New items added to your menu catalog',
            time: '3 hours ago',
            isNew: false,
        },
        {
            id: '6',
            icon: '⭐',
            title: 'New Review',
            description: 'Mike Johnson left a 5-star review',
            time: '5 hours ago',
            isNew: false,
        },
        {
            id: '7',
            icon: '📊',
            title: 'Weekly Report Available',
            description: 'Your performance report for last week is ready',
            time: '1 day ago',
            isNew: false,
        },
    ];

    const renderNotification = ({ item }: { item: Notification }) => (
        <View style={styles.notificationCard}>
            <View style={styles.iconContainer}>
                <Text style={styles.icon}>{item.icon}</Text>
            </View>
            <View style={styles.notificationContent}>
                <View style={styles.headerRow}>
                    <Text style={styles.notificationTitle}>{item.title}</Text>
                    {item.isNew && <View style={styles.newDot} />}
                </View>
                <Text style={styles.notificationDescription}>{item.description}</Text>
                <Text style={[styles.notificationTime, !item.isNew && styles.readTime]}>
                    {item.time}
                </Text>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.title}>Notifications</Text>
                <Text style={styles.subtitle}>Recent updates and alerts</Text>
            </View>

            {/* Notifications List */}
            <FlatList
                data={notifications}
                renderItem={renderNotification}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.listContent}
                showsVerticalScrollIndicator={false}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F9FA',
    },
    header: {
        backgroundColor: '#fff',
        paddingHorizontal: Spacing.lg,
        paddingTop: Spacing.md,
        paddingBottom: Spacing.lg,
        borderBottomWidth: 1,
        borderBottomColor: '#E5E7EB',
    },
    title: {
        fontSize: 24,
        fontFamily: Typography.bold,
        color: '#1A1A1A',
        marginBottom: 4,
    },
    subtitle: {
        fontSize: 14,
        fontFamily: Typography.regular,
        color: '#6B7280',
    },
    listContent: {
        padding: Spacing.md,
    },
    notificationCard: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: Spacing.md,
        marginBottom: Spacing.sm,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 2,
    },
    iconContainer: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: '#F3F4F6',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: Spacing.sm,
    },
    icon: {
        fontSize: 22,
    },
    notificationContent: {
        flex: 1,
    },
    headerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 4,
    },
    notificationTitle: {
        fontSize: 14,
        fontFamily: Typography.semiBold,
        color: '#1A1A1A',
        flex: 1,
    },
    newDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: Colors.primary,
        marginLeft: Spacing.xs,
    },
    notificationDescription: {
        fontSize: 13,
        fontFamily: Typography.regular,
        color: '#6B7280',
        lineHeight: 18,
        marginBottom: 6,
    },
    notificationTime: {
        fontSize: 11,
        fontFamily: Typography.medium,
        color: Colors.primary,
    },
    readTime: {
        color: '#9CA3AF',
    },
});