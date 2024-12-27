/**
 * Renders an image component for the About page banner.
 *
 * @param image - An object containing the image data, including the URL, height, and width.
 * @returns A React component that displays the banner image.
 */

import { ImageType } from "@/types/about.type";

import React from "react";

interface AboutBannerProps {
  image: ImageType;
}

const AboutBanner: React.FC<AboutBannerProps> = ({ image }) => {
  const { url, height, width } = image.data.attributes;

  return (
    <>
      <link rel="preload" as="image" href={url} />
      <img src={url} alt="image.name" width={width} height={height} />
    </>
  );
};
export default AboutBanner;
