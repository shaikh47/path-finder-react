import { useState } from "react";
import styles from "./Switch.module.css";

function Switch() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleToggle = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <>
      {/* <img
        src={moon}
        sclassName={isDarkMode ? styles.dot_night : styles.dot_day}
      /> */}
      <div
        className={`${styles.container_day} ${
          isDarkMode ? styles.container_night : ""
        }`}
        onClick={handleToggle}
      >
        <div className={`${styles.moonContainer}`}>
          <div
            className={`${styles.shade1_day} ${styles.dot_day} ${
              isDarkMode ? styles.shade1_night : ""
            }`}
          ></div>
          <div
            className={`${styles.shade2_day} ${styles.dot_day} ${
              isDarkMode ? styles.shade2_night : ""
            }`}
          ></div>
          <div
            className={`${styles.dot_day} ${
              isDarkMode ? styles.dot_night : ""
            }`}
          ></div>
        </div>
      </div>
    </>
  );
}

export default Switch;
