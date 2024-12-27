/**
 * A React component that renders a loading spinner animation using the Framer Motion library.
 * 
 * The `Loader` component is responsible for displaying a loading indicator to the user while
 * some asynchronous operation is in progress. It renders a circular spinner that rotates
 * continuously to indicate that the application is still loading.
 * 
 * The spinner is implemented using the `motion.div` component from the Framer Motion library,
 * which provides a simple way to add animations to React components. The spinner is animated
 * to rotate 360 degrees continuously, with a duration of 2 seconds and a linear easing function.
 */
import React from 'react';
import { motion } from 'framer-motion';

const Loader: React.FC = () => {
  return (
    <div className="loader-container">
    <motion.div
      className="circle"
      animate={{ rotate: 360 }}
      transition={{ repeat: Infinity, duration: 2, ease: 'linear' }}
    >
      <div className="circle-part"></div>
    </motion.div>
  </div>
  );
};

export default Loader;
