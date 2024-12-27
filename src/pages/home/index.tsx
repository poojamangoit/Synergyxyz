/**
 * The HomePage component is the main page of the application, which displays various sections such as the banner, our story, our method, and our services.
 *
 * The component fetches the necessary data from the server-side and passes it down to the child components. It also sets the SEO data for the page using the useSEO hook.
 *
 * @param {HomeProps} props - The props object containing the home data, services data, and website configuration.
 * @param {HomeResponse} props.homeData - The home data fetched from the server.
 * @param {ServicePageResponse} props.servicesData - The services data fetched from the server.
 * @param {ConfigResponse} props.websiteConfig - The website configuration fetched from the server.
 * @returns {JSX.Element} - The rendered HomePage component.
 */
import React, { useEffect } from "react";
import { useSEO } from "@/contexts/SEOContext";
import BannerImageComponent from "@/components/Home/Banner";
import { GetServerSideProps } from "next";
import { HomeResponse } from "@/types/home.type";
import OurStory from "@/components/Home/OurStory";
import OurMethod from "@/components/Home/OurMethod";
import HomeServices from "@/components/Home/HomeServices";
import { ServicePageResponse } from "@/types/service.type";
import styles from "@/styles/home.module.css";
import { URL } from "@/config/webConfig";
import { NextSeo } from "next-seo";
import { ConfigResponse } from "@/types/layout.type";
import { BASE_DOMAIN_URL } from "@/config/apiConfig";
import SchemaOrg from "@/components/SEO/SchemaOrg";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

interface HomeProps {
  homeData: HomeResponse;
  servicesData: ServicePageResponse;
  websiteConfig: ConfigResponse;
}

const HomePage: React.FC<HomeProps> = (props) => {
  const { homeData, servicesData, websiteConfig } = props;
  const { setSEOData } = useSEO();

  const logoUrl = websiteConfig?.data.attributes.logo.data.attributes.url;

  const { banner, ourStory, ourMethod, seo, ourExpertise } =
    homeData.data.attributes;

  useEffect(() => {
    const fetchedSEOData = {
      title: seo.metaTitle,
      description: seo.metaDescription,
      keywords: seo.keywords,
    };

    setSEOData(fetchedSEOData);
  }, []);

  return (
    <>
      <NextSeo
        title={seo.metaTitle || "Home"}
        description={seo.metaDescription}
        openGraph={{
          title: seo.metaTitle || "Home",
          description: seo.metaDescription,
          images: [
            {
              url: logoUrl,
              width: 1200,
              height: 630,
              alt: banner.title,
            },
          ],
        }}
      />
      <SchemaOrg
        url={`${BASE_DOMAIN_URL}${seo.canonicalURL}`}
        title={seo.metaTitle || "SYNERGY XYZ - Digital Marketing Agency"}
        description={seo.metaDescription}
      />
      <div className={styles.HomePage}>
        <BannerImageComponent
          heading={banner.title}
          text={banner.subTitle}
          gifUrl={banner.video.data.attributes.url}
        />
        <OurStory ourStory={ourStory} />
        <HomeServices
          ourExpertise={ourExpertise}
          ourServices={servicesData}
          isButton={true}
        />
        <OurMethod
          ourMethod={ourMethod}
          gifUrl={ourMethod.video.data.attributes.url}
        />
      </div>
    </>
  );
};

export default HomePage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  let language = context.locale || process.env.NEXT_PUBLIC_LOCALE;
  if (language && language.includes("-")) {
    language = "en";
  }

  try {
    const response = await fetch(`${URL.homeAPI}?locale=${language}`);
    if (!response.ok) {
      throw new Error("Failed to fetch website configuration");
    }

    const { homeData, servicesData } = await response.json();

    return {
      props: {
        homeData,
        servicesData,
        ...(await serverSideTranslations(language ?? "", ["common"])),
      },
    };
  } catch (error) {
    console.error("Error fetching website configuration:", error);

    return {
      props: {
        homeData: null,
        servicesData: null,
        ...(await serverSideTranslations(language ?? "", ["common"])),
      },
    };
  }
};
