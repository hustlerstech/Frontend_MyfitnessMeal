import { create } from 'zustand';
import { useSubscriptionStore } from './subscriptionStore';

// ============================================================================
// TYPES
// ============================================================================

/**
 * Meal slot types (2 per day)
 */
export type Slot = 'breakfast' | 'lunch' | 'dinner';

/**
 * Planned meal structure
 */
export interface PlannedMeal {
    id: string;
    name: string;
}

/**
 * Single day's meal plan
 */
export interface DayPlan {
    date: string;
    breakfast?: PlannedMeal;
    lunch?: PlannedMeal;
    dinner?: PlannedMeal;
}


// ============================================================================
// HELPERS
// ============================================================================

/**
 * Generate 7 consecutive days starting from today
 */
const generateWeekDays = (): DayPlan[] => {
    const days: DayPlan[] = [];
    const today = new Date();

    for (let i = 0; i < 7; i++) {
        const date = new Date(today);
        date.setDate(today.getDate() + i);
        days.push({
            date: date.toISOString().split('T')[0], // YYYY-MM-DD format
        });
    }

    return days;
};

/**
 * Compute total planned meals across the week
 */
const computeTotalMeals = (weekPlan: DayPlan[]): number => {
    return weekPlan.reduce((total, day) => {
        let count = 0;
        if (day.breakfast) count++;
        if (day.lunch) count++;
        if (day.dinner) count++;

        return total + count;
    }, 0);
};

// ============================================================================
// STORE STATE & ACTIONS
// ============================================================================

interface PlannerState {
    weekPlan: DayPlan[];
    totalPlannedMeals: number; // Derived from weekPlan
    getTodayPlan: () => DayPlan | null;

    /**
     * Set a meal for a specific date and slot
     * Blocked if subscription doesn't allow planner
     */
    setMeal: (date: string, slot: Slot, meal: PlannedMeal) => void;

    /**
     * Remove a meal from a specific date and slot
     * Blocked if subscription doesn't allow planner
     */
    removeMeal: (date: string, slot: Slot) => void;

    /**
     * Clear all planned meals for the week
     */
    clearWeek: () => void;
}

// ============================================================================
// ZUSTAND STORE
// ============================================================================

export const usePlannerStore = create<PlannerState>((set, get) => ({
    weekPlan: generateWeekDays(),
    totalPlannedMeals: 0,
    getTodayPlan: () => {
        const today = new Date().toISOString().split('T')[0];
        return get().weekPlan.find((day) => day.date === today);
    },

    // SET MEAL
    setMeal: (date: string, slot: Slot, meal: PlannedMeal) => {
        // Check subscription permission
        const canUsePlanner = useSubscriptionStore.getState().canUsePlanner;
        if (!canUsePlanner) {
            return; // Block update when subscription paused/expired
        }

        set((state) => {
            const newWeekPlan = state.weekPlan.map((day) =>
                day.date === date
                    ? { ...day, [slot]: meal }
                    : day
            );

            return {
                weekPlan: newWeekPlan,
                totalPlannedMeals: computeTotalMeals(newWeekPlan),
            };
        });
    },

    // REMOVE MEAL
    removeMeal: (date: string, slot: Slot) => {
        // Check subscription permission
        const canUsePlanner = useSubscriptionStore.getState().canUsePlanner;
        if (!canUsePlanner) {
            return; // Block update when subscription paused/expired
        }

        set((state) => {
            const newWeekPlan = state.weekPlan.map((day) =>
                day.date === date
                    ? { ...day, [slot]: undefined }
                    : day
            );

            return {
                weekPlan: newWeekPlan,
                totalPlannedMeals: computeTotalMeals(newWeekPlan),
            };
        });
    },

    // CLEAR WEEK
    clearWeek: () => {
        const newWeekPlan = generateWeekDays();
        set({
            weekPlan: newWeekPlan,
            totalPlannedMeals: computeTotalMeals(newWeekPlan),
        });
    },
}));