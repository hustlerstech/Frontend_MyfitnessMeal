import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Colors } from '@/constants/Colors';
import { Typography } from '@/constants/Typography';
import { Spacing } from '@/constants/Spacing';

type DeliveryStatus = 'Completed' | 'Cancelled';
type FilterTab = 'All' | 'Completed' | 'Cancelled';

interface DeliveryRecord {
    id: string;
    orderId: string;
    customerName: string;
    dateTime: string;
    distance: string;
    earnings: number;
    status: DeliveryStatus;
}

export default function DeliveryHistory() {
    const [activeFilter, setActiveFilter] = useState<FilterTab>('All');

    const allDeliveries: DeliveryRecord[] = [
        {
            id: '1',
            orderId: 'ORD047',
            customerName: 'John Doe',
            dateTime: 'Feb 14, 2026 at 2:30 PM',
            distance: '3.2 km',
            earnings: 95,
            status: 'Completed',
        },
        {
            id: '2',
            orderId: 'ORD046',
            customerName: 'Sarah Wilson',
            dateTime: 'Feb 14, 2026 at 1:15 PM',
            distance: '5.8 km',
            earnings: 125,
            status: 'Completed',
        },
        {
            id: '3',
            orderId: 'ORD045',
            customerName: 'Mike Johnson',
            dateTime: 'Feb 14, 2026 at 11:45 AM',
            distance: '2.1 km',
            earnings: 0,
            status: 'Cancelled',
        },
        {
            id: '4',
            orderId: 'ORD044',
            customerName: 'Emma Davis',
            dateTime: 'Feb 13, 2026 at 6:20 PM',
            distance: '4.5 km',
            earnings: 110,
            status: 'Completed',
        },
        {
            id: '5',
            orderId: 'ORD043',
            customerName: 'Tom Brown',
            dateTime: 'Feb 13, 2026 at 4:10 PM',
            distance: '6.2 km',
            earnings: 135,
            status: 'Completed',
        },
        {
            id: '6',
            orderId: 'ORD042',
            customerName: 'Jane Smith',
            dateTime: 'Feb 13, 2026 at 2:30 PM',
            distance: '1.8 km',
            earnings: 0,
            status: 'Cancelled',
        },
    ];

    const filteredDeliveries = allDeliveries.filter((delivery) => {
        if (activeFilter === 'All') return true;
        return delivery.status === activeFilter;
    });

    const getStatusColor = (status: DeliveryStatus) => {
        return status === 'Completed' ? Colors.primary : '#EF4444';
    };

    const renderDelivery = ({ item }: { item: DeliveryRecord }) => (
        <View style={styles.deliveryCard}>
            <View style={styles.cardHeader}>
                <Text style={styles.orderId}>{item.orderId}</Text>
                <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.status) }]}>
                    <Text style={styles.statusText}>{item.status}</Text>
                </View>
            </View>

            <Text style={styles.customerName}>{item.customerName}</Text>

            <View style={styles.detailsRow}>
                <View style={styles.detailItem}>
                    <Text style={styles.detailLabel}>Date & Time</Text>
                    <Text style={styles.detailValue}>{item.dateTime}</Text>
                </View>
            </View>

            <View style={styles.bottomRow}>
                <View style={styles.distanceContainer}>
                    <Text style={styles.distanceIcon}>📍</Text>
                    <Text style={styles.distanceText}>{item.distance}</Text>
                </View>
                {item.status === 'Completed' ? (
                    <Text style={styles.earnings}>₹{item.earnings}</Text>
                ) : (
                    <Text style={styles.cancelledText}>No earnings</Text>
                )}
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.title}>Delivery History</Text>
                <Text style={styles.subtitle}>Past completed deliveries</Text>
            </View>

            {/* Filter Tabs */}
            <View style={styles.tabsContainer}>
                <TouchableOpacity
                    style={[styles.tab, activeFilter === 'All' && styles.activeTab]}
                    onPress={() => setActiveFilter('All')}
                >
                    <Text style={[styles.tabText, activeFilter === 'All' && styles.activeTabText]}>
                        All
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.tab, activeFilter === 'Completed' && styles.activeTab]}
                    onPress={() => setActiveFilter('Completed')}
                >
                    <Text style={[styles.tabText, activeFilter === 'Completed' && styles.activeTabText]}>
                        Completed
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.tab, activeFilter === 'Cancelled' && styles.activeTab]}
                    onPress={() => setActiveFilter('Cancelled')}
                >
                    <Text style={[styles.tabText, activeFilter === 'Cancelled' && styles.activeTabText]}>
                        Cancelled
                    </Text>
                </TouchableOpacity>
            </View>

            {/* Deliveries List */}
            <FlatList
                data={filteredDeliveries}
                renderItem={renderDelivery}
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
        paddingHorizontal: Spacing.sm,
        paddingVertical: Spacing.xs,
        borderBottomWidth: 1,
        borderBottomColor: '#E5E7EB',
    },
    tab: {
        flex: 1,
        paddingVertical: Spacing.sm,
        alignItems: 'center',
        borderRadius: 8,
        marginHorizontal: 4,
    },
    activeTab: {
        backgroundColor: Colors.primary,
    },
    tabText: {
        fontSize: 14,
        fontFamily: Typography.semiBold,
        color: '#6B7280',
    },
    activeTabText: {
        color: '#fff',
    },
    listContent: {
        padding: Spacing.md,
    },
    deliveryCard: {
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
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: Spacing.sm,
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
        fontSize: 16,
        fontFamily: Typography.semiBold,
        color: '#1A1A1A',
        marginBottom: Spacing.sm,
    },
    detailsRow: {
        marginBottom: Spacing.sm,
    },
    detailItem: {
        marginBottom: 4,
    },
    detailLabel: {
        fontSize: 11,
        fontFamily: Typography.medium,
        color: '#9CA3AF',
        marginBottom: 2,
    },
    detailValue: {
        fontSize: 12,
        fontFamily: Typography.regular,
        color: '#374151',
    },
    bottomRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: Spacing.sm,
        borderTopWidth: 1,
        borderTopColor: '#F3F4F6',
    },
    distanceContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    distanceIcon: {
        fontSize: 14,
        marginRight: 4,
    },
    distanceText: {
        fontSize: 13,
        fontFamily: Typography.medium,
        color: '#6B7280',
    },
    earnings: {
        fontSize: 18,
        fontFamily: Typography.bold,
        color: Colors.primary,
    },
    cancelledText: {
        fontSize: 12,
        fontFamily: Typography.medium,
        color: '#EF4444',
    },
});