import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getTotals } from "../../Redux/CartSlice";
import styles from "./CheckOut.module.css";

const CheckOut = ({ cart }) => {
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth);
  const [deliveryFee, setDeliveryFee] = useState(2000);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTotals());
  }, [cart, dispatch]);

  return (
    <div className={styles.checkOut}>
      <h3>Summary</h3>
      <p>
        Product Count:
        <span style={{ paddingLeft: "10px", fontSize: "18px" }}>
          {cart.cartTotalQuantity}
        </span>
      </p>
      <p>
        Delivery Fee:
        <span style={{ paddingLeft: "10px", fontSize: "18px" }}>
          {deliveryFee} MMK
        </span>
      </p>
      <p style={{ paddingBottom: "14px" }}>
        Total Price:
        <span style={{ paddingLeft: "10px", fontSize: "18px" }}>
          {cart.cartTotalAmount + deliveryFee} MMK
        </span>
      </p>
      {auth._id ? (
        <button
          onClick={() => navigate("/check-out")}
          className={styles.checkOutBtn}
        >
          Check Out
        </button>
      ) : (
        <Link className={styles.login} to="/login">
          Login to Check Out
        </Link>
      )}
    </div>
  );
};

export default CheckOut;
