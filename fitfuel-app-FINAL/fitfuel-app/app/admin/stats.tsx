import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Colors } from '@/constants/Colors';
import { Typography } from '@/constants/Typography';
import { Spacing } from '@/constants/Spacing';

interface MetricCard {
    title: string;
    value: string;
    change: string;
    isPositive: boolean;
}

export default function Stats() {
    const metrics: MetricCard[] = [
        { title: 'Total Orders', value: '1,247', change: '+18%', isPositive: true },
        { title: 'New Members', value: '89', change: '+24%', isPositive: true },
        { title: 'Avg Order Value', value: '₹352', change: '-5%', isPositive: false },
    ];

    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            <View style={styles.content}>
                {/* Header */}
                <View style={styles.header}>
                    <Text style={styles.title}>Performance Stats</Text>
                    <Text style={styles.subtitle}>Franchise analytics overview</Text>
                </View>

                {/* Summary Metrics */}
                <View style={styles.metricsRow}>
                    {metrics.map((metric, index) => (
                        <View key={index} style={styles.metricCard}>
                            <Text style={styles.metricTitle}>{metric.title}</Text>
                            <Text style={styles.metricValue}>{metric.value}</Text>
                            <Text style={[
                                styles.metricChange,
                                metric.isPositive ? styles.changePositive : styles.changeNegative
                            ]}>
                                {metric.change}
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
                        <Text style={styles.placeholderText}>📈</Text>
                        <Text style={styles.placeholderTitle}>Orders Chart</Text>
                        <Text style={styles.placeholderSubtext}>Trend visualization coming soon</Text>
                    </View>
                </View>

                {/* Member Growth Section */}
                <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>Member Growth</Text>
                        <Text style={styles.sectionSubtitle}>Monthly growth</Text>
                    </View>
                    <View style={styles.chartPlaceholder}>
                        <Text style={styles.placeholderText}>👥</Text>
                        <Text style={styles.placeholderTitle}>Growth Chart</Text>
                        <Text style={styles.placeholderSubtext}>Member analytics coming soon</Text>
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
    metricsRow: {
        marginBottom: Spacing.lg,
    },
    metricCard: {
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
    metricTitle: {
        fontSize: 12,
        fontFamily: Typography.medium,
        color: '#6B7280',
        marginBottom: 8,
    },
    metricValue: {
        fontSize: 28,
        fontFamily: Typography.bold,
        color: '#1A1A1A',
        marginBottom: 4,
    },
    metricChange: {
        fontSize: 12,
        fontFamily: Typography.semiBold,
    },
    changePositive: {
        color: Colors.primary,
    },
    changeNegative: {
        color: '#EF4444',
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
    placeholderText: {
        fontSize: 48,
        marginBottom: Spacing.xs,
    },
    placeholderTitle: {
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
});