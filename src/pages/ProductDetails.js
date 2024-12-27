import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useAuth } from '../context/AuthContext';
import Loader from '../components/Loader';
import axios from 'axios';

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { addToCart } = useCart();
  const { wishlistItems, addToWishlist, removeFromWishlist } = useWishlist();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`https://fakestoreapi.com/products/${id}`);
        setProduct(response.data);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) {
    return <Loader />;
  }

  const isInWishlist = wishlistItems.some(item => item.id === product.id);

  const handleWishlist = () => {
    if (isInWishlist) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="flex justify-center items-center">
          <img src={product.image} alt={product.title} className="w-full h-90 border-4 border-gray-300 rounded-lg shadow-lg" />
        </div>
        <div className="flex flex-col justify-center">
          <h1 className="text-3xl font-extrabold mb-4 text-teal-600">{product.title}</h1>
          <p className="text-gray-700 mb-4 text-lg">{product.description}</p>
          <p className="text-2xl font-semibold text-teal-500 mb-4">₹{product.price}</p>
          <p className="mb-4 text-sm text-gray-500">Rating: {product.rating.rate} ★ ({product.rating.count} reviews)</p>
          
          <div className="space-y-4"> 
            <button
              onClick={() => addToCart(product)}
              className="w-full bg-teal-600 text-white py-3 px-5 rounded-lg hover:bg-teal-700 transition duration-300"
            >
              Add to Cart
            </button>
            
            {isAuthenticated && (
              <button
                onClick={handleWishlist}
                className={`w-full py-3 px-5 rounded-lg transition duration-300 ${
                  isInWishlist ? 'bg-red-600 hover:bg-red-700' : 'bg-gray-600 hover:bg-gray-700'
                } text-white`}
              >
                {isInWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
