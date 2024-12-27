type BodyData = {
  id: number;
  content: string;
  slug: string;
};
interface Seo {
  id: number;
  metaTitle: string;
  metaDescription: string;
  keywords: string;
  metaRobots: string;
  structuredData: any | null;
  metaViewport: string;
  canonicalURL: string;
}
interface Localization {
  id: number;
  attributes: {
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    locale: string;
  };
}

interface Attributes {
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: string;
  body: BodyData;
  seo: Seo;
  localizations: {
    data: Localization[];
  };
}
interface Data {
  id: number;
  attributes: Attributes;
}
interface PrivacyTermsResponse {
  data: Data;
  meta: Record<string, unknown>;
}

export type { PrivacyTermsResponse, BodyData };
