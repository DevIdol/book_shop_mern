import React from "react";
import styles from "./Loading.module.css";

const Loading = () => {
  return (
    <div className={styles.container}>
      <div className={styles.item}>
        <p>Loading...</p>
      </div>
      <div className={styles.circle}></div>
    </div>
  );
};

export default Loading;
