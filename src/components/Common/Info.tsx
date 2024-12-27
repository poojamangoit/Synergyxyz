import React from "react";
import styles from "@/styles/privacyAndTerms.module.css";
import { BodyData } from "@/types/privacypolicy.type";

interface InfoProps {
  body: BodyData;
}

const Info: React.FC<InfoProps> = ({ body }) => {
  return (
    <div className={styles.background}>
      <div className={styles.container}>
        <div dangerouslySetInnerHTML={{ __html: body.content }}></div>
      </div>
    </div>
  );
};

export default Info;
