import { useState } from "react";
import styles from "./Switch.module.css";

function Switch({ value, onToggle }) {

  const handleToggle = () => {
    onToggle(!value);
  };

  return (
    <>
      <div
        className={`${styles.container_day} ${
          value ? styles.container_night : ""
        }`}
        onClick={handleToggle}
      >
        <div className={`${styles.moonContainer}`}>
          <div
            className={`${styles.shade1_day} ${styles.dot_day} ${
              value ? styles.shade1_night : ""
            }`}
          ></div>
          <div
            className={`${styles.shade2_day} ${styles.dot_day} ${
              value ? styles.shade2_night : ""
            }`}
          ></div>
          <div
            className={`${styles.dot_day} ${
              value ? styles.dot_night : ""
            }`}
          ></div>
        </div>
      </div>
    </>
  );
}

export default Switch;
