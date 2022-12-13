import { BsTwitter, BsFacebook, BsInstagram } from "react-icons/bs";
import styles from "./FollowMe.module.css";

export const Facebook = () => (
    <a
        rel="nofollow noopener noreferrer"
        href="https://www.facebook.com/profile.php?id=100026052723303"
        target="_blank"
    >
        <BsFacebook className={styles.facebook} />
    </a>
);
export const Instagram = () => (
    <a
        rel="nofollow noopener noreferrer"
        href="https://www.instagram.com/jostthang/"
        target="_blank"
    >
        <BsInstagram className={styles.instagram} />
    </a>
);
export const Twitter = () => (
    <a
        rel="nofollow noopener noreferrer"
        href="https://twitter.com/johst21"
        target="_blank"
    >
        <BsTwitter className={styles.twitter} />
    </a>
);


