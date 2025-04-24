"use client";

import React from 'react';
import { useTranslation } from 'react-i18next';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MessageSquare, Brain, Zap, Search as SearchIcon } from 'lucide-react'; // Using specific icons

// Map icon names from translation file to actual Lucide components
const iconMap: { [key: string]: React.ElementType } = {
  MessageSquare: MessageSquare,
  Brain: Brain,
  Zap: Zap,
};

export function ConversationFeature() {
  const { t } = useTranslation('landing');

  // Helper to get icon component
  const getIcon = (iconName: string) => {
    const IconComponent = iconMap[iconName];
    return IconComponent ? <IconComponent className="h-6 w-6 text-primary" /> : null;
  };

  return (
    <section className="py-12 md:py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <div className="grid md:grid-cols-2 gap-8 items-center mb-16 md:mb-24">
          <div className="mb-8 md:mb-0">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">
              {t('conversationFeature.title')}
            </h2>
            <p className="text-lg text-muted-foreground mb-6">
              {t('conversationFeature.subtitle')}
            </p>
            <Button size="default" onClick={() => document.getElementById('main-search-bar')?.focus()}> {/* Focus main search bar on click */}
              <SearchIcon className="mr-2 h-5 w-5" />
              {t('conversationFeature.cta')}
            </Button>
          </div>
          <div className="relative h-64 md:h-80 rounded-lg overflow-hidden shadow-lg">
            {/* **IMAGE PLACEHOLDER 1** */}
            {/* Replace with a compelling visual representing the concept */}
            {/* Suggestions: Abstract flow of conversation, connected ideas, stylized search bar with conversation icon active */}
            <Image 
              src="/images/hero.jpg" 
              alt="Conversation Mode Illustration" 
              layout="fill" 
              objectFit="cover" 
              className="bg-muted" // Placeholder background
            />
            {/* Add a subtle gradient overlay or similar effect if needed */}
          </div>
        </div>

        {/* How It Works Section */}
        <div className="mb-16 md:mb-24">
          <h3 className="text-2xl md:text-3xl font-bold text-center mb-10">
            {t('conversationFeature.howItWorks.title')}
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <div className="flex items-center justify-center h-8 w-8 rounded-full bg-primary/10 text-primary font-bold">1</div>
                  {t('conversationFeature.howItWorks.step1.title')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm mb-4 min-h-16">
                  {t('conversationFeature.howItWorks.step1.description')}
                </p>
                <div className="relative h-40 rounded-md overflow-hidden border bg-muted">
                  {/* **IMAGE PLACEHOLDER 2** */}
                  {/* Show initial search input/results, conversation icon is NOT active */}
                  <Image 
                    src="/images/conv1.jpg" 
                    alt="Initial Search Step" 
                    layout="fill" 
                    objectFit="contain" 
                    className="p-2"
                  />
                </div>
              </CardContent>
            </Card>
            {/* Step 2 */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                   <div className="flex items-center justify-center h-8 w-8 rounded-full bg-primary/10 text-primary font-bold">2</div>
                  {t('conversationFeature.howItWorks.step2.title')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm mb-4 min-h-16">
                  {t('conversationFeature.howItWorks.step2.description')}
                </p>
                 <div className="relative h-40 rounded-md overflow-hidden border bg-muted">
                  {/* **IMAGE PLACEHOLDER 3** */}
                  {/* Show search bar with conversation icon ACTIVE (highlighted), maybe user typing */}
                  <Image 
                    src="/images/conv2.jpg" 
                    alt="Activate Conversation Step" 
                    layout="fill" 
                    objectFit="contain" 
                     className="p-2"
                  />
                </div>
              </CardContent>
            </Card>
            {/* Step 3 */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                   <div className="flex items-center justify-center h-8 w-8 rounded-full bg-primary/10 text-primary font-bold">3</div>
                  {t('conversationFeature.howItWorks.step3.title')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm mb-4 min-h-16">
                  {t('conversationFeature.howItWorks.step3.description')}
                </p>
                 <div className="relative h-40 rounded-md overflow-hidden border bg-muted">
                   {/* **IMAGE PLACEHOLDER 4** */}
                   {/* Show AI providing a follow-up answer within the context */}
                  <Image 
                    src="/images/conv3.jpg" 
                    alt="Follow-up Question Step" 
                    layout="fill" 
                    objectFit="contain" 
                     className="p-2"
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Benefits Section */}
        <div className="text-center">
          <h3 className="text-2xl md:text-3xl font-bold mb-10">
            {t('conversationFeature.benefits.title')}
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex flex-col items-center p-6 border rounded-lg bg-card shadow-sm">
                <div className="mb-4">
                  {getIcon(t(`conversationFeature.benefits.benefit${i}.icon`))}
                </div>
                <h4 className="text-lg font-semibold mb-2">
                  {t(`conversationFeature.benefits.benefit${i}.title`)}
                </h4>
                <p className="text-muted-foreground text-sm">
                  {t(`conversationFeature.benefits.benefit${i}.description`)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
} 