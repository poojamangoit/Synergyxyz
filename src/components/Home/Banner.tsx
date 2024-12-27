/**
 * A React component that renders a banner image with a heading and text.
 *
 * The component uses the Framer Motion library to animate the heading and image.
 * The heading is split into individual words and each word is animated separately.
 * The text is also animated with a staggered effect.
 *
 * @param {BannerImageComponentProps} props - The props for the component.
 * @param {string} props.heading - The heading text to be displayed.
 * @param {string} props.text - The text to be displayed below the heading.
 * @returns {React.ReactElement} - The rendered banner image component.
 */
import React, { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { Link as ReactScrollLink } from "react-scroll";
import styles from "@/styles/home.module.css";
import { useScrollAnimation } from "../Common/useScrollAnimation";

interface BannerImageComponentProps {
  heading: string;
  text: string;
  gifUrl: string;
}

const BannerImageComponent: React.FC<BannerImageComponentProps> = ({
  heading,
  text,
  gifUrl,
}) => {
  const controls = useAnimation();
  const imgControls = useAnimation();
  const headingParts = heading.split(" ");
  const { ref: Ref, inView: Inview } = useScrollAnimation();

  useEffect(() => {
    const animateSequence = async () => {
      await controls.start((i) => ({
        x: 0,
        opacity: 1,
        scale: 1,
        transition: { delay: i * 0.2, duration: 0.5 },
      }));
      imgControls.start({ scale: 1, opacity: 1 });
    };
    animateSequence();
  }, [controls, imgControls]);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        when: "beforeChildren",
      },
    },
  };

  const itemVariants = {
    hidden: (custom: number) => ({
      x: custom === 3 || custom === 6 ? 100 : -100,
      y: custom < 4 ? -100 : 100,
      scale: 1.5,
      opacity: 0,
      filter: "blur(5px)",
    }),
    show: (custom: number) => ({
      x: 0,
      y: 0,
      opacity: 1,
      rotate: 0,
      scale: 1,
      filter: "blur(0px)",
      transition: {
        type: "linear",
        duration:
          custom === 4 ? 0.55 : custom === 5 ? 0.7 : custom === 6 ? 0.9 : 0.5,
        delay:
          custom === 6 ? 0.4 : custom === 4 ? 0.2 : custom === 5 ? 0.3 : 0.1,
      },
    }),
  };

  return (
    <div
      className={`${styles.ourStoryContainer} relative h-screen flex flex-col items-center justify-center`}
    >
      <motion.h1
        className="flex flex-wrap items-center justify-center w-full max-w-3xl "
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        {headingParts.map((part, index) => (
          <motion.div
            key={index}
            custom={index + 1}
            className={`text-primary-blue text-5xl md:text-6xl z-10 relative font-${
              index === 5 ? "medium" : "light"
            } uppercase text-center  relative top-[80px] max-w-3xl mr-2 mb-2`}
            variants={itemVariants}
          >
            <ReactScrollLink
              to="aboutSection"
              spy={true}
              smooth={true}
              offset={-100}
              duration={200}
            >
              {part}
            </ReactScrollLink>
          </motion.div>
        ))}
      </motion.h1>

      <motion.div
        ref={Ref}
        initial={{ y: 30, opacity: 0.5 }}
        animate={Inview ? { y: 0, opacity: 1 } : { y: 30, opacity: 0.5 }}
        transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
        style={{ willChange: "transform, opacity" }}
      >
        <link rel="preload" as="image" href={gifUrl} />
        <img
          src={gifUrl}
          alt="banner"
          width={400}
          height={200}
          decoding="async"
          style={{ opacity: 1, transition: "opacity 0.5s ease-out" }}
        />
      </motion.div>

      <motion.p
        className="text-dark-grey text-lg font-normal relative bottom-[0px] w-full max-w-md text-center leading-[21px]"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { x: -100, opacity: 0 },
          visible: {
            x: 0,
            opacity: 1,
            transition: {
              staggerChildren: 0.1,
              delayChildren: 1.5,
            },
          },
        }}
      >
        {text.split(" ").map((word, index) => (
          <motion.span
            key={index}
            className="inline-block mr-1"
            variants={{
              hidden: { opacity: 0, x: -20 },
              visible: {
                opacity: 1,
                x: 0,
                transition: {
                  duration: 0.5,
                },
              },
            }}
          >
            {word}
          </motion.span>
        ))}
      </motion.p>
    </div>
  );
};

export default BannerImageComponent;
