/**
 * OrdersScreen — Premium Edition
 *
 * Changes from previous version:
 *  - Dark gradient header (LinearGradient) with subtitle + 📦 badge
 *  - SafeAreaView from react-native-safe-area-context with edges={['top']}
 *  - contentWrapper overlaps header by 28px (marginTop: -28)
 *  - Filter chips inside overlap zone with paddingTop breathing room
 *  - Order card shadow fixed: shadowOpacity 1 → Theme.shadows.sm (0.1)
 *  - Cards have soft borderLight outline; active card keeps green 2px border
 *  - Status badge backgrounds use rgba opacity instead of raw hex
 *  - fontWeight strings → fontFamily tokens throughout
 *  - Empty state: smaller emoji, cleaner copy, "Browse Meals →" CTA
 *  - FlatList paddingBottom: 32 → 100 (clears tab bar)
 *  - Container backgroundColor '#f5f8f5' → Theme.colors.background
 *
 * Business logic (useOrderStore, matchesFilter, navigation) is 100% unchanged.
 */

import React, { useState } from 'react';
import { useRouter } from 'expo-router';
import {
    View,
    Text,
    FlatList,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { useOrderStore } from '@/store/orderStore';
import { Theme } from '../../../constants';

// ─── Types & constants ────────────────────────────────────────────────────────

type FilterTab = 'All' | 'Active' | 'Completed' | 'Cancelled';

const FILTER_TABS: FilterTab[] = ['All', 'Active', 'Completed', 'Cancelled'];

// ─── Pure helper functions (logic unchanged) ──────────────────────────────────

function getStatusStyle(status: string): { bg: string; text: string } {
    const s = status.toLowerCase();
    if (s === 'delivered' || s === 'completed') {
        // Blue — no direct token
        return { bg: 'rgba(3, 105, 161, 0.1)', text: '#0369a1' };
    }
    if (s === 'cancelled' || s === 'canceled') {
        // Red — no direct token
        return { bg: 'rgba(220, 38, 38, 0.1)', text: '#dc2626' };
    }
    // Active / pending / in-transit — primary green token
    return { bg: 'rgba(43, 238, 117, 0.12)', text: Theme.colors.primaryDark };
}

function matchesFilter(status: string, filter: FilterTab): boolean {
    if (filter === 'All') return true;
    const s = status.toLowerCase();
    if (filter === 'Active') return !['delivered', 'completed', 'cancelled', 'canceled'].includes(s);
    if (filter === 'Completed') return s === 'delivered' || s === 'completed';
    if (filter === 'Cancelled') return s === 'cancelled' || s === 'canceled';
    return true;
}

// ─── Screen ───────────────────────────────────────────────────────────────────

export default function OrdersScreen() {
    const router = useRouter();
    const { orders, getActiveOrder } = useOrderStore();
    const activeOrder = getActiveOrder();
    const [activeFilter, setActiveFilter] = useState<FilterTab>('All');

    const filtered = orders.filter(o => matchesFilter(o.status, activeFilter));

    return (
        <SafeAreaView style={styles.root} edges={['top']}>

            {/* ── Gradient Header ── */}
            <LinearGradient
                colors={['#111827', '#1a2e1d', '#0f2319']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.header}
            >
                <View style={styles.decorRing} />
                <View style={styles.headerContent}>
                    <View>
                        <Text style={styles.headerTitle}>My Orders</Text>
                        <Text style={styles.headerSubtitle}>Track your meal deliveries</Text>
                    </View>
                    <View style={styles.headerBadge}>
                        <Text style={styles.headerBadgeText}>📦</Text>
                    </View>
                </View>
            </LinearGradient>

            {/* ── Content wrapper — overlaps header by 28px ── */}
            <View style={styles.contentWrapper}>

                {/* ── Filter Chips ── */}
                <View style={styles.filterWrapper}>
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.filterList}
                    >
                        {FILTER_TABS.map(tab => (
                            <TouchableOpacity
                                key={tab}
                                style={[
                                    styles.filterTab,
                                    activeFilter === tab && styles.filterTabActive,
                                ]}
                                onPress={() => setActiveFilter(tab)}
                                activeOpacity={0.7}
                            >
                                <Text
                                    style={[
                                        styles.filterTabText,
                                        activeFilter === tab && styles.filterTabTextActive,
                                    ]}
                                >
                                    {tab}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </View>

                {/* ── List or Empty State ── */}
                {filtered.length === 0 ? (
                    <View style={styles.emptyState}>
                        <Text style={styles.emptyEmoji}>📦</Text>
                        <Text style={styles.emptyTitle}>No orders yet</Text>
                        <Text style={styles.emptySubtitle}>
                            {activeFilter === 'All'
                                ? 'Place your first order to see it here.'
                                : `No ${activeFilter.toLowerCase()} orders.`}
                        </Text>
                        <TouchableOpacity
                            style={styles.browseBtn}
                            // @ts-ignore
                            onPress={() => router.push('/customer/(tabs)/meals')}
                            activeOpacity={0.85}
                        >
                            <LinearGradient
                                colors={[Theme.colors.primary, Theme.colors.primaryDark]}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 0 }}
                                style={styles.browseBtnGradient}
                            >
                                <Text style={styles.browseBtnText}>Browse Meals →</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>
                ) : (
                    <FlatList
                        data={filtered}
                        keyExtractor={(item) => item.id}
                        contentContainerStyle={styles.listContent}
                        showsVerticalScrollIndicator={false}
                        renderItem={({ item }) => {
                            const statusColors = getStatusStyle(item.status);
                            const isActive = activeOrder?.id === item.id;

                            return (
                                <TouchableOpacity
                                    onPress={() => router.push({
                                        pathname: '/customer/orders/[id]',
                                        params: { id: item.id },
                                    })}
                                    activeOpacity={0.8}
                                    style={[
                                        styles.orderCard,
                                        isActive && styles.orderCardActive,
                                    ]}
                                >
                                    {/* Top row: ID + status badge */}
                                    <View style={styles.cardTopRow}>
                                        <Text style={styles.orderId}>Order #{item.id}</Text>
                                        <View style={[
                                            styles.statusBadge,
                                            { backgroundColor: statusColors.bg },
                                        ]}>
                                            <Text style={[
                                                styles.statusText,
                                                { color: statusColors.text },
                                            ]}>
                                                {item.status.replace(/_/g, ' ')}
                                            </Text>
                                        </View>
                                    </View>

                                    {/* Details */}
                                    <View style={styles.cardDetails}>
                                        <Text style={styles.detailText}>
                                            {item.totalMeals} meal{item.totalMeals !== 1 ? 's' : ''}
                                            {' · '}
                                            {item.paymentMode === 'credit' ? 'Credits' : `₹${item.subtotal}`}
                                        </Text>
                                        <Text style={styles.detailDate}>
                                            {new Date(item.createdAt).toLocaleDateString('en-IN', {
                                                day: 'numeric',
                                                month: 'short',
                                                year: 'numeric',
                                            })}
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                            );
                        }}
                    />
                )}
            </View>
        </SafeAreaView>
    );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({

    // ── Root ──
    root: {
        flex: 1,
        backgroundColor: Theme.colors.background,  // was '#f5f8f5'
    },

    // ── Header ──
    header: {
        paddingHorizontal: Theme.spacing.screenPadding,
        paddingTop: Theme.spacing.sm,
        paddingBottom: 40,   // extra so contentWrapper overlaps cleanly
        overflow: 'hidden',
    },
    decorRing: {
        position: 'absolute',
        width: 200,
        height: 200,
        borderRadius: 100,
        borderWidth: 28,
        borderColor: 'rgba(255,255,255,0.04)',
        top: -80,
        right: -60,
    },
    headerContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    headerTitle: {
        fontSize: 22,
        fontFamily: Theme.fonts.extraBold,
        color: Theme.colors.white,
        letterSpacing: 0.2,
    },
    headerSubtitle: {
        fontSize: 13,
        fontFamily: Theme.fonts.regular,
        color: 'rgba(255,255,255,0.6)',
        marginTop: 3,
    },
    headerBadge: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: 'rgba(43,238,117,0.15)',
        borderWidth: 1.5,
        borderColor: 'rgba(43,238,117,0.4)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerBadgeText: {
        fontSize: 22,
    },

    // ── Content wrapper (overlaps header) ──
    contentWrapper: {
        marginTop: -28,   // pulls content up to visually overlap header bottom
        flex: 1,          // ensures FlatList can scroll to fill remaining space
    },

    // ── Filter chips ──
    filterWrapper: {
        marginBottom: Theme.spacing.sm,
        paddingTop: Theme.spacing.sm,   // breathing room below the overlap zone
    },
    filterList: {
        paddingHorizontal: Theme.spacing.screenPadding,
        gap: Theme.spacing.sm,
    },
    filterTab: {
        paddingHorizontal: Theme.spacing.md,
        paddingVertical: Theme.spacing.sm,
        borderRadius: Theme.borderRadius.full,
        backgroundColor: Theme.colors.backgroundTertiary,
        borderWidth: 1,
        borderColor: Theme.colors.border,
    },
    filterTabActive: {
        backgroundColor: Theme.colors.primary,
        borderColor: Theme.colors.primary,
    },
    filterTabText: {
        ...Theme.textStyles.bodySmall,
        color: Theme.colors.textSecondary,
        fontFamily: Theme.fonts.medium,   // was fontWeight: '500'
    },
    filterTabTextActive: {
        color: Theme.colors.text,
        fontFamily: Theme.fonts.bold,     // was fontWeight: '700'
    },

    // ── Order list ──
    listContent: {
        paddingHorizontal: Theme.spacing.md,
        paddingTop: Theme.spacing.xs,
        paddingBottom: 100,   // was 32 — clears tab bar so last card is visible
    },

    // ── Order card ──
    orderCard: {
        backgroundColor: Theme.colors.card,
        borderRadius: 16,
        padding: 16,
        marginBottom: 12,
        ...Theme.shadows.sm,              // was shadowOpacity: 1 (heavy) — now 0.1, radius: 4
        borderWidth: 1,                   // soft outline (was borderWidth: 0)
        borderColor: Theme.colors.borderLight,
    },
    orderCardActive: {
        borderWidth: 2,
        borderColor: Theme.colors.primary,  // tokenized — unchanged
    },
    cardTopRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    orderId: {
        ...Theme.textStyles.bodyBold,
        color: Theme.colors.text,
    },

    // ── Status badge ──
    statusBadge: {
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: Theme.borderRadius.full,
    },
    statusText: {
        fontSize: 12,
        fontFamily: Theme.fonts.semiBold,   // was fontWeight: '600'
        textTransform: 'capitalize',
    },

    // ── Card details row ──
    cardDetails: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    detailText: {
        ...Theme.textStyles.body,
        color: Theme.colors.textSecondary,
    },
    detailDate: {
        ...Theme.textStyles.caption,
        color: Theme.colors.textLight,
    },

    // ── Empty state ──
    emptyState: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 80,
        paddingHorizontal: Theme.spacing.screenPadding,
    },
    emptyEmoji: {
        fontSize: 48,                      // was 64 — premium sizing
        marginBottom: Theme.spacing.md,
    },
    emptyTitle: {
        ...Theme.textStyles.h3,
        color: Theme.colors.text,
        marginBottom: Theme.spacing.xs,
    },
    emptySubtitle: {
        ...Theme.textStyles.body,
        color: Theme.colors.textSecondary,
        textAlign: 'center',
        marginBottom: Theme.spacing.lg,
    },

    // ── Browse Meals CTA (empty state) ──
    browseBtn: {
        borderRadius: Theme.borderRadius.full,
        overflow: 'hidden',
    },
    browseBtnGradient: {
        paddingHorizontal: Theme.spacing.lg,
        paddingVertical: Theme.spacing.sm + 2,
        borderRadius: Theme.borderRadius.full,
    },
    browseBtnText: {
        fontSize: 14,
        fontFamily: Theme.fonts.bold,
        color: '#0a1a0d',
    },
});
