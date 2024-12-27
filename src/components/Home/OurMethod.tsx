/**
 * Renders a component that displays information about a specific "Our Method" section.
 * The component uses the `useInView` hook from `react-intersection-observer` to trigger animations when the component comes into view.
 * The component renders a heading, title, description, and a button that navigates to a specific URL when clicked.
 *
 * @param {OurMethodProps} props - The props for the component.
 * @param {OurMethod} props.ourMethod - The data for the "Our Method" section.
 * @returns {React.ReactElement} - The rendered component.
 */
import React from "react";
import Button from "@/components/Common/Button";
import styles from "@/styles/home.module.css";
import type { OurMethod } from "@/types/home.type";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

interface OurMethodProps {
  ourMethod: OurMethod;
  gifUrl: string;
}

const OurMethod: React.FC<OurMethodProps> = ({ ourMethod, gifUrl }) => {
  const { buttons } = ourMethod;
  const router = useRouter();

  const handleOnClick = () => {
    router.push(ourMethod.buttons.slug);
  };

  // Use the useInView hook from react-intersection-observer
  const { ref: containerRef, inView: isVisible } = useInView({
    triggerOnce: true, // Trigger the animation only once
    threshold: 0.1, // When 10% of the element is in view
  });

  return (
    <div className={styles.ourImageContainer} ref={containerRef}>
      <div className={styles.ourImageContent}>
        <motion.p
          className={styles.cardHeading}
          initial={{ y: 10, opacity: 0 }}
          animate={isVisible ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          {ourMethod.name}
        </motion.p>
        <motion.h2
          className={styles.methodTitle}
          initial={{ y: 100, opacity: 0 }}
          animate={isVisible ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
        >
          {ourMethod.title}
        </motion.h2>
        <motion.p className={styles.subtitle + " " + styles.hideOnMobile}>
          {ourMethod.description.split(" ").map((word, index) => (
            <motion.span
              key={index}
              initial={{ opacity: 0, x: -80 }}
              animate={isVisible ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="inline-block mr-1"
            >
              {word}
            </motion.span>
          ))}
        </motion.p>
        <motion.div
          className={`${styles.hideOnMobile} mt-5`}
          initial={{ y: 10, opacity: 0, scale: 0.8 }}
          animate={isVisible ? { y: 0, opacity: 1, scale: 1 } : {}}
          transition={{
            duration: 0.7,
            ease: "easeInOut",
            delay: 1.0,
          }}
        >
          <Button
            name={buttons.buttonText}
            type="primaryBtn"
            onClick={handleOnClick}
          />
        </motion.div>
      </div>
      <div className={styles.ourMethodImage}>
        <motion.div
          initial={{ y: 30, opacity: 0.5 }}
          animate={isVisible ? { y: 0, opacity: 1 } : { y: 30, opacity: 0.5 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
        >
          <link rel="preload" as="image" href={gifUrl} />
          <img src={gifUrl} alt="Our Method"  />
        </motion.div>
      </div>
      <div className={styles.ourImageContent + " " + styles.showOnMobile}>
        <motion.p className={styles.subtitle}>
          {ourMethod.description.split(" ").map((word, index) => (
            <motion.span
              key={index}
              initial={{ opacity: 0, x: -10 }}
              animate={isVisible ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.9, delay: 0.5 }}
              className="inline-block mr-1"
            >
              {word}
            </motion.span>
          ))}
        </motion.p>
        <motion.div
          initial={{ y: 10, opacity: 0 }}
          animate={isVisible ? { y: 0, opacity: 1 } : {}}
          transition={{
            duration: ourMethod.description.split(" ").length * 0.1 + 1,
            ease: "easeInOut",
            delay: 2,
          }}
          className="flex justify-center"
        >
          <Button
            name={buttons.buttonText}
            type="primaryBtn"
            onClick={handleOnClick}
          />
        </motion.div>
      </div>
    </div>
  );
};

export default OurMethod;
