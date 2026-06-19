import { Routes, Route } from "react-router-dom";

import AddProduct from "../pages/admin/AddProduct";

import ManageProducts from "../pages/admin/ManageProducts";

import UpdateProduct from "../pages/admin/UpdateProduct";

import ManageOrders from "../pages/admin/ManageOrders";

import Checkout from "../pages/Checkout";

import AddressManagement from "../pages/AddressManagement";

import TestApi from "../pages/TestApi";


import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Products from "../pages/Products";
import Cart from "../pages/Cart";
import Orders from "../pages/MyOrders";



import Dashboard from "../pages/admin/Dashboard";

import ProductDetails from "../pages/ProductDetails";
import Wishlist from "../pages/Wishlist";
import Profile from "../pages/Profile";

import ProtectedRoute from "../components/ProtectedRoute";

const AppRoutes = () => {
  return (
    <Routes>

      {/* =========================
          PUBLIC ROUTES
      ========================= */}


      <Route
        path="/test-api"
        element={<TestApi />}
      />
      <Route
        path="/checkout"
        element={
          <ProtectedRoute>
            <Checkout />
          </ProtectedRoute>
        }
      />

      <Route
        path="/addresses"
        element={
          <ProtectedRoute>
            <AddressManagement />
          </ProtectedRoute>
        }
      />


      <Route
        path="/admin/manage-orders"
        element={<ManageOrders />}
      />

      <Route
        path="/admin/update-product/:id"
        element={<UpdateProduct />}
      />

      <Route
        path="/admin/manage-products"
        element={<ManageProducts />}
      />



      <Route
        path="/"
        element={<Home />}
      />

      <Route
        path="/login"
        element={<Login />}
      />

      <Route
        path="/register"
        element={<Register />}
      />

      <Route
        path="/products"
        element={<Products />}
      />

      <Route
        path="/admin/add-product"
        element={<AddProduct />}
      />
      <Route
        path="/product/:id"
        element={<ProductDetails />}
      />

      {/* =========================
          PROTECTED USER ROUTES
      ========================= */}

      <Route
        path="/cart"
        element={
          <ProtectedRoute>
            <Cart />
          </ProtectedRoute>
        }
      />

      <Route
        path="/orders"
        element={
          <ProtectedRoute>
            <Orders />
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
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />

      {/* =========================
          ADMIN ROUTES
      ========================= */}

      <Route
        path="/admin/dashboard"
        element={<Dashboard />}
      />

      {/* =========================
          404 PAGE
      ========================= */}

      <Route
        path="*"
        element={
          <div
            className="container text-center"
            style={{ marginTop: "120px" }}
          >
            <h1>404</h1>
            <h4>Page Not Found</h4>
          </div>
        }
      />

    </Routes>
  );
};

export default AppRoutes;