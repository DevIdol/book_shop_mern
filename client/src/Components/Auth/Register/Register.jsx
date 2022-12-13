import { Link, useNavigate, useSearchParams } from "react-router-dom";
import styles from "./Register.module.css";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import MailRoundedIcon from "@mui/icons-material/MailRounded";
import VpnKeyRoundedIcon from "@mui/icons-material/VpnKeyRounded";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import { Fragment, useContext, useEffect, useState } from "react";
import { SearchContext } from "../../../App";
import Books from "../../Books/Books";
import { useSelector, useDispatch } from "react-redux";
import { registerUser } from "../../../Redux/AuthSlice";
import { Spinner } from "react-bootstrap";
const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formIsValid, setFormIsValid] = useState(false);
  const auth = useSelector((state) => state.auth);

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });
  const nameValidate = user.name;
  const emailValidate = user.email;
  const passwordValidate = user.password;
  useEffect(() => {
    auth._id && navigate("/cart");
    const identifier = setTimeout(() => {
      setFormIsValid(
        nameValidate.trim().length > 1 &&
          emailValidate.toLocaleLowerCase().includes("@") &&
          passwordValidate.trim().length > 5
      );
    }, 1000);
    return () => clearTimeout(identifier);
  }, [auth._id, navigate, nameValidate, emailValidate, passwordValidate]);
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(registerUser(user));
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
    document.title = `BookIDOL | Create An Account`;
  }, []);
  return (
    <Fragment>
      {query ? (
        <Books query={query} reverseBlogs={reverseBlogs} />
      ) : (
        <div className={styles.wrapper}>
          <div className={styles.registerPage}>
            <h5>Welcome, Create Account</h5>
            {auth.registerStatus === "success" && (
              <p className={styles.registerMessage}>{auth.registerMessage}</p>
            )}
            {auth.registerStatus === "rejected" && (
              <p className={styles.registerError}>{auth.registerError}</p>
            )}
            <form className={styles.form} onSubmit={handleSubmit}>
              <span className={styles.name}>
                <PersonRoundedIcon className={styles.icon} />
              </span>
              <input
                type="text"
                placeholder="Full Name"
                onChange={(e) => setUser({ ...user, name: e.target.value })}
                required
              />
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
              <button className={styles.registerBtn} disabled={!formIsValid}>
                {auth.registerStatus === "pending" ? (
                  <Spinner animation="border" />
                ) : (
                  "Create Account"
                )}
              </button>
            </form>
            <div className={styles.bottom}>
              <Link className={styles.login} to="/login">
                Already have an account? Please Login
              </Link>
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default Register;
