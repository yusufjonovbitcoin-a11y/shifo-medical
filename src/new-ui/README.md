# Modern UI Component Library

A modern, reusable component library for the SHIFOKOR-LDA medical center website.

## Structure

```
src/new-ui/
├── components/          # Reusable UI components
│   ├── ui/             # Base UI components
│   ├── layout/         # Layout components
│   └── sections/          # Page sections
├── styles/             # Global styles and design tokens
├── hooks/              # Custom React hooks
└── utils/              # Utility functions
```

## Features

- 🎨 Modern design system
- 📱 Fully responsive
- ♿ Accessible components
- 🚀 Performance optimized
- 🎯 Type-safe with TypeScript
- 🔄 Reusable components

## Installation

Install required dependency:

```bash
npm install clsx
```

## Usage

Import components from the new-ui folder:

```tsx
import { Button, Card, Badge } from '@/src/new-ui';
```

Or import individual components:

```tsx
import { Button } from '@/src/new-ui/components/ui/Button';
import { Card } from '@/src/new-ui/components/ui/Card';
```

## Documentation

- See `USAGE.md` for detailed usage examples
- See `examples/ExamplePage.tsx` for a complete example

