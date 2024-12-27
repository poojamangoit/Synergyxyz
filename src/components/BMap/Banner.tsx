/**
 * The `Banner` component represents the main banner section of the BMap page.
 * It displays a primary title, a black title, a primary subtitle, and a subtext.
 * The component uses the `framer-motion` library to animate the content as the user scrolls.
 *
 * @param primaryTitle - The primary title to be displayed.
 * @param blackTitle - The black title to be displayed.
 * @param primarySubtitle - The primary subtitle to be displayed.
 * @param subtext - The subtext to be displayed.
 * @returns A React functional component that renders the banner section.
 */
import React from "react";
import styles from "@/styles/bmap.module.css";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

interface BannerProps {
  primaryTitle: string;
  blackTitle: string;
  primarySubtitle: string;
  subtext: string;
  gifUrl: string;
}

const Banner: React.FC<BannerProps> = ({
  primaryTitle,
  blackTitle,
  primarySubtitle,
  subtext,
  gifUrl,
}) => {
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
      <div className={styles.bannerContent}>
        <motion.p
          className={styles.primaryTitle}
          initial={{ y: 10, opacity: 0 }}
          animate={isVisible ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 1.5, ease: "easeOut" }}
        >
          {primaryTitle}
        </motion.p>
        <motion.p
          className={styles.blackTitle}
          variants={containerVariants}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
        >
          {blackTitle.split(" ").map((word, index) => (
            <motion.span
              key={index}
              variants={wordVariants}
              style={{ display: "inline-block", marginRight: "0.55rem" }}
            >
              {word}
            </motion.span>
          ))}
        </motion.p>
        <motion.h2
          className={styles.primarySubtitle}
          variants={containerVariants}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
        >
          {primarySubtitle.split(" ").map((word, index) => (
            <motion.span
              key={index}
              variants={wordVariants}
              style={{ display: "inline-block", marginRight: "0.25em" }}
            >
              {word}
            </motion.span>
          ))}
        </motion.h2>

        <motion.p className={`${styles.subtext}`}>
          {subtext.split(" ").map((word, index) => (
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
        className={`${styles.bannerGif} w-full md:w-1/2`}
        initial={{ y: 30, opacity: 0.5 }}
        animate={isVisible ? { y: 0, opacity: 1 } : { y: 30, opacity: 0.5 }}
        transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
      >
        <link rel="preload" as="image" href={gifUrl} />
        <img src={gifUrl} alt="Our Method" />
      </motion.div>
    </div>
  );
};

export default Banner;
