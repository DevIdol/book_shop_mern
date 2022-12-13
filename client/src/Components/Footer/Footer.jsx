import React from "react";
import { FaRegCreditCard } from "react-icons/fa";
import { MdOutlineLocalAtm } from "react-icons/md";
import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter } from "../FollowMe/FollowMe";
import styles from "./Footer.module.css";

const Footer = () => {
    const onTop = () => window.scrollTo(0, 0);
    return (
        <div className={styles.footerWrapper}>
            <div className={styles.footerDes}>
                <div className={styles.left}>
                    <h3>Payment System</h3>
                    <p className={styles.creditCard}>
                        <FaRegCreditCard className={styles.cardIcon} />
                        Credit Card
                    </p>
                    <p className={styles.cashDeli}>
                        <MdOutlineLocalAtm className={styles.cashIcon} />
                        Cash On Delivery
                    </p>
                </div>
                <div className={styles.center}>
                    <h3>BookIDOL</h3>
                    <Link onClick={onTop} className={styles.link} to="/">
                        Home
                    </Link>
                    <Link onClick={onTop} className={styles.link} to="/myanmar-books">
                        Myanmar Books
                    </Link>
                    <Link onClick={onTop} className={styles.link} to="/english-books">
                        English Books
                    </Link>
                    <Link onClick={onTop} className={styles.link} to="/cart">
                        Cart
                    </Link>
                    <Link onClick={onTop} className={styles.link} to="/orders">
                        Order
                    </Link>
                    <Link onClick={onTop} className={styles.link} to="/">
                        Contact
                    </Link>
                </div>
                <div className={styles.right}>
                    <h3>Follow Me</h3>
                    <div className={styles.followMe}>
                        <Facebook />
                        <Instagram />
                        <Twitter />
                    </div>
                </div>
            </div>
            <footer className={styles.footer}>
                <span className={styles.develop}>
                    Developed By{" "}
                    <a
                        href="https://devidol.herokuapp.com"
                        rel="nofollow noopener noreferrer"
                        target="_blank"
                    >
                        DevIdol
                    </a>
                </span>
                <p className={styles.year}>
                    Copyright © 2021 - {new Date().getFullYear()}
                </p>
            </footer>
        </div>
    );
};

export default Footer;
