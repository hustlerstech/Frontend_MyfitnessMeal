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

interface TopFranchise {
    id: string;
    name: string;
    monthlyRevenue: number;
    growth: number;
}

export default function Revenue() {
    const summaryCards: SummaryCard[] = [
        { title: 'Total Revenue', amount: 12400000, color: Colors.primary },
        { title: 'This Month Revenue', amount: 1850000, color: '#3B82F6' },
        { title: 'Pending Payouts', amount: 420000, color: '#F59E0B' },
    ];

    const topFranchises: TopFranchise[] = [
        { id: '1', name: 'MyFitness Meals Indiranagar', monthlyRevenue: 245000, growth: 18 },
        { id: '2', name: 'MyFitness Meals Koramangala', monthlyRevenue: 198000, growth: 12 },
        { id: '3', name: 'MyFitness Meals Whitefield', monthlyRevenue: 212000, growth: 15 },
    ];

    const formatRevenue = (amount: number) => {
        if (amount >= 10000000) {
            return `₹${(amount / 10000000).toFixed(1)}Cr`;
        } else if (amount >= 100000) {
            return `₹${(amount / 100000).toFixed(1)}L`;
        } else if (amount >= 1000) {
            return `₹${(amount / 1000).toFixed(0)}K`;
        }
        return `₹${amount}`;
    };

    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            <View style={styles.content}>
                {/* Header */}
                <View style={styles.header}>
                    <Text style={styles.title}>Global Revenue</Text>
                    <Text style={styles.subtitle}>All franchise financial overview</Text>
                </View>

                {/* Revenue Summary Cards */}
                <View style={styles.summaryGrid}>
                    {summaryCards.map((card, index) => (
                        <View key={index} style={styles.summaryCard}>
                            <Text style={styles.cardTitle}>{card.title}</Text>
                            <Text style={[styles.cardValue, { color: card.color }]}>
                                {formatRevenue(card.amount)}
                            </Text>
                        </View>
                    ))}
                </View>

                {/* Revenue Breakdown Section */}
                <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>Revenue Breakdown</Text>
                        <Text style={styles.sectionSubtitle}>Last 30 days</Text>
                    </View>
                    <View style={styles.chartPlaceholder}>
                        <Text style={styles.placeholderIcon}>📈</Text>
                        <Text style={styles.placeholderText}>Revenue Chart</Text>
                        <Text style={styles.placeholderSubtext}>
                            System-wide revenue trends
                        </Text>
                    </View>
                </View>

                {/* Top Performing Franchises Section */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Top Performing Franchises</Text>
                    <View style={styles.franchiseList}>
                        {topFranchises.map((franchise) => (
                            <View key={franchise.id} style={styles.franchiseCard}>
                                <View style={styles.franchiseInfo}>
                                    <Text style={styles.franchiseName}>{franchise.name}</Text>
                                    <View
                                        style={[
                                            styles.growthBadge,
                                            {
                                                backgroundColor:
                                                    franchise.growth >= 0 ? Colors.primary : '#EF4444',
                                            },
                                        ]}
                                    >
                                        <Text style={styles.growthText}>
                                            {franchise.growth >= 0 ? '+' : ''}
                                            {franchise.growth}%
                                        </Text>
                                    </View>
                                </View>
                                <Text style={styles.franchiseRevenue}>
                                    {formatRevenue(franchise.monthlyRevenue)}
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
        height: 220,
        backgroundColor: '#F9FAFB',
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#E5E7EB',
        borderStyle: 'dashed',
    },
    placeholderIcon: {
        fontSize: 48,
        marginBottom: Spacing.xs,
    },
    placeholderText: {
        fontSize: 16,
        fontFamily: Typography.semiBold,
        color: '#6B7280',
        marginBottom: 4,
    },
    placeholderSubtext: {
        fontSize: 12,
        fontFamily: Typography.regular,
        color: '#9CA3AF',
    },
    franchiseList: {
        marginTop: Spacing.sm,
        gap: Spacing.sm,
    },
    franchiseCard: {
        backgroundColor: '#F9FAFB',
        borderRadius: 8,
        padding: Spacing.sm,
    },
    franchiseInfo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: Spacing.xs,
    },
    franchiseName: {
        fontSize: 14,
        fontFamily: Typography.semiBold,
        color: '#1A1A1A',
        flex: 1,
    },
    growthBadge: {
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 12,
    },
    growthText: {
        fontSize: 11,
        fontFamily: Typography.bold,
        color: '#fff',
        letterSpacing: 0.3,
    },
    franchiseRevenue: {
        fontSize: 18,
        fontFamily: Typography.bold,
        color: Colors.primary,
    },
});