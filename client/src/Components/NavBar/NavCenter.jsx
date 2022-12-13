import SearchBar from "material-ui-search-bar";
import styles from "./NavCenter.module.css";

const NavCenter = ({ value, onChange, onCancelSearch }) => {
  return (
    <SearchBar
      placeholder="Search books, authors"
      className={styles.search}
      value={value}
      onChange={onChange}
      onCancelSearch={onCancelSearch}
    />
  );
};

export default NavCenter;
