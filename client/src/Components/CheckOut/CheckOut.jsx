import React, { Fragment, useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { useSelector } from "react-redux";
import { Link, useSearchParams } from "react-router-dom";
import { SearchContext } from "../../App";
import Books from "../Books/Books";
import usePagination from "../Pagination/Pagination";
import styles from "./CheckOut.module.css";
import { Pagination, Stack } from "@mui/material";
const CheckOut = () => {
  const cart = useSelector((state) => state.cart);
  const [deliveryFee, setDeliveryFee] = useState(2000);
  const [regionState, setRegionState] = useState("Select Region OR State");
  const [city, setCity] = useState("Select City");
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
  let [page, setPage] = useState(1);
  const PER_PAGE = 3;

  const count = Math.ceil(cart.cartItems?.length / PER_PAGE);
  const _DATA = usePagination(cart.cartItems?.slice(0).reverse(), PER_PAGE);

  const handleChange = (e, p) => {
    setPage(p);
    _DATA.jump(p);
  };
  useEffect(() => {
    document.title = `BookIDOL | Check Out `;
  }, []);
  return (
    <Fragment>
      {query ? (
        <Books query={query} reverseBlogs={reverseBlogs} />
      ) : (
        <div className={styles.checkOutPage}>
          {cart.cartItems?.length ? (
            <div className={styles.formContainer}>
              <form className={styles.checkOutForm}>
                <input type="text" placeholder="Full Name" />
                <input type="number" placeholder="Phone No" />
                <select
                  style={{
                    color: regionState === "Select Region OR State" && "grey",
                  }}
                  value={regionState}
                  onChange={(e) => setRegionState(e.target.value)}
                  className={styles.select}
                >
                  <option className={styles.selectType} disabled>
                    Select Region OR State
                  </option>
                  <option>Yangone Region</option>
                  <option>Mandalay Region</option>
                  <option>Sagaing Region</option>
                </select>
                <select
                  style={{ color: city === "Select City" && "grey" }}
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className={styles.select}
                >
                  {regionState === "Select Region OR State" && (
                    <option className={styles.selectType} disabled>
                      Select City
                    </option>
                  )}
                  {regionState === "Yangone Region" && (
                    <Fragment>
                      <option className={styles.selectType} disabled>
                        Select City
                      </option>
                      <option>Thin Gan Gyun</option>
                      <option>Pazundang</option>
                      <option>Hledan</option>
                      <option>Tamwe</option>
                    </Fragment>
                  )}
                  {regionState === "Mandalay Region" && (
                    <Fragment>
                      <option className={styles.selectType} disabled>
                        Select City
                      </option>
                      <option>Mandalay</option>
                      <option>PyinOoLwin</option>
                    </Fragment>
                  )}
                  {regionState === "Sagaing Region" && (
                    <Fragment>
                      <option className={styles.selectType} disabled>
                        Select City
                      </option>
                      <option>Monywa</option>
                      <option>Kalay</option>
                    </Fragment>
                  )}
                </select>
                <input type="text" placeholder="Address" />
              </form>
              <h3>Your Cart</h3>
              {_DATA.currentData().map((item, index) => (
                <div key={index} className={styles.order}>
                  <Link
                    to={`/view-book/${item.title}/${item.id}`}
                    className={styles.productImg}
                  >
                    <img src={item.img} alt="product-img" />
                  </Link>
                  <div className={styles.productDesc}>
                    <Link
                      className={styles.title}
                      to={`/view-book/${item.title}/${item.id}`}
                    >
                      {item.title}
                    </Link>
                    <Link
                      className={styles.price}
                      to={`/view-book/${item.title}/${item.id}`}
                    >
                      Price: {item.price} MMK
                    </Link>
                    <Link
                      className={styles.qty}
                      to={`/view-book/${item.title}/${item.id}`}
                    >
                      Qty: {item.cartQuantity}
                    </Link>
                  </div>
                </div>
              ))}
              <div className={styles.pagination}>
                <Stack spacing={2}>
                  <Pagination
                    size="medium"
                    count={count}
                    page={page}
                    shape="circular"
                    onChange={handleChange}
                  />
                </Stack>
              </div>

              <div className={styles.placeOrder}>
                <div style={{display: "flex", flexDirection: "column"}}>
                  <span style={{fontSize: "18px"}}>Total: {cart.cartTotalAmount + deliveryFee} MMK</span>
                  <span style={{fontSize: "14px", color: "gray", paddingLeft: "2px", fontWeight: 100}}>Total Amount + Delivery Fee</span>
                </div>

                <button>Place Order</button>
              </div>
            </div>
          ) : (
            <h1>No Orders</h1>
          )}
        </div>
      )}
    </Fragment>
  );
};

export default CheckOut;
