import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Colors } from '@/constants/Colors';
import { Typography } from '@/constants/Typography';
import { Spacing } from '@/constants/Spacing';

type OrderStatus = 'pending' | 'preparing' | 'ready';

interface OrderItem {
    name: string;
    quantity: number;
}

interface Order {
    id: string;
    customerId: string;
    customerName: string;
    items: OrderItem[];
    notes: string;
    allergens: string[];
    status: OrderStatus;
}

export default function KitchenOrders() {
    const [activeTab, setActiveTab] = useState<OrderStatus>('pending');

    const allOrders: Order[] = [
        {
            id: 'ORD001',
            customerId: '1',
            customerName: 'John Doe',
            items: [
                { name: 'Chicken Bowl', quantity: 2 },
                { name: 'Protein Smoothie', quantity: 1 },
            ],
            notes: 'Extra sauce on the side',
            allergens: ['Gluten-Free'],
            status: 'pending',
        },
        {
            id: 'ORD002',
            customerId: '2',
            customerName: 'Jane Smith',
            items: [
                { name: 'Quinoa Salad', quantity: 1 },
            ],
            notes: 'No onions please',
            allergens: ['Nut-Free', 'Vegan'],
            status: 'pending',
        },
        {
            id: 'ORD003',
            customerId: '3',
            customerName: 'Mike Johnson',
            items: [
                { name: 'Grilled Chicken', quantity: 1 },
                { name: 'Greek Yogurt', quantity: 2 },
            ],
            notes: '',
            allergens: [],
            status: 'preparing',
        },
        {
            id: 'ORD004',
            customerId: '4',
            customerName: 'Sarah Wilson',
            items: [
                { name: 'Turkey Wrap', quantity: 3 },
            ],
            notes: 'Extra spicy',
            allergens: ['Gluten-Free'],
            status: 'preparing',
        },
        {
            id: 'ORD005',
            customerId: '5',
            customerName: 'Tom Brown',
            items: [
                { name: 'Keto Bowl', quantity: 1 },
                { name: 'Avocado Toast', quantity: 1 },
            ],
            notes: '',
            allergens: ['Dairy-Free'],
            status: 'ready',
        },
    ];

    const filteredOrders = allOrders.filter((order) => order.status === activeTab);

    const handleStartPrep = (orderId: string) => {
        console.log('Start prep for order:', orderId);
        // TODO: Update order status to 'preparing'
    };

    const handleMarkReady = (orderId: string) => {
        console.log('Mark ready for order:', orderId);
        // TODO: Update order status to 'ready'
    };

    const getItemsSummary = (items: OrderItem[]) => {
        return items.map((item) => `${item.quantity}x ${item.name}`).join(', ');
    };

    const renderActionButton = (order: Order) => {
        switch (order.status) {
            case 'pending':
                return (
                    <TouchableOpacity
                        style={[styles.actionButton, styles.startPrepButton]}
                        onPress={() => handleStartPrep(order.id)}
                    >
                        <Text style={styles.actionButtonText}>Start Prep</Text>
                    </TouchableOpacity>
                );
            case 'preparing':
                return (
                    <TouchableOpacity
                        style={[styles.actionButton, styles.markReadyButton]}
                        onPress={() => handleMarkReady(order.id)}
                    >
                        <Text style={styles.actionButtonText}>Mark Ready</Text>
                    </TouchableOpacity>
                );
            case 'ready':
                return (
                    <View style={[styles.actionButton, styles.completedButton]}>
                        <Text style={styles.completedButtonText}>Completed</Text>
                    </View>
                );
        }
    };

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.title}>Kitchen Orders</Text>
                <Text style={styles.subtitle}>Manage live food preparation</Text>
            </View>

            {/* Status Tabs */}
            <View style={styles.tabsContainer}>
                <TouchableOpacity
                    style={[styles.tab, activeTab === 'pending' && styles.activeTab]}
                    onPress={() => setActiveTab('pending')}
                >
                    <Text style={[styles.tabText, activeTab === 'pending' && styles.activeTabText]}>
                        Pending
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.tab, activeTab === 'preparing' && styles.activeTab]}
                    onPress={() => setActiveTab('preparing')}
                >
                    <Text style={[styles.tabText, activeTab === 'preparing' && styles.activeTabText]}>
                        Preparing
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.tab, activeTab === 'ready' && styles.activeTab]}
                    onPress={() => setActiveTab('ready')}
                >
                    <Text style={[styles.tabText, activeTab === 'ready' && styles.activeTabText]}>
                        Ready
                    </Text>
                </TouchableOpacity>
            </View>

            {/* Orders List */}
            <ScrollView style={styles.ordersContainer} showsVerticalScrollIndicator={false}>
                <View style={styles.ordersList}>
                    {filteredOrders.map((order) => (
                        <View key={order.id} style={styles.orderCard}>
                            <View style={styles.orderHeader}>
                                <Text style={styles.orderId}>{order.id}</Text>
                                <Text style={styles.customerName}>{order.customerName}</Text>
                            </View>

                            <Text style={styles.itemsSummary}>{getItemsSummary(order.items)}</Text>

                            {order.notes && (
                                <View style={styles.notesSection}>
                                    <Text style={styles.notesLabel}>Notes:</Text>
                                    <Text style={styles.notesText}>{order.notes}</Text>
                                </View>
                            )}

                            {order.allergens.length > 0 && (
                                <View style={styles.allergensSection}>
                                    {order.allergens.map((allergen, index) => (
                                        <View key={index} style={styles.allergenBadge}>
                                            <Text style={styles.allergenText}>{allergen}</Text>
                                        </View>
                                    ))}
                                </View>
                            )}

                            {renderActionButton(order)}
                        </View>
                    ))}

                    {filteredOrders.length === 0 && (
                        <View style={styles.emptyState}>
                            <Text style={styles.emptyStateText}>No {activeTab} orders</Text>
                        </View>
                    )}
                </View>
            </ScrollView>
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
    ordersContainer: {
        flex: 1,
    },
    ordersList: {
        padding: Spacing.md,
    },
    orderCard: {
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
    orderHeader: {
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
    customerName: {
        fontSize: 14,
        fontFamily: Typography.semiBold,
        color: '#1A1A1A',
    },
    itemsSummary: {
        fontSize: 14,
        fontFamily: Typography.regular,
        color: '#374151',
        marginBottom: Spacing.sm,
        lineHeight: 20,
    },
    notesSection: {
        backgroundColor: '#FEF3C7',
        borderRadius: 8,
        padding: Spacing.sm,
        marginBottom: Spacing.sm,
    },
    notesLabel: {
        fontSize: 11,
        fontFamily: Typography.bold,
        color: '#92400E',
        marginBottom: 2,
    },
    notesText: {
        fontSize: 12,
        fontFamily: Typography.regular,
        color: '#78350F',
    },
    allergensSection: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: Spacing.xs,
        marginBottom: Spacing.sm,
    },
    allergenBadge: {
        backgroundColor: '#FEE2E2',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 12,
    },
    allergenText: {
        fontSize: 10,
        fontFamily: Typography.bold,
        color: '#991B1B',
        letterSpacing: 0.3,
    },
    actionButton: {
        paddingVertical: Spacing.sm,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: Spacing.xs,
    },
    startPrepButton: {
        backgroundColor: '#3B82F6',
    },
    markReadyButton: {
        backgroundColor: Colors.primary,
    },
    completedButton: {
        backgroundColor: '#E5E7EB',
    },
    actionButtonText: {
        fontSize: 14,
        fontFamily: Typography.semiBold,
        color: '#fff',
    },
    completedButtonText: {
        fontSize: 14,
        fontFamily: Typography.semiBold,
        color: '#6B7280',
    },
    emptyState: {
        paddingVertical: Spacing.xl * 2,
        alignItems: 'center',
    },
    emptyStateText: {
        fontSize: 14,
        fontFamily: Typography.medium,
        color: '#9CA3AF',
    },
});