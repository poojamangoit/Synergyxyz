/**
 * Renders an error message component with the provided error message.
 *
 * @param {string | any} toastMessage - The error message to display.
 * @returns {React.ReactElement} - A React component that displays the error message.
 */
import styles from "@/styles/contact.module.css";

const ShowError = (toastMessage: string | any) => {
  return <p className={styles.error_message}>{toastMessage}</p>;
};

export default ShowError;
