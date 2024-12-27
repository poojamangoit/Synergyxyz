/**
 * A React component that renders a card with an optional image, title, and subtitle.
 * The card can have different styles based on the provided props.
 *
 * @param {CardProps} props - The props for the Card component.
 * @param {string} props.title - The title of the card.
 * @param {React.ReactNode} props.subtitle - The subtitle of the card.
 * @param {string} [props.imageSrc] - The source of the image to be displayed in the card.
 * @param {string} props.backgroundColor - The background color of the card.
 * @param {boolean} props.isImage - Determines whether the card should display an image.
 * @param {boolean} [props.isAboutUs] - Determines whether the card is part of the "About Us" section.
 * @param {boolean} [props.isBmapPage] - Determines whether the card is part of the "Bmap" page.
 * @returns {JSX.Element} - The rendered Card component.
 */
import React from "react";
import styles from "@/styles/card.module.css";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";


interface CardProps {
  title: string;
  subtitle: React.ReactNode;
  imageSrc?: string;
  backgroundColor: string;
  isImage: boolean;
  isAboutUs?: boolean;
  isBmapPage?: boolean;
  slug?: string;
}

const Card: React.FC<CardProps> = ({
  title,
  subtitle,
  imageSrc,
  backgroundColor,
  isImage,
  isAboutUs,
  isBmapPage,
  slug,
}) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ y: 30, opacity: 0.5 }}
      animate={inView ? { y: 0, opacity: 1 } : { y: 30, opacity: 0.5 }}
      transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
      className={`${
        isAboutUs
          ? styles.card_container_about_us
          : isBmapPage
          ? styles.card_container_bmap
          : styles.card_container
      } ${backgroundColor} ${slug}`}
    >
      {isImage && imageSrc ? (
        <>
          <div
            className={`${
              isBmapPage ? styles.card_content_bmap : styles.card_content
            }`}
          >
            <motion.h2 className={`${styles.card_title}`}>{title}</motion.h2>
            <motion.p className={`${styles.card_subtitle}`}>
              {subtitle}
            </motion.p>
          </div>
          <motion.div className={`${styles.card_image}  ${slug}`}>
            <link rel="preload" as="image" href={imageSrc} />
            <img
              src={imageSrc}
              alt={title}
              className={`${styles.card_image_content}`}
            />
          </motion.div>
        </>
      ) : (
        <motion.div
          ref={ref}
          initial={{ y: 30, opacity: 0.5 }}
          animate={inView ? { y: 0, opacity: 1 } : { y: 30, opacity: 0.5 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
          className={`${
            isAboutUs
              ? styles.card_content_full_about_us
              : isBmapPage
              ? styles.card_content_bmap
              : styles.card_content_full
          }`}
        >
          <motion.h2
            className={`${
              !isImage || !isAboutUs
                ? styles.card_title_blue
                : styles.card_title
            }`}
          >
            {title}
          </motion.h2>
          <motion.p className={`${styles.card_subtitle}`}>{subtitle}</motion.p>
        </motion.div>
      )}
    </motion.div>
  );
};

export default Card;
