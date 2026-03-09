import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    ScrollView,
    TouchableOpacity,
} from 'react-native';
import { useRouter } from 'expo-router';

import { useLocalSearchParams } from 'expo-router';
import { useOrderStore } from '@/store/orderStore';
import { Theme } from '../../../constants';

const STATUS_STEPS = [
    'confirmed',
    'preparing',
    'packed',
    'out_for_delivery',
    'delivered',
];

export default function OrderDetailScreen() {
    const { id } = useLocalSearchParams<{ id: string }>();
    const { orders } = useOrderStore();
    const router = useRouter();


    const order = orders.find((o) => o.id === id);

    if (!order) {
        return (
            <SafeAreaView style={styles.center}>
                <Text>Order not found</Text>
            </SafeAreaView>
        );
    }

    const currentStepIndex = STATUS_STEPS.indexOf(order.status);

    const getStatusSteps = (currentStatus: string) => {
        const statusFlow = [
            { key: 'confirmed', label: 'Confirmed' },
            { key: 'preparing', label: 'Preparing' },
            { key: 'packed', label: 'Packed' },
            { key: 'out_for_delivery', label: 'On the Way' },
            { key: 'delivered', label: 'Delivered' },
        ];

        const currentIndex = statusFlow.findIndex(s => s.key === currentStatus);

        return statusFlow.map((step, index) => ({
            ...step,
            status: index < currentIndex ? 'completed' :
                index === currentIndex ? 'current' : 'upcoming'
        }));
    };

    // REPLACE your getStatusColor function with:

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'confirmed':
                return Theme.colors.primary;
            case 'preparing':
                return Theme.colors.warning || Theme.colors.primary;
            case 'packed':
                return Theme.colors.info || Theme.colors.primary;
            case 'out_for_delivery':
                return Theme.colors.primary;  // ✅ Changed from Theme.colors.secondary
            case 'delivered':
                return Theme.colors.success || Theme.colors.primary;
            default:
                return Theme.colors.primary;
        }
    };

    const formattedStatus = order.status
        .replace(/_/g, ' ')
        .replace(/\b\w/g, c => c.toUpperCase());


    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContent}>

                {/* ============================== */}
                {/* HEADER SECTION */}
                {/* ============================== */}
                <View style={styles.headerCard}>
                    <View style={styles.headerRow}>
                        <View>
                            <Text style={styles.orderIdText}>Order #{order.id}</Text>
                            <Text style={styles.placedDate}>
                                Placed: {new Date(order.createdAt).toLocaleDateString('en-US', {
                                    month: 'short',
                                    day: 'numeric',
                                    year: 'numeric',
                                    hour: '2-digit',
                                    minute: '2-digit'
                                })}
                            </Text>
                        </View>
                        <View style={[styles.statusChip, { backgroundColor: `${getStatusColor(order.status)}15` }]}>
                            <Text style={[styles.statusText, { color: getStatusColor(order.status) }]}>
                                {formattedStatus}
                            </Text>
                        </View>
                    </View>
                </View>

                {/* ============================== */}
                {/* STATUS TIMELINE SECTION */}
                {/* ============================== */}
                <View style={styles.timelineCard}>
                    <Text style={styles.sectionTitle}>Order Status</Text>
                    <View style={styles.timelineContainer}>
                        {getStatusSteps(order.status).map((step, index) => (
                            <View key={step.key} style={styles.timelineStep}>
                                {/* Circle Indicator */}
                                <View style={styles.timelineIndicatorWrapper}>
                                    <View style={[
                                        styles.timelineCircle,
                                        step.status === 'completed' && styles.timelineCircleCompleted,
                                        step.status === 'current' && styles.timelineCircleCurrent,
                                        step.status === 'upcoming' && styles.timelineCircleUpcoming,
                                    ]}>
                                        {step.status === 'current' && (
                                            <View style={styles.timelineInnerDot} />
                                        )}
                                    </View>
                                    {/* Line connector - don't show after last step */}
                                    {index < 4 && (
                                        <View style={[
                                            styles.timelineLine,
                                            (step.status === 'completed' || step.status === 'current') &&
                                            styles.timelineLineActive,
                                        ]} />
                                    )}
                                </View>

                                {/* Step Label */}
                                <Text style={[
                                    styles.timelineLabel,
                                    step.status === 'current' && styles.timelineLabelCurrent,
                                    step.status === 'upcoming' && styles.timelineLabelUpcoming,
                                ]}>
                                    {step.label}
                                </Text>
                            </View>
                        ))}
                    </View>
                </View>

                {/* ============================== */}
                {/* MEALS SECTION */}
                {/* ============================== */}
                <View style={styles.mealsCard}>
                    <Text style={styles.sectionTitle}>Meals</Text>
                    <View style={styles.mealsList}>
                        {order.items.map((item, index) => (
                            <View key={index}>
                                <View style={styles.mealItem}>
                                    <View style={styles.mealInfo}>
                                        <Text style={styles.mealName}>{item.name}</Text>
                                        <Text style={styles.mealQuantity}>Qty: {item.quantity}</Text>
                                    </View>
                                    <Text style={styles.mealPrice}>₹{item.price}</Text>
                                </View>
                                {/* Divider - don't show after last item */}
                                {index < order.items.length - 1 && (
                                    <View style={styles.mealDivider} />
                                )}
                            </View>
                        ))}
                    </View>
                </View>

                {/* ============================== */}
                {/* PAYMENT SUMMARY SECTION */}
                {/* ============================== */}
                <View style={styles.summaryCard}>
                    <Text style={styles.sectionTitle}>Payment Summary</Text>

                    <View style={styles.summaryRow}>
                        <Text style={styles.summaryLabel}>Subtotal</Text>
                        <Text style={styles.summaryValue}>₹{order.subtotal}</Text>
                    </View>

                    <View style={styles.summaryRow}>
                        <Text style={styles.summaryLabel}>Payment Mode</Text>
                        <Text style={styles.summaryValue}>
                            {order.paymentMode === 'credit' ? 'Credits' : 'Direct Payment'}
                        </Text>
                    </View>

                    <View style={styles.summaryDivider} />

                    <View style={styles.totalRow}>
                        <Text style={styles.totalLabel}>Total</Text>
                        <Text style={styles.totalAmount}>₹{order.subtotal}</Text>
                    </View>
                </View>

            </ScrollView>
        </SafeAreaView>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Theme.colors.background,
    },
    scrollContent: {
        padding: 16,
        paddingBottom: 32,
    },
    // Add this to your StyleSheet.create({ ... }):
    center: {
        justifyContent: 'center',
        alignItems: 'center',
    },

    // Header Section
    headerCard: {
        backgroundColor: Theme.colors.card,
        borderRadius: 16,
        padding: 18,
        marginBottom: 18,
        shadowColor: Theme.colors.text,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.04,
        shadowRadius: 4,
        elevation: 1,
    },
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    orderIdText: {
        fontSize: 18,
        fontWeight: '600',
        color: Theme.colors.text,
        marginBottom: 4,
    },
    placedDate: {
        fontSize: 13,
        color: Theme.colors.textSecondary,
    },
    statusChip: {
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 20,
    },
    statusText: {
        fontSize: 12,
        fontWeight: '600',
        textTransform: 'capitalize',
    },

    // Timeline Section
    timelineCard: {
        backgroundColor: Theme.colors.card,
        borderRadius: 16,
        padding: 18,
        marginBottom: 18,
        shadowColor: Theme.colors.text,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.04,
        shadowRadius: 4,
        elevation: 1,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: Theme.colors.text,
        marginBottom: 16,
    },
    timelineContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    timelineStep: {
        flex: 1,
        alignItems: 'center',
    },
    timelineIndicatorWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        marginBottom: 8,
    },
    timelineCircle: {
        width: 12,
        height: 12,
        borderRadius: 6,
        borderWidth: 2,
        justifyContent: 'center',
        alignItems: 'center',
    },
    timelineCircleCompleted: {
        backgroundColor: Theme.colors.primary,
        borderColor: Theme.colors.primary,
    },
    timelineCircleCurrent: {
        backgroundColor: Theme.colors.background,
        borderColor: Theme.colors.primary,
    },
    timelineCircleUpcoming: {
        backgroundColor: Theme.colors.background,
        borderColor: Theme.colors.border,
    },
    timelineInnerDot: {
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: Theme.colors.primary,
    },
    timelineLine: {
        flex: 1,
        height: 2,
        backgroundColor: Theme.colors.border,
        marginLeft: 4,
    },
    timelineLineActive: {
        backgroundColor: Theme.colors.primary,
    },
    timelineLabel: {
        fontSize: 11,
        color: Theme.colors.textSecondary,
        textAlign: 'center',
        fontWeight: '500',
    },
    timelineLabelCurrent: {
        color: Theme.colors.primary,
        fontWeight: '600',
    },
    timelineLabelUpcoming: {
        color: Theme.colors.textLight,
    },

    // Meals Section
    mealsCard: {
        backgroundColor: Theme.colors.card,
        borderRadius: 16,
        padding: 18,
        marginBottom: 18,
        shadowColor: Theme.colors.text,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.04,
        shadowRadius: 4,
        elevation: 1,
    },
    mealsList: {
        gap: 0,
    },
    mealItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        paddingVertical: 12,
    },
    mealInfo: {
        flex: 1,
    },
    mealName: {
        fontSize: 15,
        fontWeight: '600',
        color: Theme.colors.text,
        marginBottom: 4,
    },
    mealQuantity: {
        fontSize: 13,
        color: Theme.colors.textSecondary,
    },
    mealPrice: {
        fontSize: 15,
        fontWeight: '600',
        color: Theme.colors.text,
    },
    mealDivider: {
        height: 1,
        backgroundColor: Theme.colors.border,
    },

    // Payment Summary Section
    summaryCard: {
        backgroundColor: Theme.colors.card,
        borderRadius: 16,
        padding: 18,
        marginBottom: 18,
        shadowColor: Theme.colors.text,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.04,
        shadowRadius: 4,
        elevation: 1,
    },
    summaryRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    summaryLabel: {
        fontSize: 14,
        color: Theme.colors.textSecondary,
    },
    summaryValue: {
        fontSize: 14,
        color: Theme.colors.text,
        fontWeight: '500',
    },
    summaryDivider: {
        height: 1,
        backgroundColor: Theme.colors.border,
        marginVertical: 12,
    },
    totalRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    totalLabel: {
        fontSize: 16,
        color: Theme.colors.text,
        fontWeight: '600',
    },
    totalAmount: {
        fontSize: 20,
        fontWeight: '700',
        color: Theme.colors.primary,
    },
});
