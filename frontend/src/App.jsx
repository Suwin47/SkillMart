import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Products from "./pages/Products";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";
import ProductDetails from "./pages/ProductDetails";
import MyOrders from "./pages/MyOrders";
import BecomeSeller from "./pages/BecomeSeller";
import AdminDashboard from "./pages/AdminDashboard";

import ProtectedRoute from "./layouts/ProtectedRoute";
import SellerLayout from "./layouts/SellerLayout";

import SellerDashboard from "./pages/SellerDashboard";
import SellerProducts from "./pages/SellerProducts";
import AddProduct from "./pages/AddProduct";
import EditProduct from "./pages/EditProduct";
import SellerOrders from "./pages/SellerOrders";
import SellerAnalytics from "./pages/SellerAnalytics";
import SellerSettings from "./pages/SellerSettings";
import Wishlist from "./pages/Wishlist";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* ================= Public Routes ================= */}

        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* ================= Buyer ================= */}

        <Route
          path="/orders"
          element={
            <ProtectedRoute>
              <MyOrders />
            </ProtectedRoute>
          }
        />

        {/* ================= Become Seller ================= */}

        <Route
          path="/seller-request"
          element={
            <ProtectedRoute>
              <BecomeSeller />
            </ProtectedRoute>
          }
        />

        {/* ================= Admin ================= */}

        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        {/* ================= Seller Panel ================= */}

        <Route
          path="/seller"
          element={
            <ProtectedRoute>
              <SellerLayout />
            </ProtectedRoute>
          }
        >
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

        {/* ================= 404 ================= */}

        <Route
          path="*"
          element={<NotFound />}
        />

        <Route
  path="/wishlist"
  element={
    <ProtectedRoute>
      <Wishlist />
    </ProtectedRoute>
  }
/>

      </Routes>
    </BrowserRouter>
  );
}

export default App;