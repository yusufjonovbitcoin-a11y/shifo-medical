'use client';

import React from 'react';
import { cn } from '@/src/new-ui/utils/cn';

export interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  variant?: 'default' | 'gradient' | 'primary' | 'secondary';
  align?: 'left' | 'center' | 'right';
}

const headingStyles = {
  h1: 'text-4xl md:text-5xl lg:text-6xl font-bold',
  h2: 'text-3xl md:text-4xl lg:text-5xl font-semibold',
  h3: 'text-2xl md:text-3xl font-semibold',
  h4: 'text-xl md:text-2xl font-semibold',
  h5: 'text-lg md:text-xl font-medium',
  h6: 'text-base md:text-lg font-medium',
};

export const Heading = React.forwardRef<HTMLHeadingElement, HeadingProps>(
  (
    {
      className,
      as = 'h2',
      variant = 'default',
      align = 'left',
      children,
      ...props
    },
    ref
  ) => {
    const Component = as;

    const variants = {
      default: 'text-neutral-900',
      gradient: 'bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent',
      primary: 'text-primary-600',
      secondary: 'text-secondary-600',
    };

    const aligns = {
      left: 'text-left',
      center: 'text-center',
      right: 'text-right',
    };

    return (
      <Component
        ref={ref}
        className={cn(
          headingStyles[as],
          variants[variant],
          aligns[align],
          className
        )}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

Heading.displayName = 'Heading';


