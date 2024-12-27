interface ImageFormat {
  ext: string;
  url: string;
  hash: string;
  mime: string;
  name: string;
  path: null | string;
  size: number;
  width: number;
  height: number;
  sizeInBytes: number;
}

interface ImageAttributes {
  name: string;
  alternativeText: null | string;
  caption: null | string;
  width: number;
  height: number;
  formats: {
    large: ImageFormat;
    small: ImageFormat;
    medium: ImageFormat;
    thumbnail: ImageFormat;
  };
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl: null | string;
  provider: string;
  provider_metadata: null | string;
  createdAt: string;
  updatedAt: string;
}

interface BackImageData {
  id: number;
  attributes: ImageAttributes;
}

interface BackImage {
  data: BackImageData[];
}
interface ParagraphChild {
  text: string;
  type: string;
  bold?: boolean;
}
interface Paragraph {
  type: string;
  children: ParagraphChild[];
}
interface ContactInfo {
  id: number;
  title: string;
  phone: Paragraph[];
  whatsAppNumber: string;
  email: Paragraph[];
  address: string;
  availableTime: string;
  availableDays: string;
  image?: string;
  text: string;
  linkPhone: string;
  linkEmail: string;
  linkAddress: string;
  linkWhatsapp: string;
}
interface SocialLinks {
  id: number;
  facebook: string;
  instagram: string;
  linkedIn: string;
}
interface Social {
  id: number;
  title: string;
  links: SocialLinks;
}
interface Localization {
  data: any[];
}
interface Seo {
  id: number;
  metaTitle: string;
  metaDescription: string;
  keywords: string;
  metaRobots: string;
  structuredData: string | null;
  metaViewport: string;
  canonicalURL: string;
}
interface Attributes {
  name: string;
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  slug: string;
  locale: string;
  backImage: BackImage;
  social: Social;
  contactInfo: ContactInfo;
  seo: Seo;
  localizations: Localization;
}
interface Data {
  id: number;
  attributes: Attributes;
}
interface ContactUsResponse {
  data: Data;
  meta: Record<string, unknown>;
}

interface IdentifierType {
  identifier:
    | "message"
    | "email"
    | "name"
    | "phone"
    | "budget"
    | "typeOfService"
    | "objective"
    | "terms";
}

export type {
  ContactUsResponse,
  ContactInfo,
  Social,
  SocialLinks,
  Paragraph,
  IdentifierType,
};
