/**
 * Renders the ServicePage component, which displays a service page with a banner, cards, and other sections.
 *
 * @param {ServiceProps} props - The props for the ServicePage component.
 * @param {CaseStudyAttributes} props.servicesData - The data for the service page.
 * @returns {React.ReactElement} - The rendered ServicePage component.
 */
import Card from "@/components/Common/Card";
import Banner from "@/components/Services/Banner";
import { URL } from "@/config/webConfig";
import { useSEO } from "@/contexts/SEOContext";
import {
  CaseStudyAttributes,
  Description,
  ServicesData,
} from "@/types/service.type";
import { GetServerSideProps } from "next";
import { useEffect } from "react";
import { motion } from "framer-motion";
import styles from "@/styles/serviceSubPages.module.css";
import { useRouter } from "next/router";
import OurSolution from "@/components/Common/OurSolution";
import Button from "@/components/Common/Button";
import { useScrollAnimation } from "@/components/Common/useScrollAnimation";
import { NextSeo } from "next-seo";
import SchemaOrg from "@/components/SEO/SchemaOrg";
import { BASE_DOMAIN_URL } from "@/config/apiConfig";
import { route, validRoutes } from "@/utils/staticData";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

interface ServiceProps {
  servicesData: CaseStudyAttributes;
}

const ServicePage: React.FC<ServiceProps> = ({ servicesData }) => {
  const {
    seo,
    heading,
    card,
    differentiator,
    caseStudyTitle,
    caseStudyTitle2,
    buttons,
    coreFeatures,
  } = servicesData;

  const router = useRouter();

  const imageUrl = heading.imageDetail.data.attributes.url;

  const { ref: buttonRef, inView: buttonInView } = useScrollAnimation();

  const currentRoute = router.asPath;
  const gridColumns = route.includes(currentRoute)
    ? "sm:grid-cols-2"
    : "sm:grid-cols-3";

  const getFullDescription = (description: Description[]) => {
    return description.map((paragraph, paragraphIndex) => {
      if (
        paragraph.children.length === 1 &&
        "text" in paragraph.children[0] &&
        paragraph.children[0].text === ""
      ) {
        return <br key={paragraphIndex} />;
      }

      return (
        <p key={paragraphIndex}>
          {paragraph.children.map((child, childIndex) => {
            if ("url" in child) {
              return (
                <a
                  key={childIndex}
                  href={child.url}
                  className="text-primary-blue hover:underline"
                >
                  {child.children[0].text}
                </a>
              );
            }

            return <span key={childIndex}>{child.text}</span>;
          })}
        </p>
      );
    });
  };

  const handleRedirect = (value: string) => {
    window.open(`https://wa.me/${value}`, "_blank");
  };

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
        title={seo.metaTitle}
        description={seo.metaDescription}
        openGraph={{
          title: seo.metaTitle,
          description: seo.metaDescription,
          images: [
            {
              url: `${imageUrl}`,
              width: 1200,
              height: 630,
              alt: heading.title,
            },
          ],
        }}
      />
      <SchemaOrg
        url={`${BASE_DOMAIN_URL}${seo.canonicalURL}`}
        title={seo.metaTitle || "SYNERGY XYZ - Digital Marketing Agency"}
        description={seo.metaDescription}
      />

      <div className={styles.service_subpages}>
        <Banner
          heading={heading}
          imgSrc={heading.imageDetail.data.attributes.url}
        />
        <div className={styles.grid_main_section}>
          <div
            className={`${styles.card_grid} grid grid-cols-1 ${gridColumns} gap-4`}
          >
            {card.map((card, index) => (
              <div key={index}>
                <Card
                  title={card.title}
                  subtitle={getFullDescription(card.description)}
                  backgroundColor={"bg-white"}
                  isImage={false}
                />
              </div>
            ))}
          </div>

          {coreFeatures !== null && (
            <div className={styles.OS_container}>
              <OurSolution differentiators={coreFeatures} />
            </div>
          )}

          <div className={styles.OS_container}>
            <OurSolution differentiators={differentiator} />
          </div>

          <motion.div
            ref={buttonRef}
            className={styles.get_started}
            initial={{ opacity: 0, y: 50 }}
            animate={
              buttonInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }
            }
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <motion.p className={styles.get_started_title}>
              {caseStudyTitle.split(" ").map((word, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={buttonInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.9, delay: 0.2 + index * 0.1 }}
                  className="inline-block mr-3"
                >
                  {word}
                </motion.span>
              ))}
            </motion.p>
            <motion.p className={styles.get_started_title}>
              {caseStudyTitle2.split(" ").map((word, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={buttonInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.9, delay: 0.4 + index * 0.1 }}
                  className="inline-block mr-3"
                >
                  {word}
                </motion.span>
              ))}
            </motion.p>

            <motion.div
              className={styles.get_started_button_container}
              initial={{ opacity: 0, y: 50 }}
              animate={
                buttonInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }
              }
              transition={{ duration: 0.5, ease: "easeOut", delay: 2 }}
            >
              <Button
                name={buttons.buttonText}
                type="primaryBtn"
                onClick={() => handleRedirect(buttons.slug)}
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default ServicePage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const currentRoute = context.resolvedUrl;

  let language = context.locale || process.env.NEXT_PUBLIC_LOCALE;
  if (language && language.includes("-")) {
    language = "en";
  }

  if (!validRoutes.includes(currentRoute)) {
    return {
      notFound: true,
    };
  }

  try {
    const response = await fetch(`${URL.servicesAPI}?locale=${language}`);
    if (!response.ok) {
      throw new Error("Failed to fetch website configuration");
    }

    const { servicesData } = await response.json();

    const currentServiceData = servicesData.data.find(
      (service: ServicesData) => service.attributes.slug === currentRoute
    )?.attributes;

    return {
      props: {
        servicesData: currentServiceData,
        ...(await serverSideTranslations(language ?? "", ["common"])),
      },
    };
  } catch (error) {
    console.error("Error fetching website configuration:", error);

    return {
      props: {
        servicesData: null,
        ...(await serverSideTranslations(language ?? "", ["common"])),
      },
    };
  }
};
