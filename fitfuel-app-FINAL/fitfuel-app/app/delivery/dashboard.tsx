import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Colors } from '@/constants/Colors';
import { Typography } from '@/constants/Typography';
import { Spacing } from '@/constants/Spacing';

interface SummaryCard {
    title: string;
    value: string;
    color: string;
}

interface Delivery {
    id: string;
    orderId: string;
    customerName: string;
    status: 'On Route' | 'Delivered' | 'Picked Up';
    time: string;
}

export default function DeliveryDashboard() {
    const summaryCards: SummaryCard[] = [
        { title: 'Active Deliveries', value: '8', color: '#3B82F6' },
        { title: 'Completed Today', value: '34', color: Colors.primary },
        { title: 'Avg Delivery Time', value: '22 min', color: '#F59E0B' },
    ];

    const recentDeliveries: Delivery[] = [
        { id: '1', orderId: 'ORD045', customerName: 'John Doe', status: 'On Route', time: '5 min ago' },
        { id: '2', orderId: 'ORD044', customerName: 'Sarah Wilson', status: 'Delivered', time: '12 min ago' },
        { id: '3', orderId: 'ORD043', customerName: 'Mike Johnson', status: 'Picked Up', time: '18 min ago' },
    ];

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'On Route':
                return '#3B82F6';
            case 'Delivered':
                return Colors.primary;
            case 'Picked Up':
                return '#F59E0B';
            default:
                return '#6B7280';
        }
    };

    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            <View style={styles.content}>
                {/* Header */}
                <View style={styles.header}>
                    <Text style={styles.title}>Delivery Dashboard</Text>
                    <Text style={styles.subtitle}>Live delivery overview</Text>
                </View>

                {/* Summary Cards */}
                <View style={styles.summaryGrid}>
                    {summaryCards.map((card, index) => (
                        <View key={index} style={styles.summaryCard}>
                            <Text style={styles.cardTitle}>{card.title}</Text>
                            <Text style={[styles.cardValue, { color: card.color }]}>
                                {card.value}
                            </Text>
                        </View>
                    ))}
                </View>

                {/* Recent Deliveries Section */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Recent Deliveries</Text>
                    <View style={styles.deliveriesList}>
                        {recentDeliveries.map((delivery) => (
                            <View key={delivery.id} style={styles.deliveryCard}>
                                <View style={styles.deliveryHeader}>
                                    <Text style={styles.orderId}>{delivery.orderId}</Text>
                                    <View
                                        style={[
                                            styles.statusBadge,
                                            { backgroundColor: getStatusColor(delivery.status) },
                                        ]}
                                    >
                                        <Text style={styles.statusText}>{delivery.status}</Text>
                                    </View>
                                </View>
                                <Text style={styles.customerName}>{delivery.customerName}</Text>
                                <Text style={styles.deliveryTime}>{delivery.time}</Text>
                            </View>
                        ))}
                    </View>
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F9FA',
    },
    content: {
        padding: Spacing.md,
    },
    header: {
        marginBottom: Spacing.lg,
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
    summaryGrid: {
        marginBottom: Spacing.lg,
    },
    summaryCard: {
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
    cardTitle: {
        fontSize: 12,
        fontFamily: Typography.medium,
        color: '#6B7280',
        marginBottom: Spacing.sm,
    },
    cardValue: {
        fontSize: 32,
        fontFamily: Typography.bold,
    },
    section: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: Spacing.md,
        marginBottom: Spacing.md,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 2,
    },
    sectionTitle: {
        fontSize: 18,
        fontFamily: Typography.semiBold,
        color: '#1A1A1A',
        marginBottom: Spacing.md,
    },
    deliveriesList: {
        gap: Spacing.sm,
    },
    deliveryCard: {
        backgroundColor: '#F9FAFB',
        borderRadius: 8,
        padding: Spacing.sm,
    },
    deliveryHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: Spacing.xs,
    },
    orderId: {
        fontSize: 14,
        fontFamily: Typography.bold,
        color: Colors.primary,
    },
    statusBadge: {
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 12,
    },
    statusText: {
        fontSize: 10,
        fontFamily: Typography.bold,
        color: '#fff',
        letterSpacing: 0.5,
    },
    customerName: {
        fontSize: 14,
        fontFamily: Typography.medium,
        color: '#1A1A1A',
        marginBottom: 4,
    },
    deliveryTime: {
        fontSize: 12,
        fontFamily: Typography.regular,
        color: '#6B7280',
    },
});