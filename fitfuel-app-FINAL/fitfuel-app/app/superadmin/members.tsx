import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity } from 'react-native';
import { Colors } from '@/constants/Colors';
import { Typography } from '@/constants/Typography';
import { Spacing } from '@/constants/Spacing';

type MemberStatus = 'Active' | 'Expired';
type FilterTab = 'All' | 'Active' | 'Expired';

interface Member {
    id: string;
    name: string;
    email: string;
    franchiseName: string;
    membershipPlan: string;
    status: MemberStatus;
}

export default function Members() {
    const [searchQuery, setSearchQuery] = useState('');
    const [activeFilter, setActiveFilter] = useState<FilterTab>('All');

    const allMembers: Member[] = [
        {
            id: '1',
            name: 'John Doe',
            email: 'john@example.com',
            franchiseName: 'MyFitness Meals Indiranagar',
            membershipPlan: 'Premium',
            status: 'Active',
        },
        {
            id: '2',
            name: 'Jane Smith',
            email: 'jane@example.com',
            franchiseName: 'MyFitness Meals Koramangala',
            membershipPlan: 'Ultimate',
            status: 'Active',
        },
        {
            id: '3',
            name: 'Mike Johnson',
            email: 'mike@example.com',
            franchiseName: 'MyFitness Meals HSR Layout',
            membershipPlan: 'Standard',
            status: 'Expired',
        },
        {
            id: '4',
            name: 'Sarah Wilson',
            email: 'sarah@example.com',
            franchiseName: 'MyFitness Meals Whitefield',
            membershipPlan: 'Premium',
            status: 'Active',
        },
        {
            id: '5',
            name: 'Tom Brown',
            email: 'tom@example.com',
            franchiseName: 'MyFitness Meals MG Road',
            membershipPlan: 'Standard',
            status: 'Active',
        },
        {
            id: '6',
            name: 'Emma Davis',
            email: 'emma@example.com',
            franchiseName: 'MyFitness Meals Indiranagar',
            membershipPlan: 'Ultimate',
            status: 'Expired',
        },
    ];

    const filteredMembers = allMembers.filter((member) => {
        const matchesSearch =
            member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            member.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
            member.franchiseName.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesFilter =
            activeFilter === 'All' || member.status === activeFilter;

        return matchesSearch && matchesFilter;
    });

    const getStatusColor = (status: MemberStatus) => {
        return status === 'Active' ? Colors.primary : '#EF4444';
    };

    const getPlanColor = (plan: string) => {
        switch (plan) {
            case 'Standard':
                return '#6B7280';
            case 'Premium':
                return '#3B82F6';
            case 'Ultimate':
                return '#F59E0B';
            default:
                return '#6B7280';
        }
    };

    const renderMember = ({ item }: { item: Member }) => (
        <View style={styles.memberCard}>
            <View style={styles.cardHeader}>
                <Text style={styles.memberName}>{item.name}</Text>
                <View
                    style={[
                        styles.statusBadge,
                        { backgroundColor: getStatusColor(item.status) },
                    ]}
                >
                    <Text style={styles.statusText}>{item.status}</Text>
                </View>
            </View>

            <Text style={styles.memberEmail}>{item.email}</Text>

            <View style={styles.detailsRow}>
                <View style={styles.detailItem}>
                    <Text style={styles.detailLabel}>Franchise</Text>
                    <Text style={styles.detailValue}>{item.franchiseName}</Text>
                </View>
            </View>

            <View style={styles.planRow}>
                <View
                    style={[
                        styles.planBadge,
                        { backgroundColor: getPlanColor(item.membershipPlan) },
                    ]}
                >
                    <Text style={styles.planText}>{item.membershipPlan}</Text>
                </View>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.title}>All Members</Text>
                <Text style={styles.subtitle}>Manage members across all franchises</Text>
            </View>

            {/* Search Bar */}
            <View style={styles.searchContainer}>
                <TextInput
                    style={styles.searchInput}
                    placeholder="Search members by name, email, or franchise..."
                    placeholderTextColor="#9CA3AF"
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                />
            </View>

            {/* Filter Tabs */}
            <View style={styles.tabsContainer}>
                <TouchableOpacity
                    style={[styles.tab, activeFilter === 'All' && styles.activeTab]}
                    onPress={() => setActiveFilter('All')}
                >
                    <Text
                        style={[styles.tabText, activeFilter === 'All' && styles.activeTabText]}
                    >
                        All
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.tab, activeFilter === 'Active' && styles.activeTab]}
                    onPress={() => setActiveFilter('Active')}
                >
                    <Text
                        style={[
                            styles.tabText,
                            activeFilter === 'Active' && styles.activeTabText,
                        ]}
                    >
                        Active
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.tab, activeFilter === 'Expired' && styles.activeTab]}
                    onPress={() => setActiveFilter('Expired')}
                >
                    <Text
                        style={[
                            styles.tabText,
                            activeFilter === 'Expired' && styles.activeTabText,
                        ]}
                    >
                        Expired
                    </Text>
                </TouchableOpacity>
            </View>

            {/* Members List */}
            <FlatList
                data={filteredMembers}
                renderItem={renderMember}
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
    searchContainer: {
        backgroundColor: '#fff',
        paddingHorizontal: Spacing.md,
        paddingVertical: Spacing.sm,
        borderBottomWidth: 1,
        borderBottomColor: '#E5E7EB',
    },
    searchInput: {
        backgroundColor: '#F9FAFB',
        borderRadius: 8,
        padding: Spacing.sm,
        fontSize: 14,
        fontFamily: Typography.regular,
        color: '#1A1A1A',
        borderWidth: 1,
        borderColor: '#E5E7EB',
    },
    tabsContainer: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        paddingHorizontal: Spacing.sm,
        paddingVertical: Spacing.xs,
        borderBottomWidth: 1,
        borderBottomColor: '#E5E7EB',
    },
    tab: {
        flex: 1,
        paddingVertical: Spacing.sm,
        alignItems: 'center',
        borderRadius: 8,
        marginHorizontal: 4,
    },
    activeTab: {
        backgroundColor: Colors.primary,
    },
    tabText: {
        fontSize: 14,
        fontFamily: Typography.semiBold,
        color: '#6B7280',
    },
    activeTabText: {
        color: '#fff',
    },
    listContent: {
        padding: Spacing.md,
    },
    memberCard: {
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
        marginBottom: Spacing.xs,
    },
    memberName: {
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
    memberEmail: {
        fontSize: 13,
        fontFamily: Typography.regular,
        color: '#6B7280',
        marginBottom: Spacing.sm,
    },
    detailsRow: {
        marginBottom: Spacing.xs,
    },
    detailItem: {
        marginBottom: 4,
    },
    detailLabel: {
        fontSize: 11,
        fontFamily: Typography.medium,
        color: '#9CA3AF',
        marginBottom: 2,
    },
    detailValue: {
        fontSize: 13,
        fontFamily: Typography.regular,
        color: '#374151',
    },
    planRow: {
        flexDirection: 'row',
        marginTop: Spacing.xs,
    },
    planBadge: {
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderRadius: 12,
    },
    planText: {
        fontSize: 10,
        fontFamily: Typography.bold,
        color: '#fff',
        letterSpacing: 0.5,
    },
});