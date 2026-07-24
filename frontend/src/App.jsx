import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Products from "./pages/Products";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import ProductDetails from "./pages/ProductDetails";
import MyOrders from "./pages/MyOrders";
import BecomeSeller from "./pages/BecomeSeller";

import AdminLayout from "./layouts/AdminLayout";
import AdminDashboard from "./pages/AdminDashboard";
import AdminUsers from "./pages/AdminUsers";
import AdminProducts from "./pages/AdminProducts";
import AdminOrders from "./pages/AdminOrders";
import AdminAnalytics from "./pages/AdminAnalytics";
import AdminSettings from "./pages/AdminSettings";
import AdminSellerRequests from "./pages/AdminSellerRequests";

import ProtectedRoute from "./layouts/ProtectedRoute";
import SellerLayout from "./layouts/SellerLayout";
import GuestRoute from "./layouts/GuestRoute";

import SellerDashboard from "./pages/SellerDashboard";
import SellerProducts from "./pages/SellerProducts";
import AddProduct from "./pages/AddProduct";
import EditProduct from "./pages/EditProduct";
import SellerOrders from "./pages/SellerOrders";
import SellerAnalytics from "./pages/SellerAnalytics";
import SellerSettings from "./pages/SellerSettings";
import SellerSidebar from "./layouts/SellerSidebar";
import Wishlist from "./pages/Wishlist";
import VerifyOTP from "./pages/VerifyOTP";
import Categories from "./pages/Categories";
import Notifications from "./pages/Notifications";
import Cart from "./pages/Cart";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";


function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* ================= Public Routes ================= */}

        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route
  path="/login"
  element={
    <GuestRoute>
      <Login />
    </GuestRoute>
  }
/>
        <Route
  path="/register"
  element={
    <GuestRoute>
      <Register />
    </GuestRoute>
  }
/>
      <Route
  path="/verify-otp"
  element={
    <GuestRoute>
      <VerifyOTP />
    </GuestRoute>
  }
/>
       <Route
  path="/forgot-password"
  element={
    <GuestRoute>
      <ForgotPassword />
    </GuestRoute>
  }
/>
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/categories" element={<Categories />} />

        {/* ================= Buyer ================= */}

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/orders"
          element={
            <ProtectedRoute>
              <MyOrders />
            </ProtectedRoute>
          }
        />

        <Route
          path="/wishlist"
          element={
            <ProtectedRoute>
              <Wishlist />
            </ProtectedRoute>
          }
        />

        <Route
          path="/cart"
          element={
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          }
        />

        <Route
          path="/notifications"
          element={
            <ProtectedRoute>
              <Notifications />
            </ProtectedRoute>
          }
        />

        <Route
          path="/seller-request"
          element={
            <ProtectedRoute>
              <BecomeSeller />
            </ProtectedRoute>
          }
        />

        {/* ================= Seller Panel ================= */}

       <Route
  path="/seller"
  element={
    <ProtectedRoute role="seller">
      <SellerSidebar />
    </ProtectedRoute>
  }
>
          <Route
            index
            element={<SellerDashboard />}
          />

          <Route
            path="dashboard"
            element={<SellerDashboard />}
          />

          <Route
            path="products"
            element={<SellerProducts />}
          />

          <Route
            path="add-product"
            element={<AddProduct />}
          />

          <Route
            path="edit-product/:id"
            element={<EditProduct />}
          />

          <Route
            path="orders"
            element={<SellerOrders />}
          />

          <Route
            path="analytics"
            element={<SellerAnalytics />}
          />

          <Route
            path="settings"
            element={<SellerSettings />}
          />
        </Route>

        {/* ================= Admin Panel ================= */}

        <Route
          path="/admin"
          element={
            <ProtectedRoute role="admin">
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route
            index
            element={<AdminDashboard />}
          />

          <Route
            path="dashboard"
            element={<AdminDashboard />}
          />

          <Route
            path="users"
            element={<AdminUsers />}
          />

          <Route
            path="products"
            element={<AdminProducts />}
          />

          <Route
            path="orders"
            element={<AdminOrders />}
          />

          <Route
            path="seller-requests"
            element={<AdminSellerRequests />}
          />

          <Route
            path="analytics"
            element={<AdminAnalytics />}
          />

          <Route
            path="settings"
            element={<AdminSettings />}
          />
        </Route>
  

        {/* ================= 404 ================= */}

        <Route
          path="*"
          element={<NotFound />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;