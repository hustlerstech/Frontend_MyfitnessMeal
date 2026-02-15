import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { Colors } from '@/constants/Colors';
import { Typography } from '@/constants/Typography';
import { Spacing } from '@/constants/Spacing';

interface OrderItem {
    id: string;
    name: string;
    quantity: number;
    price: number;
}

interface OrderDetails {
    id: string;
    customerId: string;
    customerName: string;
    customerPhone: string;
    customerAddress: string;
    orderDate: string;
    totalAmount: number;
    status: 'pending' | 'preparing' | 'completed';
    items: OrderItem[];
    notes: string;
}

export default function OrderDetails() {
    const params = useLocalSearchParams();
    const orderId = params.id as string;

    // Mock data based on orderId
    const mockOrderData: OrderDetails = {
        id: orderId || 'ORD001',
        customerId: '1',
        customerName: 'John Doe',
        customerPhone: '+91 98765 43210',
        customerAddress: '123 Main Street, Indiranagar, Bangalore - 560038',
        orderDate: 'Feb 14, 2026 at 10:30 AM',
        totalAmount: 450,
        status: 'pending',
        items: [
            { id: '1', name: 'Grilled Chicken Salad', quantity: 2, price: 180 },
            { id: '2', name: 'Protein Smoothie', quantity: 1, price: 90 },
        ],
        notes: 'Extra dressing on the side. No onions please.',
    };

    const [orderStatus, setOrderStatus] = useState(mockOrderData.status);

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'pending':
                return '#F59E0B';
            case 'preparing':
                return '#3B82F6';
            case 'completed':
                return Colors.primary;
            default:
                return '#6B7280';
        }
    };

    const handleStatusUpdate = (newStatus: 'preparing' | 'completed') => {
        setOrderStatus(newStatus);
        // TODO: API call to update status
    };

    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            <View style={styles.content}>
                {/* Order Summary Card */}
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
                        <Text style={styles.label}>Order Date:</Text>
                        <Text style={styles.value}>{mockOrderData.orderDate}</Text>
                    </View>
                    <View style={styles.summaryRow}>
                        <Text style={styles.label}>Total Amount:</Text>
                        <Text style={styles.amountValue}>₹{mockOrderData.totalAmount}</Text>
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
                        <View key={item.id} style={styles.itemRow}>
                            <View style={styles.itemInfo}>
                                <Text style={styles.itemName}>{item.name}</Text>
                                <Text style={styles.itemQuantity}>Qty: {item.quantity}</Text>
                            </View>
                            <Text style={styles.itemPrice}>₹{item.price * item.quantity}</Text>
                        </View>
                    ))}
                    <View style={styles.divider} />
                    <View style={styles.totalRow}>
                        <Text style={styles.totalLabel}>Total</Text>
                        <Text style={styles.totalAmount}>₹{mockOrderData.totalAmount}</Text>
                    </View>
                </View>

                {/* Customer Information Section */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Customer Information</Text>
                    <View style={styles.infoRow}>
                        <Text style={styles.infoLabel}>Name:</Text>
                        <Text style={styles.infoValue}>{mockOrderData.customerName}</Text>
                    </View>
                    <View style={styles.infoRow}>
                        <Text style={styles.infoLabel}>Phone:</Text>
                        <Text style={styles.infoValue}>{mockOrderData.customerPhone}</Text>
                    </View>
                    <View style={styles.infoRow}>
                        <Text style={styles.infoLabel}>Address:</Text>
                        <Text style={styles.infoValue}>{mockOrderData.customerAddress}</Text>
                    </View>
                </View>

                {/* Notes Section */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Special Instructions</Text>
                    <View style={styles.notesBox}>
                        <Text style={styles.notesText}>
                            {mockOrderData.notes || 'No special instructions'}
                        </Text>
                    </View>
                </View>

                {/* Status Update Buttons */}
                <View style={styles.actionsSection}>
                    <Text style={styles.sectionTitle}>Update Status</Text>
                    <View style={styles.buttonRow}>
                        <TouchableOpacity
                            style={[styles.actionButton, styles.preparingButton]}
                            onPress={() => handleStatusUpdate('preparing')}
                            disabled={orderStatus === 'completed'}
                        >
                            <Text style={styles.actionButtonText}>Mark as Preparing</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.actionButton, styles.completedButton]}
                            onPress={() => handleStatusUpdate('completed')}
                        >
                            <Text style={styles.actionButtonText}>Mark as Completed</Text>
                        </TouchableOpacity>
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
    amountValue: {
        fontSize: 18,
        fontFamily: Typography.bold,
        color: Colors.primary,
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
    itemRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: Spacing.sm,
        borderBottomWidth: 1,
        borderBottomColor: '#F3F4F6',
    },
    itemInfo: {
        flex: 1,
    },
    itemName: {
        fontSize: 14,
        fontFamily: Typography.medium,
        color: '#1A1A1A',
        marginBottom: 4,
    },
    itemQuantity: {
        fontSize: 12,
        fontFamily: Typography.regular,
        color: '#6B7280',
    },
    itemPrice: {
        fontSize: 14,
        fontFamily: Typography.semiBold,
        color: '#1A1A1A',
    },
    divider: {
        height: 1,
        backgroundColor: '#E5E7EB',
        marginVertical: Spacing.sm,
    },
    totalRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: Spacing.sm,
    },
    totalLabel: {
        fontSize: 16,
        fontFamily: Typography.semiBold,
        color: '#1A1A1A',
    },
    totalAmount: {
        fontSize: 20,
        fontFamily: Typography.bold,
        color: Colors.primary,
    },
    infoRow: {
        paddingVertical: Spacing.sm,
    },
    infoLabel: {
        fontSize: 12,
        fontFamily: Typography.medium,
        color: '#6B7280',
        marginBottom: 4,
    },
    infoValue: {
        fontSize: 14,
        fontFamily: Typography.regular,
        color: '#1A1A1A',
    },
    notesBox: {
        backgroundColor: '#F9FAFB',
        borderRadius: 8,
        padding: Spacing.md,
    },
    notesText: {
        fontSize: 14,
        fontFamily: Typography.regular,
        color: '#374151',
        lineHeight: 20,
    },
    actionsSection: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: Spacing.md,
        marginBottom: Spacing.xl,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 2,
    },
    buttonRow: {
        flexDirection: 'row',
        gap: Spacing.sm,
    },
    actionButton: {
        flex: 1,
        paddingVertical: Spacing.md,
        borderRadius: 8,
        alignItems: 'center',
    },
    preparingButton: {
        backgroundColor: '#3B82F6',
    },
    completedButton: {
        backgroundColor: Colors.primary,
    },
    actionButtonText: {
        fontSize: 14,
        fontFamily: Typography.semiBold,
        color: '#fff',
    },
});