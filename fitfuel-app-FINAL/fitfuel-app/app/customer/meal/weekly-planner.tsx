import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Modal,
    Alert,
    ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';

import { usePlannerStore } from '@/store/plannerStore';
import { useSubscriptionStore } from '@/store/subscriptionStore';
import { Theme } from '../../../constants';
import { useCartStore } from '@/store/cartStore';
import { useOrderStore } from '@/store/orderStore';

// ─────────────────────────────────────────────────────────────────────────────
// Slot config
// ─────────────────────────────────────────────────────────────────────────────
const SLOTS = [
    { key: 'breakfast' as const, emoji: '🍳', label: 'Breakfast' },
    { key: 'lunch' as const, emoji: '🥗', label: 'Lunch' },
    { key: 'dinner' as const, emoji: '🍽', label: 'Dinner' },
];

// ─────────────────────────────────────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────────────────────────────────────
export default function WeeklyPlannerScreen() {
    const { weekPlan, getTodayPlan } = usePlannerStore();
    const router = useRouter();

    const { credits, subscription, canUsePlanner } = useSubscriptionStore();
    const { addItem, setPaymentMode, checkout, clearCart } = useCartStore();
    const { createOrder } = useOrderStore();

    const [isPreparing, setIsPreparing] = useState(false);
    const [isConfirmModalVisible, setIsConfirmModalVisible] = useState(false);
    const [pendingMeals, setPendingMeals] = useState<any[]>([]);

    // ── Date helpers ──────────────────────────────────────────────────────────
    const todayStr = new Date().toISOString().split('T')[0];

    const tomorrowDate = new Date();
    tomorrowDate.setDate(tomorrowDate.getDate() + 1);
    const tomorrowStr = tomorrowDate.toISOString().split('T')[0];

    // Build 2-day display — fallback to empty day object if not yet in weekPlan
    const todayDayPlan = weekPlan.find(d => d.date === todayStr) ?? { date: todayStr };
    const tomorrowDayPlan = weekPlan.find(d => d.date === tomorrowStr) ?? { date: tomorrowStr };
    const twoDays = [todayDayPlan, tomorrowDayPlan];

    // ── Locking: always unlocked for MVP ─────────────────────────────────────
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    function isTodayLocked(): boolean {
        return false; // MVP: locking disabled
    }

    // ── Already prepared check ────────────────────────────────────────────────
    const isTodayAlreadyPrepared = (): boolean => {
        const { orders } = useOrderStore.getState();
        return orders.some(order => {
            const orderDate = new Date(order.createdAt).toISOString().split('T')[0];
            return orderDate === todayStr;
        });
    };

    const getTodayOrder = () => {
        const { orders } = useOrderStore.getState();
        return orders.find(order => {
            const orderDate = new Date(order.createdAt).toISOString().split('T')[0];
            return orderDate === todayStr;
        }) ?? null;
    };

    // ── Navigation helpers ────────────────────────────────────────────────────
    const openMealPicker = (date: string, slot: 'breakfast' | 'lunch' | 'dinner') => {
        router.push({
            pathname: '/customer/meal/select-meal',
            params: { date, slot },
        });
    };

    const openMealDetail = (id: string) => {
        router.push({
            pathname: '/customer/meal/meal-detail',
            params: { id },
        });
    };

    // ── Day label formatter ───────────────────────────────────────────────────
    const formatDayLabel = (date: string, isToday: boolean): string => {
        // Parse as local time to avoid UTC midnight → previous day shift
        const [y, m, d] = date.split('-').map(Number);
        const dt = new Date(y, m - 1, d);
        const dayName = dt.toLocaleDateString('en-US', { weekday: 'short' });
        const dateStr = dt.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
        return `${isToday ? 'Today' : 'Tomorrow'} · ${dayName}, ${dateStr}`;
    };

    // ── Prepare today's meals ─────────────────────────────────────────────────
    const handlePrepareToday = () => {
        if (isPreparing) return;

        if (isTodayAlreadyPrepared()) {
            Alert.alert(
                'Already Prepared',
                "Today's meals have already been sent to the kitchen.",
                [{ text: 'OK' }]
            );
            return;
        }

        const todayPlanData = getTodayPlan();
        if (!todayPlanData) return;

        const meals: { id: string; name: string; price: number; mealType: 'breakfast' | 'lunch' | 'dinner' }[] = [];

        if (todayPlanData.breakfast) meals.push({ id: todayPlanData.breakfast.id, name: todayPlanData.breakfast.name, price: 150, mealType: 'breakfast' });
        if (todayPlanData.lunch) meals.push({ id: todayPlanData.lunch.id, name: todayPlanData.lunch.name, price: 180, mealType: 'lunch' });
        if (todayPlanData.dinner) meals.push({ id: todayPlanData.dinner.id, name: todayPlanData.dinner.name, price: 200, mealType: 'dinner' });

        if (meals.length === 0) {
            Alert.alert(
                'No Meals Planned',
                "You haven't planned any meals for today. Add meals to your planner first.",
                [{ text: 'OK' }]
            );
            return;
        }

        if (subscription.status !== 'active' && subscription.status !== 'grace') {
            Alert.alert(
                'Subscription Required',
                `Your subscription is ${subscription.status}. Please activate or renew to prepare meals.`,
                [{ text: 'OK' }]
            );
            return;
        }

        // Compare ₹ cost vs ₹ available balance
        const totalMealCost = meals.reduce((sum, meal) => sum + meal.price, 0);
        if (credits.availableAmount < totalMealCost) {
            Alert.alert(
                'Not Enough Credits',
                `You need ₹${totalMealCost} but only have ₹${credits.availableAmount} available.`,
                [{ text: 'OK' }]
            );
            return;
        }

        setPendingMeals(meals);
        setIsConfirmModalVisible(true);
    };

    const handleConfirmPrepare = async () => {
        setIsConfirmModalVisible(false);
        setIsPreparing(true);

        try {
            clearCart();
            pendingMeals.forEach(meal =>
                addItem({ id: meal.id, name: meal.name, price: meal.price, mealType: meal.mealType })
            );
            setPaymentMode('credit');

            const success = checkout();
            if (!success) {
                Alert.alert('Checkout Failed', 'Unable to process your order. Please try again.');
                setIsPreparing(false);
                return;
            }

            const orderId = `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
            const totalMeals = pendingMeals.length;
            const subtotal = pendingMeals.reduce((sum, meal) => sum + meal.price, 0);
            const orderItems = pendingMeals.map(meal => ({
                id: meal.id, name: meal.name, price: meal.price,
                mealType: meal.mealType, quantity: 1,
            }));

            createOrder({ items: orderItems, totalMeals, subtotal, paymentMode: 'credit' });
            clearCart();
            setPendingMeals([]);

            Alert.alert(
                'Order Confirmed! 🎉',
                `Your ${totalMeals} meal${totalMeals > 1 ? 's' : ''} ${totalMeals > 1 ? 'are' : 'is'} being prepared.\nOrder ID: ${orderId}`,
                [{ text: 'OK' }]
            );
        } catch (error) {
            console.error('Error preparing meals:', error);
            Alert.alert('Error', 'Something went wrong. Please try again.');
        } finally {
            setIsPreparing(false);
        }
    };

    const handleCancelPrepare = () => {
        setIsConfirmModalVisible(false);
        setPendingMeals([]);
    };

    // ── Paywall: block Free-plan users before rendering planner ─────────────
    if (!canUsePlanner) {
        return (
            <SafeAreaView style={styles.root} edges={['top']}>
                {/* Gradient header (back button only) */}
                <LinearGradient
                    colors={['#111827', '#1a2e1d', '#0f2319']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.header}
                >
                    <View style={styles.decorRing} />
                    <View style={styles.headerContent}>
                        <TouchableOpacity
                            style={styles.backBtn}
                            onPress={() => router.back()}
                            activeOpacity={0.7}
                        >
                            <Text style={styles.backIcon}>‹</Text>
                        </TouchableOpacity>
                        <View style={styles.headerCenter}>
                            <Text style={styles.headerTitle}>Weekly Planner</Text>
                            <Text style={styles.headerSubtitle}>Premium feature</Text>
                        </View>
                        <View style={styles.headerSpacer} />
                    </View>
                </LinearGradient>

                {/* Paywall body */}
                <View style={styles.paywallWrapper}>
                    <View style={styles.paywallCard}>
                        <Text style={styles.paywallLockEmoji}>🔒</Text>
                        <Text style={styles.paywallTitle}>Planner is a{'\n'}Premium Feature</Text>
                        <Text style={styles.paywallSubtitle}>
                            Upgrade your plan to plan and track meals for the next 7 days.
                        </Text>

                        <View style={styles.paywallBulletsContainer}>
                            <Text style={styles.paywallBullet}>✓  Plan breakfast, lunch &amp; dinner for 7 days</Text>
                            <Text style={styles.paywallBullet}>✓  60–90 meal credits per month</Text>
                            <Text style={styles.paywallBullet}>✓  Free delivery on every order</Text>
                        </View>

                        <TouchableOpacity
                            style={styles.paywallBtn}
                            onPress={() => router.push('/customer/cart/payment')}
                            activeOpacity={0.85}
                        >
                            <LinearGradient
                                colors={['#2bee75', '#1db85d']}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 0 }}
                                style={styles.paywallBtnGradient}
                            >
                                <Text style={styles.paywallBtnText}>Upgrade Now →</Text>
                            </LinearGradient>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.paywallBackLink}
                            onPress={() => router.back()}
                            activeOpacity={0.7}
                        >
                            <Text style={styles.paywallBackLinkText}>← Go Back</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </SafeAreaView>
        );
    }

    // ── Render ────────────────────────────────────────────────────────────────
    return (
        <SafeAreaView style={styles.root} edges={['top']}>

            {/* ── Dark gradient header ─────────────────────────────────────── */}
            <LinearGradient
                colors={['#111827', '#1a2e1d', '#0f2319']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.header}
            >
                <View style={styles.decorRing} />

                <View style={styles.headerContent}>
                    <TouchableOpacity
                        style={styles.backBtn}
                        onPress={() => router.back()}
                        activeOpacity={0.7}
                    >
                        <Text style={styles.backIcon}>‹</Text>
                    </TouchableOpacity>

                    <View style={styles.headerCenter}>
                        <Text style={styles.headerTitle}>Next 2 Days Planner</Text>
                        <Text style={styles.headerSubtitle}>Plan your upcoming meals</Text>
                    </View>

                    {/* spacer keeps title centred */}
                    <View style={styles.headerSpacer} />
                </View>

                {/* Credits pill — shows ₹ balance */}
                <View style={styles.creditsPill}>
                    <Text style={styles.creditsPillText}>
                        ⚡ ₹{credits.availableAmount} Credits Available
                    </Text>
                </View>
            </LinearGradient>

            {/* ── Scrollable content ───────────────────────────────────────── */}
            <View style={styles.contentWrapper}>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.scrollContent}
                >
                    {/* Subscription disabled banner */}
                    {!canUsePlanner && (
                        <View style={styles.disabledBanner}>
                            <Text style={styles.disabledBannerText}>
                                ⚠️ Planner disabled — subscription paused or expired
                            </Text>
                        </View>
                    )}

                    {/* Day cards */}
                    {twoDays.map((day) => {
                        const isToday = day.date === todayStr;
                        const alreadyPrepared = isToday && isTodayAlreadyPrepared();
                        const todayOrder = alreadyPrepared ? getTodayOrder() : null;

                        return (
                            <View key={day.date} style={styles.dayCard}>

                                {/* Card header row */}
                                <View style={styles.dayCardHeader}>
                                    <View style={styles.dayLabelRow}>
                                        <View style={[
                                            styles.dayDot,
                                            isToday ? styles.dayDotToday : styles.dayDotTomorrow,
                                        ]} />
                                        <Text style={styles.dayLabel}>
                                            {formatDayLabel(day.date, isToday)}
                                        </Text>
                                    </View>

                                    {alreadyPrepared && (
                                        <TouchableOpacity
                                            style={styles.sentBadge}
                                            onPress={() => {
                                                if (todayOrder) {
                                                    router.push({
                                                        pathname: '/customer/orders/[id]',
                                                        params: { id: todayOrder.id },
                                                    });
                                                }
                                            }}
                                        >
                                            <Text style={styles.sentBadgeText}>✓ Sent to kitchen</Text>
                                        </TouchableOpacity>
                                    )}
                                </View>

                                {/* Meal slots */}
                                <View style={styles.slotsContainer}>
                                    {SLOTS.map((slot, slotIndex) => {
                                        const meal = (day as any)[slot.key] as { id: string; name: string } | undefined;
                                        const isFilled = !!meal;

                                        return (
                                            <TouchableOpacity
                                                key={slot.key}
                                                style={[
                                                    styles.mealSlot,
                                                    slotIndex < SLOTS.length - 1 && styles.mealSlotBorder,
                                                ]}
                                                activeOpacity={0.7}
                                                onPress={() => {
                                                    if (isFilled && meal) {
                                                        openMealDetail(meal.id);
                                                    } else {
                                                        openMealPicker(day.date, slot.key);
                                                    }
                                                }}
                                            >
                                                {/* Icon circle */}
                                                <View style={[
                                                    styles.mealIconCircle,
                                                    isFilled && styles.mealIconCircleFilled,
                                                ]}>
                                                    <Text style={styles.mealIcon}>{slot.emoji}</Text>
                                                </View>

                                                {/* Text */}
                                                <View style={styles.mealSlotInfo}>
                                                    <Text style={styles.slotTypeLabel}>{slot.label}</Text>
                                                    <Text
                                                        style={[styles.mealName, !isFilled && styles.mealNameEmpty]}
                                                        numberOfLines={1}
                                                    >
                                                        {meal?.name ?? `Tap to choose ${slot.label.toLowerCase()}`}
                                                    </Text>
                                                </View>

                                                {/* Action indicator */}
                                                <Text style={[styles.slotAction, isFilled && styles.slotActionFilled]}>
                                                    {isFilled ? '›' : '+'}
                                                </Text>
                                            </TouchableOpacity>
                                        );
                                    })}
                                </View>

                                {/* "Prepare Today's Meals" button — Today card only */}
                                {isToday && !alreadyPrepared && (
                                    <TouchableOpacity
                                        style={[styles.prepareBtn, isPreparing && styles.prepareBtnDisabled]}
                                        onPress={handlePrepareToday}
                                        disabled={isPreparing}
                                        activeOpacity={0.85}
                                    >
                                        {isPreparing ? (
                                            <View style={styles.prepareBtnInner}>
                                                <ActivityIndicator
                                                    color="#0a1a0d"
                                                    size="small"
                                                    style={{ marginRight: 8 }}
                                                />
                                                <Text style={styles.prepareBtnText}>Preparing…</Text>
                                            </View>
                                        ) : (
                                            <Text style={styles.prepareBtnText}>🍽 Prepare Today's Meals</Text>
                                        )}
                                    </TouchableOpacity>
                                )}

                            </View>
                        );
                    })}
                </ScrollView>
            </View>

            {/* ── Confirm order modal ──────────────────────────────────────── */}
            <Modal
                visible={isConfirmModalVisible}
                transparent
                animationType="fade"
                onRequestClose={handleCancelPrepare}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContainer}>
                        <Text style={styles.modalTitle}>Confirm Order</Text>
                        <Text style={styles.modalSubtitle}>
                            Credits will be deducted from your account
                        </Text>

                        <View style={styles.summaryBox}>
                            <View style={styles.summaryRow}>
                                <Text style={styles.summaryLabel}>Meals to prepare:</Text>
                                <Text style={styles.summaryValue}>{pendingMeals.length}</Text>
                            </View>
                            <View style={styles.summaryRow}>
                                <Text style={styles.summaryLabel}>Amount to deduct:</Text>
                                <Text style={styles.summaryValueGreen}>
                                    ₹{pendingMeals.reduce((s, m) => s + m.price, 0)}
                                </Text>
                            </View>
                        </View>

                        <View style={styles.mealList}>
                            {pendingMeals.map((meal, index) => (
                                <Text key={index} style={styles.mealItem}>
                                    • {meal.name} ({meal.mealType})
                                </Text>
                            ))}
                        </View>

                        <View style={styles.buttonRow}>
                            <TouchableOpacity
                                style={styles.cancelButton}
                                onPress={handleCancelPrepare}
                            >
                                <Text style={styles.cancelButtonText}>Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.confirmButton}
                                onPress={handleConfirmPrepare}
                            >
                                <Text style={styles.confirmButtonText}>Confirm</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>

        </SafeAreaView>
    );
}

// ─────────────────────────────────────────────────────────────────────────────
// Styles
// ─────────────────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({

    root: {
        flex: 1,
        backgroundColor: Theme.colors.background,
    },

    // ── Header ────────────────────────────────────────────────────────────────
    header: {
        paddingHorizontal: Theme.spacing.screenPadding,
        paddingTop: Theme.spacing.sm,
        paddingBottom: 44,       // tail for content overlap
        overflow: 'hidden',
    },
    decorRing: {
        position: 'absolute',
        width: 180,
        height: 180,
        borderRadius: 90,
        borderWidth: 24,
        borderColor: 'rgba(255,255,255,0.05)',
        top: -60,
        right: -50,
    },
    headerContent: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: Theme.spacing.md,
    },
    backBtn: {
        width: 36,
        height: 36,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: Theme.borderRadius.full,
        backgroundColor: 'rgba(255,255,255,0.1)',
    },
    backIcon: {
        fontSize: 24,
        color: Theme.colors.white,
        lineHeight: 28,
    },
    headerCenter: {
        flex: 1,
        alignItems: 'center',
    },
    headerTitle: {
        ...Theme.textStyles.h3,
        color: Theme.colors.white,
        fontFamily: Theme.fonts.bold,
        textAlign: 'center',
    },
    headerSubtitle: {
        ...Theme.textStyles.bodySmall,
        color: 'rgba(255,255,255,0.6)',
        fontFamily: Theme.fonts.regular,
        marginTop: 2,
    },
    headerSpacer: {
        width: 36,
    },
    creditsPill: {
        backgroundColor: 'rgba(43,238,117,0.15)',
        borderWidth: 1,
        borderColor: 'rgba(43,238,117,0.35)',
        paddingVertical: Theme.spacing.xs,
        paddingHorizontal: Theme.spacing.md,
        borderRadius: Theme.borderRadius.full,
        alignSelf: 'center',
    },
    creditsPillText: {
        fontSize: 13,
        fontFamily: Theme.fonts.semiBold,
        color: Theme.colors.primary,
    },

    // ── Content wrapper ───────────────────────────────────────────────────────
    contentWrapper: {
        marginTop: -28,   // overlap gradient header bottom
        flex: 1,
        backgroundColor: Theme.colors.background,
    },
    scrollContent: {
        paddingTop: Theme.spacing.md,
        paddingBottom: Theme.spacing.xl,
    },

    // ── Disabled banner ───────────────────────────────────────────────────────
    disabledBanner: {
        backgroundColor: 'rgba(239,68,68,0.08)',
        borderWidth: 1,
        borderColor: 'rgba(239,68,68,0.2)',
        marginHorizontal: Theme.spacing.md,
        marginBottom: Theme.spacing.sm,
        paddingVertical: Theme.spacing.sm,
        paddingHorizontal: Theme.spacing.md,
        borderRadius: Theme.borderRadius.md,
    },
    disabledBannerText: {
        ...Theme.textStyles.bodySmall,
        color: Theme.colors.error,
        fontFamily: Theme.fonts.medium,
        textAlign: 'center',
    },

    // ── Day card ──────────────────────────────────────────────────────────────
    dayCard: {
        backgroundColor: Theme.colors.card,
        marginHorizontal: Theme.spacing.md,
        marginBottom: Theme.spacing.md,
        borderRadius: Theme.borderRadius.xl,
        borderWidth: 1,
        borderColor: Theme.colors.borderLight,
        overflow: 'hidden',
        ...Theme.shadows.sm,
    },
    dayCardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: Theme.spacing.md,
        paddingVertical: Theme.spacing.sm + 2,
        borderBottomWidth: 1,
        borderBottomColor: Theme.colors.borderLight,
    },
    dayLabelRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: Theme.spacing.sm,
    },
    dayDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
    },
    dayDotToday: {
        backgroundColor: Theme.colors.primary,
    },
    dayDotTomorrow: {
        backgroundColor: Theme.colors.textSecondary,
    },
    dayLabel: {
        ...Theme.textStyles.bodyBold,
        color: Theme.colors.text,
        fontFamily: Theme.fonts.bold,
    },
    sentBadge: {
        backgroundColor: 'rgba(43,238,117,0.1)',
        borderWidth: 1,
        borderColor: 'rgba(43,238,117,0.25)',
        paddingHorizontal: Theme.spacing.sm,
        paddingVertical: Theme.spacing.xs,
        borderRadius: Theme.borderRadius.full,
    },
    sentBadgeText: {
        fontSize: 11,
        fontFamily: Theme.fonts.semiBold,
        color: Theme.colors.primaryDark,
    },

    // ── Meal slots ────────────────────────────────────────────────────────────
    slotsContainer: {
        paddingHorizontal: Theme.spacing.md,
        paddingTop: Theme.spacing.xs,
        paddingBottom: Theme.spacing.sm,
    },
    mealSlot: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: Theme.spacing.sm + 2,
        gap: Theme.spacing.sm,
    },
    mealSlotBorder: {
        borderBottomWidth: 1,
        borderBottomColor: Theme.colors.borderLight,
    },
    mealIconCircle: {
        width: 40,
        height: 40,
        borderRadius: Theme.borderRadius.full,
        backgroundColor: Theme.colors.backgroundSecondary,
        borderWidth: 1,
        borderColor: Theme.colors.borderLight,
        justifyContent: 'center',
        alignItems: 'center',
    },
    mealIconCircleFilled: {
        backgroundColor: 'rgba(43,238,117,0.1)',
        borderColor: 'rgba(43,238,117,0.25)',
    },
    mealIcon: {
        fontSize: 18,
    },
    mealSlotInfo: {
        flex: 1,
    },
    slotTypeLabel: {
        fontSize: 11,
        fontFamily: Theme.fonts.medium,
        color: Theme.colors.textSecondary,
        textTransform: 'uppercase',
        letterSpacing: 0.5,
        marginBottom: 2,
    },
    mealName: {
        ...Theme.textStyles.body,
        color: Theme.colors.text,
        fontFamily: Theme.fonts.medium,
    },
    mealNameEmpty: {
        color: Theme.colors.textSecondary,
        fontFamily: Theme.fonts.regular,
        fontSize: 14,
    },
    slotAction: {
        fontSize: 20,
        color: Theme.colors.primary,
        fontFamily: Theme.fonts.bold,
        lineHeight: 24,
    },
    slotActionFilled: {
        fontSize: 22,
        color: Theme.colors.textSecondary,
        fontFamily: Theme.fonts.regular,
    },

    // ── Prepare button ────────────────────────────────────────────────────────
    prepareBtn: {
        backgroundColor: Theme.colors.primary,
        marginHorizontal: Theme.spacing.md,
        marginBottom: Theme.spacing.md,
        paddingVertical: Theme.spacing.sm + 2,
        borderRadius: Theme.borderRadius.full,
        alignItems: 'center',
    },
    prepareBtnDisabled: {
        backgroundColor: Theme.colors.border,
        opacity: 0.6,
    },
    prepareBtnInner: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    prepareBtnText: {
        fontSize: 15,
        fontFamily: Theme.fonts.bold,
        color: '#0a1a0d',
    },

    // ── Confirmation modal ────────────────────────────────────────────────────
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
        padding: Theme.spacing.md,
    },
    modalContainer: {
        backgroundColor: Theme.colors.card,
        borderRadius: Theme.borderRadius.xl,
        padding: Theme.spacing.lg,
        width: '100%',
        maxWidth: 400,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.18,
        shadowRadius: 12,
        elevation: 8,
    },
    modalTitle: {
        ...Theme.textStyles.h3,
        color: Theme.colors.text,
        fontFamily: Theme.fonts.bold,
        textAlign: 'center',
        marginBottom: Theme.spacing.xs,
    },
    modalSubtitle: {
        ...Theme.textStyles.bodySmall,
        color: Theme.colors.textSecondary,
        fontFamily: Theme.fonts.regular,
        textAlign: 'center',
        marginBottom: Theme.spacing.lg,
    },
    summaryBox: {
        backgroundColor: Theme.colors.backgroundSecondary,
        borderRadius: Theme.borderRadius.md,
        padding: Theme.spacing.md,
        marginBottom: Theme.spacing.md,
        borderWidth: 1,
        borderColor: Theme.colors.borderLight,
    },
    summaryRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: Theme.spacing.xs,
    },
    summaryLabel: {
        ...Theme.textStyles.body,
        color: Theme.colors.textSecondary,
        fontFamily: Theme.fonts.regular,
    },
    summaryValue: {
        ...Theme.textStyles.bodyBold,
        color: Theme.colors.text,
        fontFamily: Theme.fonts.semiBold,
    },
    summaryValueGreen: {
        ...Theme.textStyles.bodyBold,
        color: Theme.colors.primary,
        fontFamily: Theme.fonts.bold,
    },
    mealList: {
        marginBottom: Theme.spacing.lg,
    },
    mealItem: {
        ...Theme.textStyles.bodySmall,
        color: Theme.colors.textSecondary,
        fontFamily: Theme.fonts.regular,
        marginBottom: Theme.spacing.xs,
    },
    buttonRow: {
        flexDirection: 'row',
        gap: Theme.spacing.sm,
    },
    cancelButton: {
        flex: 1,
        backgroundColor: Theme.colors.backgroundSecondary,
        paddingVertical: Theme.spacing.sm + 2,
        borderRadius: Theme.borderRadius.full,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: Theme.colors.border,
    },
    cancelButtonText: {
        fontSize: 15,
        fontFamily: Theme.fonts.semiBold,
        color: Theme.colors.textSecondary,
    },
    confirmButton: {
        flex: 1,
        backgroundColor: Theme.colors.primary,
        paddingVertical: Theme.spacing.sm + 2,
        borderRadius: Theme.borderRadius.full,
        alignItems: 'center',
    },
    confirmButtonText: {
        fontSize: 15,
        fontFamily: Theme.fonts.bold,
        color: '#0a1a0d',
    },

    // ── Paywall (shown to Free-plan users) ────────────────────────────────────
    paywallWrapper: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: Theme.spacing.screenPadding,
        marginTop: -28, // overlap gradient header bottom
        backgroundColor: Theme.colors.background,
    },
    paywallCard: {
        width: '100%',
        backgroundColor: Theme.colors.card,
        borderRadius: Theme.borderRadius.xl,
        padding: Theme.spacing.lg,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: Theme.colors.borderLight,
        ...Theme.shadows.md,
    },
    paywallLockEmoji: {
        fontSize: 52,
        marginBottom: Theme.spacing.md,
    },
    paywallTitle: {
        ...Theme.textStyles.h2,
        color: Theme.colors.text,
        fontFamily: Theme.fonts.extraBold,
        textAlign: 'center',
        marginBottom: Theme.spacing.sm,
        lineHeight: 32,
    },
    paywallSubtitle: {
        ...Theme.textStyles.body,
        color: Theme.colors.textSecondary,
        fontFamily: Theme.fonts.regular,
        textAlign: 'center',
        lineHeight: 22,
        marginBottom: Theme.spacing.lg,
    },
    paywallBulletsContainer: {
        width: '100%',
        backgroundColor: 'rgba(43,238,117,0.06)',
        borderRadius: Theme.borderRadius.md,
        padding: Theme.spacing.md,
        marginBottom: Theme.spacing.lg,
        borderWidth: 1,
        borderColor: 'rgba(43,238,117,0.18)',
        gap: Theme.spacing.sm,
    },
    paywallBullet: {
        ...Theme.textStyles.body,
        color: Theme.colors.text,
        fontFamily: Theme.fonts.medium,
    },
    paywallBtn: {
        width: '100%',
        borderRadius: Theme.borderRadius.full,
        overflow: 'hidden',
        marginBottom: Theme.spacing.md,
    },
    paywallBtnGradient: {
        paddingVertical: Theme.spacing.md,
        alignItems: 'center',
        borderRadius: Theme.borderRadius.full,
    },
    paywallBtnText: {
        fontSize: 15,
        fontFamily: Theme.fonts.bold,
        color: '#0a1a0d',
    },
    paywallBackLink: {
        paddingVertical: Theme.spacing.sm,
    },
    paywallBackLinkText: {
        ...Theme.textStyles.body,
        color: Theme.colors.textSecondary,
        fontFamily: Theme.fonts.medium,
    },
});
