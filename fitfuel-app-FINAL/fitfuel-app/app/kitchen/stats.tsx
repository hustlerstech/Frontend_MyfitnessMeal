import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Colors } from '@/constants/Colors';
import { Typography } from '@/constants/Typography';
import { Spacing } from '@/constants/Spacing';

interface SummaryCard {
    title: string;
    value: string;
    unit?: string;
    color: string;
}

export default function KitchenStats() {
    const summaryCards: SummaryCard[] = [
        { title: 'Average Prep Time', value: '12', unit: 'min', color: '#3B82F6' },
        { title: 'Orders Completed Today', value: '47', color: Colors.primary },
        { title: 'Orders Delayed', value: '3', color: '#EF4444' },
    ];

    const efficiencyPercentage = 92;

    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            <View style={styles.content}>
                {/* Header */}
                <View style={styles.header}>
                    <Text style={styles.title}>Kitchen Performance</Text>
                    <Text style={styles.subtitle}>Preparation efficiency overview</Text>
                </View>

                {/* Summary Cards */}
                <View style={styles.summaryGrid}>
                    {summaryCards.map((card, index) => (
                        <View key={index} style={styles.summaryCard}>
                            <Text style={styles.cardTitle}>{card.title}</Text>
                            <View style={styles.valueContainer}>
                                <Text style={[styles.cardValue, { color: card.color }]}>
                                    {card.value}
                                </Text>
                                {card.unit && (
                                    <Text style={styles.cardUnit}>{card.unit}</Text>
                                )}
                            </View>
                        </View>
                    ))}
                </View>

                {/* Prep Time Trend Section */}
                <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>Prep Time Trend</Text>
                        <Text style={styles.sectionSubtitle}>Last 7 days</Text>
                    </View>
                    <View style={styles.chartPlaceholder}>
                        <Text style={styles.placeholderIcon}>📊</Text>
                        <Text style={styles.placeholderText}>Prep Time Chart</Text>
                        <Text style={styles.placeholderSubtext}>
                            Daily preparation time trends
                        </Text>
                    </View>
                </View>

                {/* Efficiency Section */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Overall Efficiency</Text>
                    <View style={styles.efficiencyContainer}>
                        <Text style={styles.efficiencyValue}>{efficiencyPercentage}%</Text>
                        <Text style={styles.efficiencyLabel}>On-time completion rate</Text>
                    </View>
                    <View style={styles.progressBarContainer}>
                        <View
                            style={[
                                styles.progressBarFill,
                                { width: `${efficiencyPercentage}%` },
                            ]}
                        />
                    </View>
                    <View style={styles.efficiencyMetrics}>
                        <View style={styles.metricItem}>
                            <Text style={styles.metricValue}>44</Text>
                            <Text style={styles.metricLabel}>On Time</Text>
                        </View>
                        <View style={styles.metricItem}>
                            <Text style={styles.metricValue}>3</Text>
                            <Text style={styles.metricLabel}>Delayed</Text>
                        </View>
                        <View style={styles.metricItem}>
                            <Text style={styles.metricValue}>47</Text>
                            <Text style={styles.metricLabel}>Total</Text>
                        </View>
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
    valueContainer: {
        flexDirection: 'row',
        alignItems: 'baseline',
    },
    cardValue: {
        fontSize: 32,
        fontFamily: Typography.bold,
        marginRight: 4,
    },
    cardUnit: {
        fontSize: 16,
        fontFamily: Typography.medium,
        color: '#6B7280',
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
    efficiencyContainer: {
        alignItems: 'center',
        marginBottom: Spacing.md,
    },
    efficiencyValue: {
        fontSize: 48,
        fontFamily: Typography.bold,
        color: Colors.primary,
        marginBottom: 4,
    },
    efficiencyLabel: {
        fontSize: 14,
        fontFamily: Typography.medium,
        color: '#6B7280',
    },
    progressBarContainer: {
        height: 12,
        backgroundColor: '#E5E7EB',
        borderRadius: 6,
        overflow: 'hidden',
        marginBottom: Spacing.md,
    },
    progressBarFill: {
        height: '100%',
        backgroundColor: Colors.primary,
        borderRadius: 6,
    },
    efficiencyMetrics: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingTop: Spacing.sm,
        borderTopWidth: 1,
        borderTopColor: '#E5E7EB',
    },
    metricItem: {
        alignItems: 'center',
    },
    metricValue: {
        fontSize: 24,
        fontFamily: Typography.bold,
        color: '#1A1A1A',
        marginBottom: 4,
    },
    metricLabel: {
        fontSize: 12,
        fontFamily: Typography.medium,
        color: '#6B7280',
    },
});