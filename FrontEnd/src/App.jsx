import React from "react";

import Header from "./Components/layouts/Header";
import Footer from "./Components/layouts/Footer";
import Hero from "./Components/layouts/Hero";
import HeroNormal from "./Components/layouts/Hero-normal";
import Home from "./pages/home/Home";
import Shop from "./pages/shop/Shop";
import ShopDetail from './pages/shop-detail/Shop-detail';
import Cart from "./pages/cart/Cart";
import Login from "./pages/Auth/Login";
import Checkout from "./pages/checkout/Checkout";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ScrollToTop from "./Components/scrollToTop/ScrollToTop";
import BillDetail from "./pages/billDetail/BillDetail";
import Profile from "./pages/profile/Profile";
import BillNull from "./pages/billDetail/BillNull";
import Blogs from "./pages/blogs/Blogs";
import Contact from "./pages/contact/Contact";
import ForgotPass from "./pages/Auth/ForgotPass";
import ChangePassword from "./pages/Auth/ChangePass";

const App = () => {
  return (
    <>
      <Router>
        <ScrollToTop>
          <Routes>
            <Route path='/' element={<><Header /><Hero /><Home /><Footer /></>} />
            <Route path='/home/category/:categoryName' element={<><Header /><Hero /><Home /><Footer /></>} />
            <Route path='/shop' element={<><Header /><HeroNormal /><Shop /><Footer /></>} />
            <Route path='/shop?category=:categoryName' element={<><Header /><HeroNormal /><Shop /><Footer /></>} />
            <Route path='/detail/:id' element={<><Header /><HeroNormal /><ShopDetail /><Footer /></>} />
            <Route path='/cart' element={<><Header /><HeroNormal /><Cart /><Footer /></>} />
            <Route path='/checkout' element={<><Header /><HeroNormal /><Checkout /><Footer /></>} />
            <Route path='/bill/:email' element={<><Header /><HeroNormal /><BillDetail /><Footer /></>} />
            <Route path='/bill' element={<><Header /><HeroNormal /><BillNull /><Footer /></>} />
            <Route path='/blog' element={<><Header /><HeroNormal /><Blogs /><Footer /></>} />
            <Route path='/contact' element={<><Header /><HeroNormal /><Contact /><Footer /></>} />
            <Route path='/myProfile/:id' element={<><Header /><HeroNormal /><Profile /><Footer /></>} />
            <Route path='/login' element={<Login />} />
            <Route path='/forgot_password' element={<ForgotPass />} />
            <Route path='/changePass/:token' element={<ChangePassword />} />
          </Routes>
        </ScrollToTop>
      </Router>

    </>
  );
}

export default App;
