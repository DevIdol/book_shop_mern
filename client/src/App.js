/* eslint-disable array-callback-return */
import { createContext } from "react";
import { useState } from "react";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useGetAllProductsQuery } from "./Redux/ProductApi";
import ScrollToTop from "react-scroll-to-top";
import Router from "./Router/Router";
export const SearchContext = createContext();
const App = () => {
  const [query, setQuery] = useState("");
  const { data } = useGetAllProductsQuery();
  const searchQuery = data?.filter((book) => {
    if (query === "") {
      return book;
    } else if (book.title.toLowerCase().includes(query.toLowerCase())) {
      return book;
    } else if (book.author.toLowerCase().includes(query.toLowerCase())) {
      return book;
    }
  });
  return (
    <SearchContext.Provider value={[{ query }, searchQuery]}>
      <BrowserRouter>
        <ToastContainer />
        <Router
          value={query}
          onChange={(value) => setQuery(value)}
          onCancelSearch={() => setQuery("")}
        />
        <ScrollToTop
          smooth
          top={300}
          width="20"
          height="20"
          style={{
            marginBottom: "-24px",
            marginRight: "-28px",
            backgroundColor: "rgba(204, 204, 204, 0.6)",
            fontWeight: "bold",
            color: "#053a38",
          }}
        />
      </BrowserRouter>
    </SearchContext.Provider>
  );
};

export default App;
