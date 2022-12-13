import React, { Fragment } from "react";
import { useLocation } from "react-router-dom";
import { useGetAllProductsQuery } from "../../../Redux/ProductApi";
import EBooks from "./EBooks";

const EBookList = () => {
  const location = useLocation();
  const pathName = location.pathname.split("/")[1];
  const { data, error, isLoading } = useGetAllProductsQuery();

  const Eproducts = data?.filter((product) => product.type === "english-books");

  const EStory = Eproducts?.filter(
    (story) => story.bookType === "english-stories"
  );
  const ENovel = Eproducts?.filter(
    (novel) => novel.bookType === "english-novels"
  );
  const ETech = Eproducts?.filter(
    (tech) => tech.bookType === "english-technologies"
  );
  const EReligious = Eproducts?.filter(
    (religious) => religious.bookType === "english-religious"
  );
  return (
    <Fragment>
      {pathName === "english-books" && (
        <EBooks
          isLoading={isLoading}
          error={error}
          title="English Books"
          products={Eproducts}
          link="/view-book"
        />
      )}
      {pathName === "english-stories" && (
        <EBooks
          isLoading={isLoading}
          error={error}
          title="Story Books"
          products={EStory}
          link="/view-book"
        />
      )}
      {pathName === "english-novels" && (
        <EBooks
          isLoading={isLoading}
          error={error}
          title="Novel Books"
          products={ENovel}
          link="/view-book"
        />
      )}
      {pathName === "english-technologies" && (
        <EBooks
          isLoading={isLoading}
          error={error}
          title="Technology Books"
          products={ETech}
          link="/view-book"
        />
      )}
      {pathName === "english-religious" && (
        <EBooks
          isLoading={isLoading}
          error={error}
          title="Religious Books"
          products={EReligious}
          link="/view-book"
        />
      )}
    </Fragment>
  );
};

export default EBookList;
