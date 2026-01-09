'use client';

import React from 'react';
import { cn } from '@/src/new-ui/utils/cn';
import { Container } from './Container';

export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  variant?: 'default' | 'primary' | 'secondary' | 'neutral';
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  containerSize?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
}

export const Section = React.forwardRef<HTMLElement, SectionProps>(
  (
    {
      className,
      variant = 'default',
      padding = 'lg',
      containerSize = 'lg',
      children,
      ...props
    },
    ref
  ) => {
    const variants = {
      default: 'bg-white',
      primary: 'bg-gradient-to-br from-primary-50 to-primary-100',
      secondary: 'bg-gradient-to-br from-secondary-50 to-secondary-100',
      neutral: 'bg-neutral-50',
    };

    const paddings = {
      none: '',
      sm: 'py-8 md:py-12',
      md: 'py-12 md:py-16',
      lg: 'py-16 md:py-24',
      xl: 'py-24 md:py-32',
    };

    return (
      <section
        ref={ref}
        className={cn(variants[variant], paddings[padding], className)}
        {...props}
      >
        <Container size={containerSize}>
          {children}
        </Container>
      </section>
    );
  }
);

Section.displayName = 'Section';


