import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Colors } from '@/constants/Colors';
import { Typography } from '@/constants/Typography';
import { Spacing } from '@/constants/Spacing';

interface SummaryCard {
    title: string;
    amount: number;
    change: string;
}

interface Payout {
    id: string;
    date: string;
    amount: number;
    status: 'Processing' | 'Paid';
}

export default function Earnings() {
    const summaryCards: SummaryCard[] = [
        { title: 'Total Revenue', amount: 45230, change: '+18%' },
        { title: 'This Week Revenue', amount: 8920, change: '+12%' },
        { title: 'Pending Payout', amount: 12450, change: '' },
    ];

    const recentPayouts: Payout[] = [
        { id: '1', date: 'Feb 10, 2026', amount: 15200, status: 'Paid' },
        { id: '2', date: 'Feb 3, 2026', amount: 18750, status: 'Paid' },
        { id: '3', date: 'Jan 27, 2026', amount: 14300, status: 'Processing' },
    ];

    const handleRequestPayout = () => {
        console.log('Request payout');
        // TODO: Navigate to payout request screen or show modal
    };

    const getStatusColor = (status: string) => {
        return status === 'Paid' ? Colors.primary : '#F59E0B';
    };

    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            <View style={styles.content}>
                {/* Header */}
                <View style={styles.header}>
                    <Text style={styles.title}>Earnings</Text>
                    <Text style={styles.subtitle}>Track revenue and payouts</Text>
                </View>

                {/* Summary Cards */}
                <View style={styles.summaryGrid}>
                    {summaryCards.map((card, index) => (
                        <View key={index} style={styles.summaryCard}>
                            <Text style={styles.cardTitle}>{card.title}</Text>
                            <Text style={styles.cardAmount}>₹{card.amount.toLocaleString()}</Text>
                            {card.change && (
                                <Text style={styles.cardChange}>{card.change}</Text>
                            )}
                        </View>
                    ))}
                </View>

                {/* Revenue Overview */}
                <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>Revenue Overview</Text>
                        <Text style={styles.sectionSubtitle}>Last 30 days</Text>
                    </View>
                    <View style={styles.chartPlaceholder}>
                        <Text style={styles.placeholderText}>Chart Coming Soon</Text>
                        <Text style={styles.placeholderSubtext}>Revenue trends will appear here</Text>
                    </View>
                </View>

                {/* Recent Payouts */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Recent Payouts</Text>
                    <View style={styles.payoutsList}>
                        {recentPayouts.map((payout) => (
                            <View key={payout.id} style={styles.payoutItem}>
                                <View style={styles.payoutInfo}>
                                    <Text style={styles.payoutDate}>{payout.date}</Text>
                                    <View style={[styles.statusBadge, { backgroundColor: getStatusColor(payout.status) }]}>
                                        <Text style={styles.statusText}>{payout.status}</Text>
                                    </View>
                                </View>
                                <Text style={styles.payoutAmount}>₹{payout.amount.toLocaleString()}</Text>
                            </View>
                        ))}
                    </View>
                </View>

                {/* Request Payout Button */}
                <TouchableOpacity style={styles.requestButton} onPress={handleRequestPayout}>
                    <Text style={styles.requestButtonText}>Request Payout</Text>
                </TouchableOpacity>
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
        marginBottom: 8,
    },
    cardAmount: {
        fontSize: 28,
        fontFamily: Typography.bold,
        color: '#1A1A1A',
        marginBottom: 4,
    },
    cardChange: {
        fontSize: 12,
        fontFamily: Typography.semiBold,
        color: Colors.primary,
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
    sectionHeader: {
        marginBottom: Spacing.sm,
    },
    sectionTitle: {
        fontSize: 18,
        fontFamily: Typography.semiBold,
        color: '#1A1A1A',
        marginBottom: 4,
    },
    sectionSubtitle: {
        fontSize: 12,
        fontFamily: Typography.regular,
        color: '#9CA3AF',
    },
    chartPlaceholder: {
        height: 200,
        backgroundColor: '#F9FAFB',
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#E5E7EB',
        borderStyle: 'dashed',
    },
    placeholderText: {
        fontSize: 14,
        fontFamily: Typography.semiBold,
        color: '#6B7280',
        marginBottom: 4,
    },
    placeholderSubtext: {
        fontSize: 12,
        fontFamily: Typography.regular,
        color: '#9CA3AF',
    },
    payoutsList: {
        marginTop: Spacing.sm,
    },
    payoutItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: Spacing.sm,
        borderBottomWidth: 1,
        borderBottomColor: '#F3F4F6',
    },
    payoutInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: Spacing.sm,
    },
    payoutDate: {
        fontSize: 14,
        fontFamily: Typography.medium,
        color: '#1A1A1A',
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
    payoutAmount: {
        fontSize: 16,
        fontFamily: Typography.bold,
        color: '#1A1A1A',
    },
    requestButton: {
        backgroundColor: Colors.primary,
        paddingVertical: Spacing.md,
        borderRadius: 8,
        alignItems: 'center',
        marginBottom: Spacing.xl,
        shadowColor: Colors.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 4,
    },
    requestButtonText: {
        fontSize: 16,
        fontFamily: Typography.bold,
        color: '#fff',
    },
});