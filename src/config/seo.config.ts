/**
 * Default SEO configuration for the application.
 * This object contains the default title, description, and OpenGraph/Twitter metadata
 * for the website, which can be used across the application.
 */

import { BASE_DOMAIN_URL } from "./apiConfig";

export const defaultSEO = {
    title: "SYNERGY XYZ - Digital Marketing Agency | Social Media Agency Malaysia | Graphic Design Company",
    description: "Digital Marketing Agency in Kuala Lumpur, Malaysia. Expert in copywriting services, graphic design, corporate video production, seo services & social media management.",
    openGraph: {
      type: 'website',
      locale: 'en_US',
      url: `${BASE_DOMAIN_URL}`,
      siteName: 'SYNERGY XYZ',
      images: [
        {
          url: `${BASE_DOMAIN_URL}`,
          width: 1200,
          height: 630,
          alt: 'SYNERGY XYZ',
        },
      ],
    },
    twitter: {
      handle: '@synergyxyz',
      site: '@synergyxyz',
      cardType: 'summary_large_image',
    },
  };
  