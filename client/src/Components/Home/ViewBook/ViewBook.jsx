import { Fragment, useContext, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams, useSearchParams } from "react-router-dom";
import { SearchContext } from "../../../App";
import { addToCart } from "../../../Redux/CartSlice";
import { useGetAllProductsQuery } from "../../../Redux/ProductApi";
import Books from "../../Books/Books";
import Footer from "../../Footer/Footer";
import NewRelease from "./NewRelease";
import styles from "./ViewBook.module.css";

const ViewBook = () => {
  let [searchParams] = useSearchParams();
  const [{ query }, searchQuery] = useContext(SearchContext);
  const reverseBlogs = searchQuery
    ?.slice(0)
    .reverse()
    .filter((book) => {
      let title = searchParams.get("filter");
      if (!title) return true;
      let search = book.title.toLowerCase() || book.author.toLowerCase();
      return search.startsWith(title.toLowerCase());
    });
  let params = useParams();
  const dispatch = useDispatch();
  const { data } = useGetAllProductsQuery();
  const singleView = (id) => data?.find((product) => product.id === id);
  let product = singleView(parseInt(params.id, 10));

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = `${product.title}`;
  }, [product]);

  return (
    <Fragment>
      {query ? (
        <Books query={query} reverseBlogs={reverseBlogs} />
      ) : (
        <div className={styles.wrapper}>
          <div
            className={styles.viewBook}
            style={{ paddingLeft: "10px", paddingRight: "10px" }}
          >
            <div className={styles.itemsContainer}>
              <div className={styles.bookItems}>
                <div className={styles.productImg}>
                  <img src={product.img} alt="product-img" />
                </div>
                <div className={styles.bookDesc}>
                  <div className={styles.bookContent}>
                    <p className={styles.title}>{product.title}</p>
                    <p className={styles.author}>{product.author}</p>
                    <p className={styles.price}>{product.price} MMK</p>
                  </div>
                </div>
              </div>
              <div className={styles.bookBtn}>
                {/* <button
                  onClick={() => navigate(auth._id ? "/check-out" : "/login")}
                  className={styles.buyBtn}
                >
                  BUY NOW
                </button> */}
                <button
                  onClick={() => handleAddToCart(product)}
                  className={styles.cartBtn}
                >
                  ADD TO CART
                </button>
              </div>
            </div>
            <div className={styles.bookDetails}>
              <h3>Book Details</h3>
              <p className={styles.title} style={{ fontWeight: 400 }}>
                <span
                  style={{
                    paddingRight: "4px",
                    fontSize: "18px",
                    fontWeight: 600,
                    color: "black",
                  }}
                >
                  Title:
                </span>
                {product.title}
              </p>
              <p className={styles.author}>
                <span
                  style={{
                    paddingRight: "4px",
                    fontSize: "18px",
                    fontWeight: 600,
                    color: "black",
                  }}
                >
                  Author:
                </span>
                {product.author}
              </p>
              <p className={styles.pages}>
                <span
                  style={{
                    paddingRight: "4px",
                    fontSize: "18px",
                    fontWeight: 600,
                    color: "black",
                  }}
                >
                  Pages:
                </span>
                {product.page}
              </p>
              <p className={styles.bookType}>
                <span
                  style={{
                    paddingRight: "4px",
                    fontSize: "18px",
                    fontWeight: 600,
                    color: "black",
                  }}
                >
                  Type:
                </span>
                {product.bookType}
              </p>
              <p className={styles.price}>
                <span
                  style={{
                    paddingRight: "4px",
                    fontSize: "18px",
                    fontWeight: 600,
                    color: "black",
                  }}
                >
                  Price:
                </span>
                {product.price} MMK
              </p>
            </div>
          </div>
          <NewRelease />
          <Footer />
        </div>
      )}
    </Fragment>
  );
};

export default ViewBook;
