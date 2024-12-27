/**
 * The `AboutUs` component is the main component for the About Us page of the application. It fetches the about data from the server and renders the page content, including the banner, mid-section, and a set of cards with additional information.
 *
 * The component uses the `useSEO` hook to set the SEO data for the page, and the `useInView` hook to animate the cards as the user scrolls.
 *
 * @param props - An object containing the `aboutData` and `websiteConfig` properties, which are used to render the page content.
 * @returns The rendered `AboutUs` component.
 */
import AboutBanner from "@/components/About/Banner";
import MidSection from "@/components/About/MidSection";
import Card from "@/components/Common/Card";
import { URL } from "@/config/webConfig";
import { useSEO } from "@/contexts/SEOContext";
import { AboutUsResponse, Description } from "@/types/about.type";
import { GetServerSideProps } from "next";
import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import styles from "@/styles/about.module.css";
import { NextSeo } from "next-seo";
import { ConfigResponse } from "@/types/layout.type";
import { BASE_DOMAIN_URL } from "@/config/apiConfig";
import SchemaOrg from "@/components/SEO/SchemaOrg";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

interface AboutUsProps {
  aboutData: AboutUsResponse;
  websiteConfig: ConfigResponse;
}

const AboutUs: React.FC<AboutUsProps> = (props) => {
  const { aboutData, websiteConfig } = props;
  const { seo, image, body } = aboutData.data.attributes;
  const logoUrl = websiteConfig?.data.attributes.logo.data.attributes.url;
  const { setSEOData } = useSEO();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    const fetchedSEOData = {
      title: seo.metaTitle,
      description: seo.metaDescription,
      keywords: seo.keywords,
    };

    setSEOData(fetchedSEOData);
  }, []);

  const renderDescription = (description: Description[]) => {
    return description[0].children.map((child: any, index: number) => {
      if (child.type === "link") {
        return (
          <a key={index} href={child.url} className="text-primary-blue">
            {child.children[0].text}
          </a>
        );
      }

      return <span key={index}>{child.text}</span>;
    });
  };

  return (
    <>
      <NextSeo
        title={seo.metaTitle || "About Us"}
        description={seo.metaDescription}
        openGraph={{
          title: seo.metaTitle || "About Us",
          description: seo.metaDescription,
          images: [
            {
              url: logoUrl,
              width: 1200,
              height: 630,
              alt: "About SYNERGY XYZ",
            },
          ],
        }}
      />
      <SchemaOrg
        url={`${BASE_DOMAIN_URL}${seo.canonicalURL}`}
        title={seo.metaTitle || "SYNERGY XYZ - Digital Marketing Agency"}
        description={seo.metaDescription}
      />
      <div className={styles.banner_container}>
        <motion.div
          initial={{ y: 30, opacity: 0.5 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
        >
          <AboutBanner image={image} />
        </motion.div>

        <MidSection
          title={body.title}
          name={body.name}
          gifUrl={body.video.data.attributes.url}
        />
      </div>

      <div className={styles.aboutus_cardbox}>
        <div className={styles.card_container} ref={ref}>
          {body.card.map((card, index) => (
            <motion.div
              key={index}
              initial={{ y: 30, opacity: 0.5 }}
              animate={inView ? { y: 0, opacity: 1 } : { y: 30, opacity: 0.5 }}
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
              className="mb-4 aboutus-card "
            >
              <Card
                subtitle={renderDescription(card.description)}
                title={card.title}
                backgroundColor={""}
                isImage={true}
                isAboutUs={true}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </>
  );
};
export default AboutUs;

export const getServerSideProps: GetServerSideProps = async (context) => {
  let language = context.locale || process.env.NEXT_PUBLIC_LOCALE;
  if (language && language.includes("-")) {
    language = "en";
  }

  try {
    const response = await fetch(`${URL.aboutUsAPI}?locale=${language}`);

    if (!response.ok) {
      throw new Error("Failed to fetch About data");
    }

    const aboutData = await response.json();

    return {
      props: {
        aboutData,
        ...(await serverSideTranslations(language ?? "", ["common"])),
      },
    };
  } catch (error) {
    console.error("Error fetching About data:", error);

    return {
      props: {
        aboutData: null,
        ...(await serverSideTranslations(language ?? "", ["common"])),
      },
    };
  }
};
