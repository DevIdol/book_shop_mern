import React, { Fragment } from "react";
import { useContext } from "react";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { SearchContext } from "../../App";
import Books from "../Books/Books";
import styles from "./Order.module.css";

const Order = () => {
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
    document.title = `BookIDOL | Orders `;
  }, []);
  return (
    <Fragment>
      {query ? (
        <Books query={query} reverseBlogs={reverseBlogs} />
      ) : (
        <div className={styles.orderPage}>
          <h1>Order Page</h1>
        </div>
      )}
    </Fragment>
  );
};

export default Order;
