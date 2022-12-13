import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import ReactDOM from "react-dom/client";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./index.css";
import "react-toastify/dist/ReactToastify.css";
import App from "./App";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import ProductReducer, { productFetch } from "./Redux/ProductSlice";
import { ProductApi } from "./Redux/ProductApi";
import CartSlice, { getTotals } from "./Redux/CartSlice";
import Loading from "./Loading/Loading";
import { useState } from "react";
import { useEffect } from "react";
import { Fragment } from "react";
import { ConfirmProvider } from "material-ui-confirm";
import AuthSlice, { loadUser } from "./Redux/AuthSlice";

const store = configureStore({
  reducer: {
    products: ProductReducer,
    cart: CartSlice,
    auth: AuthSlice,
    [ProductApi.reducerPath]: ProductApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(ProductApi.middleware),
});

store.dispatch(productFetch());
store.dispatch(getTotals());
store.dispatch(loadUser(null));

const PreLoader = () => {
  const [isLoading, setIsLoading] = useState(undefined);
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(true);
    }, 1400);
  }, []);
  return (
    <Fragment>
      {!isLoading ? (
        <Loading />
      ) : (
        <Provider store={store}>
          <ConfirmProvider>
            <App />
          </ConfirmProvider>
        </Provider>
      )}
    </Fragment>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <PreLoader />
  </React.StrictMode>
);
