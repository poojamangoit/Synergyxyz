interface ImageFormat {
  ext: string;
  url: string;
  hash: string;
  mime: string;
  name: string;
  path: string | null;
  size: number;
  width: number;
  height: number;
  sizeInBytes: number;
}

// Image attributes
interface ImageAttributes {
  name: string;
  alternativeText: string | null;
  caption: string | null;
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
  previewUrl: string | null;
  provider: string;
  provider_metadata: string | null;
  createdAt: string;
  updatedAt: string;
}

// Image data
interface ImageData {
  id: number;
  attributes: ImageAttributes;
}
interface ImageType {
  data: ImageData;
}
interface Link {
  url: string;
  type: string;
  children: Array<{
    text: string;
    type: string;
  }>;
}
interface Text {
  text: string;
  type: string;
}
interface CardDescriptionChild {
  text: string;
  children: Array<Text | Link>;
}
interface Description {
  type: string;
  children: CardDescriptionChild[];
}
interface Card {
  id: number;
  title: string;
  description: Description[];
}
interface VideoAttributes {
  name: string;
  alternativeText: string | null;
  caption: string | null;
  width: number | null;
  height: number | null;
  formats: null;
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl: string | null;
  provider: string;
  provider_metadata: any;
  createdAt: string;
  updatedAt: string;
}

interface VideoData {
  id: number;
  attributes: VideoAttributes;
}
interface VideoType {
  data: VideoData;
}
interface BodyData {
  id: number;
  name: string;
  title: string;
  image: ImageType;
  video: VideoType;
  card: Card[];
}
interface SEO {
  id: number;
  metaTitle: string;
  metaDescription: string;
  keywords: string;
  metaRobots: string;
  structuredData: null | string;
  metaViewport: string;
  canonicalURL: string;
}

interface Attributes {
  title: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: string;
  name: string;
  image: ImageType;
  backImage: ImageType;
  body: BodyData;
  seo: SEO;
}
interface Data {
  id: number;
  attributes: Attributes;
}
interface AboutUsResponse {
  data: Data;
  meta: Record<string, unknown>;
}

export type {
  AboutUsResponse,
  ImageData,
  ImageType,
  CardDescriptionChild,
  Description,
  VideoType,
};
