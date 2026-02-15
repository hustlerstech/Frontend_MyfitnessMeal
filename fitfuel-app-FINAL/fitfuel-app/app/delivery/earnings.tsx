import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Colors } from '@/constants/Colors';
import { Typography } from '@/constants/Typography';
import { Spacing } from '@/constants/Spacing';

interface SummaryCard {
    title: string;
    amount: number;
    color: string;
}

interface DeliveryActivity {
    id: string;
    orderId: string;
    distance: string;
    earnings: number;
}

export default function DeliveryEarnings() {
    const summaryCards: SummaryCard[] = [
        { title: 'Total Earnings', amount: 4580, color: Colors.primary },
        { title: 'Tips Earned', amount: 850, color: '#F59E0B' },
        { title: 'Bonuses', amount: 320, color: '#3B82F6' },
    ];

    const earningsMix = {
        basePay: 3410,
        tips: 850,
        bonus: 320,
        total: 4580,
    };

    const recentActivity: DeliveryActivity[] = [
        { id: '1', orderId: 'ORD047', distance: '3.2 km', earnings: 95 },
        { id: '2', orderId: 'ORD046', distance: '5.8 km', earnings: 125 },
        { id: '3', orderId: 'ORD045', distance: '2.1 km', earnings: 75 },
    ];

    const getPercentage = (value: number) => {
        return (value / earningsMix.total) * 100;
    };

    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            <View style={styles.content}>
                {/* Header */}
                <View style={styles.header}>
                    <Text style={styles.title}>Delivery Earnings</Text>
                    <Text style={styles.subtitle}>Track your income</Text>
                </View>

                {/* Summary Cards */}
                <View style={styles.summaryGrid}>
                    {summaryCards.map((card, index) => (
                        <View key={index} style={styles.summaryCard}>
                            <Text style={styles.cardTitle}>{card.title}</Text>
                            <Text style={[styles.cardValue, { color: card.color }]}>
                                ₹{card.amount.toLocaleString()}
                            </Text>
                        </View>
                    ))}
                </View>

                {/* Earnings Mix Section */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Earnings Breakdown</Text>
                    <View style={styles.earningsMixContainer}>
                        <View style={styles.barContainer}>
                            <View
                                style={[
                                    styles.barSegment,
                                    styles.basePayBar,
                                    { width: `${getPercentage(earningsMix.basePay)}%` },
                                ]}
                            />
                            <View
                                style={[
                                    styles.barSegment,
                                    styles.tipsBar,
                                    { width: `${getPercentage(earningsMix.tips)}%` },
                                ]}
                            />
                            <View
                                style={[
                                    styles.barSegment,
                                    styles.bonusBar,
                                    { width: `${getPercentage(earningsMix.bonus)}%` },
                                ]}
                            />
                        </View>
                        <View style={styles.legendContainer}>
                            <View style={styles.legendItem}>
                                <View style={[styles.legendDot, { backgroundColor: Colors.primary }]} />
                                <Text style={styles.legendText}>
                                    Base Pay: ₹{earningsMix.basePay.toLocaleString()}
                                </Text>
                            </View>
                            <View style={styles.legendItem}>
                                <View style={[styles.legendDot, { backgroundColor: '#F59E0B' }]} />
                                <Text style={styles.legendText}>
                                    Tips: ₹{earningsMix.tips.toLocaleString()}
                                </Text>
                            </View>
                            <View style={styles.legendItem}>
                                <View style={[styles.legendDot, { backgroundColor: '#3B82F6' }]} />
                                <Text style={styles.legendText}>
                                    Bonus: ₹{earningsMix.bonus.toLocaleString()}
                                </Text>
                            </View>
                        </View>
                    </View>
                </View>

                {/* Weekly Earnings Section */}
                <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>Weekly Earnings</Text>
                        <Text style={styles.sectionSubtitle}>This week</Text>
                    </View>
                    <View style={styles.chartPlaceholder}>
                        <Text style={styles.placeholderIcon}>📊</Text>
                        <Text style={styles.placeholderText}>Earnings Chart</Text>
                        <Text style={styles.placeholderSubtext}>Daily earnings breakdown</Text>
                    </View>
                </View>

                {/* Recent Activity List */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Recent Activity</Text>
                    <View style={styles.activityList}>
                        {recentActivity.map((activity) => (
                            <View key={activity.id} style={styles.activityCard}>
                                <View style={styles.activityInfo}>
                                    <Text style={styles.activityOrderId}>{activity.orderId}</Text>
                                    <Text style={styles.activityDistance}>{activity.distance}</Text>
                                </View>
                                <Text style={styles.activityEarnings}>
                                    ₹{activity.earnings}
                                </Text>
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
        fontSize: 28,
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
    sectionHeader: {
        marginBottom: Spacing.sm,
    },
    sectionSubtitle: {
        fontSize: 12,
        fontFamily: Typography.regular,
        color: '#9CA3AF',
    },
    earningsMixContainer: {
        marginTop: Spacing.xs,
    },
    barContainer: {
        flexDirection: 'row',
        height: 40,
        borderRadius: 8,
        overflow: 'hidden',
        marginBottom: Spacing.md,
    },
    barSegment: {
        height: '100%',
    },
    basePayBar: {
        backgroundColor: Colors.primary,
    },
    tipsBar: {
        backgroundColor: '#F59E0B',
    },
    bonusBar: {
        backgroundColor: '#3B82F6',
    },
    legendContainer: {
        gap: Spacing.xs,
    },
    legendItem: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    legendDot: {
        width: 12,
        height: 12,
        borderRadius: 6,
        marginRight: Spacing.xs,
    },
    legendText: {
        fontSize: 13,
        fontFamily: Typography.medium,
        color: '#374151',
    },
    chartPlaceholder: {
        height: 180,
        backgroundColor: '#F9FAFB',
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#E5E7EB',
        borderStyle: 'dashed',
    },
    placeholderIcon: {
        fontSize: 40,
        marginBottom: Spacing.xs,
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
    activityList: {
        gap: Spacing.sm,
    },
    activityCard: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#F9FAFB',
        borderRadius: 8,
        padding: Spacing.sm,
    },
    activityInfo: {
        flex: 1,
    },
    activityOrderId: {
        fontSize: 14,
        fontFamily: Typography.semiBold,
        color: '#1A1A1A',
        marginBottom: 4,
    },
    activityDistance: {
        fontSize: 12,
        fontFamily: Typography.regular,
        color: '#6B7280',
    },
    activityEarnings: {
        fontSize: 16,
        fontFamily: Typography.bold,
        color: Colors.primary,
    },
});