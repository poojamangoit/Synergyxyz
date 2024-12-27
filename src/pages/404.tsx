/**
 * Renders a 404 page component with a heading, description, and a button to go back to the previous page.
 * The component uses the Framer Motion library to animate the elements.
 */

import { motion } from "framer-motion";
import styles from "@/styles/404.module.css";
import Button from "@/components/Common/Button";
import { useRouter } from "next/router";

const NotFoundPage = () => {
  const router = useRouter();

  return (
    <div className={styles.container}>
      <motion.h1
        className={styles.heading}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        404 - Page Not Found
      </motion.h1>
      <motion.p
        className={styles.description}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        Sorry, the page you are looking for does not exist.
      </motion.p>
      <motion.a
        href="#"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        whileHover={{ scale: 1.1 }}
      >
        <Button
          type="borderedBtn"
          name="Go Back"
          className="text-primary-blue border border-primary-blue text-xl"
          onClick={() => {
            router.back();
          }}
        />
      </motion.a>
    </div>
  );
};

export default NotFoundPage;
