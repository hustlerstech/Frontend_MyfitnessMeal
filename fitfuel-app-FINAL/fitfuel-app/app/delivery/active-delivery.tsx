import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Colors } from '@/constants/Colors';
import { Typography } from '@/constants/Typography';
import { Spacing } from '@/constants/Spacing';

export default function ActiveDelivery() {
    const deliveryData = {
        orderId: 'ORD047',
        customerName: 'John Doe',
        deliveryAddress: '123 Main Street, Indiranagar, Bangalore - 560038',
        estimatedArrival: '12:45 PM',
        status: 'En Route',
    };

    const handleNavigate = () => {
        console.log('Navigate to location');
        // TODO: Open maps navigation
    };

    const handleMarkDelivered = () => {
        console.log('Mark as delivered');
        // TODO: Update delivery status
    };

    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            <View style={styles.content}>
                {/* Header */}
                <View style={styles.header}>
                    <Text style={styles.title}>Active Delivery</Text>
                    <Text style={styles.subtitle}>Order currently in transit</Text>
                </View>

                {/* Delivery Info Card */}
                <View style={styles.infoCard}>
                    <View style={styles.cardHeader}>
                        <Text style={styles.orderId}>{deliveryData.orderId}</Text>
                        <View style={styles.statusBadge}>
                            <Text style={styles.statusText}>{deliveryData.status}</Text>
                        </View>
                    </View>

                    <View style={styles.infoSection}>
                        <Text style={styles.infoLabel}>Customer</Text>
                        <Text style={styles.infoValue}>{deliveryData.customerName}</Text>
                    </View>

                    <View style={styles.infoSection}>
                        <Text style={styles.infoLabel}>Delivery Address</Text>
                        <Text style={styles.infoValue}>{deliveryData.deliveryAddress}</Text>
                    </View>

                    <View style={styles.etaSection}>
                        <View style={styles.etaIcon}>
                            <Text style={styles.etaIconText}>🕐</Text>
                        </View>
                        <View style={styles.etaInfo}>
                            <Text style={styles.etaLabel}>Estimated Arrival</Text>
                            <Text style={styles.etaValue}>{deliveryData.estimatedArrival}</Text>
                        </View>
                    </View>
                </View>

                {/* Map Placeholder */}
                <View style={styles.mapSection}>
                    <Text style={styles.sectionTitle}>Route</Text>
                    <View style={styles.mapPlaceholder}>
                        <Text style={styles.mapIcon}>🗺️</Text>
                        <Text style={styles.mapPlaceholderText}>Map View</Text>
                        <Text style={styles.mapPlaceholderSubtext}>Navigation view coming soon</Text>
                    </View>
                </View>

                {/* Action Section */}
                <View style={styles.actionsSection}>
                    <TouchableOpacity style={styles.navigateButton} onPress={handleNavigate}>
                        <Text style={styles.navigateButtonText}>📍 Navigate</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.deliveredButton}
                        onPress={handleMarkDelivered}
                    >
                        <Text style={styles.deliveredButtonText}>
                            ➔ Slide to Mark Delivered
                        </Text>
                    </TouchableOpacity>
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
    infoCard: {
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
        marginBottom: Spacing.md,
        paddingBottom: Spacing.sm,
        borderBottomWidth: 1,
        borderBottomColor: '#E5E7EB',
    },
    orderId: {
        fontSize: 18,
        fontFamily: Typography.bold,
        color: Colors.primary,
    },
    statusBadge: {
        backgroundColor: '#3B82F6',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 12,
    },
    statusText: {
        fontSize: 11,
        fontFamily: Typography.bold,
        color: '#fff',
        letterSpacing: 0.5,
    },
    infoSection: {
        marginBottom: Spacing.md,
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
        lineHeight: 20,
    },
    etaSection: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#DBEAFE',
        borderRadius: 8,
        padding: Spacing.sm,
        marginTop: Spacing.xs,
    },
    etaIcon: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#3B82F6',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: Spacing.sm,
    },
    etaIconText: {
        fontSize: 20,
    },
    etaInfo: {
        flex: 1,
    },
    etaLabel: {
        fontSize: 11,
        fontFamily: Typography.medium,
        color: '#1E40AF',
        marginBottom: 2,
    },
    etaValue: {
        fontSize: 18,
        fontFamily: Typography.bold,
        color: '#1E3A8A',
    },
    mapSection: {
        marginBottom: Spacing.md,
    },
    sectionTitle: {
        fontSize: 16,
        fontFamily: Typography.semiBold,
        color: '#1A1A1A',
        marginBottom: Spacing.sm,
    },
    mapPlaceholder: {
        height: 250,
        backgroundColor: '#fff',
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#E5E7EB',
        borderStyle: 'dashed',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 2,
    },
    mapIcon: {
        fontSize: 48,
        marginBottom: Spacing.xs,
    },
    mapPlaceholderText: {
        fontSize: 16,
        fontFamily: Typography.semiBold,
        color: '#6B7280',
        marginBottom: 4,
    },
    mapPlaceholderSubtext: {
        fontSize: 12,
        fontFamily: Typography.regular,
        color: '#9CA3AF',
    },
    actionsSection: {
        marginBottom: Spacing.xl,
    },
    navigateButton: {
        backgroundColor: '#3B82F6',
        paddingVertical: Spacing.md,
        borderRadius: 8,
        alignItems: 'center',
        marginBottom: Spacing.sm,
        shadowColor: '#3B82F6',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 4,
    },
    navigateButtonText: {
        fontSize: 16,
        fontFamily: Typography.bold,
        color: '#fff',
    },
    deliveredButton: {
        backgroundColor: Colors.primary,
        paddingVertical: Spacing.lg,
        borderRadius: 12,
        alignItems: 'center',
        shadowColor: Colors.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 4,
    },
    deliveredButtonText: {
        fontSize: 18,
        fontFamily: Typography.bold,
        color: '#fff',
        letterSpacing: 0.5,
    },
});