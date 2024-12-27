/**
 * Renders a contact banner component with an animated name, title, and description.
 *
 * @param name - The name to display in the banner.
 * @param title - The title to display in the banner.
 * @param description - The description to display in the banner.
 * @returns A React component that renders the contact banner.
 */
import React from "react";
import styles from "@/styles/contact.module.css";
import { motion } from "framer-motion";
import { useScrollAnimation } from "../Common/useScrollAnimation";

interface ContactBannerProps {
  name: string;
  title: string;
  description: string;
}

const ContactBanner: React.FC<ContactBannerProps> = ({
  name,
  title,
  description,
}) => {
  const { ref: textRef, inView: textInView } = useScrollAnimation();

  return (
    <div className={styles.banner} ref={textRef}>
      <motion.p
        className={styles.name}
        initial={{ y: 10, opacity: 0 }}
        animate={textInView ? { y: 0, opacity: 1 } : { y: 10, opacity: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {name}
      </motion.p>
      <motion.h3 className={styles.title}>
        {title.split(" ").map((word, index) => (
          <motion.span
            key={index}
            initial={{ opacity: 0, x: -10 }}
            animate={textInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
            transition={{ duration: 0.5, delay: index * 0.1 + 0.8 }}
            style={{ display: "inline-block", marginRight: "0.3em" }}
          >
            {word}
          </motion.span>
        ))}
      </motion.h3>
      <motion.p className={styles.description}>
        {description.split(" ").map((word, index) => (
          <motion.span
            key={index}
            initial={{ opacity: 0, x: -10 }}
            animate={textInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
            transition={{
              duration: 0.5,
              delay: index * 0.1 + title.split(" ").length * 0.1 + 1,
            }}
            className="inline-block mr-1"
          >
            {word}
          </motion.span>
        ))}
      </motion.p>
    </div>
  );
};
export default ContactBanner;
