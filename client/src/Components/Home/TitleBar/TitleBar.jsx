import React from "react";
import styles from "./TitleBar.module.css";

const TitleBar = ({ title }) => {
  return (
    <div className={styles.titleBar}>
      <h1>{title}</h1>
    </div>
  );
};

export default TitleBar;
