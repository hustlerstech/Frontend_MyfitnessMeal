import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { Colors } from '@/constants/Colors';
import { Typography } from '@/constants/Typography';
import { Spacing } from '@/constants/Spacing';

type OrderStatus = 'pending' | 'preparing' | 'ready';

interface OrderItem {
    id: string;
    name: string;
    quantity: number;
    notes?: string;
}

interface OrderDetails {
    id: string;
    customerId: string;
    customerName: string;
    orderTime: string;
    status: OrderStatus;
    items: OrderItem[];
    specialInstructions: string;
    allergens: string[];
}

export default function KitchenOrderDetails() {
    const params = useLocalSearchParams();
    const orderId = params.id as string;

    // Mock data based on orderId
    const mockOrderData: OrderDetails = {
        id: orderId || 'ORD001',
        customerId: '1',
        customerName: 'John Doe',
        orderTime: 'Feb 14, 2026 at 10:30 AM',
        status: 'pending',
        items: [
            { id: '1', name: 'Grilled Chicken Bowl', quantity: 2, notes: 'Extra sauce' },
            { id: '2', name: 'Protein Smoothie', quantity: 1 },
            { id: '3', name: 'Greek Yogurt Parfait', quantity: 1, notes: 'No granola' },
        ],
        specialInstructions: 'No onions. Extra protein. Please prepare all items fresh.',
        allergens: ['Gluten-Free', 'Nut-Free', 'Dairy-Free'],
    };

    const [orderStatus, setOrderStatus] = useState<OrderStatus>(mockOrderData.status);

    const getStatusColor = (status: OrderStatus) => {
        switch (status) {
            case 'pending':
                return '#F59E0B';
            case 'preparing':
                return '#3B82F6';
            case 'ready':
                return Colors.primary;
            default:
                return '#6B7280';
        }
    };

    const handleStartPreparation = () => {
        setOrderStatus('preparing');
        console.log('Started preparation for order:', orderId);
        // TODO: API call to update status
    };

    const handleMarkReady = () => {
        setOrderStatus('ready');
        console.log('Marked ready for order:', orderId);
        // TODO: API call to update status
    };

    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            <View style={styles.content}>
                {/* Order Summary Section */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Order Summary</Text>
                    <View style={styles.summaryRow}>
                        <Text style={styles.label}>Order ID:</Text>
                        <Text style={styles.value}>{mockOrderData.id}</Text>
                    </View>
                    <View style={styles.summaryRow}>
                        <Text style={styles.label}>Customer:</Text>
                        <Text style={styles.value}>{mockOrderData.customerName}</Text>
                    </View>
                    <View style={styles.summaryRow}>
                        <Text style={styles.label}>Order Time:</Text>
                        <Text style={styles.value}>{mockOrderData.orderTime}</Text>
                    </View>
                    <View style={styles.summaryRow}>
                        <Text style={styles.label}>Status:</Text>
                        <View style={[styles.statusBadge, { backgroundColor: getStatusColor(orderStatus) }]}>
                            <Text style={styles.statusText}>{orderStatus.toUpperCase()}</Text>
                        </View>
                    </View>
                </View>

                {/* Items Section */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Order Items</Text>
                    {mockOrderData.items.map((item) => (
                        <View key={item.id} style={styles.itemCard}>
                            <View style={styles.itemHeader}>
                                <Text style={styles.itemName}>{item.name}</Text>
                                <View style={styles.quantityBadge}>
                                    <Text style={styles.quantityText}>x{item.quantity}</Text>
                                </View>
                            </View>
                            {item.notes && (
                                <View style={styles.itemNotes}>
                                    <Text style={styles.itemNotesLabel}>Note:</Text>
                                    <Text style={styles.itemNotesText}>{item.notes}</Text>
                                </View>
                            )}
                        </View>
                    ))}
                </View>

                {/* Special Instructions Section */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Special Instructions</Text>
                    <View style={styles.instructionsBox}>
                        <Text style={styles.instructionsIcon}>📝</Text>
                        <Text style={styles.instructionsText}>
                            {mockOrderData.specialInstructions || 'No special instructions'}
                        </Text>
                    </View>
                </View>

                {/* Allergen Information Section */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Allergen Information</Text>
                    {mockOrderData.allergens.length > 0 ? (
                        <View style={styles.allergensContainer}>
                            {mockOrderData.allergens.map((allergen, index) => (
                                <View key={index} style={styles.allergenBadge}>
                                    <Text style={styles.allergenIcon}>⚠️</Text>
                                    <Text style={styles.allergenText}>{allergen}</Text>
                                </View>
                            ))}
                        </View>
                    ) : (
                        <Text style={styles.noAllergensText}>No allergen information</Text>
                    )}
                </View>

                {/* Action Buttons */}
                <View style={styles.actionsSection}>
                    {orderStatus === 'pending' && (
                        <TouchableOpacity
                            style={[styles.actionButton, styles.startPrepButton]}
                            onPress={handleStartPreparation}
                        >
                            <Text style={styles.actionButtonText}>Start Preparation</Text>
                        </TouchableOpacity>
                    )}
                    {orderStatus === 'preparing' && (
                        <TouchableOpacity
                            style={[styles.actionButton, styles.markReadyButton]}
                            onPress={handleMarkReady}
                        >
                            <Text style={styles.actionButtonText}>Mark as Ready</Text>
                        </TouchableOpacity>
                    )}
                    {orderStatus === 'ready' && (
                        <View style={[styles.actionButton, styles.completedButton]}>
                            <Text style={styles.completedButtonText}>✓ Order Ready for Pickup</Text>
                        </View>
                    )}
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
    summaryRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: Spacing.sm,
    },
    label: {
        fontSize: 14,
        fontFamily: Typography.medium,
        color: '#6B7280',
    },
    value: {
        fontSize: 14,
        fontFamily: Typography.regular,
        color: '#1A1A1A',
    },
    statusBadge: {
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderRadius: 12,
    },
    statusText: {
        fontSize: 10,
        fontFamily: Typography.bold,
        color: '#fff',
        letterSpacing: 0.5,
    },
    itemCard: {
        backgroundColor: '#F9FAFB',
        borderRadius: 8,
        padding: Spacing.sm,
        marginBottom: Spacing.sm,
    },
    itemHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    itemName: {
        fontSize: 14,
        fontFamily: Typography.semiBold,
        color: '#1A1A1A',
        flex: 1,
    },
    quantityBadge: {
        backgroundColor: Colors.primary,
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 12,
    },
    quantityText: {
        fontSize: 12,
        fontFamily: Typography.bold,
        color: '#fff',
    },
    itemNotes: {
        marginTop: Spacing.xs,
        paddingTop: Spacing.xs,
        borderTopWidth: 1,
        borderTopColor: '#E5E7EB',
    },
    itemNotesLabel: {
        fontSize: 11,
        fontFamily: Typography.bold,
        color: '#6B7280',
        marginBottom: 2,
    },
    itemNotesText: {
        fontSize: 12,
        fontFamily: Typography.regular,
        color: '#374151',
    },
    instructionsBox: {
        backgroundColor: '#FEF3C7',
        borderRadius: 8,
        padding: Spacing.md,
        borderLeftWidth: 4,
        borderLeftColor: '#F59E0B',
    },
    instructionsIcon: {
        fontSize: 20,
        marginBottom: Spacing.xs,
    },
    instructionsText: {
        fontSize: 14,
        fontFamily: Typography.medium,
        color: '#78350F',
        lineHeight: 20,
    },
    allergensContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: Spacing.sm,
    },
    allergenBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FEE2E2',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 12,
        gap: 4,
    },
    allergenIcon: {
        fontSize: 14,
    },
    allergenText: {
        fontSize: 12,
        fontFamily: Typography.bold,
        color: '#991B1B',
        letterSpacing: 0.3,
    },
    noAllergensText: {
        fontSize: 14,
        fontFamily: Typography.regular,
        color: '#9CA3AF',
        textAlign: 'center',
        paddingVertical: Spacing.sm,
    },
    actionsSection: {
        marginBottom: Spacing.xl,
    },
    actionButton: {
        paddingVertical: Spacing.md,
        borderRadius: 8,
        alignItems: 'center',
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
        fontSize: 16,
        fontFamily: Typography.bold,
        color: '#fff',
    },
    completedButtonText: {
        fontSize: 16,
        fontFamily: Typography.bold,
        color: '#6B7280',
    },
});