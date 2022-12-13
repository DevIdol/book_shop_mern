import React, { useState } from "react";

import MenuBar from "./MenuBar";
import styles from "./NavBar.module.css";
import NavCenter from "./NavCenter";
import NavLeft from "./NavLeft";
import NavRight from "./NavRight";

const NavBar = ({ value, onChange, onCancelSearch }) => {
  const [openMenu, setOpenMenu] = useState(false);

  const toggleMenu = () => {
    setOpenMenu(!openMenu);
  };
  const closeMenu = () => {
    setOpenMenu(false);
  };

  return (
    <nav className={styles.navBar}>
      <NavLeft />
      <NavCenter value={value} onChange={onChange} onCancelSearch={onCancelSearch} />
      <MenuBar openMenu={openMenu} onClose={closeMenu} />
      {openMenu && <div onClick={closeMenu} className={styles.overflow}></div>}
      <NavRight isOpen={toggleMenu} />
    </nav>
  );
};

export default NavBar;
