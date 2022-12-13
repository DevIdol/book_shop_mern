import * as React from "react";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import Modal from "@mui/material/Modal";
import { MdOutlineModeEditOutline } from "react-icons/md";
import styles from "./ChangePassword.module.css";

const ChangePassword = ({ password }) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = (e) => {
    e.preventDefault();
    setOpen(false);
  };
  return (
    <div>
      <Button onClick={handleOpen}>
        <MdOutlineModeEditOutline className={styles.edit} />
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className={styles.modelBox}>
          <h4 className={styles.title}>Change Your Password</h4>
          <form>
            <input
              style={{ marginBottom: "10px" }}
              className={styles.modelInput}
              type="password"
              placeholder="current password"
            />
            <input
              className={styles.modelInput}
              type="password"
              placeholder="new password"
            />
            <div className={styles.btn}>
              <Link className={styles.forgotPass} to="/forgot-password">
                Forgot Password?
              </Link>
              <div
                style={{ display: "flex", flexDirection: "row", gap: "10px" }}
              >
                <button className={styles.closeBtn} onClick={handleClose}>
                  Close
                </button>
                <button className={styles.submitBtn}>Submit</button>
              </div>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default ChangePassword;
