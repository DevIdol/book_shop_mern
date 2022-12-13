import React, { Fragment, useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { useSearchParams } from "react-router-dom";
import { SearchContext } from "../../App";
import Books from "../Books/Books";
import styles from "./Contact.module.css";
import { BiSend } from "react-icons/bi";
import { SendMessage } from "./SendMessage";
import {
  validateEmail,
  validateMessage,
  validateName,
} from "../../Validation/Validation";
import { Spinner } from "react-bootstrap";
import { toast } from "react-toastify";
import Footer from "../Footer/Footer";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [messageError, setMessageError] = useState("");
  const [btnLoading, setBtnLoading] = useState(false);

  let [searchParams] = useSearchParams();
  const [send, setSend] = useState();
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
    validateName({ name, setNameError });
    validateEmail({ email, setEmailError });
    validateMessage({ message, setMessageError });
    if (send) {
      toast.success(send.msg);
      setName("");
      setEmail("");
      setMessage("");
      setSend();
    }
  }, [name, email, message, send]);
  const submitHandler = (e) => {
    e.preventDefault();
    setBtnLoading(true);
    if (!nameError & !emailError & !messageError) {
      SendMessage({ name, email, message, setSend }).then(() => {
        setBtnLoading(false);
      });
    }
  };
  useEffect(() => {
    document.title = `BookIDOL | Contact `;
  }, []);
  return (
    <Fragment>
      {query ? (
        <Books query={query} reverseBlogs={reverseBlogs} />
      ) : (
        <div className={styles.contact}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <form onSubmit={submitHandler} className={styles.contactForm}>
              <h4>Get In Touch</h4>
              <div className={styles.inputFill}>
                {nameError && (
                  <span style={{ fontSize: "16px", color: "red" }}>
                    {nameError}
                  </span>
                )}
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  type="text"
                  placeholder="Enter Your Name"
                  required
                />
                {emailError && (
                  <span style={{ fontSize: "16px", color: "red" }}>
                    {emailError}
                  </span>
                )}
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  placeholder="Enter Your Email"
                  required
                />
                {messageError && (
                  <span style={{ fontSize: "16px", color: "red" }}>
                    {messageError}
                  </span>
                )}
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  type="text"
                  placeholder="How can I help you?"
                  rows={4}
                  required
                />
              </div>
              <button
                className={styles.sendBtn}
                type="submit"
                disabled={
                  name.length === 0 ||
                  email.length === 0 ||
                  message.length === 0 ||
                  ((nameError || emailError || messageError) && true)
                }
              >
                {btnLoading ? (
                  <Spinner animation="border" />
                ) : (
                  <Fragment>
                    <span>
                      <BiSend className={styles.sendIcon} />
                    </span>
                    Send
                  </Fragment>
                )}
              </button>
            </form>
          </div>

          <Footer />
        </div>
      )}
    </Fragment>
  );
};

export default Contact;
