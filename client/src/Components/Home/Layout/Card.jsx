import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styles from "./Card.module.css";

const Card = ({ link, img, title, author, price, products, onClick }) => {
  const cart = useSelector((state) => state.cart.cartItems);

  const result = cart.filter((o1) => products.some((o2) => o1.id === o2.id));
 

  return (
    <div className={styles.card}>
      <Link to="/" className={styles.productImg}>
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
