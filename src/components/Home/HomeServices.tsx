/**
 * The `HomeServices` component is responsible for rendering the services section on the home page. It displays a grid of service items, each with an image, title, and a button to navigate to the corresponding service page.
 *
 * The component receives the following props:
 * - `ourExpertise`: an object containing information about the user's expertise, including the name, title, and subtitle.
 * - `ourServices`: an object containing information about the available services, including the service slug, heading, and image.
 * - `isButton`: a boolean indicating whether to display a button at the bottom of the section.
 *
 * The component uses the `useScrollAnimation` hook to animate the service items as the user scrolls. It also uses the `useInView` hook to detect when the section comes into view.
 *
 * The `getServiceBySlug` function is used to retrieve the service data for a given slug.
 *
 * The `handleOnClicks` function is used to navigate to the corresponding service page when a service item is clicked.
 *
 * The `handleClick` function is used to navigate to the user's expertise page when the button at the bottom of the section is clicked.
 */

import styles from "@/styles/services.module.css";
import { OurExpertise } from "@/types/home.type";
import { ServicePageResponse } from "@/types/service.type";
import Button from "../Common/Button";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useScrollAnimation } from "../Common/useScrollAnimation";
import React from "react";

interface HomeServiceProps {
  ourExpertise: OurExpertise;
  ourServices: ServicePageResponse;
  isButton: boolean;
}

const HomeServices: React.FC<HomeServiceProps> = (props) => {
  const { ourExpertise, ourServices, isButton } = props;
  const router = useRouter();
  const { ref: brandingRef, inView: brandingInView } = useScrollAnimation();
  const { ref: creativeRef, inView: creativeInView } = useScrollAnimation();
  const { ref: mediaRef, inView: mediaInView } = useScrollAnimation();
  const { ref: contentRef, inView: contentInView } = useScrollAnimation();
  const { ref: commerceRef, inView: commercenView } = useScrollAnimation();
  const { ref: crmRef, inView: crmInView } = useScrollAnimation();
  const { ref: partnershipRef, inView: partnershipInView } =
    useScrollAnimation();
  const { ref: eventRef, inView: eventInView } = useScrollAnimation();
  const { ref: dataanalyticsRef, inView: dataanalyticsInView } =
    useScrollAnimation();
  const { ref: technologyRef, inView: technologyInView } = useScrollAnimation();
  const { ref: buttonRef, inView: buttonInView } = useScrollAnimation();

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const getServiceBySlug = (slug: string) => {
    return ourServices.data.find((service) => service.attributes.slug === slug)
      ?.attributes;
  };

  const brandingData = getServiceBySlug("/services/synergy-catalyst");
  const creativeData = getServiceBySlug("/services/synergy-mosaic");
  const mediaData = getServiceBySlug("/services/synergy-beacon");
  const contentStrategyData = getServiceBySlug("/services/synergy-blueprint");
  const commerceData = getServiceBySlug("/services/synergy-barter");
  const crmData = getServiceBySlug("/services/synergy-bond");
  const influencerData = getServiceBySlug("/services/synergy-nexus");
  const eventData = getServiceBySlug("/services/synergy-ignite");
  const analyticsData = getServiceBySlug("/services/synergy-clarity");
  const technologyData = getServiceBySlug("/services/synergy-quantum");

  const handleOnClicks = (route: string | undefined) => {
    if (route) {
      router.push(route);
    }
  };
  const handleClick = () => {
    router.push(ourExpertise.buttons.slug);
  };

  return (
    <>
      <div className={styles.servicesBox}>
        <div className={styles.container}>
          <section
            ref={ref}
            className={!isButton ? styles.headerServicePage : styles.header}
          >
            <motion.span
              className={styles.ourExpertise}
              initial={{ y: 10, opacity: 0 }}
              animate={inView ? { y: 0, opacity: 1 } : { y: 10, opacity: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              {ourExpertise.name}
            </motion.span>
            <motion.h2
              className={
                !isButton
                  ? styles.ourExpertiseh1ServicePage
                  : styles.ourExpertiseh1
              }
            >
              {ourExpertise.title.split(/\s+/).map((word, index, array) => (
                <React.Fragment key={index}>
                  <motion.span
                    className="inline-block mr-3"
                    initial={{ y: 50, opacity: 0 }}
                    animate={
                      inView ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 }
                    }
                    transition={{
                      duration: 0.3,
                      delay: 0.3,
                      ease: "easeOut",
                    }}
                  >
                    {word}
                  </motion.span>
                  {index < array.length - 1 && word === "your" && <br />}
                </React.Fragment>
              ))}
            </motion.h2>

            <motion.p
              className={
                !isButton
                  ? styles.ourExpertisepServicePage
                  : styles.ourExpertisep
              }
            >
              {ourExpertise.subTitle.split(" ").map((word, index) => (
                <motion.span
                  key={index}
                  className="inline-block mr-1"
                  initial={{ x: -100, opacity: 0 }}
                  animate={
                    inView ? { x: 0, opacity: 1 } : { x: -100, opacity: 0 }
                  }
                  transition={{
                    duration: 0.4,
                    delay: 0.5,
                    ease: "easeOut",
                  }}
                >
                  {word}
                </motion.span>
              ))}
            </motion.p>
          </section>
          <div className={styles.grid}>
            <motion.div
              ref={brandingRef}
              className={`${styles.item} ${styles.branding}`}
              initial={{ y: 30, opacity: 0.5 }}
              animate={
                brandingInView ? { y: 0, opacity: 1 } : { y: 30, opacity: 0.5 }
              }
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
            >
              <div>
                <h3>{brandingData?.heading.departmentNameForGrid}</h3>
                <h2>{brandingData?.heading.title}</h2>
                <Button
                  name={brandingData?.heading.buttons.buttonText}
                  type="borderedBtn"
                  className="text-white border border-white-600 text-xs"
                  onClick={() => handleOnClicks(brandingData?.slug)}
                />
              </div>
              <div>
                <link
                  rel="preload"
                  as="image"
                  href={`${brandingData?.heading.image.data.attributes.url}`}
                />
                <img
                  src={`${brandingData?.heading.image.data.attributes.url}`}
                  alt="branding Image"
                />
              </div>
            </motion.div>

            <motion.div
              ref={creativeRef}
              className={`${styles.item} ${styles.creativeContent}`}
              initial={{ y: 30, opacity: 0.5 }}
              animate={
                creativeInView ? { y: 0, opacity: 1 } : { y: 30, opacity: 0.5 }
              }
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
            >
              <div>
                <link
                  rel="preload"
                  as="image"
                  href={`${creativeData?.heading.image.data.attributes.url}`}
                />
                <img
                  src={`${creativeData?.heading.image.data.attributes.url}`}
                  alt="creative content Image"
                />
              </div>
              <div>
                <h3>{creativeData?.heading.departmentNameForGrid}</h3>
                <h2>{creativeData?.heading.title}</h2>
                <Button
                  name={creativeData?.heading.buttons.buttonText}
                  type="borderedBtn"
                  className="text-primary-blue border border-primary-blue text-xs "
                  onClick={() => handleOnClicks(creativeData?.slug)}
                />
              </div>
            </motion.div>

            <motion.div
              ref={mediaRef}
              className={`${styles.item} ${styles.mediaServices}`}
              initial={{ y: 30, opacity: 0.5 }}
              animate={
                mediaInView ? { y: 0, opacity: 1 } : { y: 30, opacity: 0.5 }
              }
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
             >
              <div>
                <h3>{mediaData?.heading.departmentNameForGrid}</h3>
                <h2>{mediaData?.heading.title}</h2>
                <Button
                  name={mediaData?.heading.buttons.buttonText}
                  type="borderedBtn"
                  className="text-primary-blue border border-primary-blue text-xs "
                  onClick={() => handleOnClicks(mediaData?.slug)}
                />
              </div>
              <div>
                <link
                  rel="preload"
                  as="image"
                  href={`${mediaData?.heading.image.data.attributes.url}`}
                />
                <img
                  src={`${mediaData?.heading.image.data.attributes.url}`}
                  alt="media Image"
                />
              </div>
            </motion.div>

            <motion.div
              ref={contentRef}
              className={`${styles.item} ${styles.contentStrategy}`}
              style={{
                backgroundImage: `url(${contentStrategyData?.heading.image.data.attributes.url})`,
              }}
              initial={{ y: 30, opacity: 0.5 }}
              animate={
                contentInView ? { y: 0, opacity: 1 } : { y: 30, opacity: 0.5 }
              }
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
             >
              <div className={styles.contentStrInner}>
                <h3>{contentStrategyData?.heading.departmentNameForGrid}</h3>
                <h2>{contentStrategyData?.heading.title}</h2>
                <p>{contentStrategyData?.heading.description}</p>
                <Button
                  name={contentStrategyData?.heading.buttons.buttonText}
                  type="borderedBtn"
                  className="text-white border border-white-600 text-xs"
                  onClick={() => handleOnClicks(contentStrategyData?.slug)}
                />
              </div>
            </motion.div>

            <motion.div
              ref={commerceRef}
              className={`${styles.item} ${styles.commerce}`}
              initial={{ y: 30, opacity: 0.5 }}
              animate={
                commercenView ? { y: 0, opacity: 1 } : { y: 30, opacity: 0.5 }
              }
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
             >
              <div>
                <h3>{commerceData?.heading.departmentNameForGrid}</h3>
                <h2>{commerceData?.heading.title}</h2>
                <Button
                  name={commerceData?.heading.buttons.buttonText}
                  type="borderedBtn"
                  className="text-primary-blue border border-primary-blue text-xs"
                  onClick={() => handleOnClicks(commerceData?.slug)}
                />
              </div>
              <div>
                <link
                  rel="preload"
                  as="image"
                  href={`${commerceData?.heading.image.data.attributes.url}`}
                />
                <img
                  src={`${commerceData?.heading.image.data.attributes.url}`}
                  alt="e commerce image"
                />
              </div>
            </motion.div>

            <motion.div
              ref={crmRef}
              className={`${styles.item} ${styles.crm}`}
              style={{
                backgroundImage: `url(${crmData?.heading.image.data.attributes.url})`,
              }}
              initial={{ y: 30, opacity: 0.5 }}
              animate={
                crmInView ? { y: 0, opacity: 1 } : { y: 30, opacity: 0.5 }
              }
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
             >
              <div>
                <h3>{crmData?.heading.departmentNameForGrid}</h3>
                <h2>{crmData?.heading.title}</h2>
                <p>{crmData?.heading.description}</p>
                <Button
                  name={crmData?.heading.buttons.buttonText}
                  type="borderedBtn"
                  className="text-white border border-white-600 text-xs "
                  onClick={() => handleOnClicks(crmData?.slug)}
                />
              </div>
            </motion.div>

            <motion.div
              ref={partnershipRef}
              className={`${styles.item} ${styles.influencerMarketing}`}
              initial={{ y: 30, opacity: 0.5 }}
              animate={
                partnershipInView
                  ? { y: 0, opacity: 1 }
                  : { y: 30, opacity: 0.5 }
              }
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
           >
              <div>
                <h3>{influencerData?.heading.departmentNameForGrid}</h3>
                <h2>{influencerData?.heading.title}</h2>
                <Button
                  name={influencerData?.heading.buttons.buttonText}
                  type="borderedBtn"
                  className="text-primary-blue border border-primary-blue text-xs "
                  onClick={() => handleOnClicks(influencerData?.slug)}
                />
              </div>
              <div>
                <link
                  rel="preload"
                  as="image"
                  href={`${influencerData?.heading.image.data.attributes.url}`}
                />
                <img
                  src={`${influencerData?.heading.image.data.attributes.url}`}
                  alt="Partnership Image"
                />
              </div>
            </motion.div>

            <motion.div
              ref={eventRef}
              className={`${styles.item} ${styles.events}`}
              initial={{ y: 30, opacity: 0.5 }}
              animate={
                eventInView ? { y: 0, opacity: 1 } : { y: 30, opacity: 0.5 }
              }
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
             >
              <div>
                <h3>{eventData?.heading.departmentNameForGrid}</h3>
                <h2>{eventData?.heading.title}</h2>
                <Button
                  name={eventData?.heading.buttons.buttonText}
                  type="borderedBtn"
                  className="text-button-border border border-button-border  text-xs"
                  onClick={() => handleOnClicks(eventData?.slug)}
                />
              </div>
              <div>
                <link
                  rel="preload"
                  as="image"
                  href={`${eventData?.heading.image.data.attributes.url}`}
                />
                <img
                  src={`${eventData?.heading.image.data.attributes.url}`}
                  alt="event Image"
                />
              </div>
            </motion.div>

            <motion.div
              ref={dataanalyticsRef}
              className={`${styles.item} ${styles.dataAnalytics}`}
              initial={{ y: 30, opacity: 0.5 }}
              animate={
                dataanalyticsInView
                  ? { y: 0, opacity: 1 }
                  : { y: 30, opacity: 0.5 }
              }
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
             >
              <div>
                <h3>{analyticsData?.heading.departmentNameForGrid}</h3>
                <h2>{analyticsData?.heading.title}</h2>
                <Button
                  name={analyticsData?.heading.buttons.buttonText}
                  type="borderedBtn"
                  className="text-white border border-white-600 text-xs"
                  onClick={() => handleOnClicks(analyticsData?.slug)}
                />
              </div>
              <div>
                <link
                  rel="preload"
                  as="image"
                  href={`${analyticsData?.heading.image.data.attributes.url}`}
                />
                <img
                  src={`${analyticsData?.heading.image.data.attributes.url}`}
                  alt="analytics Image"
                />
              </div>
            </motion.div>

            <motion.div
              ref={technologyRef}
              className={`${styles.item} ${styles.tech}`}
              style={{
                backgroundImage: `url(${technologyData?.heading.image.data.attributes.url})`,
              }}
              initial={{ y: 30, opacity: 0.5 }}
              animate={
                technologyInView
                  ? { y: 0, opacity: 1 }
                  : { y: 30, opacity: 0.5 }
              }
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
          >
              <div>
                <h3>{technologyData?.heading.departmentNameForGrid}</h3>
                <h2>{technologyData?.heading.title}</h2>
                <p>{technologyData?.heading.description}</p>
                <Button
                  name={technologyData?.heading.buttons.buttonText}
                  type="borderedBtn"
                  className="text-white border border-white-600 text-xs "
                  onClick={() => handleOnClicks(technologyData?.slug)}
                />
              </div>
            </motion.div>
          </div>

          {isButton && (
            <motion.div
              ref={buttonRef}
              className={styles.buttonContainer}
              initial={{ y: 30, opacity: 0.5 }}
              animate={
                buttonInView ? { y: 0, opacity: 1 } : { y: 30, opacity: 0.5 }
              }
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
            >
              <Button
                type="primaryBtn"
                name={ourExpertise.buttons.buttonText}
                className="mt-10"
                onClick={handleClick}
              />
            </motion.div>
          )}
        </div>
      </div>
    </>
  );
};

export default HomeServices;
