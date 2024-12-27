/**
 * The `BMap` component is the main page component for the Bm@p section of the website. It fetches the necessary data for the page, including the Bm@p data and the website configuration, and renders the page content.
 *
 * The component uses the `NextSeo` and `SchemaOrg` components to set the SEO-related metadata for the page. It also uses the `useSEO` hook to update the SEO data in the context.
 *
 * The main content of the page is divided into several sections, including the banner, the advantage section, and the card grid. The advantage section and card grid use the `motion` component from the `framer-motion` library to animate the content as the user scrolls.
 *
 * The `getServerSideProps` function is used to fetch the Bm@p data from the server and pass it to the `BMap` component as props.
 *
 * @param {BmapProps} props - The props passed to the `BMap` component.
 * @param {BmapResponse} props.bmapData - The Bm@p data fetched from the server.
 * @param {ConfigResponse} props.websiteConfig - The website configuration data.
 * @returns {JSX.Element} - The rendered `BMap` component.
 */
import Banner from "@/components/BMap/Banner";
import Card from "@/components/Common/Card";
import { BASE_DOMAIN_URL } from "@/config/apiConfig";
import { URL } from "@/config/webConfig";
import { BmapResponse } from "@/types/bmap.type";
import { GetServerSideProps } from "next";
import styles from "@/styles/bmap.module.css";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import OurSolution from "@/components/Common/OurSolution";
import { NextSeo } from "next-seo";
import SchemaOrg from "@/components/SEO/SchemaOrg";
import { useEffect } from "react";
import { useSEO } from "@/contexts/SEOContext";
import { ConfigResponse } from "@/types/layout.type";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { bmapCardsClassNames } from "@/utils/staticData";

interface BmapProps {
  bmapData: BmapResponse;
  websiteConfig: ConfigResponse;
}

const BMap: React.FC<BmapProps> = ({ bmapData, websiteConfig }) => {
  const {
    name,
    description,
    highlightText,
    title,
    advantage,
    bmapSolves,
    seo,
    video,
  } = bmapData.data.attributes;
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

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <>
      <NextSeo
        title={seo.metaTitle || "Bm@p"}
        description={seo.metaDescription}
        openGraph={{
          title: seo.metaTitle || "Bm@p",
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
      <div className={styles.bmap_page}>
        <Banner
          primaryTitle={name}
          blackTitle={highlightText}
          primarySubtitle={title}
          subtext={description}
          gifUrl={video.data.attributes.url}
        />

        <div className={`${styles.card_section}`}>
          <motion.div
            ref={ref}
            className={styles.advantage_section}
            initial={{ opacity: 0, y: 50 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <motion.p
              className={styles.advantage_name}
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {advantage.name}
            </motion.p>
            <motion.h3
              className={styles.advantage_title}
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              {advantage.title}
            </motion.h3>
          </motion.div>

          <div
            className={`${styles.card_grid} grid grid-cols-1 sm:grid-cols-2 gap-4`}
          >
            {advantage.card.map((card, index) => (
              <div key={index}>
                <Card
                  key={index}
                  title={card.title}
                  subtitle={card.description[0].children[0].text}
                  imageSrc={card.image.data.attributes.url}
                  backgroundColor={"bg-gray-300 cardmap"}
                  isImage={true}
                  isBmapPage={true}
                  slug={bmapCardsClassNames[index]}
                />
              </div>
            ))}
          </div>

          <div className={styles.OS_container}>
            <OurSolution differentiators={bmapSolves} />
          </div>
        </div>
      </div>
    </>
  );
};

export default BMap;

export const getServerSideProps: GetServerSideProps = async (context) => {
  let language = context.locale || process.env.NEXT_PUBLIC_LOCALE;

  if (language && language.includes("-")) {
    language = "en";
  }

  try {
    const response = await fetch(`${URL.bmapMethod}?locale=${language}`);

    if (!response.ok) {
      throw new Error("Failed to fetch BMAP data");
    }

    const bmapData = await response.json();

    return {
      props: {
        bmapData,
        ...(await serverSideTranslations(language ?? "", ["common"])),
      },
    };
  } catch (error) {
    console.error("Error fetching BMAP data:", error);

    return {
      props: {
        bmapData: null,
        ...(await serverSideTranslations(language ?? "", ["common"])),
      },
    };
  }
};
