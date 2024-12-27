/**
 * Renders the Terms of Service page.
 *
 * This component fetches the terms of service data from the API and renders the page with the fetched data. It also sets the SEO data for the page.
 *
 * @param {TermsOfServiceProps} props - The props for the component.
 * @param {PrivacyPolicyResponse} props.termsData - The terms of service data fetched from the API.
 * @param {ConfigResponse} props.websiteConfig - The website configuration data.
 * @returns {React.ReactElement} - The rendered Terms of Service page.
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

interface TermsOfServiceProps {
  termsData: PrivacyTermsResponse;
  websiteConfig: ConfigResponse;
}

const TermsOfService: React.FC<TermsOfServiceProps> = ({
  termsData,
  websiteConfig,
}) => {
  const { setSEOData } = useSEO();
  const { seo, body } = termsData.data.attributes;
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
        title={seo.metaTitle || "Terms Of Service"}
        description={seo.metaDescription}
        openGraph={{
          title: seo.metaTitle || "Terms Of Service",
          description: seo.metaDescription,
          images: [
            {
              url: logoUrl,
              width: 1200,
              height: 630,
              alt: "Terms Of Service",
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
export default TermsOfService;

export const getServerSideProps: GetServerSideProps = async (context) => {
  let language = context.locale || process.env.NEXT_PUBLIC_LOCALE;
  if (language && language.includes("-")) {
    language = "en";
  }

  try {
    const response = await fetch(`${URL.termsOfServiceAPI}?locale=${language}`);

    if (!response.ok) {
      throw new Error("Failed to fetch TermsOfService data");
    }

    const termsData = await response.json();

    return {
      props: {
        termsData,
        ...(await serverSideTranslations(language ?? "", ["common"])),
      },
    };
  } catch (error) {
    console.error("Error fetching Privacy data:", error);

    return {
      props: {
        termsData: null,
        ...(await serverSideTranslations(language ?? "", ["common"])),
      },
    };
  }
};
