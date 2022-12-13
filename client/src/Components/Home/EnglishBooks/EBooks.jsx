import React, { Fragment, useContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import HeaderSlide from "../HeaderSlider/HeaderSlide";
import styles from "./EBooks.module.css";
import one from "../../../assets/HeaderImg/library.jpeg";
import two from "../../../assets/HeaderImg/library2.jpg";
import three from "../../../assets/HeaderImg/library3.jpg";
import TitleBar from "../TitleBar/TitleBar";
import Card from "./Card";
import { addToCart } from "../../../Redux/CartSlice";
import Loading from "../../../Loading/Loading";
import Error from "../../../Error/Error";
import { SearchContext } from "../../../App";
import { useSearchParams } from "react-router-dom";
import Books from "../../Books/Books";
import { Pagination, Stack } from "@mui/material";
import usePagination from "../../Pagination/Pagination";
import Footer from "../../Footer/Footer";

const EBooks = ({ title, products, link, isLoading, error }) => {
  let [searchParams] = useSearchParams();
  const [{ query }, searchQuery] = useContext(SearchContext);
  const dispatch = useDispatch();
  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };
  const reverseBlogs = searchQuery
    ?.slice(0)
    .reverse()
    .filter((book) => {
      let title = searchParams.get("filter");
      if (!title) return true;
      let search = book.title.toLowerCase() || book.author.toLowerCase();
      return search.startsWith(title.toLowerCase());
    });
  let [page, setPage] = useState(1);
  const PER_PAGE = 10;

  const count = Math.ceil(products?.length / PER_PAGE);
  const _DATA = usePagination(products?.slice(0).reverse(), PER_PAGE);

  const handleChange = (e, p) => {
    setPage(p);
    _DATA.jump(p);
  };
  useEffect(() => {
    document.title = `English Books`;
  }, []);
  return (
    <Fragment>
      {query ? (
        <Books query={query} reverseBlogs={reverseBlogs} />
      ) : (
        <div className={styles.books}>
          {isLoading ? (
            <Loading />
          ) : error ? (
            <Error status={500} text="No Internet Connection..." />
          ) : (
            <div style={{ paddingLeft: "10px", paddingRight: "10px" }}>
              <HeaderSlide one={one} two={two} three={three} />
              <TitleBar title={title} />
              <div className={styles.bookList}>
                {_DATA.currentData().map((product, index) => (
                  <Card
                    key={index}
                    link={`${link}/${product.title}/${product.id}`}
                    img={product.img}
                    title={product.title}
                    author={product.author}
                    price={product.price}
                    onClick={() => handleAddToCart(product)}
                  />
                ))}
              </div>
              <div className={styles.pagination}>
                <Stack spacing={2}>
                  <Pagination
                    size="medium"
                    count={count}
                    page={page}
                    shape="circular"
                    onChange={handleChange}
                  />
                </Stack>
              </div>
            </div>
          )}
          <Footer/>
        </div>
      )}
    </Fragment>
  );
};

export default EBooks;
