import { useDispatch } from "react-redux";
import { Pagination, Stack } from "@mui/material";
import { Link } from "react-router-dom";
import styles from "./CartItems.module.css";
import { BsArrowLeft, BsTrash } from "react-icons/bs";
import {
  addToCart,
  clearCart,
  decreaseCart,
  removeFromCart,
} from "../../Redux/CartSlice";
import { useState } from "react";
import usePagination from "../Pagination/Pagination";
const CartItems = ({ cart }) => {
  const dispatch = useDispatch();

  const handleDecQuantity = (item) => {
    dispatch(decreaseCart(item));
  };

  const handleIncQuantity = (item) => {
    dispatch(addToCart(item));
  };
  const handleClearCart = () => {
    dispatch(clearCart());
  };
  let [page, setPage] = useState(1);
  const PER_PAGE = 1;

  const count = Math.ceil(cart?.length / PER_PAGE);
  const _DATA = usePagination(cart?.slice(0).reverse(), PER_PAGE);

  const handleChange = (e, p) => {
    setPage(p);
    _DATA.jump(p);
  };

  const handleRemoveFromCart = (item) => {
    dispatch(removeFromCart(item));
    setPage(1)
    _DATA.jump(-1);
  };
  return (
    <div>
      {_DATA.currentData().map((item, index) => (
        <div key={index} className={styles.cartItems}>
          <Link
            to={`/view-book/${item.title}/${item.id}`}
            className={styles.productImg}
          >
            <img src={item.img} alt="product-img" />
          </Link>
          <div className={styles.cartDesc}>
            <Link
              to={`/view-book/${item.title}/${item.id}`}
              className={styles.title}
            >
              {item.title}
            </Link>
            <Link
              to={`/view-book/${item.title}/${item.id}`}
              className={styles.author}
            >
              {item.author}
            </Link>
            <Link
              to={`/view-book/${item.title}/${item.id}`}
              className={styles.price}
            >
              {item.price} MMK
            </Link>
            <div>
              <p>
                <span style={{ paddingRight: "6px" }} className={styles.amount}>
                  Quantity:
                </span>
                <button
                  style={{
                    backgroundColor: item.cartQuantity <= 1 && "transparent",
                    color: item.cartQuantity <= 1 && "#ccc",
                    cursor: item.cartQuantity <= 1 && "not-allowed",
                  }}
                  className={styles.decrease}
                  onClick={() => handleDecQuantity(item)}
                  disabled={item.cartQuantity <= 1 && true}
                >
                  -
                </button>
                <span className={styles.quantity}>{item.cartQuantity}</span>
                <button
                  className={styles.increase}
                  onClick={() => handleIncQuantity(item)}
                >
                  +
                </button>
              </p>
            </div>
            <div className={styles.bottom}>
              <p>
                Total:
                <span
                  style={{
                    paddingLeft: "6px",
                    color: "red",
                    fontWeight: "bold",
                  }}
                >
                  {item.price * item.cartQuantity} MMK
                </span>
              </p>

              <BsTrash
                onClick={() => { handleRemoveFromCart(item); }}
                className={styles.trash}
                size={24}
              />
            </div>
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
      <div className={styles.clear}>
        <Link to="/" className={styles.backShop}>
          <span style={{ paddingRight: "4px" }}>
            <BsArrowLeft size={24} />
          </span>
          Continue Shoping
        </Link>
        <button onClick={handleClearCart} className={styles.clearCart}>
          Clear Cart
        </button>
      </div>
    </div>
  );
};

export default CartItems;
