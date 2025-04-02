"use client";

import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";
import ReactMarkdown from "react-markdown";

// Contenu des CGU
const termsOfServiceFR = `# Conditions Générales d'Utilisation - ClaireVue

**Date d'effet :** 31 mars 2025

## 1. Introduction

Bienvenue sur ClaireVue, un moteur de recherche moderne qui combine la puissance de Brave Search avec l'intelligence artificielle pour fournir des résultats de recherche pertinents et des analyses générées par un LLM (Large Language Model).

Ces Conditions Générales d'Utilisation (les "Conditions") régissent votre accès et votre utilisation du site web ClaireVue, y compris tout le contenu, les fonctionnalités et les services qui vous sont proposés (collectivement désignés comme le "Service").

En accédant ou en utilisant notre Service, vous acceptez d'être lié par ces Conditions. Si vous n'acceptez pas ces Conditions, vous ne devez pas accéder à notre Service ni l'utiliser.

## 2. Qui sommes-nous

Le Service est exploité par un développeur indépendant en founderMode, France (ci-après "nous", "notre", "nos").

## 3. Modifications des Conditions

Nous nous réservons le droit, à notre seule discrétion, de modifier ces Conditions à tout moment. Si nous apportons des modifications importantes, nous vous en informerons par le biais d'une notification sur notre Service ou par d'autres moyens raisonnables.

En continuant à accéder ou à utiliser notre Service après que ces modifications soient entrées en vigueur, vous acceptez d'être lié par les Conditions révisées. Si vous n'acceptez pas les nouvelles Conditions, vous devez cesser d'utiliser le Service.

## 4. Accès au Service

Nous nous efforçons de rendre le Service disponible en permanence. Cependant, nous ne garantissons pas que le Service sera disponible à tout moment ou sans interruption. L'accès au Service peut être suspendu temporairement sans préavis en cas de défaillance du système, de maintenance, de réparation ou pour des raisons indépendantes de notre volonté.

## 5. Utilisation du Service

### 5.1 Utilisations autorisées

Vous pouvez utiliser notre Service pour :
- Effectuer des recherches en ligne
- Accéder à des analyses et des résumés générés par IA
- Explorer des questions connexes et approfondir des sujets

### 5.2 Restrictions d'utilisation

Vous acceptez de ne pas :
- Utiliser le Service d'une manière qui pourrait désactiver, surcharger, endommager ou altérer le Service ou interférer avec l'utilisation du Service par d'autres.
- Tenter d'accéder à des parties du Service auxquelles vous n'êtes pas autorisé à accéder.
- Utiliser des robots, des scrapers ou d'autres moyens automatisés pour accéder au Service.
- Utiliser le Service pour toute activité illégale ou non autorisée.
- Collecter ou stocker des données personnelles d'autres utilisateurs du Service.
- Reproduire, dupliquer, copier, vendre, revendre ou exploiter toute partie du Service sans notre autorisation écrite expresse.

## 6. Propriété intellectuelle

### 6.1 Notre propriété intellectuelle

Le Service et son contenu original, ses fonctionnalités et ses fonctionnalités sont et resteront notre propriété exclusive. Le Service est protégé par le droit d'auteur, les marques déposées et d'autres lois françaises et internationales. Nos marques déposées et notre habillage commercial ne peuvent pas être utilisés en relation avec un produit ou un service sans notre consentement écrit préalable.

### 6.2 Résultats de recherche et contenu généré

Les résultats de recherche fournis via l'API Brave Search et les analyses générées par l'API Cerebras sont soumis aux conditions d'utilisation de ces services tiers. Vous reconnaissez que les données et le contenu accessibles via notre Service peuvent être protégés par des droits de propriété intellectuelle de tiers.

## 7. Confidentialité et données personnelles

Votre utilisation du Service est également régie par notre Politique de Confidentialité, qui est intégrée par référence à ces Conditions. Veuillez consulter notre Politique de Confidentialité pour comprendre nos pratiques en matière de collecte, d'utilisation et de protection de vos données personnelles.

## 8. Services et contenus tiers

### 8.1 Services tiers

Notre Service utilise les API tierces suivantes pour fournir ses fonctionnalités :
- **Brave Search API** : Pour les résultats de recherche web
- **Cerebras API** : Pour les analyses et résumés générés par IA

### 8.2 Liens vers des sites tiers

Notre Service peut contenir des liens vers des sites web ou des services tiers qui ne sont ni détenus ni contrôlés par nous. Nous n'exerçons aucun contrôle et n'assumons aucune responsabilité quant au contenu, aux politiques de confidentialité ou aux pratiques de tout site web ou service tiers. Vous reconnaissez et acceptez que nous ne serons pas responsables, directement ou indirectement, de tout dommage ou perte causé ou prétendument causé par ou en relation avec l'utilisation ou la confiance accordée à un tel contenu, bien ou service disponible sur ou via un tel site web ou service.

## 9. Limitation de responsabilité

### 9.1 Absence de garanties

Le Service est fourni "tel quel" et "tel que disponible", sans garantie d'aucune sorte, expresse ou implicite. Nous déclinons spécifiquement toute garantie implicite de qualité marchande, d'adéquation à un usage particulier, de non-violation et toute garantie découlant du cours des transactions ou de l'usage du commerce.

Nous ne garantissons pas que :
- Le Service répondra à vos exigences spécifiques
- Le Service sera ininterrompu, opportun, sécurisé ou sans erreur
- Les résultats de recherche ou les analyses IA seront exacts ou fiables
- La qualité du Service répondra à vos attentes

### 9.2 Limites de responsabilité

En aucun cas, nous ne serons responsables de tout dommage indirect, accessoire, spécial, consécutif ou punitif, y compris, sans limitation, la perte de profits, de données, d'utilisation, de bonne volonté ou d'autres pertes intangibles, résultant de :
- Votre accès ou utilisation, ou incapacité d'accéder ou d'utiliser le Service
- Toute conduite ou contenu d'un tiers sur le Service
- Tout contenu obtenu à partir du Service
- Accès non autorisé, utilisation ou altération de vos transmissions ou contenu

## 10. Indemnisation

Vous acceptez de défendre, d'indemniser et de dégager de toute responsabilité nous-mêmes et nos concédants de licence, prestataires de services, employés, agents, dirigeants et administrateurs de et contre toute réclamation, responsabilité, dommage, jugement, sentence, perte, coût, dépense ou frais (y compris les honoraires d'avocat raisonnables) résultant de ou découlant de votre utilisation du Service, de votre violation de ces Conditions ou de votre violation de tout droit d'un tiers.

## 11. Résiliation

Nous pouvons résilier ou suspendre votre accès au Service immédiatement, sans préavis ni responsabilité, pour quelque raison que ce soit, y compris, sans limitation, si vous violez ces Conditions.

Toutes les dispositions des Conditions qui, par leur nature, devraient survivre à la résiliation, survivront à la résiliation, y compris, sans limitation, les dispositions relatives à la propriété, les exclusions de garantie, l'indemnisation et les limitations de responsabilité.

## 12. Force majeure

Nous ne serons pas responsables de tout retard ou manquement à nos obligations en vertu de ces Conditions lorsqu'un tel retard ou manquement résulte de causes indépendantes de notre volonté raisonnable, y compris, mais sans s'y limiter, les catastrophes naturelles, les guerres, le terrorisme, les émeutes, les embargos, les actes des autorités civiles ou militaires, les incendies, les inondations, les accidents, les grèves ou les pénuries de moyens de transport, de carburant, d'énergie, de main-d'œuvre ou de matériaux.

## 13. Loi applicable et juridiction

Ces Conditions seront régies et interprétées conformément au droit français, sans égard aux dispositions relatives aux conflits de lois.

Tout litige découlant de ces Conditions ou s'y rapportant sera soumis à la compétence exclusive des tribunaux de France.

## 14. Dispositions diverses

### 14.1 Intégralité de l'accord

Ces Conditions constituent l'intégralité de l'accord entre vous et nous concernant le Service et remplacent tous les accords antérieurs et contemporains, communications et propositions, qu'ils soient oraux ou écrits, entre vous et nous.

### 14.2 Renonciation

Le fait pour nous de ne pas faire valoir un droit ou une disposition des présentes Conditions ne sera pas considéré comme une renonciation à ce droit ou à cette disposition. La renonciation à un tel droit ou à une telle disposition ne sera effective que si elle est faite par écrit et signée par un représentant dûment autorisé.

### 14.3 Divisibilité

Si une disposition des présentes Conditions est jugée inapplicable ou invalide, cette disposition sera limitée ou éliminée dans la mesure minimale nécessaire, et les autres dispositions des présentes Conditions resteront pleinement en vigueur.

### 14.4 Cession

Vous ne pouvez pas céder ou transférer ces Conditions, par l'effet de la loi ou autrement, sans notre consentement écrit préalable. Toute tentative de cession sans ce consentement sera nulle. Nous pouvons céder ou transférer ces Conditions, à notre seule discrétion, sans restriction.

### 14.5 Notifications

Toute notification ou autre communication concernant ces Conditions sera faite par écrit et vous sera envoyée par email ou par courrier postal. Les notifications que vous nous envoyez doivent être envoyées à clairevue2a@gmail.com.

## 15. Contact

Si vous avez des questions concernant ces Conditions, veuillez nous contacter à clairevue2a@gmail.com.
`;

const termsOfServiceEN = `# Terms of Service - ClaireVue

**Effective Date:** March 31, 2025

## 1. Introduction

Welcome to ClaireVue, a modern search engine that combines the power of Brave Search with artificial intelligence to provide relevant search results and LLM-generated analyses.

These Terms of Service (the "Terms") govern your access to and use of the ClaireVue website, including any content, functionality, and services offered to you (collectively referred to as the "Service").

By accessing or using our Service, you agree to be bound by these Terms. If you do not agree to these Terms, you must not access or use the Service.

## 2. Who We Are

The Service is operated by an independent developer in founderMode (hereinafter "we", "our", "us").

## 3. Changes to the Terms

We reserve the right, at our sole discretion, to modify these Terms at any time. If we make material changes, we will notify you through a notice on our Service or by other reasonable means.

By continuing to access or use our Service after those revisions become effective, you agree to be bound by the revised Terms. If you do not agree to the new Terms, you must stop using the Service.

## 4. Access to the Service

We strive to make the Service available at all times. However, we do not guarantee that the Service will be available at all times or without interruption. Access to the Service may be temporarily suspended without notice in the case of system failure, maintenance, repair, or for reasons beyond our reasonable control.

## 5. Use of the Service

### 5.1 Permitted Uses

You may use our Service to:
- Perform online searches
- Access AI-generated analyses and summaries
- Explore related questions and delve deeper into topics

### 5.2 Use Restrictions

You agree not to:
- Use the Service in any way that could disable, overburden, damage, or impair the Service or interfere with any other party's use of the Service.
- Attempt to access parts of the Service that you are not authorized to access.
- Use robots, scrapers, or other automated means to access the Service.
- Use the Service for any illegal or unauthorized purpose.
- Collect or store personal data about other users of the Service.
- Reproduce, duplicate, copy, sell, resell, or exploit any portion of the Service without our express written permission.

## 6. Intellectual Property

### 6.1 Our Intellectual Property

The Service and its original content, features, and functionality are and will remain our exclusive property. The Service is protected by copyright, trademark, and other French and international laws. Our trademarks and trade dress may not be used in connection with any product or service without our prior written consent.

### 6.2 Search Results and Generated Content

Search results provided via the Brave Search API and analyses generated by the Cerebras API are subject to the terms of use of those third-party services. You acknowledge that data and content accessible through our Service may be protected by third-party intellectual property rights.

## 7. Privacy and Personal Data

Your use of the Service is also governed by our Privacy Policy, which is incorporated by reference into these Terms. Please review our Privacy Policy to understand our practices regarding the collection, use, and protection of your personal data.

## 8. Third-Party Services and Content

### 8.1 Third-Party Services

Our Service uses the following third-party APIs to provide its features:
- **Brave Search API**: For web search results
- **Cerebras API**: For AI-generated analyses and summaries

### 8.2 Links to Third-Party Sites

Our Service may contain links to third-party websites or services that are not owned or controlled by us. We have no control over and assume no responsibility for the content, privacy policies, or practices of any third-party website or service. You acknowledge and agree that we will not be responsible or liable, directly or indirectly, for any damage or loss caused or alleged to be caused by or in connection with the use of or reliance on any such content, goods, or service available on or through any such website or service.

## 9. Limitation of Liability

### 9.1 No Warranties

The Service is provided "as is" and "as available" without any warranty of any kind, either express or implied. We specifically disclaim any implied warranties of merchantability, fitness for a particular purpose, non-infringement, and any warranties arising out of course of dealing or usage of trade.

We do not warrant that:
- The Service will meet your specific requirements
- The Service will be uninterrupted, timely, secure, or error-free
- Search results or AI analyses will be accurate or reliable
- The quality of the Service will meet your expectations

### 9.2 Liability Limitations

In no event will we be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from:
- Your access to or use of or inability to access or use the Service
- Any conduct or content of any third party on the Service
- Any content obtained from the Service
- Unauthorized access, use, or alteration of your transmissions or content

## 10. Indemnification

You agree to defend, indemnify, and hold harmless us and our licensors, service providers, employees, agents, officers, and directors from and against any claims, liabilities, damages, judgments, awards, losses, costs, expenses, or fees (including reasonable attorneys' fees) arising out of or relating to your use of the Service, your violation of these Terms, or your violation of any rights of a third party.

## 11. Termination

We may terminate or suspend your access to the Service immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach these Terms.

All provisions of the Terms which by their nature should survive termination shall survive termination, including, without limitation, ownership provisions, warranty disclaimers, indemnity, and limitations of liability.

## 12. Force Majeure

We will not be liable for any delay or failure to perform our obligations under these Terms where such delay or failure results from causes beyond our reasonable control, including, but not limited to, natural disasters, wars, terrorism, riots, embargoes, acts of civil or military authorities, fires, floods, accidents, strikes, or shortages of transportation, fuel, energy, labor, or materials.

## 13. Governing Law and Jurisdiction

These Terms shall be governed and construed in accordance with the laws of France, without regard to its conflict of law provisions.

Any dispute arising from these Terms or related to them will be subject to the exclusive jurisdiction of the courts of France.

## 14. Miscellaneous

### 14.1 Entire Agreement

These Terms constitute the entire agreement between you and us regarding the Service and supersede all prior and contemporaneous agreements, communications, and proposals, whether oral or written, between you and us.

### 14.2 Waiver

Our failure to enforce any right or provision of these Terms will not be considered a waiver of such right or provision. The waiver of any such right or provision will be effective only if in writing and signed by a duly authorized representative.

### 14.3 Severability

If any provision of these Terms is held to be unenforceable or invalid, such provision will be limited or eliminated to the minimum extent necessary, and the remaining provisions of these Terms will remain in full force.

### 14.4 Assignment

You may not assign or transfer these Terms, by operation of law or otherwise, without our prior written consent. Any attempt to assign without such consent will be void. We may assign or transfer these Terms, at our sole discretion, without restriction.

### 14.5 Notifications

Any notice or other communication regarding these Terms will be in writing and will be sent to you by email or postal mail. Notices that you send to us must be sent to clairevue2a@gmail.com.

## 15. Contact

If you have any questions about these Terms, please contact us at clairevue2a@gmail.com.
`;

const TermsOfServicePage = () => {
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
      const contentToUse = i18n.language === "fr" ? termsOfServiceFR : termsOfServiceEN;
      console.log("Setting terms content for language:", i18n.language);
      console.log("Terms content length:", contentToUse.length);
      setContent(contentToUse);
    }
  }, [i18n.language, mounted]);

  if (!mounted) {
    return null;
  }

  return (
    <Card className="border-border/40">
      <CardHeader>
        <CardTitle>{t("termsOfService")}</CardTitle>
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

export default TermsOfServicePage;
