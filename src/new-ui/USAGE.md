# Modern UI - Usage Guide

## Quick Start

### 1. Install Dependencies

```bash
npm install clsx
```

### 2. Import Components

```tsx
import { Button, Card, Badge } from '@/src/new-ui';
```

### 3. Use Components

```tsx
<Button variant="primary" size="lg">
  Click me
</Button>

<Card variant="elevated" hover>
  <CardHeader>
    <CardTitle>Title</CardTitle>
  </CardHeader>
  <CardContent>
    Content here
  </CardContent>
</Card>
```

## Component Examples

### Button

```tsx
<Button variant="primary" size="md" isLoading={false}>
  Submit
</Button>

<Button variant="outline" leftIcon={<Icon />}>
  With Icon
</Button>
```

### Card

```tsx
<Card variant="elevated" hover padding="lg">
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
    <CardDescription>Card description</CardDescription>
  </CardHeader>
  <CardContent>
    Card content
  </CardContent>
</Card>
```

### Hero Section

```tsx
<HeroSection
  badge="Medical Center"
  title="Your Health is Our Priority"
  description="Modern medical center..."
  primaryCTA={{ label: 'Book Appointment', href: '#appointment' }}
  stats={[
    { value: '50+', label: 'Operations' },
    { value: '15+', label: 'Doctors' },
  ]}
/>
```

### Features Section

```tsx
<FeaturesSection
  badge="Services"
  title="Our Services"
  features={[
    {
      icon: <Icon />,
      title: 'Service Name',
      description: 'Service description',
    },
  ]}
  columns={3}
/>
```

## Design System

All components use the centralized design tokens:
- Colors: Primary, Secondary, Neutral
- Spacing: xs, sm, md, lg, xl
- Typography: Consistent font sizes and weights
- Shadows: Subtle elevation system

## Styling

Import the global styles in your root layout:

```tsx
import '@/src/new-ui/styles/globals.css';
```

## Full Example

See `src/new-ui/examples/ExamplePage.tsx` for a complete example.


