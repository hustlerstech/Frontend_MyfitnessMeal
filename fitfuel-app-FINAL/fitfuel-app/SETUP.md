# 🚀 MyFitness Meals App - Setup Guide

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

### Required Software

1. **Node.js** (v18 or higher)
   - Download from: https://nodejs.org/
   - Verify installation: `node --version`

2. **npm** or **yarn** (comes with Node.js)
   - Verify installation: `npm --version`

3. **Expo CLI** (will be installed with the project)
   - No global installation needed

4. **Git** (optional, for version control)
   - Download from: https://git-scm.com/

### Development Environment

Choose one or more:

- **iOS Development** (Mac only):
  - Xcode (from Mac App Store)
  - iOS Simulator

- **Android Development**:
  - Android Studio
  - Android SDK
  - Android Emulator

- **Physical Device**:
  - Expo Go app (iOS/Android)
  - Download from App Store/Play Store

---

## 📦 Installation Steps

### Step 1: Extract the ZIP

```bash
# Extract the MyFitness Meals-app.zip file
unzip MyFitness Meals-app.zip
cd MyFitness Meals-app
```

### Step 2: Install Dependencies

```bash
# Using npm
npm install

# OR using yarn
yarn install
```

This will install all required packages:
- expo (~50.0.14)
- expo-router (~3.4.8)
- react (18.2.0)
- react-native (0.73.6)
- And all other dependencies

### Step 3: Start the Development Server

```bash
# Start Expo development server
npm start

# OR
npx expo start
```

You'll see a QR code in the terminal.

---

## 🏃 Running the App

### Option 1: On Your Phone (Easiest)

1. **Install Expo Go**:
   - iOS: Download from App Store
   - Android: Download from Play Store

2. **Scan QR Code**:
   - iOS: Use Camera app to scan QR code
   - Android: Use Expo Go app to scan QR code

3. The app will open in Expo Go!

### Option 2: iOS Simulator (Mac only)

```bash
# Press 'i' in terminal or run:
npm run ios

# OR
npx expo start --ios
```

### Option 3: Android Emulator

```bash
# Make sure Android Studio is installed
# Start an Android emulator first

# Press 'a' in terminal or run:
npm run android

# OR
npx expo start --android
```

### Option 4: Web Browser

```bash
# Press 'w' in terminal or run:
npm run web

# OR
npx expo start --web
```

---

## 📁 Project Structure

```
MyFitness Meals-app/
├── app/                      # Main application code
│   ├── (auth)/              # Authentication screens
│   │   ├── _layout.tsx
│   │   ├── welcome.tsx
│   │   ├── login.tsx
│   │   └── register.tsx
│   ├── (tabs)/              # Tab navigation screens
│   │   ├── _layout.tsx
│   │   ├── index.tsx        # Home screen
│   │   ├── meals.tsx
│   │   ├── tracking.tsx
│   │   └── profile.tsx
│   ├── components/          # Reusable components
│   │   ├── common/          # Common components
│   │   ├── auth/            # Auth components
│   │   ├── meal/            # Meal components
│   │   └── tracking/        # Tracking components
│   ├── constants/           # Theme & constants
│   │   ├── Colors.ts
│   │   ├── Spacing.ts
│   │   ├── Typography.ts
│   │   └── Theme.ts
│   ├── meal-detail.tsx      # Meal detail screen
│   ├── payment.tsx          # Payment screen
│   ├── _layout.tsx          # Root layout
│   └── index.tsx            # Entry point
├── assets/                   # Images, fonts, etc.
├── node_modules/            # Dependencies (after install)
├── app.json                 # Expo configuration
├── package.json             # Dependencies list
├── tsconfig.json            # TypeScript config
└── README.md               # This file
```

---

## 🎨 Theme Configuration

The app uses a custom theme system located in `app/constants/`:

- **Colors**: 70+ predefined colors including primary green (#00D563)
- **Spacing**: 8px-based spacing system
- **Typography**: Poppins font family with 40+ text styles

To customize the theme:

```typescript
// app/constants/Colors.ts
export const Colors = {
  primary: '#00D563',  // Change primary color
  // ... other colors
};
```

---

## 🔧 Configuration

### Fonts (Optional)

To use custom Poppins fonts:

1. Download Poppins fonts from Google Fonts
2. Place .ttf files in `assets/fonts/`
3. Add font loading in `app/_layout.tsx`:

```typescript
import { useFonts } from 'expo-font';

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    'Poppins-Regular': require('../assets/fonts/Poppins-Regular.ttf'),
    'Poppins-Bold': require('../assets/fonts/Poppins-Bold.ttf'),
    // ... other weights
  });
  
  if (!fontsLoaded) return null;
  
  // ... rest of layout
}
```

Currently, the app uses system fonts as fallbacks.

### App Icons & Splash Screen

Replace placeholder assets in `assets/`:
- `icon.png` (1024x1024) - App icon
- `splash.png` (1242x2436) - Splash screen
- `adaptive-icon.png` (1024x1024) - Android adaptive icon
- `favicon.png` (48x48) - Web favicon

Use electric green (#00D563) as the primary brand color.

---

## 🧪 Testing

### Type Checking

```bash
npm run type-check
```

### Linting (if configured)

```bash
npm run lint
```

---

## 📱 Screens Overview

### Authentication Flow
1. **Welcome Screen** - App introduction
2. **Login Screen** - Phone number + OTP verification
3. **Register Screen** - Complete profile setup

### Main App (Tabs)
1. **Home** - Dashboard with meal recommendations
2. **Meals** - Browse and search meals
3. **Tracking** - Progress tracking and activity
4. **Profile** - User profile and settings

### Additional Screens
1. **Meal Detail** - Detailed meal information
2. **Payment** - Subscription plans and payment

---

## 🔌 Backend Integration (Future)

The app is currently UI-only. To integrate a backend:

### 1. Create API Service

```typescript
// app/services/api.ts
const API_BASE_URL = 'https://your-api.com';

export const api = {
  // Auth
  sendOTP: async (phone: string) => {
    const response = await fetch(`${API_BASE_URL}/auth/send-otp`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phone }),
    });
    return response.json();
  },
  
  // Meals
  getMeals: async () => {
    const response = await fetch(`${API_BASE_URL}/meals`);
    return response.json();
  },
  
  // ... other endpoints
};
```

### 2. Replace Mock Data

Current screens use hardcoded data. Replace with API calls:

```typescript
// Before (mock data)
const meals = MOCK_MEALS;

// After (API data)
const [meals, setMeals] = useState([]);
useEffect(() => {
  api.getMeals().then(setMeals);
}, []);
```

### 3. Add State Management

For complex state, add Redux or Zustand:

```bash
npm install zustand
# or
npm install @reduxjs/toolkit react-redux
```

---

## 🎯 Key Features

### ✅ Implemented (UI Only)
- Complete authentication flow (Phone + OTP)
- Home dashboard with stats and charts
- Meal browsing with search and filters
- Detailed meal information
- Progress tracking with circular charts
- User profile management
- Subscription plan selection
- Payment screen (no actual payment)

### ❌ Not Implemented (Backend Needed)
- Actual OTP sending/verification
- Real meal data from API
- Image uploads
- Actual payment processing
- Data persistence
- Push notifications
- Order placement

---

## 🚨 Troubleshooting

### Issue: "Expo command not found"

**Solution**:
```bash
npm install -g expo-cli
# or just use
npx expo start
```

### Issue: "Metro bundler error"

**Solution**:
```bash
# Clear cache
npx expo start -c

# Or
rm -rf node_modules
npm install
```

### Issue: "TypeScript errors"

**Solution**:
```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

### Issue: "App not loading on device"

**Solution**:
1. Make sure device and computer are on same WiFi
2. Restart Expo Go app
3. Scan QR code again
4. Try using tunnel: `npx expo start --tunnel`

### Issue: "Module not found"

**Solution**:
```bash
# Clear watchman (Mac/Linux)
watchman watch-del-all

# Clear Metro bundler
npx expo start -c
```

---

## 📝 Development Tips

### 1. Hot Reload
- Changes auto-reload in Expo Go
- Press 'r' in terminal to reload manually

### 2. Developer Menu
- Shake device to open developer menu
- Or press Cmd+D (iOS) / Cmd+M (Android)

### 3. Debugging
- Use Chrome DevTools: Press 'j' in terminal
- Use React DevTools with Expo

### 4. Console Logs
- View in terminal where `expo start` is running
- Use `console.log()` for debugging

---

## 📚 Documentation References

- **Expo**: https://docs.expo.dev/
- **Expo Router**: https://expo.github.io/router/
- **React Native**: https://reactnative.dev/
- **TypeScript**: https://www.typescriptlang.org/

---

## 🎨 Design System

### Colors
- **Primary**: Electric Green (#00D563)
- **Text**: Dark (#1A1A1A)
- **Background**: White (#FFFFFF)
- **Secondary**: Grey (#666666)

### Typography
- **Font**: Poppins (system font fallback)
- **Sizes**: 10px - 40px
- **Weights**: 300 (Light) - 800 (ExtraBold)

### Spacing
- **Base**: 8px
- **Scale**: 2, 4, 8, 16, 24, 32, 40, 48px

---

## 🔐 Environment Variables (Future)

Create `.env` file for sensitive data:

```bash
API_BASE_URL=https://your-api.com
RAZORPAY_KEY=your_razorpay_key
```

Install dotenv:
```bash
npm install react-native-dotenv
```

---

## 🚀 Building for Production

### iOS (Mac only)

```bash
# Install EAS CLI
npm install -g eas-cli

# Login to Expo account
eas login

# Build
eas build --platform ios
```

### Android

```bash
# Build APK/AAB
eas build --platform android

# Or for local build
npx expo run:android --variant release
```

### Web

```bash
# Build for web
npx expo export:web

# Files will be in web-build/
```

---

## 📦 Publishing

### To Expo Go

```bash
# Publish update
eas update --branch production
```

### To App Stores

1. Build production versions (iOS/Android)
2. Submit to App Store Connect (iOS)
3. Submit to Google Play Console (Android)

Follow Expo's guide: https://docs.expo.dev/submit/introduction/

---

## 🤝 Contributing

This is a complete UI template. To extend:

1. Add new screens in `app/` directory
2. Create new components in `app/components/`
3. Update theme in `app/constants/`
4. Follow existing code style
5. Use TypeScript for type safety

---

## 📄 License

Proprietary - All rights reserved by Hustlers

---

## 💬 Support

For questions or issues:
- Review step-by-step summaries in `STEP_X_SUMMARY.md` files
- Check `COMPONENT_USAGE.md` for component examples
- Read `STRUCTURE.md` for architecture details

---

## ✨ Quick Start Summary

```bash
# 1. Extract ZIP
unzip MyFitness Meals-app.zip
cd MyFitness Meals-app

# 2. Install dependencies
npm install

# 3. Start development server
npm start

# 4. Scan QR code with Expo Go app
# App is now running!
```

---

## 🎉 You're All Set!

The MyFitness Meals app is ready for development. All UI is complete and ready for backend integration.

**Next Steps**:
1. Run the app and explore all screens
2. Customize theme colors/fonts if needed
3. Integrate with your backend API
4. Add real images and assets
5. Test on multiple devices
6. Build and deploy!

**Happy Coding! 🚀**
