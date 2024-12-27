import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaHome, FaCartPlus, FaRegHeart } from 'react-icons/fa';  // Importing icons

const Navbar = () => {
  const { isAuthenticated, logout } = useAuth();

  return (
    <nav className="bg-white text-black p-4 flex justify-between items-center shadow-md border-b border-gray-300">
      {/* Brand Logo */}
      <Link
        to="/products"
        className="text-3xl font-semibold hover:text-gray-600 transition-colors"
        style={{ fontFamily: "'Inter', sans-serif" }}
      >
       Shoply
      </Link>
      <div className="flex gap-6 items-center">
        {/* Home Link */}
        <Link
          to="/"
          className="text-lg font-medium hover:text-gray-600 transition-colors flex items-center gap-2"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          <FaHome size={30} />
         
        </Link>

        {/* Cart Link */}
        <Link
          to="/cart"
          className="text-lg font-medium hover:text-gray-600 transition-colors flex items-center gap-2"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          <FaCartPlus size={30} />
        
        </Link>

        {isAuthenticated ? (
          <>
            {/* Wishlist Link */}
            <Link
              to="/wishlist"
              className="text-lg font-medium hover:text-gray-600 transition-colors flex items-center gap-2"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              <FaRegHeart size={25} />
              Wishlist
            </Link>
            {/* Logout Button */}
            <button
              onClick={logout}
              className="px-6 py-2 rounded-full bg-black text-white font-semibold shadow-md hover:bg-gray-800 transition-all"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Logout
            </button>
          </>
        ) : (
          <Link
            to="/login"
            className="px-6 py-2 rounded-full bg-black text-white font-semibold shadow-md hover:bg-gray-800 transition-all"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
