/**
 * The main ContactUs component that renders the contact page.
 *
 * @param {ContactUsProps} props - The props for the ContactUs component.
 * @param {ContactUsResponse} props.contactData - The contact data fetched from the API.
 * @param {ConfigResponse} props.websiteConfig - The website configuration data.
 * @returns {JSX.Element} - The rendered contact page.
 */
import ContactBanner from "@/components/Contact/Banner";
import ContactForm from "@/components/Contact/ContactForm";
import { URL } from "@/config/webConfig";
import { useSEO } from "@/contexts/SEOContext";
import { ContactUsResponse } from "@/types/contact.type";
import { GetServerSideProps } from "next";
import React, { useEffect } from "react";
import styles from "@/styles/contact.module.css";
import { NextSeo } from "next-seo";
import SchemaOrg from "@/components/SEO/SchemaOrg";
import { BASE_DOMAIN_URL } from "@/config/apiConfig";
import { ConfigResponse } from "@/types/layout.type";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

interface ContactUsProps {
  contactData: ContactUsResponse;
  websiteConfig: ConfigResponse;
}

const ContactUs: React.FC<ContactUsProps> = ({
  contactData,
  websiteConfig,
}) => {
  const { seo, name, title, description, social, contactInfo } =
    contactData.data.attributes;
  const logoUrl = websiteConfig?.data.attributes.logo.data.attributes.url;
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
        title={seo.metaTitle || "ContactUs"}
        description={seo.metaDescription}
        openGraph={{
          title: seo.metaTitle || "ContactUs",
          description: seo.metaDescription,
          images: [
            {
              url: logoUrl,
              width: 1200,
              height: 630,
              alt: title,
            },
          ],
        }}
      />
      <SchemaOrg
        url={`${BASE_DOMAIN_URL}${seo.canonicalURL}`}
        title={seo.metaTitle || "SYNERGY XYZ - Digital Marketing Agency"}
        description={seo.metaDescription}
      />

      <div className={styles.contact_page}>
        <ContactBanner name={name} title={title} description={description} />
        <ContactForm social={social} contactInfo={contactInfo} />
      </div>
    </>
  );
};

export default ContactUs;

export const getServerSideProps: GetServerSideProps = async (context) => {
  let language = context.locale || process.env.NEXT_PUBLIC_LOCALE;

  if (language && language.includes("-")) {
    language = "en";
  }

  try {
    const response = await fetch(`${URL.contactUsAPI}?locale=${language}`);

    if (!response.ok) {
      throw new Error("Failed to fetch contact data");
    }

    const contactData = await response.json();

    return {
      props: {
        contactData,

        ...(await serverSideTranslations(language ?? "", ["common"])),
      },
    };
  } catch (error) {
    console.error("Error fetching contact data:", error);

    return {
      props: {
        contactData: null,

        ...(await serverSideTranslations(language ?? "", ["common"])),
      },
    };
  }
};
