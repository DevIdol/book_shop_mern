import React from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../../Redux/CartSlice";
import Footer from "../Footer/Footer";
import Card from "../Home/MyanmarBooks/Card";
import styles from "./Books.module.css";

const Books = ({ query, reverseBlogs }) => {
  const dispatch = useDispatch();
  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };
  return (
    <div
      style={{ display: "flex", flexDirection: "column" }}
      className={styles.bookContainer}
    >
      <h1 style={{ fontSize: "32px", fontWeight: "bold", paddingLeft: "10px", paddingRight: "10px" }}>
        Search for "{query}"
      </h1>
      {reverseBlogs.length === 0 ? (
        <h1
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            paddingTop: "80px",
            fontSize: "28px",
            paddingBottom: "180px"
          }}
        >
          No Result Found
        </h1>
      ) : (
        <div className={styles.bookList} style={{ paddingLeft: "10px", paddingRight: "10px" }}>
          {reverseBlogs?.map((product, index) => (
            <Card
              key={index}
              link={`/view-book/${product.title}/${product.id}`}
              img={product.img}
              title={product.title}
              author={product.author}
              price={product.price}
              onClick={() => handleAddToCart(product)}
            />
          ))}

        </div>
      )}
      <Footer />
    </div>
  );
};

export default Books;
