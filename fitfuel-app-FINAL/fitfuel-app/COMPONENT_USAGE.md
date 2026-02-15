# UI Components - Usage Guide

## Overview

This document provides examples and guidelines for using the MyFitness Meals reusable UI components.

All components are fully integrated with the theme system and TypeScript-typed for safety.

---

## Import

```typescript
// Import individual components
import { PrimaryButton, InputField, Card } from '@/components/common';

// Or import everything
import * from '@/components/common';
```

---

## 1. PrimaryButton

Main call-to-action button with electric green background.

### Basic Usage

```typescript
<PrimaryButton
  title="Continue"
  onPress={() => console.log('Pressed')}
/>
```

### With Loading State

```typescript
<PrimaryButton
  title="Logging In..."
  onPress={handleLogin}
  loading={isLoading}
/>
```

### With Icon

```typescript
<PrimaryButton
  title="Add to Cart"
  onPress={handleAddToCart}
  icon={<Icon name="cart" size={20} color="white" />}
/>
```

### Not Full Width

```typescript
<PrimaryButton
  title="Skip"
  onPress={handleSkip}
  fullWidth={false}
/>
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | string | required | Button text |
| `onPress` | () => void | required | Press handler |
| `loading` | boolean | false | Shows spinner |
| `disabled` | boolean | false | Disabled state |
| `fullWidth` | boolean | true | Full width button |
| `icon` | ReactNode | - | Icon before text |
| `style` | ViewStyle | - | Custom style |
| `textStyle` | TextStyle | - | Text style override |

---

## 2. SecondaryButton

Alternative button with light grey background or outline variant.

### Basic Usage

```typescript
<SecondaryButton
  title="Cancel"
  onPress={handleCancel}
/>
```

### Outline Variant

```typescript
<SecondaryButton
  title="Learn More"
  onPress={handleLearnMore}
  outline={true}
/>
```

### With Loading

```typescript
<SecondaryButton
  title="Saving..."
  onPress={handleSave}
  loading={isSaving}
/>
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | string | required | Button text |
| `onPress` | () => void | required | Press handler |
| `loading` | boolean | false | Shows spinner |
| `disabled` | boolean | false | Disabled state |
| `fullWidth` | boolean | true | Full width button |
| `outline` | boolean | false | Outline variant |
| `icon` | ReactNode | - | Icon before text |
| `style` | ViewStyle | - | Custom style |
| `textStyle` | TextStyle | - | Text style override |

---

## 3. Card

Versatile container for content with optional shadow or border.

### Basic Card

```typescript
<Card>
  <Text>Card content goes here</Text>
</Card>
```

### Elevated Card (with shadow)

```typescript
<Card elevated>
  <Text style={Theme.textStyles.cardTitle}>Meal Name</Text>
  <Text style={Theme.textStyles.cardSubtitle}>Description</Text>
</Card>
```

### Outlined Card

```typescript
<Card outlined>
  <Text>Content with border</Text>
</Card>
```

### Pressable Card

```typescript
<Card 
  onPress={() => navigation.navigate('MealDetails')}
  elevated
>
  <Text>Tap to view details</Text>
</Card>
```

### Custom Padding/Margin

```typescript
<Card 
  padding={24}
  margin={8}
  elevated
>
  <Text>Custom spacing</Text>
</Card>
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | ReactNode | required | Card content |
| `elevated` | boolean | false | Add shadow |
| `outlined` | boolean | false | Add border |
| `onPress` | () => void | - | Makes card pressable |
| `padding` | number | 16 | Custom padding |
| `margin` | number | 16 | Custom margin |
| `style` | ViewStyle | - | Custom style |

---

## 4. SectionHeader

Header for organizing content sections with optional action button.

### Basic Header

```typescript
<SectionHeader 
  title="Popular Meals"
/>
```

### With Subtitle

```typescript
<SectionHeader 
  title="Your Orders"
  subtitle="Recent activity"
/>
```

### With Action Button

```typescript
<SectionHeader 
  title="Recommended for You"
  actionText="View All"
  onActionPress={() => navigation.navigate('AllMeals')}
/>
```

### Complete Example

```typescript
<SectionHeader 
  title="Top Chefs"
  subtitle="Highly rated in your area"
  actionText="See More"
  onActionPress={handleSeeMore}
/>
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | string | required | Section title |
| `subtitle` | string | - | Optional subtitle |
| `actionText` | string | - | Action button text |
| `onActionPress` | () => void | - | Action handler |
| `titleStyle` | TextStyle | - | Title style override |
| `subtitleStyle` | TextStyle | - | Subtitle style override |
| `style` | ViewStyle | - | Container style |

---

## 5. StatCard

Display statistics or key metrics.

### Basic Stat

```typescript
<StatCard 
  value="1,234"
  label="Total Orders"
/>
```

### With Icon

```typescript
<StatCard 
  value="85%"
  label="Success Rate"
  icon={<Icon name="check-circle" size={24} color={Theme.colors.success} />}
/>
```

### With Trend

```typescript
<StatCard 
  value="2,450"
  label="Calories Today"
  trend="+12%"
  trendDirection="up"
/>
```

### Custom Color

```typescript
<StatCard 
  value="156g"
  label="Protein"
  valueColor={Theme.colors.protein}
/>
```

### Pressable Stat

```typescript
<StatCard 
  value="45"
  label="Active Meals"
  onPress={() => navigation.navigate('MealPlan')}
/>
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | string \| number | required | Main value |
| `label` | string | required | Stat description |
| `icon` | ReactNode | - | Optional icon |
| `trend` | string | - | Trend text (e.g., "+12%") |
| `trendDirection` | 'up' \| 'down' \| 'neutral' | 'neutral' | Trend color |
| `valueColor` | string | - | Custom value color |
| `onPress` | () => void | - | Makes pressable |
| `style` | ViewStyle | - | Custom style |
| `valueStyle` | TextStyle | - | Value style override |
| `labelStyle` | TextStyle | - | Label style override |

---

## 6. InputField

Text input with validation, error handling, and icons.

### Basic Input

```typescript
<InputField
  label="Full Name"
  value={name}
  onChangeText={setName}
  placeholder="Enter your name"
/>
```

### With Error

```typescript
<InputField
  label="Email"
  value={email}
  onChangeText={setEmail}
  placeholder="your@email.com"
  error={emailError}
  keyboardType="email-address"
/>
```

### Password Input

```typescript
<InputField
  label="Password"
  value={password}
  onChangeText={setPassword}
  placeholder="Enter password"
  secureTextEntry
/>
```

### With Left Icon

```typescript
<InputField
  value={search}
  onChangeText={setSearch}
  placeholder="Search meals..."
  leftIcon={<Icon name="search" size={20} />}
/>
```

### With Character Count

```typescript
<InputField
  label="Bio"
  value={bio}
  onChangeText={setBio}
  placeholder="Tell us about yourself"
  multiline
  numberOfLines={4}
  maxLength={200}
  showCharacterCount
/>
```

### With Helper Text

```typescript
<InputField
  label="Phone Number"
  value={phone}
  onChangeText={setPhone}
  placeholder="10-digit number"
  keyboardType="phone-pad"
  helperText="We'll send you an OTP"
/>
```

### Complete Form Example

```typescript
<View>
  <InputField
    label="Full Name"
    value={name}
    onChangeText={setName}
    placeholder="John Doe"
    error={errors.name}
  />
  
  <InputField
    label="Email"
    value={email}
    onChangeText={setEmail}
    placeholder="john@example.com"
    keyboardType="email-address"
    error={errors.email}
    leftIcon={<Icon name="mail" size={20} />}
  />
  
  <InputField
    label="Password"
    value={password}
    onChangeText={setPassword}
    placeholder="Min 8 characters"
    secureTextEntry
    error={errors.password}
  />
</View>
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | string | - | Input label |
| `value` | string | required | Input value |
| `onChangeText` | (text: string) => void | required | Change handler |
| `placeholder` | string | - | Placeholder text |
| `error` | string | - | Error message |
| `helperText` | string | - | Helper text |
| `leftIcon` | ReactNode | - | Left icon |
| `rightIcon` | ReactNode | - | Right icon |
| `secureTextEntry` | boolean | false | Password input |
| `showCharacterCount` | boolean | false | Show counter |
| `maxLength` | number | - | Max length |
| `disabled` | boolean | false | Disabled state |
| `multiline` | boolean | false | Multiline input |
| `numberOfLines` | number | 1 | Lines (multiline) |
| `containerStyle` | ViewStyle | - | Container style |
| `inputStyle` | TextStyle | - | Input style |
| `labelStyle` | TextStyle | - | Label style |

Plus all standard TextInput props (keyboardType, autoCapitalize, etc.)

---

## Combined Examples

### Login Screen Example

```typescript
import { PrimaryButton, SecondaryButton, InputField } from '@/components/common';

const LoginScreen = () => {
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  return (
    <View>
      <InputField
        label="Phone Number"
        value={phone}
        onChangeText={setPhone}
        placeholder="Enter 10-digit number"
        keyboardType="phone-pad"
        maxLength={10}
        error={error}
        leftIcon={<Icon name="phone" />}
      />
      
      <PrimaryButton
        title="Get OTP"
        onPress={handleGetOTP}
        loading={loading}
        disabled={phone.length !== 10}
      />
      
      <SecondaryButton
        title="Login with Email"
        onPress={handleEmailLogin}
        outline
      />
    </View>
  );
};
```

### Dashboard Stats Example

```typescript
import { SectionHeader, StatCard } from '@/components/common';

const Dashboard = () => {
  return (
    <View>
      <SectionHeader 
        title="Your Stats"
        subtitle="This week"
      />
      
      <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
        <StatCard 
          value="1,850"
          label="Calories"
          icon={<Icon name="fire" />}
          trend="-5%"
          trendDirection="down"
        />
        
        <StatCard 
          value="12"
          label="Meals"
          icon={<Icon name="utensils" />}
        />
        
        <StatCard 
          value="85%"
          label="On Track"
          icon={<Icon name="target" />}
          valueColor={Theme.colors.success}
        />
      </View>
    </View>
  );
};
```

### Meal List Example

```typescript
import { SectionHeader, Card } from '@/components/common';

const MealList = () => {
  return (
    <View>
      <SectionHeader 
        title="Popular Meals"
        actionText="View All"
        onActionPress={() => navigation.navigate('AllMeals')}
      />
      
      {meals.map(meal => (
        <Card 
          key={meal.id}
          elevated
          onPress={() => navigation.navigate('MealDetails', { id: meal.id })}
        >
          <Text style={Theme.textStyles.cardTitle}>{meal.name}</Text>
          <Text style={Theme.textStyles.cardSubtitle}>{meal.description}</Text>
        </Card>
      ))}
    </View>
  );
};
```

---

## Best Practices

### 1. Consistent Spacing
Use theme spacing values:
```typescript
<View style={{ 
  padding: Theme.spacing.md,
  gap: Theme.spacing.sm 
}}>
```

### 2. Typography
Use theme text styles:
```typescript
<Text style={Theme.textStyles.h1}>Title</Text>
<Text style={Theme.textStyles.body}>Body text</Text>
```

### 3. Colors
Use theme colors:
```typescript
<View style={{ 
  backgroundColor: Theme.colors.background,
  borderColor: Theme.colors.border 
}}>
```

### 4. Accessibility
All components include:
- Proper accessibility roles
- Labels for screen readers
- Appropriate touch targets (min 44x44)

### 5. Error Handling
Show validation errors:
```typescript
<InputField
  value={email}
  onChangeText={setEmail}
  error={!isValidEmail(email) ? 'Invalid email' : ''}
/>
```

---

## Testing Components

```typescript
import { render, fireEvent } from '@testing-library/react-native';
import { PrimaryButton } from '@/components/common';

test('button press', () => {
  const onPress = jest.fn();
  const { getByText } = render(
    <PrimaryButton title="Click Me" onPress={onPress} />
  );
  
  fireEvent.press(getByText('Click Me'));
  expect(onPress).toHaveBeenCalled();
});
```

---

END OF COMPONENT USAGE GUIDE
