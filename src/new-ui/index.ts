/**
 * Modern UI Component Library
 * Main export file
 */

// UI Components
export { Button, type ButtonProps } from './components/ui/Button';
export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter, type CardProps } from './components/ui/Card';
export { Badge, type BadgeProps } from './components/ui/Badge';
export { Input, type InputProps } from './components/ui/Input';
export { Container, type ContainerProps } from './components/ui/Container';
export { Section, type SectionProps } from './components/ui/Section';
export { Heading, type HeadingProps } from './components/ui/Heading';
export { Text, type TextProps } from './components/ui/Text';

// Layout Components
export { Header, type HeaderProps } from './components/layout/Header';
export { Footer, type FooterProps } from './components/layout/Footer';

// Section Components
export { HeroSection, type HeroSectionProps } from './components/sections/HeroSection';
export { FeaturesSection, type FeaturesSectionProps, type Feature } from './components/sections/FeaturesSection';

// Hooks
export { useIntersectionObserver } from './hooks/useIntersectionObserver';

// Utils
export { cn } from './utils/cn';

// Design Tokens
export { colors, spacing, borderRadius, shadows, typography, breakpoints, transitions } from './styles/design-tokens';

