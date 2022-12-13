import React, { Fragment, useContext, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import HeaderSlide from "./HeaderSlider/HeaderSlide";
import styles from "./Home.module.css";
import Grid from "./Layout/Grid";
import TitleBar from "./TitleBar/TitleBar";
import one from "../../assets/HeaderImg/library.jpeg";
import two from "../../assets/HeaderImg/library2.jpg";
import three from "../../assets/HeaderImg/library3.jpg";
import { useGetAllProductsQuery } from "../../Redux/ProductApi";
import Loading from "../../Loading/Loading";
import Error from "../../Error/Error";
import { SearchContext } from "../../App";
import Books from "../Books/Books";
import Footer from "../Footer/Footer";

const HeaderTitle = ({ title, link }) => {
  return (
    <div className={styles.header}>
      <h1>{title}</h1>
      <Link className={styles.viewAll} to={link}>
        View All
      </Link>
    </div>
  );
};
const Home = () => {
  let [searchParams] = useSearchParams();
  const [{ query }, searchQuery] = useContext(SearchContext);
  const { data, error, isLoading } = useGetAllProductsQuery();
  const MBooks = data?.filter((mya) => mya.type === "myanmar-books");
  const EBooks = data?.filter((eng) => eng.type === "english-books");

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
    window.scrollTo(0, 0);
    document.title = `BookIDOL: Buy books online. Support local bookstores.`;
  }, []);

  return (
    <Fragment>
      {query ? (
        <Books query={query} reverseBlogs={reverseBlogs} />
      ) : (
        <div className={styles.home}>
          {isLoading ? (
            <Loading />
          ) : error ? (
            <Error status={500} text="No Internet Connection..." />
          ) : (
            <div style={{ paddingLeft: "10px", paddingRight: "10px" }}>
              <HeaderSlide one={one} two={two} three={three} />
              <TitleBar title="All Books" />
              <div className={styles.header}>
                <h1>Best Sellers of the Week</h1>
              </div>
              <div className={styles.bestSeller}>
                {data
                  ?.slice(0, 8)
                  .reverse()
                  .map((product, index) => (
                    <Grid
                      key={index}
                      img={product.img}
                      link={`/view-book/${product.title}/${product.id}`}
                    />
                  ))}
              </div>
              <HeaderTitle title="Myanmar Books" link="/myanmar-books" />
              <div className={styles.bestSeller}>
                {MBooks?.slice(0, 8)
                  .reverse()
                  .map((product, index) => (
                    <Grid
                      key={index}
                      img={product.img}
                      link={`/view-book/${product.title}/${product.id}`}
                    />
                  ))}
              </div>
              <HeaderTitle title="English Books" link="/english-books" />
              <div className={styles.bestSeller}>
                {EBooks?.slice(0, 8)
                  .reverse()
                  .map((product, index) => (
                    <Grid
                      key={index}
                      img={product.img}
                      link={`/view-book/${product.title}/${product.id}`}
                    />
                  ))}
              </div>
            </div>
          )}
          <Footer />
        </div>
      )}
    </Fragment>
  );
};

export default Home;
