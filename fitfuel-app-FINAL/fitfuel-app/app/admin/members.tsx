import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput } from 'react-native';
import { Colors } from '@/constants/Colors';
import { Typography } from '@/constants/Typography';
import { Spacing } from '@/constants/Spacing';

interface Member {
    id: string;
    name: string;
    email: string;
    plan: 'Standard' | 'Premium' | 'Ultimate';
    status: 'Active' | 'Expired';
    joinDate: string;
}

export default function Members() {
    const [searchQuery, setSearchQuery] = useState('');

    const members: Member[] = [
        { id: '1', name: 'John Doe', email: 'john@example.com', plan: 'Premium', status: 'Active', joinDate: 'Jan 15, 2026' },
        { id: '2', name: 'Jane Smith', email: 'jane@example.com', plan: 'Ultimate', status: 'Active', joinDate: 'Jan 20, 2026' },
        { id: '3', name: 'Mike Johnson', email: 'mike@example.com', plan: 'Standard', status: 'Expired', joinDate: 'Dec 1, 2025' },
        { id: '4', name: 'Sarah Wilson', email: 'sarah@example.com', plan: 'Premium', status: 'Active', joinDate: 'Feb 5, 2026' },
        { id: '5', name: 'Tom Brown', email: 'tom@example.com', plan: 'Standard', status: 'Active', joinDate: 'Feb 10, 2026' },
        { id: '6', name: 'Emma Davis', email: 'emma@example.com', plan: 'Ultimate', status: 'Active', joinDate: 'Jan 25, 2026' },
        { id: '7', name: 'Alex Martinez', email: 'alex@example.com', plan: 'Premium', status: 'Expired', joinDate: 'Nov 15, 2025' },
    ];

    const filteredMembers = members.filter(
        (member) =>
            member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            member.email.toLowerCase().includes(searchQuery.toLowerCase())
    );

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

    const getStatusColor = (status: string) => {
        return status === 'Active' ? Colors.primary : '#EF4444';
    };

    const renderMember = ({ item }: { item: Member }) => (
        <View style={styles.memberCard}>
            <View style={styles.cardHeader}>
                <View style={styles.avatar}>
                    <Text style={styles.avatarText}>{item.name.charAt(0)}</Text>
                </View>
                <View style={styles.memberInfo}>
                    <Text style={styles.memberName}>{item.name}</Text>
                    <Text style={styles.memberEmail}>{item.email}</Text>
                    <Text style={styles.joinDate}>Joined: {item.joinDate}</Text>
                </View>
            </View>
            <View style={styles.badgesRow}>
                <View style={[styles.planBadge, { backgroundColor: getPlanColor(item.plan) }]}>
                    <Text style={styles.badgeText}>{item.plan}</Text>
                </View>
                <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.status) }]}>
                    <Text style={styles.badgeText}>{item.status}</Text>
                </View>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.title}>Members</Text>
                <Text style={styles.subtitle}>Manage franchise members</Text>
            </View>

            {/* Search Bar */}
            <View style={styles.searchContainer}>
                <TextInput
                    style={styles.searchInput}
                    placeholder="Search members by name or email..."
                    placeholderTextColor="#9CA3AF"
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                />
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
        alignItems: 'center',
        marginBottom: Spacing.sm,
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: Colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: Spacing.sm,
    },
    avatarText: {
        fontSize: 20,
        fontFamily: Typography.bold,
        color: '#fff',
    },
    memberInfo: {
        flex: 1,
    },
    memberName: {
        fontSize: 16,
        fontFamily: Typography.semiBold,
        color: '#1A1A1A',
        marginBottom: 4,
    },
    memberEmail: {
        fontSize: 12,
        fontFamily: Typography.regular,
        color: '#6B7280',
        marginBottom: 2,
    },
    joinDate: {
        fontSize: 11,
        fontFamily: Typography.regular,
        color: '#9CA3AF',
    },
    badgesRow: {
        flexDirection: 'row',
        gap: Spacing.xs,
    },
    planBadge: {
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderRadius: 12,
    },
    statusBadge: {
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderRadius: 12,
    },
    badgeText: {
        fontSize: 10,
        fontFamily: Typography.bold,
        color: '#fff',
        letterSpacing: 0.5,
    },
});