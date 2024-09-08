import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Login/Login';
import AdminDashboard from './AdminDashboard/AdminDashboard';
import Products from './Products/Products';
import Cart from './Cart/Cart';  // Cart page import
import Checkout from './Checkout/Checkout';  // Checkout page import
import PrivateRoute from './PrivateRoute';
import MainLayout from './MainLayout/MainLayout';
import { CartProvider } from './CartContext';  // CartProvider import

const App: React.FC = () => {
  return (
    <CartProvider> {/* Wrap the entire app inside CartProvider */}
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route
            path="/admin"
            element={
              <PrivateRoute roleRequired="admin">
                <MainLayout>
                  <AdminDashboard />
                </MainLayout>
              </PrivateRoute>
            }
          />
          <Route
            path="/products"
            element={
              <PrivateRoute>
                <MainLayout>
                  <Products />
                </MainLayout>
              </PrivateRoute>
            }
          />
          <Route
            path="/cart"
            element={
              <PrivateRoute>
                <MainLayout>
                  <Cart />  {/* Cart component */}
                </MainLayout>
              </PrivateRoute>
            }
          />
          <Route
            path="/checkout"
            element={
              <PrivateRoute>
                <MainLayout>
                  <Checkout />  {/* Checkout component */}
                </MainLayout>
              </PrivateRoute>
            }
          />
          <Route path="/unauthorized" element={<div>Unauthorized Access</div>} />
        </Routes>
      </Router>
    </CartProvider>
  );
};

export default App;
