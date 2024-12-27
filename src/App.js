import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import Wishlist from './pages/Wishlist';
import Login from './pages/Login';
import { AuthProvider, useAuth } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import CreateAccount from './pages/CreateAccount';





// Higher-order component for private routes
const PrivateRoute = ({ component: Component }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <Component /> : <Navigate to="/login" />;
};

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <WishlistProvider>
            <Navbar />
            <main className="p-4">
              <Routes>
                <Route path="/" element={<Navigate to="/products" />} />
                <Route path="/products" element={<Home />} />
                <Route path="/products/:id" element={<ProductDetails />} />
                <Route path="/cart" element={<PrivateRoute component={Cart} />} />
                <Route path="/wishlist" element={<PrivateRoute component={Wishlist} />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<CreateAccount />} /> {/* Add the SignUp route */}
               
              </Routes>
            </main>
          
          </WishlistProvider>
        </CartProvider>
      </AuthProvider>
    </Router>
  );
};

export default App;
