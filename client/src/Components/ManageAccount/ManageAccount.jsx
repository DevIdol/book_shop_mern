import React, { Fragment } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import { SearchContext } from "../../App";
import { logoutUser } from "../../Redux/AuthSlice";
import profileImg from "../../assets/profile.jpg";
import Books from "../Books/Books";
import styles from "./ManageAccount.module.css";
import { Dropdown } from "react-bootstrap";
import { MdOutlineModeEditOutline } from "react-icons/md";
import ChangeName from "./ChangeName";
import ChangeEmail from "./ChangeEmail";
import ChangePassword from "./ChangePassword";
import { useConfirm } from "material-ui-confirm";
import { BsCircleFill } from "react-icons/bs";

const ManageAccount = () => {
  const confirm = useConfirm();
  const auth = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
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

  const handleLogout = () => {
    confirm({
      title: "Are you sure to Logout?",
      confirmationText: "Yes",
      cancellationText: "No",
    })
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
  useEffect(() => {
    document.title = `BookIDOL | Manage Account `;
  }, []);

  return (
    <Fragment>
      {query ? (
        <Books query={query} reverseBlogs={reverseBlogs} />
      ) : (
        <div className={styles.manageAccount}>
          <div className={styles.profile}>
            <div className={styles.myProfile}>
              <h4>Profile Picture</h4>
              <img
                className={styles.profilePic}
                src={auth.profile ? "" : profileImg}
                alt="profile_pic"
              />
              <Dropdown>
                <Dropdown.Toggle
                  className={styles.dropdownToggle}
                  id="dropdown-basic"
                >
                  <MdOutlineModeEditOutline size={40} /> Edit
                </Dropdown.Toggle>

                <Dropdown.Menu className={styles.dropdownMenu}>
                  <Dropdown.Item className={styles.dropdownItem}>
                    Upload a photo...
                  </Dropdown.Item>
                  <Dropdown.Item className={styles.dropdownItem}>
                    Remove a photo...
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
            <div className={styles.info}>
              <h4>Your Info</h4>
              <div className={styles.name}>
                <p>Name</p>
                <p>{auth.name}</p>
                <ChangeName name={auth.name} />
              </div>
              <div className={styles.name}>
                <p>Email</p>
                <p>{auth.email}</p>
                <ChangeEmail email={auth.email} />
              </div>
              <div className={styles.password}>
                <p>Password</p>
                <p
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    gap: "2px",
                    paddingTop: "8px",
                  }}
                >
                  <BsCircleFill size={8} />
                  <BsCircleFill size={8} />
                  <BsCircleFill size={8} />
                  <BsCircleFill size={8} />
                  <BsCircleFill size={8} />
                  <BsCircleFill size={8} />
                </p>
                <ChangePassword password={auth.password} />
              </div>
            </div>
          </div>
          <button className={styles.logoutBtn} onClick={handleLogout}>
            Logout
          </button>
        </div>
      )}
    </Fragment>
  );
};

export default ManageAccount;
