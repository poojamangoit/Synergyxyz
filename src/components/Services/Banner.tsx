/**
 * Renders a banner component with a heading, description, and an image.
 *
 * @param {BannerProps} props - The props for the banner component.
 * @param {HeadingDetail} props.heading - The heading details, including the name, title, and description.
 * @param {string} props.imgSrc - The source URL of the image to be displayed.
 * @returns {React.ReactElement} - The rendered banner component.
 */

import styles from "@/styles/serviceSubPages.module.css";
import { HeadingDetail } from "@/types/service.type";
import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

interface BannerProps {
  heading: HeadingDetail;
  imgSrc: string;
}
const Banner: React.FC<BannerProps> = ({ heading, imgSrc }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const wordVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  const { ref: containerRef, inView: isVisible } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <div className={styles.bannerContainer} ref={containerRef}>
      <div className={styles.leftSide}>
        <motion.p
          className={styles.title}
          initial={{ y: 10, opacity: 0 }}
          animate={isVisible ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 1.5, ease: "easeOut" }}
        >
          {heading.departmentNameForListing}
        </motion.p>
        <motion.h2
          className={styles.subtitle}
          variants={containerVariants}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
        >
          {heading.title.split(" ").map((word, index) => (
            <motion.span
              key={index}
              variants={wordVariants}
              style={{ display: "inline-block", marginRight: "0.25em" }}
            >
              {word}
            </motion.span>
          ))}
        </motion.h2>
        <motion.p className={styles.description}>
          {heading.description.split(" ").map((word, index) => (
            <motion.span
              key={index}
              initial={{ opacity: 0, x: -10 }}
              animate={isVisible ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.9, delay: 0.2 + index * 0.1 }}
              className="inline-block mr-1"
            >
              {word}
            </motion.span>
          ))}
        </motion.p>
      </div>
      <motion.div
        className={styles.rightSide}
        initial={{ y: 30, opacity: 0.5 }}
        animate={isVisible ? { y: 0, opacity: 1 } : { y: 30, opacity: 0.5 }}
        transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
      >
        <div className={styles.images_box}>
          <link rel="preload" as="image" href={imgSrc} />
          <img
            src={imgSrc}
            alt="Service illustration"
            className={styles.image}
          />
        </div>
      </motion.div>
    </div>
  );
};

export default Banner;
