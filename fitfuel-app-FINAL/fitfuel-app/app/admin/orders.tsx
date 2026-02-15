import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Colors } from '@/constants/Colors';
import { Typography } from '@/constants/Typography';
import { Spacing } from '@/constants/Spacing';

interface Order {
    id: string;
    customerId: string;
    customerName: string;
    totalAmount: number;
    status: 'pending' | 'preparing' | 'completed';
    orderDate: string;
}

export default function Orders() {
    const router = useRouter();

    const orders: Order[] = [
        { id: 'ORD001', customerId: '1', customerName: 'John Doe', totalAmount: 450, status: 'preparing', orderDate: '2026-02-14' },
        { id: 'ORD002', customerId: '2', customerName: 'Jane Smith', totalAmount: 320, status: 'pending', orderDate: '2026-02-14' },
        { id: 'ORD003', customerId: '3', customerName: 'Mike Johnson', totalAmount: 580, status: 'completed', orderDate: '2026-02-14' },
        { id: 'ORD004', customerId: '4', customerName: 'Sarah Wilson', totalAmount: 290, status: 'preparing', orderDate: '2026-02-13' },
        { id: 'ORD005', customerId: '5', customerName: 'Tom Brown', totalAmount: 410, status: 'pending', orderDate: '2026-02-13' },
        { id: 'ORD006', customerId: '6', customerName: 'Emma Davis', totalAmount: 520, status: 'completed', orderDate: '2026-02-13' },
        { id: 'ORD007', customerId: '7', customerName: 'Alex Martinez', totalAmount: 380, status: 'preparing', orderDate: '2026-02-12' },
    ];

    const getStatusColor = (status: Order['status']) => {
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

    const handleOrderPress = (orderId: string) => {
        router.push({
            pathname: '/admin/order-details' as any,
            params: { id: orderId }
        });
    };

    const renderOrder = ({ item }: { item: Order }) => (
        <TouchableOpacity
            style={styles.orderCard}
            onPress={() => handleOrderPress(item.id)}
            activeOpacity={0.7}
        >
            <View style={styles.orderHeader}>
                <Text style={styles.orderId}>{item.id}</Text>
                <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.status) }]}>
                    <Text style={styles.statusText}>{item.status.toUpperCase()}</Text>
                </View>
            </View>

            <Text style={styles.customerName}>{item.customerName}</Text>
            <Text style={styles.amount}>₹{item.totalAmount}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.title}>Orders</Text>
                <Text style={styles.subtitle}>Manage and track all franchise orders</Text>
            </View>

            {/* Orders List */}
            <FlatList
                data={orders}
                renderItem={renderOrder}
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
        fontFamily: Typography.semiBold,
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
    customerName: {
        fontSize: 16,
        fontFamily: Typography.medium,
        color: '#1A1A1A',
        marginBottom: 4,
    },
    amount: {
        fontSize: 18,
        fontFamily: Typography.bold,
        color: Colors.primary,
    },
});