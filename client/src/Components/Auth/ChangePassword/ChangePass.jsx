import React, { Fragment, useContext, useEffect, useState } from "react";
import VpnKeyRoundedIcon from "@mui/icons-material/VpnKeyRounded";
import {
  Link,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { SearchContext } from "../../../App";
import Books from "../../Books/Books";
import styles from "./ChangePass.module.css";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import { Spinner } from "react-bootstrap";
import axios from "axios";
import { url } from "../../../Redux/Api";
import NotFound from "../../../NotFound/NotFound";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../../Redux/AuthSlice";
const ChangePass = () => {
  const auth = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const param = useParams();
  const [showPass, setShowPass] = useState(false);
  const showPassword = () => setShowPass(!showPass);
  const [formIsValid, setFormIsValid] = useState(false);
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [validUrl, setValidUrl] = useState(false);
  const confirmUrl = `${url}/password-change/${param.id}/${param.token}`;

  useEffect(() => {
    setLoading(true);
    const verifyUrl = async () => {
      try {
        await axios.get(confirmUrl);
        setValidUrl(true);
      } catch (error) {
        setValidUrl(false);
      }
    };
    verifyUrl();
    setLoading(false);
  }, [param, confirmUrl]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    auth._id && dispatch(logoutUser(null));
    setLoading(true);
    try {
      const { data } = await axios.post(confirmUrl, {
        password,
      });
      setMessage(data.message);
      setLoading(false);
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
        setError(error.response.data.message);
        setMessage("");
        setTimeout(() => {
          setError("");
        }, 10000);
      }
    }
    e.target.reset();
    setFormIsValid(false);
    setShowPass(false);
    setLoading(false);
    setTimeout(() => navigate("/login"), 10000);
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
    document.title = `BookIDOL | Change Password`;
    const identifier = setTimeout(() => {
      setFormIsValid(password.trim().length > 5 && password === confirmPass);
    }, 1000);

    return () => clearTimeout(identifier);
  }, [password, confirmPass]);
  return (
    <Fragment>
      {query ? (
        <Books query={query} reverseBlogs={reverseBlogs} />
      ) : (
        <Fragment>
          {validUrl ? (
            <div className={styles.wrapper}>
              <div className={styles.changePassPage}>
                <h5>Change Your Password</h5>
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
                  <span className={styles.newPass}>
                    <VpnKeyRoundedIcon />
                  </span>
                  <span className={styles.confirmPass}>
                    <VpnKeyRoundedIcon />
                  </span>
                  <input
                    style={{
                      border:
                        password === confirmPass &&
                        password.length > 5 &&
                        "2px solid teal",
                    }}
                    className={styles.passInput}
                    type={showPass ? "text" : "password"}
                    placeholder="New Password"
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <input
                    style={{
                      border:
                        password === confirmPass &&
                        confirmPass.length > 5 &&
                        "2px solid teal",
                    }}
                    className={styles.passInput}
                    type={showPass ? "text" : "password"}
                    placeholder="Confirm Password"
                    onChange={(e) => setConfirmPass(e.target.value)}
                    required
                  />
                  <span onClick={showPassword} className={styles.showPass}>
                    {showPass ? (
                      <VisibilityOffOutlinedIcon
                        className={styles.showPassIcon}
                      />
                    ) : (
                      <VisibilityOutlinedIcon className={styles.showPassIcon} />
                    )}
                  </span>
                  <button
                    type="submit"
                    className={styles.submitBtn}
                    disabled={!formIsValid}
                  >
                    {loading ? <Spinner animation="border" /> : "Confirm"}
                  </button>
                </form>
                <div className={styles.bottom}>
                  <Link className={styles.forgotPassword} to="/">
                    Back To Home
                  </Link>
                  <Link className={styles.register} to="/login">
                    Go To Login
                  </Link>
                </div>
              </div>
            </div>
          ) : (
            <NotFound status={404} text="Page Not Found!" />
          )}
        </Fragment>
      )}
    </Fragment>
  );
};

export default ChangePass;
