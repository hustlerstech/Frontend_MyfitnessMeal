/**
 * subscriptionService.ts
 *
 * Mock "backend" service for subscription management.
 * Stores data as a JSON document in AsyncStorage — behaves exactly like
 * a REST API that reads/writes a JSON file on the server.
 *
 * ──────────────────────────────────────────────────────────────────────────────
 * HOW TO SWAP TO REAL BACKEND LATER:
 *   Each function maps 1-to-1 to an API endpoint. When the backend is ready,
 *   replace the function bodies (keep the signatures + types):
 *
 *     readSubscription()          → GET  /api/subscriptions/me
 *     activatePlan(planId, ...)   → POST /api/subscriptions/activate
 *     deductCreditsInJson(amount) → POST /api/subscriptions/credits/deduct
 * ──────────────────────────────────────────────────────────────────────────────
 */

import AsyncStorage from '@react-native-async-storage/async-storage';

// ─────────────────────────────────────────────────────────────────────────────
// Types  (identical to what the real API will return)
// ─────────────────────────────────────────────────────────────────────────────

export type PlanId        = 'free' | 'basic' | 'premium';
export type BillingPeriod = 'month' | 'year';
export type SubStatus     = 'active' | 'paused' | 'grace' | 'expired';

/** One row in the plans array — exactly one will have isActive=true. */
export interface PlanRecord {
    id:       PlanId;
    name:     string;
    price:    number;   // ₹ monthly price (0 for free)
    period:   string;   // "forever" | "month" | "year"
    isActive: boolean;  // true = currently subscribed plan
}

/** The full JSON document stored (and later returned by the API). */
export interface UserSubscriptionData {
    userId:        string;
    activePlanId:  PlanId;
    status:        SubStatus;
    startDate:     string;        // ISO date
    endDate:       string;        // ISO date
    billingPeriod: BillingPeriod;
    credits: {
        totalAmount:     number;  // ₹ allocated at start of period
        usedAmount:      number;  // ₹ spent on orders
        bankedAmount:    number;  // ₹ saved (banking feature)
        availableAmount: number;  // ₹ = total - used + banked
    };
    plans: PlanRecord[];          // All 3 plans, only one isActive=true
}

// ─────────────────────────────────────────────────────────────────────────────
// Constants
// ─────────────────────────────────────────────────────────────────────────────

/** AsyncStorage key — keeps it namespaced to avoid collisions. */
const STORAGE_KEY = 'fitfuel:userSubscription:v1';

/**
 * ₹ credit wallet allocated per plan per billing period.
 * Matches the demo amounts shown in the payment screen.
 */
export const PLAN_CREDIT_AMOUNTS: Record<PlanId, number> = {
    free:    0,
    basic:   500,
    premium: 1200,
};

export const PLAN_NAMES: Record<PlanId, string> = {
    free:    'Free Plan',
    basic:   'Basic Plan',
    premium: 'Premium Plan',
};

/** Default seed — mirrors data/userSubscription.json exactly. */
const DEFAULT_DATA: UserSubscriptionData = {
    userId:        'demo_user_001',
    activePlanId:  'free',
    status:        'active',
    startDate:     '2026-01-01',
    endDate:       '2099-12-31',
    billingPeriod: 'month',
    credits: {
        totalAmount:     0,
        usedAmount:      0,
        bankedAmount:    0,
        availableAmount: 0,
    },
    plans: [
        { id: 'free',    name: 'Free Plan',    price: 0,   period: 'forever', isActive: true  },
        { id: 'basic',   name: 'Basic Plan',   price: 499, period: 'month',   isActive: false },
        { id: 'premium', name: 'Premium Plan', price: 999, period: 'month',   isActive: false },
    ],
};

// ─────────────────────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────────────────────

function todayISO(): string {
    return new Date().toISOString().split('T')[0];
}

function addDays(isoDate: string, days: number): string {
    const d = new Date(isoDate);
    d.setDate(d.getDate() + days);
    return d.toISOString().split('T')[0];
}

/** Serialize to formatted JSON and persist to AsyncStorage. */
async function _write(data: UserSubscriptionData): Promise<void> {
    try {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data, null, 2));
    } catch (e) {
        console.warn('[subscriptionService] write error:', e);
    }
}

// ─────────────────────────────────────────────────────────────────────────────
// Public Service API
// ─────────────────────────────────────────────────────────────────────────────

/**
 * READ — fetch current subscription JSON.
 *
 * On first install there is no saved data, so we seed from DEFAULT_DATA
 * (same as data/userSubscription.json) and persist it.
 *
 * LATER → replace body with:
 *   const res = await api.get('/subscriptions/me');
 *   return res.data;
 */
export async function readSubscription(): Promise<UserSubscriptionData> {
    try {
        const raw = await AsyncStorage.getItem(STORAGE_KEY);
        if (raw) return JSON.parse(raw) as UserSubscriptionData;
    } catch (e) {
        console.warn('[subscriptionService] read error:', e);
    }
    // First install — seed default and persist
    await _write(DEFAULT_DATA);
    return DEFAULT_DATA;
}

/**
 * ACTIVATE PLAN — switch to a new plan.
 *
 * - Sets isActive=true on the chosen plan, isActive=false on all others.
 * - Resets credit wallet to the plan's allocation.
 * - Sets startDate = today, endDate = today + billingPeriod.
 *
 * LATER → replace body with:
 *   const res = await api.post('/subscriptions/activate', { planId, billingPeriod });
 *   return res.data;
 */
export async function activatePlan(
    planId:        PlanId,
    billingPeriod: BillingPeriod = 'month',
): Promise<UserSubscriptionData> {
    const current   = await readSubscription();
    const alloc     = PLAN_CREDIT_AMOUNTS[planId];
    const days      = billingPeriod === 'year' ? 365 : 30;
    const newStart  = todayISO();
    const newEnd    = planId === 'free' ? '2099-12-31' : addDays(newStart, days);

    const updated: UserSubscriptionData = {
        ...current,
        activePlanId:  planId,
        status:        'active',
        startDate:     newStart,
        endDate:       newEnd,
        billingPeriod,
        credits: {
            totalAmount:     alloc,
            usedAmount:      0,
            bankedAmount:    0,
            availableAmount: alloc,
        },
        // Exactly one plan gets isActive=true
        plans: current.plans.map(p => ({ ...p, isActive: p.id === planId })),
    };

    await _write(updated);
    return updated;
}

/**
 * DEDUCT CREDITS — subtract ₹ from the available wallet.
 * Returns the updated data, or null if balance is insufficient.
 *
 * LATER → replace body with:
 *   const res = await api.post('/subscriptions/credits/deduct', { amount });
 *   return res.ok ? res.data : null;
 */
export async function deductCreditsInJson(
    amount: number,
): Promise<UserSubscriptionData | null> {
    const current = await readSubscription();
    if (current.credits.availableAmount < amount) return null;

    const updated: UserSubscriptionData = {
        ...current,
        credits: {
            ...current.credits,
            usedAmount:      current.credits.usedAmount      + amount,
            availableAmount: current.credits.availableAmount - amount,
        },
    };

    await _write(updated);
    return updated;
}
