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
  sizeInBytes: number;
}

interface ImageAttributes {
  name: string;
  alternativeText: string | null;
  caption: string | null;
  width: number;
  height: number;
  formats: {
    thumbnail: ImageFormats;
    small?: ImageFormats;
    medium?: ImageFormats;
    large?: ImageFormats;
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

interface Image {
  data: ImageData;
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

interface Video {
  data: VideoData;
}

interface Description {
  type: string;
  children: {
    text: string;
    type: string;
  }[];
}

interface Card {
  id: number;
  title: string;
  description: Description[];
  image: Image;
}

interface Advantage {
  id: number;
  name: string;
  title: string;
  card: Card[];
}

interface Differentiator {
  id: number;
  order: string;
  title: string;
  description: string;
}

interface BmapSolves {
  id: number;
  name: string;
  title: string;
  differentiator: Differentiator[];
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
  highlightText: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: string;
  advantage: Advantage;
  bmapSolves: BmapSolves;
  image: Image;
  image2: Image;
  backImage: Image;
  seo: Seo;
  video: Video;
}

interface Data {
  id: number;
  attributes: Attributes;
}

interface BmapResponse {
  data: Data;
  meta: Record<string, unknown>;
}

export type { BmapResponse };
