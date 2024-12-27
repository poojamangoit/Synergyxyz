// Service Page Type
interface ImageFormats {
  ext: string;
  url: string;
  hash: string;
  mime: string;
  name: string;
  path: string | null;
  size: number;
  width: number;
  height: number;
  sizeInBytes?: number;
}

interface ImageAttributes {
  name: string;
  alternativeText: string | null;
  caption: string | null;
  width: number;
  height: number;
  formats: {
    small?: ImageFormats;
    medium?: ImageFormats;
    large?: ImageFormats;
    thumbnail: ImageFormats;
  };
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl: string | null;
  provider: string;
  provider_metadata: string | null;
  createdAt: string;
  updatedAt: string;
}

interface ImageData {
  id: number;
  attributes: ImageAttributes;
}

interface ButtonType {
  id: number;
  label: string | null;
  buttonText: string;
  slug: string;
}

interface Pagination {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
}

interface Meta {
  pagination: Pagination;
}

interface Link {
  url: string;
  type: string;
  children: TextNode[];
}
interface TextNode {
  text: string;
  type: string;
}
interface Description {
  type: string;
  children: (TextNode | Link)[];
}

interface Card {
  id: number;
  title: string;
  description: Description[];
}

interface DifferentiatorItem {
  id: number;
  order: string;
  title: string;
  description: string;
}

interface Differentiator {
  id: number;
  name: string;
  title: string;
  differentiator: DifferentiatorItem[];
}

interface SEO {
  id: number;
  metaTitle: string;
  metaDescription: string;
  keywords: string;
  metaRobots: string;
  structuredData: string | null;
  metaViewport: string;
  canonicalURL: string;
}

interface HeadingDetail {
  id: number;
  departmentNameForGrid: string;
  departmentNameForListing:string
  title: string;
  description: string;
  imageDetail: {
    data: ImageData;
  };
  image: {
    data: ImageData;
  };
  buttons: ButtonType;
}

interface CaseStudyAttributes {
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: string;
  caseStudyTitle: string;
  slug: string;
  caseStudyTitle2: string;
  heading: HeadingDetail;
  card: Card[];
  differentiator: Differentiator;
  buttons: ButtonType;
  seo: SEO;
  coreFeatures: Differentiator;
}

interface ServicesData {
  id: number;
  attributes: CaseStudyAttributes;
}

interface ServicePageResponse {
  data: ServicesData[];
  meta: Meta;
}

// Our Expertise Type

interface BodyData {
  id: number;
  name: string;
  title: string;
  subTitle: string;
  buttons: ButtonType;
}

interface ExpertiseAttributes {
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  slug: string;
  body: BodyData;
  backImage: {
    data: ImageData;
  };
  seo: SEO;
}

interface Data {
  id: number;
  attributes: ExpertiseAttributes;
}

interface OurExpertiseType {
  data: Data;
  meta: Meta;
}

export type {
  ServicePageResponse,
  OurExpertiseType,
  ServicesData,
  CaseStudyAttributes,
  HeadingDetail,
  Description,
  DifferentiatorItem,
  Differentiator,
};
