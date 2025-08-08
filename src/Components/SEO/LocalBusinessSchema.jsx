import React from 'react';
import { Helmet } from 'react-helmet-async';

const LocalBusinessSchema = () => {
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "KheyaMind AI Technologies",
    "alternateName": "KheyaMind AI",
    "description": "Leading AI consulting company offering enterprise AI solutions, custom chatbot development, voice AI agents, and business process automation from India to Global markets.",
    "url": "https://www.kheyamind.ai",
    "telephone": "+91-9163885060",
    "email": "niraj@kheyamind.ai",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "AI Consulting Hub",
      "addressLocality": "Bangalore",
      "addressRegion": "Karnataka",
      "postalCode": "560001",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "12.9716",
      "longitude": "77.5946"
    },
    "openingHours": [
      "Mo-Fr 09:00-18:00"
    ],
    "priceRange": "$5,000-$500,000",
    "currenciesAccepted": "USD, INR, AED",
    "paymentAccepted": "Credit Card, Bank Transfer, Digital Payment",
    "areaServed": [
      {
        "@type": "Country",
        "name": "India"
      },
      {
        "@type": "Country", 
        "name": "United Arab Emirates"
      },
      {
        "@type": "Place",
        "name": "Global"
      }
    ],
    "serviceArea": {
      "@type": "GeoCircle",
      "geoMidpoint": {
        "@type": "GeoCoordinates",
        "latitude": "12.9716",
        "longitude": "77.5946"
      },
      "geoRadius": "Global"
    },
    "founder": {
      "@type": "Person",
      "name": "Niraj Modak",
      "jobTitle": "Founder & CEO"
    },
    "foundingDate": "2024",
    "numberOfEmployees": "5-10",
    "slogan": "Vision Beyond AI: Intelligent Solutions for the Next Era",
    "knowsAbout": [
      "AI Consulting",
      "Enterprise AI Solutions", 
      "Chatbot Development",
      "Voice AI Agents",
      "Business Process Automation",
      "Custom AI Development",
      "Machine Learning Consulting",
      "AI Implementation"
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "AI Consulting Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "AI Chatbot Development",
            "description": "Custom AI chatbots powered by GPT-5 for automated customer support and lead generation"
          }
        },
        {
          "@type": "Offer", 
          "itemOffered": {
            "@type": "Service",
            "name": "Voice AI Agents",
            "description": "Intelligent voice assistants for phone-based customer interactions"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service", 
            "name": "Business Process Automation",
            "description": "AI-powered automation for operational efficiency and cost reduction"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Custom AI Development", 
            "description": "Tailored AI solutions using GPT, Claude, and custom models"
          }
        }
      ]
    },
    "review": [
      {
        "@type": "Review",
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "5",
          "bestRating": "5"
        },
        "author": {
          "@type": "Organization",
          "name": "Enterprise Client"
        },
        "reviewBody": "Reduced our operational costs by 75% with their AI automation solutions. Excellent implementation and support."
      }
    ],
    "aggregateRating": {
      "@type": "AggregateRating", 
      "ratingValue": "4.9",
      "reviewCount": "25",
      "bestRating": "5"
    },
    "sameAs": [
      "https://www.linkedin.com/company/kheyamind-ai",
      "https://github.com/kheyamind-ai",
      "https://www.designrush.com/agency/profile/kheyamind-ai-technologies"
    ]
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(localBusinessSchema)}
      </script>
    </Helmet>
  );
};

export default LocalBusinessSchema;