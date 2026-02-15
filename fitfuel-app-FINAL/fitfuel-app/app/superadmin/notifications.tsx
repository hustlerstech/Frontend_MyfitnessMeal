import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Colors } from '@/constants/Colors';
import { Typography } from '@/constants/Typography';
import { Spacing } from '@/constants/Spacing';

type NotificationCategory = 'System' | 'Franchise' | 'Finance';
type NotificationStatus = 'New' | 'Read';
type FilterTab = 'All' | 'System' | 'Franchise' | 'Finance';

interface Notification {
    id: string;
    icon: string;
    title: string;
    description: string;
    timestamp: string;
    category: NotificationCategory;
    status: NotificationStatus;
}

export default function Notifications() {
    const [activeFilter, setActiveFilter] = useState<FilterTab>('All');

    const notifications: Notification[] = [
        {
            id: '1',
            icon: '🚨',
            title: 'System Maintenance Scheduled',
            description: 'Scheduled maintenance on Feb 20, 2026 from 2:00 AM - 4:00 AM',
            timestamp: '5 min ago',
            category: 'System',
            status: 'New',
        },
        {
            id: '2',
            icon: '🏢',
            title: 'New Franchise Application',
            description: 'MyFitness Meals Jayanagar has submitted a new franchise application',
            timestamp: '15 min ago',
            category: 'Franchise',
            status: 'New',
        },
        {
            id: '3',
            icon: '💰',
            title: 'Payout Request Pending',
            description: 'MyFitness Meals Indiranagar has requested payout of ₹1.25L',
            timestamp: '1 hour ago',
            category: 'Finance',
            status: 'Read',
        },
        {
            id: '4',
            icon: '⚠️',
            title: 'High Server Load Detected',
            description: 'Server load at 85% - monitoring required',
            timestamp: '2 hours ago',
            category: 'System',
            status: 'Read',
        },
        {
            id: '5',
            icon: '📊',
            title: 'Monthly Revenue Report Available',
            description: 'January 2026 financial report is ready for review',
            timestamp: '3 hours ago',
            category: 'Finance',
            status: 'Read',
        },
        {
            id: '6',
            icon: '🏪',
            title: 'Franchise Suspended',
            description: 'MyFitness Meals HSR Layout has been suspended due to policy violation',
            timestamp: '5 hours ago',
            category: 'Franchise',
            status: 'Read',
        },
    ];

    const filteredNotifications = notifications.filter((notification) => {
        if (activeFilter === 'All') return true;
        return notification.category === activeFilter;
    });

    const renderNotification = ({ item }: { item: Notification }) => (
        <View style={styles.notificationCard}>
            <View style={styles.iconContainer}>
                <Text style={styles.icon}>{item.icon}</Text>
            </View>
            <View style={styles.notificationContent}>
                <View style={styles.headerRow}>
                    <Text style={styles.notificationTitle}>{item.title}</Text>
                    {item.status === 'New' && <View style={styles.newDot} />}
                </View>
                <Text style={styles.notificationDescription}>{item.description}</Text>
                <Text
                    style={[
                        styles.timestamp,
                        item.status === 'Read' && styles.readTimestamp,
                    ]}
                >
                    {item.timestamp}
                </Text>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.title}>System Notifications</Text>
                <Text style={styles.subtitle}>Global alerts and updates</Text>
            </View>

            {/* Filter Tabs */}
            <View style={styles.tabsContainer}>
                <TouchableOpacity
                    style={[styles.tab, activeFilter === 'All' && styles.activeTab]}
                    onPress={() => setActiveFilter('All')}
                >
                    <Text
                        style={[styles.tabText, activeFilter === 'All' && styles.activeTabText]}
                    >
                        All
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.tab, activeFilter === 'System' && styles.activeTab]}
                    onPress={() => setActiveFilter('System')}
                >
                    <Text
                        style={[
                            styles.tabText,
                            activeFilter === 'System' && styles.activeTabText,
                        ]}
                    >
                        System
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.tab, activeFilter === 'Franchise' && styles.activeTab]}
                    onPress={() => setActiveFilter('Franchise')}
                >
                    <Text
                        style={[
                            styles.tabText,
                            activeFilter === 'Franchise' && styles.activeTabText,
                        ]}
                    >
                        Franchise
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.tab, activeFilter === 'Finance' && styles.activeTab]}
                    onPress={() => setActiveFilter('Finance')}
                >
                    <Text
                        style={[
                            styles.tabText,
                            activeFilter === 'Finance' && styles.activeTabText,
                        ]}
                    >
                        Finance
                    </Text>
                </TouchableOpacity>
            </View>

            {/* Notifications List */}
            <FlatList
                data={filteredNotifications}
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
    tabsContainer: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        paddingHorizontal: Spacing.xs,
        paddingVertical: Spacing.xs,
        borderBottomWidth: 1,
        borderBottomColor: '#E5E7EB',
    },
    tab: {
        flex: 1,
        paddingVertical: Spacing.sm,
        alignItems: 'center',
        borderRadius: 8,
        marginHorizontal: 2,
    },
    activeTab: {
        backgroundColor: Colors.primary,
    },
    tabText: {
        fontSize: 13,
        fontFamily: Typography.semiBold,
        color: '#6B7280',
    },
    activeTabText: {
        color: '#fff',
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
    timestamp: {
        fontSize: 11,
        fontFamily: Typography.medium,
        color: Colors.primary,
    },
    readTimestamp: {
        color: '#9CA3AF',
    },
});