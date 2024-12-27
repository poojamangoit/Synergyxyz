/**
 * The `OurSolution` component displays a section of the application that showcases the differentiators of the product or service.
 * It uses the `Differentiator` type to render a list of `DifferentiatorItem` components, each with a title, description, and order number.
 * The component uses the `framer-motion` library to animate the elements as they come into view.
 *
 * @param {OurSolutionProps} props - The props for the `OurSolution` component.
 * @param {Differentiator} props.differentiators - The differentiators to be displayed.
 * @returns {React.ReactElement} - The `OurSolution` component.
 */
import { Differentiator, DifferentiatorItem } from "@/types/service.type";
import styles from "@/styles/ourSolution.module.css";
import { motion } from "framer-motion";
import React from "react";
import { useInView } from "react-intersection-observer";

interface OurSolutionProps {
  differentiators: Differentiator;
}

interface DifferentiatorItemProps {
  item: DifferentiatorItem;
  index: number;
  totalItems: number;
}

const DifferentiatorItemComponent: React.FC<DifferentiatorItemProps> = ({
  item,
  index,
  totalItems,
}) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.div
      ref={ref}
      className={styles.differentiator_item}
      initial={{ y: 10, opacity: 0 }}
      animate={inView ? { y: 0, opacity: 1 } : { y: 10, opacity: 0 }}
      transition={{ duration: 0.5, ease: "easeOut", delay: index * 0.2 }}
    >
      <div className={styles.item_box}>
        <p className={styles.order}>{`${item.order}/`}</p>
        <div className={styles.item_content}>
          <h3 className={styles.item_title}>{item.title}</h3>
          <p className={styles.item_description}>{item.description}</p>
        </div>
        {index < totalItems - 1 && <hr style={{borderColor: '#939598',margin:'32px 0px'}}/>}
      </div>
    </motion.div>
  );
};

const OurSolution: React.FC<OurSolutionProps> = ({ differentiators }) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.div
      ref={ref}
      className={styles.container}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div>
        <motion.p
          className={styles.name}
          initial={{ y: 20, opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
        >
          {differentiators.name}
        </motion.p>

        <motion.h3
          className={styles.title}
          initial={{ y: 20, opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.4 }}
        >
          {differentiators.title}
        </motion.h3>
      </div>
      <div>
        <div>
          {differentiators.differentiator.map((item, index) => (
            <DifferentiatorItemComponent
              key={index}
              item={item}
              index={index}
              totalItems={differentiators.differentiator.length}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
};
export default OurSolution;
