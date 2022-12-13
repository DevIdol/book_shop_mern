import React from "react";
import { Link } from "react-router-dom";
import styles from "./Grid.module.css";

const Grid = ({ img, link }) => {
  return (
    <Link className={styles.productImg} to={link}>
      <img src={img} alt="product-img" />
    </Link>
  );
};

export default Grid;
