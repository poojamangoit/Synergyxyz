/**
 * The `OurStory` component is responsible for rendering the "Our Story" section of the home page. It displays a carousel of videos along with text content about the company's story.
 *
 * The component receives an `ourStory` prop of type `OurStory`, which contains the data to be displayed, including the story name, highlight text, title, description, and button information.
 *
 * The component uses the `Slider` component from the `react-slick` library to create the carousel, with custom next and previous arrow components. It also uses the `useInView` hook from `react-intersection-observer` to trigger animations when the component comes into view.
 *
 * The animations are implemented using the `motion` components from the `framer-motion` library, which provide smooth transitions and effects.
 *
 * @param {OurStoryProps} props - The props object containing the `ourStory` data.
 * @returns {React.ReactElement} - The rendered `OurStory` component.
 */
import React from "react";
import Button from "@/components/Common/Button";
import styles from "@/styles/home.module.css";
import type { OurStory } from "@/types/home.type";
import { useRouter } from "next/router";

// import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

interface OurStoryProps {
  ourStory: OurStory;
}

// const NextArrow = (props: any) => {
//   const { onClick } = props;

//   return (
//     <div className={`${styles.custom_next_arrow}`} onClick={onClick}>
//       <svg
//         width="24"
//         height="24"
//         viewBox="0 0 24 24"
//         fill="none"
//         xmlns="http://www.w3.org/2000/svg"
//       >
//         <path
//           d="M9 18L15 12L9 6"
//           stroke="white"
//           strokeWidth="2"
//           strokeLinecap="round"
//           strokeLinejoin="round"
//         />
//       </svg>
//     </div>
//   );
// };

// const PrevArrow = (props: any) => {
//   const { onClick } = props;

//   return (
//     <div className={`${styles.custom_prev_arrow}`} onClick={onClick}>
//       <svg
//         width="24"
//         height="24"
//         viewBox="0 0 24 24"
//         fill="none"
//         xmlns="http://www.w3.org/2000/svg"
//       >
//         <path
//           d="M15 18L9 12L15 6"
//           stroke="white"
//           strokeWidth="2"
//           strokeLinecap="round"
//           strokeLinejoin="round"
//         />
//       </svg>
//     </div>
//   );
// };

const OurStory: React.FC<OurStoryProps> = ({ ourStory }) => {
  const router = useRouter();

  // const [isPlaying, setIsPlaying] = useState(true);

  // const settings = {
  //   dots: false,
  //   speed: 500,
  //   slidesToShow: 1.1,
  //   slidesToScroll: 1,
  //   autoplay: true,
  //   autoplaySpeed: 5000,
  //   nextArrow: <NextArrow />,
  //   prevArrow: <PrevArrow />,
  //   responsive: [
  //     {
  //       breakpoint: 767, // for mobile devices
  //       settings: {
  //         slidesToShow: 1,
  //       },
  //     },
  //   ],
  // };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const wordVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 1,
        delay: 0.4,
      },
    },
  };

  const handleOnClick = () => {
    router.push(ourStory.buttons.slug);
  };

  const { ref: containerRef, inView: isVisible } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <div className={styles.ourStoryContainer} ref={containerRef}>
      <div className={styles.ourStoryContent}>
        <motion.p
          className={styles.cardHeading}
          initial={{ y: 50, opacity: 0 }}
          animate={isVisible ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 1 }}
        >
          {ourStory.name}
        </motion.p>
        <motion.p
          className={styles.cardSubHeading}
          variants={containerVariants}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
        >
          {ourStory.highlightText.split(" ").map((word, index) => (
            <motion.span
              className={styles.highlightedText}
              key={index}
              variants={wordVariants}
              style={{ display: "inline-block", marginRight: "0.25em" }}
            >
              {word}
            </motion.span>
          ))}
          <motion.span
            className={styles.title}
            variants={containerVariants}
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
          >
            {ourStory.title.split(" ").map((word, index) => (
              <motion.span
                key={index}
                variants={wordVariants}
                style={{ display: "inline-block", marginRight: "0.25em" }}
              >
                {word}
              </motion.span>
            ))}
          </motion.span>
        </motion.p>

        <motion.p
          className={styles.subtitle}
          initial={{ x: -70, opacity: 0 }}
          animate={isVisible ? { x: 0, opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          {ourStory.description}
        </motion.p>

        <motion.div
          initial={{ x: -60, opacity: 0, scale: 0.8 }}
          animate={isVisible ? { x: 0, opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="mt-5"
        >
          <Button
            name={ourStory.buttons.buttonText}
            type="primaryBtn"
            onClick={handleOnClick}
          />
        </motion.div>
      </div>

      {/* <motion.div
        className={styles.ourStoryCarousel}
        initial={{ y: 100, opacity: 0 }}
        animate={isVisible ? { y: 0, opacity: 1 } : {}}
        transition={{
          duration: 1.2,
          delay: 1.2,
          ease: "easeInOut",
        }}
      >
        <Slider {...settings}>
          {ourStory.videos.data.map((video, index) => (
            <div key={index} className={styles.videoWrapper}>
              <video
                className={styles.videoPlayer}
                loop
                autoPlay={isPlaying}
                muted
                playsInline
                onMouseEnter={() => setIsPlaying(false)}
                onMouseLeave={() => setIsPlaying(true)}
                ref={(el) => {
                  if (el) {
                    isPlaying ? el.play() : el.pause();
                  }
                }}
              >
                <source
                  src={video.attributes.url}
                  type="video/mp4"
                />
              </video>
            </div>
          ))}
        </Slider>
      </motion.div> */}
    </div>
  );
};

export default OurStory;
