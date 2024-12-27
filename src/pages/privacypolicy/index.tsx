/**
 * Renders the Privacy Policy page for the website.
 *
 * This component fetches the privacy policy data from the API and displays it on the page.
 * It also sets the SEO data (title, description, keywords) for the page based on the fetched data.
 *
 * @param {PrivacyPolicyProps} props - The props for the PrivacyPolicy component.
 * @param {PrivacyPolicyResponse} props.privacyData - The privacy policy data fetched from the API.
 * @param {ConfigResponse} props.websiteConfig - The website configuration data.
 * @returns {React.ReactElement} - The rendered Privacy Policy page.
 */

import SchemaOrg from "@/components/SEO/SchemaOrg";
import { BASE_DOMAIN_URL } from "@/config/apiConfig";
import { URL } from "@/config/webConfig";
import { useSEO } from "@/contexts/SEOContext";
import { ConfigResponse } from "@/types/layout.type";
import { GetServerSideProps } from "next";
import { NextSeo } from "next-seo";
import React, { useEffect } from "react";
import styles from "@/styles/privacyAndTerms.module.css";
import { PrivacyTermsResponse } from "@/types/privacypolicy.type";
import Info from "@/components/Common/Info";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

interface PrivacyPolicyProps {
  privacyData: PrivacyTermsResponse;
  websiteConfig: ConfigResponse;
}

const PrivacyPolicy: React.FC<PrivacyPolicyProps> = ({
  privacyData,
  websiteConfig,
}) => {
  const { setSEOData } = useSEO();
  const { body, seo } = privacyData.data.attributes;
  const logoUrl = websiteConfig?.data.attributes.logo.data.attributes.url;

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
        title={seo.metaTitle || "Privacy Policy"}
        description={seo.metaDescription}
        openGraph={{
          title: seo.metaTitle || "Privacy Policy",
          description: seo.metaDescription,
          images: [
            {
              url: logoUrl,
              width: 1200,
              height: 630,
              alt: "Privacy Policy",
            },
          ],
        }}
      />
      <SchemaOrg
        url={`${BASE_DOMAIN_URL}${seo.canonicalURL}`}
        title={seo.metaTitle || "SYNERGY XYZ - Digital Marketing Agency"}
        description={seo.metaDescription}
      />
      <div className={styles.privacy_policy_container}>
        <Info body={body} />
      </div>
    </>
  );
};
export default PrivacyPolicy;

export const getServerSideProps: GetServerSideProps = async (context) => {
  let language = context.locale || process.env.NEXT_PUBLIC_LOCALE;
  if (language && language.includes("-")) {
    language = "en";
  }

  try {
    const response = await fetch(`${URL.privacyPolicyAPI}?locale=${language}`);

    if (!response.ok) {
      throw new Error("Failed to fetch Privacy data");
    }

    const privacyData = await response.json();

    return {
      props: {
        privacyData,
        ...(await serverSideTranslations(language ?? "", ["common"])),
      },
    };
  } catch (error) {
    console.error("Error fetching Privacy data:", error);

    return {
      props: {
        privacyData: null,
        ...(await serverSideTranslations(language ?? "", ["common"])),
      },
    };
  }
};
