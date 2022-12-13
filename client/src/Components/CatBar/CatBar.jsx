import React, { Fragment, useEffect, useState } from "react";
import { BiCategory } from "react-icons/bi";
import { TbMinusVertical } from "react-icons/tb";
import { HiOutlineChevronRight } from "react-icons/hi";
import styles from "./CatBar.module.css";
import { Link, Outlet, useLocation, useParams } from "react-router-dom";
import Category from "../Category/Category";
const CatBar = () => {
  const param = useParams();
  const location = useLocation();
  const pathName = location.pathname.split("/")[1];
  const [openMenu, setOpenMenu] = useState(false);

  const toggleMenu = () => {
    setOpenMenu(!openMenu);
  };
  const closeMenu = () => {
    setOpenMenu(false);
  };
  useEffect(() => {
    document.title = `BookIDOL ${pathName && "|"} ${pathName} `;
  }, [pathName]);

  return (
    <Fragment>
      <div className={styles.catBar}>
        <div className={styles.catContainer}>
          <BiCategory
            onClick={toggleMenu}
            className={styles.catIcon}
            size={22}
          />
          <p className={styles.cat}>Categories</p>
          <TbMinusVertical className={styles.divider} size={22} />
        </div>
        <ul className={styles.items}>
          <Link to="/" className={styles.item}>
            Home
          </Link>
          <HiOutlineChevronRight className={styles.arrow} size={20} />
          {pathName === "" && (
            <Link to="/" className={styles.item}>
              All
            </Link>
          )}
          {pathName === "myanmar-books" && (
            <Link to="/myanmar-books" className={styles.item}>
              Myanmar Books
            </Link>
          )}
          {pathName === "myanmar-stories" && (
            <Link to="/myanmar-books" className={styles.item}>
              Myanmar Books
            </Link>
          )}
          {pathName === "myanmar-novels" && (
            <Link to="/myanmar-books" className={styles.item}>
              Myanmar Books
            </Link>
          )}
          {pathName === "myanmar-technologies" && (
            <Link to="/myanmar-books" className={styles.item}>
              Myanmar Books
            </Link>
          )}
          {pathName === "myanmar-religious" && (
            <Link to="/myanmar-books" className={styles.item}>
              Myanmar Books
            </Link>
          )}

          {pathName === "english-books" && (
            <Link to="/english-books" className={styles.item}>
              English Books
            </Link>
          )}
          {pathName === "english-stories" && (
            <Link to="/english-books" className={styles.item}>
              Englsih Books
            </Link>
          )}
          {pathName === "view-book" && (
            <Link to="/view-book" className={styles.item}>
              View Book
            </Link>
          )}
          {pathName === "english-novels" && (
            <Link to="/english-books" className={styles.item}>
              Englsih Books
            </Link>
          )}
          {pathName === "english-technologies" && (
            <Link to="/english-books" className={styles.item}>
              Englsih Books
            </Link>
          )}
          {pathName === "english-religious" && (
            <Link to="/english-books" className={styles.item}>
              Englsih Books
            </Link>
          )}
          {pathName === "cart" && (
            <Link to="/cart" className={styles.item}>
              Shopping Cart
            </Link>
          )}
          {pathName === "orders" && (
            <Link to="/orders" className={styles.item}>
              Order
            </Link>
          )}
          {pathName === "contact" && (
            <Link to="/contact" className={styles.item}>
              Contact
            </Link>
          )}
          {pathName === "check-out" && (
            <Link to="/check-out" className={styles.item}>
              Check Out
            </Link>
          )}
          {pathName === "login" && (
            <Link to="/login" className={styles.item}>
              Login
            </Link>
          )}
          {pathName === "register" && (
            <Link to="/register" className={styles.item}>
              Create An Account
            </Link>
          )}
          {pathName === "manage-account" && (
            <Link to="/manage-account" className={styles.item}>
              Manage Account
            </Link>
          )}
          {pathName === "forgot-password" && (
            <Link to="/forgot-password" className={styles.item}>
              Forgot Password
            </Link>
          )}
          {pathName === "password-change" && (
            <Link
              to={`/password-change/${param.id}/${param.token}`}
              className={styles.item}
            >
              Change Password
            </Link>
          )}
          {/* <Link to={`/${pathName}`} className={styles.item}>
            {pathName
              ? pathName === "cart"
                ? "Shopping Cart"
                : viewBook
                ? "View Book"
                : all
                ? "All"
                : pathName
              : "All"}
          </Link> */}
        </ul>
      </div>
      <div
        className={
          openMenu ? `${styles.sideBar} ${styles.active}` : styles.sideBar
        }
      >
        <Category onClose={closeMenu} />
      </div>
      {openMenu && <div onClick={closeMenu} className={styles.overflow}></div>}
      <Outlet />
    </Fragment>
  );
};

export default CatBar;
