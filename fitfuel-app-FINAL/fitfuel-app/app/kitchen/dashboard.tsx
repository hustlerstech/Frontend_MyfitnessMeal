import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Colors } from '@/constants/Colors';
import { Typography } from '@/constants/Typography';
import { Spacing } from '@/constants/Spacing';

interface StatusCard {
    status: string;
    count: number;
    color: string;
}

export default function KitchenDashboard() {
    const statusCards: StatusCard[] = [
        { status: 'Pending', count: 8, color: '#F59E0B' },
        { status: 'Preparing', count: 12, color: '#3B82F6' },
        { status: 'Ready', count: 5, color: Colors.primary },
    ];

    const avgPrepTime = 12; // minutes

    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            <View style={styles.content}>
                {/* Header */}
                <View style={styles.header}>
                    <Text style={styles.title}>Kitchen Dashboard</Text>
                    <Text style={styles.subtitle}>Live order processing overview</Text>
                </View>

                {/* Status Cards Row */}
                <View style={styles.statusCardsRow}>
                    {statusCards.map((card, index) => (
                        <View key={index} style={styles.statusCard}>
                            <View style={[styles.colorIndicator, { backgroundColor: card.color }]} />
                            <Text style={styles.statusCount}>{card.count}</Text>
                            <Text style={styles.statusLabel}>{card.status}</Text>
                        </View>
                    ))}
                </View>

                {/* Average Prep Time Section */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Average Preparation Time</Text>
                    <View style={styles.prepTimeContainer}>
                        <Text style={styles.prepTimeValue}>{avgPrepTime}</Text>
                        <Text style={styles.prepTimeUnit}>minutes</Text>
                    </View>
                    <Text style={styles.prepTimeSubtext}>Based on last 50 orders</Text>
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
    statusCardsRow: {
        flexDirection: 'row',
        gap: Spacing.sm,
        marginBottom: Spacing.lg,
    },
    statusCard: {
        flex: 1,
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: Spacing.md,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 2,
    },
    colorIndicator: {
        width: 40,
        height: 4,
        borderRadius: 2,
        marginBottom: Spacing.sm,
    },
    statusCount: {
        fontSize: 32,
        fontFamily: Typography.bold,
        color: '#1A1A1A',
        marginBottom: 4,
    },
    statusLabel: {
        fontSize: 12,
        fontFamily: Typography.medium,
        color: '#6B7280',
    },
    section: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: Spacing.lg,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 2,
    },
    sectionTitle: {
        fontSize: 16,
        fontFamily: Typography.semiBold,
        color: '#1A1A1A',
        marginBottom: Spacing.md,
    },
    prepTimeContainer: {
        flexDirection: 'row',
        alignItems: 'baseline',
        justifyContent: 'center',
        marginBottom: Spacing.xs,
    },
    prepTimeValue: {
        fontSize: 48,
        fontFamily: Typography.bold,
        color: Colors.primary,
        marginRight: Spacing.xs,
    },
    prepTimeUnit: {
        fontSize: 16,
        fontFamily: Typography.medium,
        color: '#6B7280',
    },
    prepTimeSubtext: {
        fontSize: 12,
        fontFamily: Typography.regular,
        color: '#9CA3AF',
        textAlign: 'center',
    },
});