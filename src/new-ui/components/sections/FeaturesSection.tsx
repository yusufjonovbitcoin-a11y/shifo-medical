'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../ui/Card';
import { Section } from '../ui/Section';
import { Heading } from '../ui/Heading';
import { Text } from '../ui/Text';
import { Badge } from '../ui/Badge';

export interface Feature {
  icon?: React.ReactNode;
  title: string;
  description: string;
  badge?: string;
}

export interface FeaturesSectionProps {
  badge?: string;
  title: string;
  description?: string;
  features: Feature[];
  columns?: 2 | 3 | 4;
}

export const FeaturesSection: React.FC<FeaturesSectionProps> = ({
  badge = 'Услуги',
  title = 'Наши услуги',
  description,
  features,
  columns = 3,
}) => {
  const gridCols = {
    2: 'md:grid-cols-2',
    3: 'md:grid-cols-3',
    4: 'md:grid-cols-4',
  };

  return (
    <Section variant="default" padding="lg">
      <div className="text-center mb-12">
        {badge && (
          <Badge variant="primary" size="lg" className="mb-4">
            {badge}
          </Badge>
        )}
        <Heading as="h2" variant="default" align="center" className="mb-4">
          {title}
        </Heading>
        {description && (
          <Text variant="large" color="muted" align="center" className="max-w-2xl mx-auto">
            {description}
          </Text>
        )}
      </div>

      <div className={`grid grid-cols-1 ${gridCols[columns]} gap-6 md:gap-8`}>
        {features.map((feature, index) => (
          <Card key={index} variant="elevated" hover padding="lg">
            <CardHeader>
              {feature.icon && (
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4 text-primary-600">
                  {feature.icon}
                </div>
              )}
              {feature.badge && (
                <Badge variant="primary" size="sm" className="mb-2">
                  {feature.badge}
                </Badge>
              )}
              <CardTitle className="text-xl">{feature.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>{feature.description}</CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>
    </Section>
  );
};


