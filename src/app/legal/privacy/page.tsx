"use client";

import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";
import ReactMarkdown from "react-markdown";

// Contenu de la politique de confidentialité
const privacyPolicyFR = `# Politique de Confidentialité - ClaireVue

**Date d'effet :** 31 mars 2025

## 1. Introduction

Bienvenue sur ClaireVue, un moteur de recherche moderne qui combine la puissance de Brave Search avec l'intelligence artificielle pour fournir des résultats de recherche pertinents et des analyses générées par un LLM (Large Language Model).

Cette Politique de Confidentialité décrit comment nous collectons, utilisons, partageons et protégeons vos informations lorsque vous utilisez notre site web et nos services (collectivement désignés comme le "Service").

Veuillez lire attentivement cette Politique de Confidentialité. En utilisant ClaireVue, vous acceptez les pratiques décrites dans ce document.

## 2. Responsable du traitement

**Développeur indépendant en founderMode**  
Basé à Ajaccio, Corse, France  
Contact : clairevue2a@gmail.com

## 3. Informations que nous collectons

### 3.1 Informations que vous nous fournissez directement

- **Requêtes de recherche** : les termes et phrases que vous saisissez dans notre barre de recherche.
- **Interactions avec le site** : vos clics sur les résultats, la façon dont vous interagissez avec les fonctionnalités, et vos préférences d'utilisation.

### 3.2 Informations collectées automatiquement

- **Informations sur l'appareil** : type d'appareil, système d'exploitation, type de navigateur, langue du navigateur, et adresse IP.
- **Données d'utilisation** : pages visitées, durée des visites, actions effectuées sur le site.
- **Cookies et technologies similaires** : nous utilisons des cookies et des technologies similaires pour améliorer l'expérience utilisateur, analyser l'utilisation du site, et personnaliser le contenu.
- **Statistiques de visite** : nous utilisons Vercel Analytics pour recueillir des statistiques anonymisées sur les visites du site afin d'améliorer nos services.

## 4. Comment nous utilisons vos informations

Nous utilisons vos informations pour les finalités suivantes :

- Fournir, exploiter et améliorer nos services de recherche.
- Traiter et répondre à vos requêtes de recherche.
- Générer des analyses et des réponses par IA basées sur vos requêtes.
- Suggérer des questions connexes et personnaliser votre expérience.
- Comprendre comment nos utilisateurs interagissent avec notre Service.
- Résoudre les problèmes techniques et améliorer la sécurité du Service.
- Respecter nos obligations légales.

## 5. Partage des informations

Nous pouvons partager vos informations dans les circonstances suivantes :

### 5.1 Partenaires de services

Nous collaborons avec différents fournisseurs de services qui nous aident à exploiter notre Service :

- **Vercel** : Hébergement du site web, infrastructure cloud et analyse de trafic via Vercel Analytics.
- **Brave Search API** : Traitement des requêtes de recherche web.
- **Cerebras API** : Génération de réponses IA et analyses.

Ces partenaires peuvent avoir accès à vos informations uniquement dans le but de réaliser des tâches en notre nom et sont tenus de ne pas les divulguer ou les utiliser à d'autres fins.

### 5.2 Conformité légale et protection

Nous pouvons divulguer vos informations si nous croyons de bonne foi que cette divulgation est nécessaire pour :

- Se conformer à la loi ou à une procédure judiciaire.
- Protéger la sécurité de nos utilisateurs, de notre Service ou du public.
- Protéger contre la fraude ou les abus.
- Protéger nos droits, notre propriété ou notre sécurité.

## 6. Vos droits concernant vos données

Conformément au Règlement Général sur la Protection des Données (RGPD) et à d'autres lois applicables sur la protection des données, vous disposez des droits suivants :

- **Droit d'accès** : Vous pouvez demander une copie des données personnelles que nous détenons à votre sujet.
- **Droit de rectification** : Vous pouvez demander la correction des données inexactes ou incomplètes.
- **Droit à l'effacement** : Vous pouvez demander la suppression de vos données personnelles dans certaines circonstances.
- **Droit à la limitation du traitement** : Vous pouvez demander la restriction du traitement de vos données dans certaines circonstances.
- **Droit à la portabilité des données** : Vous pouvez demander le transfert de vos données à un autre service dans un format structuré.
- **Droit d'opposition** : Vous pouvez vous opposer au traitement de vos données à des fins de marketing direct ou pour des motifs liés à votre situation particulière.
- **Droit de retirer votre consentement** : Vous pouvez retirer votre consentement à tout moment lorsque le traitement est basé sur celui-ci.

Pour exercer l'un de ces droits, veuillez nous contacter à clairevue2a@gmail.com.

## 7. Sécurité des données

Nous prenons la sécurité de vos données au sérieux et mettons en place des mesures de sécurité techniques et organisationnelles appropriées pour protéger vos informations contre tout accès, utilisation ou divulgation non autorisés.

## 8. Conservation des données

Nous conservons vos données personnelles aussi longtemps que nécessaire pour fournir le Service, satisfaire aux obligations légales, résoudre les litiges et faire respecter nos accords. Lorsque nous n'avons plus besoin de vos données, nous les supprimons ou les anonymisons de manière sécurisée.

## 9. Transferts internationaux de données

Vos informations peuvent être transférées et traitées dans des pays autres que celui dans lequel vous résidez. Ces pays peuvent avoir des lois différentes en matière de protection des données.

Nous prenons des mesures pour garantir que les transferts de données soient effectués conformément aux lois applicables sur la protection des données, notamment en utilisant des clauses contractuelles types approuvées par la Commission européenne ou d'autres mécanismes de transfert légalement reconnus.

## 10. Politique concernant les enfants

Notre Service ne s'adresse pas aux personnes de moins de 16 ans. Nous ne collectons pas sciemment des informations personnelles auprès d'enfants de moins de 16 ans. Si vous êtes un parent ou un tuteur et que vous savez que votre enfant nous a fourni des informations personnelles, veuillez nous contacter.

## 11. Modifications de la politique de confidentialité

Nous pouvons mettre à jour cette Politique de Confidentialité de temps à autre. La version la plus récente sera toujours disponible sur notre site avec la date d'effet mise à jour. Nous vous encourageons à consulter régulièrement cette Politique pour rester informé de la manière dont nous protégeons vos informations.

Les modifications importantes vous seront notifiées par email ou par un avis sur notre site avant leur entrée en vigueur.

## 12. Cookies et technologies similaires

### 12.1 Ce que nous utilisons

- **Cookies essentiels** : Nécessaires au fonctionnement du site.
- **Cookies de préférence** : Permettent de mémoriser vos préférences (comme le thème clair/sombre).
- **Cookies d'analyse** : Nous aident à comprendre comment vous utilisez notre site.

### 12.2 Gestion des cookies

Vous pouvez configurer votre navigateur pour refuser tous les cookies ou pour indiquer quand un cookie est envoyé. Cependant, certaines fonctionnalités du Service peuvent ne pas fonctionner correctement si vous désactivez les cookies.

## 13. Contact

Si vous avez des questions concernant cette Politique de Confidentialité, veuillez nous contacter à clairevue2a@gmail.com.

## 14. Autorité de contrôle

Si vous êtes un résident de l'Espace économique européen et que vous pensez que nous ne respectons pas les lois sur la protection des données, vous avez le droit de déposer une plainte auprès de votre autorité locale de protection des données. En France, l'autorité compétente est la Commission Nationale de l'Informatique et des Libertés (CNIL).
`;

const privacyPolicyEN = `# Privacy Policy - ClaireVue

**Effective Date:** March 31, 2025

## 1. Introduction

Welcome to ClaireVue, a modern search engine that combines the power of Brave Search with artificial intelligence to provide relevant search results and LLM-generated analyses.

This Privacy Policy describes how we collect, use, share, and protect your information when you use our website and services (collectively referred to as the "Service").

Please read this Privacy Policy carefully. By using ClaireVue, you agree to the practices described in this document.

## 2. Data Controller

**Independent developer in founderMode**  
Based in Ajaccio, Corsica, France  
Contact: clairevue2a@gmail.com

## 3. Information We Collect

### 3.1 Information You Provide Directly

- **Search queries**: the terms and phrases you type into our search bar.
- **Site interactions**: your clicks on results, how you interact with features, and your usage preferences.

### 3.2 Information Collected Automatically

- **Device information**: device type, operating system, browser type, browser language, and IP address.
- **Usage data**: pages visited, duration of visits, actions taken on the site.
- **Cookies and similar technologies**: we use cookies and similar technologies to improve the user experience, analyze site usage, and personalize content.
- **Visit statistics**: we use Vercel Analytics to collect anonymized statistics about site visits to improve our services.

## 4. How We Use Your Information

We use your information for the following purposes:

- Provide, operate, and improve our search services.
- Process and respond to your search queries.
- Generate AI-based analyses and responses based on your queries.
- Suggest related questions and personalize your experience.
- Understand how our users interact with our Service.
- Resolve technical issues and improve Service security.
- Comply with our legal obligations.

## 5. Information Sharing

We may share your information in the following circumstances:

### 5.1 Service Partners

We collaborate with various service providers that help us operate our Service:

- **Vercel**: Website hosting, cloud infrastructure, and traffic analysis via Vercel Analytics.
- **Brave Search API**: Processing web search queries.
- **Cerebras API**: Generating AI responses and analyses.

These partners may have access to your information solely for the purpose of performing tasks on our behalf and are obligated not to disclose or use it for any other purpose.

### 5.2 Legal Compliance and Protection

We may disclose your information if we believe in good faith that such disclosure is necessary to:

- Comply with the law or a judicial proceeding.
- Protect the safety of our users, our Service, or the public.
- Protect against fraud or abuse.
- Protect our rights, property, or safety.

## 6. Your Rights Regarding Your Data

In accordance with the General Data Protection Regulation (GDPR) and other applicable data protection laws, you have the following rights:

- **Right of access**: You can request a copy of the personal data we hold about you.
- **Right to rectification**: You can request the correction of inaccurate or incomplete data.
- **Right to erasure**: You can request the deletion of your personal data in certain circumstances.
- **Right to restriction of processing**: You can request the restriction of processing of your data in certain circumstances.
- **Right to data portability**: You can request the transfer of your data to another service in a structured format.
- **Right to object**: You can object to the processing of your data for direct marketing purposes or for reasons related to your particular situation.
- **Right to withdraw consent**: You can withdraw your consent at any time when processing is based on consent.

To exercise any of these rights, please contact us at clairevue2a@gmail.com.

## 7. Data Security

We take the security of your data seriously and implement appropriate technical and organizational security measures to protect your information against unauthorized access, use, or disclosure.

## 8. Data Retention

We retain your personal data for as long as necessary to provide the Service, comply with legal obligations, resolve disputes, and enforce our agreements. When we no longer need your data, we securely delete or anonymize it.

## 9. International Data Transfers

Your information may be transferred to and processed in countries other than the one in which you reside. These countries may have different data protection laws.

We take measures to ensure that data transfers are carried out in accordance with applicable data protection laws, including by using standard contractual clauses approved by the European Commission or other legally recognized transfer mechanisms.

## 10. Children's Policy

Our Service is not directed at individuals under the age of 16. We do not knowingly collect personal information from children under 16. If you are a parent or guardian and you are aware that your child has provided us with personal information, please contact us.

## 11. Changes to the Privacy Policy

We may update this Privacy Policy from time to time. The most recent version will always be available on our site with the updated effective date. We encourage you to periodically review this Policy to stay informed about how we protect your information.

Significant changes will be notified to you by email or through a notice on our site before they take effect.

## 12. Cookies and Similar Technologies

### 12.1 What We Use

- **Essential cookies**: Necessary for the functioning of the site.
- **Preference cookies**: Allow us to remember your preferences (such as light/dark theme).
- **Analytics cookies**: Help us understand how you use our site.

### 12.2 Managing Cookies

You can configure your browser to refuse all cookies or to indicate when a cookie is being sent. However, some features of the Service may not function properly if cookies are disabled.

## 13. Contact

If you have any questions about this Privacy Policy, please contact us at clairevue2a@gmail.com.

## 14. Supervisory Authority

If you are a resident of the European Economic Area and you believe we are not complying with data protection laws, you have the right to file a complaint with your local data protection authority. In France, the competent authority is the Commission Nationale de l'Informatique et des Libertés (CNIL).
`;

const PrivacyPolicyPage = () => {
  const { t, i18n } = useTranslation("legal");
  const [mounted, setMounted] = useState(false);
  const [content, setContent] = useState("");

  // Custom components for ReactMarkdown
  const components = {
    // Add styling to links
    a: ({ ...props }) => (
      <a {...props} className="text-primary hover:underline" target="_blank" rel="noopener noreferrer" />
    ),
    // Customize heading sizes
    h1: ({ ...props }) => <h1 {...props} className="text-2xl font-bold mt-8 mb-4" />,
    h2: ({ ...props }) => <h2 {...props} className="text-xl font-bold mt-6 mb-3" />,
    h3: ({ ...props }) => <h3 {...props} className="text-lg font-bold mt-4 mb-2" />,
    // Add styling to lists
    ul: ({ ...props }) => <ul {...props} className="list-disc pl-6 mb-4" />,
    ol: ({ ...props }) => <ol {...props} className="list-decimal pl-6 mb-4" />
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      const contentToUse = i18n.language === "fr" ? privacyPolicyFR : privacyPolicyEN;
      console.log("Setting content for language:", i18n.language);
      console.log("Content length:", contentToUse.length);
      setContent(contentToUse);
    }
  }, [i18n.language, mounted]);

  if (!mounted) {
    return null;
  }

  return (
    <Card className="border-border/40">
      <CardHeader>
        <CardTitle>{t("privacyPolicy")}</CardTitle>
        <p className="text-muted-foreground text-sm">
          {t("lastUpdated")}: 31 Mars 2025
        </p>
      </CardHeader>
      <CardContent className="prose dark:prose-invert max-w-none prose-headings:font-bold prose-headings:text-foreground prose-p:text-foreground/90">
        {content ? (
          <ReactMarkdown components={components}>{content}</ReactMarkdown>
        ) : (
          <p>Loading content...</p>
        )}
      </CardContent>
    </Card>
  );
};

export default PrivacyPolicyPage;
