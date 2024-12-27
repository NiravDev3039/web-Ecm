import React from 'react';
import { useWishlist } from '../context/WishlistContext'; // Correct import

const Wishlist = () => {
  const { wishlistItems, removeFromWishlist } = useWishlist(); // Use the custom hook

  if (wishlistItems.length === 0) {
    return <div className="text-center mt-8 text-xl text-gray-600">Your wishlist is empty.</div>;
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-4xl font-bold mb-8 text-center text-black">Your Wishlist</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {wishlistItems.map((item) => (
          <div
            key={item.id}
            className="bg-white p-6 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300 ease-in-out"
          >
            <img
              className="h-40 w-full object-contain rounded-xl mb-4"
              src={item.image}
              alt={item.title}
            />
            <h3 className="text-xl font-semibold text-gray-800">{item.title}</h3>
            <p className="text-lg text-gray-600 mt-2">Price: <span className="text-teal-600">${item.price}</span></p>
            <p className="text-lg text-gray-600">Quantity: {item.quantity}</p>
            <button
              onClick={() => removeFromWishlist(item.id)}
              className="mt-4 bg-teal-500 text-white py-2 px-6 rounded-full text-lg font-semibold transition-all duration-200 ease-in-out hover:bg-teal-600"
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Wishlist;
