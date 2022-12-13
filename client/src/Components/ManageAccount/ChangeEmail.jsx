import * as React from 'react';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { MdOutlineModeEditOutline } from 'react-icons/md'
import styles from './ChangeEmail.module.css'

const ChangeEmail = ({ email }) => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = (e) => { e.preventDefault(); setOpen(false) };
    return (
        <div>
            <Button onClick={handleOpen}><MdOutlineModeEditOutline className={styles.edit} /></Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <div className={styles.modelBox}>
                    <h4 className={styles.title}>Change Your Email</h4>
                    <form>
                        <input className={styles.modelInput} type="email" placeholder={email} />
                        <div className={styles.btn}>
                            <button className={styles.closeBtn} onClick={handleClose}>
                                Close
                            </button>
                            <button className={styles.submitBtn}>Submit</button>
                        </div>
                    </form>
                </div>
            </Modal>
        </div>
    )
}

export default ChangeEmail


