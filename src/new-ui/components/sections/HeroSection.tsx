'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Check } from 'lucide-react';
import { Button } from '../ui/Button';
import { Container } from '../ui/Container';
import { Heading } from '../ui/Heading';
import { Text } from '../ui/Text';
import { Badge } from '../ui/Badge';

export interface HeroSectionProps {
  badge?: string;
  title: string;
  description: string;
  primaryCTA?: { label: string; href: string };
  secondaryCTA?: { label: string; href: string };
  features?: string[];
  stats?: Array<{ value: string; label: string }>;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  badge = 'Медицинский центр',
  title = 'Ваше здоровье - наш приоритет',
  description = 'Современный медицинский центр в Самарканде. Более 50 видов операций, высококвалифицированные специалисты и передовые технологии.',
  primaryCTA = { label: 'Записаться на приём', href: '#appointment' },
  secondaryCTA = { label: 'Узнать больше', href: '#about' },
  features = [
    '50+ видов операций',
    '15+ опытных врачей',
    '20+ лет опыта',
  ],
  stats = [
    { value: '50+', label: 'Виды операций' },
    { value: '15+', label: 'Опытные врачи' },
    { value: '20+', label: 'Лет опыта' },
  ],
}) => {
  return (
    <section className="relative bg-gradient-to-br from-primary-600 via-primary-700 to-secondary-700 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')]"></div>
      </div>

      <Container>
        <div className="relative z-10 py-16 md:py-24 lg:py-32">
          <div className="max-w-3xl mx-auto text-center">
            {/* Badge */}
            {badge && (
              <Badge
                variant="primary"
                size="lg"
                className="mb-6 bg-white/20 text-white border-white/30"
              >
                {badge}
              </Badge>
            )}

            {/* Title */}
            <Heading
              as="h1"
              variant="default"
              align="center"
              className="text-white mb-6"
            >
              {title}
            </Heading>

            {/* Description */}
            <Text
              variant="lead"
              color="default"
              align="center"
              className="text-white/90 mb-8 max-w-2xl mx-auto"
            >
              {description}
            </Text>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              {primaryCTA && (
                <Link href={primaryCTA.href}>
                  <Button
                    variant="primary"
                    size="lg"
                    rightIcon={<ArrowRight size={20} />}
                    className="bg-white text-primary-600 hover:bg-neutral-100"
                  >
                    {primaryCTA.label}
                  </Button>
                </Link>
              )}
              {secondaryCTA && (
                <Link href={secondaryCTA.href}>
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-white text-white hover:bg-white/10"
                  >
                    {secondaryCTA.label}
                  </Button>
                </Link>
              )}
            </div>

            {/* Stats */}
            {stats && stats.length > 0 && (
              <div className="grid grid-cols-3 gap-8 pt-8 border-t border-white/20">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                      {stat.value}
                    </div>
                    <div className="text-sm text-white/80">{stat.label}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
};


