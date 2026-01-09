'use client';

/**
 * Example Page using the Modern UI Components
 * This demonstrates how to use the new UI components
 */

import React from 'react';
import {
  Header,
  Footer,
  HeroSection,
  FeaturesSection,
  Section,
  Heading,
  Text,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  Button,
  Badge,
} from '../index';
import { Microscope, Building2, Pill, Heart, Stethoscope, Activity } from 'lucide-react';

export const ExamplePage: React.FC = () => {
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
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
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

        <FeaturesSection
          badge="Услуги"
          title="Наши услуги"
          description="Комплексный подход к вашему здоровью"
          features={features}
          columns={3}
        />

        <Section variant="neutral" padding="lg">
          <div className="text-center mb-12">
            <Badge variant="secondary" size="lg" className="mb-4">
              О нас
            </Badge>
            <Heading as="h2" variant="default" align="center" className="mb-4">
              Почему выбирают нас
            </Heading>
            <Text variant="large" color="muted" align="center" className="max-w-2xl mx-auto">
              Мы предлагаем современные медицинские услуги с использованием передовых технологий
            </Text>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card variant="elevated" padding="lg">
              <CardHeader>
                <CardTitle>Современное оборудование</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Мы используем только самое современное медицинское оборудование для точной диагностики и эффективного лечения.
                </CardDescription>
              </CardContent>
            </Card>

            <Card variant="elevated" padding="lg">
              <CardHeader>
                <CardTitle>Опытные специалисты</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Наши врачи имеют многолетний опыт работы и регулярно повышают свою квалификацию.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </Section>
      </main>

      <Footer />
    </div>
  );
};


