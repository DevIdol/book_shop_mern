import { Fragment, useContext } from "react";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { SearchContext } from "../App";
import Books from "../Components/Books/Books";
import styles from "./NotFound.module.css";

const NotFound = ({ status, text }) => {
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
    document.title = `BookIDOL | ${text} `;
  }, [status, text]);
  return (
    <Fragment>
      {query ? (
        <Books query={query} reverseBlogs={reverseBlogs} />
      ) : (
        <div className={styles.notFound}>
          <h1>{status}</h1>
          <p>{text}</p>
        </div>
      )}
    </Fragment>
  );
};

export default NotFound;
