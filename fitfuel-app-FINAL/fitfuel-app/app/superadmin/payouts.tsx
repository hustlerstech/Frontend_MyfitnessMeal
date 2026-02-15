import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Colors } from '@/constants/Colors';
import { Typography } from '@/constants/Typography';
import { Spacing } from '@/constants/Spacing';

type PayoutStatus = 'Pending' | 'Approved' | 'Rejected';

interface SummaryCard {
    title: string;
    amount: number;
    color: string;
}

interface PayoutRequest {
    id: string;
    franchiseName: string;
    requestedAmount: number;
    requestDate: string;
    status: PayoutStatus;
}

export default function Payouts() {
    const summaryCards: SummaryCard[] = [
        { title: 'Total Pending Payouts', amount: 420000, color: '#F59E0B' },
        { title: 'Total Paid This Month', amount: 1850000, color: Colors.primary },
        { title: 'Upcoming Scheduled', amount: 680000, color: '#3B82F6' },
    ];

    const payoutRequests: PayoutRequest[] = [
        {
            id: '1',
            franchiseName: 'MyFitness Meals Indiranagar',
            requestedAmount: 125000,
            requestDate: 'Feb 14, 2026',
            status: 'Pending',
        },
        {
            id: '2',
            franchiseName: 'MyFitness Meals Koramangala',
            requestedAmount: 98000,
            requestDate: 'Feb 13, 2026',
            status: 'Pending',
        },
        {
            id: '3',
            franchiseName: 'MyFitness Meals HSR Layout',
            requestedAmount: 87000,
            requestDate: 'Feb 12, 2026',
            status: 'Approved',
        },
        {
            id: '4',
            franchiseName: 'MyFitness Meals Whitefield',
            requestedAmount: 110000,
            requestDate: 'Feb 11, 2026',
            status: 'Pending',
        },
        {
            id: '5',
            franchiseName: 'MyFitness Meals MG Road',
            requestedAmount: 75000,
            requestDate: 'Feb 10, 2026',
            status: 'Rejected',
        },
    ];

    const formatAmount = (amount: number) => {
        if (amount >= 100000) {
            return `₹${(amount / 100000).toFixed(1)}L`;
        } else if (amount >= 1000) {
            return `₹${(amount / 1000).toFixed(0)}K`;
        }
        return `₹${amount}`;
    };

    const getStatusColor = (status: PayoutStatus) => {
        switch (status) {
            case 'Pending':
                return '#F59E0B';
            case 'Approved':
                return Colors.primary;
            case 'Rejected':
                return '#EF4444';
            default:
                return '#6B7280';
        }
    };

    const handleApprove = (payoutId: string) => {
        console.log('Approve payout:', payoutId);
        // TODO: Show confirmation and approve payout
    };

    const handleReject = (payoutId: string) => {
        console.log('Reject payout:', payoutId);
        // TODO: Show confirmation and reject payout
    };

    const renderPayoutRequest = ({ item }: { item: PayoutRequest }) => (
        <View style={styles.payoutCard}>
            <View style={styles.cardHeader}>
                <Text style={styles.franchiseName}>{item.franchiseName}</Text>
                <View
                    style={[
                        styles.statusBadge,
                        { backgroundColor: getStatusColor(item.status) },
                    ]}
                >
                    <Text style={styles.statusText}>{item.status}</Text>
                </View>
            </View>

            <View style={styles.payoutDetails}>
                <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Requested Amount</Text>
                    <Text style={styles.amountValue}>
                        {formatAmount(item.requestedAmount)}
                    </Text>
                </View>
                <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Request Date</Text>
                    <Text style={styles.detailValue}>{item.requestDate}</Text>
                </View>
            </View>

            {item.status === 'Pending' && (
                <View style={styles.actionsRow}>
                    <TouchableOpacity
                        style={[styles.actionButton, styles.approveButton]}
                        onPress={() => handleApprove(item.id)}
                    >
                        <Text style={styles.actionButtonText}>✓ Approve</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.actionButton, styles.rejectButton]}
                        onPress={() => handleReject(item.id)}
                    >
                        <Text style={[styles.actionButtonText, styles.rejectButtonText]}>
                            ✕ Reject
                        </Text>
                    </TouchableOpacity>
                </View>
            )}
        </View>
    );

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.title}>Franchise Payouts</Text>
                <Text style={styles.subtitle}>Manage and review payouts</Text>
            </View>

            <FlatList
                data={payoutRequests}
                renderItem={renderPayoutRequest}
                keyExtractor={(item) => item.id}
                ListHeaderComponent={
                    <>
                        {/* Summary Cards */}
                        <View style={styles.summaryGrid}>
                            {summaryCards.map((card, index) => (
                                <View key={index} style={styles.summaryCard}>
                                    <Text style={styles.cardTitle}>{card.title}</Text>
                                    <Text style={[styles.cardValue, { color: card.color }]}>
                                        {formatAmount(card.amount)}
                                    </Text>
                                </View>
                            ))}
                        </View>

                        {/* Section Header */}
                        <Text style={styles.sectionTitle}>Payout Requests</Text>
                    </>
                }
                contentContainerStyle={styles.listContent}
                showsVerticalScrollIndicator={false}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F9FA',
    },
    header: {
        backgroundColor: '#fff',
        paddingHorizontal: Spacing.lg,
        paddingTop: Spacing.md,
        paddingBottom: Spacing.lg,
        borderBottomWidth: 1,
        borderBottomColor: '#E5E7EB',
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
    listContent: {
        padding: Spacing.md,
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
    sectionTitle: {
        fontSize: 18,
        fontFamily: Typography.semiBold,
        color: '#1A1A1A',
        marginBottom: Spacing.md,
    },
    payoutCard: {
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
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: Spacing.sm,
    },
    franchiseName: {
        fontSize: 16,
        fontFamily: Typography.semiBold,
        color: '#1A1A1A',
        flex: 1,
    },
    statusBadge: {
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderRadius: 12,
    },
    statusText: {
        fontSize: 10,
        fontFamily: Typography.bold,
        color: '#fff',
        letterSpacing: 0.5,
    },
    payoutDetails: {
        marginBottom: Spacing.sm,
    },
    detailRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: Spacing.xs,
    },
    detailLabel: {
        fontSize: 13,
        fontFamily: Typography.medium,
        color: '#6B7280',
    },
    detailValue: {
        fontSize: 13,
        fontFamily: Typography.regular,
        color: '#1A1A1A',
    },
    amountValue: {
        fontSize: 18,
        fontFamily: Typography.bold,
        color: Colors.primary,
    },
    actionsRow: {
        flexDirection: 'row',
        gap: Spacing.sm,
        marginTop: Spacing.sm,
        paddingTop: Spacing.sm,
        borderTopWidth: 1,
        borderTopColor: '#F3F4F6',
    },
    actionButton: {
        flex: 1,
        paddingVertical: Spacing.sm,
        borderRadius: 8,
        alignItems: 'center',
    },
    approveButton: {
        backgroundColor: Colors.primary,
    },
    rejectButton: {
        backgroundColor: '#FEE2E2',
    },
    actionButtonText: {
        fontSize: 13,
        fontFamily: Typography.semiBold,
        color: '#fff',
    },
    rejectButtonText: {
        color: '#991B1B',
    },
});