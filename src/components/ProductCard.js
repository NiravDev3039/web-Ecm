import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';


const ProductCard = ({ product }) => {
  const { isAuthenticated } = useAuth();
  const { addToCart } = useCart();

  return (
    
    <div className="relative border p-4 rounded shadow flex flex-col justify-between h-full">
      <img src={product.image} alt={product.title} className="h-48 mx-auto mb-4 object-contain" />
      <div className="flex-1 flex flex-col gap-2">
        <h3 className="text-lg font-bold text-center">{product.title}</h3>
        <p className="text-center">₹{product.price}</p>
      </div>
      <div className="mt-4 flex justify-center items-center gap-4">
  <Link
    to={`/products/${product.id}`}
    className="bg-gradient-to-r from-purple-400 to-purple-600 text-white px-6 py-2 rounded-full shadow-md hover:shadow-lg hover:from-purple-500 hover:to-purple-700 focus:outline-none transition-transform transform hover:scale-105 text-sm text-center"
  >
    View Details
  </Link>
  {isAuthenticated ? (
    <button
      onClick={() => addToCart(product)}
      className="bg-gradient-to-r from-purple-400 to-purple-600 text-white px-6 py-2 rounded-full shadow-md hover:shadow-lg hover:from-purple-500 hover:to-purple-700 focus:outline-none transition-transform transform hover:scale-105 text-sm"
    >
      Add to Cart
    </button>
  ) : (
    <Link
      to="/login"
      className="bg-gradient-to-r from-purple-400 to-purple-600 text-white px-6 py-2 rounded-full shadow-md hover:shadow-lg hover:from-purple-500 hover:to-purple-700 focus:outline-none transition-transform transform hover:scale-105 text-sm text-center"
    >
      Add to Cart
    </Link>
  )}
</div>



    </div>
  
  );
};

export default ProductCard;
