import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import ArtisanProfiles from "./pages/ArtisanProfiles";
import Cart from "./components/Cart/Cart";
import Checkout from "./components/Cart/Checkout";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import AdminDashboard from "./pages/AdminDashboard";
import Layout from "./Layout";
import Weaving from "./components/Category/Weaving";
import Pottery from "./components/Category/Pottery";
import Bamboo from "./components/Category/Bamboo";
import Jewelry from "./components/Category/Jewelry";
import Textiles from "./components/Category/Textiles";
import ProductDetail from "./components/Product/ProductDetails";
import ArtisanProfile from "./components/Artisan/ArtisanProfile";
import { UserContext } from "./utils/user_context";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AboutUs from "./pages/about";
import App2 from "../Admin-Frontend/src/App";
import Wishlist from "./pages/Wishlist";
import SellerDashboard from "./pages/SellerDashboard";
import MyProfile from "./pages/MyProfile";
import MyOrders from "./pages/MyOrders";

axios.defaults.withCredentials = true;

function AppContent() {
  const [user, setUser] = useState({});
  // const navigate = useNavigate();
  // const link = import.meta.env.VITE_BACKEND_LINK;

  // useEffect(() => {
  //   const fetchUser = async () => {
  //     try {
  //       const response = await axios.get(`${link}/api/auth/check-auth`);
  //       if (!response.data.success) {
  //         navigate("/login");
  //       } else {
  //         setUser(response.data.user);
  //       }
  //     } catch (err) {
  //       navigate("/login");
  //     }
  //   };
  //   fetchUser();
  // }, []);

  // Helper to check if user is logged in (adjust as needed)
  const isLoggedIn = !!user;

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route element={<Layout />}>
          <Route path="/home" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/category/weaving" element={<Weaving />} />
          <Route path="/category/pottery" element={<Pottery />} />
          <Route path="/category/bamboo" element={<Bamboo />} />
          <Route path="/category/jewelry" element={<Jewelry />} />
          <Route path="/category/textiles" element={<Textiles />} />
          <Route path="/artisans" element={<ArtisanProfiles />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/product/:productId" element={<ProductDetail />} />
          <Route path="/artisans/:id" element={<ArtisanProfile />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/my-profile" element={<MyProfile />} />
          <Route path="/my-orders" element={<MyOrders />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/admin-panel/*" element={<App2 />} />
        <Route path="/seller-dashboard" element={<SellerDashboard />} />
      </Routes>
    </UserContext.Provider>
  );
}

function App1() {
  return <AppContent />;
}

export default App1;
