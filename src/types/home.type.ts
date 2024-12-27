// types.ts

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

interface ImageData {
  id: number;
  attributes: {
    name: string;
    alternativeText: string | null;
    caption: string | null;
    width: number;
    height: number;
    formats: {
      small?: ImageFormat;
      thumbnail?: ImageFormat;
      large?: ImageFormat;
      medium?: ImageFormat;
    };
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
  };
}

interface Banner {
  id: number;
  title: string;
  subTitle: string;
  image: {
    data: ImageData;
  };
  backImage: {
    data: ImageData;
  };
  video: {
    data: VideoData;
  };
}

interface VideoData {
  id: number;
  attributes: {
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
  };
}

interface ButtonType {
  id: number;
  label: string | null;
  buttonText: string;
  slug: string;
}

interface OurStory {
  id: number;
  name: string;
  highlightText: string;
  title: string;
  description: string;
  videos: {
    data: VideoData[];
  };
  buttons: ButtonType;
}

interface OurMethod {
  id: number;
  name: string;
  title: string;
  description: string;
  image: {
    data: ImageData;
  };
  buttons: ButtonType;
  video: {
    data: VideoData;
  };
}

interface OurExpertise {
  id: number;
  name: string;
  title: string;
  subTitle: string;
  buttons: ButtonType;
}

interface SeoData {
  id: number;
  metaTitle: string;
  metaDescription: string;
  keywords: string;
  metaRobots: string;
  structuredData: any;
  metaViewport: string;
  canonicalURL: string | null;
}

interface DataAttributes {
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  slug: string | null;
  banner: Banner;
  ourStory: OurStory;
  ourMethod: OurMethod;
  ourExpertise: OurExpertise;
  seo: SeoData;
}

interface HomeResponse {
  data: {
    id: number;
    attributes: DataAttributes;
  };
  meta: any;
}

export type { HomeResponse, OurStory, OurMethod, OurExpertise };
