/**
 * subscriptionStore.ts
 *
 * In-memory Zustand store for subscription state.
 * Persistence is handled by subscriptionService (JSON → AsyncStorage → later API).
 *
 * Lifecycle:
 *   1. App boots with Free-plan defaults (instant, no flash).
 *   2. _layout.tsx calls store.initialize() → reads JSON from service → updates store.
 *   3. Any mutation (setPlan, deductCredits …) updates Zustand immediately (sync)
 *      and fires a background write to the JSON service (async, fire-and-forget).
 *
 * Entitlements by plan:
 *   free    → canUsePlanner=false  canUseCredits=false  canDirectPay=true
 *   basic   → canUsePlanner=true   canUseCredits=true   canDirectPay=true
 *   premium → canUsePlanner=true   canUseCredits=true   canDirectPay=true
 */

import { create } from 'zustand';
import {
    readSubscription,
    activatePlan,
    deductCreditsInJson,
    PLAN_CREDIT_AMOUNTS,
    PLAN_NAMES,
    type PlanId,
    type BillingPeriod,
    type UserSubscriptionData,
} from '@/services/subscriptionService';

// ─────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────

export type SubscriptionStatus = 'active' | 'paused' | 'grace' | 'expired';
export type { PlanId };

export interface Subscription {
    id:               string;
    planId:           PlanId;
    planName:         string;
    status:           SubscriptionStatus;
    startDate:        string;
    endDate:          string;
    pausedAt:         string | null;
    graceStartDate:   string | null;
    graceDurationDays: number;
}

/**
 * Credit wallet — all amounts are in ₹, not meal counts.
 *
 *   totalAmount     = ₹ allocated at plan start
 *   usedAmount      = ₹ spent on credit-mode orders
 *   bankedAmount    = ₹ saved via the banking feature
 *   availableAmount = totalAmount - usedAmount + bankedAmount  (derived)
 */
export interface CreditLedger {
    totalAmount:     number;
    usedAmount:      number;
    bankedAmount:    number;
    availableAmount: number;
}

export interface SubscriptionStore {
    subscription: Subscription;
    credits:      CreditLedger;

    // Derived entitlement flags — recomputed after every mutation
    canUsePlanner:      boolean;
    canUseCredits:      boolean;
    canDirectPay:       boolean;
    isInGrace:          boolean;
    graceDaysRemaining: number;
    isSubscribed:       boolean; // true = active paid plan (basic | premium)

    // Actions
    initialize:          () => Promise<void>;
    pausePlan:           () => void;
    resumePlan:          () => void;
    renewPlan:           () => void;
    bankCredits:         (amount: number) => void;
    /** Deducts ₹amount. Returns false if insufficient or not allowed. */
    deductCredits:       (amount: number) => boolean;
    checkGraceExpiry:    () => void;
    _computePermissions: () => void;
    /** Activates a new plan immediately (demo). Persists to JSON service. */
    setPlan:             (planId: PlanId, billingPeriod?: BillingPeriod) => void;
}

// ─────────────────────────────────────────────
// Constants
// ─────────────────────────────────────────────

const GRACE_DURATION_DAYS = 7;

// ─────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────

function todayISO(): string {
    return new Date().toISOString().split('T')[0];
}

function addDays(isoDate: string, days: number): string {
    const d = new Date(isoDate);
    d.setDate(d.getDate() + days);
    return d.toISOString().split('T')[0];
}

function daysBetween(from: string, to: string): number {
    return Math.floor(
        (new Date(to).getTime() - new Date(from).getTime()) / (1000 * 60 * 60 * 24),
    );
}

function computeAvailable(c: Omit<CreditLedger, 'availableAmount'>): number {
    return c.totalAmount - c.usedAmount + c.bankedAmount;
}

function derivePermissions(
    status: SubscriptionStatus,
    graceStartDate: string | null,
    planId: PlanId,
) {
    const isPaid = planId !== 'free';
    const graceDaysRemaining = graceStartDate
        ? Math.max(0, GRACE_DURATION_DAYS - daysBetween(graceStartDate, todayISO()))
        : 0;

    return {
        canUsePlanner:      isPaid && status === 'active',
        canUseCredits:      isPaid && (status === 'active' || status === 'grace'),
        canDirectPay:       status !== 'expired',
        isInGrace:          status === 'grace',
        graceDaysRemaining,
        isSubscribed:       isPaid && status === 'active',
    };
}

/** Convert the service JSON shape → Subscription record used by the store. */
function toSubscription(data: UserSubscriptionData): Subscription {
    return {
        id:               'sub_demo',
        planId:           data.activePlanId,
        planName:         PLAN_NAMES[data.activePlanId],
        status:           data.status,
        startDate:        data.startDate,
        endDate:          data.endDate,
        pausedAt:         null,
        graceStartDate:   null,
        graceDurationDays: GRACE_DURATION_DAYS,
    };
}

// ─────────────────────────────────────────────
// Default (pre-init) state  — shown for ~100 ms until initialize() completes
// ─────────────────────────────────────────────

const DEFAULT_SUB: Subscription = {
    id:               'sub_demo',
    planId:           'free',
    planName:         'Free Plan',
    status:           'active',
    startDate:        '2026-01-01',
    endDate:          '2099-12-31',
    pausedAt:         null,
    graceStartDate:   null,
    graceDurationDays: GRACE_DURATION_DAYS,
};

const DEFAULT_CREDITS: CreditLedger = {
    totalAmount:     0,
    usedAmount:      0,
    bankedAmount:    0,
    availableAmount: 0,
};

const INITIAL_FLAGS = derivePermissions(
    DEFAULT_SUB.status,
    DEFAULT_SUB.graceStartDate,
    DEFAULT_SUB.planId,
);

// ─────────────────────────────────────────────
// Store
// ─────────────────────────────────────────────

export const useSubscriptionStore = create<SubscriptionStore>((set, get) => ({
    subscription: DEFAULT_SUB,
    credits:      DEFAULT_CREDITS,
    ...INITIAL_FLAGS,

    // ─── Internal: recompute permission flags ─────────────────────────────────
    _computePermissions: () => {
        const { subscription, credits } = get();
        const flags = derivePermissions(
            subscription.status,
            subscription.graceStartDate,
            subscription.planId,
        );
        set({
            ...flags,
            credits: { ...credits, availableAmount: computeAvailable(credits) },
        });
    },

    // ─── Initialize from JSON service ────────────────────────────────────────
    // Called once on app mount (in _layout.tsx).
    // Reads the persisted JSON and hydrates the in-memory store.
    initialize: async () => {
        try {
            const data = await readSubscription();
            set({
                subscription: toSubscription(data),
                credits:      data.credits,
            });
            get()._computePermissions();
        } catch (e) {
            console.warn('[subscriptionStore] initialize error:', e);
        }
    },

    // ─── Set Plan (demo-mode switcher) ────────────────────────────────────────
    // 1. Updates Zustand immediately (UI re-renders at once).
    // 2. Calls subscriptionService.activatePlan() in the background (JSON persist).
    setPlan: (planId: PlanId, billingPeriod: BillingPeriod = 'month') => {
        const alloc    = PLAN_CREDIT_AMOUNTS[planId];
        const days     = billingPeriod === 'year' ? 365 : 30;
        const newStart = todayISO();
        const newEnd   = planId === 'free' ? '2099-12-31' : addDays(newStart, days);

        // Sync update → instant UI
        set((state) => ({
            subscription: {
                ...state.subscription,
                planId,
                planName:      PLAN_NAMES[planId],
                status:        'active',
                startDate:     newStart,
                endDate:       newEnd,
                pausedAt:      null,
                graceStartDate: null,
            },
            credits: {
                totalAmount:     alloc,
                usedAmount:      0,
                bankedAmount:    0,
                availableAmount: alloc,
            },
        }));
        get()._computePermissions();

        // Async persist to JSON (fire-and-forget)
        activatePlan(planId, billingPeriod).catch((e) =>
            console.warn('[subscriptionStore] setPlan persist error:', e),
        );
    },

    // ─── Pause Plan ───────────────────────────────────────────────────────────
    pausePlan: () => {
        const { subscription } = get();
        if (subscription.status !== 'active') return;
        set((s) => ({
            subscription: { ...s.subscription, status: 'paused', pausedAt: todayISO() },
        }));
        get()._computePermissions();
    },

    // ─── Resume Plan ──────────────────────────────────────────────────────────
    resumePlan: () => {
        const { subscription } = get();
        if (subscription.status !== 'paused') return;
        set((s) => ({
            subscription: { ...s.subscription, status: 'active', pausedAt: null },
        }));
        get()._computePermissions();
    },

    // ─── Renew Plan ───────────────────────────────────────────────────────────
    renewPlan: () => {
        const { subscription, credits } = get();
        if (subscription.status === 'active' || subscription.status === 'paused') return;

        const isGrace  = subscription.status === 'grace';
        const alloc    = PLAN_CREDIT_AMOUNTS[subscription.planId];
        const newStart = todayISO();
        const newEnd   = addDays(newStart, 30);

        set((s) => ({
            subscription: {
                ...s.subscription,
                status:        'active',
                startDate:     newStart,
                endDate:       newEnd,
                pausedAt:      null,
                graceStartDate: null,
            },
            credits: isGrace
                ? {
                    totalAmount:     alloc,
                    usedAmount:      0,
                    bankedAmount:    credits.bankedAmount,
                    availableAmount: alloc + credits.bankedAmount,
                }
                : {
                    totalAmount:     alloc,
                    usedAmount:      0,
                    bankedAmount:    0,
                    availableAmount: alloc,
                },
        }));
        get()._computePermissions();
    },

    // ─── Bank Credits ─────────────────────────────────────────────────────────
    bankCredits: (amount: number) => {
        if (get().subscription.status !== 'active' || amount <= 0) return;
        set((s) => ({
            credits: { ...s.credits, bankedAmount: s.credits.bankedAmount + amount },
        }));
        get()._computePermissions();
    },

    // ─── Deduct Credits ───────────────────────────────────────────────────────
    // amount = ₹ order subtotal.
    // Returns true on success; false if guard fails or balance insufficient.
    deductCredits: (amount: number): boolean => {
        if (!get().canUseCredits) return false;
        const { credits } = get();
        if (credits.availableAmount < amount) return false;

        // Sync update → instant UI
        set((s) => ({
            credits: { ...s.credits, usedAmount: s.credits.usedAmount + amount },
        }));
        get()._computePermissions();

        // Async persist (fire-and-forget)
        deductCreditsInJson(amount).catch((e) =>
            console.warn('[subscriptionStore] deductCredits persist error:', e),
        );

        return true;
    },

    // ─── Check Grace Expiry ───────────────────────────────────────────────────
    checkGraceExpiry: () => {
        const { subscription } = get();
        const now = todayISO();

        if (subscription.status === 'active' && daysBetween(now, subscription.endDate) < 0) {
            set((s) => ({
                subscription: { ...s.subscription, status: 'grace', graceStartDate: now },
            }));
            get()._computePermissions();
            return;
        }

        if (
            subscription.status === 'grace' &&
            subscription.graceStartDate !== null &&
            daysBetween(subscription.graceStartDate, now) >= GRACE_DURATION_DAYS
        ) {
            set((s) => ({
                subscription: { ...s.subscription, status: 'expired' },
                credits: { totalAmount: 0, usedAmount: 0, bankedAmount: 0, availableAmount: 0 },
            }));
            get()._computePermissions();
        }
    },
}));
