import React, { Fragment } from "react";
import { useGetAllProductsQuery } from "../../../Redux/ProductApi";
import Grid from "../Layout/Grid";
import styles from "./NewRelease.module.css";

const NewRelease = () => {
  const { data } = useGetAllProductsQuery();
  return (
    <Fragment>
      <div className={styles.header} style={{ paddingLeft: "20px", paddingRight: "10px" }}>
        <h1>New Release</h1>
      </div>
      <div className={styles.bestSeller} style={{ paddingLeft: "10px", paddingRight: "10px" }}>
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
    </Fragment>
  );
};

export default NewRelease;
