import React, { Fragment } from "react";
import { useLocation } from "react-router-dom";
import { useGetAllProductsQuery } from "../../../Redux/ProductApi";
import MBooks from "./MBooks";

const MBookList = () => {
  const location = useLocation();
  const pathName = location.pathname.split("/")[1];
  const { data, error, isLoading } = useGetAllProductsQuery();
  const products = data?.filter((product) => product.type === "myanmar-books");

  const MStory = products?.filter(
    (story) => story.bookType === "myanmar-stories"
  );
  const MNovel = products?.filter(
    (novel) => novel.bookType === "myanmar-novels"
  );
  const MTech = products?.filter(
    (tech) => tech.bookType === "myanmar-technologies"
  );
  const MReligious = products?.filter(
    (religious) => religious.bookType === "myanmar-religious"
  );

  return (
    <Fragment>
      {pathName === "myanmar-books" && (
        <MBooks
          isLoading={isLoading}
          error={error}
          title="Myanmar Books"
          products={products}
          link="/view-book"
        />
      )}
      {pathName === "myanmar-stories" && (
        <MBooks
          isLoading={isLoading}
          error={error}
          title="ပုံပြင် စာအုပ်များ"
          products={MStory}
          link="/view-book"
        />
      )}
      {pathName === "myanmar-novels" && (
        <MBooks
          isLoading={isLoading}
          error={error}
          title="ဝတ္ထု စာအုပ်များ"
          products={MNovel}
          link="/view-book"
        />
      )}
      {pathName === "myanmar-technologies" && (
        <MBooks
          isLoading={isLoading}
          error={error}
          title="နည်းပညာ စာအုပ်များ"
          products={MTech}
          link="/view-book"
        />
      )}
      {pathName === "myanmar-religious" && (
        <MBooks
          isLoading={isLoading}
          error={error}
          title="ဘာသာရေး စာအုပ်များ"
          products={MReligious}
          link="/view-book"
        />
      )}
    </Fragment>
  );
};

export default MBookList;
