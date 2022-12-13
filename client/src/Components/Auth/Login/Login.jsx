import { Link, useNavigate, useSearchParams } from "react-router-dom";
import styles from "./Login.module.css";
import MailRoundedIcon from "@mui/icons-material/MailRounded";
import VpnKeyRoundedIcon from "@mui/icons-material/VpnKeyRounded";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import { Fragment, useContext, useEffect, useState } from "react";
import { SearchContext } from "../../../App";
import Books from "../../Books/Books";
import { Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../../Redux/AuthSlice";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const [formIsValid, setFormIsValid] = useState(false);
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const emailValidate = user.email;
  const passwordValidate = user.password;
  useEffect(() => {
    auth._id && navigate("/cart");
    const identifier = setTimeout(() => {
      setFormIsValid(
        emailValidate.toLocaleLowerCase().includes("@") && passwordValidate.trim().length > 5
      );
    }, 1000);
    return () => clearTimeout(identifier);
  }, [auth._id, navigate, emailValidate, passwordValidate]);
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser(user));
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
  const [showPass, setShowPass] = useState(false);
  const showPassword = () => setShowPass(!showPass);
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = `BookIDOL | Login`;
  }, []);

  return (
    <Fragment>
      {query ? (
        <Books query={query} reverseBlogs={reverseBlogs} />
      ) : (
        <div className={styles.wrapper}>
          <div className={styles.loginPage}>
            <h5>Welcome Back, Please Login</h5>
            {auth.loginStatus === "rejected" && (
              <p className={styles.loginError}>{auth.loginError}</p>
            )}
            <form className={styles.form} onSubmit={handleSubmit}>
              <span className={styles.mail}>
                <MailRoundedIcon className={styles.icon} />
              </span>
              <input
                type="email"
                placeholder="Email"
                onChange={(e) => setUser({ ...user, email: e.target.value })}
                required
              />
              <span className={styles.pass}>
                <VpnKeyRoundedIcon className={styles.icon} />
              </span>
              <input
                className={styles.passInput}
                type={showPass ? "text" : "password"}
                placeholder="Password"
                onChange={(e) => setUser({ ...user, password: e.target.value })}
                required
              />

              <span onClick={showPassword} className={styles.showPass}>
                {showPass ? (
                  <VisibilityOffOutlinedIcon className={styles.showPassIcon} />
                ) : (
                  <VisibilityOutlinedIcon className={styles.showPassIcon} />
                )}
              </span>
              <button
                type="submit"
                className={styles.loginBtn}
                disabled={!formIsValid}
              >
                {auth.loginStatus === "pending" ? (
                  <Spinner animation="border" />
                ) : (
                  "Login"
                )}
              </button>
            </form>
            <div className={styles.bottom}>
              <Link className={styles.forgotPassword} to="/forgot-password">
                Forgot Password?
              </Link>
              <Link className={styles.register} to="/register">
                Create New Account
              </Link>
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default Login;
