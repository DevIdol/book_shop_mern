import React, { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";
import profileImg from "../../assets/profile.jpg";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { logoutUser } from "../../Redux/AuthSlice";
import styles from "./MenuBar.module.css";
import { toast } from "react-toastify";
import { useConfirm } from "material-ui-confirm";

const MenuBar = ({ openMenu, onClose }) => {
  const confirm = useConfirm();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const handleLogout = () => {
    onClose();
    confirm({ title: "Are you sure to Logout?", confirmationText: "Yes", cancellationText: "No" })
      .then(() => {
        dispatch(logoutUser(null));
        navigate("/");
        toast.warning("Logged Out!", {
          position: "bottom-left",
          autoClose: 1200,
        });
      })
      .catch((error) => console.log(error));
  };
  return (
    <div
      className={
        openMenu ? `${styles.menuBar} ${styles.active}` : styles.menuBar
      }
    >
      <div className={styles.header}>
        {auth._id ? (
          <Fragment>
            <Link to="/manage-account" onClick={onClose}>
              <img className={styles.profile} src={profileImg} alt="profile" />
            </Link>

            <Link to="/manage-account" className={styles.username} onClick={onClose}>
              {auth.name}
            </Link>
            <Link to="/manage-account" className={styles.email} onClick={onClose}>
              {auth.email}
            </Link>
            <Link to="/manage-account" className={styles.account} onClick={onClose}>
              Manage Account
            </Link>
          </Fragment>
        ) : (
          <Fragment>
            <AccountCircleIcon
              onClick={onClose}
              className={styles.profileIcon}
            />
            <Link to="/login" className={styles.username} onClick={onClose}>
              Username
            </Link>
            <Link to="/register" className={styles.account} onClick={onClose}>
              Create An Account
            </Link>
          </Fragment>
        )}
      </div>
      <ul className={styles.items}>
        <NavLink
          style={({ isActive }) => {
            return {
              width: isActive && "100%",
              textAlign: isActive && "center",
              color: isActive && "#000",
              fontWeight: isActive && "bold",
              backgroundColor: isActive && "#f1f3f4",
              borderRadius: isActive && "10px",
            };
          }}
          className={styles.orders}
          to="/orders"
          onClick={onClose}
        >
          Orders
        </NavLink>
        <NavLink
          style={({ isActive }) => {
            return {
              width: isActive && "100%",
              textAlign: isActive && "center",
              color: isActive && "#000",
              fontWeight: isActive && "bold",
              backgroundColor: isActive && "#f1f3f4",
              borderRadius: isActive && "10px",
            };
          }}
          className={styles.contact}
          to="/contact"
          onClick={onClose}
        >
          Contact
        </NavLink>
        {auth._id ? (
          <p
           
            className={styles.logout}
          
            onClick={handleLogout}
          >
            Logout
          </p>
        ) : (
          <NavLink
            style={({ isActive }) => {
              return {
                width: isActive && "100%",
                textAlign: isActive && "center",
                color: isActive && "#000",
                fontWeight: isActive && "bold",
                backgroundColor: isActive && "#f1f3f4",
                borderRadius: isActive && "10px",
              };
            }}
            className={styles.logout}
            to="/login"
            onClick={onClose}
          >
            Login
          </NavLink>
        )}
      </ul>
    </div>
  );
};

export default MenuBar;
