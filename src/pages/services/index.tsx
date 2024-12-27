/**
 * The `ServicesPage` component is the main page for the services section of the website. It fetches the necessary data for the services and our expertise sections, and renders the `HomeServices` component with the fetched data.
 *
 * The component also sets the SEO data (title, description, keywords) using the `useSEO` hook, and renders the `NextSeo` and `SchemaOrg` components to provide SEO-related metadata.
 *
 * @param {ServicesProps} props - The props passed to the `ServicesPage` component.
 * @param {ServicePageResponse} props.servicesData - The data for the services section.
 * @param {OurExpertiseType} props.ourExpertise - The data for the "Our Expertise" section.
 * @returns {React.ReactElement} - The rendered `ServicesPage` component.
 */
import React, { useEffect } from "react";
import { useSEO } from "@/contexts/SEOContext";
import { GetServerSideProps } from "next";
import { OurExpertiseType, ServicePageResponse } from "@/types/service.type";
import HomeServices from "@/components/Home/HomeServices";
import { URL } from "@/config/webConfig";
import styles from "@/styles/services.module.css";
import { NextSeo } from "next-seo";
import { BASE_DOMAIN_URL } from "@/config/apiConfig";
import SchemaOrg from "@/components/SEO/SchemaOrg";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

interface ServicesProps {
  servicesData: ServicePageResponse;
  ourExpertise: OurExpertiseType;
}

const ServicesPage: React.FC<ServicesProps> = (props) => {
  const { servicesData, ourExpertise } = props;
  const { body, seo } = ourExpertise.data.attributes;

  const { setSEOData } = useSEO();

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
        title={seo.metaTitle || "Services"}
        description={seo.metaDescription}
        openGraph={{
          title: seo.metaTitle || "Services",
          description: seo.metaDescription,
          images: servicesData.data.map((item) => ({
            url: item.attributes.heading.image.data.attributes.url,
            width: 1200,
            height: 630,
            alt: item.attributes.heading.title || body.name,
          })),
        }}
      />
      <SchemaOrg
        url={`${BASE_DOMAIN_URL}${seo.canonicalURL}`}
        title={seo.metaTitle || "SYNERGY XYZ - Digital Marketing Agency"}
        description={seo.metaDescription}
      />

      <div className={styles.ServicesPage}>
        <HomeServices
          ourServices={servicesData}
          ourExpertise={body}
          isButton={false}
        />
      </div>
    </>
  );
};

export default ServicesPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  let language = context.locale || process.env.NEXT_PUBLIC_LOCALE;
  if (language && language.includes("-")) {
    language = "en";
  }

  try {
    const response = await fetch(`${URL.servicesAPI}?locale=${language}`);
    if (!response.ok) {
      throw new Error("Failed to fetch Services data");
    }

    const { servicesData, ourExpertise } = await response.json();

    return {
      props: {
        servicesData,
        ourExpertise,
        ...(await serverSideTranslations(language ?? "", ["common"])),
      },
    };
  } catch (error) {
    console.error("Error fetching Services data:", error);

    return {
      props: {
        servicesData: null,
        ourExpertise: null,
        ...(await serverSideTranslations(language ?? "", ["common"])),
      },
    };
  }
};
