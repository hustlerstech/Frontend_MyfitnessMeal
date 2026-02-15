import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Colors } from '@/constants/Colors';
import { Typography } from '@/constants/Typography';
import { Spacing } from '@/constants/Spacing';

interface KPICard {
    title: string;
    value: string;
    color: string;
}

interface Region {
    id: string;
    name: string;
    totalRevenue: number;
    activeFranchises: number;
}

export default function Analytics() {
    const kpiCards: KPICard[] = [
        { title: 'Total Orders', value: '29,847', color: '#3B82F6' },
        { title: 'Average Order Value', value: '₹415', color: Colors.primary },
        { title: 'Member Growth Rate', value: '+24%', color: '#F59E0B' },
        { title: 'Customer Retention', value: '87%', color: '#8B5CF6' },
    ];

    const regionalPerformance: Region[] = [
        { id: '1', name: 'Chhindwara', totalRevenue: 1245000, activeFranchises: 8 },
        { id: '2', name: 'Jabalpur', totalRevenue: 987000, activeFranchises: 6 },
        { id: '3', name: 'Indore', totalRevenue: 756000, activeFranchises: 5 },
    ];

    const formatRevenue = (amount: number) => {
        if (amount >= 100000) {
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
                    <Text style={styles.title}>System Analytics</Text>
                    <Text style={styles.subtitle}>Operational insights across all franchises</Text>
                </View>

                {/* KPI Summary Cards */}
                <View style={styles.kpiGrid}>
                    {kpiCards.map((card, index) => (
                        <View key={index} style={styles.kpiCard}>
                            <Text style={styles.cardTitle}>{card.title}</Text>
                            <Text style={[styles.cardValue, { color: card.color }]}>
                                {card.value}
                            </Text>
                        </View>
                    ))}
                </View>

                {/* Orders Trend Section */}
                <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>Orders Trend</Text>
                        <Text style={styles.sectionSubtitle}>Last 30 days</Text>
                    </View>
                    <View style={styles.chartPlaceholder}>
                        <Text style={styles.placeholderIcon}>📊</Text>
                        <Text style={styles.placeholderText}>Orders Chart</Text>
                        <Text style={styles.placeholderSubtext}>
                            Daily order volume trends
                        </Text>
                    </View>
                </View>

                {/* Member Growth Section */}
                <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>Member Growth</Text>
                        <Text style={styles.sectionSubtitle}>Monthly trend</Text>
                    </View>
                    <View style={styles.chartPlaceholder}>
                        <Text style={styles.placeholderIcon}>👥</Text>
                        <Text style={styles.placeholderText}>Growth Chart</Text>
                        <Text style={styles.placeholderSubtext}>
                            Member acquisition over time
                        </Text>
                    </View>
                </View>

                {/* Regional Performance Section */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Regional Performance</Text>
                    <View style={styles.regionList}>
                        {regionalPerformance.map((region) => (
                            <View key={region.id} style={styles.regionCard}>
                                <View style={styles.regionHeader}>
                                    <Text style={styles.regionName}>{region.name}</Text>
                                    <View style={styles.franchisesBadge}>
                                        <Text style={styles.franchisesText}>
                                            {region.activeFranchises} Franchises
                                        </Text>
                                    </View>
                                </View>
                                <View style={styles.revenueRow}>
                                    <Text style={styles.revenueLabel}>Total Revenue</Text>
                                    <Text style={styles.revenueValue}>
                                        {formatRevenue(region.totalRevenue)}
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
    kpiGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginHorizontal: -6,
        marginBottom: Spacing.lg,
    },
    kpiCard: {
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
        height: 200,
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
    regionList: {
        marginTop: Spacing.sm,
        gap: Spacing.sm,
    },
    regionCard: {
        backgroundColor: '#F9FAFB',
        borderRadius: 8,
        padding: Spacing.sm,
    },
    regionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: Spacing.sm,
    },
    regionName: {
        fontSize: 15,
        fontFamily: Typography.semiBold,
        color: '#1A1A1A',
        flex: 1,
    },
    franchisesBadge: {
        backgroundColor: '#DBEAFE',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 12,
    },
    franchisesText: {
        fontSize: 11,
        fontFamily: Typography.bold,
        color: '#1E40AF',
        letterSpacing: 0.3,
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
        fontSize: 18,
        fontFamily: Typography.bold,
        color: Colors.primary,
    },
});