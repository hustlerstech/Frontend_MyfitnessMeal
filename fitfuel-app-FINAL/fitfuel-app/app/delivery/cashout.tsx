import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Colors } from '@/constants/Colors';
import { Typography } from '@/constants/Typography';
import { Spacing } from '@/constants/Spacing';

interface EarningsBreakdown {
    basePay: number;
    tips: number;
    bonuses: number;
}

export default function DeliveryCashout() {
    const availableBalance = 4580;

    const earningsBreakdown: EarningsBreakdown = {
        basePay: 3410,
        tips: 850,
        bonuses: 320,
    };

    const bankAccount = {
        bankName: 'HDFC Bank',
        accountNumber: '****5678',
        accountHolder: 'John Doe',
    };

    const handleCashout = () => {
        console.log('Process cashout');
        // TODO: Process withdrawal
    };

    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            <View style={styles.content}>
                {/* Header */}
                <View style={styles.header}>
                    <Text style={styles.title}>Cash Out</Text>
                    <Text style={styles.subtitle}>Withdraw your earnings</Text>
                </View>

                {/* Available Balance Card */}
                <View style={styles.balanceCard}>
                    <Text style={styles.balanceLabel}>Available Balance</Text>
                    <Text style={styles.balanceAmount}>₹{availableBalance.toLocaleString()}</Text>
                    <Text style={styles.balanceSubtext}>Ready to withdraw</Text>
                </View>

                {/* Earnings Breakdown Section */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Earnings Breakdown</Text>
                    <View style={styles.breakdownList}>
                        <View style={styles.breakdownItem}>
                            <View style={styles.breakdownInfo}>
                                <View style={[styles.breakdownDot, { backgroundColor: Colors.primary }]} />
                                <Text style={styles.breakdownLabel}>Base Pay</Text>
                            </View>
                            <Text style={styles.breakdownValue}>
                                ₹{earningsBreakdown.basePay.toLocaleString()}
                            </Text>
                        </View>

                        <View style={styles.breakdownItem}>
                            <View style={styles.breakdownInfo}>
                                <View style={[styles.breakdownDot, { backgroundColor: '#F59E0B' }]} />
                                <Text style={styles.breakdownLabel}>Tips</Text>
                            </View>
                            <Text style={styles.breakdownValue}>
                                ₹{earningsBreakdown.tips.toLocaleString()}
                            </Text>
                        </View>

                        <View style={styles.breakdownItem}>
                            <View style={styles.breakdownInfo}>
                                <View style={[styles.breakdownDot, { backgroundColor: '#3B82F6' }]} />
                                <Text style={styles.breakdownLabel}>Bonuses</Text>
                            </View>
                            <Text style={styles.breakdownValue}>
                                ₹{earningsBreakdown.bonuses.toLocaleString()}
                            </Text>
                        </View>
                    </View>
                </View>

                {/* Bank Account Info Section */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Bank Account</Text>
                    <View style={styles.bankInfo}>
                        <View style={styles.bankIcon}>
                            <Text style={styles.bankIconText}>🏦</Text>
                        </View>
                        <View style={styles.bankDetails}>
                            <Text style={styles.bankName}>{bankAccount.bankName}</Text>
                            <Text style={styles.accountNumber}>{bankAccount.accountNumber}</Text>
                            <Text style={styles.accountHolder}>{bankAccount.accountHolder}</Text>
                        </View>
                    </View>
                </View>

                {/* Note Section */}
                <View style={styles.noteSection}>
                    <Text style={styles.noteIcon}>ℹ️</Text>
                    <Text style={styles.noteText}>
                        Funds will be transferred to your bank account within 1-2 business days.
                    </Text>
                </View>

                {/* Cash Out Button */}
                <TouchableOpacity style={styles.cashoutButton} onPress={handleCashout}>
                    <Text style={styles.cashoutButtonText}>Withdraw Now</Text>
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
    balanceCard: {
        backgroundColor: Colors.primary,
        borderRadius: 16,
        padding: Spacing.lg,
        marginBottom: Spacing.lg,
        alignItems: 'center',
        shadowColor: Colors.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 12,
        elevation: 6,
    },
    balanceLabel: {
        fontSize: 14,
        fontFamily: Typography.medium,
        color: '#fff',
        opacity: 0.9,
        marginBottom: 8,
    },
    balanceAmount: {
        fontSize: 48,
        fontFamily: Typography.bold,
        color: '#fff',
        marginBottom: 4,
    },
    balanceSubtext: {
        fontSize: 12,
        fontFamily: Typography.regular,
        color: '#fff',
        opacity: 0.8,
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
    breakdownList: {
        gap: Spacing.sm,
    },
    breakdownItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: Spacing.sm,
    },
    breakdownInfo: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    breakdownDot: {
        width: 12,
        height: 12,
        borderRadius: 6,
        marginRight: Spacing.sm,
    },
    breakdownLabel: {
        fontSize: 14,
        fontFamily: Typography.medium,
        color: '#374151',
    },
    breakdownValue: {
        fontSize: 16,
        fontFamily: Typography.bold,
        color: '#1A1A1A',
    },
    bankInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F9FAFB',
        borderRadius: 8,
        padding: Spacing.md,
    },
    bankIcon: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#E5E7EB',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: Spacing.sm,
    },
    bankIconText: {
        fontSize: 24,
    },
    bankDetails: {
        flex: 1,
    },
    bankName: {
        fontSize: 16,
        fontFamily: Typography.semiBold,
        color: '#1A1A1A',
        marginBottom: 4,
    },
    accountNumber: {
        fontSize: 14,
        fontFamily: Typography.medium,
        color: '#6B7280',
        marginBottom: 2,
    },
    accountHolder: {
        fontSize: 12,
        fontFamily: Typography.regular,
        color: '#9CA3AF',
    },
    noteSection: {
        flexDirection: 'row',
        backgroundColor: '#DBEAFE',
        borderRadius: 8,
        padding: Spacing.md,
        marginBottom: Spacing.lg,
    },
    noteIcon: {
        fontSize: 18,
        marginRight: Spacing.sm,
    },
    noteText: {
        flex: 1,
        fontSize: 13,
        fontFamily: Typography.regular,
        color: '#1E40AF',
        lineHeight: 18,
    },
    cashoutButton: {
        backgroundColor: Colors.primary,
        paddingVertical: Spacing.lg,
        borderRadius: 12,
        alignItems: 'center',
        marginBottom: Spacing.xl,
        shadowColor: Colors.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 4,
    },
    cashoutButtonText: {
        fontSize: 18,
        fontFamily: Typography.bold,
        color: '#fff',
        letterSpacing: 0.5,
    },
});