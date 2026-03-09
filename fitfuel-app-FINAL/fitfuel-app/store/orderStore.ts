import { create } from 'zustand';
import type { CartItem } from './cartStore';
import type { PaymentMode } from './cartStore';


// ============================================================================
// TYPES
// ============================================================================

/**
 * Order status lifecycle
 */
export type OrderStatus =
    | 'confirmed'
    | 'preparing'
    | 'packed'
    | 'out_for_delivery'
    | 'delivered';

/**


/**
 * Complete order structure
 */
export interface Order {
    id: string;
    items: CartItem[];
    totalMeals: number;
    subtotal: number;
    paymentMode: PaymentMode;
    status: OrderStatus;
    createdAt: string; // ISO string
}

/**
 * Data required to create a new order
 */
export interface CreateOrderData {
    items: CartItem[];
    totalMeals: number;
    subtotal: number;
    paymentMode: PaymentMode;
}


// ============================================================================
// STORE STATE & ACTIONS
// ============================================================================

interface OrderState {
    orders: Order[];

    /**
     * Create a new order with status 'confirmed'
     */
    createOrder: (orderData: CreateOrderData) => void;

    /**
     * Update order status by ID
     */
    updateOrderStatus: (orderId: string, status: OrderStatus) => void;

    /**
     * Get the latest non-delivered order
     */
    getActiveOrder: () => Order | null;

    /**
     * Clear all orders (for testing/logout)
     */
    clearOrders: () => void;
}

// ============================================================================
// ZUSTAND STORE
// ============================================================================

/* ───────────────────────────────
   Lifecycle Simulation Helper
─────────────────────────────── */

const simulateStatusProgression = (
    orderId: string,
    set: any,
    get: () => OrderState
) => {
    const statusFlow: OrderStatus[] = [
        'confirmed',
        'preparing',
        'packed',
        'out_for_delivery',
        'delivered'
    ];

    const progressToNextStatus = () => {
        const { orders } = get();
        const order = orders.find(o => o.id === orderId);

        // Stop if order not found or already delivered
        if (!order || order.status === 'delivered') {
            return;
        }

        // Find current status index
        const currentIndex = statusFlow.indexOf(order.status);

        // Stop if already at last status or invalid status
        if (currentIndex === -1 || currentIndex >= statusFlow.length - 1) {
            return;
        }

        // Get next status
        const nextStatus = statusFlow[currentIndex + 1];

        // Update order status immutably
        set((state: OrderState) => ({
            orders: state.orders.map(o =>
                o.id === orderId
                    ? { ...o, status: nextStatus }
                    : o
            ),
        }));

        // Continue progression after 5 seconds if not delivered yet
        if (nextStatus !== 'delivered') {
            setTimeout(progressToNextStatus, 5000);
        }
    };

    // Start progression after 5 seconds
    setTimeout(progressToNextStatus, 5000);
};



export const useOrderStore = create<OrderState>((set, get) => ({

    orders: [],

    // CREATE ORDER
    createOrder: (orderData: CreateOrderData) => {
        const newOrder: Order = {
            id: Date.now().toString(), // generate here
            ...orderData,
            status: 'confirmed',
            createdAt: new Date().toISOString(),
        };

        set((state) => ({
            orders: [...state.orders, newOrder],
        }));

        // Start automatic status progression
        simulateStatusProgression(newOrder.id, set, get);
    },


    // UPDATE ORDER STATUS
    updateOrderStatus: (orderId: string, status: OrderStatus) => {
        set((state) => ({
            orders: state.orders.map((order) =>
                order.id === orderId
                    ? { ...order, status }
                    : order
            ),
        }));
    },

    // GET ACTIVE ORDER
    getActiveOrder: () => {
        const { orders } = get();

        // Filter out delivered orders
        const activeOrders = orders.filter((order) => order.status !== 'delivered');

        // Return the latest active order (last in array)
        return activeOrders.length > 0
            ? activeOrders[activeOrders.length - 1]
            : null;
    },

    // CLEAR ORDERS
    clearOrders: () => {
        set({ orders: [] });
    },
}));