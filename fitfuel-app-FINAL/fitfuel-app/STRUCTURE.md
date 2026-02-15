# MyFitness Meals Project Structure - Complete Overview

## 📁 Folder Structure Breakdown

### **1. `/app/(auth)/` - Authentication Routes**
**Purpose**: Contains all authentication and onboarding screens

**Why Parentheses?**
- In Expo Router, parentheses `()` create a "route group"
- URLs won't include `(auth)` - e.g., `/phone` not `/(auth)/phone`
- Allows grouping related screens without affecting URL structure
- Can have its own `_layout.tsx` for auth-specific navigation

**Screens to Add**:
- `_layout.tsx` - Auth stack navigator
- `welcome.tsx` - Welcome/Onboarding screen with hero image
- `phone.tsx` - Phone number entry (+91 format)
- `otp.tsx` - OTP verification (6-digit)
- `profile-setup.tsx` - New user profile (name, email, photo)
- `fitness-goals.tsx` - Select fitness goal
- `dietary-preferences.tsx` - Select dietary preference
- `location-setup.tsx` - Location selection/entry
- `complete.tsx` - Onboarding completion success screen

---

### **2. `/app/(tabs)/` - Main App Tabs**
**Purpose**: Main application screens accessible via bottom tab navigation

**Why Parentheses?**
- Groups main app screens together
- URLs are clean: `/` for home, `/orders`, `/profile`
- Has own `_layout.tsx` with TabNavigator configuration

**Screens to Add**:
- `_layout.tsx` - Bottom tab navigator
- `index.tsx` - Home/Explore meals (default tab)
- `orders.tsx` - Order history and tracking
- `meal-plan.tsx` - Weekly meal planner
- `profile.tsx` - User profile and settings

---

### **3. `/app/components/` - Reusable Components**
**Purpose**: Shared UI components used across multiple screens

**Organization**:
```
components/
├── common/
│   ├── CustomButton.tsx
│   ├── CustomInput.tsx
│   ├── BackButton.tsx
│   ├── LoadingSpinner.tsx
│   └── ErrorMessage.tsx
├── auth/
│   ├── OTPInput.tsx
│   ├── ProgressIndicator.tsx
│   └── SelectableCard.tsx
└── meal/
    ├── MealCard.tsx
    ├── ChefCard.tsx
    └── NutritionInfo.tsx
```

**Benefits**:
- DRY principle (Don't Repeat Yourself)
- Consistent UI across app
- Easy to update styling globally
- Easier testing and maintenance

---

### **4. `/app/constants/` - App Constants**
**Purpose**: Centralized constant values for consistency

**Files to Create**:
- **Colors.ts**: Brand colors, theme palette
  ```typescript
  export const Colors = {
    primary: '#00D563',      // Electric Green
    secondary: '#1A1A1A',    // Dark
    background: '#FFFFFF',   // White
    text: '#1A1A1A',         // Dark text
    textLight: '#666666',    // Gray text
    border: '#E0E0E0',       // Borders
    error: '#FF3B30',        // Error red
    success: '#00D563',      // Success green
  };
  ```

- **Typography.ts**: Font configuration
  ```typescript
  export const Typography = {
    fontFamily: {
      regular: 'Poppins-Regular',
      medium: 'Poppins-Medium',
      semiBold: 'Poppins-SemiBold',
      bold: 'Poppins-Bold',
    },
    fontSize: {
      xs: 12,
      sm: 14,
      base: 16,
      lg: 18,
      xl: 24,
      xxl: 32,
    },
  };
  ```

- **Spacing.ts**: Spacing system (8px base)
  ```typescript
  export const Spacing = {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 40,
  };
  ```

- **Layout.ts**: Screen dimensions, breakpoints
- **ApiEndpoints.ts**: API URLs
- **Config.ts**: App configuration

---

### **5. `/app/hooks/` - Custom React Hooks**
**Purpose**: Reusable logic encapsulated in custom hooks

**Why Use Custom Hooks?**
- Separation of logic from UI
- Reusable across components
- Easier testing
- Cleaner component code

**Hooks to Create**:
- **useAuth.ts**: Authentication state and methods
  ```typescript
  // Usage: const { user, login, logout, isAuthenticated } = useAuth();
  ```

- **useApi.ts**: API calls with loading/error handling
  ```typescript
  // Usage: const { data, loading, error, refetch } = useApi('/meals');
  ```

- **useForm.ts**: Form validation and state
- **useDebounce.ts**: Debounce for search inputs
- **useKeyboard.ts**: Keyboard visibility detection
- **useLocation.ts**: Location services wrapper

---

### **6. `/app/services/` - API Services**
**Purpose**: All backend communication and external service integration

**Why Separate Services?**
- Single source of truth for API calls
- Easy to mock for testing
- Can switch backend without changing components
- Centralized error handling

**Services to Create**:
- **api.ts**: Base API client (axios configuration)
  ```typescript
  import axios from 'axios';
  
  const api = axios.create({
    baseURL: 'https://api.MyFitness Meals.com',
    timeout: 10000,
    headers: {
      'Content-Type': 'application/json',
    },
  });
  
  export default api;
  ```

- **authService.ts**: Authentication APIs
  ```typescript
  export const authService = {
    sendOTP: (phoneNumber: string) => api.post('/auth/send-otp', { phoneNumber }),
    verifyOTP: (phoneNumber: string, otp: string) => api.post('/auth/verify-otp', { phoneNumber, otp }),
    completeProfile: (data: ProfileData) => api.post('/auth/complete-profile', data),
  };
  ```

- **mealService.ts**: Meal-related APIs
- **orderService.ts**: Order management
- **paymentService.ts**: Payment integration (Razorpay)
- **storageService.ts**: AsyncStorage wrapper

---

### **7. `/app/store/` - State Management**
**Purpose**: Global state management using React Context API

**Why Context API?**
- Built into React (no extra dependencies)
- Sufficient for most apps
- Easy to understand
- Can be upgraded to Redux/Zustand later if needed

**Contexts to Create**:
- **AuthContext.tsx**: User authentication state
  ```typescript
  interface AuthState {
    isAuthenticated: boolean;
    user: User | null;
    token: string | null;
    isLoading: boolean;
  }
  ```

- **CartContext.tsx**: Shopping cart state
- **MealPlanContext.tsx**: Meal planning state
- **AppContext.tsx**: Root provider wrapper

**Usage Pattern**:
```typescript
// Provider in _layout.tsx
<AuthProvider>
  <CartProvider>
    <App />
  </CartProvider>
</AuthProvider>

// Consumer in any component
const { user, login } = useAuth();
```

---

### **8. `/app/types/` - TypeScript Definitions**
**Purpose**: Type safety across the entire application

**Why TypeScript?**
- Catch errors at compile time
- Better IDE autocomplete
- Self-documenting code
- Safer refactoring

**Type Files to Create**:
- **auth.types.ts**:
  ```typescript
  export interface User {
    id: string;
    phoneNumber: string;
    fullName: string;
    email?: string;
    profilePicture?: string;
    fitnessGoal?: FitnessGoal;
    dietaryPreference?: DietaryPreference;
    location?: Address;
  }
  
  export type FitnessGoal = 'weight_loss' | 'muscle_gain' | 'stay_fit';
  export type DietaryPreference = 'vegetarian' | 'non_vegetarian' | 'vegan' | 'eggetarian';
  ```

- **meal.types.ts**: Meal, Recipe, NutritionalInfo
- **order.types.ts**: Order, OrderItem, OrderStatus
- **api.types.ts**: Generic API response types

---

## 🎯 Additional Folders (To Be Created)

### **`/assets/`** - Static Assets
```
assets/
├── images/
│   ├── logo.png
│   ├── welcome-hero.png
│   └── placeholders/
├── fonts/
│   ├── Poppins-Regular.ttf
│   ├── Poppins-Medium.ttf
│   ├── Poppins-SemiBold.ttf
│   └── Poppins-Bold.ttf
└── icons/
    ├── home.png
    ├── orders.png
    └── profile.png
```

---

## 📱 Expo Router File Naming Conventions

### **Special Files**:
- `_layout.tsx` - Layout/Navigator for that route level
- `index.tsx` - Default route (e.g., `/` goes to `index.tsx`)
- `[id].tsx` - Dynamic route (e.g., `/meal/123` maps to `[id].tsx`)
- `(folder)/` - Route group (parentheses hide from URL)

### **Examples**:
```
app/
├── _layout.tsx           → Root layout
├── index.tsx             → Landing page (/)
├── (auth)/
│   ├── _layout.tsx       → Auth stack navigator
│   ├── phone.tsx         → /phone
│   └── otp.tsx           → /otp
├── (tabs)/
│   ├── _layout.tsx       → Tab navigator
│   ├── index.tsx         → / (home tab)
│   └── orders.tsx        → /orders
└── meal/
    └── [id].tsx          → /meal/:id (dynamic route)
```

---

## 🔄 Navigation Flow

```
Splash (auto-navigate)
  ↓
App Entry Point (_layout.tsx checks auth)
  ↓
  ├─→ Authenticated? → (tabs)/_layout.tsx → Bottom Tabs
  │                       ├── Home
  │                       ├── Orders
  │                       ├── Meal Plan
  │                       └── Profile
  │
  └─→ Not Authenticated? → (auth)/_layout.tsx → Auth Stack
                              ├── Welcome
                              ├── Phone Entry
                              ├── OTP
                              └── Onboarding (if new user)
```

---

## 🎨 Design System Integration

All constants will align with MyFitness Meals's design system:
- **Primary**: Electric Green (#00D563)
- **Typography**: Poppins family
- **Spacing**: 8px base unit (8, 16, 24, 32, 40)
- **Border Radius**: 12px buttons, 8px inputs
- **Style**: Flat, modern, food delivery aesthetic

---

## 📦 Dependencies (To Be Installed)

```json
{
  "dependencies": {
    "expo": "~50.0.0",
    "expo-router": "~3.4.0",
    "react-native": "0.73.0",
    "react": "18.2.0",
    "axios": "^1.6.0",
    "@react-native-async-storage/async-storage": "1.21.0",
    "expo-linear-gradient": "~12.7.0",
    "expo-image-picker": "~14.7.0",
    "expo-location": "~16.5.0"
  },
  "devDependencies": {
    "@types/react": "~18.2.0",
    "@types/react-native": "~0.73.0",
    "typescript": "^5.3.0"
  }
}
```

---

## ✅ Next Steps

**Step 2**: Install dependencies and set up Expo project
**Step 3**: Create constants (Colors, Typography, Spacing)
**Step 4**: Build reusable components (CustomButton, CustomInput, etc.)
**Step 5**: Create TypeScript types
**Step 6**: Set up Context providers (AuthContext)
**Step 7**: Create API services
**Step 8**: Build authentication screens
**Step 9**: Build main app tabs
**Step 10**: Testing and final ZIP delivery

---

END OF STRUCTURE DOCUMENTATION
