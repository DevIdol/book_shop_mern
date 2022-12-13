import { Fragment } from "react";
import { useSelector } from "react-redux";
import { Routes, Route, useLocation } from "react-router-dom";
import Login from "../Components/Auth/Login/Login";
import Register from "../Components/Auth/Register/Register";
import Cart from "../Components/Cart/Cart";
import CatBar from "../Components/CatBar/CatBar";
import CheckOut from "../Components/CheckOut/CheckOut";
import Contact from "../Components/Contact/Contact";
import EBookList from "../Components/Home/EnglishBooks/EBookList";
import Home from "../Components/Home/Home";
import MBookList from "../Components/Home/MyanmarBooks/MBookList";
import ViewBook from "../Components/Home/ViewBook/ViewBook";
import NavBar from "../Components/NavBar/NavBar";
import Order from "../Components/Order/Order";
import NotFound from "../NotFound/NotFound";
import ManageAccount from "../Components/ManageAccount/ManageAccount";
import EmailVerify from "../EmailVerify/EmailVerify";
import ForgotPass from "../Components/Auth/ForgotPassword/ForgotPass";
import ChangePass from "../Components/Auth/ChangePassword/ChangePass";

const Router = ({ value, onChange, onCancelSearch }) => {
  const cart = useSelector((state) => state.cart);
  const auth = useSelector((state) => state.auth);
  const location = useLocation();
  const pathName = location.pathname.split("/")[2];
  return (
    <Fragment>
      <NavBar
        value={value}
        onChange={onChange}
        onCancelSearch={onCancelSearch}
      />
      <Routes>
        <Route path="/" element={<CatBar />}>
          <Route index element={<Home />} />
          <Route path="/myanmar-books" element={<MBookList />} />
          <Route path="/myanmar-stories" element={<MBookList />} />
          <Route path="/myanmar-novels" element={<MBookList />} />
          <Route path="/myanmar-technologies" element={<MBookList />} />
          <Route path="/myanmar-religious" element={<MBookList />} />
          <Route path="/english-books" element={<EBookList />} />
          <Route path="/english-stories" element={<EBookList />} />
          <Route path="/english-novels" element={<EBookList />} />
          <Route path="/english-technologies" element={<EBookList />} />
          <Route path="/english-religious" element={<EBookList />} />
          <Route path={`/view-book/${pathName}/:id`} element={<ViewBook />} />
          <Route path="/orders" element={<Order />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/contact" element={<Contact />} />
          {auth._id && (
            <Route path="/manage-account" element={<ManageAccount />} />
          )}
          {auth._id && cart.cartItems?.length && (
            <Route path="/check-out" element={<CheckOut />} />
          )}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPass />} />
          <Route path="/password-change/:id/:token" element={<ChangePass />} />

          <Route
            path="*"
            element={<NotFound status={404} text="Page not found!" />}
          />
        </Route>
        {!auth._id && (
          <Route path="/users/:id/verify/:token" element={<EmailVerify />} />
        )}
      </Routes>
    </Fragment>
  );
};

export default Router;
