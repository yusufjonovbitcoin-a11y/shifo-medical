'use client';

import React from 'react';
import {
  HeroSection,
  FeaturesSection,
  Button,
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  Badge,
  Heading,
  Text,
  Section,
  Container,
} from '@/src/new-ui';
import { Microscope, Building2, Pill, Heart, Stethoscope, Activity, ArrowRight } from 'lucide-react';

export default function UiTest() {
  const features = [
    {
      icon: <Microscope size={24} />,
      title: 'Лаборатория',
      description: 'Современное оборудование для точной диагностики',
      badge: 'Диагностика',
    },
    {
      icon: <Stethoscope size={24} />,
      title: 'Консультации',
      description: 'Опытные врачи готовы помочь вам',
      badge: 'Врачи',
    },
    {
      icon: <Heart size={24} />,
      title: 'Кардиология',
      description: 'Современные методы лечения сердечных заболеваний',
      badge: 'Специализация',
    },
    {
      icon: <Activity size={24} />,
      title: 'Физиотерапия',
      description: 'Восстановление и реабилитация',
      badge: 'Реабилитация',
    },
    {
      icon: <Pill size={24} />,
      title: 'Фармация',
      description: 'Широкий ассортимент лекарственных средств',
      badge: 'Лекарства',
    },
    {
      icon: <Building2 size={24} />,
      title: 'Стационар',
      description: 'Комфортные условия для лечения',
      badge: 'Уход',
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <HeroSection
        badge="Медицинский центр"
        title="Ваше здоровье - наш приоритет"
        description="Современный медицинский центр в Самарканде. Более 50 видов операций, высококвалифицированные специалисты и передовые технологии."
        primaryCTA={{ label: 'Записаться на приём', href: '#appointment' }}
        secondaryCTA={{ label: 'Узнать больше', href: '#about' }}
        stats={[
          { value: '50+', label: 'Виды операций' },
          { value: '15+', label: 'Опытные врачи' },
          { value: '20+', label: 'Лет опыта' },
        ]}
      />

      {/* Features Section */}
      <FeaturesSection
        badge="Услуги"
        title="Наши услуги"
        description="Комплексный подход к вашему здоровью"
        features={features}
        columns={3}
      />

      {/* Test Components Section */}
      <Section variant="neutral" padding="lg">
        <Container>
          <div className="text-center mb-12">
            <Badge variant="secondary" size="lg" className="mb-4">
              Test Components
            </Badge>
            <Heading as="h2" variant="default" align="center" className="mb-4">
              UI Components Test
            </Heading>
            <Text variant="large" color="muted" align="center">
              Testing all new UI components
            </Text>
          </div>

          <div className="space-y-8">
            {/* Buttons */}
            <div>
              <Heading as="h3" variant="default" className="mb-4">
                Buttons
              </Heading>
              <div className="flex flex-wrap gap-4">
                <Button variant="primary" size="lg">
                  Primary Large
                </Button>
                <Button variant="secondary" size="md">
                  Secondary Medium
                </Button>
                <Button variant="outline" size="sm">
                  Outline Small
                </Button>
                <Button variant="ghost" size="md">
                  Ghost
                </Button>
                <Button variant="danger" size="md">
                  Danger
                </Button>
                <Button variant="primary" size="lg" isLoading>
                  Loading
                </Button>
                <Button variant="primary" size="md" leftIcon={<ArrowRight size={20} />}>
                  With Icon
                </Button>
              </div>
            </div>

            {/* Cards */}
            <div>
              <Heading as="h3" variant="default" className="mb-4">
                Cards
              </Heading>
              <div className="grid md:grid-cols-3 gap-6">
                <Card variant="default" hover padding="lg">
                  <CardHeader>
                    <CardTitle>Default Card</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Text variant="body" color="muted">
                      This is a default card with hover effect
                    </Text>
                  </CardContent>
                </Card>

                <Card variant="elevated" padding="lg">
                  <CardHeader>
                    <CardTitle>Elevated Card</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Text variant="body" color="muted">
                      This is an elevated card with shadow
                    </Text>
                  </CardContent>
                </Card>

                <Card variant="outlined" padding="lg">
                  <CardHeader>
                    <CardTitle>Outlined Card</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Text variant="body" color="muted">
                      This is an outlined card
                    </Text>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Badges */}
            <div>
              <Heading as="h3" variant="default" className="mb-4">
                Badges
              </Heading>
              <div className="flex flex-wrap gap-4">
                <Badge variant="primary" size="lg">
                  Primary
                </Badge>
                <Badge variant="secondary" size="md">
                  Secondary
                </Badge>
                <Badge variant="success" size="md" dot>
                  Success
                </Badge>
                <Badge variant="warning" size="md">
                  Warning
                </Badge>
                <Badge variant="error" size="md">
                  Error
                </Badge>
                <Badge variant="neutral" size="sm">
                  Neutral
                </Badge>
              </div>
            </div>

            {/* Typography */}
            <div>
              <Heading as="h3" variant="default" className="mb-4">
                Typography
              </Heading>
              <div className="space-y-4">
                <Heading as="h1" variant="gradient">
                  Heading 1 - Gradient
                </Heading>
                <Heading as="h2" variant="primary">
                  Heading 2 - Primary
                </Heading>
                <Heading as="h3" variant="secondary">
                  Heading 3 - Secondary
                </Heading>
                <Text variant="lead" color="default">
                  Lead text - larger text for emphasis
                </Text>
                <Text variant="body" color="muted">
                  Body text - regular paragraph text
                </Text>
                <Text variant="small" color="muted">
                  Small text - for captions and labels
                </Text>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
}


