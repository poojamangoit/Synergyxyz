/**
 * A custom React hook that uses the `react-intersection-observer` library to detect when an element comes into view.
 *
 * @param {number} [threshold=0.1] - The percentage of the element that must be visible to trigger the `inView` state.
 * @param {boolean} [triggerOnce=true] - Whether the `inView` state should only be triggered once, or on every scroll event.
 * @returns {object} - An object containing the `ref` to attach to the element and the `inView` boolean indicating if the element is in view.
 */
import { useInView } from "react-intersection-observer";

export const useScrollAnimation = (threshold = 0.1, triggerOnce = true) => {
  const [ref, inView] = useInView({
    triggerOnce,
    threshold,
  });

  return { ref, inView };
};
