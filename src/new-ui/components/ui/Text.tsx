'use client';

import React from 'react';
import { cn } from '@/src/new-ui/utils/cn';

export interface TextProps extends React.HTMLAttributes<HTMLParagraphElement> {
  as?: 'p' | 'span' | 'div';
  variant?: 'body' | 'small' | 'large' | 'lead';
  color?: 'default' | 'muted' | 'primary' | 'secondary';
  align?: 'left' | 'center' | 'right';
  weight?: 'normal' | 'medium' | 'semibold' | 'bold';
}

export const Text = React.forwardRef<HTMLParagraphElement, TextProps>(
  (
    {
      className,
      as = 'p',
      variant = 'body',
      color = 'default',
      align = 'left',
      weight = 'normal',
      children,
      ...props
    },
    ref
  ) => {
    const Component = as;

    const variants = {
      body: 'text-base',
      small: 'text-sm',
      large: 'text-lg',
      lead: 'text-xl leading-relaxed',
    };

    const colors = {
      default: 'text-neutral-900',
      muted: 'text-neutral-600',
      primary: 'text-primary-600',
      secondary: 'text-secondary-600',
    };

    const weights = {
      normal: 'font-normal',
      medium: 'font-medium',
      semibold: 'font-semibold',
      bold: 'font-bold',
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
          variants[variant],
          colors[color],
          weights[weight],
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

Text.displayName = 'Text';


