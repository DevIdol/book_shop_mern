import Badge from "@mui/material/Badge";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import styles from "./NavRight.module.css";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import profileImg from "../../assets/profile.jpg";
import { Dropdown } from "react-bootstrap";
import { useConfirm } from "material-ui-confirm";
import { logoutUser } from "../../Redux/AuthSlice";
import { toast } from "react-toastify";

const NavRight = ({ isOpen }) => {
  const cart = useSelector((state) => state.cart);
  const auth = useSelector((state) => state.auth);
  const confirm = useConfirm();
  const navigate = useNavigate();
  const dispatch = useDispatch();
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

  return (
    <ul
      className={styles.navRight}
      style={{
        marginTop: auth._id ? "20px" : "10px",
        paddingRight: auth._id ? "10px" : "20px",
      }}
    >
      <NavLink
        style={({ isActive }) => {
          return {
            fontWeight: isActive && "bold",
          };
        }}
        to="/orders"
        className={styles.item}
      >
        Orders
      </NavLink>
      <NavLink
        style={({ isActive }) => {
          return {
            fontWeight: isActive && "bold",
          };
        }}
        to="/contact"
        className={styles.item}
      >
        Contact
      </NavLink>
      <NavLink to="/cart">
        <Badge color="error" badgeContent={cart.cartItems.length}>
          <LocalMallIcon className={styles.cartIcon} />
        </Badge>
      </NavLink>
      {auth._id ? (
        <Dropdown>
          <Dropdown.Toggle
            className={styles.dropdownToggle}
            id="dropdown-basic"
          >
            <img
              className={styles.profileImg}
              src={profileImg}
              alt="profile-img"
            />
          </Dropdown.Toggle>
          <Dropdown.Menu className={styles.dropdownMenu}>
            {auth._id && (
              <Dropdown.Item
                onClick={() => navigate("/manage-account")}
                className={styles.dropdownItem}
              >
                My Account
              </Dropdown.Item>
            )}
            {auth.isAdmin && (
              <Dropdown.Item
                onClick={() => navigate("/dashboard")}
                className={styles.dropdownItem}
              >
                Dashboard
              </Dropdown.Item>
            )}
            <Dropdown.Item
              onClick={handleLogout}
              className={styles.dropdownItem}
              style={{ borderTop: "1px solid #ccc" }}
            >
              Logout
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      ) : (
        <AccountCircleIcon
          onClick={() => navigate("/login")}
          className={styles.profileIcon}
        />
      )}
      <li className={styles.menu} onClick={isOpen}>
        <HiOutlineMenuAlt3 className={styles.menuIcon} />
      </li>
    </ul>
  );
};

export default NavRight;
