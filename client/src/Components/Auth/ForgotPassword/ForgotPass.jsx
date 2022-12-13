import React, { Fragment, useContext, useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import { Link, useSearchParams } from "react-router-dom";
import { SearchContext } from "../../../App";
import Books from "../../Books/Books";
import MailRoundedIcon from "@mui/icons-material/MailRounded";
import styles from "./ForgotPass.module.css";
import axios from "axios";
import { url } from "../../../Redux/Api";

const ForgotPass = () => {
  const [loading, setLoading] = useState(false);
  const [formIsValid, setFormIsValid] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.post(`${url}/password-change`, { email });
      setLoading(false);
      setMessage(data.message);
      setTimeout(() => {
        setMessage("");
      }, 10000);
      setError("");
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setLoading(false);
        console.log(error.response.data)
        setError(error.response.data.message);
        setTimeout(() => {
          setError("");
        }, 10000);
        setMessage("");
      }
    }
    e.target.reset();
    setFormIsValid(false);
    setLoading(false);
  };
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

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = `BookIDOL | Forgot Password`;
    const identifier = setTimeout(() => {
      setFormIsValid(email.includes("@"));
    }, 1000);

    return () => clearTimeout(identifier);
  }, [email]);

  return (
    <Fragment>
      {query ? (
        <Books query={query} reverseBlogs={reverseBlogs} />
      ) : (
        <div className={styles.wrapper}>
          <div className={styles.forgotPassPage}>
            <h5>Forgot Password</h5>
            {message && (
              <p
                style={{
                  fontSize: "18px",
                  color: "teal",
                  fontWeight: "bold",
                  marginTop: "-30px",
                }}
              >
                {message}
              </p>
            )}
            {error && (
              <p
                style={{
                  fontSize: "18px",
                  color: "tomato",
                  fontWeight: "bold",
                  marginTop: "-30px",
                }}
              >
                {error}
              </p>
            )}
            <form className={styles.form} onSubmit={handleSubmit}>
              <span className={styles.mail}>
                <MailRoundedIcon className={styles.icon} />
              </span>
              <input
                type="email"
                placeholder="Enter Your Email"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button
                type="submit"
                className={styles.submitBtn}
                disabled={!formIsValid}
              >
                {loading ? <Spinner animation="border" /> : "Submit"}
              </button>
            </form>
            <div className={styles.bottom}>
              <Link className={styles.forgotPassword} to="/">
                Back To Home
              </Link>
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default ForgotPass;
