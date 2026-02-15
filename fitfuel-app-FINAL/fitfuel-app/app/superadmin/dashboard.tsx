import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Colors } from '@/constants/Colors';
import { Typography } from '@/constants/Typography';
import { Spacing } from '@/constants/Spacing';

interface SummaryCard {
    title: string;
    value: string;
    color: string;
}

interface Franchise {
    id: string;
    name: string;
    location: string;
    monthlyRevenue: number;
    growth: number;
}

export default function SuperAdminDashboard() {
    const summaryCards: SummaryCard[] = [
        { title: 'Total Franchises', value: '3', color: '#3B82F6' },
        { title: 'Total Members', value: '1048', color: Colors.primary },
        { title: 'Total Revenue', value: '₹12L', color: '#F59E0B' },
        { title: 'Active Admins', value: '3', color: '#8B5CF6' },
    ];

    const topFranchises: Franchise[] = [
        { id: '1', name: 'MyFitness Meals Chhindwara', location: 'Chhindwara', monthlyRevenue: 245000, growth: 18 },
        { id: '2', name: 'MyFitness Meals Jabalpur', location: 'Jabalpur', monthlyRevenue: 198000, growth: 12 },
        { id: '3', name: 'MyFitness Meals Indore', location: 'Indore', monthlyRevenue: 167000, growth: -5 },
    ];

    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            <View style={styles.content}>
                {/* Header */}
                <View style={styles.header}>
                    <Text style={styles.title}>Super Admin Dashboard</Text>
                    <Text style={styles.subtitle}>Global system overview</Text>
                </View>

                {/* Summary Cards */}
                <View style={styles.summaryGrid}>
                    {summaryCards.map((card, index) => (
                        <View key={index} style={styles.summaryCard}>
                            <Text style={styles.cardTitle}>{card.title}</Text>
                            <Text style={[styles.cardValue, { color: card.color }]}>
                                {card.value}
                            </Text>
                        </View>
                    ))}
                </View>

                {/* Revenue Overview Section */}
                <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>Revenue Overview</Text>
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

                {/* Franchise Performance Section */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Top Performing Franchises</Text>
                    <View style={styles.franchiseList}>
                        {topFranchises.map((franchise) => (
                            <View key={franchise.id} style={styles.franchiseCard}>
                                <View style={styles.franchiseHeader}>
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
                                <Text style={styles.franchiseLocation}>📍 {franchise.location}</Text>
                                <View style={styles.revenueRow}>
                                    <Text style={styles.revenueLabel}>Monthly Revenue</Text>
                                    <Text style={styles.revenueValue}>
                                        ₹{(franchise.monthlyRevenue / 1000).toFixed(0)}K
                                    </Text>
                                </View>
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
        fontSize: 28,
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
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginHorizontal: -6,
        marginBottom: Spacing.lg,
    },
    summaryCard: {
        width: '50%',
        padding: 6,
    },
    cardTitle: {
        fontSize: 11,
        fontFamily: Typography.medium,
        color: '#6B7280',
        marginBottom: 8,
        backgroundColor: '#fff',
        padding: Spacing.sm,
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 2,
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
    franchiseHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: Spacing.xs,
    },
    franchiseName: {
        fontSize: 15,
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
    franchiseLocation: {
        fontSize: 12,
        fontFamily: Typography.regular,
        color: '#6B7280',
        marginBottom: Spacing.sm,
    },
    revenueRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: Spacing.xs,
        borderTopWidth: 1,
        borderTopColor: '#E5E7EB',
    },
    revenueLabel: {
        fontSize: 12,
        fontFamily: Typography.medium,
        color: '#9CA3AF',
    },
    revenueValue: {
        fontSize: 16,
        fontFamily: Typography.bold,
        color: Colors.primary,
    },
});