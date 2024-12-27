import React, { createContext, useContext, useState } from 'react';

// Creating a Context to manage the wishlist items
const WishlistContext = createContext();

// The WishlistProvider component wraps the parts of the app that need access to the wishlist state
export const WishlistProvider = ({ children }) => {
  // useState is used to manage the state of wishlistItems (an array of items in the wishlist)
  const [wishlistItems, setWishlistItems] = useState([]);

  // addToWishlist function to add a new item to the wishlist
  const addToWishlist = (item) => setWishlistItems((prev) => [...prev, item]);

  // removeFromWishlist function to remove an item from the wishlist based on the item's id
  const removeFromWishlist = (id) =>
    setWishlistItems((prev) => prev.filter((item) => item.id !== id));

  return (
    // WishlistContext.Provider makes the wishlistItems, addToWishlist, and removeFromWishlist functions available to children components
    <WishlistContext.Provider value={{ wishlistItems, addToWishlist, removeFromWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};

// useWishlist is a custom hook to access the WishlistContext value (wishlistItems, addToWishlist, removeFromWishlist) inside any component
export const useWishlist = () => {
  // useContext is used to access the current context value (in this case, the wishlist state)
  return useContext(WishlistContext);
};
