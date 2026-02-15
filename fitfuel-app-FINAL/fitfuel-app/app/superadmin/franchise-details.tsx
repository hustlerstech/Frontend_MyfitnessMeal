import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { Colors } from '@/constants/Colors';
import { Typography } from '@/constants/Typography';
import { Spacing } from '@/constants/Spacing';

type FranchiseStatus = 'Active' | 'Suspended';

interface FranchiseDetails {
    id: string;
    name: string;
    location: string;
    status: FranchiseStatus;
    adminName: string;
    monthlyRevenue: number;
    totalMembers: number;
    ordersThisMonth: number;
    growth: number;
}

export default function FranchiseDetails() {
    const params = useLocalSearchParams();
    const franchiseId = params.id as string;

    // Mock data based on franchiseId
    const mockFranchiseData: FranchiseDetails = {
        id: franchiseId || '1',
        name: 'MyFitness Meals Indiranagar',
        location: 'Bangalore, Karnataka',
        status: 'Active',
        adminName: 'Rajesh Kumar',
        monthlyRevenue: 245000,
        totalMembers: 234,
        ordersThisMonth: 1247,
        growth: 18,
    };

    const getStatusColor = (status: FranchiseStatus) => {
        return status === 'Active' ? Colors.primary : '#EF4444';
    };

    const handleSuspendFranchise = () => {
        console.log('Suspend franchise:', franchiseId);
        // TODO: Show confirmation modal and suspend franchise
    };

    const handleViewMembers = () => {
        console.log('View members for franchise:', franchiseId);
        // TODO: Navigate to members screen
    };

    const handleViewRevenue = () => {
        console.log('View revenue for franchise:', franchiseId);
        // TODO: Navigate to revenue screen
    };

    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            <View style={styles.content}>
                {/* Franchise Summary Section */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Franchise Summary</Text>
                    <View style={styles.summaryHeader}>
                        <Text style={styles.franchiseName}>{mockFranchiseData.name}</Text>
                        <View
                            style={[
                                styles.statusBadge,
                                { backgroundColor: getStatusColor(mockFranchiseData.status) },
                            ]}
                        >
                            <Text style={styles.statusText}>{mockFranchiseData.status}</Text>
                        </View>
                    </View>
                    <Text style={styles.location}>📍 {mockFranchiseData.location}</Text>
                    <View style={styles.adminInfo}>
                        <Text style={styles.adminLabel}>Franchise Admin:</Text>
                        <Text style={styles.adminName}>{mockFranchiseData.adminName}</Text>
                    </View>
                </View>

                {/* Performance Metrics Section */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Performance Metrics</Text>
                    <View style={styles.metricsGrid}>
                        <View style={styles.metricCard}>
                            <Text style={styles.metricLabel}>Monthly Revenue</Text>
                            <Text style={styles.metricValue}>
                                ₹{(mockFranchiseData.monthlyRevenue / 1000).toFixed(0)}K
                            </Text>
                        </View>
                        <View style={styles.metricCard}>
                            <Text style={styles.metricLabel}>Total Members</Text>
                            <Text style={styles.metricValue}>{mockFranchiseData.totalMembers}</Text>
                        </View>
                        <View style={styles.metricCard}>
                            <Text style={styles.metricLabel}>Orders This Month</Text>
                            <Text style={styles.metricValue}>{mockFranchiseData.ordersThisMonth}</Text>
                        </View>
                        <View style={styles.metricCard}>
                            <Text style={styles.metricLabel}>Growth</Text>
                            <Text
                                style={[
                                    styles.metricValue,
                                    { color: mockFranchiseData.growth >= 0 ? Colors.primary : '#EF4444' },
                                ]}
                            >
                                {mockFranchiseData.growth >= 0 ? '+' : ''}
                                {mockFranchiseData.growth}%
                            </Text>
                        </View>
                    </View>
                </View>

                {/* Revenue Trend Section */}
                <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>Revenue Trend</Text>
                        <Text style={styles.sectionSubtitle}>Last 6 months</Text>
                    </View>
                    <View style={styles.chartPlaceholder}>
                        <Text style={styles.placeholderIcon}>📊</Text>
                        <Text style={styles.placeholderText}>Revenue Chart</Text>
                        <Text style={styles.placeholderSubtext}>6-month revenue performance</Text>
                    </View>
                </View>

                {/* Admin Actions Section */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Admin Actions</Text>
                    <View style={styles.actionsContainer}>
                        <TouchableOpacity
                            style={styles.actionButton}
                            onPress={handleViewMembers}
                        >
                            <Text style={styles.actionButtonText}>👥 View Members</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.actionButton}
                            onPress={handleViewRevenue}
                        >
                            <Text style={styles.actionButtonText}>💰 View Revenue</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[styles.actionButton, styles.suspendButton]}
                            onPress={handleSuspendFranchise}
                        >
                            <Text style={[styles.actionButtonText, styles.suspendButtonText]}>
                                ⛔ Suspend Franchise
                            </Text>
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
        padding: Spacing.md,
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
    summaryHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: Spacing.sm,
    },
    franchiseName: {
        fontSize: 20,
        fontFamily: Typography.bold,
        color: '#1A1A1A',
        flex: 1,
    },
    statusBadge: {
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
    location: {
        fontSize: 14,
        fontFamily: Typography.regular,
        color: '#6B7280',
        marginBottom: Spacing.md,
    },
    adminInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F9FAFB',
        borderRadius: 8,
        padding: Spacing.sm,
    },
    adminLabel: {
        fontSize: 13,
        fontFamily: Typography.medium,
        color: '#6B7280',
        marginRight: Spacing.xs,
    },
    adminName: {
        fontSize: 13,
        fontFamily: Typography.semiBold,
        color: '#1A1A1A',
    },
    metricsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginHorizontal: -6,
    },
    metricCard: {
        width: '50%',
        padding: 6,
    },
    metricLabel: {
        fontSize: 11,
        fontFamily: Typography.medium,
        color: '#6B7280',
        marginBottom: 6,
    },
    metricValue: {
        fontSize: 24,
        fontFamily: Typography.bold,
        color: Colors.primary,
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
    actionsContainer: {
        gap: Spacing.sm,
    },
    actionButton: {
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
    suspendButton: {
        backgroundColor: '#FEE2E2',
    },
    suspendButtonText: {
        color: '#991B1B',
    },
});