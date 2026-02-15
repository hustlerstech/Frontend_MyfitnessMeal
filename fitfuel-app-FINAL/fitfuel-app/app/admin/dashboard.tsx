import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Colors } from '@/constants/Colors';
import { Typography } from '@/constants/Typography';
import { Spacing } from '@/constants/Spacing';

interface StatCard {
    title: string;
    value: string;
    change: string;
    isPositive: boolean;
}

export default function AdminDashboard() {
    const router = useRouter();

    const stats: StatCard[] = [
        { title: "Today's Revenue", value: '₹12,450', change: '+12%', isPositive: true },
        { title: 'Orders Today', value: '47', change: '+8%', isPositive: true },
        { title: 'Active Members', value: '234', change: '+15%', isPositive: true },
        { title: 'Pending Orders', value: '12', change: '-3%', isPositive: false },
    ];

    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            <View style={styles.content}>
                {/* Header */}
                <View style={styles.header}>
                    <Text style={styles.title}>Dashboard</Text>
                    <Text style={styles.subtitle}>Welcome back, Admin</Text>
                </View>

                {/* Stats Grid */}
                <View style={styles.statsGrid}>
                    {stats.map((stat, index) => (
                        <View key={index} style={styles.statCard}>
                            <Text style={styles.statTitle}>{stat.title}</Text>
                            <Text style={styles.statValue}>{stat.value}</Text>
                            <Text style={[
                                styles.statChange,
                                stat.isPositive ? styles.changePositive : styles.changeNegative
                            ]}>
                                {stat.change}
                            </Text>
                        </View>
                    ))}
                </View>

                {/* Revenue Overview */}
                <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>Revenue Overview</Text>
                        <Text style={styles.sectionSubtitle}>Last 7 days</Text>
                    </View>
                    <View style={styles.chartPlaceholder}>
                        <Text style={styles.placeholderText}>Chart Coming Soon</Text>
                    </View>
                </View>

                {/* Quick Actions */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Quick Actions</Text>
                    <View style={styles.actionsRow}>
                        <TouchableOpacity
                            style={styles.actionButton}
                            onPress={() => router.push('/admin/orders' as any)}
                        >
                            <Text style={styles.actionButtonText}>View Orders</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.actionButton}
                            onPress={() => router.push('/admin/menu' as any)}
                        >
                            <Text style={styles.actionButtonText}>Manage Menu</Text>
                        </TouchableOpacity>
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
        padding: Spacing.lg,
    },
    header: {
        marginBottom: Spacing.xl,
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
    statsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginHorizontal: -8,
        marginBottom: Spacing.lg,
    },
    statCard: {
        width: '50%',
        padding: 8,
    },
    statTitle: {
        fontSize: 12,
        fontFamily: Typography.medium,
        color: '#6B7280',
        marginBottom: 8,
        backgroundColor: '#fff',
        padding: Spacing.md,
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 2,
    },
    statValue: {
        fontSize: 24,
        fontFamily: Typography.bold,
        color: '#1A1A1A',
    },
    statChange: {
        fontSize: 12,
        fontFamily: Typography.semiBold,
        marginTop: 4,
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
        padding: Spacing.lg,
        marginBottom: Spacing.lg,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 2,
    },
    sectionHeader: {
        marginBottom: Spacing.md,
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
        backgroundColor: '#F3F4F6',
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#E5E7EB',
        borderStyle: 'dashed',
    },
    placeholderText: {
        fontSize: 14,
        fontFamily: Typography.medium,
        color: '#9CA3AF',
    },
    actionsRow: {
        flexDirection: 'row',
        gap: Spacing.md,
        marginTop: Spacing.md,
    },
    actionButton: {
        flex: 1,
        backgroundColor: Colors.primary,
        paddingVertical: Spacing.md,
        borderRadius: 8,
        alignItems: 'center',
    },
    actionButtonText: {
        fontSize: 14,
        fontFamily: Typography.semiBold,
        color: '#fff',
    },
});