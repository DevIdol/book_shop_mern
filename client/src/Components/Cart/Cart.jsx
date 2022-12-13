import { BsArrowLeft } from "react-icons/bs";
import { Link, useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";
import styles from "./Cart.module.css";
import CartItems from "./CartItems";
import CheckOut from "./CheckOut";
import { Fragment, useContext, useEffect } from "react";
import NewRelease from "../Home/ViewBook/NewRelease";
import { SearchContext } from "../../App";
import Books from "../Books/Books";
import Footer from "../Footer/Footer";

const Cart = () => {
  let [searchParams] = useSearchParams();
  const [{ query }, searchQuery] = useContext(SearchContext);
  const cart = useSelector((state) => state.cart);
  const reverseBlogs = searchQuery
    ?.slice(0)
    .reverse()
    .filter((book) => {
      let title = searchParams.get("filter");
      if (!title) return true;
      let search = book.title.toLowerCase() || book.author.toLowerCase();
      return search.startsWith(title.toLowerCase());
    });
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = `BookIDOL | Shopping Cart`;
  }, []);
  return (
    <Fragment>
      {query ? (
        <Books query={query} reverseBlogs={reverseBlogs} />
      ) : (
        <div className={styles.cartContainer}>
          <h1 className={styles.cartTitle}>Shopping Cart</h1>
          {cart.cartItems.length === 0 ? (
            <div className={styles.emptyCart}>
              <p>Your cart is empty</p>
              <Link to="/" className={styles.backShop}>
                <span style={{ paddingRight: "4px" }}>
                  <BsArrowLeft size={24} />
                </span>
                Continue Shoping
              </Link>
            </div>
          ) : (
            <div className={styles.cart} style={{ paddingLeft: "10px", paddingRight: "10px" }}>
              <CartItems cart={cart.cartItems} />
              <CheckOut cart={cart} />
            </div>
          )}
          <NewRelease />
          <Footer />
        </div>
      )}
    </Fragment>
  );
};

export default Cart;
