import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    TextInput,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { usePlannerStore, Slot } from '@/store/plannerStore';
import { MOCK_MEALS, MEAL_CATEGORIES, Meal } from '@/data/mockMeals';
import { Theme } from '../../../constants';

const VALID_SLOTS: Slot[] = ['breakfast', 'lunch', 'dinner'];

export default function SelectMealScreen() {
    const router = useRouter();
    const params = useLocalSearchParams<{ date: string; slot: string }>();

    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');

    const { setMeal } = usePlannerStore();

    // ── Param validation ─────────────────────────────────────────────────────
    const date = params.date ?? '';
    const slot = params.slot as Slot | undefined;

    const isValidDate = typeof date === 'string' && date.length > 0;
    const isValidSlot = slot !== undefined && VALID_SLOTS.includes(slot);

    if (!isValidDate || !isValidSlot) {
        return (
            <SafeAreaView style={styles.root} edges={['top']}>
                <View style={styles.errorContainer}>
                    <Text style={styles.errorEmoji}>⚠️</Text>
                    <Text style={styles.errorTitle}>Invalid Parameters</Text>
                    <Text style={styles.errorSubtitle}>
                        Missing or invalid date / slot. Please go back and try again.
                    </Text>
                    <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
                        <Text style={styles.backButtonText}>← Go Back</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        );
    }

    // ── Filtering ─────────────────────────────────────────────────────────────
    const filteredMeals = MOCK_MEALS.filter((meal) => {
        const matchesSearch =
            meal.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            meal.description.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory =
            selectedCategory === 'All' || meal.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    // ── Selection handler ─────────────────────────────────────────────────────
    const handleSelectMeal = (meal: Meal) => {
        setMeal(date, slot, { id: meal.id, name: meal.name });
        router.back();
    };

    // ── Slot label for header subtitle ────────────────────────────────────────
    const slotLabel = slot.charAt(0).toUpperCase() + slot.slice(1);

    // ── Render meal row ───────────────────────────────────────────────────────
    const renderMealRow = ({ item }: { item: Meal }) => (
        <TouchableOpacity
            style={styles.card}
            onPress={() => handleSelectMeal(item)}
            activeOpacity={0.75}
        >
            {/* Left: name + description */}
            <View style={styles.cardBody}>
                <Text style={styles.mealName} numberOfLines={1}>{item.name}</Text>
                <Text style={styles.mealDescription} numberOfLines={2}>{item.description}</Text>

                {/* Bottom row: calories badge + rating + price + category chip */}
                <View style={styles.metaRow}>
                    {/* Calories badge */}
                    <View style={styles.calorieBadge}>
                        <Text style={styles.calorieBadgeText}>🔥 {item.calories} cal</Text>
                    </View>

                    {/* Rating */}
                    <View style={styles.ratingBadge}>
                        <Text style={styles.ratingText}>⭐ {item.rating.toFixed(1)}</Text>
                    </View>

                    {/* Price */}
                    <View style={styles.priceBadge}>
                        <Text style={styles.priceBadgeText}>₹{item.price}</Text>
                    </View>

                    {/* Category chip */}
                    <View style={styles.categoryChipSmall}>
                        <Text style={styles.categoryChipSmallText}>{item.category}</Text>
                    </View>
                </View>
            </View>

            {/* Right: chevron */}
            <Text style={styles.chevron}>›</Text>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.root} edges={['top']}>

            {/* ── Gradient Header ─────────────────────────────────────────── */}
            <LinearGradient
                colors={['#111827', '#1a2e1d', '#0f2319']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.header}
            >
                <View style={styles.decorRing} />
                <View style={styles.headerContent}>
                    {/* Back button */}
                    <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
                        <Text style={styles.backBtnText}>‹</Text>
                    </TouchableOpacity>

                    <View style={styles.headerTextBlock}>
                        <Text style={styles.headerTitle}>Select a meal</Text>
                        <Text style={styles.headerSubtitle}>
                            {slotLabel} · {filteredMeals.length} options
                        </Text>
                    </View>

                    <View style={styles.headerBadge}>
                        <Text style={styles.headerBadgeText}>🍽️</Text>
                    </View>
                </View>
            </LinearGradient>

            {/* ── Search Bar ──────────────────────────────────────────────── */}
            <View style={styles.searchWrapper}>
                <View style={styles.searchBar}>
                    <Text style={styles.searchIcon}>🔍</Text>
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Search meals..."
                        placeholderTextColor={Theme.colors.textPlaceholder}
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                    />
                    {searchQuery.length > 0 && (
                        <TouchableOpacity onPress={() => setSearchQuery('')}>
                            <Text style={styles.clearIcon}>✕</Text>
                        </TouchableOpacity>
                    )}
                </View>
            </View>

            {/* ── Category Chips ──────────────────────────────────────────── */}
            <View style={styles.categoriesWrapper}>
                <FlatList
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    data={MEAL_CATEGORIES}
                    keyExtractor={(item) => item}
                    renderItem={({ item }) => {
                        const active = selectedCategory === item;
                        return (
                            <TouchableOpacity
                                style={[styles.categoryChip, active && styles.categoryChipActive]}
                                onPress={() => setSelectedCategory(item)}
                                activeOpacity={0.7}
                            >
                                <Text style={[styles.categoryText, active && styles.categoryTextActive]}>
                                    {item}
                                </Text>
                            </TouchableOpacity>
                        );
                    }}
                    contentContainerStyle={styles.categoriesList}
                />
            </View>

            {/* ── Meal List ───────────────────────────────────────────────── */}
            <FlatList
                data={filteredMeals}
                keyExtractor={(item) => item.id}
                renderItem={renderMealRow}
                contentContainerStyle={styles.list}
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={
                    <View style={styles.emptyState}>
                        <Text style={styles.emptyEmoji}>🍽️</Text>
                        <Text style={styles.emptyTitle}>No meals found</Text>
                        <Text style={styles.emptySubtitle}>
                            Try adjusting your search or category filter
                        </Text>
                    </View>
                }
            />
        </SafeAreaView>
    );
}

// ─── Styles ──────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: Theme.colors.background,
    },

    // ── Error state ──
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: Theme.spacing.screenPadding,
    },
    errorEmoji: {
        fontSize: 56,
        marginBottom: Theme.spacing.md,
    },
    errorTitle: {
        fontSize: 20,
        fontFamily: Theme.fonts.bold,
        color: Theme.colors.text,
        marginBottom: Theme.spacing.xs,
    },
    errorSubtitle: {
        fontSize: 14,
        fontFamily: Theme.fonts.regular,
        color: Theme.colors.textSecondary,
        textAlign: 'center',
        marginBottom: Theme.spacing.lg,
    },
    backButton: {
        paddingHorizontal: Theme.spacing.lg,
        paddingVertical: Theme.spacing.sm,
        borderRadius: Theme.borderRadius.full,
        borderWidth: 1.5,
        borderColor: Theme.colors.primary,
    },
    backButtonText: {
        fontSize: 15,
        fontFamily: Theme.fonts.semiBold,
        color: Theme.colors.primary,
    },

    // ── Header ──
    header: {
        paddingHorizontal: Theme.spacing.screenPadding,
        paddingTop: Theme.spacing.sm,
        paddingBottom: Theme.spacing.md,
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
        gap: Theme.spacing.sm,
    },
    backBtn: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: 'rgba(255,255,255,0.1)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    backBtnText: {
        fontSize: 24,
        color: Theme.colors.white,
        lineHeight: 28,
    },
    headerTextBlock: {
        flex: 1,
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
        marginTop: 2,
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

    // ── Search ──
    searchWrapper: {
        paddingHorizontal: Theme.spacing.md,
        paddingTop: Theme.spacing.sm + 2,
        paddingBottom: Theme.spacing.xs,
    },
    searchBar: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Theme.colors.card,
        borderRadius: Theme.borderRadius.full,
        paddingHorizontal: Theme.spacing.md,
        paddingVertical: 11,
        borderWidth: 1,
        borderColor: Theme.colors.inputBorder,
        ...Theme.shadows.xs,
    },
    searchIcon: {
        fontSize: 18,
        marginRight: Theme.spacing.sm,
    },
    searchInput: {
        flex: 1,
        ...Theme.textStyles.input,
        color: Theme.colors.text,
        padding: 0,
    },
    clearIcon: {
        fontSize: 16,
        color: Theme.colors.textLight,
        padding: Theme.spacing.xs,
    },

    // ── Categories ──
    categoriesWrapper: {
        paddingVertical: Theme.spacing.sm,
    },
    categoriesList: {
        paddingHorizontal: Theme.spacing.md,
        gap: Theme.spacing.sm,
    },
    categoryChip: {
        paddingHorizontal: Theme.spacing.md,
        paddingVertical: Theme.spacing.sm,
        borderRadius: Theme.borderRadius.full,
        backgroundColor: Theme.colors.borderLight,
        borderWidth: 1,
        borderColor: Theme.colors.border,
    },
    categoryChipActive: {
        backgroundColor: Theme.colors.primary,
        borderColor: Theme.colors.primary,
    },
    categoryText: {
        fontSize: 13,
        fontFamily: Theme.fonts.medium,
        color: Theme.colors.textSecondary,
    },
    categoryTextActive: {
        color: '#0a1a0d',
        fontFamily: Theme.fonts.bold,
    },

    // ── List ──
    list: {
        paddingHorizontal: Theme.spacing.md,
        paddingTop: Theme.spacing.xs,
        paddingBottom: 32,
    },

    // ── Meal card ──
    card: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Theme.colors.card,
        borderRadius: Theme.borderRadius.md,
        padding: Theme.spacing.md,
        marginBottom: Theme.spacing.sm,
        borderWidth: 1,
        borderColor: Theme.colors.border,
        ...Theme.shadows.xs,
    },
    cardBody: {
        flex: 1,
        marginRight: Theme.spacing.sm,
    },
    mealName: {
        fontSize: 16,
        fontFamily: Theme.fonts.semiBold,
        color: Theme.colors.text,
        marginBottom: 3,
    },
    mealDescription: {
        fontSize: 12,
        fontFamily: Theme.fonts.regular,
        color: Theme.colors.textSecondary,
        lineHeight: 17,
        marginBottom: Theme.spacing.sm,
    },
    metaRow: {
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: 6,
    },

    // Calories badge
    calorieBadge: {
        backgroundColor: 'rgba(255,140,0,0.12)',
        borderRadius: Theme.borderRadius.full,
        paddingHorizontal: 8,
        paddingVertical: 3,
        borderWidth: 1,
        borderColor: 'rgba(255,140,0,0.3)',
    },
    calorieBadgeText: {
        fontSize: 11,
        fontFamily: Theme.fonts.semiBold,
        color: '#e07800',
    },

    // Rating badge
    ratingBadge: {
        backgroundColor: 'rgba(255,214,0,0.1)',
        borderRadius: Theme.borderRadius.full,
        paddingHorizontal: 8,
        paddingVertical: 3,
        borderWidth: 1,
        borderColor: 'rgba(255,214,0,0.25)',
    },
    ratingText: {
        fontSize: 11,
        fontFamily: Theme.fonts.semiBold,
        color: '#b89200',
    },

    // Price badge
    priceBadge: {
        backgroundColor: 'rgba(99,102,241,0.1)',
        borderRadius: Theme.borderRadius.full,
        paddingHorizontal: 8,
        paddingVertical: 3,
        borderWidth: 1,
        borderColor: 'rgba(99,102,241,0.25)',
    },
    priceBadgeText: {
        fontSize: 11,
        fontFamily: Theme.fonts.semiBold,
        color: '#6366f1',
    },

    // Small category chip
    categoryChipSmall: {
        backgroundColor: 'rgba(43,238,117,0.08)',
        borderRadius: Theme.borderRadius.full,
        paddingHorizontal: 8,
        paddingVertical: 3,
        borderWidth: 1,
        borderColor: 'rgba(43,238,117,0.2)',
    },
    categoryChipSmallText: {
        fontSize: 11,
        fontFamily: Theme.fonts.medium,
        color: Theme.colors.primary,
    },

    // Chevron
    chevron: {
        fontSize: 24,
        color: Theme.colors.textLight,
        lineHeight: 28,
    },

    // ── Empty state ──
    emptyState: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 60,
    },
    emptyEmoji: {
        fontSize: 56,
        marginBottom: Theme.spacing.md,
    },
    emptyTitle: {
        fontSize: 18,
        fontFamily: Theme.fonts.bold,
        color: Theme.colors.text,
        marginBottom: Theme.spacing.xs,
    },
    emptySubtitle: {
        fontSize: 14,
        fontFamily: Theme.fonts.regular,
        color: Theme.colors.textSecondary,
        textAlign: 'center',
    },
});
