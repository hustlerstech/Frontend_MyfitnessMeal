import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Colors } from '@/constants/Colors';
import { Typography } from '@/constants/Typography';
import { Spacing } from '@/constants/Spacing';

type FranchiseStatus = 'Active' | 'Suspended';

interface Franchise {
    id: string;
    name: string;
    location: string;
    totalMembers: number;
    monthlyRevenue: number;
    status: FranchiseStatus;
}

export default function Franchises() {
    const router = useRouter();

    const franchises: Franchise[] = [
        {
            id: '1',
            name: 'MyFitness Meals Indiranagar',
            location: 'Bangalore, Karnataka',
            totalMembers: 234,
            monthlyRevenue: 245000,
            status: 'Active',
        },
        {
            id: '2',
            name: 'MyFitness Meals Koramangala',
            location: 'Bangalore, Karnataka',
            totalMembers: 189,
            monthlyRevenue: 198000,
            status: 'Active',
        },
        {
            id: '3',
            name: 'MyFitness Meals HSR Layout',
            location: 'Bangalore, Karnataka',
            totalMembers: 156,
            monthlyRevenue: 167000,
            status: 'Suspended',
        },
        {
            id: '4',
            name: 'MyFitness Meals Whitefield',
            location: 'Bangalore, Karnataka',
            totalMembers: 201,
            monthlyRevenue: 212000,
            status: 'Active',
        },
        {
            id: '5',
            name: 'MyFitness Meals MG Road',
            location: 'Bangalore, Karnataka',
            totalMembers: 178,
            monthlyRevenue: 185000,
            status: 'Active',
        },
    ];

    const handleAddFranchise = () => {
        console.log('Add new franchise');
        // TODO: Navigate to add franchise screen
    };

    const handleFranchisePress = (franchiseId: string) => {
        router.push({
            pathname: '/superadmin/franchise-details' as any,
            params: { id: franchiseId },
        });
    };

    const getStatusColor = (status: FranchiseStatus) => {
        return status === 'Active' ? Colors.primary : '#EF4444';
    };

    const renderFranchise = ({ item }: { item: Franchise }) => (
        <TouchableOpacity
            style={styles.franchiseCard}
            onPress={() => handleFranchisePress(item.id)}
            activeOpacity={0.7}
        >
            <View style={styles.cardHeader}>
                <Text style={styles.franchiseName}>{item.name}</Text>
                <View
                    style={[
                        styles.statusBadge,
                        { backgroundColor: getStatusColor(item.status) },
                    ]}
                >
                    <Text style={styles.statusText}>{item.status}</Text>
                </View>
            </View>

            <Text style={styles.location}>📍 {item.location}</Text>

            <View style={styles.statsRow}>
                <View style={styles.statItem}>
                    <Text style={styles.statLabel}>Members</Text>
                    <Text style={styles.statValue}>{item.totalMembers}</Text>
                </View>
                <View style={styles.divider} />
                <View style={styles.statItem}>
                    <Text style={styles.statLabel}>Monthly Revenue</Text>
                    <Text style={styles.statValue}>
                        ₹{(item.monthlyRevenue / 1000).toFixed(0)}K
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.title}>Franchises</Text>
                <Text style={styles.subtitle}>Manage all franchise locations</Text>
            </View>

            {/* Add Franchise Button */}
            <View style={styles.addButtonContainer}>
                <TouchableOpacity style={styles.addButton} onPress={handleAddFranchise}>
                    <Text style={styles.addButtonText}>+ Add Franchise</Text>
                </TouchableOpacity>
            </View>

            {/* Franchises List */}
            <FlatList
                data={franchises}
                renderItem={renderFranchise}
                keyExtractor={(item) => item.id}
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
    addButtonContainer: {
        backgroundColor: '#fff',
        paddingHorizontal: Spacing.md,
        paddingVertical: Spacing.sm,
        borderBottomWidth: 1,
        borderBottomColor: '#E5E7EB',
    },
    addButton: {
        backgroundColor: Colors.primary,
        paddingVertical: Spacing.sm,
        borderRadius: 8,
        alignItems: 'center',
    },
    addButtonText: {
        fontSize: 14,
        fontFamily: Typography.semiBold,
        color: '#fff',
    },
    listContent: {
        padding: Spacing.md,
    },
    franchiseCard: {
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
    location: {
        fontSize: 13,
        fontFamily: Typography.regular,
        color: '#6B7280',
        marginBottom: Spacing.sm,
    },
    statsRow: {
        flexDirection: 'row',
        paddingTop: Spacing.sm,
        borderTopWidth: 1,
        borderTopColor: '#F3F4F6',
    },
    statItem: {
        flex: 1,
    },
    divider: {
        width: 1,
        backgroundColor: '#E5E7EB',
        marginHorizontal: Spacing.sm,
    },
    statLabel: {
        fontSize: 11,
        fontFamily: Typography.medium,
        color: '#9CA3AF',
        marginBottom: 4,
    },
    statValue: {
        fontSize: 16,
        fontFamily: Typography.bold,
        color: Colors.primary,
    },
});