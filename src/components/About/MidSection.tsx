/**
 * The `MidSection` component is a React functional component that renders a section in the middle of the page. It takes in two props: `title` and `name`.
 *
 * The component uses the `framer-motion` library to animate the title and name elements. The title is split into individual words and each word is animated to fade in and move up. The name is animated to fade in and move up as well.
 *
 * The component also renders a GIF image that is animated to scale up and fade in.
 *
 * @param {MidSectionProps} props - The props for the `MidSection` component.
 * @param {string} props.title - The title to be displayed.
 * @param {string} props.name - The name to be displayed.
 * @returns {JSX.Element} - The rendered `MidSection` component.
 */

import React from "react";
import styles from "@/styles/about.module.css";
import { motion, useAnimation } from "framer-motion";
import { useScrollAnimation } from "../Common/useScrollAnimation";

interface MidSectionProps {
  title: string;
  name: string;
  gifUrl: string;
}

const MidSection: React.FC<MidSectionProps> = ({ title, name, gifUrl }) => {
  const titleControls = useAnimation();
  const { ref: Ref, inView: InView } = useScrollAnimation();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,

      transition: {
        delayChildren: 1.2,
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

  return (
    <div className={styles.mid_section}>
      <div className={styles.ms_title_container}>
        <motion.p
          className={styles.mid_name}
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.8 }}
          onAnimationComplete={() => titleControls.start("visible")}
        >
          {name}
        </motion.p>

        <motion.h1
          className={styles.mid_title}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {title.split(" ").map((word, index) => (
            <motion.span
              key={index}
              variants={wordVariants}
              style={{ display: "inline-block", marginRight: "0.25em" }}
            >
              {word}
            </motion.span>
          ))}
        </motion.h1>
      </div>

      <motion.div
        ref={Ref}
        initial={{ y: 30, opacity: 0.5 }}
        animate={InView ? { y: 0, opacity: 1 } : { y: 30, opacity: 0.5 }}
        transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
      >
        <link rel="preload" as="image" href={gifUrl} />
        <img src={gifUrl} alt="Banner gif" />
      </motion.div>
    </div>
  );
};
export default MidSection;
