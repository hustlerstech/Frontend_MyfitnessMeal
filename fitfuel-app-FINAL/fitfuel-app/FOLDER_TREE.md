# MyFitness Meals App - Current Folder Structure

```
MyFitness Meals-app/
│
├── README.md                          # Project overview and setup instructions
├── STRUCTURE.md                       # Detailed folder structure documentation
│
└── app/                               # Main application directory (Expo Router)
    │
    ├── _layout.tsx                    # Root layout (will be implemented)
    │
    ├── (auth)/                        # 🔐 Authentication Routes (Grouped)
    │   └── index.ts                   # Folder purpose documentation
    │   
    │   Screens to add:
    │   ├── _layout.tsx                (Auth stack navigator)
    │   ├── welcome.tsx                (Welcome/Onboarding)
    │   ├── phone.tsx                  (Phone number entry)
    │   ├── otp.tsx                    (OTP verification)
    │   ├── profile-setup.tsx          (Profile setup)
    │   ├── fitness-goals.tsx          (Fitness goals selection)
    │   ├── dietary-preferences.tsx    (Dietary preferences)
    │   ├── location-setup.tsx         (Location setup)
    │   └── complete.tsx               (Onboarding complete)
    │
    ├── (tabs)/                        # 📱 Main App Tabs (Grouped)
    │   └── index.ts                   # Folder purpose documentation
    │   
    │   Screens to add:
    │   ├── _layout.tsx                (Bottom tab navigator)
    │   ├── index.tsx                  (Home - Explore meals)
    │   ├── orders.tsx                 (Order history)
    │   ├── meal-plan.tsx              (Meal planner)
    │   └── profile.tsx                (User profile)
    │
    ├── components/                    # 🧩 Reusable UI Components
    │   └── index.ts                   # Component organization guide
    │   
    │   To be organized:
    │   ├── common/
    │   │   ├── CustomButton.tsx
    │   │   ├── CustomInput.tsx
    │   │   ├── BackButton.tsx
    │   │   └── LoadingSpinner.tsx
    │   ├── auth/
    │   │   ├── OTPInput.tsx
    │   │   ├── ProgressIndicator.tsx
    │   │   └── SelectableCard.tsx
    │   └── meal/
    │       ├── MealCard.tsx
    │       └── ChefCard.tsx
    │
    ├── constants/                     # 🎨 App Constants
    │   └── index.ts                   # Constants documentation
    │   
    │   Files to create:
    │   ├── Colors.ts                  (Brand colors: #00D563)
    │   ├── Typography.ts              (Poppins font family)
    │   ├── Spacing.ts                 (8px spacing system)
    │   ├── Layout.ts                  (Screen dimensions)
    │   └── ApiEndpoints.ts            (API URLs)
    │
    ├── hooks/                         # 🪝 Custom React Hooks
    │   └── index.ts                   # Hooks documentation
    │   
    │   Files to create:
    │   ├── useAuth.ts                 (Authentication hook)
    │   ├── useApi.ts                  (API wrapper hook)
    │   ├── useForm.ts                 (Form validation)
    │   ├── useDebounce.ts             (Debounce hook)
    │   └── useLocation.ts             (Location services)
    │
    ├── services/                      # 🌐 API Services
    │   └── index.ts                   # Services documentation
    │   
    │   Files to create:
    │   ├── api.ts                     (Base API client)
    │   ├── authService.ts             (Auth APIs)
    │   ├── mealService.ts             (Meal APIs)
    │   ├── orderService.ts            (Order APIs)
    │   ├── paymentService.ts          (Razorpay integration)
    │   └── storageService.ts          (AsyncStorage wrapper)
    │
    ├── store/                         # 🗄️ State Management (Context API)
    │   └── index.ts                   # State management documentation
    │   
    │   Files to create:
    │   ├── AuthContext.tsx            (Authentication state)
    │   ├── CartContext.tsx            (Shopping cart)
    │   ├── MealPlanContext.tsx        (Meal planning)
    │   └── AppContext.tsx             (Root provider wrapper)
    │
    └── types/                         # 📝 TypeScript Type Definitions
        └── index.ts                   # Types documentation
        
        Files to create:
        ├── auth.types.ts              (User, AuthState)
        ├── meal.types.ts              (Meal, Recipe)
        ├── order.types.ts             (Order, OrderStatus)
        ├── chef.types.ts              (Chef, Menu)
        ├── location.types.ts          (Address, Coordinates)
        └── api.types.ts               (ApiResponse, ApiError)


Additional folders to create:
├── assets/                            # Static Assets
│   ├── images/                        (Logo, hero images)
│   ├── fonts/                         (Poppins font files)
│   └── icons/                         (Tab icons, UI icons)
│
├── package.json                       # Dependencies
├── tsconfig.json                      # TypeScript configuration
├── app.json                           # Expo configuration
└── .gitignore                         # Git ignore rules

```

## 📊 Folder Summary

| Folder | Purpose | File Count (Planned) |
|--------|---------|---------------------|
| `(auth)/` | Authentication screens | 9 screens |
| `(tabs)/` | Main app tabs | 5 screens |
| `components/` | Reusable UI components | 10+ components |
| `constants/` | App constants | 5 files |
| `hooks/` | Custom React hooks | 5+ hooks |
| `services/` | API services | 6+ services |
| `store/` | State management | 4 contexts |
| `types/` | TypeScript types | 6+ type files |

## ✅ Current Status
- ✅ Basic folder structure created
- ✅ Documentation files added
- ✅ Index/placeholder files in each folder
- ⏳ Ready for Step 2 (Dependencies & Config)

## 🎯 Next: Step 2
- Install Expo and dependencies
- Set up TypeScript configuration
- Configure app.json
- Add Poppins fonts
