import React, { useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Alert,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { Theme } from '@/constants';
import { useCartStore, CartItem } from '@/store/cartStore';
import { useSubscriptionStore } from '@/store/subscriptionStore';
import { useOrderStore } from '@/store/orderStore';
import { getMeals, getDeliveryFee } from '@/data';

// ─── SummaryRow helper (unchanged logic) ──────────────────────────────────────
const SummaryRow = ({
    label,
    value,
    highlight,
}: {
    label: string;
    value: string | number;
    highlight?: 'error' | 'success' | 'primary';
}) => {
    let color: string = Theme.colors.text;
    if (highlight === 'error') color = Theme.colors.error;
    if (highlight === 'success') color = Theme.colors.success;
    if (highlight === 'primary') color = Theme.colors.primary;

    return (
        <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>{label}</Text>
            <Text style={[styles.summaryValue, { color }]}>{value}</Text>
        </View>
    );
};

// ─── CartScreen ────────────────────────────────────────────────────────────────
export default function CartScreen() {
    const router = useRouter();
    const insets = useSafeAreaInsets();

    const {
        items,
        totalMeals,
        subtotal,
        paymentMode,
        setPaymentMode,
        clearCart,
        addItem,
        removeItem,
    } = useCartStore();

    const {
        subscription,
        credits,
        canUseCredits,
        deductCredits,
        isSubscribed,
    } = useSubscriptionStore();

    const { createOrder } = useOrderStore();

    // ─── Pricing derived from subscription plan ───────────────────
    const deliveryFee = getDeliveryFee(isSubscribed);
    const totalToPay  = subtotal + deliveryFee;

    // Potential savings shown to non-subscribers:
    //   What they'd pay NOW (regular subtotal + delivery)
    //   minus what they'd pay as a subscriber (subscriber subtotal + free delivery)
    const allMealsData = getMeals();
    const subscriberSubtotal = items.reduce((sum, item) => {
        const mealData = allMealsData.find((m) => m.id === item.id);
        const subPrice = mealData ? mealData.price.subscriber : item.price;
        return sum + subPrice * item.quantity;
    }, 0);
    const potentialSavings = Math.max(0, totalToPay - subscriberSubtotal);

    // ─── Default payment mode ─────────────────────────────────────
    // Subscribers (paid plans) default to credits; Free-plan users go direct.
    useEffect(() => {
        if (isSubscribed) {
            setPaymentMode('credit');
        } else {
            setPaymentMode('direct');
        }
    }, []);

    // ─── Checkout handler ─────────────────────────────────────────
    const handleCheckout = () => {
        if (items.length === 0) return;

        if (paymentMode === 'credit') {
            if (!canUseCredits) {
                Alert.alert('Credits not available', 'Credits are not usable in your current plan/status.');
                return;
            }
            // Guard: ₹ balance must cover the full order total
            if (credits.availableAmount < totalToPay) {
                Alert.alert(
                    'Insufficient Credit Balance',
                    `You need ₹${totalToPay} but only have ₹${credits.availableAmount} available.`
                );
                return;
            }
            // Deduct ₹ totalToPay from the credit wallet
            const success = deductCredits(totalToPay);
            if (!success) {
                Alert.alert('Credit deduction failed', 'Please try again.');
                return;
            }
        }

        createOrder({ items, totalMeals, subtotal: totalToPay, paymentMode });
        clearCart();
        router.replace('/customer/orders');
    };

    // Remaining ₹ credit balance after this order
    const remainingCredits = credits.availableAmount - totalToPay;

    // ─── Render ───────────────────────────────────────────────────
    return (
        <SafeAreaView style={styles.root} edges={['top']}>

            {/* ── White header — plain View, no gradient ── */}
            <View style={styles.header}>
                <View style={styles.headerContent}>
                    <TouchableOpacity
                        style={styles.backBtn}
                        onPress={() => router.back()}
                        activeOpacity={0.7}
                    >
                        <Text style={styles.backIcon}>‹</Text>
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Order Confirmation</Text>
                    <View style={styles.headerSpacer} />
                </View>
            </View>

            {/* ── Scrollable content ── */}
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: insets.bottom + 120 }}
            >

                    {/* ── Address card ── */}
                    <TouchableOpacity
                        style={styles.addressCard}
                        onPress={() => Alert.alert('Address', 'Address selection coming soon')}
                        activeOpacity={0.8}
                    >
                        <View style={styles.addressLeft}>
                            <Text style={styles.addressIcon}>📍</Text>
                            <View>
                                <Text style={styles.addressLabel}>Delivery Address</Text>
                                <Text style={styles.addressValue}>Select Delivery Address</Text>
                            </View>
                        </View>
                        <Text style={styles.chevron}>›</Text>
                    </TouchableOpacity>

                    {/* ── Savings / info banner ── */}
                    {paymentMode === 'credit' ? (
                        <View style={styles.savingsBanner}>
                            <Text style={styles.savingsEmoji}>🎉</Text>
                            <Text style={styles.savingsText}>
                                Woohoo! You can cover{' '}
                                <Text style={styles.savingsBold}>
                                    {totalMeals} meal{totalMeals !== 1 ? 's' : ''}
                                </Text>{' '}
                                with your credits
                            </Text>
                        </View>
                    ) : (
                        <>
                            {/* Direct payment info */}
                            <View style={[styles.savingsBanner, styles.savingsBannerDirect]}>
                                <Text style={styles.savingsEmoji}>💰</Text>
                                <Text style={styles.savingsText}>
                                    Direct payment — ₹{subtotal}
                                    {deliveryFee > 0 ? ` + ₹${deliveryFee} delivery` : ' · Free delivery'}
                                </Text>
                            </View>

                            {/* Subscription savings hint — only for non-subscribers with savings */}
                            {!isSubscribed && potentialSavings > 0 && (
                                <View style={styles.subHintBanner}>
                                    <Text style={styles.subHintText}>
                                        💡 Subscribe to save{' '}
                                        <Text style={styles.subHintAmount}>₹{potentialSavings}</Text>
                                        {' '}on this order (meal discounts + free delivery)
                                    </Text>
                                </View>
                            )}
                        </>
                    )}

                    {/* ── Order Items card ── */}
                    <View style={styles.sectionCard}>
                        <Text style={styles.sectionCardTitle}>
                            Order Items ({totalMeals} item{totalMeals !== 1 ? 's' : ''})
                        </Text>

                        {items.length === 0 ? (
                            <Text style={styles.emptyText}>
                                Your cart is empty — browse meals to get started
                            </Text>
                        ) : (
                            items.map((item: CartItem, index: number) => (
                                <View
                                    key={item.id}
                                    style={[
                                        styles.itemRow,
                                        index < items.length - 1 && styles.itemRowBorder,
                                    ]}
                                >
                                    <View style={styles.itemInfo}>
                                        <Text style={styles.itemName}>{item.name}</Text>
                                        <View style={styles.calBadge}>
                                            <Text style={styles.calBadgeText}>— cal</Text>
                                        </View>
                                    </View>
                                    <View style={styles.stepper}>
                                        <TouchableOpacity
                                            style={styles.stepBtn}
                                            onPress={() => removeItem(item.id)}
                                            activeOpacity={0.7}
                                        >
                                            <Text style={styles.stepIcon}>−</Text>
                                        </TouchableOpacity>
                                        <Text style={styles.stepQty}>{item.quantity}</Text>
                                        <TouchableOpacity
                                            style={styles.stepBtn}
                                            onPress={() =>
                                                addItem({
                                                    id: item.id,
                                                    name: item.name,
                                                    price: item.price,
                                                    mealType: item.mealType,
                                                })
                                            }
                                            activeOpacity={0.7}
                                        >
                                            <Text style={styles.stepIcon}>+</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            ))
                        )}
                    </View>

                    {/* ── Payment mode toggle — hidden for Free-plan users ── */}
                    {canUseCredits && (
                        <View style={styles.toggleRow}>
                            <Text style={styles.toggleRowLabel}>Pay with</Text>
                            <View style={styles.togglePill}>
                                <TouchableOpacity
                                    style={[
                                        styles.toggleOpt,
                                        paymentMode === 'credit' && styles.toggleOptActive,
                                    ]}
                                    onPress={() => setPaymentMode('credit')}
                                >
                                    <Text
                                        style={[
                                            styles.toggleOptText,
                                            paymentMode === 'credit' && styles.toggleOptTextActive,
                                        ]}
                                    >
                                        Credits
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={[
                                        styles.toggleOpt,
                                        paymentMode === 'direct' && styles.toggleOptActive,
                                    ]}
                                    onPress={() => setPaymentMode('direct')}
                                >
                                    <Text
                                        style={[
                                            styles.toggleOptText,
                                            paymentMode === 'direct' && styles.toggleOptTextActive,
                                        ]}
                                    >
                                        Direct
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    )}

                    {/* ── Coupons row ── */}
                    <TouchableOpacity
                        style={styles.couponRow}
                        onPress={() => Alert.alert('Coupons', 'Coupons & offers coming soon')}
                        activeOpacity={0.8}
                    >
                        <Text style={styles.couponIcon}>🏷️</Text>
                        <Text style={styles.couponLabel}>View Coupons & Offers</Text>
                        <Text style={styles.chevron}>›</Text>
                    </TouchableOpacity>

                    {/* ── Bill Details card ── */}
                    <View style={styles.sectionCard}>
                        <Text style={styles.sectionCardTitle}>Bill Details</Text>
                        {paymentMode === 'credit' ? (
                            <>
                                <SummaryRow label="Order Total"        value={`₹${totalToPay}`} />
                                <SummaryRow
                                    label="Credit Balance"
                                    value={`₹${credits.availableAmount}`}
                                />
                                <View style={styles.billDivider} />
                                <SummaryRow
                                    label="Balance After Order"
                                    value={`₹${remainingCredits}`}
                                    highlight={remainingCredits < 0 ? 'error' : 'success'}
                                />
                            </>
                        ) : (
                            <>
                                <SummaryRow label="Subtotal"  value={`₹${subtotal}`} />
                                <SummaryRow
                                    label="Delivery"
                                    value={deliveryFee > 0 ? `₹${deliveryFee}` : 'Free'}
                                    highlight={deliveryFee === 0 ? 'success' : undefined}
                                />
                                <View style={styles.billDivider} />
                                <SummaryRow
                                    label="Total"
                                    value={`₹${totalToPay}`}
                                    highlight="primary"
                                />
                            </>
                        )}
                    </View>

                    {/* ── Help row ── */}
                    <TouchableOpacity style={styles.helpRow} activeOpacity={0.7}>
                        <Text style={styles.helpIcon}>💬</Text>
                        <Text style={styles.helpText}>
                            Need help? Reach us on WhatsApp
                        </Text>
                        <Text style={styles.chevron}>›</Text>
                    </TouchableOpacity>

            </ScrollView>

            {/* ── Sticky CTA bar ── */}
            <View
                style={[
                    styles.ctaBar,
                    { paddingBottom: Math.max(insets.bottom, Theme.spacing.md) },
                ]}
            >
                <TouchableOpacity
                    style={styles.ctaBtn}
                    onPress={handleCheckout}
                    activeOpacity={0.85}
                >
                    <LinearGradient
                        colors={[Theme.colors.primary, Theme.colors.primaryDark]}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        style={styles.ctaGradient}
                    >
                        <Text style={styles.ctaText}>
                            {paymentMode === 'credit'
                                ? `Confirm ${totalMeals} meal${totalMeals !== 1 ? 's' : ''}`
                                : 'Continue to Payment'}
                        </Text>
                    </LinearGradient>
                </TouchableOpacity>
            </View>

        </SafeAreaView>
    );
}

// ─── Styles ───────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({

    // ── Root ─────────────────────────────────────────────────────────
    root: {
        flex: 1,
        backgroundColor: Theme.colors.background,
    },

    // ── Header (white, no gradient) ──────────────────────────────────
    header: {
        paddingHorizontal: Theme.spacing.screenPadding,
        paddingTop: Theme.spacing.sm,
        paddingBottom: Theme.spacing.md,
        backgroundColor: Theme.colors.card,
        borderBottomWidth: 1,
        borderBottomColor: Theme.colors.borderLight,
    },
    headerContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    backBtn: {
        width: 36,
        height: 36,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: Theme.borderRadius.full,
        backgroundColor: Theme.colors.backgroundSecondary,
    },
    backIcon: {
        fontSize: 26,
        color: Theme.colors.text,
        lineHeight: 30,
    },
    headerTitle: {
        flex: 1,
        textAlign: 'center',
        ...Theme.textStyles.h3,
        color: Theme.colors.text,
        fontFamily: Theme.fonts.bold,
    },
    headerSpacer: {
        width: 36,
    },

    // ── Address card ─────────────────────────────────────────────────
    addressCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Theme.colors.card,
        marginHorizontal: Theme.spacing.md,
        marginTop: Theme.spacing.md,
        marginBottom: Theme.spacing.sm,
        padding: Theme.spacing.md,
        borderRadius: Theme.borderRadius.md,
        borderWidth: 1,
        borderColor: Theme.colors.borderLight,
        ...Theme.shadows.sm,
    },
    addressLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
        gap: Theme.spacing.sm,
    },
    addressIcon: {
        fontSize: 20,
    },
    addressLabel: {
        ...Theme.textStyles.caption,
        color: Theme.colors.textSecondary,
        fontFamily: Theme.fonts.regular,
    },
    addressValue: {
        ...Theme.textStyles.bodyBold,
        color: Theme.colors.text,
        fontFamily: Theme.fonts.semiBold,
    },
    chevron: {
        fontSize: 20,
        color: Theme.colors.textSecondary,
    },

    // ── Savings banner (compact strip — no border) ────────────────────
    savingsBanner: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(249,115,22,0.08)',
        marginHorizontal: Theme.spacing.md,
        marginBottom: Theme.spacing.sm,
        paddingHorizontal: Theme.spacing.md,
        paddingVertical: Theme.spacing.xs,
        borderRadius: Theme.borderRadius.md,
        gap: Theme.spacing.sm,
    },
    savingsBannerDirect: {
        backgroundColor: 'rgba(43,238,117,0.08)',
    },
    savingsEmoji: {
        fontSize: 16,
    },
    savingsText: {
        ...Theme.textStyles.bodySmall,
        color: Theme.colors.text,
        fontFamily: Theme.fonts.regular,
        flex: 1,
    },
    savingsBold: {
        fontFamily: Theme.fonts.bold,
        color: Theme.colors.primary,
    },

    // ── Subscription savings hint banner ─────────────────────────────
    subHintBanner: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        backgroundColor: 'rgba(99,102,241,0.07)',
        marginHorizontal: Theme.spacing.md,
        marginBottom: Theme.spacing.sm,
        paddingHorizontal: Theme.spacing.md,
        paddingVertical: Theme.spacing.sm,
        borderRadius: Theme.borderRadius.md,
        borderWidth: 1,
        borderColor: 'rgba(99,102,241,0.18)',
    },
    subHintText: {
        ...Theme.textStyles.bodySmall,
        color: Theme.colors.textSecondary,
        fontFamily: Theme.fonts.regular,
        flex: 1,
        lineHeight: 18,
    },
    subHintAmount: {
        fontFamily: Theme.fonts.bold,
        color: '#6366f1',
    },

    // ── Section card (Order Items & Bill Details) ────────────────────
    sectionCard: {
        backgroundColor: Theme.colors.card,
        marginHorizontal: Theme.spacing.md,
        marginBottom: Theme.spacing.sm,
        padding: Theme.spacing.md,
        borderRadius: Theme.borderRadius.md,
        borderWidth: 1,
        borderColor: Theme.colors.borderLight,
        ...Theme.shadows.sm,
    },
    sectionCardTitle: {
        ...Theme.textStyles.bodyBold,
        color: Theme.colors.text,
        fontFamily: Theme.fonts.bold,
        marginBottom: Theme.spacing.sm,
    },

    // ── Item rows ─────────────────────────────────────────────────────
    itemRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: Theme.spacing.sm,
    },
    itemRowBorder: {
        borderBottomWidth: 1,
        borderBottomColor: Theme.colors.borderLight,
    },
    itemInfo: {
        flex: 1,
        gap: Theme.spacing.xs,
    },
    itemName: {
        ...Theme.textStyles.body,
        color: Theme.colors.text,
        fontFamily: Theme.fonts.medium,
    },
    calBadge: {
        backgroundColor: Theme.colors.backgroundSecondary,
        borderRadius: Theme.borderRadius.full,
        paddingHorizontal: Theme.spacing.sm,
        paddingVertical: 2,
        borderWidth: 1,
        borderColor: Theme.colors.borderLight,
        alignSelf: 'flex-start',
    },
    calBadgeText: {
        fontSize: 11,
        color: Theme.colors.textSecondary,
        fontFamily: Theme.fonts.medium,
    },

    // ── Quantity stepper ─────────────────────────────────────────────
    stepper: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: Theme.spacing.sm,
    },
    stepBtn: {
        width: 28,
        height: 28,
        borderRadius: Theme.borderRadius.full,
        backgroundColor: Theme.colors.backgroundSecondary,
        borderWidth: 1,
        borderColor: Theme.colors.border,
        justifyContent: 'center',
        alignItems: 'center',
    },
    stepIcon: {
        fontSize: 16,
        color: Theme.colors.text,
        lineHeight: 20,
    },
    stepQty: {
        ...Theme.textStyles.bodyBold,
        color: Theme.colors.text,
        fontFamily: Theme.fonts.bold,
        minWidth: 20,
        textAlign: 'center',
    },

    // ── Payment mode toggle row ───────────────────────────────────────
    toggleRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginHorizontal: Theme.spacing.md,
        marginBottom: Theme.spacing.sm,
        paddingHorizontal: Theme.spacing.md,
        paddingVertical: Theme.spacing.sm,
        backgroundColor: Theme.colors.card,
        borderRadius: Theme.borderRadius.md,
        borderWidth: 1,
        borderColor: Theme.colors.borderLight,
    },
    toggleRowLabel: {
        ...Theme.textStyles.body,
        color: Theme.colors.textSecondary,
        fontFamily: Theme.fonts.medium,
    },
    togglePill: {
        flexDirection: 'row',
        backgroundColor: Theme.colors.backgroundSecondary,
        borderRadius: Theme.borderRadius.full,
        padding: 3,
    },
    toggleOpt: {
        paddingHorizontal: Theme.spacing.md,
        paddingVertical: Theme.spacing.xs,
        borderRadius: Theme.borderRadius.full,
    },
    toggleOptActive: {
        backgroundColor: Theme.colors.primary,
    },
    toggleOptText: {
        fontSize: 12,
        color: Theme.colors.textSecondary,
        fontFamily: Theme.fonts.medium,
    },
    toggleOptTextActive: {
        color: '#0a1a0d',
        fontFamily: Theme.fonts.bold,
    },

    // ── Coupons row ───────────────────────────────────────────────────
    couponRow: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Theme.colors.card,
        marginHorizontal: Theme.spacing.md,
        marginBottom: Theme.spacing.sm,
        padding: Theme.spacing.md,
        borderRadius: Theme.borderRadius.md,
        borderWidth: 1,
        borderColor: Theme.colors.borderLight,
        gap: Theme.spacing.sm,
    },
    couponIcon: {
        fontSize: 18,
    },
    couponLabel: {
        ...Theme.textStyles.body,
        color: Theme.colors.text,
        fontFamily: Theme.fonts.medium,
        flex: 1,
    },

    // ── Bill Details (used by SummaryRow) ────────────────────────────
    summaryRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: Theme.spacing.sm,
    },
    summaryLabel: {
        ...Theme.textStyles.body,
        color: Theme.colors.textSecondary,
        fontFamily: Theme.fonts.regular,
    },
    summaryValue: {
        ...Theme.textStyles.bodyBold,
        fontFamily: Theme.fonts.semiBold,
    },
    billDivider: {
        height: 1,
        backgroundColor: Theme.colors.borderLight,
        marginVertical: Theme.spacing.sm,
    },

    // ── Help row ──────────────────────────────────────────────────────
    helpRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: Theme.spacing.md,
        marginBottom: Theme.spacing.md,
        padding: Theme.spacing.md,
        backgroundColor: Theme.colors.card,
        borderRadius: Theme.borderRadius.md,
        borderWidth: 1,
        borderColor: Theme.colors.borderLight,
        gap: Theme.spacing.sm,
    },
    helpIcon: {
        fontSize: 18,
    },
    helpText: {
        ...Theme.textStyles.bodySmall,
        color: Theme.colors.textSecondary,
        fontFamily: Theme.fonts.regular,
        flex: 1,
    },

    // ── Sticky CTA bar ────────────────────────────────────────────────
    ctaBar: {
        paddingTop: Theme.spacing.md,
        paddingHorizontal: Theme.spacing.md,
        backgroundColor: Theme.colors.card,
        borderTopWidth: 1,
        borderTopColor: Theme.colors.borderLight,
    },
    ctaBtn: {
        borderRadius: Theme.borderRadius.full,
        overflow: 'hidden',
    },
    ctaGradient: {
        paddingVertical: Theme.spacing.md,
        alignItems: 'center',
        borderRadius: Theme.borderRadius.full,
    },
    ctaText: {
        ...Theme.textStyles.button,
        color: '#0a1a0d',
        fontFamily: Theme.fonts.bold,
    },

    // ── Empty state ───────────────────────────────────────────────────
    emptyText: {
        ...Theme.textStyles.body,
        color: Theme.colors.textSecondary,
        textAlign: 'center',
        paddingVertical: Theme.spacing.xl,
    },
});
