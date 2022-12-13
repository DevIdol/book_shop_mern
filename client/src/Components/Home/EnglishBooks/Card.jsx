import React from "react";

import { Link } from "react-router-dom";
import styles from "./Card.module.css";

const Card = ({ link, img, title, author, price, onClick }) => {
  return (
    <div className={styles.card}>
      <Link to={link} className={styles.productImg}>
        <img src={img} alt="product-img" />
      </Link>
      <div className={styles.desc}>
        <div className={styles.content}>
          <Link to={link} className={styles.title}>
            {title}
          </Link>
          <Link to={link} className={styles.author}>
            {author}
          </Link>
          <Link to={link} className={styles.price}>
            {price} MMK
          </Link>
        </div>

        <button onClick={onClick} className={styles.addCart} type="submit">
          Add To Cart
        </button>
      </div>
    </div>
  );
};

export default Card;
