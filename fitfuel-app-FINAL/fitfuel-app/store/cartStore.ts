/**
 * cartStore.ts
 *
 * Manages cart state and hybrid checkout for FitFuel.
 *
 * Payment Modes:
 *   credit → deducts from subscriptionStore, blocked if paused/expired
 *   direct → always allowed, no credit interaction
 *
 * Checkout flow:
 *   1. User builds cart (addItem / removeItem)
 *   2. User selects payment mode (setPaymentMode)
 *   3. checkout() validates → deducts if credit → clears cart → returns boolean
 *
 * Derived values (never stored manually):
 *   totalMeals → sum of all item quantities
 *   subtotal   → sum of (price × quantity) for all items
 */

import { create } from 'zustand';
import { useSubscriptionStore } from './subscriptionStore';
import { useOrderStore } from './orderStore';


// ─────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────

export type MealType = 'breakfast' | 'lunch' | 'dinner';
export type PaymentMode = 'credit' | 'direct';

export interface CartItem {
    id: string;
    name: string;
    price: number;      // price in ₹, used for direct payment
    mealType: MealType;
    quantity: number;
}

export interface CartStore {
    items: CartItem[];
    paymentMode: PaymentMode;

    // Derived values
    totalMeals: number;  // sum of quantities — used for credit deduction
    subtotal: number;    // sum of price × quantity — used for direct payment

    // Actions
    addItem: (item: Omit<CartItem, 'quantity'>) => void;
    removeItem: (id: string) => void;
    clearCart: () => void;
    setPaymentMode: (mode: PaymentMode) => void;
    checkout: () => boolean;

    // Internal
    _recompute: () => void;
}

// ─────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────

function computeTotals(items: CartItem[]): { totalMeals: number; subtotal: number } {
    return items.reduce(
        (acc, item) => ({
            totalMeals: acc.totalMeals + item.quantity,
            subtotal: acc.subtotal + item.price * item.quantity,
        }),
        { totalMeals: 0, subtotal: 0 },
    );
}

// ─────────────────────────────────────────────
// Store
// ─────────────────────────────────────────────

export const useCartStore = create<CartStore>((set, get) => ({
    items: [],
    paymentMode: 'credit',
    totalMeals: 0,
    subtotal: 0,

    // ─── Internal: recompute derived values ───────────────────────
    _recompute: () => {
        const { items } = get();
        const { totalMeals, subtotal } = computeTotals(items);
        set({ totalMeals, subtotal });
    },

    // ─── Add Item ─────────────────────────────────────────────────
    // If item already exists in cart, increment quantity.
    // Otherwise insert as new entry with quantity 1.
    addItem: (incoming) => {
        const { items } = get();
        const existing = items.find((i) => i.id === incoming.id);

        if (existing) {
            set({
                items: items.map((i) =>
                    i.id === incoming.id ? { ...i, quantity: i.quantity + 1 } : i,
                ),
            });
        } else {
            set({ items: [...items, { ...incoming, quantity: 1 }] });
        }

        get()._recompute();
    },

    // ─── Remove Item ──────────────────────────────────────────────
    // Decrements quantity by 1. Removes item entirely when quantity hits 0.
    removeItem: (id) => {
        const { items } = get();
        const existing = items.find((i) => i.id === id);

        if (!existing) return;

        if (existing.quantity === 1) {
            set({ items: items.filter((i) => i.id !== id) });
        } else {
            set({
                items: items.map((i) =>
                    i.id === id ? { ...i, quantity: i.quantity - 1 } : i,
                ),
            });
        }

        get()._recompute();
    },

    // ─── Clear Cart ───────────────────────────────────────────────
    clearCart: () => {
        set({ items: [], totalMeals: 0, subtotal: 0 });
    },

    // ─── Set Payment Mode ─────────────────────────────────────────
    setPaymentMode: (mode) => {
        set({ paymentMode: mode });
    },

    // ─── Checkout ─────────────────────────────────────────────────
    // Returns true on success, false on any failure.
    // Does NOT throw — caller handles UI feedback.
    //
    // Credit path:
    //   1. Confirm canUseCredits from subscriptionStore
    //   2. Call deductCredits(subtotal ₹) — returns boolean
    //   3. If deduction fails → return false, cart unchanged
    //
    // Direct path:
    //   1. No credit interaction
    //   2. Always succeeds (simulated — no API)
    //
    // Both paths on success:
    //   → clear cart → return true
    checkout: (): boolean => {
        const { items, paymentMode, totalMeals, subtotal } = get();

        if (items.length === 0) return false;

        const {
            canUseCredits,
            canDirectPay,
            deductCredits,
        } = useSubscriptionStore.getState();

        // CREDIT PAYMENT
        // Deduct the ₹ order subtotal (not meal count) from the credit wallet.
        if (paymentMode === 'credit') {
            if (!canUseCredits) return false;

            const deducted = deductCredits(subtotal);
            if (!deducted) return false;
        }

        // DIRECT PAYMENT
        if (paymentMode === 'direct') {
            if (!canDirectPay) return false;
        }

        // ✅ CREATE ORDER
        useOrderStore.getState().createOrder({
            items,
            totalMeals,
            subtotal,
            paymentMode,
        });

        // Clear cart after order created
        get().clearCart();

        return true;
    },


}));